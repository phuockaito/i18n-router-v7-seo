import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
    prerender: async ({ getStaticPaths }) => {
        const paths = await getStaticPaths();
        return [
            "/",
            "/vi/gioi-thieu",
            "/en/about-us",
            ...paths,
        ];
    },
} satisfies Config;
