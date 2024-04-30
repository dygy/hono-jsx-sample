import { Hono } from "hono";
import { About, aboutMeta } from "@pages/About";
import { Home, homeMeta } from "@pages/Home";

export const pages = new Hono();

pages.get("/", (ctx) => ctx.render(<Home />, homeMeta));
pages.get("/about", (ctx) => ctx.render(<About />, aboutMeta));
