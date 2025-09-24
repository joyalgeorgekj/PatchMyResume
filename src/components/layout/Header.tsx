'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUI } from '@/context/UIContext';
import ThemeButton from './ThemeButton';
import ProfileAvatar from '../ui/auth/ProfileAvatar';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function Header() {
    const { setLoader } = useUI();
    const { data: session, status } = useSession();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navLinks = status === 'authenticated' ? [{ href: '/user', label: 'Dashboard' }] : [];

    return (
        <header className="border-dark-muted/10 bg-light/90 sticky top-0 z-40 border-b backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-12">
                {/* Brand */}
                <Link
                    href="/"
                    className="text-primary flex items-center gap-2 font-bold"
                    onClick={() => setLoader({ active: true, message: 'Loading Home Route' })}
                >
                    <Image
                        src={'/image/logo.png'}
                        alt="logo"
                        className="drop-shadow-dark-muted/75 my-auto drop-shadow-md"
                        height={60}
                        width={60}
                    />
                    <h1 className="text-dark pt-2 text-base/4">
                        PatchMy <br />
                        <span className="text-primary">Resume</span>
                        <p className="text-dark text-[10px] uppercase">
                            AI-Assisted ——— ATS OPTIMIZED
                        </p>
                    </h1>
                    <br />
                </Link>

                {/* Desktop Nav */}
                <nav className="text-dark hidden gap-6 text-sm font-medium md:flex">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setLoader({ active: true, message: 'Loading User Route' })}
                            className="hover:text-primary transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <ThemeButton />
                    {status === 'authenticated' ? (
                        <ProfileAvatar session={session!} />
                    ) : (
                        <Link
                            href="/signin"
                            onClick={() => setLoader({ active: true, message: '' })}
                            className="bg-primary text-light flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105"
                        >
                            Sign in
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="text-dark cursor-pointer text-2xl md:hidden"
                    onClick={() => setDrawerOpen(true)}
                >
                    <FiMenu />
                </button>
            </div>

            {/* Mobile Drawer */}
            {/* Backdrop */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`bg-light fixed inset-y-0 right-0 z-50 w-64 transform shadow-xl transition-transform duration-300 md:hidden ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Drawer Header */}
                <div className="border-dark-muted/10 flex items-center justify-between border-b p-4">
                    <span className="text-primary font-bold">Menu</span>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="text-dark cursor-pointer text-2xl"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Drawer Nav Links */}
                <nav className="text-dark flex flex-col gap-4 p-4">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setDrawerOpen(false)}
                            className="hover:bg-light-muted cursor-pointer rounded-md px-3 py-2 transition"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Drawer Actions */}
                <div className="border-dark-muted/10 mt-auto flex flex-col gap-3 border-t p-4">
                    <ThemeButton />
                    {status === 'authenticated' ? (
                        <ProfileAvatar session={session!} />
                    ) : (
                        <Link
                            href="/signin"
                            onClick={() => {
                                setLoader({ active: true, message: '' });
                                setDrawerOpen(false);
                            }}
                            className="bg-primary text-light flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
