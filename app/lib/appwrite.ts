'use server';

import { Account, Client, Databases, ID, Query } from 'node-appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

const databases = new Databases(client);

export async function createSessionClient() {
  const sessionClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session || !session.value) {
    throw new Error('No session');
  }

  sessionClient.setSession(session.value);

  return {
    get account() {
      return new Account(sessionClient);
    },
  };
}

export async function createAdminClient() {
  const adminClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(adminClient);
    },
    get database() {
      return new Databases(adminClient);
    },
  };
}

export async function addMessage(text: string, id: string) {

}
export async function sendFriendRequest({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}): Promise<boolean> {
  try {
    await databases.createDocument('messenger', 'friend_request', ID.unique(), {
      sender_id: sender,
      receiver_id: receiver,
    });

    return true;
  } catch (error) {
    console.error('Failed to send friend request:', error);
    return false;
  }
}

export async function sendMessage(
  value: string,
  chatId: string,
  senderId: string,
) {
  try {
    await databases.createDocument('messenger', 'messages', ID.unique(), {
      chat_id: chatId,
      message: value,
      sender_id: senderId,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function generateHexChatId(
  userId1: string,
  userId2: string,
): Promise<string> {
  const [a, b] = [userId1, userId2].sort();
  const raw = `${a}:${b}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex.slice(0, 35); // trim to 35 characters
}
export async function acceptRequest(id: string) {
  const requestData = await getRequestData(id);
  const sender = (await getUserById(requestData.sender_id)).friends;
  const receiver = (await getUserById(requestData.receiver_id)).friends;

  const chatId = await generateHexChatId(
    requestData.sender_id,
    requestData.receiver_id,
  );
  const friendsSender = [...sender, requestData.receiver_id];
  const friendsReceiver = [...receiver, requestData.sender_id];
  try {
    await databases.updateDocument(
      'messenger',
      'users',
      requestData.receiver_id,
      {
        friends: friendsReceiver,
      },
    );

    await databases.updateDocument(
      'messenger',
      'users',
      requestData.sender_id,
      {
        friends: friendsSender,
      },
    );
    await databases.createDocument('messenger', 'chat', chatId, {
      friends: [requestData.sender_id, requestData.receiver_id],
    });
    await databases.deleteDocument(
      'messenger',
      'friend_request',
      requestData.$id,
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeRequest(id: string) {
  try {
    databases.deleteDocument('messenger', 'friend_request', id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function getMessagesChat(value: string) {
  const messages = await databases.listDocuments('messenger', 'messages', [
    Query.equal('chat_id', value),
  ]);
  const withType: Message[] = messages.documents.map((doc) => ({
    senderId: doc.sender_id,
    message: doc.message,
    timeSend: doc.$createdAt,
  }));
  return withType;
}

export async function getRequestData(id: string) {
  const result = await databases.getDocument('messenger', 'friend_request', id);
  const filtered: FriendRequest = {
    sender_id: result.sender_id,
    receiver_id: result.receiver_id,
    $id: result.$id,
  };
  return filtered;
}

export async function getRequest(id: string) {
  const result = await databases.listDocuments('messenger', 'friend_request', [
    Query.equal('receiver_id', id),
  ]);
  const filtered: FriendRequest[] = result.documents.map((doc) => ({
    sender_id: doc.sender_id,
    receiver_id: doc.receiver_id,
    status: doc.status,
    $id: doc.$id,
  }));
  return filtered;
}

export async function requestData(friends: string[], id: string[]) {
  if (friends.length == 0) {
    return;
  }
  const myFriends = await databases.listDocuments('messenger', 'users', [
    Query.equal('$id', friends),
    Query.select(['$id', 'name', 'avatar_url']),
  ]);
  const data: RequestFriendData[] = myFriends.documents.map((doc, i) => ({
    $id: doc.$id,
    name: doc.name,
    avatar_url: doc.avatar_url,
    requestId: id[i],
  }));
  return data;
}

export async function getMyFriends(friends: string[]) {
  if (friends.length == 0) {
    return;
  }
  const myFriends = await databases.listDocuments('messenger', 'users', [
    Query.equal('$id', friends),
    Query.select(['$id', 'name', 'avatar_url']),
  ]);
  const data: Friend[] = myFriends.documents.map((doc) => ({
    $id: doc.$id,
    name: doc.name,
    avatar_url: doc.avatar_url,
  }));
  return data;
}

export async function findUsers(value: string) {
  const users = await databases.listDocuments('messenger', 'users', [
    Query.contains('name', value),
    Query.select(['$id', 'name', 'avatar_url']),
  ]);

  const data: Friend[] = users.documents.map((doc) => ({
    $id: doc.$id,
    name: doc.name,
    avatar_url: doc.avatar_url,
  }));
  return data;
}

export async function getUserById(userId: string) {
  const document = await databases.getDocument('messenger', 'users', userId);

  const data: User = {
    $id: document.$id,
    name: document.name,
    email: document.email,
    avatar_url: document.avatar_url,
    friends: document.friends,
  };
  return data;
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    throw new Error('No session');
  }

  const sessionClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setSession(session.value);

  const account = new Account(sessionClient);

  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return error;
  }
}

export async function signUpWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const { account, database } = await createAdminClient();

  const user = await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  database.createDocument('messenger', 'users', user.$id, {
    name: name,
    email: email,
  });

  const cookieStore = await cookies();

  cookieStore.set('session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
  redirect('/messenger');
}

export async function logInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  const cookieStore = await cookies();

  cookieStore.set('session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
  redirect('/messenger');
}
