import { Client, Databases } from "appwrite";

export const subscribeClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

export const subscribeDatabases = new Databases(subscribeClient);

