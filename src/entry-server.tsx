import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-pages";
import { jsxRenderer } from "hono/jsx-renderer";
import { pages } from "@routes/pages";
import { collections } from "@routes/collections";
import { products } from "@routes/products";
import { BaseLayout } from "@layouts/BaseLayout";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}

const app = new Hono();

app.get(
  "*",
  jsxRenderer(
    ({ children, title }) => {
      return <BaseLayout title={title}>{children}</BaseLayout>;
    },
    {
      docType: tue,
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
