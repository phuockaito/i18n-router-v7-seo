import { PassThrough } from "node:stream";

import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";

import { createI18nextInstance, getLocaleFromRequest } from "@/middleware/i18next";

export const streamTimeout = 5_000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    entryContext: EntryContext,
) {
    return new Promise((resolve, reject) => {
        // Get locale from request and create i18next instance
        const locale = getLocaleFromRequest(request);
        const i18nInstance = createI18nextInstance(locale);

        let shellRendered = false;
        const userAgent = request.headers.get("user-agent");

        const readyOption: keyof RenderToPipeableStreamOptions =
            (userAgent && isbot(userAgent)) || entryContext.isSpaMode
                ? "onAllReady"
                : "onShellReady";

        const { pipe, abort } = renderToPipeableStream(
            <I18nextProvider i18n={i18nInstance}>
                <ServerRouter context={entryContext} url={request.url} />
            </I18nextProvider>,
            {
                [readyOption]() {
                    shellRendered = true;
                    const body = new PassThrough();
                    const stream = createReadableStreamFromReadable(body);

                    responseHeaders.set("Content-Type", "text/html");

                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: responseStatusCode,
                        }),
                    );

                    pipe(body);
                },
                onShellError(error: unknown) {
                    reject(error);
                },
                onError(error: unknown) {
                    responseStatusCode = 500;
                    if (shellRendered) console.error(error);
                },
            },
        );

        setTimeout(abort, streamTimeout + 1000);
    });
}
