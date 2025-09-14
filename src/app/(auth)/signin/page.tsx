'use client';

import { useEffect, useState } from 'react';
import AuthButton from '@/components/forms/AuthButton';
import ToHome from '@/components/ui/auth/ToHome';
import { useUI } from '@/context/UIContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authList } from '@/data/constants/workflow';

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
    const { setLoader, loader } = useUI();
    const { status } = useSession();

    useEffect(() => {
        if (loader) setLoader({ active: false });
    }, []);

    useEffect(() => {
        if (status === 'authenticated') redirect('/user');
    }, [status]);

    return (
        <div className="bg-light flex min-h-screen items-center justify-center px-4">
            <div className="border-primary-muted bg-light w-full max-w-md rounded-lg border-2 p-8 shadow-lg">
                <ToHome />

                {/* Welcome Message */}
                {activeTab === 'register' ? (
                    <>
                        <h2 className="text-dark mb-2 text-center text-2xl font-bold">
                            Create your account
                        </h2>
                        <p className="text-dark-muted mb-6 text-center text-sm">
                            Join us today! It's quick and easy.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-dark mb-2 text-center text-2xl font-bold">
                            Welcome back
                        </h2>
                        <p className="text-dark-muted mb-6 text-center text-sm">
                            Login to continue to your account.
                        </p>
                    </>
                )}

                {/* Auth Buttons */}
                <div className="space-y-3">
                    {authList.map((val, ind) => (
                        <AuthButton key={ind} Icon={val.Icon} label={val.label} />
                    ))}
                </div>

                {/* Redirect / Switch */}
                <p className="text-dark mt-6 text-center text-sm">
                    {activeTab === 'register' ? (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={() => setActiveTab('login')}
                                className="text-dark cursor-pointer font-medium underline hover:underline"
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{' '}
                            <button
                                onClick={() => setActiveTab('register')}
                                className="text-dark cursor-pointer font-medium underline hover:underline"
                            >
                                Register
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
