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
})({"fJU1A":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ba8644887e9923c9";
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

},{}],"bNT9h":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(require("9cf88938fb58965d"), exports);

},{"9cf88938fb58965d":"53cBQ"}],"53cBQ":[function(require,module,exports) {
"use strict";
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
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
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FractalWalletAdapterImpl = void 0;
const popup_connection_1 = require("bdfcee39a4c10e3e");
const wallet_adapter_base_1 = require("9d763ef86549932a");
const web3_js_1 = require("e13c8b851ed44233");
const bs58_1 = __importDefault(require("6a03d3b833d49c1c"));
const nonce_1 = require("d2fcd5b850a91429");
const UNKNOWN_ERROR_MESSAGE = "Unknown Error";
const FRACTAL_DOMAIN_HTTPS = "https://fractal.is";
const APPROVE_PAGE_URL = `${FRACTAL_DOMAIN_HTTPS}/wallet-adapter/approve`;
const SIGN_PAGE_URL = `${FRACTAL_DOMAIN_HTTPS}/wallet-adapter/sign`;
const SIGN_MESSAGE_PAGE_URL = `${FRACTAL_DOMAIN_HTTPS}/wallet-adapter/sign/message`;
const MIN_POPUP_HEIGHT_PX = popup_connection_1.DEFAULT_POPUP_HEIGHT_PX;
const MAX_POPUP_WIDTH_PX = 850;
const LOCAL_STORAGE_KEY_FOR_PUBLIC_KEY = "RdxqNYxF";
class FractalWalletAdapterImpl {
    constructor(){
        this.popupManager = new popup_connection_1.ConnectionManager(popup_connection_1.Platform.SOLANA_WALLET_ADAPTER);
        this.publicKey = null;
        this.connecting = false;
    }
    getPublicKey() {
        return this.publicKey;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function*() {
            let resolve;
            let reject;
            const publicKeyInLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY_FOR_PUBLIC_KEY);
            if (publicKeyInLocalStorage) {
                this.publicKey = new web3_js_1.PublicKey(publicKeyInLocalStorage);
                return Promise.resolve();
            }
            const nonce = (0, nonce_1.createNonce)();
            this.popupManager.open({
                nonce,
                url: `${APPROVE_PAGE_URL}/${nonce}`
            });
            const handleSolanaWalletAdapterApproved = (payload)=>{
                if (!(0, popup_connection_1.assertPayloadIsSolanaWalletAdapterApproved)(payload)) {
                    reject(new wallet_adapter_base_1.WalletConnectionError("Malformed payload when setting up connection. Expected { solanaPublicKey: string } but " + `received ${JSON.stringify(payload)}`));
                    this.popupManager.close();
                    return;
                }
                try {
                    this.publicKey = new web3_js_1.PublicKey(payload.solanaPublicKey);
                    window.localStorage.setItem(LOCAL_STORAGE_KEY_FOR_PUBLIC_KEY, payload.solanaPublicKey);
                    resolve();
                } catch (error) {
                    const publicKeyError = new wallet_adapter_base_1.WalletPublicKeyError(error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE, error);
                    reject(publicKeyError);
                }
                this.popupManager.close();
            };
            const handleExplicitDenialByUser = ()=>{
                reject(new wallet_adapter_base_1.WalletConnectionError("The user denied the connection."));
                this.popupManager.close();
            };
            const handleClosedByUser = ()=>{
                reject(new wallet_adapter_base_1.WalletConnectionError("The user denied the connection."));
                this.popupManager.close();
            };
            this.popupManager.onConnectionUpdated((connection)=>{
                if (!connection) return;
                connection.on(popup_connection_1.PopupEvent.SOLANA_WALLET_ADAPTER_APPROVED, handleSolanaWalletAdapterApproved);
                connection.on(popup_connection_1.PopupEvent.SOLANA_WALLET_ADAPTER_DENIED, handleExplicitDenialByUser);
                connection.on(popup_connection_1.PopupEvent.POPUP_CLOSED, handleClosedByUser);
            });
            return new Promise((promiseResolver, promiseRejector)=>{
                resolve = promiseResolver;
                reject = promiseRejector;
            });
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function*() {
            this.popupManager.tearDown();
            this.publicKey = null;
            window.localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_PUBLIC_KEY);
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                this.checkWalletReadiness();
                const result = yield this.signTransactions([
                    transaction
                ]);
                return result[0];
            } catch (error) {
                let errorToThrow = error;
                if (!(error instanceof wallet_adapter_base_1.WalletError)) errorToThrow = new wallet_adapter_base_1.WalletSignTransactionError(error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE, error);
                throw errorToThrow;
            }
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                this.checkWalletReadiness();
                const result = yield this.signTransactions(transactions);
                return result;
            } catch (error) {
                let errorToThrow = error;
                if (!(error instanceof wallet_adapter_base_1.WalletError)) errorToThrow = new wallet_adapter_base_1.WalletSignTransactionError(error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE, error);
                throw errorToThrow;
            }
        });
    }
    signMessage(encodedMessage) {
        return __awaiter(this, void 0, void 0, function*() {
            const decodedMessage = new TextDecoder().decode(encodedMessage);
            let resolve;
            let reject;
            const handleMessageSignatureNeededResponse = (payload)=>{
                if (!(0, popup_connection_1.assertPayloadIsMessageSignatureNeededResponsePayload)(payload)) {
                    const error = new wallet_adapter_base_1.WalletSignMessageError("Malformed payload when signing message. Expected { decodedSignature: string } " + `but received ${JSON.stringify(payload)}`);
                    reject(error);
                    this.popupManager.close();
                    return;
                }
                const encodedSignature = Uint8Array.from(payload.decodedSignature.split(",").map((n)=>Number(n)));
                resolve(encodedSignature);
                this.popupManager.close();
            };
            const handleClosedOrDeniedByUser = ()=>{
                reject(new wallet_adapter_base_1.WalletSignMessageError("The user did not approve the message"));
                this.popupManager.close();
            };
            const handleAuthLoaded = ()=>{
                var _a;
                const payload = {
                    decodedMessage
                };
                (_a = this.popupManager.getConnection()) === null || _a === void 0 || _a.send({
                    event: popup_connection_1.PopupEvent.MESSAGE_SIGNATURE_NEEDED,
                    payload
                });
            };
            const nonce = (0, nonce_1.createNonce)();
            this.popupManager.open({
                heightPx: Math.max(MIN_POPUP_HEIGHT_PX, Math.floor(window.innerHeight * 0.8)),
                nonce,
                url: `${SIGN_MESSAGE_PAGE_URL}/${nonce}`,
                widthPx: Math.min(MAX_POPUP_WIDTH_PX, Math.floor(window.innerWidth * 0.8))
            });
            this.popupManager.onConnectionUpdated((connection)=>{
                if (!connection) return;
                connection.on(popup_connection_1.PopupEvent.MESSAGE_SIGNATURE_NEEDED_RESPONSE, handleMessageSignatureNeededResponse);
                connection.on(popup_connection_1.PopupEvent.TRANSACTION_DENIED, handleClosedOrDeniedByUser);
                connection.on(popup_connection_1.PopupEvent.POPUP_CLOSED, handleClosedOrDeniedByUser);
                connection.on(popup_connection_1.PopupEvent.AUTH_LOADED, handleAuthLoaded);
            });
            return new Promise((promiseResolver, promiseRejector)=>{
                resolve = promiseResolver;
                reject = promiseRejector;
            });
        });
    }
    signTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function*() {
            let resolve;
            let reject;
            const handleTransactionSignatureNeededResponse = (payload)=>{
                if (!(0, popup_connection_1.assertPayloadIsTransactionSignatureNeededResponsePayload)(payload)) {
                    const error = new wallet_adapter_base_1.WalletSignTransactionError("Malformed payload when signing transactions. Expected { signedB58Transactions: string[] } " + `but received ${JSON.stringify(payload)}`);
                    reject(error);
                    this.popupManager.close();
                    return;
                }
                const signedTransactions = payload.signedB58Transactions.map((signedB58Transaction)=>{
                    return web3_js_1.Transaction.from(bs58_1.default.decode(signedB58Transaction));
                });
                resolve(signedTransactions);
                this.popupManager.close();
            };
            const handleClosedOrDeniedByUser = ()=>{
                reject(new wallet_adapter_base_1.WalletSignTransactionError("The user did not approve the transaction"));
                this.popupManager.close();
            };
            const handleAuthLoaded = ()=>{
                var _a;
                const payload = {
                    unsignedB58Transactions: transactions.map((t)=>bs58_1.default.encode(t.serializeMessage()))
                };
                (_a = this.popupManager.getConnection()) === null || _a === void 0 || _a.send({
                    event: popup_connection_1.PopupEvent.TRANSACTION_SIGNATURE_NEEDED,
                    payload
                });
            };
            const nonce = (0, nonce_1.createNonce)();
            this.popupManager.open({
                heightPx: Math.max(MIN_POPUP_HEIGHT_PX, Math.floor(window.innerHeight * 0.8)),
                nonce,
                url: `${SIGN_PAGE_URL}/${nonce}`,
                widthPx: Math.min(MAX_POPUP_WIDTH_PX, Math.floor(window.innerWidth * 0.8))
            });
            this.popupManager.onConnectionUpdated((connection)=>{
                if (!connection) return;
                connection.on(popup_connection_1.PopupEvent.TRANSACTION_SIGNATURE_NEEDED_RESPONSE, handleTransactionSignatureNeededResponse);
                connection.on(popup_connection_1.PopupEvent.TRANSACTION_DENIED, handleClosedOrDeniedByUser);
                connection.on(popup_connection_1.PopupEvent.POPUP_CLOSED, handleClosedOrDeniedByUser);
                connection.on(popup_connection_1.PopupEvent.AUTH_LOADED, handleAuthLoaded);
            });
            return new Promise((promiseResolver, promiseRejector)=>{
                resolve = promiseResolver;
                reject = promiseRejector;
            });
        });
    }
    checkWalletReadiness() {
        if (this.publicKey === null) throw new wallet_adapter_base_1.WalletNotConnectedError("`publicKey` is null. Did you forget to call `.connect()`?");
    }
}
exports.FractalWalletAdapterImpl = FractalWalletAdapterImpl;

},{"bdfcee39a4c10e3e":"2EAng","9d763ef86549932a":"gpq2T","e13c8b851ed44233":"5JBKN","6a03d3b833d49c1c":"4ji3p","d2fcd5b850a91429":"gaYK8"}],"2EAng":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_POPUP_WIDTH_PX = exports.DEFAULT_POPUP_HEIGHT_PX = exports.Connection = exports.Platform = exports.PopupEvent = void 0;
var types_1 = require("6d5e1ef4eb082d7e");
Object.defineProperty(exports, "PopupEvent", {
    enumerable: true,
    get: function() {
        return types_1.PopupEvent;
    }
});
Object.defineProperty(exports, "Platform", {
    enumerable: true,
    get: function() {
        return types_1.Platform;
    }
});
var connection_1 = require("9d3c614b809a0638");
Object.defineProperty(exports, "Connection", {
    enumerable: true,
    get: function() {
        return connection_1.Connection;
    }
});
__exportStar(require("efcdc9d8f0784652"), exports);
__exportStar(require("6f33356b33ff61a0"), exports);
__exportStar(require("beb08e74cd310594"), exports);
var constants_1 = require("7b6ef9e5b9a35914");
Object.defineProperty(exports, "DEFAULT_POPUP_HEIGHT_PX", {
    enumerable: true,
    get: function() {
        return constants_1.DEFAULT_POPUP_HEIGHT_PX;
    }
});
Object.defineProperty(exports, "DEFAULT_POPUP_WIDTH_PX", {
    enumerable: true,
    get: function() {
        return constants_1.DEFAULT_POPUP_WIDTH_PX;
    }
});

},{"6d5e1ef4eb082d7e":"kgFZ7","9d3c614b809a0638":"7auUo","efcdc9d8f0784652":"1tF9q","6f33356b33ff61a0":"6rew1","beb08e74cd310594":"3YHkv","7b6ef9e5b9a35914":"kF6OS"}],"kgFZ7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Platform = exports.PopupEvent = void 0;
var PopupEvent;
(function(PopupEvent) {
    PopupEvent["PROJECT_APPROVED"] = "PROJECT_APPROVED";
    PopupEvent["HANDSHAKE"] = "HANDSHAKE";
    PopupEvent["HANDSHAKE_ACK"] = "HANDSHAKE_ACK";
    PopupEvent["SIGNED_TRANSACTION"] = "SIGNED_TRANSACTION";
    PopupEvent["FAILED_TO_SIGN_TRANSACTION"] = "FAILED_TO_SIGN_TRANSACTION";
    PopupEvent["TRANSACTION_DENIED"] = "TRANSACTION_DENIED";
    PopupEvent["SOLANA_WALLET_ADAPTER_APPROVED"] = "SOLANA_WALLET_ADAPTER_APPROVED";
    PopupEvent["SOLANA_WALLET_ADAPTER_DENIED"] = "SOLANA_WALLET_ADAPTER_DENIED";
    PopupEvent["POPUP_CLOSED"] = "POPUP_CLOSED";
    PopupEvent["TRANSACTION_SIGNATURE_NEEDED"] = "TRANSACTION_SIGNATURE_NEEDED";
    PopupEvent["TRANSACTION_SIGNATURE_NEEDED_RESPONSE"] = "TRANSACTION_SIGNATURE_NEEDED_RESPONSE";
    PopupEvent["AUTH_LOADED"] = "AUTH_LOADED";
    PopupEvent["MESSAGE_SIGNATURE_NEEDED"] = "MESSAGE_SIGNATURE_NEEDED";
    PopupEvent["MESSAGE_SIGNATURE_NEEDED_RESPONSE"] = "MESSAGE_SIGNATURE_NEEDED_RESPONSE";
    PopupEvent["ONRAMP_FULFILLMENT_COMPLETE"] = "ONRAMP_FULFILLMENT_COMPLETE";
    PopupEvent["ONRAMP_REJECTED"] = "ONRAMP_REJECTED";
})(PopupEvent = exports.PopupEvent || (exports.PopupEvent = {}));
var Platform;
(function(Platform) {
    Platform["UNKNOWN"] = "UNKNOWN";
    Platform["REACT_SDK"] = "REACT_SDK";
    Platform["SOLANA_WALLET_ADAPTER"] = "SOLANA_WALLET_ADAPTER";
})(Platform = exports.Platform || (exports.Platform = {}));

},{}],"7auUo":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Connection = void 0;
class Connection {
    constructor(validatedOrigin, targetWindow){
        this.validatedOrigin = validatedOrigin;
        this.targetWindow = targetWindow;
        this.handlers = new Map();
    }
    off(event, callback) {
        const eventCallbacks = this.handlers.get(event);
        eventCallbacks === null || eventCallbacks === void 0 || eventCallbacks.delete(callback);
    }
    on(event, callback) {
        var _a;
        const eventCallbacks = (_a = this.handlers.get(event)) !== null && _a !== void 0 ? _a : new Set();
        eventCallbacks.add(callback);
        this.handlers.set(event, eventCallbacks);
    }
    send({ event , payload  }) {
        this.targetWindow.postMessage({
            event,
            payload
        }, this.validatedOrigin);
    }
    runHandlersForEvent(event, payload) {
        const eventCallbacks = this.handlers.get(event);
        if (!eventCallbacks) return;
        for (const callback of eventCallbacks)callback(payload);
    }
    resetHandlers() {
        this.handlers.clear();
    }
    export() {
        return {
            off: this.off.bind(this),
            on: this.on.bind(this),
            send: this.send.bind(this),
            validatedOrigin: this.validatedOrigin
        };
    }
}
exports.Connection = Connection;

},{}],"1tF9q":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.usePopupConnection = void 0;
const connection_manager_1 = require("3002def2785d46fe");
const constants_1 = require("40dc9b6a71dd02d6");
const types_1 = require("fdf676c362605380");
const react_1 = require("fb74a7b913fa1dec");
const usePopupConnection = ({ enabled =true , platform =types_1.Platform.UNKNOWN , widthPx =constants_1.DEFAULT_POPUP_WIDTH_PX , heightPx =constants_1.DEFAULT_POPUP_HEIGHT_PX  } = {})=>{
    const [exportedConnection, setExportedConnection] = (0, react_1.useState)(undefined);
    const connectionManagerRef = (0, react_1.useRef)(new connection_manager_1.ConnectionManager(platform).onConnectionUpdated((connection)=>{
        setExportedConnection(connection === null || connection === void 0 ? void 0 : connection.export());
    }));
    const open = (0, react_1.useCallback)((url)=>{
        connectionManagerRef.current.open({
            heightPx,
            url,
            widthPx
        });
    }, [
        connectionManagerRef,
        widthPx,
        heightPx
    ]);
    const close = (0, react_1.useCallback)(()=>{
        connectionManagerRef.current.close();
    }, [
        connectionManagerRef
    ]);
    (0, react_1.useEffect)(()=>{
        if (enabled) connectionManagerRef.current.initialize();
        else connectionManagerRef.current.tearDown();
    }, [
        connectionManagerRef
    ]);
    return {
        close,
        connection: exportedConnection,
        open
    };
};
exports.usePopupConnection = usePopupConnection;

},{"3002def2785d46fe":"6rew1","40dc9b6a71dd02d6":"kF6OS","fdf676c362605380":"kgFZ7","fb74a7b913fa1dec":"21dqq"}],"6rew1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectionManager = void 0;
const connection_1 = require("fad46da01277def0");
const constants_1 = require("491042a07459bcd7");
const types_1 = require("ab6c1cd41ad842f8");
const utils_1 = require("4a4af3c8224eb6de");
class ConnectionManager {
    constructor(platform){
        this.platform = platform;
        this.connection = null;
        this.popupWindow = null;
        this.handleMessage = (e)=>{
            var _a, _b;
            if (!(0, utils_1.validateOrigin)(e.origin)) return;
            const validatedOrigin = e.origin;
            if (!this.popupWindow) return;
            if (e.data.event === types_1.PopupEvent.HANDSHAKE && !this.connection) {
                if (!this.verifyAndResetNonce((_a = e.data.payload) === null || _a === void 0 ? void 0 : _a.nonce)) return;
                this.popupWindow.postMessage({
                    event: types_1.PopupEvent.HANDSHAKE_ACK,
                    payload: {
                        platform: this.platform
                    }
                }, validatedOrigin);
                this.connection = new connection_1.Connection(validatedOrigin, this.popupWindow);
                (_b = this.connectionUpdatedCallback) === null || _b === void 0 || _b.call(this, this.connection);
            }
            if (!this.connection) return;
            this.connection.runHandlersForEvent(e.data.event, e.data.payload);
            if (e.data.event === types_1.PopupEvent.POPUP_CLOSED && this.connection) {
                this.resetConnection();
                this.popupWindow = null;
            }
        };
    }
    initialize() {
        window.addEventListener("message", this.handleMessage);
        return this;
    }
    tearDown() {
        window.removeEventListener("message", this.handleMessage);
        this.resetConnection();
        return this;
    }
    open({ url , widthPx =constants_1.DEFAULT_POPUP_WIDTH_PX , heightPx =constants_1.DEFAULT_POPUP_HEIGHT_PX , nonce  }) {
        var _a;
        if ((_a = this.popupWindow) === null || _a === void 0 ? void 0 : _a.closed) this.resetConnectionAndPopupWindow();
        if (this.popupWindow) return;
        this.initialize();
        if (nonce) this.nonce = nonce;
        const left = window.screenX + (window.innerWidth - widthPx) / 2;
        const top = window.screenY + (window.innerHeight - heightPx) / 2;
        this.popupWindow = (0, utils_1.openPopup)({
            height: heightPx,
            left,
            top,
            url,
            width: widthPx
        });
    }
    close() {
        if (!this.popupWindow) return;
        this.popupWindow.close();
        this.resetConnectionAndPopupWindow();
    }
    onConnectionUpdated(callback) {
        this.connectionUpdatedCallback = callback;
        return this;
    }
    getConnection() {
        return this.connection;
    }
    resetConnectionAndPopupWindow() {
        this.resetConnection();
        this.popupWindow = null;
    }
    resetConnection() {
        var _a, _b;
        (_a = this.connection) === null || _a === void 0 || _a.resetHandlers();
        this.connection = null;
        (_b = this.connectionUpdatedCallback) === null || _b === void 0 || _b.call(this, this.connection);
    }
    verifyAndResetNonce(uncheckedNonce) {
        if (!this.nonce) return true;
        const result = uncheckedNonce === this.nonce;
        if (result) this.nonce = undefined;
        return result;
    }
}
exports.ConnectionManager = ConnectionManager;

},{"fad46da01277def0":"7auUo","491042a07459bcd7":"kF6OS","ab6c1cd41ad842f8":"kgFZ7","4a4af3c8224eb6de":"3xfNq"}],"kF6OS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_POPUP_HEIGHT_PX = exports.DEFAULT_POPUP_WIDTH_PX = exports.FRACTAL_DOMAIN_HTTPS_WWW = exports.FRACTAL_DOMAIN_HTTPS = exports.FRACTAL_DOMAIN = void 0;
exports.FRACTAL_DOMAIN = "fractal.is";
exports.FRACTAL_DOMAIN_HTTPS = "https://fractal.is";
exports.FRACTAL_DOMAIN_HTTPS_WWW = "https://www.fractal.is";
exports.DEFAULT_POPUP_WIDTH_PX = 400;
exports.DEFAULT_POPUP_HEIGHT_PX = 600;

},{}],"3xfNq":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openPopup = exports.validateOrigin = void 0;
const constants_1 = require("adfb14f165754dc8");
function validateOrigin(origin) {
    return origin === constants_1.FRACTAL_DOMAIN_HTTPS_WWW || origin === constants_1.FRACTAL_DOMAIN_HTTPS;
}
exports.validateOrigin = validateOrigin;
const TARGET = "fractal:approval:popup";
const STATIC_POPUP_FEATURES = [
    "resizable",
    "scrollbars=1",
    "status=1"
];
function openPopup({ left =0 , scope =window , top =0 , width =constants_1.DEFAULT_POPUP_HEIGHT_PX , height =constants_1.DEFAULT_POPUP_HEIGHT_PX , url  }) {
    return scope.open(url, TARGET, getPopupFeatures({
        height,
        left,
        top,
        width
    }));
}
exports.openPopup = openPopup;
function getPopupFeatures({ height , left , top , width  }) {
    return [
        "popup",
        `left=${left}`,
        `top=${top}`,
        `width=${width}`,
        `height=${height}`,
        ...STATIC_POPUP_FEATURES
    ].join(",");
}

},{"adfb14f165754dc8":"kF6OS"}],"3YHkv":[function(require,module,exports) {
"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(require("77c12817f5fb41f3"), exports);
__exportStar(require("1b4fde2af9709d21"), exports);
__exportStar(require("9baf942d3906412f"), exports);
__exportStar(require("66b4b5c99b3f2b4a"), exports);
__exportStar(require("85c03ab6778aaa22"), exports);

},{"77c12817f5fb41f3":"dHccW","1b4fde2af9709d21":"duLOQ","9baf942d3906412f":"2UarH","66b4b5c99b3f2b4a":"1CMvE","85c03ab6778aaa22":"h3C74"}],"dHccW":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertPayloadIsSolanaWalletAdapterApproved = void 0;
const guards_1 = require("3699d63661dcf621");
function assertPayloadIsSolanaWalletAdapterApproved(payload) {
    if (!(0, guards_1.isObject)(payload)) return false;
    if (!("solanaPublicKey" in payload)) return false;
    if (typeof payload.solanaPublicKey !== "string") return false;
    return true;
}
exports.assertPayloadIsSolanaWalletAdapterApproved = assertPayloadIsSolanaWalletAdapterApproved;

},{"3699d63661dcf621":"cRjbG"}],"cRjbG":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isObject = void 0;
function isObject(value) {
    if (value === null) return false;
    if (typeof value !== "object") return false;
    return true;
}
exports.isObject = isObject;

},{}],"duLOQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertPayloadIsTransactionSignatureNeededPayload = void 0;
const guards_1 = require("a5db39329384c9d8");
function assertPayloadIsTransactionSignatureNeededPayload(payload) {
    if (!(0, guards_1.isObject)(payload)) return false;
    if (!("unsignedB58Transactions" in payload)) return false;
    if (!Array.isArray(payload.unsignedB58Transactions)) return false;
    return payload.unsignedB58Transactions.every((value)=>typeof value === "string");
}
exports.assertPayloadIsTransactionSignatureNeededPayload = assertPayloadIsTransactionSignatureNeededPayload;

},{"a5db39329384c9d8":"cRjbG"}],"2UarH":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertPayloadIsTransactionSignatureNeededResponsePayload = void 0;
const guards_1 = require("f778d8072ef956a4");
function assertPayloadIsTransactionSignatureNeededResponsePayload(payload) {
    if (!(0, guards_1.isObject)(payload)) return false;
    if (!("signedB58Transactions" in payload)) return false;
    if (!Array.isArray(payload.signedB58Transactions)) return false;
    return payload.signedB58Transactions.every((value)=>typeof value === "string");
}
exports.assertPayloadIsTransactionSignatureNeededResponsePayload = assertPayloadIsTransactionSignatureNeededResponsePayload;

},{"f778d8072ef956a4":"cRjbG"}],"1CMvE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertPayloadIsMessageSignatureNeededPayload = void 0;
const guards_1 = require("e17fd11a5b2f3653");
function assertPayloadIsMessageSignatureNeededPayload(payload) {
    if (!(0, guards_1.isObject)(payload)) return false;
    if (!("decodedMessage" in payload)) return false;
    return typeof payload.decodedMessage === "string";
}
exports.assertPayloadIsMessageSignatureNeededPayload = assertPayloadIsMessageSignatureNeededPayload;

},{"e17fd11a5b2f3653":"cRjbG"}],"h3C74":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertPayloadIsMessageSignatureNeededResponsePayload = void 0;
const guards_1 = require("336f9988ec9009f7");
function assertPayloadIsMessageSignatureNeededResponsePayload(payload) {
    if (!(0, guards_1.isObject)(payload)) return false;
    if (!("decodedSignature" in payload)) return false;
    return typeof payload.decodedSignature === "string";
}
exports.assertPayloadIsMessageSignatureNeededResponsePayload = assertPayloadIsMessageSignatureNeededResponsePayload;

},{"336f9988ec9009f7":"cRjbG"}],"gaYK8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNonce = void 0;
function createNonce() {
    return `${randomString()}${randomString()}${randomString()}`;
}
exports.createNonce = createNonce;
function randomString() {
    return (Math.random() + 1).toString(36).substring(7);
}

},{}]},["fJU1A"], null, "parcelRequirec720")

//# sourceMappingURL=cjs.7e9923c9.js.map
