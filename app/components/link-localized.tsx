import { Link, type LinkProps } from "react-router";

import { useLocalizedPath } from "@/hooks";
import enTranslation from "@/locales/en/translation";

type TranslationKey = keyof typeof enTranslation;

interface LinkLocalizedProps extends Omit<LinkProps, "to"> {
    to: string;
    children: React.ReactNode;
}

export const LinkLocalized = ({ to, children, ...props }: LinkLocalizedProps) => {
    const { localizedPath } = useLocalizedPath();
    return (
        <Link to={localizedPath(to as TranslationKey)} {...props}>
            {children}
        </Link>
    );
};
