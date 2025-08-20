import { LanguageType } from "@/types";

export const DEFAULT_LANGUAGE = LanguageType.VI;
export const SUPPORTED_LANGUAGES = [LanguageType.VI, LanguageType.EN] as const;
export const SUPPORTED_NAMESPACES = ["translation"] as const;
export const DOMAIN = "https://i18next-router-v7-seo.vercel.app";

// LanguageType metadata
export const LANGUAGE_METADATA = {
    [LanguageType.VI]: {
        name: "Tiếng Việt",
        flag: "🇻🇳",
        code: LanguageType.VI,
    },
    [LanguageType.EN]: {
        name: "English",
        flag: "🇺🇸",
        code: LanguageType.EN,
    },
} as const;

// Cache configuration
export const CACHE_CONFIG = {
    MAX_AGE: 86400, // 24 hours
    STALE_WHILE_REVALIDATE: 604800, // 7 days
} as const;

// API configuration
export const API_CONFIG = {
    LOCALES_ENDPOINT: "/api/locales",
} as const;
