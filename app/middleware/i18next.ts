import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/constants";
import resources from "@/locales";

// Cache for i18next instances to avoid recreating them
const i18nInstanceCache = new Map<string, typeof i18next>();

// Create a custom i18next instance for server-side with caching
export function createI18nextInstance(locale: string = DEFAULT_LANGUAGE) {
    // Check if instance already exists in cache
    if (i18nInstanceCache.has(locale)) {
        return i18nInstanceCache.get(locale)!;
    }

    const instance = i18next.createInstance();
    instance.use(initReactI18next).init({
        resources,
        lng: locale,
        fallbackLng: DEFAULT_LANGUAGE,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

    // Cache the instance
    i18nInstanceCache.set(locale, instance);

    return instance;
}

// Get locale from request headers or URL parameter
export function getLocaleFromRequest(request: Request): string {
    const url = new URL(request.url);

    // 1) Detect from leading path segment: /vi/... or /en/...
    const [, firstSegment] = url.pathname.split("/");
    if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment as any)) {
        return firstSegment;
    }

    // 2) Fallback: query param ?lng=vi|en (back-compat)
    const lngParam = url.searchParams.get("lng");
    if (lngParam && SUPPORTED_LANGUAGES.includes(lngParam as any)) {
        return lngParam;
    }

    // 3) Fallback: Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
        const languages = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim());
        for (const lang of languages) {
            const shortLang = lang.split("-")[0];
            if (SUPPORTED_LANGUAGES.includes(shortLang as any)) {
                return shortLang;
            }
        }
    }

    // 4) Default
    return DEFAULT_LANGUAGE;
}

// Middleware function for React Router v7
export function i18nextMiddleware(request: Request) {
    const locale = getLocaleFromRequest(request);
    const i18nInstance = createI18nextInstance(locale);
    return {
        locale,
        i18n: i18nInstance,
        t: i18nInstance.t,
    };
}

declare module "i18next" {
    interface CustomTypeOptions {
        resources: typeof resources.vi;
    }
}
