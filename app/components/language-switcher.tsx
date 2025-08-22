import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import { LANGUAGE_METADATA } from "@/constants";

const languages = Object.values(LANGUAGE_METADATA);
export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const getPathWithoutLanguage = (pathname: string) => {
        const pathParts = pathname.split("/");
        return "/" + pathParts.slice(2).join("/");
    };
    const handleLanguageChange = (languageCode: string) => {
        const pathWithoutLang = getPathWithoutLanguage(pathname);
        const newPath = `/${languageCode}${pathWithoutLang}`;
        navigate(newPath);
    };

    return (
        <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                            i18n.language === lang.code
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        title={lang.name}
                    >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.code.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}
