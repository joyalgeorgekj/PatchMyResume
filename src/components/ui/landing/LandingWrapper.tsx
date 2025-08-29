"use client";

import { useHiddenRoutes } from '@/hooks/useHiddenRoutes';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ReactNode } from 'react';

export default function LandingWrapper({ children }: Readonly<{ children: ReactNode }>) {
    const hidden = useHiddenRoutes();
    return (
        <>
            {hidden && <Header />}
            {children}
            {hidden && <Footer />}
        </>
    );
}
