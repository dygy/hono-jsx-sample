import { BaseLayout } from "@layouts/BaseLayout";
import { collections } from "@routes/collections";
import { pages } from "@routes/pages";
import { products } from "@routes/products";
import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-pages";
import type { PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import type { Metadata } from "./types";

const app = new Hono();

app.get(
	"*",
	jsxRenderer(
		({ children, title }: PropsWithChildren<Metadata>) => {
			return <BaseLayout title={title}>{children}</BaseLayout>;
		},
		{
			docType: true,
		},
	),
);

app.get("/static/*", serveStatic());

app.route("/", pages);
app.route("/collection", collections);
app.route("/product", products);

app.get("*", (ctx) => {
	ctx.status(404);
	return ctx.render(<h1>404</h1>);
});

export default app;
