import { CACHE_CONFIG, SUPPORTED_LANGUAGES, SUPPORTED_NAMESPACES } from "@/constants";
import type { LanguageType } from "@/types";

import resources from "../locales";

export async function loader({
    params,
    request,
}: {
    params: { lng: LanguageType; ns: string };
    request: Request;
}) {
    const { lng, ns } = params;

    // Validate language
    if (!lng || !SUPPORTED_LANGUAGES.includes(lng)) {
        return new Response("LanguageType not supported", { status: 400 });
    }

    // Validate namespace
    if (!ns || !SUPPORTED_NAMESPACES.includes(ns as any)) {
        return new Response("Namespace not found", { status: 404 });
    }

    // Get the translation data
    const translationData =
        resources[lng as keyof typeof resources]?.[ns as keyof typeof resources.vi];

    if (!translationData) {
        return new Response("Translation not found", { status: 404 });
    }

    // Create ETag for cache validation
    const etag = `"${lng}-${ns}-${JSON.stringify(translationData).length}"`;

    // Check if client has cached version
    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch === etag) {
        return new Response(null, { status: 304 });
    }

    return new Response(JSON.stringify(translationData), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=${CACHE_CONFIG.MAX_AGE}, stale-while-revalidate=${CACHE_CONFIG.STALE_WHILE_REVALIDATE}`,
            ETag: etag,
            Vary: "Accept-Language",
        },
    });
}
