'use client';

import { FaHome } from 'react-icons/fa';
import AuthButton from '@/components/forms/AuthButton';
import Link from 'next/link';
import { authList } from '@/data/constants/variables';

export default function Login() {
    return (
        <div className="bg-light flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="text-dark mb-2 flex w-min items-center gap-1 text-sm font-medium hover:underline"
                    >
                        <FaHome className="text-base" />
                        Home
                    </Link>
                </div>

                {/* Welcome Message */}
                <h2 className="text-dark mb-2 text-center text-2xl font-bold">Welcome Back</h2>
                <p className="text-dark-muted mb-6 text-center text-sm">
                    Sign in to continue to your account.
                </p>

                {/* Social buttons */}
                <div className="space-y-3">
                    {authList.map((val, ind) => (
                        <AuthButton
                            key={ind}
                            Icon={val.Icon}
                            label={val.label}
                            className="bg-light"
                        />
                    ))}
                </div>

                {/* Register redirect */}
                <p className="text-foreground mt-6 text-center text-sm">
                    Don’t have an account?{' '}
                    <Link
                        href="/register"
                        className="text-dark font-medium underline hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
