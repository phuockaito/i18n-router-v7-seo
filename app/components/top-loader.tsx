import { useEffect, useState } from "react";

interface TopLoaderProps {
    isLoading: boolean;
}

export const TopLoader: React.FC<TopLoaderProps> = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            const timer = setTimeout(() => setProgress(30), 100);
            const timer2 = setTimeout(() => setProgress(60), 300);
            const timer3 = setTimeout(() => setProgress(90), 600);

            return () => {
                clearTimeout(timer);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        } else {
            setProgress(100);
            const timer = setTimeout(() => setProgress(0), 200);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isLoading && progress === 0) return null;

    return (
        <div
            className="fixed top-0 left-0 w-full h-1.5 bg-blue-500 z-[9999] transition-all duration-300 ease-out"
            style={{
                transform: `translateX(${progress - 100}%)`,
            }}
        />
    );
};
