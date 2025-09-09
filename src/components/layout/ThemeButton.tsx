'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaCircleHalfStroke } from 'react-icons/fa6';

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-full shadow shadow-dark/25 text-dark/50 hover:scale-105 transition cursor-pointer"
    >
      {theme === 'dark' ? <FaMoon /> : theme === 'light' ? <FaSun /> : <FaCircleHalfStroke />}
    </button>
  );
}
