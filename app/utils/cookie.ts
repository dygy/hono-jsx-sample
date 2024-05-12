import { getCookie } from "hono/cookie";
import { Context } from "hono/dist/types";

export function decodeBase64(base64: string) {
  const binString = atob(base64);
  const array = Uint8Array.from(binString, (char) => char.codePointAt(0) ?? 0);
  return new TextDecoder().decode(array);
}

export function getRawCookie(c: Context) {
  return getCookie(c, process.env.NODE_PUBLIC_COOKIE_NAME as string);
}

export function readCookie(c: Context) {
  const cookie = getRawCookie(c);

  if (!cookie) {
    return c.redirect("https://google.com");
  }
  return JSON.parse(decodeBase64(cookie)) as object;
}
