import honox from "honox/vite";
import { type ConfigEnv, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";
import { ViteMinifyPlugin } from "vite-plugin-minify";

const commonJS = commonjs({
  filter(id) {
    // `node_modules` is excluded by default, so we need to include it explicitly
    // https://github.com/vite-plugin/vite-plugin-commonjs/blob/v0.7.0/src/index.ts#L125-L127
    if (
      id.includes("node_modules/") &&
      !!["date-fns", "@babel", "lodash"].find((dependency) => {
        return id.includes(dependency);
      })
    ) {
      return true;
    }
  },
});

const baseConfig = (env: ConfigEnv["mode"]) => ({
  ssr: {
    external: ["@prisma/client"],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr:
      env === "development"
        ? true
        : {
            host: "discover-city-stage.tawasal.ae",
            port: 3001,
            protocol: "wss",
          },
    warmup: {
      clientFiles: ["./app/islands/**/*.tsx", "./src/utils/**/*.ts"],
      ssrFiles: [
        "./app/components/**/*.tsx",
        "./app/components/**/*.tsx",
        "./src/utils/**/*.ts",
      ],
    },
  },
});

export default defineConfig((params) => {
  console.log(params.mode);
  if (params.mode === "production") {
    return {
      ...baseConfig(params.mode),
      plugins: [tsconfigPaths(), honox({}), ViteMinifyPlugin({}), commonJS],
      optimizeDeps: {
        include: ["date-fns", "lodash"],
      },
      build: {
        minify: "terser",
        commonjsOptions: { transformMixedEsModules: true },
        rollupOptions: {
          input: ["public/static/style.css"],
          output: {
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
      },
    };
  }
  return {
    ...baseConfig(params.mode),
    plugins: [tsconfigPaths(), honox(), ViteMinifyPlugin({}), commonJS],
    optimizeDeps: {
      include: ["date-fns", "lodash"],
    },
    rollupOptions: {
      output: {
        dir: "./dist/static",
      },
    },
    emptyOutDir: true,
    copyPublicDir: true,
    build: {
      commonjsOptions: { transformMixedEsModules: true },
      rollupOptions: {
        input: ["public/static/style.css"],
        output: {
          assetFileNames: "static/assets/[name].[ext]",
        },
      },
    },
    preview: {
      port: 3000,
      host: "0.0.0.0",
      warmup: {
        clientFiles: ["./app/islands/**/*.tsx", "./src/utils/**/*.ts"],
        ssrFiles: [
          "./app/components/**/*.tsx",
          "./app/components/**/*.tsx",
          "./src/utils/**/*.ts",
        ],
      },
    },
  };
});
