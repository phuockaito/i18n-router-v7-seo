import "@ant-design/v5-patch-for-react-19";
import "./app.css";

import { useTranslation } from "react-i18next";
import { data, Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "react-router";

import { review } from "@/assets";
import { LanguageSwitcher, TopLoader } from "@/components";
import { DOMAIN } from "@/constants";
import { i18nextMiddleware } from "@/middleware/i18next";
import { Provider } from "@/provider";
import { LanguageType } from "@/types";

import type { Route } from "./+types/root";

export const unstable_middleware = [i18nextMiddleware];
export function meta() {
    return [
        { title: "I18Next React Router v7 (SEO)" },
        { name: "description", content: "I18Next React Router v7 (SEO)" },
        { name: "og:title", content: "I18Next React Router v7 (SEO)" },
        { name: "og:description", content: "I18Next React Router v7 (SEO)" },
        { name: "og:url", content: DOMAIN },
        { name: "og:image", content: "/public/logo.png" },
        { name: "og:type", content: "website" },
        { name: "og:site_name", content: "I18Next React Router v7 (SEO)" },
        { name: "og:locale", content: "en_US" },
    ];
}
export async function loader({ request }: Route.LoaderArgs) {
    const { locale } = i18nextMiddleware(request);
    return data(
        {
            locale,
        },
        {
            headers: {
                "Set-Cookie": locale,
                "X-LanguageType": locale,
            },
        },
    );
}

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        as: "style",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    },
];

interface LayoutProps {
    children: React.ReactNode;
    loaderData: {
        locale?: LanguageType;
    };
}

export function Layout({ children }: LayoutProps) {
    const { i18n } = useTranslation();
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <html lang={i18n.language} dir={i18n.dir(i18n.language)}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <TopLoader isLoading={isNavigating} />
                <div className="max-w-screen-xl mx-auto px-4 py-8">
                    <header className="mb-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">
                                    I18Next React Router v7 (SEO)
                                </h1>
                                <img width={40} src={review} alt="review" />
                            </div>
                            <LanguageSwitcher />
                        </div>
                    </header>
                    <Provider>{children}</Provider>
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App({ loaderData }: Route.ComponentProps) {
    const { i18n } = useTranslation();

    if (loaderData.locale && i18n.language !== loaderData.locale) {
        i18n.changeLanguage(loaderData.locale);
    }

    return <Outlet />;
}
