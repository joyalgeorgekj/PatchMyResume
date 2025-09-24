'use client';

import Main from '@/components/forms/stepper/Main';
import { useUI } from '@/context/UIContext';
import UserProvider from '@/context/UserContext';
import { useEffect } from 'react';

export default function page() {
    const { setLoader, loader } = useUI();

    useEffect(() => {
        loader.active === true && setLoader({ active: false });
    }, []);

    return (
        <UserProvider>
            <Main />
        </UserProvider>
    );
}
