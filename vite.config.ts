import pages from "@hono/vite-cloudflare-pages";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const baseConfig = {
  ssr: {
    external: ["@prisma/client", "@prisma/adapter-d1"],
  },
};

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      ...baseConfig,
      plugins: [client()],
      build: {
        commonjsOptions: { transformMixedEsModules: true, ignoreGlobal: true },
        rollupOptions: {
          input: ["./dist/static/style.css"],
          output: {
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
      },
    };
  }
  return {
    ...baseConfig,
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
      commonjsOptions: { transformMixedEsModules: true, ignoreGlobal: true },
      rollupOptions: {
        input: ["./dist/static/style.css"],
        output: {
          assetFileNames: "static/assets/[name].[ext]",
          entryFileNames: "_worker.js",
        },
      },
    },
  };
});
