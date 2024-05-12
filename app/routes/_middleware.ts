import { PrismaClient } from "@prisma/client";

import { createRoute } from "honox/factory";
import { readCookie } from "@utils/cookie";

export default createRoute(async (c, next) => {
  if (!c.get("prisma")) {
    const prisma = new PrismaClient();
    c.set("prisma", prisma);
  }
  if (!c.get("cookie")) {
    c.set("cookie", readCookie(c));
  }
  await next();
});
