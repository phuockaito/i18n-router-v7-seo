import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
    prerender: () => {
        return ["/", "/vi/gioi-thieu", "/en/about-us"];
    },
} satisfies Config;
