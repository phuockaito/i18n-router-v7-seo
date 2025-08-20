import { useTranslation } from "react-i18next";
import type { To } from "react-router";
import { useLocation } from "react-router";

import enTranslation from "@/locales/en/translation";

export const useLocalizedPath = () => {
    const { t } = useTranslation();
    const { search } = useLocation();
    type TranslationKey = keyof typeof enTranslation;
    const localizedPath = (path: TranslationKey) => `${t(path)}${search}` as To;
    return {
        localizedPath,
    };
};
