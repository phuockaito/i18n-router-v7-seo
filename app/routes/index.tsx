import { useTranslation } from "react-i18next";

import { MusicApi } from "@/api";
import { review } from "@/assets";
import { LinkLocalized } from "@/components/link-localized";
import { i18nextMiddleware } from "@/middleware/i18next";
import type { MusicType } from "@/types";

export function meta({ loaderData }: Route.MetaArgs) {
    return [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { name: "og:image", content: review },
    ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{
    title: string;
    description: string;
    data: MusicType[];
}> {
    const { t } = i18nextMiddleware(request);
    try {
        const { data } = await MusicApi.getTopViews();
        return {
            title: t("Home"),
            description: t("Home"),
            data,
        };
    } catch {
        return {
            title: t("Home"),
            description: t("Home"),
            data: [],
        };
    }
}

import { getSession } from "@/sessions.server";

import type { Route } from "./+types";
export default function Index({ loaderData }: Route.ComponentProps) {
    const { t } = useTranslation();
    return (
        <div className="space-y-6">
            <div>
                <LinkLocalized to="/about-us" className="text-blue-500">
                    {t("About Us")}
                </LinkLocalized>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loaderData.data.map((item: MusicType) => (
                    <LinkLocalized
                        key={item._id}
                        to={`/${item.slug_name_music}`}
                        className="flex flex-col items-center justify-center  gap-4"
                    >
                        {item.name_music}
                        <img className="rounded-2xl" src={item.image_music} alt={item.name_music} />
                    </LinkLocalized>
                ))}
            </div>
        </div>
    );
}
