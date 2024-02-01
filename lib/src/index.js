#!/usr/bin/env node

import esbuild from "esbuild";

console.log("Starting esbuild in watch mode");

process.argv;
console.log("process.argv: ", process.argv);

const entryPoints = process.argv[2];

// start esbuild in watch mode
const config = {
  entryPoints: [entryPoints],
  bundle: true,
  outdir: "dist",
  platform: "node",
  external: ["emitter"],
  plugins: [
    {
      name: "rebuild-notify",
      setup(build) {
        build.onEnd((result) => {
          console.log(`build ended with ${result.errors.length} errors`);
          // HERE: somehow restart the server from here, e.g., by sending a signal that you trap and react to inside the server.
        });
      },
    },
  ],
};

const run = async () => {
  const ctx = await esbuild.context(config);
  await ctx.watch();
};

run();
