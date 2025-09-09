'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUI } from '@/context/UIContext';
import ThemeButton from './ThemeButton';
import ProfileAvatar from '../ui/Auth/ProfileAvatar';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

export default function Header() {
  const { setShowLoader } = useUI();
  const { data: session, status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = session ? [{ href: '/user', label: 'Dashboard' }] : [];

  return (
    <header className="border-dark-muted/10 bg-light/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-12">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-primary">
          <Image src={'/image/1.png'} alt='logo' className='rounded-full' width={40} height={40} />
          <span className="text-lg">PatchMyResume</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-dark">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeButton />
          {status === 'authenticated' ? (
            <ProfileAvatar session={session!} />
          ) : (
            <Link
              href="/signin"
              onClick={() => setShowLoader(true)}
              className="bg-primary hover:scale-105 text-light flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition cursor-pointer"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-dark cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Drawer */}
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-light shadow-xl transform transition-transform duration-300 md:hidden
          ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-muted/10">
          <span className="font-bold text-primary">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-2xl text-dark cursor-pointer"
          >
            <FiX />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col p-4 gap-4 text-dark">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-light-muted transition cursor-pointer"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer Actions */}
        <div className="mt-auto p-4 border-t border-dark-muted/10 flex flex-col gap-3">
          <ThemeButton />
          {status === 'authenticated' ? (
            <ProfileAvatar session={session!} />
          ) : (
            <Link
              href="/signin"
              onClick={() => {
                setShowLoader(true);
                setDrawerOpen(false);
              }}
              className="bg-primary hover:scale-105 text-light flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition cursor-pointer"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
