import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    index("routes/index.tsx"),
    route("api/locales/:lng/:ns", "routes/$.tsx"),
    route(":slug", "routes/slug.tsx"),
    layout("./routes/about-us/layout.tsx", [
        route("/gioi-thieu", "./routes/about-us/gioi-thieu.tsx"),
        route("/about-us", "./routes/about-us/index.tsx"),
    ]),
] satisfies RouteConfig;
