import type { Metadata } from "@utils/type/html";
import type { PrismaClient } from "@prisma/client";
import type { Dictionary, Language } from "@utils/i18n";

export type Cookie = { language: Language };

declare module "hono" {
  interface Env {
    Variables: {
      prisma: PrismaClient;
      cookie: Cookie;
      dict: Dictionary;
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
