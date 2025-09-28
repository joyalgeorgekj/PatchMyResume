'use client';

import { useEffect, useState } from 'react';
import AuthButton from '@/components/forms/AuthButton';
import ToHome from '@/components/ui/auth/ToHome';
import { useUI } from '@/context/UIContext';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authList } from '@/data/constants/workflow';

export default function AuthPage() {
    const [page, setPage] = useState<'login' | 'register'>('register');
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
            <div className="md:border-primary-muted bg-light w-full max-w-md rounded-lg border-0 p-8 shadow-lg md:border-2">
                <ToHome />

                {/* Welcome Message */}
                <>
                    <h2 className="text-dark text-center text-base md:text-2xl font-bold">
                        {page === 'register' ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="text-dark-muted mb-3 text-center text-[12px] md:text-sm">
                        {page === 'register'
                            ? "Join us today! It's quick and easy."
                            : 'Login to continue to your account.'}
                    </p>
                    <p className="text-dark-muted mb-3 rounded border-2 border-yellow-300/25 p-4 text-center text-[12px] md:text-xs font-medium md:font-bold">
                        {page === 'register'
                            ? '*By becoming a user you are agreeing to the '
                            : '*Countinuing to Login means you are following the '}{' '}
                        <a
                            href="https://patchmyresume.joyalgeorgekj.com/termsandconditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='underline'
                        >
                            terms and conditions
                        </a>
                    </p>
                </>

                {/* Auth Buttons */}
                <div className="space-y-3">
                    {authList.map((val, ind) => (
                        <AuthButton
                            key={ind}
                            Icon={val.Icon}
                            label={val.label}
                            disable={val.disable}
                        />
                    ))}
                </div>

                {/* Redirect / Switch */}
                <p className="text-dark mt-6 text-center text-[12px] md:text-sm">
                    {page === 'register' ? (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={() => setPage('login')}
                                className="text-dark cursor-pointer font-medium underline hover:underline"
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{' '}
                            <button
                                onClick={() => setPage('register')}
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
