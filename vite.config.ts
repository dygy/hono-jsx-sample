import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import pages from "@hono/vite-cloudflare-pages";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [tsconfigPaths()],
      build: {
        minify: true,
        cssMinify: true,
        lib: {
          entry: "./src/entry-client.tsx",
          formats: ["es"],
          fileName: "entry-client",
          name: "client",
        },
        rollupOptions: {
          output: {
            dir: "./dist/static",
          },
        },
        emptyOutDir: false,
        copyPublicDir: false,
      },
    };
  } else {
    return {
      plugins: [
        pages({
          entry: "./src/entry-server.tsx",
        }),
        devServer({
          entry: "./src/entry-server.tsx",
        }),
        tsconfigPaths(),
      ],
      build: {
        rollupOptions: {
          output: {
            entryFileNames: "_worker.js",
          },
        },
      },
    };
  }
});
