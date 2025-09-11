import { ResumeDataType } from '@/data/constants/types';
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

export function createNewUserDocument(
    data: Readonly<{
        resume_user_data: ResumeDataType;
        api_key: string;
        model: string;
    }>
) {
    async function routeFetch() {
        try {
            const res = await fetch('/api/appwrite/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error(`Failed: ${res.status}`);

            return await res.json();
        } catch (error: any) {
            return { message: error.message || 'Unknown error', type: 'error' };
        }
    }

    return routeFetch();
}

export function getUserDocument() {
    async function routeFetch() {
        try {
            const res = await fetch('/api/appwrite/resume', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error(`Failed: ${res.status}`);

            return await res.json();
        } catch (error: any) {
            return { message: error.message || 'Unknown error', type: 'error' };
        }
    }

    return routeFetch();
}
