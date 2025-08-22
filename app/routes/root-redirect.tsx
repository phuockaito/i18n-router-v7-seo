import { redirect } from "react-router";

import { DEFAULT_LANGUAGE } from "@/constants";

export async function loader(): Promise<Response> {
    return redirect(`/${DEFAULT_LANGUAGE}`);
}

export default function RootRedirect() {
    return null;
}
