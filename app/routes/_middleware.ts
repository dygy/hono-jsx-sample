import { PrismaClient } from "@prisma/client";

import { createRoute } from "honox/factory";
import { readCookie } from "@utils/cookie";
import { getDictionary } from "@utils/i18n";

const prisma = new PrismaClient();
export default createRoute(async (c, next) => {
  if (c.req.method === "HEAD") {
    return c.newResponse(null, { status: 200 });
  }
  if (!c.get("prisma")) {
    c.set("prisma", prisma);
  }
  if (!c.get("cookie")) {
    c.set("cookie", readCookie(c));
  }
  if (!c.get("dict")) {
    c.set("dict", getDictionary(c.get("cookie").language));
  }
  await next();
});
