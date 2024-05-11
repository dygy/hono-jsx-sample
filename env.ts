import dotenv from "dotenv";

dotenv.config({
  path: [".env"],
});

/**
 * This file handles plain `.env` variables for the application.
 * For variables not defined in `.env` or those needing transform, refer to `@/app-config`.
 */

export const ENV = (process.env.NODE_ENV || null) as "development" | "production" | null;
export const PORT = process.env.PORT || "0";
export const VERSION = (process.env.VERSION as string | undefined) || "dev";
export const BUILD_DATE = (process.env.BUILD_DATE as string | undefined) || new Date().toISOString();
