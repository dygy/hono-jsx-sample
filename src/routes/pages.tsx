import { About, aboutMeta } from "@pages/About";
import { Home, homeMeta } from "@pages/Home";
import { type Context, Hono } from "hono";
import type { Metadata } from "../types";

export const pages = new Hono();
async function render(page: JSX.Element, metadata: Metadata, ctx: Context) {
	// @ts-ignore
	return ctx.render(page, metadata);
}
pages.get("/", (ctx) => render(<Home />, homeMeta, ctx));
pages.get("/about", (ctx) => render(<About />, aboutMeta, ctx));
