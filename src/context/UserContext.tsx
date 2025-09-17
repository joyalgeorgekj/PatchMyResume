'use client';
import { DocumentMainScheme, DocumentMainTypeZod } from '@/data/constants/types';
import { createUserDocument, getUserDocument } from '@/lib/appwrite';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useUI } from './UIContext';

type SessionUserType = {
    id: string;
    name: string;
    email: string;
    image: string;
};

type UserContextType = {
    user: SessionUserType | null;
    userData: DocumentMainTypeZod | null;
    setUserData: (data: DocumentMainTypeZod) => void;
};

const UserContext = createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
    const { data, status } = useSession();
    const { setToast } = useUI();
    const [userDocument, setUserDocument] = useState<DocumentMainTypeZod | null>(null);
    const [user, setUser] = useState<SessionUserType | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') redirect('/');
        if (status === 'authenticated') {
            setUser(data?.user as SessionUserType);
        }
    }, [status]);

    useEffect(() => {
        if (typeof window === 'undefined' || !user) return;

        // 1. Try to read from sessionStorage
        const cached = sessionStorage.getItem('user_data');
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                // ✅ validate against Zod schema
                const safe = DocumentMainScheme.parse(parsed);

                setUserDocument(safe);
                return;
            } catch {
                console.warn('Invalid cached user_data, refetching...');
            }
        }

        // 2. Otherwise fetch from Appwrite
        getUserDocument().then((res) => {
            const safe = {
                id: res.$id,
                api_key: res.api_key,
                model: res.model,
                resume_user_data: res.resume_user_data,
            };
            
            if (res?.type === 'error') return;
            
            sessionStorage.setItem('user_data', JSON.stringify(safe));
            setUserDocument(safe);
        });
    }, [user]);

    useEffect(() => console.log('User Data from context: ', userDocument, 'Type of data: ', typeof userDocument), [userDocument]);

    const setUserData = (data: DocumentMainTypeZod) => {
        if (!DocumentMainScheme.safeParse(data).success) return false;
        setUserDocument(data);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('user_data', JSON.stringify(data));
            createUserDocument({
                resume_user_data: data.resume_user_data,
                api_key: data.api_key,
                model: data.model,
            }).then((res) => setToast({ message: res.message, type: res.type }));
        }
        return true;
        // TODO: call API to also update session server-side
    };

    return (
        <UserContext.Provider
            value={{
                user,
                userData: userDocument,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useUserData = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUI must be used within UIProvider');
    return ctx;
};
