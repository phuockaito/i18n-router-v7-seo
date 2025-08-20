import { useTranslation } from "react-i18next";

import { LinkLocalized } from "@/components";

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-200px)]">
            <h1>{t("About Us")}</h1>
            <LinkLocalized to="/" className="text-blue-500">
                {t("Go to Home")}
            </LinkLocalized>
        </div>
    );
}
