import type { Metadata } from "@utils/type/html";
import type { PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import { HasIslands } from "honox/server";

export default jsxRenderer(
	({ title, children, icon }: PropsWithChildren<Metadata>) => (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/x-icon" href={icon} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="/static/style.css" rel="stylesheet" />
				{import.meta.env.PROD ? (
					<HasIslands>
						<script type="module" src="/static/client.js" />
					</HasIslands>
				) : (
					<script type="module" src="/app/client.ts" />
				)}
				{title ? <title>{title}</title> : <></>}
			</head>
			<body className="bg-emerald-600 p-2 text-gray-100">{children}</body>
		</html>
	),
);
