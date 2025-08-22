import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { LinkLocalized } from "@/components";

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-200px)]">
            <LinkLocalized to="/" className="text-blue-500">
                {t("Go to Home")}
            </LinkLocalized>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h1>{t("About Us")}</h1>
                <Link
                    to="https://github.com/phuockaito/i18n-router-v7-seo/tree/translate-v2"
                    target="_blank"
                    className="hover:text-blue-600 hover:underline font-bold"
                >
                    {t("Go to Github")}
                </Link>
            </div>
        </div>
    );
}
