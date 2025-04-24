'use server';

import { Account, Client, Databases, ID, Query } from 'node-appwrite';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}
export async function sendFriendRequest({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}): Promise<boolean> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);

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


export async function acceptRequest(id: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const databases = new Databases(client);

  const requestData = await getRequestData(id);
  const sender = (await getUserById(requestData.sender_id)).friends;
  const receiver = (await getUserById(requestData.receiver_id)).friends;

  const friendsSender = [...sender, requestData.receiver_id];
  const friendsReceiver = [...receiver, requestData.sender_id];
  try {
    await databases.updateDocument('messenger', 'users', requestData.receiver_id, {
      friends: friendsReceiver,
    });

    await databases.updateDocument('messenger', 'users', requestData.sender_id, {
      friends: friendsSender,
    });
    await databases.deleteDocument('messenger', 'friend_request', requestData.$id)
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
} export async function removeRequest(id: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
  try {

    databases.deleteDocument('messenger', 'friend_request', id)
    return true
  } catch (error) {
    console.log(error)
    return false;
  }
}

export async function getRequestData(id: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
  const result = await databases.getDocument('messenger', 'friend_request', id)
  const filtered: FriendRequest = {
    sender_id: result.sender_id,
    receiver_id: result.receiver_id,
    status: result.status,
    $id: result.$id,
  };
  return filtered;
}
export async function getRequest(id: string) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
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
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
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
    requestId: id[i]
  }));
  return data;
}
export async function getMyFriends(friends: string[]) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
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
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
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
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const databases = new Databases(client);
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
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);
  const account = new Account(client);

  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
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
