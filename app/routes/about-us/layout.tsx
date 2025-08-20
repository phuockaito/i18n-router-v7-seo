import { Outlet } from "react-router";

import { i18nextMiddleware } from "@/middleware/i18next";

import type { Route } from "../+types";
export function meta({ loaderData }: Route.MetaArgs) {
    return [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const { t } = i18nextMiddleware(request);
    return {
        title: t("About Us"),
        description: t("About Us"),
    };
}
export default function AboutUsLayout() {
    return <Outlet />;
}
