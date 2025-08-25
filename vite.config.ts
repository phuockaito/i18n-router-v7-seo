import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import devtoolsJson from 'vite-plugin-devtools-json';
import tsconfigPaths from "vite-tsconfig-paths";


// export default defineConfig({
//     plugins: [tsconfigPaths(), tailwindcss(), reactRouter(), devtoolsJson()],
//     server: { port: 8080 },
// });

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [tsconfigPaths(), tailwindcss(), reactRouter(), devtoolsJson()],
        server: {
            port: 8080,
            proxy: {
                "/api": {
                    target: env.VITE_APP_URL_API,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    }
})
