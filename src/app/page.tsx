'use client';

import HowItWorks from '@/components/ui/landing/HowItWorks';
import Feature from '@/components/ui/landing/Feature';
import Main from '@/components/ui/landing/Main';
import { useUI } from '@/context/UIContext';
import { useEffect } from 'react';

export default function LandingPage() {
    const { setLoader, loader } = useUI();

    useEffect(() => {
        loader.active === true && setLoader({ active: false });
    }, []);

    return (
        <div className="bg-light text-default-foreground flex flex-col">
            <Main />
            <Feature />
            <HowItWorks />
        </div>
    );
}
