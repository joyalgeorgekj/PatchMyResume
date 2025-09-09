import { AuthListType } from '@/data/constants/variables';
import { signIn } from 'next-auth/react';

export default function AuthButton({ Icon, label }: AuthListType) {
    const {setShowLoader} = useUI();

    const handleLogin = () => {
        signIn(label.toLowerCase(), { callbackUrl: "/user" })
        setShowLoader(true);
    };

    return (
        <button
            onClick={handleLogin}
            className={
                'border-dark-muted/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-dark text-sm font-medium shadow-sm shadow-dark-muted'
            }
        >
            <Icon className="text-lg" /> {label}
        </button>
    );
}
