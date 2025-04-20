'use server';

import { Account, Client, Databases, ID } from 'node-appwrite';
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
