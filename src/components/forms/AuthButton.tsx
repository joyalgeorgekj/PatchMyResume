import { useUI } from '@/context/UIContext';
import { AuthListType } from '@/data/constants/types';
import { signIn } from 'next-auth/react';

export default function AuthButton({ Icon, label, disable = false }: AuthListType) {
    const { setLoader } = useUI();

    const handleLogin = () => {
        signIn(label.toLowerCase(), { callbackUrl: '/user' });
        setLoader({ active: true, message: 'Opening door please wait a minute' });
    };

    return (
        <button
            onClick={handleLogin}
            disabled={disable}
            className="border-primary-muted disabled:border-primary-muted/50 disabled:scale-100 disabled:cursor-not-allowed disabled:text-dark-muted/75 text-dark shadow-primary-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105 md:text-base text-[12px]"
        >
            <Icon className="text-lg" /> {label}
        </button>
    );
}
