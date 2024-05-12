import { createRoute } from "honox/factory";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import * as console from "node:console";

const CreatePostSchema = z.object({
  author_id: z.string(),
  text: z.string(),
  title: z.string(),
});

export const POST = createRoute(
  zValidator("form", CreatePostSchema),
  async (c) => {
    const { author_id, text, title } = c.req.valid("form");
    const resp = await c.get("prisma").post.create({
      data: {
        author_id,
        text,
        title,
      },
    });
    console.log(resp);
    return c.redirect("/news");
  },
);
