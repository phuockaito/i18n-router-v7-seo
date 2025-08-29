import { Button, Form, Input, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, redirect, useFetcher } from "react-router";

import { AccountApi } from "@/api";
import { commitSession, getSession } from "@/sessions.server";

import type { Route } from "../+types";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");
    if (accessToken) {
        return redirect("/");
    }
    return Response.json(
        {
            error: "Logged in successfully",
        },
        { status: 400 },
    );
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const session = await getSession(request.headers.get("Cookie"));
    try {
        const { accessToken } = await AccountApi.login({ email, password });
        session.set("accessToken", accessToken);
        return redirect("/", {
            headers: { "Set-Cookie": await commitSession(session) },
        });
    } catch {
        return Response.json(
            {
                error: "Invalid email or password",
            },
            { status: 400 },
        );
    }
}

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const fetcher = useFetcher();
    const { t } = useTranslation();
    const handleSubmit = (data: LoginForm) => {
        fetcher.submit(
            {
                email: data.email,
                password: data.password,
            },
            {
                method: "POST",
            },
        );
    };

    React.useEffect(() => {
        if (fetcher.data) {
            message.error(t(fetcher.data.error));
        }
    }, [fetcher.data, t]);

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] max-w-md mx-auto w-full">
            <div className="w-full max-w-2xl p-6 shadow-md bg-white rounded-lg">
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    disabled={fetcher.state === "submitting"}
                    size="large"
                >
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4">Login</h1>
                        <Link to="/">{t("Home")}</Link>
                    </div>
                    <Form.Item<LoginForm>
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: t("Please input your email!") },
                            { type: "email", message: t("Please input a valid email!") },
                        ]}
                    >
                        <Input placeholder={t("Enter your email")} />
                    </Form.Item>
                    <Form.Item<LoginForm>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: t("Please input your password!") }]}
                    >
                        <Input.Password placeholder={t("Enter your password")} />
                    </Form.Item>
                    <Button
                        className="w-full"
                        type="primary"
                        htmlType="submit"
                        loading={fetcher.state === "submitting"}
                    >
                        {t("Submit")}
                    </Button>
                </Form>
            </div>
        </div>
    );
}
