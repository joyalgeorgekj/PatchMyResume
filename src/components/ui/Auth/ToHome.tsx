import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function ToHome() {
    return (
        <div className="space-y-3">
            <Link
                href="/"
                className="text-dark mb-2 flex w-min items-start gap-1 text-sm font-medium hover:underline"
            >
                <FaHome className="text-base" />
                Home
            </Link>
        </div>
    );
}
