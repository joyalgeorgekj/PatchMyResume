import { Client, Databases } from 'node-appwrite';
import { ID, Query } from 'node-appwrite';
const DATABASE_ID = process.env.APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!;
const ENDPOINT = process.env.APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY!;

export function getAppwriteClient() {
    const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

    return {
        databases: new Databases(client),
    };
}

export async function getResumeByEmail(email: string) {
    const { databases } = getAppwriteClient();
    return databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('email', email)]);
}

export async function createResumeDoc(email: string, data: any) {
    const { databases } = getAppwriteClient();
    return databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), { email, ...data });
}

export async function updateResumeDoc(docId: string, data: any) {
    const { databases } = getAppwriteClient();
    return databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, data);
}
