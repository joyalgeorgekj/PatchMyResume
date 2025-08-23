import { signIn } from 'next-auth/react';
import { IconType } from 'react-icons/lib';

interface AuthButtonProps {
    Icon: IconType;
    label: string;
    className?: string;
}

export default function AuthButton({ Icon, label, className }: AuthButtonProps) {
    const handleLogin = () => signIn(label.toLowerCase());
    return (
        <button
            onClick={handleLogin}
            className={
                'cursor-pointer flex w-full items-center justify-center gap-2 rounded-md border-2 border-base px-4 py-2 text-sm font-medium shadow-sm ' +
                className
            }
        >
            <Icon className="text-lg" /> {label}
        </button>
    );
}
