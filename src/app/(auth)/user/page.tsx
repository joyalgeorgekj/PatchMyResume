"use client";

import Main from '@/components/forms/stepper/Main';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function page() {
    const { status } = useSession();
    
    useEffect(() => {
        if (status === 'unauthenticated')
            redirect('/');
    }, [status])

    return (
        <div>
            <Main />
        </div>
    );
}
