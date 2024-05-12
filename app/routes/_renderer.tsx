import type { Metadata } from "@utils/type/html";
import type { PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import { HasIslands } from "honox/server";
import { link } from "@utils/tailwind/base";

export default jsxRenderer(
  ({ title, children, icon, cookie }: PropsWithChildren<Metadata>) => {
    const language = new Intl.Locale(cookie?.language ?? "en");

    return (
      // @ts-expect-error lol it works, why error?
      <html dir={language.textInfo.direction} lang={cookie?.language ?? "en"}>
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/x-icon" href={icon} />
          <meta name="google" content="notranslate" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/static/style.css" rel="stylesheet" />
          {import.meta.env.PROD ? (
            <HasIslands>
              <script type="module" src="/static/client.js" />
            </HasIslands>
          ) : (
            <script type="module" src="/app/client.ts" />
          )}
          <title>{title ?? "HONOX"}</title>
        </head>
        <body className="flex h-screen flex-col items-stretch justify-between bg-emerald-600 text-gray-100">
          <header className="flex h-10 w-full items-center justify-center border-b border-gray-700 bg-lime-700 font-semibold">
            {title?.toUpperCase() || "no name"}
          </header>
          <main className="h-[inherit] p-2">{children}</main>
          <footer className="flex h-10 w-full items-center justify-around border-t border-gray-700 bg-lime-700 font-serif">
            <a className={link} href="/about">
              about
            </a>
            <a className={link} href="/">
              home
            </a>
            <a className={link} href="/news">
              news
            </a>
          </footer>
        </body>
      </html>
    );
  },
);
