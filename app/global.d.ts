declare module "hono" {
	import type { Metadata } from "@utils/type/html";
	type ContextRenderer = (
		content: string | Promise<string>,
		head?: Metadata,
	) => Response | Promise<Response>;
}
