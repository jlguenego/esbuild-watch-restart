#!/usr/bin/env node

import esbuild from "esbuild";
import { spawn } from "child_process";
import { program } from "commander";

program.option("--build-only");
program.parse();

const options = program.opts();

(async () => {
  // last argument is the entrypoint
  const entryPoint = process.argv[process.argv.length - 1];
  let child;

  const plugins = [];
  if (options.buildOnly === undefined) {
    console.log("about to push plugin");
    plugins.push({
      name: "rebuild-notify",
      setup(build) {
        build.onEnd((result) => {
          console.log(`build ended with ${result.errors.length} errors`);
          if (child) {
            child.kill("SIGINT");
            child.kill("SIGKILL");
          }
          child = spawn("node", ["--enable-source-maps", `dist/server.js`]);
          child.on("close", function (code) {
            console.log("closing code: " + code);
          });
          child.stdout.on("data", function (data) {
            console.log("" + data);
          });
          child.stderr.on("data", function (data) {
            console.log("" + data);
          });
        });
      },
    });
  }
  const ctx = await esbuild.context({
    entryPoints: [entryPoint],
    bundle: true,
    outfile: "dist/server.js",
    format: "esm",
    platform: "node",
    sourcemap: true,
    packages: "external",
    plugins: plugins,
    color: false,
  });
  if (options.buildOnly) {
    console.log("Starting esbuild in build mode");
    await ctx.rebuild();
    await ctx.dispose();
    return;
  }
  console.log("Starting esbuild in watch mode");
  await ctx.watch();
})();
