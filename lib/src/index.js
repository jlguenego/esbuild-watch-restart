#!/usr/bin/env node

import esbuild from "esbuild";
import { spawn } from "child_process";

console.log("Starting esbuild in watch mode");

const entryPoints = process.argv[2];

(async () => {
  let child;
  const ctx = await esbuild.context({
    entryPoints: [entryPoints],
    bundle: true,
    outfile: "dist/server.js",
    format: "esm",
    platform: "node",
    packages: "external",
    plugins: [
      {
        name: "rebuild-notify",
        setup(build) {
          build.onEnd((result) => {
            console.log(`build ended with ${result.errors.length} errors`);
            if (child) {
              child.kill("SIGINT");
              child.kill("SIGKILL");
            }
            child = spawn("node", [`dist/server.js`]);
            child.on("close", function (code) {
              console.log("closing code: " + code);
            });
            child.stdout.on("data", function (data) {
              console.log("stdout: " + data);
            });
            child.stderr.on("data", function (data) {
              console.log("stderr: " + data);
            });
            // HERE: somehow restart the server from here, e.g., by sending a signal that you trap and react to inside the server.
          });
        },
      },
    ],
  });
  await ctx.watch();
})();
