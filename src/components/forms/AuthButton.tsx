import { signIn } from 'next-auth/react';

export default function AuthButton({ Icon, label, className }: AuthListType) {
    const handleLogin = () => signIn(label.toLowerCase());
    return (
        <button
            onClick={handleLogin}
            className={
                'border-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm ' +
                className
            }
        >
            <Icon className="text-lg" /> {label}
        </button>
    );
}
