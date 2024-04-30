import type { PropsWithChildren } from "hono/jsx";
import type { Metadata } from "../types";

export const BaseLayout = (props: PropsWithChildren<Metadata>) => (
	<html lang="en">
		<head>
			<meta charSet="UTF-8" />
			<link rel="icon" type="image/x-icon" href={props.icon} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link href="/static/style.css" rel="stylesheet" />

			<title>{props.title}</title>
		</head>
		<body className="bg-emerald-600 p-2 text-gray-100">
			{props.children}
			{import.meta.env.PROD ? (
				<>
					<script type="module" src="/static/entry-client.js" />
				</>
			) : (
				<>
					<script type="module" src={"/src/entry-client.tsx"} />
				</>
			)}
		</body>
	</html>
);
