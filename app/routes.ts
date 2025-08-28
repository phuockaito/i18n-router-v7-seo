import { index, layout, prefix, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    ...prefix("/", [
        index("routes/index.tsx"),
        route(":slug", "routes/slug.tsx"),
        route("/login", "routes/login/index.tsx"),
    ]),
    layout("./routes/about-us/layout.tsx", [
        route("/gioi-thieu", "./routes/about-us/gioi-thieu.tsx"),
        route("/about-us", "./routes/about-us/index.tsx"),
    ]),
] satisfies RouteConfig;
