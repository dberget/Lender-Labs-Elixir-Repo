const esbuild = require("esbuild");

const NodeGlobalsPolyfillPlugin = require("@esbuild-plugins/node-globals-polyfill").NodeGlobalsPolyfillPlugin;

const NodeModulesPolyfillPlugin =
  require("@esbuild-plugins/node-modules-polyfill").NodeModulesPolyfillPlugin;

const args = process.argv.slice(2);
const watch = args.includes("--watch");
const deploy = args.includes("--deploy");

const loader = {};

const plugins = [
  NodeModulesPolyfillPlugin(),
  NodeGlobalsPolyfillPlugin({
    process: true,
    buffer: true,
    crypto: true,
    assert: true,
    zlib: true,
    path: true,
    define: {
      global: 'globalThis'
  },
  }),
];

let opts = {
  entryPoints: ["js/app.jsx"],
  bundle: true,
  target: "esnext",
  outdir: "../priv/static/assets",
  logLevel: "info",
  loader,
  plugins,
};

if (watch) {
  opts = {
    ...opts,
    sourcemap: "inline",
  };
}

if (deploy) {
  opts = {
    ...opts,
    minify: true,
  };
}

const promise = esbuild.context(opts);

if (watch) {
  promise.then((result) => {
    process.stdin.on("close", () => {
      process.exit(0);
    });

    result.watch();
  });
}
