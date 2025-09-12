'use client';

import { useHiddenRoutes } from '@/hooks/useHiddenRoutes';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUI } from '@/context/UIContext';

export default function LandingWrapper({ children }: { children: ReactNode }) {
    const hidden = useHiddenRoutes();
    const { setLoader } = useUI();
    const { status } = useSession();

    useEffect(() => setLoader({ active: true, message: 'Loading UI' }), []);

    useEffect(() => {
        if (status === 'authenticated') setLoader({ active: false });

        const timer = setTimeout(() => setLoader({ active: false }), 3000);
        return () => clearTimeout(timer);
    }, [status, setLoader]);

    return (
        <>
            {hidden && <Header />}
            {children}
            {hidden && <Footer />}
        </>
    );
}
