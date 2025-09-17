'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function ProfileAvatar({ session }: { session: Session }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            {/* Avatar */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 focus:outline-none"
            >
                <img
                    src={session?.user?.image || '/image/default_avatar.jpg'}
                    alt="Profile"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/image/default_avatar.jpg';
                    }}
                    className="border-base text-dark flex h-8 w-8 cursor-pointer items-center justify-center gap-2 rounded-md border-2 text-sm font-medium whitespace-pre shadow-sm transition-all hover:scale-105"
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="border-dark-muted/25 bg-light absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border shadow-lg">
                    <div className="px-4 py-3">
                        <p className="text-dark text-sm font-medium">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    </div>
                    <div className="border-dark-muted/25 border-t">
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="hover:bg-light-muted w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
