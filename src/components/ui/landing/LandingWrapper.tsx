'use client';

import { useHiddenRoutes } from '@/hooks/useHiddenRoutes';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUI } from '@/context/UIContext';

export default function LandingWrapper({ children }: { children: ReactNode }) {
    const hidden = useHiddenRoutes();
    const { setShowLoader } = useUI();
    const { status } = useSession();

    useEffect(() => {
        if (status === 'loading') setShowLoader(true);
        if (status === 'authenticated') setShowLoader(false);

        const timer = setTimeout(() => setShowLoader(false), 3000);
        return () => clearTimeout(timer);
    }, [status, setShowLoader]);

    return (
        <>
            {hidden && <Header />}
            {children}
            {hidden && <Footer />}
        </>
    );
}
