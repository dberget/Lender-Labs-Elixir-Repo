// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"brz8p":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a3aa14d48c440535";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"2Bu50":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WalletConnectClient", ()=>(0, _signClientDefault.default));
var _adapterJs = require("./adapter.js");
parcelHelpers.exportAll(_adapterJs, exports);
var _errorsJs = require("./errors.js");
parcelHelpers.exportAll(_errorsJs, exports);
var _signClient = require("@walletconnect/sign-client");
var _signClientDefault = parcelHelpers.interopDefault(_signClient);

},{"./adapter.js":"iSNIz","./errors.js":"720YK","@walletconnect/sign-client":"jFnQj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iSNIz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WalletConnectChainID", ()=>WalletConnectChainID);
parcelHelpers.export(exports, "WalletConnectRPCMethods", ()=>WalletConnectRPCMethods);
parcelHelpers.export(exports, "WalletConnectWallet", ()=>WalletConnectWallet);
var _web3Js = require("@solana/web3.js");
var _qrcodeModal = require("@walletconnect/qrcode-modal");
var _qrcodeModalDefault = parcelHelpers.interopDefault(_qrcodeModal);
var _signClient = require("@walletconnect/sign-client");
var _signClientDefault = parcelHelpers.interopDefault(_signClient);
var _utils = require("@walletconnect/utils");
var _bs58 = require("bs58");
var _bs58Default = parcelHelpers.interopDefault(_bs58);
var _errorsJs = require("./errors.js");
var Buffer = require("448a0d04dc142be5").Buffer;
var WalletConnectChainID;
(function(WalletConnectChainID) {
    WalletConnectChainID["Mainnet"] = "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ";
    WalletConnectChainID["Devnet"] = "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
})(WalletConnectChainID || (WalletConnectChainID = {}));
var WalletConnectRPCMethods;
(function(WalletConnectRPCMethods) {
    WalletConnectRPCMethods["signTransaction"] = "solana_signTransaction";
    WalletConnectRPCMethods["signMessage"] = "solana_signMessage";
})(WalletConnectRPCMethods || (WalletConnectRPCMethods = {}));
const getConnectParams = (chainId)=>({
        requiredNamespaces: {
            solana: {
                chains: [
                    chainId
                ],
                methods: [
                    WalletConnectRPCMethods.signTransaction,
                    WalletConnectRPCMethods.signMessage
                ],
                events: []
            }
        }
    });
class WalletConnectWallet {
    constructor(config){
        this._options = config.options;
        this._network = config.network;
    }
    async connect() {
        const client = this._client ?? await (0, _signClientDefault.default).init(this._options);
        const sessions = client.find(getConnectParams(this._network)).filter((s)=>s.acknowledged);
        if (sessions.length) {
            // select last matching session
            this._session = sessions[sessions.length - 1];
            // We assign this variable only after we're sure we've received approval
            this._client = client;
            return {
                publicKey: this.publicKey
            };
        } else {
            const { uri , approval  } = await client.connect(getConnectParams(this._network));
            return new Promise((resolve, reject)=>{
                if (uri) (0, _qrcodeModalDefault.default).open(uri, ()=>{
                    reject(new (0, _errorsJs.QRCodeModalError)());
                });
                approval().then((session)=>{
                    this._session = session;
                    // We assign this variable only after we're sure we've received approval
                    this._client = client;
                    resolve({
                        publicKey: this.publicKey
                    });
                }).catch(reject).finally(()=>{
                    (0, _qrcodeModalDefault.default).close();
                });
            });
        }
    }
    async disconnect() {
        if (this._client && this._session) {
            await this._client.disconnect({
                topic: this._session.topic,
                reason: (0, _utils.getSdkError)("USER_DISCONNECTED")
            });
            this._session = undefined;
        } else throw new (0, _errorsJs.ClientNotInitializedError)();
    }
    get client() {
        if (this._client) // TODO: using client.off throws an error
        return Object.assign({}, this._client, {
            off: this._client.removeListener
        });
        else throw new (0, _errorsJs.ClientNotInitializedError)();
    }
    get publicKey() {
        if (this._client && this._session) {
            const { address  } = (0, _utils.parseAccountId)(this._session.namespaces.solana.accounts[0]);
            return new (0, _web3Js.PublicKey)(address);
        } else throw new (0, _errorsJs.ClientNotInitializedError)();
    }
    async signTransaction(transaction) {
        if (this._client && this._session) {
            const { signature  } = await this._client.request({
                chainId: this._network,
                topic: this._session.topic,
                request: {
                    method: WalletConnectRPCMethods.signTransaction,
                    params: {
                        ...transaction
                    }
                }
            });
            transaction.addSignature(this.publicKey, Buffer.from((0, _bs58Default.default).decode(signature)));
            return transaction;
        } else throw new (0, _errorsJs.ClientNotInitializedError)();
    }
    async signMessage(message) {
        if (this._client && this._session) {
            const { signature  } = await this._client.request({
                // The network does not change the output of message signing, but this is a required parameter for SignClient
                chainId: this._network,
                topic: this._session.topic,
                request: {
                    method: WalletConnectRPCMethods.signMessage,
                    params: {
                        pubkey: this.publicKey.toString(),
                        message: (0, _bs58Default.default).encode(message)
                    }
                }
            });
            return (0, _bs58Default.default).decode(signature);
        } else throw new (0, _errorsJs.ClientNotInitializedError)();
    }
}

},{"448a0d04dc142be5":"fCgem","@solana/web3.js":"5JBKN","@walletconnect/qrcode-modal":"hLnYZ","@walletconnect/sign-client":"jFnQj","@walletconnect/utils":"o3k5L","bs58":"4ji3p","./errors.js":"720YK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hLnYZ":[function(require,module,exports) {
var process = require("5f2580c2f5ff341d");
function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}
var browserUtils = require("e84ef3eb274e59fc");
var QRCode = _interopDefault(require("806b369f53584fb2"));
var copy = _interopDefault(require("949d790a4b87ef99"));
var React = require("78bbc8c770bca4f7");
function open(uri) {
    QRCode.toString(uri, {
        type: "terminal"
    }).then(console.log);
}
var WALLETCONNECT_STYLE_SHEET = ':root {\n  --animation-duration: 300ms;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n.animated {\n  animation-duration: var(--animation-duration);\n  animation-fill-mode: both;\n}\n\n.fadeIn {\n  animation-name: fadeIn;\n}\n\n.fadeOut {\n  animation-name: fadeOut;\n}\n\n#walletconnect-wrapper {\n  -webkit-user-select: none;\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  pointer-events: none;\n  position: fixed;\n  top: 0;\n  user-select: none;\n  width: 100%;\n  z-index: 99999999999999;\n}\n\n.walletconnect-modal__headerLogo {\n  height: 21px;\n}\n\n.walletconnect-modal__header p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n  align-items: flex-start;\n  display: flex;\n  flex: 1;\n  margin-left: 5px;\n}\n\n.walletconnect-modal__close__wrapper {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  z-index: 10000;\n  background: white;\n  border-radius: 26px;\n  padding: 6px;\n  box-sizing: border-box;\n  width: 26px;\n  height: 26px;\n  cursor: pointer;\n}\n\n.walletconnect-modal__close__icon {\n  position: relative;\n  top: 7px;\n  right: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(45deg);\n}\n\n.walletconnect-modal__close__line1 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n}\n\n.walletconnect-modal__close__line2 {\n  position: absolute;\n  width: 100%;\n  border: 1px solid rgb(48, 52, 59);\n  transform: rotate(90deg);\n}\n\n.walletconnect-qrcode__base {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  background: rgba(37, 41, 46, 0.95);\n  height: 100%;\n  left: 0;\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  width: 100%;\n  will-change: opacity;\n  padding: 40px;\n  box-sizing: border-box;\n}\n\n.walletconnect-qrcode__text {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 10px 0 20px 0;\n  text-align: center;\n  width: 100%;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-qrcode__text {\n    font-size: 4vw;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-qrcode__text {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-qrcode__image {\n  width: calc(100% - 30px);\n  box-sizing: border-box;\n  cursor: none;\n  margin: 0 auto;\n}\n\n.walletconnect-qrcode__notification {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  font-size: 16px;\n  padding: 16px 20px;\n  border-radius: 16px;\n  text-align: center;\n  transition: all 0.1s ease-in-out;\n  background: white;\n  color: black;\n  margin-bottom: -60px;\n  opacity: 0;\n}\n\n.walletconnect-qrcode__notification.notification__show {\n  opacity: 1;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__header {\n    height: 130px;\n  }\n  .walletconnect-modal__base {\n    overflow: auto;\n  }\n}\n\n@media only screen and (min-device-width: 415px) and (max-width: 768px) {\n  #content {\n    max-width: 768px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 375px) and (max-width: 415px) {\n  #content {\n    max-width: 414px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (min-width: 320px) and (max-width: 375px) {\n  #content {\n    max-width: 375px;\n    box-sizing: border-box;\n  }\n}\n\n@media only screen and (max-width: 320px) {\n  #content {\n    max-width: 320px;\n    box-sizing: border-box;\n  }\n}\n\n.walletconnect-modal__base {\n  -webkit-font-smoothing: antialiased;\n  background: #ffffff;\n  border-radius: 24px;\n  box-shadow: 0 10px 50px 5px rgba(0, 0, 0, 0.4);\n  font-family: ui-rounded, "SF Pro Rounded", "SF Pro Text", medium-content-sans-serif-font,\n    -apple-system, BlinkMacSystemFont, ui-sans-serif, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,\n    "Open Sans", "Helvetica Neue", sans-serif;\n  margin-top: 41px;\n  padding: 24px 24px 22px;\n  pointer-events: auto;\n  position: relative;\n  text-align: center;\n  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);\n  will-change: transform;\n  overflow: visible;\n  transform: translateY(-50%);\n  top: 50%;\n  max-width: 500px;\n  margin: auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__base {\n    padding: 24px 12px;\n  }\n}\n\n.walletconnect-modal__base .hidden {\n  transform: translateY(150%);\n  transition: 0.125s cubic-bezier(0.4, 0, 1, 1);\n}\n\n.walletconnect-modal__header {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  left: 0;\n  justify-content: space-between;\n  position: absolute;\n  top: -42px;\n  width: 100%;\n}\n\n.walletconnect-modal__base .wc-logo {\n  align-items: center;\n  display: flex;\n  height: 26px;\n  margin-top: 15px;\n  padding-bottom: 15px;\n  pointer-events: auto;\n}\n\n.walletconnect-modal__base .wc-logo div {\n  background-color: #3399ff;\n  height: 21px;\n  margin-right: 5px;\n  mask-image: url("images/wc-logo.svg") center no-repeat;\n  width: 32px;\n}\n\n.walletconnect-modal__base .wc-logo p {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 600;\n  margin: 0;\n}\n\n.walletconnect-modal__base h2 {\n  color: rgba(60, 66, 82, 0.6);\n  font-size: 16px;\n  font-weight: 600;\n  letter-spacing: 0;\n  line-height: 1.1875em;\n  margin: 0 0 19px 0;\n  text-align: center;\n  width: 100%;\n}\n\n.walletconnect-modal__base__row {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  align-items: center;\n  border-radius: 20px;\n  cursor: pointer;\n  display: flex;\n  height: 56px;\n  justify-content: space-between;\n  padding: 0 15px;\n  position: relative;\n  margin: 0px 0px 8px;\n  text-align: left;\n  transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  will-change: transform;\n  text-decoration: none;\n}\n\n.walletconnect-modal__base__row:hover {\n  background: rgba(60, 66, 82, 0.06);\n}\n\n.walletconnect-modal__base__row:active {\n  background: rgba(60, 66, 82, 0.06);\n  transform: scale(0.975);\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n.walletconnect-modal__base__row__h3 {\n  color: #25292e;\n  font-size: 20px;\n  font-weight: 700;\n  margin: 0;\n  padding-bottom: 3px;\n}\n\n.walletconnect-modal__base__row__right {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n}\n\n.walletconnect-modal__base__row__right__app-icon {\n  border-radius: 8px;\n  height: 34px;\n  margin: 0 11px 2px 0;\n  width: 34px;\n  background-size: 100%;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-modal__base__row__right__caret {\n  height: 18px;\n  opacity: 0.3;\n  transition: 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  width: 8px;\n  will-change: opacity;\n}\n\n.walletconnect-modal__base__row:hover .caret,\n.walletconnect-modal__base__row:active .caret {\n  opacity: 0.6;\n}\n\n.walletconnect-modal__mobile__toggle {\n  width: 80%;\n  display: flex;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  border-radius: 8px;\n  margin-bottom: 18px;\n  background: #d4d5d9;\n}\n\n.walletconnect-modal__single_wallet {\n  display: flex;\n  justify-content: center;\n  margin-top: 7px;\n  margin-bottom: 18px;\n}\n\n.walletconnect-modal__single_wallet a {\n  cursor: pointer;\n  color: rgb(64, 153, 255);\n  font-size: 21px;\n  font-weight: 800;\n  text-decoration: none !important;\n  margin: 0 auto;\n}\n\n.walletconnect-modal__mobile__toggle_selector {\n  width: calc(50% - 8px);\n  background: white;\n  position: absolute;\n  border-radius: 5px;\n  height: calc(100% - 8px);\n  top: 4px;\n  transition: all 0.2s ease-in-out;\n  transform: translate3d(4px, 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle.right__selected .walletconnect-modal__mobile__toggle_selector {\n  transform: translate3d(calc(100% + 12px), 0, 0);\n}\n\n.walletconnect-modal__mobile__toggle a {\n  font-size: 12px;\n  width: 50%;\n  text-align: center;\n  padding: 8px;\n  margin: 0;\n  font-weight: 600;\n  z-index: 1;\n}\n\n.walletconnect-modal__footer {\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 768px) {\n  .walletconnect-modal__footer {\n    margin-top: 5vw;\n  }\n}\n\n.walletconnect-modal__footer a {\n  cursor: pointer;\n  color: #898d97;\n  font-size: 15px;\n  margin: 0 auto;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-modal__footer a {\n    font-size: 14px;\n  }\n}\n\n.walletconnect-connect__buttons__wrapper {\n  max-height: 44vh;\n}\n\n.walletconnect-connect__buttons__wrapper__android {\n  margin: 50% 0;\n}\n\n.walletconnect-connect__buttons__wrapper__wrap {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  margin: 10px 0;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__buttons__wrapper__wrap {\n    margin-top: 40px;\n  }\n}\n\n.walletconnect-connect__button {\n  background-color: rgb(64, 153, 255);\n  padding: 12px;\n  border-radius: 8px;\n  text-decoration: none;\n  color: rgb(255, 255, 255);\n  font-weight: 500;\n}\n\n.walletconnect-connect__button__icon_anchor {\n  cursor: pointer;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 8px;\n  width: 42px;\n  justify-self: center;\n  flex-direction: column;\n  text-decoration: none !important;\n}\n\n@media only screen and (max-width: 320px) {\n  .walletconnect-connect__button__icon_anchor {\n    margin: 4px;\n  }\n}\n\n.walletconnect-connect__button__icon {\n  border-radius: 10px;\n  height: 42px;\n  margin: 0;\n  width: 42px;\n  background-size: cover !important;\n  box-shadow: 0 4px 12px 0 rgba(37, 41, 46, 0.25);\n}\n\n.walletconnect-connect__button__text {\n  color: #424952;\n  font-size: 2.7vw;\n  text-decoration: none !important;\n  padding: 0;\n  margin-top: 1.8vw;\n  font-weight: 600;\n}\n\n@media only screen and (min-width: 768px) {\n  .walletconnect-connect__button__text {\n    font-size: 16px;\n    margin-top: 12px;\n  }\n}\n\n.walletconnect-search__input {\n  border: none;\n  background: #d4d5d9;\n  border-style: none;\n  padding: 8px 16px;\n  outline: none;\n  font-style: normal;\n  font-stretch: normal;\n  font-size: 16px;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  text-align: left;\n  border-radius: 8px;\n  width: calc(100% - 16px);\n  margin: 0;\n  margin-bottom: 8px;\n}\n';
// A type of promise-like that resolves synchronously and supports only one observer
var _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator"; // Asynchronously iterate through an object's values
var _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator"; // Asynchronously iterate on a value using it's async iterator if present, or its synchronous iterator if missing
function _catch(body, recover) {
    try {
        var result = body();
    } catch (e) {
        return recover(e);
    }
    if (result && result.then) return result.then(void 0, recover);
    return result;
} // Asynchronously await a promise and pass the result to a finally continuation
var WALLETCONNECT_LOGO_SVG_URL = "data:image/svg+xml,%3Csvg height='185' viewBox='0 0 300 185' width='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m61.4385429 36.2562612c48.9112241-47.8881663 128.2119871-47.8881663 177.1232091 0l5.886545 5.7634174c2.445561 2.3944081 2.445561 6.2765112 0 8.6709204l-20.136695 19.715503c-1.222781 1.1972051-3.2053 1.1972051-4.428081 0l-8.100584-7.9311479c-34.121692-33.4079817-89.443886-33.4079817-123.5655788 0l-8.6750562 8.4936051c-1.2227816 1.1972041-3.205301 1.1972041-4.4280806 0l-20.1366949-19.7155031c-2.4455612-2.3944092-2.4455612-6.2765122 0-8.6709204zm218.7677961 40.7737449 17.921697 17.546897c2.445549 2.3943969 2.445563 6.2764769.000031 8.6708899l-80.810171 79.121134c-2.445544 2.394426-6.410582 2.394453-8.85616.000062-.00001-.00001-.000022-.000022-.000032-.000032l-57.354143-56.154572c-.61139-.598602-1.60265-.598602-2.21404 0-.000004.000004-.000007.000008-.000011.000011l-57.3529212 56.154531c-2.4455368 2.394432-6.4105755 2.394472-8.8561612.000087-.0000143-.000014-.0000296-.000028-.0000449-.000044l-80.81241943-79.122185c-2.44556021-2.394408-2.44556021-6.2765115 0-8.6709197l17.92172963-17.5468673c2.4455602-2.3944082 6.4105989-2.3944082 8.8561602 0l57.3549775 56.155357c.6113908.598602 1.602649.598602 2.2140398 0 .0000092-.000009.0000174-.000017.0000265-.000024l57.3521031-56.155333c2.445505-2.3944633 6.410544-2.3945531 8.856161-.0002.000034.0000336.000068.0000673.000101.000101l57.354902 56.155432c.61139.598601 1.60265.598601 2.21404 0l57.353975-56.1543249c2.445561-2.3944092 6.410599-2.3944092 8.85616 0z' fill='%233b99fc'/%3E%3C/svg%3E";
var WALLETCONNECT_HEADER_TEXT = "WalletConnect";
var ANIMATION_DURATION = 300;
var DEFAULT_BUTTON_COLOR = "rgb(64, 153, 255)";
var WALLETCONNECT_WRAPPER_ID = "walletconnect-wrapper";
var WALLETCONNECT_STYLE_ID = "walletconnect-style-sheet";
var WALLETCONNECT_MODAL_ID = "walletconnect-qrcode-modal";
var WALLETCONNECT_CLOSE_BUTTON_ID = "walletconnect-qrcode-close";
var WALLETCONNECT_CTA_TEXT_ID = "walletconnect-qrcode-text";
var WALLETCONNECT_CONNECT_BUTTON_ID = "walletconnect-connect-button";
function Header(props) {
    return React.createElement("div", {
        className: "walletconnect-modal__header"
    }, React.createElement("img", {
        src: WALLETCONNECT_LOGO_SVG_URL,
        className: "walletconnect-modal__headerLogo"
    }), React.createElement("p", null, WALLETCONNECT_HEADER_TEXT), React.createElement("div", {
        className: "walletconnect-modal__close__wrapper",
        onClick: props.onClose
    }, React.createElement("div", {
        id: WALLETCONNECT_CLOSE_BUTTON_ID,
        className: "walletconnect-modal__close__icon"
    }, React.createElement("div", {
        className: "walletconnect-modal__close__line1"
    }), React.createElement("div", {
        className: "walletconnect-modal__close__line2"
    }))));
}
function ConnectButton(props) {
    return React.createElement("a", {
        className: "walletconnect-connect__button",
        href: props.href,
        id: WALLETCONNECT_CONNECT_BUTTON_ID + "-" + props.name,
        onClick: props.onClick,
        rel: "noopener noreferrer",
        style: {
            backgroundColor: props.color
        },
        target: "_blank"
    }, props.name);
}
var CARET_SVG_URL = "data:image/svg+xml,%3Csvg fill='none' height='18' viewBox='0 0 8 18' width='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath clip-rule='evenodd' d='m.586301.213898c-.435947.33907-.5144813.967342-.175411 1.403292l4.87831 6.27212c.28087.36111.28087.86677 0 1.22788l-4.878311 6.27211c-.33907.436-.260536 1.0642.175412 1.4033.435949.3391 1.064219.2605 1.403289-.1754l4.87832-6.2721c.84259-1.08336.84259-2.60034 0-3.68367l-4.87832-6.27212c-.33907-.4359474-.96734-.514482-1.403289-.175412z' fill='%233c4252' fill-rule='evenodd'/%3E%3C/svg%3E";
function WalletButton(props) {
    var color = props.color;
    var href = props.href;
    var name = props.name;
    var logo = props.logo;
    var onClick = props.onClick;
    return React.createElement("a", {
        className: "walletconnect-modal__base__row",
        href: href,
        onClick: onClick,
        rel: "noopener noreferrer",
        target: "_blank"
    }, React.createElement("h3", {
        className: "walletconnect-modal__base__row__h3"
    }, name), React.createElement("div", {
        className: "walletconnect-modal__base__row__right"
    }, React.createElement("div", {
        className: "walletconnect-modal__base__row__right__app-icon",
        style: {
            background: "url('" + logo + "') " + color,
            backgroundSize: "100%"
        }
    }), React.createElement("img", {
        src: CARET_SVG_URL,
        className: "walletconnect-modal__base__row__right__caret"
    })));
}
function WalletIcon(props) {
    var color = props.color;
    var href = props.href;
    var name = props.name;
    var logo = props.logo;
    var onClick = props.onClick;
    var fontSize = window.innerWidth < 768 ? (name.length > 8 ? 2.5 : 2.7) + "vw" : "inherit";
    return React.createElement("a", {
        className: "walletconnect-connect__button__icon_anchor",
        href: href,
        onClick: onClick,
        rel: "noopener noreferrer",
        target: "_blank"
    }, React.createElement("div", {
        className: "walletconnect-connect__button__icon",
        style: {
            background: "url('" + logo + "') " + color,
            backgroundSize: "100%"
        }
    }), React.createElement("div", {
        style: {
            fontSize: fontSize
        },
        className: "walletconnect-connect__button__text"
    }, name));
}
var GRID_MIN_COUNT = 5;
var LINKS_PER_PAGE = 12;
function LinkDisplay(props) {
    var android = browserUtils.isAndroid();
    var ref = React.useState("");
    var input = ref[0];
    var setInput = ref[1];
    var ref$1 = React.useState("");
    var filter = ref$1[0];
    var setFilter = ref$1[1];
    var ref$2 = React.useState(1);
    var page = ref$2[0];
    var setPage = ref$2[1];
    var links = filter ? props.links.filter(function(link) {
        return link.name.toLowerCase().includes(filter.toLowerCase());
    }) : props.links;
    var errorMessage = props.errorMessage;
    var grid = filter || links.length > GRID_MIN_COUNT;
    var pages = Math.ceil(links.length / LINKS_PER_PAGE);
    var range = [
        (page - 1) * LINKS_PER_PAGE + 1,
        page * LINKS_PER_PAGE
    ];
    var pageLinks = links.length ? links.filter(function(_, index) {
        return index + 1 >= range[0] && index + 1 <= range[1];
    }) : [];
    var hasPaging = !!(!android && pages > 1);
    var filterTimeout = undefined;
    function handleInput(e) {
        setInput(e.target.value);
        clearTimeout(filterTimeout);
        if (e.target.value) filterTimeout = setTimeout(function() {
            setFilter(e.target.value);
            setPage(1);
        }, 1000);
        else {
            setInput("");
            setFilter("");
            setPage(1);
        }
    }
    return React.createElement("div", null, React.createElement("p", {
        id: WALLETCONNECT_CTA_TEXT_ID,
        className: "walletconnect-qrcode__text"
    }, android ? props.text.connect_mobile_wallet : props.text.choose_preferred_wallet), !android && React.createElement("input", {
        className: "walletconnect-search__input",
        placeholder: "Search",
        value: input,
        onChange: handleInput
    }), React.createElement("div", {
        className: "walletconnect-connect__buttons__wrapper" + (android ? "__android" : grid && links.length ? "__wrap" : "")
    }, !android ? pageLinks.length ? pageLinks.map(function(entry) {
        var color = entry.color;
        var name = entry.name;
        var shortName = entry.shortName;
        var logo = entry.logo;
        var href = browserUtils.formatIOSMobile(props.uri, entry);
        var handleClickIOS = React.useCallback(function() {
            browserUtils.saveMobileLinkInfo({
                name: name,
                href: href
            });
        }, [
            pageLinks
        ]);
        return !grid ? React.createElement(WalletButton, {
            color: color,
            href: href,
            name: name,
            logo: logo,
            onClick: handleClickIOS
        }) : React.createElement(WalletIcon, {
            color: color,
            href: href,
            name: shortName || name,
            logo: logo,
            onClick: handleClickIOS
        });
    }) : React.createElement(React.Fragment, null, React.createElement("p", null, errorMessage.length ? props.errorMessage : !!props.links.length && !links.length ? props.text.no_wallets_found : props.text.loading)) : React.createElement(ConnectButton, {
        name: props.text.connect,
        color: DEFAULT_BUTTON_COLOR,
        href: props.uri,
        onClick: React.useCallback(function() {
            browserUtils.saveMobileLinkInfo({
                name: "Unknown",
                href: props.uri
            });
        }, [])
    })), hasPaging && React.createElement("div", {
        className: "walletconnect-modal__footer"
    }, Array(pages).fill(0).map(function(_, index) {
        var pageNumber = index + 1;
        var selected = page === pageNumber;
        return React.createElement("a", {
            style: {
                margin: "auto 10px",
                fontWeight: selected ? "bold" : "normal"
            },
            onClick: function() {
                return setPage(pageNumber);
            }
        }, pageNumber);
    })));
}
function Notification(props) {
    var show = !!props.message.trim();
    return React.createElement("div", {
        className: "walletconnect-qrcode__notification" + (show ? " notification__show" : "")
    }, props.message);
}
var formatQRCodeImage = function(data) {
    try {
        var result = "";
        return Promise.resolve(QRCode.toString(data, {
            margin: 0,
            type: "svg"
        })).then(function(dataString) {
            if (typeof dataString === "string") result = dataString.replace("<svg", '<svg class="walletconnect-qrcode__image"');
            return result;
        });
    } catch (e) {
        return Promise.reject(e);
    }
};
function QRCodeDisplay(props) {
    var ref = React.useState("");
    var notification = ref[0];
    var setNotification = ref[1];
    var ref$1 = React.useState("");
    var svg = ref$1[0];
    var setSvg = ref$1[1];
    React.useEffect(function() {
        try {
            return Promise.resolve(formatQRCodeImage(props.uri)).then(function(_formatQRCodeImage) {
                setSvg(_formatQRCodeImage);
            });
        } catch (e) {
            Promise.reject(e);
        }
    }, []);
    var copyToClipboard = function() {
        var success = copy(props.uri);
        if (success) {
            setNotification(props.text.copied_to_clipboard);
            setInterval(function() {
                return setNotification("");
            }, 1200);
        } else {
            setNotification("Error");
            setInterval(function() {
                return setNotification("");
            }, 1200);
        }
    };
    return React.createElement("div", null, React.createElement("p", {
        id: WALLETCONNECT_CTA_TEXT_ID,
        className: "walletconnect-qrcode__text"
    }, props.text.scan_qrcode_with_wallet), React.createElement("div", {
        dangerouslySetInnerHTML: {
            __html: svg
        }
    }), React.createElement("div", {
        className: "walletconnect-modal__footer"
    }, React.createElement("a", {
        onClick: copyToClipboard
    }, props.text.copy_to_clipboard)), React.createElement(Notification, {
        message: notification
    }));
}
function Modal(props) {
    var android = browserUtils.isAndroid();
    var mobile = browserUtils.isMobile();
    var whitelist = mobile ? props.qrcodeModalOptions && props.qrcodeModalOptions.mobileLinks ? props.qrcodeModalOptions.mobileLinks : undefined : props.qrcodeModalOptions && props.qrcodeModalOptions.desktopLinks ? props.qrcodeModalOptions.desktopLinks : undefined;
    var ref = React.useState(false);
    var loading = ref[0];
    var setLoading = ref[1];
    var ref$1 = React.useState(false);
    var fetched = ref$1[0];
    var setFetched = ref$1[1];
    var ref$2 = React.useState(!mobile);
    var displayQRCode = ref$2[0];
    var setDisplayQRCode = ref$2[1];
    var displayProps = {
        mobile: mobile,
        text: props.text,
        uri: props.uri,
        qrcodeModalOptions: props.qrcodeModalOptions
    };
    var ref$3 = React.useState("");
    var singleLinkHref = ref$3[0];
    var setSingleLinkHref = ref$3[1];
    var ref$4 = React.useState(false);
    var hasSingleLink = ref$4[0];
    var setHasSingleLink = ref$4[1];
    var ref$5 = React.useState([]);
    var links = ref$5[0];
    var setLinks = ref$5[1];
    var ref$6 = React.useState("");
    var errorMessage = ref$6[0];
    var setErrorMessage = ref$6[1];
    var getLinksIfNeeded = function() {
        if (fetched || loading || whitelist && !whitelist.length || links.length > 0) return;
        React.useEffect(function() {
            var initLinks = function() {
                try {
                    if (android) return Promise.resolve();
                    setLoading(true);
                    var _temp = _catch(function() {
                        var url = props.qrcodeModalOptions && props.qrcodeModalOptions.registryUrl ? props.qrcodeModalOptions.registryUrl : browserUtils.getWalletRegistryUrl();
                        return Promise.resolve(fetch(url)).then(function(registryResponse) {
                            return Promise.resolve(registryResponse.json()).then(function(_registryResponse$jso) {
                                var registry = _registryResponse$jso.listings;
                                var platform = mobile ? "mobile" : "desktop";
                                var _links = browserUtils.getMobileLinkRegistry(browserUtils.formatMobileRegistry(registry, platform), whitelist);
                                setLoading(false);
                                setFetched(true);
                                setErrorMessage(!_links.length ? props.text.no_supported_wallets : "");
                                setLinks(_links);
                                var hasSingleLink = _links.length === 1;
                                if (hasSingleLink) {
                                    setSingleLinkHref(browserUtils.formatIOSMobile(props.uri, _links[0]));
                                    setDisplayQRCode(true);
                                }
                                setHasSingleLink(hasSingleLink);
                            });
                        });
                    }, function(e) {
                        setLoading(false);
                        setFetched(true);
                        setErrorMessage(props.text.something_went_wrong);
                        console.error(e);
                    });
                    return Promise.resolve(_temp && _temp.then ? _temp.then(function() {}) : void 0);
                } catch (e) {
                    return Promise.reject(e);
                }
            };
            initLinks();
        });
    };
    getLinksIfNeeded();
    var rightSelected = mobile ? displayQRCode : !displayQRCode;
    return React.createElement("div", {
        id: WALLETCONNECT_MODAL_ID,
        className: "walletconnect-qrcode__base animated fadeIn"
    }, React.createElement("div", {
        className: "walletconnect-modal__base"
    }, React.createElement(Header, {
        onClose: props.onClose
    }), hasSingleLink && displayQRCode ? React.createElement("div", {
        className: "walletconnect-modal__single_wallet"
    }, React.createElement("a", {
        onClick: function() {
            return browserUtils.saveMobileLinkInfo({
                name: links[0].name,
                href: singleLinkHref
            });
        },
        href: singleLinkHref,
        rel: "noopener noreferrer",
        target: "_blank"
    }, props.text.connect_with + " " + (hasSingleLink ? links[0].name : "") + " ›")) : android || loading || !loading && links.length ? React.createElement("div", {
        className: "walletconnect-modal__mobile__toggle" + (rightSelected ? " right__selected" : "")
    }, React.createElement("div", {
        className: "walletconnect-modal__mobile__toggle_selector"
    }), mobile ? React.createElement(React.Fragment, null, React.createElement("a", {
        onClick: function() {
            return setDisplayQRCode(false), getLinksIfNeeded();
        }
    }, props.text.mobile), React.createElement("a", {
        onClick: function() {
            return setDisplayQRCode(true);
        }
    }, props.text.qrcode)) : React.createElement(React.Fragment, null, React.createElement("a", {
        onClick: function() {
            return setDisplayQRCode(true);
        }
    }, props.text.qrcode), React.createElement("a", {
        onClick: function() {
            return setDisplayQRCode(false), getLinksIfNeeded();
        }
    }, props.text.desktop))) : null, React.createElement("div", null, displayQRCode || !android && !loading && !links.length ? React.createElement(QRCodeDisplay, Object.assign({}, displayProps)) : React.createElement(LinkDisplay, Object.assign({}, displayProps, {
        links: links,
        errorMessage: errorMessage
    })))));
}
var de = {
    choose_preferred_wallet: "W\xe4hle bevorzugte Wallet",
    connect_mobile_wallet: "Verbinde mit Mobile Wallet",
    scan_qrcode_with_wallet: "Scanne den QR-code mit einer WalletConnect kompatiblen Wallet",
    connect: "Verbinden",
    qrcode: "QR-Code",
    mobile: "Mobile",
    desktop: "Desktop",
    copy_to_clipboard: "In die Zwischenablage kopieren",
    copied_to_clipboard: "In die Zwischenablage kopiert!",
    connect_with: "Verbinden mit Hilfe von",
    loading: "Laden...",
    something_went_wrong: "Etwas ist schief gelaufen",
    no_supported_wallets: "Es gibt noch keine unterst\xfctzten Wallet",
    no_wallets_found: "keine Wallet gefunden"
};
var en = {
    choose_preferred_wallet: "Choose your preferred wallet",
    connect_mobile_wallet: "Connect to Mobile Wallet",
    scan_qrcode_with_wallet: "Scan QR code with a WalletConnect-compatible wallet",
    connect: "Connect",
    qrcode: "QR Code",
    mobile: "Mobile",
    desktop: "Desktop",
    copy_to_clipboard: "Copy to clipboard",
    copied_to_clipboard: "Copied to clipboard!",
    connect_with: "Connect with",
    loading: "Loading...",
    something_went_wrong: "Something went wrong",
    no_supported_wallets: "There are no supported wallets yet",
    no_wallets_found: "No wallets found"
};
var es = {
    choose_preferred_wallet: "Elige tu billetera preferida",
    connect_mobile_wallet: "Conectar a billetera m\xf3vil",
    scan_qrcode_with_wallet: "Escanea el c\xf3digo QR con una billetera compatible con WalletConnect",
    connect: "Conectar",
    qrcode: "C\xf3digo QR",
    mobile: "M\xf3vil",
    desktop: "Desktop",
    copy_to_clipboard: "Copiar",
    copied_to_clipboard: "Copiado!",
    connect_with: "Conectar mediante",
    loading: "Cargando...",
    something_went_wrong: "Algo sali\xf3 mal",
    no_supported_wallets: "Todav\xeda no hay billeteras compatibles",
    no_wallets_found: "No se encontraron billeteras"
};
var fr = {
    choose_preferred_wallet: "Choisissez votre portefeuille pr\xe9f\xe9r\xe9",
    connect_mobile_wallet: "Se connecter au portefeuille mobile",
    scan_qrcode_with_wallet: "Scannez le QR code avec un portefeuille compatible WalletConnect",
    connect: "Se connecter",
    qrcode: "QR Code",
    mobile: "Mobile",
    desktop: "Desktop",
    copy_to_clipboard: "Copier",
    copied_to_clipboard: "Copi\xe9!",
    connect_with: "Connectez-vous \xe0 l'aide de",
    loading: "Chargement...",
    something_went_wrong: "Quelque chose a mal tourn\xe9",
    no_supported_wallets: "Il n'y a pas encore de portefeuilles pris en charge",
    no_wallets_found: "Aucun portefeuille trouv\xe9"
};
var ko = {
    choose_preferred_wallet: "원하는 지갑을 선택하세요",
    connect_mobile_wallet: "모바일 지갑과 연결",
    scan_qrcode_with_wallet: "WalletConnect 지원 지갑에서 QR코드를 스캔하세요",
    connect: "연결",
    qrcode: "QR 코드",
    mobile: "모바일",
    desktop: "데스크탑",
    copy_to_clipboard: "클립보드에 복사",
    copied_to_clipboard: "클립보드에 복사되었습니다!",
    connect_with: "와 연결하다",
    loading: "로드 중...",
    something_went_wrong: "문제가 발생했습니다.",
    no_supported_wallets: "아직 지원되는 지갑이 없습니다",
    no_wallets_found: "지갑을 찾을 수 없습니다"
};
var pt = {
    choose_preferred_wallet: "Escolha sua carteira preferida",
    connect_mobile_wallet: "Conectar-se \xe0 carteira m\xf3vel",
    scan_qrcode_with_wallet: "Ler o c\xf3digo QR com uma carteira compat\xedvel com WalletConnect",
    connect: "Conectar",
    qrcode: "C\xf3digo QR",
    mobile: "M\xf3vel",
    desktop: "Desktop",
    copy_to_clipboard: "Copiar",
    copied_to_clipboard: "Copiado!",
    connect_with: "Ligar por meio de",
    loading: "Carregamento...",
    something_went_wrong: "Algo correu mal",
    no_supported_wallets: "Ainda n\xe3o h\xe1 carteiras suportadas",
    no_wallets_found: "Nenhuma carteira encontrada"
};
var zh = {
    choose_preferred_wallet: "选择你的钱包",
    connect_mobile_wallet: "连接至移动端钱包",
    scan_qrcode_with_wallet: "使用兼容 WalletConnect 的钱包扫描二维码",
    connect: "连接",
    qrcode: "二维码",
    mobile: "移动",
    desktop: "桌面",
    copy_to_clipboard: "复制到剪贴板",
    copied_to_clipboard: "复制到剪贴板成功！",
    connect_with: "通过以下方式连接",
    loading: "正在加载...",
    something_went_wrong: "出了问题",
    no_supported_wallets: "目前还没有支持的钱包",
    no_wallets_found: "没有找到钱包"
};
var fa = {
    choose_preferred_wallet: "کیف پول مورد نظر خود را انتخاب کنید",
    connect_mobile_wallet: "به کیف پول موبایل وصل شوید",
    scan_qrcode_with_wallet: "کد QR را با یک کیف پول سازگار با WalletConnect اسکن کنید",
    connect: "اتصال",
    qrcode: "کد QR",
    mobile: "سیار",
    desktop: "دسکتاپ",
    copy_to_clipboard: "کپی به کلیپ بورد",
    copied_to_clipboard: "در کلیپ بورد کپی شد!",
    connect_with: "ارتباط با",
    loading: "...بارگذاری",
    something_went_wrong: "مشکلی پیش آمد",
    no_supported_wallets: "هنوز هیچ کیف پول پشتیبانی شده ای وجود ندارد",
    no_wallets_found: "هیچ کیف پولی پیدا نشد"
};
var languages = {
    de: de,
    en: en,
    es: es,
    fr: fr,
    ko: ko,
    pt: pt,
    zh: zh,
    fa: fa
};
function injectStyleSheet() {
    var doc = browserUtils.getDocumentOrThrow();
    var prev = doc.getElementById(WALLETCONNECT_STYLE_ID);
    if (prev) doc.head.removeChild(prev);
    var style = doc.createElement("style");
    style.setAttribute("id", WALLETCONNECT_STYLE_ID);
    style.innerText = WALLETCONNECT_STYLE_SHEET;
    doc.head.appendChild(style);
}
function renderWrapper() {
    var doc = browserUtils.getDocumentOrThrow();
    var wrapper = doc.createElement("div");
    wrapper.setAttribute("id", WALLETCONNECT_WRAPPER_ID);
    doc.body.appendChild(wrapper);
    return wrapper;
}
function triggerCloseAnimation() {
    var doc = browserUtils.getDocumentOrThrow();
    var modal = doc.getElementById(WALLETCONNECT_MODAL_ID);
    if (modal) {
        modal.className = modal.className.replace("fadeIn", "fadeOut");
        setTimeout(function() {
            var wrapper = doc.getElementById(WALLETCONNECT_WRAPPER_ID);
            if (wrapper) doc.body.removeChild(wrapper);
        }, ANIMATION_DURATION);
    }
}
function getWrappedCallback(cb) {
    return function() {
        triggerCloseAnimation();
        if (cb) cb();
    };
}
function getText() {
    var lang = browserUtils.getNavigatorOrThrow().language.split("-")[0] || "en";
    return languages[lang] || languages["en"];
}
function open$1(uri, cb, qrcodeModalOptions) {
    injectStyleSheet();
    var wrapper = renderWrapper();
    React.render(React.createElement(Modal, {
        text: getText(),
        uri: uri,
        onClose: getWrappedCallback(cb),
        qrcodeModalOptions: qrcodeModalOptions
    }), wrapper);
}
function close$1() {
    triggerCloseAnimation();
}
var isNode = function() {
    return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
};
function open$2(uri, cb, qrcodeModalOptions) {
    console.log(uri);
    if (isNode()) open(uri);
    else open$1(uri, cb, qrcodeModalOptions);
}
function close$2() {
    if (isNode()) ;
    else close$1();
}
var index = {
    open: open$2,
    close: close$2
};
module.exports = index;

},{"5f2580c2f5ff341d":"d5jf4","e84ef3eb274e59fc":"1ExPT","806b369f53584fb2":"lB7MY","949d790a4b87ef99":"fLPFI","78bbc8c770bca4f7":"aF0cT"}],"1ExPT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _browser = require("./browser");
parcelHelpers.exportAll(_browser, exports);
var _json = require("./json");
parcelHelpers.exportAll(_json, exports);
var _local = require("./local");
parcelHelpers.exportAll(_local, exports);
var _mobile = require("./mobile");
parcelHelpers.exportAll(_mobile, exports);
var _registry = require("./registry");
parcelHelpers.exportAll(_registry, exports);

},{"./browser":"j0bF1","./json":"dYF1L","./local":"2EX5Y","./mobile":"5BEOZ","./registry":"gLu9D","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j0bF1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "detectEnv", ()=>detectEnv);
parcelHelpers.export(exports, "detectOS", ()=>detectOS);
parcelHelpers.export(exports, "isAndroid", ()=>isAndroid);
parcelHelpers.export(exports, "isIOS", ()=>isIOS);
parcelHelpers.export(exports, "isMobile", ()=>isMobile);
parcelHelpers.export(exports, "isNode", ()=>isNode);
parcelHelpers.export(exports, "isBrowser", ()=>isBrowser);
parcelHelpers.export(exports, "getFromWindow", ()=>getFromWindow);
parcelHelpers.export(exports, "getFromWindowOrThrow", ()=>getFromWindowOrThrow);
parcelHelpers.export(exports, "getDocumentOrThrow", ()=>getDocumentOrThrow);
parcelHelpers.export(exports, "getDocument", ()=>getDocument);
parcelHelpers.export(exports, "getNavigatorOrThrow", ()=>getNavigatorOrThrow);
parcelHelpers.export(exports, "getNavigator", ()=>getNavigator);
parcelHelpers.export(exports, "getLocationOrThrow", ()=>getLocationOrThrow);
parcelHelpers.export(exports, "getLocation", ()=>getLocation);
parcelHelpers.export(exports, "getCryptoOrThrow", ()=>getCryptoOrThrow);
parcelHelpers.export(exports, "getCrypto", ()=>getCrypto);
parcelHelpers.export(exports, "getLocalStorageOrThrow", ()=>getLocalStorageOrThrow);
parcelHelpers.export(exports, "getLocalStorage", ()=>getLocalStorage);
parcelHelpers.export(exports, "getClientMeta", ()=>getClientMeta);
var _windowMetadata = require("@walletconnect/window-metadata");
var _windowGetters = require("@walletconnect/window-getters");
var _detectBrowser = require("detect-browser");
function detectEnv(userAgent) {
    return (0, _detectBrowser.detect)(userAgent);
}
function detectOS() {
    const env = detectEnv();
    return env && env.os ? env.os : undefined;
}
function isAndroid() {
    const os = detectOS();
    return os ? os.toLowerCase().includes("android") : false;
}
function isIOS() {
    const os = detectOS();
    return os ? os.toLowerCase().includes("ios") || os.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 : false;
}
function isMobile() {
    const os = detectOS();
    return os ? isAndroid() || isIOS() : false;
}
function isNode() {
    const env = detectEnv();
    const result = env && env.name ? env.name.toLowerCase() === "node" : false;
    return result;
}
function isBrowser() {
    const result = !isNode() && !!getNavigator();
    return result;
}
const getFromWindow = _windowGetters.getFromWindow;
const getFromWindowOrThrow = _windowGetters.getFromWindowOrThrow;
const getDocumentOrThrow = _windowGetters.getDocumentOrThrow;
const getDocument = _windowGetters.getDocument;
const getNavigatorOrThrow = _windowGetters.getNavigatorOrThrow;
const getNavigator = _windowGetters.getNavigator;
const getLocationOrThrow = _windowGetters.getLocationOrThrow;
const getLocation = _windowGetters.getLocation;
const getCryptoOrThrow = _windowGetters.getCryptoOrThrow;
const getCrypto = _windowGetters.getCrypto;
const getLocalStorageOrThrow = _windowGetters.getLocalStorageOrThrow;
const getLocalStorage = _windowGetters.getLocalStorage;
function getClientMeta() {
    return _windowMetadata.getWindowMetadata();
}

},{"@walletconnect/window-metadata":"ga1jf","@walletconnect/window-getters":"7XcJM","detect-browser":"2pU52","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ga1jf":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWindowMetadata = void 0;
const window_getters_1 = require("4c320ce63cd8e8b4");
function getWindowMetadata() {
    let doc;
    let loc;
    try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
    } catch (e) {
        return null;
    }
    function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons = [];
        for(let i = 0; i < links.length; i++){
            const link = links[i];
            const rel = link.getAttribute("rel");
            if (rel) {
                if (rel.toLowerCase().indexOf("icon") > -1) {
                    const href = link.getAttribute("href");
                    if (href) {
                        if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                            let absoluteHref = loc.protocol + "//" + loc.host;
                            if (href.indexOf("/") === 0) absoluteHref += href;
                            else {
                                const path = loc.pathname.split("/");
                                path.pop();
                                const finalPath = path.join("/");
                                absoluteHref += finalPath + "/" + href;
                            }
                            icons.push(absoluteHref);
                        } else if (href.indexOf("//") === 0) {
                            const absoluteUrl = loc.protocol + href;
                            icons.push(absoluteUrl);
                        } else icons.push(href);
                    }
                }
            }
        }
        return icons;
    }
    function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for(let i = 0; i < metaTags.length; i++){
            const tag = metaTags[i];
            const attributes = [
                "itemprop",
                "property",
                "name"
            ].map((target)=>tag.getAttribute(target)).filter((attr)=>{
                if (attr) return args.includes(attr);
                return false;
            });
            if (attributes.length && attributes) {
                const content = tag.getAttribute("content");
                if (content) return content;
            }
        }
        return "";
    }
    function getName() {
        let name = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name) name = doc.title;
        return name;
    }
    function getDescription() {
        const description = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description;
    }
    const name = getName();
    const description = getDescription();
    const url = loc.origin;
    const icons = getIcons();
    const meta = {
        description,
        url,
        icons,
        name
    };
    return meta;
}
exports.getWindowMetadata = getWindowMetadata;

},{"4c320ce63cd8e8b4":"7XcJM"}],"7XcJM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
function getFromWindow(name) {
    let res = undefined;
    if (typeof window !== "undefined" && typeof window[name] !== "undefined") res = window[name];
    return res;
}
exports.getFromWindow = getFromWindow;
function getFromWindowOrThrow(name) {
    const res = getFromWindow(name);
    if (!res) throw new Error(`${name} is not defined in Window`);
    return res;
}
exports.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
    return getFromWindowOrThrow("document");
}
exports.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
    return getFromWindow("document");
}
exports.getDocument = getDocument;
function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator");
}
exports.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
    return getFromWindow("navigator");
}
exports.getNavigator = getNavigator;
function getLocationOrThrow() {
    return getFromWindowOrThrow("location");
}
exports.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
    return getFromWindow("location");
}
exports.getLocation = getLocation;
function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto");
}
exports.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
    return getFromWindow("crypto");
}
exports.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage");
}
exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
    return getFromWindow("localStorage");
}
exports.getLocalStorage = getLocalStorage;

},{}],"2pU52":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BrowserInfo", ()=>BrowserInfo);
parcelHelpers.export(exports, "NodeInfo", ()=>NodeInfo);
parcelHelpers.export(exports, "SearchBotDeviceInfo", ()=>SearchBotDeviceInfo);
parcelHelpers.export(exports, "BotInfo", ()=>BotInfo);
parcelHelpers.export(exports, "ReactNativeInfo", ()=>ReactNativeInfo);
parcelHelpers.export(exports, "detect", ()=>detect);
parcelHelpers.export(exports, "browserName", ()=>browserName);
parcelHelpers.export(exports, "parseUserAgent", ()=>parseUserAgent);
parcelHelpers.export(exports, "detectOS", ()=>detectOS);
parcelHelpers.export(exports, "getNodeVersion", ()=>getNodeVersion);
var process = require("67c78cded988b501");
var __spreadArrays = undefined && undefined.__spreadArrays || function() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
};
var BrowserInfo = /** @class */ function() {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = "browser";
    }
    return BrowserInfo;
}();
var NodeInfo = /** @class */ function() {
    function NodeInfo(version) {
        this.version = version;
        this.type = "node";
        this.name = "node";
        this.os = process.platform;
    }
    return NodeInfo;
}();
var SearchBotDeviceInfo = /** @class */ function() {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = "bot-device";
    }
    return SearchBotDeviceInfo;
}();
var BotInfo = /** @class */ function() {
    function BotInfo() {
        this.type = "bot";
        this.bot = true; // NOTE: deprecated test name instead
        this.name = "bot";
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}();
var ReactNativeInfo = /** @class */ function() {
    function ReactNativeInfo() {
        this.type = "react-native";
        this.name = "react-native";
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}();
// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    [
        "aol",
        /AOLShield\/([0-9\._]+)/
    ],
    [
        "edge",
        /Edge\/([0-9\._]+)/
    ],
    [
        "edge-ios",
        /EdgiOS\/([0-9\._]+)/
    ],
    [
        "yandexbrowser",
        /YaBrowser\/([0-9\._]+)/
    ],
    [
        "kakaotalk",
        /KAKAOTALK\s([0-9\.]+)/
    ],
    [
        "samsung",
        /SamsungBrowser\/([0-9\.]+)/
    ],
    [
        "silk",
        /\bSilk\/([0-9._-]+)\b/
    ],
    [
        "miui",
        /MiuiBrowser\/([0-9\.]+)$/
    ],
    [
        "beaker",
        /BeakerBrowser\/([0-9\.]+)/
    ],
    [
        "edge-chromium",
        /EdgA?\/([0-9\.]+)/
    ],
    [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "chrome",
        /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "phantomjs",
        /PhantomJS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "crios",
        /CriOS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "firefox",
        /Firefox\/([0-9\.]+)(?:\s|$)/
    ],
    [
        "fxios",
        /FxiOS\/([0-9\.]+)/
    ],
    [
        "opera-mini",
        /Opera Mini.*Version\/([0-9\.]+)/
    ],
    [
        "opera",
        /Opera\/([0-9\.]+)(?:\s|$)/
    ],
    [
        "opera",
        /OPR\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "ie",
        /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/
    ],
    [
        "ie",
        /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/
    ],
    [
        "ie",
        /MSIE\s(7\.0)/
    ],
    [
        "bb10",
        /BB10;\sTouch.*Version\/([0-9\.]+)/
    ],
    [
        "android",
        /Android\s([0-9\.]+)/
    ],
    [
        "ios",
        /Version\/([0-9\._]+).*Mobile.*Safari.*/
    ],
    [
        "safari",
        /Version\/([0-9\._]+).*Safari/
    ],
    [
        "facebook",
        /FBAV\/([0-9\.]+)/
    ],
    [
        "instagram",
        /Instagram\s([0-9\.]+)/
    ],
    [
        "ios-webview",
        /AppleWebKit\/([0-9\.]+).*Mobile/
    ],
    [
        "ios-webview",
        /AppleWebKit\/([0-9\.]+).*Gecko\)$/
    ],
    [
        "searchbot",
        SEARCHBOX_UA_REGEX
    ]
];
var operatingSystemRules = [
    [
        "iOS",
        /iP(hone|od|ad)/
    ],
    [
        "Android OS",
        /Android/
    ],
    [
        "BlackBerry OS",
        /BlackBerry|BB10/
    ],
    [
        "Windows Mobile",
        /IEMobile/
    ],
    [
        "Amazon OS",
        /Kindle/
    ],
    [
        "Windows 3.11",
        /Win16/
    ],
    [
        "Windows 95",
        /(Windows 95)|(Win95)|(Windows_95)/
    ],
    [
        "Windows 98",
        /(Windows 98)|(Win98)/
    ],
    [
        "Windows 2000",
        /(Windows NT 5.0)|(Windows 2000)/
    ],
    [
        "Windows XP",
        /(Windows NT 5.1)|(Windows XP)/
    ],
    [
        "Windows Server 2003",
        /(Windows NT 5.2)/
    ],
    [
        "Windows Vista",
        /(Windows NT 6.0)/
    ],
    [
        "Windows 7",
        /(Windows NT 6.1)/
    ],
    [
        "Windows 8",
        /(Windows NT 6.2)/
    ],
    [
        "Windows 8.1",
        /(Windows NT 6.3)/
    ],
    [
        "Windows 10",
        /(Windows NT 10.0)/
    ],
    [
        "Windows ME",
        /Windows ME/
    ],
    [
        "Open BSD",
        /OpenBSD/
    ],
    [
        "Sun OS",
        /SunOS/
    ],
    [
        "Chrome OS",
        /CrOS/
    ],
    [
        "Linux",
        /(Linux)|(X11)/
    ],
    [
        "Mac OS",
        /(Mac_PowerPC)|(Macintosh)/
    ],
    [
        "QNX",
        /QNX/
    ],
    [
        "BeOS",
        /BeOS/
    ],
    [
        "OS/2",
        /OS\/2/
    ]
];
function detect(userAgent) {
    if (!!userAgent) return parseUserAgent(userAgent);
    if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") return new ReactNativeInfo();
    if (typeof navigator !== "undefined") return parseUserAgent(navigator.userAgent);
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return ua !== "" && userAgentRules.reduce(function(matched, _a) {
        var browser = _a[0], regex = _a[1];
        if (matched) return matched;
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [
            browser,
            uaMatch
        ];
    }, false);
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) return null;
    var name = matchedRule[0], match = matchedRule[1];
    if (name === "searchbot") return new BotInfo();
    var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) versionParts = __spreadArrays(versionParts, createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
    } else versionParts = [];
    var version = versionParts.join(".");
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for(var ii = 0, count = operatingSystemRules.length; ii < count; ii++){
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) return os;
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof process !== "undefined" && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for(var ii = 0; ii < count; ii++)output.push("0");
    return output;
}

},{"67c78cded988b501":"d5jf4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dYF1L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "safeJsonParse", ()=>safeJsonParse);
parcelHelpers.export(exports, "safeJsonStringify", ()=>safeJsonStringify);
var _safeJson = require("@walletconnect/safe-json");
const safeJsonParse = _safeJson.safeJsonParse;
const safeJsonStringify = _safeJson.safeJsonStringify;

},{"@walletconnect/safe-json":"cD1pC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cD1pC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "safeJsonParse", ()=>safeJsonParse);
parcelHelpers.export(exports, "safeJsonStringify", ()=>safeJsonStringify);
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2EX5Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setLocal", ()=>setLocal);
parcelHelpers.export(exports, "getLocal", ()=>getLocal);
parcelHelpers.export(exports, "removeLocal", ()=>removeLocal);
var _json = require("./json");
var _browser = require("./browser");
function setLocal(key, data) {
    const raw = (0, _json.safeJsonStringify)(data);
    const local = (0, _browser.getLocalStorage)();
    if (local) local.setItem(key, raw);
}
function getLocal(key) {
    let data = null;
    let raw = null;
    const local = (0, _browser.getLocalStorage)();
    if (local) raw = local.getItem(key);
    data = raw ? (0, _json.safeJsonParse)(raw) : raw;
    return data;
}
function removeLocal(key) {
    const local = (0, _browser.getLocalStorage)();
    if (local) local.removeItem(key);
}

},{"./json":"dYF1L","./browser":"j0bF1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5BEOZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "mobileLinkChoiceKey", ()=>mobileLinkChoiceKey);
parcelHelpers.export(exports, "formatIOSMobile", ()=>formatIOSMobile);
parcelHelpers.export(exports, "saveMobileLinkInfo", ()=>saveMobileLinkInfo);
parcelHelpers.export(exports, "getMobileRegistryEntry", ()=>getMobileRegistryEntry);
parcelHelpers.export(exports, "getMobileLinkRegistry", ()=>getMobileLinkRegistry);
var _local = require("./local");
const mobileLinkChoiceKey = "WALLETCONNECT_DEEPLINK_CHOICE";
function formatIOSMobile(uri, entry) {
    const encodedUri = encodeURIComponent(uri);
    return entry.universalLink ? `${entry.universalLink}/wc?uri=${encodedUri}` : entry.deepLink ? `${entry.deepLink}${entry.deepLink.endsWith(":") ? "//" : "/"}wc?uri=${encodedUri}` : "";
}
function saveMobileLinkInfo(data) {
    const focusUri = data.href.split("?")[0];
    (0, _local.setLocal)(mobileLinkChoiceKey, Object.assign(Object.assign({}, data), {
        href: focusUri
    }));
}
function getMobileRegistryEntry(registry, name) {
    return registry.filter((entry)=>entry.name.toLowerCase().includes(name.toLowerCase()))[0];
}
function getMobileLinkRegistry(registry, whitelist) {
    let links = registry;
    if (whitelist) links = whitelist.map((name)=>getMobileRegistryEntry(registry, name)).filter(Boolean);
    return links;
}

},{"./local":"2EX5Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gLu9D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getWalletRegistryUrl", ()=>getWalletRegistryUrl);
parcelHelpers.export(exports, "getDappRegistryUrl", ()=>getDappRegistryUrl);
parcelHelpers.export(exports, "formatMobileRegistryEntry", ()=>formatMobileRegistryEntry);
parcelHelpers.export(exports, "formatMobileRegistry", ()=>formatMobileRegistry);
const API_URL = "https://registry.walletconnect.com";
function getWalletRegistryUrl() {
    return API_URL + "/api/v2/wallets";
}
function getDappRegistryUrl() {
    return API_URL + "/api/v2/dapps";
}
function formatMobileRegistryEntry(entry, platform = "mobile") {
    var _a;
    return {
        name: entry.name || "",
        shortName: entry.metadata.shortName || "",
        color: entry.metadata.colors.primary || "",
        logo: (_a = entry.image_url.sm) !== null && _a !== void 0 ? _a : "",
        universalLink: entry[platform].universal || "",
        deepLink: entry[platform].native || ""
    };
}
function formatMobileRegistry(registry, platform = "mobile") {
    return Object.values(registry).filter((entry)=>!!entry[platform].universal || !!entry[platform].native).map((entry)=>formatMobileRegistryEntry(entry, platform));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lB7MY":[function(require,module,exports) {
var canPromise = require("ca103149d9c27341");
var QRCode = require("41c7cae1d7a9fe6d");
var CanvasRenderer = require("f181495b5b679b97");
var SvgRenderer = require("cd873dc5f62fa581");
function renderCanvas(renderFunc, canvas, text, opts, cb) {
    var args = [].slice.call(arguments, 1);
    var argsNum = args.length;
    var isLastArgCb = typeof args[argsNum - 1] === "function";
    if (!isLastArgCb && !canPromise()) throw new Error("Callback required as last argument");
    if (isLastArgCb) {
        if (argsNum < 2) throw new Error("Too few arguments provided");
        if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === "undefined") {
                cb = opts;
                opts = undefined;
            } else {
                cb = opts;
                opts = text;
                text = canvas;
                canvas = undefined;
            }
        }
    } else {
        if (argsNum < 1) throw new Error("Too few arguments provided");
        if (argsNum === 1) {
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = undefined;
        }
        return new Promise(function(resolve, reject) {
            try {
                var data = QRCode.create(text, opts);
                resolve(renderFunc(data, canvas, opts));
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        var data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
        cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
// only svg for now.
exports.toString = renderCanvas.bind(null, function(data, _, opts) {
    return SvgRenderer.render(data, opts);
});

},{"ca103149d9c27341":"9FrZa","41c7cae1d7a9fe6d":"20hbG","f181495b5b679b97":"2oGFV","cd873dc5f62fa581":"7Akrj"}],"9FrZa":[function(require,module,exports) {
// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function() {
    return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
};

},{}],"20hbG":[function(require,module,exports) {
var BufferUtil = require("aabb795f25342139");
var Utils = require("cff931158db73f65");
var ECLevel = require("2c54d866919a2270");
var BitBuffer = require("7ffc2d6bfb265279");
var BitMatrix = require("9a0b307de2b247e2");
var AlignmentPattern = require("135b819db735c323");
var FinderPattern = require("4920e7f1757a62f6");
var MaskPattern = require("533fd8f0d434083a");
var ECCode = require("4878093693143e9f");
var ReedSolomonEncoder = require("2612e0d0bc29eec");
var Version = require("eb2ed3aeeaf7592c");
var FormatInfo = require("b51410e65dce68bd");
var Mode = require("b67046fb0eff6554");
var Segments = require("6b1aaf3914536785");
var isArray = require("fb5d5861509212d6");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/ /**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupFinderPattern(matrix, version) {
    var size = matrix.size;
    var pos = FinderPattern.getPositions(version);
    for(var i = 0; i < pos.length; i++){
        var row = pos[i][0];
        var col = pos[i][1];
        for(var r = -1; r <= 7; r++){
            if (row + r <= -1 || size <= row + r) continue;
            for(var c = -1; c <= 7; c++){
                if (col + c <= -1 || size <= col + c) continue;
                if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) matrix.set(row + r, col + c, true, true);
                else matrix.set(row + r, col + c, false, true);
            }
        }
    }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */ function setupTimingPattern(matrix) {
    var size = matrix.size;
    for(var r = 8; r < size - 8; r++){
        var value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
    }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupAlignmentPattern(matrix, version) {
    var pos = AlignmentPattern.getPositions(version);
    for(var i = 0; i < pos.length; i++){
        var row = pos[i][0];
        var col = pos[i][1];
        for(var r = -2; r <= 2; r++){
            for(var c = -2; c <= 2; c++)if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) matrix.set(row + r, col + c, true, true);
            else matrix.set(row + r, col + c, false, true);
        }
    }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupVersionInfo(matrix, version) {
    var size = matrix.size;
    var bits = Version.getEncodedBits(version);
    var row, col, mod;
    for(var i = 0; i < 18; i++){
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
    }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */ function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    var size = matrix.size;
    var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    var i, mod;
    for(i = 0; i < 15; i++){
        mod = (bits >> i & 1) === 1;
        // vertical
        if (i < 6) matrix.set(i, 8, mod, true);
        else if (i < 8) matrix.set(i + 1, 8, mod, true);
        else matrix.set(size - 15 + i, 8, mod, true);
        // horizontal
        if (i < 8) matrix.set(8, size - i - 1, mod, true);
        else if (i < 9) matrix.set(8, 15 - i - 1 + 1, mod, true);
        else matrix.set(8, 15 - i - 1, mod, true);
    }
    // fixed module
    matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix} matrix Modules matrix
 * @param  {Buffer}    data   Data codewords
 */ function setupData(matrix, data) {
    var size = matrix.size;
    var inc = -1;
    var row = size - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    for(var col = size - 1; col > 0; col -= 2){
        if (col === 6) col--;
        while(true){
            for(var c = 0; c < 2; c++)if (!matrix.isReserved(row, col - c)) {
                var dark = false;
                if (byteIndex < data.length) dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                matrix.set(row, col - c, dark);
                bitIndex--;
                if (bitIndex === -1) {
                    byteIndex++;
                    bitIndex = 7;
                }
            }
            row += inc;
            if (row < 0 || size <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Buffer}                        Buffer containing encoded codewords
 */ function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    var buffer = new BitBuffer();
    segments.forEach(function(data) {
        // prefix data with mode indicator (4 bits)
        buffer.put(data.mode.bit, 4);
        // Prefix data with character count indicator.
        // The character count indicator is a string of bits that represents the
        // number of characters that are being encoded.
        // The character count indicator must be placed after the mode indicator
        // and must be a certain number of bits long, depending on the QR version
        // and data mode
        // @see {@link Mode.getCharCountIndicator}.
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        // add binary data sequence to buffer
        data.write(buffer);
    });
    // Calculate required number of bits
    var totalCodewords = Utils.getSymbolTotalCodewords(version);
    var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) buffer.put(0, 4);
    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.
    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while(buffer.getLengthInBits() % 8 !== 0)buffer.putBit(0);
    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for(var i = 0; i < remainingByte; i++)buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Buffer}                         Buffer containing encoded codewords
 */ function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    var totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    var dataTotalCodewords = totalCodewords - ecTotalCodewords;
    // Total number of blocks
    var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
    // Calculate how many blocks each group should contain
    var blocksInGroup2 = totalCodewords % ecTotalBlocks;
    var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
    // Number of EC codewords is the same for both groups
    var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    var rs = new ReedSolomonEncoder(ecCount);
    var offset = 0;
    var dcData = new Array(ecTotalBlocks);
    var ecData = new Array(ecTotalBlocks);
    var maxDataSize = 0;
    var buffer = BufferUtil.from(bitBuffer.buffer);
    // Divide the buffer into the required number of blocks
    for(var b = 0; b < ecTotalBlocks; b++){
        var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        // extract a block of data from buffer
        dcData[b] = buffer.slice(offset, offset + dataSize);
        // Calculate EC codewords for this data block
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
    }
    // Create final data
    // Interleave the data and error correction codewords from each block
    var data = BufferUtil.alloc(totalCodewords);
    var index = 0;
    var i, r;
    // Add data codewords
    for(i = 0; i < maxDataSize; i++){
        for(r = 0; r < ecTotalBlocks; r++)if (i < dcData[r].length) data[index++] = dcData[r][i];
    }
    // Apped EC codewords
    for(i = 0; i < ecCount; i++)for(r = 0; r < ecTotalBlocks; r++)data[index++] = ecData[r][i];
    return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */ function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    var segments;
    if (isArray(data)) segments = Segments.fromArray(data);
    else if (typeof data === "string") {
        var estimatedVersion = version;
        if (!estimatedVersion) {
            var rawSegments = Segments.rawSplit(data);
            // Estimate best version that can contain raw splitted segments
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        // Build optimized segments
        // If estimated version is undefined, try with the highest version
        segments = Segments.fromString(data, estimatedVersion || 40);
    } else throw new Error("Invalid data");
    // Get the min version that can contain data
    var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
    // If no version is found, data cannot be stored
    if (!bestVersion) throw new Error("The amount of data is too big to be stored in a QR Code");
    // If not specified, use min version as default
    if (!version) version = bestVersion;
    else if (version < bestVersion) throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n");
    var dataBits = createData(version, errorCorrectionLevel, segments);
    // Allocate matrix buffer
    var moduleCount = Utils.getSymbolSize(version);
    var modules = new BitMatrix(moduleCount);
    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);
    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) setupVersionInfo(modules, version);
    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);
    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
        modules: modules,
        version: version,
        errorCorrectionLevel: errorCorrectionLevel,
        maskPattern: maskPattern,
        segments: segments
    };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */ exports.create = function create(data, options) {
    if (typeof data === "undefined" || data === "") throw new Error("No input text");
    var errorCorrectionLevel = ECLevel.M;
    var version;
    var mask;
    if (typeof options !== "undefined") {
        // Use higher error correction level as default
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) Utils.setToSJISFunction(options.toSJISFunc);
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
};

},{"aabb795f25342139":"ctzhM","cff931158db73f65":"iXLHI","2c54d866919a2270":"kbPwo","7ffc2d6bfb265279":"kiPfj","9a0b307de2b247e2":"fTjkX","135b819db735c323":"1o9KB","4920e7f1757a62f6":"dc6Ma","533fd8f0d434083a":"fyimH","4878093693143e9f":"5yWYH","2612e0d0bc29eec":"47Qq0","eb2ed3aeeaf7592c":"a8ag2","b51410e65dce68bd":"iThdR","b67046fb0eff6554":"f1e9A","6b1aaf3914536785":"4tKki","fb5d5861509212d6":"hk7XJ"}],"ctzhM":[function(require,module,exports) {
/**
 * Implementation of a subset of node.js Buffer methods for the browser.
 * Based on https://github.com/feross/buffer
 */ /* eslint-disable no-proto */ "use strict";
var isArray = require("70c747ec160928c2");
function typedArraySupport() {
    // Can typed array instances be augmented?
    try {
        var arr = new Uint8Array(1);
        arr.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
                return 42;
            }
        };
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
var K_MAX_LENGTH = Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
function Buffer(arg, offset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) return new Buffer(arg, offset, length);
    if (typeof arg === "number") return allocUnsafe(this, arg);
    return from(this, arg, offset, length);
}
if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    if (typeof Symbol !== "undefined" && Symbol.species && Buffer[Symbol.species] === Buffer) Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: true,
        enumerable: false,
        writable: false
    });
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function isnan(val) {
    return val !== val // eslint-disable-line no-self-compare
    ;
}
function createBuffer(that, length) {
    var buf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        buf = new Uint8Array(length);
        buf.__proto__ = Buffer.prototype;
    } else {
        // Fallback: Return an object instance of the Buffer class
        buf = that;
        if (buf === null) buf = new Buffer(length);
        buf.length = length;
    }
    return buf;
}
function allocUnsafe(that, size) {
    var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) for(var i = 0; i < size; ++i)buf[i] = 0;
    return buf;
}
function fromString(that, string) {
    var length = byteLength(string) | 0;
    var buf = createBuffer(that, length);
    var actual = buf.write(string);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(that, length);
    for(var i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function fromArrayBuffer(that, array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("'offset' is out of bounds");
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("'length' is out of bounds");
    var buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    if (Buffer.TYPED_ARRAY_SUPPORT) // Return an augmented `Uint8Array` instance, for best performance
    buf.__proto__ = Buffer.prototype;
    else // Fallback: Return an object instance of the Buffer class
    buf = fromArrayLike(that, buf);
    return buf;
}
function fromObject(that, obj) {
    if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(that, len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj) {
        if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if (typeof obj.length !== "number" || isnan(obj.length)) return createBuffer(that, 0);
            return fromArrayLike(that, obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(that, obj.data);
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for(var i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function byteLength(string) {
    if (Buffer.isBuffer(string)) return string.length;
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") string = "" + string;
    var len = string.length;
    if (len === 0) return 0;
    return utf8ToBytes(string).length;
}
function blitBuffer(src, dst, offset, length) {
    for(var i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function from(that, value, offset, length) {
    if (typeof value === "number") throw new TypeError('"value" argument must not be a number');
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) return fromArrayBuffer(that, value, offset, length);
    if (typeof value === "string") return fromString(that, value, offset);
    return fromObject(that, value);
}
Buffer.prototype.write = function write(string, offset, length) {
    // Buffer#write(string)
    if (offset === undefined) {
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length])
    } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) length = length | 0;
        else length = undefined;
    }
    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    return utf8Write(this, string, offset, length);
};
Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        // Return an augmented `Uint8Array` instance
        newBuf.__proto__ = Buffer.prototype;
    } else {
        var sliceLen = end - start;
        newBuf = new Buffer(sliceLen, undefined);
        for(var i = 0; i < sliceLen; ++i)newBuf[i] = this[i + start];
    }
    return newBuf;
};
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    var len = end - start;
    var i;
    if (this === target && start < targetStart && targetStart < end) // descending copy from end
    for(i = len - 1; i >= 0; --i)target[i + targetStart] = this[i + start];
    else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) // ascending copy from start
    for(i = 0; i < len; ++i)target[i + targetStart] = this[i + start];
    else Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
    return len;
};
Buffer.prototype.fill = function fill(val, start, end) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            start = 0;
            end = this.length;
        } else if (typeof end === "string") end = this.length;
        if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    var i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        var bytes = Buffer.isBuffer(val) ? val : new Buffer(val);
        var len = bytes.length;
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
Buffer.concat = function concat(list, length) {
    if (!isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return createBuffer(null, 0);
    var i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    var buffer = allocUnsafe(null, length);
    var pos = 0;
    for(i = 0; i < list.length; ++i){
        var buf = list[i];
        if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;
Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
};
module.exports.alloc = function(size) {
    var buffer = new Buffer(size);
    buffer.fill(0);
    return buffer;
};
module.exports.from = function(data) {
    return new Buffer(data);
};

},{"70c747ec160928c2":"hk7XJ"}],"hk7XJ":[function(require,module,exports) {
var toString = {}.toString;
module.exports = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
};

},{}],"iXLHI":[function(require,module,exports) {
var toSJISFunction;
var CODEWORDS_COUNT = [
    0,
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */ exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */ exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */ exports.getBCHDigit = function(data) {
    var digit = 0;
    while(data !== 0){
        digit++;
        data >>>= 1;
    }
    return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== "function") throw new Error('"toSJISFunc" is not a valid function.');
    toSJISFunction = f;
};
exports.isKanjiModeEnabled = function() {
    return typeof toSJISFunction !== "undefined";
};
exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
};

},{}],"kbPwo":[function(require,module,exports) {
exports.L = {
    bit: 1
};
exports.M = {
    bit: 0
};
exports.Q = {
    bit: 3
};
exports.H = {
    bit: 2
};
function fromString(string) {
    if (typeof string !== "string") throw new Error("Param is not a string");
    var lcStr = string.toLowerCase();
    switch(lcStr){
        case "l":
        case "low":
            return exports.L;
        case "m":
        case "medium":
            return exports.M;
        case "q":
        case "quartile":
            return exports.Q;
        case "h":
        case "high":
            return exports.H;
        default:
            throw new Error("Unknown EC Level: " + string);
    }
}
exports.isValid = function isValid(level) {
    return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) return value;
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};

},{}],"kiPfj":[function(require,module,exports) {
function BitBuffer() {
    this.buffer = [];
    this.length = 0;
}
BitBuffer.prototype = {
    get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function(num, length) {
        for(var i = 0; i < length; i++)this.putBit((num >>> length - i - 1 & 1) === 1);
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) this.buffer.push(0);
        if (bit) this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        this.length++;
    }
};
module.exports = BitBuffer;

},{}],"fTjkX":[function(require,module,exports) {
var BufferUtil = require("f0fcd4cc6b3c4343");
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */ function BitMatrix(size) {
    if (!size || size < 1) throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = size;
    this.data = BufferUtil.alloc(size * size);
    this.reservedBit = BufferUtil.alloc(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */ BitMatrix.prototype.set = function(row, col, value, reserved) {
    var index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */ BitMatrix.prototype.get = function(row, col) {
    return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */ BitMatrix.prototype.xor = function(row, col, value) {
    this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */ BitMatrix.prototype.isReserved = function(row, col) {
    return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;

},{"f0fcd4cc6b3c4343":"ctzhM"}],"1o9KB":[function(require,module,exports) {
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */ var getSymbolSize = require("18cb489a503346c0").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */ exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    var posCount = Math.floor(version / 7) + 2;
    var size = getSymbolSize(version);
    var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    var positions = [
        size - 7
    ] // Last coord is always (size - 7)
    ;
    for(var i = 1; i < posCount - 1; i++)positions[i] = positions[i - 1] - intervals;
    positions.push(6) // First coord is always 6
    ;
    return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * var pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    var coords = [];
    var pos = exports.getRowColCoords(version);
    var posLength = pos.length;
    for(var i = 0; i < posLength; i++)for(var j = 0; j < posLength; j++){
        // Skip if position is occupied by finder patterns
        if (i === 0 && j === 0 || // top-left
        i === 0 && j === posLength - 1 || // bottom-left
        i === posLength - 1 && j === 0) continue;
        coords.push([
            pos[i],
            pos[j]
        ]);
    }
    return coords;
};

},{"18cb489a503346c0":"iXLHI"}],"dc6Ma":[function(require,module,exports) {
var getSymbolSize = require("117fe74c1cfb3d67").getSymbolSize;
var FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    var size = getSymbolSize(version);
    return [
        // top-left
        [
            0,
            0
        ],
        // top-right
        [
            size - FINDER_PATTERN_SIZE,
            0
        ],
        // bottom-left
        [
            0,
            size - FINDER_PATTERN_SIZE
        ]
    ];
};

},{"117fe74c1cfb3d67":"iXLHI"}],"fyimH":[function(require,module,exports) {
/**
 * Data mask pattern reference
 * @type {Object}
 */ exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */ var PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */ exports.isValid = function isValid(mask) {
    return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */ exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/ exports.getPenaltyN1 = function getPenaltyN1(data) {
    var size = data.size;
    var points = 0;
    var sameCountCol = 0;
    var sameCountRow = 0;
    var lastCol = null;
    var lastRow = null;
    for(var row = 0; row < size; row++){
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for(var col = 0; col < size; col++){
            var module = data.get(row, col);
            if (module === lastCol) sameCountCol++;
            else {
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                lastCol = module;
                sameCountCol = 1;
            }
            module = data.get(col, row);
            if (module === lastRow) sameCountRow++;
            else {
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                lastRow = module;
                sameCountRow = 1;
            }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */ exports.getPenaltyN2 = function getPenaltyN2(data) {
    var size = data.size;
    var points = 0;
    for(var row = 0; row < size - 1; row++)for(var col = 0; col < size - 1; col++){
        var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0) points++;
    }
    return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */ exports.getPenaltyN3 = function getPenaltyN3(data) {
    var size = data.size;
    var points = 0;
    var bitsCol = 0;
    var bitsRow = 0;
    for(var row = 0; row < size; row++){
        bitsCol = bitsRow = 0;
        for(var col = 0; col < size; col++){
            bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
            if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
            bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
            if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
        }
    }
    return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */ exports.getPenaltyN4 = function getPenaltyN4(data) {
    var darkCount = 0;
    var modulesCount = data.data.length;
    for(var i = 0; i < modulesCount; i++)darkCount += data.data[i];
    var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */ function getMaskAt(maskPattern, i, j) {
    switch(maskPattern){
        case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
            return i % 2 === 0;
        case exports.Patterns.PATTERN010:
            return j % 3 === 0;
        case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
            throw new Error("bad maskPattern:" + maskPattern);
    }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */ exports.applyMask = function applyMask(pattern, data) {
    var size = data.size;
    for(var col = 0; col < size; col++)for(var row = 0; row < size; row++){
        if (data.isReserved(row, col)) continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
    }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */ exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    var numPatterns = Object.keys(exports.Patterns).length;
    var bestPattern = 0;
    var lowerPenalty = Infinity;
    for(var p = 0; p < numPatterns; p++){
        setupFormatFunc(p);
        exports.applyMask(p, data);
        // Calculate penalty
        var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        // Undo previously applied mask
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
        }
    }
    return bestPattern;
};

},{}],"5yWYH":[function(require,module,exports) {
var ECLevel = require("b9f223969b2a4345");
var EC_BLOCKS_TABLE = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
];
var EC_CODEWORDS_TABLE = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */ exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */ exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};

},{"b9f223969b2a4345":"kbPwo"}],"47Qq0":[function(require,module,exports) {
var BufferUtil = require("f0f6c12da5ca8bf9");
var Polynomial = require("c6ced8f67cf20116");
var Buffer = require("74f42d35e0112c04").Buffer;
function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */ ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Buffer} data Buffer containing input data
 * @return {Buffer}      Buffer containing encoded data
 */ ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) throw new Error("Encoder not initialized");
    // Calculate EC for this data block
    // extends data size to data+genPoly size
    var pad = BufferUtil.alloc(this.degree);
    var paddedData = Buffer.concat([
        data,
        pad
    ], data.length + this.degree);
    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    var remainder = Polynomial.mod(paddedData, this.genPoly);
    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    var start = this.degree - remainder.length;
    if (start > 0) {
        var buff = BufferUtil.alloc(this.degree);
        remainder.copy(buff, start);
        return buff;
    }
    return remainder;
};
module.exports = ReedSolomonEncoder;

},{"f0f6c12da5ca8bf9":"ctzhM","c6ced8f67cf20116":"dxhHI","74f42d35e0112c04":"fCgem"}],"dxhHI":[function(require,module,exports) {
var BufferUtil = require("1cfb8c1087d8e48");
var GF = require("36f843b669baecb5");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Buffer} p1 Polynomial
 * @param  {Buffer} p2 Polynomial
 * @return {Buffer}    Product of p1 and p2
 */ exports.mul = function mul(p1, p2) {
    var coeff = BufferUtil.alloc(p1.length + p2.length - 1);
    for(var i = 0; i < p1.length; i++)for(var j = 0; j < p2.length; j++)coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Buffer} divident Polynomial
 * @param  {Buffer} divisor  Polynomial
 * @return {Buffer}          Remainder
 */ exports.mod = function mod(divident, divisor) {
    var result = BufferUtil.from(divident);
    while(result.length - divisor.length >= 0){
        var coeff = result[0];
        for(var i = 0; i < divisor.length; i++)result[i] ^= GF.mul(divisor[i], coeff);
        // remove all zeros from buffer head
        var offset = 0;
        while(offset < result.length && result[offset] === 0)offset++;
        result = result.slice(offset);
    }
    return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Buffer}        Buffer containing polynomial coefficients
 */ exports.generateECPolynomial = function generateECPolynomial(degree) {
    var poly = BufferUtil.from([
        1
    ]);
    for(var i = 0; i < degree; i++)poly = exports.mul(poly, [
        1,
        GF.exp(i)
    ]);
    return poly;
};

},{"1cfb8c1087d8e48":"ctzhM","36f843b669baecb5":"2JC5s"}],"2JC5s":[function(require,module,exports) {
var BufferUtil = require("91366a3658e1fb16");
var EXP_TABLE = BufferUtil.alloc(512);
var LOG_TABLE = BufferUtil.alloc(256) /**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */ ;
(function initTables() {
    var x = 1;
    for(var i = 0; i < 255; i++){
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1 // multiply by 2
        ;
        // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
        // This means that when a number is 256 or larger, it should be XORed with 0x11D.
        if (x & 0x100) x ^= 0x11D;
    }
    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for(i = 255; i < 512; i++)EXP_TABLE[i] = EXP_TABLE[i - 255];
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.log = function log(n) {
    if (n < 1) throw new Error("log(" + n + ")");
    return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.exp = function exp(n) {
    return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */ exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;
    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};

},{"91366a3658e1fb16":"ctzhM"}],"a8ag2":[function(require,module,exports) {
var Utils = require("e535f98cd773d8c");
var ECCode = require("f48a4273591f500e");
var ECLevel = require("a904b1a1f2f4f337");
var Mode = require("826356f7082c9253");
var VersionCheck = require("f965a25e2c5c9f18");
var isArray = require("750624ee9c964f16");
// Generator polynomial used to encode version information
var G18 = 7973;
var G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for(var currentVersion = 1; currentVersion <= 40; currentVersion++){
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) return currentVersion;
    }
    return undefined;
}
function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
    var totalBits = 0;
    segments.forEach(function(data) {
        var reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for(var currentVersion = 1; currentVersion <= 40; currentVersion++){
        var length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) return currentVersion;
    }
    return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */ exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) return parseInt(value, 10);
    return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */ exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) throw new Error("Invalid QR Code version");
    // Use Byte mode as default
    if (typeof mode === "undefined") mode = Mode.BYTE;
    // Total codewords for this QR code version (Data + Error correction)
    var totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
    // Return max number of storable codewords
    switch(mode){
        case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
            return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
            return Math.floor(usableBits / 8);
    }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */ exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    var seg;
    var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (isArray(data)) {
        if (data.length > 1) return getBestVersionForMixedData(data, ecl);
        if (data.length === 0) return 1;
        seg = data[0];
    } else seg = data;
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */ exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) throw new Error("Invalid QR Code version");
    var d = version << 12;
    while(Utils.getBCHDigit(d) - G18_BCH >= 0)d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    return version << 12 | d;
};

},{"e535f98cd773d8c":"iXLHI","f48a4273591f500e":"5yWYH","a904b1a1f2f4f337":"kbPwo","826356f7082c9253":"f1e9A","f965a25e2c5c9f18":"enfTX","750624ee9c964f16":"hk7XJ"}],"f1e9A":[function(require,module,exports) {
var VersionCheck = require("17899ebe7cfa44f6");
var Regex = require("2b02571c9cb737b1");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */ exports.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [
        10,
        12,
        14
    ]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */ exports.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [
        9,
        11,
        13
    ]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */ exports.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [
        8,
        16,
        16
    ]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */ exports.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [
        8,
        10,
        12
    ]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */ exports.MIXED = {
    bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */ exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
    if (!VersionCheck.isValid(version)) throw new Error("Invalid version: " + version);
    if (version >= 1 && version < 10) return mode.ccBits[0];
    else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */ exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr)) return exports.KANJI;
    else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */ exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error("Invalid mode");
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */ exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */ function fromString(string) {
    if (typeof string !== "string") throw new Error("Param is not a string");
    var lcStr = string.toLowerCase();
    switch(lcStr){
        case "numeric":
            return exports.NUMERIC;
        case "alphanumeric":
            return exports.ALPHANUMERIC;
        case "kanji":
            return exports.KANJI;
        case "byte":
            return exports.BYTE;
        default:
            throw new Error("Unknown mode: " + string);
    }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */ exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) return value;
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};

},{"17899ebe7cfa44f6":"enfTX","2b02571c9cb737b1":"3Bqru"}],"enfTX":[function(require,module,exports) {
/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */ exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
};

},{}],"3Bqru":[function(require,module,exports) {
var numeric = "[0-9]+";
var alphanumeric = "[A-Z $%*+\\-./:]+";
var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
kanji = kanji.replace(/u/g, "\\u");
var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
exports.KANJI = new RegExp(kanji, "g");
exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
exports.BYTE = new RegExp(byte, "g");
exports.NUMERIC = new RegExp(numeric, "g");
exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
var TEST_KANJI = new RegExp("^" + kanji + "$");
var TEST_NUMERIC = new RegExp("^" + numeric + "$");
var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
};

},{}],"iThdR":[function(require,module,exports) {
var Utils = require("cefc4396cf22463b");
var G15 = 1335;
var G15_MASK = 21522;
var G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */ exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    var data = errorCorrectionLevel.bit << 3 | mask;
    var d = data << 10;
    while(Utils.getBCHDigit(d) - G15_BCH >= 0)d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
};

},{"cefc4396cf22463b":"iXLHI"}],"4tKki":[function(require,module,exports) {
var Mode = require("1ccc134ab2beba43");
var NumericData = require("eb18592fcc256783");
var AlphanumericData = require("f9eff60ecae75f38");
var ByteData = require("61da4affa6d7715");
var KanjiData = require("48291b85d3902f81");
var Regex = require("f1d7d10a13de27b7");
var Utils = require("b93b76f1b409eb40");
var dijkstra = require("52647b22a4ef42ff");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */ function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */ function getSegments(regex, mode, str) {
    var segments = [];
    var result;
    while((result = regex.exec(str)) !== null)segments.push({
        data: result[0],
        index: result.index,
        mode: mode,
        length: result[0].length
    });
    return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */ function getSegmentsFromString(dataStr) {
    var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    var byteSegs;
    var kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
    }
    var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
    }).map(function(obj) {
        return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
        };
    });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */ function getSegmentBitsLength(length, mode) {
    switch(mode){
        case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
            return KanjiData.getBitsLength(length);
        case Mode.BYTE:
            return ByteData.getBitsLength(length);
    }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
        var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
        }
        acc.push(curr);
        return acc;
    }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function buildNodes(segs) {
    var nodes = [];
    for(var i = 0; i < segs.length; i++){
        var seg = segs[i];
        switch(seg.mode){
            case Mode.NUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.ALPHANUMERIC,
                        length: seg.length
                    },
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.ALPHANUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.KANJI:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
                break;
            case Mode.BYTE:
                nodes.push([
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
        }
    }
    return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */ function buildGraph(nodes, version) {
    var table = {};
    var graph = {
        "start": {}
    };
    var prevNodeIds = [
        "start"
    ];
    for(var i = 0; i < nodes.length; i++){
        var nodeGroup = nodes[i];
        var currentNodeIds = [];
        for(var j = 0; j < nodeGroup.length; j++){
            var node = nodeGroup[j];
            var key = "" + i + j;
            currentNodeIds.push(key);
            table[key] = {
                node: node,
                lastCount: 0
            };
            graph[key] = {};
            for(var n = 0; n < prevNodeIds.length; n++){
                var prevNodeId = prevNodeIds[n];
                if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                    graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                    table[prevNodeId].lastCount += node.length;
                } else {
                    if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                    graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
                    ;
                }
            }
        }
        prevNodeIds = currentNodeIds;
    }
    for(n = 0; n < prevNodeIds.length; n++)graph[prevNodeIds[n]]["end"] = 0;
    return {
        map: graph,
        table: table
    };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */ function buildSingleSegment(data, modesHint) {
    var mode;
    var bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);
    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) throw new Error('"' + data + '"' + " cannot be encoded with mode " + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) mode = Mode.BYTE;
    switch(mode){
        case Mode.NUMERIC:
            return new NumericData(data);
        case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
        case Mode.KANJI:
            return new KanjiData(data);
        case Mode.BYTE:
            return new ByteData(data);
    }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */ exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
        if (typeof seg === "string") acc.push(buildSingleSegment(seg, null));
        else if (seg.data) acc.push(buildSingleSegment(seg.data, seg.mode));
        return acc;
    }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */ exports.fromString = function fromString(data, version) {
    var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    var nodes = buildNodes(segs);
    var graph = buildGraph(nodes, version);
    var path = dijkstra.find_path(graph.map, "start", "end");
    var optimizedSegs = [];
    for(var i = 1; i < path.length - 1; i++)optimizedSegs.push(graph.table[path[i]].node);
    return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */ exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};

},{"1ccc134ab2beba43":"f1e9A","eb18592fcc256783":"c44F8","f9eff60ecae75f38":"cdBOf","61da4affa6d7715":"ediQ9","48291b85d3902f81":"gphIw","f1d7d10a13de27b7":"3Bqru","b93b76f1b409eb40":"iXLHI","52647b22a4ef42ff":"lDJz9"}],"c44F8":[function(require,module,exports) {
var Mode = require("1444612340ddebae");
function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
    var i, group, value;
    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for(i = 0; i + 3 <= this.data.length; i += 3){
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
    }
    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    var remainingNum = this.data.length - i;
    if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
    }
};
module.exports = NumericData;

},{"1444612340ddebae":"f1e9A"}],"cdBOf":[function(require,module,exports) {
var Mode = require("9f08ae81ddf2846e");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */ var ALPHA_NUM_CHARS = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":"
];
function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
    var i;
    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for(i = 0; i + 2 <= this.data.length; i += 2){
        // The character value of the first character is multiplied by 45
        var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        // The character value of the second digit is added to the product
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        // The sum is then stored as 11-bit binary number
        bitBuffer.put(value, 11);
    }
    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
};
module.exports = AlphanumericData;

},{"9f08ae81ddf2846e":"f1e9A"}],"ediQ9":[function(require,module,exports) {
var BufferUtil = require("b9139454a8ccc51d");
var Mode = require("53d78e7ec91f825");
function ByteData(data) {
    this.mode = Mode.BYTE;
    this.data = BufferUtil.from(data);
}
ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
};
ByteData.prototype.getLength = function getLength() {
    return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer) {
    for(var i = 0, l = this.data.length; i < l; i++)bitBuffer.put(this.data[i], 8);
};
module.exports = ByteData;

},{"b9139454a8ccc51d":"ctzhM","53d78e7ec91f825":"f1e9A"}],"gphIw":[function(require,module,exports) {
var Mode = require("49e2294090d1fd3c");
var Utils = require("cdc9df7c63a09ee7");
function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer) {
    var i;
    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for(i = 0; i < this.data.length; i++){
        var value = Utils.toSJIS(this.data[i]);
        // For characters with Shift JIS values from 0x8140 to 0x9FFC:
        if (value >= 0x8140 && value <= 0x9FFC) // Subtract 0x8140 from Shift JIS value
        value -= 0x8140;
        else if (value >= 0xE040 && value <= 0xEBBF) // Subtract 0xC140 from Shift JIS value
        value -= 0xC140;
        else throw new Error("Invalid SJIS character: " + this.data[i] + "\n" + "Make sure your charset is UTF-8");
        // Multiply most significant byte of result by 0xC0
        // and add least significant byte to product
        value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
        // Convert result to a 13-bit binary string
        bitBuffer.put(value, 13);
    }
};
module.exports = KanjiData;

},{"49e2294090d1fd3c":"f1e9A","cdc9df7c63a09ee7":"iXLHI"}],"lDJz9":[function(require,module,exports) {
"use strict";
/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/ var dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};
        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;
        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while(!open.empty()){
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};
            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for(v in adjacent_nodes)if (adjacent_nodes.hasOwnProperty(v)) {
                // Get the cost of the edge running from u to v.
                cost_of_e = adjacent_nodes[v];
                // Cost of s to u plus the cost of u to v across e--this is *a*
                // cost from s to v that may or may not be less than the current
                // known cost to v.
                cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                // If we haven't visited v yet OR if the current known cost from s to
                // v is greater than the new cost we just found (cost of s to u plus
                // cost of u to v across e), update v's cost in the cost list and
                // update v's predecessor in the predecessor list (it's now u).
                cost_of_s_to_v = costs[v];
                first_visit = typeof costs[v] === "undefined";
                if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                    costs[v] = cost_of_s_to_u_plus_cost_of_e;
                    open.push(v, cost_of_s_to_u_plus_cost_of_e);
                    predecessors[v] = u;
                }
            }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
            var msg = [
                "Could not find a path from ",
                s,
                " to ",
                d,
                "."
            ].join("");
            throw new Error(msg);
        }
        return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while(u){
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },
    find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
   * A very naive priority queue implementation.
   */ PriorityQueue: {
        make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for(key in T)if (T.hasOwnProperty(key)) t[key] = T[key];
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
        },
        default_sorter: function(a, b) {
            return a.cost - b.cost;
        },
        /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */ push: function(value, cost) {
            var item = {
                value: value,
                cost: cost
            };
            this.queue.push(item);
            this.queue.sort(this.sorter);
        },
        /**
     * Return the highest priority element in the queue.
     */ pop: function() {
            return this.queue.shift();
        },
        empty: function() {
            return this.queue.length === 0;
        }
    }
};
module.exports = dijkstra;

},{}],"2oGFV":[function(require,module,exports) {
var Utils = require("39e07b15b9933b29");
function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + "px";
    canvas.style.width = size + "px";
}
function getCanvasElement() {
    try {
        return document.createElement("canvas");
    } catch (e) {
        throw new Error("You need to specify a canvas element");
    }
}
exports.render = function render(qrData, canvas, options) {
    var opts = options;
    var canvasEl = canvas;
    if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!canvas) canvasEl = getCanvasElement();
    opts = Utils.getOptions(opts);
    var size = Utils.getImageWidth(qrData.modules.size, opts);
    var ctx = canvasEl.getContext("2d");
    var image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    var opts = options;
    if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!opts) opts = {};
    var canvasEl = exports.render(qrData, canvas, opts);
    var type = opts.type || "image/png";
    var rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
};

},{"39e07b15b9933b29":"6rMWz"}],"6rMWz":[function(require,module,exports) {
function hex2rgba(hex) {
    if (typeof hex === "number") hex = hex.toString();
    if (typeof hex !== "string") throw new Error("Color should be defined as hex string");
    var hexCode = hex.slice().replace("#", "").split("");
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) throw new Error("Invalid hex color: " + hex);
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
        return [
            c,
            c
        ];
    }));
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push("F", "F");
    var hexValue = parseInt(hexCode.join(""), 16);
    return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
    };
}
exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    var margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
    var width = options.width && options.width >= 21 ? options.width : undefined;
    var scale = options.scale || 4;
    return {
        width: width,
        scale: width ? 4 : scale,
        margin: margin,
        color: {
            dark: hex2rgba(options.color.dark || "#000000ff"),
            light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
    };
};
exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
    var scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    var size = qr.modules.size;
    var data = qr.modules.data;
    var scale = exports.getScale(size, opts);
    var symbolSize = Math.floor((size + opts.margin * 2) * scale);
    var scaledMargin = opts.margin * scale;
    var palette = [
        opts.color.light,
        opts.color.dark
    ];
    for(var i = 0; i < symbolSize; i++)for(var j = 0; j < symbolSize; j++){
        var posDst = (i * symbolSize + j) * 4;
        var pxColor = opts.color.light;
        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            var iSrc = Math.floor((i - scaledMargin) / scale);
            var jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }
        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
    }
};

},{}],"7Akrj":[function(require,module,exports) {
var Utils = require("dc6d55950ba72954");
function getColorAttrib(color, attrib) {
    var alpha = color.a / 255;
    var str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
    var str = cmd + x;
    if (typeof y !== "undefined") str += " " + y;
    return str;
}
function qrToPath(data, size, margin) {
    var path = "";
    var moveBy = 0;
    var newRow = false;
    var lineLength = 0;
    for(var i = 0; i < data.length; i++){
        var col = Math.floor(i % size);
        var row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
                path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
                moveBy = 0;
                newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
                path += svgCmd("h", lineLength);
                lineLength = 0;
            }
        } else moveBy++;
    }
    return path;
}
exports.render = function render(qrData, options, cb) {
    var opts = Utils.getOptions(options);
    var size = qrData.modules.size;
    var data = qrData.modules.data;
    var qrcodesize = size + opts.margin * 2;
    var bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
    var path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    var viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
    var width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
    var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
    if (typeof cb === "function") cb(null, svgTag);
    return svgTag;
};

},{"dc6d55950ba72954":"6rMWz"}],"fLPFI":[function(require,module,exports) {
"use strict";
var deselectCurrent = require("66a81a4699fe0b27");
var clipboardToIE11Formatting = {
    "text/plain": "Text",
    "text/html": "Url",
    "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message) {
    var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
    return message.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options) {
    var debug, message, reselectPrevious, range, selection, mark, success = false;
    if (!options) options = {};
    debug = options.debug || false;
    try {
        reselectPrevious = deselectCurrent();
        range = document.createRange();
        selection = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text;
        // avoid screen readers from reading out loud the text
        mark.ariaHidden = "true";
        // reset user styles for span element
        mark.style.all = "unset";
        // prevents scrolling to the end of the page
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        // used to preserve spaces and line breaks
        mark.style.whiteSpace = "pre";
        // do not inherit user-select (it may be `none`)
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e) {
            e.stopPropagation();
            if (options.format) {
                e.preventDefault();
                if (typeof e.clipboardData === "undefined") {
                    debug && console.warn("unable to use e.clipboardData");
                    debug && console.warn("trying IE specific stuff");
                    window.clipboardData.clearData();
                    var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
                    window.clipboardData.setData(format, text);
                } else {
                    e.clipboardData.clearData();
                    e.clipboardData.setData(options.format, text);
                }
            }
            if (options.onCopy) {
                e.preventDefault();
                options.onCopy(e.clipboardData);
            }
        });
        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection.addRange(range);
        var successful = document.execCommand("copy");
        if (!successful) throw new Error("copy command was unsuccessful");
        success = true;
    } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
            window.clipboardData.setData(options.format || "text", text);
            options.onCopy && options.onCopy(window.clipboardData);
            success = true;
        } catch (err) {
            debug && console.error("unable to copy using clipboardData: ", err);
            debug && console.error("falling back to prompt");
            message = format("message" in options ? options.message : defaultMessage);
            window.prompt(message, text);
        }
    } finally{
        if (selection) {
            if (typeof selection.removeRange == "function") selection.removeRange(range);
            else selection.removeAllRanges();
        }
        if (mark) document.body.removeChild(mark);
        reselectPrevious();
    }
    return success;
}
module.exports = copy;

},{"66a81a4699fe0b27":"jmaua"}],"jmaua":[function(require,module,exports) {
module.exports = function() {
    var selection = document.getSelection();
    if (!selection.rangeCount) return function() {};
    var active = document.activeElement;
    var ranges = [];
    for(var i = 0; i < selection.rangeCount; i++)ranges.push(selection.getRangeAt(i));
    switch(active.tagName.toUpperCase()){
        case "INPUT":
        case "TEXTAREA":
            active.blur();
            break;
        default:
            active = null;
            break;
    }
    selection.removeAllRanges();
    return function() {
        selection.type === "Caret" && selection.removeAllRanges();
        if (!selection.rangeCount) ranges.forEach(function(range) {
            selection.addRange(range);
        });
        active && active.focus();
    };
};

},{}],"aF0cT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createElement", ()=>(0, _preact.createElement));
parcelHelpers.export(exports, "createContext", ()=>(0, _preact.createContext));
parcelHelpers.export(exports, "createRef", ()=>(0, _preact.createRef));
parcelHelpers.export(exports, "Fragment", ()=>(0, _preact.Fragment));
parcelHelpers.export(exports, "Component", ()=>(0, _preact.Component));
parcelHelpers.export(exports, "version", ()=>B);
parcelHelpers.export(exports, "Children", ()=>R);
parcelHelpers.export(exports, "render", ()=>T);
parcelHelpers.export(exports, "hydrate", ()=>V);
parcelHelpers.export(exports, "unmountComponentAtNode", ()=>Q);
parcelHelpers.export(exports, "createPortal", ()=>z);
parcelHelpers.export(exports, "createFactory", ()=>G);
parcelHelpers.export(exports, "cloneElement", ()=>K);
parcelHelpers.export(exports, "isValidElement", ()=>J);
parcelHelpers.export(exports, "findDOMNode", ()=>X);
parcelHelpers.export(exports, "PureComponent", ()=>C);
parcelHelpers.export(exports, "memo", ()=>_);
parcelHelpers.export(exports, "forwardRef", ()=>S);
parcelHelpers.export(exports, "unstable_batchedUpdates", ()=>Y);
parcelHelpers.export(exports, "Suspense", ()=>U);
parcelHelpers.export(exports, "SuspenseList", ()=>O);
parcelHelpers.export(exports, "lazy", ()=>L);
var _hooks = require("preact/hooks");
parcelHelpers.exportAll(_hooks, exports);
var _preact = require("preact");
function E(n, t) {
    for(var e in t)n[e] = t[e];
    return n;
}
function w(n, t) {
    for(var e in n)if ("__source" !== e && !(e in t)) return !0;
    for(var r in t)if ("__source" !== r && n[r] !== t[r]) return !0;
    return !1;
}
var C = function(n) {
    var t, e;
    function r(t) {
        var e;
        return (e = n.call(this, t) || this).isPureReactComponent = !0, e;
    }
    return e = n, (t = r).prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e, r.prototype.shouldComponentUpdate = function(n, t) {
        return w(this.props, n) || w(this.state, t);
    }, r;
}((0, _preact.Component));
function _(n, t) {
    function e(n) {
        var e = this.props.ref, r = e == n.ref;
        return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : w(this.props, n);
    }
    function r(t) {
        return this.shouldComponentUpdate = e, (0, _preact.createElement)(n, E({}, t));
    }
    return r.prototype.isReactComponent = !0, r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.t = !0, r;
}
var A = (0, _preact.options).__b;
function S(n) {
    function t(t) {
        var e = E({}, t);
        return delete e.ref, n(e, t.ref);
    }
    return t.prototype.isReactComponent = t.t = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
(0, _preact.options).__b = function(n) {
    n.type && n.type.t && n.ref && (n.props.ref = n.ref, n.ref = null), A && A(n);
};
var k = function(n, t) {
    return n ? (0, _preact.toChildArray)(n).reduce(function(n, e, r) {
        return n.concat(t(e, r));
    }, []) : null;
}, R = {
    map: k,
    forEach: k,
    count: function(n) {
        return n ? (0, _preact.toChildArray)(n).length : 0;
    },
    only: function(n) {
        if (1 !== (n = (0, _preact.toChildArray)(n)).length) throw new Error("Children.only() expects only one child.");
        return n[0];
    },
    toArray: (0, _preact.toChildArray)
}, F = (0, _preact.options).__e;
function N(n) {
    return n && ((n = E({}, n)).__c = null, n.__k = n.__k && n.__k.map(N)), n;
}
function U() {
    this.__u = 0, this.o = null, this.__b = null;
}
function M(n) {
    var t = n.__.__c;
    return t && t.u && t.u(n);
}
function L(n) {
    var t, e, r;
    function o(o) {
        if (t || (t = n()).then(function(n) {
            e = n.default || n;
        }, function(n) {
            r = n;
        }), r) throw r;
        if (!e) throw t;
        return (0, _preact.createElement)(e, o);
    }
    return o.displayName = "Lazy", o.t = !0, o;
}
function O() {
    this.i = null, this.l = null;
}
(0, _preact.options).__e = function(n, t, e) {
    if (n.then) {
        for(var r, o = t; o = o.__;)if ((r = o.__c) && r.__c) return r.__c(n, t.__c);
    }
    F(n, t, e);
}, (U.prototype = new (0, _preact.Component)).__c = function(n, t) {
    var e = this;
    null == e.o && (e.o = []), e.o.push(t);
    var r = M(e.__v), o = !1, u = function() {
        o || (o = !0, r ? r(i) : i());
    };
    t.__c = t.componentWillUnmount, t.componentWillUnmount = function() {
        u(), t.__c && t.__c();
    };
    var i = function() {
        var n;
        if (!--e.__u) for(e.__v.__k[0] = e.state.u, e.setState({
            u: e.__b = null
        }); n = e.o.pop();)n.forceUpdate();
    };
    e.__u++ || e.setState({
        u: e.__b = e.__v.__k[0]
    }), n.then(u, u);
}, U.prototype.render = function(n, t) {
    return this.__b && (this.__v.__k[0] = N(this.__b), this.__b = null), [
        (0, _preact.createElement)((0, _preact.Component), null, t.u ? null : n.children),
        t.u && n.fallback
    ];
};
var P = function(n, t, e) {
    if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for(e = n.i; e;){
        for(; e.length > 3;)e.pop()();
        if (e[1] < e[0]) break;
        n.i = e = e[2];
    }
};
(O.prototype = new (0, _preact.Component)).u = function(n) {
    var t = this, e = M(t.__v), r = t.l.get(n);
    return r[0]++, function(o) {
        var u = function() {
            t.props.revealOrder ? (r.push(o), P(t, n, r)) : o();
        };
        e ? e(u) : u();
    };
}, O.prototype.render = function(n) {
    this.i = null, this.l = new Map;
    var t = (0, _preact.toChildArray)(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
    for(var e = t.length; e--;)this.l.set(t[e], this.i = [
        1,
        0,
        this.i
    ]);
    return n.children;
}, O.prototype.componentDidUpdate = O.prototype.componentDidMount = function() {
    var n = this;
    n.l.forEach(function(t, e) {
        P(n, e, t);
    });
};
var W = function() {
    function n() {}
    var t = n.prototype;
    return t.getChildContext = function() {
        return this.props.context;
    }, t.render = function(n) {
        return n.children;
    }, n;
}();
function j(n) {
    var t = this, e = n.container, r = (0, _preact.createElement)(W, {
        context: t.context
    }, n.vnode);
    return t.s && t.s !== e && (t.v.parentNode && t.s.removeChild(t.v), (0, _preact._unmount)(t.h), t.p = !1), n.vnode ? t.p ? (e.__k = t.__k, (0, _preact.render)(r, e), t.__k = e.__k) : (t.v = document.createTextNode(""), (0, _preact.hydrate)("", e), e.appendChild(t.v), t.p = !0, t.s = e, (0, _preact.render)(r, e, t.v), t.__k = t.v.__k) : t.p && (t.v.parentNode && t.s.removeChild(t.v), (0, _preact._unmount)(t.h)), t.h = r, t.componentWillUnmount = function() {
        t.v.parentNode && t.s.removeChild(t.v), (0, _preact._unmount)(t.h);
    }, null;
}
function z(n, t) {
    return (0, _preact.createElement)(j, {
        vnode: n,
        container: t
    });
}
var D = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
(0, _preact.Component).prototype.isReactComponent = {};
var H = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
function T(n, t, e) {
    if (null == t.__k) for(; t.firstChild;)t.removeChild(t.firstChild);
    return (0, _preact.render)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function V(n, t, e) {
    return (0, _preact.hydrate)(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
var Z = (0, _preact.options).event;
function I(n, t) {
    n["UNSAFE_" + t] && !n[t] && Object.defineProperty(n, t, {
        configurable: !1,
        get: function() {
            return this["UNSAFE_" + t];
        },
        set: function(n) {
            this["UNSAFE_" + t] = n;
        }
    });
}
(0, _preact.options).event = function(n) {
    Z && (n = Z(n)), n.persist = function() {};
    var t = !1, e = !1, r = n.stopPropagation;
    n.stopPropagation = function() {
        r.call(n), t = !0;
    };
    var o = n.preventDefault;
    return n.preventDefault = function() {
        o.call(n), e = !0;
    }, n.isPropagationStopped = function() {
        return t;
    }, n.isDefaultPrevented = function() {
        return e;
    }, n.nativeEvent = n;
};
var $ = {
    configurable: !0,
    get: function() {
        return this.class;
    }
}, q = (0, _preact.options).vnode;
(0, _preact.options).vnode = function(n) {
    n.$$typeof = H;
    var t = n.type, e = n.props;
    if (t) {
        if (e.class != e.className && ($.enumerable = "className" in e, null != e.className && (e.class = e.className), Object.defineProperty(e, "className", $)), "function" != typeof t) {
            var r, o, u;
            for(u in e.defaultValue && void 0 !== e.value && (e.value || 0 === e.value || (e.value = e.defaultValue), delete e.defaultValue), Array.isArray(e.value) && e.multiple && "select" === t && ((0, _preact.toChildArray)(e.children).forEach(function(n) {
                -1 != e.value.indexOf(n.props.value) && (n.props.selected = !0);
            }), delete e.value), e)if (r = D.test(u)) break;
            if (r) for(u in o = n.props = {}, e)o[D.test(u) ? u.replace(/[A-Z0-9]/, "-$&").toLowerCase() : u] = e[u];
        }
        !function(t) {
            var e = n.type, r = n.props;
            if (r && "string" == typeof e) {
                var o = {};
                for(var u in r)/^on(Ani|Tra|Tou)/.test(u) && (r[u.toLowerCase()] = r[u], delete r[u]), o[u.toLowerCase()] = u;
                if (o.ondoubleclick && (r.ondblclick = r[o.ondoubleclick], delete r[o.ondoubleclick]), o.onbeforeinput && (r.onbeforeinput = r[o.onbeforeinput], delete r[o.onbeforeinput]), o.onchange && ("textarea" === e || "input" === e.toLowerCase() && !/^fil|che|ra/i.test(r.type))) {
                    var i = o.oninput || "oninput";
                    r[i] || (r[i] = r[o.onchange], delete r[o.onchange]);
                }
            }
        }(), "function" == typeof t && !t.m && t.prototype && (I(t.prototype, "componentWillMount"), I(t.prototype, "componentWillReceiveProps"), I(t.prototype, "componentWillUpdate"), t.m = !0);
    }
    q && q(n);
};
var B = "16.8.0";
function G(n) {
    return (0, _preact.createElement).bind(null, n);
}
function J(n) {
    return !!n && n.$$typeof === H;
}
function K(n) {
    return J(n) ? (0, _preact.cloneElement).apply(null, arguments) : n;
}
function Q(n) {
    return !!n.__k && ((0, _preact.render)(null, n), !0);
}
function X(n) {
    return n && (n.base || 1 === n.nodeType && n) || null;
}
var Y = function(n, t) {
    return n(t);
};
exports.default = {
    useState: (0, _hooks.useState),
    useReducer: (0, _hooks.useReducer),
    useEffect: (0, _hooks.useEffect),
    useLayoutEffect: (0, _hooks.useLayoutEffect),
    useRef: (0, _hooks.useRef),
    useImperativeHandle: (0, _hooks.useImperativeHandle),
    useMemo: (0, _hooks.useMemo),
    useCallback: (0, _hooks.useCallback),
    useContext: (0, _hooks.useContext),
    useDebugValue: (0, _hooks.useDebugValue),
    version: "16.8.0",
    Children: R,
    render: T,
    hydrate: T,
    unmountComponentAtNode: Q,
    createPortal: z,
    createElement: (0, _preact.createElement),
    createContext: (0, _preact.createContext),
    createFactory: G,
    cloneElement: K,
    createRef: (0, _preact.createRef),
    Fragment: (0, _preact.Fragment),
    isValidElement: J,
    findDOMNode: X,
    Component: (0, _preact.Component),
    PureComponent: C,
    memo: _,
    forwardRef: S,
    unstable_batchedUpdates: Y,
    Suspense: U,
    SuspenseList: O,
    lazy: L
};

},{"preact/hooks":"eZN76","preact":"26zcy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eZN76":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "useState", ()=>m);
parcelHelpers.export(exports, "useReducer", ()=>p);
parcelHelpers.export(exports, "useEffect", ()=>l);
parcelHelpers.export(exports, "useLayoutEffect", ()=>y);
parcelHelpers.export(exports, "useRef", ()=>d);
parcelHelpers.export(exports, "useImperativeHandle", ()=>s);
parcelHelpers.export(exports, "useMemo", ()=>h);
parcelHelpers.export(exports, "useCallback", ()=>T);
parcelHelpers.export(exports, "useContext", ()=>w);
parcelHelpers.export(exports, "useDebugValue", ()=>A);
parcelHelpers.export(exports, "useErrorBoundary", ()=>F);
var _preact = require("preact");
var t, u, r, i = 0, o = [], c = (0, _preact.options).__r, f = (0, _preact.options).diffed, e = (0, _preact.options).__c, a = (0, _preact.options).unmount;
function v(t, r) {
    (0, _preact.options).__h && (0, _preact.options).__h(u, t, i || r), i = 0;
    var o = u.__H || (u.__H = {
        __: [],
        __h: []
    });
    return t >= o.__.length && o.__.push({}), o.__[t];
}
function m(n) {
    return i = 1, p(E, n);
}
function p(n, r, i) {
    var o = v(t++, 2);
    return o.__c || (o.__c = u, o.__ = [
        i ? i(r) : E(void 0, r),
        function(t) {
            var u = n(o.__[0], t);
            o.__[0] !== u && (o.__[0] = u, o.__c.setState({}));
        }
    ]), o.__;
}
function l(r, i) {
    var o = v(t++, 3);
    !(0, _preact.options).__s && x(o.__H, i) && (o.__ = r, o.__H = i, u.__H.__h.push(o));
}
function y(r, i) {
    var o = v(t++, 4);
    !(0, _preact.options).__s && x(o.__H, i) && (o.__ = r, o.__H = i, u.__h.push(o));
}
function d(n) {
    return i = 5, h(function() {
        return {
            current: n
        };
    }, []);
}
function s(n, t, u) {
    i = 6, y(function() {
        "function" == typeof n ? n(t()) : n && (n.current = t());
    }, null == u ? u : u.concat(n));
}
function h(n, u) {
    var r = v(t++, 7);
    return x(r.__H, u) ? (r.__H = u, r.__h = n, r.__ = n()) : r.__;
}
function T(n, t) {
    return i = 8, h(function() {
        return n;
    }, t);
}
function w(n) {
    var r = u.context[n.__c], i = v(t++, 9);
    return i.__c = n, r ? (null == i.__ && (i.__ = !0, r.sub(u)), r.props.value) : n.__;
}
function A(t, u) {
    (0, _preact.options).useDebugValue && (0, _preact.options).useDebugValue(u ? u(t) : t);
}
function F(n) {
    var r = v(t++, 10), i = m();
    return r.__ = n, u.componentDidCatch || (u.componentDidCatch = function(n) {
        r.__ && r.__(n), i[1](n);
    }), [
        i[0],
        function() {
            i[1](void 0);
        }
    ];
}
function _() {
    o.some(function(t) {
        if (t.__P) try {
            t.__H.__h.forEach(g), t.__H.__h.forEach(q), t.__H.__h = [];
        } catch (u) {
            return t.__H.__h = [], (0, _preact.options).__e(u, t.__v), !0;
        }
    }), o = [];
}
function g(n) {
    n.t && n.t();
}
function q(n) {
    var t = n.__();
    "function" == typeof t && (n.t = t);
}
function x(n, t) {
    return !n || t.some(function(t, u) {
        return t !== n[u];
    });
}
function E(n, t) {
    return "function" == typeof t ? t(n) : t;
}
(0, _preact.options).__r = function(n) {
    c && c(n), t = 0, (u = n.__c).__H && (u.__H.__h.forEach(g), u.__H.__h.forEach(q), u.__H.__h = []);
}, (0, _preact.options).diffed = function(t) {
    f && f(t);
    var u = t.__c;
    if (u) {
        var i = u.__H;
        i && i.__h.length && (1 !== o.push(u) && r === (0, _preact.options).requestAnimationFrame || ((r = (0, _preact.options).requestAnimationFrame) || function(n) {
            var t, u = function() {
                clearTimeout(r), cancelAnimationFrame(t), setTimeout(n);
            }, r = setTimeout(u, 100);
            "undefined" != typeof window && (t = requestAnimationFrame(u));
        })(_));
    }
}, (0, _preact.options).__c = function(t, u) {
    u.some(function(t) {
        try {
            t.__h.forEach(g), t.__h = t.__h.filter(function(n) {
                return !n.__ || q(n);
            });
        } catch (r) {
            u.some(function(n) {
                n.__h && (n.__h = []);
            }), u = [], (0, _preact.options).__e(r, t.__v);
        }
    }), e && e(t, u);
}, (0, _preact.options).unmount = function(t) {
    a && a(t);
    var u = t.__c;
    if (u) {
        var r = u.__H;
        if (r) try {
            r.__.forEach(function(n) {
                return n.t && n.t();
            });
        } catch (t) {
            (0, _preact.options).__e(t, u.__v);
        }
    }
};

},{"preact":"26zcy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"26zcy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "render", ()=>H);
parcelHelpers.export(exports, "hydrate", ()=>I);
parcelHelpers.export(exports, "createElement", ()=>h);
parcelHelpers.export(exports, "h", ()=>h);
parcelHelpers.export(exports, "Fragment", ()=>d);
parcelHelpers.export(exports, "createRef", ()=>y);
parcelHelpers.export(exports, "isValidElement", ()=>l);
parcelHelpers.export(exports, "Component", ()=>m);
parcelHelpers.export(exports, "cloneElement", ()=>L);
parcelHelpers.export(exports, "createContext", ()=>M);
parcelHelpers.export(exports, "toChildArray", ()=>x);
parcelHelpers.export(exports, "_unmount", ()=>D);
parcelHelpers.export(exports, "options", ()=>n);
var n, l, u, i, t, r, o, f, e = {}, c = [], s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
function a(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function v(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function h(n, l, u) {
    var i, t = arguments, r = {};
    for(i in l)"key" !== i && "ref" !== i && (r[i] = l[i]);
    if (arguments.length > 3) for(u = [
        u
    ], i = 3; i < arguments.length; i++)u.push(t[i]);
    if (null != u && (r.children = u), "function" == typeof n && null != n.defaultProps) for(i in n.defaultProps)void 0 === r[i] && (r[i] = n.defaultProps[i]);
    return p(n, r, l && l.key, l && l.ref, null);
}
function p(l, u, i, t, r) {
    var o = {
        type: l,
        props: u,
        key: i,
        ref: t,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: r
    };
    return null == r && (o.__v = o), n.vnode && n.vnode(o), o;
}
function y() {
    return {};
}
function d(n) {
    return n.children;
}
function m(n, l) {
    this.props = n, this.context = l;
}
function w(n, l) {
    if (null == l) return n.__ ? w(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? w(n) : null;
}
function k(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return k(n);
    }
}
function g(l) {
    (!l.__d && (l.__d = !0) && u.push(l) && !i++ || r !== n.debounceRendering) && ((r = n.debounceRendering) || t)(_);
}
function _() {
    for(var n; i = u.length;)n = u.sort(function(n, l) {
        return n.__v.__b - l.__v.__b;
    }), u = [], n.some(function(n) {
        var l, u, i, t, r, o, f;
        n.__d && (o = (r = (l = n).__v).__e, (f = l.__P) && (u = [], (i = a({}, r)).__v = i, t = A(f, r, i, l.__n, void 0 !== f.ownerSVGElement, null, u, null == o ? w(r) : o), T(u, r), t != o && k(r)));
    });
}
function b(n, l, u, i, t, r, o, f, s) {
    var a, h, p, y, d, m, k, g = u && u.__k || c, _ = g.length;
    if (f == e && (f = null != r ? r[0] : _ ? w(u, 0) : null), a = 0, l.__k = x(l.__k, function(u) {
        if (null != u) {
            if (u.__ = l, u.__b = l.__b + 1, null === (p = g[a]) || p && u.key == p.key && u.type === p.type) g[a] = void 0;
            else for(h = 0; h < _; h++){
                if ((p = g[h]) && u.key == p.key && u.type === p.type) {
                    g[h] = void 0;
                    break;
                }
                p = null;
            }
            if (y = A(n, u, p = p || e, i, t, r, o, f, s), (h = u.ref) && p.ref != h && (k || (k = []), p.ref && k.push(p.ref, null, u), k.push(h, u.__c || y, u)), null != y) {
                var c;
                if (null == m && (m = y), void 0 !== u.__d) c = u.__d, u.__d = void 0;
                else if (r == p || y != f || null == y.parentNode) {
                    n: if (null == f || f.parentNode !== n) n.appendChild(y), c = null;
                    else {
                        for(d = f, h = 0; (d = d.nextSibling) && h < _; h += 2)if (d == y) break n;
                        n.insertBefore(y, f), c = f;
                    }
                    "option" == l.type && (n.value = "");
                }
                f = void 0 !== c ? c : y.nextSibling, "function" == typeof l.type && (l.__d = f);
            } else f && p.__e == f && f.parentNode != n && (f = w(p));
        }
        return a++, u;
    }), l.__e = m, null != r && "function" != typeof l.type) for(a = r.length; a--;)null != r[a] && v(r[a]);
    for(a = _; a--;)null != g[a] && D(g[a], g[a]);
    if (k) for(a = 0; a < k.length; a++)j(k[a], k[++a], k[++a]);
}
function x(n, l, u) {
    if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));
    else if (Array.isArray(n)) for(var i = 0; i < n.length; i++)x(n[i], l, u);
    else u.push(l ? l("string" == typeof n || "number" == typeof n ? p(null, n, null, null, n) : null != n.__e || null != n.__c ? p(n.type, n.props, n.key, null, n.__v) : n) : n);
    return u;
}
function P(n, l, u, i, t) {
    var r;
    for(r in u)"children" === r || "key" === r || r in l || N(n, r, null, u[r], i);
    for(r in l)t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || N(n, r, l[r], u[r], i);
}
function C(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === s.test(l) ? u + "px" : null == u ? "" : u;
}
function N(n, l, u, i, t) {
    var r, o, f, e, c;
    if (t ? "className" === l && (l = "class") : "class" === l && (l = "className"), "style" === l) {
        if (r = n.style, "string" == typeof u) r.cssText = u;
        else {
            if ("string" == typeof i && (r.cssText = "", i = null), i) for(e in i)u && e in u || C(r, e, "");
            if (u) for(c in u)i && u[c] === i[c] || C(r, c, u[c]);
        }
    } else "o" === l[0] && "n" === l[1] ? (o = l !== (l = l.replace(/Capture$/, "")), f = l.toLowerCase(), l = (f in n ? f : l).slice(2), u ? (i || n.addEventListener(l, z, o), (n.l || (n.l = {}))[l] = u) : n.removeEventListener(l, z, o)) : "list" !== l && "tagName" !== l && "form" !== l && "type" !== l && "size" !== l && !t && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u && !/^ar/.test(l) ? n.removeAttribute(l) : n.setAttribute(l, u));
}
function z(l) {
    this.l[l.type](n.event ? n.event(l) : l);
}
function A(l, u, i, t, r, o, f, e, c) {
    var s, v, h, p, y, w, k, g, _, x, P = u.type;
    if (void 0 !== u.constructor) return null;
    (s = n.__b) && s(u);
    try {
        n: if ("function" == typeof P) {
            if (g = u.props, _ = (s = P.contextType) && t[s.__c], x = s ? _ ? _.props.value : s.__ : t, i.__c ? k = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new m(g, x), v.constructor = P, v.render = E), _ && _.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = a({}, v.__s)), a(v.__s, P.getDerivedStateFromProps(g, v.__s))), p = v.props, y = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);
            else {
                if (null == P.getDerivedStateFromProps && g !== p && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v && !v.__) {
                    for(v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, v.__h.length && f.push(v), s = 0; s < u.__k.length; s++)u.__k[s] && (u.__k[s].__ = u);
                    break n;
                }
                null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function() {
                    v.componentDidUpdate(p, y, w);
                });
            }
            v.context = x, v.props = g, v.state = v.__s, (s = n.__r) && s(u), v.__d = !1, v.__v = u, v.__P = l, s = v.render(v.props, v.state, v.context), u.__k = null != s && s.type == d && null == s.key ? s.props.children : Array.isArray(s) ? s : [
                s
            ], null != v.getChildContext && (t = a(a({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (w = v.getSnapshotBeforeUpdate(p, y)), b(l, u, i, t, r, o, f, e, c), v.base = u.__e, v.__h.length && f.push(v), k && (v.__E = v.__ = null), v.__e = !1;
        } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = $(i.__e, u, i, t, r, o, f, c);
        (s = n.diffed) && s(u);
    } catch (l) {
        u.__v = null, n.__e(l, u, i);
    }
    return u.__e;
}
function T(l, u) {
    n.__c && n.__c(u, l), l.some(function(u) {
        try {
            l = u.__h, u.__h = [], l.some(function(n) {
                n.call(u);
            });
        } catch (l) {
            n.__e(l, u.__v);
        }
    });
}
function $(n, l, u, i, t, r, o, f) {
    var s, a, v, h, p, y = u.props, d = l.props;
    if (t = "svg" === l.type || t, null != r) {
        for(s = 0; s < r.length; s++)if (null != (a = r[s]) && ((null === l.type ? 3 === a.nodeType : a.localName === l.type) || n == a)) {
            n = a, r[s] = null;
            break;
        }
    }
    if (null == n) {
        if (null === l.type) return document.createTextNode(d);
        n = t ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type, d.is && {
            is: d.is
        }), r = null, f = !1;
    }
    if (null === l.type) y !== d && n.data != d && (n.data = d);
    else {
        if (null != r && (r = c.slice.call(n.childNodes)), v = (y = u.props || e).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !f) {
            if (y === e) for(y = {}, p = 0; p < n.attributes.length; p++)y[n.attributes[p].name] = n.attributes[p].value;
            (h || v) && (h && v && h.__html == v.__html || (n.innerHTML = h && h.__html || ""));
        }
        P(n, d, y, t, f), h ? l.__k = [] : (l.__k = l.props.children, b(n, l, u, i, "foreignObject" !== l.type && t, r, o, e, f)), f || ("value" in d && void 0 !== (s = d.value) && s !== n.value && N(n, "value", s, y.value, !1), "checked" in d && void 0 !== (s = d.checked) && s !== n.checked && N(n, "checked", s, y.checked, !1));
    }
    return n;
}
function j(l, u, i) {
    try {
        "function" == typeof l ? l(u) : l.current = u;
    } catch (l) {
        n.__e(l, i);
    }
}
function D(l, u, i) {
    var t, r, o;
    if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || j(t, null, u)), i || "function" == typeof l.type || (i = null != (r = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (l) {
            n.__e(l, u);
        }
        t.base = t.__P = null;
    }
    if (t = l.__k) for(o = 0; o < t.length; o++)t[o] && D(t[o], u, i);
    null != r && v(r);
}
function E(n, l, u) {
    return this.constructor(n, u);
}
function H(l, u, i) {
    var t, r, f;
    n.__ && n.__(l, u), r = (t = i === o) ? null : i && i.__k || u.__k, l = h(d, null, [
        l
    ]), f = [], A(u, (t ? u : i || u).__k = l, r || e, e, void 0 !== u.ownerSVGElement, i && !t ? [
        i
    ] : r ? null : c.slice.call(u.childNodes), f, i || e, t), T(f, l);
}
function I(n, l) {
    H(n, l, o);
}
function L(n, l) {
    var u, i;
    for(i in l = a(a({}, n.props), l), arguments.length > 2 && (l.children = c.slice.call(arguments, 2)), u = {}, l)"key" !== i && "ref" !== i && (u[i] = l[i]);
    return p(n.type, u, l.key || n.key, l.ref || n.ref, null);
}
function M(n) {
    var l = {}, u = {
        __c: "__cC" + f++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var i, t = this;
            return this.getChildContext || (i = [], this.getChildContext = function() {
                return l[u.__c] = t, l;
            }, this.shouldComponentUpdate = function(n) {
                t.props.value !== n.value && i.some(function(l) {
                    l.context = n.value, g(l);
                });
            }, this.sub = function(n) {
                i.push(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    i.splice(i.indexOf(n), 1), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Consumer.contextType = u, u.Provider.__ = u, u;
}
n = {
    __e: function(n, l) {
        for(var u, i; l = l.__;)if ((u = l.__c) && !u.__) try {
            if (u.constructor && null != u.constructor.getDerivedStateFromError && (i = !0, u.setState(u.constructor.getDerivedStateFromError(n))), null != u.componentDidCatch && (i = !0, u.componentDidCatch(n)), i) return g(u.__E = u);
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, l = function(n) {
    return null != n && void 0 === n.constructor;
}, m.prototype.setState = function(n, l) {
    var u;
    u = this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n && (n = n(u, this.props)), n && a(u, n), null != n && this.__v && (l && this.__h.push(l), g(this));
}, m.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), g(this));
}, m.prototype.render = d, u = [], i = 0, t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, o = e, f = 0;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jFnQj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ENGINE_CONTEXT", ()=>ie);
parcelHelpers.export(exports, "ENGINE_RPC_OPTS", ()=>V);
parcelHelpers.export(exports, "HISTORY_CONTEXT", ()=>Ye);
parcelHelpers.export(exports, "HISTORY_EVENTS", ()=>je);
parcelHelpers.export(exports, "HISTORY_STORAGE_VERSION", ()=>ke);
parcelHelpers.export(exports, "PROPOSAL_CONTEXT", ()=>ee);
parcelHelpers.export(exports, "PROPOSAL_EXPIRY", ()=>Xe);
parcelHelpers.export(exports, "PROPOSAL_EXPIRY_MESSAGE", ()=>se);
parcelHelpers.export(exports, "REQUEST_CONTEXT", ()=>ne);
parcelHelpers.export(exports, "SESSION_CONTEXT", ()=>te);
parcelHelpers.export(exports, "SESSION_EXPIRY", ()=>b);
parcelHelpers.export(exports, "SESSION_REQUEST_EXPIRY_BOUNDARIES", ()=>$);
parcelHelpers.export(exports, "SIGN_CLIENT_CONTEXT", ()=>J);
parcelHelpers.export(exports, "SIGN_CLIENT_DEFAULT", ()=>G);
parcelHelpers.export(exports, "SIGN_CLIENT_EVENTS", ()=>Ke);
parcelHelpers.export(exports, "SIGN_CLIENT_PROTOCOL", ()=>k);
parcelHelpers.export(exports, "SIGN_CLIENT_STORAGE_OPTIONS", ()=>ze);
parcelHelpers.export(exports, "SIGN_CLIENT_STORAGE_PREFIX", ()=>C);
parcelHelpers.export(exports, "SIGN_CLIENT_VERSION", ()=>X);
parcelHelpers.export(exports, "SignClient", ()=>ts);
parcelHelpers.export(exports, "default", ()=>M);
var _pino = require("pino");
var _pinoDefault = parcelHelpers.interopDefault(_pino);
var _core = require("@walletconnect/core");
var _logger = require("@walletconnect/logger");
var _types = require("@walletconnect/types");
var _utils = require("@walletconnect/utils");
var _events = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events);
var _time = require("@walletconnect/time");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
const k = "wc", X = 2, J = "client", C = `${k}@${X}:${J}:`, G = {
    name: J,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.com"
}, Ke = {
    session_proposal: "session_proposal",
    session_update: "session_update",
    session_extend: "session_extend",
    session_ping: "session_ping",
    session_delete: "session_delete",
    session_expire: "session_expire",
    session_request: "session_request",
    session_request_sent: "session_request_sent",
    session_event: "session_event",
    proposal_expire: "proposal_expire"
}, ze = {
    database: ":memory:"
}, je = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}, Ye = "history", ke = "0.3", ee = "proposal", Xe = (0, _time.THIRTY_DAYS), se = "Proposal expired", te = "session", b = (0, _time.SEVEN_DAYS), ie = "engine", V = {
    wc_sessionPropose: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !0,
            tag: 1100
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1101
        }
    },
    wc_sessionSettle: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1102
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1103
        }
    },
    wc_sessionUpdate: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1104
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1105
        }
    },
    wc_sessionExtend: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1106
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1107
        }
    },
    wc_sessionRequest: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !0,
            tag: 1108
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1109
        }
    },
    wc_sessionEvent: {
        req: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !0,
            tag: 1110
        },
        res: {
            ttl: (0, _time.FIVE_MINUTES),
            prompt: !1,
            tag: 1111
        }
    },
    wc_sessionDelete: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1112
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1113
        }
    },
    wc_sessionPing: {
        req: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1114
        },
        res: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1115
        }
    }
}, $ = {
    min: (0, _time.FIVE_MINUTES),
    max: (0, _time.SEVEN_DAYS)
}, ne = "request";
var Je = Object.defineProperty, He = Object.defineProperties, Fe = Object.getOwnPropertyDescriptors, oe = Object.getOwnPropertySymbols, Be = Object.prototype.hasOwnProperty, Qe = Object.prototype.propertyIsEnumerable, re = (d, n, e)=>n in d ? Je(d, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : d[n] = e, u = (d, n)=>{
    for(var e in n || (n = {}))Be.call(n, e) && re(d, e, n[e]);
    if (oe) for (var e of oe(n))Qe.call(n, e) && re(d, e, n[e]);
    return d;
}, H = (d, n)=>He(d, Fe(n));
class We extends (0, _types.IEngine) {
    constructor(n){
        super(n), this.name = ie, this.events = new (0, _eventsDefault.default), this.initialized = !1, this.ignoredPayloadTypes = [
            (0, _utils.TYPE_1)
        ], this.init = async ()=>{
            this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.client.core.pairing.register({
                methods: Object.keys(V)
            }), this.initialized = !0);
        }, this.connect = async (e)=>{
            this.isInitialized();
            const s = H(u({}, e), {
                requiredNamespaces: e.requiredNamespaces || {},
                optionalNamespaces: e.optionalNamespaces || {}
            });
            await this.isValidConnect(s);
            const { pairingTopic: t , requiredNamespaces: i , optionalNamespaces: o , sessionProperties: a , relays: r  } = s;
            let l = t, h, S = !1;
            if (l && (S = this.client.core.pairing.pairings.get(l).active), !l || !S) {
                const { topic: I , uri: g  } = await this.client.core.pairing.create();
                l = I, h = g;
            }
            const m = await this.client.core.crypto.generateKeyPair(), P = u({
                requiredNamespaces: i,
                optionalNamespaces: o,
                relays: r ?? [
                    {
                        protocol: (0, _core.RELAYER_DEFAULT_PROTOCOL)
                    }
                ],
                proposer: {
                    publicKey: m,
                    metadata: this.client.metadata
                }
            }, a && {
                sessionProperties: a
            }), { reject: E , resolve: T , done: U  } = (0, _utils.createDelayedPromise)((0, _time.FIVE_MINUTES), se);
            if (this.events.once((0, _utils.engineEvent)("session_connect"), async ({ error: I , session: g  })=>{
                if (I) E(I);
                else if (g) {
                    g.self.publicKey = m;
                    const x = H(u({}, g), {
                        requiredNamespaces: g.requiredNamespaces,
                        optionalNamespaces: g.optionalNamespaces
                    });
                    await this.client.session.set(g.topic, x), await this.setExpiry(g.topic, g.expiry), l && await this.client.core.pairing.updateMetadata({
                        topic: l,
                        metadata: g.peer.metadata
                    }), T(x);
                }
            }), !l) {
                const { message: I  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `connect() pairing topic: ${l}`);
                throw new Error(I);
            }
            const L = await this.sendRequest(l, "wc_sessionPropose", P), K = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES));
            return await this.setProposal(L, u({
                id: L,
                expiry: K
            }, P)), {
                uri: h,
                approval: U
            };
        }, this.pair = async (e)=>(this.isInitialized(), await this.client.core.pairing.pair(e)), this.approve = async (e)=>{
            this.isInitialized(), await this.isValidApprove(e);
            const { id: s , relayProtocol: t , namespaces: i , sessionProperties: o  } = e, a = this.client.proposal.get(s);
            let { pairingTopic: r , proposer: l , requiredNamespaces: h , optionalNamespaces: S  } = a;
            (0, _utils.isValidObject)(h) || (h = (0, _utils.getRequiredNamespacesFromNamespaces)(i, "approve()"));
            const m = await this.client.core.crypto.generateKeyPair(), P = l.publicKey, E = await this.client.core.crypto.generateSharedKey(m, P);
            r && s && (await this.client.core.pairing.updateMetadata({
                topic: r,
                metadata: l.metadata
            }), await this.sendResult(s, r, {
                relay: {
                    protocol: t ?? "irn"
                },
                responderPublicKey: m
            }), await this.client.proposal.delete(s, (0, _utils.getSdkError)("USER_DISCONNECTED")), await this.client.core.pairing.activate({
                topic: r
            }));
            const T = u({
                relay: {
                    protocol: t ?? "irn"
                },
                namespaces: i,
                requiredNamespaces: h,
                optionalNamespaces: S,
                controller: {
                    publicKey: m,
                    metadata: this.client.metadata
                },
                expiry: (0, _utils.calcExpiry)(b)
            }, o && {
                sessionProperties: o
            });
            await this.client.core.relayer.subscribe(E);
            const U = await this.sendRequest(E, "wc_sessionSettle", T), { done: L , resolve: K , reject: I  } = (0, _utils.createDelayedPromise)();
            this.events.once((0, _utils.engineEvent)("session_approve", U), ({ error: x  })=>{
                x ? I(x) : K(this.client.session.get(E));
            });
            const g = H(u({}, T), {
                topic: E,
                acknowledged: !1,
                self: T.controller,
                peer: {
                    publicKey: l.publicKey,
                    metadata: l.metadata
                },
                controller: m
            });
            return await this.client.session.set(E, g), await this.setExpiry(E, (0, _utils.calcExpiry)(b)), {
                topic: E,
                acknowledged: L
            };
        }, this.reject = async (e)=>{
            this.isInitialized(), await this.isValidReject(e);
            const { id: s , reason: t  } = e, { pairingTopic: i  } = this.client.proposal.get(s);
            i && (await this.sendError(s, i, t), await this.client.proposal.delete(s, (0, _utils.getSdkError)("USER_DISCONNECTED")));
        }, this.update = async (e)=>{
            this.isInitialized(), await this.isValidUpdate(e);
            const { topic: s , namespaces: t  } = e, i = await this.sendRequest(s, "wc_sessionUpdate", {
                namespaces: t
            }), { done: o , resolve: a , reject: r  } = (0, _utils.createDelayedPromise)();
            return this.events.once((0, _utils.engineEvent)("session_update", i), ({ error: l  })=>{
                l ? r(l) : a();
            }), await this.client.session.update(s, {
                namespaces: t
            }), {
                acknowledged: o
            };
        }, this.extend = async (e)=>{
            this.isInitialized(), await this.isValidExtend(e);
            const { topic: s  } = e, t = await this.sendRequest(s, "wc_sessionExtend", {}), { done: i , resolve: o , reject: a  } = (0, _utils.createDelayedPromise)();
            return this.events.once((0, _utils.engineEvent)("session_extend", t), ({ error: r  })=>{
                r ? a(r) : o();
            }), await this.setExpiry(s, (0, _utils.calcExpiry)(b)), {
                acknowledged: i
            };
        }, this.request = async (e)=>{
            this.isInitialized(), await this.isValidRequest(e);
            const { chainId: s , request: t , topic: i , expiry: o  } = e, a = await this.sendRequest(i, "wc_sessionRequest", {
                request: t,
                chainId: s
            }, o), { done: r , resolve: l , reject: h  } = (0, _utils.createDelayedPromise)(o);
            return this.events.once((0, _utils.engineEvent)("session_request", a), ({ error: S , result: m  })=>{
                S ? h(S) : l(m);
            }), this.client.events.emit("session_request_sent", {
                topic: i,
                request: t,
                chainId: s
            }), await r();
        }, this.respond = async (e)=>{
            this.isInitialized(), await this.isValidRespond(e);
            const { topic: s , response: t  } = e, { id: i  } = t;
            (0, _jsonrpcUtils.isJsonRpcResult)(t) ? await this.sendResult(i, s, t.result) : (0, _jsonrpcUtils.isJsonRpcError)(t) && await this.sendError(i, s, t.error), this.deletePendingSessionRequest(e.response.id, {
                message: "fulfilled",
                code: 0
            });
        }, this.ping = async (e)=>{
            this.isInitialized(), await this.isValidPing(e);
            const { topic: s  } = e;
            if (this.client.session.keys.includes(s)) {
                const t = await this.sendRequest(s, "wc_sessionPing", {}), { done: i , resolve: o , reject: a  } = (0, _utils.createDelayedPromise)();
                this.events.once((0, _utils.engineEvent)("session_ping", t), ({ error: r  })=>{
                    r ? a(r) : o();
                }), await i();
            } else this.client.core.pairing.pairings.keys.includes(s) && await this.client.core.pairing.ping({
                topic: s
            });
        }, this.emit = async (e)=>{
            this.isInitialized(), await this.isValidEmit(e);
            const { topic: s , event: t , chainId: i  } = e;
            await this.sendRequest(s, "wc_sessionEvent", {
                event: t,
                chainId: i
            });
        }, this.disconnect = async (e)=>{
            this.isInitialized(), await this.isValidDisconnect(e);
            const { topic: s  } = e;
            this.client.session.keys.includes(s) ? (await this.sendRequest(s, "wc_sessionDelete", (0, _utils.getSdkError)("USER_DISCONNECTED")), await this.deleteSession(s)) : await this.client.core.pairing.disconnect({
                topic: s
            });
        }, this.find = (e)=>(this.isInitialized(), this.client.session.getAll().filter((s)=>(0, _utils.isSessionCompatible)(s, e))), this.getPendingSessionRequests = ()=>(this.isInitialized(), this.client.pendingRequest.getAll()), this.deleteSession = async (e, s)=>{
            const { self: t  } = this.client.session.get(e);
            await this.client.core.relayer.unsubscribe(e), await Promise.all([
                this.client.session.delete(e, (0, _utils.getSdkError)("USER_DISCONNECTED")),
                this.client.core.crypto.deleteKeyPair(t.publicKey),
                this.client.core.crypto.deleteSymKey(e),
                s ? Promise.resolve() : this.client.core.expirer.del(e)
            ]);
        }, this.deleteProposal = async (e, s)=>{
            await Promise.all([
                this.client.proposal.delete(e, (0, _utils.getSdkError)("USER_DISCONNECTED")),
                s ? Promise.resolve() : this.client.core.expirer.del(e)
            ]);
        }, this.deletePendingSessionRequest = async (e, s, t = !1)=>{
            await Promise.all([
                this.client.pendingRequest.delete(e, s),
                t ? Promise.resolve() : this.client.core.expirer.del(e)
            ]);
        }, this.setExpiry = async (e, s)=>{
            this.client.session.keys.includes(e) && await this.client.session.update(e, {
                expiry: s
            }), this.client.core.expirer.set(e, s);
        }, this.setProposal = async (e, s)=>{
            await this.client.proposal.set(e, s), this.client.core.expirer.set(e, s.expiry);
        }, this.setPendingSessionRequest = async (e)=>{
            const s = V.wc_sessionRequest.req.ttl, { id: t , topic: i , params: o  } = e;
            await this.client.pendingRequest.set(t, {
                id: t,
                topic: i,
                params: o
            }), s && this.client.core.expirer.set(t, (0, _utils.calcExpiry)(s));
        }, this.sendRequest = async (e, s, t, i)=>{
            const o = (0, _jsonrpcUtils.formatJsonRpcRequest)(s, t), a = await this.client.core.crypto.encode(e, o), r = V[s].req;
            return i && (r.ttl = i), this.client.core.history.set(e, o), this.client.core.relayer.publish(e, a, r), o.id;
        }, this.sendResult = async (e, s, t)=>{
            const i = (0, _jsonrpcUtils.formatJsonRpcResult)(e, t), o = await this.client.core.crypto.encode(s, i), a = await this.client.core.history.get(s, e), r = V[a.request.method].res;
            this.client.core.relayer.publish(s, o, r), await this.client.core.history.resolve(i);
        }, this.sendError = async (e, s, t)=>{
            const i = (0, _jsonrpcUtils.formatJsonRpcError)(e, t), o = await this.client.core.crypto.encode(s, i), a = await this.client.core.history.get(s, e), r = V[a.request.method].res;
            this.client.core.relayer.publish(s, o, r), await this.client.core.history.resolve(i);
        }, this.cleanup = async ()=>{
            const e = [], s = [];
            this.client.session.getAll().forEach((t)=>{
                (0, _utils.isExpired)(t.expiry) && e.push(t.topic);
            }), this.client.proposal.getAll().forEach((t)=>{
                (0, _utils.isExpired)(t.expiry) && s.push(t.id);
            }), await Promise.all([
                ...e.map((t)=>this.deleteSession(t)),
                ...s.map((t)=>this.deleteProposal(t))
            ]);
        }, this.onRelayEventRequest = (e)=>{
            const { topic: s , payload: t  } = e, i = t.method;
            switch(i){
                case "wc_sessionPropose":
                    return this.onSessionProposeRequest(s, t);
                case "wc_sessionSettle":
                    return this.onSessionSettleRequest(s, t);
                case "wc_sessionUpdate":
                    return this.onSessionUpdateRequest(s, t);
                case "wc_sessionExtend":
                    return this.onSessionExtendRequest(s, t);
                case "wc_sessionPing":
                    return this.onSessionPingRequest(s, t);
                case "wc_sessionDelete":
                    return this.onSessionDeleteRequest(s, t);
                case "wc_sessionRequest":
                    return this.onSessionRequest(s, t);
                case "wc_sessionEvent":
                    return this.onSessionEventRequest(s, t);
                default:
                    return this.client.logger.info(`Unsupported request method ${i}`);
            }
        }, this.onRelayEventResponse = async (e)=>{
            const { topic: s , payload: t  } = e, i = (await this.client.core.history.get(s, t.id)).request.method;
            switch(i){
                case "wc_sessionPropose":
                    return this.onSessionProposeResponse(s, t);
                case "wc_sessionSettle":
                    return this.onSessionSettleResponse(s, t);
                case "wc_sessionUpdate":
                    return this.onSessionUpdateResponse(s, t);
                case "wc_sessionExtend":
                    return this.onSessionExtendResponse(s, t);
                case "wc_sessionPing":
                    return this.onSessionPingResponse(s, t);
                case "wc_sessionRequest":
                    return this.onSessionRequestResponse(s, t);
                default:
                    return this.client.logger.info(`Unsupported response method ${i}`);
            }
        }, this.onSessionProposeRequest = async (e, s)=>{
            const { params: t , id: i  } = s;
            try {
                this.isValidConnect(u({}, s.params));
                const o = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES)), a = u({
                    id: i,
                    pairingTopic: e,
                    expiry: o
                }, t);
                await this.setProposal(i, a), this.client.events.emit("session_proposal", {
                    id: i,
                    params: a
                });
            } catch (o) {
                await this.sendError(i, e, o), this.client.logger.error(o);
            }
        }, this.onSessionProposeResponse = async (e, s)=>{
            const { id: t  } = s;
            if ((0, _jsonrpcUtils.isJsonRpcResult)(s)) {
                const { result: i  } = s;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    result: i
                });
                const o = this.client.proposal.get(t);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    proposal: o
                });
                const a = o.proposer.publicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    selfPublicKey: a
                });
                const r = i.responderPublicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    peerPublicKey: r
                });
                const l = await this.client.core.crypto.generateSharedKey(a, r);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    sessionTopic: l
                });
                const h = await this.client.core.relayer.subscribe(l);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    subscriptionId: h
                }), await this.client.core.pairing.activate({
                    topic: e
                });
            } else (0, _jsonrpcUtils.isJsonRpcError)(s) && (await this.client.proposal.delete(t, (0, _utils.getSdkError)("USER_DISCONNECTED")), this.events.emit((0, _utils.engineEvent)("session_connect"), {
                error: s.error
            }));
        }, this.onSessionSettleRequest = async (e, s)=>{
            const { id: t , params: i  } = s;
            try {
                this.isValidSessionSettleRequest(i);
                const { relay: o , controller: a , expiry: r , namespaces: l , requiredNamespaces: h , optionalNamespaces: S , sessionProperties: m  } = s.params, P = u({
                    topic: e,
                    relay: o,
                    expiry: r,
                    namespaces: l,
                    acknowledged: !0,
                    requiredNamespaces: h,
                    optionalNamespaces: S,
                    controller: a.publicKey,
                    self: {
                        publicKey: "",
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: a.publicKey,
                        metadata: a.metadata
                    }
                }, m && {
                    sessionProperties: m
                });
                await this.sendResult(s.id, e, !0), this.events.emit((0, _utils.engineEvent)("session_connect"), {
                    session: P
                });
            } catch (o) {
                await this.sendError(t, e, o), this.client.logger.error(o);
            }
        }, this.onSessionSettleResponse = async (e, s)=>{
            const { id: t  } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? (await this.client.session.update(e, {
                acknowledged: !0
            }), this.events.emit((0, _utils.engineEvent)("session_approve", t), {})) : (0, _jsonrpcUtils.isJsonRpcError)(s) && (await this.client.session.delete(e, (0, _utils.getSdkError)("USER_DISCONNECTED")), this.events.emit((0, _utils.engineEvent)("session_approve", t), {
                error: s.error
            }));
        }, this.onSessionUpdateRequest = async (e, s)=>{
            const { params: t , id: i  } = s;
            try {
                this.isValidUpdate(u({
                    topic: e
                }, t)), await this.client.session.update(e, {
                    namespaces: t.namespaces
                }), await this.sendResult(i, e, !0), this.client.events.emit("session_update", {
                    id: i,
                    topic: e,
                    params: t
                });
            } catch (o) {
                await this.sendError(i, e, o), this.client.logger.error(o);
            }
        }, this.onSessionUpdateResponse = (e, s)=>{
            const { id: t  } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_update", t), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_update", t), {
                error: s.error
            });
        }, this.onSessionExtendRequest = async (e, s)=>{
            const { id: t  } = s;
            try {
                this.isValidExtend({
                    topic: e
                }), await this.setExpiry(e, (0, _utils.calcExpiry)(b)), await this.sendResult(t, e, !0), this.client.events.emit("session_extend", {
                    id: t,
                    topic: e
                });
            } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
            }
        }, this.onSessionExtendResponse = (e, s)=>{
            const { id: t  } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_extend", t), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_extend", t), {
                error: s.error
            });
        }, this.onSessionPingRequest = async (e, s)=>{
            const { id: t  } = s;
            try {
                this.isValidPing({
                    topic: e
                }), await this.sendResult(t, e, !0), this.client.events.emit("session_ping", {
                    id: t,
                    topic: e
                });
            } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
            }
        }, this.onSessionPingResponse = (e, s)=>{
            const { id: t  } = s;
            setTimeout(()=>{
                (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_ping", t), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_ping", t), {
                    error: s.error
                });
            }, 500);
        }, this.onSessionDeleteRequest = async (e, s)=>{
            const { id: t  } = s;
            try {
                this.isValidDisconnect({
                    topic: e,
                    reason: s.params
                }), this.client.core.relayer.once((0, _core.RELAYER_EVENTS).publish, async ()=>{
                    await this.deleteSession(e);
                }), await this.sendResult(t, e, !0), this.client.events.emit("session_delete", {
                    id: t,
                    topic: e
                });
            } catch (i) {
                await this.sendError(t, e, i), this.client.logger.error(i);
            }
        }, this.onSessionRequest = async (e, s)=>{
            const { id: t , params: i  } = s;
            try {
                this.isValidRequest(u({
                    topic: e
                }, i)), await this.setPendingSessionRequest({
                    id: t,
                    topic: e,
                    params: i
                }), this.client.events.emit("session_request", {
                    id: t,
                    topic: e,
                    params: i
                });
            } catch (o) {
                await this.sendError(t, e, o), this.client.logger.error(o);
            }
        }, this.onSessionRequestResponse = (e, s)=>{
            const { id: t  } = s;
            (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("session_request", t), {
                result: s.result
            }) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("session_request", t), {
                error: s.error
            });
        }, this.onSessionEventRequest = async (e, s)=>{
            const { id: t , params: i  } = s;
            try {
                this.isValidEmit(u({
                    topic: e
                }, i)), this.client.events.emit("session_event", {
                    id: t,
                    topic: e,
                    params: i
                });
            } catch (o) {
                await this.sendError(t, e, o), this.client.logger.error(o);
            }
        }, this.isValidConnect = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
                throw new Error(r);
            }
            const { pairingTopic: s , requiredNamespaces: t , optionalNamespaces: i , sessionProperties: o , relays: a  } = e;
            if ((0, _utils.isUndefined)(s) || await this.isValidPairingTopic(s), !(0, _utils.isValidRelays)(a, !0)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `connect() relays: ${a}`);
                throw new Error(r);
            }
            !(0, _utils.isUndefined)(t) && (0, _utils.isValidObject)(t) !== 0 && this.validateNamespaces(t, "requiredNamespaces"), !(0, _utils.isUndefined)(i) && (0, _utils.isValidObject)(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), (0, _utils.isUndefined)(o) || this.validateSessionProps(o, "sessionProperties");
        }, this.validateNamespaces = (e, s)=>{
            const t = (0, _utils.isValidRequiredNamespaces)(e, "connect()", s);
            if (t) throw new Error(t.message);
        }, this.isValidApprove = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) throw new Error((0, _utils.getInternalError)("MISSING_OR_INVALID", `approve() params: ${e}`).message);
            const { id: s , namespaces: t , relayProtocol: i , sessionProperties: o  } = e;
            await this.isValidProposalId(s);
            const a = this.client.proposal.get(s), r = (0, _utils.isValidNamespaces)(t, "approve()");
            if (r) throw new Error(r.message);
            const l = (0, _utils.isConformingNamespaces)(a.requiredNamespaces, t, "approve()");
            if (l) throw new Error(l.message);
            if (!(0, _utils.isValidString)(i, !0)) {
                const { message: h  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
                throw new Error(h);
            }
            (0, _utils.isUndefined)(o) || this.validateSessionProps(o, "sessionProperties");
        }, this.isValidReject = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: i  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `reject() params: ${e}`);
                throw new Error(i);
            }
            const { id: s , reason: t  } = e;
            if (await this.isValidProposalId(s), !(0, _utils.isValidErrorReason)(t)) {
                const { message: i  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(t)}`);
                throw new Error(i);
            }
        }, this.isValidSessionSettleRequest = (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: l  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
                throw new Error(l);
            }
            const { relay: s , controller: t , namespaces: i , expiry: o  } = e;
            if (!(0, _utils.isValidRelay)(s)) {
                const { message: l  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
                throw new Error(l);
            }
            const a = (0, _utils.isValidController)(t, "onSessionSettleRequest()");
            if (a) throw new Error(a.message);
            const r = (0, _utils.isValidNamespaces)(i, "onSessionSettleRequest()");
            if (r) throw new Error(r.message);
            if ((0, _utils.isExpired)(o)) {
                const { message: l  } = (0, _utils.getInternalError)("EXPIRED", "onSessionSettleRequest()");
                throw new Error(l);
            }
        }, this.isValidUpdate = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `update() params: ${e}`);
                throw new Error(r);
            }
            const { topic: s , namespaces: t  } = e;
            await this.isValidSessionTopic(s);
            const i = this.client.session.get(s), o = (0, _utils.isValidNamespaces)(t, "update()");
            if (o) throw new Error(o.message);
            const a = (0, _utils.isConformingNamespaces)(i.requiredNamespaces, t, "update()");
            if (a) throw new Error(a.message);
        }, this.isValidExtend = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: t  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `extend() params: ${e}`);
                throw new Error(t);
            }
            const { topic: s  } = e;
            await this.isValidSessionTopic(s);
        }, this.isValidRequest = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() params: ${e}`);
                throw new Error(r);
            }
            const { topic: s , request: t , chainId: i , expiry: o  } = e;
            await this.isValidSessionTopic(s);
            const { namespaces: a  } = this.client.session.get(s);
            if (!(0, _utils.isValidNamespacesChainId)(a, i)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() chainId: ${i}`);
                throw new Error(r);
            }
            if (!(0, _utils.isValidRequest)(t)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() ${JSON.stringify(t)}`);
                throw new Error(r);
            }
            if (!(0, _utils.isValidNamespacesRequest)(a, i, t.method)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() method: ${t.method}`);
                throw new Error(r);
            }
            if (o && !(0, _utils.isValidRequestExpiry)(o, $)) {
                const { message: r  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${$.min} and ${$.max}`);
                throw new Error(r);
            }
        }, this.isValidRespond = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: i  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `respond() params: ${e}`);
                throw new Error(i);
            }
            const { topic: s , response: t  } = e;
            if (await this.isValidSessionTopic(s), !(0, _utils.isValidResponse)(t)) {
                const { message: i  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(t)}`);
                throw new Error(i);
            }
        }, this.isValidPing = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: t  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `ping() params: ${e}`);
                throw new Error(t);
            }
            const { topic: s  } = e;
            await this.isValidSessionOrPairingTopic(s);
        }, this.isValidEmit = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: a  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() params: ${e}`);
                throw new Error(a);
            }
            const { topic: s , event: t , chainId: i  } = e;
            await this.isValidSessionTopic(s);
            const { namespaces: o  } = this.client.session.get(s);
            if (!(0, _utils.isValidNamespacesChainId)(o, i)) {
                const { message: a  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() chainId: ${i}`);
                throw new Error(a);
            }
            if (!(0, _utils.isValidEvent)(t)) {
                const { message: a  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
                throw new Error(a);
            }
            if (!(0, _utils.isValidNamespacesEvent)(o, i, t.name)) {
                const { message: a  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
                throw new Error(a);
            }
        }, this.isValidDisconnect = async (e)=>{
            if (!(0, _utils.isValidParams)(e)) {
                const { message: t  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `disconnect() params: ${e}`);
                throw new Error(t);
            }
            const { topic: s  } = e;
            await this.isValidSessionOrPairingTopic(s);
        }, this.validateSessionProps = (e, s)=>{
            Object.values(e).forEach((t)=>{
                if (!(0, _utils.isValidString)(t, !1)) {
                    const { message: i  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `${s} must be in Record<string, string> format. Received: ${JSON.stringify(t)}`);
                    throw new Error(i);
                }
            });
        };
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: n  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(n);
        }
    }
    registerRelayerEvents() {
        this.client.core.relayer.on((0, _core.RELAYER_EVENTS).message, async (n)=>{
            const { topic: e , message: s  } = n;
            if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s))) return;
            const t = await this.client.core.crypto.decode(e, s);
            (0, _jsonrpcUtils.isJsonRpcRequest)(t) ? (this.client.core.history.set(e, t), this.onRelayEventRequest({
                topic: e,
                payload: t
            })) : (0, _jsonrpcUtils.isJsonRpcResponse)(t) && (await this.client.core.history.resolve(t), this.onRelayEventResponse({
                topic: e,
                payload: t
            }));
        });
    }
    registerExpirerEvents() {
        this.client.core.expirer.on((0, _core.EXPIRER_EVENTS).expired, async (n)=>{
            const { topic: e , id: s  } = (0, _utils.parseExpirerTarget)(n.target);
            if (s && this.client.pendingRequest.keys.includes(s)) return await this.deletePendingSessionRequest(s, (0, _utils.getInternalError)("EXPIRED"), !0);
            e ? this.client.session.keys.includes(e) && (await this.deleteSession(e, !0), this.client.events.emit("session_expire", {
                topic: e
            })) : s && (await this.deleteProposal(s, !0), this.client.events.emit("proposal_expire", {
                id: s
            }));
        });
    }
    isValidPairingTopic(n) {
        if (!(0, _utils.isValidString)(n, !1)) {
            const { message: e  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pairing topic should be a string: ${n}`);
            throw new Error(e);
        }
        if (!this.client.core.pairing.pairings.keys.includes(n)) {
            const { message: e  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n}`);
            throw new Error(e);
        }
        if ((0, _utils.isExpired)(this.client.core.pairing.pairings.get(n).expiry)) {
            const { message: e  } = (0, _utils.getInternalError)("EXPIRED", `pairing topic: ${n}`);
            throw new Error(e);
        }
    }
    async isValidSessionTopic(n) {
        if (!(0, _utils.isValidString)(n, !1)) {
            const { message: e  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `session topic should be a string: ${n}`);
            throw new Error(e);
        }
        if (!this.client.session.keys.includes(n)) {
            const { message: e  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `session topic doesn't exist: ${n}`);
            throw new Error(e);
        }
        if ((0, _utils.isExpired)(this.client.session.get(n).expiry)) {
            await this.deleteSession(n);
            const { message: e  } = (0, _utils.getInternalError)("EXPIRED", `session topic: ${n}`);
            throw new Error(e);
        }
    }
    async isValidSessionOrPairingTopic(n) {
        if (this.client.session.keys.includes(n)) await this.isValidSessionTopic(n);
        else if (this.client.core.pairing.pairings.keys.includes(n)) this.isValidPairingTopic(n);
        else if ((0, _utils.isValidString)(n, !1)) {
            const { message: e  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n}`);
            throw new Error(e);
        } else {
            const { message: e  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n}`);
            throw new Error(e);
        }
    }
    async isValidProposalId(n) {
        if (!(0, _utils.isValidId)(n)) {
            const { message: e  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `proposal id should be a number: ${n}`);
            throw new Error(e);
        }
        if (!this.client.proposal.keys.includes(n)) {
            const { message: e  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `proposal id doesn't exist: ${n}`);
            throw new Error(e);
        }
        if ((0, _utils.isExpired)(this.client.proposal.get(n).expiry)) {
            await this.deleteProposal(n);
            const { message: e  } = (0, _utils.getInternalError)("EXPIRED", `proposal id: ${n}`);
            throw new Error(e);
        }
    }
}
class Ze extends (0, _core.Store) {
    constructor(n, e){
        super(n, e, ee, C), this.core = n, this.logger = e;
    }
}
class es extends (0, _core.Store) {
    constructor(n, e){
        super(n, e, te, C), this.core = n, this.logger = e;
    }
}
class ss extends (0, _core.Store) {
    constructor(n, e){
        super(n, e, ne, C), this.core = n, this.logger = e;
    }
}
class M extends (0, _types.ISignClient) {
    constructor(n){
        super(n), this.protocol = k, this.version = X, this.name = G.name, this.events = new (0, _events.EventEmitter), this.on = (s, t)=>this.events.on(s, t), this.once = (s, t)=>this.events.once(s, t), this.off = (s, t)=>this.events.off(s, t), this.removeListener = (s, t)=>this.events.removeListener(s, t), this.removeAllListeners = (s)=>this.events.removeAllListeners(s), this.connect = async (s)=>{
            try {
                return await this.engine.connect(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.pair = async (s)=>{
            try {
                return await this.engine.pair(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.approve = async (s)=>{
            try {
                return await this.engine.approve(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.reject = async (s)=>{
            try {
                return await this.engine.reject(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.update = async (s)=>{
            try {
                return await this.engine.update(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.extend = async (s)=>{
            try {
                return await this.engine.extend(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.request = async (s)=>{
            try {
                return await this.engine.request(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.respond = async (s)=>{
            try {
                return await this.engine.respond(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.ping = async (s)=>{
            try {
                return await this.engine.ping(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.emit = async (s)=>{
            try {
                return await this.engine.emit(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.disconnect = async (s)=>{
            try {
                return await this.engine.disconnect(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.find = (s)=>{
            try {
                return this.engine.find(s);
            } catch (t) {
                throw this.logger.error(t.message), t;
            }
        }, this.getPendingSessionRequests = ()=>{
            try {
                return this.engine.getPendingSessionRequests();
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }, this.name = n?.name || G.name, this.metadata = n?.metadata || (0, _utils.getAppMetadata)();
        const e = typeof n?.logger < "u" && typeof n?.logger != "string" ? n.logger : (0, _pinoDefault.default)((0, _logger.getDefaultLoggerOptions)({
            level: n?.logger || G.logger
        }));
        this.core = n?.core || new (0, _core.Core)(n), this.logger = (0, _logger.generateChildLogger)(e, this.name), this.session = new es(this.core, this.logger), this.proposal = new Ze(this.core, this.logger), this.pendingRequest = new ss(this.core, this.logger), this.engine = new We(this);
    }
    static async init(n) {
        const e = new M(n);
        return await e.initialize(), e;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get pairing() {
        return this.core.pairing.pairings;
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success");
        } catch (n) {
            throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n.message), n;
        }
    }
}
const ts = M;

},{"pino":"a8XEU","@walletconnect/core":"0PcxV","@walletconnect/logger":"bTcqM","@walletconnect/types":"gLpYu","@walletconnect/utils":"o3k5L","events":"1VQLm","@walletconnect/time":"2hzsP","@walletconnect/jsonrpc-utils":"izCJ8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a8XEU":[function(require,module,exports) {
"use strict";
const format = require("b220f7a54a06957d");
module.exports = pino;
const _console = pfGlobalThisOrFallback().console || {};
const stdSerializers = {
    mapHttpRequest: mock,
    mapHttpResponse: mock,
    wrapRequestSerializer: passthrough,
    wrapResponseSerializer: passthrough,
    wrapErrorSerializer: passthrough,
    req: mock,
    res: mock,
    err: asErrValue
};
function shouldSerialize(serialize, serializers) {
    if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k) {
            return k !== "!stdSerializers.err";
        });
        return hasToFilter;
    } else if (serialize === true) return Object.keys(serializers);
    return false;
}
function pino(opts) {
    opts = opts || {};
    opts.browser = opts.browser || {};
    const transmit = opts.browser.transmit;
    if (transmit && typeof transmit.send !== "function") throw Error("pino: transmit option must have a send function");
    const proto = opts.browser.write || _console;
    if (opts.browser.write) opts.browser.asObject = true;
    const serializers = opts.serializers || {};
    const serialize = shouldSerialize(opts.browser.serialize, serializers);
    let stdErrSerialize = opts.browser.serialize;
    if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1) stdErrSerialize = false;
    const levels = [
        "error",
        "fatal",
        "warn",
        "info",
        "debug",
        "trace"
    ];
    if (typeof proto === "function") proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
    if (opts.enabled === false) opts.level = "silent";
    const level = opts.level || "info";
    const logger = Object.create(proto);
    if (!logger.log) logger.log = noop;
    Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
    });
    Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
    });
    const setOpts = {
        transmit,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
    };
    logger.levels = pino.levels;
    logger.level = level;
    logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
    logger.serializers = serializers;
    logger._serialize = serialize;
    logger._stdErrSerialize = stdErrSerialize;
    logger.child = child;
    if (transmit) logger._logEvent = createLogEventShape();
    function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
    }
    function getLevel() {
        return this._level;
    }
    function setLevel(level) {
        if (level !== "silent" && !this.levels.values[level]) throw Error("unknown level " + level);
        this._level = level;
        set(setOpts, logger, "error", "log") // <-- must stay first
        ;
        set(setOpts, logger, "fatal", "error");
        set(setOpts, logger, "warn", "error");
        set(setOpts, logger, "info", "log");
        set(setOpts, logger, "debug", "log");
        set(setOpts, logger, "trace", "log");
    }
    function child(bindings, childOptions) {
        if (!bindings) throw new Error("missing bindings for child Pino");
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) childOptions.serializers = bindings.serializers;
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
            var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
            var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
            delete bindings.serializers;
            applySerializers([
                bindings
            ], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
            this._childLevel = (parent._childLevel | 0) + 1;
            this.error = bind(parent, bindings, "error");
            this.fatal = bind(parent, bindings, "fatal");
            this.warn = bind(parent, bindings, "warn");
            this.info = bind(parent, bindings, "info");
            this.debug = bind(parent, bindings, "debug");
            this.trace = bind(parent, bindings, "trace");
            if (childSerializers) {
                this.serializers = childSerializers;
                this._serialize = childSerialize;
            }
            if (transmit) this._logEvent = createLogEventShape([].concat(parent._logEvent.bindings, bindings));
        }
        Child.prototype = this;
        return new Child(this);
    }
    return logger;
}
pino.levels = {
    values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
    },
    labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
    }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, {
    nullTime,
    epochTime,
    unixTime,
    isoTime
});
function set(opts, logger, level, fallback) {
    const proto = Object.getPrototypeOf(logger);
    logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
    wrap(opts, logger, level);
}
function wrap(opts, logger, level) {
    if (!opts.transmit && logger[level] === noop) return;
    logger[level] = function(write) {
        return function LOG() {
            const ts = opts.timestamp();
            const args = new Array(arguments.length);
            const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
            for(var i = 0; i < args.length; i++)args[i] = arguments[i];
            if (opts.serialize && !opts.asObject) applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
            if (opts.asObject) write.call(proto, asObject(this, level, args, ts));
            else write.apply(proto, args);
            if (opts.transmit) {
                const transmitLevel = opts.transmit.level || logger.level;
                const transmitValue = pino.levels.values[transmitLevel];
                const methodValue = pino.levels.values[level];
                if (methodValue < transmitValue) return;
                transmit(this, {
                    ts,
                    methodLevel: level,
                    methodValue,
                    transmitLevel,
                    transmitValue: pino.levels.values[opts.transmit.level || logger.level],
                    send: opts.transmit.send,
                    val: logger.levelVal
                }, args);
            }
        };
    }(logger[level]);
}
function asObject(logger, level, args, ts) {
    if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
    const argsCloned = args.slice();
    let msg = argsCloned[0];
    const o = {};
    if (ts) o.time = ts;
    o.level = pino.levels.values[level];
    let lvl = (logger._childLevel | 0) + 1;
    if (lvl < 1) lvl = 1;
    // deliberate, catching objects, arrays
    if (msg !== null && typeof msg === "object") {
        while(lvl-- && typeof argsCloned[0] === "object")Object.assign(o, argsCloned.shift());
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : undefined;
    } else if (typeof msg === "string") msg = format(argsCloned.shift(), argsCloned);
    if (msg !== undefined) o.msg = msg;
    return o;
}
function applySerializers(args, serialize, serializers, stdErrSerialize) {
    for(const i in args){
        if (stdErrSerialize && args[i] instanceof Error) args[i] = pino.stdSerializers.err(args[i]);
        else if (typeof args[i] === "object" && !Array.isArray(args[i])) {
            for(const k in args[i])if (serialize && serialize.indexOf(k) > -1 && k in serializers) args[i][k] = serializers[k](args[i][k]);
        }
    }
}
function bind(parent, bindings, level) {
    return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for(var i = 1; i < args.length; i++)args[i] = arguments[i - 1];
        return parent[level].apply(this, args);
    };
}
function transmit(logger, opts, args) {
    const send = opts.send;
    const ts = opts.ts;
    const methodLevel = opts.methodLevel;
    const methodValue = opts.methodValue;
    const val = opts.val;
    const bindings = logger._logEvent.bindings;
    applySerializers(args, logger._serialize || Object.keys(logger.serializers), logger.serializers, logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize);
    logger._logEvent.ts = ts;
    logger._logEvent.messages = args.filter(function(arg) {
        // bindings can only be objects, so reference equality check via indexOf is fine
        return bindings.indexOf(arg) === -1;
    });
    logger._logEvent.level.label = methodLevel;
    logger._logEvent.level.value = methodValue;
    send(methodLevel, logger._logEvent, val);
    logger._logEvent = createLogEventShape(bindings);
}
function createLogEventShape(bindings) {
    return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: {
            label: "",
            value: 0
        }
    };
}
function asErrValue(err) {
    const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
    };
    for(const key in err)if (obj[key] === undefined) obj[key] = err[key];
    return obj;
}
function getTimeFunction(opts) {
    if (typeof opts.timestamp === "function") return opts.timestamp;
    if (opts.timestamp === false) return nullTime;
    return epochTime;
}
function mock() {
    return {};
}
function passthrough(a) {
    return a;
}
function noop() {}
function nullTime() {
    return false;
}
function epochTime() {
    return Date.now();
}
function unixTime() {
    return Math.round(Date.now() / 1000.0);
}
function isoTime() {
    return new Date(Date.now()).toISOString();
} // using Date.now() for testability
/* eslint-disable */ /* istanbul ignore next */ function pfGlobalThisOrFallback() {
    function defd(o) {
        return typeof o !== "undefined" && o;
    }
    try {
        if (typeof globalThis !== "undefined") return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
            get: function() {
                delete Object.prototype.globalThis;
                return this.globalThis = this;
            },
            configurable: true
        });
        return globalThis;
    } catch (e) {
        return defd(self) || defd(window) || defd(this) || {};
    }
} /* eslint-enable */ 

},{"b220f7a54a06957d":"lB9rF"}],"lB9rF":[function(require,module,exports) {
"use strict";
function tryStringify(o) {
    try {
        return JSON.stringify(o);
    } catch (e) {
        return '"[Circular]"';
    }
}
module.exports = format;
function format(f, args, opts) {
    var ss = opts && opts.stringify || tryStringify;
    var offset = 1;
    if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1) return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for(var index = 1; index < len; index++)objects[index] = ss(args[index]);
        return objects.join(" ");
    }
    if (typeof f !== "string") return f;
    var argLen = args.length;
    if (argLen === 0) return f;
    var str = "";
    var a = 1 - offset;
    var lastPos = -1;
    var flen = f && f.length || 0;
    for(var i = 0; i < flen;){
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
            lastPos = lastPos > -1 ? lastPos : 0;
            switch(f.charCodeAt(i + 1)){
                case 100:
                case 102:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Number(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 105:
                    if (a >= argLen) break;
                    if (args[a] == null) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += Math.floor(Number(args[a]));
                    lastPos = i + 2;
                    i++;
                    break;
                case 79:
                case 111:
                case 106:
                    if (a >= argLen) break;
                    if (args[a] === undefined) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    var type = typeof args[a];
                    if (type === "string") {
                        str += "'" + args[a] + "'";
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    if (type === "function") {
                        str += args[a].name || "<anonymous>";
                        lastPos = i + 2;
                        i++;
                        break;
                    }
                    str += ss(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 115:
                    if (a >= argLen) break;
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += String(args[a]);
                    lastPos = i + 2;
                    i++;
                    break;
                case 37:
                    if (lastPos < i) str += f.slice(lastPos, i);
                    str += "%";
                    lastPos = i + 2;
                    i++;
                    a--;
                    break;
            }
            ++a;
        }
        ++i;
    }
    if (lastPos === -1) return f;
    else if (lastPos < flen) str += f.slice(lastPos);
    return str;
}

},{}],"0PcxV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CORE_CONTEXT", ()=>q);
parcelHelpers.export(exports, "CORE_DEFAULT", ()=>Be);
parcelHelpers.export(exports, "CORE_PROTOCOL", ()=>ae);
parcelHelpers.export(exports, "CORE_STORAGE_OPTIONS", ()=>ke);
parcelHelpers.export(exports, "CORE_STORAGE_PREFIX", ()=>P);
parcelHelpers.export(exports, "CORE_VERSION", ()=>Ke);
parcelHelpers.export(exports, "CRYPTO_CLIENT_SEED", ()=>oe);
parcelHelpers.export(exports, "CRYPTO_CONTEXT", ()=>je);
parcelHelpers.export(exports, "CRYPTO_JWT_TTL", ()=>Ve);
parcelHelpers.export(exports, "Core", ()=>dr);
parcelHelpers.export(exports, "Crypto", ()=>gt);
parcelHelpers.export(exports, "EXPIRER_CONTEXT", ()=>ut);
parcelHelpers.export(exports, "EXPIRER_DEFAULT_TTL", ()=>Js);
parcelHelpers.export(exports, "EXPIRER_EVENTS", ()=>m);
parcelHelpers.export(exports, "EXPIRER_STORAGE_VERSION", ()=>lt);
parcelHelpers.export(exports, "Expirer", ()=>St);
parcelHelpers.export(exports, "HISTORY_CONTEXT", ()=>ht);
parcelHelpers.export(exports, "HISTORY_EVENTS", ()=>C);
parcelHelpers.export(exports, "HISTORY_STORAGE_VERSION", ()=>ct);
parcelHelpers.export(exports, "JsonRpcHistory", ()=>Rt);
parcelHelpers.export(exports, "KEYCHAIN_CONTEXT", ()=>qe);
parcelHelpers.export(exports, "KEYCHAIN_STORAGE_VERSION", ()=>Ge);
parcelHelpers.export(exports, "KeyChain", ()=>dt);
parcelHelpers.export(exports, "MESSAGES_CONTEXT", ()=>Ye);
parcelHelpers.export(exports, "MESSAGES_STORAGE_VERSION", ()=>Je);
parcelHelpers.export(exports, "MessageTracker", ()=>pt);
parcelHelpers.export(exports, "PAIRING_CONTEXT", ()=>at);
parcelHelpers.export(exports, "PAIRING_DEFAULT_TTL", ()=>Ys);
parcelHelpers.export(exports, "PAIRING_RPC_OPTS", ()=>N);
parcelHelpers.export(exports, "PAIRING_STORAGE_VERSION", ()=>ot);
parcelHelpers.export(exports, "PENDING_SUB_RESOLUTION_TIMEOUT", ()=>nt);
parcelHelpers.export(exports, "PUBLISHER_CONTEXT", ()=>Xe);
parcelHelpers.export(exports, "PUBLISHER_DEFAULT_TTL", ()=>He);
parcelHelpers.export(exports, "Pairing", ()=>_t);
parcelHelpers.export(exports, "RELAYER_CONTEXT", ()=>Qe);
parcelHelpers.export(exports, "RELAYER_DEFAULT_LOGGER", ()=>Ze);
parcelHelpers.export(exports, "RELAYER_DEFAULT_PROTOCOL", ()=>We);
parcelHelpers.export(exports, "RELAYER_DEFAULT_RELAY_URL", ()=>he);
parcelHelpers.export(exports, "RELAYER_EVENTS", ()=>D);
parcelHelpers.export(exports, "RELAYER_PROVIDER_EVENTS", ()=>M);
parcelHelpers.export(exports, "RELAYER_RECONNECT_TIMEOUT", ()=>ce);
parcelHelpers.export(exports, "RELAYER_SDK_VERSION", ()=>tt);
parcelHelpers.export(exports, "RELAYER_STORAGE_OPTIONS", ()=>qs);
parcelHelpers.export(exports, "RELAYER_SUBSCRIBER_SUFFIX", ()=>et);
parcelHelpers.export(exports, "Relayer", ()=>ft);
parcelHelpers.export(exports, "STORE_STORAGE_VERSION", ()=>it);
parcelHelpers.export(exports, "SUBSCRIBER_CONTEXT", ()=>st);
parcelHelpers.export(exports, "SUBSCRIBER_DEFAULT_TTL", ()=>Gs);
parcelHelpers.export(exports, "SUBSCRIBER_EVENTS", ()=>I);
parcelHelpers.export(exports, "SUBSCRIBER_STORAGE_VERSION", ()=>rt);
parcelHelpers.export(exports, "Store", ()=>Ct);
parcelHelpers.export(exports, "Subscriber", ()=>bt);
parcelHelpers.export(exports, "default", ()=>G);
var _events = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events);
var _pino = require("pino");
var _pinoDefault = parcelHelpers.interopDefault(_pino);
var _keyvaluestorage = require("@walletconnect/keyvaluestorage");
var _keyvaluestorageDefault = parcelHelpers.interopDefault(_keyvaluestorage);
var _heartbeat = require("@walletconnect/heartbeat");
var _logger = require("@walletconnect/logger");
var _types = require("@walletconnect/types");
var _safeJson = require("@walletconnect/safe-json");
var _relayAuth = require("@walletconnect/relay-auth");
var _utils = require("@walletconnect/utils");
var _time = require("@walletconnect/time");
var _jsonrpcProvider = require("@walletconnect/jsonrpc-provider");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
var _jsonrpcWsConnection = require("@walletconnect/jsonrpc-ws-connection");
var _jsonrpcWsConnectionDefault = parcelHelpers.interopDefault(_jsonrpcWsConnection);
var _lodashIsequal = require("lodash.isequal");
var _lodashIsequalDefault = parcelHelpers.interopDefault(_lodashIsequal);
function wi(r, e) {
    if (r.length >= 255) throw new TypeError("Alphabet too long");
    for(var t = new Uint8Array(256), i = 0; i < t.length; i++)t[i] = 255;
    for(var s = 0; s < r.length; s++){
        var n = r.charAt(s), a = n.charCodeAt(0);
        if (t[a] !== 255) throw new TypeError(n + " is ambiguous");
        t[a] = s;
    }
    var o = r.length, h = r.charAt(0), d = Math.log(o) / Math.log(256), l = Math.log(256) / Math.log(o);
    function g(u) {
        if (u instanceof Uint8Array || (ArrayBuffer.isView(u) ? u = new Uint8Array(u.buffer, u.byteOffset, u.byteLength) : Array.isArray(u) && (u = Uint8Array.from(u))), !(u instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (u.length === 0) return "";
        for(var y = 0, O = 0, E = 0, _ = u.length; E !== _ && u[E] === 0;)E++, y++;
        for(var R = (_ - E) * l + 1 >>> 0, b = new Uint8Array(R); E !== _;){
            for(var S = u[E], x = 0, f = R - 1; (S !== 0 || x < O) && f !== -1; f--, x++)S += 256 * b[f] >>> 0, b[f] = S % o >>> 0, S = S / o >>> 0;
            if (S !== 0) throw new Error("Non-zero carry");
            O = x, E++;
        }
        for(var T = R - O; T !== R && b[T] === 0;)T++;
        for(var K = h.repeat(y); T < R; ++T)K += r.charAt(b[T]);
        return K;
    }
    function U(u) {
        if (typeof u != "string") throw new TypeError("Expected String");
        if (u.length === 0) return new Uint8Array;
        var y = 0;
        if (u[y] !== " ") {
            for(var O = 0, E = 0; u[y] === h;)O++, y++;
            for(var _ = (u.length - y) * d + 1 >>> 0, R = new Uint8Array(_); u[y];){
                var b = t[u.charCodeAt(y)];
                if (b === 255) return;
                for(var S = 0, x = _ - 1; (b !== 0 || S < E) && x !== -1; x--, S++)b += o * R[x] >>> 0, R[x] = b % 256 >>> 0, b = b / 256 >>> 0;
                if (b !== 0) throw new Error("Non-zero carry");
                E = S, y++;
            }
            if (u[y] !== " ") {
                for(var f = _ - E; f !== _ && R[f] === 0;)f++;
                for(var T = new Uint8Array(O + (_ - f)), K = O; f !== _;)T[K++] = R[f++];
                return T;
            }
        }
    }
    function Y(u) {
        var y = U(u);
        if (y) return y;
        throw new Error(`Non-${e} character`);
    }
    return {
        encode: g,
        decodeUnsafe: U,
        decode: Y
    };
}
var vi = wi, Ii = vi;
const Ce = (r)=>{
    if (r instanceof Uint8Array && r.constructor.name === "Uint8Array") return r;
    if (r instanceof ArrayBuffer) return new Uint8Array(r);
    if (ArrayBuffer.isView(r)) return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    throw new Error("Unknown type, must be binary type");
}, Ci = (r)=>new TextEncoder().encode(r), _i = (r)=>new TextDecoder().decode(r);
class Ri {
    constructor(e, t, i){
        this.name = e, this.prefix = t, this.baseEncode = i;
    }
    encode(e) {
        if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type");
    }
}
class Si {
    constructor(e, t, i){
        if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
        this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
    }
    decode(e) {
        if (typeof e == "string") {
            if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(e.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(e) {
        return _e(this, e);
    }
}
class Ti {
    constructor(e){
        this.decoders = e;
    }
    or(e) {
        return _e(this, e);
    }
    decode(e) {
        const t = e[0], i = this.decoders[t];
        if (i) return i.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const _e = (r, e)=>new Ti({
        ...r.decoders || {
            [r.prefix]: r
        },
        ...e.decoders || {
            [e.prefix]: e
        }
    });
class Pi {
    constructor(e, t, i, s){
        this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = s, this.encoder = new Ri(e, t, i), this.decoder = new Si(e, t, s);
    }
    encode(e) {
        return this.encoder.encode(e);
    }
    decode(e) {
        return this.decoder.decode(e);
    }
}
const V = ({ name: r , prefix: e , encode: t , decode: i  })=>new Pi(r, e, t, i), F = ({ prefix: r , name: e , alphabet: t  })=>{
    const { encode: i , decode: s  } = Ii(t, e);
    return V({
        prefix: r,
        name: e,
        encode: i,
        decode: (n)=>Ce(s(n))
    });
}, xi = (r, e, t, i)=>{
    const s = {};
    for(let l = 0; l < e.length; ++l)s[e[l]] = l;
    let n = r.length;
    for(; r[n - 1] === "=";)--n;
    const a = new Uint8Array(n * t / 8 | 0);
    let o = 0, h = 0, d = 0;
    for(let l = 0; l < n; ++l){
        const g = s[r[l]];
        if (g === void 0) throw new SyntaxError(`Non-${i} character`);
        h = h << t | g, o += t, o >= 8 && (o -= 8, a[d++] = 255 & h >> o);
    }
    if (o >= t || 255 & h << 8 - o) throw new SyntaxError("Unexpected end of data");
    return a;
}, Oi = (r, e, t)=>{
    const i = e[e.length - 1] === "=", s = (1 << t) - 1;
    let n = "", a = 0, o = 0;
    for(let h = 0; h < r.length; ++h)for(o = o << 8 | r[h], a += 8; a > t;)a -= t, n += e[s & o >> a];
    if (a && (n += e[s & o << t - a]), i) for(; n.length * t & 7;)n += "=";
    return n;
}, p = ({ name: r , prefix: e , bitsPerChar: t , alphabet: i  })=>V({
        prefix: e,
        name: r,
        encode (s) {
            return Oi(s, i, t);
        },
        decode (s) {
            return xi(s, i, t, r);
        }
    }), Ai = V({
    prefix: "\0",
    name: "identity",
    encode: (r)=>_i(r),
    decode: (r)=>Ci(r)
});
var zi = Object.freeze({
    __proto__: null,
    identity: Ai
});
const Ni = p({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var Ui = Object.freeze({
    __proto__: null,
    base2: Ni
});
const Li = p({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var Fi = Object.freeze({
    __proto__: null,
    base8: Li
});
const Mi = F({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var $i = Object.freeze({
    __proto__: null,
    base10: Mi
});
const Ki = p({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
}), Bi = p({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var ki = Object.freeze({
    __proto__: null,
    base16: Ki,
    base16upper: Bi
});
const ji = p({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
}), Vi = p({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
}), qi = p({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
}), Gi = p({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
}), Yi = p({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
}), Ji = p({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
}), Hi = p({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
}), Xi = p({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
}), Wi = p({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var Zi = Object.freeze({
    __proto__: null,
    base32: ji,
    base32upper: Vi,
    base32pad: qi,
    base32padupper: Gi,
    base32hex: Yi,
    base32hexupper: Ji,
    base32hexpad: Hi,
    base32hexpadupper: Xi,
    base32z: Wi
});
const Qi = F({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), es = F({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var ts = Object.freeze({
    __proto__: null,
    base36: Qi,
    base36upper: es
});
const is = F({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), ss = F({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var rs = Object.freeze({
    __proto__: null,
    base58btc: is,
    base58flickr: ss
});
const ns = p({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
}), as = p({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
}), os = p({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
}), hs = p({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var cs = Object.freeze({
    __proto__: null,
    base64: ns,
    base64pad: as,
    base64url: os,
    base64urlpad: hs
});
const Re = Array.from("\uD83D\uDE80\uD83E\uDE90☄\uD83D\uDEF0\uD83C\uDF0C\uD83C\uDF11\uD83C\uDF12\uD83C\uDF13\uD83C\uDF14\uD83C\uDF15\uD83C\uDF16\uD83C\uDF17\uD83C\uDF18\uD83C\uDF0D\uD83C\uDF0F\uD83C\uDF0E\uD83D\uDC09☀\uD83D\uDCBB\uD83D\uDDA5\uD83D\uDCBE\uD83D\uDCBF\uD83D\uDE02❤\uD83D\uDE0D\uD83E\uDD23\uD83D\uDE0A\uD83D\uDE4F\uD83D\uDC95\uD83D\uDE2D\uD83D\uDE18\uD83D\uDC4D\uD83D\uDE05\uD83D\uDC4F\uD83D\uDE01\uD83D\uDD25\uD83E\uDD70\uD83D\uDC94\uD83D\uDC96\uD83D\uDC99\uD83D\uDE22\uD83E\uDD14\uD83D\uDE06\uD83D\uDE44\uD83D\uDCAA\uD83D\uDE09☺\uD83D\uDC4C\uD83E\uDD17\uD83D\uDC9C\uD83D\uDE14\uD83D\uDE0E\uD83D\uDE07\uD83C\uDF39\uD83E\uDD26\uD83C\uDF89\uD83D\uDC9E✌✨\uD83E\uDD37\uD83D\uDE31\uD83D\uDE0C\uD83C\uDF38\uD83D\uDE4C\uD83D\uDE0B\uD83D\uDC97\uD83D\uDC9A\uD83D\uDE0F\uD83D\uDC9B\uD83D\uDE42\uD83D\uDC93\uD83E\uDD29\uD83D\uDE04\uD83D\uDE00\uD83D\uDDA4\uD83D\uDE03\uD83D\uDCAF\uD83D\uDE48\uD83D\uDC47\uD83C\uDFB6\uD83D\uDE12\uD83E\uDD2D❣\uD83D\uDE1C\uD83D\uDC8B\uD83D\uDC40\uD83D\uDE2A\uD83D\uDE11\uD83D\uDCA5\uD83D\uDE4B\uD83D\uDE1E\uD83D\uDE29\uD83D\uDE21\uD83E\uDD2A\uD83D\uDC4A\uD83E\uDD73\uD83D\uDE25\uD83E\uDD24\uD83D\uDC49\uD83D\uDC83\uD83D\uDE33✋\uD83D\uDE1A\uD83D\uDE1D\uD83D\uDE34\uD83C\uDF1F\uD83D\uDE2C\uD83D\uDE43\uD83C\uDF40\uD83C\uDF37\uD83D\uDE3B\uD83D\uDE13⭐✅\uD83E\uDD7A\uD83C\uDF08\uD83D\uDE08\uD83E\uDD18\uD83D\uDCA6✔\uD83D\uDE23\uD83C\uDFC3\uD83D\uDC90☹\uD83C\uDF8A\uD83D\uDC98\uD83D\uDE20☝\uD83D\uDE15\uD83C\uDF3A\uD83C\uDF82\uD83C\uDF3B\uD83D\uDE10\uD83D\uDD95\uD83D\uDC9D\uD83D\uDE4A\uD83D\uDE39\uD83D\uDDE3\uD83D\uDCAB\uD83D\uDC80\uD83D\uDC51\uD83C\uDFB5\uD83E\uDD1E\uD83D\uDE1B\uD83D\uDD34\uD83D\uDE24\uD83C\uDF3C\uD83D\uDE2B⚽\uD83E\uDD19☕\uD83C\uDFC6\uD83E\uDD2B\uD83D\uDC48\uD83D\uDE2E\uD83D\uDE46\uD83C\uDF7B\uD83C\uDF43\uD83D\uDC36\uD83D\uDC81\uD83D\uDE32\uD83C\uDF3F\uD83E\uDDE1\uD83C\uDF81⚡\uD83C\uDF1E\uD83C\uDF88❌✊\uD83D\uDC4B\uD83D\uDE30\uD83E\uDD28\uD83D\uDE36\uD83E\uDD1D\uD83D\uDEB6\uD83D\uDCB0\uD83C\uDF53\uD83D\uDCA2\uD83E\uDD1F\uD83D\uDE41\uD83D\uDEA8\uD83D\uDCA8\uD83E\uDD2C✈\uD83C\uDF80\uD83C\uDF7A\uD83E\uDD13\uD83D\uDE19\uD83D\uDC9F\uD83C\uDF31\uD83D\uDE16\uD83D\uDC76\uD83E\uDD74▶➡❓\uD83D\uDC8E\uD83D\uDCB8⬇\uD83D\uDE28\uD83C\uDF1A\uD83E\uDD8B\uD83D\uDE37\uD83D\uDD7A⚠\uD83D\uDE45\uD83D\uDE1F\uD83D\uDE35\uD83D\uDC4E\uD83E\uDD32\uD83E\uDD20\uD83E\uDD27\uD83D\uDCCC\uD83D\uDD35\uD83D\uDC85\uD83E\uDDD0\uD83D\uDC3E\uD83C\uDF52\uD83D\uDE17\uD83E\uDD11\uD83C\uDF0A\uD83E\uDD2F\uD83D\uDC37☎\uD83D\uDCA7\uD83D\uDE2F\uD83D\uDC86\uD83D\uDC46\uD83C\uDFA4\uD83D\uDE47\uD83C\uDF51❄\uD83C\uDF34\uD83D\uDCA3\uD83D\uDC38\uD83D\uDC8C\uD83D\uDCCD\uD83E\uDD40\uD83E\uDD22\uD83D\uDC45\uD83D\uDCA1\uD83D\uDCA9\uD83D\uDC50\uD83D\uDCF8\uD83D\uDC7B\uD83E\uDD10\uD83E\uDD2E\uD83C\uDFBC\uD83E\uDD75\uD83D\uDEA9\uD83C\uDF4E\uD83C\uDF4A\uD83D\uDC7C\uD83D\uDC8D\uD83D\uDCE3\uD83E\uDD42"), us = Re.reduce((r, e, t)=>(r[t] = e, r), []), ls = Re.reduce((r, e, t)=>(r[e.codePointAt(0)] = t, r), []);
function ds(r) {
    return r.reduce((e, t)=>(e += us[t], e), "");
}
function gs(r) {
    const e = [];
    for (const t of r){
        const i = ls[t.codePointAt(0)];
        if (i === void 0) throw new Error(`Non-base256emoji character: ${t}`);
        e.push(i);
    }
    return new Uint8Array(e);
}
const ps = V({
    prefix: "\uD83D\uDE80",
    name: "base256emoji",
    encode: ds,
    decode: gs
});
var Ds = Object.freeze({
    __proto__: null,
    base256emoji: ps
}), ys = Te, Se = 128, bs = 127, ms = ~bs, Es = Math.pow(2, 31);
function Te(r, e, t) {
    e = e || [], t = t || 0;
    for(var i = t; r >= Es;)e[t++] = r & 255 | Se, r /= 128;
    for(; r & ms;)e[t++] = r & 255 | Se, r >>>= 7;
    return e[t] = r | 0, Te.bytes = t - i + 1, e;
}
var fs = se, ws = 128, Pe = 127;
function se(r, i) {
    var t = 0, i = i || 0, s = 0, n = i, a, o = r.length;
    do {
        if (n >= o) throw se.bytes = 0, new RangeError("Could not decode varint");
        a = r[n++], t += s < 28 ? (a & Pe) << s : (a & Pe) * Math.pow(2, s), s += 7;
    }while (a >= ws);
    return se.bytes = n - i, t;
}
var vs = Math.pow(2, 7), Is = Math.pow(2, 14), Cs = Math.pow(2, 21), _s = Math.pow(2, 28), Rs = Math.pow(2, 35), Ss = Math.pow(2, 42), Ts = Math.pow(2, 49), Ps = Math.pow(2, 56), xs = Math.pow(2, 63), Os = function(r) {
    return r < vs ? 1 : r < Is ? 2 : r < Cs ? 3 : r < _s ? 4 : r < Rs ? 5 : r < Ss ? 6 : r < Ts ? 7 : r < Ps ? 8 : r < xs ? 9 : 10;
}, As = {
    encode: ys,
    decode: fs,
    encodingLength: Os
}, xe = As;
const Oe = (r, e, t = 0)=>(xe.encode(r, e, t), e), Ae = (r)=>xe.encodingLength(r), re = (r, e)=>{
    const t = e.byteLength, i = Ae(r), s = i + Ae(t), n = new Uint8Array(s + t);
    return Oe(r, n, 0), Oe(t, n, i), n.set(e, s), new zs(r, t, e, n);
};
class zs {
    constructor(e, t, i, s){
        this.code = e, this.size = t, this.digest = i, this.bytes = s;
    }
}
const ze = ({ name: r , code: e , encode: t  })=>new Ns(r, e, t);
class Ns {
    constructor(e, t, i){
        this.name = e, this.code = t, this.encode = i;
    }
    digest(e) {
        if (e instanceof Uint8Array) {
            const t = this.encode(e);
            return t instanceof Uint8Array ? re(this.code, t) : t.then((i)=>re(this.code, i));
        } else throw Error("Unknown type, must be binary type");
    }
}
const Ne = (r)=>async (e)=>new Uint8Array(await crypto.subtle.digest(r, e)), Us = ze({
    name: "sha2-256",
    code: 18,
    encode: Ne("SHA-256")
}), Ls = ze({
    name: "sha2-512",
    code: 19,
    encode: Ne("SHA-512")
});
var Fs = Object.freeze({
    __proto__: null,
    sha256: Us,
    sha512: Ls
});
const Ue = 0, Ms = "identity", Le = Ce, $s = (r)=>re(Ue, Le(r)), Ks = {
    code: Ue,
    name: Ms,
    encode: Le,
    digest: $s
};
var Bs = Object.freeze({
    __proto__: null,
    identity: Ks
});
new TextEncoder, new TextDecoder;
const Fe = {
    ...zi,
    ...Ui,
    ...Fi,
    ...$i,
    ...ki,
    ...Zi,
    ...ts,
    ...rs,
    ...cs,
    ...Ds
};
({
    ...Fs,
    ...Bs
});
function ks(r = 0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r) : new Uint8Array(r);
}
function Me(r, e, t, i) {
    return {
        name: r,
        prefix: e,
        encoder: {
            name: r,
            prefix: e,
            encode: t
        },
        decoder: {
            decode: i
        }
    };
}
const $e = Me("utf8", "u", (r)=>"u" + new TextDecoder("utf8").decode(r), (r)=>new TextEncoder().encode(r.substring(1))), ne = Me("ascii", "a", (r)=>{
    let e = "a";
    for(let t = 0; t < r.length; t++)e += String.fromCharCode(r[t]);
    return e;
}, (r)=>{
    r = r.substring(1);
    const e = ks(r.length);
    for(let t = 0; t < r.length; t++)e[t] = r.charCodeAt(t);
    return e;
}), js = {
    utf8: $e,
    "utf-8": $e,
    hex: Fe.base16,
    latin1: ne,
    ascii: ne,
    binary: ne,
    ...Fe
};
function Vs(r, e = "utf8") {
    const t = js[e];
    if (!t) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r, "utf8") : t.decoder.decode(`${t.prefix}${r}`);
}
const ae = "wc", Ke = 2, q = "core", P = `${ae}@${2}:${q}:`, Be = {
    name: q,
    logger: "error"
}, ke = {
    database: ":memory:"
}, je = "crypto", oe = "client_ed25519_seed", Ve = (0, _time.ONE_DAY), qe = "keychain", Ge = "0.3", Ye = "messages", Je = "0.3", He = (0, _time.SIX_HOURS), Xe = "publisher", We = "irn", Ze = "error", he = "wss://relay.walletconnect.com", Qe = "relayer", D = {
    message: "relayer_message",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish"
}, et = "_subscription", M = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error"
}, ce = (0, _time.ONE_SECOND), qs = {
    database: ":memory:"
}, tt = "2.4.7", it = "0.3", I = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed"
}, Gs = (0, _time.THIRTY_DAYS), st = "subscription", rt = "0.3", nt = (0, _time.FIVE_SECONDS) * 1e3, at = "pairing", ot = "0.3", Ys = (0, _time.THIRTY_DAYS), N = {
    wc_pairingDelete: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1e3
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 1001
        }
    },
    wc_pairingPing: {
        req: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1002
        },
        res: {
            ttl: (0, _time.THIRTY_SECONDS),
            prompt: !1,
            tag: 1003
        }
    },
    unregistered_method: {
        req: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 0
        },
        res: {
            ttl: (0, _time.ONE_DAY),
            prompt: !1,
            tag: 0
        }
    }
}, C = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}, ht = "history", ct = "0.3", ut = "expirer", m = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync"
}, lt = "0.3", Js = (0, _time.ONE_DAY);
class dt {
    constructor(e, t){
        this.core = e, this.logger = t, this.keychain = new Map, this.name = qe, this.version = Ge, this.initialized = !1, this.storagePrefix = P, this.init = async ()=>{
            if (!this.initialized) {
                const i = await this.getKeyChain();
                typeof i < "u" && (this.keychain = i), this.initialized = !0;
            }
        }, this.has = (i)=>(this.isInitialized(), this.keychain.has(i)), this.set = async (i, s)=>{
            this.isInitialized(), this.keychain.set(i, s), await this.persist();
        }, this.get = (i)=>{
            this.isInitialized();
            const s = this.keychain.get(i);
            if (typeof s > "u") {
                const { message: n  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${i}`);
                throw new Error(n);
            }
            return s;
        }, this.del = async (i)=>{
            this.isInitialized(), this.keychain.delete(i), await this.persist();
        }, this.core = e, this.logger = (0, _logger.generateChildLogger)(t, this.name);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    async setKeyChain(e) {
        await this.core.storage.setItem(this.storageKey, (0, _utils.mapToObj)(e));
    }
    async getKeyChain() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? (0, _utils.objToMap)(e) : void 0;
    }
    async persist() {
        await this.setKeyChain(this.keychain);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class gt {
    constructor(e, t, i){
        this.core = e, this.logger = t, this.name = je, this.initialized = !1, this.init = async ()=>{
            this.initialized || (await this.keychain.init(), this.initialized = !0);
        }, this.hasKeys = (s)=>(this.isInitialized(), this.keychain.has(s)), this.getClientId = async ()=>{
            this.isInitialized();
            const s = await this.getClientSeed(), n = _relayAuth.generateKeyPair(s);
            return _relayAuth.encodeIss(n.publicKey);
        }, this.generateKeyPair = ()=>{
            this.isInitialized();
            const s = (0, _utils.generateKeyPair)();
            return this.setPrivateKey(s.publicKey, s.privateKey);
        }, this.signJWT = async (s)=>{
            this.isInitialized();
            const n = await this.getClientSeed(), a = _relayAuth.generateKeyPair(n), o = (0, _utils.generateRandomBytes32)(), h = Ve;
            return await _relayAuth.signJWT(o, s, h, a);
        }, this.generateSharedKey = (s, n, a)=>{
            this.isInitialized();
            const o = this.getPrivateKey(s), h = (0, _utils.deriveSymKey)(o, n);
            return this.setSymKey(h, a);
        }, this.setSymKey = async (s, n)=>{
            this.isInitialized();
            const a = n || (0, _utils.hashKey)(s);
            return await this.keychain.set(a, s), a;
        }, this.deleteKeyPair = async (s)=>{
            this.isInitialized(), await this.keychain.del(s);
        }, this.deleteSymKey = async (s)=>{
            this.isInitialized(), await this.keychain.del(s);
        }, this.encode = async (s, n, a)=>{
            this.isInitialized();
            const o = (0, _utils.validateEncoding)(a), h = (0, _safeJson.safeJsonStringify)(n);
            if ((0, _utils.isTypeOneEnvelope)(o)) {
                const U = o.senderPublicKey, Y = o.receiverPublicKey;
                s = await this.generateSharedKey(U, Y);
            }
            const d = this.getSymKey(s), { type: l , senderPublicKey: g  } = o;
            return (0, _utils.encrypt)({
                type: l,
                symKey: d,
                message: h,
                senderPublicKey: g
            });
        }, this.decode = async (s, n, a)=>{
            this.isInitialized();
            const o = (0, _utils.validateDecoding)(n, a);
            if ((0, _utils.isTypeOneEnvelope)(o)) {
                const l = o.receiverPublicKey, g = o.senderPublicKey;
                s = await this.generateSharedKey(l, g);
            }
            const h = this.getSymKey(s), d = (0, _utils.decrypt)({
                symKey: h,
                encoded: n
            });
            return (0, _safeJson.safeJsonParse)(d);
        }, this.core = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.keychain = i || new dt(this.core, this.logger);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    getPayloadType(e) {
        const t = (0, _utils.deserialize)(e);
        return (0, _utils.decodeTypeByte)(t.type);
    }
    async setPrivateKey(e, t) {
        return await this.keychain.set(e, t), e;
    }
    getPrivateKey(e) {
        return this.keychain.get(e);
    }
    async getClientSeed() {
        let e = "";
        try {
            e = this.keychain.get(oe);
        } catch  {
            e = (0, _utils.generateRandomBytes32)(), await this.keychain.set(oe, e);
        }
        return Vs(e, "base16");
    }
    getSymKey(e) {
        return this.keychain.get(e);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class pt extends (0, _types.IMessageTracker) {
    constructor(e, t){
        super(e, t), this.logger = e, this.core = t, this.messages = new Map, this.name = Ye, this.version = Je, this.initialized = !1, this.storagePrefix = P, this.init = async ()=>{
            if (!this.initialized) {
                this.logger.trace("Initialized");
                try {
                    const i = await this.getRelayerMessages();
                    typeof i < "u" && (this.messages = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
                        type: "method",
                        method: "restore",
                        size: this.messages.size
                    });
                } catch (i) {
                    this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
                } finally{
                    this.initialized = !0;
                }
            }
        }, this.set = async (i, s)=>{
            this.isInitialized();
            const n = (0, _utils.hashMessage)(s);
            let a = this.messages.get(i);
            return typeof a > "u" && (a = {}), typeof a[n] < "u" || (a[n] = s, this.messages.set(i, a), await this.persist()), n;
        }, this.get = (i)=>{
            this.isInitialized();
            let s = this.messages.get(i);
            return typeof s > "u" && (s = {}), s;
        }, this.has = (i, s)=>{
            this.isInitialized();
            const n = this.get(i), a = (0, _utils.hashMessage)(s);
            return typeof n[a] < "u";
        }, this.del = async (i)=>{
            this.isInitialized(), this.messages.delete(i), await this.persist();
        }, this.logger = (0, _logger.generateChildLogger)(e, this.name), this.core = t;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    async setRelayerMessages(e) {
        await this.core.storage.setItem(this.storageKey, (0, _utils.mapToObj)(e));
    }
    async getRelayerMessages() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? (0, _utils.objToMap)(e) : void 0;
    }
    async persist() {
        await this.setRelayerMessages(this.messages);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class Hs extends (0, _types.IPublisher) {
    constructor(e, t){
        super(e, t), this.relayer = e, this.logger = t, this.events = new (0, _events.EventEmitter), this.name = Xe, this.queue = new Map, this.publishTimeout = 1e4, this.publish = async (i, s, n)=>{
            this.logger.debug("Publishing Payload"), this.logger.trace({
                type: "method",
                method: "publish",
                params: {
                    topic: i,
                    message: s,
                    opts: n
                }
            });
            try {
                const a = n?.ttl || He, o = (0, _utils.getRelayProtocolName)(n), h = n?.prompt || !1, d = n?.tag || 0, l = {
                    topic: i,
                    message: s,
                    opts: {
                        ttl: a,
                        relay: o,
                        prompt: h,
                        tag: d
                    }
                }, g = (0, _utils.hashMessage)(s);
                this.queue.set(g, l);
                try {
                    await await (0, _utils.createExpiringPromise)(this.rpcPublish(i, s, a, o, h, d), this.publishTimeout), this.relayer.events.emit(D.publish, l);
                } catch  {
                    this.logger.debug("Publishing Payload stalled"), this.relayer.events.emit(D.connection_stalled);
                    return;
                }
                this.onPublish(g, l), this.logger.debug("Successfully Published Payload"), this.logger.trace({
                    type: "method",
                    method: "publish",
                    params: {
                        topic: i,
                        message: s,
                        opts: n
                    }
                });
            } catch (a) {
                throw this.logger.debug("Failed to Publish Payload"), this.logger.error(a), a;
            }
        }, this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.relayer = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.registerEventListeners();
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    rpcPublish(e, t, i, s, n, a) {
        var o, h, d, l;
        const g = {
            method: (0, _utils.getRelayProtocolApi)(s.protocol).publish,
            params: {
                topic: e,
                message: t,
                ttl: i,
                prompt: n,
                tag: a
            }
        };
        return (0, _utils.isUndefined)((o = g.params) == null ? void 0 : o.prompt) && ((h = g.params) == null || delete h.prompt), (0, _utils.isUndefined)((d = g.params) == null ? void 0 : d.tag) && ((l = g.params) == null || delete l.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "message",
            direction: "outgoing",
            request: g
        }), this.relayer.provider.request(g);
    }
    onPublish(e, t) {
        this.queue.delete(e);
    }
    checkQueue() {
        this.queue.forEach(async (e)=>{
            const { topic: t , message: i , opts: s  } = e;
            await this.publish(t, i, s);
        });
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on((0, _heartbeat.HEARTBEAT_EVENTS).pulse, ()=>{
            this.checkQueue();
        });
    }
}
class Xs {
    constructor(){
        this.map = new Map, this.set = (e, t)=>{
            const i = this.get(e);
            this.exists(e, t) || this.map.set(e, [
                ...i,
                t
            ]);
        }, this.get = (e)=>this.map.get(e) || [], this.exists = (e, t)=>this.get(e).includes(t), this.delete = (e, t)=>{
            if (typeof t > "u") {
                this.map.delete(e);
                return;
            }
            if (!this.map.has(e)) return;
            const i = this.get(e);
            if (!this.exists(e, t)) return;
            const s = i.filter((n)=>n !== t);
            if (!s.length) {
                this.map.delete(e);
                return;
            }
            this.map.set(e, s);
        }, this.clear = ()=>{
            this.map.clear();
        };
    }
    get topics() {
        return Array.from(this.map.keys());
    }
}
var Ws = Object.defineProperty, Zs = Object.defineProperties, Qs = Object.getOwnPropertyDescriptors, Dt = Object.getOwnPropertySymbols, er = Object.prototype.hasOwnProperty, tr = Object.prototype.propertyIsEnumerable, yt = (r, e, t)=>e in r ? Ws(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, $ = (r, e)=>{
    for(var t in e || (e = {}))er.call(e, t) && yt(r, t, e[t]);
    if (Dt) for (var t of Dt(e))tr.call(e, t) && yt(r, t, e[t]);
    return r;
}, ue = (r, e)=>Zs(r, Qs(e));
class bt extends (0, _types.ISubscriber) {
    constructor(e, t){
        super(e, t), this.relayer = e, this.logger = t, this.subscriptions = new Map, this.topicMap = new Xs, this.events = new (0, _events.EventEmitter), this.name = st, this.version = rt, this.pending = new Map, this.cached = [], this.initialized = !1, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = P, this.subscribeTimeout = 1e4, this.restartInProgress = !1, this.batchSubscribeTopicsLimit = 500, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restart(), this.registerEventListeners(), this.onEnable(), this.clientId = await this.relayer.core.crypto.getClientId());
        }, this.subscribe = async (i, s)=>{
            await this.restartToComplete(), this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({
                type: "method",
                method: "subscribe",
                params: {
                    topic: i,
                    opts: s
                }
            });
            try {
                const n = (0, _utils.getRelayProtocolName)(s), a = {
                    topic: i,
                    relay: n
                };
                this.pending.set(i, a);
                const o = await this.rpcSubscribe(i, n);
                return this.onSubscribe(o, a), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({
                    type: "method",
                    method: "subscribe",
                    params: {
                        topic: i,
                        opts: s
                    }
                }), o;
            } catch (n) {
                throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n), n;
            }
        }, this.unsubscribe = async (i, s)=>{
            await this.restartToComplete(), this.isInitialized(), typeof s?.id < "u" ? await this.unsubscribeById(i, s.id, s) : await this.unsubscribeByTopic(i, s);
        }, this.isSubscribed = async (i)=>this.topics.includes(i) ? !0 : await new Promise((s, n)=>{
                const a = new (0, _time.Watch);
                a.start(this.pendingSubscriptionWatchLabel);
                const o = setInterval(()=>{
                    !this.pending.has(i) && this.topics.includes(i) && (clearInterval(o), a.stop(this.pendingSubscriptionWatchLabel), s(!0)), a.elapsed(this.pendingSubscriptionWatchLabel) >= nt && (clearInterval(o), a.stop(this.pendingSubscriptionWatchLabel), n(!1));
                }, this.pollingInterval);
            }), this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.restart = async ()=>{
            this.restartInProgress = !0, await this.restore(), await this.reset(), this.restartInProgress = !1;
        }, this.relayer = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.clientId = "";
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get length() {
        return this.subscriptions.size;
    }
    get ids() {
        return Array.from(this.subscriptions.keys());
    }
    get values() {
        return Array.from(this.subscriptions.values());
    }
    get topics() {
        return this.topicMap.topics;
    }
    hasSubscription(e, t) {
        let i = !1;
        try {
            i = this.getSubscription(e).topic === t;
        } catch  {}
        return i;
    }
    onEnable() {
        this.cached = [], this.initialized = !0;
    }
    onDisable() {
        this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear(), this.initialized = !1;
    }
    async unsubscribeByTopic(e, t) {
        const i = this.topicMap.get(e);
        await Promise.all(i.map(async (s)=>await this.unsubscribeById(e, s, t)));
    }
    async unsubscribeById(e, t, i) {
        this.logger.debug("Unsubscribing Topic"), this.logger.trace({
            type: "method",
            method: "unsubscribe",
            params: {
                topic: e,
                id: t,
                opts: i
            }
        });
        try {
            const s = (0, _utils.getRelayProtocolName)(i);
            await this.rpcUnsubscribe(e, t, s);
            const n = (0, _utils.getSdkError)("USER_DISCONNECTED", `${this.name}, ${e}`);
            await this.onUnsubscribe(e, t, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({
                type: "method",
                method: "unsubscribe",
                params: {
                    topic: e,
                    id: t,
                    opts: i
                }
            });
        } catch (s) {
            throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
        }
    }
    async rpcSubscribe(e, t) {
        const i = {
            method: (0, _utils.getRelayProtocolApi)(t.protocol).subscribe,
            params: {
                topic: e
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: i
        });
        try {
            await await (0, _utils.createExpiringPromise)(this.relayer.provider.request(i), this.subscribeTimeout);
        } catch  {
            this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(D.connection_stalled);
        }
        return (0, _utils.hashMessage)(e + this.clientId);
    }
    async rpcBatchSubscribe(e) {
        if (!e.length) return;
        const t = e[0].relay, i = {
            method: (0, _utils.getRelayProtocolApi)(t.protocol).batchSubscribe,
            params: {
                topics: e.map((s)=>s.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: i
        });
        try {
            return await await (0, _utils.createExpiringPromise)(this.relayer.provider.request(i), this.subscribeTimeout);
        } catch  {
            this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(D.connection_stalled);
        }
    }
    rpcUnsubscribe(e, t, i) {
        const s = {
            method: (0, _utils.getRelayProtocolApi)(i.protocol).unsubscribe,
            params: {
                topic: e,
                id: t
            }
        };
        return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: s
        }), this.relayer.provider.request(s);
    }
    onSubscribe(e, t) {
        this.setSubscription(e, ue($({}, t), {
            id: e
        })), this.pending.delete(t.topic);
    }
    onBatchSubscribe(e) {
        e.length && e.forEach((t)=>{
            this.setSubscription(t.id, $({}, t)), this.pending.delete(t.topic);
        });
    }
    async onUnsubscribe(e, t, i) {
        this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
    }
    async setRelayerSubscriptions(e) {
        await this.relayer.core.storage.setItem(this.storageKey, e);
    }
    async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey);
    }
    setSubscription(e, t) {
        this.subscriptions.has(e) || (this.logger.debug("Setting subscription"), this.logger.trace({
            type: "method",
            method: "setSubscription",
            id: e,
            subscription: t
        }), this.addSubscription(e, t));
    }
    addSubscription(e, t) {
        this.subscriptions.set(e, $({}, t)), this.topicMap.set(t.topic, e), this.events.emit(I.created, t);
    }
    getSubscription(e) {
        this.logger.debug("Getting subscription"), this.logger.trace({
            type: "method",
            method: "getSubscription",
            id: e
        });
        const t = this.subscriptions.get(e);
        if (!t) {
            const { message: i  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw new Error(i);
        }
        return t;
    }
    deleteSubscription(e, t) {
        this.logger.debug("Deleting subscription"), this.logger.trace({
            type: "method",
            method: "deleteSubscription",
            id: e,
            reason: t
        });
        const i = this.getSubscription(e);
        this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(I.deleted, ue($({}, i), {
            reason: t
        }));
    }
    async persist() {
        await this.setRelayerSubscriptions(this.values), this.events.emit(I.sync);
    }
    async reset() {
        if (!this.cached.length) return;
        const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
        for(let t = 0; t < e; t++){
            const i = this.cached.splice(0, this.batchSubscribeTopicsLimit);
            await this.batchSubscribe(i);
        }
        this.events.emit(I.resubscribed);
    }
    async restore() {
        try {
            const e = await this.getRelayerSubscriptions();
            if (typeof e > "u" || !e.length) return;
            if (this.subscriptions.size) {
                const { message: t  } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                subscriptions: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
        }
    }
    async batchSubscribe(e) {
        if (!e.length) return;
        const t = await this.rpcBatchSubscribe(e);
        this.onBatchSubscribe(t.map((i, s)=>ue($({}, e[s]), {
                id: i
            })));
    }
    async onConnect() {
        this.restartInProgress || (await this.restart(), this.onEnable());
    }
    onDisconnect() {
        this.onDisable();
    }
    async checkPending() {
        if (this.relayer.transportExplicitlyClosed) return;
        const e = [];
        this.pending.forEach((t)=>{
            e.push(t);
        }), await this.batchSubscribe(e);
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on((0, _heartbeat.HEARTBEAT_EVENTS).pulse, async ()=>{
            await this.checkPending();
        }), this.relayer.on(D.connect, async ()=>{
            await this.onConnect();
        }), this.relayer.on(D.disconnect, ()=>{
            this.onDisconnect();
        }), this.events.on(I.created, async (e)=>{
            const t = I.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), await this.persist();
        }), this.events.on(I.deleted, async (e)=>{
            const t = I.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), await this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    async restartToComplete() {
        this.restartInProgress && await new Promise((e)=>{
            const t = setInterval(()=>{
                this.restartInProgress || (clearInterval(t), e());
            }, this.pollingInterval);
        });
    }
}
var ir = Object.defineProperty, mt = Object.getOwnPropertySymbols, sr = Object.prototype.hasOwnProperty, rr = Object.prototype.propertyIsEnumerable, Et = (r, e, t)=>e in r ? ir(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, nr = (r, e)=>{
    for(var t in e || (e = {}))sr.call(e, t) && Et(r, t, e[t]);
    if (mt) for (var t of mt(e))rr.call(e, t) && Et(r, t, e[t]);
    return r;
};
class ft extends (0, _types.IRelayer) {
    constructor(e){
        super(e), this.protocol = "wc", this.version = 2, this.events = new (0, _events.EventEmitter), this.name = Qe, this.transportExplicitlyClosed = !1, this.initialized = !1, this.reconnecting = !1, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? (0, _logger.generateChildLogger)(e.logger, this.name) : (0, _pinoDefault.default)((0, _logger.getDefaultLoggerOptions)({
            level: e.logger || Ze
        })), this.messages = new pt(this.logger, e.core), this.subscriber = new bt(this, this.logger), this.publisher = new Hs(this, this.logger), this.relayUrl = e?.relayUrl || he, this.projectId = e.projectId, this.provider = {};
    }
    async init() {
        this.logger.trace("Initialized"), this.provider = await this.createProvider(), await Promise.all([
            this.messages.init(),
            this.transportOpen(),
            this.subscriber.init()
        ]), this.registerEventListeners(), this.initialized = !0;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get connected() {
        return this.provider.connection.connected;
    }
    get connecting() {
        return this.provider.connection.connecting;
    }
    async publish(e, t, i) {
        this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({
            topic: e,
            message: t,
            publishedAt: Date.now()
        });
    }
    async subscribe(e, t) {
        this.isInitialized();
        let i = "";
        return await Promise.all([
            new Promise((s)=>{
                this.subscriber.once(I.created, (n)=>{
                    n.topic === e && s();
                });
            }),
            new Promise(async (s)=>{
                i = await this.subscriber.subscribe(e, t), s();
            })
        ]), i;
    }
    async unsubscribe(e, t) {
        this.isInitialized(), await this.subscriber.unsubscribe(e, t);
    }
    on(e, t) {
        this.events.on(e, t);
    }
    once(e, t) {
        this.events.once(e, t);
    }
    off(e, t) {
        this.events.off(e, t);
    }
    removeListener(e, t) {
        this.events.removeListener(e, t);
    }
    async transportClose() {
        this.transportExplicitlyClosed = !0, this.connected && (await this.provider.disconnect(), this.events.emit(D.transport_closed));
    }
    async transportOpen(e) {
        if (!this.reconnecting) {
            this.relayUrl = e || this.relayUrl, this.transportExplicitlyClosed = !1, this.reconnecting = !0;
            try {
                await Promise.all([
                    new Promise((t)=>{
                        this.initialized || t(), this.subscriber.once(I.resubscribed, ()=>{
                            t();
                        });
                    }),
                    await Promise.race([
                        new Promise(async (t)=>{
                            await this.provider.connect(), this.removeListener(D.transport_closed, this.rejectTransportOpen), t();
                        }),
                        new Promise((t)=>this.once(D.transport_closed, this.rejectTransportOpen))
                    ])
                ]);
            } catch (t) {
                const i = t;
                if (!/socket hang up/i.test(i.message)) throw t;
                this.logger.error(t), this.events.emit(D.transport_closed);
            } finally{
                this.reconnecting = !1;
            }
        }
    }
    async restartTransport(e) {
        this.transportExplicitlyClosed || (await this.transportClose(), await new Promise((t)=>setTimeout(t, ce)), await this.transportOpen(e));
    }
    rejectTransportOpen() {
        throw new Error("closeTransport called before connection was established");
    }
    async createProvider() {
        const e = await this.core.crypto.signJWT(this.relayUrl);
        return new (0, _jsonrpcProvider.JsonRpcProvider)(new (0, _jsonrpcWsConnectionDefault.default)((0, _utils.formatRelayRpcUrl)({
            sdkVersion: tt,
            protocol: this.protocol,
            version: this.version,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
            auth: e
        })));
    }
    async recordMessageEvent(e) {
        const { topic: t , message: i  } = e;
        await this.messages.set(t, i);
    }
    async shouldIgnoreMessageEvent(e) {
        const { topic: t , message: i  } = e;
        return await this.subscriber.isSubscribed(t) ? this.messages.has(t, i) : !0;
    }
    async onProviderPayload(e) {
        if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "incoming",
            payload: e
        }), (0, _jsonrpcUtils.isJsonRpcRequest)(e)) {
            if (!e.method.endsWith(et)) return;
            const t = e.params, { topic: i , message: s , publishedAt: n  } = t.data, a = {
                topic: i,
                message: s,
                publishedAt: n
            };
            this.logger.debug("Emitting Relayer Payload"), this.logger.trace(nr({
                type: "event",
                event: t.id
            }, a)), this.events.emit(t.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
        }
    }
    async onMessageEvent(e) {
        await this.shouldIgnoreMessageEvent(e) || (this.events.emit(D.message, e), await this.recordMessageEvent(e));
    }
    async acknowledgePayload(e) {
        const t = (0, _jsonrpcUtils.formatJsonRpcResult)(e.id, !0);
        await this.provider.connection.send(t);
    }
    registerEventListeners() {
        this.provider.on(M.payload, (e)=>this.onProviderPayload(e)), this.provider.on(M.connect, ()=>{
            this.events.emit(D.connect);
        }), this.provider.on(M.disconnect, ()=>{
            this.events.emit(D.disconnect), this.attemptToReconnect();
        }), this.provider.on(M.error, (e)=>this.events.emit(D.error, e)), this.events.on(D.connection_stalled, async ()=>{
            await this.restartTransport();
        });
    }
    attemptToReconnect() {
        this.transportExplicitlyClosed || setTimeout(async ()=>{
            await this.transportOpen();
        }, (0, _time.toMiliseconds)(ce));
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var ar = Object.defineProperty, wt = Object.getOwnPropertySymbols, or = Object.prototype.hasOwnProperty, hr = Object.prototype.propertyIsEnumerable, vt = (r, e, t)=>e in r ? ar(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, It = (r, e)=>{
    for(var t in e || (e = {}))or.call(e, t) && vt(r, t, e[t]);
    if (wt) for (var t of wt(e))hr.call(e, t) && vt(r, t, e[t]);
    return r;
};
class Ct extends (0, _types.IStore) {
    constructor(e, t, i, s = P, n){
        super(e, t, i, s), this.core = e, this.logger = t, this.name = i, this.map = new Map, this.version = it, this.cached = [], this.initialized = !1, this.storagePrefix = P, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((a)=>{
                (0, _utils.isProposalStruct)(a) ? this.map.set(a.id, a) : (0, _utils.isSessionStruct)(a) ? this.map.set(a.topic, a) : this.getKey && a !== null && !(0, _utils.isUndefined)(a) && this.map.set(this.getKey(a), a);
            }), this.cached = [], this.initialized = !0);
        }, this.set = async (a, o)=>{
            this.isInitialized(), this.map.has(a) ? await this.update(a, o) : (this.logger.debug("Setting value"), this.logger.trace({
                type: "method",
                method: "set",
                key: a,
                value: o
            }), this.map.set(a, o), await this.persist());
        }, this.get = (a)=>(this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({
                type: "method",
                method: "get",
                key: a
            }), this.getData(a)), this.getAll = (a)=>(this.isInitialized(), a ? this.values.filter((o)=>Object.keys(a).every((h)=>(0, _lodashIsequalDefault.default)(o[h], a[h]))) : this.values), this.update = async (a, o)=>{
            this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({
                type: "method",
                method: "update",
                key: a,
                update: o
            });
            const h = It(It({}, this.getData(a)), o);
            this.map.set(a, h), await this.persist();
        }, this.delete = async (a, o)=>{
            this.isInitialized(), this.map.has(a) && (this.logger.debug("Deleting value"), this.logger.trace({
                type: "method",
                method: "delete",
                key: a,
                reason: o
            }), this.map.delete(a), await this.persist());
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.storagePrefix = s, this.getKey = n;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get length() {
        return this.map.size;
    }
    get keys() {
        return Array.from(this.map.keys());
    }
    get values() {
        return Array.from(this.map.values());
    }
    async setDataStore(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getDataStore() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getData(e) {
        const t = this.map.get(e);
        if (!t) {
            const { message: i  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw this.logger.error(i), new Error(i);
        }
        return t;
    }
    async persist() {
        await this.setDataStore(this.values);
    }
    async restore() {
        try {
            const e = await this.getDataStore();
            if (typeof e > "u" || !e.length) return;
            if (this.map.size) {
                const { message: t  } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                value: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class _t {
    constructor(e, t){
        this.core = e, this.logger = t, this.name = at, this.version = ot, this.events = new (0, _eventsDefault.default), this.initialized = !1, this.storagePrefix = P, this.ignoredPayloadTypes = [
            (0, _utils.TYPE_1)
        ], this.registeredMethods = [], this.init = async ()=>{
            this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
        }, this.register = ({ methods: i  })=>{
            this.isInitialized(), this.registeredMethods = [
                ...new Set([
                    ...this.registeredMethods,
                    ...i
                ])
            ];
        }, this.create = async ()=>{
            this.isInitialized();
            const i = (0, _utils.generateRandomBytes32)(), s = await this.core.crypto.setSymKey(i), n = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES)), a = {
                protocol: We
            }, o = {
                topic: s,
                expiry: n,
                relay: a,
                active: !1
            }, h = (0, _utils.formatUri)({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: s,
                symKey: i,
                relay: a
            });
            return await this.pairings.set(s, o), await this.core.relayer.subscribe(s), this.core.expirer.set(s, n), {
                topic: s,
                uri: h
            };
        }, this.pair = async (i)=>{
            this.isInitialized(), this.isValidPair(i);
            const { topic: s , symKey: n , relay: a  } = (0, _utils.parseUri)(i.uri), o = (0, _utils.calcExpiry)((0, _time.FIVE_MINUTES)), h = {
                topic: s,
                relay: a,
                expiry: o,
                active: !1
            };
            return await this.pairings.set(s, h), await this.core.crypto.setSymKey(n, s), await this.core.relayer.subscribe(s, {
                relay: a
            }), this.core.expirer.set(s, o), i.activatePairing && await this.activate({
                topic: s
            }), h;
        }, this.activate = async ({ topic: i  })=>{
            this.isInitialized();
            const s = (0, _utils.calcExpiry)((0, _time.THIRTY_DAYS));
            await this.pairings.update(i, {
                active: !0,
                expiry: s
            }), this.core.expirer.set(i, s);
        }, this.ping = async (i)=>{
            this.isInitialized(), await this.isValidPing(i);
            const { topic: s  } = i;
            if (this.pairings.keys.includes(s)) {
                const n = await this.sendRequest(s, "wc_pairingPing", {}), { done: a , resolve: o , reject: h  } = (0, _utils.createDelayedPromise)();
                this.events.once((0, _utils.engineEvent)("pairing_ping", n), ({ error: d  })=>{
                    d ? h(d) : o();
                }), await a();
            }
        }, this.updateExpiry = async ({ topic: i , expiry: s  })=>{
            this.isInitialized(), await this.pairings.update(i, {
                expiry: s
            });
        }, this.updateMetadata = async ({ topic: i , metadata: s  })=>{
            this.isInitialized(), await this.pairings.update(i, {
                peerMetadata: s
            });
        }, this.getPairings = ()=>(this.isInitialized(), this.pairings.values), this.disconnect = async (i)=>{
            this.isInitialized(), await this.isValidDisconnect(i);
            const { topic: s  } = i;
            this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", (0, _utils.getSdkError)("USER_DISCONNECTED")), await this.deletePairing(s));
        }, this.sendRequest = async (i, s, n)=>{
            const a = (0, _jsonrpcUtils.formatJsonRpcRequest)(s, n), o = await this.core.crypto.encode(i, a), h = N[s].req;
            return this.core.history.set(i, a), await this.core.relayer.publish(i, o, h), a.id;
        }, this.sendResult = async (i, s, n)=>{
            const a = (0, _jsonrpcUtils.formatJsonRpcResult)(i, n), o = await this.core.crypto.encode(s, a), h = await this.core.history.get(s, i), d = N[h.request.method].res;
            await this.core.relayer.publish(s, o, d), await this.core.history.resolve(a);
        }, this.sendError = async (i, s, n)=>{
            const a = (0, _jsonrpcUtils.formatJsonRpcError)(i, n), o = await this.core.crypto.encode(s, a), h = await this.core.history.get(s, i), d = N[h.request.method] ? N[h.request.method].res : N.unregistered_method.res;
            await this.core.relayer.publish(s, o, d), await this.core.history.resolve(a);
        }, this.deletePairing = async (i, s)=>{
            await this.core.relayer.unsubscribe(i), await Promise.all([
                this.pairings.delete(i, (0, _utils.getSdkError)("USER_DISCONNECTED")),
                this.core.crypto.deleteSymKey(i),
                s ? Promise.resolve() : this.core.expirer.del(i)
            ]);
        }, this.cleanup = async ()=>{
            const i = this.pairings.getAll().filter((s)=>(0, _utils.isExpired)(s.expiry));
            await Promise.all(i.map((s)=>this.deletePairing(s.topic)));
        }, this.onRelayEventRequest = (i)=>{
            const { topic: s , payload: n  } = i, a = n.method;
            if (this.pairings.keys.includes(s)) switch(a){
                case "wc_pairingPing":
                    return this.onPairingPingRequest(s, n);
                case "wc_pairingDelete":
                    return this.onPairingDeleteRequest(s, n);
                default:
                    return this.onUnknownRpcMethodRequest(s, n);
            }
        }, this.onRelayEventResponse = async (i)=>{
            const { topic: s , payload: n  } = i, a = (await this.core.history.get(s, n.id)).request.method;
            if (this.pairings.keys.includes(s)) switch(a){
                case "wc_pairingPing":
                    return this.onPairingPingResponse(s, n);
                default:
                    return this.onUnknownRpcMethodResponse(a);
            }
        }, this.onPairingPingRequest = async (i, s)=>{
            const { id: n  } = s;
            try {
                this.isValidPing({
                    topic: i
                }), await this.sendResult(n, i, !0), this.events.emit("pairing_ping", {
                    id: n,
                    topic: i
                });
            } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
            }
        }, this.onPairingPingResponse = (i, s)=>{
            const { id: n  } = s;
            setTimeout(()=>{
                (0, _jsonrpcUtils.isJsonRpcResult)(s) ? this.events.emit((0, _utils.engineEvent)("pairing_ping", n), {}) : (0, _jsonrpcUtils.isJsonRpcError)(s) && this.events.emit((0, _utils.engineEvent)("pairing_ping", n), {
                    error: s.error
                });
            }, 500);
        }, this.onPairingDeleteRequest = async (i, s)=>{
            const { id: n  } = s;
            try {
                this.isValidDisconnect({
                    topic: i
                }), await this.deletePairing(i), this.events.emit("pairing_delete", {
                    id: n,
                    topic: i
                });
            } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
            }
        }, this.onUnknownRpcMethodRequest = async (i, s)=>{
            const { id: n , method: a  } = s;
            try {
                if (this.registeredMethods.includes(a)) return;
                const o = (0, _utils.getSdkError)("WC_METHOD_UNSUPPORTED", a);
                await this.sendError(n, i, o), this.logger.error(o);
            } catch (o) {
                await this.sendError(n, i, o), this.logger.error(o);
            }
        }, this.onUnknownRpcMethodResponse = (i)=>{
            this.registeredMethods.includes(i) || this.logger.error((0, _utils.getSdkError)("WC_METHOD_UNSUPPORTED", i));
        }, this.isValidPair = (i)=>{
            if (!(0, _utils.isValidParams)(i)) {
                const { message: s  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pair() params: ${i}`);
                throw new Error(s);
            }
            if (!(0, _utils.isValidUrl)(i.uri)) {
                const { message: s  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
                throw new Error(s);
            }
        }, this.isValidPing = async (i)=>{
            if (!(0, _utils.isValidParams)(i)) {
                const { message: n  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `ping() params: ${i}`);
                throw new Error(n);
            }
            const { topic: s  } = i;
            await this.isValidPairingTopic(s);
        }, this.isValidDisconnect = async (i)=>{
            if (!(0, _utils.isValidParams)(i)) {
                const { message: n  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `disconnect() params: ${i}`);
                throw new Error(n);
            }
            const { topic: s  } = i;
            await this.isValidPairingTopic(s);
        }, this.isValidPairingTopic = async (i)=>{
            if (!(0, _utils.isValidString)(i, !1)) {
                const { message: s  } = (0, _utils.getInternalError)("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
                throw new Error(s);
            }
            if (!this.pairings.keys.includes(i)) {
                const { message: s  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
                throw new Error(s);
            }
            if ((0, _utils.isExpired)(this.pairings.get(i).expiry)) {
                await this.deletePairing(i);
                const { message: s  } = (0, _utils.getInternalError)("EXPIRED", `pairing topic: ${i}`);
                throw new Error(s);
            }
        }, this.core = e, this.logger = (0, _logger.generateChildLogger)(t, this.name), this.pairings = new Ct(this.core, this.logger, this.name, this.storagePrefix);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    registerRelayerEvents() {
        this.core.relayer.on(D.message, async (e)=>{
            const { topic: t , message: i  } = e;
            if (this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i))) return;
            const s = await this.core.crypto.decode(t, i);
            (0, _jsonrpcUtils.isJsonRpcRequest)(s) ? (this.core.history.set(t, s), this.onRelayEventRequest({
                topic: t,
                payload: s
            })) : (0, _jsonrpcUtils.isJsonRpcResponse)(s) && (await this.core.history.resolve(s), this.onRelayEventResponse({
                topic: t,
                payload: s
            }));
        });
    }
    registerExpirerEvents() {
        this.core.expirer.on(m.expired, async (e)=>{
            const { topic: t  } = (0, _utils.parseExpirerTarget)(e.target);
            t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit("pairing_expire", {
                topic: t
            }));
        });
    }
}
class Rt extends (0, _types.IJsonRpcHistory) {
    constructor(e, t){
        super(e, t), this.core = e, this.logger = t, this.records = new Map, this.events = new (0, _events.EventEmitter), this.name = ht, this.version = ct, this.cached = [], this.initialized = !1, this.storagePrefix = P, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i)=>this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
        }, this.set = (i, s, n)=>{
            if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({
                type: "method",
                method: "set",
                topic: i,
                request: s,
                chainId: n
            }), this.records.has(s.id)) return;
            const a = {
                id: s.id,
                topic: i,
                request: {
                    method: s.method,
                    params: s.params || null
                },
                chainId: n
            };
            this.records.set(a.id, a), this.events.emit(C.created, a);
        }, this.resolve = async (i)=>{
            if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({
                type: "method",
                method: "update",
                response: i
            }), !this.records.has(i.id)) return;
            const s = await this.getRecord(i.id);
            typeof s.response > "u" && (s.response = (0, _jsonrpcUtils.isJsonRpcError)(i) ? {
                error: i.error
            } : {
                result: i.result
            }, this.records.set(s.id, s), this.events.emit(C.updated, s));
        }, this.get = async (i, s)=>(this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({
                type: "method",
                method: "get",
                topic: i,
                id: s
            }), await this.getRecord(s)), this.delete = (i, s)=>{
            this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({
                type: "method",
                method: "delete",
                id: s
            }), this.values.forEach((n)=>{
                if (n.topic === i) {
                    if (typeof s < "u" && n.id !== s) return;
                    this.records.delete(n.id), this.events.emit(C.deleted, n);
                }
            });
        }, this.exists = async (i, s)=>(this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i : !1), this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get size() {
        return this.records.size;
    }
    get keys() {
        return Array.from(this.records.keys());
    }
    get values() {
        return Array.from(this.records.values());
    }
    get pending() {
        const e = [];
        return this.values.forEach((t)=>{
            if (typeof t.response < "u") return;
            const i = {
                topic: t.topic,
                request: (0, _jsonrpcUtils.formatJsonRpcRequest)(t.request.method, t.request.params, t.id),
                chainId: t.chainId
            };
            return e.push(i);
        }), e;
    }
    async setJsonRpcRecords(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getRecord(e) {
        this.isInitialized();
        const t = this.records.get(e);
        if (!t) {
            const { message: i  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw new Error(i);
        }
        return t;
    }
    async persist() {
        await this.setJsonRpcRecords(this.values), this.events.emit(C.sync);
    }
    async restore() {
        try {
            const e = await this.getJsonRpcRecords();
            if (typeof e > "u" || !e.length) return;
            if (this.records.size) {
                const { message: t  } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                records: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
        }
    }
    registerEventListeners() {
        this.events.on(C.created, (e)=>{
            const t = C.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            }), this.persist();
        }), this.events.on(C.updated, (e)=>{
            const t = C.updated;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            }), this.persist();
        }), this.events.on(C.deleted, (e)=>{
            const t = C.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            }), this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
class St extends (0, _types.IExpirer) {
    constructor(e, t){
        super(e, t), this.core = e, this.logger = t, this.expirations = new Map, this.events = new (0, _events.EventEmitter), this.name = ut, this.version = lt, this.cached = [], this.initialized = !1, this.storagePrefix = P, this.init = async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i)=>this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
        }, this.has = (i)=>{
            try {
                const s = this.formatTarget(i);
                return typeof this.getExpiration(s) < "u";
            } catch  {
                return !1;
            }
        }, this.set = (i, s)=>{
            this.isInitialized();
            const n = this.formatTarget(i), a = {
                target: n,
                expiry: s
            };
            this.expirations.set(n, a), this.checkExpiry(n, a), this.events.emit(m.created, {
                target: n,
                expiration: a
            });
        }, this.get = (i)=>{
            this.isInitialized();
            const s = this.formatTarget(i);
            return this.getExpiration(s);
        }, this.del = (i)=>{
            if (this.isInitialized(), this.has(i)) {
                const s = this.formatTarget(i), n = this.getExpiration(s);
                this.expirations.delete(s), this.events.emit(m.deleted, {
                    target: s,
                    expiration: n
                });
            }
        }, this.on = (i, s)=>{
            this.events.on(i, s);
        }, this.once = (i, s)=>{
            this.events.once(i, s);
        }, this.off = (i, s)=>{
            this.events.off(i, s);
        }, this.removeListener = (i, s)=>{
            this.events.removeListener(i, s);
        }, this.logger = (0, _logger.generateChildLogger)(t, this.name);
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
    }
    get length() {
        return this.expirations.size;
    }
    get keys() {
        return Array.from(this.expirations.keys());
    }
    get values() {
        return Array.from(this.expirations.values());
    }
    formatTarget(e) {
        if (typeof e == "string") return (0, _utils.formatTopicTarget)(e);
        if (typeof e == "number") return (0, _utils.formatIdTarget)(e);
        const { message: t  } = (0, _utils.getInternalError)("UNKNOWN_TYPE", `Target type: ${typeof e}`);
        throw new Error(t);
    }
    async setExpirations(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getExpirations() {
        return await this.core.storage.getItem(this.storageKey);
    }
    async persist() {
        await this.setExpirations(this.values), this.events.emit(m.sync);
    }
    async restore() {
        try {
            const e = await this.getExpirations();
            if (typeof e > "u" || !e.length) return;
            if (this.expirations.size) {
                const { message: t  } = (0, _utils.getInternalError)("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                expirations: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
        }
    }
    getExpiration(e) {
        const t = this.expirations.get(e);
        if (!t) {
            const { message: i  } = (0, _utils.getInternalError)("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw this.logger.error(i), new Error(i);
        }
        return t;
    }
    checkExpiry(e, t) {
        const { expiry: i  } = t;
        (0, _time.toMiliseconds)(i) - Date.now() <= 0 && this.expire(e, t);
    }
    expire(e, t) {
        this.expirations.delete(e), this.events.emit(m.expired, {
            target: e,
            expiration: t
        });
    }
    checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach((e, t)=>this.checkExpiry(t, e));
    }
    registerEventListeners() {
        this.core.heartbeat.on((0, _heartbeat.HEARTBEAT_EVENTS).pulse, ()=>this.checkExpirations()), this.events.on(m.created, (e)=>{
            const t = m.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        }), this.events.on(m.expired, (e)=>{
            const t = m.expired;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        }), this.events.on(m.deleted, (e)=>{
            const t = m.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e  } = (0, _utils.getInternalError)("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var cr = Object.defineProperty, Tt = Object.getOwnPropertySymbols, ur = Object.prototype.hasOwnProperty, lr = Object.prototype.propertyIsEnumerable, Pt = (r, e, t)=>e in r ? cr(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, xt = (r, e)=>{
    for(var t in e || (e = {}))ur.call(e, t) && Pt(r, t, e[t]);
    if (Tt) for (var t of Tt(e))lr.call(e, t) && Pt(r, t, e[t]);
    return r;
};
class G extends (0, _types.ICore) {
    constructor(e){
        super(e), this.protocol = ae, this.version = Ke, this.name = q, this.events = new (0, _events.EventEmitter), this.initialized = !1, this.on = (i, s)=>this.events.on(i, s), this.once = (i, s)=>this.events.once(i, s), this.off = (i, s)=>this.events.off(i, s), this.removeListener = (i, s)=>this.events.removeListener(i, s), this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || he;
        const t = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, _pinoDefault.default)((0, _logger.getDefaultLoggerOptions)({
            level: e?.logger || Be.logger
        }));
        this.logger = (0, _logger.generateChildLogger)(t, this.name), this.heartbeat = new (0, _heartbeat.HeartBeat), this.crypto = new gt(this, this.logger, e?.keychain), this.history = new Rt(this, this.logger), this.expirer = new St(this, this.logger), this.storage = e != null && e.storage ? e.storage : new (0, _keyvaluestorageDefault.default)(xt(xt({}, ke), e?.storageOptions)), this.relayer = new ft({
            core: this,
            logger: this.logger,
            relayUrl: this.relayUrl,
            projectId: this.projectId
        }), this.pairing = new _t(this, this.logger);
    }
    static async init(e) {
        const t = new G(e);
        return await t.initialize(), t;
    }
    get context() {
        return (0, _logger.getLoggerContext)(this.logger);
    }
    async start() {
        this.initialized || await this.initialize();
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.initialized = !0, this.logger.info("Core Initialization Success");
        } catch (e) {
            throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
        }
    }
}
const dr = G;

},{"events":"1VQLm","pino":"a8XEU","@walletconnect/keyvaluestorage":"2heaE","@walletconnect/heartbeat":"6G2yQ","@walletconnect/logger":"bTcqM","@walletconnect/types":"1xCHa","@walletconnect/safe-json":"6mDE9","@walletconnect/relay-auth":"1LVbO","@walletconnect/utils":"o3k5L","@walletconnect/time":"2hzsP","@walletconnect/jsonrpc-provider":"6zGTK","@walletconnect/jsonrpc-utils":"izCJ8","@walletconnect/jsonrpc-ws-connection":"gsp7F","lodash.isequal":"6emId","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2heaE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyValueStorage = void 0;
const tslib_1 = require("ed511e6a30eb6be5");
const safe_json_utils_1 = require("3defc7ab4cbc9674");
const localStorage_1 = tslib_1.__importDefault(require("572eade6f1e56aa2"));
const shared_1 = require("f6a970db11122858");
class KeyValueStorage {
    constructor(){
        this.localStorage = localStorage_1.default;
    }
    getKeys() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            return Object.keys(this.localStorage);
        });
    }
    getEntries() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            return Object.entries(this.localStorage).map(shared_1.parseEntry);
        });
    }
    getItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            const item = this.localStorage.getItem(key);
            if (item === null) return undefined;
            return safe_json_utils_1.safeJsonParse(item);
        });
    }
    setItem(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            this.localStorage.setItem(key, safe_json_utils_1.safeJsonStringify(value));
        });
    }
    removeItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            this.localStorage.removeItem(key);
        });
    }
}
exports.KeyValueStorage = KeyValueStorage;
exports.default = KeyValueStorage;

},{"ed511e6a30eb6be5":"fj46x","3defc7ab4cbc9674":"30P0N","572eade6f1e56aa2":"eEfFJ","f6a970db11122858":"i8CA6"}],"fj46x":[function(require,module,exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends);
parcelHelpers.export(exports, "__assign", ()=>__assign);
parcelHelpers.export(exports, "__rest", ()=>__rest);
parcelHelpers.export(exports, "__decorate", ()=>__decorate);
parcelHelpers.export(exports, "__param", ()=>__param);
parcelHelpers.export(exports, "__metadata", ()=>__metadata);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter);
parcelHelpers.export(exports, "__generator", ()=>__generator);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar);
parcelHelpers.export(exports, "__values", ()=>__values);
parcelHelpers.export(exports, "__read", ()=>__read);
parcelHelpers.export(exports, "__spread", ()=>__spread);
parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays);
parcelHelpers.export(exports, "__await", ()=>__await);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject);
parcelHelpers.export(exports, "__importStar", ()=>__importStar);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    privateMap.set(receiver, value);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"30P0N":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
exports.safeJsonParse = safeJsonParse;
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSON.stringify(value, (key, value)=>typeof value === "undefined" ? null : value);
}
exports.safeJsonStringify = safeJsonStringify;

},{}],"eEfFJ":[function(require,module,exports) {
var global = arguments[3];
"use strict";
(function() {
    "use strict";
    let db;
    function LocalStorage() {}
    db = LocalStorage;
    db.prototype.getItem = function(key) {
        if (this.hasOwnProperty(key)) return String(this[key]);
        return null;
    };
    db.prototype.setItem = function(key, val) {
        this[key] = String(val);
    };
    db.prototype.removeItem = function(key) {
        delete this[key];
    };
    db.prototype.clear = function() {
        const self = this;
        Object.keys(self).forEach(function(key) {
            self[key] = undefined;
            delete self[key];
        });
    };
    db.prototype.key = function(i) {
        i = i || 0;
        return Object.keys(this)[i];
    };
    db.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length;
    });
    if (typeof global !== "undefined" && global.localStorage) module.exports = global.localStorage;
    else if (typeof window !== "undefined" && window.localStorage) module.exports = window.localStorage;
    else module.exports = new LocalStorage();
})();

},{}],"i8CA6":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("e799005ff764ea82");
tslib_1.__exportStar(require("5e7161a12baf1508"), exports);
tslib_1.__exportStar(require("9921533be34bb6c0"), exports);

},{"e799005ff764ea82":"fj46x","5e7161a12baf1508":"js2cZ","9921533be34bb6c0":"uyrqi"}],"js2cZ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IKeyValueStorage = void 0;
class IKeyValueStorage {
}
exports.IKeyValueStorage = IKeyValueStorage;

},{}],"uyrqi":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseEntry = void 0;
const safe_json_utils_1 = require("a8b0187882a677ad");
function parseEntry(entry) {
    var _a;
    return [
        entry[0],
        safe_json_utils_1.safeJsonParse((_a = entry[1]) !== null && _a !== void 0 ? _a : "")
    ];
}
exports.parseEntry = parseEntry;

},{"a8b0187882a677ad":"30P0N"}],"6G2yQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("f431451b4b9fa69f");
tslib_1.__exportStar(require("983e1a55fc8e0f51"), exports);
tslib_1.__exportStar(require("8238581607d809a8"), exports);
tslib_1.__exportStar(require("ab88ef98b702a8c3"), exports);

},{"f431451b4b9fa69f":"eIZnl","983e1a55fc8e0f51":"9dFK0","8238581607d809a8":"6osg5","ab88ef98b702a8c3":"bn7R7"}],"eIZnl":[function(require,module,exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends);
parcelHelpers.export(exports, "__assign", ()=>__assign);
parcelHelpers.export(exports, "__rest", ()=>__rest);
parcelHelpers.export(exports, "__decorate", ()=>__decorate);
parcelHelpers.export(exports, "__param", ()=>__param);
parcelHelpers.export(exports, "__metadata", ()=>__metadata);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter);
parcelHelpers.export(exports, "__generator", ()=>__generator);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar);
parcelHelpers.export(exports, "__values", ()=>__values);
parcelHelpers.export(exports, "__read", ()=>__read);
parcelHelpers.export(exports, "__spread", ()=>__spread);
parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays);
parcelHelpers.export(exports, "__await", ()=>__await);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject);
parcelHelpers.export(exports, "__importStar", ()=>__importStar);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    privateMap.set(receiver, value);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9dFK0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeartBeat = void 0;
const tslib_1 = require("f518a8712686b86e");
const events_1 = require("70f70e4cdb89db39");
const time_1 = require("1e7666345e66a9af");
const types_1 = require("dcd0d58080b15a31");
const constants_1 = require("4827c0735e8d3d72");
class HeartBeat extends types_1.IHeartBeat {
    constructor(opts){
        super(opts);
        this.events = new events_1.EventEmitter();
        this.interval = constants_1.HEARTBEAT_INTERVAL;
        this.interval = (opts === null || opts === void 0 ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL;
    }
    static init(opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            const heartbeat = new HeartBeat(opts);
            yield heartbeat.init();
            return heartbeat;
        });
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            yield this.initialize();
        });
    }
    stop() {
        clearInterval(this.intervalRef);
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function*() {
            this.intervalRef = setInterval(()=>this.pulse(), time_1.toMiliseconds(this.interval));
        });
    }
    pulse() {
        this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
    }
}
exports.HeartBeat = HeartBeat;

},{"f518a8712686b86e":"eIZnl","70f70e4cdb89db39":"1VQLm","1e7666345e66a9af":"2hzsP","dcd0d58080b15a31":"6osg5","4827c0735e8d3d72":"bn7R7"}],"2hzsP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("5961e303684b9f87");
tslib_1.__exportStar(require("c05deabaf8dd72d1"), exports);
tslib_1.__exportStar(require("eb7949c5e22fe71e"), exports);
tslib_1.__exportStar(require("f34211fadc64bb44"), exports);
tslib_1.__exportStar(require("e2f0cce33c2b3efb"), exports);

},{"5961e303684b9f87":"jz1PS","c05deabaf8dd72d1":"llJJV","eb7949c5e22fe71e":"fK9IB","f34211fadc64bb44":"cLyNr","e2f0cce33c2b3efb":"haD5H"}],"jz1PS":[function(require,module,exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends);
parcelHelpers.export(exports, "__assign", ()=>__assign);
parcelHelpers.export(exports, "__rest", ()=>__rest);
parcelHelpers.export(exports, "__decorate", ()=>__decorate);
parcelHelpers.export(exports, "__param", ()=>__param);
parcelHelpers.export(exports, "__metadata", ()=>__metadata);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter);
parcelHelpers.export(exports, "__generator", ()=>__generator);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar);
parcelHelpers.export(exports, "__values", ()=>__values);
parcelHelpers.export(exports, "__read", ()=>__read);
parcelHelpers.export(exports, "__spread", ()=>__spread);
parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays);
parcelHelpers.export(exports, "__await", ()=>__await);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject);
parcelHelpers.export(exports, "__importStar", ()=>__importStar);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    privateMap.set(receiver, value);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"llJJV":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("654e9d4079abc99c");
tslib_1.__exportStar(require("dfab2498afb6e15b"), exports);
tslib_1.__exportStar(require("2b631818218c95b4"), exports);

},{"654e9d4079abc99c":"jz1PS","dfab2498afb6e15b":"h9MW7","2b631818218c95b4":"g6oQy"}],"h9MW7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = void 0;
function delay(timeout) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true);
        }, timeout);
    });
}
exports.delay = delay;

},{}],"g6oQy":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromMiliseconds = exports.toMiliseconds = void 0;
const constants_1 = require("4a596bb00f567cf1");
function toMiliseconds(seconds) {
    return seconds * constants_1.ONE_THOUSAND;
}
exports.toMiliseconds = toMiliseconds;
function fromMiliseconds(miliseconds) {
    return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
}
exports.fromMiliseconds = fromMiliseconds;

},{"4a596bb00f567cf1":"haD5H"}],"haD5H":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("23b47723a5bdcf49");
tslib_1.__exportStar(require("55e6ea56139d0435"), exports);
tslib_1.__exportStar(require("8b0fa0a1a8aaf873"), exports);

},{"23b47723a5bdcf49":"jz1PS","55e6ea56139d0435":"duIKl","8b0fa0a1a8aaf873":"iENbz"}],"duIKl":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
exports.ONE_HUNDRED = 100;
exports.ONE_THOUSAND = 1000;

},{}],"iENbz":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
exports.ONE_SECOND = 1;
exports.FIVE_SECONDS = 5;
exports.TEN_SECONDS = 10;
exports.THIRTY_SECONDS = 30;
exports.SIXTY_SECONDS = 60;
exports.ONE_MINUTE = exports.SIXTY_SECONDS;
exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
exports.ONE_HOUR = exports.SIXTY_MINUTES;
exports.THREE_HOURS = exports.ONE_HOUR * 3;
exports.SIX_HOURS = exports.ONE_HOUR * 6;
exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
exports.THREE_DAYS = exports.ONE_DAY * 3;
exports.FIVE_DAYS = exports.ONE_DAY * 5;
exports.SEVEN_DAYS = exports.ONE_DAY * 7;
exports.THIRTY_DAYS = exports.ONE_DAY * 30;
exports.ONE_WEEK = exports.SEVEN_DAYS;
exports.TWO_WEEKS = exports.ONE_WEEK * 2;
exports.THREE_WEEKS = exports.ONE_WEEK * 3;
exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
exports.ONE_YEAR = exports.ONE_DAY * 365;

},{}],"fK9IB":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Watch = void 0;
class Watch {
    constructor(){
        this.timestamps = new Map();
    }
    start(label) {
        if (this.timestamps.has(label)) throw new Error(`Watch already started for label: ${label}`);
        this.timestamps.set(label, {
            started: Date.now()
        });
    }
    stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") throw new Error(`Watch already stopped for label: ${label}`);
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, {
            started: timestamp.started,
            elapsed
        });
    }
    get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") throw new Error(`No timestamp found for label: ${label}`);
        return timestamp;
    }
    elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
    }
}
exports.Watch = Watch;
exports.default = Watch;

},{}],"cLyNr":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("29b398c5ac341ea7");
tslib_1.__exportStar(require("7985aede29eecf58"), exports);

},{"29b398c5ac341ea7":"jz1PS","7985aede29eecf58":"hs39c"}],"hs39c":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IWatch = void 0;
class IWatch {
}
exports.IWatch = IWatch;

},{}],"6osg5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("14e305c8a30cf66f");
tslib_1.__exportStar(require("37a4305e101436bc"), exports);

},{"14e305c8a30cf66f":"eIZnl","37a4305e101436bc":"9jTKH"}],"9jTKH":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IHeartBeat = void 0;
const events_1 = require("efa020fb6192943a");
class IHeartBeat extends events_1.IEvents {
    constructor(opts){
        super();
    }
}
exports.IHeartBeat = IHeartBeat;

},{"efa020fb6192943a":"aO3HO"}],"aO3HO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _events = require("./events");
parcelHelpers.exportAll(_events, exports);

},{"./events":"1lzU5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1lzU5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IEvents", ()=>IEvents);
class IEvents {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bn7R7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("a34a399422606875");
tslib_1.__exportStar(require("9b89e1fcb2dc75b7"), exports);

},{"a34a399422606875":"eIZnl","9b89e1fcb2dc75b7":"jSiJT"}],"jSiJT":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HEARTBEAT_EVENTS = exports.HEARTBEAT_INTERVAL = void 0;
const time_1 = require("bff7090022c2f0bb");
exports.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS;
exports.HEARTBEAT_EVENTS = {
    pulse: "heartbeat_pulse"
};

},{"bff7090022c2f0bb":"2hzsP"}],"bTcqM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pino = void 0;
const tslib_1 = require("7dd4efce4bd72170");
const pino_1 = tslib_1.__importDefault(require("2672eb6491741d9a"));
Object.defineProperty(exports, "pino", {
    enumerable: true,
    get: function() {
        return pino_1.default;
    }
});
tslib_1.__exportStar(require("8a47a47d1217ca1f"), exports);
tslib_1.__exportStar(require("1cbea506ec30c20f"), exports);

},{"7dd4efce4bd72170":"dPn0J","2672eb6491741d9a":"a8XEU","8a47a47d1217ca1f":"5l237","1cbea506ec30c20f":"lk0xa"}],"dPn0J":[function(require,module,exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends);
parcelHelpers.export(exports, "__assign", ()=>__assign);
parcelHelpers.export(exports, "__rest", ()=>__rest);
parcelHelpers.export(exports, "__decorate", ()=>__decorate);
parcelHelpers.export(exports, "__param", ()=>__param);
parcelHelpers.export(exports, "__metadata", ()=>__metadata);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter);
parcelHelpers.export(exports, "__generator", ()=>__generator);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar);
parcelHelpers.export(exports, "__values", ()=>__values);
parcelHelpers.export(exports, "__read", ()=>__read);
parcelHelpers.export(exports, "__spread", ()=>__spread);
parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays);
parcelHelpers.export(exports, "__await", ()=>__await);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject);
parcelHelpers.export(exports, "__importStar", ()=>__importStar);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    privateMap.set(receiver, value);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5l237":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PINO_CUSTOM_CONTEXT_KEY = exports.PINO_LOGGER_DEFAULTS = void 0;
exports.PINO_LOGGER_DEFAULTS = {
    level: "info"
};
exports.PINO_CUSTOM_CONTEXT_KEY = "custom_context";

},{}],"lk0xa":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateChildLogger = exports.formatChildLoggerContext = exports.getLoggerContext = exports.setBrowserLoggerContext = exports.getBrowserLoggerContext = exports.getDefaultLoggerOptions = void 0;
const constants_1 = require("2dee212c7e445793");
function getDefaultLoggerOptions(opts) {
    return Object.assign(Object.assign({}, opts), {
        level: (opts === null || opts === void 0 ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level
    });
}
exports.getDefaultLoggerOptions = getDefaultLoggerOptions;
function getBrowserLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    return logger[customContextKey] || "";
}
exports.getBrowserLoggerContext = getBrowserLoggerContext;
function setBrowserLoggerContext(logger, context, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    logger[customContextKey] = context;
    return logger;
}
exports.setBrowserLoggerContext = setBrowserLoggerContext;
function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    let context = "";
    if (typeof logger.bindings === "undefined") context = getBrowserLoggerContext(logger, customContextKey);
    else context = logger.bindings().context || "";
    return context;
}
exports.getLoggerContext = getLoggerContext;
function formatChildLoggerContext(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    const parentContext = getLoggerContext(logger, customContextKey);
    const context = parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
    return context;
}
exports.formatChildLoggerContext = formatChildLoggerContext;
function generateChildLogger(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    const context = formatChildLoggerContext(logger, childContext, customContextKey);
    const child = logger.child({
        context
    });
    return setBrowserLoggerContext(child, context, customContextKey);
}
exports.generateChildLogger = generateChildLogger;

},{"2dee212c7e445793":"5l237"}],"1xCHa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ICore", ()=>n);
parcelHelpers.export(exports, "ICrypto", ()=>l);
parcelHelpers.export(exports, "IEngine", ()=>C);
parcelHelpers.export(exports, "IEngineEvents", ()=>b);
parcelHelpers.export(exports, "IExpirer", ()=>E);
parcelHelpers.export(exports, "IJsonRpcHistory", ()=>h);
parcelHelpers.export(exports, "IKeyChain", ()=>d);
parcelHelpers.export(exports, "IMessageTracker", ()=>a);
parcelHelpers.export(exports, "IPairing", ()=>m);
parcelHelpers.export(exports, "IPublisher", ()=>u);
parcelHelpers.export(exports, "IRelayer", ()=>g);
parcelHelpers.export(exports, "ISignClient", ()=>y);
parcelHelpers.export(exports, "ISignClientEvents", ()=>v);
parcelHelpers.export(exports, "IStore", ()=>p);
parcelHelpers.export(exports, "ISubscriber", ()=>x);
parcelHelpers.export(exports, "ISubscriberTopicMap", ()=>I);
var _events = require("@walletconnect/events");
var _events1 = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events1);
class n extends (0, _events.IEvents) {
    constructor(s){
        super(), this.opts = s, this.protocol = "wc", this.version = 2;
    }
}
class l {
    constructor(s, t, o){
        this.core = s, this.logger = t;
    }
}
class h extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.core = s, this.logger = t, this.records = new Map;
    }
}
class a {
    constructor(s, t){
        this.logger = s, this.core = t;
    }
}
class u extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.relayer = s, this.logger = t;
    }
}
class g extends (0, _events.IEvents) {
    constructor(s){
        super();
    }
}
class p {
    constructor(s, t, o, S){
        this.core = s, this.logger = t, this.name = o;
    }
}
class I {
    constructor(){
        this.map = new Map;
    }
}
class x extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.relayer = s, this.logger = t;
    }
}
class d {
    constructor(s, t){
        this.core = s, this.logger = t;
    }
}
class E extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.core = s, this.logger = t;
    }
}
class m {
    constructor(s, t){
        this.logger = s, this.core = t;
    }
}
class v extends (0, _eventsDefault.default) {
    constructor(){
        super();
    }
}
class y {
    constructor(s){
        this.opts = s, this.protocol = "wc", this.version = 2;
    }
}
class b extends (0, _events1.EventEmitter) {
    constructor(){
        super();
    }
}
class C {
    constructor(s){
        this.client = s;
    }
}

},{"@walletconnect/events":"aO3HO","events":"1VQLm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6mDE9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "safeJsonParse", ()=>safeJsonParse);
parcelHelpers.export(exports, "safeJsonStringify", ()=>safeJsonStringify);
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1LVbO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _api = require("./api");
parcelHelpers.exportAll(_api, exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _utils = require("./utils");
parcelHelpers.exportAll(_utils, exports);

},{"./api":"jLFnA","./constants":"kR7dB","./types":"fH88W","./utils":"4sfmk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jLFnA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateKeyPair", ()=>generateKeyPair);
parcelHelpers.export(exports, "signJWT", ()=>signJWT);
parcelHelpers.export(exports, "verifyJWT", ()=>verifyJWT);
var _ed25519 = require("@stablelib/ed25519");
var _random = require("@stablelib/random");
var _time = require("@walletconnect/time");
var _constants = require("./constants");
var _utils = require("./utils");
function generateKeyPair(seed = (0, _random.randomBytes)((0, _constants.KEY_PAIR_SEED_LENGTH))) {
    return _ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = (0, _time.fromMiliseconds)(Date.now())) {
    const header = {
        alg: (0, _constants.JWT_IRIDIUM_ALG),
        typ: (0, _constants.JWT_IRIDIUM_TYP)
    };
    const iss = (0, _utils.encodeIss)(keyPair.publicKey);
    const exp = iat + ttl;
    const payload = {
        iss,
        sub,
        aud,
        iat,
        exp
    };
    const data = (0, _utils.encodeData)({
        header,
        payload
    });
    const signature = _ed25519.sign(keyPair.secretKey, data);
    return (0, _utils.encodeJWT)({
        header,
        payload,
        signature
    });
}
async function verifyJWT(jwt) {
    const { header , payload , data , signature  } = (0, _utils.decodeJWT)(jwt);
    if (header.alg !== (0, _constants.JWT_IRIDIUM_ALG) || header.typ !== (0, _constants.JWT_IRIDIUM_TYP)) throw new Error("JWT must use EdDSA algorithm");
    const publicKey = (0, _utils.decodeIss)(payload.iss);
    return _ed25519.verify(publicKey, data, signature);
}

},{"@stablelib/ed25519":"fFyvt","@stablelib/random":"9Qs60","@walletconnect/time":"2hzsP","./constants":"kR7dB","./utils":"4sfmk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fFyvt":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertSecretKeyToX25519 = exports.convertPublicKeyToX25519 = exports.verify = exports.sign = exports.extractPublicKeyFromSecretKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.SEED_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.SIGNATURE_LENGTH = void 0;
/**
 * Package ed25519 implements Ed25519 public-key signature algorithm.
 */ const random_1 = require("60533564474d1531");
const sha512_1 = require("2ec56faabdaf1e88");
const wipe_1 = require("1199dd87fbd21616");
exports.SIGNATURE_LENGTH = 64;
exports.PUBLIC_KEY_LENGTH = 32;
exports.SECRET_KEY_LENGTH = 64;
exports.SEED_LENGTH = 32;
// Returns new zero-filled 16-element GF (Float64Array).
// If passed an array of numbers, prefills the returned
// array with them.
//
// We use Float64Array, because we need 48-bit numbers
// for this implementation.
function gf(init) {
    const r = new Float64Array(16);
    if (init) for(let i = 0; i < init.length; i++)r[i] = init[i];
    return r;
}
// Base point.
const _9 = new Uint8Array(32);
_9[0] = 9;
const gf0 = gf();
const gf1 = gf([
    1
]);
const D = gf([
    0x78a3,
    0x1359,
    0x4dca,
    0x75eb,
    0xd8ab,
    0x4141,
    0x0a4d,
    0x0070,
    0xe898,
    0x7779,
    0x4079,
    0x8cc7,
    0xfe73,
    0x2b6f,
    0x6cee,
    0x5203
]);
const D2 = gf([
    0xf159,
    0x26b2,
    0x9b94,
    0xebd6,
    0xb156,
    0x8283,
    0x149a,
    0x00e0,
    0xd130,
    0xeef3,
    0x80f2,
    0x198e,
    0xfce7,
    0x56df,
    0xd9dc,
    0x2406
]);
const X = gf([
    0xd51a,
    0x8f25,
    0x2d60,
    0xc956,
    0xa7b2,
    0x9525,
    0xc760,
    0x692c,
    0xdc5c,
    0xfdd6,
    0xe231,
    0xc0a4,
    0x53fe,
    0xcd6e,
    0x36d3,
    0x2169
]);
const Y = gf([
    0x6658,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666,
    0x6666
]);
const I = gf([
    0xa0b0,
    0x4a0e,
    0x1b27,
    0xc4ee,
    0xe478,
    0xad2f,
    0x1806,
    0x2f43,
    0xd7a7,
    0x3dfb,
    0x0099,
    0x2b4d,
    0xdf0b,
    0x4fc1,
    0x2480,
    0x2b83
]);
function set25519(r, a) {
    for(let i = 0; i < 16; i++)r[i] = a[i] | 0;
}
function car25519(o) {
    let c = 1;
    for(let i = 0; i < 16; i++){
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
}
function sel25519(p, q, b) {
    const c = ~(b - 1);
    for(let i = 0; i < 16; i++){
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
    }
}
function pack25519(o, n) {
    const m = gf();
    const t = gf();
    for(let i = 0; i < 16; i++)t[i] = n[i];
    car25519(t);
    car25519(t);
    car25519(t);
    for(let j = 0; j < 2; j++){
        m[0] = t[0] - 0xffed;
        for(let i = 1; i < 15; i++){
            m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 0xffff;
        }
        m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 0xffff;
        sel25519(t, m, 1 - b);
    }
    for(let i = 0; i < 16; i++){
        o[2 * i] = t[i] & 0xff;
        o[2 * i + 1] = t[i] >> 8;
    }
}
function verify32(x, y) {
    let d = 0;
    for(let i = 0; i < 32; i++)d |= x[i] ^ y[i];
    return (1 & d - 1 >>> 8) - 1;
}
function neq25519(a, b) {
    const c = new Uint8Array(32);
    const d = new Uint8Array(32);
    pack25519(c, a);
    pack25519(d, b);
    return verify32(c, d);
}
function par25519(a) {
    const d = new Uint8Array(32);
    pack25519(d, a);
    return d[0] & 1;
}
function unpack25519(o, n) {
    for(let i = 0; i < 16; i++)o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    o[15] &= 0x7fff;
}
function add(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] + b[i];
}
function sub(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] - b[i];
}
function mul(o, a, b) {
    let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    // t15 left as is
    // first car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    // second car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
}
function square(o, a) {
    mul(o, a, a);
}
function inv25519(o, i) {
    const c = gf();
    let a;
    for(a = 0; a < 16; a++)c[a] = i[a];
    for(a = 253; a >= 0; a--){
        square(c, c);
        if (a !== 2 && a !== 4) mul(c, c, i);
    }
    for(a = 0; a < 16; a++)o[a] = c[a];
}
function pow2523(o, i) {
    const c = gf();
    let a;
    for(a = 0; a < 16; a++)c[a] = i[a];
    for(a = 250; a >= 0; a--){
        square(c, c);
        if (a !== 1) mul(c, c, i);
    }
    for(a = 0; a < 16; a++)o[a] = c[a];
}
function edadd(p, q) {
    const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
    sub(a, p[1], p[0]);
    sub(t, q[1], q[0]);
    mul(a, a, t);
    add(b, p[0], p[1]);
    add(t, q[0], q[1]);
    mul(b, b, t);
    mul(c, p[3], q[3]);
    mul(c, c, D2);
    mul(d, p[2], q[2]);
    add(d, d, d);
    sub(e, b, a);
    sub(f, d, c);
    add(g, d, c);
    add(h, b, a);
    mul(p[0], e, f);
    mul(p[1], h, g);
    mul(p[2], g, f);
    mul(p[3], e, h);
}
function cswap(p, q, b) {
    for(let i = 0; i < 4; i++)sel25519(p[i], q[i], b);
}
function pack(r, p) {
    const tx = gf(), ty = gf(), zi = gf();
    inv25519(zi, p[2]);
    mul(tx, p[0], zi);
    mul(ty, p[1], zi);
    pack25519(r, ty);
    r[31] ^= par25519(tx) << 7;
}
function scalarmult(p, q, s) {
    set25519(p[0], gf0);
    set25519(p[1], gf1);
    set25519(p[2], gf1);
    set25519(p[3], gf0);
    for(let i = 255; i >= 0; --i){
        const b = s[i / 8 | 0] >> (i & 7) & 1;
        cswap(p, q, b);
        edadd(q, p);
        edadd(p, p);
        cswap(p, q, b);
    }
}
function scalarbase(p, s) {
    const q = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    set25519(q[0], X);
    set25519(q[1], Y);
    set25519(q[2], gf1);
    mul(q[3], X, Y);
    scalarmult(p, q, s);
}
// Generates key pair from secret 32-byte seed.
function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SEED_LENGTH) throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
    const d = (0, sha512_1.hash)(seed);
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    const publicKey = new Uint8Array(32);
    const p = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    scalarbase(p, d);
    pack(publicKey, p);
    const secretKey = new Uint8Array(64);
    secretKey.set(seed);
    secretKey.set(publicKey, 32);
    return {
        publicKey,
        secretKey
    };
}
exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
function generateKeyPair(prng) {
    const seed = (0, random_1.randomBytes)(32, prng);
    const result = generateKeyPairFromSeed(seed);
    (0, wipe_1.wipe)(seed);
    return result;
}
exports.generateKeyPair = generateKeyPair;
function extractPublicKeyFromSecretKey(secretKey) {
    if (secretKey.length !== exports.SECRET_KEY_LENGTH) throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
    return new Uint8Array(secretKey.subarray(32));
}
exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
const L = new Float64Array([
    0xed,
    0xd3,
    0xf5,
    0x5c,
    0x1a,
    0x63,
    0x12,
    0x58,
    0xd6,
    0x9c,
    0xf7,
    0xa2,
    0xde,
    0xf9,
    0xde,
    0x14,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0x10
]);
function modL(r, x) {
    let carry;
    let i;
    let j;
    let k;
    for(i = 63; i >= 32; --i){
        carry = 0;
        for(j = i - 32, k = i - 12; j < k; ++j){
            x[j] += carry - 16 * x[i] * L[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
        }
        x[j] += carry;
        x[i] = 0;
    }
    carry = 0;
    for(j = 0; j < 32; j++){
        x[j] += carry - (x[31] >> 4) * L[j];
        carry = x[j] >> 8;
        x[j] &= 255;
    }
    for(j = 0; j < 32; j++)x[j] -= carry * L[j];
    for(i = 0; i < 32; i++){
        x[i + 1] += x[i] >> 8;
        r[i] = x[i] & 255;
    }
}
function reduce(r) {
    const x = new Float64Array(64);
    for(let i = 0; i < 64; i++)x[i] = r[i];
    for(let i = 0; i < 64; i++)r[i] = 0;
    modL(r, x);
}
// Returns 64-byte signature of the message under the 64-byte secret key.
function sign(secretKey, message) {
    const x = new Float64Array(64);
    const p = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    const d = (0, sha512_1.hash)(secretKey.subarray(0, 32));
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    const signature = new Uint8Array(64);
    signature.set(d.subarray(32), 32);
    const hs = new sha512_1.SHA512();
    hs.update(signature.subarray(32));
    hs.update(message);
    const r = hs.digest();
    hs.clean();
    reduce(r);
    scalarbase(p, r);
    pack(signature, p);
    hs.reset();
    hs.update(signature.subarray(0, 32));
    hs.update(secretKey.subarray(32));
    hs.update(message);
    const h = hs.digest();
    reduce(h);
    for(let i = 0; i < 32; i++)x[i] = r[i];
    for(let i = 0; i < 32; i++)for(let j = 0; j < 32; j++)x[i + j] += h[i] * d[j];
    modL(signature.subarray(32), x);
    return signature;
}
exports.sign = sign;
function unpackneg(r, p) {
    const t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
    set25519(r[2], gf1);
    unpack25519(r[1], p);
    square(num, r[1]);
    mul(den, num, D);
    sub(num, num, r[2]);
    add(den, r[2], den);
    square(den2, den);
    square(den4, den2);
    mul(den6, den4, den2);
    mul(t, den6, num);
    mul(t, t, den);
    pow2523(t, t);
    mul(t, t, num);
    mul(t, t, den);
    mul(t, t, den);
    mul(r[0], t, den);
    square(chk, r[0]);
    mul(chk, chk, den);
    if (neq25519(chk, num)) mul(r[0], r[0], I);
    square(chk, r[0]);
    mul(chk, chk, den);
    if (neq25519(chk, num)) return -1;
    if (par25519(r[0]) === p[31] >> 7) sub(r[0], gf0, r[0]);
    mul(r[3], r[0], r[1]);
    return 0;
}
function verify(publicKey, message, signature) {
    const t = new Uint8Array(32);
    const p = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    const q = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    if (signature.length !== exports.SIGNATURE_LENGTH) throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
    if (unpackneg(q, publicKey)) return false;
    const hs = new sha512_1.SHA512();
    hs.update(signature.subarray(0, 32));
    hs.update(publicKey);
    hs.update(message);
    const h = hs.digest();
    reduce(h);
    scalarmult(p, q, h);
    scalarbase(q, signature.subarray(32));
    edadd(p, q);
    pack(t, p);
    if (verify32(signature, t)) return false;
    return true;
}
exports.verify = verify;
/**
 * Convert Ed25519 public key to X25519 public key.
 *
 * Throws if given an invalid public key.
 */ function convertPublicKeyToX25519(publicKey) {
    let q = [
        gf(),
        gf(),
        gf(),
        gf()
    ];
    if (unpackneg(q, publicKey)) throw new Error("Ed25519: invalid public key");
    // Formula: montgomeryX = (edwardsY + 1)*inverse(1 - edwardsY) mod p
    let a = gf();
    let b = gf();
    let y = q[1];
    add(a, gf1, y);
    sub(b, gf1, y);
    inv25519(b, b);
    mul(a, a, b);
    let z = new Uint8Array(32);
    pack25519(z, a);
    return z;
}
exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
/**
 *  Convert Ed25519 secret (private) key to X25519 secret key.
 */ function convertSecretKeyToX25519(secretKey) {
    const d = (0, sha512_1.hash)(secretKey.subarray(0, 32));
    d[0] &= 248;
    d[31] &= 127;
    d[31] |= 64;
    const o = new Uint8Array(d.subarray(0, 32));
    (0, wipe_1.wipe)(d);
    return o;
}
exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;

},{"60533564474d1531":"9Qs60","2ec56faabdaf1e88":"2a9Qp","1199dd87fbd21616":"8owN2"}],"9Qs60":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
const system_1 = require("789a2c982ec87611");
const binary_1 = require("f1a37a9372107a07");
const wipe_1 = require("885c98994b46c4eb");
exports.defaultRandomSource = new system_1.SystemRandomSource();
function randomBytes(length, prng = exports.defaultRandomSource) {
    return prng.randomBytes(length);
}
exports.randomBytes = randomBytes;
/**
 * Returns a uniformly random unsigned 32-bit integer.
 */ function randomUint32(prng = exports.defaultRandomSource) {
    // Generate 4-byte random buffer.
    const buf = randomBytes(4, prng);
    // Convert bytes from buffer into a 32-bit integer.
    // It's not important which byte order to use, since
    // the result is random.
    const result = (0, binary_1.readUint32LE)(buf);
    // Clean the buffer.
    (0, wipe_1.wipe)(buf);
    return result;
}
exports.randomUint32 = randomUint32;
/** 62 alphanumeric characters for default charset of randomString() */ const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
/**
 * Returns a uniform random string of the given length
 * with characters from the given charset.
 *
 * Charset must not have more than 256 characters.
 *
 * Default charset generates case-sensitive alphanumeric
 * strings (0-9, A-Z, a-z).
 */ function randomString(length, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
    if (charset.length < 2) throw new Error("randomString charset is too short");
    if (charset.length > 256) throw new Error("randomString charset is too long");
    let out = "";
    const charsLen = charset.length;
    const maxByte = 256 - 256 % charsLen;
    while(length > 0){
        const buf = randomBytes(Math.ceil(length * 256 / maxByte), prng);
        for(let i = 0; i < buf.length && length > 0; i++){
            const randomByte = buf[i];
            if (randomByte < maxByte) {
                out += charset.charAt(randomByte % charsLen);
                length--;
            }
        }
        (0, wipe_1.wipe)(buf);
    }
    return out;
}
exports.randomString = randomString;
/**
 * Returns uniform random string containing at least the given
 * number of bits of entropy.
 *
 * For example, randomStringForEntropy(128) will return a 22-character
 * alphanumeric string, while randomStringForEntropy(128, "0123456789")
 * will return a 39-character numeric string, both will contain at
 * least 128 bits of entropy.
 *
 * Default charset generates case-sensitive alphanumeric
 * strings (0-9, A-Z, a-z).
 */ function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
    const length = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
    return randomString(length, charset, prng);
}
exports.randomStringForEntropy = randomStringForEntropy;

},{"789a2c982ec87611":"1mwaP","f1a37a9372107a07":"92RWm","885c98994b46c4eb":"8owN2"}],"1mwaP":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SystemRandomSource = void 0;
const browser_1 = require("2d10dfbb84cd79a8");
const node_1 = require("496cedd98641958");
class SystemRandomSource {
    constructor(){
        this.isAvailable = false;
        this.name = "";
        // Try browser.
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
            this.isAvailable = true;
            this.name = "Browser";
            return;
        }
        // If no browser source, try Node.
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
            this.isAvailable = true;
            this.name = "Node";
            return;
        }
    // No sources, we're out of options.
    }
    randomBytes(length) {
        if (!this.isAvailable) throw new Error("System random byte generator is not available.");
        return this._source.randomBytes(length);
    }
}
exports.SystemRandomSource = SystemRandomSource;

},{"2d10dfbb84cd79a8":"1HoUi","496cedd98641958":"5rdHt"}],"1HoUi":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrowserRandomSource = void 0;
const QUOTA = 65536;
class BrowserRandomSource {
    constructor(){
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto // IE11 has msCrypto
         : null;
        if (browserCrypto && browserCrypto.getRandomValues !== undefined) {
            this._crypto = browserCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
        }
    }
    randomBytes(length) {
        if (!this.isAvailable || !this._crypto) throw new Error("Browser random byte generator is not available.");
        const out = new Uint8Array(length);
        for(let i = 0; i < out.length; i += QUOTA)this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
        return out;
    }
}
exports.BrowserRandomSource = BrowserRandomSource;

},{}],"5rdHt":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeRandomSource = void 0;
const wipe_1 = require("11ed9cf922b007b2");
class NodeRandomSource {
    constructor(){
        this.isAvailable = false;
        this.isInstantiated = false;
        {
            const nodeCrypto = require("926538f9051646af");
            if (nodeCrypto && nodeCrypto.randomBytes) {
                this._crypto = nodeCrypto;
                this.isAvailable = true;
                this.isInstantiated = true;
            }
        }
    }
    randomBytes(length) {
        if (!this.isAvailable || !this._crypto) throw new Error("Node.js random byte generator is not available.");
        // Get random bytes (result is Buffer).
        let buffer = this._crypto.randomBytes(length);
        // Make sure we got the length that we requested.
        if (buffer.length !== length) throw new Error("NodeRandomSource: got fewer bytes than requested");
        // Allocate output array.
        const out = new Uint8Array(length);
        // Copy bytes from buffer to output.
        for(let i = 0; i < out.length; i++)out[i] = buffer[i];
        // Cleanup.
        (0, wipe_1.wipe)(buffer);
        return out;
    }
}
exports.NodeRandomSource = NodeRandomSource;

},{"11ed9cf922b007b2":"8owN2","926538f9051646af":"jhUEF"}],"8owN2":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Sets all values in the given array to zero and returns it.
 *
 * The fact that it sets bytes to zero can be relied on.
 *
 * There is no guarantee that this function makes data disappear from memory,
 * as runtime implementation can, for example, have copying garbage collector
 * that will make copies of sensitive data before we wipe it. Or that an
 * operating system will write our data to swap or sleep image. Another thing
 * is that an optimizing compiler can remove calls to this function or make it
 * no-op. There's nothing we can do with it, so we just do our best and hope
 * that everything will be okay and good will triumph over evil.
 */ function wipe(array) {
    // Right now it's similar to array.fill(0). If it turns
    // out that runtimes optimize this call away, maybe
    // we can try something else.
    for(var i = 0; i < array.length; i++)array[i] = 0;
    return array;
}
exports.wipe = wipe;

},{}],"92RWm":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package binary provides functions for encoding and decoding numbers in byte arrays.
 */ var int_1 = require("7a1c952132cdeeda");
// TODO(dchest): add asserts for correct value ranges and array offsets.
/**
 * Reads 2 bytes from array starting at offset as big-endian
 * signed 16-bit integer and returns it.
 */ function readInt16BE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
}
exports.readInt16BE = readInt16BE;
/**
 * Reads 2 bytes from array starting at offset as big-endian
 * unsigned 16-bit integer and returns it.
 */ function readUint16BE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
}
exports.readUint16BE = readUint16BE;
/**
 * Reads 2 bytes from array starting at offset as little-endian
 * signed 16-bit integer and returns it.
 */ function readInt16LE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
}
exports.readInt16LE = readInt16LE;
/**
 * Reads 2 bytes from array starting at offset as little-endian
 * unsigned 16-bit integer and returns it.
 */ function readUint16LE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 1] << 8 | array[offset]) >>> 0;
}
exports.readUint16LE = readUint16LE;
/**
 * Writes 2-byte big-endian representation of 16-bit unsigned
 * value to byte array starting at offset.
 *
 * If byte array is not given, creates a new 2-byte one.
 *
 * Returns the output byte array.
 */ function writeUint16BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(2);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 8;
    out[offset + 1] = value >>> 0;
    return out;
}
exports.writeUint16BE = writeUint16BE;
exports.writeInt16BE = writeUint16BE;
/**
 * Writes 2-byte little-endian representation of 16-bit unsigned
 * value to array starting at offset.
 *
 * If byte array is not given, creates a new 2-byte one.
 *
 * Returns the output byte array.
 */ function writeUint16LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(2);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    return out;
}
exports.writeUint16LE = writeUint16LE;
exports.writeInt16LE = writeUint16LE;
/**
 * Reads 4 bytes from array starting at offset as big-endian
 * signed 32-bit integer and returns it.
 */ function readInt32BE(array, offset) {
    if (offset === void 0) offset = 0;
    return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
}
exports.readInt32BE = readInt32BE;
/**
 * Reads 4 bytes from array starting at offset as big-endian
 * unsigned 32-bit integer and returns it.
 */ function readUint32BE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
}
exports.readUint32BE = readUint32BE;
/**
 * Reads 4 bytes from array starting at offset as little-endian
 * signed 32-bit integer and returns it.
 */ function readInt32LE(array, offset) {
    if (offset === void 0) offset = 0;
    return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
}
exports.readInt32LE = readInt32LE;
/**
 * Reads 4 bytes from array starting at offset as little-endian
 * unsigned 32-bit integer and returns it.
 */ function readUint32LE(array, offset) {
    if (offset === void 0) offset = 0;
    return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
}
exports.readUint32LE = readUint32LE;
/**
 * Writes 4-byte big-endian representation of 32-bit unsigned
 * value to byte array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeUint32BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 24;
    out[offset + 1] = value >>> 16;
    out[offset + 2] = value >>> 8;
    out[offset + 3] = value >>> 0;
    return out;
}
exports.writeUint32BE = writeUint32BE;
exports.writeInt32BE = writeUint32BE;
/**
 * Writes 4-byte little-endian representation of 32-bit unsigned
 * value to array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeUint32LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    out[offset + 2] = value >>> 16;
    out[offset + 3] = value >>> 24;
    return out;
}
exports.writeUint32LE = writeUint32LE;
exports.writeInt32LE = writeUint32LE;
/**
 * Reads 8 bytes from array starting at offset as big-endian
 * signed 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports exact
 * numbers in range -9007199254740991 to 9007199254740991.
 * If the number stored in the byte array is outside this range,
 * the result is not exact.
 */ function readInt64BE(array, offset) {
    if (offset === void 0) offset = 0;
    var hi = readInt32BE(array, offset);
    var lo = readInt32BE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
}
exports.readInt64BE = readInt64BE;
/**
 * Reads 8 bytes from array starting at offset as big-endian
 * unsigned 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports values up to 2^53-1.
 */ function readUint64BE(array, offset) {
    if (offset === void 0) offset = 0;
    var hi = readUint32BE(array, offset);
    var lo = readUint32BE(array, offset + 4);
    return hi * 0x100000000 + lo;
}
exports.readUint64BE = readUint64BE;
/**
 * Reads 8 bytes from array starting at offset as little-endian
 * signed 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports exact
 * numbers in range -9007199254740991 to 9007199254740991.
 * If the number stored in the byte array is outside this range,
 * the result is not exact.
 */ function readInt64LE(array, offset) {
    if (offset === void 0) offset = 0;
    var lo = readInt32LE(array, offset);
    var hi = readInt32LE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
}
exports.readInt64LE = readInt64LE;
/**
 * Reads 8 bytes from array starting at offset as little-endian
 * unsigned 64-bit integer and returns it.
 *
 * IMPORTANT: due to JavaScript limitation, supports values up to 2^53-1.
 */ function readUint64LE(array, offset) {
    if (offset === void 0) offset = 0;
    var lo = readUint32LE(array, offset);
    var hi = readUint32LE(array, offset + 4);
    return hi * 0x100000000 + lo;
}
exports.readUint64LE = readUint64LE;
/**
 * Writes 8-byte big-endian representation of 64-bit unsigned
 * value to byte array starting at offset.
 *
 * Due to JavaScript limitation, supports values up to 2^53-1.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeUint64BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    writeUint32BE(value / 0x100000000 >>> 0, out, offset);
    writeUint32BE(value >>> 0, out, offset + 4);
    return out;
}
exports.writeUint64BE = writeUint64BE;
exports.writeInt64BE = writeUint64BE;
/**
 * Writes 8-byte little-endian representation of 64-bit unsigned
 * value to byte array starting at offset.
 *
 * Due to JavaScript limitation, supports values up to 2^53-1.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeUint64LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    writeUint32LE(value >>> 0, out, offset);
    writeUint32LE(value / 0x100000000 >>> 0, out, offset + 4);
    return out;
}
exports.writeUint64LE = writeUint64LE;
exports.writeInt64LE = writeUint64LE;
/**
 * Reads bytes from array starting at offset as big-endian
 * unsigned bitLen-bit integer and returns it.
 *
 * Supports bit lengths divisible by 8, up to 48.
 */ function readUintBE(bitLength, array, offset) {
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("readUintBE supports only bitLengths divisible by 8");
    if (bitLength / 8 > array.length - offset) throw new Error("readUintBE: array is too short for the given bitLength");
    var result = 0;
    var mul = 1;
    for(var i = bitLength / 8 + offset - 1; i >= offset; i--){
        result += array[i] * mul;
        mul *= 256;
    }
    return result;
}
exports.readUintBE = readUintBE;
/**
 * Reads bytes from array starting at offset as little-endian
 * unsigned bitLen-bit integer and returns it.
 *
 * Supports bit lengths divisible by 8, up to 48.
 */ function readUintLE(bitLength, array, offset) {
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("readUintLE supports only bitLengths divisible by 8");
    if (bitLength / 8 > array.length - offset) throw new Error("readUintLE: array is too short for the given bitLength");
    var result = 0;
    var mul = 1;
    for(var i = offset; i < offset + bitLength / 8; i++){
        result += array[i] * mul;
        mul *= 256;
    }
    return result;
}
exports.readUintLE = readUintLE;
/**
 * Writes a big-endian representation of bitLen-bit unsigned
 * value to array starting at offset.
 *
 * Supports bit lengths divisible by 8, up to 48.
 *
 * If byte array is not given, creates a new one.
 *
 * Returns the output byte array.
 */ function writeUintBE(bitLength, value, out, offset) {
    if (out === void 0) out = new Uint8Array(bitLength / 8);
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("writeUintBE supports only bitLengths divisible by 8");
    if (!int_1.isSafeInteger(value)) throw new Error("writeUintBE value must be an integer");
    var div = 1;
    for(var i = bitLength / 8 + offset - 1; i >= offset; i--){
        out[i] = value / div & 0xff;
        div *= 256;
    }
    return out;
}
exports.writeUintBE = writeUintBE;
/**
 * Writes a little-endian representation of bitLen-bit unsigned
 * value to array starting at offset.
 *
 * Supports bit lengths divisible by 8, up to 48.
 *
 * If byte array is not given, creates a new one.
 *
 * Returns the output byte array.
 */ function writeUintLE(bitLength, value, out, offset) {
    if (out === void 0) out = new Uint8Array(bitLength / 8);
    if (offset === void 0) offset = 0;
    // TODO(dchest): implement support for bitLengths non-divisible by 8
    if (bitLength % 8 !== 0) throw new Error("writeUintLE supports only bitLengths divisible by 8");
    if (!int_1.isSafeInteger(value)) throw new Error("writeUintLE value must be an integer");
    var div = 1;
    for(var i = offset; i < offset + bitLength / 8; i++){
        out[i] = value / div & 0xff;
        div *= 256;
    }
    return out;
}
exports.writeUintLE = writeUintLE;
/**
 * Reads 4 bytes from array starting at offset as big-endian
 * 32-bit floating-point number and returns it.
 */ function readFloat32BE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset);
}
exports.readFloat32BE = readFloat32BE;
/**
 * Reads 4 bytes from array starting at offset as little-endian
 * 32-bit floating-point number and returns it.
 */ function readFloat32LE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset, true);
}
exports.readFloat32LE = readFloat32LE;
/**
 * Reads 8 bytes from array starting at offset as big-endian
 * 64-bit floating-point number ("double") and returns it.
 */ function readFloat64BE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset);
}
exports.readFloat64BE = readFloat64BE;
/**
 * Reads 8 bytes from array starting at offset as little-endian
 * 64-bit floating-point number ("double") and returns it.
 */ function readFloat64LE(array, offset) {
    if (offset === void 0) offset = 0;
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset, true);
}
exports.readFloat64LE = readFloat64LE;
/**
 * Writes 4-byte big-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat32BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value);
    return out;
}
exports.writeFloat32BE = writeFloat32BE;
/**
 * Writes 4-byte little-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 4-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat32LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(4);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value, true);
    return out;
}
exports.writeFloat32LE = writeFloat32LE;
/**
 * Writes 8-byte big-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat64BE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value);
    return out;
}
exports.writeFloat64BE = writeFloat64BE;
/**
 * Writes 8-byte little-endian floating-point representation of value
 * to byte array starting at offset.
 *
 * If byte array is not given, creates a new 8-byte one.
 *
 * Returns the output byte array.
 */ function writeFloat64LE(value, out, offset) {
    if (out === void 0) out = new Uint8Array(8);
    if (offset === void 0) offset = 0;
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value, true);
    return out;
}
exports.writeFloat64LE = writeFloat64LE;

},{"7a1c952132cdeeda":"dkrY2"}],"dkrY2":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package int provides helper functions for integerss.
 */ // Shim using 16-bit pieces.
function imulShim(a, b) {
    var ah = a >>> 16 & 0xffff, al = a & 0xffff;
    var bh = b >>> 16 & 0xffff, bl = b & 0xffff;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
}
/** 32-bit integer multiplication.  */ // Use system Math.imul if available, otherwise use our shim.
exports.mul = Math.imul || imulShim;
/** 32-bit integer addition.  */ function add(a, b) {
    return a + b | 0;
}
exports.add = add;
/**  32-bit integer subtraction.  */ function sub(a, b) {
    return a - b | 0;
}
exports.sub = sub;
/** 32-bit integer left rotation */ function rotl(x, n) {
    return x << n | x >>> 32 - n;
}
exports.rotl = rotl;
/** 32-bit integer left rotation */ function rotr(x, n) {
    return x << 32 - n | x >>> n;
}
exports.rotr = rotr;
function isIntegerShim(n) {
    return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
}
/**
 * Returns true if the argument is an integer number.
 *
 * In ES2015, Number.isInteger.
 */ exports.isInteger = Number.isInteger || isIntegerShim;
/**
 *  Math.pow(2, 53) - 1
 *
 *  In ES2015 Number.MAX_SAFE_INTEGER.
 */ exports.MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Returns true if the argument is a safe integer number
 * (-MIN_SAFE_INTEGER < number <= MAX_SAFE_INTEGER)
 *
 * In ES2015, Number.isSafeInteger.
 */ exports.isSafeInteger = function(n) {
    return exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER;
};

},{}],"2a9Qp":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var binary_1 = require("f10d9b9d2c4004d1");
var wipe_1 = require("56242ad9d25eaef0");
exports.DIGEST_LENGTH = 64;
exports.BLOCK_SIZE = 128;
/**
 * SHA-2-512 cryptographic hash algorithm.
 */ var SHA512 = /** @class */ function() {
    function SHA512() {
        /** Length of hash output */ this.digestLength = exports.DIGEST_LENGTH;
        /** Block size */ this.blockSize = exports.BLOCK_SIZE;
        // Note: Int32Array is used instead of Uint32Array for performance reasons.
        this._stateHi = new Int32Array(8); // hash state, high bytes
        this._stateLo = new Int32Array(8); // hash state, low bytes
        this._tempHi = new Int32Array(16); // temporary state, high bytes
        this._tempLo = new Int32Array(16); // temporary state, low bytes
        this._buffer = new Uint8Array(256); // buffer for data to hash
        this._bufferLength = 0; // number of bytes in buffer
        this._bytesHashed = 0; // number of total bytes hashed
        this._finished = false; // indicates whether the hash was finalized
        this.reset();
    }
    SHA512.prototype._initState = function() {
        this._stateHi[0] = 0x6a09e667;
        this._stateHi[1] = 0xbb67ae85;
        this._stateHi[2] = 0x3c6ef372;
        this._stateHi[3] = 0xa54ff53a;
        this._stateHi[4] = 0x510e527f;
        this._stateHi[5] = 0x9b05688c;
        this._stateHi[6] = 0x1f83d9ab;
        this._stateHi[7] = 0x5be0cd19;
        this._stateLo[0] = 0xf3bcc908;
        this._stateLo[1] = 0x84caa73b;
        this._stateLo[2] = 0xfe94f82b;
        this._stateLo[3] = 0x5f1d36f1;
        this._stateLo[4] = 0xade682d1;
        this._stateLo[5] = 0x2b3e6c1f;
        this._stateLo[6] = 0xfb41bd6b;
        this._stateLo[7] = 0x137e2179;
    };
    /**
     * Resets hash state making it possible
     * to re-use this instance to hash other data.
     */ SHA512.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
    };
    /**
     * Cleans internal buffers and resets hash state.
     */ SHA512.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._tempHi);
        wipe_1.wipe(this._tempLo);
        this.reset();
    };
    /**
     * Updates hash state with the given data.
     *
     * Throws error when trying to update already finalized hash:
     * instance must be reset to update it again.
     */ SHA512.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) dataLength = data.length;
        if (this._finished) throw new Error("SHA512: can't update because hash was finished.");
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
            while(this._bufferLength < exports.BLOCK_SIZE && dataLength > 0){
                this._buffer[this._bufferLength++] = data[dataPos++];
                dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
                hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
                this._bufferLength = 0;
            }
        }
        if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
            dataLength %= this.blockSize;
        }
        while(dataLength > 0){
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
        }
        return this;
    };
    /**
     * Finalizes hash state and puts hash into out.
     * If hash was already finalized, puts the same value.
     */ SHA512.prototype.finish = function(out) {
        if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 0x20000000 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 128 < 112 ? 128 : 256;
            this._buffer[left] = 0x80;
            for(var i = left + 1; i < padLength - 8; i++)this._buffer[i] = 0;
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
            this._finished = true;
        }
        for(var i = 0; i < this.digestLength / 8; i++){
            binary_1.writeUint32BE(this._stateHi[i], out, i * 8);
            binary_1.writeUint32BE(this._stateLo[i], out, i * 8 + 4);
        }
        return this;
    };
    /**
     * Returns the final hash digest.
     */ SHA512.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization. Returns hash state to be
     * used with restoreState(). Only chain value is saved, not buffers or
     * other state variables.
     */ SHA512.prototype.saveState = function() {
        if (this._finished) throw new Error("SHA256: cannot save finished state");
        return {
            stateHi: new Int32Array(this._stateHi),
            stateLo: new Int32Array(this._stateLo),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
        };
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization. Restores state saved by
     * saveState() and sets bytesHashed to the given value.
     */ SHA512.prototype.restoreState = function(savedState) {
        this._stateHi.set(savedState.stateHi);
        this._stateLo.set(savedState.stateLo);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) this._buffer.set(savedState.buffer);
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
    };
    /**
     * Cleans state returned by saveState().
     */ SHA512.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.stateHi);
        wipe_1.wipe(savedState.stateLo);
        if (savedState.buffer) wipe_1.wipe(savedState.buffer);
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
    };
    return SHA512;
}();
exports.SHA512 = SHA512;
// Constants
var K = new Int32Array([
    0x428a2f98,
    0xd728ae22,
    0x71374491,
    0x23ef65cd,
    0xb5c0fbcf,
    0xec4d3b2f,
    0xe9b5dba5,
    0x8189dbbc,
    0x3956c25b,
    0xf348b538,
    0x59f111f1,
    0xb605d019,
    0x923f82a4,
    0xaf194f9b,
    0xab1c5ed5,
    0xda6d8118,
    0xd807aa98,
    0xa3030242,
    0x12835b01,
    0x45706fbe,
    0x243185be,
    0x4ee4b28c,
    0x550c7dc3,
    0xd5ffb4e2,
    0x72be5d74,
    0xf27b896f,
    0x80deb1fe,
    0x3b1696b1,
    0x9bdc06a7,
    0x25c71235,
    0xc19bf174,
    0xcf692694,
    0xe49b69c1,
    0x9ef14ad2,
    0xefbe4786,
    0x384f25e3,
    0x0fc19dc6,
    0x8b8cd5b5,
    0x240ca1cc,
    0x77ac9c65,
    0x2de92c6f,
    0x592b0275,
    0x4a7484aa,
    0x6ea6e483,
    0x5cb0a9dc,
    0xbd41fbd4,
    0x76f988da,
    0x831153b5,
    0x983e5152,
    0xee66dfab,
    0xa831c66d,
    0x2db43210,
    0xb00327c8,
    0x98fb213f,
    0xbf597fc7,
    0xbeef0ee4,
    0xc6e00bf3,
    0x3da88fc2,
    0xd5a79147,
    0x930aa725,
    0x06ca6351,
    0xe003826f,
    0x14292967,
    0x0a0e6e70,
    0x27b70a85,
    0x46d22ffc,
    0x2e1b2138,
    0x5c26c926,
    0x4d2c6dfc,
    0x5ac42aed,
    0x53380d13,
    0x9d95b3df,
    0x650a7354,
    0x8baf63de,
    0x766a0abb,
    0x3c77b2a8,
    0x81c2c92e,
    0x47edaee6,
    0x92722c85,
    0x1482353b,
    0xa2bfe8a1,
    0x4cf10364,
    0xa81a664b,
    0xbc423001,
    0xc24b8b70,
    0xd0f89791,
    0xc76c51a3,
    0x0654be30,
    0xd192e819,
    0xd6ef5218,
    0xd6990624,
    0x5565a910,
    0xf40e3585,
    0x5771202a,
    0x106aa070,
    0x32bbd1b8,
    0x19a4c116,
    0xb8d2d0c8,
    0x1e376c08,
    0x5141ab53,
    0x2748774c,
    0xdf8eeb99,
    0x34b0bcb5,
    0xe19b48a8,
    0x391c0cb3,
    0xc5c95a63,
    0x4ed8aa4a,
    0xe3418acb,
    0x5b9cca4f,
    0x7763e373,
    0x682e6ff3,
    0xd6b2b8a3,
    0x748f82ee,
    0x5defb2fc,
    0x78a5636f,
    0x43172f60,
    0x84c87814,
    0xa1f0ab72,
    0x8cc70208,
    0x1a6439ec,
    0x90befffa,
    0x23631e28,
    0xa4506ceb,
    0xde82bde9,
    0xbef9a3f7,
    0xb2c67915,
    0xc67178f2,
    0xe372532b,
    0xca273ece,
    0xea26619c,
    0xd186b8c7,
    0x21c0c207,
    0xeada7dd6,
    0xcde0eb1e,
    0xf57d4f7f,
    0xee6ed178,
    0x06f067aa,
    0x72176fba,
    0x0a637dc5,
    0xa2c898a6,
    0x113f9804,
    0xbef90dae,
    0x1b710b35,
    0x131c471b,
    0x28db77f5,
    0x23047d84,
    0x32caab7b,
    0x40c72493,
    0x3c9ebe0a,
    0x15c9bebc,
    0x431d67c4,
    0x9c100d4c,
    0x4cc5d4be,
    0xcb3e42b6,
    0x597f299c,
    0xfc657e2a,
    0x5fcb6fab,
    0x3ad6faec,
    0x6c44198c,
    0x4a475817
]);
function hashBlocks(wh, wl, hh, hl, m, pos, len) {
    var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
    var h, l;
    var th, tl;
    var a, b, c, d;
    while(len >= 128){
        for(var i = 0; i < 16; i++){
            var j = 8 * i + pos;
            wh[i] = binary_1.readUint32BE(m, j);
            wl[i] = binary_1.readUint32BE(m, j + 4);
        }
        for(var i = 0; i < 80; i++){
            var bh0 = ah0;
            var bh1 = ah1;
            var bh2 = ah2;
            var bh3 = ah3;
            var bh4 = ah4;
            var bh5 = ah5;
            var bh6 = ah6;
            var bh7 = ah7;
            var bl0 = al0;
            var bl1 = al1;
            var bl2 = al2;
            var bl3 = al3;
            var bl4 = al4;
            var bl5 = al5;
            var bl6 = al6;
            var bl7 = al7;
            // add
            h = ah7;
            l = al7;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            // Sigma1
            h = (ah4 >>> 14 | al4 << 18) ^ (ah4 >>> 18 | al4 << 14) ^ (al4 >>> 9 | ah4 << 23);
            l = (al4 >>> 14 | ah4 << 18) ^ (al4 >>> 18 | ah4 << 14) ^ (ah4 >>> 9 | al4 << 23);
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // Ch
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // K
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // w
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 0xffff | d << 16;
            tl = a & 0xffff | b << 16;
            // add
            h = th;
            l = tl;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            // Sigma0
            h = (ah0 >>> 28 | al0 << 4) ^ (al0 >>> 2 | ah0 << 30) ^ (al0 >>> 7 | ah0 << 25);
            l = (al0 >>> 28 | ah0 << 4) ^ (ah0 >>> 2 | al0 << 30) ^ (ah0 >>> 7 | al0 << 25);
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            // Maj
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 0xffff | d << 16;
            bl7 = a & 0xffff | b << 16;
            // add
            h = bh3;
            l = bl3;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 0xffff | d << 16;
            bl3 = a & 0xffff | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) for(var j = 0; j < 16; j++){
                // add
                h = wh[j];
                l = wl[j];
                a = l & 0xffff;
                b = l >>> 16;
                c = h & 0xffff;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;
                // sigma0
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 31) ^ (th >>> 8 | tl << 24) ^ th >>> 7;
                l = (tl >>> 1 | th << 31) ^ (tl >>> 8 | th << 24) ^ (tl >>> 7 | th << 25);
                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;
                // sigma1
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 13) ^ (tl >>> 29 | th << 3) ^ th >>> 6;
                l = (tl >>> 19 | th << 13) ^ (th >>> 29 | tl << 3) ^ (tl >>> 6 | th << 26);
                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 0xffff | d << 16;
                wl[j] = a & 0xffff | b << 16;
            }
        }
        // add
        h = ah0;
        l = al0;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[0];
        l = hl[0];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[0] = ah0 = c & 0xffff | d << 16;
        hl[0] = al0 = a & 0xffff | b << 16;
        h = ah1;
        l = al1;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[1];
        l = hl[1];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[1] = ah1 = c & 0xffff | d << 16;
        hl[1] = al1 = a & 0xffff | b << 16;
        h = ah2;
        l = al2;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[2];
        l = hl[2];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[2] = ah2 = c & 0xffff | d << 16;
        hl[2] = al2 = a & 0xffff | b << 16;
        h = ah3;
        l = al3;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[3];
        l = hl[3];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[3] = ah3 = c & 0xffff | d << 16;
        hl[3] = al3 = a & 0xffff | b << 16;
        h = ah4;
        l = al4;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[4];
        l = hl[4];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[4] = ah4 = c & 0xffff | d << 16;
        hl[4] = al4 = a & 0xffff | b << 16;
        h = ah5;
        l = al5;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[5];
        l = hl[5];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[5] = ah5 = c & 0xffff | d << 16;
        hl[5] = al5 = a & 0xffff | b << 16;
        h = ah6;
        l = al6;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[6];
        l = hl[6];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[6] = ah6 = c & 0xffff | d << 16;
        hl[6] = al6 = a & 0xffff | b << 16;
        h = ah7;
        l = al7;
        a = l & 0xffff;
        b = l >>> 16;
        c = h & 0xffff;
        d = h >>> 16;
        h = hh[7];
        l = hl[7];
        a += l & 0xffff;
        b += l >>> 16;
        c += h & 0xffff;
        d += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d += c >>> 16;
        hh[7] = ah7 = c & 0xffff | d << 16;
        hl[7] = al7 = a & 0xffff | b << 16;
        pos += 128;
        len -= 128;
    }
    return pos;
}
function hash(data) {
    var h = new SHA512();
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.hash = hash;

},{"f10d9b9d2c4004d1":"92RWm","56242ad9d25eaef0":"8owN2"}],"kR7dB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "JWT_IRIDIUM_ALG", ()=>JWT_IRIDIUM_ALG);
parcelHelpers.export(exports, "JWT_IRIDIUM_TYP", ()=>JWT_IRIDIUM_TYP);
parcelHelpers.export(exports, "JWT_DELIMITER", ()=>JWT_DELIMITER);
parcelHelpers.export(exports, "JWT_ENCODING", ()=>JWT_ENCODING);
parcelHelpers.export(exports, "JSON_ENCODING", ()=>JSON_ENCODING);
parcelHelpers.export(exports, "DATA_ENCODING", ()=>DATA_ENCODING);
parcelHelpers.export(exports, "DID_DELIMITER", ()=>DID_DELIMITER);
parcelHelpers.export(exports, "DID_PREFIX", ()=>DID_PREFIX);
parcelHelpers.export(exports, "DID_METHOD", ()=>DID_METHOD);
parcelHelpers.export(exports, "MULTICODEC_ED25519_ENCODING", ()=>MULTICODEC_ED25519_ENCODING);
parcelHelpers.export(exports, "MULTICODEC_ED25519_BASE", ()=>MULTICODEC_ED25519_BASE);
parcelHelpers.export(exports, "MULTICODEC_ED25519_HEADER", ()=>MULTICODEC_ED25519_HEADER);
parcelHelpers.export(exports, "MULTICODEC_ED25519_LENGTH", ()=>MULTICODEC_ED25519_LENGTH);
parcelHelpers.export(exports, "KEY_PAIR_SEED_LENGTH", ()=>KEY_PAIR_SEED_LENGTH);
const JWT_IRIDIUM_ALG = "EdDSA";
const JWT_IRIDIUM_TYP = "JWT";
const JWT_DELIMITER = ".";
const JWT_ENCODING = "base64url";
const JSON_ENCODING = "utf8";
const DATA_ENCODING = "utf8";
const DID_DELIMITER = ":";
const DID_PREFIX = "did";
const DID_METHOD = "key";
const MULTICODEC_ED25519_ENCODING = "base58btc";
const MULTICODEC_ED25519_BASE = "z";
const MULTICODEC_ED25519_HEADER = "K36";
const MULTICODEC_ED25519_LENGTH = 32;
const KEY_PAIR_SEED_LENGTH = 32;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4sfmk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "decodeJSON", ()=>decodeJSON);
parcelHelpers.export(exports, "encodeJSON", ()=>encodeJSON);
parcelHelpers.export(exports, "encodeIss", ()=>encodeIss);
parcelHelpers.export(exports, "decodeIss", ()=>decodeIss);
parcelHelpers.export(exports, "encodeSig", ()=>encodeSig);
parcelHelpers.export(exports, "decodeSig", ()=>decodeSig);
parcelHelpers.export(exports, "encodeData", ()=>encodeData);
parcelHelpers.export(exports, "decodeData", ()=>decodeData);
parcelHelpers.export(exports, "encodeJWT", ()=>encodeJWT);
parcelHelpers.export(exports, "decodeJWT", ()=>decodeJWT);
var _concat = require("uint8arrays/concat");
var _toString = require("uint8arrays/to-string");
var _fromString = require("uint8arrays/from-string");
var _safeJson = require("@walletconnect/safe-json");
var _constants = require("./constants");
function decodeJSON(str) {
    return (0, _safeJson.safeJsonParse)((0, _toString.toString)((0, _fromString.fromString)(str, (0, _constants.JWT_ENCODING)), (0, _constants.JSON_ENCODING)));
}
function encodeJSON(val) {
    return (0, _toString.toString)((0, _fromString.fromString)((0, _safeJson.safeJsonStringify)(val), (0, _constants.JSON_ENCODING)), (0, _constants.JWT_ENCODING));
}
function encodeIss(publicKey) {
    const header = (0, _fromString.fromString)((0, _constants.MULTICODEC_ED25519_HEADER), (0, _constants.MULTICODEC_ED25519_ENCODING));
    const multicodec = (0, _constants.MULTICODEC_ED25519_BASE) + (0, _toString.toString)((0, _concat.concat)([
        header,
        publicKey
    ]), (0, _constants.MULTICODEC_ED25519_ENCODING));
    return [
        (0, _constants.DID_PREFIX),
        (0, _constants.DID_METHOD),
        multicodec
    ].join((0, _constants.DID_DELIMITER));
}
function decodeIss(issuer) {
    const [prefix, method, multicodec] = issuer.split((0, _constants.DID_DELIMITER));
    if (prefix !== (0, _constants.DID_PREFIX) || method !== (0, _constants.DID_METHOD)) throw new Error(`Issuer must be a DID with method "key"`);
    const base = multicodec.slice(0, 1);
    if (base !== (0, _constants.MULTICODEC_ED25519_BASE)) throw new Error(`Issuer must be a key in mulicodec format`);
    const bytes = (0, _fromString.fromString)(multicodec.slice(1), (0, _constants.MULTICODEC_ED25519_ENCODING));
    const type = (0, _toString.toString)(bytes.slice(0, 2), (0, _constants.MULTICODEC_ED25519_ENCODING));
    if (type !== (0, _constants.MULTICODEC_ED25519_HEADER)) throw new Error(`Issuer must be a public key with type "Ed25519"`);
    const publicKey = bytes.slice(2);
    if (publicKey.length !== (0, _constants.MULTICODEC_ED25519_LENGTH)) throw new Error(`Issuer must be a public key with length 32 bytes`);
    return publicKey;
}
function encodeSig(bytes) {
    return (0, _toString.toString)(bytes, (0, _constants.JWT_ENCODING));
}
function decodeSig(encoded) {
    return (0, _fromString.fromString)(encoded, (0, _constants.JWT_ENCODING));
}
function encodeData(params) {
    return (0, _fromString.fromString)([
        encodeJSON(params.header),
        encodeJSON(params.payload)
    ].join((0, _constants.JWT_DELIMITER)), (0, _constants.DATA_ENCODING));
}
function decodeData(data) {
    const params = (0, _toString.toString)(data, (0, _constants.DATA_ENCODING)).split((0, _constants.JWT_DELIMITER));
    const header = decodeJSON(params[0]);
    const payload = decodeJSON(params[1]);
    return {
        header,
        payload
    };
}
function encodeJWT(params) {
    return [
        encodeJSON(params.header),
        encodeJSON(params.payload),
        encodeSig(params.signature)
    ].join((0, _constants.JWT_DELIMITER));
}
function decodeJWT(jwt) {
    const params = jwt.split((0, _constants.JWT_DELIMITER));
    const header = decodeJSON(params[0]);
    const payload = decodeJSON(params[1]);
    const signature = decodeSig(params[2]);
    const data = (0, _fromString.fromString)(params.slice(0, 2).join((0, _constants.JWT_DELIMITER)), (0, _constants.DATA_ENCODING));
    return {
        header,
        payload,
        signature,
        data
    };
}

},{"uint8arrays/concat":"gqJ9u","uint8arrays/to-string":"w8mvE","uint8arrays/from-string":"7qjkp","@walletconnect/safe-json":"8aMMv","./constants":"kR7dB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gqJ9u":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var alloc = require("f54fb6221e32eab7");
var asUint8array = require("8b713337b6896ad3");
function concat(arrays, length) {
    if (!length) length = arrays.reduce((acc, curr)=>acc + curr.length, 0);
    const output = alloc.allocUnsafe(length);
    let offset = 0;
    for (const arr of arrays){
        output.set(arr, offset);
        offset += arr.length;
    }
    return asUint8array.asUint8Array(output);
}
exports.concat = concat;

},{"f54fb6221e32eab7":"jsZij","8b713337b6896ad3":"hN1l1"}],"jsZij":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var asUint8array = require("f342da1fc88fca63");
function alloc(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) return asUint8array.asUint8Array(globalThis.Buffer.alloc(size));
    return new Uint8Array(size);
}
function allocUnsafe(size = 0) {
    if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) return asUint8array.asUint8Array(globalThis.Buffer.allocUnsafe(size));
    return new Uint8Array(size);
}
exports.alloc = alloc;
exports.allocUnsafe = allocUnsafe;

},{"f342da1fc88fca63":"hN1l1"}],"hN1l1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function asUint8Array(buf) {
    if (globalThis.Buffer != null) return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    return buf;
}
exports.asUint8Array = asUint8Array;

},{}],"w8mvE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bases = require("8bd6005b071d821");
function toString(array, encoding = "utf8") {
    const base = bases[encoding];
    if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
    return base.encoder.encode(array).substring(1);
}
exports.toString = toString;

},{"8bd6005b071d821":"ekopG"}],"ekopG":[function(require,module,exports) {
"use strict";
var basics = require("1eecc443db40ae90");
var alloc = require("4764df5533977272");
function createCodec(name, prefix, encode, decode) {
    return {
        name,
        prefix,
        encoder: {
            name,
            prefix,
            encode
        },
        decoder: {
            decode
        }
    };
}
const string = createCodec("utf8", "u", (buf)=>{
    const decoder = new TextDecoder("utf8");
    return "u" + decoder.decode(buf);
}, (str)=>{
    const encoder = new TextEncoder();
    return encoder.encode(str.substring(1));
});
const ascii = createCodec("ascii", "a", (buf)=>{
    let string = "a";
    for(let i = 0; i < buf.length; i++)string += String.fromCharCode(buf[i]);
    return string;
}, (str)=>{
    str = str.substring(1);
    const buf = alloc.allocUnsafe(str.length);
    for(let i = 0; i < str.length; i++)buf[i] = str.charCodeAt(i);
    return buf;
});
const BASES = {
    utf8: string,
    "utf-8": string,
    hex: basics.bases.base16,
    latin1: ascii,
    ascii: ascii,
    binary: ascii,
    ...basics.bases
};
module.exports = BASES;

},{"1eecc443db40ae90":"a826o","4764df5533977272":"jsZij"}],"a826o":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var identity = require("1a2c91a91c7b658b");
var base2 = require("f00fae9e07ce4945");
var base8 = require("352712d597d78978");
var base10 = require("7e7b79fe3048beb1");
var base16 = require("113898714e5cead6");
var base32 = require("69264e992e8799ac");
var base36 = require("554f1f9de0247fb0");
var base58 = require("b2b599ba04da3b7d");
var base64 = require("bb2ff9b0cc8489f3");
var base256emoji = require("847e54582ecb34e5");
var sha2 = require("726c3fc1044d03d");
var identity$1 = require("c8aae8bac1178fe0");
var raw = require("90935e012c72c785");
var json = require("a14d7eccf5ec5098");
require("9b7db58a2856d086");
var cid = require("ad1c6420932e57fa");
var hasher = require("1fb314c1284bffb7");
var digest = require("4ae1e8bd209902fc");
var varint = require("b2c7999b3a7295ad");
var bytes = require("bf6561604658798b");
const bases = {
    ...identity,
    ...base2,
    ...base8,
    ...base10,
    ...base16,
    ...base32,
    ...base36,
    ...base58,
    ...base64,
    ...base256emoji
};
const hashes = {
    ...sha2,
    ...identity$1
};
const codecs = {
    raw,
    json
};
exports.CID = cid.CID;
exports.hasher = hasher;
exports.digest = digest;
exports.varint = varint;
exports.bytes = bytes;
exports.bases = bases;
exports.codecs = codecs;
exports.hashes = hashes;

},{"1a2c91a91c7b658b":"jy16e","f00fae9e07ce4945":"jAOxB","352712d597d78978":"3WMjP","7e7b79fe3048beb1":"aFB7O","113898714e5cead6":"e5DKK","69264e992e8799ac":"apmz1","554f1f9de0247fb0":"22c8Y","b2b599ba04da3b7d":"9KkrI","bb2ff9b0cc8489f3":"3gCnk","847e54582ecb34e5":"cSiGJ","726c3fc1044d03d":"7U0mx","c8aae8bac1178fe0":"bj4ky","90935e012c72c785":"cxcPD","a14d7eccf5ec5098":"7lUAp","9b7db58a2856d086":"3QFUn","ad1c6420932e57fa":"4uoBU","1fb314c1284bffb7":"lU6YS","4ae1e8bd209902fc":"9JdI8","b2c7999b3a7295ad":"8P1F2","bf6561604658798b":"ent0w"}],"jy16e":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("233cf2f64607587b");
var bytes = require("5cb77b0f2209621a");
const identity = base.from({
    prefix: "\0",
    name: "identity",
    encode: (buf)=>bytes.toString(buf),
    decode: (str)=>bytes.fromString(str)
});
exports.identity = identity;

},{"233cf2f64607587b":"j888T","5cb77b0f2209621a":"ent0w"}],"j888T":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseX$1 = require("6acc0387a3c2fc14");
var bytes = require("a17d2e0a573a462e");
class Encoder {
    constructor(name, prefix, baseEncode){
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
    }
    encode(bytes) {
        if (bytes instanceof Uint8Array) return `${this.prefix}${this.baseEncode(bytes)}`;
        else throw Error("Unknown type, must be binary type");
    }
}
class Decoder {
    constructor(name, prefix, baseDecode){
        this.name = name;
        this.prefix = prefix;
        if (prefix.codePointAt(0) === undefined) throw new Error("Invalid prefix character");
        this.prefixCodePoint = prefix.codePointAt(0);
        this.baseDecode = baseDecode;
    }
    decode(text) {
        if (typeof text === "string") {
            if (text.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(text.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(decoder) {
        return or(this, decoder);
    }
}
class ComposedDecoder {
    constructor(decoders){
        this.decoders = decoders;
    }
    or(decoder) {
        return or(this, decoder);
    }
    decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) return decoder.decode(input);
        else throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const or = (left, right)=>new ComposedDecoder({
        ...left.decoders || {
            [left.prefix]: left
        },
        ...right.decoders || {
            [right.prefix]: right
        }
    });
class Codec {
    constructor(name, prefix, baseEncode, baseDecode){
        this.name = name;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name, prefix, baseEncode);
        this.decoder = new Decoder(name, prefix, baseDecode);
    }
    encode(input) {
        return this.encoder.encode(input);
    }
    decode(input) {
        return this.decoder.decode(input);
    }
}
const from = ({ name , prefix , encode , decode  })=>new Codec(name, prefix, encode, decode);
const baseX = ({ prefix , name , alphabet  })=>{
    const { encode , decode  } = baseX$1(alphabet, name);
    return from({
        prefix,
        name,
        encode,
        decode: (text)=>bytes.coerce(decode(text))
    });
};
const decode = (string, alphabet, bitsPerChar, name)=>{
    const codes = {};
    for(let i = 0; i < alphabet.length; ++i)codes[alphabet[i]] = i;
    let end = string.length;
    while(string[end - 1] === "=")--end;
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for(let i = 0; i < end; ++i){
        const value = codes[string[i]];
        if (value === undefined) throw new SyntaxError(`Non-${name} character`);
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
            bits -= 8;
            out[written++] = 255 & buffer >> bits;
        }
    }
    if (bits >= bitsPerChar || 255 & buffer << 8 - bits) throw new SyntaxError("Unexpected end of data");
    return out;
};
const encode = (data, alphabet, bitsPerChar)=>{
    const pad = alphabet[alphabet.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for(let i = 0; i < data.length; ++i){
        buffer = buffer << 8 | data[i];
        bits += 8;
        while(bits > bitsPerChar){
            bits -= bitsPerChar;
            out += alphabet[mask & buffer >> bits];
        }
    }
    if (bits) out += alphabet[mask & buffer << bitsPerChar - bits];
    if (pad) while(out.length * bitsPerChar & 7)out += "=";
    return out;
};
const rfc4648 = ({ name , prefix , bitsPerChar , alphabet  })=>{
    return from({
        prefix,
        name,
        encode (input) {
            return encode(input, alphabet, bitsPerChar);
        },
        decode (input) {
            return decode(input, alphabet, bitsPerChar, name);
        }
    });
};
exports.Codec = Codec;
exports.baseX = baseX;
exports.from = from;
exports.or = or;
exports.rfc4648 = rfc4648;

},{"6acc0387a3c2fc14":"bPHFa","a17d2e0a573a462e":"ent0w"}],"bPHFa":[function(require,module,exports) {
"use strict";
function base(ALPHABET, name) {
    if (ALPHABET.length >= 255) throw new TypeError("Alphabet too long");
    var BASE_MAP = new Uint8Array(256);
    for(var j = 0; j < BASE_MAP.length; j++)BASE_MAP[j] = 255;
    for(var i = 0; i < ALPHABET.length; i++){
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) throw new TypeError(x + " is ambiguous");
        BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode(source) {
        if (source instanceof Uint8Array) ;
        else if (ArrayBuffer.isView(source)) source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        else if (Array.isArray(source)) source = Uint8Array.from(source);
        if (!(source instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (source.length === 0) return "";
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while(pbegin !== pend && source[pbegin] === 0){
            pbegin++;
            zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while(pbegin !== pend){
            var carry = source[pbegin];
            var i = 0;
            for(var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++){
                carry += 256 * b58[it1] >>> 0;
                b58[it1] = carry % BASE >>> 0;
                carry = carry / BASE >>> 0;
            }
            if (carry !== 0) throw new Error("Non-zero carry");
            length = i;
            pbegin++;
        }
        var it2 = size - length;
        while(it2 !== size && b58[it2] === 0)it2++;
        var str = LEADER.repeat(zeroes);
        for(; it2 < size; ++it2)str += ALPHABET.charAt(b58[it2]);
        return str;
    }
    function decodeUnsafe(source) {
        if (typeof source !== "string") throw new TypeError("Expected String");
        if (source.length === 0) return new Uint8Array();
        var psz = 0;
        if (source[psz] === " ") return;
        var zeroes = 0;
        var length = 0;
        while(source[psz] === LEADER){
            zeroes++;
            psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while(source[psz]){
            var carry = BASE_MAP[source.charCodeAt(psz)];
            if (carry === 255) return;
            var i = 0;
            for(var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++){
                carry += BASE * b256[it3] >>> 0;
                b256[it3] = carry % 256 >>> 0;
                carry = carry / 256 >>> 0;
            }
            if (carry !== 0) throw new Error("Non-zero carry");
            length = i;
            psz++;
        }
        if (source[psz] === " ") return;
        var it4 = size - length;
        while(it4 !== size && b256[it4] === 0)it4++;
        var vch = new Uint8Array(zeroes + (size - it4));
        var j = zeroes;
        while(it4 !== size)vch[j++] = b256[it4++];
        return vch;
    }
    function decode(string) {
        var buffer = decodeUnsafe(string);
        if (buffer) return buffer;
        throw new Error(`Non-${name} character`);
    }
    return {
        encode: encode,
        decodeUnsafe: decodeUnsafe,
        decode: decode
    };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
module.exports = _brrp__multiformats_scope_baseX;

},{}],"ent0w":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const empty = new Uint8Array(0);
const toHex = (d)=>d.reduce((hex, byte)=>hex + byte.toString(16).padStart(2, "0"), "");
const fromHex = (hex)=>{
    const hexes = hex.match(/../g);
    return hexes ? new Uint8Array(hexes.map((b)=>parseInt(b, 16))) : empty;
};
const equals = (aa, bb)=>{
    if (aa === bb) return true;
    if (aa.byteLength !== bb.byteLength) return false;
    for(let ii = 0; ii < aa.byteLength; ii++){
        if (aa[ii] !== bb[ii]) return false;
    }
    return true;
};
const coerce = (o)=>{
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array") return o;
    if (o instanceof ArrayBuffer) return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    throw new Error("Unknown type, must be binary type");
};
const isBinary = (o)=>o instanceof ArrayBuffer || ArrayBuffer.isView(o);
const fromString = (str)=>new TextEncoder().encode(str);
const toString = (b)=>new TextDecoder().decode(b);
exports.coerce = coerce;
exports.empty = empty;
exports.equals = equals;
exports.fromHex = fromHex;
exports.fromString = fromString;
exports.isBinary = isBinary;
exports.toHex = toHex;
exports.toString = toString;

},{}],"jAOxB":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("ef50c37e65e6b854");
const base2 = base.rfc4648({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
exports.base2 = base2;

},{"ef50c37e65e6b854":"j888T"}],"3WMjP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("2c4727efca0bdbc4");
const base8 = base.rfc4648({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
exports.base8 = base8;

},{"2c4727efca0bdbc4":"j888T"}],"aFB7O":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("1cb4b66c7a6b8b27");
const base10 = base.baseX({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
exports.base10 = base10;

},{"1cb4b66c7a6b8b27":"j888T"}],"e5DKK":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("1c8ba5a47552a0a4");
const base16 = base.rfc4648({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
});
const base16upper = base.rfc4648({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
exports.base16 = base16;
exports.base16upper = base16upper;

},{"1c8ba5a47552a0a4":"j888T"}],"apmz1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("c8c84a188c668758");
const base32 = base.rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
});
const base32upper = base.rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
});
const base32pad = base.rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
});
const base32padupper = base.rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
});
const base32hex = base.rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
});
const base32hexupper = base.rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
});
const base32hexpad = base.rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
});
const base32hexpadupper = base.rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
});
const base32z = base.rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
exports.base32 = base32;
exports.base32hex = base32hex;
exports.base32hexpad = base32hexpad;
exports.base32hexpadupper = base32hexpadupper;
exports.base32hexupper = base32hexupper;
exports.base32pad = base32pad;
exports.base32padupper = base32padupper;
exports.base32upper = base32upper;
exports.base32z = base32z;

},{"c8c84a188c668758":"j888T"}],"22c8Y":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("5c1d2cf4236a7cc3");
const base36 = base.baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = base.baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
exports.base36 = base36;
exports.base36upper = base36upper;

},{"5c1d2cf4236a7cc3":"j888T"}],"9KkrI":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("20d61dc6d299e5eb");
const base58btc = base.baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = base.baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
exports.base58btc = base58btc;
exports.base58flickr = base58flickr;

},{"20d61dc6d299e5eb":"j888T"}],"3gCnk":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("b6805fad5e542b94");
const base64 = base.rfc4648({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
});
const base64pad = base.rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
});
const base64url = base.rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
});
const base64urlpad = base.rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
exports.base64 = base64;
exports.base64pad = base64pad;
exports.base64url = base64url;
exports.base64urlpad = base64urlpad;

},{"b6805fad5e542b94":"j888T"}],"cSiGJ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var base = require("6135d0a5fc20c40a");
const alphabet = Array.from("\uD83D\uDE80\uD83E\uDE90☄\uD83D\uDEF0\uD83C\uDF0C\uD83C\uDF11\uD83C\uDF12\uD83C\uDF13\uD83C\uDF14\uD83C\uDF15\uD83C\uDF16\uD83C\uDF17\uD83C\uDF18\uD83C\uDF0D\uD83C\uDF0F\uD83C\uDF0E\uD83D\uDC09☀\uD83D\uDCBB\uD83D\uDDA5\uD83D\uDCBE\uD83D\uDCBF\uD83D\uDE02❤\uD83D\uDE0D\uD83E\uDD23\uD83D\uDE0A\uD83D\uDE4F\uD83D\uDC95\uD83D\uDE2D\uD83D\uDE18\uD83D\uDC4D\uD83D\uDE05\uD83D\uDC4F\uD83D\uDE01\uD83D\uDD25\uD83E\uDD70\uD83D\uDC94\uD83D\uDC96\uD83D\uDC99\uD83D\uDE22\uD83E\uDD14\uD83D\uDE06\uD83D\uDE44\uD83D\uDCAA\uD83D\uDE09☺\uD83D\uDC4C\uD83E\uDD17\uD83D\uDC9C\uD83D\uDE14\uD83D\uDE0E\uD83D\uDE07\uD83C\uDF39\uD83E\uDD26\uD83C\uDF89\uD83D\uDC9E✌✨\uD83E\uDD37\uD83D\uDE31\uD83D\uDE0C\uD83C\uDF38\uD83D\uDE4C\uD83D\uDE0B\uD83D\uDC97\uD83D\uDC9A\uD83D\uDE0F\uD83D\uDC9B\uD83D\uDE42\uD83D\uDC93\uD83E\uDD29\uD83D\uDE04\uD83D\uDE00\uD83D\uDDA4\uD83D\uDE03\uD83D\uDCAF\uD83D\uDE48\uD83D\uDC47\uD83C\uDFB6\uD83D\uDE12\uD83E\uDD2D❣\uD83D\uDE1C\uD83D\uDC8B\uD83D\uDC40\uD83D\uDE2A\uD83D\uDE11\uD83D\uDCA5\uD83D\uDE4B\uD83D\uDE1E\uD83D\uDE29\uD83D\uDE21\uD83E\uDD2A\uD83D\uDC4A\uD83E\uDD73\uD83D\uDE25\uD83E\uDD24\uD83D\uDC49\uD83D\uDC83\uD83D\uDE33✋\uD83D\uDE1A\uD83D\uDE1D\uD83D\uDE34\uD83C\uDF1F\uD83D\uDE2C\uD83D\uDE43\uD83C\uDF40\uD83C\uDF37\uD83D\uDE3B\uD83D\uDE13⭐✅\uD83E\uDD7A\uD83C\uDF08\uD83D\uDE08\uD83E\uDD18\uD83D\uDCA6✔\uD83D\uDE23\uD83C\uDFC3\uD83D\uDC90☹\uD83C\uDF8A\uD83D\uDC98\uD83D\uDE20☝\uD83D\uDE15\uD83C\uDF3A\uD83C\uDF82\uD83C\uDF3B\uD83D\uDE10\uD83D\uDD95\uD83D\uDC9D\uD83D\uDE4A\uD83D\uDE39\uD83D\uDDE3\uD83D\uDCAB\uD83D\uDC80\uD83D\uDC51\uD83C\uDFB5\uD83E\uDD1E\uD83D\uDE1B\uD83D\uDD34\uD83D\uDE24\uD83C\uDF3C\uD83D\uDE2B⚽\uD83E\uDD19☕\uD83C\uDFC6\uD83E\uDD2B\uD83D\uDC48\uD83D\uDE2E\uD83D\uDE46\uD83C\uDF7B\uD83C\uDF43\uD83D\uDC36\uD83D\uDC81\uD83D\uDE32\uD83C\uDF3F\uD83E\uDDE1\uD83C\uDF81⚡\uD83C\uDF1E\uD83C\uDF88❌✊\uD83D\uDC4B\uD83D\uDE30\uD83E\uDD28\uD83D\uDE36\uD83E\uDD1D\uD83D\uDEB6\uD83D\uDCB0\uD83C\uDF53\uD83D\uDCA2\uD83E\uDD1F\uD83D\uDE41\uD83D\uDEA8\uD83D\uDCA8\uD83E\uDD2C✈\uD83C\uDF80\uD83C\uDF7A\uD83E\uDD13\uD83D\uDE19\uD83D\uDC9F\uD83C\uDF31\uD83D\uDE16\uD83D\uDC76\uD83E\uDD74▶➡❓\uD83D\uDC8E\uD83D\uDCB8⬇\uD83D\uDE28\uD83C\uDF1A\uD83E\uDD8B\uD83D\uDE37\uD83D\uDD7A⚠\uD83D\uDE45\uD83D\uDE1F\uD83D\uDE35\uD83D\uDC4E\uD83E\uDD32\uD83E\uDD20\uD83E\uDD27\uD83D\uDCCC\uD83D\uDD35\uD83D\uDC85\uD83E\uDDD0\uD83D\uDC3E\uD83C\uDF52\uD83D\uDE17\uD83E\uDD11\uD83C\uDF0A\uD83E\uDD2F\uD83D\uDC37☎\uD83D\uDCA7\uD83D\uDE2F\uD83D\uDC86\uD83D\uDC46\uD83C\uDFA4\uD83D\uDE47\uD83C\uDF51❄\uD83C\uDF34\uD83D\uDCA3\uD83D\uDC38\uD83D\uDC8C\uD83D\uDCCD\uD83E\uDD40\uD83E\uDD22\uD83D\uDC45\uD83D\uDCA1\uD83D\uDCA9\uD83D\uDC50\uD83D\uDCF8\uD83D\uDC7B\uD83E\uDD10\uD83E\uDD2E\uD83C\uDFBC\uD83E\uDD75\uD83D\uDEA9\uD83C\uDF4E\uD83C\uDF4A\uD83D\uDC7C\uD83D\uDC8D\uD83D\uDCE3\uD83E\uDD42");
const alphabetBytesToChars = alphabet.reduce((p, c, i)=>{
    p[i] = c;
    return p;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p, c, i)=>{
    p[c.codePointAt(0)] = i;
    return p;
}, []);
function encode(data) {
    return data.reduce((p, c)=>{
        p += alphabetBytesToChars[c];
        return p;
    }, "");
}
function decode(str) {
    const byts = [];
    for (const char of str){
        const byt = alphabetCharsToBytes[char.codePointAt(0)];
        if (byt === undefined) throw new Error(`Non-base256emoji character: ${char}`);
        byts.push(byt);
    }
    return new Uint8Array(byts);
}
const base256emoji = base.from({
    prefix: "\uD83D\uDE80",
    name: "base256emoji",
    encode,
    decode
});
exports.base256emoji = base256emoji;

},{"6135d0a5fc20c40a":"j888T"}],"7U0mx":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var hasher = require("a1f516c73e17c5c2");
const sha = (name)=>async (data)=>new Uint8Array(await crypto.subtle.digest(name, data));
const sha256 = hasher.from({
    name: "sha2-256",
    code: 18,
    encode: sha("SHA-256")
});
const sha512 = hasher.from({
    name: "sha2-512",
    code: 19,
    encode: sha("SHA-512")
});
exports.sha256 = sha256;
exports.sha512 = sha512;

},{"a1f516c73e17c5c2":"lU6YS"}],"lU6YS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var digest = require("6f03330fd53370eb");
const from = ({ name , code , encode  })=>new Hasher(name, code, encode);
class Hasher {
    constructor(name, code, encode){
        this.name = name;
        this.code = code;
        this.encode = encode;
    }
    digest(input) {
        if (input instanceof Uint8Array) {
            const result = this.encode(input);
            return result instanceof Uint8Array ? digest.create(this.code, result) : result.then((digest$1)=>digest.create(this.code, digest$1));
        } else throw Error("Unknown type, must be binary type");
    }
}
exports.Hasher = Hasher;
exports.from = from;

},{"6f03330fd53370eb":"9JdI8"}],"9JdI8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytes = require("d08b8ced83e0cef6");
var varint = require("6ddee7a59983727c");
const create = (code, digest)=>{
    const size = digest.byteLength;
    const sizeOffset = varint.encodingLength(code);
    const digestOffset = sizeOffset + varint.encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    varint.encodeTo(code, bytes, 0);
    varint.encodeTo(size, bytes, sizeOffset);
    bytes.set(digest, digestOffset);
    return new Digest(code, size, digest, bytes);
};
const decode = (multihash)=>{
    const bytes$1 = bytes.coerce(multihash);
    const [code, sizeOffset] = varint.decode(bytes$1);
    const [size, digestOffset] = varint.decode(bytes$1.subarray(sizeOffset));
    const digest = bytes$1.subarray(sizeOffset + digestOffset);
    if (digest.byteLength !== size) throw new Error("Incorrect length");
    return new Digest(code, size, digest, bytes$1);
};
const equals = (a, b)=>{
    if (a === b) return true;
    else return a.code === b.code && a.size === b.size && bytes.equals(a.bytes, b.bytes);
};
class Digest {
    constructor(code, size, digest, bytes){
        this.code = code;
        this.size = size;
        this.digest = digest;
        this.bytes = bytes;
    }
}
exports.Digest = Digest;
exports.create = create;
exports.decode = decode;
exports.equals = equals;

},{"d08b8ced83e0cef6":"ent0w","6ddee7a59983727c":"8P1F2"}],"8P1F2":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var varint$1 = require("9ccfd59a2246b7ba");
const decode = (data, offset = 0)=>{
    const code = varint$1.decode(data, offset);
    return [
        code,
        varint$1.decode.bytes
    ];
};
const encodeTo = (int, target, offset = 0)=>{
    varint$1.encode(int, target, offset);
    return target;
};
const encodingLength = (int)=>{
    return varint$1.encodingLength(int);
};
exports.decode = decode;
exports.encodeTo = encodeTo;
exports.encodingLength = encodingLength;

},{"9ccfd59a2246b7ba":"lYpdI"}],"lYpdI":[function(require,module,exports) {
"use strict";
var encode_1 = encode;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while(num >= INT){
        out[offset++] = num & 255 | MSB;
        num /= 128;
    }
    while(num & MSBALL){
        out[offset++] = num & 255 | MSB;
        num >>>= 7;
    }
    out[offset] = num | 0;
    encode.bytes = offset - oldOffset + 1;
    return out;
}
var decode = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
        if (counter >= l) {
            read.bytes = 0;
            throw new RangeError("Could not decode varint");
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
        shift += 7;
    }while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
    encode: encode_1,
    decode: decode,
    encodingLength: length
};
var _brrp_varint = varint;
var varint$1 = _brrp_varint;
module.exports = varint$1;

},{}],"bj4ky":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytes = require("3752598d93499d8f");
var digest$1 = require("bc6ed637d152442f");
const code = 0;
const name = "identity";
const encode = bytes.coerce;
const digest = (input)=>digest$1.create(code, encode(input));
const identity = {
    code,
    name,
    encode,
    digest
};
exports.identity = identity;

},{"3752598d93499d8f":"ent0w","bc6ed637d152442f":"9JdI8"}],"cxcPD":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytes = require("8e0f15da83c8b3e8");
const name = "raw";
const code = 85;
const encode = (node)=>bytes.coerce(node);
const decode = (data)=>bytes.coerce(data);
exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;

},{"8e0f15da83c8b3e8":"ent0w"}],"7lUAp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const name = "json";
const code = 512;
const encode = (node)=>textEncoder.encode(JSON.stringify(node));
const decode = (data)=>JSON.parse(textDecoder.decode(data));
exports.code = code;
exports.decode = decode;
exports.encode = encode;
exports.name = name;

},{}],"3QFUn":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var cid = require("224a8d45b79ed92b");
var varint = require("4ea026f7c81dec2e");
var bytes = require("73ea868e0bb414df");
var hasher = require("fab6b12544a169c1");
var digest = require("22d17fb807ef69d5");
exports.CID = cid.CID;
exports.varint = varint;
exports.bytes = bytes;
exports.hasher = hasher;
exports.digest = digest;

},{"224a8d45b79ed92b":"4uoBU","4ea026f7c81dec2e":"8P1F2","73ea868e0bb414df":"ent0w","fab6b12544a169c1":"lU6YS","22d17fb807ef69d5":"9JdI8"}],"4uoBU":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var varint = require("4828e3c976eeb108");
var digest = require("7f4eb0ae2099cb96");
var base58 = require("a42bc400bec49a8f");
var base32 = require("a516bd299884f620");
var bytes = require("41e75fb80a144086");
class CID {
    constructor(version, code, multihash, bytes){
        this.code = code;
        this.version = version;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = new Map();
        Object.defineProperties(this, {
            byteOffset: hidden,
            byteLength: hidden,
            code: readonly,
            version: readonly,
            multihash: readonly,
            bytes: readonly,
            _baseCache: hidden,
            asCID: hidden
        });
    }
    toV0() {
        switch(this.version){
            case 0:
                return this;
            default:
                {
                    const { code , multihash  } = this;
                    if (code !== DAG_PB_CODE) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
                    if (multihash.code !== SHA_256_CODE) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
                    return CID.createV0(multihash);
                }
        }
    }
    toV1() {
        switch(this.version){
            case 0:
                {
                    const { code , digest: digest$1  } = this.multihash;
                    const multihash = digest.create(code, digest$1);
                    return CID.createV1(this.code, multihash);
                }
            case 1:
                return this;
            default:
                throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
    }
    equals(other) {
        return other && this.code === other.code && this.version === other.version && digest.equals(this.multihash, other.multihash);
    }
    toString(base) {
        const { bytes , version , _baseCache  } = this;
        switch(version){
            case 0:
                return toStringV0(bytes, _baseCache, base || base58.base58btc.encoder);
            default:
                return toStringV1(bytes, _baseCache, base || base32.base32.encoder);
        }
    }
    toJSON() {
        return {
            code: this.code,
            version: this.version,
            hash: this.multihash.bytes
        };
    }
    get [Symbol.toStringTag]() {
        return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
    }
    static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
    }
    get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
        throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
        if (value instanceof CID) return value;
        else if (value != null && value.asCID === value) {
            const { version , code , multihash , bytes  } = value;
            return new CID(version, code, multihash, bytes || encodeCID(version, code, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
            const { version , multihash , code  } = value;
            const digest$1 = digest.decode(multihash);
            return CID.create(version, code, digest$1);
        } else return null;
    }
    static create(version, code, digest) {
        if (typeof code !== "number") throw new Error("String codecs are no longer supported");
        switch(version){
            case 0:
                if (code !== DAG_PB_CODE) throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
                else return new CID(version, code, digest, digest.bytes);
            case 1:
                {
                    const bytes = encodeCID(version, code, digest.bytes);
                    return new CID(version, code, digest, bytes);
                }
            default:
                throw new Error("Invalid version");
        }
    }
    static createV0(digest) {
        return CID.create(0, DAG_PB_CODE, digest);
    }
    static createV1(code, digest) {
        return CID.create(1, code, digest);
    }
    static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) throw new Error("Incorrect length");
        return cid;
    }
    static decodeFirst(bytes$1) {
        const specs = CID.inspectBytes(bytes$1);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = bytes.coerce(bytes$1.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) throw new Error("Incorrect length");
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest$1 = new digest.Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest$1) : CID.createV1(specs.codec, digest$1);
        return [
            cid,
            bytes$1.subarray(specs.size)
        ];
    }
    static inspectBytes(initialBytes) {
        let offset = 0;
        const next = ()=>{
            const [i, length] = varint.decode(initialBytes.subarray(offset));
            offset += length;
            return i;
        };
        let version = next();
        let codec = DAG_PB_CODE;
        if (version === 18) {
            version = 0;
            offset = 0;
        } else if (version === 1) codec = next();
        if (version !== 0 && version !== 1) throw new RangeError(`Invalid CID version ${version}`);
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
            version,
            codec,
            multihashCode,
            digestSize,
            multihashSize,
            size
        };
    }
    static parse(source, base) {
        const [prefix, bytes] = parseCIDtoBytes(source, base);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
    }
}
const parseCIDtoBytes = (source, base)=>{
    switch(source[0]){
        case "Q":
            {
                const decoder = base || base58.base58btc;
                return [
                    base58.base58btc.prefix,
                    decoder.decode(`${base58.base58btc.prefix}${source}`)
                ];
            }
        case base58.base58btc.prefix:
            {
                const decoder = base || base58.base58btc;
                return [
                    base58.base58btc.prefix,
                    decoder.decode(source)
                ];
            }
        case base32.base32.prefix:
            {
                const decoder = base || base32.base32;
                return [
                    base32.base32.prefix,
                    decoder.decode(source)
                ];
            }
        default:
            if (base == null) throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
            return [
                source[0],
                base.decode(source)
            ];
    }
};
const toStringV0 = (bytes, cache, base)=>{
    const { prefix  } = base;
    if (prefix !== base58.base58btc.prefix) throw Error(`Cannot string encode V0 in ${base.name} encoding`);
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes).slice(1);
        cache.set(prefix, cid);
        return cid;
    } else return cid;
};
const toStringV1 = (bytes, cache, base)=>{
    const { prefix  } = base;
    const cid = cache.get(prefix);
    if (cid == null) {
        const cid = base.encode(bytes);
        cache.set(prefix, cid);
        return cid;
    } else return cid;
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version, code, multihash)=>{
    const codeOffset = varint.encodingLength(version);
    const hashOffset = codeOffset + varint.encodingLength(code);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    varint.encodeTo(version, bytes, 0);
    varint.encodeTo(code, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const readonly = {
    writable: false,
    configurable: false,
    enumerable: true
};
const hidden = {
    writable: false,
    enumerable: false,
    configurable: false
};
const version = "0.0.0-dev";
const deprecate = (range, message)=>{
    if (range.test(version)) console.warn(message);
    else throw new Error(message);
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
exports.CID = CID;

},{"4828e3c976eeb108":"8P1F2","7f4eb0ae2099cb96":"9JdI8","a42bc400bec49a8f":"9KkrI","a516bd299884f620":"apmz1","41e75fb80a144086":"ent0w"}],"7qjkp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bases = require("e83bb81ff38e7e51");
var asUint8array = require("a35fa0c0f0e55503");
function fromString(string, encoding = "utf8") {
    const base = bases[encoding];
    if (!base) throw new Error(`Unsupported encoding "${encoding}"`);
    if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) return asUint8array.asUint8Array(globalThis.Buffer.from(string, "utf-8"));
    return base.decoder.decode(`${base.prefix}${string}`);
}
exports.fromString = fromString;

},{"e83bb81ff38e7e51":"ekopG","a35fa0c0f0e55503":"hN1l1"}],"8aMMv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "safeJsonParse", ()=>safeJsonParse);
parcelHelpers.export(exports, "safeJsonStringify", ()=>safeJsonStringify);
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fH88W":[function(require,module,exports) {

},{}],"o3k5L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BASE10", ()=>M);
parcelHelpers.export(exports, "BASE16", ()=>d);
parcelHelpers.export(exports, "BASE64", ()=>A);
parcelHelpers.export(exports, "COLON", ()=>bn);
parcelHelpers.export(exports, "DEFAULT_DEPTH", ()=>F);
parcelHelpers.export(exports, "EMPTY_SPACE", ()=>w);
parcelHelpers.export(exports, "ENV_MAP", ()=>b);
parcelHelpers.export(exports, "ONE_THOUSAND", ()=>On);
parcelHelpers.export(exports, "REACT_NATIVE_PRODUCT", ()=>ve);
parcelHelpers.export(exports, "RELAYER_DEFAULT_PROTOCOL", ()=>we);
parcelHelpers.export(exports, "SDK_TYPE", ()=>be);
parcelHelpers.export(exports, "SLASH", ()=>Ne);
parcelHelpers.export(exports, "TYPE_0", ()=>K);
parcelHelpers.export(exports, "TYPE_1", ()=>N);
parcelHelpers.export(exports, "UTF8", ()=>_);
parcelHelpers.export(exports, "appendToQueryString", ()=>Ie);
parcelHelpers.export(exports, "assertType", ()=>Un);
parcelHelpers.export(exports, "calcExpiry", ()=>kn);
parcelHelpers.export(exports, "capitalize", ()=>$n);
parcelHelpers.export(exports, "capitalizeWord", ()=>_e);
parcelHelpers.export(exports, "createDelayedPromise", ()=>Dn);
parcelHelpers.export(exports, "createExpiringPromise", ()=>jn);
parcelHelpers.export(exports, "decodeTypeByte", ()=>S);
parcelHelpers.export(exports, "decrypt", ()=>yn);
parcelHelpers.export(exports, "deriveSymKey", ()=>fn);
parcelHelpers.export(exports, "deserialize", ()=>x);
parcelHelpers.export(exports, "encodeTypeByte", ()=>pe);
parcelHelpers.export(exports, "encrypt", ()=>mn);
parcelHelpers.export(exports, "engineEvent", ()=>xn);
parcelHelpers.export(exports, "enumify", ()=>Cn);
parcelHelpers.export(exports, "formatAccountId", ()=>se);
parcelHelpers.export(exports, "formatAccountWithChain", ()=>nn);
parcelHelpers.export(exports, "formatChainId", ()=>oe);
parcelHelpers.export(exports, "formatExpirerTarget", ()=>B);
parcelHelpers.export(exports, "formatIdTarget", ()=>Mn);
parcelHelpers.export(exports, "formatMessage", ()=>an);
parcelHelpers.export(exports, "formatMessageContext", ()=>Rn);
parcelHelpers.export(exports, "formatRelayParams", ()=>je);
parcelHelpers.export(exports, "formatRelayRpcUrl", ()=>Tn);
parcelHelpers.export(exports, "formatTopicTarget", ()=>Vn);
parcelHelpers.export(exports, "formatUA", ()=>Ue);
parcelHelpers.export(exports, "formatUri", ()=>Wn);
parcelHelpers.export(exports, "generateKeyPair", ()=>dn);
parcelHelpers.export(exports, "generateRandomBytes32", ()=>ln);
parcelHelpers.export(exports, "getAccountsChains", ()=>O);
parcelHelpers.export(exports, "getAccountsFromNamespaces", ()=>rn);
parcelHelpers.export(exports, "getAddressFromAccount", ()=>ie);
parcelHelpers.export(exports, "getAddressesFromAccounts", ()=>tn);
parcelHelpers.export(exports, "getAppMetadata", ()=>Sn);
parcelHelpers.export(exports, "getChainFromAccount", ()=>ce);
parcelHelpers.export(exports, "getChainsFromAccounts", ()=>ae);
parcelHelpers.export(exports, "getChainsFromNamespace", ()=>U);
parcelHelpers.export(exports, "getChainsFromNamespaces", ()=>on);
parcelHelpers.export(exports, "getChainsFromRequiredNamespaces", ()=>sn);
parcelHelpers.export(exports, "getDidAddress", ()=>de);
parcelHelpers.export(exports, "getDidAddressSegments", ()=>R);
parcelHelpers.export(exports, "getDidChainId", ()=>ue);
parcelHelpers.export(exports, "getEnvironment", ()=>q);
parcelHelpers.export(exports, "getHttpUrl", ()=>Pn);
parcelHelpers.export(exports, "getInternalError", ()=>h);
parcelHelpers.export(exports, "getJavascriptID", ()=>Pe);
parcelHelpers.export(exports, "getJavascriptOS", ()=>Te);
parcelHelpers.export(exports, "getLastItems", ()=>Ae);
parcelHelpers.export(exports, "getNamespacedDidChainId", ()=>cn);
parcelHelpers.export(exports, "getNamespacesChains", ()=>Ve);
parcelHelpers.export(exports, "getNamespacesEventsForChainId", ()=>Ke);
parcelHelpers.export(exports, "getNamespacesMethodsForChainId", ()=>Me);
parcelHelpers.export(exports, "getRelayClientMetadata", ()=>In);
parcelHelpers.export(exports, "getRelayProtocolApi", ()=>Hn);
parcelHelpers.export(exports, "getRelayProtocolName", ()=>Fn);
parcelHelpers.export(exports, "getRequiredNamespacesFromNamespaces", ()=>Jn);
parcelHelpers.export(exports, "getSdkError", ()=>v);
parcelHelpers.export(exports, "getUniqueValues", ()=>V);
parcelHelpers.export(exports, "hasOverlap", ()=>E);
parcelHelpers.export(exports, "hashKey", ()=>fe);
parcelHelpers.export(exports, "hashMessage", ()=>pn);
parcelHelpers.export(exports, "isBrowser", ()=>Se);
parcelHelpers.export(exports, "isConformingNamespaces", ()=>yt);
parcelHelpers.export(exports, "isExpired", ()=>Ln);
parcelHelpers.export(exports, "isNode", ()=>H);
parcelHelpers.export(exports, "isProposalStruct", ()=>nt);
parcelHelpers.export(exports, "isReactNative", ()=>Oe);
parcelHelpers.export(exports, "isSessionCompatible", ()=>Xn);
parcelHelpers.export(exports, "isSessionStruct", ()=>tt);
parcelHelpers.export(exports, "isTypeOneEnvelope", ()=>hn);
parcelHelpers.export(exports, "isUndefined", ()=>g);
parcelHelpers.export(exports, "isValidAccountId", ()=>ke);
parcelHelpers.export(exports, "isValidAccounts", ()=>Fe);
parcelHelpers.export(exports, "isValidActions", ()=>qe);
parcelHelpers.export(exports, "isValidArray", ()=>I);
parcelHelpers.export(exports, "isValidChainId", ()=>$);
parcelHelpers.export(exports, "isValidChains", ()=>Le);
parcelHelpers.export(exports, "isValidController", ()=>rt);
parcelHelpers.export(exports, "isValidErrorReason", ()=>at);
parcelHelpers.export(exports, "isValidEvent", ()=>lt);
parcelHelpers.export(exports, "isValidId", ()=>it);
parcelHelpers.export(exports, "isValidNamespaceAccounts", ()=>He);
parcelHelpers.export(exports, "isValidNamespaceActions", ()=>Y);
parcelHelpers.export(exports, "isValidNamespaceChains", ()=>xe);
parcelHelpers.export(exports, "isValidNamespaceMethodsOrEvents", ()=>z);
parcelHelpers.export(exports, "isValidNamespaces", ()=>Be);
parcelHelpers.export(exports, "isValidNamespacesChainId", ()=>ft);
parcelHelpers.export(exports, "isValidNamespacesEvent", ()=>mt);
parcelHelpers.export(exports, "isValidNamespacesRequest", ()=>pt);
parcelHelpers.export(exports, "isValidNumber", ()=>C);
parcelHelpers.export(exports, "isValidObject", ()=>G);
parcelHelpers.export(exports, "isValidParams", ()=>ct);
parcelHelpers.export(exports, "isValidRelay", ()=>Ge);
parcelHelpers.export(exports, "isValidRelays", ()=>st);
parcelHelpers.export(exports, "isValidRequest", ()=>ut);
parcelHelpers.export(exports, "isValidRequestExpiry", ()=>gt);
parcelHelpers.export(exports, "isValidRequiredNamespaces", ()=>ot);
parcelHelpers.export(exports, "isValidResponse", ()=>dt);
parcelHelpers.export(exports, "isValidString", ()=>l);
parcelHelpers.export(exports, "isValidUrl", ()=>et);
parcelHelpers.export(exports, "mapEntries", ()=>wn);
parcelHelpers.export(exports, "mapToObj", ()=>An);
parcelHelpers.export(exports, "objToMap", ()=>_n);
parcelHelpers.export(exports, "parseAccountId", ()=>j);
parcelHelpers.export(exports, "parseChainId", ()=>re);
parcelHelpers.export(exports, "parseContextNames", ()=>Re);
parcelHelpers.export(exports, "parseExpirerTarget", ()=>Kn);
parcelHelpers.export(exports, "parseRelayParams", ()=>De);
parcelHelpers.export(exports, "parseUri", ()=>Yn);
parcelHelpers.export(exports, "serialize", ()=>me);
parcelHelpers.export(exports, "validateDecoding", ()=>En);
parcelHelpers.export(exports, "validateEncoding", ()=>ye);
var _chacha20Poly1305 = require("@stablelib/chacha20poly1305");
var _hkdf = require("@stablelib/hkdf");
var _random = require("@stablelib/random");
var _sha256 = require("@stablelib/sha256");
var _x25519 = require("@stablelib/x25519");
var _uint8Arrays = require("uint8arrays");
var _detectBrowser = require("detect-browser");
var _time = require("@walletconnect/time");
var _windowGetters = require("@walletconnect/window-getters");
var _windowMetadata = require("@walletconnect/window-metadata");
var _queryString = require("query-string");
var _relayApi = require("@walletconnect/relay-api");
var process = require("6e394fbcaffe338a");
const P = ":";
function re(e) {
    const [n, t] = e.split(P);
    return {
        namespace: n,
        reference: t
    };
}
function oe(e) {
    const { namespace: n , reference: t  } = e;
    return [
        n,
        t
    ].join(P);
}
function j(e) {
    const [n, t, r] = e.split(P);
    return {
        namespace: n,
        reference: t,
        address: r
    };
}
function se(e) {
    const { namespace: n , reference: t , address: r  } = e;
    return [
        n,
        t,
        r
    ].join(P);
}
function V(e, n) {
    const t = [];
    return e.forEach((r)=>{
        const o = n(r);
        t.includes(o) || t.push(o);
    }), t;
}
function ie(e) {
    const { address: n  } = j(e);
    return n;
}
function ce(e) {
    const { namespace: n , reference: t  } = j(e);
    return oe({
        namespace: n,
        reference: t
    });
}
function nn(e, n) {
    const { namespace: t , reference: r  } = re(n);
    return se({
        namespace: t,
        reference: r,
        address: e
    });
}
function tn(e) {
    return V(e, ie);
}
function ae(e) {
    return V(e, ce);
}
function rn(e, n = []) {
    const t = [];
    return Object.keys(e).forEach((r)=>{
        if (n.length && !n.includes(r)) return;
        const o = e[r];
        t.push(...o.accounts);
    }), t;
}
function on(e, n = []) {
    const t = [];
    return Object.keys(e).forEach((r)=>{
        if (n.length && !n.includes(r)) return;
        const o = e[r];
        t.push(...ae(o.accounts));
    }), t;
}
function sn(e, n = []) {
    const t = [];
    return Object.keys(e).forEach((r)=>{
        if (n.length && !n.includes(r)) return;
        const o = e[r];
        t.push(...U(r, o));
    }), t;
}
function U(e, n) {
    return e.includes(":") ? [
        e
    ] : n.chains || [];
}
const R = (e)=>e?.split(":"), ue = (e)=>{
    const n = e && R(e);
    if (n) return n[3];
}, cn = (e)=>{
    const n = e && R(e);
    if (n) return n[2] + ":" + n[3];
}, de = (e)=>{
    const n = e && R(e);
    if (n) return n.pop();
}, an = (e, n)=>{
    const t = `${e.domain} wants you to sign in with your Ethereum account:`, r = de(n), o = e.statement, s = `URI: ${e.aud}`, i = `Version: ${e.version}`, c = `Chain ID: ${ue(n)}`, u = `Nonce: ${e.nonce}`, f = `Issued At: ${e.iat}`, y = e.resources && e.resources.length > 0 ? `Resources:
${e.resources.map((a)=>`- ${a}`).join(`
`)}` : void 0;
    return [
        t,
        r,
        "",
        o,
        "",
        s,
        i,
        c,
        u,
        f,
        y
    ].filter((a)=>a != null).join(`
`);
}, M = "base10", d = "base16", A = "base64pad", _ = "utf8", K = 0, N = 1, un = 0, le = 1, k = 12, L = 32;
function dn() {
    const e = _x25519.generateKeyPair();
    return {
        privateKey: (0, _uint8Arrays.toString)(e.secretKey, d),
        publicKey: (0, _uint8Arrays.toString)(e.publicKey, d)
    };
}
function ln() {
    const e = (0, _random.randomBytes)(L);
    return (0, _uint8Arrays.toString)(e, d);
}
function fn(e, n) {
    const t = _x25519.sharedKey((0, _uint8Arrays.fromString)(e, d), (0, _uint8Arrays.fromString)(n, d)), r = new (0, _hkdf.HKDF)((0, _sha256.SHA256), t).expand(L);
    return (0, _uint8Arrays.toString)(r, d);
}
function fe(e) {
    const n = (0, _sha256.hash)((0, _uint8Arrays.fromString)(e, d));
    return (0, _uint8Arrays.toString)(n, d);
}
function pn(e) {
    const n = (0, _sha256.hash)((0, _uint8Arrays.fromString)(e, _));
    return (0, _uint8Arrays.toString)(n, d);
}
function pe(e) {
    return (0, _uint8Arrays.fromString)(`${e}`, M);
}
function S(e) {
    return Number((0, _uint8Arrays.toString)(e, M));
}
function mn(e) {
    const n = pe(typeof e.type < "u" ? e.type : K);
    if (S(n) === N && typeof e.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    const t = typeof e.senderPublicKey < "u" ? (0, _uint8Arrays.fromString)(e.senderPublicKey, d) : void 0, r = typeof e.iv < "u" ? (0, _uint8Arrays.fromString)(e.iv, d) : (0, _random.randomBytes)(k), o = new (0, _chacha20Poly1305.ChaCha20Poly1305)((0, _uint8Arrays.fromString)(e.symKey, d)).seal(r, (0, _uint8Arrays.fromString)(e.message, _));
    return me({
        type: n,
        sealed: o,
        iv: r,
        senderPublicKey: t
    });
}
function yn(e) {
    const n = new (0, _chacha20Poly1305.ChaCha20Poly1305)((0, _uint8Arrays.fromString)(e.symKey, d)), { sealed: t , iv: r  } = x(e.encoded), o = n.open(r, t);
    if (o === null) throw new Error("Failed to decrypt");
    return (0, _uint8Arrays.toString)(o, _);
}
function me(e) {
    if (S(e.type) === N) {
        if (typeof e.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
        return (0, _uint8Arrays.toString)((0, _uint8Arrays.concat)([
            e.type,
            e.senderPublicKey,
            e.iv,
            e.sealed
        ]), A);
    }
    return (0, _uint8Arrays.toString)((0, _uint8Arrays.concat)([
        e.type,
        e.iv,
        e.sealed
    ]), A);
}
function x(e) {
    const n = (0, _uint8Arrays.fromString)(e, A), t = n.slice(un, le), r = le;
    if (S(t) === N) {
        const c = r + L, u = c + k, f = n.slice(r, c), y = n.slice(c, u), a = n.slice(u);
        return {
            type: t,
            sealed: a,
            iv: y,
            senderPublicKey: f
        };
    }
    const o = r + k, s = n.slice(r, o), i = n.slice(o);
    return {
        type: t,
        sealed: i,
        iv: s
    };
}
function En(e, n) {
    const t = x(e);
    return ye({
        type: S(t.type),
        senderPublicKey: typeof t.senderPublicKey < "u" ? (0, _uint8Arrays.toString)(t.senderPublicKey, d) : void 0,
        receiverPublicKey: n?.receiverPublicKey
    });
}
function ye(e) {
    const n = e?.type || K;
    if (n === N) {
        if (typeof e?.senderPublicKey > "u") throw new Error("missing sender public key");
        if (typeof e?.receiverPublicKey > "u") throw new Error("missing receiver public key");
    }
    return {
        type: n,
        senderPublicKey: e?.senderPublicKey,
        receiverPublicKey: e?.receiverPublicKey
    };
}
function hn(e) {
    return e.type === N && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
var gn = Object.defineProperty, Ee = Object.getOwnPropertySymbols, vn = Object.prototype.hasOwnProperty, Nn = Object.prototype.propertyIsEnumerable, he = (e, n, t)=>n in e ? gn(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t, ge = (e, n)=>{
    for(var t in n || (n = {}))vn.call(n, t) && he(e, t, n[t]);
    if (Ee) for (var t of Ee(n))Nn.call(n, t) && he(e, t, n[t]);
    return e;
};
const ve = "ReactNative", b = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown"
}, w = " ", bn = ":", Ne = "/", F = 2, On = 1e3, be = "js";
function H() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Oe() {
    return !(0, _windowGetters.getDocument)() && !!(0, _windowGetters.getNavigator)() && navigator.product === ve;
}
function Se() {
    return !H() && !!(0, _windowGetters.getNavigator)();
}
function q() {
    return Oe() ? b.reactNative : H() ? b.node : Se() ? b.browser : b.unknown;
}
function Ie(e, n) {
    let t = _queryString.parse(e);
    return t = ge(ge({}, t), n), e = _queryString.stringify(t), e;
}
function Sn() {
    return (0, _windowMetadata.getWindowMetadata)() || {
        name: "",
        description: "",
        url: "",
        icons: [
            ""
        ]
    };
}
function In(e, n) {
    var t;
    const r = q(), o = {
        protocol: e,
        version: n,
        env: r
    };
    return r === "browser" && (o.host = ((t = (0, _windowGetters.getLocation)()) == null ? void 0 : t.host) || "unknown"), o;
}
function Te() {
    const e = (0, _detectBrowser.detect)();
    if (e === null) return "unknown";
    const n = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
    return e.type === "browser" ? [
        n,
        e.name,
        e.version
    ].join("-") : [
        n,
        e.version
    ].join("-");
}
function Pe() {
    var e;
    const n = q();
    return n === b.browser ? [
        n,
        ((e = (0, _windowGetters.getLocation)()) == null ? void 0 : e.host) || "unknown"
    ].join(":") : n;
}
function Ue(e, n, t) {
    const r = Te(), o = Pe();
    return [
        [
            e,
            n
        ].join("-"),
        [
            be,
            t
        ].join("-"),
        r,
        o
    ].join("/");
}
function Tn({ protocol: e , version: n , relayUrl: t , sdkVersion: r , auth: o , projectId: s  }) {
    const i = t.split("?"), c = Ue(e, n, r), u = {
        auth: o,
        ua: c,
        projectId: s
    }, f = Ie(i[1] || "", u);
    return i[0] + "?" + f;
}
function Pn(e) {
    let n = (e.match(/^[^:]+(?=:\/\/)/gi) || [])[0];
    const t = typeof n < "u" ? e.split("://")[1] : e;
    return n = n === "wss" ? "https" : "http", [
        n,
        t
    ].join("://");
}
function Un(e, n, t) {
    if (!e[n] || typeof e[n] !== t) throw new Error(`Missing or invalid "${n}" param`);
}
function Re(e, n = F) {
    return Ae(e.split(Ne), n);
}
function Rn(e) {
    return Re(e).join(w);
}
function E(e, n) {
    return e.filter((t)=>n.includes(t)).length === e.length;
}
function Ae(e, n = F) {
    return e.slice(Math.max(e.length - n, 0));
}
function An(e) {
    return Object.fromEntries(e.entries());
}
function _n(e) {
    return new Map(Object.entries(e));
}
function wn(e, n) {
    const t = {};
    return Object.keys(e).forEach((r)=>{
        t[r] = n(e[r]);
    }), t;
}
const Cn = (e)=>e;
function _e(e) {
    return e.trim().replace(/^\w/, (n)=>n.toUpperCase());
}
function $n(e) {
    return e.split(w).map((n)=>_e(n)).join(w);
}
function Dn(e = (0, _time.FIVE_MINUTES), n) {
    const t = (0, _time.toMiliseconds)(e || (0, _time.FIVE_MINUTES));
    let r, o, s;
    return {
        resolve: (i)=>{
            s && r && (clearTimeout(s), r(i));
        },
        reject: (i)=>{
            s && o && (clearTimeout(s), o(i));
        },
        done: ()=>new Promise((i, c)=>{
                s = setTimeout(()=>{
                    c(new Error(n));
                }, t), r = i, o = c;
            })
    };
}
function jn(e, n) {
    return new Promise(async (t, r)=>{
        const o = setTimeout(()=>r(), n), s = await e;
        clearTimeout(o), t(s);
    });
}
function B(e, n) {
    if (typeof n == "string" && n.startsWith(`${e}:`)) return n;
    if (e.toLowerCase() === "topic") {
        if (typeof n != "string") throw new Error('Value must be "string" for expirer target type: topic');
        return `topic:${n}`;
    } else if (e.toLowerCase() === "id") {
        if (typeof n != "number") throw new Error('Value must be "number" for expirer target type: id');
        return `id:${n}`;
    }
    throw new Error(`Unknown expirer target type: ${e}`);
}
function Vn(e) {
    return B("topic", e);
}
function Mn(e) {
    return B("id", e);
}
function Kn(e) {
    const [n, t] = e.split(":"), r = {
        id: void 0,
        topic: void 0
    };
    if (n === "topic" && typeof t == "string") r.topic = t;
    else if (n === "id" && Number.isInteger(Number(t))) r.id = Number(t);
    else throw new Error(`Invalid target, expected id:number or topic:string, got ${n}:${t}`);
    return r;
}
function kn(e, n) {
    return (0, _time.fromMiliseconds)((n || Date.now()) + (0, _time.toMiliseconds)(e));
}
function Ln(e) {
    return Date.now() >= (0, _time.toMiliseconds)(e);
}
function xn(e, n) {
    return `${e}${n ? `:${n}` : ""}`;
}
const we = "irn";
function Fn(e) {
    return e?.relay || {
        protocol: we
    };
}
function Hn(e) {
    const n = (0, _relayApi.RELAY_JSONRPC)[e];
    if (typeof n > "u") throw new Error(`Relay Protocol not supported: ${e}`);
    return n;
}
var qn = Object.defineProperty, Ce = Object.getOwnPropertySymbols, Bn = Object.prototype.hasOwnProperty, Gn = Object.prototype.propertyIsEnumerable, $e = (e, n, t)=>n in e ? qn(e, n, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[n] = t, zn = (e, n)=>{
    for(var t in n || (n = {}))Bn.call(n, t) && $e(e, t, n[t]);
    if (Ce) for (var t of Ce(n))Gn.call(n, t) && $e(e, t, n[t]);
    return e;
};
function De(e, n = "-") {
    const t = {}, r = "relay" + n;
    return Object.keys(e).forEach((o)=>{
        if (o.startsWith(r)) {
            const s = o.replace(r, ""), i = e[o];
            t[s] = i;
        }
    }), t;
}
function Yn(e) {
    const n = e.indexOf(":"), t = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r = e.substring(0, n), o = e.substring(n + 1, t).split("@"), s = o[0], i = typeof t < "u" ? e.substring(t) : "", c = _queryString.parse(i), u = c.symKey;
    if (u.length !== 64) throw new Error(`Invalid symKey: ${u}`);
    const f = fe(u);
    if (s !== f) throw new Error(`Invalid topic: ${s}`);
    return {
        protocol: r,
        topic: s,
        version: parseInt(o[1], 10),
        symKey: u,
        relay: De(c)
    };
}
function je(e, n = "-") {
    const t = "relay", r = {};
    return Object.keys(e).forEach((o)=>{
        const s = t + n + o;
        e[o] && (r[s] = e[o]);
    }), r;
}
function Wn(e) {
    return `${e.protocol}:${e.topic}@${e.version}?` + _queryString.stringify(zn({
        symKey: e.symKey
    }, je(e.relay)));
}
function O(e) {
    const n = [];
    return e.forEach((t)=>{
        const [r, o] = t.split(":");
        n.push(`${r}:${o}`);
    }), n;
}
function Ve(e) {
    const n = [];
    return Object.values(e).forEach((t)=>{
        n.push(...O(t.accounts));
    }), n;
}
function Me(e, n) {
    const t = [];
    return Object.values(e).forEach((r)=>{
        O(r.accounts).includes(n) && t.push(...r.methods);
    }), t;
}
function Ke(e, n) {
    const t = [];
    return Object.values(e).forEach((r)=>{
        O(r.accounts).includes(n) && t.push(...r.events);
    }), t;
}
function Jn(e, n) {
    const t = Be(e, n);
    if (t) throw new Error(t.message);
    const r = {};
    for (const [o, s] of Object.entries(e))r[o] = {
        methods: s.methods,
        events: s.events,
        chains: s.accounts.map((i)=>`${i.split(":")[0]}:${i.split(":")[1]}`)
    };
    return r;
}
const Qn = {
    INVALID_METHOD: {
        message: "Invalid method.",
        code: 1001
    },
    INVALID_EVENT: {
        message: "Invalid event.",
        code: 1002
    },
    INVALID_UPDATE_REQUEST: {
        message: "Invalid update request.",
        code: 1003
    },
    INVALID_EXTEND_REQUEST: {
        message: "Invalid extend request.",
        code: 1004
    },
    INVALID_SESSION_SETTLE_REQUEST: {
        message: "Invalid session settle request.",
        code: 1005
    },
    UNAUTHORIZED_METHOD: {
        message: "Unauthorized method.",
        code: 3001
    },
    UNAUTHORIZED_EVENT: {
        message: "Unauthorized event.",
        code: 3002
    },
    UNAUTHORIZED_UPDATE_REQUEST: {
        message: "Unauthorized update request.",
        code: 3003
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
        message: "Unauthorized extend request.",
        code: 3004
    },
    USER_REJECTED: {
        message: "User rejected.",
        code: 5e3
    },
    USER_REJECTED_CHAINS: {
        message: "User rejected chains.",
        code: 5001
    },
    USER_REJECTED_METHODS: {
        message: "User rejected methods.",
        code: 5002
    },
    USER_REJECTED_EVENTS: {
        message: "User rejected events.",
        code: 5003
    },
    UNSUPPORTED_CHAINS: {
        message: "Unsupported chains.",
        code: 5100
    },
    UNSUPPORTED_METHODS: {
        message: "Unsupported methods.",
        code: 5101
    },
    UNSUPPORTED_EVENTS: {
        message: "Unsupported events.",
        code: 5102
    },
    UNSUPPORTED_ACCOUNTS: {
        message: "Unsupported accounts.",
        code: 5103
    },
    UNSUPPORTED_NAMESPACE_KEY: {
        message: "Unsupported namespace key.",
        code: 5104
    },
    USER_DISCONNECTED: {
        message: "User disconnected.",
        code: 6e3
    },
    SESSION_SETTLEMENT_FAILED: {
        message: "Session settlement failed.",
        code: 7e3
    },
    WC_METHOD_UNSUPPORTED: {
        message: "Unsupported wc_ method.",
        code: 10001
    }
}, Zn = {
    NOT_INITIALIZED: {
        message: "Not initialized.",
        code: 1
    },
    NO_MATCHING_KEY: {
        message: "No matching key.",
        code: 2
    },
    RESTORE_WILL_OVERRIDE: {
        message: "Restore will override.",
        code: 3
    },
    RESUBSCRIBED: {
        message: "Resubscribed.",
        code: 4
    },
    MISSING_OR_INVALID: {
        message: "Missing or invalid.",
        code: 5
    },
    EXPIRED: {
        message: "Expired.",
        code: 6
    },
    UNKNOWN_TYPE: {
        message: "Unknown type.",
        code: 7
    },
    MISMATCHED_TOPIC: {
        message: "Mismatched topic.",
        code: 8
    },
    NON_CONFORMING_NAMESPACES: {
        message: "Non conforming namespaces.",
        code: 9
    }
};
function h(e, n) {
    const { message: t , code: r  } = Zn[e];
    return {
        message: n ? `${t} ${n}` : t,
        code: r
    };
}
function v(e, n) {
    const { message: t , code: r  } = Qn[e];
    return {
        message: n ? `${t} ${n}` : t,
        code: r
    };
}
function I(e, n) {
    return Array.isArray(e) ? typeof n < "u" && e.length ? e.every(n) : !0 : !1;
}
function G(e) {
    return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function g(e) {
    return typeof e > "u";
}
function l(e, n) {
    return n && g(e) ? !0 : typeof e == "string" && Boolean(e.trim().length);
}
function C(e, n) {
    return n && g(e) ? !0 : typeof e == "number" && !isNaN(e);
}
function Xn(e, n) {
    const { requiredNamespaces: t  } = n, r = Object.keys(e.namespaces), o = Object.keys(t);
    let s = !0;
    return E(o, r) ? (r.forEach((i)=>{
        const { accounts: c , methods: u , events: f  } = e.namespaces[i], y = O(c), a = t[i];
        (!E(U(i, a), y) || !E(a.methods, u) || !E(a.events, f)) && (s = !1);
    }), s) : !1;
}
function $(e) {
    return l(e, !1) && e.includes(":") ? e.split(":").length === 2 : !1;
}
function ke(e) {
    if (l(e, !1) && e.includes(":")) {
        const n = e.split(":");
        if (n.length === 3) {
            const t = n[0] + ":" + n[1];
            return !!n[2] && $(t);
        }
    }
    return !1;
}
function et(e) {
    if (l(e, !1)) try {
        return typeof new URL(e) < "u";
    } catch  {
        return !1;
    }
    return !1;
}
function nt(e) {
    var n;
    return (n = e?.proposer) == null ? void 0 : n.publicKey;
}
function tt(e) {
    return e?.topic;
}
function rt(e, n) {
    let t = null;
    return l(e?.publicKey, !1) || (t = h("MISSING_OR_INVALID", `${n} controller public key should be a string`)), t;
}
function z(e) {
    let n = !0;
    return I(e) ? e.length && (n = e.every((t)=>l(t, !1))) : n = !1, n;
}
function Le(e, n, t) {
    let r = null;
    return I(n) ? n.forEach((o)=>{
        r || (!$(o) || !o.includes(e)) && (r = v("UNSUPPORTED_CHAINS", `${t}, chain ${o} should be a string and conform to "namespace:chainId" format`));
    }) : r = v("UNSUPPORTED_CHAINS", `${t}, chains ${n} should be an array of strings conforming to "namespace:chainId" format`), r;
}
function xe(e, n) {
    let t = null;
    return Object.entries(e).forEach(([r, o])=>{
        if (t) return;
        const s = Le(r, U(r, o), `${n} requiredNamespace`);
        s && (t = s);
    }), t;
}
function Fe(e, n) {
    let t = null;
    return I(e) ? e.forEach((r)=>{
        t || ke(r) || (t = v("UNSUPPORTED_ACCOUNTS", `${n}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
    }) : t = v("UNSUPPORTED_ACCOUNTS", `${n}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function He(e, n) {
    let t = null;
    return Object.values(e).forEach((r)=>{
        if (t) return;
        const o = Fe(r?.accounts, `${n} namespace`);
        o && (t = o);
    }), t;
}
function qe(e, n) {
    let t = null;
    return z(e?.methods) ? z(e?.events) || (t = v("UNSUPPORTED_EVENTS", `${n}, events should be an array of strings or empty array for no events`)) : t = v("UNSUPPORTED_METHODS", `${n}, methods should be an array of strings or empty array for no methods`), t;
}
function Y(e, n) {
    let t = null;
    return Object.values(e).forEach((r)=>{
        if (t) return;
        const o = qe(r, `${n}, namespace`);
        o && (t = o);
    }), t;
}
function ot(e, n, t) {
    let r = null;
    if (e && G(e)) {
        const o = Y(e, n);
        o && (r = o);
        const s = xe(e, n);
        s && (r = s);
    } else r = h("MISSING_OR_INVALID", `${n}, ${t} should be an object with data`);
    return r;
}
function Be(e, n) {
    let t = null;
    if (e && G(e)) {
        const r = Y(e, n);
        r && (t = r);
        const o = He(e, n);
        o && (t = o);
    } else t = h("MISSING_OR_INVALID", `${n}, namespaces should be an object with data`);
    return t;
}
function Ge(e) {
    return l(e.protocol, !0);
}
function st(e, n) {
    let t = !1;
    return n && !e ? t = !0 : e && I(e) && e.length && e.forEach((r)=>{
        t = Ge(r);
    }), t;
}
function it(e) {
    return typeof e == "number";
}
function ct(e) {
    return typeof e < "u" && true;
}
function at(e) {
    return !(!e || typeof e != "object" || !e.code || !C(e.code, !1) || !e.message || !l(e.message, !1));
}
function ut(e) {
    return !(g(e) || !l(e.method, !1));
}
function dt(e) {
    return !(g(e) || g(e.result) && g(e.error) || !C(e.id, !1) || !l(e.jsonrpc, !1));
}
function lt(e) {
    return !(g(e) || !l(e.name, !1));
}
function ft(e, n) {
    return !(!$(n) || !Ve(e).includes(n));
}
function pt(e, n, t) {
    return l(t, !1) ? Me(e, n).includes(t) : !1;
}
function mt(e, n, t) {
    return l(t, !1) ? Ke(e, n).includes(t) : !1;
}
function yt(e, n, t) {
    let r = null;
    const o = Et(e), s = ht(n), i = Object.keys(o), c = Object.keys(s), u = ze(Object.keys(e)), f = ze(Object.keys(n)), y = u.filter((a)=>!f.includes(a));
    return y.length && (r = h("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${y.toString()}
      Received: ${Object.keys(n).toString()}`)), E(i, c) || (r = h("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${i.toString()}
      Approved: ${c.toString()}`)), i.forEach((a)=>{
        r || (E(o[a].methods, s[a].methods) ? E(o[a].events, s[a].events) || (r = h("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${a}`)) : r = h("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${a}`));
    }), r;
}
function Et(e) {
    const n = {};
    return Object.keys(e).forEach((t)=>{
        var r;
        t.includes(":") ? n[t] = e[t] : (r = e[t].chains) == null || r.forEach((o)=>{
            n[o] = {
                methods: e[t].methods,
                events: e[t].events
            };
        });
    }), n;
}
function ze(e) {
    return [
        ...new Set(e.map((n)=>n.includes(":") ? n.split(":")[0] : n))
    ];
}
function ht(e) {
    const n = {};
    return Object.keys(e).forEach((t)=>{
        if (t.includes(":")) n[t] = e[t];
        else {
            const r = O(e[t].accounts);
            r?.forEach((o)=>{
                n[o] = {
                    accounts: e[t].accounts.filter((s)=>s.includes(`${o}:`)),
                    methods: e[t].methods,
                    events: e[t].events
                };
            });
        }
    }), n;
}
function gt(e, n) {
    return C(e, !1) && e <= n.max && e >= n.min;
}

},{"6e394fbcaffe338a":"d5jf4","@stablelib/chacha20poly1305":"lU2zl","@stablelib/hkdf":"6r0oT","@stablelib/random":"9Qs60","@stablelib/sha256":"fPm7j","@stablelib/x25519":"5xoxU","uint8arrays":"ctPgX","detect-browser":"hmXKp","@walletconnect/time":"2hzsP","@walletconnect/window-getters":"chkDr","@walletconnect/window-metadata":"arKN1","query-string":"11cDl","@walletconnect/relay-api":"1SxNf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lU2zl":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var chacha_1 = require("351b322f7e992049");
var poly1305_1 = require("e8f52afabfa64142");
var wipe_1 = require("882c20956547f7e9");
var binary_1 = require("16f89e258e5fb18c");
var constant_time_1 = require("1089f7348a6dbb51");
exports.KEY_LENGTH = 32;
exports.NONCE_LENGTH = 12;
exports.TAG_LENGTH = 16;
var ZEROS = new Uint8Array(16);
/**
 * ChaCha20-Poly1305 Authenticated Encryption with Associated Data.
 *
 * Defined in RFC7539.
 */ var ChaCha20Poly1305 = /** @class */ function() {
    /**
     * Creates a new instance with the given 32-byte key.
     */ function ChaCha20Poly1305(key) {
        this.nonceLength = exports.NONCE_LENGTH;
        this.tagLength = exports.TAG_LENGTH;
        if (key.length !== exports.KEY_LENGTH) throw new Error("ChaCha20Poly1305 needs 32-byte key");
        // Copy key.
        this._key = new Uint8Array(key);
    }
    /**
     * Encrypts and authenticates plaintext, authenticates associated data,
     * and returns sealed ciphertext, which includes authentication tag.
     *
     * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
     * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
     * and nonce.
     *
     * If dst is given (it must be the size of plaintext + the size of tag
     * length) the result will be put into it. Dst and plaintext must not
     * overlap.
     */ ChaCha20Poly1305.prototype.seal = function(nonce, plaintext, associatedData, dst) {
        if (nonce.length > 16) throw new Error("ChaCha20Poly1305: incorrect nonce length");
        // Allocate space for counter, and set nonce as last bytes of it.
        var counter = new Uint8Array(16);
        counter.set(nonce, counter.length - nonce.length);
        // Generate authentication key by taking first 32-bytes of stream.
        // We pass full counter, which has 12-byte nonce and 4-byte block counter,
        // and it will get incremented after generating the block, which is
        // exactly what we need: we only use the first 32 bytes of 64-byte
        // ChaCha block and discard the next 32 bytes.
        var authKey = new Uint8Array(32);
        chacha_1.stream(this._key, counter, authKey, 4);
        // Allocate space for sealed ciphertext.
        var resultLength = plaintext.length + this.tagLength;
        var result;
        if (dst) {
            if (dst.length !== resultLength) throw new Error("ChaCha20Poly1305: incorrect destination length");
            result = dst;
        } else result = new Uint8Array(resultLength);
        // Encrypt plaintext.
        chacha_1.streamXOR(this._key, counter, plaintext, result, 4);
        // Authenticate.
        // XXX: can "simplify" here: pass full result (which is already padded
        // due to zeroes prepared for tag), and ciphertext length instead of
        // subarray of result.
        this._authenticate(result.subarray(result.length - this.tagLength, result.length), authKey, result.subarray(0, result.length - this.tagLength), associatedData);
        // Cleanup.
        wipe_1.wipe(counter);
        return result;
    };
    /**
     * Authenticates sealed ciphertext (which includes authentication tag) and
     * associated data, decrypts ciphertext and returns decrypted plaintext.
     *
     * RFC7539 specifies 12 bytes for nonce. It may be this 12-byte nonce
     * ("IV"), or full 16-byte counter (called "32-bit fixed-common part")
     * and nonce.
     *
     * If authentication fails, it returns null.
     *
     * If dst is given (it must be of ciphertext length minus tag length),
     * the result will be put into it. Dst and plaintext must not overlap.
     */ ChaCha20Poly1305.prototype.open = function(nonce, sealed, associatedData, dst) {
        if (nonce.length > 16) throw new Error("ChaCha20Poly1305: incorrect nonce length");
        // Sealed ciphertext should at least contain tag.
        if (sealed.length < this.tagLength) // TODO(dchest): should we throw here instead?
        return null;
        // Allocate space for counter, and set nonce as last bytes of it.
        var counter = new Uint8Array(16);
        counter.set(nonce, counter.length - nonce.length);
        // Generate authentication key by taking first 32-bytes of stream.
        var authKey = new Uint8Array(32);
        chacha_1.stream(this._key, counter, authKey, 4);
        // Authenticate.
        // XXX: can simplify and avoid allocation: since authenticate()
        // already allocates tag (from Poly1305.digest(), it can return)
        // it instead of copying to calculatedTag. But then in seal()
        // we'll need to copy it.
        var calculatedTag = new Uint8Array(this.tagLength);
        this._authenticate(calculatedTag, authKey, sealed.subarray(0, sealed.length - this.tagLength), associatedData);
        // Constant-time compare tags and return null if they differ.
        if (!constant_time_1.equal(calculatedTag, sealed.subarray(sealed.length - this.tagLength, sealed.length))) return null;
        // Allocate space for decrypted plaintext.
        var resultLength = sealed.length - this.tagLength;
        var result;
        if (dst) {
            if (dst.length !== resultLength) throw new Error("ChaCha20Poly1305: incorrect destination length");
            result = dst;
        } else result = new Uint8Array(resultLength);
        // Decrypt.
        chacha_1.streamXOR(this._key, counter, sealed.subarray(0, sealed.length - this.tagLength), result, 4);
        // Cleanup.
        wipe_1.wipe(counter);
        return result;
    };
    ChaCha20Poly1305.prototype.clean = function() {
        wipe_1.wipe(this._key);
        return this;
    };
    ChaCha20Poly1305.prototype._authenticate = function(tagOut, authKey, ciphertext, associatedData) {
        // Initialize Poly1305 with authKey.
        var h = new poly1305_1.Poly1305(authKey);
        // Authenticate padded associated data.
        if (associatedData) {
            h.update(associatedData);
            if (associatedData.length % 16 > 0) h.update(ZEROS.subarray(associatedData.length % 16));
        }
        // Authenticate padded ciphertext.
        h.update(ciphertext);
        if (ciphertext.length % 16 > 0) h.update(ZEROS.subarray(ciphertext.length % 16));
        // Authenticate length of associated data.
        // XXX: can avoid allocation here?
        var length = new Uint8Array(8);
        if (associatedData) binary_1.writeUint64LE(associatedData.length, length);
        h.update(length);
        // Authenticate length of ciphertext.
        binary_1.writeUint64LE(ciphertext.length, length);
        h.update(length);
        // Get tag and copy it into tagOut.
        var tag = h.digest();
        for(var i = 0; i < tag.length; i++)tagOut[i] = tag[i];
        // Cleanup.
        h.clean();
        wipe_1.wipe(tag);
        wipe_1.wipe(length);
    };
    return ChaCha20Poly1305;
}();
exports.ChaCha20Poly1305 = ChaCha20Poly1305;

},{"351b322f7e992049":"kgOXq","e8f52afabfa64142":"hOj7F","882c20956547f7e9":"8owN2","16f89e258e5fb18c":"92RWm","1089f7348a6dbb51":"ccTzW"}],"kgOXq":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package chacha implements ChaCha stream cipher.
 */ var binary_1 = require("bf720982d902f656");
var wipe_1 = require("5a7983e8f1f63ac7");
// Number of ChaCha rounds (ChaCha20).
var ROUNDS = 20;
// Applies the ChaCha core function to 16-byte input,
// 32-byte key key, and puts the result into 64-byte array out.
function core(out, input, key) {
    var j0 = 0x61707865; // "expa"  -- ChaCha's "sigma" constant
    var j1 = 0x3320646E; // "nd 3"     for 32-byte keys
    var j2 = 0x79622D32; // "2-by"
    var j3 = 0x6B206574; // "te k"
    var j4 = key[3] << 24 | key[2] << 16 | key[1] << 8 | key[0];
    var j5 = key[7] << 24 | key[6] << 16 | key[5] << 8 | key[4];
    var j6 = key[11] << 24 | key[10] << 16 | key[9] << 8 | key[8];
    var j7 = key[15] << 24 | key[14] << 16 | key[13] << 8 | key[12];
    var j8 = key[19] << 24 | key[18] << 16 | key[17] << 8 | key[16];
    var j9 = key[23] << 24 | key[22] << 16 | key[21] << 8 | key[20];
    var j10 = key[27] << 24 | key[26] << 16 | key[25] << 8 | key[24];
    var j11 = key[31] << 24 | key[30] << 16 | key[29] << 8 | key[28];
    var j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
    var j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
    var j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
    var j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
    var x0 = j0;
    var x1 = j1;
    var x2 = j2;
    var x3 = j3;
    var x4 = j4;
    var x5 = j5;
    var x6 = j6;
    var x7 = j7;
    var x8 = j8;
    var x9 = j9;
    var x10 = j10;
    var x11 = j11;
    var x12 = j12;
    var x13 = j13;
    var x14 = j14;
    var x15 = j15;
    for(var i = 0; i < ROUNDS; i += 2){
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 16 | x12 << 16;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 20 | x4 << 12;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 16 | x13 << 16;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 20 | x5 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 16 | x14 << 16;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 20 | x6 << 12;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 16 | x15 << 16;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 20 | x7 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 24 | x14 << 8;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 25 | x6 << 7;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 24 | x15 << 8;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 25 | x7 << 7;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 24 | x13 << 8;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 25 | x5 << 7;
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 24 | x12 << 8;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 25 | x4 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 16 | x15 << 16;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 20 | x5 << 12;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 16 | x12 << 16;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 20 | x6 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 16 | x13 << 16;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 20 | x7 << 12;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 16 | x14 << 16;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 20 | x4 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 24 | x13 << 8;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 25 | x7 << 7;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 24 | x14 << 8;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 25 | x4 << 7;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 24 | x12 << 8;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 25 | x6 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 24 | x15 << 8;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 25 | x5 << 7;
    }
    binary_1.writeUint32LE(x0 + j0 | 0, out, 0);
    binary_1.writeUint32LE(x1 + j1 | 0, out, 4);
    binary_1.writeUint32LE(x2 + j2 | 0, out, 8);
    binary_1.writeUint32LE(x3 + j3 | 0, out, 12);
    binary_1.writeUint32LE(x4 + j4 | 0, out, 16);
    binary_1.writeUint32LE(x5 + j5 | 0, out, 20);
    binary_1.writeUint32LE(x6 + j6 | 0, out, 24);
    binary_1.writeUint32LE(x7 + j7 | 0, out, 28);
    binary_1.writeUint32LE(x8 + j8 | 0, out, 32);
    binary_1.writeUint32LE(x9 + j9 | 0, out, 36);
    binary_1.writeUint32LE(x10 + j10 | 0, out, 40);
    binary_1.writeUint32LE(x11 + j11 | 0, out, 44);
    binary_1.writeUint32LE(x12 + j12 | 0, out, 48);
    binary_1.writeUint32LE(x13 + j13 | 0, out, 52);
    binary_1.writeUint32LE(x14 + j14 | 0, out, 56);
    binary_1.writeUint32LE(x15 + j15 | 0, out, 60);
}
/**
 * Encrypt src with ChaCha20 stream generated for the given 32-byte key and
 * 8-byte (as in original implementation) or 12-byte (as in RFC7539) nonce and
 * write the result into dst and return it.
 *
 * dst and src may be the same, but otherwise must not overlap.
 *
 * If nonce is 12 bytes, users should not encrypt more than 256 GiB with the
 * same key and nonce, otherwise the stream will repeat. The function will
 * throw error if counter overflows to prevent this.
 *
 * If nonce is 8 bytes, the output is practically unlimited (2^70 bytes, which
 * is more than a million petabytes). However, it is not recommended to
 * generate 8-byte nonces randomly, as the chance of collision is high.
 *
 * Never use the same key and nonce to encrypt more than one message.
 *
 * If nonceInplaceCounterLength is not 0, the nonce is assumed to be a 16-byte
 * array with stream counter in first nonceInplaceCounterLength bytes and nonce
 * in the last remaining bytes. The counter will be incremented inplace for
 * each ChaCha block. This is useful if you need to encrypt one stream of data
 * in chunks.
 */ function streamXOR(key, nonce, src, dst, nonceInplaceCounterLength) {
    if (nonceInplaceCounterLength === void 0) nonceInplaceCounterLength = 0;
    // We only support 256-bit keys.
    if (key.length !== 32) throw new Error("ChaCha: key size must be 32 bytes");
    if (dst.length < src.length) throw new Error("ChaCha: destination is shorter than source");
    var nc;
    var counterLength;
    if (nonceInplaceCounterLength === 0) {
        if (nonce.length !== 8 && nonce.length !== 12) throw new Error("ChaCha nonce must be 8 or 12 bytes");
        nc = new Uint8Array(16);
        // First counterLength bytes of nc are counter, starting with zero.
        counterLength = nc.length - nonce.length;
        // Last bytes of nc after counterLength are nonce, set them.
        nc.set(nonce, counterLength);
    } else {
        if (nonce.length !== 16) throw new Error("ChaCha nonce with counter must be 16 bytes");
        // This will update passed nonce with counter inplace.
        nc = nonce;
        counterLength = nonceInplaceCounterLength;
    }
    // Allocate temporary space for ChaCha block.
    var block = new Uint8Array(64);
    for(var i = 0; i < src.length; i += 64){
        // Generate a block.
        core(block, nc, key);
        // XOR block bytes with src into dst.
        for(var j = i; j < i + 64 && j < src.length; j++)dst[j] = src[j] ^ block[j - i];
        // Increment counter.
        incrementCounter(nc, 0, counterLength);
    }
    // Cleanup temporary space.
    wipe_1.wipe(block);
    if (nonceInplaceCounterLength === 0) // Cleanup counter.
    wipe_1.wipe(nc);
    return dst;
}
exports.streamXOR = streamXOR;
/**
 * Generate ChaCha20 stream for the given 32-byte key and 8-byte or 12-byte
 * nonce and write it into dst and return it.
 *
 * Never use the same key and nonce to generate more than one stream.
 *
 * If nonceInplaceCounterLength is not 0, it behaves the same with respect to
 * the nonce as described in the streamXOR documentation.
 *
 * stream is like streamXOR with all-zero src.
 */ function stream(key, nonce, dst, nonceInplaceCounterLength) {
    if (nonceInplaceCounterLength === void 0) nonceInplaceCounterLength = 0;
    wipe_1.wipe(dst);
    return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
}
exports.stream = stream;
function incrementCounter(counter, pos, len) {
    var carry = 1;
    while(len--){
        carry = carry + (counter[pos] & 0xff) | 0;
        counter[pos] = carry & 0xff;
        carry >>>= 8;
        pos++;
    }
    if (carry > 0) throw new Error("ChaCha: counter overflow");
}

},{"bf720982d902f656":"92RWm","5a7983e8f1f63ac7":"8owN2"}],"hOj7F":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package poly1305 implements Poly1305 one-time message authentication algorithm.
 */ var constant_time_1 = require("b8a53dab2fdef533");
var wipe_1 = require("538b0790592509b4");
exports.DIGEST_LENGTH = 16;
// Port of Andrew Moon's Poly1305-donna-16. Public domain.
// https://github.com/floodyberry/poly1305-donna
/**
 * Poly1305 computes 16-byte authenticator of message using
 * a one-time 32-byte key.
 *
 * Important: key should be used for only one message,
 * it should never repeat.
 */ var Poly1305 = /** @class */ function() {
    function Poly1305(key) {
        this.digestLength = exports.DIGEST_LENGTH;
        this._buffer = new Uint8Array(16);
        this._r = new Uint16Array(10);
        this._h = new Uint16Array(10);
        this._pad = new Uint16Array(8);
        this._leftover = 0;
        this._fin = 0;
        this._finished = false;
        var t0 = key[0] | key[1] << 8;
        this._r[0] = t0 & 0x1fff;
        var t1 = key[2] | key[3] << 8;
        this._r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
        var t2 = key[4] | key[5] << 8;
        this._r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
        var t3 = key[6] | key[7] << 8;
        this._r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
        var t4 = key[8] | key[9] << 8;
        this._r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
        this._r[5] = t4 >>> 1 & 0x1ffe;
        var t5 = key[10] | key[11] << 8;
        this._r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
        var t6 = key[12] | key[13] << 8;
        this._r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
        var t7 = key[14] | key[15] << 8;
        this._r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
        this._r[9] = t7 >>> 5 & 0x007f;
        this._pad[0] = key[16] | key[17] << 8;
        this._pad[1] = key[18] | key[19] << 8;
        this._pad[2] = key[20] | key[21] << 8;
        this._pad[3] = key[22] | key[23] << 8;
        this._pad[4] = key[24] | key[25] << 8;
        this._pad[5] = key[26] | key[27] << 8;
        this._pad[6] = key[28] | key[29] << 8;
        this._pad[7] = key[30] | key[31] << 8;
    }
    Poly1305.prototype._blocks = function(m, mpos, bytes) {
        var hibit = this._fin ? 0 : 2048;
        var h0 = this._h[0], h1 = this._h[1], h2 = this._h[2], h3 = this._h[3], h4 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
        var r0 = this._r[0], r1 = this._r[1], r2 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
        while(bytes >= 16){
            var t0 = m[mpos + 0] | m[mpos + 1] << 8;
            h0 += t0 & 0x1fff;
            var t1 = m[mpos + 2] | m[mpos + 3] << 8;
            h1 += (t0 >>> 13 | t1 << 3) & 0x1fff;
            var t2 = m[mpos + 4] | m[mpos + 5] << 8;
            h2 += (t1 >>> 10 | t2 << 6) & 0x1fff;
            var t3 = m[mpos + 6] | m[mpos + 7] << 8;
            h3 += (t2 >>> 7 | t3 << 9) & 0x1fff;
            var t4 = m[mpos + 8] | m[mpos + 9] << 8;
            h4 += (t3 >>> 4 | t4 << 12) & 0x1fff;
            h5 += t4 >>> 1 & 0x1fff;
            var t5 = m[mpos + 10] | m[mpos + 11] << 8;
            h6 += (t4 >>> 14 | t5 << 2) & 0x1fff;
            var t6 = m[mpos + 12] | m[mpos + 13] << 8;
            h7 += (t5 >>> 11 | t6 << 5) & 0x1fff;
            var t7 = m[mpos + 14] | m[mpos + 15] << 8;
            h8 += (t6 >>> 8 | t7 << 8) & 0x1fff;
            h9 += t7 >>> 5 | hibit;
            var c = 0;
            var d0 = c;
            d0 += h0 * r0;
            d0 += h1 * (5 * r9);
            d0 += h2 * (5 * r8);
            d0 += h3 * (5 * r7);
            d0 += h4 * (5 * r6);
            c = d0 >>> 13;
            d0 &= 0x1fff;
            d0 += h5 * (5 * r5);
            d0 += h6 * (5 * r4);
            d0 += h7 * (5 * r3);
            d0 += h8 * (5 * r2);
            d0 += h9 * (5 * r1);
            c += d0 >>> 13;
            d0 &= 0x1fff;
            var d1 = c;
            d1 += h0 * r1;
            d1 += h1 * r0;
            d1 += h2 * (5 * r9);
            d1 += h3 * (5 * r8);
            d1 += h4 * (5 * r7);
            c = d1 >>> 13;
            d1 &= 0x1fff;
            d1 += h5 * (5 * r6);
            d1 += h6 * (5 * r5);
            d1 += h7 * (5 * r4);
            d1 += h8 * (5 * r3);
            d1 += h9 * (5 * r2);
            c += d1 >>> 13;
            d1 &= 0x1fff;
            var d2 = c;
            d2 += h0 * r2;
            d2 += h1 * r1;
            d2 += h2 * r0;
            d2 += h3 * (5 * r9);
            d2 += h4 * (5 * r8);
            c = d2 >>> 13;
            d2 &= 0x1fff;
            d2 += h5 * (5 * r7);
            d2 += h6 * (5 * r6);
            d2 += h7 * (5 * r5);
            d2 += h8 * (5 * r4);
            d2 += h9 * (5 * r3);
            c += d2 >>> 13;
            d2 &= 0x1fff;
            var d3 = c;
            d3 += h0 * r3;
            d3 += h1 * r2;
            d3 += h2 * r1;
            d3 += h3 * r0;
            d3 += h4 * (5 * r9);
            c = d3 >>> 13;
            d3 &= 0x1fff;
            d3 += h5 * (5 * r8);
            d3 += h6 * (5 * r7);
            d3 += h7 * (5 * r6);
            d3 += h8 * (5 * r5);
            d3 += h9 * (5 * r4);
            c += d3 >>> 13;
            d3 &= 0x1fff;
            var d4 = c;
            d4 += h0 * r4;
            d4 += h1 * r3;
            d4 += h2 * r2;
            d4 += h3 * r1;
            d4 += h4 * r0;
            c = d4 >>> 13;
            d4 &= 0x1fff;
            d4 += h5 * (5 * r9);
            d4 += h6 * (5 * r8);
            d4 += h7 * (5 * r7);
            d4 += h8 * (5 * r6);
            d4 += h9 * (5 * r5);
            c += d4 >>> 13;
            d4 &= 0x1fff;
            var d5 = c;
            d5 += h0 * r5;
            d5 += h1 * r4;
            d5 += h2 * r3;
            d5 += h3 * r2;
            d5 += h4 * r1;
            c = d5 >>> 13;
            d5 &= 0x1fff;
            d5 += h5 * r0;
            d5 += h6 * (5 * r9);
            d5 += h7 * (5 * r8);
            d5 += h8 * (5 * r7);
            d5 += h9 * (5 * r6);
            c += d5 >>> 13;
            d5 &= 0x1fff;
            var d6 = c;
            d6 += h0 * r6;
            d6 += h1 * r5;
            d6 += h2 * r4;
            d6 += h3 * r3;
            d6 += h4 * r2;
            c = d6 >>> 13;
            d6 &= 0x1fff;
            d6 += h5 * r1;
            d6 += h6 * r0;
            d6 += h7 * (5 * r9);
            d6 += h8 * (5 * r8);
            d6 += h9 * (5 * r7);
            c += d6 >>> 13;
            d6 &= 0x1fff;
            var d7 = c;
            d7 += h0 * r7;
            d7 += h1 * r6;
            d7 += h2 * r5;
            d7 += h3 * r4;
            d7 += h4 * r3;
            c = d7 >>> 13;
            d7 &= 0x1fff;
            d7 += h5 * r2;
            d7 += h6 * r1;
            d7 += h7 * r0;
            d7 += h8 * (5 * r9);
            d7 += h9 * (5 * r8);
            c += d7 >>> 13;
            d7 &= 0x1fff;
            var d8 = c;
            d8 += h0 * r8;
            d8 += h1 * r7;
            d8 += h2 * r6;
            d8 += h3 * r5;
            d8 += h4 * r4;
            c = d8 >>> 13;
            d8 &= 0x1fff;
            d8 += h5 * r3;
            d8 += h6 * r2;
            d8 += h7 * r1;
            d8 += h8 * r0;
            d8 += h9 * (5 * r9);
            c += d8 >>> 13;
            d8 &= 0x1fff;
            var d9 = c;
            d9 += h0 * r9;
            d9 += h1 * r8;
            d9 += h2 * r7;
            d9 += h3 * r6;
            d9 += h4 * r5;
            c = d9 >>> 13;
            d9 &= 0x1fff;
            d9 += h5 * r4;
            d9 += h6 * r3;
            d9 += h7 * r2;
            d9 += h8 * r1;
            d9 += h9 * r0;
            c += d9 >>> 13;
            d9 &= 0x1fff;
            c = (c << 2) + c | 0;
            c = c + d0 | 0;
            d0 = c & 0x1fff;
            c = c >>> 13;
            d1 += c;
            h0 = d0;
            h1 = d1;
            h2 = d2;
            h3 = d3;
            h4 = d4;
            h5 = d5;
            h6 = d6;
            h7 = d7;
            h8 = d8;
            h9 = d9;
            mpos += 16;
            bytes -= 16;
        }
        this._h[0] = h0;
        this._h[1] = h1;
        this._h[2] = h2;
        this._h[3] = h3;
        this._h[4] = h4;
        this._h[5] = h5;
        this._h[6] = h6;
        this._h[7] = h7;
        this._h[8] = h8;
        this._h[9] = h9;
    };
    Poly1305.prototype.finish = function(mac, macpos) {
        if (macpos === void 0) macpos = 0;
        var g = new Uint16Array(10);
        var c;
        var mask;
        var f;
        var i;
        if (this._leftover) {
            i = this._leftover;
            this._buffer[i++] = 1;
            for(; i < 16; i++)this._buffer[i] = 0;
            this._fin = 1;
            this._blocks(this._buffer, 0, 16);
        }
        c = this._h[1] >>> 13;
        this._h[1] &= 0x1fff;
        for(i = 2; i < 10; i++){
            this._h[i] += c;
            c = this._h[i] >>> 13;
            this._h[i] &= 0x1fff;
        }
        this._h[0] += c * 5;
        c = this._h[0] >>> 13;
        this._h[0] &= 0x1fff;
        this._h[1] += c;
        c = this._h[1] >>> 13;
        this._h[1] &= 0x1fff;
        this._h[2] += c;
        g[0] = this._h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 0x1fff;
        for(i = 1; i < 10; i++){
            g[i] = this._h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 0x1fff;
        }
        g[9] -= 8192;
        mask = (c ^ 1) - 1;
        for(i = 0; i < 10; i++)g[i] &= mask;
        mask = ~mask;
        for(i = 0; i < 10; i++)this._h[i] = this._h[i] & mask | g[i];
        this._h[0] = (this._h[0] | this._h[1] << 13) & 0xffff;
        this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 0xffff;
        this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 0xffff;
        this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 0xffff;
        this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 0xffff;
        this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 0xffff;
        this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 0xffff;
        this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 0xffff;
        f = this._h[0] + this._pad[0];
        this._h[0] = f & 0xffff;
        for(i = 1; i < 8; i++){
            f = (this._h[i] + this._pad[i] | 0) + (f >>> 16) | 0;
            this._h[i] = f & 0xffff;
        }
        mac[macpos + 0] = this._h[0] >>> 0;
        mac[macpos + 1] = this._h[0] >>> 8;
        mac[macpos + 2] = this._h[1] >>> 0;
        mac[macpos + 3] = this._h[1] >>> 8;
        mac[macpos + 4] = this._h[2] >>> 0;
        mac[macpos + 5] = this._h[2] >>> 8;
        mac[macpos + 6] = this._h[3] >>> 0;
        mac[macpos + 7] = this._h[3] >>> 8;
        mac[macpos + 8] = this._h[4] >>> 0;
        mac[macpos + 9] = this._h[4] >>> 8;
        mac[macpos + 10] = this._h[5] >>> 0;
        mac[macpos + 11] = this._h[5] >>> 8;
        mac[macpos + 12] = this._h[6] >>> 0;
        mac[macpos + 13] = this._h[6] >>> 8;
        mac[macpos + 14] = this._h[7] >>> 0;
        mac[macpos + 15] = this._h[7] >>> 8;
        this._finished = true;
        return this;
    };
    Poly1305.prototype.update = function(m) {
        var mpos = 0;
        var bytes = m.length;
        var want;
        if (this._leftover) {
            want = 16 - this._leftover;
            if (want > bytes) want = bytes;
            for(var i = 0; i < want; i++)this._buffer[this._leftover + i] = m[mpos + i];
            bytes -= want;
            mpos += want;
            this._leftover += want;
            if (this._leftover < 16) return this;
            this._blocks(this._buffer, 0, 16);
            this._leftover = 0;
        }
        if (bytes >= 16) {
            want = bytes - bytes % 16;
            this._blocks(m, mpos, want);
            mpos += want;
            bytes -= want;
        }
        if (bytes) {
            for(var i = 0; i < bytes; i++)this._buffer[this._leftover + i] = m[mpos + i];
            this._leftover += bytes;
        }
        return this;
    };
    Poly1305.prototype.digest = function() {
        // TODO(dchest): it behaves differently than other hashes/HMAC,
        // because it throws when finished — others just return saved result.
        if (this._finished) throw new Error("Poly1305 was finished");
        var mac = new Uint8Array(16);
        this.finish(mac);
        return mac;
    };
    Poly1305.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._r);
        wipe_1.wipe(this._h);
        wipe_1.wipe(this._pad);
        this._leftover = 0;
        this._fin = 0;
        this._finished = true; // mark as finished even if not
        return this;
    };
    return Poly1305;
}();
exports.Poly1305 = Poly1305;
/**
 * Returns 16-byte authenticator of data using a one-time 32-byte key.
 *
 * Important: key should be used for only one message, it should never repeat.
 */ function oneTimeAuth(key, data) {
    var h = new Poly1305(key);
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.oneTimeAuth = oneTimeAuth;
/**
 * Returns true if two authenticators are 16-byte long and equal.
 * Uses contant-time comparison to avoid leaking timing information.
 */ function equal(a, b) {
    if (a.length !== exports.DIGEST_LENGTH || b.length !== exports.DIGEST_LENGTH) return false;
    return constant_time_1.equal(a, b);
}
exports.equal = equal;

},{"b8a53dab2fdef533":"ccTzW","538b0790592509b4":"8owN2"}],"ccTzW":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package constant-time provides functions for performing algorithmically constant-time operations.
 */ /**
 * NOTE! Due to the inability to guarantee real constant time evaluation of
 * anything in JavaScript VM, this is module is the best effort.
 */ /**
 * Returns resultIfOne if subject is 1, or resultIfZero if subject is 0.
 *
 * Supports only 32-bit integers, so resultIfOne or resultIfZero are not
 * integers, they'll be converted to them with bitwise operations.
 */ function select(subject, resultIfOne, resultIfZero) {
    return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
}
exports.select = select;
/**
 * Returns 1 if a <= b, or 0 if not.
 * Arguments must be positive 32-bit integers less than or equal to 2^31 - 1.
 */ function lessOrEqual(a, b) {
    return (a | 0) - (b | 0) - 1 >>> 31 & 1;
}
exports.lessOrEqual = lessOrEqual;
/**
 * Returns 1 if a and b are of equal length and their contents
 * are equal, or 0 otherwise.
 *
 * Note that unlike in equal(), zero-length inputs are considered
 * the same, so this function will return 1.
 */ function compare(a, b) {
    if (a.length !== b.length) return 0;
    var result = 0;
    for(var i = 0; i < a.length; i++)result |= a[i] ^ b[i];
    return 1 & result - 1 >>> 8;
}
exports.compare = compare;
/**
 * Returns true if a and b are of equal non-zero length,
 * and their contents are equal, or false otherwise.
 *
 * Note that unlike in compare() zero-length inputs are considered
 * _not_ equal, so this function will return false.
 */ function equal(a, b) {
    if (a.length === 0 || b.length === 0) return false;
    return compare(a, b) !== 0;
}
exports.equal = equal;

},{}],"6r0oT":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var hmac_1 = require("d3b95c45521311ea");
var wipe_1 = require("bc5002cb4c162af1");
/**
 * HMAC-based Extract-and-Expand Key Derivation Function.
 *
 * Implements HKDF from RFC5869.
 *
 * Expands the given master key with salt and info into
 * a limited stream of key material.
 */ var HKDF = /** @class */ function() {
    /**
     * Create a new HKDF instance for the given hash function
     * with the master key, optional salt, and info.
     *
     * - Master key is a high-entropy secret key (not a password).
     * - Salt is a non-secret random value.
     * - Info is application- and/or context-specific information.
     */ function HKDF(hash, key, salt, info) {
        if (salt === void 0) salt = new Uint8Array(0);
        this._counter = new Uint8Array(1); // starts with zero
        this._hash = hash;
        this._info = info;
        // HKDF-Extract uses salt as HMAC key, and key as data.
        var okm = hmac_1.hmac(this._hash, salt, key);
        // Initialize HMAC for expanding with extracted key.
        this._hmac = new hmac_1.HMAC(hash, okm);
        // Allocate buffer.
        this._buffer = new Uint8Array(this._hmac.digestLength);
        this._bufpos = this._buffer.length;
    }
    // Fill buffer with new block of HKDF-Extract output.
    HKDF.prototype._fillBuffer = function() {
        // Increment counter.
        this._counter[0]++;
        var ctr = this._counter[0];
        // Check if counter overflowed.
        if (ctr === 0) throw new Error("hkdf: cannot expand more");
        // Prepare HMAC instance for new data with old key.
        this._hmac.reset();
        // Hash in previous output if it was generated
        // (i.e. counter is greater than 1).
        if (ctr > 1) this._hmac.update(this._buffer);
        // Hash in info if it exists.
        if (this._info) this._hmac.update(this._info);
        // Hash in the counter.
        this._hmac.update(this._counter);
        // Output result to buffer and clean HMAC instance.
        this._hmac.finish(this._buffer);
        // Reset buffer position.
        this._bufpos = 0;
    };
    /**
     * Expand returns next key material of the given length.
     *
     * It throws if expansion limit is reached (which is
     * 254 digests of the underlying HMAC function).
     */ HKDF.prototype.expand = function(length) {
        var out = new Uint8Array(length);
        for(var i = 0; i < out.length; i++){
            if (this._bufpos === this._buffer.length) this._fillBuffer();
            out[i] = this._buffer[this._bufpos++];
        }
        return out;
    };
    HKDF.prototype.clean = function() {
        this._hmac.clean();
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._counter);
        this._bufpos = 0;
    };
    return HKDF;
}();
exports.HKDF = HKDF; // TODO(dchest): maybe implement deriveKey?

},{"d3b95c45521311ea":"hAdnx","bc5002cb4c162af1":"8owN2"}],"hAdnx":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Package hmac implements HMAC algorithm.
 */ var hash_1 = require("3c3dc2244dbb4d3e");
var constant_time_1 = require("b586ea765e257f1a");
var wipe_1 = require("95df565e275c4a8e");
/**
 *  HMAC implements hash-based message authentication algorithm.
 */ var HMAC = /** @class */ function() {
    /**
     * Constructs a new HMAC with the given Hash and secret key.
     */ function HMAC(hash, key) {
        this._finished = false; // true if HMAC was finalized
        // Initialize inner and outer hashes.
        this._inner = new hash();
        this._outer = new hash();
        // Set block and digest sizes for this HMAC
        // instance to values from the hash.
        this.blockSize = this._outer.blockSize;
        this.digestLength = this._outer.digestLength;
        // Pad temporary stores a key (or its hash) padded with zeroes.
        var pad = new Uint8Array(this.blockSize);
        if (key.length > this.blockSize) // If key is bigger than hash block size, it must be
        // hashed and this hash is used as a key instead.
        this._inner.update(key).finish(pad).clean();
        else // Otherwise, copy the key into pad.
        pad.set(key);
        // Now two different keys are derived from padded key
        // by xoring a different byte value to each.
        // To make inner hash key, xor byte 0x36 into pad.
        for(var i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        // Update inner hash with the result.
        this._inner.update(pad);
        // To make outer hash key, xor byte 0x5c into pad.
        // But since we already xored 0x36 there, we must
        // first undo this by xoring it again.
        for(var i = 0; i < pad.length; i++)pad[i] ^= 106;
        // Update outer hash with the result.
        this._outer.update(pad);
        // Save states of both hashes, so that we can quickly restore
        // them later in reset() without the need to remember the actual
        // key and perform this initialization again.
        if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {
            this._innerKeyedState = this._inner.saveState();
            this._outerKeyedState = this._outer.saveState();
        }
        // Clean pad.
        wipe_1.wipe(pad);
    }
    /**
     * Returns HMAC state to the state initialized with key
     * to make it possible to run HMAC over the other data with the same
     * key without creating a new instance.
     */ HMAC.prototype.reset = function() {
        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
        // Restore keyed states of inner and outer hashes.
        this._inner.restoreState(this._innerKeyedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
    };
    /**
     * Cleans HMAC state.
     */ HMAC.prototype.clean = function() {
        if (hash_1.isSerializableHash(this._inner)) this._inner.cleanSavedState(this._innerKeyedState);
        if (hash_1.isSerializableHash(this._outer)) this._outer.cleanSavedState(this._outerKeyedState);
        this._inner.clean();
        this._outer.clean();
    };
    /**
     * Updates state with provided data.
     */ HMAC.prototype.update = function(data) {
        this._inner.update(data);
        return this;
    };
    /**
     * Finalizes HMAC and puts the result in out.
     */ HMAC.prototype.finish = function(out) {
        if (this._finished) {
            // If HMAC was finalized, outer hash is also finalized,
            // so it produces the same digest it produced when it
            // was finalized.
            this._outer.finish(out);
            return this;
        }
        // Finalize inner hash and store the result temporarily.
        this._inner.finish(out);
        // Update outer hash with digest of inner hash and and finalize it.
        this._outer.update(out.subarray(0, this.digestLength)).finish(out);
        this._finished = true;
        return this;
    };
    /**
     * Returns the computed message authentication code.
     */ HMAC.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    };
    /**
     * Saves HMAC state.
     * This function is needed for PBKDF2 optimization.
     */ HMAC.prototype.saveState = function() {
        if (!hash_1.isSerializableHash(this._inner)) throw new Error("hmac: can't saveState() because hash doesn't implement it");
        return this._inner.saveState();
    };
    HMAC.prototype.restoreState = function(savedState) {
        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) throw new Error("hmac: can't restoreState() because hash doesn't implement it");
        this._inner.restoreState(savedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
    };
    HMAC.prototype.cleanSavedState = function(savedState) {
        if (!hash_1.isSerializableHash(this._inner)) throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
        this._inner.cleanSavedState(savedState);
    };
    return HMAC;
}();
exports.HMAC = HMAC;
/**
 * Returns HMAC using the given hash constructor for the key over data.
 */ function hmac(hash, key, data) {
    var h = new HMAC(hash, key);
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.hmac = hmac;
/**
 * Returns true if two HMAC digests are equal.
 * Uses constant-time comparison to avoid leaking timing information.
 *
 * Example:
 *
 *    const receivedDigest = ...
 *    const realDigest = hmac(SHA256, key, data);
 *    if (!equal(receivedDigest, realDigest)) {
 *        throw new Error("Authentication error");
 *    }
 */ exports.equal = constant_time_1.equal;

},{"3c3dc2244dbb4d3e":"5mYqj","b586ea765e257f1a":"ccTzW","95df565e275c4a8e":"8owN2"}],"5mYqj":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
function isSerializableHash(h) {
    return typeof h.saveState !== "undefined" && typeof h.restoreState !== "undefined" && typeof h.cleanSavedState !== "undefined";
}
exports.isSerializableHash = isSerializableHash; // TODO(dchest): figure out the standardized interface for XOF such as
 // SHAKE and BLAKE2X.

},{}],"fPm7j":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
var binary_1 = require("1250d54beeebaf4c");
var wipe_1 = require("32bb055f5ba8e49");
exports.DIGEST_LENGTH = 32;
exports.BLOCK_SIZE = 64;
/**
 * SHA2-256 cryptographic hash algorithm.
 */ var SHA256 = /** @class */ function() {
    function SHA256() {
        /** Length of hash output */ this.digestLength = exports.DIGEST_LENGTH;
        /** Block size */ this.blockSize = exports.BLOCK_SIZE;
        // Note: Int32Array is used instead of Uint32Array for performance reasons.
        this._state = new Int32Array(8); // hash state
        this._temp = new Int32Array(64); // temporary state
        this._buffer = new Uint8Array(128); // buffer for data to hash
        this._bufferLength = 0; // number of bytes in buffer
        this._bytesHashed = 0; // number of total bytes hashed
        this._finished = false; // indicates whether the hash was finalized
        this.reset();
    }
    SHA256.prototype._initState = function() {
        this._state[0] = 0x6a09e667;
        this._state[1] = 0xbb67ae85;
        this._state[2] = 0x3c6ef372;
        this._state[3] = 0xa54ff53a;
        this._state[4] = 0x510e527f;
        this._state[5] = 0x9b05688c;
        this._state[6] = 0x1f83d9ab;
        this._state[7] = 0x5be0cd19;
    };
    /**
     * Resets hash state making it possible
     * to re-use this instance to hash other data.
     */ SHA256.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
    };
    /**
     * Cleans internal buffers and resets hash state.
     */ SHA256.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._temp);
        this.reset();
    };
    /**
     * Updates hash state with the given data.
     *
     * Throws error when trying to update already finalized hash:
     * instance must be reset to update it again.
     */ SHA256.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) dataLength = data.length;
        if (this._finished) throw new Error("SHA256: can't update because hash was finished.");
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
            while(this._bufferLength < this.blockSize && dataLength > 0){
                this._buffer[this._bufferLength++] = data[dataPos++];
                dataLength--;
            }
            if (this._bufferLength === this.blockSize) {
                hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
                this._bufferLength = 0;
            }
        }
        if (dataLength >= this.blockSize) {
            dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
            dataLength %= this.blockSize;
        }
        while(dataLength > 0){
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
        }
        return this;
    };
    /**
     * Finalizes hash state and puts hash into out.
     * If hash was already finalized, puts the same value.
     */ SHA256.prototype.finish = function(out) {
        if (!this._finished) {
            var bytesHashed = this._bytesHashed;
            var left = this._bufferLength;
            var bitLenHi = bytesHashed / 0x20000000 | 0;
            var bitLenLo = bytesHashed << 3;
            var padLength = bytesHashed % 64 < 56 ? 64 : 128;
            this._buffer[left] = 0x80;
            for(var i = left + 1; i < padLength - 8; i++)this._buffer[i] = 0;
            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
            hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
            this._finished = true;
        }
        for(var i = 0; i < this.digestLength / 4; i++)binary_1.writeUint32BE(this._state[i], out, i * 4);
        return this;
    };
    /**
     * Returns the final hash digest.
     */ SHA256.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization.
     * Returns hash state to be used with restoreState().
     * Only chain value is saved, not buffers or other
     * state variables.
     */ SHA256.prototype.saveState = function() {
        if (this._finished) throw new Error("SHA256: cannot save finished state");
        return {
            state: new Int32Array(this._state),
            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,
            bufferLength: this._bufferLength,
            bytesHashed: this._bytesHashed
        };
    };
    /**
     * Function useful for HMAC/PBKDF2 optimization.
     * Restores state saved by saveState() and sets bytesHashed
     * to the given value.
     */ SHA256.prototype.restoreState = function(savedState) {
        this._state.set(savedState.state);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) this._buffer.set(savedState.buffer);
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
    };
    /**
     * Cleans state returned by saveState().
     */ SHA256.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.state);
        if (savedState.buffer) wipe_1.wipe(savedState.buffer);
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
    };
    return SHA256;
}();
exports.SHA256 = SHA256;
// Constants
var K = new Int32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
function hashBlocks(w, v, p, pos, len) {
    while(len >= 64){
        var a = v[0];
        var b = v[1];
        var c = v[2];
        var d = v[3];
        var e = v[4];
        var f = v[5];
        var g = v[6];
        var h = v[7];
        for(var i = 0; i < 16; i++){
            var j = pos + i * 4;
            w[i] = binary_1.readUint32BE(p, j);
        }
        for(var i = 16; i < 64; i++){
            var u = w[i - 2];
            var t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
            u = w[i - 15];
            var t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }
        for(var i = 0; i < 64; i++){
            var t1 = (((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            var t2 = ((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
        }
        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;
        pos += 64;
        len -= 64;
    }
    return pos;
}
function hash(data) {
    var h = new SHA256();
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
}
exports.hash = hash;

},{"1250d54beeebaf4c":"92RWm","32bb055f5ba8e49":"8owN2"}],"5xoxU":[function(require,module,exports) {
"use strict";
// Copyright (C) 2016 Dmitry Chestnykh
// MIT License. See LICENSE file for details.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
/**
 * Package x25519 implements X25519 key agreement.
 */ const random_1 = require("1f31c831c302d752");
const wipe_1 = require("e653efe2d29fe96f");
exports.PUBLIC_KEY_LENGTH = 32;
exports.SECRET_KEY_LENGTH = 32;
exports.SHARED_KEY_LENGTH = 32;
// Returns new zero-filled 16-element GF (Float64Array).
// If passed an array of numbers, prefills the returned
// array with them.
//
// We use Float64Array, because we need 48-bit numbers
// for this implementation.
function gf(init) {
    const r = new Float64Array(16);
    if (init) for(let i = 0; i < init.length; i++)r[i] = init[i];
    return r;
}
// Base point.
const _9 = new Uint8Array(32);
_9[0] = 9;
const _121665 = gf([
    0xdb41,
    1
]);
function car25519(o) {
    let c = 1;
    for(let i = 0; i < 16; i++){
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
    }
    o[0] += c - 1 + 37 * (c - 1);
}
function sel25519(p, q, b) {
    const c = ~(b - 1);
    for(let i = 0; i < 16; i++){
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
    }
}
function pack25519(o, n) {
    const m = gf();
    const t = gf();
    for(let i = 0; i < 16; i++)t[i] = n[i];
    car25519(t);
    car25519(t);
    car25519(t);
    for(let j = 0; j < 2; j++){
        m[0] = t[0] - 0xffed;
        for(let i = 1; i < 15; i++){
            m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 0xffff;
        }
        m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 0xffff;
        sel25519(t, m, 1 - b);
    }
    for(let i = 0; i < 16; i++){
        o[2 * i] = t[i] & 0xff;
        o[2 * i + 1] = t[i] >> 8;
    }
}
function unpack25519(o, n) {
    for(let i = 0; i < 16; i++)o[i] = n[2 * i] + (n[2 * i + 1] << 8);
    o[15] &= 0x7fff;
}
function add(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] + b[i];
}
function sub(o, a, b) {
    for(let i = 0; i < 16; i++)o[i] = a[i] - b[i];
}
function mul(o, a, b) {
    let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    v = a[0];
    t0 += v * b0;
    t1 += v * b1;
    t2 += v * b2;
    t3 += v * b3;
    t4 += v * b4;
    t5 += v * b5;
    t6 += v * b6;
    t7 += v * b7;
    t8 += v * b8;
    t9 += v * b9;
    t10 += v * b10;
    t11 += v * b11;
    t12 += v * b12;
    t13 += v * b13;
    t14 += v * b14;
    t15 += v * b15;
    v = a[1];
    t1 += v * b0;
    t2 += v * b1;
    t3 += v * b2;
    t4 += v * b3;
    t5 += v * b4;
    t6 += v * b5;
    t7 += v * b6;
    t8 += v * b7;
    t9 += v * b8;
    t10 += v * b9;
    t11 += v * b10;
    t12 += v * b11;
    t13 += v * b12;
    t14 += v * b13;
    t15 += v * b14;
    t16 += v * b15;
    v = a[2];
    t2 += v * b0;
    t3 += v * b1;
    t4 += v * b2;
    t5 += v * b3;
    t6 += v * b4;
    t7 += v * b5;
    t8 += v * b6;
    t9 += v * b7;
    t10 += v * b8;
    t11 += v * b9;
    t12 += v * b10;
    t13 += v * b11;
    t14 += v * b12;
    t15 += v * b13;
    t16 += v * b14;
    t17 += v * b15;
    v = a[3];
    t3 += v * b0;
    t4 += v * b1;
    t5 += v * b2;
    t6 += v * b3;
    t7 += v * b4;
    t8 += v * b5;
    t9 += v * b6;
    t10 += v * b7;
    t11 += v * b8;
    t12 += v * b9;
    t13 += v * b10;
    t14 += v * b11;
    t15 += v * b12;
    t16 += v * b13;
    t17 += v * b14;
    t18 += v * b15;
    v = a[4];
    t4 += v * b0;
    t5 += v * b1;
    t6 += v * b2;
    t7 += v * b3;
    t8 += v * b4;
    t9 += v * b5;
    t10 += v * b6;
    t11 += v * b7;
    t12 += v * b8;
    t13 += v * b9;
    t14 += v * b10;
    t15 += v * b11;
    t16 += v * b12;
    t17 += v * b13;
    t18 += v * b14;
    t19 += v * b15;
    v = a[5];
    t5 += v * b0;
    t6 += v * b1;
    t7 += v * b2;
    t8 += v * b3;
    t9 += v * b4;
    t10 += v * b5;
    t11 += v * b6;
    t12 += v * b7;
    t13 += v * b8;
    t14 += v * b9;
    t15 += v * b10;
    t16 += v * b11;
    t17 += v * b12;
    t18 += v * b13;
    t19 += v * b14;
    t20 += v * b15;
    v = a[6];
    t6 += v * b0;
    t7 += v * b1;
    t8 += v * b2;
    t9 += v * b3;
    t10 += v * b4;
    t11 += v * b5;
    t12 += v * b6;
    t13 += v * b7;
    t14 += v * b8;
    t15 += v * b9;
    t16 += v * b10;
    t17 += v * b11;
    t18 += v * b12;
    t19 += v * b13;
    t20 += v * b14;
    t21 += v * b15;
    v = a[7];
    t7 += v * b0;
    t8 += v * b1;
    t9 += v * b2;
    t10 += v * b3;
    t11 += v * b4;
    t12 += v * b5;
    t13 += v * b6;
    t14 += v * b7;
    t15 += v * b8;
    t16 += v * b9;
    t17 += v * b10;
    t18 += v * b11;
    t19 += v * b12;
    t20 += v * b13;
    t21 += v * b14;
    t22 += v * b15;
    v = a[8];
    t8 += v * b0;
    t9 += v * b1;
    t10 += v * b2;
    t11 += v * b3;
    t12 += v * b4;
    t13 += v * b5;
    t14 += v * b6;
    t15 += v * b7;
    t16 += v * b8;
    t17 += v * b9;
    t18 += v * b10;
    t19 += v * b11;
    t20 += v * b12;
    t21 += v * b13;
    t22 += v * b14;
    t23 += v * b15;
    v = a[9];
    t9 += v * b0;
    t10 += v * b1;
    t11 += v * b2;
    t12 += v * b3;
    t13 += v * b4;
    t14 += v * b5;
    t15 += v * b6;
    t16 += v * b7;
    t17 += v * b8;
    t18 += v * b9;
    t19 += v * b10;
    t20 += v * b11;
    t21 += v * b12;
    t22 += v * b13;
    t23 += v * b14;
    t24 += v * b15;
    v = a[10];
    t10 += v * b0;
    t11 += v * b1;
    t12 += v * b2;
    t13 += v * b3;
    t14 += v * b4;
    t15 += v * b5;
    t16 += v * b6;
    t17 += v * b7;
    t18 += v * b8;
    t19 += v * b9;
    t20 += v * b10;
    t21 += v * b11;
    t22 += v * b12;
    t23 += v * b13;
    t24 += v * b14;
    t25 += v * b15;
    v = a[11];
    t11 += v * b0;
    t12 += v * b1;
    t13 += v * b2;
    t14 += v * b3;
    t15 += v * b4;
    t16 += v * b5;
    t17 += v * b6;
    t18 += v * b7;
    t19 += v * b8;
    t20 += v * b9;
    t21 += v * b10;
    t22 += v * b11;
    t23 += v * b12;
    t24 += v * b13;
    t25 += v * b14;
    t26 += v * b15;
    v = a[12];
    t12 += v * b0;
    t13 += v * b1;
    t14 += v * b2;
    t15 += v * b3;
    t16 += v * b4;
    t17 += v * b5;
    t18 += v * b6;
    t19 += v * b7;
    t20 += v * b8;
    t21 += v * b9;
    t22 += v * b10;
    t23 += v * b11;
    t24 += v * b12;
    t25 += v * b13;
    t26 += v * b14;
    t27 += v * b15;
    v = a[13];
    t13 += v * b0;
    t14 += v * b1;
    t15 += v * b2;
    t16 += v * b3;
    t17 += v * b4;
    t18 += v * b5;
    t19 += v * b6;
    t20 += v * b7;
    t21 += v * b8;
    t22 += v * b9;
    t23 += v * b10;
    t24 += v * b11;
    t25 += v * b12;
    t26 += v * b13;
    t27 += v * b14;
    t28 += v * b15;
    v = a[14];
    t14 += v * b0;
    t15 += v * b1;
    t16 += v * b2;
    t17 += v * b3;
    t18 += v * b4;
    t19 += v * b5;
    t20 += v * b6;
    t21 += v * b7;
    t22 += v * b8;
    t23 += v * b9;
    t24 += v * b10;
    t25 += v * b11;
    t26 += v * b12;
    t27 += v * b13;
    t28 += v * b14;
    t29 += v * b15;
    v = a[15];
    t15 += v * b0;
    t16 += v * b1;
    t17 += v * b2;
    t18 += v * b3;
    t19 += v * b4;
    t20 += v * b5;
    t21 += v * b6;
    t22 += v * b7;
    t23 += v * b8;
    t24 += v * b9;
    t25 += v * b10;
    t26 += v * b11;
    t27 += v * b12;
    t28 += v * b13;
    t29 += v * b14;
    t30 += v * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    // t15 left as is
    // first car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    // second car
    c = 1;
    v = t0 + c + 65535;
    c = Math.floor(v / 65536);
    t0 = v - c * 65536;
    v = t1 + c + 65535;
    c = Math.floor(v / 65536);
    t1 = v - c * 65536;
    v = t2 + c + 65535;
    c = Math.floor(v / 65536);
    t2 = v - c * 65536;
    v = t3 + c + 65535;
    c = Math.floor(v / 65536);
    t3 = v - c * 65536;
    v = t4 + c + 65535;
    c = Math.floor(v / 65536);
    t4 = v - c * 65536;
    v = t5 + c + 65535;
    c = Math.floor(v / 65536);
    t5 = v - c * 65536;
    v = t6 + c + 65535;
    c = Math.floor(v / 65536);
    t6 = v - c * 65536;
    v = t7 + c + 65535;
    c = Math.floor(v / 65536);
    t7 = v - c * 65536;
    v = t8 + c + 65535;
    c = Math.floor(v / 65536);
    t8 = v - c * 65536;
    v = t9 + c + 65535;
    c = Math.floor(v / 65536);
    t9 = v - c * 65536;
    v = t10 + c + 65535;
    c = Math.floor(v / 65536);
    t10 = v - c * 65536;
    v = t11 + c + 65535;
    c = Math.floor(v / 65536);
    t11 = v - c * 65536;
    v = t12 + c + 65535;
    c = Math.floor(v / 65536);
    t12 = v - c * 65536;
    v = t13 + c + 65535;
    c = Math.floor(v / 65536);
    t13 = v - c * 65536;
    v = t14 + c + 65535;
    c = Math.floor(v / 65536);
    t14 = v - c * 65536;
    v = t15 + c + 65535;
    c = Math.floor(v / 65536);
    t15 = v - c * 65536;
    t0 += c - 1 + 37 * (c - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
}
function square(o, a) {
    mul(o, a, a);
}
function inv25519(o, inp) {
    const c = gf();
    for(let i = 0; i < 16; i++)c[i] = inp[i];
    for(let i = 253; i >= 0; i--){
        square(c, c);
        if (i !== 2 && i !== 4) mul(c, c, inp);
    }
    for(let i = 0; i < 16; i++)o[i] = c[i];
}
function scalarMult(n, p) {
    const z = new Uint8Array(32);
    const x = new Float64Array(80);
    const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
    for(let i = 0; i < 31; i++)z[i] = n[i];
    z[31] = n[31] & 127 | 64;
    z[0] &= 248;
    unpack25519(x, p);
    for(let i = 0; i < 16; i++)b[i] = x[i];
    a[0] = d[0] = 1;
    for(let i = 254; i >= 0; --i){
        const r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        add(e, a, c);
        sub(a, a, c);
        add(c, b, d);
        sub(b, b, d);
        square(d, e);
        square(f, a);
        mul(a, c, a);
        mul(c, b, e);
        add(e, a, c);
        sub(a, a, c);
        square(b, a);
        sub(c, d, f);
        mul(a, c, _121665);
        add(a, a, d);
        mul(c, c, a);
        mul(a, d, f);
        mul(d, b, x);
        square(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
    }
    for(let i = 0; i < 16; i++){
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
    }
    const x32 = x.subarray(32);
    const x16 = x.subarray(16);
    inv25519(x32, x32);
    mul(x16, x16, x32);
    const q = new Uint8Array(32);
    pack25519(q, x16);
    return q;
}
exports.scalarMult = scalarMult;
function scalarMultBase(n) {
    return scalarMult(n, _9);
}
exports.scalarMultBase = scalarMultBase;
function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SECRET_KEY_LENGTH) throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
    const secretKey = new Uint8Array(seed);
    const publicKey = scalarMultBase(secretKey);
    return {
        publicKey,
        secretKey
    };
}
exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
function generateKeyPair(prng) {
    const seed = (0, random_1.randomBytes)(32, prng);
    const result = generateKeyPairFromSeed(seed);
    (0, wipe_1.wipe)(seed);
    return result;
}
exports.generateKeyPair = generateKeyPair;
/**
 * Returns a shared key between our secret key and a peer's public key.
 *
 * Throws an error if the given keys are of wrong length.
 *
 * If rejectZero is true throws if the calculated shared key is all-zero.
 * From RFC 7748:
 *
 * > Protocol designers using Diffie-Hellman over the curves defined in
 * > this document must not assume "contributory behavior".  Specially,
 * > contributory behavior means that both parties' private keys
 * > contribute to the resulting shared key.  Since curve25519 and
 * > curve448 have cofactors of 8 and 4 (respectively), an input point of
 * > small order will eliminate any contribution from the other party's
 * > private key.  This situation can be detected by checking for the all-
 * > zero output, which implementations MAY do, as specified in Section 6.
 * > However, a large number of existing implementations do not do this.
 *
 * IMPORTANT: the returned key is a raw result of scalar multiplication.
 * To use it as a key material, hash it with a cryptographic hash function.
 */ function sharedKey(mySecretKey, theirPublicKey, rejectZero = false) {
    if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) throw new Error("X25519: incorrect secret key length");
    if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) throw new Error("X25519: incorrect public key length");
    const result = scalarMult(mySecretKey, theirPublicKey);
    if (rejectZero) {
        let zeros = 0;
        for(let i = 0; i < result.length; i++)zeros |= result[i];
        if (zeros === 0) throw new Error("X25519: invalid shared key");
    }
    return result;
}
exports.sharedKey = sharedKey;

},{"1f31c831c302d752":"9Qs60","e653efe2d29fe96f":"8owN2"}],"ctPgX":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var compare = require("5229e04964828d20");
var concat = require("4363a4765ad6f647");
var equals = require("fe8b7ebb69a259cd");
var fromString = require("e376caac19739b3f");
var toString = require("8977331352ff045c");
var xor = require("b9d1544131a4e6a3");
exports.compare = compare.compare;
exports.concat = concat.concat;
exports.equals = equals.equals;
exports.fromString = fromString.fromString;
exports.toString = toString.toString;
exports.xor = xor.xor;

},{"5229e04964828d20":"4sxCx","4363a4765ad6f647":"gqJ9u","fe8b7ebb69a259cd":"iZMnE","e376caac19739b3f":"7qjkp","8977331352ff045c":"w8mvE","b9d1544131a4e6a3":"6tR3H"}],"4sxCx":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function compare(a, b) {
    for(let i = 0; i < a.byteLength; i++){
        if (a[i] < b[i]) return -1;
        if (a[i] > b[i]) return 1;
    }
    if (a.byteLength > b.byteLength) return 1;
    if (a.byteLength < b.byteLength) return -1;
    return 0;
}
exports.compare = compare;

},{}],"iZMnE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function equals(a, b) {
    if (a === b) return true;
    if (a.byteLength !== b.byteLength) return false;
    for(let i = 0; i < a.byteLength; i++){
        if (a[i] !== b[i]) return false;
    }
    return true;
}
exports.equals = equals;

},{}],"6tR3H":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var alloc = require("14e7fe77c2925895");
var asUint8array = require("1539f38859756ee5");
function xor(a, b) {
    if (a.length !== b.length) throw new Error("Inputs should have the same length");
    const result = alloc.allocUnsafe(a.length);
    for(let i = 0; i < a.length; i++)result[i] = a[i] ^ b[i];
    return asUint8array.asUint8Array(result);
}
exports.xor = xor;

},{"14e7fe77c2925895":"jsZij","1539f38859756ee5":"hN1l1"}],"hmXKp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BrowserInfo", ()=>BrowserInfo);
parcelHelpers.export(exports, "NodeInfo", ()=>NodeInfo);
parcelHelpers.export(exports, "SearchBotDeviceInfo", ()=>SearchBotDeviceInfo);
parcelHelpers.export(exports, "BotInfo", ()=>BotInfo);
parcelHelpers.export(exports, "ReactNativeInfo", ()=>ReactNativeInfo);
parcelHelpers.export(exports, "detect", ()=>detect);
parcelHelpers.export(exports, "browserName", ()=>browserName);
parcelHelpers.export(exports, "parseUserAgent", ()=>parseUserAgent);
parcelHelpers.export(exports, "detectOS", ()=>detectOS);
parcelHelpers.export(exports, "getNodeVersion", ()=>getNodeVersion);
var process = require("26f7ca7ac5d9fc34");
var __spreadArray = undefined && undefined.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = /** @class */ function() {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = "browser";
    }
    return BrowserInfo;
}();
var NodeInfo = /** @class */ function() {
    function NodeInfo(version) {
        this.version = version;
        this.type = "node";
        this.name = "node";
        this.os = process.platform;
    }
    return NodeInfo;
}();
var SearchBotDeviceInfo = /** @class */ function() {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = "bot-device";
    }
    return SearchBotDeviceInfo;
}();
var BotInfo = /** @class */ function() {
    function BotInfo() {
        this.type = "bot";
        this.bot = true; // NOTE: deprecated test name instead
        this.name = "bot";
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}();
var ReactNativeInfo = /** @class */ function() {
    function ReactNativeInfo() {
        this.type = "react-native";
        this.name = "react-native";
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}();
// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    [
        "aol",
        /AOLShield\/([0-9\._]+)/
    ],
    [
        "edge",
        /Edge\/([0-9\._]+)/
    ],
    [
        "edge-ios",
        /EdgiOS\/([0-9\._]+)/
    ],
    [
        "yandexbrowser",
        /YaBrowser\/([0-9\._]+)/
    ],
    [
        "kakaotalk",
        /KAKAOTALK\s([0-9\.]+)/
    ],
    [
        "samsung",
        /SamsungBrowser\/([0-9\.]+)/
    ],
    [
        "silk",
        /\bSilk\/([0-9._-]+)\b/
    ],
    [
        "miui",
        /MiuiBrowser\/([0-9\.]+)$/
    ],
    [
        "beaker",
        /BeakerBrowser\/([0-9\.]+)/
    ],
    [
        "edge-chromium",
        /EdgA?\/([0-9\.]+)/
    ],
    [
        "chromium-webview",
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "chrome",
        /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "phantomjs",
        /PhantomJS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "crios",
        /CriOS\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "firefox",
        /Firefox\/([0-9\.]+)(?:\s|$)/
    ],
    [
        "fxios",
        /FxiOS\/([0-9\.]+)/
    ],
    [
        "opera-mini",
        /Opera Mini.*Version\/([0-9\.]+)/
    ],
    [
        "opera",
        /Opera\/([0-9\.]+)(?:\s|$)/
    ],
    [
        "opera",
        /OPR\/([0-9\.]+)(:?\s|$)/
    ],
    [
        "pie",
        /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/
    ],
    [
        "pie",
        /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/
    ],
    [
        "netfront",
        /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/
    ],
    [
        "ie",
        /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/
    ],
    [
        "ie",
        /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/
    ],
    [
        "ie",
        /MSIE\s(7\.0)/
    ],
    [
        "bb10",
        /BB10;\sTouch.*Version\/([0-9\.]+)/
    ],
    [
        "android",
        /Android\s([0-9\.]+)/
    ],
    [
        "ios",
        /Version\/([0-9\._]+).*Mobile.*Safari.*/
    ],
    [
        "safari",
        /Version\/([0-9\._]+).*Safari/
    ],
    [
        "facebook",
        /FB[AS]V\/([0-9\.]+)/
    ],
    [
        "instagram",
        /Instagram\s([0-9\.]+)/
    ],
    [
        "ios-webview",
        /AppleWebKit\/([0-9\.]+).*Mobile/
    ],
    [
        "ios-webview",
        /AppleWebKit\/([0-9\.]+).*Gecko\)$/
    ],
    [
        "curl",
        /^curl\/([0-9\.]+)$/
    ],
    [
        "searchbot",
        SEARCHBOX_UA_REGEX
    ]
];
var operatingSystemRules = [
    [
        "iOS",
        /iP(hone|od|ad)/
    ],
    [
        "Android OS",
        /Android/
    ],
    [
        "BlackBerry OS",
        /BlackBerry|BB10/
    ],
    [
        "Windows Mobile",
        /IEMobile/
    ],
    [
        "Amazon OS",
        /Kindle/
    ],
    [
        "Windows 3.11",
        /Win16/
    ],
    [
        "Windows 95",
        /(Windows 95)|(Win95)|(Windows_95)/
    ],
    [
        "Windows 98",
        /(Windows 98)|(Win98)/
    ],
    [
        "Windows 2000",
        /(Windows NT 5.0)|(Windows 2000)/
    ],
    [
        "Windows XP",
        /(Windows NT 5.1)|(Windows XP)/
    ],
    [
        "Windows Server 2003",
        /(Windows NT 5.2)/
    ],
    [
        "Windows Vista",
        /(Windows NT 6.0)/
    ],
    [
        "Windows 7",
        /(Windows NT 6.1)/
    ],
    [
        "Windows 8",
        /(Windows NT 6.2)/
    ],
    [
        "Windows 8.1",
        /(Windows NT 6.3)/
    ],
    [
        "Windows 10",
        /(Windows NT 10.0)/
    ],
    [
        "Windows ME",
        /Windows ME/
    ],
    [
        "Windows CE",
        /Windows CE|WinCE|Microsoft Pocket Internet Explorer/
    ],
    [
        "Open BSD",
        /OpenBSD/
    ],
    [
        "Sun OS",
        /SunOS/
    ],
    [
        "Chrome OS",
        /CrOS/
    ],
    [
        "Linux",
        /(Linux)|(X11)/
    ],
    [
        "Mac OS",
        /(Mac_PowerPC)|(Macintosh)/
    ],
    [
        "QNX",
        /QNX/
    ],
    [
        "BeOS",
        /BeOS/
    ],
    [
        "OS/2",
        /OS\/2/
    ]
];
function detect(userAgent) {
    if (!!userAgent) return parseUserAgent(userAgent);
    if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") return new ReactNativeInfo();
    if (typeof navigator !== "undefined") return parseUserAgent(navigator.userAgent);
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return ua !== "" && userAgentRules.reduce(function(matched, _a) {
        var browser = _a[0], regex = _a[1];
        if (matched) return matched;
        var uaMatch = regex.exec(ua);
        return !!uaMatch && [
            browser,
            uaMatch
        ];
    }, false);
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) return null;
    var name = matchedRule[0], match = matchedRule[1];
    if (name === "searchbot") return new BotInfo();
    // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
    var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    } else versionParts = [];
    var version = versionParts.join(".");
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for(var ii = 0, count = operatingSystemRules.length; ii < count; ii++){
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) return os;
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof process !== "undefined" && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for(var ii = 0; ii < count; ii++)output.push("0");
    return output;
}

},{"26f7ca7ac5d9fc34":"d5jf4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"chkDr":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
function getFromWindow(name) {
    let res = undefined;
    if (typeof window !== "undefined" && typeof window[name] !== "undefined") res = window[name];
    return res;
}
exports.getFromWindow = getFromWindow;
function getFromWindowOrThrow(name) {
    const res = getFromWindow(name);
    if (!res) throw new Error(`${name} is not defined in Window`);
    return res;
}
exports.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
    return getFromWindowOrThrow("document");
}
exports.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
    return getFromWindow("document");
}
exports.getDocument = getDocument;
function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator");
}
exports.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
    return getFromWindow("navigator");
}
exports.getNavigator = getNavigator;
function getLocationOrThrow() {
    return getFromWindowOrThrow("location");
}
exports.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
    return getFromWindow("location");
}
exports.getLocation = getLocation;
function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto");
}
exports.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
    return getFromWindow("crypto");
}
exports.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage");
}
exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
    return getFromWindow("localStorage");
}
exports.getLocalStorage = getLocalStorage;

},{}],"arKN1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWindowMetadata = void 0;
const window_getters_1 = require("7d5cfeefaeea8345");
function getWindowMetadata() {
    let doc;
    let loc;
    try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
    } catch (e) {
        return null;
    }
    function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons = [];
        for(let i = 0; i < links.length; i++){
            const link = links[i];
            const rel = link.getAttribute("rel");
            if (rel) {
                if (rel.toLowerCase().indexOf("icon") > -1) {
                    const href = link.getAttribute("href");
                    if (href) {
                        if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                            let absoluteHref = loc.protocol + "//" + loc.host;
                            if (href.indexOf("/") === 0) absoluteHref += href;
                            else {
                                const path = loc.pathname.split("/");
                                path.pop();
                                const finalPath = path.join("/");
                                absoluteHref += finalPath + "/" + href;
                            }
                            icons.push(absoluteHref);
                        } else if (href.indexOf("//") === 0) {
                            const absoluteUrl = loc.protocol + href;
                            icons.push(absoluteUrl);
                        } else icons.push(href);
                    }
                }
            }
        }
        return icons;
    }
    function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for(let i = 0; i < metaTags.length; i++){
            const tag = metaTags[i];
            const attributes = [
                "itemprop",
                "property",
                "name"
            ].map((target)=>tag.getAttribute(target)).filter((attr)=>{
                if (attr) return args.includes(attr);
                return false;
            });
            if (attributes.length && attributes) {
                const content = tag.getAttribute("content");
                if (content) return content;
            }
        }
        return "";
    }
    function getName() {
        let name = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name) name = doc.title;
        return name;
    }
    function getDescription() {
        const description = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description;
    }
    const name = getName();
    const description = getDescription();
    const url = loc.origin;
    const icons = getIcons();
    const meta = {
        description,
        url,
        icons,
        name
    };
    return meta;
}
exports.getWindowMetadata = getWindowMetadata;

},{"7d5cfeefaeea8345":"chkDr"}],"11cDl":[function(require,module,exports) {
"use strict";
const strictUriEncode = require("ce42327a0e069aac");
const decodeComponent = require("7e80f8c3962664d0");
const splitOnFirst = require("5ef9152d8726081d");
const filterObject = require("b2fa18d455c5eed3");
const isNullOrUndefined = (value)=>value === null || value === undefined;
const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
function encoderForArrayFormat(options) {
    switch(options.arrayFormat){
        case "index":
            return (key)=>(result, value)=>{
                    const index = result.length;
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        [
                            encode(key, options),
                            "[",
                            index,
                            "]"
                        ].join("")
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            "[",
                            encode(index, options),
                            "]=",
                            encode(value, options)
                        ].join("")
                    ];
                };
        case "bracket":
            return (key)=>(result, value)=>{
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        [
                            encode(key, options),
                            "[]"
                        ].join("")
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            "[]=",
                            encode(value, options)
                        ].join("")
                    ];
                };
        case "colon-list-separator":
            return (key)=>(result, value)=>{
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        [
                            encode(key, options),
                            ":list="
                        ].join("")
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            ":list=",
                            encode(value, options)
                        ].join("")
                    ];
                };
        case "comma":
        case "separator":
        case "bracket-separator":
            {
                const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
                return (key)=>(result, value)=>{
                        if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                        // Translate null to an empty string so that it doesn't serialize as 'null'
                        value = value === null ? "" : value;
                        if (result.length === 0) return [
                            [
                                encode(key, options),
                                keyValueSep,
                                encode(value, options)
                            ].join("")
                        ];
                        return [
                            [
                                result,
                                encode(value, options)
                            ].join(options.arrayFormatSeparator)
                        ];
                    };
            }
        default:
            return (key)=>(result, value)=>{
                    if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === "") return result;
                    if (value === null) return [
                        ...result,
                        encode(key, options)
                    ];
                    return [
                        ...result,
                        [
                            encode(key, options),
                            "=",
                            encode(value, options)
                        ].join("")
                    ];
                };
    }
}
function parserForArrayFormat(options) {
    let result;
    switch(options.arrayFormat){
        case "index":
            return (key, value, accumulator)=>{
                result = /\[(\d*)\]$/.exec(key);
                key = key.replace(/\[\d*\]$/, "");
                if (!result) {
                    accumulator[key] = value;
                    return;
                }
                if (accumulator[key] === undefined) accumulator[key] = {};
                accumulator[key][result[1]] = value;
            };
        case "bracket":
            return (key, value, accumulator)=>{
                result = /(\[\])$/.exec(key);
                key = key.replace(/\[\]$/, "");
                if (!result) {
                    accumulator[key] = value;
                    return;
                }
                if (accumulator[key] === undefined) {
                    accumulator[key] = [
                        value
                    ];
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], value);
            };
        case "colon-list-separator":
            return (key, value, accumulator)=>{
                result = /(:list)$/.exec(key);
                key = key.replace(/:list$/, "");
                if (!result) {
                    accumulator[key] = value;
                    return;
                }
                if (accumulator[key] === undefined) {
                    accumulator[key] = [
                        value
                    ];
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], value);
            };
        case "comma":
        case "separator":
            return (key, value, accumulator)=>{
                const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
                const isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
                value = isEncodedArray ? decode(value, options) : value;
                const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item)=>decode(item, options)) : value === null ? value : decode(value, options);
                accumulator[key] = newValue;
            };
        case "bracket-separator":
            return (key, value, accumulator)=>{
                const isArray = /(\[\])$/.test(key);
                key = key.replace(/\[\]$/, "");
                if (!isArray) {
                    accumulator[key] = value ? decode(value, options) : value;
                    return;
                }
                const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item)=>decode(item, options));
                if (accumulator[key] === undefined) {
                    accumulator[key] = arrayValue;
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], arrayValue);
            };
        default:
            return (key, value, accumulator)=>{
                if (accumulator[key] === undefined) {
                    accumulator[key] = value;
                    return;
                }
                accumulator[key] = [].concat(accumulator[key], value);
            };
    }
}
function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) throw new TypeError("arrayFormatSeparator must be single character string");
}
function encode(value, options) {
    if (options.encode) return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    return value;
}
function decode(value, options) {
    if (options.decode) return decodeComponent(value);
    return value;
}
function keysSorter(input) {
    if (Array.isArray(input)) return input.sort();
    if (typeof input === "object") return keysSorter(Object.keys(input)).sort((a, b)=>Number(a) - Number(b)).map((key)=>input[key]);
    return input;
}
function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) input = input.slice(0, hashStart);
    return input;
}
function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) hash = url.slice(hashStart);
    return hash;
}
function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) return "";
    return input.slice(queryStart + 1);
}
function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === "string" && value.trim() !== "") value = Number(value);
    else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) value = value.toLowerCase() === "true";
    return value;
}
function parse(query, options) {
    options = Object.assign({
        decode: true,
        sort: true,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: false,
        parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    // Create an object with no prototype
    const ret = Object.create(null);
    if (typeof query !== "string") return ret;
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) return ret;
    for (const param of query.split("&")){
        if (param === "") continue;
        let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
        // Missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        value = value === undefined ? null : [
            "comma",
            "separator",
            "bracket-separator"
        ].includes(options.arrayFormat) ? value : decode(value, options);
        formatter(decode(key, options), value, ret);
    }
    for (const key of Object.keys(ret)){
        const value = ret[key];
        if (typeof value === "object" && value !== null) for (const k of Object.keys(value))value[k] = parseValue(value[k], options);
        else ret[key] = parseValue(value, options);
    }
    if (options.sort === false) return ret;
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key)=>{
        const value = ret[key];
        if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) // Sort object keys, not values
        result[key] = keysSorter(value);
        else result[key] = value;
        return result;
    }, Object.create(null));
}
exports.extract = extract;
exports.parse = parse;
exports.stringify = (object, options)=>{
    if (!object) return "";
    options = Object.assign({
        encode: true,
        strict: true,
        arrayFormat: "none",
        arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key)=>options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object))if (!shouldFilter(key)) objectCopy[key] = object[key];
    const keys = Object.keys(objectCopy);
    if (options.sort !== false) keys.sort(options.sort);
    return keys.map((key)=>{
        const value = object[key];
        if (value === undefined) return "";
        if (value === null) return encode(key, options);
        if (Array.isArray(value)) {
            if (value.length === 0 && options.arrayFormat === "bracket-separator") return encode(key, options) + "[]";
            return value.reduce(formatter(key), []).join("&");
        }
        return encode(key, options) + "=" + encode(value, options);
    }).filter((x)=>x.length > 0).join("&");
};
exports.parseUrl = (url, options)=>{
    options = Object.assign({
        decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, "#");
    return Object.assign({
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
        fragmentIdentifier: decode(hash, options)
    } : {});
};
exports.stringifyUrl = (object, options)=>{
    options = Object.assign({
        encode: true,
        strict: true,
        [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, {
        sort: false
    });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString = exports.stringify(query, options);
    if (queryString) queryString = `?${queryString}`;
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    return `${url}${queryString}${hash}`;
};
exports.pick = (input, filter, options)=>{
    options = Object.assign({
        parseFragmentIdentifier: true,
        [encodeFragmentIdentifier]: false
    }, options);
    const { url , query , fragmentIdentifier  } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
        url,
        query: filterObject(query, filter),
        fragmentIdentifier
    }, options);
};
exports.exclude = (input, filter, options)=>{
    const exclusionFilter = Array.isArray(filter) ? (key)=>!filter.includes(key) : (key, value)=>!filter(key, value);
    return exports.pick(input, exclusionFilter, options);
};

},{"ce42327a0e069aac":"72Fvn","7e80f8c3962664d0":"1clyr","5ef9152d8726081d":"70WYe","b2fa18d455c5eed3":"1up0E"}],"72Fvn":[function(require,module,exports) {
"use strict";
module.exports = (str)=>encodeURIComponent(str).replace(/[!'()*]/g, (x)=>`%${x.charCodeAt(0).toString(16).toUpperCase()}`);

},{}],"1clyr":[function(require,module,exports) {
"use strict";
var token = "%[a-f0-9]{2}";
var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
var multiMatcher = new RegExp("(" + token + ")+", "gi");
function decodeComponents(components, split) {
    try {
        // Try to decode the entire string first
        return [
            decodeURIComponent(components.join(""))
        ];
    } catch (err) {
    // Do nothing
    }
    if (components.length === 1) return components;
    split = split || 1;
    // Split the array in 2 parts
    var left = components.slice(0, split);
    var right = components.slice(split);
    return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}
function decode(input) {
    try {
        return decodeURIComponent(input);
    } catch (err) {
        var tokens = input.match(singleMatcher) || [];
        for(var i = 1; i < tokens.length; i++){
            input = decodeComponents(tokens, i).join("");
            tokens = input.match(singleMatcher) || [];
        }
        return input;
    }
}
function customDecodeURIComponent(input) {
    // Keep track of all the replacements and prefill the map with the `BOM`
    var replaceMap = {
        "%FE%FF": "��",
        "%FF%FE": "��"
    };
    var match = multiMatcher.exec(input);
    while(match){
        try {
            // Decode as big chunks as possible
            replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
            var result = decode(match[0]);
            if (result !== match[0]) replaceMap[match[0]] = result;
        }
        match = multiMatcher.exec(input);
    }
    // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
    replaceMap["%C2"] = "�";
    var entries = Object.keys(replaceMap);
    for(var i = 0; i < entries.length; i++){
        // Replace all decoded components
        var key = entries[i];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
    }
    return input;
}
module.exports = function(encodedURI) {
    if (typeof encodedURI !== "string") throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
    try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        // Try the built in decoder first
        return decodeURIComponent(encodedURI);
    } catch (err) {
        // Fallback to a more advanced decoder
        return customDecodeURIComponent(encodedURI);
    }
};

},{}],"70WYe":[function(require,module,exports) {
"use strict";
module.exports = (string, separator)=>{
    if (!(typeof string === "string" && typeof separator === "string")) throw new TypeError("Expected the arguments to be of type `string`");
    if (separator === "") return [
        string
    ];
    const separatorIndex = string.indexOf(separator);
    if (separatorIndex === -1) return [
        string
    ];
    return [
        string.slice(0, separatorIndex),
        string.slice(separatorIndex + separator.length)
    ];
};

},{}],"1up0E":[function(require,module,exports) {
"use strict";
module.exports = function(obj, predicate) {
    var ret = {};
    var keys = Object.keys(obj);
    var isArr = Array.isArray(predicate);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var val = obj[key];
        if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) ret[key] = val;
    }
    return ret;
};

},{}],"1SxNf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _parsers = require("./parsers");
parcelHelpers.exportAll(_parsers, exports);
var _jsonrpc = require("./jsonrpc");
parcelHelpers.exportAll(_jsonrpc, exports);
var _validators = require("./validators");
parcelHelpers.exportAll(_validators, exports);

},{"./types":"k3brK","./parsers":"iipfW","./jsonrpc":"jNbf4","./validators":"bbijs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k3brK":[function(require,module,exports) {

},{}],"iipfW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseSubscribeRequest", ()=>parseSubscribeRequest);
parcelHelpers.export(exports, "parsePublishRequest", ()=>parsePublishRequest);
parcelHelpers.export(exports, "parseUnsubscribeRequest", ()=>parseUnsubscribeRequest);
parcelHelpers.export(exports, "parseSubscriptionRequest", ()=>parseSubscriptionRequest);
var _misc = require("./misc");
var _validators = require("./validators");
function parseSubscribeRequest(request) {
    if (!(0, _validators.isSubscribeMethod)(request.method)) throw new Error("JSON-RPC Request has invalid subscribe method");
    if (!(0, _validators.isSubscribeParams)(request.params)) throw new Error("JSON-RPC Request has invalid subscribe params");
    const params = request.params;
    (0, _misc.assertType)(params, "topic");
    return params;
}
function parsePublishRequest(request) {
    if (!(0, _validators.isPublishMethod)(request.method)) throw new Error("JSON-RPC Request has invalid publish method");
    if (!(0, _validators.isPublishParams)(request.params)) throw new Error("JSON-RPC Request has invalid publish params");
    const params = request.params;
    (0, _misc.assertType)(params, "topic");
    (0, _misc.assertType)(params, "message");
    (0, _misc.assertType)(params, "ttl", "number");
    return params;
}
function parseUnsubscribeRequest(request) {
    if (!(0, _validators.isUnsubscribeMethod)(request.method)) throw new Error("JSON-RPC Request has invalid unsubscribe method");
    if (!(0, _validators.isUnsubscribeParams)(request.params)) throw new Error("JSON-RPC Request has invalid unsubscribe params");
    const params = request.params;
    (0, _misc.assertType)(params, "id");
    return params;
}
function parseSubscriptionRequest(request) {
    if (!(0, _validators.isSubscriptionMethod)(request.method)) throw new Error("JSON-RPC Request has invalid subscription method");
    if (!(0, _validators.isSubscriptionParams)(request.params)) throw new Error("JSON-RPC Request has invalid subscription params");
    const params = request.params;
    (0, _misc.assertType)(params, "id");
    (0, _misc.assertType)(params, "data");
    return params;
}

},{"./misc":"jc0TB","./validators":"bbijs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jc0TB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "assertType", ()=>assertType);
parcelHelpers.export(exports, "hasRequiredParams", ()=>hasRequiredParams);
parcelHelpers.export(exports, "hasExactParamsLength", ()=>hasExactParamsLength);
parcelHelpers.export(exports, "hasRequiredParamsLength", ()=>hasRequiredParamsLength);
parcelHelpers.export(exports, "checkParams", ()=>checkParams);
parcelHelpers.export(exports, "methodEndsWith", ()=>methodEndsWith);
function assertType(obj, key, type = "string") {
    if (!obj[key] || typeof obj[key] !== type) throw new Error(`Missing or invalid "${key}" param`);
}
function hasRequiredParams(params, required) {
    let matches = true;
    required.forEach((key)=>{
        const exists = key in params;
        if (!exists) matches = false;
    });
    return matches;
}
function hasExactParamsLength(params, length) {
    return Array.isArray(params) ? params.length === length : Object.keys(params).length === length;
}
function hasRequiredParamsLength(params, minLength) {
    return Array.isArray(params) ? params.length >= minLength : Object.keys(params).length >= minLength;
}
function checkParams(params, required, optional) {
    const exact = !optional.length;
    const matchesLength = exact ? hasExactParamsLength(params, required.length) : hasRequiredParamsLength(params, required.length);
    if (!matchesLength) return false;
    return hasRequiredParams(params, required);
}
function methodEndsWith(method, expected, separator = "_") {
    const split = method.split(separator);
    return split[split.length - 1].trim().toLowerCase() === expected.trim().toLowerCase();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bbijs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isSubscribeRequest", ()=>isSubscribeRequest);
parcelHelpers.export(exports, "isSubscribeMethod", ()=>isSubscribeMethod);
parcelHelpers.export(exports, "isSubscribeParams", ()=>isSubscribeParams);
parcelHelpers.export(exports, "isPublishRequest", ()=>isPublishRequest);
parcelHelpers.export(exports, "isPublishMethod", ()=>isPublishMethod);
parcelHelpers.export(exports, "isPublishParams", ()=>isPublishParams);
parcelHelpers.export(exports, "isUnsubscribeRequest", ()=>isUnsubscribeRequest);
parcelHelpers.export(exports, "isUnsubscribeMethod", ()=>isUnsubscribeMethod);
parcelHelpers.export(exports, "isUnsubscribeParams", ()=>isUnsubscribeParams);
parcelHelpers.export(exports, "isSubscriptionRequest", ()=>isSubscriptionRequest);
parcelHelpers.export(exports, "isSubscriptionMethod", ()=>isSubscriptionMethod);
parcelHelpers.export(exports, "isSubscriptionParams", ()=>isSubscriptionParams);
var _misc = require("./misc");
function isSubscribeRequest(request) {
    return isSubscribeMethod(request.method) && isSubscribeParams(request.params);
}
function isSubscribeMethod(method) {
    return (0, _misc.methodEndsWith)(method, "subscribe");
}
function isSubscribeParams(params) {
    const required = [
        "topic"
    ];
    const optional = [];
    return (0, _misc.checkParams)(params, required, optional);
}
function isPublishRequest(request) {
    return isPublishMethod(request.method) && isPublishParams(request.params);
}
function isPublishMethod(method) {
    return (0, _misc.methodEndsWith)(method, "publish");
}
function isPublishParams(params) {
    const required = [
        "message",
        "topic",
        "ttl"
    ];
    const optional = [
        "prompt",
        "tag"
    ];
    return (0, _misc.checkParams)(params, required, optional);
}
function isUnsubscribeRequest(request) {
    return isUnsubscribeMethod(request.method) && isUnsubscribeParams(request.params);
}
function isUnsubscribeMethod(method) {
    return (0, _misc.methodEndsWith)(method, "unsubscribe");
}
function isUnsubscribeParams(params) {
    const required = [
        "id",
        "topic"
    ];
    const optional = [];
    return (0, _misc.checkParams)(params, required, optional);
}
function isSubscriptionRequest(request) {
    return isSubscriptionMethod(request.method) && isSubscriptionParams(request.params);
}
function isSubscriptionMethod(method) {
    return (0, _misc.methodEndsWith)(method, "subscription");
}
function isSubscriptionParams(params) {
    const required = [
        "id",
        "data"
    ];
    const optional = [];
    return (0, _misc.checkParams)(params, required, optional);
}

},{"./misc":"jc0TB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jNbf4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RELAY_JSONRPC", ()=>RELAY_JSONRPC);
const RELAY_JSONRPC = {
    waku: {
        publish: "waku_publish",
        batchPublish: "waku_batchPublish",
        subscribe: "waku_subscribe",
        batchSubscribe: "waku_batchSubscribe",
        subscription: "waku_subscription",
        unsubscribe: "waku_unsubscribe",
        batchUnsubscribe: "waku_batchUnsubscribe"
    },
    irn: {
        publish: "irn_publish",
        batchPublish: "irn_batchPublish",
        subscribe: "irn_subscribe",
        batchSubscribe: "irn_batchSubscribe",
        subscription: "irn_subscription",
        unsubscribe: "irn_unsubscribe",
        batchUnsubscribe: "irn_batchUnsubscribe"
    },
    iridium: {
        publish: "iridium_publish",
        batchPublish: "iridium_batchPublish",
        subscribe: "iridium_subscribe",
        batchSubscribe: "iridium_batchSubscribe",
        subscription: "iridium_subscription",
        unsubscribe: "iridium_unsubscribe",
        batchUnsubscribe: "iridium_batchUnsubscribe"
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6zGTK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _provider = require("./provider");
var _providerDefault = parcelHelpers.interopDefault(_provider);
parcelHelpers.exportAll(_provider, exports);
exports.default = (0, _providerDefault.default);

},{"./provider":"b01Rn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b01Rn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "JsonRpcProvider", ()=>JsonRpcProvider);
var _events = require("events");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
class JsonRpcProvider extends (0, _jsonrpcUtils.IJsonRpcProvider) {
    constructor(connection){
        super(connection);
        this.events = new (0, _events.EventEmitter)();
        this.hasRegisteredEventListeners = false;
        this.connection = this.setConnection(connection);
        if (this.connection.connected) this.registerEventListeners();
    }
    async connect(connection = this.connection) {
        await this.open(connection);
    }
    async disconnect() {
        await this.close();
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    async request(request, context) {
        return this.requestStrict((0, _jsonrpcUtils.formatJsonRpcRequest)(request.method, request.params || []), context);
    }
    async requestStrict(request, context) {
        return new Promise(async (resolve, reject)=>{
            if (!this.connection.connected) try {
                await this.open();
            } catch (e) {
                reject(e);
            }
            this.events.on(`${request.id}`, (response)=>{
                if ((0, _jsonrpcUtils.isJsonRpcError)(response)) reject(response.error);
                else resolve(response.result);
            });
            try {
                await this.connection.send(request, context);
            } catch (e) {
                reject(e);
            }
        });
    }
    setConnection(connection = this.connection) {
        return connection;
    }
    onPayload(payload) {
        this.events.emit("payload", payload);
        if ((0, _jsonrpcUtils.isJsonRpcResponse)(payload)) this.events.emit(`${payload.id}`, payload);
        else this.events.emit("message", {
            type: payload.method,
            data: payload.params
        });
    }
    async open(connection = this.connection) {
        if (this.connection === connection && this.connection.connected) return;
        if (this.connection.connected) this.close();
        if (typeof connection === "string") {
            await this.connection.open(connection);
            connection = this.connection;
        }
        this.connection = this.setConnection(connection);
        await this.connection.open();
        this.registerEventListeners();
        this.events.emit("connect");
    }
    async close() {
        await this.connection.close();
    }
    registerEventListeners() {
        if (this.hasRegisteredEventListeners) return;
        this.connection.on("payload", (payload)=>this.onPayload(payload));
        this.connection.on("close", ()=>this.events.emit("disconnect"));
        this.connection.on("error", (error)=>this.events.emit("error", error));
        this.hasRegisteredEventListeners = true;
    }
}
exports.default = JsonRpcProvider;

},{"events":"1VQLm","@walletconnect/jsonrpc-utils":"izCJ8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"izCJ8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constants = require("./constants");
parcelHelpers.exportAll(_constants, exports);
var _error = require("./error");
parcelHelpers.exportAll(_error, exports);
var _env = require("./env");
parcelHelpers.exportAll(_env, exports);
var _format = require("./format");
parcelHelpers.exportAll(_format, exports);
var _routing = require("./routing");
parcelHelpers.exportAll(_routing, exports);
var _types = require("./types");
parcelHelpers.exportAll(_types, exports);
var _url = require("./url");
parcelHelpers.exportAll(_url, exports);
var _validators = require("./validators");
parcelHelpers.exportAll(_validators, exports);

},{"./constants":"d7FKU","./error":"6cKI0","./env":"lEoTu","./format":"3MpJQ","./routing":"lN6fi","./types":"7i0GH","./url":"jQ6RQ","./validators":"6oD1U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d7FKU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PARSE_ERROR", ()=>PARSE_ERROR);
parcelHelpers.export(exports, "INVALID_REQUEST", ()=>INVALID_REQUEST);
parcelHelpers.export(exports, "METHOD_NOT_FOUND", ()=>METHOD_NOT_FOUND);
parcelHelpers.export(exports, "INVALID_PARAMS", ()=>INVALID_PARAMS);
parcelHelpers.export(exports, "INTERNAL_ERROR", ()=>INTERNAL_ERROR);
parcelHelpers.export(exports, "SERVER_ERROR", ()=>SERVER_ERROR);
parcelHelpers.export(exports, "RESERVED_ERROR_CODES", ()=>RESERVED_ERROR_CODES);
parcelHelpers.export(exports, "SERVER_ERROR_CODE_RANGE", ()=>SERVER_ERROR_CODE_RANGE);
parcelHelpers.export(exports, "STANDARD_ERROR_MAP", ()=>STANDARD_ERROR_MAP);
parcelHelpers.export(exports, "DEFAULT_ERROR", ()=>DEFAULT_ERROR);
const PARSE_ERROR = "PARSE_ERROR";
const INVALID_REQUEST = "INVALID_REQUEST";
const METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
const INVALID_PARAMS = "INVALID_PARAMS";
const INTERNAL_ERROR = "INTERNAL_ERROR";
const SERVER_ERROR = "SERVER_ERROR";
const RESERVED_ERROR_CODES = [
    -32700,
    -32600,
    -32601,
    -32602,
    -32603
];
const SERVER_ERROR_CODE_RANGE = [
    -32000,
    -32099
];
const STANDARD_ERROR_MAP = {
    [PARSE_ERROR]: {
        code: -32700,
        message: "Parse error"
    },
    [INVALID_REQUEST]: {
        code: -32600,
        message: "Invalid Request"
    },
    [METHOD_NOT_FOUND]: {
        code: -32601,
        message: "Method not found"
    },
    [INVALID_PARAMS]: {
        code: -32602,
        message: "Invalid params"
    },
    [INTERNAL_ERROR]: {
        code: -32603,
        message: "Internal error"
    },
    [SERVER_ERROR]: {
        code: -32000,
        message: "Server error"
    }
};
const DEFAULT_ERROR = SERVER_ERROR;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6cKI0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isServerErrorCode", ()=>isServerErrorCode);
parcelHelpers.export(exports, "isReservedErrorCode", ()=>isReservedErrorCode);
parcelHelpers.export(exports, "isValidErrorCode", ()=>isValidErrorCode);
parcelHelpers.export(exports, "getError", ()=>getError);
parcelHelpers.export(exports, "getErrorByCode", ()=>getErrorByCode);
parcelHelpers.export(exports, "validateJsonRpcError", ()=>validateJsonRpcError);
parcelHelpers.export(exports, "parseConnectionError", ()=>parseConnectionError);
var _constants = require("./constants");
function isServerErrorCode(code) {
    return code <= (0, _constants.SERVER_ERROR_CODE_RANGE)[0] && code >= (0, _constants.SERVER_ERROR_CODE_RANGE)[1];
}
function isReservedErrorCode(code) {
    return (0, _constants.RESERVED_ERROR_CODES).includes(code);
}
function isValidErrorCode(code) {
    return typeof code === "number";
}
function getError(type) {
    if (!Object.keys((0, _constants.STANDARD_ERROR_MAP)).includes(type)) return (0, _constants.STANDARD_ERROR_MAP)[0, _constants.DEFAULT_ERROR];
    return (0, _constants.STANDARD_ERROR_MAP)[type];
}
function getErrorByCode(code) {
    const match = Object.values((0, _constants.STANDARD_ERROR_MAP)).find((e)=>e.code === code);
    if (!match) return (0, _constants.STANDARD_ERROR_MAP)[0, _constants.DEFAULT_ERROR];
    return match;
}
function validateJsonRpcError(response) {
    if (typeof response.error.code === "undefined") return {
        valid: false,
        error: "Missing code for JSON-RPC error"
    };
    if (typeof response.error.message === "undefined") return {
        valid: false,
        error: "Missing message for JSON-RPC error"
    };
    if (!isValidErrorCode(response.error.code)) return {
        valid: false,
        error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
    if (isReservedErrorCode(response.error.code)) {
        const error = getErrorByCode(response.error.code);
        if (error.message !== (0, _constants.STANDARD_ERROR_MAP)[0, _constants.DEFAULT_ERROR].message && response.error.message === error.message) return {
            valid: false,
            error: `Invalid error code message for JSON-RPC: ${response.error.code}`
        };
    }
    return {
        valid: true
    };
}
function parseConnectionError(e, url, type) {
    return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e;
}

},{"./constants":"d7FKU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lEoTu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isNodeJs", ()=>isNodeJs);
var _environment = require("@walletconnect/environment");
parcelHelpers.exportAll(_environment, exports);
const isNodeJs = (0, _environment.isNode);

},{"@walletconnect/environment":"6xtT3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6xtT3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("b71187705cb575c0");
tslib_1.__exportStar(require("90e3739fc028ffcf"), exports);
tslib_1.__exportStar(require("246621c752bdd58d"), exports);

},{"b71187705cb575c0":"1FYm6","90e3739fc028ffcf":"4dzvu","246621c752bdd58d":"a11RJ"}],"1FYm6":[function(require,module,exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__extends", ()=>__extends);
parcelHelpers.export(exports, "__assign", ()=>__assign);
parcelHelpers.export(exports, "__rest", ()=>__rest);
parcelHelpers.export(exports, "__decorate", ()=>__decorate);
parcelHelpers.export(exports, "__param", ()=>__param);
parcelHelpers.export(exports, "__metadata", ()=>__metadata);
parcelHelpers.export(exports, "__awaiter", ()=>__awaiter);
parcelHelpers.export(exports, "__generator", ()=>__generator);
parcelHelpers.export(exports, "__createBinding", ()=>__createBinding);
parcelHelpers.export(exports, "__exportStar", ()=>__exportStar);
parcelHelpers.export(exports, "__values", ()=>__values);
parcelHelpers.export(exports, "__read", ()=>__read);
parcelHelpers.export(exports, "__spread", ()=>__spread);
parcelHelpers.export(exports, "__spreadArrays", ()=>__spreadArrays);
parcelHelpers.export(exports, "__await", ()=>__await);
parcelHelpers.export(exports, "__asyncGenerator", ()=>__asyncGenerator);
parcelHelpers.export(exports, "__asyncDelegator", ()=>__asyncDelegator);
parcelHelpers.export(exports, "__asyncValues", ()=>__asyncValues);
parcelHelpers.export(exports, "__makeTemplateObject", ()=>__makeTemplateObject);
parcelHelpers.export(exports, "__importStar", ()=>__importStar);
parcelHelpers.export(exports, "__importDefault", ()=>__importDefault);
parcelHelpers.export(exports, "__classPrivateFieldGet", ()=>__classPrivateFieldGet);
parcelHelpers.export(exports, "__classPrivateFieldSet", ()=>__classPrivateFieldSet);
var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to set private field on non-instance");
    privateMap.set(receiver, value);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4dzvu":[function(require,module,exports) {
var global = arguments[3];
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
function getBrowerCrypto() {
    return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
}
exports.getBrowerCrypto = getBrowerCrypto;
function getSubtleCrypto() {
    const browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
}
exports.getSubtleCrypto = getSubtleCrypto;
function isBrowserCryptoAvailable() {
    return !!getBrowerCrypto() && !!getSubtleCrypto();
}
exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;

},{}],"a11RJ":[function(require,module,exports) {
var process = require("76f32cefb7a71bf4");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
function isReactNative() {
    return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
}
exports.isReactNative = isReactNative;
function isNode() {
    return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
}
exports.isNode = isNode;
function isBrowser() {
    return !isReactNative() && !isNode();
}
exports.isBrowser = isBrowser;

},{"76f32cefb7a71bf4":"d5jf4"}],"3MpJQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "payloadId", ()=>payloadId);
parcelHelpers.export(exports, "formatJsonRpcRequest", ()=>formatJsonRpcRequest);
parcelHelpers.export(exports, "formatJsonRpcResult", ()=>formatJsonRpcResult);
parcelHelpers.export(exports, "formatJsonRpcError", ()=>formatJsonRpcError);
parcelHelpers.export(exports, "formatErrorMessage", ()=>formatErrorMessage);
var _error = require("./error");
var _constants = require("./constants");
function payloadId() {
    const date = Date.now() * Math.pow(10, 3);
    const extra = Math.floor(Math.random() * Math.pow(10, 3));
    return date + extra;
}
function formatJsonRpcRequest(method, params, id) {
    return {
        id: id || payloadId(),
        jsonrpc: "2.0",
        method,
        params
    };
}
function formatJsonRpcResult(id, result) {
    return {
        id,
        jsonrpc: "2.0",
        result
    };
}
function formatJsonRpcError(id, error, data) {
    return {
        id,
        jsonrpc: "2.0",
        error: formatErrorMessage(error, data)
    };
}
function formatErrorMessage(error, data) {
    if (typeof error === "undefined") return (0, _error.getError)((0, _constants.INTERNAL_ERROR));
    if (typeof error === "string") error = Object.assign(Object.assign({}, (0, _error.getError)((0, _constants.SERVER_ERROR))), {
        message: error
    });
    if (typeof data !== "undefined") error.data = data;
    if ((0, _error.isReservedErrorCode)(error.code)) error = (0, _error.getErrorByCode)(error.code);
    return error;
}

},{"./error":"6cKI0","./constants":"d7FKU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lN6fi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isValidRoute", ()=>isValidRoute);
parcelHelpers.export(exports, "isValidDefaultRoute", ()=>isValidDefaultRoute);
parcelHelpers.export(exports, "isValidWildcardRoute", ()=>isValidWildcardRoute);
parcelHelpers.export(exports, "isValidLeadingWildcardRoute", ()=>isValidLeadingWildcardRoute);
parcelHelpers.export(exports, "isValidTrailingWildcardRoute", ()=>isValidTrailingWildcardRoute);
function isValidRoute(route) {
    if (route.includes("*")) return isValidWildcardRoute(route);
    if (/\W/g.test(route)) return false;
    return true;
}
function isValidDefaultRoute(route) {
    return route === "*";
}
function isValidWildcardRoute(route) {
    if (isValidDefaultRoute(route)) return true;
    if (!route.includes("*")) return false;
    if (route.split("*").length !== 2) return false;
    if (route.split("*").filter((x)=>x.trim() === "").length !== 1) return false;
    return true;
}
function isValidLeadingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7i0GH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsonrpcTypes = require("@walletconnect/jsonrpc-types");
parcelHelpers.exportAll(_jsonrpcTypes, exports);

},{"@walletconnect/jsonrpc-types":"TA1tb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"TA1tb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsonrpc = require("./jsonrpc");
parcelHelpers.exportAll(_jsonrpc, exports);
var _misc = require("./misc");
parcelHelpers.exportAll(_misc, exports);
var _provider = require("./provider");
parcelHelpers.exportAll(_provider, exports);
var _validator = require("./validator");
parcelHelpers.exportAll(_validator, exports);

},{"./jsonrpc":"jl24H","./misc":"8NPUm","./provider":"bxCYq","./validator":"bDite","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jl24H":[function(require,module,exports) {

},{}],"8NPUm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IEvents", ()=>IEvents);
class IEvents {
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bxCYq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "IJsonRpcConnection", ()=>IJsonRpcConnection);
parcelHelpers.export(exports, "IBaseJsonRpcProvider", ()=>IBaseJsonRpcProvider);
parcelHelpers.export(exports, "IJsonRpcProvider", ()=>IJsonRpcProvider);
var _misc = require("./misc");
class IJsonRpcConnection extends (0, _misc.IEvents) {
    constructor(opts){
        super();
    }
}
class IBaseJsonRpcProvider extends (0, _misc.IEvents) {
    constructor(){
        super();
    }
}
class IJsonRpcProvider extends IBaseJsonRpcProvider {
    constructor(connection){
        super();
    }
}

},{"./misc":"8NPUm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bDite":[function(require,module,exports) {

},{}],"jQ6RQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isHttpUrl", ()=>isHttpUrl);
parcelHelpers.export(exports, "isWsUrl", ()=>isWsUrl);
parcelHelpers.export(exports, "isLocalhostUrl", ()=>isLocalhostUrl);
const HTTP_REGEX = "^https?:";
const WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
    const matches = url.match(new RegExp(/^\w+:/, "gi"));
    if (!matches || !matches.length) return;
    return matches[0];
}
function matchRegexProtocol(url, regex) {
    const protocol = getUrlProtocol(url);
    if (typeof protocol === "undefined") return false;
    return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
    return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
    return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6oD1U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isJsonRpcPayload", ()=>isJsonRpcPayload);
parcelHelpers.export(exports, "isJsonRpcRequest", ()=>isJsonRpcRequest);
parcelHelpers.export(exports, "isJsonRpcResponse", ()=>isJsonRpcResponse);
parcelHelpers.export(exports, "isJsonRpcResult", ()=>isJsonRpcResult);
parcelHelpers.export(exports, "isJsonRpcError", ()=>isJsonRpcError);
parcelHelpers.export(exports, "isJsonRpcValidationInvalid", ()=>isJsonRpcValidationInvalid);
function isJsonRpcPayload(payload) {
    return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
    return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
    return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
    return "result" in payload;
}
function isJsonRpcError(payload) {
    return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
    return "error" in validation && validation.valid === false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gsp7F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _ws = require("./ws");
var _wsDefault = parcelHelpers.interopDefault(_ws);
parcelHelpers.exportAll(_ws, exports);
exports.default = (0, _wsDefault.default);

},{"./ws":"h8dI4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h8dI4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WsConnection", ()=>WsConnection);
var _events = require("events");
var _safeJson = require("@walletconnect/safe-json");
var _jsonrpcUtils = require("@walletconnect/jsonrpc-utils");
var global = arguments[3];
const EVENT_EMITTER_MAX_LISTENERS_DEFAULT = 10;
const resolveWebSocketImplementation = ()=>{
    if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") return global.WebSocket;
    if (typeof window !== "undefined" && typeof window.WebSocket !== "undefined") return window.WebSocket;
    return require("34407ab21e4f1862");
};
const isBrowser = ()=>typeof window !== "undefined";
const WS = resolveWebSocketImplementation();
class WsConnection {
    constructor(url){
        this.url = url;
        this.events = new (0, _events.EventEmitter)();
        this.registering = false;
        if (!(0, _jsonrpcUtils.isWsUrl)(url)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
        this.url = url;
    }
    get connected() {
        return typeof this.socket !== "undefined";
    }
    get connecting() {
        return this.registering;
    }
    on(event, listener) {
        this.events.on(event, listener);
    }
    once(event, listener) {
        this.events.once(event, listener);
    }
    off(event, listener) {
        this.events.off(event, listener);
    }
    removeListener(event, listener) {
        this.events.removeListener(event, listener);
    }
    async open(url = this.url) {
        await this.register(url);
    }
    async close() {
        return new Promise((resolve, reject)=>{
            if (typeof this.socket === "undefined") {
                reject(new Error("Connection already closed"));
                return;
            }
            this.socket.onclose = ()=>{
                this.onClose();
                resolve();
            };
            this.socket.close();
        });
    }
    async send(payload, context) {
        if (typeof this.socket === "undefined") this.socket = await this.register();
        try {
            this.socket.send((0, _safeJson.safeJsonStringify)(payload));
        } catch (e) {
            this.onError(payload.id, e);
        }
    }
    register(url = this.url) {
        if (!(0, _jsonrpcUtils.isWsUrl)(url)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
        if (this.registering) {
            const currentMaxListeners = this.events.getMaxListeners();
            if (this.events.listenerCount("register_error") >= currentMaxListeners || this.events.listenerCount("open") >= currentMaxListeners) this.events.setMaxListeners(currentMaxListeners + 1);
            return new Promise((resolve, reject)=>{
                this.events.once("register_error", (error)=>{
                    this.resetMaxListeners();
                    reject(error);
                });
                this.events.once("open", ()=>{
                    this.resetMaxListeners();
                    if (typeof this.socket === "undefined") return reject(new Error("WebSocket connection is missing or invalid"));
                    resolve(this.socket);
                });
            });
        }
        this.url = url;
        this.registering = true;
        return new Promise((resolve, reject)=>{
            const opts = !(0, _jsonrpcUtils.isReactNative)() ? {
                rejectUnauthorized: !(0, _jsonrpcUtils.isLocalhostUrl)(url)
            } : undefined;
            const socket = new WS(url, [], opts);
            if (isBrowser()) socket.onerror = (event)=>{
                const errorEvent = event;
                reject(this.emitError(errorEvent.error));
            };
            else socket.on("error", (errorEvent)=>{
                reject(this.emitError(errorEvent));
            });
            socket.onopen = ()=>{
                this.onOpen(socket);
                resolve(socket);
            };
        });
    }
    onOpen(socket) {
        socket.onmessage = (event)=>this.onPayload(event);
        socket.onclose = ()=>this.onClose();
        this.socket = socket;
        this.registering = false;
        this.events.emit("open");
    }
    onClose() {
        this.socket = undefined;
        this.registering = false;
        this.events.emit("close");
    }
    onPayload(e) {
        if (typeof e.data === "undefined") return;
        const payload = typeof e.data === "string" ? (0, _safeJson.safeJsonParse)(e.data) : e.data;
        this.events.emit("payload", payload);
    }
    onError(id, e) {
        const error = this.parseError(e);
        const message = error.message || error.toString();
        const payload = (0, _jsonrpcUtils.formatJsonRpcError)(id, message);
        this.events.emit("payload", payload);
    }
    parseError(e, url = this.url) {
        return (0, _jsonrpcUtils.parseConnectionError)(e, url, "WS");
    }
    resetMaxListeners() {
        if (this.events.getMaxListeners() > EVENT_EMITTER_MAX_LISTENERS_DEFAULT) this.events.setMaxListeners(EVENT_EMITTER_MAX_LISTENERS_DEFAULT);
    }
    emitError(errorEvent) {
        const error = this.parseError(new Error((errorEvent === null || errorEvent === void 0 ? void 0 : errorEvent.message) || `WebSocket connection failed for URL: ${this.url}`));
        this.events.emit("register_error", error);
        return error;
    }
}
exports.default = WsConnection;

},{"events":"1VQLm","@walletconnect/safe-json":"5eViC","@walletconnect/jsonrpc-utils":"izCJ8","34407ab21e4f1862":"4OuWD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5eViC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "safeJsonParse", ()=>safeJsonParse);
parcelHelpers.export(exports, "safeJsonStringify", ()=>safeJsonStringify);
function safeJsonParse(value) {
    if (typeof value !== "string") throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    try {
        return JSON.parse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSON.stringify(value);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4OuWD":[function(require,module,exports) {
"use strict";
module.exports = function() {
    throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
};

},{}],"gLpYu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ICore", ()=>n);
parcelHelpers.export(exports, "ICrypto", ()=>l);
parcelHelpers.export(exports, "IEngine", ()=>C);
parcelHelpers.export(exports, "IEngineEvents", ()=>b);
parcelHelpers.export(exports, "IExpirer", ()=>E);
parcelHelpers.export(exports, "IJsonRpcHistory", ()=>h);
parcelHelpers.export(exports, "IKeyChain", ()=>d);
parcelHelpers.export(exports, "IMessageTracker", ()=>a);
parcelHelpers.export(exports, "IPairing", ()=>m);
parcelHelpers.export(exports, "IPublisher", ()=>u);
parcelHelpers.export(exports, "IRelayer", ()=>g);
parcelHelpers.export(exports, "ISignClient", ()=>y);
parcelHelpers.export(exports, "ISignClientEvents", ()=>v);
parcelHelpers.export(exports, "IStore", ()=>p);
parcelHelpers.export(exports, "ISubscriber", ()=>x);
parcelHelpers.export(exports, "ISubscriberTopicMap", ()=>I);
var _events = require("@walletconnect/events");
var _events1 = require("events");
var _eventsDefault = parcelHelpers.interopDefault(_events1);
class n extends (0, _events.IEvents) {
    constructor(s){
        super(), this.opts = s, this.protocol = "wc", this.version = 2;
    }
}
class l {
    constructor(s, t, o){
        this.core = s, this.logger = t;
    }
}
class h extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.core = s, this.logger = t, this.records = new Map;
    }
}
class a {
    constructor(s, t){
        this.logger = s, this.core = t;
    }
}
class u extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.relayer = s, this.logger = t;
    }
}
class g extends (0, _events.IEvents) {
    constructor(s){
        super();
    }
}
class p {
    constructor(s, t, o, S){
        this.core = s, this.logger = t, this.name = o;
    }
}
class I {
    constructor(){
        this.map = new Map;
    }
}
class x extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.relayer = s, this.logger = t;
    }
}
class d {
    constructor(s, t){
        this.core = s, this.logger = t;
    }
}
class E extends (0, _events.IEvents) {
    constructor(s, t){
        super(), this.core = s, this.logger = t;
    }
}
class m {
    constructor(s, t){
        this.logger = s, this.core = t;
    }
}
class v extends (0, _eventsDefault.default) {
    constructor(){
        super();
    }
}
class y {
    constructor(s){
        this.opts = s, this.protocol = "wc", this.version = 2;
    }
}
class b extends (0, _events1.EventEmitter) {
    constructor(){
        super();
    }
}
class C {
    constructor(s){
        this.client = s;
    }
}

},{"@walletconnect/events":"aO3HO","events":"1VQLm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"720YK":[function(require,module,exports) {
// Taken from https://stackoverflow.com/a/41429145/2247097
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ClientNotInitializedError", ()=>ClientNotInitializedError);
parcelHelpers.export(exports, "QRCodeModalError", ()=>QRCodeModalError);
class ClientNotInitializedError extends Error {
    constructor(){
        super();
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ClientNotInitializedError.prototype);
    }
}
class QRCodeModalError extends Error {
    constructor(){
        super();
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, QRCodeModalError.prototype);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["brz8p"], null, "parcelRequirec720")

//# sourceMappingURL=esm.8c440535.js.map
