import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        secrets: ["123123"],
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
