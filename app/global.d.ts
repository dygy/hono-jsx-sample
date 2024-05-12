import type { Metadata } from "@utils/type/html";
import { ENV } from "../env";
import { PrismaClient } from "@prisma/client";

declare module "hono" {
  interface Env {
    Variables: {
      prisma: PrismaClient;
    };
    Bindings: {
      DB: D1Database;
    };
  }
  type ContextRenderer = (
    content: string | Promise<string>,
    head?: Metadata,
  ) => Response | Promise<Response>;
}
