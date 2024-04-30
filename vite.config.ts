import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [client()],
			build: {
				rollupOptions: {
					input: ["/app/style.css"],
					output: {
						assetFileNames: "static/assets/[name].[ext]",
					},
				},
			},
		};
	}
	return {
		plugins: [
			tsconfigPaths(),
			honox(),
			pages(),
			mdx({
				jsxImportSource: "hono/jsx",
				remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			}),
		],
		rollupOptions: {
			output: {
				dir: "./dist/static",
			},
		},
		emptyOutDir: false,
		copyPublicDir: false,
		build: {
			rollupOptions: {
				input: ["/app/style.css"],
				output: {
					assetFileNames: "static/assets/[name].[ext]",
					entryFileNames: "_worker.js",
				},
			},
		},
	};
});
