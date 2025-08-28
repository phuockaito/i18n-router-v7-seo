import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import { Link, redirect, useFetcher } from "react-router";

import { useAccount } from "@/hooks";
import { commitSession, getSession } from "@/sessions.server";

import type { Route } from "../+types";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");
    if (accessToken) {
        return redirect("/");
    }
    return {};
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const accessToken = formData.get("accessToken");
    const session = await getSession(request.headers.get("Cookie"));
    session.set("accessToken", accessToken);
    return redirect("/", {
        headers: { "Set-Cookie": await commitSession(session) },
    });
}
interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const fetcher = useFetcher();
    const { mutationLogin } = useAccount();
    const { t } = useTranslation();
    const handleSubmit = (data: LoginForm) => {
        mutationLogin.mutate(data, {
            onSuccess: (data) => {
                fetcher.submit(
                    {
                        accessToken: data.accessToken,
                    },
                    {
                        method: "POST",
                    },
                );
                message.success("Login successful");
            },
            onError: (error: any) => {
                message.error(error.message);
            },
        });
    };

    return (
        <div>
            <div className="flex justify-center items-center h-screen max-w-md mx-auto w-full">
                <Form
                    className="w-full"
                    layout="vertical"
                    onFinish={handleSubmit}
                    disabled={mutationLogin.isPending}
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
                            { required: true, message: "Please input your email!" },
                            { type: "email", message: "Please input a valid email!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<LoginForm>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button
                        className="w-full"
                        type="primary"
                        htmlType="submit"
                        loading={mutationLogin.isPending}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
