'use client';

import Main from '@/components/forms/stepper/Main';
import UserProvider from '@/context/UserContext';

export default function page() {
    return (
        <UserProvider>
            <Main />
        </UserProvider>
    );
}
