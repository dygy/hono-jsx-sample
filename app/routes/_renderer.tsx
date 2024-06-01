import type { Metadata } from "@utils/type/html";
import type { PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import { HasIslands, Script } from "honox/server";
import { link } from "@utils/tailwind/base";
import { cn } from "@utils/helpers";

export default jsxRenderer(
  ({
    title,
    children,
    icon,
    cookie,
    enableScroll,
    prefetches,
  }: PropsWithChildren<Metadata>) => {
    const language = new Intl.Locale(cookie?.language ?? "en");

    return (
      <html
        className={cn(
          // @ts-expect-error lol it works, why error?
          language?.textInfo?.direction ?? "ltr",
          !enableScroll && "overflow-hidden",
        )}
        // @ts-expect-error lol it works, why error?
        dir={language?.textInfo?.direction}
        lang={cookie?.language ?? "en"}
      >
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/x-icon" href={icon} />
          <meta name="google" content="notranslate" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {prefetches}
          {import.meta.env.MODE === "production" ? (
            <HasIslands>
              <link rel="preload" href="/static/style.css" as="style" />
              <link rel="stylesheet" href="/static/style.css" as="style" />
              <script type="module" src="/static/client.js" />
            </HasIslands>
          ) : (
            <>
              <link rel="preload" href="/app/root.css" as="style" />
              <link rel="stylesheet" href="/app/root.css" as="style" />
              <Script src="/app/client.ts" />
            </>
          )}
          <title>{title ?? "HONOX"}</title>
        </head>
        <body className="flex h-screen flex-col items-stretch justify-between bg-emerald-600 text-gray-100">
          <header className="flex h-10 w-full items-center justify-center border-b border-gray-700 bg-lime-700 font-semibold">
            <h1>{title?.toUpperCase() || "no name"}</h1>
            <a
              href="/news/create"
              className="absolute top-1.5 ltr:right-2 rtl:left-2"
            >
              <button className="rounded-full bg-lime-400 px-2">+</button>
            </a>
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
