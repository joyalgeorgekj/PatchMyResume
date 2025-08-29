'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mount, setMount] = useState<boolean>(false);

    useEffect(() => setMount(true), []);

    if (mount)
        return (
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="border-primary-muted text-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-3 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105"
            >
                {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </button>
        );
}
