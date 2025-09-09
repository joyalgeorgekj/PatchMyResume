'use client';

import { usePathname } from 'next/navigation';

export const useHiddenRoutes = () => {
    const currentPath = usePathname();
    const forbidden: string[] = ['/login', '/register', '/signin'];
    return !forbidden.includes(currentPath);
};
