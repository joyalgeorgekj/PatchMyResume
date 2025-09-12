import { useUI } from '@/context/UIContext';
import { AuthListType } from '@/data/constants/types';
import { signIn } from 'next-auth/react';

export default function AuthButton({ Icon, label }: AuthListType) {
    const { setLoader } = useUI();

    const handleLogin = () => {
        signIn(label.toLowerCase(), { callbackUrl: '/user' });
        setLoader({ active: true, message: 'Opening door please wait a minute' });
    };

    return (
        <button
            onClick={handleLogin}
            className={
                'border-primary-muted text-dark shadow-primary-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm hover:scale-105 transition'
            }
        >
            <Icon className="text-lg" /> {label}
        </button>
    );
}
