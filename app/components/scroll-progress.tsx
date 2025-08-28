import { useEffect, useState } from "react";

export const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-transparent z-50">
            <div
                className="h-1.5 bg-[#2ECC71] transition-all duration-75"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};
