import { Hono } from "hono";

export const products = new Hono();

products.get("/:id", (ctx) => {
  const name = ctx.req.param("id");
  return ctx.render(<h1>Product name: {name}</h1>);
});
