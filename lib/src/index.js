#!/usr/bin/env node

import esbuild from "esbuild";
import { spawn } from "child_process";
import { program } from "commander";

program.option("--build-only");
program.parse();

const options = program.opts();
console.log("options: ", options);

(async () => {
  console.log("Starting esbuild in watch mode");
  // last argument is the entrypoint
  const entryPoint = process.argv[process.argv.length - 1];
  let child;

  const plugins = [];
  if (options.buildOnly === false) {
    plugins.push({
      name: "rebuild-notify",
      setup(build) {
        build.onEnd((result) => {
          console.log(`build ended with ${result.errors.length} errors`);
          if (options.buildOnly) {
            return;
          }
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
  });
  if (options.buildOnly) {
    await ctx.rebuild();
    await ctx.dispose();
    return;
  }
  await ctx.watch();
})();
