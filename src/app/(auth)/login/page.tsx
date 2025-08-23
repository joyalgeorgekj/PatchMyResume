'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaLinkedin, FaApple, FaHome } from 'react-icons/fa';
import AuthButton from '@/components/forms/AuthButton';
import Link from 'next/link';
import { authList } from '@/data/constants/variables';

export default function Login() {
    return (
        <div className="bg-surface flex min-h-screen items-center justify-center px-4">
            <div className="bg-surface w-full max-w-md rounded-lg p-8 shadow-lg">
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="text-text mb-2 flex w-min items-center gap-1 text-sm font-medium hover:underline"
                    >
                        <FaHome className="text-base" />
                        Home
                    </Link>
                </div>

                {/* Welcome Message */}
                <h2 className="text-text mb-2 text-center text-2xl font-bold">Welcome Back</h2>
                <p className="text-muted-foreground mb-6 text-center text-sm">
                    Sign in to continue to your account.
                </p>

                {/* Social buttons */}
                <div className="space-y-3">
                    {authList.map((val, ind) => (
                        <AuthButton
                            key={ind}
                            Icon={val.Icon}
                            label={val.label}
                            className="bg-surface"
                        />
                    ))}
                </div>

                {/* Register redirect */}
                <p className="text-foreground mt-6 text-center text-sm">
                    Don’t have an account?{' '}
                    <a
                        href="/register"
                        className="text-primary font-medium underline hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
