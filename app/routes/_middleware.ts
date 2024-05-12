import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

import { createRoute } from "honox/factory";

export default createRoute(async (c, next) => {
  if (!c.get("prisma")) {
    const prisma = new PrismaClient();
    c.set("prisma", prisma);
  }
  await next();
});
