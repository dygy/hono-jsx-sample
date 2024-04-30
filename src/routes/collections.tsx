import { Hono } from "hono";

export const collections = new Hono();

collections.get("/:id", (c) => {
  const name = c.req.param("id");
  return c.render(<h1>collection name: {name}</h1>);
});
