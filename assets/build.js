const esbuild = require("esbuild");

const stdLibBrowser = require("node-stdlib-browser");
const fs = require("fs");
const path = require("path");
const plugin = require("node-stdlib-browser/helpers/esbuild/plugin");

const outdirectory = "../priv/static/assets";

const args = process.argv.slice(2);

const watch = args.includes("--watch");
const deploy = args.includes("--deploy");

fs.readdir(outdirectory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (
      file.endsWith(".js") ||
      file.endsWith(".css") ||
      file.endsWith(".js.map")
    ) {
      fs.unlink(path.join(outdirectory, file), (err) => {
        if (err) throw err;
      });
    }
  }
});

async function dev() {
  console.log("Building development bundle ⏳");

  const ctx = await esbuild.context({
    entryPoints: ["js/app.jsx"],
    outdir: outdirectory,
    sourcemap: "inline",
    bundle: true,
    define: {
      "process.env.NODE_ENV": '"development"',
      global: "global",
      process: "process",
      Buffer: "Buffer",
    },
    minify: false,
    inject: [require.resolve("node-stdlib-browser/helpers/esbuild/shim")],
    plugins: [plugin(stdLibBrowser)],
    loader: {
      ".js": "jsx",
    },
  });

  console.log("Development bundle built ✅");

  ctx.watch();
}

async function prod() {
  console.log("Build started ⏳");

  await esbuild.build({
    entryPoints: ["./js/app.jsx"],
    outdir: outdirectory,
    bundle: true,
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "global",
      process: "process",
      Buffer: "Buffer",
    },
    minify: true,
    inject: [require.resolve("node-stdlib-browser/helpers/esbuild/shim")],
    plugins: [plugin(stdLibBrowser)],
    loader: {
      ".js": "jsx",
    },
  });

  console.log("Build completed ✅");

  //   promise.then((result) => {
  //     process.stdin.on("close", () => {
  //       process.exit(0);
  //     });

  //     result.watch();
  //   });
}

// Builds the bundle for dvelopment and runs a local web server
// with livereload when -watch is set
watch && dev();

// Builds optimized bundle for production
deploy && prod();

// const loader = {};

// const plugins = [
//   NodeModulesPolyfillPlugin(),
//   NodeGlobalsPolyfillPlugin({
//     process: true,
//     buffer: true,
//     path: true,
//     define: {
//       "process.env.NODE_ENV": '"development"',
//       global: "global",
//       process: "process",
//       Buffer: "Buffer",
//     },
//   }),
// ];

// let opts = {
//   entryPoints: ["js/app.jsx"],
//   bundle: true,
//   target: "esnext",
//   outdir: "../priv/static/assets",
//   logLevel: "info",
//   loader,
//   plugins,
// };

// if (watch) {
//   opts = {
//     ...opts,
//     sourcemap: "inline",
//   };
// }

// if (deploy) {
//   opts = {
//     ...opts,
//     minify: true,
//   };
// }

// if (watch) {
//   const promise = esbuild.context(opts);

//   promise.then((result) => {
//     process.stdin.on("close", () => {
//       process.exit(0);
//     });

//     result.watch();
//   });
// }

// if (deploy) {
//   esbuild.build(opts);
// }
