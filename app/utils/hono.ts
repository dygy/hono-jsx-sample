import type { Metadata } from "@utils/type/html";
import type { Context } from "hono/dist/types";

export const render = (
  layout: JSX.Element,
  metadata: Metadata,
  ctx: Context,
) => {
  return ctx.render(
    layout,
    // @ts-expect-error add metadata to renderer
    { ...metadata, cookie: ctx.get("cookie") },
  );
};
