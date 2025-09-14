import { Client, Databases } from 'node-appwrite';

export function getAppwriteClient() {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!); // only safe in server

    return {
        databases: new Databases(client),
    };
}