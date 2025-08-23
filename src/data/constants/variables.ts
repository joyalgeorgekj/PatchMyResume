import { IconType } from "react-icons";
import { FaApple, FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export interface AuthListType {
    Icon: IconType;
    label: string;
}

export const authList: AuthListType[] = [
    {
        Icon: FcGoogle,
        label: 'Google',
    },
    {
        Icon: FaGithub,
        label: 'GitHub',
    },
    {
        Icon: FaLinkedin,
        label: 'LinkedIn',
    },
    {
        Icon: FaApple,
        label: 'Apple',
    },
];
