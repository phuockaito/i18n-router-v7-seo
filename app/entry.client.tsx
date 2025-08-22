import i18next from "i18next";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { HydratedRouter } from "react-router/dom";

import { DEFAULT_LANGUAGE } from "@/constants";
import resources from "@/locales";
import type { LanguageType } from "@/types";

async function main() {
    const pathSegments = window.location.pathname.split("/");
    const prefixLng = (pathSegments[1] as LanguageType) || DEFAULT_LANGUAGE;

    await i18next.use(initReactI18next).init({
        resources,
        lng: prefixLng,
        fallbackLng: DEFAULT_LANGUAGE,
        react: {
            useSuspense: false,
        },
    });

    startTransition(() => {
        hydrateRoot(
            document,
            <I18nextProvider i18n={i18next}>
                <StrictMode>
                    <HydratedRouter />
                </StrictMode>
            </I18nextProvider>,
        );
    });
}

main().catch((error) => console.error(error));
