import Feature from '@/components/ui/landing/Feature';
import HowItWorks from '@/components/ui/landing/HowItWorks';
import Main from '@/components/ui/landing/Main';

export default function LandingPage() {
    return (
        <div className="bg-light text-default-foreground flex flex-col">
            <Main />
            <Feature />
            <HowItWorks />
        </div>
    );
}
