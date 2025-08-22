import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    index("routes/root-redirect.tsx"),
    route(":lng", "routes/index.tsx"),
    route(":lng/:slug", "routes/slug.tsx"),
    layout("./routes/about-us/layout.tsx", [
        route(":lng/gioi-thieu", "./routes/about-us/gioi-thieu.tsx"),
        route(":lng/about-us", "./routes/about-us/index.tsx"),
    ]),
] satisfies RouteConfig;
