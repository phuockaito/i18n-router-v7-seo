import { useTranslation } from "react-i18next";

import { LinkLocalized } from "@/components";
import { DOMAIN } from "@/constants";
import type { MusicType } from "@/types";

import type { Route } from "./+types/slug";

export function meta({
    loaderData,
    params,
}: {
    loaderData: MusicType | null;
    params: { lng?: string };
}) {
    return loaderData
        ? [
            { title: loaderData.name_music },
            { name: "description", content: loaderData.name_music },
            { name: "og:image", content: loaderData.image_music },
            { name: "og:title", content: loaderData.name_music },
            { name: "og:description", content: loaderData.name_music },
            { name: "og:url", content: `${DOMAIN}/${params.lng}/${loaderData.slug_name_music}` },
            { name: "og:type", content: "website" },
            { name: "og:site_name", content: "Kaito Music" },
            { name: "og:locale", content: "en_US" },
        ]
        : [
            { title: "Music not found" },
            { name: "description", content: "Music not found" },
            { name: "og:image", content: "" },
            { name: "og:title", content: "Music not found" },
            { name: "og:description", content: "Music not found" },
            { name: "og:url", content: `${DOMAIN}/${params.lng}` },
        ];
}
export async function loader({
    params,
}: Route.LoaderArgs) {
    const response = await fetch(
        `https://v2-api-kaito-music.vercel.app/api/music/get-music-name?_name=${params.slug}`,
    );
    const { data } = await response.json();
    return data;
}

export default function Home({ loaderData }: { loaderData: MusicType | null }) {
    const { t } = useTranslation();
    if (!loaderData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <LinkLocalized to="/" className="text-blue-500">
                    {t("Home")}
                </LinkLocalized>
                <h1>Music not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <LinkLocalized to="/" className="text-blue-500">
                {t("Home")}
            </LinkLocalized>
            <h1>{loaderData.name_music}</h1>
            <p>{loaderData.name_singer}</p>
            <img className="rounded-2xl" src={loaderData.image_music} alt={loaderData.name_music} />
            <audio src={loaderData.src_music} controls />
        </div>
    );
}
