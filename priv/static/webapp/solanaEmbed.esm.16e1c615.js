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
})({"4PNEk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "59e0638b16e1c615";
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

},{}],"hSSHo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BUTTON_POSITION", ()=>BUTTON_POSITION);
parcelHelpers.export(exports, "LOGIN_PROVIDER", ()=>LOGIN_PROVIDER);
parcelHelpers.export(exports, "PAYMENT_PROVIDER", ()=>PAYMENT_PROVIDER);
parcelHelpers.export(exports, "TORUS_BUILD_ENV", ()=>TORUS_BUILD_ENV);
parcelHelpers.export(exports, "TorusInPageProvider", ()=>TorusInPageProvider);
parcelHelpers.export(exports, "default", ()=>Torus);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _web3Js = require("@solana/web3.js");
var _baseControllers = require("@toruslabs/base-controllers");
var _httpHelpers = require("@toruslabs/http-helpers");
var _openloginJrpc = require("@toruslabs/openlogin-jrpc");
var _ethRpcErrors = require("eth-rpc-errors");
var _isStream = require("is-stream");
var _pump = require("pump");
var _pumpDefault = parcelHelpers.interopDefault(_pump);
var _loglevel = require("loglevel");
var _loglevelDefault = parcelHelpers.interopDefault(_loglevel);
var _fastDeepEqual = require("fast-deep-equal");
var _fastDeepEqualDefault = parcelHelpers.interopDefault(_fastDeepEqual);
var Buffer = require("a62f51460dc954f6").Buffer;
var version = "0.3.3";
var messages = {
    errors: {
        disconnected: ()=>"Torus: Lost connection to Torus.",
        permanentlyDisconnected: ()=>"Torus: Disconnected from iframe. Page reload required.",
        unsupportedSync: (method)=>`Torus: The Torus Ethereum provider does not support synchronous methods like ${method} without a callback parameter.`,
        invalidDuplexStream: ()=>"Must provide a Node.js-style duplex stream.",
        invalidOptions: (maxEventListeners)=>`Invalid options. Received: { maxEventListeners: ${maxEventListeners}}`,
        invalidRequestArgs: ()=>`Expected a single, non-array, object argument.`,
        invalidRequestMethod: ()=>`'args.method' must be a non-empty string.`,
        invalidRequestParams: ()=>`'args.params' must be an object or array if provided.`,
        invalidLoggerObject: ()=>`'args.logger' must be an object if provided.`,
        invalidLoggerMethod: (method)=>`'args.logger' must include required method '${method}'.`
    },
    info: {
        connected: (chainId)=>`Torus: Connected to chain with ID "${chainId}".`
    },
    warnings: {}
};
const PAYMENT_PROVIDER = {
    MOONPAY: "moonpay",
    WYRE: "wyre",
    RAMPNETWORK: "rampnetwork",
    XANPOOL: "xanpool",
    MERCURYO: "mercuryo",
    TRANSAK: "transak"
};
const TORUS_BUILD_ENV = {
    PRODUCTION: "production",
    DEVELOPMENT: "development",
    TESTING: "testing"
};
const BUTTON_POSITION = {
    BOTTOM_LEFT: "bottom-left",
    TOP_LEFT: "top-left",
    BOTTOM_RIGHT: "bottom-right",
    TOP_RIGHT: "top-right"
};
const LOGIN_PROVIDER = {
    GOOGLE: "google",
    FACEBOOK: "facebook",
    REDDIT: "reddit",
    DISCORD: "discord",
    TWITCH: "twitch",
    APPLE: "apple",
    LINE: "line",
    GITHUB: "github",
    KAKAO: "kakao",
    LINKEDIN: "linkedin",
    TWITTER: "twitter",
    WEIBO: "weibo",
    WECHAT: "wechat",
    EMAIL_PASSWORDLESS: "email_passwordless"
};
const translations = {
    en: {
        embed: {
            continue: "Continue",
            actionRequired: "Authorization required",
            pendingAction: "Click continue to proceed with your request in a popup",
            cookiesRequired: "Cookies Required",
            enableCookies: "Please enable cookies in your browser preferences to access Torus",
            clickHere: "More Info"
        }
    },
    de: {
        embed: {
            continue: "Fortsetzen",
            actionRequired: "Autorisierung erforderlich",
            pendingAction: "Klicken Sie in einem Popup auf Weiter, um mit Ihrer Anfrage fortzufahren",
            cookiesRequired: "Cookies ben\xf6tigt",
            enableCookies: "Bitte aktivieren Sie Cookies in Ihren Browsereinstellungen, um auf Torus zuzugreifen",
            clickHere: "Mehr Info"
        }
    },
    ja: {
        embed: {
            continue: "継続する",
            actionRequired: "認証が必要です",
            pendingAction: "続行をクリックして、ポップアップでリクエストを続行します",
            cookiesRequired: "必要なクッキー",
            enableCookies: "Torusにアクセスするには、ブラウザの設定でCookieを有効にしてください。",
            clickHere: "詳しくは"
        }
    },
    ko: {
        embed: {
            continue: "계속하다",
            actionRequired: "승인 필요",
            pendingAction: "팝업에서 요청을 진행하려면 계속을 클릭하십시오.",
            cookiesRequired: "쿠키 필요",
            enableCookies: "브라우저 환경 설정에서 쿠키를 활성화하여 Torus에 액세스하십시오.",
            clickHere: "더 많은 정보"
        }
    },
    zh: {
        embed: {
            continue: "继续",
            actionRequired: "需要授权",
            pendingAction: "单击继续以在弹出窗口中继续您的请求",
            cookiesRequired: "必填Cookie",
            enableCookies: "请在您的浏览器首选项中启用cookie以访问Torus。",
            clickHere: "更多信息"
        }
    }
};
var configuration = {
    supportedVerifierList: [
        LOGIN_PROVIDER.GOOGLE,
        LOGIN_PROVIDER.REDDIT,
        LOGIN_PROVIDER.DISCORD
    ],
    api: "https://api.tor.us",
    translations,
    prodTorusUrl: "",
    localStorageKey: `torus-${window.location.hostname}`
};
var log = (0, _loglevelDefault.default).getLogger("solana-embed");
// utility functions
/**
 * json-rpc-engine middleware that logs RPC errors and and validates req.method.
 *
 * @param log - The logging API to use.
 * @returns  json-rpc-engine middleware function
 */ function createErrorMiddleware() {
    return (req, res, next)=>{
        // json-rpc-engine will terminate the request when it notices this error
        if (typeof req.method !== "string" || !req.method) res.error = (0, _ethRpcErrors.ethErrors).rpc.invalidRequest({
            message: `The request 'method' must be a non-empty string.`,
            data: req
        });
        next((done)=>{
            const { error  } = res;
            if (!error) return done();
            log.error(`Torus - RPC Error: ${error.message}`, error);
            return done();
        });
    };
}
/**
 * Logs a stream disconnection error. Emits an 'error' if given an
 * EventEmitter that has listeners for the 'error' event.
 *
 * @param log - The logging API to use.
 * @param remoteLabel - The label of the disconnected stream.
 * @param error - The associated error to log.
 * @param emitter - The logging API to use.
 */ function logStreamDisconnectWarning(remoteLabel, error, emitter) {
    let warningMsg = `Torus: Lost connection to "${remoteLabel}".`;
    if (error !== null && error !== void 0 && error.stack) warningMsg += `\n${error.stack}`;
    log.warn(warningMsg);
    if (emitter && emitter.listenerCount("error") > 0) emitter.emit("error", warningMsg);
}
const getWindowId = ()=>Math.random().toString(36).slice(2);
const getTorusUrl = async (buildEnv)=>{
    let torusUrl;
    let logLevel;
    // const versionUsed = version;
    // log.info("solana embed version used: ", versionUsed);
    switch(buildEnv){
        case "testing":
            torusUrl = "https://solana-testing.tor.us";
            logLevel = "debug";
            break;
        case "development":
            torusUrl = "http://localhost:8080";
            logLevel = "debug";
            break;
        default:
            torusUrl = `https://solana.tor.us`;
            logLevel = "error";
            break;
    }
    return {
        torusUrl,
        logLevel
    };
};
const getUserLanguage = ()=>{
    let userLanguage = window.navigator.language || "en-US";
    const userLanguages = userLanguage.split("-");
    userLanguage = Object.prototype.hasOwnProperty.call(configuration.translations, userLanguages[0]) ? userLanguages[0] : "en";
    return userLanguage;
};
const FEATURES_PROVIDER_CHANGE_WINDOW = {
    height: 660,
    width: 375
};
const FEATURES_DEFAULT_WALLET_WINDOW = {
    height: 740,
    width: 1315
};
const FEATURES_DEFAULT_POPUP_WINDOW = {
    height: 700,
    width: 1200
};
const FEATURES_CONFIRM_WINDOW = {
    height: 600,
    width: 400
};
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e && // everything except Firefox
        (e.code === 22 || // Firefox
        e.code === 1014 || // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" || // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
        storage && storage.length !== 0;
    }
}
/**
 * popup handler utils
 */ function getPopupFeatures(_ref) {
    let { width: w , height: h  } = _ref;
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
    const systemZoom = 1; // No reliable estimate
    const left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
    const top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
    const features = `titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=${h / systemZoom},width=${w / systemZoom},top=${top},left=${left}`;
    return features;
}
class BaseProvider extends (0, _openloginJrpc.SafeEventEmitter) {
    /**
   * Indicating that this provider is a Torus provider.
   */ constructor(connectionStream, _ref){
        let { maxEventListeners =100 , jsonRpcStreamName ="provider"  } = _ref;
        super();
        (0, _definePropertyDefault.default)(this, "isTorus", void 0);
        (0, _definePropertyDefault.default)(this, "_rpcEngine", void 0);
        (0, _definePropertyDefault.default)(this, "jsonRpcConnectionEvents", void 0);
        (0, _definePropertyDefault.default)(this, "_state", void 0);
        if (!(0, _isStream.duplex)(connectionStream)) throw new Error(messages.errors.invalidDuplexStream());
        this.isTorus = true;
        this.setMaxListeners(maxEventListeners);
        this._handleConnect = this._handleConnect.bind(this);
        this._handleDisconnect = this._handleDisconnect.bind(this);
        this._handleStreamDisconnect = this._handleStreamDisconnect.bind(this);
        this._rpcRequest = this._rpcRequest.bind(this);
        this._initializeState = this._initializeState.bind(this);
        this.request = this.request.bind(this);
        this.sendAsync = this.sendAsync.bind(this);
        // this.enable = this.enable.bind(this);
        // setup connectionStream multiplexing
        const mux = new (0, _openloginJrpc.ObjectMultiplex)();
        (0, _pumpDefault.default)(connectionStream, mux, connectionStream, this._handleStreamDisconnect.bind(this, "Torus"));
        // ignore phishing warning message (handled elsewhere)
        mux.ignoreStream("phishing");
        // setup own event listeners
        // connect to async provider
        const jsonRpcConnection = (0, _openloginJrpc.createStreamMiddleware)();
        (0, _pumpDefault.default)(jsonRpcConnection.stream, mux.createStream(jsonRpcStreamName), jsonRpcConnection.stream, this._handleStreamDisconnect.bind(this, "Torus RpcProvider"));
        // handle RPC requests via dapp-side rpc engine
        const rpcEngine = new (0, _openloginJrpc.JRPCEngine)();
        rpcEngine.push((0, _openloginJrpc.createIdRemapMiddleware)());
        rpcEngine.push(createErrorMiddleware());
        rpcEngine.push((0, _baseControllers.createLoggerMiddleware)({
            origin: location.origin
        }));
        rpcEngine.push(jsonRpcConnection.middleware);
        this._rpcEngine = rpcEngine;
        this.jsonRpcConnectionEvents = jsonRpcConnection.events;
    }
    /**
   * Submits an RPC request for the given method, with the given params.
   * Resolves with the result of the method call, or rejects on error.
   */ async request(args) {
        if (!args || typeof args !== "object" || Array.isArray(args)) throw (0, _ethRpcErrors.ethErrors).rpc.invalidRequest({
            message: messages.errors.invalidRequestArgs(),
            data: args
        });
        const { method , params  } = args;
        if (typeof method !== "string" || method.length === 0) throw (0, _ethRpcErrors.ethErrors).rpc.invalidRequest({
            message: messages.errors.invalidRequestMethod(),
            data: args
        });
        if (params !== undefined && !Array.isArray(params) && (typeof params !== "object" || params === null)) throw (0, _ethRpcErrors.ethErrors).rpc.invalidRequest({
            message: messages.errors.invalidRequestParams(),
            data: args
        });
        return new Promise((resolve, reject)=>{
            this._rpcRequest({
                method,
                params
            }, (0, _openloginJrpc.getRpcPromiseCallback)(resolve, reject));
        });
    }
    /**
   * Submits an RPC request per the given JSON-RPC request object.
   */ send(payload, callback) {
        this._rpcRequest(payload, callback);
    }
    /**
   * Submits an RPC request per the given JSON-RPC request object.
   */ sendAsync(payload) {
        return new Promise((resolve, reject)=>{
            this._rpcRequest(payload, (0, _openloginJrpc.getRpcPromiseCallback)(resolve, reject));
        });
    }
    /**
   * Called when connection is lost to critical streams.
   *
   * emits TorusInpageProvider#disconnect
   */ _handleStreamDisconnect(streamName, error) {
        logStreamDisconnectWarning(streamName, error, this);
        this._handleDisconnect(false, error ? error.message : undefined);
    }
}
const handleEvent = function(handle, eventName, handler) {
    for(var _len = arguments.length, handlerArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++)handlerArgs[_key - 3] = arguments[_key];
    const handlerWrapper = ()=>{
        handler(...handlerArgs);
        handle.removeEventListener(eventName, handlerWrapper);
    };
    handle.addEventListener(eventName, handlerWrapper);
};
async function documentReady() {
    return new Promise((resolve)=>{
        if (document.readyState !== "loading") resolve();
        else handleEvent(document, "DOMContentLoaded", resolve);
    });
}
const htmlToElement = (html)=>{
    const template = window.document.createElement("template");
    const trimmedHtml = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = trimmedHtml;
    return template.content.firstChild;
};
function isLegacyTransactionInstance(transaction) {
    return transaction.version === undefined;
}
class PopupHandler extends (0, _openloginJrpc.SafeEventEmitter) {
    constructor(_ref){
        let { url , target , features  } = _ref;
        super();
        (0, _definePropertyDefault.default)(this, "url", void 0);
        (0, _definePropertyDefault.default)(this, "target", void 0);
        (0, _definePropertyDefault.default)(this, "features", void 0);
        (0, _definePropertyDefault.default)(this, "window", void 0);
        (0, _definePropertyDefault.default)(this, "windowTimer", void 0);
        (0, _definePropertyDefault.default)(this, "iClosedWindow", void 0);
        this.url = url;
        this.target = target || "_blank";
        this.features = features || getPopupFeatures(FEATURES_DEFAULT_POPUP_WINDOW);
        this.window = undefined;
        this.windowTimer = undefined;
        this.iClosedWindow = false;
        this._setupTimer();
    }
    _setupTimer() {
        this.windowTimer = Number(setInterval(()=>{
            if (this.window && this.window.closed) {
                clearInterval(this.windowTimer);
                if (!this.iClosedWindow) this.emit("close");
                this.iClosedWindow = false;
                this.window = undefined;
            }
            if (this.window === undefined) clearInterval(this.windowTimer);
        }, 500));
    }
    open() {
        var _this$window;
        this.window = window.open(this.url.href, this.target, this.features);
        if ((_this$window = this.window) !== null && _this$window !== void 0 && _this$window.focus) this.window.focus();
        return Promise.resolve();
    }
    close() {
        this.iClosedWindow = true;
        if (this.window) this.window.close();
    }
    redirect(locationReplaceOnRedirect) {
        if (locationReplaceOnRedirect) window.location.replace(this.url.href);
        else window.location.href = this.url.href;
    }
}
function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$2(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
class TorusCommunicationProvider extends BaseProvider {
    constructor(connectionStream, _ref){
        let { maxEventListeners =100 , jsonRpcStreamName ="provider"  } = _ref;
        super(connectionStream, {
            maxEventListeners,
            jsonRpcStreamName
        });
        // private state
        (0, _definePropertyDefault.default)(this, "embedTranslations", void 0);
        (0, _definePropertyDefault.default)(this, "torusUrl", void 0);
        (0, _definePropertyDefault.default)(this, "dappStorageKey", void 0);
        (0, _definePropertyDefault.default)(this, "windowRefs", void 0);
        (0, _definePropertyDefault.default)(this, "tryWindowHandle", void 0);
        (0, _definePropertyDefault.default)(this, "torusAlertContainer", void 0);
        (0, _definePropertyDefault.default)(this, "torusIframe", void 0);
        this._state = _objectSpread$2({}, TorusCommunicationProvider._defaultState);
        // public state
        this.torusUrl = "";
        this.dappStorageKey = "";
        const languageTranslations = configuration.translations[getUserLanguage()];
        this.embedTranslations = languageTranslations.embed;
        this.windowRefs = {};
        // setup own event listeners
        // EIP-1193 connect
        this.on("connect", ()=>{
            this._state.isConnected = true;
        });
        const notificationHandler = (payload)=>{
            const { method , params  } = payload;
            if (method === (0, _baseControllers.COMMUNICATION_NOTIFICATIONS).IFRAME_STATUS) {
                const { isFullScreen , rid  } = params;
                this._displayIframe({
                    isFull: isFullScreen,
                    rid: rid
                });
            } else if (method === (0, _baseControllers.COMMUNICATION_NOTIFICATIONS).CREATE_WINDOW) {
                const { windowId , url  } = params;
                this._createPopupBlockAlert(windowId, url);
            } else if (method === (0, _baseControllers.COMMUNICATION_NOTIFICATIONS).CLOSE_WINDOW) this._handleCloseWindow(params);
            else if (method === (0, _baseControllers.COMMUNICATION_NOTIFICATIONS).USER_LOGGED_IN) {
                const { currentLoginProvider  } = params;
                this._state.isLoggedIn = true;
                this._state.currentLoginProvider = currentLoginProvider;
            } else if (method === (0, _baseControllers.COMMUNICATION_NOTIFICATIONS).USER_LOGGED_OUT) {
                this._state.isLoggedIn = false;
                this._state.currentLoginProvider = null;
                this._displayIframe();
            }
        };
        this.jsonRpcConnectionEvents.on("notification", notificationHandler);
    }
    get isLoggedIn() {
        return this._state.isLoggedIn;
    }
    get isIFrameFullScreen() {
        return this._state.isIFrameFullScreen;
    }
    /**
   * Returns whether the inPage provider is connected to Torus.
   */ isConnected() {
        return this._state.isConnected;
    }
    async _initializeState(params) {
        try {
            const { torusUrl , dappStorageKey , torusAlertContainer , torusIframe  } = params;
            this.torusUrl = torusUrl;
            this.dappStorageKey = dappStorageKey;
            this.torusAlertContainer = torusAlertContainer;
            this.torusIframe = torusIframe;
            this.torusIframe.addEventListener("load", ()=>{
                // only do this if iframe is not full screen
                if (!this._state.isIFrameFullScreen) this._displayIframe();
            });
            const { currentLoginProvider , isLoggedIn  } = await this.request({
                method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).GET_PROVIDER_STATE,
                params: []
            });
            // indicate that we've connected, for EIP-1193 compliance
            this._handleConnect(currentLoginProvider, isLoggedIn);
        } catch (error) {
            log.error("Torus: Failed to get initial state. Please report this bug.", error);
        } finally{
            log.info("initialized communication state");
            this._state.initialized = true;
            this.emit("_initialized");
        }
    }
    _handleWindow(windowId) {
        let { url , target , features  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const finalUrl = new URL(url || `${this.torusUrl}/redirect?windowId=${windowId}`);
        if (this.dappStorageKey) {
            // If multiple instances, it returns the first one
            if (finalUrl.hash) finalUrl.hash += `&dappStorageKey=${this.dappStorageKey}`;
            else finalUrl.hash = `#dappStorageKey=${this.dappStorageKey}`;
        }
        const handledWindow = new PopupHandler({
            url: finalUrl,
            target,
            features
        });
        handledWindow.open();
        if (!handledWindow.window) {
            this._createPopupBlockAlert(windowId, finalUrl.href);
            return;
        }
        // Add to collection only if window is opened
        this.windowRefs[windowId] = handledWindow;
        // We tell the iframe that the window has been successfully opened
        this.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).OPENED_WINDOW,
            params: {
                windowId
            }
        });
        handledWindow.once("close", ()=>{
            // user closed the window
            delete this.windowRefs[windowId];
            this.request({
                method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).CLOSED_WINDOW,
                params: {
                    windowId
                }
            });
        });
    }
    _displayIframe() {
        let { isFull =false , rid =""  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        const style = {};
        // set phase
        if (!isFull) {
            style.display = this._state.torusWidgetVisibility ? "block" : "none";
            style.height = "70px";
            style.width = "70px";
            switch(this._state.buttonPosition){
                case BUTTON_POSITION.TOP_LEFT:
                    style.top = "0px";
                    style.left = "0px";
                    style.right = "auto";
                    style.bottom = "auto";
                    break;
                case BUTTON_POSITION.TOP_RIGHT:
                    style.top = "0px";
                    style.right = "0px";
                    style.left = "auto";
                    style.bottom = "auto";
                    break;
                case BUTTON_POSITION.BOTTOM_RIGHT:
                    style.bottom = "0px";
                    style.right = "0px";
                    style.top = "auto";
                    style.left = "auto";
                    break;
                case BUTTON_POSITION.BOTTOM_LEFT:
                default:
                    style.bottom = "0px";
                    style.left = "0px";
                    style.top = "auto";
                    style.right = "auto";
                    break;
            }
        } else {
            style.display = "block";
            style.width = "100%";
            style.height = "100%";
            style.top = "0px";
            style.right = "0px";
            style.left = "0px";
            style.bottom = "0px";
        }
        Object.assign(this.torusIframe.style, style);
        this._state.isIFrameFullScreen = isFull;
        this.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).IFRAME_STATUS,
            params: {
                isIFrameFullScreen: isFull,
                rid
            }
        });
    }
    hideTorusButton() {
        this._state.torusWidgetVisibility = false;
        this._displayIframe();
    }
    showTorusButton() {
        this._state.torusWidgetVisibility = true;
        this._displayIframe();
    }
    /**
   * Internal RPC method. Forwards requests to background via the RPC engine.
   * Also remap ids inbound and outbound
   */ _rpcRequest(payload, callback) {
        const cb = callback;
        const _payload = payload;
        if (!Array.isArray(_payload)) {
            if (!_payload.jsonrpc) _payload.jsonrpc = "2.0";
        }
        this.tryWindowHandle(_payload, cb);
    }
    /**
   * When the provider becomes connected, updates internal state and emits
   * required events. Idempotent.
   *
   * @param currentLoginProvider - The login Provider
   * emits TorusInpageProvider#connect
   */ _handleConnect(currentLoginProvider, isLoggedIn) {
        if (!this._state.isConnected) {
            this._state.isConnected = true;
            this.emit("connect", {
                currentLoginProvider,
                isLoggedIn
            });
            log.debug(messages.info.connected(currentLoginProvider));
        }
    }
    /**
   * When the provider becomes disconnected, updates internal state and emits
   * required events. Idempotent with respect to the isRecoverable parameter.
   *
   * Error codes per the CloseEvent status codes as required by EIP-1193:
   * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
   *
   * @param isRecoverable - Whether the disconnection is recoverable.
   * @param errorMessage - A custom error message.
   * emits TorusInpageProvider#disconnect
   */ _handleDisconnect(isRecoverable, errorMessage) {
        if (this._state.isConnected || !this._state.isPermanentlyDisconnected && !isRecoverable) {
            this._state.isConnected = false;
            let error;
            if (isRecoverable) {
                error = new (0, _ethRpcErrors.EthereumRpcError)(1013, // Try again later
                errorMessage || messages.errors.disconnected());
                log.debug(error);
            } else {
                error = new (0, _ethRpcErrors.EthereumRpcError)(1011, // Internal error
                errorMessage || messages.errors.permanentlyDisconnected());
                log.error(error);
                this._state.currentLoginProvider = null;
                this._state.isLoggedIn = false;
                this._state.torusWidgetVisibility = false;
                this._state.isIFrameFullScreen = false;
                this._state.isPermanentlyDisconnected = true;
            }
            this.emit("disconnect", error);
        }
    }
    // Called if the iframe wants to close the window cause it is done processing the request
    _handleCloseWindow(params) {
        const { windowId  } = params;
        if (this.windowRefs[windowId]) {
            this.windowRefs[windowId].close();
            delete this.windowRefs[windowId];
        }
    }
    async _createPopupBlockAlert(windowId, url) {
        const logoUrl = this.getLogoUrl();
        const torusAlert = htmlToElement('<div id="torusAlert" class="torus-alert--v2">' + `<div id="torusAlert__logo"><img src="${logoUrl}" /></div>` + "<div>" + `<h1 id="torusAlert__title">${this.embedTranslations.actionRequired}</h1>` + `<p id="torusAlert__desc">${this.embedTranslations.pendingAction}</p>` + "</div>" + "</div>");
        const successAlert = htmlToElement(`<div><a id="torusAlert__btn">${this.embedTranslations.continue}</a></div>`);
        const btnContainer = htmlToElement('<div id="torusAlert__btn-container"></div>');
        btnContainer.appendChild(successAlert);
        torusAlert.appendChild(btnContainer);
        const bindOnLoad = ()=>{
            successAlert.addEventListener("click", ()=>{
                this._handleWindow(windowId, {
                    url,
                    target: "_blank",
                    features: getPopupFeatures(FEATURES_CONFIRM_WINDOW)
                });
                torusAlert.remove();
                if (this.torusAlertContainer.children.length === 0) this.torusAlertContainer.style.display = "none";
            });
        };
        const attachOnLoad = ()=>{
            this.torusAlertContainer.appendChild(torusAlert);
        };
        await documentReady();
        attachOnLoad();
        bindOnLoad();
        this.torusAlertContainer.style.display = "block";
    }
    getLogoUrl() {
        const logoUrl = `${this.torusUrl}/images/torus_icon-blue.svg`;
        return logoUrl;
    }
}
(0, _definePropertyDefault.default)(TorusCommunicationProvider, "_defaultState", {
    buttonPosition: "bottom-left",
    currentLoginProvider: null,
    isIFrameFullScreen: false,
    hasEmittedConnection: false,
    torusWidgetVisibility: false,
    initialized: false,
    isLoggedIn: false,
    isPermanentlyDisconnected: false,
    isConnected: false
});
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$1(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
class TorusInPageProvider extends BaseProvider {
    /**
   * The chain ID of the currently connected Solana chain.
   * See [chainId.network]{@link https://chainid.network} for more information.
   */ /**
   * The user's currently selected Solana address.
   * If null, Torus is either locked or the user has not permitted any
   * addresses to be viewed.
   */ constructor(connectionStream, _ref){
        let { maxEventListeners =100 , jsonRpcStreamName ="provider"  } = _ref;
        super(connectionStream, {
            maxEventListeners,
            jsonRpcStreamName
        });
        // private state
        (0, _definePropertyDefault.default)(this, "chainId", void 0);
        (0, _definePropertyDefault.default)(this, "selectedAddress", void 0);
        (0, _definePropertyDefault.default)(this, "tryWindowHandle", void 0);
        this._state = _objectSpread$1({}, TorusInPageProvider._defaultState);
        // public state
        this.selectedAddress = null;
        this.chainId = null;
        this._handleAccountsChanged = this._handleAccountsChanged.bind(this);
        this._handleChainChanged = this._handleChainChanged.bind(this);
        this._handleUnlockStateChanged = this._handleUnlockStateChanged.bind(this);
        // setup own event listeners
        // EIP-1193 connect
        this.on("connect", ()=>{
            this._state.isConnected = true;
        });
        const jsonRpcNotificationHandler = (payload)=>{
            const { method , params  } = payload;
            if (method === (0, _baseControllers.PROVIDER_NOTIFICATIONS).ACCOUNTS_CHANGED) this._handleAccountsChanged(params);
            else if (method === (0, _baseControllers.PROVIDER_NOTIFICATIONS).UNLOCK_STATE_CHANGED) this._handleUnlockStateChanged(params);
            else if (method === (0, _baseControllers.PROVIDER_NOTIFICATIONS).CHAIN_CHANGED) this._handleChainChanged(params);
        };
        // json rpc notification listener
        this.jsonRpcConnectionEvents.on("notification", jsonRpcNotificationHandler);
    }
    /**
   * Returns whether the inpage provider is connected to Torus.
   */ isConnected() {
        return this._state.isConnected;
    }
    // Private Methods
    //= ===================
    /**
   * Constructor helper.
   * Populates initial state by calling 'wallet_getProviderState' and emits
   * necessary events.
   */ async _initializeState() {
        try {
            const { accounts , chainId , isUnlocked  } = await this.request({
                method: (0, _baseControllers.PROVIDER_JRPC_METHODS).GET_PROVIDER_STATE,
                params: []
            });
            // indicate that we've connected, for EIP-1193 compliance
            this.emit("connect", {
                chainId
            });
            this._handleChainChanged({
                chainId
            });
            this._handleUnlockStateChanged({
                accounts,
                isUnlocked
            });
            this._handleAccountsChanged(accounts);
        } catch (error) {
            log.error("Torus: Failed to get initial state. Please report this bug.", error);
        } finally{
            log.info("initialized provider state");
            this._state.initialized = true;
            this.emit("_initialized");
        }
    }
    /**
   * Internal RPC method. Forwards requests to background via the RPC engine.
   * Also remap ids inbound and outbound
   */ _rpcRequest(payload, callback) {
        let isInternal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        let cb = callback;
        const _payload = payload;
        if (!Array.isArray(_payload)) {
            if (!_payload.jsonrpc) _payload.jsonrpc = "2.0";
            if (_payload.method === "solana_accounts" || _payload.method === "solana_requestAccounts") // handle accounts changing
            cb = (err, res)=>{
                this._handleAccountsChanged(res.result || [], _payload.method === "solana_accounts", isInternal);
                callback(err, res);
            };
            else if (_payload.method === "wallet_getProviderState") {
                this._rpcEngine.handle(payload, cb);
                return;
            }
        }
        this.tryWindowHandle(_payload, cb);
    }
    /**
   * When the provider becomes connected, updates internal state and emits
   * required events. Idempotent.
   *
   * @param chainId - The ID of the newly connected chain.
   * emits TorusInpageProvider#connect
   */ _handleConnect(chainId) {
        if (!this._state.isConnected) {
            this._state.isConnected = true;
            this.emit("connect", {
                chainId
            });
            log.debug(messages.info.connected(chainId));
        }
    }
    /**
   * When the provider becomes disconnected, updates internal state and emits
   * required events. Idempotent with respect to the isRecoverable parameter.
   *
   * Error codes per the CloseEvent status codes as required by EIP-1193:
   * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes
   *
   * @param isRecoverable - Whether the disconnection is recoverable.
   * @param errorMessage - A custom error message.
   * emits TorusInpageProvider#disconnect
   */ _handleDisconnect(isRecoverable, errorMessage) {
        if (this._state.isConnected || !this._state.isPermanentlyDisconnected && !isRecoverable) {
            this._state.isConnected = false;
            let error;
            if (isRecoverable) {
                error = new (0, _ethRpcErrors.EthereumRpcError)(1013, // Try again later
                errorMessage || messages.errors.disconnected());
                log.debug(error);
            } else {
                error = new (0, _ethRpcErrors.EthereumRpcError)(1011, // Internal error
                errorMessage || messages.errors.permanentlyDisconnected());
                log.error(error);
                this.chainId = null;
                this._state.accounts = null;
                this.selectedAddress = null;
                this._state.isUnlocked = false;
                this._state.isPermanentlyDisconnected = true;
            }
            this.emit("disconnect", error);
        }
    }
    /**
   * Called when accounts may have changed.
   */ _handleAccountsChanged(accounts) {
        let isEthAccounts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        let isInternal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        // defensive programming
        let finalAccounts = accounts;
        if (!Array.isArray(finalAccounts)) {
            log.error("Torus: Received non-array accounts parameter. Please report this bug.", finalAccounts);
            finalAccounts = [];
        }
        for (const account of accounts)if (typeof account !== "string") {
            log.error("Torus: Received non-string account. Please report this bug.", accounts);
            finalAccounts = [];
            break;
        }
        // emit accountsChanged if anything about the accounts array has changed
        if (!(0, _fastDeepEqualDefault.default)(this._state.accounts, finalAccounts)) {
            // we should always have the correct accounts even before solana_accounts
            // returns, except in cases where isInternal is true
            if (isEthAccounts && Array.isArray(this._state.accounts) && this._state.accounts.length > 0 && !isInternal) log.error('Torus: "solana_accounts" unexpectedly updated accounts. Please report this bug.', finalAccounts);
            this._state.accounts = finalAccounts;
            this.emit("accountsChanged", finalAccounts);
        }
        // handle selectedAddress
        if (this.selectedAddress !== finalAccounts[0]) this.selectedAddress = finalAccounts[0] || null;
    }
    /**
   * Upon receipt of a new chainId and networkVersion, emits corresponding
   * events and sets relevant public state.
   * Does nothing if neither the chainId nor the networkVersion are different
   * from existing values.
   *
   * emits TorusInpageProvider#chainChanged
   * @param networkInfo - An object with network info.
   */ _handleChainChanged() {
        let { chainId  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!chainId) {
            log.error("Torus: Received invalid network parameters. Please report this bug.", {
                chainId
            });
            return;
        }
        if (chainId === "loading") this._handleDisconnect(true);
        else {
            this._handleConnect(chainId);
            if (chainId !== this.chainId) {
                this.chainId = chainId;
                if (this._state.initialized) this.emit("chainChanged", this.chainId);
            }
        }
    }
    /**
   * Upon receipt of a new isUnlocked state, sets relevant public state.
   * Calls the accounts changed handler with the received accounts, or an empty
   * array.
   *
   * Does nothing if the received value is equal to the existing value.
   * There are no lock/unlock events.
   *
   * @param opts - Options bag.
   */ _handleUnlockStateChanged() {
        let { accounts , isUnlocked  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (typeof isUnlocked !== "boolean") {
            log.error("Torus: Received invalid isUnlocked parameter. Please report this bug.", {
                isUnlocked
            });
            return;
        }
        if (isUnlocked !== this._state.isUnlocked) {
            this._state.isUnlocked = isUnlocked;
            this._handleAccountsChanged(accounts || []);
        }
    }
}
(0, _definePropertyDefault.default)(TorusInPageProvider, "_defaultState", {
    accounts: null,
    isConnected: false,
    isUnlocked: false,
    initialized: false,
    isPermanentlyDisconnected: false,
    hasEmittedConnection: false
});
/**
 * Returns whether the given image URL exists
 */ function imgExists(url) {
    return new Promise((resolve, reject)=>{
        try {
            const img = document.createElement("img");
            img.onload = ()=>resolve(true);
            img.onerror = ()=>resolve(false);
            img.src = url;
        } catch (e) {
            reject(e);
        }
    });
}
/**
 * Extracts a name for the site from the DOM
 */ const getSiteName = (window1)=>{
    const { document: document1  } = window1;
    const siteName = document1.querySelector('head > meta[property="og:site_name"]');
    if (siteName) return siteName.content;
    const metaTitle = document1.querySelector('head > meta[name="title"]');
    if (metaTitle) return metaTitle.content;
    if (document1.title && document1.title.length > 0) return document1.title;
    return window1.location.hostname;
};
/**
 * Extracts an icon for the site from the DOM
 */ async function getSiteIcon(window1) {
    try {
        const { document: document1  } = window1;
        // Use the site's favicon if it exists
        let icon = document1.querySelector('head > link[rel="shortcut icon"]');
        if (icon && await imgExists(icon.href)) return icon.href;
        // Search through available icons in no particular order
        icon = Array.from(document1.querySelectorAll('head > link[rel="icon"]')).find((_icon)=>Boolean(_icon.href));
        if (icon && await imgExists(icon.href)) return icon.href;
        return "";
    } catch (error) {
        return "";
    }
}
/**
 * Gets site metadata and returns it
 *
 */ const getSiteMetadata = async ()=>({
        name: getSiteName(window),
        icon: await getSiteIcon(window)
    });
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const PROVIDER_UNSAFE_METHODS = [
    "send_transaction",
    "sign_transaction",
    "sign_all_transactions",
    "sign_message",
    "connect"
];
const COMMUNICATION_UNSAFE_METHODS = [
    (0, _baseControllers.COMMUNICATION_JRPC_METHODS).SET_PROVIDER
];
const isLocalStorageAvailable = storageAvailable("localStorage");
// preload for iframe doesn't work https://bugs.chromium.org/p/chromium/issues/detail?id=593267
(async function preLoadIframe() {
    try {
        if (typeof document === "undefined") return;
        const torusIframeHtml = document.createElement("link");
        const { torusUrl  } = await getTorusUrl("production");
        torusIframeHtml.href = `${torusUrl}/frame`;
        torusIframeHtml.crossOrigin = "anonymous";
        torusIframeHtml.type = "text/html";
        torusIframeHtml.rel = "prefetch";
        if (torusIframeHtml.relList && torusIframeHtml.relList.supports) {
            if (torusIframeHtml.relList.supports("prefetch")) document.head.appendChild(torusIframeHtml);
        }
    } catch (error) {
        log.warn(error);
    }
})();
class Torus {
    constructor(){
        let { modalZIndex =99999  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _definePropertyDefault.default)(this, "isInitialized", void 0);
        (0, _definePropertyDefault.default)(this, "torusAlert", void 0);
        (0, _definePropertyDefault.default)(this, "modalZIndex", void 0);
        (0, _definePropertyDefault.default)(this, "alertZIndex", void 0);
        (0, _definePropertyDefault.default)(this, "requestedLoginProvider", void 0);
        (0, _definePropertyDefault.default)(this, "provider", void 0);
        (0, _definePropertyDefault.default)(this, "communicationProvider", void 0);
        (0, _definePropertyDefault.default)(this, "dappStorageKey", void 0);
        (0, _definePropertyDefault.default)(this, "isTopupHidden", false);
        (0, _definePropertyDefault.default)(this, "torusAlertContainer", void 0);
        (0, _definePropertyDefault.default)(this, "torusUrl", void 0);
        (0, _definePropertyDefault.default)(this, "torusIframe", void 0);
        (0, _definePropertyDefault.default)(this, "styleLink", void 0);
        this.torusUrl = "";
        this.isInitialized = false; // init done
        this.requestedLoginProvider = null;
        this.modalZIndex = modalZIndex;
        this.alertZIndex = modalZIndex + 1000;
        this.dappStorageKey = "";
    }
    get isLoggedIn() {
        if (!this.communicationProvider) return false;
        return this.communicationProvider.isLoggedIn;
    }
    async init() {
        let { buildEnv =TORUS_BUILD_ENV.PRODUCTION , enableLogging =false , network , showTorusButton =false , useLocalStorage =false , buttonPosition =BUTTON_POSITION.BOTTOM_LEFT , apiKey ="torus-default" , extraParams ={} , whiteLabel  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (this.isInitialized) throw new Error("Already initialized");
        (0, _httpHelpers.setAPIKey)(apiKey);
        const { torusUrl , logLevel  } = await getTorusUrl(buildEnv);
        log.enableAll();
        log.info(torusUrl, "url loaded");
        log.info(`Solana Embed Version :${version}`);
        this.torusUrl = torusUrl;
        log.setDefaultLevel(logLevel);
        if (enableLogging) log.enableAll();
        else log.disableAll();
        const dappStorageKey = this.handleDappStorageKey(useLocalStorage);
        const torusIframeUrl = new URL(torusUrl);
        if (torusIframeUrl.pathname.endsWith("/")) torusIframeUrl.pathname += "frame";
        else torusIframeUrl.pathname += "/frame";
        const hashParams = new URLSearchParams();
        if (dappStorageKey) hashParams.append("dappStorageKey", dappStorageKey);
        hashParams.append("origin", window.location.origin);
        torusIframeUrl.hash = hashParams.toString();
        // Iframe code
        this.torusIframe = htmlToElement(`<iframe
        id="torusIframe"
        class="torusIframe"
        src="${torusIframeUrl.href}"
        style="display: none; position: fixed; top: 0; right: 0; width: 100%;
        height: 100%; border: none; border-radius: 0; z-index: ${this.modalZIndex.toString()}"
      ></iframe>`);
        this.torusAlertContainer = htmlToElement(`<div id="torusAlertContainer" style="display:none; z-index: ${this.alertZIndex.toString()}"></div>`);
        this.styleLink = htmlToElement(`<link href="${torusUrl}/css/widget.css" rel="stylesheet" type="text/css">`);
        const handleSetup = async ()=>{
            return new Promise((resolve, reject)=>{
                try {
                    window.document.head.appendChild(this.styleLink);
                    window.document.body.appendChild(this.torusIframe);
                    window.document.body.appendChild(this.torusAlertContainer);
                    this.torusIframe.addEventListener("load", async ()=>{
                        const dappMetadata = await getSiteMetadata();
                        // send init params here
                        this.torusIframe.contentWindow.postMessage({
                            buttonPosition,
                            apiKey,
                            network,
                            dappMetadata,
                            extraParams,
                            whiteLabel
                        }, torusIframeUrl.origin);
                        await this._setupWeb3({
                            torusUrl
                        });
                        if (showTorusButton) this.showTorusButton();
                        if (whiteLabel !== null && whiteLabel !== void 0 && whiteLabel.topupHide) this.isTopupHidden = whiteLabel.topupHide;
                        else this.hideTorusButton();
                        this.isInitialized = true;
                        window.torus = this;
                        resolve();
                    });
                } catch (error) {
                    reject(error);
                }
            });
        };
        await documentReady();
        await handleSetup();
    }
    async login() {
        let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!this.isInitialized) throw new Error("Call init() first");
        try {
            this.requestedLoginProvider = params.loginProvider || null;
            if (!this.requestedLoginProvider) this.communicationProvider._displayIframe({
                isFull: true
            });
            // If user is already logged in, we assume they have given access to the website
            const res = await new Promise((resolve, reject)=>{
                // We use this method because we want to update inPage provider state with account info
                this.provider._rpcRequest({
                    method: "solana_requestAccounts",
                    params: [
                        this.requestedLoginProvider,
                        params.login_hint
                    ]
                }, (0, _openloginJrpc.getRpcPromiseCallback)(resolve, reject));
            });
            if (Array.isArray(res) && res.length > 0) return res;
            // This would never happen, but just in case
            throw new Error("Login failed");
        } catch (error) {
            log.error("login failed", error);
            throw error;
        } finally{
            if (this.communicationProvider.isIFrameFullScreen) this.communicationProvider._displayIframe();
        }
    }
    async loginWithPrivateKey(loginParams) {
        if (!this.isInitialized) throw new Error("Call init() first");
        const { privateKey , userInfo  } = loginParams;
        const { success  } = await this.communicationProvider.request({
            method: "login_with_private_key",
            params: {
                privateKey,
                userInfo
            }
        });
        if (!success) throw new Error("Login Failed");
    }
    async logout() {
        if (!this.communicationProvider.isLoggedIn) throw new Error("Not logged in");
        await this.communicationProvider.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).LOGOUT,
            params: []
        });
        this.requestedLoginProvider = null;
    }
    async cleanUp() {
        if (this.communicationProvider.isLoggedIn) await this.logout();
        this.clearInit();
    }
    clearInit() {
        function isElement(element) {
            return element instanceof Element || element instanceof Document;
        }
        if (isElement(this.styleLink) && window.document.body.contains(this.styleLink)) {
            this.styleLink.remove();
            this.styleLink = undefined;
        }
        if (isElement(this.torusIframe) && window.document.body.contains(this.torusIframe)) {
            this.torusIframe.remove();
            this.torusIframe = undefined;
        }
        if (isElement(this.torusAlertContainer) && window.document.body.contains(this.torusAlertContainer)) {
            this.torusAlert = undefined;
            this.torusAlertContainer.remove();
            this.torusAlertContainer = undefined;
        }
        this.isInitialized = false;
    }
    hideTorusButton() {
        this.communicationProvider.hideTorusButton();
    }
    showTorusButton() {
        this.communicationProvider.showTorusButton();
    }
    async setProvider(params) {
        await this.communicationProvider.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).SET_PROVIDER,
            params: _objectSpread({}, params)
        });
    }
    async showWallet(path) {
        let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const instanceId = await this.communicationProvider.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).WALLET_INSTANCE_ID,
            params: []
        });
        const finalPath = path ? `/${path}` : "";
        const finalUrl = new URL(`${this.torusUrl}/wallet${finalPath}`);
        // Using URL constructor to prevent js injection and allow parameter validation.!
        finalUrl.searchParams.append("instanceId", instanceId);
        Object.keys(params).forEach((x)=>{
            finalUrl.searchParams.append(x, params[x]);
        });
        if (this.dappStorageKey) finalUrl.hash = `#dappStorageKey=${this.dappStorageKey}`;
        // No need to track this window state. Hence, no _handleWindow call.
        const walletWindow = new PopupHandler({
            url: finalUrl,
            features: getPopupFeatures(FEATURES_DEFAULT_WALLET_WINDOW)
        });
        walletWindow.open();
    }
    async getUserInfo() {
        const userInfoResponse = await this.communicationProvider.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).USER_INFO,
            params: []
        });
        return userInfoResponse;
    }
    async initiateTopup(provider, params) {
        if (!this.isInitialized) throw new Error("Torus is not initialized");
        const windowId = getWindowId();
        this.communicationProvider._handleWindow(windowId);
        const topupResponse = await this.communicationProvider.request({
            method: (0, _baseControllers.COMMUNICATION_JRPC_METHODS).TOPUP,
            params: {
                provider,
                params,
                windowId
            }
        });
        return topupResponse;
    }
    // Solana specific API
    async getAccounts() {
        const response = await this.provider.request({
            method: "getAccounts",
            params: []
        });
        return response;
    }
    async sendTransaction(transaction) {
        const isLegacyTransaction = isLegacyTransactionInstance(transaction);
        const message = isLegacyTransaction ? transaction.serialize({
            requireAllSignatures: false
        }).toString("hex") : Buffer.from(transaction.serialize()).toString("hex");
        const response = await this.provider.request({
            method: "send_transaction",
            params: {
                message,
                isLegacyTransaction
            }
        });
        return response;
    }
    // support sendOptions
    async signAndSendTransaction(transaction, options) {
        const isLegacyTransaction = isLegacyTransactionInstance(transaction);
        const message = isLegacyTransaction ? transaction.serialize({
            requireAllSignatures: false
        }).toString("hex") : Buffer.from(transaction.serialize()).toString("hex");
        const response = await this.provider.request({
            method: "send_transaction",
            params: {
                message,
                options,
                isLegacyTransaction
            }
        });
        return {
            signature: response
        };
    }
    async signTransaction(transaction) {
        const isLegacyTransaction = isLegacyTransactionInstance(transaction);
        const message = isLegacyTransaction ? transaction.serializeMessage().toString("hex") : Buffer.from(transaction.message.serialize()).toString("hex");
        const response = await this.provider.request({
            method: "sign_transaction",
            params: {
                message,
                messageOnly: true,
                isLegacyTransaction
            }
        });
        // reconstruct signature pair
        const parsed = JSON.parse(response);
        const signature = {
            publicKey: new (0, _web3Js.PublicKey)(parsed.publicKey),
            signature: Buffer.from(parsed.signature, "hex")
        };
        transaction.addSignature(signature.publicKey, signature.signature);
        return transaction;
    }
    async signAllTransactions(transactions) {
        let isLegacyTransaction;
        const encodedMessage = transactions.map((tx)=>{
            isLegacyTransaction = isLegacyTransactionInstance(tx);
            return isLegacyTransaction ? tx.serializeMessage().toString("hex") : Buffer.from(tx.message.serialize()).toString("hex");
        });
        const responses = await this.provider.request({
            method: "sign_all_transactions",
            params: {
                message: encodedMessage,
                messageOnly: true,
                isLegacyTransaction
            }
        });
        // reconstruct signature pairs
        const signatures = responses.map((item)=>{
            const parsed = JSON.parse(item);
            return {
                publicKey: new (0, _web3Js.PublicKey)(parsed.publicKey),
                signature: Buffer.from(parsed.signature, "hex")
            };
        });
        transactions.forEach((tx, idx)=>{
            tx.addSignature(signatures[idx].publicKey, signatures[idx].signature);
            return tx;
        });
        return transactions;
    }
    async signMessage(data) {
        const response = await this.provider.request({
            method: "sign_message",
            params: {
                data
            }
        });
        return response;
    }
    async getGaslessPublicKey() {
        const response = await this.provider.request({
            method: "get_gasless_public_key",
            params: []
        });
        return response;
    }
    // async connect(): Promise<boolean> {
    //   const response = (await this.provider.request({
    //     method: "connect",
    //     params: {},
    //   })) as boolean;
    //   return response;
    // }
    handleDappStorageKey(useLocalStorage) {
        let dappStorageKey = "";
        if (isLocalStorageAvailable && useLocalStorage) {
            const storedKey = window.localStorage.getItem(configuration.localStorageKey);
            if (storedKey) dappStorageKey = storedKey;
            else {
                const generatedKey = `torus-app-${getWindowId()}`;
                window.localStorage.setItem(configuration.localStorageKey, generatedKey);
                dappStorageKey = generatedKey;
            }
        }
        this.dappStorageKey = dappStorageKey;
        return dappStorageKey;
    }
    async _setupWeb3(providerParams) {
        log.info("setupWeb3 running");
        // setup background connection
        const providerStream = new (0, _openloginJrpc.BasePostMessageStream)({
            name: "embed_torus",
            target: "iframe_torus",
            targetWindow: this.torusIframe.contentWindow
        });
        // We create another LocalMessageDuplexStream for communication between dapp <> iframe
        const communicationStream = new (0, _openloginJrpc.BasePostMessageStream)({
            name: "embed_communication",
            target: "iframe_communication",
            targetWindow: this.torusIframe.contentWindow
        });
        // compose the inPage provider
        const inPageProvider = new TorusInPageProvider(providerStream, {});
        const communicationProvider = new TorusCommunicationProvider(communicationStream, {});
        inPageProvider.tryWindowHandle = (payload, cb)=>{
            const _payload = payload;
            if (!Array.isArray(_payload) && PROVIDER_UNSAFE_METHODS.includes(_payload.method)) {
                if (!this.communicationProvider.isLoggedIn) throw new Error("User Not Logged In");
                const windowId = getWindowId();
                communicationProvider._handleWindow(windowId, {
                    target: "_blank",
                    features: getPopupFeatures(FEATURES_CONFIRM_WINDOW)
                });
                // for inPageProvider methods sending windowId in request instead of params
                // as params might be positional.
                _payload.windowId = windowId;
            }
            inPageProvider._rpcEngine.handle(_payload, cb);
        };
        communicationProvider.tryWindowHandle = (payload, cb)=>{
            const _payload = payload;
            if (!Array.isArray(_payload) && COMMUNICATION_UNSAFE_METHODS.includes(_payload.method)) {
                const windowId = getWindowId();
                communicationProvider._handleWindow(windowId, {
                    target: "_blank",
                    features: getPopupFeatures(FEATURES_PROVIDER_CHANGE_WINDOW) // todo: are these features generic for all
                });
                // for communication methods sending window id in jrpc req params
                _payload.params.windowId = windowId;
            }
            communicationProvider._rpcEngine.handle(_payload, cb);
        };
        // detect solana_requestAccounts and pipe to enable for now
        const detectAccountRequestPrototypeModifier = (m)=>{
            const originalMethod = inPageProvider[m];
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            inPageProvider[m] = function providerFunc(request, cb) {
                const { method , params =[]  } = request;
                if (method === "solana_requestAccounts") {
                    if (!cb) return self.login({
                        loginProvider: params[0]
                    });
                    self.login({
                        loginProvider: params[0]
                    })// eslint-disable-next-line promise/no-callback-in-promise
                    .then((res)=>cb(null, res))// eslint-disable-next-line promise/no-callback-in-promise
                    .catch((err)=>cb(err));
                }
                return originalMethod.apply(this, [
                    request,
                    cb
                ]);
            };
        };
        // Detects call to solana_requestAccounts in request & sendAsync and passes to login
        detectAccountRequestPrototypeModifier("request");
        detectAccountRequestPrototypeModifier("sendAsync");
        detectAccountRequestPrototypeModifier("send");
        const proxiedInPageProvider = new Proxy(inPageProvider, {
            // straight up lie that we deleted the property so that it doesn't
            // throw an error in strict mode
            deleteProperty: ()=>true
        });
        const proxiedCommunicationProvider = new Proxy(communicationProvider, {
            // straight up lie that we deleted the property so that it doesn't
            // throw an error in strict mode
            deleteProperty: ()=>true
        });
        this.provider = proxiedInPageProvider;
        this.communicationProvider = proxiedCommunicationProvider;
        await Promise.all([
            inPageProvider._initializeState(),
            communicationProvider._initializeState(_objectSpread(_objectSpread({}, providerParams), {}, {
                dappStorageKey: this.dappStorageKey,
                torusAlertContainer: this.torusAlertContainer,
                torusIframe: this.torusIframe
            }))
        ]);
        log.debug("Torus - injected provider");
    }
}

},{"a62f51460dc954f6":"fCgem","@babel/runtime/helpers/defineProperty":"4x6r7","@solana/web3.js":"5JBKN","@toruslabs/base-controllers":"bWbve","@toruslabs/http-helpers":"71C66","@toruslabs/openlogin-jrpc":"hHcJo","eth-rpc-errors":"apfts","is-stream":"dpmgS","pump":"d2HVR","loglevel":"7kRFs","fast-deep-equal":"ixZYU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bWbve":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ACCOUNT_CATEGORY", ()=>ACCOUNT_CATEGORY);
parcelHelpers.export(exports, "ACTIVITY_ACTION", ()=>ACTIVITY_ACTION);
parcelHelpers.export(exports, "ACTIVITY_ACTION_ALL", ()=>ACTIVITY_ACTION_ALL);
parcelHelpers.export(exports, "ACTIVITY_ACTION_BURN", ()=>ACTIVITY_ACTION_BURN);
parcelHelpers.export(exports, "ACTIVITY_ACTION_RECEIVE", ()=>ACTIVITY_ACTION_RECEIVE);
parcelHelpers.export(exports, "ACTIVITY_ACTION_SEND", ()=>ACTIVITY_ACTION_SEND);
parcelHelpers.export(exports, "ACTIVITY_ACTION_TOPUP", ()=>ACTIVITY_ACTION_TOPUP);
parcelHelpers.export(exports, "ACTIVITY_PERIOD_ALL", ()=>ACTIVITY_PERIOD_ALL);
parcelHelpers.export(exports, "ACTIVITY_PERIOD_MONTH_ONE", ()=>ACTIVITY_PERIOD_MONTH_ONE);
parcelHelpers.export(exports, "ACTIVITY_PERIOD_MONTH_SIX", ()=>ACTIVITY_PERIOD_MONTH_SIX);
parcelHelpers.export(exports, "ACTIVITY_PERIOD_WEEK_ONE", ()=>ACTIVITY_PERIOD_WEEK_ONE);
parcelHelpers.export(exports, "ACTIVITY_STATUS_CANCELLED", ()=>ACTIVITY_STATUS_CANCELLED);
parcelHelpers.export(exports, "ACTIVITY_STATUS_CANCELLING", ()=>ACTIVITY_STATUS_CANCELLING);
parcelHelpers.export(exports, "ACTIVITY_STATUS_PENDING", ()=>ACTIVITY_STATUS_PENDING);
parcelHelpers.export(exports, "ACTIVITY_STATUS_SUCCESSFUL", ()=>ACTIVITY_STATUS_SUCCESSFUL);
parcelHelpers.export(exports, "ACTIVITY_STATUS_UNSUCCESSFUL", ()=>ACTIVITY_STATUS_UNSUCCESSFUL);
parcelHelpers.export(exports, "BROADCAST_CHANNELS", ()=>BROADCAST_CHANNELS);
parcelHelpers.export(exports, "BROADCAST_CHANNELS_MSGS", ()=>BROADCAST_CHANNELS_MSGS);
parcelHelpers.export(exports, "BaseBlockTracker", ()=>BaseBlockTracker);
parcelHelpers.export(exports, "BaseController", ()=>BaseController);
parcelHelpers.export(exports, "BaseCurrencyController", ()=>BaseCurrencyController);
parcelHelpers.export(exports, "BaseEmbedController", ()=>BaseEmbedController);
parcelHelpers.export(exports, "BaseKeyringController", ()=>BaseKeyringController);
parcelHelpers.export(exports, "BasePreferencesController", ()=>BasePreferencesController);
parcelHelpers.export(exports, "BaseTransactionStateManager", ()=>BaseTransactionStateManager);
parcelHelpers.export(exports, "BroadcastChannelHandler", ()=>BroadcastChannelHandler);
parcelHelpers.export(exports, "COMMUNICATION_JRPC_METHODS", ()=>COMMUNICATION_JRPC_METHODS);
parcelHelpers.export(exports, "COMMUNICATION_NOTIFICATIONS", ()=>COMMUNICATION_NOTIFICATIONS);
parcelHelpers.export(exports, "CommunicationWindowManager", ()=>CommunicationWindowManager);
parcelHelpers.export(exports, "DEFAULT_PREFERENCES", ()=>DEFAULT_PREFERENCES);
parcelHelpers.export(exports, "FEATURES_CONFIRM_WINDOW", ()=>FEATURES_CONFIRM_WINDOW);
parcelHelpers.export(exports, "FEATURES_DEFAULT_POPUP_WINDOW", ()=>FEATURES_DEFAULT_POPUP_WINDOW);
parcelHelpers.export(exports, "FEATURES_DEFAULT_WALLET_WINDOW", ()=>FEATURES_DEFAULT_WALLET_WINDOW);
parcelHelpers.export(exports, "FEATURES_PROVIDER_CHANGE_WINDOW", ()=>FEATURES_PROVIDER_CHANGE_WINDOW);
parcelHelpers.export(exports, "LOGIN_PROVIDER", ()=>LOGIN_PROVIDER);
parcelHelpers.export(exports, "PAYMENT_PROVIDER", ()=>PAYMENT_PROVIDER);
parcelHelpers.export(exports, "POPUP_LOADED", ()=>POPUP_LOADED);
parcelHelpers.export(exports, "POPUP_RESULT", ()=>POPUP_RESULT);
parcelHelpers.export(exports, "PROVIDER_JRPC_METHODS", ()=>PROVIDER_JRPC_METHODS);
parcelHelpers.export(exports, "PROVIDER_NOTIFICATIONS", ()=>PROVIDER_NOTIFICATIONS);
parcelHelpers.export(exports, "PopupHandler", ()=>PopupHandler);
parcelHelpers.export(exports, "PopupStoreChannel", ()=>PopupStoreChannel);
parcelHelpers.export(exports, "PopupWithBcHandler", ()=>PopupWithBcHandler);
parcelHelpers.export(exports, "RedirectHandler", ()=>RedirectHandler);
parcelHelpers.export(exports, "SETUP_COMPLETE", ()=>SETUP_COMPLETE);
parcelHelpers.export(exports, "StreamWindow", ()=>StreamWindow);
parcelHelpers.export(exports, "TRANSACTION_TYPES", ()=>TRANSACTION_TYPES);
parcelHelpers.export(exports, "TX_EVENTS", ()=>TX_EVENTS);
parcelHelpers.export(exports, "TransactionStatus", ()=>TransactionStatus);
parcelHelpers.export(exports, "UserError", ()=>UserError);
parcelHelpers.export(exports, "addressSlicer", ()=>addressSlicer);
parcelHelpers.export(exports, "broadcastChannelOptions", ()=>broadcastChannelOptions);
parcelHelpers.export(exports, "concatSig", ()=>concatSig);
parcelHelpers.export(exports, "createChangeProviderMiddlewareMiddleware", ()=>createChangeProviderMiddlewareMiddleware);
parcelHelpers.export(exports, "createCommunicationMiddleware", ()=>createCommunicationMiddleware);
parcelHelpers.export(exports, "createEventEmitterProxy", ()=>createEventEmitterProxy);
parcelHelpers.export(exports, "createFetchConfigFromReq", ()=>createFetchConfigFromReq);
parcelHelpers.export(exports, "createFetchMiddleware", ()=>createFetchMiddleware);
parcelHelpers.export(exports, "createGenericJRPCMiddleware", ()=>createGenericJRPCMiddleware);
parcelHelpers.export(exports, "createLoggerMiddleware", ()=>createLoggerMiddleware);
parcelHelpers.export(exports, "createOriginMiddleware", ()=>createOriginMiddleware);
parcelHelpers.export(exports, "createRandomId", ()=>createRandomId);
parcelHelpers.export(exports, "createSwappableProxy", ()=>createSwappableProxy);
parcelHelpers.export(exports, "createTopupMiddleware", ()=>createTopupMiddleware);
parcelHelpers.export(exports, "formatDate", ()=>formatDate);
parcelHelpers.export(exports, "formatSmallNumbers", ()=>formatSmallNumbers);
parcelHelpers.export(exports, "formatTime", ()=>formatTime);
parcelHelpers.export(exports, "getCustomDeviceInfo", ()=>getCustomDeviceInfo);
parcelHelpers.export(exports, "getHeaders", ()=>getHeaders);
parcelHelpers.export(exports, "getPopupFeatures", ()=>getPopupFeatures);
parcelHelpers.export(exports, "getTxStatusText", ()=>getTxStatusText);
parcelHelpers.export(exports, "handleRedirectParameters", ()=>handleRedirectParameters);
parcelHelpers.export(exports, "hashMessage", ()=>hashMessage);
parcelHelpers.export(exports, "intToHex", ()=>intToHex);
parcelHelpers.export(exports, "padWithZeroes", ()=>padWithZeroes);
parcelHelpers.export(exports, "providerAsMiddleware", ()=>providerAsMiddleware);
parcelHelpers.export(exports, "providerFromEngine", ()=>providerFromEngine);
parcelHelpers.export(exports, "providerFromMiddleware", ()=>providerFromMiddleware);
parcelHelpers.export(exports, "randomId", ()=>randomId);
parcelHelpers.export(exports, "signMessage", ()=>signMessage);
parcelHelpers.export(exports, "significantDigits", ()=>significantDigits);
parcelHelpers.export(exports, "sleep", ()=>sleep);
parcelHelpers.export(exports, "timeout", ()=>timeout$1);
parcelHelpers.export(exports, "transactionMatchesNetwork", ()=>transactionMatchesNetwork);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _openloginJrpc = require("@toruslabs/openlogin-jrpc");
var _ethRpcErrors = require("eth-rpc-errors");
var _jsonRpcRandomId = require("json-rpc-random-id");
var _jsonRpcRandomIdDefault = parcelHelpers.interopDefault(_jsonRpcRandomId);
var _bignumberJs = require("bignumber.js");
var _ethereumjsUtil = require("ethereumjs-util");
var _loglevel = require("loglevel");
var _loglevelDefault = parcelHelpers.interopDefault(_loglevel);
var _broadcastChannel = require("@toruslabs/broadcast-channel");
var _httpHelpers = require("@toruslabs/http-helpers");
var _bowser = require("bowser");
var _bowserDefault = parcelHelpers.interopDefault(_bowser);
var _lodash = require("lodash");
var Buffer = require("953a552e4c8f732c").Buffer;
function ownKeys$3(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$3(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$3(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
/**
 * Controller class that provides configuration, state management, and subscriptions
 */ class BaseController extends (0, _openloginJrpc.SafeEventEmitter) {
    /**
   * Default options used to configure this controller
   */ /**
   * Default state set on this controller
   */ /**
   * Determines if listeners are notified of state changes
   */ /**
   * Name of this controller used during composition
   */ /**
   * Creates a BaseController instance. Both initial state and initial
   * configuration options are merged with defaults upon initialization.
   *
   * @param config - Initial options used to configure this controller
   * @param state - Initial state to set on this controller
   */ constructor(_ref){
        let { config ={} , state ={}  } = _ref;
        super();
        // Use assign since generics can't be spread: https://git.io/vpRhY
        (0, _definePropertyDefault.default)(this, "defaultConfig", {});
        (0, _definePropertyDefault.default)(this, "defaultState", {});
        (0, _definePropertyDefault.default)(this, "disabled", false);
        (0, _definePropertyDefault.default)(this, "name", "BaseController");
        (0, _definePropertyDefault.default)(this, "initialConfig", void 0);
        (0, _definePropertyDefault.default)(this, "initialState", void 0);
        (0, _definePropertyDefault.default)(this, "internalConfig", this.defaultConfig);
        (0, _definePropertyDefault.default)(this, "internalState", this.defaultState);
        this.initialState = state;
        this.initialConfig = config;
    }
    /**
   * Retrieves current controller configuration options
   *
   * @returns - Current configuration
   */ get config() {
        return this.internalConfig;
    }
    /**
   * Retrieves current controller state
   *
   * @returns - Current state
   */ get state() {
        return this.internalState;
    }
    /**
   * Updates controller configuration
   *
   * @param config - New configuration options
   * @param overwrite - Overwrite config instead of merging
   * @param fullUpdate - Boolean that defines if the update is partial or not
   */ configure(config) {
        let overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        let fullUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (fullUpdate) {
            this.internalConfig = overwrite ? config : Object.assign(this.internalConfig, config);
            for(const key in this.internalConfig)if (typeof this.internalConfig[key] !== "undefined") this[key] = this.internalConfig[key];
        } else {
            for(const key in config)/* istanbul ignore else */ if (typeof this.internalConfig[key] !== "undefined") {
                this.internalConfig[key] = config[key];
                this[key] = config[key];
            }
        }
    }
    /**
   * Updates controller state
   *
   * @param state - New state
   * @param overwrite - Overwrite state instead of merging
   */ update(state) {
        let overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        this.internalState = overwrite ? _objectSpread$3({}, state) : _objectSpread$3(_objectSpread$3({}, this.internalState), state);
        this.emit("store", this.internalState);
    }
    /**
   * Enables the controller. This sets each config option as a member
   * variable on this instance and triggers any defined setters. This
   * also sets initial state and triggers any listeners.
   *
   * @returns - This controller instance
   */ initialize() {
        this.internalState = this.defaultState;
        this.internalConfig = this.defaultConfig;
        this.configure(this.initialConfig);
        this.update(this.initialState);
        return this;
    }
}
const sec = 1000;
const calculateSum = (accumulator, currentValue)=>accumulator + currentValue;
const blockTrackerEvents = [
    "sync",
    "latest"
];
class BaseBlockTracker extends BaseController {
    constructor(_ref){
        let { config ={} , state ={}  } = _ref;
        super({
            config,
            state
        });
        // config
        (0, _definePropertyDefault.default)(this, "name", "BaseBlockTracker");
        (0, _definePropertyDefault.default)(this, "_blockResetTimeout", void 0);
        this.defaultState = {
            _currentBlock: {
                idempotencyKey: ""
            },
            _isRunning: false
        };
        this.defaultConfig = {
            blockResetDuration: 20 * sec
        };
        this.initialize();
        // bind functions for internal use
        this._onNewListener = this._onNewListener.bind(this);
        this._onRemoveListener = this._onRemoveListener.bind(this);
        this._resetCurrentBlock = this._resetCurrentBlock.bind(this);
        // listen for handler changes
        this._setupInternalEvents();
    }
    isRunning() {
        return this.state._isRunning;
    }
    getCurrentBlock() {
        return this.state._currentBlock;
    }
    async getLatestBlock() {
        // return if available
        if (this.state._currentBlock) return this.state._currentBlock;
        // wait for a new latest block
        const latestBlock = await new Promise((resolve)=>{
            this.once("latest", (newState)=>{
                if (newState._currentBlock) resolve(newState._currentBlock);
            });
        });
        // return newly set current block
        return latestBlock;
    }
    // dont allow module consumer to remove our internal event listeners
    removeAllListeners(eventName) {
        if (eventName) super.removeAllListeners(eventName);
        else super.removeAllListeners();
        // re-add internal events
        this._setupInternalEvents();
        // trigger stop check just in case
        this._onRemoveListener();
        return this;
    }
    /**
   * To be implemented in subclass.
   */ _start() {
    // default behavior is noop
    }
    /**
   * To be implemented in subclass.
   */ _end() {
    // default behavior is noop
    }
    _newPotentialLatest(newBlock) {
        const currentBlock = this.state._currentBlock;
        // only update if blok number is higher
        if (currentBlock && newBlock.idempotencyKey === currentBlock.idempotencyKey) return;
        this._setCurrentBlock(newBlock);
    }
    _setupInternalEvents() {
        // first remove listeners for idempotency
        this.removeListener("newListener", this._onNewListener);
        this.removeListener("removeListener", this._onRemoveListener);
        // then add them
        this.on("removeListener", this._onRemoveListener);
        this.on("newListener", this._onNewListener);
    }
    _onNewListener() {
        this._maybeStart();
    }
    _onRemoveListener() {
        // `removeListener` is called *after* the listener is removed
        if (this._getBlockTrackerEventCount() > 0) return;
        this._maybeEnd();
    }
    _maybeStart() {
        if (this.state._isRunning) return;
        this.state._isRunning = true;
        // cancel setting latest block to stale
        this._cancelBlockResetTimeout();
        this._start();
    }
    _maybeEnd() {
        if (!this.state._isRunning) return;
        this.state._isRunning = false;
        this._setupBlockResetTimeout();
        this._end();
    }
    _getBlockTrackerEventCount() {
        return blockTrackerEvents.map((eventName)=>this.listenerCount(eventName)).reduce(calculateSum);
    }
    _setCurrentBlock(newBlock) {
        const oldBlock = this.state._currentBlock;
        this.update({
            _currentBlock: newBlock
        });
        this.emit("latest", newBlock);
        this.emit("sync", {
            oldBlock,
            newBlock
        });
    }
    _setupBlockResetTimeout() {
        // clear any existing timeout
        this._cancelBlockResetTimeout();
        // clear latest block when stale
        this._blockResetTimeout = setTimeout(this._resetCurrentBlock, this.config.blockResetDuration);
        // nodejs - dont hold process open
        if (this._blockResetTimeout.unref) this._blockResetTimeout.unref();
    }
    _cancelBlockResetTimeout() {
        if (this._blockResetTimeout) clearTimeout(this._blockResetTimeout);
    }
    _resetCurrentBlock() {
        this.update({
            _currentBlock: {
                idempotencyKey: ""
            }
        });
    }
}
const filterNoop = ()=>true;
const internalEvents = [
    "newListener",
    "removeListener"
];
const externalEventFilter = (name)=>!internalEvents.includes(name);
function getRawListeners(eventEmitter, name) {
    // prefer native
    return eventEmitter.rawListeners(name);
}
function createEventEmitterProxy(initialTarget, opts) {
    // parse options
    const finalOpts = opts || {};
    let eventFilter = finalOpts.eventFilter || filterNoop;
    if (typeof eventFilter === "string" && eventFilter === "skipInternal") eventFilter = externalEventFilter;
    if (typeof eventFilter !== "function") throw new Error("createEventEmitterProxy - Invalid eventFilter");
    let target = initialTarget;
    let setTarget = (newTarget)=>{
        const oldTarget = target;
        target = newTarget;
        oldTarget.eventNames().filter(eventFilter).forEach((name)=>{
            getRawListeners(oldTarget, name).forEach((handler)=>newTarget.on(name, handler));
        });
        // remove old listeners
        oldTarget.removeAllListeners();
    };
    const proxy = new Proxy({}, {
        get: (_, name)=>{
            // override `setTarget` access
            if (name === "setTarget") return setTarget;
            return target[name];
        },
        set: (_, name, value)=>{
            // allow `setTarget` overrides
            if (name === "setTarget") {
                setTarget = value;
                return true;
            }
            target[name] = value;
            return true;
        }
    });
    return proxy;
}
function createSwappableProxy(initialTarget) {
    let target = initialTarget;
    let setTarget = (newTarget)=>{
        target = newTarget;
    };
    const proxy = new Proxy({}, {
        get: (_, name)=>{
            // override `setTarget` access
            if (name === "setTarget") return setTarget;
            return target[name];
        },
        set: (_, name, value)=>{
            // allow `setTarget` overrides
            if (name === "setTarget") {
                setTarget = value;
                return true;
            }
            target[name] = value;
            return true;
        }
    });
    return proxy;
}
// every ten minutes
const POLLING_INTERVAL = 600000;
class BaseCurrencyController extends BaseController {
    constructor(_ref){
        let { config ={} , state  } = _ref;
        super({
            config,
            state
        });
        this.defaultState = {
            currentCurrency: "usd",
            conversionRate: 0,
            conversionDate: "N/A",
            nativeCurrency: "ETH"
        };
        this.defaultConfig = {
            pollInterval: POLLING_INTERVAL
        };
        this.initialize();
    }
    //
    // PUBLIC METHODS
    //
    getNativeCurrency() {
        return this.state.nativeCurrency;
    }
    setNativeCurrency(nativeCurrency) {
        this.update({
            nativeCurrency,
            ticker: nativeCurrency
        });
    }
    getCurrentCurrency() {
        return this.state.currentCurrency;
    }
    setCurrentCurrency(currentCurrency) {
        this.update({
            currentCurrency
        });
    }
    /**
   * A getter for the conversionRate property
   *
   * @returns The conversion rate from ETH to the selected currency.
   *
   */ getConversionRate() {
        return this.state.conversionRate;
    }
    setConversionRate(conversionRate) {
        this.update({
            conversionRate
        });
    }
    /**
   * A getter for the conversionDate property
   *
   * @returns The date at which the conversion rate was set. Expressed in milliseconds since midnight of
   * January 1, 1970
   *
   */ getConversionDate() {
        return this.state.conversionDate;
    }
    setConversionDate(conversionDate) {
        this.update({
            conversionDate
        });
    }
}
function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$2(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const createRandomId = (0, _jsonRpcRandomIdDefault.default)();
function providerFromEngine(engine) {
    const provider = new (0, _openloginJrpc.SafeEventEmitter)();
    // handle both rpc send methods
    provider.sendAsync = async (req)=>{
        const res = await engine.handle(req);
        if (res.error) {
            var _res$error, _res$error2;
            const err = (0, _ethRpcErrors.serializeError)(res.error, {
                fallbackError: {
                    message: ((_res$error = res.error) === null || _res$error === void 0 ? void 0 : _res$error.message) || res.error.toString(),
                    code: ((_res$error2 = res.error) === null || _res$error2 === void 0 ? void 0 : _res$error2.code) || -32603
                }
            });
            throw (0, _ethRpcErrors.ethErrors).rpc.internal(err);
        }
        return res.result;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider.send = (req, callback)=>{
        if (typeof callback !== "function") throw new Error('Must provide callback to "send" method.');
        engine.handle(req, callback);
    };
    // forward notifications
    if (engine.on) engine.on("notification", (message)=>{
        provider.emit("data", null, message);
    });
    provider.request = async (args)=>{
        const req = _objectSpread$2(_objectSpread$2({}, args), {}, {
            id: createRandomId(),
            jsonrpc: "2.0"
        });
        const res = await provider.sendAsync(req);
        return res;
    };
    return provider;
}
function providerFromMiddleware(middleware) {
    const engine = new (0, _openloginJrpc.JRPCEngine)();
    engine.push(middleware);
    const provider = providerFromEngine(engine);
    return provider;
}
function providerAsMiddleware(provider) {
    return async (req, res, _next, end)=>{
        // send request to provider
        try {
            const providerRes = await provider.sendAsync(req);
            res.result = providerRes;
            return end();
        } catch (error) {
            return end(error.message);
        }
    };
}
const FEATURES_PROVIDER_CHANGE_WINDOW = {
    height: 660,
    width: 375
};
const FEATURES_DEFAULT_WALLET_WINDOW = {
    height: 740,
    width: 1315
};
const FEATURES_DEFAULT_POPUP_WINDOW = {
    height: 700,
    width: 1200
};
const FEATURES_CONFIRM_WINDOW = {
    height: 700,
    width: 450
};
const POPUP_LOADED = "popup_loaded";
const POPUP_RESULT = "popup_result";
const SETUP_COMPLETE = "setup_complete";
const ACTIVITY_ACTION_ALL = "walletActivity.allTransactions";
const ACTIVITY_ACTION_SEND = "walletActivity.send";
const ACTIVITY_ACTION_BURN = "walletActivity.burn";
const ACTIVITY_ACTION_RECEIVE = "walletActivity.receive";
const ACTIVITY_ACTION_TOPUP = "walletActivity.topup";
const ACTIVITY_PERIOD_ALL = "walletActivity.all";
const ACTIVITY_PERIOD_WEEK_ONE = "walletActivity.lastOneWeek";
const ACTIVITY_PERIOD_MONTH_ONE = "walletActivity.lastOneMonth";
const ACTIVITY_PERIOD_MONTH_SIX = "walletActivity.lastSixMonts";
const ACTIVITY_STATUS_SUCCESSFUL = "walletActivity.successful";
const ACTIVITY_STATUS_UNSUCCESSFUL = "walletActivity.unsuccessful";
const ACTIVITY_STATUS_PENDING = "walletActivity.pending";
const ACTIVITY_STATUS_CANCELLED = "walletActivity.cancelled";
const ACTIVITY_STATUS_CANCELLING = "walletActivity.cancelling";
const COMMUNICATION_NOTIFICATIONS = {
    IFRAME_STATUS: "iframe_status",
    // Tell embed to create the window
    CREATE_WINDOW: "create_window",
    // Tell embed to close the window
    CLOSE_WINDOW: "close_window",
    USER_LOGGED_IN: "user_logged_in",
    USER_LOGGED_OUT: "user_logged_out"
};
const COMMUNICATION_JRPC_METHODS = {
    LOGOUT: "logout",
    WALLET_INSTANCE_ID: "wallet_instance_id",
    USER_INFO: "user_info",
    SET_PROVIDER: "set_provider",
    TOPUP: "topup",
    IFRAME_STATUS: "iframe_status",
    // embed has opened the window as requested
    OPENED_WINDOW: "opened_window",
    // user has closed the window from embed's side
    CLOSED_WINDOW: "closed_window",
    GET_PROVIDER_STATE: "get_provider_state",
    LOGIN_WITH_PRIVATE_KEY: "login_with_private_key"
};
const PROVIDER_JRPC_METHODS = {
    GET_PROVIDER_STATE: "wallet_get_provider_state"
};
const PROVIDER_NOTIFICATIONS = {
    ACCOUNTS_CHANGED: "wallet_accounts_changed",
    CHAIN_CHANGED: "wallet_chain_changed",
    UNLOCK_STATE_CHANGED: "wallet_unlock_state_changed"
};
const BROADCAST_CHANNELS = {
    REDIRECT_CHANNEL: "redirect_channel",
    PROVIDER_CHANGE_CHANNEL: "torus_provider_change_channel",
    TRANSACTION_CHANNEL: "torus_channel",
    MESSAGE_CHANNEL: "torus_message_channel",
    WALLET_LOGOUT_CHANNEL: "wallet_logout_channel",
    WALLET_SELECTED_ADDRESS_CHANNEL: "wallet_selected_address_channel",
    WALLET_NETWORK_CHANGE_CHANNEL: "wallet_network_change_channel",
    WALLET_ACCOUNT_IMPORT_CHANNEL: "wallet_account_import_channel",
    THEME_CHANGE: "theme_change_channel"
};
const BROADCAST_CHANNELS_MSGS = {
    LOGOUT: "logout",
    ACCOUNT_IMPORTED: "account_imported",
    SELECTED_ADDRESS_CHANGE: "selected_address_change",
    NETWORK_CHANGE: "network_change",
    SET_THEME: "set_theme"
};
function createChangeProviderMiddlewareMiddleware(_ref) {
    let { changeProvider  } = _ref;
    return (0, _openloginJrpc.createAsyncMiddleware)(async (request, response, next)=>{
        const { method  } = request;
        if (method !== COMMUNICATION_JRPC_METHODS.SET_PROVIDER) return next();
        if (!changeProvider) throw new Error("CommunicationMiddleware - opts.changeProvider not provided");
        response.result = await changeProvider(request);
    });
}
function createTopupMiddleware(_ref2) {
    let { topup  } = _ref2;
    return (0, _openloginJrpc.createAsyncMiddleware)(async (request, response, next)=>{
        const { method  } = request;
        if (method !== COMMUNICATION_JRPC_METHODS.TOPUP) return next();
        if (!topup) throw new Error("CommunicationMiddleware - opts.topup not provided");
        response.result = await topup(request);
    });
}
function createGenericJRPCMiddleware(targetMethod, handler) {
    return (0, _openloginJrpc.createAsyncMiddleware)(async (request, response, next)=>{
        const { method  } = request;
        if (method !== targetMethod) return next();
        if (!handler) throw new Error(`CommunicationMiddleware - ${targetMethod} not provided`);
        const result = await handler(request);
        if (!result) return next();
        response.result = result;
        return undefined;
    });
}
function createCommunicationMiddleware(providerHandlers) {
    const { getUserInfo , getWalletInstanceId , topup , logout , changeProvider , setIFrameStatus , handleWindowRpc , getProviderState , loginWithPrivateKey  } = providerHandlers;
    return (0, _openloginJrpc.mergeMiddleware)([
        createChangeProviderMiddlewareMiddleware({
            changeProvider
        }),
        createTopupMiddleware({
            topup
        }),
        (0, _openloginJrpc.createScaffoldMiddleware)({
            [COMMUNICATION_JRPC_METHODS.LOGOUT]: logout,
            [COMMUNICATION_JRPC_METHODS.WALLET_INSTANCE_ID]: getWalletInstanceId,
            [COMMUNICATION_JRPC_METHODS.USER_INFO]: getUserInfo,
            [COMMUNICATION_JRPC_METHODS.IFRAME_STATUS]: setIFrameStatus,
            // Do this in the orchestrator because communicationWindowManager needs to be passed into PopupHandlers
            [COMMUNICATION_JRPC_METHODS.OPENED_WINDOW]: handleWindowRpc,
            [COMMUNICATION_JRPC_METHODS.CLOSED_WINDOW]: handleWindowRpc,
            [COMMUNICATION_JRPC_METHODS.GET_PROVIDER_STATE]: getProviderState
        }),
        createGenericJRPCMiddleware(COMMUNICATION_JRPC_METHODS.LOGIN_WITH_PRIVATE_KEY, loginWithPrivateKey)
    ]);
}
class BaseEmbedController extends BaseController {
    constructor(_ref){
        let { config ={} , state  } = _ref;
        super({
            config,
            state
        });
        (0, _definePropertyDefault.default)(this, "_communicationProviderProxy", void 0);
        this.defaultState = {
            buttonPosition: "bottom-right",
            isIFrameFullScreen: true,
            apiKey: "torus-default",
            oauthModalVisibility: false,
            loginInProgress: false,
            dappMetadata: {
                name: "",
                icon: ""
            }
        };
        this.initialize();
    }
    /**
   * Called by orchestrator once while initializing the class
   * @param handlers - JRPC handlers for provider
   * @returns - provider - Returns the providerProxy
   */ initializeProvider(handlers) {
        const engine = new (0, _openloginJrpc.JRPCEngine)();
        const communicationMiddleware = createCommunicationMiddleware(handlers);
        engine.push(communicationMiddleware);
        const communicationProvider = providerFromEngine(engine);
        this.setCommunicationProvider(communicationProvider);
    }
    setCommunicationProvider(communicationProvider) {
        if (this._communicationProviderProxy) // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._communicationProviderProxy.setTarget(communicationProvider);
        else this._communicationProviderProxy = createSwappableProxy(communicationProvider);
    }
}
class CommunicationWindowManager extends (0, _openloginJrpc.SafeEventEmitter) {
    constructor(){
        super(...arguments);
        (0, _definePropertyDefault.default)(this, "handleWindowRpc", (request, response, next, end)=>{
            const { method , params  } = request;
            if (method === COMMUNICATION_JRPC_METHODS.OPENED_WINDOW) {
                const { windowId  } = params;
                // I've been informed that a window has been opened
                this.emit(`${windowId}:opened`);
                response.result = true;
                end();
            } else if (method === COMMUNICATION_JRPC_METHODS.CLOSED_WINDOW) {
                const { windowId  } = params;
                // I've been informed that a window has been closed
                this.emit(`${windowId}:closed`);
                response.result = true;
                end();
            } else next();
        });
    }
}
const LOGIN_PROVIDER = {
    GOOGLE: "google",
    FACEBOOK: "facebook",
    REDDIT: "reddit",
    DISCORD: "discord",
    TWITCH: "twitch",
    APPLE: "apple",
    LINE: "line",
    GITHUB: "github",
    KAKAO: "kakao",
    LINKEDIN: "linkedin",
    TWITTER: "twitter",
    WEIBO: "weibo",
    WECHAT: "wechat",
    EMAIL_PASSWORDLESS: "email_passwordless"
};
const PAYMENT_PROVIDER = {
    MOONPAY: "moonpay",
    WYRE: "wyre",
    RAMPNETWORK: "rampnetwork",
    XANPOOL: "xanpool",
    MERCURYO: "mercuryo",
    TRANSAK: "transak"
};
const getTxStatusText = (txStatus)=>{
    switch(txStatus){
        case "rejected":
        case "unapproved":
        case "failed":
            return ACTIVITY_STATUS_UNSUCCESSFUL;
        case "confirmed":
            return ACTIVITY_STATUS_SUCCESSFUL;
        case "submitted":
            return ACTIVITY_STATUS_PENDING;
        case "cancelled":
            return ACTIVITY_STATUS_CANCELLED;
        default:
            return "";
    }
};
/**
 * General utility functions
 */ function intToHex(i) {
    const hex = i.toString(16);
    return `0x${hex}`;
}
/**
 * Returns a random number. Don't use for cryptographic purposes.
 * @returns a random number
 */ const randomId = ()=>Math.random().toString(36).slice(2);
/**
 * Pads the front of the given hex string with zeroes until it reaches the
 * target length. If the input string is already longer than or equal to the
 * target length, it is returned unmodified.
 *
 * If the input string is "0x"-prefixed or not a hex string, an error will be
 * thrown.
 *
 * @param hexString - The hexadecimal string to pad with zeroes.
 * @param targetLength - The target length of the hexadecimal string.
 * @returns The input string front-padded with zeroes, or the original string
 * if it was already greater than or equal to to the target length.
 */ function padWithZeroes(hexString, targetLength) {
    if (hexString !== "" && !/^[a-f0-9]+$/iu.test(hexString)) throw new Error(`Expected an unprefixed hex string. Received: ${hexString}`);
    if (targetLength < 0) throw new Error(`Expected a non-negative integer target length. Received: ${targetLength}`);
    return String.prototype.padStart.call(hexString, targetLength, "0");
}
/**
 * Concatenate an extended ECDSA signature into a hex string.
 *
 * @param v - The 'v' portion of the signature.
 * @param r - The 'r' portion of the signature.
 * @param s - The 's' portion of the signature.
 * @returns The concatenated ECDSA signature.
 */ function concatSig(v, r, s) {
    const rSig = (0, _ethereumjsUtil.fromSigned)(r);
    const sSig = (0, _ethereumjsUtil.fromSigned)(s);
    const vSig = (0, _ethereumjsUtil.bufferToInt)(v);
    const rStr = padWithZeroes((0, _ethereumjsUtil.toUnsigned)(rSig).toString("hex"), 64);
    const sStr = padWithZeroes((0, _ethereumjsUtil.toUnsigned)(sSig).toString("hex"), 64);
    const vStr = (0, _ethereumjsUtil.stripHexPrefix)(intToHex(vSig));
    return (0, _ethereumjsUtil.addHexPrefix)(rStr.concat(sStr, vStr));
}
function timeout$1(duration) {
    return new Promise((resolve)=>{
        const timeoutRef = window.setTimeout(()=>{
            resolve();
            window.clearTimeout(timeoutRef);
        }, duration);
    });
}
const getHeaders = (jwt)=>{
    return {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json; charset=utf-8"
        }
    };
};
/**
 * Text/number formatting utilities
 */ const formatSmallNumbers = function(number) {
    let currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "usd";
    let noTilde = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const finalNumber = (0, _bignumberJs.BigNumber).isBigNumber(number) ? number.toNumber() : number;
    if (!Number.isFinite(finalNumber)) return "";
    const value = currency.toLowerCase() === "usd" ? parseFloat(Number(finalNumber).toFixed(2)) : parseFloat(Number(finalNumber).toFixed(5));
    const tilde = value > 0 ? "~ " : "";
    return `${currency.toLowerCase() === "usd" || noTilde ? "" : tilde}${Number(value)} ${currency.toUpperCase()}`;
};
const addressSlicer = function(address) {
    let sliceLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
    if (address.length < 11) return address;
    if (typeof address !== "string") return "";
    return `${address.slice(0, sliceLength)}...${address.slice(-sliceLength)}`;
};
const significantDigits = function(number) {
    let perc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let length_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    let input = !(0, _bignumberJs.BigNumber).isBigNumber(number) ? new (0, _bignumberJs.BigNumber)(number) : number;
    if (input.isZero()) return input;
    if (perc) input = input.times(new (0, _bignumberJs.BigNumber)(100));
    let depth;
    if (input.gte(new (0, _bignumberJs.BigNumber)(1))) depth = length_;
    else depth = length_ - 1 + Math.ceil(Math.log10(new (0, _bignumberJs.BigNumber)("1").div(input).toNumber()));
    const shift = new (0, _bignumberJs.BigNumber)(10).pow(new (0, _bignumberJs.BigNumber)(depth));
    const roundedNumber = Math.round(shift.times(input).toNumber()) / shift.toNumber();
    return roundedNumber;
};
const formatDate = (inputDate)=>{
    const monthList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = monthList[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};
const formatTime = (time)=>{
    return new Date(time).toTimeString().slice(0, 8);
};
/**
 * Network utilities
 */ const transactionMatchesNetwork = (transaction, chainId)=>{
    if (typeof transaction.chainId !== "undefined") return transaction.chainId === chainId;
    return false;
};
/**
 * Signing utils
 */ const hashMessage = (message)=>{
    const bufferedMessage = Buffer.from(message, "utf8");
    const el = (0, _ethereumjsUtil.hashPersonalMessage)(bufferedMessage);
    return el;
};
const signMessage = (privateKey, data)=>{
    const privKey = Buffer.from(privateKey, "hex");
    const message = (0, _ethereumjsUtil.stripHexPrefix)(data);
    const msgSig = (0, _ethereumjsUtil.ecsign)(Buffer.from(message, "hex"), privKey);
    const rawMsgSig = concatSig((0, _ethereumjsUtil.intToBuffer)(msgSig.v), msgSig.r, msgSig.s);
    return rawMsgSig;
};
/**
 * popup handler utils
 */ function getPopupFeatures(_ref) {
    let { width: w , height: h  } = _ref;
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
    const systemZoom = 1; // No reliable estimate
    const left = Math.abs((width - w) / 2 / systemZoom + dualScreenLeft);
    const top = Math.abs((height - h) / 2 / systemZoom + dualScreenTop);
    const features = `titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=${h / systemZoom},width=${w / systemZoom},top=${top},left=${left}`;
    return features;
}
const broadcastChannelOptions = {
    // type: 'localstorage', // (optional) enforce a type, oneOf['native', 'idb', 'localstorage', 'node']
    webWorkerSupport: false // (optional) set this to false if you know that your channel will never be used in a WebWorker (increases performance)
};
function getCustomDeviceInfo() {
    var _navigator;
    if ((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.brave) return {
        browser: "Brave"
    };
}
class UserError extends Error {
}
const handleRedirectParameters = (hash, queryParameters)=>{
    const hashParameters = {};
    const hashUrl = new URL(`${window.location.origin}/?${hash.slice(1)}`);
    hashUrl.searchParams.forEach((value, key)=>{
        hashParameters[key] = value;
    });
    let instanceParameters = {};
    let error = "";
    if (!queryParameters.windowId) {
        if (Object.keys(hashParameters).length > 0 && hashParameters.state) {
            instanceParameters = JSON.parse(window.atob(decodeURIComponent(decodeURIComponent(hashParameters.state)))) || {};
            error = hashParameters.error_description || hashParameters.error || error;
        } else if (Object.keys(queryParameters).length > 0 && queryParameters.state) {
            instanceParameters = JSON.parse(window.atob(decodeURIComponent(decodeURIComponent(queryParameters.state)))) || {};
            if (queryParameters.error) error = queryParameters.error;
        }
    }
    return {
        error,
        instanceParameters,
        hashParameters
    };
};
function sleep(ms) {
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
}
class BaseKeyringController extends BaseController {
    constructor(_ref){
        var _state$wallets;
        let { config ={} , state  } = _ref;
        super({
            config,
            state
        });
        this.defaultState = {
            wallets: (_state$wallets = state.wallets) !== null && _state$wallets !== void 0 ? _state$wallets : []
        };
        this.initialize();
    }
    // for signing auth message
    signAuthMessage(address, message) {
        const keyring = this.state.wallets.find((x)=>x.address === address);
        if (!keyring) throw new Error("key does not exist");
        const hashedMessage = hashMessage(message).toString("hex");
        const rawMessageSig = signMessage(keyring.privateKey, hashedMessage);
        return rawMessageSig;
    }
}
const RETRIABLE_ERRORS = [
    // ignore server overload errors
    "Gateway timeout",
    "ETIMEDOUT",
    // ignore server sent html error pages
    // or truncated json responses
    "failed to parse response body",
    // ignore errors where http req failed to establish
    "Failed to fetch"
];
function checkForHttpErrors(fetchRes) {
    // check for errors
    switch(fetchRes.status){
        case 405:
            throw (0, _ethRpcErrors.ethErrors).rpc.methodNotFound();
        case 418:
            throw (0, _ethRpcErrors.ethErrors).rpc.internal({
                message: `Request is being rate limited.`
            });
        case 503:
        case 504:
            throw (0, _ethRpcErrors.ethErrors).rpc.internal({
                message: `Gateway timeout. The request took too long to process.` + `This can happen when querying over too wide a block range.`
            });
    }
}
function timeout(duration) {
    return new Promise((resolve)=>{
        setTimeout(resolve, duration);
    });
}
function parseResponse(fetchRes, body) {
    // check for error code
    if (fetchRes.status !== 200) throw (0, _ethRpcErrors.ethErrors).rpc.internal({
        message: `Non-200 status code: '${fetchRes.status}'`,
        data: body
    });
    // check for rpc error
    if (body.error) throw (0, _ethRpcErrors.ethErrors).rpc.internal({
        data: body.error
    });
    // return successful result
    return body.result;
}
function createFetchConfigFromReq(_ref) {
    let { req , rpcTarget , originHttpHeaderKey  } = _ref;
    const parsedUrl = new URL(rpcTarget);
    // prepare payload
    // copy only canonical json rpc properties
    const payload = {
        id: req.id,
        jsonrpc: req.jsonrpc,
        method: req.method,
        params: req.params
    };
    // extract 'origin' parameter from request
    const originDomain = req.origin;
    // serialize request body
    const serializedPayload = JSON.stringify(payload);
    // configure fetch params
    const fetchParams = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: serializedPayload
    };
    // optional: add request origin as header
    if (originHttpHeaderKey && originDomain) fetchParams.headers[originHttpHeaderKey] = originDomain;
    return {
        fetchUrl: parsedUrl.href,
        fetchParams
    };
}
function createFetchMiddleware(_ref2) {
    let { rpcTarget , originHttpHeaderKey  } = _ref2;
    return (0, _openloginJrpc.createAsyncMiddleware)(async (req, res, _next)=>{
        const { fetchUrl , fetchParams  } = createFetchConfigFromReq({
            req,
            rpcTarget,
            originHttpHeaderKey
        });
        // attempt request multiple times
        const maxAttempts = 5;
        const retryInterval = 1000;
        for(let attempt = 0; attempt < maxAttempts; attempt++){
            try {
                const fetchRes = await fetch(fetchUrl, fetchParams);
                // check for http errrors
                checkForHttpErrors(fetchRes);
                // parse response body
                const fetchBody = await fetchRes.json();
                const result = parseResponse(fetchRes, fetchBody);
                // set result and exit retry loop
                res.result = result;
                return;
            } catch (err) {
                const errMsg = err.toString();
                const isRetriable = RETRIABLE_ERRORS.some((phrase)=>errMsg.includes(phrase));
                // re-throw error if not retriable
                if (!isRetriable) throw err;
            }
            // delay before retrying
            await timeout(retryInterval);
        }
    });
}
function createLoggerMiddleware(options) {
    return function loggerMiddleware(request, response, next) {
        next((callback)=>{
            if (response.error) (0, _loglevelDefault.default).warn("Error in RPC response:\n", response);
            if (request.isTorusInternal) return;
            (0, _loglevelDefault.default).info(`RPC (${options.origin}):`, request, "->", response);
            callback();
        });
    };
}
function createOriginMiddleware(options) {
    return function originMiddleware(request, _, next) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request.origin = options.origin;
        next();
    };
}
class BroadcastChannelHandler {
    constructor(channelPrefix){
        (0, _definePropertyDefault.default)(this, "bc", void 0);
        (0, _definePropertyDefault.default)(this, "channel", void 0);
        const queryParameters = new URLSearchParams(window.location.search);
        const instanceId = queryParameters.get("instanceId");
        this.channel = `${channelPrefix}_${instanceId}`;
        this.bc = new (0, _broadcastChannel.BroadcastChannel)(this.channel, broadcastChannelOptions);
    }
    getMessageFromChannel() {
        return new Promise((resolve, reject)=>{
            this.bc.addEventListener("message", async (ev)=>{
                this.bc.close();
                if (ev.error) reject(ev.error);
                else resolve(ev.data);
            });
            this.bc.postMessage({
                data: {
                    type: POPUP_LOADED
                }
            });
        });
    }
}
class StreamWindow extends BaseController {
    // if window has been closed by users
    constructor(_ref){
        let { config , state ={}  } = _ref;
        super({
            config,
            state
        });
        (0, _definePropertyDefault.default)(this, "closed", false);
        this.initialize();
    }
    async open() {
        return new Promise((resolve, reject)=>{
            const { communicationEngine , communicationWindowManager  } = this.config;
            let popupSuccess = false;
            communicationWindowManager.once(`${this.state.windowId}:closed`, ()=>{
                this.closed = true;
            });
            // Window is not open yet
            if (!this.state.windowId) {
                this.update({
                    windowId: randomId()
                });
                communicationWindowManager.once(`${this.state.windowId}:opened`, ()=>{
                    resolve(this);
                });
                // Tell the other party to create a window by prompting the user to click on something
                communicationEngine.emit("notification", {
                    method: COMMUNICATION_NOTIFICATIONS.CREATE_WINDOW,
                    params: {
                        windowId: this.state.windowId,
                        url: this.state.url.href
                    }
                });
            } else {
                // Send this window with `windowId` the url to open via bc
                const bc = new (0, _broadcastChannel.BroadcastChannel)(this.state.windowId, broadcastChannelOptions);
                bc.addEventListener("message", async (ev)=>{
                    try {
                        (0, _loglevelDefault.default).info(ev, `receiving data on channel: ${bc.name}`);
                        const { error  } = ev;
                        if (error) {
                            // Popup says some error. so, we say it's not really opened
                            reject(new Error(error));
                            return;
                        }
                        const { message  } = ev.data;
                        if (message === POPUP_LOADED) {
                            popupSuccess = true;
                            await bc.postMessage({
                                data: {
                                    url: this.state.url.href,
                                    message: "" // No need of a msg
                                }
                            });
                            resolve(this);
                            bc.close();
                        }
                    } catch (error) {
                        reject(error);
                        bc.close();
                        // Something went wrong. so, we close that window
                        this.close();
                    }
                });
                // We don't know if the other end is ready to receive this msg. So, we keep writing until it receives and sends back something
                // we need backoff strategy
                // we need to wait for first attempt to succeed/fail until the second attempt
                // If we get 429, we need to wait for a while and then try again
                const postMsg = async ()=>{
                    // this never throws
                    const localResponse = await bc.postMessage({
                        data: {
                            message: SETUP_COMPLETE
                        }
                    });
                    return localResponse;
                };
                let currentDelay = bc.type === "server" ? 1000 : 200;
                const recursiveFn = async ()=>{
                    if (!popupSuccess && !this.closed) {
                        const localResponse = await postMsg();
                        if (bc.type === "server") {
                            const serverResponse = localResponse;
                            if (serverResponse.status >= 400) // We need to wait for a while and then try again
                            currentDelay = Math.round(currentDelay * 1.5);
                        }
                        await sleep(currentDelay);
                        await recursiveFn();
                    }
                };
                recursiveFn();
            }
        });
    }
    close() {
        const { communicationEngine  } = this.config;
        communicationEngine.emit("notification", {
            method: COMMUNICATION_NOTIFICATIONS.CLOSE_WINDOW,
            params: {
                windowId: this.state.windowId
            }
        });
    }
}
/*
Scenarios:
1. Open a normal popup window and no communication with it - Use PopupHandler
2. Open a popup window and communicate with it - Use PopupWithBcHandler (can initiate communication by waiting for window to open or not)

3. If window is already opened, pass in windowId to the popup handler.
   This will establish communication with the popup window and sends it a new url to redirect to


If you're trying to open a window and it gets blocked (happens if you're in iframe or delay b/w click and opening window),
StreamWindow is invoked and it writes in a channel to display a message to the user

Once user clicks on that modal/dialog, we pre-open the window and pass in the windowId (goes to 3)
*/ /**
 * Handles popup window management.
 * For broadcast channel communication, use url with `instanceId` coded into state parameter.
 * This state parameter will be passed across redirects according to OAuth spec.
 */ class PopupHandler extends BaseController {
    constructor(_ref){
        let { config , state  } = _ref;
        super({
            config,
            state
        });
        // this.id = randomId()
        // Add in dapp storage key to all popups as a hash parameter
        this.defaultConfig = {
            dappStorageKey: "",
            features: getPopupFeatures(FEATURES_DEFAULT_POPUP_WINDOW),
            target: "_blank",
            communicationEngine: null,
            communicationWindowManager: null
        };
        this.defaultState = {
            windowTimer: null,
            window: null,
            iClosedWindow: false,
            windowId: "",
            url: state.url
        };
        this.initialize();
        this._setupTimer();
    }
    async open() {
        // if window is already open
        const { target , features , dappStorageKey , communicationEngine , communicationWindowManager  } = this.config;
        const { windowId , url  } = this.state;
        if (dappStorageKey) {
            const urlHashParams = new URLSearchParams(url.hash.slice(1));
            urlHashParams.append("dappStorageKey", dappStorageKey);
            url.hash = urlHashParams.toString();
            this.update({
                url
            });
        }
        // No window has been pre-opened
        if (!windowId) {
            // try to open a window first
            let localWindow = window.open(url.href, target, features);
            if (!localWindow) {
                // if it's blocked, open StreamWindow
                localWindow = new StreamWindow({
                    config: {
                        communicationEngine,
                        communicationWindowManager
                    },
                    state: {
                        url
                    }
                });
                localWindow.open();
            }
            this.update({
                window: localWindow
            });
            return;
        }
        // A window has been pre-opened with a query parameter `windowId`
        const localWindow = new StreamWindow({
            config: {
                communicationEngine,
                communicationWindowManager
            },
            state: {
                url,
                windowId
            }
        });
        this.update({
            window: localWindow
        });
        await localWindow.open();
    }
    close() {
        this.update({
            iClosedWindow: true
        });
        const { window: window1  } = this.state;
        if (window1) window1.close();
    }
    _setupTimer() {
        const timer = window.setInterval(()=>{
            const { window: window1 , windowTimer , iClosedWindow  } = this.state;
            if (window1 && window1.closed) {
                if (windowTimer) clearInterval(windowTimer);
                if (!iClosedWindow) this.emit("close");
                this.update({
                    iClosedWindow: false,
                    window: null
                });
            }
            if (window1 === null && windowTimer) clearInterval(windowTimer);
        }, 500);
        this.update({
            windowTimer: timer
        });
    }
}
class PopupStoreChannel {
    constructor(_ref){
        let { instanceId , handleLogout , handleAccountImport , handleNetworkChange , handleSelectedAddressChange , handleThemeChange  } = _ref;
        (0, _definePropertyDefault.default)(this, "handleLogout", void 0);
        (0, _definePropertyDefault.default)(this, "handleAccountImport", void 0);
        (0, _definePropertyDefault.default)(this, "handleNetworkChange", void 0);
        (0, _definePropertyDefault.default)(this, "handleThemeChange", void 0);
        (0, _definePropertyDefault.default)(this, "handleSelectedAddressChange", void 0);
        (0, _definePropertyDefault.default)(this, "instanceId", void 0);
        this.instanceId = instanceId;
        this.handleLogout = handleLogout;
        this.handleAccountImport = handleAccountImport;
        this.handleNetworkChange = handleNetworkChange;
        this.handleSelectedAddressChange = handleSelectedAddressChange;
        this.handleThemeChange = handleThemeChange;
    }
    setupStoreChannels() {
        this.logoutChannel();
        this.importAccountChannel();
        this.networkChangeChannel();
        this.selectedAddressChangeChannel();
        this.themeChangedChannel();
    }
    logoutChannel() {
        const logoutChannel = new (0, _broadcastChannel.BroadcastChannel)(`${BROADCAST_CHANNELS.WALLET_LOGOUT_CHANNEL}_${this.instanceId}`, broadcastChannelOptions);
        logoutChannel.addEventListener("message", (ev)=>{
            var _ev$data;
            (0, _loglevelDefault.default).info("received logout message", ev);
            if (!ev.error && ((_ev$data = ev.data) === null || _ev$data === void 0 ? void 0 : _ev$data.type) === BROADCAST_CHANNELS_MSGS.LOGOUT) {
                (0, _loglevelDefault.default).info("Logging Out");
                this.handleLogout();
            }
        });
    }
    importAccountChannel() {
        const walletAccountImportChannel = new (0, _broadcastChannel.BroadcastChannel)(`${BROADCAST_CHANNELS.WALLET_ACCOUNT_IMPORT_CHANNEL}_${this.instanceId}`, broadcastChannelOptions);
        walletAccountImportChannel.addEventListener("message", (ev)=>{
            var _ev$data2;
            if (!ev.error && ((_ev$data2 = ev.data) === null || _ev$data2 === void 0 ? void 0 : _ev$data2.type) === BROADCAST_CHANNELS_MSGS.ACCOUNT_IMPORTED) {
                var _ev$data3;
                this.handleAccountImport((_ev$data3 = ev.data) === null || _ev$data3 === void 0 ? void 0 : _ev$data3.privKey);
            }
        });
    }
    networkChangeChannel() {
        const walletAccountImportChannel = new (0, _broadcastChannel.BroadcastChannel)(`${BROADCAST_CHANNELS.WALLET_NETWORK_CHANGE_CHANNEL}_${this.instanceId}`, broadcastChannelOptions);
        walletAccountImportChannel.addEventListener("message", (ev)=>{
            var _ev$data4;
            if (!ev.error && ((_ev$data4 = ev.data) === null || _ev$data4 === void 0 ? void 0 : _ev$data4.type) === BROADCAST_CHANNELS_MSGS.NETWORK_CHANGE) {
                var _ev$data5;
                this.handleNetworkChange((_ev$data5 = ev.data) === null || _ev$data5 === void 0 ? void 0 : _ev$data5.network);
            }
        });
    }
    themeChangedChannel() {
        const walletAccountImportChannel = new (0, _broadcastChannel.BroadcastChannel)(`${BROADCAST_CHANNELS.THEME_CHANGE}_${this.instanceId}`, broadcastChannelOptions);
        walletAccountImportChannel.addEventListener("message", (ev)=>{
            var _ev$data6;
            (0, _loglevelDefault.default).info({
                ev
            });
            if (!ev.error && ((_ev$data6 = ev.data) === null || _ev$data6 === void 0 ? void 0 : _ev$data6.type) === BROADCAST_CHANNELS_MSGS.SET_THEME) {
                var _ev$data7;
                this.handleThemeChange((_ev$data7 = ev.data) === null || _ev$data7 === void 0 ? void 0 : _ev$data7.theme);
            }
        });
    }
    selectedAddressChangeChannel() {
        const walletAccountImportChannel = new (0, _broadcastChannel.BroadcastChannel)(`${BROADCAST_CHANNELS.WALLET_SELECTED_ADDRESS_CHANNEL}_${this.instanceId}`, broadcastChannelOptions);
        walletAccountImportChannel.addEventListener("message", (ev)=>{
            var _ev$data8;
            if (!ev.error && ((_ev$data8 = ev.data) === null || _ev$data8 === void 0 ? void 0 : _ev$data8.type) === BROADCAST_CHANNELS_MSGS.SELECTED_ADDRESS_CHANGE) {
                var _ev$data9;
                this.handleSelectedAddressChange((_ev$data9 = ev.data) === null || _ev$data9 === void 0 ? void 0 : _ev$data9.selectedAddress);
            }
        });
    }
}
/**
 * PopupWithBcHandler is a PopupHandler which uses broadcast channel to communicate with the popup window.
 */ class PopupWithBcHandler extends PopupHandler {
    constructor(_ref){
        let { config , state , instanceId  } = _ref;
        super({
            config,
            state
        });
        (0, _definePropertyDefault.default)(this, "bc", void 0);
        this.bc = new (0, _broadcastChannel.BroadcastChannel)(instanceId, broadcastChannelOptions);
    }
    /**
   * Receives the data from popup window and closes the window
   * @param successExtraFn - Extra function to be called after the data is received
   * @returns The data to be received
   */ handle(successExtraFn) {
        return new Promise((resolve, reject)=>{
            const closeListener = ()=>{
                this.bc.close();
                reject(new UserError("user closed popup"));
                this.removeListener("close", closeListener);
            };
            this.on("close", closeListener);
            this.bc.addEventListener("message", async (ev)=>{
                (0, _loglevelDefault.default).info(ev, `receiving data on channel: ${this.bc.name}`);
                try {
                    const { error , data  } = ev;
                    if (error) {
                        reject(new Error(error));
                        return;
                    }
                    if (successExtraFn) await successExtraFn.call(this, data);
                    resolve(data);
                } catch (error) {
                    reject(error);
                } finally{
                    this.bc.close();
                    this.close();
                }
            });
            this.open().then(()=>{
                (0, _loglevelDefault.default).info(`opened window ${this.bc.name}`);
                // Opened window. yay.  let the bc events do their job
                return undefined;
            }).catch((err)=>{
                (0, _loglevelDefault.default).error(err, "something went wrong while opening window");
                reject(err);
            });
        });
    }
    /**
   * Use this if we have to send large payloads which don't fit in query/hash params.
   * Waits for ack that popup window is ready to receive data.
   * Receives the data from popup window and closes the window
   * @param payload - The data to be sent to the popup window once we have ack that window is ready to receive data
   * @param successExtraFn - Extra function to be called after the data is received
   * @returns The data to be received
   */ handleWithHandshake(payload, successExtraFn) {
        return new Promise((resolve, reject)=>{
            const closeListener = ()=>{
                this.bc.close();
                reject(new UserError("user closed popup"));
                this.removeListener("close", closeListener);
            };
            this.on("close", closeListener);
            this.bc.addEventListener("message", async (ev)=>{
                try {
                    (0, _loglevelDefault.default).info(ev, `receiving data on channel: ${this.bc.name}`);
                    const { error , data  } = ev;
                    if (error) {
                        reject(new Error(error));
                        return;
                    }
                    // Do handshake
                    const { type =""  } = data;
                    if (type === POPUP_LOADED) // Hack with generic to use the same type for both send and receive
                    await this.bc.postMessage({
                        data: payload
                    });
                    else if (type === POPUP_RESULT) {
                        if (successExtraFn) await successExtraFn.call(this, data);
                        resolve(data);
                        // Must only close the bc after result is done
                        this.bc.close();
                        this.close();
                    }
                } catch (error) {
                    reject(error);
                    this.bc.close();
                    this.close();
                }
            });
            this.open().then(()=>{
                (0, _loglevelDefault.default).info(`opened window ${this.bc.name}`);
                // Opened window. yay.  let the bc events do their job
                return undefined;
            }).catch((err)=>{
                (0, _loglevelDefault.default).error(err, "something went wrong while opening window");
                reject(err);
            });
        });
    }
}
class RedirectHandler {
    constructor(){
        (0, _definePropertyDefault.default)(this, "error", void 0);
        (0, _definePropertyDefault.default)(this, "finalQueryParams", {});
        (0, _definePropertyDefault.default)(this, "instanceParameters", void 0);
        (0, _definePropertyDefault.default)(this, "hashParameters", void 0);
        const { hash  } = window.location;
        const queryParameters = new URLSearchParams(window.location.search);
        queryParameters.forEach((value, key)=>{
            this.finalQueryParams[key] = value;
        });
        const { error , instanceParameters , hashParameters  } = handleRedirectParameters(hash, this.finalQueryParams);
        this.error = error;
        this.instanceParameters = instanceParameters;
        this.hashParameters = hashParameters;
    }
    async handle() {
        return new Promise((resolve, reject)=>{
            const { finalQueryParams , instanceParameters , hashParameters , error  } = this;
            let bc;
            try {
                if (!finalQueryParams.windowId) {
                    bc = new (0, _broadcastChannel.BroadcastChannel)(`${BROADCAST_CHANNELS.REDIRECT_CHANNEL}_${instanceParameters.instanceId}`, broadcastChannelOptions);
                    bc.addEventListener("message", async (ev)=>{
                        if (ev.error) {
                            reject(ev.error);
                            window.close();
                        } else {
                            resolve();
                            bc.close();
                            (0, _loglevelDefault.default).info("posted", {
                                finalQueryParams,
                                hashParameters,
                                instanceParameters
                            });
                        }
                    });
                    bc.postMessage({
                        data: {
                            instanceParams: instanceParameters,
                            hashParams: hashParameters,
                            queryParams: finalQueryParams
                        },
                        error
                    });
                    setTimeout(()=>{
                        resolve();
                        window.location.href = window.location.origin + window.location.search + window.location.hash;
                    }, 5000);
                } else {
                    bc = new (0, _broadcastChannel.BroadcastChannel)(`${finalQueryParams.windowId}`, broadcastChannelOptions);
                    bc.addEventListener("message", async (ev)=>{
                        const { url , message  } = ev.data;
                        if (url) {
                            resolve();
                            window.location.href = url;
                        } else if (message === SETUP_COMPLETE) await bc.postMessage({
                            data: {
                                windowId: finalQueryParams.windowId,
                                message: POPUP_LOADED
                            }
                        });
                        if (ev.error && ev.error !== "") {
                            (0, _loglevelDefault.default).error(ev.error);
                            resolve();
                            bc.close();
                        }
                    });
                }
            } catch (err) {
                (0, _loglevelDefault.default).info(err, "something went wrong");
                reject(err);
                if (bc) bc.close();
                window.close();
            }
        });
    }
}
const ACTIVITY_ACTION = {
    ACTIVITY_ACTION_ALL: "walletActivity.allTransactions",
    ACTIVITY_ACTION_SEND: "walletActivity.send",
    ACTIVITY_ACTION_RECEIVE: "walletActivity.receive",
    ACTIVITY_ACTION_TOPUP: "walletActivity.topup"
};
const ACCOUNT_CATEGORY = {
    NORMAL: "normal",
    THRESHOLD: "threshold",
    IMPORTED: "imported"
};
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$1(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
// By default, poll every 3 minutes
const DEFAULT_INTERVAL = 180000;
const DEFAULT_PREFERENCES = {
    selectedCurrency: "USD",
    theme: "dark",
    locale: "en-US",
    accountType: ACCOUNT_CATEGORY.NORMAL,
    contacts: [],
    jwtToken: "",
    fetchedPastTx: [],
    pastTransactions: [],
    paymentTx: [],
    defaultPublicAddress: "",
    customTokens: [],
    customNfts: [],
    crashReport: true,
    userInfo: {
        aggregateVerifier: "",
        email: "",
        name: "",
        profileImage: "",
        typeOfLogin: LOGIN_PROVIDER.GOOGLE,
        verifier: "",
        verifierId: ""
    }
};
/**
 * Controller that stores shared settings and exposes convenience methods
 */ class BasePreferencesController extends BaseController {
    /**
   * Name of this controller used during composition
   */ /**
   * Creates a PreferencesController instance
   *
   * @param config - Initial options used to configure this controller
   * @param state - Initial state to set on this controller
   */ constructor(_ref){
        let { config , state , defaultPreferences , signAuthMessage  } = _ref;
        super({
            config,
            state
        });
        (0, _definePropertyDefault.default)(this, "name", "PreferencesController");
        (0, _definePropertyDefault.default)(this, "iframeOrigin", void 0);
        (0, _definePropertyDefault.default)(this, "signAuthMessage", void 0);
        (0, _definePropertyDefault.default)(this, "defaultPreferences", void 0);
        if (!config.api) throw new Error("PreferencesController - no api specified in config.");
        this.defaultState = {
            identities: {},
            selectedAddress: "",
            lastErrorMessage: "",
            lastSuccessMessage: ""
        };
        this.defaultConfig = {
            api: config.api,
            pollInterval: DEFAULT_INTERVAL
        };
        this.initialize();
        this.defaultPreferences = _objectSpread$1(_objectSpread$1({}, DEFAULT_PREFERENCES), defaultPreferences);
        this.signAuthMessage = signAuthMessage;
    }
    setIframeOrigin(origin) {
        this.iframeOrigin = origin;
    }
    getAddressState(address) {
        const selectedAddress = address || this.state.selectedAddress;
        return this.state.identities[selectedAddress];
    }
    /**
   * Sets selected address
   *
   * @param selectedAddress - casper account hash
   */ setSelectedAddress(selectedAddress) {
        this.update({
            selectedAddress
        });
    }
    async getUser(address) {
        const user = await (0, _httpHelpers.get)(`${this.config.api}/user?fetchTx=false`, this.headers(address), {
            useAPIKey: true
        });
        return user.data;
    }
    async createUser(params) {
        const { selectedCurrency , theme , verifier , verifierId , locale , address , idToken  } = params;
        const userPayload = {
            default_currency: selectedCurrency,
            theme,
            verifier,
            verifier_id: verifierId,
            locale,
            idToken
        };
        await (0, _httpHelpers.post)(`${this.config.api}/user`, userPayload, this.headers(address), {
            useAPIKey: true
        });
        this.updateState({
            theme,
            defaultPublicAddress: address,
            selectedCurrency,
            locale
        }, address);
    }
    async storeUserLogin(params) {
        const { verifierId , verifier , options , address , idToken  } = params;
        if (!options.rehydrate) {
            const browser = (0, _bowserDefault.default).getParser(window.navigator.userAgent);
            const specialBrowser = getCustomDeviceInfo();
            const recordLoginPayload = {
                os: browser.getOSName(),
                os_version: browser.getOSVersion() || "unidentified",
                browser: (specialBrowser === null || specialBrowser === void 0 ? void 0 : specialBrowser.browser) || browser.getBrowserName() || "unidentified",
                browser_version: browser.getBrowserVersion() || "unidentified",
                platform: browser.getPlatform().type || "desktop",
                hostname: this.iframeOrigin,
                verifier,
                verifier_id: verifierId,
                idToken
            };
            await (0, _httpHelpers.post)(`${this.config.api}/user/recordLogin`, recordLoginPayload, this.headers(address), {
                useAPIKey: true
            });
        }
    }
    async setCrashReport(isEnabled) {
        var _this$getAddressState;
        if (isEnabled === ((_this$getAddressState = this.getAddressState()) === null || _this$getAddressState === void 0 ? void 0 : _this$getAddressState.crashReport)) return true;
        try {
            await (0, _httpHelpers.patch)(`${this.config.api}/user`, {
                enable_crash_reporter: isEnabled
            }, this.headers(), {
                useAPIKey: true
            });
            this.updateState({
                crashReport: isEnabled
            });
            return true;
        } catch (error) {
            (0, _loglevelDefault.default).error(error);
            return false;
        }
    }
    async setUserTheme(theme) {
        var _this$getAddressState2;
        if (theme === ((_this$getAddressState2 = this.getAddressState()) === null || _this$getAddressState2 === void 0 ? void 0 : _this$getAddressState2.theme)) return true;
        try {
            await (0, _httpHelpers.patch)(`${this.config.api}/user`, {
                theme
            }, this.headers(), {
                useAPIKey: true
            });
            this.updateState({
                theme
            });
            return true;
        } catch (error) {
            (0, _loglevelDefault.default).error(error);
            return false;
        }
    }
    async setUserLocale(locale) {
        var _this$getAddressState3;
        if (locale === ((_this$getAddressState3 = this.getAddressState()) === null || _this$getAddressState3 === void 0 ? void 0 : _this$getAddressState3.locale)) return;
        try {
            await (0, _httpHelpers.patch)(`${this.config.api}/user`, {
                locale
            }, this.headers(), {
                useAPIKey: true
            });
            this.updateState({
                locale
            });
            return true;
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to set locale", error);
            return false;
        }
    }
    async setSelectedCurrency(payload) {
        var _this$getAddressState4;
        if (payload.selectedCurrency === ((_this$getAddressState4 = this.getAddressState()) === null || _this$getAddressState4 === void 0 ? void 0 : _this$getAddressState4.selectedCurrency)) return true;
        try {
            await (0, _httpHelpers.patch)(`${this.config.api}/user`, {
                default_currency: payload.selectedCurrency
            }, this.headers(), {
                useAPIKey: true
            });
            this.updateState({
                selectedCurrency: payload.selectedCurrency
            });
            return true;
        } catch (error) {
            (0, _loglevelDefault.default).error(error);
            return false;
        }
    }
    async addContact(contact) {
        try {
            var _this$getAddressState5;
            const response = await (0, _httpHelpers.post)(`${this.config.api}/contact`, contact, this.headers(), {
                useAPIKey: true
            });
            this.updateState({
                contacts: [
                    ...((_this$getAddressState5 = this.getAddressState()) === null || _this$getAddressState5 === void 0 ? void 0 : _this$getAddressState5.contacts) || [],
                    response.data
                ]
            });
            return true;
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to add contact", error);
            return false;
        }
    }
    async deleteContact(contactId) {
        try {
            var _this$getAddressState6;
            const response = await (0, _httpHelpers.remove)(`${this.config.api}/contact/${contactId}`, {}, this.headers(), {
                useAPIKey: true
            });
            const finalContacts = (_this$getAddressState6 = this.getAddressState()) === null || _this$getAddressState6 === void 0 ? void 0 : _this$getAddressState6.contacts.filter((contact)=>contact.id !== response.data.id);
            if (finalContacts) this.updateState({
                contacts: [
                    ...finalContacts
                ]
            });
            return true;
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to delete contact", error);
            return false;
        }
    }
    async revokeDiscord(idToken) {
        try {
            const resp = await (0, _httpHelpers.post)(`${this.config.api}/revoke/discord`, {
                token: idToken
            }, this.headers(), {
                useAPIKey: true
            });
            (0, _loglevelDefault.default).info(resp);
        } catch (error) {
            (0, _loglevelDefault.default).error(error);
        }
    }
    async patchPastTx(body, address) {
        try {
            const response = await (0, _httpHelpers.patch)(`${this.config.api}/transaction`, body, this.headers(address), {
                useAPIKey: true
            });
            (0, _loglevelDefault.default).info("successfully patched", response);
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to patch tx", error);
        }
    }
    async postPastTx(tx, address) {
        try {
            const response = await (0, _httpHelpers.post)(`${this.config.api}/transaction`, tx, this.headers(address), {
                useAPIKey: true
            });
            (0, _loglevelDefault.default).info("successfully posted tx", response);
            return response;
        } catch (error) {
            (0, _loglevelDefault.default).error(error, "unable to insert transaction");
        }
    }
    async getWalletOrders(address) {
        try {
            const response = await (0, _httpHelpers.get)(`${this.config.api}/transaction`, this.headers(address), {
                useAPIKey: true
            });
            return response.success ? response.data ? response.data : [] : [];
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to get wallet orders tx", error);
            return [];
        }
    }
    async getTopUpOrders(address) {
        try {
            const response = await (0, _httpHelpers.get)(`${this.config.commonApiHost}/transaction`, this.headers(address), {
                useAPIKey: true
            });
            return response.data || [];
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to fetch past Top up orders", error);
        }
    }
    async getBillBoardData() {
        try {
            const response = await (0, _httpHelpers.get)(`${this.config.api}/billboard`, this.headers(), {
                useAPIKey: true
            });
            return response.success ? response.data : [];
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to get billboard data", error);
            return [];
        }
    }
    async getMessageForSigning(publicAddress) {
        const response = await (0, _httpHelpers.post)(`${this.config.api}/auth/message`, {
            public_address: publicAddress
        }, {}, {
            useAPIKey: true
        });
        return response.message;
    }
    async getTwitterId(payload) {
        const res = await (0, _httpHelpers.get)(`${this.config.api}/twitter?screen_name=${payload.nick}`, this.headers(), {
            useAPIKey: true
        });
        return `${payload.typeOfLogin.toLowerCase()}|${res.data.toString()}`;
    }
    async sendEmail(payload) {
        return (0, _httpHelpers.post)(`${this.config.api}/transaction/sendemail`, payload.emailObject, this.headers(), {
            useAPIKey: true
        });
    }
    async refreshJwt() {
        const address = this.state.selectedAddress;
        const messageToSign = await this.getMessageForSigning(address);
        if (!messageToSign.startsWith(this.config.signInPrefix)) throw new Error("Cannot sign on invalid message");
        const signedMessage = this.signAuthMessage(address, messageToSign);
        const response = await (0, _httpHelpers.post)(`${this.config.api}/auth/verify`, {
            public_address: address,
            signed_message: signedMessage
        }, {}, {
            useAPIKey: true
        });
        this.updateState({
            jwtToken: response.token
        }, address);
    }
    async getDappList() {
        try {
            const response = await (0, _httpHelpers.get)(`${this.config.api}/dapps`, this.headers(), {
                useAPIKey: true
            });
            return response.success ? response.data : [];
        } catch (error) {
            (0, _loglevelDefault.default).error("unable to get billboard data", error);
            return [];
        }
    }
    async init(address, userInfo, jwtToken) {
        let response = {
            token: jwtToken
        };
        if (this.getAddressState(address)) return;
        if (!jwtToken) {
            const messageToSign = await this.getMessageForSigning(address);
            if (!messageToSign.startsWith(this.config.signInPrefix)) throw new Error("Cannot sign on invalid message");
            const signedMessage = this.signAuthMessage(address, messageToSign);
            response = await (0, _httpHelpers.post)(`${this.config.api}/auth/verify`, {
                public_address: address,
                signed_message: signedMessage
            }, {}, {
                useAPIKey: true
            });
        }
        this.updateState({
            jwtToken: response.token,
            userInfo
        }, address);
    }
    updateState(preferences, address) {
        const selectedAddress = address || this.state.selectedAddress;
        const currentState = this.getAddressState(selectedAddress) || (0, _lodash.cloneDeep)(this.defaultPreferences);
        const mergedState = _objectSpread$1(_objectSpread$1({}, currentState), preferences);
        this.update({
            identities: _objectSpread$1(_objectSpread$1({}, this.state.identities), {}, {
                [selectedAddress]: mergedState
            })
        });
        return mergedState;
    }
    headers(address) {
        var _this$getAddressState7;
        const selectedAddress = address || this.state.selectedAddress;
        return getHeaders(((_this$getAddressState7 = this.getAddressState(selectedAddress)) === null || _this$getAddressState7 === void 0 ? void 0 : _this$getAddressState7.jwtToken) || "");
    }
}
/**
 * The status of the transaction. Each status represents the state of the transaction internally
 * in the wallet. Some of these correspond with the state of the transaction on the network, but
 * some are wallet-specific.
 */ var TransactionStatus;
(function(TransactionStatus) {
    TransactionStatus["approved"] = "approved";
    TransactionStatus["cancelled"] = "cancelled";
    TransactionStatus["confirmed"] = "confirmed";
    TransactionStatus["failed"] = "failed";
    TransactionStatus["finalized"] = "finalized";
    TransactionStatus["processed"] = "processed";
    TransactionStatus["rejected"] = "rejected";
    TransactionStatus["signed"] = "signed";
    TransactionStatus["submitted"] = "submitted";
    TransactionStatus["unapproved"] = "unapproved";
    TransactionStatus["dropped"] = "dropped";
    TransactionStatus["expired"] = "expired";
})(TransactionStatus || (TransactionStatus = {}));
const TRANSACTION_TYPES = {
    CONTRACT_INTERACTION: "contractInteraction",
    DEPLOY_CONTRACT: "contractDeployment",
    WASM_BASED_DEPLOY: "wasmBasedDeploy",
    STANDARD_TRANSACTION: "transaction",
    STANDARD_PAYMENT_TRANSACTION: "payment_transaction" // specific to chains like solana and casper
};
const TX_EVENTS = {
    TX_WARNING: "tx:warning",
    TX_ERROR: "tx:error",
    TX_FAILED: "tx:failed",
    TX_CONFIRMED: "tx:confirmed",
    TX_DROPPED: "tx:dropped",
    TX_EXPIRED: "tx:expired",
    TX_STATUS_UPDATE: "tx:status_update",
    TX_UNAPPROVED: "tx:unapproved"
};
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
class BaseTransactionStateManager extends BaseController {
    constructor(_ref){
        let { config , state , getCurrentChainId  } = _ref;
        super({
            config,
            state
        });
        (0, _definePropertyDefault.default)(this, "getCurrentChainId", void 0);
        this.defaultConfig = {
            txHistoryLimit: 40
        };
        this.defaultState = {
            transactions: {},
            unapprovedTxs: {},
            currentNetworkTxsList: []
        };
        this.initialize();
        this.getCurrentChainId = getCurrentChainId;
    }
    getUnapprovedTxList() {
        const chainId = this.getCurrentChainId();
        return (0, _lodash.pickBy)(this.state.transactions, (transaction)=>transaction.status === TransactionStatus.unapproved && transactionMatchesNetwork(transaction, chainId));
    }
    getTransaction(txId) {
        const { transactions  } = this.state;
        return transactions[txId];
    }
    updateTransaction(txMeta) {
        // commit txMeta to state
        const txId = txMeta.id;
        txMeta.updated_at = new Date().toISOString();
        this.update({
            transactions: _objectSpread(_objectSpread({}, this.state.transactions), {}, {
                [txId]: txMeta
            })
        });
    }
    setTxStatusRejected(txId) {
        this._setTransactionStatus(txId, TransactionStatus.rejected);
        this._deleteTransaction(txId);
    }
    /**
   * The implementing controller can override this functionality and add custom logic + call super.()
   */ setTxStatusUnapproved(txId) {
        this._setTransactionStatus(txId, TransactionStatus.unapproved);
    }
    setTxStatusApproved(txId) {
        this._setTransactionStatus(txId, TransactionStatus.approved);
    }
    setTxStatusSigned(txId) {
        this._setTransactionStatus(txId, TransactionStatus.signed);
    }
    setTxStatusSubmitted(txId) {
        this._setTransactionStatus(txId, TransactionStatus.submitted);
    }
    setTxStatusDropped(txId) {
        this._setTransactionStatus(txId, TransactionStatus.dropped);
    }
    setTxStatusExpired(txId) {
        this._setTransactionStatus(txId, TransactionStatus.expired);
    }
    setTxStatusConfirmed(txId) {
        this._setTransactionStatus(txId, TransactionStatus.confirmed);
    }
    setTxStatusFailed(txId, error_) {
        const error = !error_ ? new Error("Internal torus failure") : error_;
        const txMeta = this.getTransaction(txId);
        txMeta.error = error;
        this.updateTransaction(txMeta);
        this._setTransactionStatus(txId, TransactionStatus.failed);
    }
    /**
   * Method to determine if the transaction is in a final state
   * @param status - Transaction status
   * @returns boolean if the transaction is in a final state
   */ isFinalState(status) {
        return status === TransactionStatus.rejected || status === TransactionStatus.submitted || status === TransactionStatus.confirmed || status === TransactionStatus.failed || status === TransactionStatus.cancelled || status === TransactionStatus.expired;
    }
    /**
   * Filters out the unapproved transactions from state
   */ clearUnapprovedTxs() {
        this.update({
            transactions: (0, _lodash.omitBy)(this.state.transactions, (transaction)=>transaction.status === TransactionStatus.unapproved)
        });
    }
    /**
   * will append new transactions to old txns.
   */ _addTransactionsToState(transactions) {
        this.update({
            transactions: transactions.reduce((result, newTx)=>{
                result[newTx.id] = newTx;
                return result;
            }, this.state.transactions)
        });
    }
    /**
   * will set new txns, override existing if any in state.
   */ _setTransactionsToState(transactions) {
        this.update({
            transactions: transactions.reduce((result, newTx)=>{
                result[newTx.id] = newTx;
                return result;
            }, {})
        });
    }
    _deleteTransaction(targetTransactionId) {
        const { transactions  } = this.state;
        delete transactions[targetTransactionId];
        this.update({
            transactions
        });
    }
    _deleteTransactions(targetTransactionIds) {
        const { transactions  } = this.state;
        targetTransactionIds.forEach((transactionId)=>{
            delete transactions[transactionId];
        });
        this.update({
            transactions
        });
    }
    _setTransactionStatus(txId, status) {
        const txMeta = this.getTransaction(txId);
        if (!txMeta) return;
        txMeta.status = status;
        // only updating status so no validation required on txn.
        this.updateTransaction(txMeta);
        this.emit(TX_EVENTS.TX_STATUS_UPDATE, {
            txId,
            status
        });
        if (this.isFinalState(status)) this.emit(`${txMeta.id}:finished`, txMeta);
        else this.emit(`${txMeta.id}:${status}`, txId);
    }
}

},{"953a552e4c8f732c":"fCgem","@babel/runtime/helpers/defineProperty":"4x6r7","@toruslabs/openlogin-jrpc":"fmqIp","eth-rpc-errors":"apfts","json-rpc-random-id":"hXPgU","bignumber.js":"57qkX","ethereumjs-util":"cH1EQ","loglevel":"7kRFs","@toruslabs/broadcast-channel":"kf0GQ","@toruslabs/http-helpers":"71C66","bowser":"5jYCf","lodash":"3qBDj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fmqIp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BasePostMessageStream", ()=>BasePostMessageStream);
parcelHelpers.export(exports, "IGNORE_SUBSTREAM", ()=>IGNORE_SUBSTREAM);
parcelHelpers.export(exports, "JRPCEngine", ()=>JRPCEngine);
parcelHelpers.export(exports, "ObjectMultiplex", ()=>ObjectMultiplex);
parcelHelpers.export(exports, "PostMessageStream", ()=>PostMessageStream);
parcelHelpers.export(exports, "SafeEventEmitter", ()=>SafeEventEmitter);
parcelHelpers.export(exports, "SerializableError", ()=>SerializableError);
parcelHelpers.export(exports, "Substream", ()=>Substream);
parcelHelpers.export(exports, "createAsyncMiddleware", ()=>createAsyncMiddleware);
parcelHelpers.export(exports, "createEngineStream", ()=>createEngineStream);
parcelHelpers.export(exports, "createErrorMiddleware", ()=>createErrorMiddleware);
parcelHelpers.export(exports, "createIdRemapMiddleware", ()=>createIdRemapMiddleware);
parcelHelpers.export(exports, "createLoggerMiddleware", ()=>createLoggerMiddleware);
parcelHelpers.export(exports, "createScaffoldMiddleware", ()=>createScaffoldMiddleware);
parcelHelpers.export(exports, "createStreamMiddleware", ()=>createStreamMiddleware);
parcelHelpers.export(exports, "getRpcPromiseCallback", ()=>getRpcPromiseCallback);
parcelHelpers.export(exports, "mergeMiddleware", ()=>mergeMiddleware);
parcelHelpers.export(exports, "setupMultiplex", ()=>setupMultiplex);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _readableStream = require("readable-stream");
var _openloginUtils = require("@toruslabs/openlogin-utils");
var _events = require("events");
var _fastSafeStringify = require("fast-safe-stringify");
var _fastSafeStringifyDefault = parcelHelpers.interopDefault(_fastSafeStringify);
var _ethRpcErrors = require("eth-rpc-errors");
var _endOfStream = require("end-of-stream");
var _endOfStreamDefault = parcelHelpers.interopDefault(_endOfStream);
var _once = require("once");
var _onceDefault = parcelHelpers.interopDefault(_once);
var _pump = require("pump");
var _pumpDefault = parcelHelpers.interopDefault(_pump);
function noop() {
    return undefined;
}
const SYN = "SYN";
const ACK = "ACK";
const BRK = "BRK";
class BasePostMessageStream extends (0, _readableStream.Duplex) {
    constructor(_ref){
        let { name , target , targetWindow =window , targetOrigin ="*"  } = _ref;
        super({
            objectMode: true
        });
        (0, _definePropertyDefault.default)(this, "_init", void 0);
        (0, _definePropertyDefault.default)(this, "_haveSyn", void 0);
        (0, _definePropertyDefault.default)(this, "_name", void 0);
        (0, _definePropertyDefault.default)(this, "_target", void 0);
        (0, _definePropertyDefault.default)(this, "_targetWindow", void 0);
        (0, _definePropertyDefault.default)(this, "_targetOrigin", void 0);
        (0, _definePropertyDefault.default)(this, "_onMessage", void 0);
        (0, _definePropertyDefault.default)(this, "_synIntervalId", void 0);
        if (!name || !target) throw new Error("Invalid input.");
        this._init = false;
        this._haveSyn = false;
        this._name = name;
        this._target = target; // target origin
        this._targetWindow = targetWindow;
        this._targetOrigin = targetOrigin;
        this._onMessage = this.onMessage.bind(this);
        this._synIntervalId = null;
        window.addEventListener("message", this._onMessage, false);
        this._handShake();
    }
    _break() {
        this.cork();
        this._write(BRK, null, noop);
        this._haveSyn = false;
        this._init = false;
    }
    _handShake() {
        this._write(SYN, null, noop);
        this.cork();
    }
    _onData(data) {
        if (!this._init) {
            // listen for handshake
            if (data === SYN) {
                this._haveSyn = true;
                this._write(ACK, null, noop);
            } else if (data === ACK) {
                this._init = true;
                if (!this._haveSyn) this._write(ACK, null, noop);
                this.uncork();
            }
        } else if (data === BRK) this._break();
        else // forward message
        try {
            this.push(data);
        } catch (err) {
            this.emit("error", err);
        }
    }
    _postMessage(data) {
        const originConstraint = this._targetOrigin;
        this._targetWindow.postMessage({
            target: this._target,
            data
        }, originConstraint);
    }
    onMessage(event) {
        const message = event.data;
        // validate message
        if (this._targetOrigin !== "*" && event.origin !== this._targetOrigin || event.source !== this._targetWindow || typeof message !== "object" || message.target !== this._name || !message.data) return;
        this._onData(message.data);
    }
    _read() {
        return undefined;
    }
    _write(data, _, cb) {
        this._postMessage(data);
        cb();
    }
    _destroy() {
        window.removeEventListener("message", this._onMessage, false);
    }
}
function safeApply(handler, context, args) {
    try {
        Reflect.apply(handler, context, args);
    } catch (err) {
        // Throw error after timeout so as not to interrupt the stack
        setTimeout(()=>{
            throw err;
        });
    }
}
function arrayClone(arr) {
    const n = arr.length;
    const copy = new Array(n);
    for(let i = 0; i < n; i += 1)copy[i] = arr[i];
    return copy;
}
class SafeEventEmitter extends (0, _events.EventEmitter) {
    emit(type) {
        let doError = type === "error";
        const events = this._events;
        if (events !== undefined) doError = doError && events.error === undefined;
        else if (!doError) return false;
        // If there is no 'error' event listener then throw.
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
        if (doError) {
            let er;
            if (args.length > 0) [er] = args;
            if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
            // At least give some kind of context to the user
            const err = new Error(`Unhandled error.${er ? ` (${er.message})` : ""}`);
            err.context = er;
            throw err; // Unhandled 'error' event
        }
        const handler = events[type];
        if (handler === undefined) return false;
        if (typeof handler === "function") safeApply(handler, this, args);
        else {
            const len = handler.length;
            const listeners = arrayClone(handler);
            for(let i = 0; i < len; i += 1)safeApply(listeners[i], this, args);
        }
        return true;
    }
}
class SerializableError extends Error {
    constructor(_ref){
        let { code , message , data  } = _ref;
        if (!Number.isInteger(code)) throw new Error("code must be an integer");
        if (!message || typeof message !== "string") throw new Error("message must be string");
        super(message);
        (0, _definePropertyDefault.default)(this, "code", void 0);
        (0, _definePropertyDefault.default)(this, "data", void 0);
        this.code = code;
        if (data !== undefined) this.data = data;
    }
    toString() {
        return (0, _fastSafeStringifyDefault.default)({
            code: this.code,
            message: this.message,
            data: this.data,
            stack: this.stack
        });
    }
}
const getRpcPromiseCallback = function(resolve, reject) {
    let unwrapResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return (error, response)=>{
        if (error || response.error) reject(error || response.error);
        else if (!unwrapResult || Array.isArray(response)) resolve(response);
        else resolve(response.result);
    };
};
function createErrorMiddleware(log) {
    return (req, res, next, end)=>{
        try {
            // json-rpc-engine will terminate the request when it notices this error
            if (typeof req.method !== "string" || !req.method) {
                res.error = new SerializableError({
                    code: -32603,
                    message: "invalid method"
                });
                end();
                return;
            }
            next((done)=>{
                const { error  } = res;
                if (!error) return done();
                log.error(`OpenLogin - RPC Error: ${error.message}`, error);
                return done();
            });
        } catch (error) {
            log.error(`OpenLogin - RPC Error thrown: ${error.message}`, error);
            res.error = new SerializableError({
                code: -32603,
                message: error.message
            });
            end();
        }
    };
}
function createStreamMiddleware() {
    const idMap = {};
    function readNoop() {
        return false;
    }
    const events = new SafeEventEmitter();
    function processResponse(res) {
        const context = idMap[res.id];
        if (!context) throw new Error(`StreamMiddleware - Unknown response id "${res.id}"`);
        delete idMap[res.id];
        // copy whole res onto original res
        Object.assign(context.res, res);
        // run callback on empty stack,
        // prevent internal stream-handler from catching errors
        setTimeout(context.end);
    }
    function processNotification(res) {
        events.emit("notification", res);
    }
    function processMessage(res, _encoding, cb) {
        let err;
        try {
            const isNotification = !res.id;
            if (isNotification) processNotification(res);
            else processResponse(res);
        } catch (_err) {
            err = _err;
        }
        // continue processing stream
        cb(err);
    }
    const stream = new (0, _readableStream.Duplex)({
        objectMode: true,
        read: readNoop,
        write: processMessage
    });
    const middleware = (req, res, next, end)=>{
        // write req to stream
        stream.push(req);
        // register request on id map
        idMap[req.id] = {
            req,
            res,
            next,
            end
        };
    };
    return {
        events,
        middleware,
        stream
    };
}
function createScaffoldMiddleware(handlers) {
    return (req, res, next, end)=>{
        const handler = handlers[req.method];
        // if no handler, return
        if (handler === undefined) return next();
        // if handler is fn, call as middleware
        if (typeof handler === "function") return handler(req, res, next, end);
        // if handler is some other value, use as result
        res.result = handler;
        return end();
    };
}
function createIdRemapMiddleware() {
    return (req, res, next, _end)=>{
        const originalId = req.id;
        const newId = (0, _openloginUtils.randomId)();
        req.id = newId;
        res.id = newId;
        next((done)=>{
            req.id = originalId;
            res.id = originalId;
            done();
        });
    };
}
function createLoggerMiddleware(logger) {
    return (req, res, next, _)=>{
        logger.debug("REQ", req, "RES", res);
        next();
    };
}
function createAsyncMiddleware(asyncMiddleware) {
    return async (req, res, next, end)=>{
        // nextPromise is the key to the implementation
        // it is resolved by the return handler passed to the
        // "next" function
        let resolveNextPromise;
        const nextPromise = new Promise((resolve)=>{
            resolveNextPromise = resolve;
        });
        let returnHandlerCallback = null;
        let nextWasCalled = false;
        // This will be called by the consumer's async middleware.
        const asyncNext = async ()=>{
            nextWasCalled = true;
            // We pass a return handler to next(). When it is called by the engine,
            // the consumer's async middleware will resume executing.
            next((runReturnHandlersCallback)=>{
                // This callback comes from JRPCEngine._runReturnHandlers
                returnHandlerCallback = runReturnHandlersCallback;
                resolveNextPromise();
            });
            await nextPromise;
        };
        try {
            await asyncMiddleware(req, res, asyncNext);
            if (nextWasCalled) {
                await nextPromise; // we must wait until the return handler is called
                returnHandlerCallback(null);
            } else end(null);
        } catch (error) {
            if (returnHandlerCallback) returnHandlerCallback(error);
            else end(error);
        }
    };
}
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$1(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
/**
 * A JSON-RPC request and response processor.
 * Give it a stack of middleware, pass it requests, and get back responses.
 */ class JRPCEngine extends SafeEventEmitter {
    constructor(){
        super();
        (0, _definePropertyDefault.default)(this, "_middleware", void 0);
        this._middleware = [];
    }
    /**
   * Serially executes the given stack of middleware.
   *
   * @returns An array of any error encountered during middleware execution,
   * a boolean indicating whether the request was completed, and an array of
   * middleware-defined return handlers.
   */ static async _runAllMiddleware(req, res, middlewareStack) {
        const returnHandlers = [];
        let error = null;
        let isComplete = false;
        // Go down stack of middleware, call and collect optional returnHandlers
        for (const middleware of middlewareStack){
            [error, isComplete] = await JRPCEngine._runMiddleware(req, res, middleware, returnHandlers);
            if (isComplete) break;
        }
        return [
            error,
            isComplete,
            returnHandlers.reverse()
        ];
    }
    /**
   * Runs an individual middleware.
   *
   * @returns An array of any error encountered during middleware exection,
   * and a boolean indicating whether the request should end.
   */ static _runMiddleware(req, res, middleware, returnHandlers) {
        return new Promise((resolve)=>{
            const end = (err)=>{
                const error = err || res.error;
                if (error) res.error = (0, _ethRpcErrors.serializeError)(error);
                // True indicates that the request should end
                resolve([
                    error,
                    true
                ]);
            };
            const next = (returnHandler)=>{
                if (res.error) end(res.error);
                else {
                    if (returnHandler) {
                        if (typeof returnHandler !== "function") end(new SerializableError({
                            code: -32603,
                            message: "JRPCEngine: 'next' return handlers must be functions"
                        }));
                        returnHandlers.push(returnHandler);
                    }
                    // False indicates that the request should not end
                    resolve([
                        null,
                        false
                    ]);
                }
            };
            try {
                middleware(req, res, next, end);
            } catch (error) {
                end(error);
            }
        });
    }
    /**
   * Serially executes array of return handlers. The request and response are
   * assumed to be in their scope.
   */ static async _runReturnHandlers(handlers) {
        for (const handler of handlers)await new Promise((resolve, reject)=>{
            handler((err)=>err ? reject(err) : resolve());
        });
    }
    /**
   * Throws an error if the response has neither a result nor an error, or if
   * the "isComplete" flag is falsy.
   */ static _checkForCompletion(req, res, isComplete) {
        if (!("result" in res) && !("error" in res)) throw new SerializableError({
            code: -32603,
            message: "Response has no error or result for request"
        });
        if (!isComplete) throw new SerializableError({
            code: -32603,
            message: "Nothing ended request"
        });
    }
    /**
   * Add a middleware function to the engine's middleware stack.
   *
   * @param middleware - The middleware function to add.
   */ push(middleware) {
        this._middleware.push(middleware);
    }
    handle(req, cb) {
        if (cb && typeof cb !== "function") throw new Error('"callback" must be a function if provided.');
        if (Array.isArray(req)) {
            if (cb) return this._handleBatch(req, cb);
            return this._handleBatch(req);
        }
        if (cb) return this._handle(req, cb);
        return this._promiseHandle(req);
    }
    /**
   * Returns this engine as a middleware function that can be pushed to other
   * engines.
   *
   * @returns This engine as a middleware function.
   */ asMiddleware() {
        return async (req, res, next, end)=>{
            try {
                const [middlewareError, isComplete, returnHandlers] = await JRPCEngine._runAllMiddleware(req, res, this._middleware);
                if (isComplete) {
                    await JRPCEngine._runReturnHandlers(returnHandlers);
                    return end(middlewareError);
                }
                return next(async (handlerCallback)=>{
                    try {
                        await JRPCEngine._runReturnHandlers(returnHandlers);
                    } catch (error) {
                        return handlerCallback(error);
                    }
                    return handlerCallback();
                });
            } catch (error) {
                return end(error);
            }
        };
    }
    async _handleBatch(reqs, cb) {
        // The order here is important
        try {
            // 2. Wait for all requests to finish, or throw on some kind of fatal
            // error
            const responses = await Promise.all(// 1. Begin executing each request in the order received
            reqs.map(this._promiseHandle.bind(this)));
            // 3. Return batch response
            if (cb) return cb(null, responses);
            return responses;
        } catch (error) {
            if (cb) return cb(error);
            throw error;
        }
    }
    /**
   * A promise-wrapped _handle.
   */ _promiseHandle(req) {
        return new Promise((resolve)=>{
            this._handle(req, (_err, res)=>{
                // There will always be a response, and it will always have any error
                // that is caught and propagated.
                resolve(res);
            });
        });
    }
    /**
   * Ensures that the request object is valid, processes it, and passes any
   * error and the response object to the given callback.
   *
   * Does not reject.
   */ async _handle(callerReq, cb) {
        if (!callerReq || Array.isArray(callerReq) || typeof callerReq !== "object") {
            const error = new SerializableError({
                code: -32603,
                message: "request must be plain object"
            });
            return cb(error, {
                id: undefined,
                jsonrpc: "2.0",
                error
            });
        }
        if (typeof callerReq.method !== "string") {
            const error = new SerializableError({
                code: -32603,
                message: "method must be string"
            });
            return cb(error, {
                id: callerReq.id,
                jsonrpc: "2.0",
                error
            });
        }
        const req = _objectSpread$1({}, callerReq);
        const res = {
            id: req.id,
            jsonrpc: req.jsonrpc
        };
        let error = null;
        try {
            await this._processRequest(req, res);
        } catch (_error) {
            // A request handler error, a re-thrown middleware error, or something
            // unexpected.
            error = _error;
        }
        if (error) {
            // Ensure no result is present on an errored response
            delete res.result;
            if (!res.error) res.error = (0, _ethRpcErrors.serializeError)(error);
        }
        return cb(error, res);
    }
    /**
   * For the given request and response, runs all middleware and their return
   * handlers, if any, and ensures that internal request processing semantics
   * are satisfied.
   */ async _processRequest(req, res) {
        const [error, isComplete, returnHandlers] = await JRPCEngine._runAllMiddleware(req, res, this._middleware);
        // Throw if "end" was not called, or if the response has neither a result
        // nor an error.
        JRPCEngine._checkForCompletion(req, res, isComplete);
        // The return handlers should run even if an error was encountered during
        // middleware processing.
        await JRPCEngine._runReturnHandlers(returnHandlers);
        // Now we re-throw the middleware processing error, if any, to catch it
        // further up the call chain.
        if (error) throw error;
    }
}
function mergeMiddleware(middlewareStack) {
    const engine = new JRPCEngine();
    middlewareStack.forEach((middleware)=>engine.push(middleware));
    return engine.asMiddleware();
}
function createEngineStream(opts) {
    if (!opts || !opts.engine) throw new Error("Missing engine parameter!");
    const { engine  } = opts;
    // eslint-disable-next-line prefer-const
    let stream;
    function read() {
        return undefined;
    }
    function write(req, _encoding, cb) {
        engine.handle(req, (_err, res)=>{
            stream.push(res);
        });
        cb();
    }
    stream = new (0, _readableStream.Duplex)({
        objectMode: true,
        read,
        write
    });
    // forward notifications
    if (engine.on) engine.on("notification", (message)=>{
        stream.push(message);
    });
    return stream;
}
class Substream extends (0, _readableStream.Duplex) {
    constructor(_ref){
        let { parent , name  } = _ref;
        super({
            objectMode: true
        });
        (0, _definePropertyDefault.default)(this, "_parent", void 0);
        (0, _definePropertyDefault.default)(this, "_name", void 0);
        this._parent = parent;
        this._name = name;
    }
    /**
   * Explicitly sets read operations to a no-op.
   */ _read() {
        return undefined;
    }
    /**
   * Called when data should be written to this writable stream.
   *
   * @param chunk - Arbitrary object to write
   * @param encoding - Encoding to use when writing payload
   * @param callback - Called when writing is complete or an error occurs
   */ _write(chunk, _encoding, callback) {
        this._parent.push({
            name: this._name,
            data: chunk
        });
        callback();
    }
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const IGNORE_SUBSTREAM = Symbol("IGNORE_SUBSTREAM");
class ObjectMultiplex extends (0, _readableStream.Duplex) {
    constructor(){
        let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        super(_objectSpread(_objectSpread({}, opts), {}, {
            objectMode: true
        }));
        (0, _definePropertyDefault.default)(this, "_substreams", void 0);
        (0, _definePropertyDefault.default)(this, "getStream", void 0);
        this._substreams = {};
    }
    createStream(name) {
        // validate name
        if (!name) throw new Error("ObjectMultiplex - name must not be empty");
        if (this._substreams[name]) throw new Error(`ObjectMultiplex - Substream for name "${name}" already exists`);
        // create substream
        const substream = new Substream({
            parent: this,
            name
        });
        this._substreams[name] = substream;
        // listen for parent stream to end
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        anyStreamEnd(this, (_error)=>substream.destroy(_error || undefined));
        return substream;
    }
    // ignore streams (dont display orphaned data warning)
    ignoreStream(name) {
        // validate name
        if (!name) throw new Error("ObjectMultiplex - name must not be empty");
        if (this._substreams[name]) throw new Error(`ObjectMultiplex - Substream for name "${name}" already exists`);
        // set
        this._substreams[name] = IGNORE_SUBSTREAM;
    }
    _read() {
        return undefined;
    }
    _write(chunk, _encoding, callback) {
        const { name , data  } = chunk;
        if (!name) {
            window.console.warn(`ObjectMultiplex - malformed chunk without name "${chunk}"`);
            return callback();
        }
        // get corresponding substream
        const substream = this._substreams[name];
        if (!substream) {
            window.console.warn(`ObjectMultiplex - orphaned data for stream "${name}"`);
            return callback();
        }
        // push data into substream
        if (substream !== IGNORE_SUBSTREAM) substream.push(data);
        return callback();
    }
}
// util
function anyStreamEnd(stream, _cb) {
    const cb = (0, _onceDefault.default)(_cb);
    (0, _endOfStreamDefault.default)(stream, {
        readable: false
    }, cb);
    (0, _endOfStreamDefault.default)(stream, {
        writable: false
    }, cb);
}
function setupMultiplex(stream) {
    const mux = new ObjectMultiplex();
    mux.getStream = function streamHelper(name) {
        if (this._substreams[name]) return this._substreams[name];
        return this.createStream(name);
    };
    (0, _pumpDefault.default)(stream, mux, stream, (err)=>{
        if (err) window.console.error(err);
    });
    return mux;
}
class PostMessageStream extends BasePostMessageStream {
    _postMessage(data) {
        let originConstraint = this._targetOrigin;
        if (typeof data === "object") {
            const dataObj = data;
            if (typeof dataObj.data === "object") {
                const dataObjData = dataObj.data;
                if (Array.isArray(dataObjData.params) && dataObjData.params.length > 0) {
                    const dataObjDataParam = dataObjData.params[0];
                    if (dataObjDataParam._origin) originConstraint = dataObjDataParam._origin;
                    // add a constraint for the response
                    dataObjDataParam._origin = window.location.origin;
                }
            }
        }
        this._targetWindow.postMessage({
            target: this._target,
            data
        }, originConstraint);
    }
}

},{"@babel/runtime/helpers/defineProperty":"4x6r7","readable-stream":"jXNWE","@toruslabs/openlogin-utils":"bQBYy","events":"1VQLm","fast-safe-stringify":"dY7b6","eth-rpc-errors":"apfts","end-of-stream":"8Ulcf","once":"YXzlo","pump":"d2HVR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bQBYy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "URLWithHashParams", ()=>URLWithHashParams);
parcelHelpers.export(exports, "base64toJSON", ()=>base64toJSON);
parcelHelpers.export(exports, "base64url", ()=>base64url);
parcelHelpers.export(exports, "jsonToBase64", ()=>jsonToBase64);
parcelHelpers.export(exports, "keccak", ()=>keccak);
parcelHelpers.export(exports, "keccak256", ()=>keccak256);
parcelHelpers.export(exports, "randomId", ()=>randomId);
parcelHelpers.export(exports, "safeatob", ()=>safeatob);
parcelHelpers.export(exports, "safebtoa", ()=>safebtoa);
var _randombytes = require("randombytes");
var _randombytesDefault = parcelHelpers.interopDefault(_randombytes);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _base64Url = require("base64url");
var _base64UrlDefault = parcelHelpers.interopDefault(_base64Url);
var _keccak = require("keccak");
var _keccakDefault = parcelHelpers.interopDefault(_keccak);
var Buffer = require("d4a8b1859939463b").Buffer;
const randomId = ()=>(0, _randombytesDefault.default)(32).toString("hex");
class URLWithHashParams extends URL {
    constructor(){
        super(...arguments);
        (0, _definePropertyDefault.default)(this, "hashParams", new URLSearchParams());
    }
    toString() {
        this.hash = this.hashParams.toString();
        return super.toString.call(this);
    }
}
const base64url = (0, _base64UrlDefault.default);
function safebtoa(str) {
    return base64url.encode(str);
}
function safeatob(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return base64url.decode(str);
}
const keccak = (0, _keccakDefault.default);
function base64toJSON(b64str) {
    return JSON.parse(base64url.decode(b64str));
}
function jsonToBase64(json) {
    return base64url.encode(JSON.stringify(json));
}
function keccak256(str) {
    let input = str;
    if (typeof str === "string" && str.slice(0, 2) === "0x" && str.length === 66) input = Buffer.from(str.slice(2), "hex");
    const data = `0x${keccak("keccak256").update(input).digest("hex").padStart(64, "0")}`;
    return data;
}

},{"d4a8b1859939463b":"fCgem","randombytes":"8hjhE","@babel/runtime/helpers/defineProperty":"4x6r7","base64url":"5xeES","keccak":"cOBab","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dY7b6":[function(require,module,exports) {
module.exports = stringify;
stringify.default = stringify;
stringify.stable = deterministicStringify;
stringify.stableStringify = deterministicStringify;
var LIMIT_REPLACE_NODE = "[...]";
var CIRCULAR_REPLACE_NODE = "[Circular]";
var arr = [];
var replacerStack = [];
function defaultOptions() {
    return {
        depthLimit: Number.MAX_SAFE_INTEGER,
        edgesLimit: Number.MAX_SAFE_INTEGER
    };
}
// Regular stringify
function stringify(obj, replacer, spacer, options) {
    if (typeof options === "undefined") options = defaultOptions();
    decirc(obj, "", 0, [], undefined, 0, options);
    var res;
    try {
        if (replacerStack.length === 0) res = JSON.stringify(obj, replacer, spacer);
        else res = JSON.stringify(obj, replaceGetterValues(replacer), spacer);
    } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
    } finally{
        while(arr.length !== 0){
            var part = arr.pop();
            if (part.length === 4) Object.defineProperty(part[0], part[1], part[3]);
            else part[0][part[1]] = part[2];
        }
    }
    return res;
}
function setReplace(replace, val, k, parent) {
    var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k);
    if (propertyDescriptor.get !== undefined) {
        if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, {
                value: replace
            });
            arr.push([
                parent,
                k,
                val,
                propertyDescriptor
            ]);
        } else replacerStack.push([
            val,
            k,
            replace
        ]);
    } else {
        parent[k] = replace;
        arr.push([
            parent,
            k,
            val
        ]);
    }
}
function decirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === "object" && val !== null) {
        for(i = 0; i < stack.length; i++)if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) for(i = 0; i < val.length; i++)decirc(val[i], i, i, stack, val, depth, options);
        else {
            var keys = Object.keys(val);
            for(i = 0; i < keys.length; i++){
                var key = keys[i];
                decirc(val[key], key, i, stack, val, depth, options);
            }
        }
        stack.pop();
    }
}
// Stable-stringify
function compareFunction(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
function deterministicStringify(obj, replacer, spacer, options) {
    if (typeof options === "undefined") options = defaultOptions();
    var tmp = deterministicDecirc(obj, "", 0, [], undefined, 0, options) || obj;
    var res;
    try {
        if (replacerStack.length === 0) res = JSON.stringify(tmp, replacer, spacer);
        else res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer);
    } catch (_) {
        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]");
    } finally{
        // Ensure that we restore the object as it was.
        while(arr.length !== 0){
            var part = arr.pop();
            if (part.length === 4) Object.defineProperty(part[0], part[1], part[3]);
            else part[0][part[1]] = part[2];
        }
    }
    return res;
}
function deterministicDecirc(val, k, edgeIndex, stack, parent, depth, options) {
    depth += 1;
    var i;
    if (typeof val === "object" && val !== null) {
        for(i = 0; i < stack.length; i++)if (stack[i] === val) {
            setReplace(CIRCULAR_REPLACE_NODE, val, k, parent);
            return;
        }
        try {
            if (typeof val.toJSON === "function") return;
        } catch (_) {
            return;
        }
        if (typeof options.depthLimit !== "undefined" && depth > options.depthLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        if (typeof options.edgesLimit !== "undefined" && edgeIndex + 1 > options.edgesLimit) {
            setReplace(LIMIT_REPLACE_NODE, val, k, parent);
            return;
        }
        stack.push(val);
        // Optimize for Arrays. Big arrays could kill the performance otherwise!
        if (Array.isArray(val)) for(i = 0; i < val.length; i++)deterministicDecirc(val[i], i, i, stack, val, depth, options);
        else {
            // Create a temporary object in the required way
            var tmp = {};
            var keys = Object.keys(val).sort(compareFunction);
            for(i = 0; i < keys.length; i++){
                var key = keys[i];
                deterministicDecirc(val[key], key, i, stack, val, depth, options);
                tmp[key] = val[key];
            }
            if (typeof parent !== "undefined") {
                arr.push([
                    parent,
                    k,
                    val
                ]);
                parent[k] = tmp;
            } else return tmp;
        }
        stack.pop();
    }
}
// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues(replacer) {
    replacer = typeof replacer !== "undefined" ? replacer : function(k, v) {
        return v;
    };
    return function(key, val) {
        if (replacerStack.length > 0) for(var i = 0; i < replacerStack.length; i++){
            var part = replacerStack[i];
            if (part[1] === key && part[0] === val) {
                val = part[2];
                replacerStack.splice(i, 1);
                break;
            }
        }
        return replacer.call(this, key, val);
    };
}

},{}],"apfts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMessageFromCode = exports.serializeError = exports.EthereumProviderError = exports.EthereumRpcError = exports.ethErrors = exports.errorCodes = void 0;
const classes_1 = require("ceff39719874c88d");
Object.defineProperty(exports, "EthereumRpcError", {
    enumerable: true,
    get: function() {
        return classes_1.EthereumRpcError;
    }
});
Object.defineProperty(exports, "EthereumProviderError", {
    enumerable: true,
    get: function() {
        return classes_1.EthereumProviderError;
    }
});
const utils_1 = require("3dc930f5386bd299");
Object.defineProperty(exports, "serializeError", {
    enumerable: true,
    get: function() {
        return utils_1.serializeError;
    }
});
Object.defineProperty(exports, "getMessageFromCode", {
    enumerable: true,
    get: function() {
        return utils_1.getMessageFromCode;
    }
});
const errors_1 = require("98014e061064bab7");
Object.defineProperty(exports, "ethErrors", {
    enumerable: true,
    get: function() {
        return errors_1.ethErrors;
    }
});
const error_constants_1 = require("2a48d4955268d7e8");
Object.defineProperty(exports, "errorCodes", {
    enumerable: true,
    get: function() {
        return error_constants_1.errorCodes;
    }
});

},{"ceff39719874c88d":"8gZbu","3dc930f5386bd299":"iTSXk","98014e061064bab7":"8T4gO","2a48d4955268d7e8":"jrLCZ"}],"8gZbu":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EthereumProviderError = exports.EthereumRpcError = void 0;
const fast_safe_stringify_1 = require("f55d655d09666f1b");
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors
 * per EIP-1474.
 * Permits any integer error code.
 */ class EthereumRpcError extends Error {
    constructor(code, message, data){
        if (!Number.isInteger(code)) throw new Error('"code" must be an integer.');
        if (!message || typeof message !== "string") throw new Error('"message" must be a nonempty string.');
        super(message);
        this.code = code;
        if (data !== undefined) this.data = data;
    }
    /**
     * Returns a plain object with all public class properties.
     */ serialize() {
        const serialized = {
            code: this.code,
            message: this.message
        };
        if (this.data !== undefined) serialized.data = this.data;
        if (this.stack) serialized.stack = this.stack;
        return serialized;
    }
    /**
     * Return a string representation of the serialized error, omitting
     * any circular references.
     */ toString() {
        return fast_safe_stringify_1.default(this.serialize(), stringifyReplacer, 2);
    }
}
exports.EthereumRpcError = EthereumRpcError;
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * Permits integer error codes in the [ 1000 <= 4999 ] range.
 */ class EthereumProviderError extends EthereumRpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */ constructor(code, message, data){
        if (!isValidEthProviderCode(code)) throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        super(code, message, data);
    }
}
exports.EthereumProviderError = EthereumProviderError;
// Internal
function isValidEthProviderCode(code) {
    return Number.isInteger(code) && code >= 1000 && code <= 4999;
}
function stringifyReplacer(_, value) {
    if (value === "[Circular]") return undefined;
    return value;
}

},{"f55d655d09666f1b":"dY7b6"}],"iTSXk":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serializeError = exports.isValidCode = exports.getMessageFromCode = exports.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
const error_constants_1 = require("e90d9c11c253e8c9");
const classes_1 = require("d28fc7570114eaf5");
const FALLBACK_ERROR_CODE = error_constants_1.errorCodes.rpc.internal;
const FALLBACK_MESSAGE = "Unspecified error message. This is a bug, please report it.";
const FALLBACK_ERROR = {
    code: FALLBACK_ERROR_CODE,
    message: getMessageFromCode(FALLBACK_ERROR_CODE)
};
exports.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.";
/**
 * Gets the message for a given code, or a fallback message if the code has
 * no corresponding message.
 */ function getMessageFromCode(code, fallbackMessage = FALLBACK_MESSAGE) {
    if (Number.isInteger(code)) {
        const codeString = code.toString();
        if (hasKey(error_constants_1.errorValues, codeString)) return error_constants_1.errorValues[codeString].message;
        if (isJsonRpcServerError(code)) return exports.JSON_RPC_SERVER_ERROR_MESSAGE;
    }
    return fallbackMessage;
}
exports.getMessageFromCode = getMessageFromCode;
/**
 * Returns whether the given code is valid.
 * A code is only valid if it has a message.
 */ function isValidCode(code) {
    if (!Number.isInteger(code)) return false;
    const codeString = code.toString();
    if (error_constants_1.errorValues[codeString]) return true;
    if (isJsonRpcServerError(code)) return true;
    return false;
}
exports.isValidCode = isValidCode;
/**
 * Serializes the given error to an Ethereum JSON RPC-compatible error object.
 * Merely copies the given error's values if it is already compatible.
 * If the given error is not fully compatible, it will be preserved on the
 * returned object's data.originalError property.
 */ function serializeError(error, { fallbackError =FALLBACK_ERROR , shouldIncludeStack =false  } = {}) {
    var _a, _b;
    if (!fallbackError || !Number.isInteger(fallbackError.code) || typeof fallbackError.message !== "string") throw new Error("Must provide fallback error with integer number code and string message.");
    if (error instanceof classes_1.EthereumRpcError) return error.serialize();
    const serialized = {};
    if (error && typeof error === "object" && !Array.isArray(error) && hasKey(error, "code") && isValidCode(error.code)) {
        const _error = error;
        serialized.code = _error.code;
        if (_error.message && typeof _error.message === "string") {
            serialized.message = _error.message;
            if (hasKey(_error, "data")) serialized.data = _error.data;
        } else {
            serialized.message = getMessageFromCode(serialized.code);
            serialized.data = {
                originalError: assignOriginalError(error)
            };
        }
    } else {
        serialized.code = fallbackError.code;
        const message = (_a = error) === null || _a === void 0 ? void 0 : _a.message;
        serialized.message = message && typeof message === "string" ? message : fallbackError.message;
        serialized.data = {
            originalError: assignOriginalError(error)
        };
    }
    const stack = (_b = error) === null || _b === void 0 ? void 0 : _b.stack;
    if (shouldIncludeStack && error && stack && typeof stack === "string") serialized.stack = stack;
    return serialized;
}
exports.serializeError = serializeError;
// Internal
function isJsonRpcServerError(code) {
    return code >= -32099 && code <= -32000;
}
function assignOriginalError(error) {
    if (error && typeof error === "object" && !Array.isArray(error)) return Object.assign({}, error);
    return error;
}
function hasKey(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

},{"e90d9c11c253e8c9":"jrLCZ","d28fc7570114eaf5":"8gZbu"}],"jrLCZ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorValues = exports.errorCodes = void 0;
exports.errorCodes = {
    rpc: {
        invalidInput: -32000,
        resourceNotFound: -32001,
        resourceUnavailable: -32002,
        transactionRejected: -32003,
        methodNotSupported: -32004,
        limitExceeded: -32005,
        parse: -32700,
        invalidRequest: -32600,
        methodNotFound: -32601,
        invalidParams: -32602,
        internal: -32603
    },
    provider: {
        userRejectedRequest: 4001,
        unauthorized: 4100,
        unsupportedMethod: 4200,
        disconnected: 4900,
        chainDisconnected: 4901
    }
};
exports.errorValues = {
    "-32700": {
        standard: "JSON RPC 2.0",
        message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    },
    "-32600": {
        standard: "JSON RPC 2.0",
        message: "The JSON sent is not a valid Request object."
    },
    "-32601": {
        standard: "JSON RPC 2.0",
        message: "The method does not exist / is not available."
    },
    "-32602": {
        standard: "JSON RPC 2.0",
        message: "Invalid method parameter(s)."
    },
    "-32603": {
        standard: "JSON RPC 2.0",
        message: "Internal JSON-RPC error."
    },
    "-32000": {
        standard: "EIP-1474",
        message: "Invalid input."
    },
    "-32001": {
        standard: "EIP-1474",
        message: "Resource not found."
    },
    "-32002": {
        standard: "EIP-1474",
        message: "Resource unavailable."
    },
    "-32003": {
        standard: "EIP-1474",
        message: "Transaction rejected."
    },
    "-32004": {
        standard: "EIP-1474",
        message: "Method not supported."
    },
    "-32005": {
        standard: "EIP-1474",
        message: "Request limit exceeded."
    },
    "4001": {
        standard: "EIP-1193",
        message: "User rejected the request."
    },
    "4100": {
        standard: "EIP-1193",
        message: "The requested account and/or method has not been authorized by the user."
    },
    "4200": {
        standard: "EIP-1193",
        message: "The requested method is not supported by this Ethereum provider."
    },
    "4900": {
        standard: "EIP-1193",
        message: "The provider is disconnected from all chains."
    },
    "4901": {
        standard: "EIP-1193",
        message: "The provider is disconnected from the specified chain."
    }
};

},{}],"8T4gO":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ethErrors = void 0;
const classes_1 = require("8f86dc76eef6c697");
const utils_1 = require("a67d5e29c48dc24e");
const error_constants_1 = require("df69be44d2e98822");
exports.ethErrors = {
    rpc: {
        /**
         * Get a JSON RPC 2.0 Parse (-32700) error.
         */ parse: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.parse, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Request (-32600) error.
         */ invalidRequest: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidRequest, arg),
        /**
         * Get a JSON RPC 2.0 Invalid Params (-32602) error.
         */ invalidParams: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidParams, arg),
        /**
         * Get a JSON RPC 2.0 Method Not Found (-32601) error.
         */ methodNotFound: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotFound, arg),
        /**
         * Get a JSON RPC 2.0 Internal (-32603) error.
         */ internal: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.internal, arg),
        /**
         * Get a JSON RPC 2.0 Server error.
         * Permits integer error codes in the [ -32099 <= -32005 ] range.
         * Codes -32000 through -32004 are reserved by EIP-1474.
         */ server: (opts)=>{
            if (!opts || typeof opts !== "object" || Array.isArray(opts)) throw new Error("Ethereum RPC Server errors must provide single object argument.");
            const { code  } = opts;
            if (!Number.isInteger(code) || code > -32005 || code < -32099) throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
            return getEthJsonRpcError(code, opts);
        },
        /**
         * Get an Ethereum JSON RPC Invalid Input (-32000) error.
         */ invalidInput: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.invalidInput, arg),
        /**
         * Get an Ethereum JSON RPC Resource Not Found (-32001) error.
         */ resourceNotFound: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceNotFound, arg),
        /**
         * Get an Ethereum JSON RPC Resource Unavailable (-32002) error.
         */ resourceUnavailable: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.resourceUnavailable, arg),
        /**
         * Get an Ethereum JSON RPC Transaction Rejected (-32003) error.
         */ transactionRejected: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.transactionRejected, arg),
        /**
         * Get an Ethereum JSON RPC Method Not Supported (-32004) error.
         */ methodNotSupported: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.methodNotSupported, arg),
        /**
         * Get an Ethereum JSON RPC Limit Exceeded (-32005) error.
         */ limitExceeded: (arg)=>getEthJsonRpcError(error_constants_1.errorCodes.rpc.limitExceeded, arg)
    },
    provider: {
        /**
         * Get an Ethereum Provider User Rejected Request (4001) error.
         */ userRejectedRequest: (arg)=>{
            return getEthProviderError(error_constants_1.errorCodes.provider.userRejectedRequest, arg);
        },
        /**
         * Get an Ethereum Provider Unauthorized (4100) error.
         */ unauthorized: (arg)=>{
            return getEthProviderError(error_constants_1.errorCodes.provider.unauthorized, arg);
        },
        /**
         * Get an Ethereum Provider Unsupported Method (4200) error.
         */ unsupportedMethod: (arg)=>{
            return getEthProviderError(error_constants_1.errorCodes.provider.unsupportedMethod, arg);
        },
        /**
         * Get an Ethereum Provider Not Connected (4900) error.
         */ disconnected: (arg)=>{
            return getEthProviderError(error_constants_1.errorCodes.provider.disconnected, arg);
        },
        /**
         * Get an Ethereum Provider Chain Not Connected (4901) error.
         */ chainDisconnected: (arg)=>{
            return getEthProviderError(error_constants_1.errorCodes.provider.chainDisconnected, arg);
        },
        /**
         * Get a custom Ethereum Provider error.
         */ custom: (opts)=>{
            if (!opts || typeof opts !== "object" || Array.isArray(opts)) throw new Error("Ethereum Provider custom errors must provide single object argument.");
            const { code , message , data  } = opts;
            if (!message || typeof message !== "string") throw new Error('"message" must be a nonempty string');
            return new classes_1.EthereumProviderError(code, message, data);
        }
    }
};
// Internal
function getEthJsonRpcError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new classes_1.EthereumRpcError(code, message || utils_1.getMessageFromCode(code), data);
}
function getEthProviderError(code, arg) {
    const [message, data] = parseOpts(arg);
    return new classes_1.EthereumProviderError(code, message || utils_1.getMessageFromCode(code), data);
}
function parseOpts(arg) {
    if (arg) {
        if (typeof arg === "string") return [
            arg
        ];
        else if (typeof arg === "object" && !Array.isArray(arg)) {
            const { message , data  } = arg;
            if (message && typeof message !== "string") throw new Error("Must specify string message.");
            return [
                message || undefined,
                data
            ];
        }
    }
    return [];
}

},{"8f86dc76eef6c697":"8gZbu","a67d5e29c48dc24e":"iTSXk","df69be44d2e98822":"jrLCZ"}],"8Ulcf":[function(require,module,exports) {
var process = require("ce9bdf93e8e9adf6");
var once = require("e4322f2840e2232b");
var noop = function() {};
var isRequest = function(stream) {
    return stream.setHeader && typeof stream.abort === "function";
};
var isChildProcess = function(stream) {
    return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
};
var eos = function(stream, opts, callback) {
    if (typeof opts === "function") return eos(stream, null, opts);
    if (!opts) opts = {};
    callback = once(callback || noop);
    var ws = stream._writableState;
    var rs = stream._readableState;
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var cancelled = false;
    var onlegacyfinish = function() {
        if (!stream.writable) onfinish();
    };
    var onfinish = function() {
        writable = false;
        if (!readable) callback.call(stream);
    };
    var onend = function() {
        readable = false;
        if (!writable) callback.call(stream);
    };
    var onexit = function(exitCode) {
        callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);
    };
    var onerror = function(err) {
        callback.call(stream, err);
    };
    var onclose = function() {
        process.nextTick(onclosenexttick);
    };
    var onclosenexttick = function() {
        if (cancelled) return;
        if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, new Error("premature close"));
        if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, new Error("premature close"));
    };
    var onrequest = function() {
        stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
    } else if (writable && !ws) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
    }
    if (isChildProcess(stream)) stream.on("exit", onexit);
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
        cancelled = true;
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("exit", onexit);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
    };
};
module.exports = eos;

},{"ce9bdf93e8e9adf6":"d5jf4","e4322f2840e2232b":"YXzlo"}],"YXzlo":[function(require,module,exports) {
var wrappy = require("7776116240eec90e");
module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);
once.proto = once(function() {
    Object.defineProperty(Function.prototype, "once", {
        value: function() {
            return once(this);
        },
        configurable: true
    });
    Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
            return onceStrict(this);
        },
        configurable: true
    });
});
function once(fn) {
    var f = function() {
        if (f.called) return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
}
function onceStrict(fn) {
    var f = function() {
        if (f.called) throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
}

},{"7776116240eec90e":"Rj3It"}],"Rj3It":[function(require,module,exports) {
// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy;
function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);
    if (typeof fn !== "function") throw new TypeError("need wrapper function");
    Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++)args[i] = arguments[i];
        var ret = fn.apply(this, args);
        var cb = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb) Object.keys(cb).forEach(function(k) {
            ret[k] = cb[k];
        });
        return ret;
    }
}

},{}],"d2HVR":[function(require,module,exports) {
var process = require("65009d7c6a58d0fe");
var once = require("56cda2382fd01bf9");
var eos = require("2da6fcc27b13f5c9");
var fs = require("591c14799353f2e0") // we only need fs to get the ReadStream and WriteStream prototypes
;
var noop = function() {};
var ancient = /^v?\.0/.test(process.version);
var isFn = function(fn) {
    return typeof fn === "function";
};
var isFS = function(stream) {
    if (!ancient) return false // newer node version do not need to care about fs is a special way
    ;
    if (!fs) return false // browser
    ;
    return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close);
};
var isRequest = function(stream) {
    return stream.setHeader && isFn(stream.abort);
};
var destroyer = function(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
        closed = true;
    });
    eos(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
        ;
        if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want
        ;
        if (isFn(stream.destroy)) return stream.destroy();
        callback(err || new Error("stream was destroyed"));
    };
};
var call = function(fn) {
    fn();
};
var pipe = function(from, to) {
    return from.pipe(to);
};
var pump = function() {
    var streams = Array.prototype.slice.call(arguments);
    var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new Error("pump requires two streams per minimum");
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach(call);
            if (reading) return;
            destroys.forEach(call);
            callback(error);
        });
    });
    return streams.reduce(pipe);
};
module.exports = pump;

},{"65009d7c6a58d0fe":"d5jf4","56cda2382fd01bf9":"YXzlo","2da6fcc27b13f5c9":"8Ulcf","591c14799353f2e0":"jhUEF"}],"hXPgU":[function(require,module,exports) {
module.exports = IdIterator;
function IdIterator(opts) {
    opts = opts || {};
    var max = opts.max || Number.MAX_SAFE_INTEGER;
    var idCounter = typeof opts.start !== "undefined" ? opts.start : Math.floor(Math.random() * max);
    return function createRandomId() {
        idCounter = idCounter % max;
        return idCounter++;
    };
}

},{}],"cH1EQ":[function(require,module,exports) {
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
exports.isHexString = exports.getKeys = exports.fromAscii = exports.fromUtf8 = exports.toAscii = exports.arrayContainsArray = exports.getBinarySize = exports.padToEven = exports.stripHexPrefix = exports.isHexPrefixed = void 0;
/**
 * Constants
 */ __exportStar(require("3910645755f197b2"), exports);
/**
 * Account class and helper functions
 */ __exportStar(require("3d7c24f8b2594aa1"), exports);
/**
 * Address type
 */ __exportStar(require("43401d0bf53c1d12"), exports);
/**
 * Hash functions
 */ __exportStar(require("201987a9a2a828e1"), exports);
/**
 * ECDSA signature
 */ __exportStar(require("da9ee4d636479339"), exports);
/**
 * Utilities for manipulating Buffers, byte arrays, etc.
 */ __exportStar(require("17978587cd58b710"), exports);
/**
 * Function for definining properties on an object
 */ __exportStar(require("e701845795d07f84"), exports);
/**
 * External exports (BN, rlp)
 */ __exportStar(require("858b216d320664dd"), exports);
/**
 * Helpful TypeScript types
 */ __exportStar(require("b8fea9a2a99bdab9"), exports);
/**
 * Export ethjs-util methods
 */ var internal_1 = require("d592e490536ab535");
Object.defineProperty(exports, "isHexPrefixed", {
    enumerable: true,
    get: function() {
        return internal_1.isHexPrefixed;
    }
});
Object.defineProperty(exports, "stripHexPrefix", {
    enumerable: true,
    get: function() {
        return internal_1.stripHexPrefix;
    }
});
Object.defineProperty(exports, "padToEven", {
    enumerable: true,
    get: function() {
        return internal_1.padToEven;
    }
});
Object.defineProperty(exports, "getBinarySize", {
    enumerable: true,
    get: function() {
        return internal_1.getBinarySize;
    }
});
Object.defineProperty(exports, "arrayContainsArray", {
    enumerable: true,
    get: function() {
        return internal_1.arrayContainsArray;
    }
});
Object.defineProperty(exports, "toAscii", {
    enumerable: true,
    get: function() {
        return internal_1.toAscii;
    }
});
Object.defineProperty(exports, "fromUtf8", {
    enumerable: true,
    get: function() {
        return internal_1.fromUtf8;
    }
});
Object.defineProperty(exports, "fromAscii", {
    enumerable: true,
    get: function() {
        return internal_1.fromAscii;
    }
});
Object.defineProperty(exports, "getKeys", {
    enumerable: true,
    get: function() {
        return internal_1.getKeys;
    }
});
Object.defineProperty(exports, "isHexString", {
    enumerable: true,
    get: function() {
        return internal_1.isHexString;
    }
});

},{"3910645755f197b2":"aFfAE","3d7c24f8b2594aa1":"8RsJY","43401d0bf53c1d12":"d0cvS","201987a9a2a828e1":"dUGwn","da9ee4d636479339":"iSUhG","17978587cd58b710":"fk9Hf","e701845795d07f84":"crlel","858b216d320664dd":"akanp","b8fea9a2a99bdab9":"fS27p","d592e490536ab535":"hCoi2"}],"aFfAE":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KECCAK256_RLP = exports.KECCAK256_RLP_S = exports.KECCAK256_RLP_ARRAY = exports.KECCAK256_RLP_ARRAY_S = exports.KECCAK256_NULL = exports.KECCAK256_NULL_S = exports.TWO_POW256 = exports.MAX_INTEGER = exports.MAX_UINT64 = void 0;
var buffer_1 = require("480d75e0ce46861c");
var externals_1 = require("6c9f19fecb2c8b5");
/**
 * 2^64-1
 */ exports.MAX_UINT64 = new externals_1.BN("ffffffffffffffff", 16);
/**
 * The max integer that the evm can handle (2^256-1)
 */ exports.MAX_INTEGER = new externals_1.BN("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16);
/**
 * 2^256
 */ exports.TWO_POW256 = new externals_1.BN("10000000000000000000000000000000000000000000000000000000000000000", 16);
/**
 * Keccak-256 hash of null
 */ exports.KECCAK256_NULL_S = "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470";
/**
 * Keccak-256 hash of null
 */ exports.KECCAK256_NULL = buffer_1.Buffer.from(exports.KECCAK256_NULL_S, "hex");
/**
 * Keccak-256 of an RLP of an empty array
 */ exports.KECCAK256_RLP_ARRAY_S = "1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347";
/**
 * Keccak-256 of an RLP of an empty array
 */ exports.KECCAK256_RLP_ARRAY = buffer_1.Buffer.from(exports.KECCAK256_RLP_ARRAY_S, "hex");
/**
 * Keccak-256 hash of the RLP of null
 */ exports.KECCAK256_RLP_S = "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421";
/**
 * Keccak-256 hash of the RLP of null
 */ exports.KECCAK256_RLP = buffer_1.Buffer.from(exports.KECCAK256_RLP_S, "hex");

},{"480d75e0ce46861c":"fCgem","6c9f19fecb2c8b5":"akanp"}],"akanp":[function(require,module,exports) {
"use strict";
/**
 * Re-exports commonly used modules:
 * * Exports [`BN`](https://github.com/indutny/bn.js), [`rlp`](https://github.com/ethereumjs/rlp).
 * @packageDocumentation
 */ var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
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
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rlp = exports.BN = void 0;
var bn_js_1 = __importDefault(require("99decd772a1d6411"));
exports.BN = bn_js_1.default;
var rlp = __importStar(require("e9693160a5b56c6"));
exports.rlp = rlp;

},{"99decd772a1d6411":"VopIn","e9693160a5b56c6":"aCeli"}],"aCeli":[function(require,module,exports) {
var Buffer = require("ada29a9f124c1c07").Buffer;
"use strict";
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLength = exports.decode = exports.encode = void 0;
var bn_js_1 = __importDefault(require("cc45f052be551d39"));
/**
 * RLP Encoding based on: https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP
 * This function takes in a data, convert it to buffer if not, and a length for recursion
 * @param input - will be converted to buffer
 * @returns returns buffer of encoded data
 **/ function encode(input) {
    if (Array.isArray(input)) {
        var output = [];
        for(var i = 0; i < input.length; i++)output.push(encode(input[i]));
        var buf = Buffer.concat(output);
        return Buffer.concat([
            encodeLength(buf.length, 192),
            buf
        ]);
    } else {
        var inputBuf = toBuffer(input);
        return inputBuf.length === 1 && inputBuf[0] < 128 ? inputBuf : Buffer.concat([
            encodeLength(inputBuf.length, 128),
            inputBuf
        ]);
    }
}
exports.encode = encode;
/**
 * Parse integers. Check if there is no leading zeros
 * @param v The value to parse
 * @param base The base to parse the integer into
 */ function safeParseInt(v, base) {
    if (v[0] === "0" && v[1] === "0") throw new Error("invalid RLP: extra zeros");
    return parseInt(v, base);
}
function encodeLength(len, offset) {
    if (len < 56) return Buffer.from([
        len + offset
    ]);
    else {
        var hexLength = intToHex(len);
        var lLength = hexLength.length / 2;
        var firstByte = intToHex(offset + 55 + lLength);
        return Buffer.from(firstByte + hexLength, "hex");
    }
}
function decode(input, stream) {
    if (stream === void 0) stream = false;
    if (!input || input.length === 0) return Buffer.from([]);
    var inputBuffer = toBuffer(input);
    var decoded = _decode(inputBuffer);
    if (stream) return decoded;
    if (decoded.remainder.length !== 0) throw new Error("invalid remainder");
    return decoded.data;
}
exports.decode = decode;
/**
 * Get the length of the RLP input
 * @param input
 * @returns The length of the input or an empty Buffer if no input
 */ function getLength(input) {
    if (!input || input.length === 0) return Buffer.from([]);
    var inputBuffer = toBuffer(input);
    var firstByte = inputBuffer[0];
    if (firstByte <= 0x7f) return inputBuffer.length;
    else if (firstByte <= 0xb7) return firstByte - 0x7f;
    else if (firstByte <= 0xbf) return firstByte - 0xb6;
    else if (firstByte <= 0xf7) // a list between  0-55 bytes long
    return firstByte - 0xbf;
    else {
        // a list  over 55 bytes long
        var llength = firstByte - 0xf6;
        var length_1 = safeParseInt(inputBuffer.slice(1, llength).toString("hex"), 16);
        return llength + length_1;
    }
}
exports.getLength = getLength;
/** Decode an input with RLP */ function _decode(input) {
    var length, llength, data, innerRemainder, d;
    var decoded = [];
    var firstByte = input[0];
    if (firstByte <= 0x7f) // a single byte whose value is in the [0x00, 0x7f] range, that byte is its own RLP encoding.
    return {
        data: input.slice(0, 1),
        remainder: input.slice(1)
    };
    else if (firstByte <= 0xb7) {
        // string is 0-55 bytes long. A single byte with value 0x80 plus the length of the string followed by the string
        // The range of the first byte is [0x80, 0xb7]
        length = firstByte - 0x7f;
        // set 0x80 null to 0
        if (firstByte === 0x80) data = Buffer.from([]);
        else data = input.slice(1, length);
        if (length === 2 && data[0] < 0x80) throw new Error("invalid rlp encoding: byte must be less 0x80");
        return {
            data: data,
            remainder: input.slice(length)
        };
    } else if (firstByte <= 0xbf) {
        // string is greater than 55 bytes long. A single byte with the value (0xb7 plus the length of the length),
        // followed by the length, followed by the string
        llength = firstByte - 0xb6;
        if (input.length - 1 < llength) throw new Error("invalid RLP: not enough bytes for string length");
        length = safeParseInt(input.slice(1, llength).toString("hex"), 16);
        if (length <= 55) throw new Error("invalid RLP: expected string length to be greater than 55");
        data = input.slice(llength, length + llength);
        if (data.length < length) throw new Error("invalid RLP: not enough bytes for string");
        return {
            data: data,
            remainder: input.slice(length + llength)
        };
    } else if (firstByte <= 0xf7) {
        // a list between  0-55 bytes long
        length = firstByte - 0xbf;
        innerRemainder = input.slice(1, length);
        while(innerRemainder.length){
            d = _decode(innerRemainder);
            decoded.push(d.data);
            innerRemainder = d.remainder;
        }
        return {
            data: decoded,
            remainder: input.slice(length)
        };
    } else {
        // a list  over 55 bytes long
        llength = firstByte - 0xf6;
        length = safeParseInt(input.slice(1, llength).toString("hex"), 16);
        var totalLength = llength + length;
        if (totalLength > input.length) throw new Error("invalid rlp: total length is larger than the data");
        innerRemainder = input.slice(llength, totalLength);
        if (innerRemainder.length === 0) throw new Error("invalid rlp, List has a invalid length");
        while(innerRemainder.length){
            d = _decode(innerRemainder);
            decoded.push(d.data);
            innerRemainder = d.remainder;
        }
        return {
            data: decoded,
            remainder: input.slice(totalLength)
        };
    }
}
/** Check if a string is prefixed by 0x */ function isHexPrefixed(str) {
    return str.slice(0, 2) === "0x";
}
/** Removes 0x from a given String */ function stripHexPrefix(str) {
    if (typeof str !== "string") return str;
    return isHexPrefixed(str) ? str.slice(2) : str;
}
/** Transform an integer into its hexadecimal value */ function intToHex(integer) {
    if (integer < 0) throw new Error("Invalid integer as argument, must be unsigned!");
    var hex = integer.toString(16);
    return hex.length % 2 ? "0" + hex : hex;
}
/** Pad a string to be even */ function padToEven(a) {
    return a.length % 2 ? "0" + a : a;
}
/** Transform an integer into a Buffer */ function intToBuffer(integer) {
    var hex = intToHex(integer);
    return Buffer.from(hex, "hex");
}
/** Transform anything into a Buffer */ function toBuffer(v) {
    if (!Buffer.isBuffer(v)) {
        if (typeof v === "string") {
            if (isHexPrefixed(v)) return Buffer.from(padToEven(stripHexPrefix(v)), "hex");
            else return Buffer.from(v);
        } else if (typeof v === "number" || typeof v === "bigint") {
            if (!v) return Buffer.from([]);
            else return intToBuffer(v);
        } else if (v === null || v === undefined) return Buffer.from([]);
        else if (v instanceof Uint8Array) return Buffer.from(v);
        else if (bn_js_1.default.isBN(v)) // converts a BN to a Buffer
        return Buffer.from(v.toArray());
        else throw new Error("invalid type");
    }
    return v;
}

},{"ada29a9f124c1c07":"fCgem","cc45f052be551d39":"VopIn"}],"8RsJY":[function(require,module,exports) {
var Buffer = require("beed2a8f2b7acd3").Buffer;
"use strict";
var __read = this && this.__read || function(o, n) {
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
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isZeroAddress = exports.zeroAddress = exports.importPublic = exports.privateToAddress = exports.privateToPublic = exports.publicToAddress = exports.pubToAddress = exports.isValidPublic = exports.isValidPrivate = exports.generateAddress2 = exports.generateAddress = exports.isValidChecksumAddress = exports.toChecksumAddress = exports.isValidAddress = exports.Account = void 0;
var assert_1 = __importDefault(require("f3a9a7bfefa1d17b"));
var externals_1 = require("f918c7f933d64e0c");
var secp256k1_1 = require("8c469be42885fc00");
var internal_1 = require("d43ca3172a01c93b");
var constants_1 = require("e38e493de3ee5d70");
var bytes_1 = require("4bad9854ad5adf2c");
var hash_1 = require("badda7ed981c8b1e");
var helpers_1 = require("9a5c327fd11ee996");
var types_1 = require("8aa94870a775fff1");
var Account = /** @class */ function() {
    /**
     * This constructor assigns and validates the values.
     * Use the static factory methods to assist in creating an Account from varying data types.
     */ function Account(nonce, balance, stateRoot, codeHash) {
        if (nonce === void 0) nonce = new externals_1.BN(0);
        if (balance === void 0) balance = new externals_1.BN(0);
        if (stateRoot === void 0) stateRoot = constants_1.KECCAK256_RLP;
        if (codeHash === void 0) codeHash = constants_1.KECCAK256_NULL;
        this.nonce = nonce;
        this.balance = balance;
        this.stateRoot = stateRoot;
        this.codeHash = codeHash;
        this._validate();
    }
    Account.fromAccountData = function(accountData) {
        var nonce = accountData.nonce, balance = accountData.balance, stateRoot = accountData.stateRoot, codeHash = accountData.codeHash;
        return new Account(nonce ? new externals_1.BN((0, bytes_1.toBuffer)(nonce)) : undefined, balance ? new externals_1.BN((0, bytes_1.toBuffer)(balance)) : undefined, stateRoot ? (0, bytes_1.toBuffer)(stateRoot) : undefined, codeHash ? (0, bytes_1.toBuffer)(codeHash) : undefined);
    };
    Account.fromRlpSerializedAccount = function(serialized) {
        var values = externals_1.rlp.decode(serialized);
        if (!Array.isArray(values)) throw new Error("Invalid serialized account input. Must be array");
        return this.fromValuesArray(values);
    };
    Account.fromValuesArray = function(values) {
        var _a = __read(values, 4), nonce = _a[0], balance = _a[1], stateRoot = _a[2], codeHash = _a[3];
        return new Account(new externals_1.BN(nonce), new externals_1.BN(balance), stateRoot, codeHash);
    };
    Account.prototype._validate = function() {
        if (this.nonce.lt(new externals_1.BN(0))) throw new Error("nonce must be greater than zero");
        if (this.balance.lt(new externals_1.BN(0))) throw new Error("balance must be greater than zero");
        if (this.stateRoot.length !== 32) throw new Error("stateRoot must have a length of 32");
        if (this.codeHash.length !== 32) throw new Error("codeHash must have a length of 32");
    };
    /**
     * Returns a Buffer Array of the raw Buffers for the account, in order.
     */ Account.prototype.raw = function() {
        return [
            (0, types_1.bnToUnpaddedBuffer)(this.nonce),
            (0, types_1.bnToUnpaddedBuffer)(this.balance),
            this.stateRoot,
            this.codeHash
        ];
    };
    /**
     * Returns the RLP serialization of the account as a `Buffer`.
     */ Account.prototype.serialize = function() {
        return externals_1.rlp.encode(this.raw());
    };
    /**
     * Returns a `Boolean` determining if the account is a contract.
     */ Account.prototype.isContract = function() {
        return !this.codeHash.equals(constants_1.KECCAK256_NULL);
    };
    /**
     * Returns a `Boolean` determining if the account is empty complying to the definition of
     * account emptiness in [EIP-161](https://eips.ethereum.org/EIPS/eip-161):
     * "An account is considered empty when it has no code and zero nonce and zero balance."
     */ Account.prototype.isEmpty = function() {
        return this.balance.isZero() && this.nonce.isZero() && this.codeHash.equals(constants_1.KECCAK256_NULL);
    };
    return Account;
}();
exports.Account = Account;
/**
 * Checks if the address is a valid. Accepts checksummed addresses too.
 */ var isValidAddress = function(hexAddress) {
    try {
        (0, helpers_1.assertIsString)(hexAddress);
    } catch (e) {
        return false;
    }
    return /^0x[0-9a-fA-F]{40}$/.test(hexAddress);
};
exports.isValidAddress = isValidAddress;
/**
 * Returns a checksummed address.
 *
 * If an eip1191ChainId is provided, the chainId will be included in the checksum calculation. This
 * has the effect of checksummed addresses for one chain having invalid checksums for others.
 * For more details see [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191).
 *
 * WARNING: Checksums with and without the chainId will differ and the EIP-1191 checksum is not
 * backwards compatible to the original widely adopted checksum format standard introduced in
 * [EIP-55](https://eips.ethereum.org/EIPS/eip-55), so this will break in existing applications.
 * Usage of this EIP is therefore discouraged unless you have a very targeted use case.
 */ var toChecksumAddress = function(hexAddress, eip1191ChainId) {
    (0, helpers_1.assertIsHexString)(hexAddress);
    var address = (0, internal_1.stripHexPrefix)(hexAddress).toLowerCase();
    var prefix = "";
    if (eip1191ChainId) {
        var chainId = (0, types_1.toType)(eip1191ChainId, types_1.TypeOutput.BN);
        prefix = chainId.toString() + "0x";
    }
    var hash = (0, hash_1.keccakFromString)(prefix + address).toString("hex");
    var ret = "0x";
    for(var i = 0; i < address.length; i++)if (parseInt(hash[i], 16) >= 8) ret += address[i].toUpperCase();
    else ret += address[i];
    return ret;
};
exports.toChecksumAddress = toChecksumAddress;
/**
 * Checks if the address is a valid checksummed address.
 *
 * See toChecksumAddress' documentation for details about the eip1191ChainId parameter.
 */ var isValidChecksumAddress = function(hexAddress, eip1191ChainId) {
    return (0, exports.isValidAddress)(hexAddress) && (0, exports.toChecksumAddress)(hexAddress, eip1191ChainId) === hexAddress;
};
exports.isValidChecksumAddress = isValidChecksumAddress;
/**
 * Generates an address of a newly created contract.
 * @param from The address which is creating this new address
 * @param nonce The nonce of the from account
 */ var generateAddress = function(from, nonce) {
    (0, helpers_1.assertIsBuffer)(from);
    (0, helpers_1.assertIsBuffer)(nonce);
    var nonceBN = new externals_1.BN(nonce);
    if (nonceBN.isZero()) // in RLP we want to encode null in the case of zero nonce
    // read the RLP documentation for an answer if you dare
    return (0, hash_1.rlphash)([
        from,
        null
    ]).slice(-20);
    // Only take the lower 160bits of the hash
    return (0, hash_1.rlphash)([
        from,
        Buffer.from(nonceBN.toArray())
    ]).slice(-20);
};
exports.generateAddress = generateAddress;
/**
 * Generates an address for a contract created using CREATE2.
 * @param from The address which is creating this new address
 * @param salt A salt
 * @param initCode The init code of the contract being created
 */ var generateAddress2 = function(from, salt, initCode) {
    (0, helpers_1.assertIsBuffer)(from);
    (0, helpers_1.assertIsBuffer)(salt);
    (0, helpers_1.assertIsBuffer)(initCode);
    (0, assert_1.default)(from.length === 20);
    (0, assert_1.default)(salt.length === 32);
    var address = (0, hash_1.keccak256)(Buffer.concat([
        Buffer.from("ff", "hex"),
        from,
        salt,
        (0, hash_1.keccak256)(initCode)
    ]));
    return address.slice(-20);
};
exports.generateAddress2 = generateAddress2;
/**
 * Checks if the private key satisfies the rules of the curve secp256k1.
 */ var isValidPrivate = function(privateKey) {
    return (0, secp256k1_1.privateKeyVerify)(privateKey);
};
exports.isValidPrivate = isValidPrivate;
/**
 * Checks if the public key satisfies the rules of the curve secp256k1
 * and the requirements of Ethereum.
 * @param publicKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */ var isValidPublic = function(publicKey, sanitize) {
    if (sanitize === void 0) sanitize = false;
    (0, helpers_1.assertIsBuffer)(publicKey);
    if (publicKey.length === 64) // Convert to SEC1 for secp256k1
    return (0, secp256k1_1.publicKeyVerify)(Buffer.concat([
        Buffer.from([
            4
        ]),
        publicKey
    ]));
    if (!sanitize) return false;
    return (0, secp256k1_1.publicKeyVerify)(publicKey);
};
exports.isValidPublic = isValidPublic;
/**
 * Returns the ethereum address of a given public key.
 * Accepts "Ethereum public keys" and SEC1 encoded keys.
 * @param pubKey The two points of an uncompressed key, unless sanitize is enabled
 * @param sanitize Accept public keys in other formats
 */ var pubToAddress = function(pubKey, sanitize) {
    if (sanitize === void 0) sanitize = false;
    (0, helpers_1.assertIsBuffer)(pubKey);
    if (sanitize && pubKey.length !== 64) pubKey = Buffer.from((0, secp256k1_1.publicKeyConvert)(pubKey, false).slice(1));
    (0, assert_1.default)(pubKey.length === 64);
    // Only take the lower 160bits of the hash
    return (0, hash_1.keccak)(pubKey).slice(-20);
};
exports.pubToAddress = pubToAddress;
exports.publicToAddress = exports.pubToAddress;
/**
 * Returns the ethereum public key of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */ var privateToPublic = function(privateKey) {
    (0, helpers_1.assertIsBuffer)(privateKey);
    // skip the type flag and use the X, Y points
    return Buffer.from((0, secp256k1_1.publicKeyCreate)(privateKey, false)).slice(1);
};
exports.privateToPublic = privateToPublic;
/**
 * Returns the ethereum address of a given private key.
 * @param privateKey A private key must be 256 bits wide
 */ var privateToAddress = function(privateKey) {
    return (0, exports.publicToAddress)((0, exports.privateToPublic)(privateKey));
};
exports.privateToAddress = privateToAddress;
/**
 * Converts a public key to the Ethereum format.
 */ var importPublic = function(publicKey) {
    (0, helpers_1.assertIsBuffer)(publicKey);
    if (publicKey.length !== 64) publicKey = Buffer.from((0, secp256k1_1.publicKeyConvert)(publicKey, false).slice(1));
    return publicKey;
};
exports.importPublic = importPublic;
/**
 * Returns the zero address.
 */ var zeroAddress = function() {
    var addressLength = 20;
    var addr = (0, bytes_1.zeros)(addressLength);
    return (0, bytes_1.bufferToHex)(addr);
};
exports.zeroAddress = zeroAddress;
/**
 * Checks if a given address is the zero address.
 */ var isZeroAddress = function(hexAddress) {
    try {
        (0, helpers_1.assertIsString)(hexAddress);
    } catch (e) {
        return false;
    }
    var zeroAddr = (0, exports.zeroAddress)();
    return zeroAddr === hexAddress;
};
exports.isZeroAddress = isZeroAddress;

},{"beed2a8f2b7acd3":"fCgem","f3a9a7bfefa1d17b":"f3tT4","f918c7f933d64e0c":"akanp","8c469be42885fc00":"fXFOP","d43ca3172a01c93b":"hCoi2","e38e493de3ee5d70":"aFfAE","4bad9854ad5adf2c":"fk9Hf","badda7ed981c8b1e":"dUGwn","9a5c327fd11ee996":"6eDxN","8aa94870a775fff1":"fS27p"}],"fXFOP":[function(require,module,exports) {
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
var __generator = this && this.__generator || function(thisArg, body) {
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
};
function __export(m) {
    for(var p in m)if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", {
    value: true
});
var secp256k1_1 = require("d2bea8cd6450055c");
var random_1 = require("867fe4a277fb322a");
var SECP256K1_PRIVATE_KEY_SIZE = 32;
function createPrivateKey() {
    return __awaiter(this, void 0, void 0, function() {
        var pk;
        return __generator(this, function(_a) {
            switch(_a.label){
                case 0:
                    return [
                        4 /*yield*/ ,
                        random_1.getRandomBytes(SECP256K1_PRIVATE_KEY_SIZE)
                    ];
                case 1:
                    pk = _a.sent();
                    if (secp256k1_1.privateKeyVerify(pk)) return [
                        2 /*return*/ ,
                        pk
                    ];
                    return [
                        3 /*break*/ ,
                        0
                    ];
                case 2:
                    return [
                        2 /*return*/ 
                    ];
            }
        });
    });
}
exports.createPrivateKey = createPrivateKey;
function createPrivateKeySync() {
    while(true){
        var pk = random_1.getRandomBytesSync(SECP256K1_PRIVATE_KEY_SIZE);
        if (secp256k1_1.privateKeyVerify(pk)) return pk;
    }
}
exports.createPrivateKeySync = createPrivateKeySync;
__export(require("d2bea8cd6450055c"));

},{"d2bea8cd6450055c":"cFVP5","867fe4a277fb322a":"buTVA"}],"cFVP5":[function(require,module,exports) {
module.exports = require("9bd1f4bad6de1a75")(require("cba780b12566b43a"));

},{"9bd1f4bad6de1a75":"24TCI","cba780b12566b43a":"5spWI"}],"24TCI":[function(require,module,exports) {
const errors = {
    IMPOSSIBLE_CASE: "Impossible case. Please create issue.",
    TWEAK_ADD: "The tweak was out of range or the resulted private key is invalid",
    TWEAK_MUL: "The tweak was out of range or equal to zero",
    CONTEXT_RANDOMIZE_UNKNOW: "Unknow error on context randomization",
    SECKEY_INVALID: "Private Key is invalid",
    PUBKEY_PARSE: "Public Key could not be parsed",
    PUBKEY_SERIALIZE: "Public Key serialization error",
    PUBKEY_COMBINE: "The sum of the public keys is not valid",
    SIG_PARSE: "Signature could not be parsed",
    SIGN: "The nonce generation function failed, or the private key was invalid",
    RECOVER: "Public key could not be recover",
    ECDH: "Scalar was invalid (zero or overflow)"
};
function assert(cond, msg) {
    if (!cond) throw new Error(msg);
}
function isUint8Array(name, value, length) {
    assert(value instanceof Uint8Array, `Expected ${name} to be an Uint8Array`);
    if (length !== undefined) {
        if (Array.isArray(length)) {
            const numbers = length.join(", ");
            const msg = `Expected ${name} to be an Uint8Array with length [${numbers}]`;
            assert(length.includes(value.length), msg);
        } else {
            const msg = `Expected ${name} to be an Uint8Array with length ${length}`;
            assert(value.length === length, msg);
        }
    }
}
function isCompressed(value) {
    assert(toTypeString(value) === "Boolean", "Expected compressed to be a Boolean");
}
function getAssertedOutput(output = (len)=>new Uint8Array(len), length) {
    if (typeof output === "function") output = output(length);
    isUint8Array("output", output, length);
    return output;
}
function toTypeString(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
module.exports = (secp256k1)=>{
    return {
        contextRandomize (seed) {
            assert(seed === null || seed instanceof Uint8Array, "Expected seed to be an Uint8Array or null");
            if (seed !== null) isUint8Array("seed", seed, 32);
            switch(secp256k1.contextRandomize(seed)){
                case 1:
                    throw new Error(errors.CONTEXT_RANDOMIZE_UNKNOW);
            }
        },
        privateKeyVerify (seckey) {
            isUint8Array("private key", seckey, 32);
            return secp256k1.privateKeyVerify(seckey) === 0;
        },
        privateKeyNegate (seckey) {
            isUint8Array("private key", seckey, 32);
            switch(secp256k1.privateKeyNegate(seckey)){
                case 0:
                    return seckey;
                case 1:
                    throw new Error(errors.IMPOSSIBLE_CASE);
            }
        },
        privateKeyTweakAdd (seckey, tweak) {
            isUint8Array("private key", seckey, 32);
            isUint8Array("tweak", tweak, 32);
            switch(secp256k1.privateKeyTweakAdd(seckey, tweak)){
                case 0:
                    return seckey;
                case 1:
                    throw new Error(errors.TWEAK_ADD);
            }
        },
        privateKeyTweakMul (seckey, tweak) {
            isUint8Array("private key", seckey, 32);
            isUint8Array("tweak", tweak, 32);
            switch(secp256k1.privateKeyTweakMul(seckey, tweak)){
                case 0:
                    return seckey;
                case 1:
                    throw new Error(errors.TWEAK_MUL);
            }
        },
        publicKeyVerify (pubkey) {
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            return secp256k1.publicKeyVerify(pubkey) === 0;
        },
        publicKeyCreate (seckey, compressed = true, output) {
            isUint8Array("private key", seckey, 32);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.publicKeyCreate(output, seckey)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.SECKEY_INVALID);
                case 2:
                    throw new Error(errors.PUBKEY_SERIALIZE);
            }
        },
        publicKeyConvert (pubkey, compressed = true, output) {
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.publicKeyConvert(output, pubkey)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.PUBKEY_PARSE);
                case 2:
                    throw new Error(errors.PUBKEY_SERIALIZE);
            }
        },
        publicKeyNegate (pubkey, compressed = true, output) {
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.publicKeyNegate(output, pubkey)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.PUBKEY_PARSE);
                case 2:
                    throw new Error(errors.IMPOSSIBLE_CASE);
                case 3:
                    throw new Error(errors.PUBKEY_SERIALIZE);
            }
        },
        publicKeyCombine (pubkeys, compressed = true, output) {
            assert(Array.isArray(pubkeys), "Expected public keys to be an Array");
            assert(pubkeys.length > 0, "Expected public keys array will have more than zero items");
            for (const pubkey of pubkeys)isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.publicKeyCombine(output, pubkeys)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.PUBKEY_PARSE);
                case 2:
                    throw new Error(errors.PUBKEY_COMBINE);
                case 3:
                    throw new Error(errors.PUBKEY_SERIALIZE);
            }
        },
        publicKeyTweakAdd (pubkey, tweak, compressed = true, output) {
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            isUint8Array("tweak", tweak, 32);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.publicKeyTweakAdd(output, pubkey, tweak)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.PUBKEY_PARSE);
                case 2:
                    throw new Error(errors.TWEAK_ADD);
            }
        },
        publicKeyTweakMul (pubkey, tweak, compressed = true, output) {
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            isUint8Array("tweak", tweak, 32);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.publicKeyTweakMul(output, pubkey, tweak)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.PUBKEY_PARSE);
                case 2:
                    throw new Error(errors.TWEAK_MUL);
            }
        },
        signatureNormalize (sig) {
            isUint8Array("signature", sig, 64);
            switch(secp256k1.signatureNormalize(sig)){
                case 0:
                    return sig;
                case 1:
                    throw new Error(errors.SIG_PARSE);
            }
        },
        signatureExport (sig, output) {
            isUint8Array("signature", sig, 64);
            output = getAssertedOutput(output, 72);
            const obj = {
                output,
                outputlen: 72
            };
            switch(secp256k1.signatureExport(obj, sig)){
                case 0:
                    return output.slice(0, obj.outputlen);
                case 1:
                    throw new Error(errors.SIG_PARSE);
                case 2:
                    throw new Error(errors.IMPOSSIBLE_CASE);
            }
        },
        signatureImport (sig, output) {
            isUint8Array("signature", sig);
            output = getAssertedOutput(output, 64);
            switch(secp256k1.signatureImport(output, sig)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.SIG_PARSE);
                case 2:
                    throw new Error(errors.IMPOSSIBLE_CASE);
            }
        },
        ecdsaSign (msg32, seckey, options = {}, output) {
            isUint8Array("message", msg32, 32);
            isUint8Array("private key", seckey, 32);
            assert(toTypeString(options) === "Object", "Expected options to be an Object");
            if (options.data !== undefined) isUint8Array("options.data", options.data);
            if (options.noncefn !== undefined) assert(toTypeString(options.noncefn) === "Function", "Expected options.noncefn to be a Function");
            output = getAssertedOutput(output, 64);
            const obj = {
                signature: output,
                recid: null
            };
            switch(secp256k1.ecdsaSign(obj, msg32, seckey, options.data, options.noncefn)){
                case 0:
                    return obj;
                case 1:
                    throw new Error(errors.SIGN);
                case 2:
                    throw new Error(errors.IMPOSSIBLE_CASE);
            }
        },
        ecdsaVerify (sig, msg32, pubkey) {
            isUint8Array("signature", sig, 64);
            isUint8Array("message", msg32, 32);
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            switch(secp256k1.ecdsaVerify(sig, msg32, pubkey)){
                case 0:
                    return true;
                case 3:
                    return false;
                case 1:
                    throw new Error(errors.SIG_PARSE);
                case 2:
                    throw new Error(errors.PUBKEY_PARSE);
            }
        },
        ecdsaRecover (sig, recid, msg32, compressed = true, output) {
            isUint8Array("signature", sig, 64);
            assert(toTypeString(recid) === "Number" && recid >= 0 && recid <= 3, "Expected recovery id to be a Number within interval [0, 3]");
            isUint8Array("message", msg32, 32);
            isCompressed(compressed);
            output = getAssertedOutput(output, compressed ? 33 : 65);
            switch(secp256k1.ecdsaRecover(output, sig, recid, msg32)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.SIG_PARSE);
                case 2:
                    throw new Error(errors.RECOVER);
                case 3:
                    throw new Error(errors.IMPOSSIBLE_CASE);
            }
        },
        ecdh (pubkey, seckey, options = {}, output) {
            isUint8Array("public key", pubkey, [
                33,
                65
            ]);
            isUint8Array("private key", seckey, 32);
            assert(toTypeString(options) === "Object", "Expected options to be an Object");
            if (options.data !== undefined) isUint8Array("options.data", options.data);
            if (options.hashfn !== undefined) {
                assert(toTypeString(options.hashfn) === "Function", "Expected options.hashfn to be a Function");
                if (options.xbuf !== undefined) isUint8Array("options.xbuf", options.xbuf, 32);
                if (options.ybuf !== undefined) isUint8Array("options.ybuf", options.ybuf, 32);
                isUint8Array("output", output);
            } else output = getAssertedOutput(output, 32);
            switch(secp256k1.ecdh(output, pubkey, seckey, options.data, options.hashfn, options.xbuf, options.ybuf)){
                case 0:
                    return output;
                case 1:
                    throw new Error(errors.PUBKEY_PARSE);
                case 2:
                    throw new Error(errors.ECDH);
            }
        }
    };
};

},{}],"5spWI":[function(require,module,exports) {
const EC = require("92439c2f4236a7f2").ec;
const ec = new EC("secp256k1");
const ecparams = ec.curve;
// Hack, we can not use bn.js@5, while elliptic uses bn.js@4
// See https://github.com/indutny/elliptic/issues/191#issuecomment-569888758
const BN = ecparams.n.constructor;
function loadCompressedPublicKey(first, xbuf) {
    let x = new BN(xbuf);
    // overflow
    if (x.cmp(ecparams.p) >= 0) return null;
    x = x.toRed(ecparams.red);
    // compute corresponding Y
    let y = x.redSqr().redIMul(x).redIAdd(ecparams.b).redSqrt();
    if (first === 0x03 !== y.isOdd()) y = y.redNeg();
    return ec.keyPair({
        pub: {
            x: x,
            y: y
        }
    });
}
function loadUncompressedPublicKey(first, xbuf, ybuf) {
    let x = new BN(xbuf);
    let y = new BN(ybuf);
    // overflow
    if (x.cmp(ecparams.p) >= 0 || y.cmp(ecparams.p) >= 0) return null;
    x = x.toRed(ecparams.red);
    y = y.toRed(ecparams.red);
    // is odd flag
    if ((first === 0x06 || first === 0x07) && y.isOdd() !== (first === 0x07)) return null;
    // x*x*x + b = y*y
    const x3 = x.redSqr().redIMul(x);
    if (!y.redSqr().redISub(x3.redIAdd(ecparams.b)).isZero()) return null;
    return ec.keyPair({
        pub: {
            x: x,
            y: y
        }
    });
}
function loadPublicKey(pubkey) {
    // length should be validated in interface
    const first = pubkey[0];
    switch(first){
        case 0x02:
        case 0x03:
            if (pubkey.length !== 33) return null;
            return loadCompressedPublicKey(first, pubkey.subarray(1, 33));
        case 0x04:
        case 0x06:
        case 0x07:
            if (pubkey.length !== 65) return null;
            return loadUncompressedPublicKey(first, pubkey.subarray(1, 33), pubkey.subarray(33, 65));
        default:
            return null;
    }
}
function savePublicKey(output, point) {
    const pubkey = point.encode(null, output.length === 33);
    // Loop should be faster because we do not need create extra Uint8Array
    // output.set(new Uint8Array(pubkey))
    for(let i = 0; i < output.length; ++i)output[i] = pubkey[i];
}
module.exports = {
    contextRandomize () {
        return 0;
    },
    privateKeyVerify (seckey) {
        const bn = new BN(seckey);
        return bn.cmp(ecparams.n) < 0 && !bn.isZero() ? 0 : 1;
    },
    privateKeyNegate (seckey) {
        const bn = new BN(seckey);
        const negate = ecparams.n.sub(bn).umod(ecparams.n).toArrayLike(Uint8Array, "be", 32);
        seckey.set(negate);
        return 0;
    },
    privateKeyTweakAdd (seckey, tweak) {
        const bn = new BN(tweak);
        if (bn.cmp(ecparams.n) >= 0) return 1;
        bn.iadd(new BN(seckey));
        if (bn.cmp(ecparams.n) >= 0) bn.isub(ecparams.n);
        if (bn.isZero()) return 1;
        const tweaked = bn.toArrayLike(Uint8Array, "be", 32);
        seckey.set(tweaked);
        return 0;
    },
    privateKeyTweakMul (seckey, tweak) {
        let bn = new BN(tweak);
        if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1;
        bn.imul(new BN(seckey));
        if (bn.cmp(ecparams.n) >= 0) bn = bn.umod(ecparams.n);
        const tweaked = bn.toArrayLike(Uint8Array, "be", 32);
        seckey.set(tweaked);
        return 0;
    },
    publicKeyVerify (pubkey) {
        const pair = loadPublicKey(pubkey);
        return pair === null ? 1 : 0;
    },
    publicKeyCreate (output, seckey) {
        const bn = new BN(seckey);
        if (bn.cmp(ecparams.n) >= 0 || bn.isZero()) return 1;
        const point = ec.keyFromPrivate(seckey).getPublic();
        savePublicKey(output, point);
        return 0;
    },
    publicKeyConvert (output, pubkey) {
        const pair = loadPublicKey(pubkey);
        if (pair === null) return 1;
        const point = pair.getPublic();
        savePublicKey(output, point);
        return 0;
    },
    publicKeyNegate (output, pubkey) {
        const pair = loadPublicKey(pubkey);
        if (pair === null) return 1;
        const point = pair.getPublic();
        point.y = point.y.redNeg();
        savePublicKey(output, point);
        return 0;
    },
    publicKeyCombine (output, pubkeys) {
        const pairs = new Array(pubkeys.length);
        for(let i = 0; i < pubkeys.length; ++i){
            pairs[i] = loadPublicKey(pubkeys[i]);
            if (pairs[i] === null) return 1;
        }
        let point = pairs[0].getPublic();
        for(let i = 1; i < pairs.length; ++i)point = point.add(pairs[i].pub);
        if (point.isInfinity()) return 2;
        savePublicKey(output, point);
        return 0;
    },
    publicKeyTweakAdd (output, pubkey, tweak) {
        const pair = loadPublicKey(pubkey);
        if (pair === null) return 1;
        tweak = new BN(tweak);
        if (tweak.cmp(ecparams.n) >= 0) return 2;
        const point = pair.getPublic().add(ecparams.g.mul(tweak));
        if (point.isInfinity()) return 2;
        savePublicKey(output, point);
        return 0;
    },
    publicKeyTweakMul (output, pubkey, tweak) {
        const pair = loadPublicKey(pubkey);
        if (pair === null) return 1;
        tweak = new BN(tweak);
        if (tweak.cmp(ecparams.n) >= 0 || tweak.isZero()) return 2;
        const point = pair.getPublic().mul(tweak);
        savePublicKey(output, point);
        return 0;
    },
    signatureNormalize (sig) {
        const r = new BN(sig.subarray(0, 32));
        const s = new BN(sig.subarray(32, 64));
        if (r.cmp(ecparams.n) >= 0 || s.cmp(ecparams.n) >= 0) return 1;
        if (s.cmp(ec.nh) === 1) sig.set(ecparams.n.sub(s).toArrayLike(Uint8Array, "be", 32), 32);
        return 0;
    },
    // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
    // Adapted for Uint8Array instead Buffer
    signatureExport (obj, sig) {
        const sigR = sig.subarray(0, 32);
        const sigS = sig.subarray(32, 64);
        if (new BN(sigR).cmp(ecparams.n) >= 0) return 1;
        if (new BN(sigS).cmp(ecparams.n) >= 0) return 1;
        const { output  } = obj;
        // Prepare R
        let r = output.subarray(4, 37);
        r[0] = 0x00;
        r.set(sigR, 1);
        let lenR = 33;
        let posR = 0;
        for(; lenR > 1 && r[posR] === 0x00 && !(r[posR + 1] & 0x80); --lenR, ++posR);
        r = r.subarray(posR);
        if (r[0] & 0x80) return 1;
        if (lenR > 1 && r[0] === 0x00 && !(r[1] & 0x80)) return 1;
        // Prepare S
        let s = output.subarray(39, 72);
        s[0] = 0x00;
        s.set(sigS, 1);
        let lenS = 33;
        let posS = 0;
        for(; lenS > 1 && s[posS] === 0x00 && !(s[posS + 1] & 0x80); --lenS, ++posS);
        s = s.subarray(posS);
        if (s[0] & 0x80) return 1;
        if (lenS > 1 && s[0] === 0x00 && !(s[1] & 0x80)) return 1;
        // Set output length for return
        obj.outputlen = 6 + lenR + lenS;
        // Output in specified format
        // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
        output[0] = 0x30;
        output[1] = obj.outputlen - 2;
        output[2] = 0x02;
        output[3] = r.length;
        output.set(r, 4);
        output[4 + lenR] = 0x02;
        output[5 + lenR] = s.length;
        output.set(s, 6 + lenR);
        return 0;
    },
    // Copied 1-to-1 from https://github.com/bitcoinjs/bip66/blob/master/index.js
    // Adapted for Uint8Array instead Buffer
    signatureImport (output, sig) {
        if (sig.length < 8) return 1;
        if (sig.length > 72) return 1;
        if (sig[0] !== 0x30) return 1;
        if (sig[1] !== sig.length - 2) return 1;
        if (sig[2] !== 0x02) return 1;
        const lenR = sig[3];
        if (lenR === 0) return 1;
        if (5 + lenR >= sig.length) return 1;
        if (sig[4 + lenR] !== 0x02) return 1;
        const lenS = sig[5 + lenR];
        if (lenS === 0) return 1;
        if (6 + lenR + lenS !== sig.length) return 1;
        if (sig[4] & 0x80) return 1;
        if (lenR > 1 && sig[4] === 0x00 && !(sig[5] & 0x80)) return 1;
        if (sig[lenR + 6] & 0x80) return 1;
        if (lenS > 1 && sig[lenR + 6] === 0x00 && !(sig[lenR + 7] & 0x80)) return 1;
        let sigR = sig.subarray(4, 4 + lenR);
        if (sigR.length === 33 && sigR[0] === 0x00) sigR = sigR.subarray(1);
        if (sigR.length > 32) return 1;
        let sigS = sig.subarray(6 + lenR);
        if (sigS.length === 33 && sigS[0] === 0x00) sigS = sigS.slice(1);
        if (sigS.length > 32) throw new Error("S length is too long");
        let r = new BN(sigR);
        if (r.cmp(ecparams.n) >= 0) r = new BN(0);
        let s = new BN(sig.subarray(6 + lenR));
        if (s.cmp(ecparams.n) >= 0) s = new BN(0);
        output.set(r.toArrayLike(Uint8Array, "be", 32), 0);
        output.set(s.toArrayLike(Uint8Array, "be", 32), 32);
        return 0;
    },
    ecdsaSign (obj, message, seckey, data, noncefn) {
        if (noncefn) {
            const _noncefn = noncefn;
            noncefn = (counter)=>{
                const nonce = _noncefn(message, seckey, null, data, counter);
                const isValid = nonce instanceof Uint8Array && nonce.length === 32;
                if (!isValid) throw new Error("This is the way");
                return new BN(nonce);
            };
        }
        const d = new BN(seckey);
        if (d.cmp(ecparams.n) >= 0 || d.isZero()) return 1;
        let sig;
        try {
            sig = ec.sign(message, seckey, {
                canonical: true,
                k: noncefn,
                pers: data
            });
        } catch (err) {
            return 1;
        }
        obj.signature.set(sig.r.toArrayLike(Uint8Array, "be", 32), 0);
        obj.signature.set(sig.s.toArrayLike(Uint8Array, "be", 32), 32);
        obj.recid = sig.recoveryParam;
        return 0;
    },
    ecdsaVerify (sig, msg32, pubkey) {
        const sigObj = {
            r: sig.subarray(0, 32),
            s: sig.subarray(32, 64)
        };
        const sigr = new BN(sigObj.r);
        const sigs = new BN(sigObj.s);
        if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1;
        if (sigs.cmp(ec.nh) === 1 || sigr.isZero() || sigs.isZero()) return 3;
        const pair = loadPublicKey(pubkey);
        if (pair === null) return 2;
        const point = pair.getPublic();
        const isValid = ec.verify(msg32, sigObj, point);
        return isValid ? 0 : 3;
    },
    ecdsaRecover (output, sig, recid, msg32) {
        const sigObj = {
            r: sig.slice(0, 32),
            s: sig.slice(32, 64)
        };
        const sigr = new BN(sigObj.r);
        const sigs = new BN(sigObj.s);
        if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) return 1;
        if (sigr.isZero() || sigs.isZero()) return 2;
        // Can throw `throw new Error('Unable to find sencond key candinate');`
        let point;
        try {
            point = ec.recoverPubKey(msg32, sigObj, recid);
        } catch (err) {
            return 2;
        }
        savePublicKey(output, point);
        return 0;
    },
    ecdh (output, pubkey, seckey, data, hashfn, xbuf, ybuf) {
        const pair = loadPublicKey(pubkey);
        if (pair === null) return 1;
        const scalar = new BN(seckey);
        if (scalar.cmp(ecparams.n) >= 0 || scalar.isZero()) return 2;
        const point = pair.getPublic().mul(scalar);
        if (hashfn === undefined) {
            const data = point.encode(null, true);
            const sha256 = ec.hash().update(data).digest();
            for(let i = 0; i < 32; ++i)output[i] = sha256[i];
        } else {
            if (!xbuf) xbuf = new Uint8Array(32);
            const x = point.getX().toArray("be", 32);
            for(let i = 0; i < 32; ++i)xbuf[i] = x[i];
            if (!ybuf) ybuf = new Uint8Array(32);
            const y = point.getY().toArray("be", 32);
            for(let i = 0; i < 32; ++i)ybuf[i] = y[i];
            const hash = hashfn(xbuf, ybuf, data);
            const isValid = hash instanceof Uint8Array && hash.length === output.length;
            if (!isValid) return 2;
            output.set(hash);
        }
        return 0;
    }
};

},{"92439c2f4236a7f2":"1NKsH"}],"buTVA":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var randombytes = require("415da376e9f966f1");
function getRandomBytes(bytes) {
    return new Promise(function(resolve, reject) {
        randombytes(bytes, function(err, resp) {
            if (err) {
                reject(err);
                return;
            }
            resolve(resp);
        });
    });
}
exports.getRandomBytes = getRandomBytes;
function getRandomBytesSync(bytes) {
    return randombytes(bytes);
}
exports.getRandomBytesSync = getRandomBytesSync;

},{"415da376e9f966f1":"8hjhE"}],"hCoi2":[function(require,module,exports) {
var Buffer = require("fce3a522adfcb8de").Buffer;
"use strict";
/*
The MIT License

Copyright (c) 2016 Nick Dodson. nickdodson.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isHexString = exports.getKeys = exports.fromAscii = exports.fromUtf8 = exports.toAscii = exports.arrayContainsArray = exports.getBinarySize = exports.padToEven = exports.stripHexPrefix = exports.isHexPrefixed = void 0;
/**
 * Returns a `Boolean` on whether or not the a `String` starts with '0x'
 * @param str the string input value
 * @return a boolean if it is or is not hex prefixed
 * @throws if the str input is not a string
 */ function isHexPrefixed(str) {
    if (typeof str !== "string") throw new Error("[isHexPrefixed] input must be type 'string', received type ".concat(typeof str));
    return str[0] === "0" && str[1] === "x";
}
exports.isHexPrefixed = isHexPrefixed;
/**
 * Removes '0x' from a given `String` if present
 * @param str the string value
 * @returns the string without 0x prefix
 */ var stripHexPrefix = function(str) {
    if (typeof str !== "string") throw new Error("[stripHexPrefix] input must be type 'string', received ".concat(typeof str));
    return isHexPrefixed(str) ? str.slice(2) : str;
};
exports.stripHexPrefix = stripHexPrefix;
/**
 * Pads a `String` to have an even length
 * @param value
 * @return output
 */ function padToEven(value) {
    var a = value;
    if (typeof a !== "string") throw new Error("[padToEven] value must be type 'string', received ".concat(typeof a));
    if (a.length % 2) a = "0".concat(a);
    return a;
}
exports.padToEven = padToEven;
/**
 * Get the binary size of a string
 * @param str
 * @returns the number of bytes contained within the string
 */ function getBinarySize(str) {
    if (typeof str !== "string") throw new Error("[getBinarySize] method requires input type 'string', recieved ".concat(typeof str));
    return Buffer.byteLength(str, "utf8");
}
exports.getBinarySize = getBinarySize;
/**
 * Returns TRUE if the first specified array contains all elements
 * from the second one. FALSE otherwise.
 *
 * @param superset
 * @param subset
 *
 */ function arrayContainsArray(superset, subset, some) {
    if (Array.isArray(superset) !== true) throw new Error("[arrayContainsArray] method requires input 'superset' to be an array, got type '".concat(typeof superset, "'"));
    if (Array.isArray(subset) !== true) throw new Error("[arrayContainsArray] method requires input 'subset' to be an array, got type '".concat(typeof subset, "'"));
    return subset[some ? "some" : "every"](function(value) {
        return superset.indexOf(value) >= 0;
    });
}
exports.arrayContainsArray = arrayContainsArray;
/**
 * Should be called to get ascii from its hex representation
 *
 * @param string in hex
 * @returns ascii string representation of hex value
 */ function toAscii(hex) {
    var str = "";
    var i = 0;
    var l = hex.length;
    if (hex.substring(0, 2) === "0x") i = 2;
    for(; i < l; i += 2){
        var code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
    }
    return str;
}
exports.toAscii = toAscii;
/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @param string
 * @param optional padding
 * @returns hex representation of input string
 */ function fromUtf8(stringValue) {
    var str = Buffer.from(stringValue, "utf8");
    return "0x".concat(padToEven(str.toString("hex")).replace(/^0+|0+$/g, ""));
}
exports.fromUtf8 = fromUtf8;
/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @param  string
 * @param  optional padding
 * @returns  hex representation of input string
 */ function fromAscii(stringValue) {
    var hex = "";
    for(var i = 0; i < stringValue.length; i++){
        var code = stringValue.charCodeAt(i);
        var n = code.toString(16);
        hex += n.length < 2 ? "0".concat(n) : n;
    }
    return "0x".concat(hex);
}
exports.fromAscii = fromAscii;
/**
 * Returns the keys from an array of objects.
 * @example
 * ```js
 * getKeys([{a: '1', b: '2'}, {a: '3', b: '4'}], 'a') => ['1', '3']
 *````
 * @param  params
 * @param  key
 * @param  allowEmpty
 * @returns output just a simple array of output keys
 */ function getKeys(params, key, allowEmpty) {
    if (!Array.isArray(params)) throw new Error("[getKeys] method expects input 'params' to be an array, got ".concat(typeof params));
    if (typeof key !== "string") throw new Error("[getKeys] method expects input 'key' to be type 'string', got ".concat(typeof params));
    var result = [];
    for(var i = 0; i < params.length; i++){
        var value = params[i][key];
        if (allowEmpty && !value) value = "";
        else if (typeof value !== "string") throw new Error("invalid abi - expected type 'string', received ".concat(typeof value));
        result.push(value);
    }
    return result;
}
exports.getKeys = getKeys;
/**
 * Is the string a hex string.
 *
 * @param  value
 * @param  length
 * @returns  output the string is a hex string
 */ function isHexString(value, length) {
    if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) return false;
    if (length && value.length !== 2 + 2 * length) return false;
    return true;
}
exports.isHexString = isHexString;

},{"fce3a522adfcb8de":"fCgem"}],"fk9Hf":[function(require,module,exports) {
var Buffer = require("36a28aca0c972a45").Buffer;
"use strict";
var __values = this && this.__values || function(o) {
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
};
var __read = this && this.__read || function(o, n) {
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
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bufArrToArr = exports.arrToBufArr = exports.validateNoLeadingZeroes = exports.baToJSON = exports.toUtf8 = exports.addHexPrefix = exports.toUnsigned = exports.fromSigned = exports.bufferToHex = exports.bufferToInt = exports.toBuffer = exports.unpadHexString = exports.unpadArray = exports.unpadBuffer = exports.setLengthRight = exports.setLengthLeft = exports.zeros = exports.intToBuffer = exports.intToHex = void 0;
var externals_1 = require("3f63cd450b312a79");
var internal_1 = require("a77450b815b9cbd3");
var helpers_1 = require("e6d13ca645d70567");
/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */ var intToHex = function(i) {
    if (!Number.isSafeInteger(i) || i < 0) throw new Error("Received an invalid integer type: ".concat(i));
    return "0x".concat(i.toString(16));
};
exports.intToHex = intToHex;
/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */ var intToBuffer = function(i) {
    var hex = (0, exports.intToHex)(i);
    return Buffer.from((0, internal_1.padToEven)(hex.slice(2)), "hex");
};
exports.intToBuffer = intToBuffer;
/**
 * Returns a buffer filled with 0s.
 * @param bytes the number of bytes the buffer should be
 */ var zeros = function(bytes) {
    return Buffer.allocUnsafe(bytes).fill(0);
};
exports.zeros = zeros;
/**
 * Pads a `Buffer` with zeros till it has `length` bytes.
 * Truncates the beginning or end of input if its length exceeds `length`.
 * @param msg the value to pad (Buffer)
 * @param length the number of bytes the output should be
 * @param right whether to start padding form the left or right
 * @return (Buffer)
 */ var setLength = function(msg, length, right) {
    var buf = (0, exports.zeros)(length);
    if (right) {
        if (msg.length < length) {
            msg.copy(buf);
            return buf;
        }
        return msg.slice(0, length);
    } else {
        if (msg.length < length) {
            msg.copy(buf, length - msg.length);
            return buf;
        }
        return msg.slice(-length);
    }
};
/**
 * Left Pads a `Buffer` with leading zeros till it has `length` bytes.
 * Or it truncates the beginning if it exceeds.
 * @param msg the value to pad (Buffer)
 * @param length the number of bytes the output should be
 * @return (Buffer)
 */ var setLengthLeft = function(msg, length) {
    (0, helpers_1.assertIsBuffer)(msg);
    return setLength(msg, length, false);
};
exports.setLengthLeft = setLengthLeft;
/**
 * Right Pads a `Buffer` with trailing zeros till it has `length` bytes.
 * it truncates the end if it exceeds.
 * @param msg the value to pad (Buffer)
 * @param length the number of bytes the output should be
 * @return (Buffer)
 */ var setLengthRight = function(msg, length) {
    (0, helpers_1.assertIsBuffer)(msg);
    return setLength(msg, length, true);
};
exports.setLengthRight = setLengthRight;
/**
 * Trims leading zeros from a `Buffer`, `String` or `Number[]`.
 * @param a (Buffer|Array|String)
 * @return (Buffer|Array|String)
 */ var stripZeros = function(a) {
    var first = a[0];
    while(a.length > 0 && first.toString() === "0"){
        a = a.slice(1);
        first = a[0];
    }
    return a;
};
/**
 * Trims leading zeros from a `Buffer`.
 * @param a (Buffer)
 * @return (Buffer)
 */ var unpadBuffer = function(a) {
    (0, helpers_1.assertIsBuffer)(a);
    return stripZeros(a);
};
exports.unpadBuffer = unpadBuffer;
/**
 * Trims leading zeros from an `Array` (of numbers).
 * @param a (number[])
 * @return (number[])
 */ var unpadArray = function(a) {
    (0, helpers_1.assertIsArray)(a);
    return stripZeros(a);
};
exports.unpadArray = unpadArray;
/**
 * Trims leading zeros from a hex-prefixed `String`.
 * @param a (String)
 * @return (String)
 */ var unpadHexString = function(a) {
    (0, helpers_1.assertIsHexString)(a);
    a = (0, internal_1.stripHexPrefix)(a);
    return stripZeros(a);
};
exports.unpadHexString = unpadHexString;
/**
 * Attempts to turn a value into a `Buffer`.
 * Inputs supported: `Buffer`, `String` (hex-prefixed), `Number`, null/undefined, `BN` and other objects
 * with a `toArray()` or `toBuffer()` method.
 * @param v the value
 */ var toBuffer = function(v) {
    if (v === null || v === undefined) return Buffer.allocUnsafe(0);
    if (Buffer.isBuffer(v)) return Buffer.from(v);
    if (Array.isArray(v) || v instanceof Uint8Array) return Buffer.from(v);
    if (typeof v === "string") {
        if (!(0, internal_1.isHexString)(v)) throw new Error("Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ".concat(v));
        return Buffer.from((0, internal_1.padToEven)((0, internal_1.stripHexPrefix)(v)), "hex");
    }
    if (typeof v === "number") return (0, exports.intToBuffer)(v);
    if (externals_1.BN.isBN(v)) {
        if (v.isNeg()) throw new Error("Cannot convert negative BN to buffer. Given: ".concat(v));
        return v.toArrayLike(Buffer);
    }
    if (v.toArray) // converts a BN to a Buffer
    return Buffer.from(v.toArray());
    if (v.toBuffer) return Buffer.from(v.toBuffer());
    throw new Error("invalid type");
};
exports.toBuffer = toBuffer;
/**
 * Converts a `Buffer` to a `Number`.
 * @param buf `Buffer` object to convert
 * @throws If the input number exceeds 53 bits.
 */ var bufferToInt = function(buf) {
    return new externals_1.BN((0, exports.toBuffer)(buf)).toNumber();
};
exports.bufferToInt = bufferToInt;
/**
 * Converts a `Buffer` into a `0x`-prefixed hex `String`.
 * @param buf `Buffer` object to convert
 */ var bufferToHex = function(buf) {
    buf = (0, exports.toBuffer)(buf);
    return "0x" + buf.toString("hex");
};
exports.bufferToHex = bufferToHex;
/**
 * Interprets a `Buffer` as a signed integer and returns a `BN`. Assumes 256-bit numbers.
 * @param num Signed integer value
 */ var fromSigned = function(num) {
    return new externals_1.BN(num).fromTwos(256);
};
exports.fromSigned = fromSigned;
/**
 * Converts a `BN` to an unsigned integer and returns it as a `Buffer`. Assumes 256-bit numbers.
 * @param num
 */ var toUnsigned = function(num) {
    return Buffer.from(num.toTwos(256).toArray());
};
exports.toUnsigned = toUnsigned;
/**
 * Adds "0x" to a given `String` if it does not already start with "0x".
 */ var addHexPrefix = function(str) {
    if (typeof str !== "string") return str;
    return (0, internal_1.isHexPrefixed)(str) ? str : "0x" + str;
};
exports.addHexPrefix = addHexPrefix;
/**
 * Returns the utf8 string representation from a hex string.
 *
 * Examples:
 *
 * Input 1: '657468657265756d000000000000000000000000000000000000000000000000'
 * Input 2: '657468657265756d'
 * Input 3: '000000000000000000000000000000000000000000000000657468657265756d'
 *
 * Output (all 3 input variants): 'ethereum'
 *
 * Note that this method is not intended to be used with hex strings
 * representing quantities in both big endian or little endian notation.
 *
 * @param string Hex string, should be `0x` prefixed
 * @return Utf8 string
 */ var toUtf8 = function(hex) {
    var zerosRegexp = /^(00)+|(00)+$/g;
    hex = (0, internal_1.stripHexPrefix)(hex);
    if (hex.length % 2 !== 0) throw new Error("Invalid non-even hex string input for toUtf8() provided");
    var bufferVal = Buffer.from(hex.replace(zerosRegexp, ""), "hex");
    return bufferVal.toString("utf8");
};
exports.toUtf8 = toUtf8;
/**
 * Converts a `Buffer` or `Array` to JSON.
 * @param ba (Buffer|Array)
 * @return (Array|String|null)
 */ var baToJSON = function(ba) {
    if (Buffer.isBuffer(ba)) return "0x".concat(ba.toString("hex"));
    else if (ba instanceof Array) {
        var array = [];
        for(var i = 0; i < ba.length; i++)array.push((0, exports.baToJSON)(ba[i]));
        return array;
    }
};
exports.baToJSON = baToJSON;
/**
 * Checks provided Buffers for leading zeroes and throws if found.
 *
 * Examples:
 *
 * Valid values: 0x1, 0x, 0x01, 0x1234
 * Invalid values: 0x0, 0x00, 0x001, 0x0001
 *
 * Note: This method is useful for validating that RLP encoded integers comply with the rule that all
 * integer values encoded to RLP must be in the most compact form and contain no leading zero bytes
 * @param values An object containing string keys and Buffer values
 * @throws if any provided value is found to have leading zero bytes
 */ var validateNoLeadingZeroes = function(values) {
    var e_1, _a;
    try {
        for(var _b = __values(Object.entries(values)), _c = _b.next(); !_c.done; _c = _b.next()){
            var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
            if (v !== undefined && v.length > 0 && v[0] === 0) throw new Error("".concat(k, " cannot have leading zeroes, received: ").concat(v.toString("hex")));
        }
    } catch (e_1_1) {
        e_1 = {
            error: e_1_1
        };
    } finally{
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally{
            if (e_1) throw e_1.error;
        }
    }
};
exports.validateNoLeadingZeroes = validateNoLeadingZeroes;
function arrToBufArr(arr) {
    if (!Array.isArray(arr)) return Buffer.from(arr);
    return arr.map(function(a) {
        return arrToBufArr(a);
    });
}
exports.arrToBufArr = arrToBufArr;
function bufArrToArr(arr) {
    if (!Array.isArray(arr)) return Uint8Array.from(arr !== null && arr !== void 0 ? arr : []);
    return arr.map(function(a) {
        return bufArrToArr(a);
    });
}
exports.bufArrToArr = bufArrToArr;

},{"36a28aca0c972a45":"fCgem","3f63cd450b312a79":"akanp","a77450b815b9cbd3":"hCoi2","e6d13ca645d70567":"6eDxN"}],"6eDxN":[function(require,module,exports) {
var Buffer = require("ce25e877a2d6ad0e").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertIsString = exports.assertIsArray = exports.assertIsBuffer = exports.assertIsHexString = void 0;
var internal_1 = require("6bc554c597027e2b");
/**
 * Throws if a string is not hex prefixed
 * @param {string} input string to check hex prefix of
 */ var assertIsHexString = function(input) {
    if (!(0, internal_1.isHexString)(input)) {
        var msg = "This method only supports 0x-prefixed hex strings but input was: ".concat(input);
        throw new Error(msg);
    }
};
exports.assertIsHexString = assertIsHexString;
/**
 * Throws if input is not a buffer
 * @param {Buffer} input value to check
 */ var assertIsBuffer = function(input) {
    if (!Buffer.isBuffer(input)) {
        var msg = "This method only supports Buffer but input was: ".concat(input);
        throw new Error(msg);
    }
};
exports.assertIsBuffer = assertIsBuffer;
/**
 * Throws if input is not an array
 * @param {number[]} input value to check
 */ var assertIsArray = function(input) {
    if (!Array.isArray(input)) {
        var msg = "This method only supports number arrays but input was: ".concat(input);
        throw new Error(msg);
    }
};
exports.assertIsArray = assertIsArray;
/**
 * Throws if input is not a string
 * @param {string} input value to check
 */ var assertIsString = function(input) {
    if (typeof input !== "string") {
        var msg = "This method only supports strings but input was: ".concat(input);
        throw new Error(msg);
    }
};
exports.assertIsString = assertIsString;

},{"ce25e877a2d6ad0e":"fCgem","6bc554c597027e2b":"hCoi2"}],"dUGwn":[function(require,module,exports) {
var Buffer = require("88f2b3c86146796").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rlphash = exports.ripemd160FromArray = exports.ripemd160FromString = exports.ripemd160 = exports.sha256FromArray = exports.sha256FromString = exports.sha256 = exports.keccakFromArray = exports.keccakFromHexString = exports.keccakFromString = exports.keccak256 = exports.keccak = void 0;
var keccak_1 = require("8ed2b3130760fd7f");
var createHash = require("825732b8ae916063");
var externals_1 = require("68366271dc7273b5");
var bytes_1 = require("be2f6b7c302293ba");
var helpers_1 = require("1de1e6e2bf587381");
/**
 * Creates Keccak hash of a Buffer input
 * @param a The input data (Buffer)
 * @param bits (number = 256) The Keccak width
 */ var keccak = function(a, bits) {
    if (bits === void 0) bits = 256;
    (0, helpers_1.assertIsBuffer)(a);
    switch(bits){
        case 224:
            return (0, keccak_1.keccak224)(a);
        case 256:
            return (0, keccak_1.keccak256)(a);
        case 384:
            return (0, keccak_1.keccak384)(a);
        case 512:
            return (0, keccak_1.keccak512)(a);
        default:
            throw new Error("Invald algorithm: keccak".concat(bits));
    }
};
exports.keccak = keccak;
/**
 * Creates Keccak-256 hash of the input, alias for keccak(a, 256).
 * @param a The input data (Buffer)
 */ var keccak256 = function(a) {
    return (0, exports.keccak)(a);
};
exports.keccak256 = keccak256;
/**
 * Creates Keccak hash of a utf-8 string input
 * @param a The input data (String)
 * @param bits (number = 256) The Keccak width
 */ var keccakFromString = function(a, bits) {
    if (bits === void 0) bits = 256;
    (0, helpers_1.assertIsString)(a);
    var buf = Buffer.from(a, "utf8");
    return (0, exports.keccak)(buf, bits);
};
exports.keccakFromString = keccakFromString;
/**
 * Creates Keccak hash of an 0x-prefixed string input
 * @param a The input data (String)
 * @param bits (number = 256) The Keccak width
 */ var keccakFromHexString = function(a, bits) {
    if (bits === void 0) bits = 256;
    (0, helpers_1.assertIsHexString)(a);
    return (0, exports.keccak)((0, bytes_1.toBuffer)(a), bits);
};
exports.keccakFromHexString = keccakFromHexString;
/**
 * Creates Keccak hash of a number array input
 * @param a The input data (number[])
 * @param bits (number = 256) The Keccak width
 */ var keccakFromArray = function(a, bits) {
    if (bits === void 0) bits = 256;
    (0, helpers_1.assertIsArray)(a);
    return (0, exports.keccak)((0, bytes_1.toBuffer)(a), bits);
};
exports.keccakFromArray = keccakFromArray;
/**
 * Creates SHA256 hash of an input.
 * @param  a The input data (Buffer|Array|String)
 */ var _sha256 = function(a) {
    a = (0, bytes_1.toBuffer)(a);
    return createHash("sha256").update(a).digest();
};
/**
 * Creates SHA256 hash of a Buffer input.
 * @param a The input data (Buffer)
 */ var sha256 = function(a) {
    (0, helpers_1.assertIsBuffer)(a);
    return _sha256(a);
};
exports.sha256 = sha256;
/**
 * Creates SHA256 hash of a string input.
 * @param a The input data (string)
 */ var sha256FromString = function(a) {
    (0, helpers_1.assertIsString)(a);
    return _sha256(a);
};
exports.sha256FromString = sha256FromString;
/**
 * Creates SHA256 hash of a number[] input.
 * @param a The input data (number[])
 */ var sha256FromArray = function(a) {
    (0, helpers_1.assertIsArray)(a);
    return _sha256(a);
};
exports.sha256FromArray = sha256FromArray;
/**
 * Creates RIPEMD160 hash of the input.
 * @param a The input data (Buffer|Array|String|Number)
 * @param padded Whether it should be padded to 256 bits or not
 */ var _ripemd160 = function(a, padded) {
    a = (0, bytes_1.toBuffer)(a);
    var hash = createHash("rmd160").update(a).digest();
    if (padded === true) return (0, bytes_1.setLengthLeft)(hash, 32);
    else return hash;
};
/**
 * Creates RIPEMD160 hash of a Buffer input.
 * @param a The input data (Buffer)
 * @param padded Whether it should be padded to 256 bits or not
 */ var ripemd160 = function(a, padded) {
    (0, helpers_1.assertIsBuffer)(a);
    return _ripemd160(a, padded);
};
exports.ripemd160 = ripemd160;
/**
 * Creates RIPEMD160 hash of a string input.
 * @param a The input data (String)
 * @param padded Whether it should be padded to 256 bits or not
 */ var ripemd160FromString = function(a, padded) {
    (0, helpers_1.assertIsString)(a);
    return _ripemd160(a, padded);
};
exports.ripemd160FromString = ripemd160FromString;
/**
 * Creates RIPEMD160 hash of a number[] input.
 * @param a The input data (number[])
 * @param padded Whether it should be padded to 256 bits or not
 */ var ripemd160FromArray = function(a, padded) {
    (0, helpers_1.assertIsArray)(a);
    return _ripemd160(a, padded);
};
exports.ripemd160FromArray = ripemd160FromArray;
/**
 * Creates SHA-3 hash of the RLP encoded version of the input.
 * @param a The input data
 */ var rlphash = function(a) {
    return (0, exports.keccak)(externals_1.rlp.encode(a));
};
exports.rlphash = rlphash;

},{"88f2b3c86146796":"fCgem","8ed2b3130760fd7f":"hXmVZ","825732b8ae916063":"2WyL8","68366271dc7273b5":"akanp","be2f6b7c302293ba":"fk9Hf","1de1e6e2bf587381":"6eDxN"}],"hXmVZ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var hash_utils_1 = require("8582333982ffbee1");
var createKeccakHash = require("3b1e2e78f60e4a");
exports.keccak224 = hash_utils_1.createHashFunction(function() {
    return createKeccakHash("keccak224");
});
exports.keccak256 = hash_utils_1.createHashFunction(function() {
    return createKeccakHash("keccak256");
});
exports.keccak384 = hash_utils_1.createHashFunction(function() {
    return createKeccakHash("keccak384");
});
exports.keccak512 = hash_utils_1.createHashFunction(function() {
    return createKeccakHash("keccak512");
});

},{"8582333982ffbee1":"4xcu3","3b1e2e78f60e4a":"cOBab"}],"4xcu3":[function(require,module,exports) {
var Buffer = require("e16fbb432b1d827b").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function createHashFunction(hashConstructor) {
    return function(msg) {
        var hash = hashConstructor();
        hash.update(msg);
        return Buffer.from(hash.digest());
    };
}
exports.createHashFunction = createHashFunction;

},{"e16fbb432b1d827b":"fCgem"}],"fS27p":[function(require,module,exports) {
var Buffer = require("1b1cf2cafcf9abb7").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toType = exports.TypeOutput = exports.bnToRlp = exports.bnToUnpaddedBuffer = exports.bnToHex = void 0;
var externals_1 = require("4c7be847e4fde6dc");
var internal_1 = require("b62ba68c48940f37");
var bytes_1 = require("e76eea48fed68797");
/**
 * Convert BN to 0x-prefixed hex string.
 */ function bnToHex(value) {
    return "0x".concat(value.toString(16));
}
exports.bnToHex = bnToHex;
/**
 * Convert value from BN to an unpadded Buffer
 * (useful for RLP transport)
 * @param value value to convert
 */ function bnToUnpaddedBuffer(value) {
    // Using `bn.toArrayLike(Buffer)` instead of `bn.toBuffer()`
    // for compatibility with browserify and similar tools
    return (0, bytes_1.unpadBuffer)(value.toArrayLike(Buffer));
}
exports.bnToUnpaddedBuffer = bnToUnpaddedBuffer;
/**
 * Deprecated alias for {@link bnToUnpaddedBuffer}
 * @deprecated
 */ function bnToRlp(value) {
    return bnToUnpaddedBuffer(value);
}
exports.bnToRlp = bnToRlp;
/**
 * Type output options
 */ var TypeOutput;
(function(TypeOutput) {
    TypeOutput[TypeOutput["Number"] = 0] = "Number";
    TypeOutput[TypeOutput["BN"] = 1] = "BN";
    TypeOutput[TypeOutput["Buffer"] = 2] = "Buffer";
    TypeOutput[TypeOutput["PrefixedHexString"] = 3] = "PrefixedHexString";
})(TypeOutput = exports.TypeOutput || (exports.TypeOutput = {}));
function toType(input, outputType) {
    if (input === null) return null;
    if (input === undefined) return undefined;
    if (typeof input === "string" && !(0, internal_1.isHexString)(input)) throw new Error("A string must be provided with a 0x-prefix, given: ".concat(input));
    else if (typeof input === "number" && !Number.isSafeInteger(input)) throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)");
    var output = (0, bytes_1.toBuffer)(input);
    if (outputType === TypeOutput.Buffer) return output;
    else if (outputType === TypeOutput.BN) return new externals_1.BN(output);
    else if (outputType === TypeOutput.Number) {
        var bn = new externals_1.BN(output);
        var max = new externals_1.BN(Number.MAX_SAFE_INTEGER.toString());
        if (bn.gt(max)) throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)");
        return bn.toNumber();
    } else // outputType === TypeOutput.PrefixedHexString
    return "0x".concat(output.toString("hex"));
}
exports.toType = toType;

},{"1b1cf2cafcf9abb7":"fCgem","4c7be847e4fde6dc":"akanp","b62ba68c48940f37":"hCoi2","e76eea48fed68797":"fk9Hf"}],"d0cvS":[function(require,module,exports) {
var Buffer = require("8c59f46be7980923").Buffer;
"use strict";
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Address = void 0;
var assert_1 = __importDefault(require("e6e0f0f56cd11f51"));
var externals_1 = require("b9771f8b55454b64");
var bytes_1 = require("77fff660a9a5efc5");
var account_1 = require("fce9e750bf133a40");
var Address = /** @class */ function() {
    function Address(buf) {
        (0, assert_1.default)(buf.length === 20, "Invalid address length");
        this.buf = buf;
    }
    /**
     * Returns the zero address.
     */ Address.zero = function() {
        return new Address((0, bytes_1.zeros)(20));
    };
    /**
     * Returns an Address object from a hex-encoded string.
     * @param str - Hex-encoded address
     */ Address.fromString = function(str) {
        (0, assert_1.default)((0, account_1.isValidAddress)(str), "Invalid address");
        return new Address((0, bytes_1.toBuffer)(str));
    };
    /**
     * Returns an address for a given public key.
     * @param pubKey The two points of an uncompressed key
     */ Address.fromPublicKey = function(pubKey) {
        (0, assert_1.default)(Buffer.isBuffer(pubKey), "Public key should be Buffer");
        var buf = (0, account_1.pubToAddress)(pubKey);
        return new Address(buf);
    };
    /**
     * Returns an address for a given private key.
     * @param privateKey A private key must be 256 bits wide
     */ Address.fromPrivateKey = function(privateKey) {
        (0, assert_1.default)(Buffer.isBuffer(privateKey), "Private key should be Buffer");
        var buf = (0, account_1.privateToAddress)(privateKey);
        return new Address(buf);
    };
    /**
     * Generates an address for a newly created contract.
     * @param from The address which is creating this new address
     * @param nonce The nonce of the from account
     */ Address.generate = function(from, nonce) {
        (0, assert_1.default)(externals_1.BN.isBN(nonce));
        return new Address((0, account_1.generateAddress)(from.buf, nonce.toArrayLike(Buffer)));
    };
    /**
     * Generates an address for a contract created using CREATE2.
     * @param from The address which is creating this new address
     * @param salt A salt
     * @param initCode The init code of the contract being created
     */ Address.generate2 = function(from, salt, initCode) {
        (0, assert_1.default)(Buffer.isBuffer(salt));
        (0, assert_1.default)(Buffer.isBuffer(initCode));
        return new Address((0, account_1.generateAddress2)(from.buf, salt, initCode));
    };
    /**
     * Is address equal to another.
     */ Address.prototype.equals = function(address) {
        return this.buf.equals(address.buf);
    };
    /**
     * Is address zero.
     */ Address.prototype.isZero = function() {
        return this.equals(Address.zero());
    };
    /**
     * True if address is in the address range defined
     * by EIP-1352
     */ Address.prototype.isPrecompileOrSystemAddress = function() {
        var addressBN = new externals_1.BN(this.buf);
        var rangeMin = new externals_1.BN(0);
        var rangeMax = new externals_1.BN("ffff", "hex");
        return addressBN.gte(rangeMin) && addressBN.lte(rangeMax);
    };
    /**
     * Returns hex encoding of address.
     */ Address.prototype.toString = function() {
        return "0x" + this.buf.toString("hex");
    };
    /**
     * Returns Buffer representation of address.
     */ Address.prototype.toBuffer = function() {
        return Buffer.from(this.buf);
    };
    return Address;
}();
exports.Address = Address;

},{"8c59f46be7980923":"fCgem","e6e0f0f56cd11f51":"f3tT4","b9771f8b55454b64":"akanp","77fff660a9a5efc5":"fk9Hf","fce9e750bf133a40":"8RsJY"}],"iSUhG":[function(require,module,exports) {
var Buffer = require("11c8e5868dae9f6b").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hashPersonalMessage = exports.isValidSignature = exports.fromRpcSig = exports.toCompactSig = exports.toRpcSig = exports.ecrecover = exports.ecsign = void 0;
var secp256k1_1 = require("3d9bf40d9303081b");
var externals_1 = require("69b23e56128cd4a5");
var bytes_1 = require("d8b2870d21bddcb9");
var hash_1 = require("cce7fa85704e979c");
var helpers_1 = require("9a12dada389feea");
var types_1 = require("9c1b1b9aeb1f83c5");
function ecsign(msgHash, privateKey, chainId) {
    var _a = (0, secp256k1_1.ecdsaSign)(msgHash, privateKey), signature = _a.signature, recovery = _a.recid;
    var r = Buffer.from(signature.slice(0, 32));
    var s = Buffer.from(signature.slice(32, 64));
    if (!chainId || typeof chainId === "number") {
        // return legacy type ECDSASignature (deprecated in favor of ECDSASignatureBuffer to handle large chainIds)
        if (chainId && !Number.isSafeInteger(chainId)) throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)");
        var v_1 = chainId ? recovery + (chainId * 2 + 35) : recovery + 27;
        return {
            r: r,
            s: s,
            v: v_1
        };
    }
    var chainIdBN = (0, types_1.toType)(chainId, types_1.TypeOutput.BN);
    var v = chainIdBN.muln(2).addn(35).addn(recovery).toArrayLike(Buffer);
    return {
        r: r,
        s: s,
        v: v
    };
}
exports.ecsign = ecsign;
function calculateSigRecovery(v, chainId) {
    var vBN = (0, types_1.toType)(v, types_1.TypeOutput.BN);
    if (vBN.eqn(0) || vBN.eqn(1)) return (0, types_1.toType)(v, types_1.TypeOutput.BN);
    if (!chainId) return vBN.subn(27);
    var chainIdBN = (0, types_1.toType)(chainId, types_1.TypeOutput.BN);
    return vBN.sub(chainIdBN.muln(2).addn(35));
}
function isValidSigRecovery(recovery) {
    var rec = new externals_1.BN(recovery);
    return rec.eqn(0) || rec.eqn(1);
}
/**
 * ECDSA public key recovery from signature.
 * NOTE: Accepts `v == 0 | v == 1` for EIP1559 transactions
 * @returns Recovered public key
 */ var ecrecover = function(msgHash, v, r, s, chainId) {
    var signature = Buffer.concat([
        (0, bytes_1.setLengthLeft)(r, 32),
        (0, bytes_1.setLengthLeft)(s, 32)
    ], 64);
    var recovery = calculateSigRecovery(v, chainId);
    if (!isValidSigRecovery(recovery)) throw new Error("Invalid signature v value");
    var senderPubKey = (0, secp256k1_1.ecdsaRecover)(signature, recovery.toNumber(), msgHash);
    return Buffer.from((0, secp256k1_1.publicKeyConvert)(senderPubKey, false).slice(1));
};
exports.ecrecover = ecrecover;
/**
 * Convert signature parameters into the format of `eth_sign` RPC method.
 * NOTE: Accepts `v == 0 | v == 1` for EIP1559 transactions
 * @returns Signature
 */ var toRpcSig = function(v, r, s, chainId) {
    var recovery = calculateSigRecovery(v, chainId);
    if (!isValidSigRecovery(recovery)) throw new Error("Invalid signature v value");
    // geth (and the RPC eth_sign method) uses the 65 byte format used by Bitcoin
    return (0, bytes_1.bufferToHex)(Buffer.concat([
        (0, bytes_1.setLengthLeft)(r, 32),
        (0, bytes_1.setLengthLeft)(s, 32),
        (0, bytes_1.toBuffer)(v)
    ]));
};
exports.toRpcSig = toRpcSig;
/**
 * Convert signature parameters into the format of Compact Signature Representation (EIP-2098).
 * NOTE: Accepts `v == 0 | v == 1` for EIP1559 transactions
 * @returns Signature
 */ var toCompactSig = function(v, r, s, chainId) {
    var recovery = calculateSigRecovery(v, chainId);
    if (!isValidSigRecovery(recovery)) throw new Error("Invalid signature v value");
    var vn = (0, types_1.toType)(v, types_1.TypeOutput.Number);
    var ss = s;
    if (vn > 28 && vn % 2 === 1 || vn === 1 || vn === 28) {
        ss = Buffer.from(s);
        ss[0] |= 0x80;
    }
    return (0, bytes_1.bufferToHex)(Buffer.concat([
        (0, bytes_1.setLengthLeft)(r, 32),
        (0, bytes_1.setLengthLeft)(ss, 32)
    ]));
};
exports.toCompactSig = toCompactSig;
/**
 * Convert signature format of the `eth_sign` RPC method to signature parameters
 * NOTE: all because of a bug in geth: https://github.com/ethereum/go-ethereum/issues/2053
 * NOTE: After EIP1559, `v` could be `0` or `1` but this function assumes
 * it's a signed message (EIP-191 or EIP-712) adding `27` at the end. Remove if needed.
 */ var fromRpcSig = function(sig) {
    var buf = (0, bytes_1.toBuffer)(sig);
    var r;
    var s;
    var v;
    if (buf.length >= 65) {
        r = buf.slice(0, 32);
        s = buf.slice(32, 64);
        v = (0, bytes_1.bufferToInt)(buf.slice(64));
    } else if (buf.length === 64) {
        // Compact Signature Representation (https://eips.ethereum.org/EIPS/eip-2098)
        r = buf.slice(0, 32);
        s = buf.slice(32, 64);
        v = (0, bytes_1.bufferToInt)(buf.slice(32, 33)) >> 7;
        s[0] &= 0x7f;
    } else throw new Error("Invalid signature length");
    // support both versions of `eth_sign` responses
    if (v < 27) v += 27;
    return {
        v: v,
        r: r,
        s: s
    };
};
exports.fromRpcSig = fromRpcSig;
/**
 * Validate a ECDSA signature.
 * NOTE: Accepts `v == 0 | v == 1` for EIP1559 transactions
 * @param homesteadOrLater Indicates whether this is being used on either the homestead hardfork or a later one
 */ var isValidSignature = function(v, r, s, homesteadOrLater, chainId) {
    if (homesteadOrLater === void 0) homesteadOrLater = true;
    var SECP256K1_N_DIV_2 = new externals_1.BN("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0", 16);
    var SECP256K1_N = new externals_1.BN("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16);
    if (r.length !== 32 || s.length !== 32) return false;
    if (!isValidSigRecovery(calculateSigRecovery(v, chainId))) return false;
    var rBN = new externals_1.BN(r);
    var sBN = new externals_1.BN(s);
    if (rBN.isZero() || rBN.gt(SECP256K1_N) || sBN.isZero() || sBN.gt(SECP256K1_N)) return false;
    if (homesteadOrLater && sBN.cmp(SECP256K1_N_DIV_2) === 1) return false;
    return true;
};
exports.isValidSignature = isValidSignature;
/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 */ var hashPersonalMessage = function(message) {
    (0, helpers_1.assertIsBuffer)(message);
    var prefix = Buffer.from("\x19Ethereum Signed Message:\n".concat(message.length), "utf-8");
    return (0, hash_1.keccak)(Buffer.concat([
        prefix,
        message
    ]));
};
exports.hashPersonalMessage = hashPersonalMessage;

},{"11c8e5868dae9f6b":"fCgem","3d9bf40d9303081b":"fXFOP","69b23e56128cd4a5":"akanp","d8b2870d21bddcb9":"fk9Hf","cce7fa85704e979c":"dUGwn","9a12dada389feea":"6eDxN","9c1b1b9aeb1f83c5":"fS27p"}],"crlel":[function(require,module,exports) {
var Buffer = require("89f535e1c289dc4").Buffer;
"use strict";
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defineProperties = void 0;
var assert_1 = __importDefault(require("d13ad697337ecf18"));
var internal_1 = require("5d3d09d2e2be9e8a");
var externals_1 = require("34cbe60c34f0d55b");
var bytes_1 = require("8b403b36861d1e8b");
/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param self the `Object` to define properties on
 * @param fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param data data to be validated against the definitions
 * @deprecated
 */ var defineProperties = function(self, fields, data) {
    self.raw = [];
    self._fields = [];
    // attach the `toJSON`
    self.toJSON = function(label) {
        if (label === void 0) label = false;
        if (label) {
            var obj_1 = {};
            self._fields.forEach(function(field) {
                obj_1[field] = "0x".concat(self[field].toString("hex"));
            });
            return obj_1;
        }
        return (0, bytes_1.baToJSON)(self.raw);
    };
    self.serialize = function serialize() {
        return externals_1.rlp.encode(self.raw);
    };
    fields.forEach(function(field, i) {
        self._fields.push(field.name);
        function getter() {
            return self.raw[i];
        }
        function setter(v) {
            v = (0, bytes_1.toBuffer)(v);
            if (v.toString("hex") === "00" && !field.allowZero) v = Buffer.allocUnsafe(0);
            if (field.allowLess && field.length) {
                v = (0, bytes_1.unpadBuffer)(v);
                (0, assert_1.default)(field.length >= v.length, "The field ".concat(field.name, " must not have more ").concat(field.length, " bytes"));
            } else if (!(field.allowZero && v.length === 0) && field.length) (0, assert_1.default)(field.length === v.length, "The field ".concat(field.name, " must have byte length of ").concat(field.length));
            self.raw[i] = v;
        }
        Object.defineProperty(self, field.name, {
            enumerable: true,
            configurable: true,
            get: getter,
            set: setter
        });
        if (field.default) self[field.name] = field.default;
        // attach alias
        if (field.alias) Object.defineProperty(self, field.alias, {
            enumerable: false,
            configurable: true,
            set: setter,
            get: getter
        });
    });
    // if the constuctor is passed data
    if (data) {
        if (typeof data === "string") data = Buffer.from((0, internal_1.stripHexPrefix)(data), "hex");
        if (Buffer.isBuffer(data)) data = externals_1.rlp.decode(data);
        if (Array.isArray(data)) {
            if (data.length > self._fields.length) throw new Error("wrong number of fields in data");
            // make sure all the items are buffers
            data.forEach(function(d, i) {
                self[self._fields[i]] = (0, bytes_1.toBuffer)(d);
            });
        } else if (typeof data === "object") {
            var keys_1 = Object.keys(data);
            fields.forEach(function(field) {
                if (keys_1.indexOf(field.name) !== -1) self[field.name] = data[field.name];
                if (keys_1.indexOf(field.alias) !== -1) self[field.alias] = data[field.alias];
            });
        } else throw new Error("invalid data");
    }
};
exports.defineProperties = defineProperties;

},{"89f535e1c289dc4":"fCgem","d13ad697337ecf18":"f3tT4","5d3d09d2e2be9e8a":"hCoi2","34cbe60c34f0d55b":"akanp","8b403b36861d1e8b":"fk9Hf"}],"7kRFs":[function(require,module,exports) {
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/ (function(root, definition) {
    "use strict";
    if (typeof define === "function" && define.amd) define(definition);
    else if (0, module.exports) module.exports = definition();
    else root.log = definition();
})(this, function() {
    "use strict";
    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];
    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === "function") return method.bind(obj);
        else try {
            return Function.prototype.bind.call(method, obj);
        } catch (e) {
            // Missing bind shim or IE8 + Modernizr, fallback to wrapping
            return function() {
                return Function.prototype.apply.apply(method, [
                    obj,
                    arguments
                ]);
            };
        }
    }
    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) console.log.apply(console, arguments);
            else // In old IE, native console methods themselves don't have apply().
            Function.prototype.apply.apply(console.log, [
                console,
                arguments
            ]);
        }
        if (console.trace) console.trace();
    }
    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === "debug") methodName = "log";
        if (typeof console === undefinedType) return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        else if (methodName === "trace" && isIE) return traceForIE;
        else if (console[methodName] !== undefined) return bindMethod(console, methodName);
        else if (console.log !== undefined) return bindMethod(console, "log");
        else return noop;
    }
    // These private functions always need `this` to be set properly
    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */ for(var i = 0; i < logMethods.length; i++){
            var methodName = logMethods[i];
            this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
        }
        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }
    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function() {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }
    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */ return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, defaultLevel, factory) {
        var self = this;
        var currentLevel;
        defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") storageKey += ":" + name;
        else if (typeof name === "symbol") storageKey = undefined;
        function persistLevelIfPossible(levelNum) {
            var levelName = (logMethods[levelNum] || "silent").toUpperCase();
            if (typeof window === undefinedType || !storageKey) return;
            // Use localStorage if available
            try {
                window.localStorage[storageKey] = levelName;
                return;
            } catch (ignore) {}
            // Use session cookie as fallback
            try {
                window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
            } catch (ignore) {}
        }
        function getPersistedLevel() {
            var storedLevel;
            if (typeof window === undefinedType || !storageKey) return;
            try {
                storedLevel = window.localStorage[storageKey];
            } catch (ignore) {}
            // Fallback to cookies if local storage gives us nothing
            if (typeof storedLevel === undefinedType) try {
                var cookie = window.document.cookie;
                var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
                if (location !== -1) storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
            } catch (ignore) {}
            // If the stored level is not valid, treat it as if nothing was stored.
            if (self.levels[storedLevel] === undefined) storedLevel = undefined;
            return storedLevel;
        }
        function clearPersistedLevel() {
            if (typeof window === undefinedType || !storageKey) return;
            // Use localStorage if available
            try {
                window.localStorage.removeItem(storageKey);
                return;
            } catch (ignore) {}
            // Use session cookie as fallback
            try {
                window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch (ignore) {}
        }
        /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */ self.name = name;
        self.levels = {
            "TRACE": 0,
            "DEBUG": 1,
            "INFO": 2,
            "WARN": 3,
            "ERROR": 4,
            "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function() {
            return currentLevel;
        };
        self.setLevel = function(level, persist) {
            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) level = self.levels[level.toUpperCase()];
            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
                currentLevel = level;
                if (persist !== false) persistLevelIfPossible(level);
                replaceLoggingMethods.call(self, level, name);
                if (typeof console === undefinedType && level < self.levels.SILENT) return "No console available for logging";
            } else throw "log.setLevel() called with invalid level: " + level;
        };
        self.setDefaultLevel = function(level) {
            defaultLevel = level;
            if (!getPersistedLevel()) self.setLevel(level, false);
        };
        self.resetLevel = function() {
            self.setLevel(defaultLevel, false);
            clearPersistedLevel();
        };
        self.enableAll = function(persist) {
            self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function(persist) {
            self.setLevel(self.levels.SILENT, persist);
        };
        // Initialize with the right level
        var initialLevel = getPersistedLevel();
        if (initialLevel == null) initialLevel = defaultLevel;
        self.setLevel(initialLevel, false);
    }
    /*
     *
     * Top-level API
     *
     */ var defaultLogger = new Logger();
    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") throw new TypeError("You must supply a name when creating a logger.");
        var logger = _loggersByName[name];
        if (!logger) logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        return logger;
    };
    // Grab the current global log variable in case of overwrite
    var _log = typeof window !== undefinedType ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType && window.log === defaultLogger) window.log = _log;
        return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };
    // ES6 default export, for compatibility
    defaultLogger["default"] = defaultLogger;
    return defaultLogger;
});

},{}],"kf0GQ":[function(require,module,exports) {
"use strict";
var _index = require("c8fa364390938858");
/**
 * because babel can only export on default-attribute,
 * we use this for the non-module-build
 * this ensures that users do not have to use
 * var BroadcastChannel = require('broadcast-channel').default;
 * but
 * var BroadcastChannel = require('broadcast-channel');
 */ module.exports = {
    BroadcastChannel: _index.BroadcastChannel,
    enforceOptions: _index.enforceOptions
};

},{"c8fa364390938858":"7MYiJ"}],"7MYiJ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BroadcastChannel", {
    enumerable: true,
    get: function get() {
        return _broadcastChannel.BroadcastChannel;
    }
});
Object.defineProperty(exports, "OPEN_BROADCAST_CHANNELS", {
    enumerable: true,
    get: function get() {
        return _broadcastChannel.OPEN_BROADCAST_CHANNELS;
    }
});
Object.defineProperty(exports, "enforceOptions", {
    enumerable: true,
    get: function get() {
        return _broadcastChannel.enforceOptions;
    }
});
var _broadcastChannel = require("5180ee4fe758f55");

},{"5180ee4fe758f55":"S8g4S"}],"S8g4S":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OPEN_BROADCAST_CHANNELS = exports.BroadcastChannel = void 0;
exports.enforceOptions = enforceOptions;
var _util = require("eb8fdf6d11d94ee4");
var _methodChooser = require("a20ca3aa97e45cc5");
var _options = require("f2366e3e78d79cab");
/**
 * Contains all open channels,
 * used in tests to ensure everything is closed.
 */ var OPEN_BROADCAST_CHANNELS = new Set();
exports.OPEN_BROADCAST_CHANNELS = OPEN_BROADCAST_CHANNELS;
var lastId = 0;
var BroadcastChannel = function BroadcastChannel(name, options) {
    // identifier of the channel to debug stuff
    this.id = lastId++;
    OPEN_BROADCAST_CHANNELS.add(this);
    this.name = name;
    if (ENFORCED_OPTIONS) options = ENFORCED_OPTIONS;
    this.options = (0, _options.fillOptionsWithDefaults)(options);
    this.method = (0, _methodChooser.chooseMethod)(this.options);
    // isListening
    this._iL = false;
    /**
   * _onMessageListener
   * setting onmessage twice,
   * will overwrite the first listener
   */ this._onML = null;
    /**
   * _addEventListeners
   */ this._addEL = {
        message: [],
        internal: []
    };
    /**
   * Unsend message promises
   * where the sending is still in progress
   * @type {Set<Promise>}
   */ this._uMP = new Set();
    /**
   * _beforeClose
   * array of promises that will be awaited
   * before the channel is closed
   */ this._befC = [];
    /**
   * _preparePromise
   */ this._prepP = null;
    _prepareChannel(this);
};
// STATICS
/**
 * used to identify if someone overwrites
 * window.BroadcastChannel with this
 * See methods/native.js
 */ exports.BroadcastChannel = BroadcastChannel;
BroadcastChannel._pubkey = true;
/**
 * if set, this method is enforced,
 * no mather what the options are
 */ var ENFORCED_OPTIONS;
function enforceOptions(options) {
    ENFORCED_OPTIONS = options;
}
// PROTOTYPE
BroadcastChannel.prototype = {
    postMessage: function postMessage(msg) {
        if (this.closed) throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed " + /**
       * In the past when this error appeared, it was realy hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */ JSON.stringify(msg));
        return _post(this, "message", msg);
    },
    postInternal: function postInternal(msg) {
        return _post(this, "internal", msg);
    },
    set onmessage (fn){
        var time = this.method.microSeconds();
        var listenObj = {
            time: time,
            fn: fn
        };
        _removeListenerObject(this, "message", this._onML);
        if (fn && typeof fn === "function") {
            this._onML = listenObj;
            _addListenerObject(this, "message", listenObj);
        } else this._onML = null;
    },
    addEventListener: function addEventListener(type, fn1) {
        var time = this.method.microSeconds();
        var listenObj = {
            time: time,
            fn: fn1
        };
        _addListenerObject(this, type, listenObj);
    },
    removeEventListener: function removeEventListener(type, fn1) {
        var obj = this._addEL[type].find(function(obj) {
            return obj.fn === fn1;
        });
        _removeListenerObject(this, type, obj);
    },
    close: function close() {
        var _this = this;
        if (this.closed) return;
        OPEN_BROADCAST_CHANNELS["delete"](this);
        this.closed = true;
        var awaitPrepare = this._prepP ? this._prepP : _util.PROMISE_RESOLVED_VOID;
        this._onML = null;
        this._addEL.message = [];
        return awaitPrepare// wait until all current sending are processed
        .then(function() {
            return Promise.all(Array.from(_this._uMP));
        })// run before-close hooks
        .then(function() {
            return Promise.all(_this._befC.map(function(fn1) {
                return fn1();
            }));
        })// close the channel
        .then(function() {
            return _this.method.close(_this._state);
        });
    },
    get type () {
        return this.method.type;
    },
    get isClosed () {
        return this.closed;
    }
};
/**
 * Post a message over the channel
 * @returns {Promise} that resolved when the message sending is done
 */ function _post(broadcastChannel, type, msg) {
    var time = broadcastChannel.method.microSeconds();
    var msgObj = {
        time: time,
        type: type,
        data: msg
    };
    var awaitPrepare = broadcastChannel._prepP ? broadcastChannel._prepP : _util.PROMISE_RESOLVED_VOID;
    return awaitPrepare.then(function() {
        var sendPromise = broadcastChannel.method.postMessage(broadcastChannel._state, msgObj);
        // add/remove to unsend messages list
        broadcastChannel._uMP.add(sendPromise);
        sendPromise["catch"]().then(function() {
            return broadcastChannel._uMP["delete"](sendPromise);
        });
        return sendPromise;
    });
}
function _prepareChannel(channel) {
    var maybePromise = channel.method.create(channel.name, channel.options);
    if ((0, _util.isPromise)(maybePromise)) {
        channel._prepP = maybePromise;
        maybePromise.then(function(s) {
            // used in tests to simulate slow runtime
            /*if (channel.options.prepareDelay) {
           await new Promise(res => setTimeout(res, this.options.prepareDelay));
      }*/ channel._state = s;
        });
    } else channel._state = maybePromise;
}
function _hasMessageListeners(channel) {
    if (channel._addEL.message.length > 0) return true;
    if (channel._addEL.internal.length > 0) return true;
    return false;
}
function _addListenerObject(channel, type, obj) {
    channel._addEL[type].push(obj);
    _startListening(channel);
}
function _removeListenerObject(channel, type, obj) {
    channel._addEL[type] = channel._addEL[type].filter(function(o) {
        return o !== obj;
    });
    _stopListening(channel);
}
function _startListening(channel) {
    if (!channel._iL && _hasMessageListeners(channel)) {
        // someone is listening, start subscribing
        var listenerFn = function listenerFn(msgObj) {
            channel._addEL[msgObj.type].forEach(function(listenerObject) {
                /**
         * Getting the current time in JavaScript has no good precision.
         * So instead of only listening to events that happend 'after' the listener
         * was added, we also listen to events that happended 100ms before it.
         * This ensures that when another process, like a WebWorker, sends events
         * we do not miss them out because their timestamp is a bit off compared to the main process.
         * Not doing this would make messages missing when we send data directly after subscribing and awaiting a response.
         * @link https://johnresig.com/blog/accuracy-of-javascript-time/
         */ var hundredMsInMicro = 100000;
                var minMessageTime = listenerObject.time - hundredMsInMicro;
                if (msgObj.time >= minMessageTime) listenerObject.fn(msgObj.data);
                else if (channel.method.type === "server") // server msg might lag based on connection.
                listenerObject.fn(msgObj.data);
            });
        };
        var time = channel.method.microSeconds();
        if (channel._prepP) channel._prepP.then(function() {
            channel._iL = true;
            channel.method.onMessage(channel._state, listenerFn, time);
        });
        else {
            channel._iL = true;
            channel.method.onMessage(channel._state, listenerFn, time);
        }
    }
}
function _stopListening(channel) {
    if (channel._iL && !_hasMessageListeners(channel)) {
        // noone is listening, stop subscribing
        channel._iL = false;
        var time = channel.method.microSeconds();
        channel.method.onMessage(channel._state, null, time);
    }
}

},{"eb8fdf6d11d94ee4":"4YTFM","a20ca3aa97e45cc5":"iKSys","f2366e3e78d79cab":"jbblO"}],"4YTFM":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("670b33d135c246a5");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PROMISE_RESOLVED_VOID = exports.PROMISE_RESOLVED_TRUE = exports.PROMISE_RESOLVED_FALSE = void 0;
exports.are3PCSupported = are3PCSupported;
exports.isPromise = isPromise;
exports.log = void 0;
exports.microSeconds = microSeconds;
exports.randomInt = randomInt;
exports.randomToken = randomToken;
exports.setLogLevel = void 0;
exports.sleep = sleep;
var _bowser = _interopRequireDefault(require("55125cd4485d358"));
var _loglevel = _interopRequireDefault(require("6b8b0fe95928c37a"));
/**
 * returns true if the given object is a promise
 */ function isPromise(obj) {
    if (obj && typeof obj.then === "function") return true;
    else return false;
}
var PROMISE_RESOLVED_FALSE = Promise.resolve(false);
exports.PROMISE_RESOLVED_FALSE = PROMISE_RESOLVED_FALSE;
var PROMISE_RESOLVED_TRUE = Promise.resolve(true);
exports.PROMISE_RESOLVED_TRUE = PROMISE_RESOLVED_TRUE;
var PROMISE_RESOLVED_VOID = Promise.resolve();
exports.PROMISE_RESOLVED_VOID = PROMISE_RESOLVED_VOID;
function sleep(time, resolveWith) {
    if (!time) time = 0;
    return new Promise(function(res) {
        return setTimeout(function() {
            return res(resolveWith);
        }, time);
    });
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * https://stackoverflow.com/a/8084248
 */ function randomToken() {
    return Math.random().toString(36).substring(2);
}
var lastMs = 0;
var additional = 0;
/**
 * returns the current time in micro-seconds,
 * WARNING: This is a pseudo-function
 * Performance.now is not reliable in webworkers, so we just make sure to never return the same time.
 * This is enough in browsers, and this function will not be used in nodejs.
 * The main reason for this hack is to ensure that BroadcastChannel behaves equal to production when it is used in fast-running unit tests.
 */ function microSeconds() {
    var ms = new Date().getTime();
    if (ms === lastMs) {
        additional++;
        return ms * 1000 + additional;
    } else {
        lastMs = ms;
        additional = 0;
        return ms * 1000;
    }
}
function are3PCSupported() {
    if (typeof navigator === "undefined") return false;
    var browserInfo = _bowser["default"].parse(navigator.userAgent);
    log.info(JSON.stringify(browserInfo), "current browser info");
    var thirdPartyCookieSupport = true;
    // brave
    if (navigator.brave) thirdPartyCookieSupport = false;
    // All webkit & gecko engine instances use itp (intelligent tracking prevention -
    // https://webkit.org/tracking-prevention/#intelligent-tracking-prevention-itp)
    if (browserInfo.engine.name === _bowser["default"].ENGINE_MAP.WebKit || browserInfo.engine.name === _bowser["default"].ENGINE_MAP.Gecko) thirdPartyCookieSupport = false;
    return thirdPartyCookieSupport;
}
var log = _loglevel["default"].getLogger("broadcast-channel");
exports.log = log;
log.setLevel("error");
var setLogLevel = function setLogLevel(level) {
    log.setLevel(level);
};
exports.setLogLevel = setLogLevel;

},{"670b33d135c246a5":"7XM86","55125cd4485d358":"5jYCf","6b8b0fe95928c37a":"7kRFs"}],"5jYCf":[function(require,module,exports) {
!function(e, t) {
    module.exports = t();
}(this, function() {
    return function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var i = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            });
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for(var i in e)r.d(n, i, (function(t) {
                return e[t];
            }).bind(null, i));
            return n;
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return r.d(t, "a", t), t;
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, r.p = "", r(r.s = 90);
    }({
        17: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n = r(18), i = function() {
                function e() {}
                return e.getFirstMatch = function(e, t) {
                    var r = t.match(e);
                    return r && r.length > 0 && r[1] || "";
                }, e.getSecondMatch = function(e, t) {
                    var r = t.match(e);
                    return r && r.length > 1 && r[2] || "";
                }, e.matchAndReturnConst = function(e, t, r) {
                    if (e.test(t)) return r;
                }, e.getWindowsVersionName = function(e) {
                    switch(e){
                        case "NT":
                            return "NT";
                        case "XP":
                            return "XP";
                        case "NT 5.0":
                            return "2000";
                        case "NT 5.1":
                            return "XP";
                        case "NT 5.2":
                            return "2003";
                        case "NT 6.0":
                            return "Vista";
                        case "NT 6.1":
                            return "7";
                        case "NT 6.2":
                            return "8";
                        case "NT 6.3":
                            return "8.1";
                        case "NT 10.0":
                            return "10";
                        default:
                            return;
                    }
                }, e.getMacOSVersionName = function(e) {
                    var t = e.split(".").splice(0, 2).map(function(e) {
                        return parseInt(e, 10) || 0;
                    });
                    if (t.push(0), 10 === t[0]) switch(t[1]){
                        case 5:
                            return "Leopard";
                        case 6:
                            return "Snow Leopard";
                        case 7:
                            return "Lion";
                        case 8:
                            return "Mountain Lion";
                        case 9:
                            return "Mavericks";
                        case 10:
                            return "Yosemite";
                        case 11:
                            return "El Capitan";
                        case 12:
                            return "Sierra";
                        case 13:
                            return "High Sierra";
                        case 14:
                            return "Mojave";
                        case 15:
                            return "Catalina";
                        default:
                            return;
                    }
                }, e.getAndroidVersionName = function(e) {
                    var t = e.split(".").splice(0, 2).map(function(e) {
                        return parseInt(e, 10) || 0;
                    });
                    if (t.push(0), !(1 === t[0] && t[1] < 5)) return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : 9 === t[0] ? "Pie" : void 0;
                }, e.getVersionPrecision = function(e) {
                    return e.split(".").length;
                }, e.compareVersions = function(t, r, n) {
                    void 0 === n && (n = !1);
                    var i = e.getVersionPrecision(t), s = e.getVersionPrecision(r), a = Math.max(i, s), o = 0, u = e.map([
                        t,
                        r
                    ], function(t) {
                        var r = a - e.getVersionPrecision(t), n = t + new Array(r + 1).join(".0");
                        return e.map(n.split("."), function(e) {
                            return new Array(20 - e.length).join("0") + e;
                        }).reverse();
                    });
                    for(n && (o = a - Math.min(i, s)), a -= 1; a >= o;){
                        if (u[0][a] > u[1][a]) return 1;
                        if (u[0][a] === u[1][a]) {
                            if (a === o) return 0;
                            a -= 1;
                        } else if (u[0][a] < u[1][a]) return -1;
                    }
                }, e.map = function(e, t) {
                    var r, n = [];
                    if (Array.prototype.map) return Array.prototype.map.call(e, t);
                    for(r = 0; r < e.length; r += 1)n.push(t(e[r]));
                    return n;
                }, e.find = function(e, t) {
                    var r, n;
                    if (Array.prototype.find) return Array.prototype.find.call(e, t);
                    for(r = 0, n = e.length; r < n; r += 1){
                        var i = e[r];
                        if (t(i, r)) return i;
                    }
                }, e.assign = function(e) {
                    for(var t, r, n = e, i = arguments.length, s = new Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++)s[a - 1] = arguments[a];
                    if (Object.assign) return Object.assign.apply(Object, [
                        e
                    ].concat(s));
                    var o = function() {
                        var e = s[t];
                        "object" == typeof e && null !== e && Object.keys(e).forEach(function(t) {
                            n[t] = e[t];
                        });
                    };
                    for(t = 0, r = s.length; t < r; t += 1)o();
                    return e;
                }, e.getBrowserAlias = function(e) {
                    return n.BROWSER_ALIASES_MAP[e];
                }, e.getBrowserTypeByAlias = function(e) {
                    return n.BROWSER_MAP[e] || "";
                }, e;
            }();
            t.default = i, e.exports = t.default;
        },
        18: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.ENGINE_MAP = t.OS_MAP = t.PLATFORMS_MAP = t.BROWSER_MAP = t.BROWSER_ALIASES_MAP = void 0;
            t.BROWSER_ALIASES_MAP = {
                "Amazon Silk": "amazon_silk",
                "Android Browser": "android",
                Bada: "bada",
                BlackBerry: "blackberry",
                Chrome: "chrome",
                Chromium: "chromium",
                Electron: "electron",
                Epiphany: "epiphany",
                Firefox: "firefox",
                Focus: "focus",
                Generic: "generic",
                "Google Search": "google_search",
                Googlebot: "googlebot",
                "Internet Explorer": "ie",
                "K-Meleon": "k_meleon",
                Maxthon: "maxthon",
                "Microsoft Edge": "edge",
                "MZ Browser": "mz",
                "NAVER Whale Browser": "naver",
                Opera: "opera",
                "Opera Coast": "opera_coast",
                PhantomJS: "phantomjs",
                Puffin: "puffin",
                QupZilla: "qupzilla",
                QQ: "qq",
                QQLite: "qqlite",
                Safari: "safari",
                Sailfish: "sailfish",
                "Samsung Internet for Android": "samsung_internet",
                SeaMonkey: "seamonkey",
                Sleipnir: "sleipnir",
                Swing: "swing",
                Tizen: "tizen",
                "UC Browser": "uc",
                Vivaldi: "vivaldi",
                "WebOS Browser": "webos",
                WeChat: "wechat",
                "Yandex Browser": "yandex",
                Roku: "roku"
            };
            t.BROWSER_MAP = {
                amazon_silk: "Amazon Silk",
                android: "Android Browser",
                bada: "Bada",
                blackberry: "BlackBerry",
                chrome: "Chrome",
                chromium: "Chromium",
                electron: "Electron",
                epiphany: "Epiphany",
                firefox: "Firefox",
                focus: "Focus",
                generic: "Generic",
                googlebot: "Googlebot",
                google_search: "Google Search",
                ie: "Internet Explorer",
                k_meleon: "K-Meleon",
                maxthon: "Maxthon",
                edge: "Microsoft Edge",
                mz: "MZ Browser",
                naver: "NAVER Whale Browser",
                opera: "Opera",
                opera_coast: "Opera Coast",
                phantomjs: "PhantomJS",
                puffin: "Puffin",
                qupzilla: "QupZilla",
                qq: "QQ Browser",
                qqlite: "QQ Browser Lite",
                safari: "Safari",
                sailfish: "Sailfish",
                samsung_internet: "Samsung Internet for Android",
                seamonkey: "SeaMonkey",
                sleipnir: "Sleipnir",
                swing: "Swing",
                tizen: "Tizen",
                uc: "UC Browser",
                vivaldi: "Vivaldi",
                webos: "WebOS Browser",
                wechat: "WeChat",
                yandex: "Yandex Browser"
            };
            t.PLATFORMS_MAP = {
                tablet: "tablet",
                mobile: "mobile",
                desktop: "desktop",
                tv: "tv"
            };
            t.OS_MAP = {
                WindowsPhone: "Windows Phone",
                Windows: "Windows",
                MacOS: "macOS",
                iOS: "iOS",
                Android: "Android",
                WebOS: "WebOS",
                BlackBerry: "BlackBerry",
                Bada: "Bada",
                Tizen: "Tizen",
                Linux: "Linux",
                ChromeOS: "Chrome OS",
                PlayStation4: "PlayStation 4",
                Roku: "Roku"
            };
            t.ENGINE_MAP = {
                EdgeHTML: "EdgeHTML",
                Blink: "Blink",
                Trident: "Trident",
                Presto: "Presto",
                Gecko: "Gecko",
                WebKit: "WebKit"
            };
        },
        90: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(91)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            function a(e, t) {
                for(var r = 0; r < t.length; r++){
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
                }
            }
            var o = function() {
                function e() {}
                var t, r, n;
                return e.getParser = function(e, t) {
                    if (void 0 === t && (t = !1), "string" != typeof e) throw new Error("UserAgent should be a string");
                    return new i.default(e, t);
                }, e.parse = function(e) {
                    return new i.default(e).getResult();
                }, t = e, n = [
                    {
                        key: "BROWSER_MAP",
                        get: function() {
                            return s.BROWSER_MAP;
                        }
                    },
                    {
                        key: "ENGINE_MAP",
                        get: function() {
                            return s.ENGINE_MAP;
                        }
                    },
                    {
                        key: "OS_MAP",
                        get: function() {
                            return s.OS_MAP;
                        }
                    },
                    {
                        key: "PLATFORMS_MAP",
                        get: function() {
                            return s.PLATFORMS_MAP;
                        }
                    }
                ], r = null, n && a(t, n), e;
            }();
            t.default = o, e.exports = t.default;
        },
        91: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n = u(r(92)), i = u(r(93)), s = u(r(94)), a = u(r(95)), o = u(r(17));
            function u(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            var d = function() {
                function e(e, t) {
                    if (void 0 === t && (t = !1), null == e || "" === e) throw new Error("UserAgent parameter can't be empty");
                    this._ua = e, this.parsedResult = {}, !0 !== t && this.parse();
                }
                var t = e.prototype;
                return t.getUA = function() {
                    return this._ua;
                }, t.test = function(e) {
                    return e.test(this._ua);
                }, t.parseBrowser = function() {
                    var e = this;
                    this.parsedResult.browser = {};
                    var t = o.default.find(n.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.browser = t.describe(this.getUA())), this.parsedResult.browser;
                }, t.getBrowser = function() {
                    return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser();
                }, t.getBrowserName = function(e) {
                    return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || "";
                }, t.getBrowserVersion = function() {
                    return this.getBrowser().version;
                }, t.getOS = function() {
                    return this.parsedResult.os ? this.parsedResult.os : this.parseOS();
                }, t.parseOS = function() {
                    var e = this;
                    this.parsedResult.os = {};
                    var t = o.default.find(i.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.os = t.describe(this.getUA())), this.parsedResult.os;
                }, t.getOSName = function(e) {
                    var t = this.getOS().name;
                    return e ? String(t).toLowerCase() || "" : t || "";
                }, t.getOSVersion = function() {
                    return this.getOS().version;
                }, t.getPlatform = function() {
                    return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform();
                }, t.getPlatformType = function(e) {
                    void 0 === e && (e = !1);
                    var t = this.getPlatform().type;
                    return e ? String(t).toLowerCase() || "" : t || "";
                }, t.parsePlatform = function() {
                    var e = this;
                    this.parsedResult.platform = {};
                    var t = o.default.find(s.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.platform = t.describe(this.getUA())), this.parsedResult.platform;
                }, t.getEngine = function() {
                    return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine();
                }, t.getEngineName = function(e) {
                    return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || "";
                }, t.parseEngine = function() {
                    var e = this;
                    this.parsedResult.engine = {};
                    var t = o.default.find(a.default, function(t) {
                        if ("function" == typeof t.test) return t.test(e);
                        if (t.test instanceof Array) return t.test.some(function(t) {
                            return e.test(t);
                        });
                        throw new Error("Browser's test function is not valid");
                    });
                    return t && (this.parsedResult.engine = t.describe(this.getUA())), this.parsedResult.engine;
                }, t.parse = function() {
                    return this.parseBrowser(), this.parseOS(), this.parsePlatform(), this.parseEngine(), this;
                }, t.getResult = function() {
                    return o.default.assign({}, this.parsedResult);
                }, t.satisfies = function(e) {
                    var t = this, r = {}, n = 0, i = {}, s = 0;
                    if (Object.keys(e).forEach(function(t) {
                        var a = e[t];
                        "string" == typeof a ? (i[t] = a, s += 1) : "object" == typeof a && (r[t] = a, n += 1);
                    }), n > 0) {
                        var a = Object.keys(r), u = o.default.find(a, function(e) {
                            return t.isOS(e);
                        });
                        if (u) {
                            var d = this.satisfies(r[u]);
                            if (void 0 !== d) return d;
                        }
                        var c = o.default.find(a, function(e) {
                            return t.isPlatform(e);
                        });
                        if (c) {
                            var f = this.satisfies(r[c]);
                            if (void 0 !== f) return f;
                        }
                    }
                    if (s > 0) {
                        var l = Object.keys(i), h = o.default.find(l, function(e) {
                            return t.isBrowser(e, !0);
                        });
                        if (void 0 !== h) return this.compareVersion(i[h]);
                    }
                }, t.isBrowser = function(e, t) {
                    void 0 === t && (t = !1);
                    var r = this.getBrowserName().toLowerCase(), n = e.toLowerCase(), i = o.default.getBrowserTypeByAlias(n);
                    return t && i && (n = i.toLowerCase()), n === r;
                }, t.compareVersion = function(e) {
                    var t = [
                        0
                    ], r = e, n = !1, i = this.getBrowserVersion();
                    if ("string" == typeof i) return ">" === e[0] || "<" === e[0] ? (r = e.substr(1), "=" === e[1] ? (n = !0, r = e.substr(2)) : t = [], ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? r = e.substr(1) : "~" === e[0] && (n = !0, r = e.substr(1)), t.indexOf(o.default.compareVersions(i, r, n)) > -1;
                }, t.isOS = function(e) {
                    return this.getOSName(!0) === String(e).toLowerCase();
                }, t.isPlatform = function(e) {
                    return this.getPlatformType(!0) === String(e).toLowerCase();
                }, t.isEngine = function(e) {
                    return this.getEngineName(!0) === String(e).toLowerCase();
                }, t.is = function(e, t) {
                    return void 0 === t && (t = !1), this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e);
                }, t.some = function(e) {
                    var t = this;
                    return void 0 === e && (e = []), e.some(function(e) {
                        return t.is(e);
                    });
                }, e;
            }();
            t.default = d, e.exports = t.default;
        },
        92: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            };
            var s = /version\/(\d+(\.?_?\d+)+)/i, a = [
                {
                    test: [
                        /googlebot/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Googlebot"
                        }, r = i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /opera/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /opr\/|opios/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera"
                        }, r = i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /SamsungBrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Samsung Internet for Android"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /Whale/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "NAVER Whale Browser"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /MZBrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "MZ Browser"
                        }, r = i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /focus/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Focus"
                        }, r = i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /swing/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Swing"
                        }, r = i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /coast/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera Coast"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /opt\/\d+(?:.?_?\d+)+/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Opera Touch"
                        }, r = i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /yabrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Yandex Browser"
                        }, r = i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /ucbrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "UC Browser"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /Maxthon|mxios/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Maxthon"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /epiphany/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Epiphany"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /puffin/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Puffin"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /sleipnir/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Sleipnir"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /k-meleon/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "K-Meleon"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /micromessenger/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "WeChat"
                        }, r = i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /qqbrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
                        }, r = i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /msie|trident/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Internet Explorer"
                        }, r = i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /\sedg\//i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Microsoft Edge"
                        }, r = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /edg([ea]|ios)/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Microsoft Edge"
                        }, r = i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /vivaldi/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Vivaldi"
                        }, r = i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /seamonkey/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "SeaMonkey"
                        }, r = i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /sailfish/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Sailfish"
                        }, r = i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /silk/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Amazon Silk"
                        }, r = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /phantom/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "PhantomJS"
                        }, r = i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /slimerjs/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "SlimerJS"
                        }, r = i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /blackberry|\bbb\d+/i,
                        /rim\stablet/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "BlackBerry"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /(web|hpw)[o0]s/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "WebOS Browser"
                        }, r = i.default.getFirstMatch(s, e) || i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /bada/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Bada"
                        }, r = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /tizen/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Tizen"
                        }, r = i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /qupzilla/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "QupZilla"
                        }, r = i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /firefox|iceweasel|fxios/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Firefox"
                        }, r = i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /electron/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Electron"
                        }, r = i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /MiuiBrowser/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Miui"
                        }, r = i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /chromium/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Chromium"
                        }, r = i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /chrome|crios|crmo/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Chrome"
                        }, r = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /GSA/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Google Search"
                        }, r = i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: function(e) {
                        var t = !e.test(/like android/i), r = e.test(/android/i);
                        return t && r;
                    },
                    describe: function(e) {
                        var t = {
                            name: "Android Browser"
                        }, r = i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /playstation 4/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "PlayStation 4"
                        }, r = i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /safari|applewebkit/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: "Safari"
                        }, r = i.default.getFirstMatch(s, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /.*/i
                    ],
                    describe: function(e) {
                        var t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
                        return {
                            name: i.default.getFirstMatch(t, e),
                            version: i.default.getSecondMatch(t, e)
                        };
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        },
        93: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            var a = [
                {
                    test: [
                        /Roku\/DVP/
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
                        return {
                            name: s.OS_MAP.Roku,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /windows phone/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.WindowsPhone,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /windows /i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e), r = i.default.getWindowsVersionName(t);
                        return {
                            name: s.OS_MAP.Windows,
                            version: t,
                            versionName: r
                        };
                    }
                },
                {
                    test: [
                        /Macintosh(.*?) FxiOS(.*?)\//
                    ],
                    describe: function(e) {
                        var t = {
                            name: s.OS_MAP.iOS
                        }, r = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /macintosh/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, "."), r = i.default.getMacOSVersionName(t), n = {
                            name: s.OS_MAP.MacOS,
                            version: t
                        };
                        return r && (n.versionName = r), n;
                    }
                },
                {
                    test: [
                        /(ipod|iphone|ipad)/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
                        return {
                            name: s.OS_MAP.iOS,
                            version: t
                        };
                    }
                },
                {
                    test: function(e) {
                        var t = !e.test(/like android/i), r = e.test(/android/i);
                        return t && r;
                    },
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e), r = i.default.getAndroidVersionName(t), n = {
                            name: s.OS_MAP.Android,
                            version: t
                        };
                        return r && (n.versionName = r), n;
                    }
                },
                {
                    test: [
                        /(web|hpw)[o0]s/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e), r = {
                            name: s.OS_MAP.WebOS
                        };
                        return t && t.length && (r.version = t), r;
                    }
                },
                {
                    test: [
                        /blackberry|\bbb\d+/i,
                        /rim\stablet/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || i.default.getFirstMatch(/\bbb(\d+)/i, e);
                        return {
                            name: s.OS_MAP.BlackBerry,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /bada/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.Bada,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /tizen/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.Tizen,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /linux/i
                    ],
                    describe: function() {
                        return {
                            name: s.OS_MAP.Linux
                        };
                    }
                },
                {
                    test: [
                        /CrOS/
                    ],
                    describe: function() {
                        return {
                            name: s.OS_MAP.ChromeOS
                        };
                    }
                },
                {
                    test: [
                        /PlayStation 4/
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
                        return {
                            name: s.OS_MAP.PlayStation4,
                            version: t
                        };
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        },
        94: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            var a = [
                {
                    test: [
                        /googlebot/i
                    ],
                    describe: function() {
                        return {
                            type: "bot",
                            vendor: "Google"
                        };
                    }
                },
                {
                    test: [
                        /huawei/i
                    ],
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/(can-l01)/i, e) && "Nova", r = {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Huawei"
                        };
                        return t && (r.model = t), r;
                    }
                },
                {
                    test: [
                        /nexus\s*(?:7|8|9|10).*/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Nexus"
                        };
                    }
                },
                {
                    test: [
                        /ipad/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Apple",
                            model: "iPad"
                        };
                    }
                },
                {
                    test: [
                        /Macintosh(.*?) FxiOS(.*?)\//
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Apple",
                            model: "iPad"
                        };
                    }
                },
                {
                    test: [
                        /kftt build/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Amazon",
                            model: "Kindle Fire HD 7"
                        };
                    }
                },
                {
                    test: [
                        /silk/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet,
                            vendor: "Amazon"
                        };
                    }
                },
                {
                    test: [
                        /tablet(?! pc)/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet
                        };
                    }
                },
                {
                    test: function(e) {
                        var t = e.test(/ipod|iphone/i), r = e.test(/like (ipod|iphone)/i);
                        return t && !r;
                    },
                    describe: function(e) {
                        var t = i.default.getFirstMatch(/(ipod|iphone)/i, e);
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Apple",
                            model: t
                        };
                    }
                },
                {
                    test: [
                        /nexus\s*[0-6].*/i,
                        /galaxy nexus/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Nexus"
                        };
                    }
                },
                {
                    test: [
                        /[^-]mobi/i
                    ],
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile
                        };
                    }
                },
                {
                    test: function(e) {
                        return "blackberry" === e.getBrowserName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "BlackBerry"
                        };
                    }
                },
                {
                    test: function(e) {
                        return "bada" === e.getBrowserName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile
                        };
                    }
                },
                {
                    test: function(e) {
                        return "windows phone" === e.getBrowserName();
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile,
                            vendor: "Microsoft"
                        };
                    }
                },
                {
                    test: function(e) {
                        var t = Number(String(e.getOSVersion()).split(".")[0]);
                        return "android" === e.getOSName(!0) && t >= 3;
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tablet
                        };
                    }
                },
                {
                    test: function(e) {
                        return "android" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.mobile
                        };
                    }
                },
                {
                    test: function(e) {
                        return "macos" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.desktop,
                            vendor: "Apple"
                        };
                    }
                },
                {
                    test: function(e) {
                        return "windows" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.desktop
                        };
                    }
                },
                {
                    test: function(e) {
                        return "linux" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.desktop
                        };
                    }
                },
                {
                    test: function(e) {
                        return "playstation 4" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tv
                        };
                    }
                },
                {
                    test: function(e) {
                        return "roku" === e.getOSName(!0);
                    },
                    describe: function() {
                        return {
                            type: s.PLATFORMS_MAP.tv
                        };
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        },
        95: function(e, t, r) {
            "use strict";
            t.__esModule = !0, t.default = void 0;
            var n, i = (n = r(17)) && n.__esModule ? n : {
                default: n
            }, s = r(18);
            var a = [
                {
                    test: function(e) {
                        return "microsoft edge" === e.getBrowserName(!0);
                    },
                    describe: function(e) {
                        if (/\sedg\//i.test(e)) return {
                            name: s.ENGINE_MAP.Blink
                        };
                        var t = i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
                        return {
                            name: s.ENGINE_MAP.EdgeHTML,
                            version: t
                        };
                    }
                },
                {
                    test: [
                        /trident/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.Trident
                        }, r = i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: function(e) {
                        return e.test(/presto/i);
                    },
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.Presto
                        }, r = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: function(e) {
                        var t = e.test(/gecko/i), r = e.test(/like gecko/i);
                        return t && !r;
                    },
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.Gecko
                        }, r = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                },
                {
                    test: [
                        /(apple)?webkit\/537\.36/i
                    ],
                    describe: function() {
                        return {
                            name: s.ENGINE_MAP.Blink
                        };
                    }
                },
                {
                    test: [
                        /(apple)?webkit/i
                    ],
                    describe: function(e) {
                        var t = {
                            name: s.ENGINE_MAP.WebKit
                        }, r = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                        return r && (t.version = r), t;
                    }
                }
            ];
            t.default = a, e.exports = t.default;
        }
    });
});

},{}],"iKSys":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("4eb893c8a73768aa");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chooseMethod = chooseMethod;
var _native = _interopRequireDefault(require("7576738ebdb92c7e"));
var _indexedDb = _interopRequireDefault(require("75bca71e8c76dec8"));
var _localstorage = _interopRequireDefault(require("fdf6fa23b06aee2"));
var _server = _interopRequireDefault(require("e6c8bbbff6289b16"));
var _simulate = _interopRequireDefault(require("cb77a40d7f9c21ef"));
// order is important
var METHODS = [
    _native["default"],
    // fastest
    _indexedDb["default"],
    _localstorage["default"],
    _server["default"]
];
function chooseMethod(options) {
    var chooseMethods = [].concat(options.methods, METHODS).filter(Boolean);
    // directly chosen
    if (options.type) {
        if (options.type === "simulate") // only use simulate-method if directly chosen
        return _simulate["default"];
        var ret = chooseMethods.find(function(m) {
            return m.type === options.type;
        });
        if (!ret) throw new Error("method-type " + options.type + " not found");
        else return ret;
    }
    /**
   * if no webworker support is needed,
   * remove idb from the list so that localstorage is been chosen
   */ if (!options.webWorkerSupport) chooseMethods = chooseMethods.filter(function(m) {
        return m.type !== "idb";
    });
    var useMethod = chooseMethods.find(function(method) {
        return method.canBeUsed(options);
    });
    if (!useMethod) throw new Error("No useable method found in " + JSON.stringify(METHODS.map(function(m) {
        return m.type;
    })));
    else return useMethod;
}

},{"4eb893c8a73768aa":"7XM86","7576738ebdb92c7e":"eazBA","75bca71e8c76dec8":"6sbwl","fdf6fa23b06aee2":"ccd07","e6c8bbbff6289b16":"9vcYN","cb77a40d7f9c21ef":"4Hia8"}],"eazBA":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.averageResponseTime = averageResponseTime;
exports.canBeUsed = canBeUsed;
exports.close = close;
exports.create = create;
exports.microSeconds = exports["default"] = void 0;
exports.onMessage = onMessage;
exports.postMessage = postMessage;
exports.type = void 0;
var _util = require("eed2d3a9d8f9841");
var microSeconds = _util.microSeconds;
exports.microSeconds = microSeconds;
var type = "native";
exports.type = type;
function create(channelName) {
    var state = {
        messagesCallback: null,
        bc: new BroadcastChannel(channelName),
        subFns: [] // subscriberFunctions
    };
    state.bc.onmessage = function(msg) {
        if (state.messagesCallback) state.messagesCallback(msg.data);
    };
    return state;
}
function close(channelState) {
    channelState.bc.close();
    channelState.subFns = [];
}
function postMessage(channelState, messageJson) {
    try {
        channelState.bc.postMessage(messageJson, false);
        return _util.PROMISE_RESOLVED_VOID;
    } catch (err) {
        return Promise.reject(err);
    }
}
function onMessage(channelState, fn) {
    channelState.messagesCallback = fn;
}
function canBeUsed(options) {
    /**
   * in the electron-renderer, isNode will be true even if we are in browser-context
   * so we also check if window is undefined
   */ if (typeof window === "undefined") return false;
    if (!options.support3PC) return false;
    if (typeof BroadcastChannel === "function") {
        if (BroadcastChannel._pubkey) throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");
        return true;
    } else return false;
}
function averageResponseTime() {
    return 150;
}
var _default = {
    create: create,
    close: close,
    onMessage: onMessage,
    postMessage: postMessage,
    canBeUsed: canBeUsed,
    type: type,
    averageResponseTime: averageResponseTime,
    microSeconds: microSeconds
};
exports["default"] = _default;

},{"eed2d3a9d8f9841":"4YTFM"}],"6sbwl":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TRANSACTION_SETTINGS = void 0;
exports.averageResponseTime = averageResponseTime;
exports.canBeUsed = canBeUsed;
exports.cleanOldMessages = cleanOldMessages;
exports.close = close;
exports.commitIndexedDBTransaction = commitIndexedDBTransaction;
exports.create = create;
exports.createDatabase = createDatabase;
exports["default"] = void 0;
exports.getAllMessages = getAllMessages;
exports.getIdb = getIdb;
exports.getMessagesHigherThan = getMessagesHigherThan;
exports.getOldMessages = getOldMessages;
exports.microSeconds = void 0;
exports.onMessage = onMessage;
exports.postMessage = postMessage;
exports.removeMessagesById = removeMessagesById;
exports.type = void 0;
exports.writeMessage = writeMessage;
var _util = require("dc3cc1f8537ecc7e");
var _obliviousSet = require("389a3a22c4cb480b");
var _options = require("82360540f584da50");
/**
 * this method uses indexeddb to store the messages
 * There is currently no observerAPI for idb
 * @link https://github.com/w3c/IndexedDB/issues/51
 *
 * When working on this, ensure to use these performance optimizations:
 * @link https://rxdb.info/slow-indexeddb.html
 */ var microSeconds = _util.microSeconds;
exports.microSeconds = microSeconds;
var DB_PREFIX = "pubkey.broadcast-channel-0-";
var OBJECT_STORE_ID = "messages";
/**
 * Use relaxed durability for faster performance on all transactions.
 * @link https://nolanlawson.com/2021/08/22/speeding-up-indexeddb-reads-and-writes/
 */ var TRANSACTION_SETTINGS = {
    durability: "relaxed"
};
exports.TRANSACTION_SETTINGS = TRANSACTION_SETTINGS;
var type = "idb";
exports.type = type;
function getIdb() {
    if (typeof indexedDB !== "undefined") return indexedDB;
    if (typeof window !== "undefined") {
        if (typeof window.mozIndexedDB !== "undefined") return window.mozIndexedDB;
        if (typeof window.webkitIndexedDB !== "undefined") return window.webkitIndexedDB;
        if (typeof window.msIndexedDB !== "undefined") return window.msIndexedDB;
    }
    return false;
}
/**
 * If possible, we should explicitly commit IndexedDB transactions
 * for better performance.
 * @link https://nolanlawson.com/2021/08/22/speeding-up-indexeddb-reads-and-writes/
 */ function commitIndexedDBTransaction(tx) {
    if (tx.commit) tx.commit();
}
function createDatabase(channelName) {
    var IndexedDB = getIdb();
    // create table
    var dbName = DB_PREFIX + channelName;
    /**
   * All IndexedDB databases are opened without version
   * because it is a bit faster, especially on firefox
   * @link http://nparashuram.com/IndexedDB/perf/#Open%20Database%20with%20version
   */ var openRequest = IndexedDB.open(dbName);
    openRequest.onupgradeneeded = function(ev) {
        var db = ev.target.result;
        db.createObjectStore(OBJECT_STORE_ID, {
            keyPath: "id",
            autoIncrement: true
        });
    };
    var dbPromise = new Promise(function(res, rej) {
        openRequest.onerror = function(ev) {
            return rej(ev);
        };
        openRequest.onsuccess = function() {
            res(openRequest.result);
        };
    });
    return dbPromise;
}
/**
 * writes the new message to the database
 * so other readers can find it
 */ function writeMessage(db, readerUuid, messageJson) {
    var time = new Date().getTime();
    var writeObject = {
        uuid: readerUuid,
        time: time,
        data: messageJson
    };
    var tx = db.transaction([
        OBJECT_STORE_ID
    ], "readwrite", TRANSACTION_SETTINGS);
    return new Promise(function(res, rej) {
        tx.oncomplete = function() {
            return res();
        };
        tx.onerror = function(ev) {
            return rej(ev);
        };
        var objectStore = tx.objectStore(OBJECT_STORE_ID);
        objectStore.add(writeObject);
        commitIndexedDBTransaction(tx);
    });
}
function getAllMessages(db) {
    var tx = db.transaction(OBJECT_STORE_ID, "readonly", TRANSACTION_SETTINGS);
    var objectStore = tx.objectStore(OBJECT_STORE_ID);
    var ret = [];
    return new Promise(function(res) {
        objectStore.openCursor().onsuccess = function(ev) {
            var cursor = ev.target.result;
            if (cursor) {
                ret.push(cursor.value);
                //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
                cursor["continue"]();
            } else {
                commitIndexedDBTransaction(tx);
                res(ret);
            }
        };
    });
}
function getMessagesHigherThan(db, lastCursorId) {
    var tx = db.transaction(OBJECT_STORE_ID, "readonly", TRANSACTION_SETTINGS);
    var objectStore = tx.objectStore(OBJECT_STORE_ID);
    var ret = [];
    var keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
    /**
   * Optimization shortcut,
   * if getAll() can be used, do not use a cursor.
   * @link https://rxdb.info/slow-indexeddb.html
   */ if (objectStore.getAll) {
        var getAllRequest = objectStore.getAll(keyRangeValue);
        return new Promise(function(res, rej) {
            getAllRequest.onerror = function(err) {
                return rej(err);
            };
            getAllRequest.onsuccess = function(e) {
                res(e.target.result);
            };
        });
    }
    function openCursor() {
        // Occasionally Safari will fail on IDBKeyRange.bound, this
        // catches that error, having it open the cursor to the first
        // item. When it gets data it will advance to the desired key.
        try {
            keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
            return objectStore.openCursor(keyRangeValue);
        } catch (e) {
            return objectStore.openCursor();
        }
    }
    return new Promise(function(res, rej) {
        var openCursorRequest = openCursor();
        openCursorRequest.onerror = function(err) {
            return rej(err);
        };
        openCursorRequest.onsuccess = function(ev) {
            var cursor = ev.target.result;
            if (cursor) {
                if (cursor.value.id < lastCursorId + 1) cursor["continue"](lastCursorId + 1);
                else {
                    ret.push(cursor.value);
                    cursor["continue"]();
                }
            } else {
                commitIndexedDBTransaction(tx);
                res(ret);
            }
        };
    });
}
function removeMessagesById(db, ids) {
    var tx = db.transaction([
        OBJECT_STORE_ID
    ], "readwrite", TRANSACTION_SETTINGS);
    var objectStore = tx.objectStore(OBJECT_STORE_ID);
    return Promise.all(ids.map(function(id) {
        var deleteRequest = objectStore["delete"](id);
        return new Promise(function(res) {
            deleteRequest.onsuccess = function() {
                return res();
            };
        });
    }));
}
function getOldMessages(db, ttl) {
    var olderThen = new Date().getTime() - ttl;
    var tx = db.transaction(OBJECT_STORE_ID, "readonly", TRANSACTION_SETTINGS);
    var objectStore = tx.objectStore(OBJECT_STORE_ID);
    var ret = [];
    return new Promise(function(res) {
        objectStore.openCursor().onsuccess = function(ev) {
            var cursor = ev.target.result;
            if (cursor) {
                var msgObk = cursor.value;
                if (msgObk.time < olderThen) {
                    ret.push(msgObk);
                    //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
                    cursor["continue"]();
                } else {
                    // no more old messages,
                    commitIndexedDBTransaction(tx);
                    res(ret);
                    return;
                }
            } else res(ret);
        };
    });
}
function cleanOldMessages(db, ttl) {
    return getOldMessages(db, ttl).then(function(tooOld) {
        return removeMessagesById(db, tooOld.map(function(msg) {
            return msg.id;
        }));
    });
}
function create(channelName, options) {
    options = (0, _options.fillOptionsWithDefaults)(options);
    return createDatabase(channelName).then(function(db) {
        var state = {
            closed: false,
            lastCursorId: 0,
            channelName: channelName,
            options: options,
            uuid: (0, _util.randomToken)(),
            /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */ eMIs: new _obliviousSet.ObliviousSet(options.idb.ttl * 2),
            // ensures we do not read messages in parrallel
            writeBlockPromise: _util.PROMISE_RESOLVED_VOID,
            messagesCallback: null,
            readQueuePromises: [],
            db: db
        };
        /**
     * Handle abrupt closes that do not originate from db.close().
     * This could happen, for example, if the underlying storage is
     * removed or if the user clears the database in the browser's
     * history preferences.
     */ db.onclose = function() {
            state.closed = true;
            if (options.idb.onclose) options.idb.onclose();
        };
        /**
     * if service-workers are used,
     * we have no 'storage'-event if they post a message,
     * therefore we also have to set an interval
     */ _readLoop(state);
        return state;
    });
}
function _readLoop(state) {
    if (state.closed) return;
    readNewMessages(state).then(function() {
        return (0, _util.sleep)(state.options.idb.fallbackInterval);
    }).then(function() {
        return _readLoop(state);
    });
}
function _filterMessage(msgObj, state) {
    if (msgObj.uuid === state.uuid) return false; // send by own
    if (state.eMIs.has(msgObj.id)) return false; // already emitted
    if (msgObj.data.time < state.messagesCallbackTime) return false; // older then onMessageCallback
    return true;
}
/**
 * reads all new messages from the database and emits them
 */ function readNewMessages(state) {
    // channel already closed
    if (state.closed) return _util.PROMISE_RESOLVED_VOID;
    // if no one is listening, we do not need to scan for new messages
    if (!state.messagesCallback) return _util.PROMISE_RESOLVED_VOID;
    return getMessagesHigherThan(state.db, state.lastCursorId).then(function(newerMessages) {
        var useMessages = newerMessages/**
     * there is a bug in iOS where the msgObj can be undefined some times
     * so we filter them out
     * @link https://github.com/pubkey/broadcast-channel/issues/19
     */ .filter(function(msgObj) {
            return !!msgObj;
        }).map(function(msgObj) {
            if (msgObj.id > state.lastCursorId) state.lastCursorId = msgObj.id;
            return msgObj;
        }).filter(function(msgObj) {
            return _filterMessage(msgObj, state);
        }).sort(function(msgObjA, msgObjB) {
            return msgObjA.time - msgObjB.time;
        }); // sort by time
        useMessages.forEach(function(msgObj) {
            if (state.messagesCallback) {
                state.eMIs.add(msgObj.id);
                state.messagesCallback(msgObj.data);
            }
        });
        return _util.PROMISE_RESOLVED_VOID;
    });
}
function close(channelState) {
    channelState.closed = true;
    channelState.db.close();
}
function postMessage(channelState, messageJson) {
    channelState.writeBlockPromise = channelState.writeBlockPromise.then(function() {
        return writeMessage(channelState.db, channelState.uuid, messageJson);
    }).then(function() {
        if ((0, _util.randomInt)(0, 10) === 0) /* await (do not await) */ cleanOldMessages(channelState.db, channelState.options.idb.ttl);
    });
    return channelState.writeBlockPromise;
}
function onMessage(channelState, fn, time) {
    channelState.messagesCallbackTime = time;
    channelState.messagesCallback = fn;
    readNewMessages(channelState);
}
function canBeUsed(options) {
    if (!options.support3PC) return false;
    var idb = getIdb();
    if (!idb) return false;
    return true;
}
function averageResponseTime(options) {
    return options.idb.fallbackInterval * 2;
}
var _default = {
    create: create,
    close: close,
    onMessage: onMessage,
    postMessage: postMessage,
    canBeUsed: canBeUsed,
    type: type,
    averageResponseTime: averageResponseTime,
    microSeconds: microSeconds
};
exports["default"] = _default;

},{"dc3cc1f8537ecc7e":"4YTFM","389a3a22c4cb480b":"6dDKA","82360540f584da50":"jbblO"}],"6dDKA":[function(require,module,exports) {
/**
 * this is a set which automatically forgets
 * a given entry when a new entry is set and the ttl
 * of the old one is over
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ObliviousSet", ()=>ObliviousSet);
/**
 * Removes all entries from the set
 * where the TTL has expired
 */ parcelHelpers.export(exports, "removeTooOldValues", ()=>removeTooOldValues);
parcelHelpers.export(exports, "now", ()=>now);
var ObliviousSet = /** @class */ function() {
    function ObliviousSet(ttl) {
        this.ttl = ttl;
        this.map = new Map();
        /**
         * Creating calls to setTimeout() is expensive,
         * so we only do that if there is not timeout already open.
         */ this._to = false;
    }
    ObliviousSet.prototype.has = function(value) {
        return this.map.has(value);
    };
    ObliviousSet.prototype.add = function(value) {
        var _this = this;
        this.map.set(value, now());
        /**
         * When a new value is added,
         * start the cleanup at the next tick
         * to not block the cpu for more important stuff
         * that might happen.
         */ if (!this._to) {
            this._to = true;
            setTimeout(function() {
                _this._to = false;
                removeTooOldValues(_this);
            }, 0);
        }
    };
    ObliviousSet.prototype.clear = function() {
        this.map.clear();
    };
    return ObliviousSet;
}();
function removeTooOldValues(obliviousSet) {
    var olderThen = now() - obliviousSet.ttl;
    var iterator = obliviousSet.map[Symbol.iterator]();
    /**
     * Because we can assume the new values are added at the bottom,
     * we start from the top and stop as soon as we reach a non-too-old value.
     */ while(true){
        var next = iterator.next().value;
        if (!next) return; // no more elements
        var value = next[0];
        var time = next[1];
        if (time < olderThen) obliviousSet.map.delete(value);
        else // We reached a value that is not old enough
        return;
    }
}
function now() {
    return new Date().getTime();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jbblO":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fillOptionsWithDefaults = fillOptionsWithDefaults;
var _util = require("c992ddc136de3a71");
function fillOptionsWithDefaults() {
    var originalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = JSON.parse(JSON.stringify(originalOptions));
    if (typeof options.support3PC === "undefined") options.support3PC = (0, _util.are3PCSupported)();
    // main
    if (typeof options.webWorkerSupport === "undefined") options.webWorkerSupport = true;
    // indexed-db
    if (!options.idb) options.idb = {};
    //  after this time the messages get deleted
    if (!options.idb.ttl) options.idb.ttl = 45000;
    if (!options.idb.fallbackInterval) options.idb.fallbackInterval = 150;
    //  handles abrupt db onclose events.
    if (originalOptions.idb && typeof originalOptions.idb.onclose === "function") options.idb.onclose = originalOptions.idb.onclose;
    // localstorage
    if (!options.localstorage) options.localstorage = {};
    if (!options.localstorage.removeTimeout) options.localstorage.removeTimeout = 60000;
    // server
    if (!options.server) options.server = {};
    if (!options.server.url) options.server.url = "https://broadcast-server.tor.us";
    if (!options.server.removeTimeout) options.server.removeTimeout = 300000; // 5 minutes
    // custom methods
    if (originalOptions.methods) options.methods = originalOptions.methods;
    return options;
}

},{"c992ddc136de3a71":"4YTFM"}],"ccd07":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addStorageEventListener = addStorageEventListener;
exports.averageResponseTime = averageResponseTime;
exports.canBeUsed = canBeUsed;
exports.close = close;
exports.create = create;
exports["default"] = void 0;
exports.getLocalStorage = getLocalStorage;
exports.microSeconds = void 0;
exports.onMessage = onMessage;
exports.postMessage = postMessage;
exports.removeStorageEventListener = removeStorageEventListener;
exports.storageKey = storageKey;
exports.type = void 0;
var _obliviousSet = require("6e7c2c04ec8a89a7");
var _options = require("624bdf9a13bad2a0");
var _util = require("7946210a069fe254");
/**
 * A localStorage-only method which uses localstorage and its 'storage'-event
 * This does not work inside of webworkers because they have no access to locastorage
 * This is basically implemented to support IE9 or your grandmothers toaster.
 * @link https://caniuse.com/#feat=namevalue-storage
 * @link https://caniuse.com/#feat=indexeddb
 */ var microSeconds = _util.microSeconds;
exports.microSeconds = microSeconds;
var KEY_PREFIX = "pubkey.broadcastChannel-";
var type = "localstorage";
/**
 * copied from crosstab
 * @link https://github.com/tejacques/crosstab/blob/master/src/crosstab.js#L32
 */ exports.type = type;
function getLocalStorage() {
    var localStorage;
    if (typeof window === "undefined") return null;
    try {
        localStorage = window.localStorage;
        localStorage = window["ie8-eventlistener/storage"] || window.localStorage;
    } catch (e) {
    // New versions of Firefox throw a Security exception
    // if cookies are disabled. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
    }
    return localStorage;
}
function storageKey(channelName) {
    return KEY_PREFIX + channelName;
}
/**
 * writes the new message to the storage
 * and fires the storage-event so other readers can find it
 */ function postMessage(channelState, messageJson) {
    return new Promise(function(res) {
        (0, _util.sleep)().then(function() {
            var key = storageKey(channelState.channelName);
            var writeObj = {
                token: (0, _util.randomToken)(),
                time: new Date().getTime(),
                data: messageJson,
                uuid: channelState.uuid
            };
            var value = JSON.stringify(writeObj);
            getLocalStorage().setItem(key, value);
            /**
       * StorageEvent does not fire the 'storage' event
       * in the window that changes the state of the local storage.
       * So we fire it manually
       */ var ev = document.createEvent("Event");
            ev.initEvent("storage", true, true);
            ev.key = key;
            ev.newValue = value;
            window.dispatchEvent(ev);
            res();
        });
    });
}
function addStorageEventListener(channelName, fn) {
    var key = storageKey(channelName);
    var listener = function listener(ev) {
        if (ev.key === key) fn(JSON.parse(ev.newValue));
    };
    window.addEventListener("storage", listener);
    return listener;
}
function removeStorageEventListener(listener) {
    window.removeEventListener("storage", listener);
}
function create(channelName, options) {
    options = (0, _options.fillOptionsWithDefaults)(options);
    if (!canBeUsed(options)) throw new Error("BroadcastChannel: localstorage cannot be used");
    var uuid = (0, _util.randomToken)();
    /**
   * eMIs
   * contains all messages that have been emitted before
   * @type {ObliviousSet}
   */ var eMIs = new _obliviousSet.ObliviousSet(options.localstorage.removeTimeout);
    var state = {
        channelName: channelName,
        uuid: uuid,
        eMIs: eMIs // emittedMessagesIds
    };
    state.listener = addStorageEventListener(channelName, function(msgObj) {
        if (!state.messagesCallback) return; // no listener
        if (msgObj.uuid === uuid) return; // own message
        if (!msgObj.token || eMIs.has(msgObj.token)) return; // already emitted
        if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old
        eMIs.add(msgObj.token);
        state.messagesCallback(msgObj.data);
    });
    return state;
}
function close(channelState) {
    removeStorageEventListener(channelState.listener);
}
function onMessage(channelState, fn, time) {
    channelState.messagesCallbackTime = time;
    channelState.messagesCallback = fn;
}
function canBeUsed(options) {
    if (!options.support3PC) return false;
    var ls = getLocalStorage();
    if (!ls) return false;
    try {
        var key = "__broadcastchannel_check";
        ls.setItem(key, "works");
        ls.removeItem(key);
    } catch (e) {
        // Safari 10 in private mode will not allow write access to local
        // storage and fail with a QuotaExceededError. See
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#Private_Browsing_Incognito_modes
        return false;
    }
    return true;
}
function averageResponseTime() {
    var defaultTime = 120;
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("safari") && !userAgent.includes("chrome")) // safari is much slower so this time is higher
    return defaultTime * 2;
    return defaultTime;
}
var _default = {
    create: create,
    close: close,
    onMessage: onMessage,
    postMessage: postMessage,
    canBeUsed: canBeUsed,
    type: type,
    averageResponseTime: averageResponseTime,
    microSeconds: microSeconds
};
exports["default"] = _default;

},{"6e7c2c04ec8a89a7":"6dDKA","624bdf9a13bad2a0":"jbblO","7946210a069fe254":"4YTFM"}],"9vcYN":[function(require,module,exports) {
"use strict";
var _interopRequireDefault = require("328f94e74f75fb16");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.averageResponseTime = averageResponseTime;
exports.canBeUsed = canBeUsed;
exports.close = close;
exports.create = create;
exports["default"] = void 0;
exports.getSocketInstance = getSocketInstance;
exports.keccak256 = keccak256;
exports.microSeconds = void 0;
exports.onMessage = onMessage;
exports.postMessage = postMessage;
exports.removeStorageEventListener = removeStorageEventListener;
exports.setupSocketConnection = setupSocketConnection;
exports.storageKey = storageKey;
exports.type = void 0;
var _regenerator = _interopRequireDefault(require("ff5cbe8584ba6311"));
var _asyncToGenerator2 = _interopRequireDefault(require("d0dbff37db6bf7ef"));
var _obliviousSet = require("6eab32f509c5f3c3");
var _socket = require("53ccf1f4832e0a99");
var _eccrypto = require("ea9fdd229b6d037f");
var _metadataHelpers = require("990540ecad7819d1");
var _keccak = _interopRequireDefault(require("2532a04fab01fb8"));
var _util = require("ca97e183618e9382");
var _options = require("de6ee8a6ae79566");
/**
 * A localStorage-only method which uses localstorage and its 'storage'-event
 * This does not work inside of webworkers because they have no access to locastorage
 * This is basically implemented to support IE9 or your grandmothers toaster.
 * @link https://caniuse.com/#feat=namevalue-storage
 * @link https://caniuse.com/#feat=indexeddb
 */ var microSeconds = _util.microSeconds;
// PASS IN STRING/BUFFER TO GET BUFFER
exports.microSeconds = microSeconds;
function keccak256(a) {
    return (0, _keccak["default"])("keccak256").update(a).digest();
}
var KEY_PREFIX = "pubkey.broadcastChannel-";
var type = "server";
exports.type = type;
var SOCKET_CONN_INSTANCE = null;
// used to decide to reconnect socket e.g. when socket connection is disconnected unexpectedly
var runningChannels = new Set();
function storageKey(channelName) {
    return KEY_PREFIX + channelName;
}
/**
 * writes the new message to the storage
 * and fires the storage-event so other readers can find it
 */ function postMessage(channelState, messageJson) {
    return new Promise(function(res, rej) {
        (0, _util.sleep)().then(/*#__PURE__*/ (0, _asyncToGenerator2["default"])(/*#__PURE__*/ _regenerator["default"].mark(function _callee() {
            var key, channelEncPrivKey, encData, body;
            return _regenerator["default"].wrap(function _callee$(_context) {
                while(true)switch(_context.prev = _context.next){
                    case 0:
                        key = storageKey(channelState.channelName);
                        channelEncPrivKey = keccak256(key);
                        _context.next = 4;
                        return (0, _metadataHelpers.encryptData)(channelEncPrivKey.toString("hex"), {
                            token: (0, _util.randomToken)(),
                            time: new Date().getTime(),
                            data: messageJson,
                            uuid: channelState.uuid
                        });
                    case 4:
                        encData = _context.sent;
                        _context.t0 = (0, _eccrypto.getPublic)(channelEncPrivKey).toString("hex");
                        _context.t1 = encData;
                        _context.next = 9;
                        return (0, _eccrypto.sign)(channelEncPrivKey, keccak256(encData));
                    case 9:
                        _context.t2 = _context.sent.toString("hex");
                        body = {
                            key: _context.t0,
                            data: _context.t1,
                            signature: _context.t2
                        };
                        if (channelState.timeout) body.timeout = channelState.timeout;
                        return _context.abrupt("return", fetch(channelState.serverUrl + "/channel/set", {
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {
                                "Content-Type": "application/json; charset=utf-8"
                            }
                        }).then(res)["catch"](rej));
                    case 13:
                    case "end":
                        return _context.stop();
                }
            }, _callee);
        })));
    });
}
function getSocketInstance(serverUrl) {
    if (SOCKET_CONN_INSTANCE) return SOCKET_CONN_INSTANCE;
    var SOCKET_CONN = (0, _socket.io)(serverUrl, {
        transports: [
            "websocket",
            "polling"
        ],
        // use WebSocket first, if available
        withCredentials: true,
        reconnectionDelayMax: 10000,
        reconnectionAttempts: 10
    });
    SOCKET_CONN.on("connect_error", function(err) {
        // revert to classic upgrade
        SOCKET_CONN.io.opts.transports = [
            "polling",
            "websocket"
        ];
        _util.log.error("connect error", err);
    });
    SOCKET_CONN.on("connect", /*#__PURE__*/ (0, _asyncToGenerator2["default"])(/*#__PURE__*/ _regenerator["default"].mark(function _callee2() {
        var engine;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    engine = SOCKET_CONN.io.engine;
                    _util.log.debug("initially connected to", engine.transport.name); // in most cases, prints "polling"
                    engine.once("upgrade", function() {
                        // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
                        _util.log.debug("upgraded", engine.transport.name); // in most cases, prints "websocket"
                    });
                    engine.once("close", function(reason) {
                        // called when the underlying connection is closed
                        _util.log.debug("connection closed", reason);
                    });
                case 4:
                case "end":
                    return _context2.stop();
            }
        }, _callee2);
    })));
    SOCKET_CONN.on("error", function(err) {
        _util.log.error("socket errored", err);
        SOCKET_CONN.disconnect();
    });
    SOCKET_CONN_INSTANCE = SOCKET_CONN;
    return SOCKET_CONN;
}
function setupSocketConnection(serverUrl, channelName, fn) {
    var socketConn = getSocketInstance(serverUrl);
    var key = storageKey(channelName);
    var channelEncPrivKey = keccak256(key);
    var channelPubKey = (0, _eccrypto.getPublic)(channelEncPrivKey).toString("hex");
    if (socketConn.connected) socketConn.emit("check_auth_status", channelPubKey);
    else socketConn.once("connect", function() {
        _util.log.debug("connected with socket");
        socketConn.emit("check_auth_status", channelPubKey);
    });
    var reconnect = function reconnect() {
        socketConn.once("connect", /*#__PURE__*/ (0, _asyncToGenerator2["default"])(/*#__PURE__*/ _regenerator["default"].mark(function _callee3() {
            return _regenerator["default"].wrap(function _callee3$(_context3) {
                while(true)switch(_context3.prev = _context3.next){
                    case 0:
                        socketConn.emit("check_auth_status", channelPubKey);
                    case 1:
                    case "end":
                        return _context3.stop();
                }
            }, _callee3);
        })));
    };
    var visibilityListener = function visibilityListener() {
        // if channel is closed, then remove the listener.
        if (!socketConn) {
            document.removeEventListener("visibilitychange", visibilityListener);
            return;
        }
        // if not connected, then wait for connection and ping server for latest msg.
        if (!socketConn.connected && document.visibilityState === "visible") reconnect();
    };
    var listener = /*#__PURE__*/ function() {
        var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/ _regenerator["default"].mark(function _callee4(ev) {
            var decData;
            return _regenerator["default"].wrap(function _callee4$(_context4) {
                while(true)switch(_context4.prev = _context4.next){
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return (0, _metadataHelpers.decryptData)(channelEncPrivKey.toString("hex"), ev);
                    case 3:
                        decData = _context4.sent;
                        _util.log.info(decData);
                        fn(decData);
                        _context4.next = 11;
                        break;
                    case 8:
                        _context4.prev = 8;
                        _context4.t0 = _context4["catch"](0);
                        _util.log.error(_context4.t0);
                    case 11:
                    case "end":
                        return _context4.stop();
                }
            }, _callee4, null, [
                [
                    0,
                    8
                ]
            ]);
        }));
        return function listener(_x) {
            return _ref4.apply(this, arguments);
        };
    }();
    socketConn.on("disconnect", function() {
        _util.log.debug("socket disconnected");
        if (runningChannels.has(channelName)) {
            _util.log.error("socket disconnected unexpectedly, reconnecting socket");
            reconnect();
        }
    });
    socketConn.on(channelPubKey + "_success", listener);
    document.addEventListener("visibilitychange", visibilityListener);
    return socketConn;
}
function removeStorageEventListener() {
    if (SOCKET_CONN_INSTANCE) SOCKET_CONN_INSTANCE.disconnect();
}
function create(channelName, options) {
    options = (0, _options.fillOptionsWithDefaults)(options);
    if (!canBeUsed(options)) throw new Error("BroadcastChannel: server cannot be used");
    var uuid = (0, _util.randomToken)();
    /**
   * eMIs
   * contains all messages that have been emitted before
   * @type {ObliviousSet}
   */ var eMIs = new _obliviousSet.ObliviousSet(options.server.removeTimeout);
    var state = {
        channelName: channelName,
        uuid: uuid,
        eMIs: eMIs,
        // emittedMessagesIds
        serverUrl: options.server.url
    };
    if (options.server.timeout) state.timeout = options.server.timeout;
    setupSocketConnection(options.server.url, channelName, function(msgObj) {
        if (!state.messagesCallback) return; // no listener
        if (msgObj.uuid === state.uuid) return; // own message
        if (!msgObj.token || state.eMIs.has(msgObj.token)) return; // already emitted
        // if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old
        state.eMIs.add(msgObj.token);
        state.messagesCallback(msgObj.data);
    });
    runningChannels.add(channelName);
    return state;
}
function close(channelState) {
    runningChannels["delete"](channelState.channelName);
// give 2 sec for all msgs which are in transit to be consumed
// by receiver.
// window.setTimeout(() => {
//     removeStorageEventListener(channelState);
//     SOCKET_CONN_INSTANCE = null;
// }, 1000);
}
function onMessage(channelState, fn, time) {
    channelState.messagesCallbackTime = time;
    channelState.messagesCallback = fn;
}
function canBeUsed() {
    return true;
}
function averageResponseTime() {
    var defaultTime = 500;
    // TODO: Maybe increase it based on operation
    return defaultTime;
}
var _default = {
    create: create,
    close: close,
    onMessage: onMessage,
    postMessage: postMessage,
    canBeUsed: canBeUsed,
    type: type,
    averageResponseTime: averageResponseTime,
    microSeconds: microSeconds
};
exports["default"] = _default;

},{"328f94e74f75fb16":"7XM86","ff5cbe8584ba6311":"5nQUq","d0dbff37db6bf7ef":"jxKg8","6eab32f509c5f3c3":"6dDKA","53ccf1f4832e0a99":"8HBJR","ea9fdd229b6d037f":"3TBBg","990540ecad7819d1":"9pPU8","2532a04fab01fb8":"cOBab","ca97e183618e9382":"4YTFM","de6ee8a6ae79566":"jbblO"}],"8HBJR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Protocol version.
 *
 * @public
 */ parcelHelpers.export(exports, "protocol", ()=>(0, _socketIoParser.protocol));
/**
 * Expose constructors for standalone build.
 *
 * @public
 */ parcelHelpers.export(exports, "Manager", ()=>(0, _managerJs.Manager));
parcelHelpers.export(exports, "Socket", ()=>(0, _socketJs.Socket));
parcelHelpers.export(exports, "io", ()=>lookup);
parcelHelpers.export(exports, "connect", ()=>lookup);
parcelHelpers.export(exports, "default", ()=>lookup);
var _urlJs = require("./url.js");
var _managerJs = require("./manager.js");
var _socketJs = require("./socket.js");
var _socketIoParser = require("socket.io-parser");
/**
 * Managers cache.
 */ const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0, _urlJs.url)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) io = new (0, _managerJs.Manager)(source, opts);
    else {
        if (!cache[id]) cache[id] = new (0, _managerJs.Manager)(source, opts);
        io = cache[id];
    }
    if (parsed.query && !opts.query) opts.query = parsed.queryKey;
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: (0, _managerJs.Manager),
    Socket: (0, _socketJs.Socket),
    io: lookup,
    connect: lookup
});

},{"./url.js":"9Ze3o","./manager.js":"94vh9","./socket.js":"kbWgu","socket.io-parser":"2lQL3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Ze3o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */ parcelHelpers.export(exports, "url", ()=>url);
var _engineIoClient = require("engine.io-client");
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri) uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) uri = loc.protocol + uri;
            else uri = loc.host + uri;
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) uri = loc.protocol + "//" + uri;
            else uri = "https://" + uri;
        }
        // parse
        obj = (0, _engineIoClient.parse)(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) obj.port = "80";
        else if (/^(http|ws)s$/.test(obj.protocol)) obj.port = "443";
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}

},{"engine.io-client":"jBHFs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jBHFs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Transport", ()=>(0, _transportJs.Transport));
parcelHelpers.export(exports, "transports", ()=>(0, _indexJs.transports));
parcelHelpers.export(exports, "installTimerFunctions", ()=>(0, _utilJs.installTimerFunctions));
parcelHelpers.export(exports, "parse", ()=>(0, _parseuriJs.parse));
parcelHelpers.export(exports, "nextTick", ()=>(0, _websocketConstructorJs.nextTick));
parcelHelpers.export(exports, "Socket", ()=>(0, _socketJs.Socket));
parcelHelpers.export(exports, "protocol", ()=>protocol);
var _socketJs = require("./socket.js");
var _transportJs = require("./transport.js");
var _indexJs = require("./transports/index.js");
var _utilJs = require("./util.js");
var _parseuriJs = require("./contrib/parseuri.js");
var _websocketConstructorJs = require("./transports/websocket-constructor.js");
const protocol = (0, _socketJs.Socket).protocol;

},{"./socket.js":"kpkbh","./transport.js":"kwKKC","./transports/index.js":"2neV7","./util.js":"d7eyH","./contrib/parseuri.js":"5RFyz","./transports/websocket-constructor.js":"dDJnh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kpkbh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Socket", ()=>Socket);
var _indexJs = require("./transports/index.js");
var _utilJs = require("./util.js");
var _parseqsJs = require("./contrib/parseqs.js");
var _parseuriJs = require("./contrib/parseuri.js");
var _componentEmitter = require("@socket.io/component-emitter");
var _engineIoParser = require("engine.io-parser");
class Socket extends (0, _componentEmitter.Emitter) {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */ constructor(uri, opts = {}){
        super();
        this.writeBuffer = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = (0, _parseuriJs.parse)(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query) opts.query = uri.query;
        } else if (opts.host) opts.hostname = (0, _parseuriJs.parse)(opts.host).host;
        (0, _utilJs.installTimerFunctions)(this, opts);
        this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) // if no port is specified manually, use the protocol default
        opts.port = this.secure ? "443" : "80";
        this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
        this.transports = opts.transports || [
            "polling",
            "websocket"
        ];
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") this.opts.query = (0, _parseqsJs.decode)(this.opts.query);
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this.beforeunloadEventListener = ()=>{
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this.beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = ()=>{
                    this.onClose("transport close", {
                        description: "network connection lost"
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */ createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = (0, _engineIoParser.protocol);
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id) query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        return new (0, _indexJs.transports)[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */ open() {
        let transport;
        if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) transport = "websocket";
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(()=>{
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        } else transport = this.transports[0];
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        } catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */ setTransport(transport) {
        if (this.transport) this.transport.removeAllListeners();
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason)=>this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */ probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = ()=>{
            if (failed) return;
            transport.send([
                {
                    type: "ping",
                    data: "probe"
                }
            ]);
            transport.once("packet", (msg)=>{
                if (failed) return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport) return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(()=>{
                        if (failed) return;
                        if ("closed" === this.readyState) return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([
                            {
                                type: "upgrade"
                            }
                        ]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                } else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed) return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err)=>{
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) freezeTransport();
        }
        // Remove all listeners on the transport and on self
        const cleanup = ()=>{
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */ onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState && this.opts.upgrade) {
            let i = 0;
            const l = this.upgrades.length;
            for(; i < l; i++)this.probe(this.upgrades[i]);
        }
    }
    /**
     * Handles a packet.
     *
     * @private
     */ onPacket(packet) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch(packet.type){
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */ onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState) return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */ resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(()=>{
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) this.pingTimeoutTimer.unref();
    }
    /**
     * Called on `drain` event
     *
     * @private
     */ onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) this.emitReserved("drain");
        else this.flush();
    }
    /**
     * Flush write buffers.
     *
     * @private
     */ flush() {
        if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */ getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) return this.writeBuffer;
        let payloadSize = 1; // first packet type
        for(let i = 0; i < this.writeBuffer.length; i++){
            const data = this.writeBuffer[i].data;
            if (data) payloadSize += (0, _utilJs.byteLength)(data);
            if (i > 0 && payloadSize > this.maxPayload) return this.writeBuffer.slice(0, i);
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} callback function.
     * @return {Socket} for chaining.
     */ write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */ sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) return;
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn) this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */ close() {
        const close = ()=>{
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = ()=>{
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = ()=>{
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) this.once("drain", ()=>{
                if (this.upgrading) waitForUpgrade();
                else close();
            });
            else if (this.upgrading) waitForUpgrade();
            else close();
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */ onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */ onClose(reason, description) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("beforeunload", this.beforeunloadEventListener, false);
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */ filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for(; i < j; i++)if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
        return filteredUpgrades;
    }
}
Socket.protocol = (0, _engineIoParser.protocol);

},{"./transports/index.js":"2neV7","./util.js":"d7eyH","./contrib/parseqs.js":"aFNEN","./contrib/parseuri.js":"5RFyz","@socket.io/component-emitter":"dzQbR","engine.io-parser":"2SHiP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2neV7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "transports", ()=>transports);
var _pollingJs = require("./polling.js");
var _websocketJs = require("./websocket.js");
const transports = {
    websocket: (0, _websocketJs.WS),
    polling: (0, _pollingJs.Polling)
};

},{"./polling.js":"HgHsi","./websocket.js":"8y2e2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"HgHsi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Polling", ()=>Polling);
parcelHelpers.export(exports, "Request", ()=>Request);
var _transportJs = require("../transport.js");
var _yeastJs = require("../contrib/yeast.js");
var _parseqsJs = require("../contrib/parseqs.js");
var _engineIoParser = require("engine.io-parser");
var _xmlhttprequestJs = require("./xmlhttprequest.js");
var _componentEmitter = require("@socket.io/component-emitter");
var _utilJs = require("../util.js");
var _globalThisJs = require("../globalThis.js");
function empty() {}
const hasXHR2 = function() {
    const xhr = new (0, _xmlhttprequestJs.XHR)({
        xdomain: false
    });
    return null != xhr.responseType;
}();
class Polling extends (0, _transportJs.Transport) {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */ constructor(opts){
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) port = isSSL ? "443" : "80";
            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */ const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */ doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */ pause(onPause) {
        this.readyState = "pausing";
        const pause = ()=>{
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function() {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function() {
                    --total || pause();
                });
            }
        } else pause();
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */ poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */ onData(data) {
        const callback = (packet)=>{
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") this.onOpen();
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({
                    description: "transport closed by the server"
                });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, _engineIoParser.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) this.poll();
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */ doClose() {
        const close = ()=>{
            this.write([
                {
                    type: "close"
                }
            ]);
        };
        if ("open" === this.readyState) close();
        else // in case we're trying to close while
        // handshaking is in progress (GH-164)
        this.once("open", close);
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */ write(packets) {
        this.writable = false;
        (0, _engineIoParser.encodePayload)(packets, (data)=>{
            this.doWrite(data, ()=>{
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) query[this.opts.timestampParam] = (0, _yeastJs.yeast)();
        if (!this.supportsBinary && !query.sid) query.b64 = 1;
        // avoid port if default for schema
        if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) port = ":" + this.opts.port;
        const encodedQuery = (0, _parseqsJs.encode)(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @private
     */ request(opts = {}) {
        Object.assign(opts, {
            xd: this.xd,
            xs: this.xs
        }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */ doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */ doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context)=>{
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends (0, _componentEmitter.Emitter) {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */ constructor(uri, opts){
        super();
        (0, _utilJs.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */ create() {
        const opts = (0, _utilJs.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = this.xhr = new (0, _xmlhttprequestJs.XHR)(opts);
        try {
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for(let i in this.opts.extraHeaders)if (this.opts.extraHeaders.hasOwnProperty(i)) xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                }
            } catch (e) {}
            if ("POST" === this.method) try {
                xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
            try {
                xhr.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            // ie6 check
            if ("withCredentials" in xhr) xhr.withCredentials = this.opts.withCredentials;
            if (this.opts.requestTimeout) xhr.timeout = this.opts.requestTimeout;
            xhr.onreadystatechange = ()=>{
                if (4 !== xhr.readyState) return;
                if (200 === xhr.status || 1223 === xhr.status) this.onLoad();
                else // make sure the `error` event handler that's user-set
                // does not throw in the same tick and gets caught here
                this.setTimeoutFn(()=>{
                    this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                }, 0);
            };
            xhr.send(this.data);
        } catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(()=>{
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */ onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */ cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) return;
        this.xhr.onreadystatechange = empty;
        if (fromError) try {
            this.xhr.abort();
        } catch (e) {}
        if (typeof document !== "undefined") delete Request.requests[this.index];
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */ onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */ abort() {
        this.cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */ if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") // @ts-ignore
    attachEvent("onunload", unloadHandler);
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in (0, _globalThisJs.globalThisShim) ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for(let i in Request.requests)if (Request.requests.hasOwnProperty(i)) Request.requests[i].abort();
}

},{"../transport.js":"kwKKC","../contrib/yeast.js":"5cPiI","../contrib/parseqs.js":"aFNEN","engine.io-parser":"2SHiP","./xmlhttprequest.js":"gG0MI","@socket.io/component-emitter":"dzQbR","../util.js":"d7eyH","../globalThis.js":"7zbHc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kwKKC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Transport", ()=>Transport);
var _engineIoParser = require("engine.io-parser");
var _componentEmitter = require("@socket.io/component-emitter");
var _utilJs = require("./util.js");
class TransportError extends Error {
    constructor(reason, description, context){
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends (0, _componentEmitter.Emitter) {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */ constructor(opts){
        super();
        this.writable = false;
        (0, _utilJs.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */ onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */ open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */ close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */ send(packets) {
        if (this.readyState === "open") this.write(packets);
    }
    /**
     * Called upon open
     *
     * @protected
     */ onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */ onData(data) {
        const packet = (0, _engineIoParser.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */ onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */ onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */ pause(onPause) {}
}

},{"engine.io-parser":"2SHiP","@socket.io/component-emitter":"dzQbR","./util.js":"d7eyH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2SHiP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "protocol", ()=>protocol);
parcelHelpers.export(exports, "encodePacket", ()=>(0, _encodePacketJsDefault.default));
parcelHelpers.export(exports, "encodePayload", ()=>encodePayload);
parcelHelpers.export(exports, "decodePacket", ()=>(0, _decodePacketJsDefault.default));
parcelHelpers.export(exports, "decodePayload", ()=>decodePayload);
var _encodePacketJs = require("./encodePacket.js");
var _encodePacketJsDefault = parcelHelpers.interopDefault(_encodePacketJs);
var _decodePacketJs = require("./decodePacket.js");
var _decodePacketJsDefault = parcelHelpers.interopDefault(_decodePacketJs);
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback)=>{
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i)=>{
        // force base64 encoding for binary packets
        (0, _encodePacketJsDefault.default)(packet, false, (encodedPacket)=>{
            encodedPackets[i] = encodedPacket;
            if (++count === length) callback(encodedPackets.join(SEPARATOR));
        });
    });
};
const decodePayload = (encodedPayload, binaryType)=>{
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for(let i = 0; i < encodedPackets.length; i++){
        const decodedPacket = (0, _decodePacketJsDefault.default)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") break;
    }
    return packets;
};
const protocol = 4;

},{"./encodePacket.js":"lUiyb","./decodePacket.js":"k0BCP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lUiyb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _commonsJs = require("./commons.js");
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type , data  }, supportsBinary, callback)=>{
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) return callback(data);
        else return encodeBlobAsBase64(data, callback);
    } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) return callback(data);
        else return encodeBlobAsBase64(new Blob([
            data
        ]), callback);
    }
    // plain string
    return callback((0, _commonsJs.PACKET_TYPES)[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback)=>{
    const fileReader = new FileReader();
    fileReader.onload = function() {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
exports.default = encodePacket;

},{"./commons.js":"kLmJ7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kLmJ7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PACKET_TYPES", ()=>PACKET_TYPES);
parcelHelpers.export(exports, "PACKET_TYPES_REVERSE", ()=>PACKET_TYPES_REVERSE);
parcelHelpers.export(exports, "ERROR_PACKET", ()=>ERROR_PACKET);
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key)=>{
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
    type: "error",
    data: "parser error"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k0BCP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _commonsJs = require("./commons.js");
var _base64ArraybufferJs = require("./contrib/base64-arraybuffer.js");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType)=>{
    if (typeof encodedPacket !== "string") return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
    };
    const type = encodedPacket.charAt(0);
    if (type === "b") return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
    const packetType = (0, _commonsJs.PACKET_TYPES_REVERSE)[type];
    if (!packetType) return 0, _commonsJs.ERROR_PACKET;
    return encodedPacket.length > 1 ? {
        type: (0, _commonsJs.PACKET_TYPES_REVERSE)[type],
        data: encodedPacket.substring(1)
    } : {
        type: (0, _commonsJs.PACKET_TYPES_REVERSE)[type]
    };
};
const decodeBase64Packet = (data, binaryType)=>{
    if (withNativeArrayBuffer) {
        const decoded = (0, _base64ArraybufferJs.decode)(data);
        return mapBinary(decoded, binaryType);
    } else return {
        base64: true,
        data
    }; // fallback for old browsers
};
const mapBinary = (data, binaryType)=>{
    switch(binaryType){
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([
                data
            ]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};
exports.default = decodePacket;

},{"./commons.js":"kLmJ7","./contrib/base64-arraybuffer.js":"c3dDo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c3dDo":[function(require,module,exports) {
// imported from https://github.com/socketio/base64-arraybuffer
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "encode", ()=>encode);
parcelHelpers.export(exports, "decode", ()=>decode);
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for(let i = 0; i < chars.length; i++)lookup[chars.charCodeAt(i)] = i;
const encode = (arraybuffer)=>{
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
    for(i = 0; i < len; i += 3){
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
    else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";
    return base64;
};
const decode = (base64)=>{
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") bufferLength--;
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for(i = 0; i < len; i += 4){
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dzQbR":[function(require,module,exports) {
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Emitter", ()=>Emitter);
function Emitter(obj) {
    if (obj) return mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */ function mixin(obj) {
    for(var key in Emitter.prototype)obj[key] = Emitter.prototype[key];
    return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.once = function(event, fn) {
    function on() {
        this.off(event, on);
        fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */ Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    // all
    if (0 == arguments.length) {
        this._callbacks = {};
        return this;
    }
    // specific event
    var callbacks = this._callbacks["$" + event];
    if (!callbacks) return this;
    // remove all handlers
    if (1 == arguments.length) {
        delete this._callbacks["$" + event];
        return this;
    }
    // remove specific handler
    var cb;
    for(var i = 0; i < callbacks.length; i++){
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) delete this._callbacks["$" + event];
    return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */ Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    if (callbacks) {
        callbacks = callbacks.slice(0);
        for(var i = 0, len = callbacks.length; i < len; ++i)callbacks[i].apply(this, args);
    }
    return this;
};
// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */ Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */ Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d7eyH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "pick", ()=>pick);
parcelHelpers.export(exports, "installTimerFunctions", ()=>installTimerFunctions);
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
parcelHelpers.export(exports, "byteLength", ()=>byteLength);
var _globalThisJs = require("./globalThis.js");
function pick(obj, ...attr) {
    return attr.reduce((acc, k)=>{
        if (obj.hasOwnProperty(k)) acc[k] = obj[k];
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = (0, _globalThisJs.globalThisShim).setTimeout;
const NATIVE_CLEAR_TIMEOUT = (0, _globalThisJs.globalThisShim).clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind((0, _globalThisJs.globalThisShim));
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind((0, _globalThisJs.globalThisShim));
    } else {
        obj.setTimeoutFn = (0, _globalThisJs.globalThisShim).setTimeout.bind((0, _globalThisJs.globalThisShim));
        obj.clearTimeoutFn = (0, _globalThisJs.globalThisShim).clearTimeout.bind((0, _globalThisJs.globalThisShim));
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
    if (typeof obj === "string") return utf8Length(obj);
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for(let i = 0, l = str.length; i < l; i++){
        c = str.charCodeAt(i);
        if (c < 0x80) length += 1;
        else if (c < 0x800) length += 2;
        else if (c < 0xd800 || c >= 0xe000) length += 3;
        else {
            i++;
            length += 4;
        }
    }
    return length;
}

},{"./globalThis.js":"7zbHc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7zbHc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "globalThisShim", ()=>globalThisShim);
const globalThisShim = (()=>{
    if (typeof self !== "undefined") return self;
    else if (typeof window !== "undefined") return window;
    else return Function("return this")();
})();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5cPiI":[function(require,module,exports) {
// imported from https://github.com/unshiftio/yeast
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */ parcelHelpers.export(exports, "encode", ()=>encode);
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */ parcelHelpers.export(exports, "decode", ()=>decode);
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */ parcelHelpers.export(exports, "yeast", ()=>yeast);
"use strict";
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {};
let seed = 0, i = 0, prev;
function encode(num) {
    let encoded = "";
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    }while (num > 0);
    return encoded;
}
function decode(str) {
    let decoded = 0;
    for(i = 0; i < str.length; i++)decoded = decoded * length + map[str.charAt(i)];
    return decoded;
}
function yeast() {
    const now = encode(+new Date());
    if (now !== prev) return seed = 0, prev = now;
    return now + "." + encode(seed++);
}
//
// Map each character to its index.
//
for(; i < length; i++)map[alphabet[i]] = i;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aFNEN":[function(require,module,exports) {
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "encode", ()=>encode);
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */ parcelHelpers.export(exports, "decode", ()=>decode);
function encode(obj) {
    let str = "";
    for(let i in obj)if (obj.hasOwnProperty(i)) {
        if (str.length) str += "&";
        str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
    }
    return str;
}
function decode(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for(let i = 0, l = pairs.length; i < l; i++){
        let pair = pairs[i].split("=");
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gG0MI":[function(require,module,exports) {
// browser shim for xmlhttprequest module
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "XHR", ()=>XHR);
var _hasCorsJs = require("../contrib/has-cors.js");
var _globalThisJs = require("../globalThis.js");
function XHR(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || (0, _hasCorsJs.hasCORS))) return new XMLHttpRequest();
    } catch (e) {}
    if (!xdomain) try {
        return new (0, _globalThisJs.globalThisShim)[[
            "Active"
        ].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {}
}

},{"../contrib/has-cors.js":"kPgMI","../globalThis.js":"7zbHc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kPgMI":[function(require,module,exports) {
// imported from https://github.com/component/has-cors
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hasCORS", ()=>hasCORS);
let value = false;
try {
    value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
// if XMLHttp support is disabled in IE then it will throw
// when trying to create
}
const hasCORS = value;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8y2e2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WS", ()=>WS);
var _transportJs = require("../transport.js");
var _parseqsJs = require("../contrib/parseqs.js");
var _yeastJs = require("../contrib/yeast.js");
var _utilJs = require("../util.js");
var _websocketConstructorJs = require("./websocket-constructor.js");
var _engineIoParser = require("engine.io-parser");
var Buffer = require("7aff6b9bd71a6be0").Buffer;
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
class WS extends (0, _transportJs.Transport) {
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */ constructor(opts){
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    get name() {
        return "websocket";
    }
    doOpen() {
        if (!this.check()) // let probe timeout
        return;
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative ? {} : (0, _utilJs.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) opts.headers = this.opts.extraHeaders;
        try {
            this.ws = (0, _websocketConstructorJs.usingBrowserWebSocket) && !isReactNative ? protocols ? new (0, _websocketConstructorJs.WebSocket)(uri, protocols) : new (0, _websocketConstructorJs.WebSocket)(uri) : new (0, _websocketConstructorJs.WebSocket)(uri, protocols, opts);
        } catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || (0, _websocketConstructorJs.defaultBinaryType);
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */ addEventListeners() {
        this.ws.onopen = ()=>{
            if (this.opts.autoUnref) this.ws._socket.unref();
            this.onOpen();
        };
        this.ws.onclose = (closeEvent)=>this.onClose({
                description: "websocket connection closed",
                context: closeEvent
            });
        this.ws.onmessage = (ev)=>this.onData(ev.data);
        this.ws.onerror = (e)=>this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for(let i = 0; i < packets.length; i++){
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, _engineIoParser.encodePacket)(packet, this.supportsBinary, (data)=>{
                // always create a new object (GH-437)
                const opts = {};
                if (!(0, _websocketConstructorJs.usingBrowserWebSocket)) {
                    if (packet.options) opts.compress = packet.options.compress;
                    if (this.opts.perMessageDeflate) {
                        const len = // @ts-ignore
                        "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) opts.compress = false;
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (0, _websocketConstructorJs.usingBrowserWebSocket) // TypeError is thrown when passing the second argument on Safari
                    this.ws.send(data);
                    else this.ws.send(data, opts);
                } catch (e) {}
                if (lastPacket) // fake drain
                // defer to next tick to allow Socket to clear writeBuffer
                (0, _websocketConstructorJs.nextTick)(()=>{
                    this.writable = true;
                    this.emitReserved("drain");
                }, this.setTimeoutFn);
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */ uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) port = ":" + this.opts.port;
        // append timestamp to URI
        if (this.opts.timestampRequests) query[this.opts.timestampParam] = (0, _yeastJs.yeast)();
        // communicate binary support capabilities
        if (!this.supportsBinary) query.b64 = 1;
        const encodedQuery = (0, _parseqsJs.encode)(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @private
     */ check() {
        return !!(0, _websocketConstructorJs.WebSocket);
    }
}

},{"7aff6b9bd71a6be0":"fCgem","../transport.js":"kwKKC","../contrib/parseqs.js":"aFNEN","../contrib/yeast.js":"5cPiI","../util.js":"d7eyH","./websocket-constructor.js":"dDJnh","engine.io-parser":"2SHiP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dDJnh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nextTick", ()=>nextTick);
parcelHelpers.export(exports, "WebSocket", ()=>WebSocket);
parcelHelpers.export(exports, "usingBrowserWebSocket", ()=>usingBrowserWebSocket);
parcelHelpers.export(exports, "defaultBinaryType", ()=>defaultBinaryType);
var _globalThisJs = require("../globalThis.js");
const nextTick = (()=>{
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) return (cb)=>Promise.resolve().then(cb);
    else return (cb, setTimeoutFn)=>setTimeoutFn(cb, 0);
})();
const WebSocket = (0, _globalThisJs.globalThisShim).WebSocket || (0, _globalThisJs.globalThisShim).MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";

},{"../globalThis.js":"7zbHc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5RFyz":[function(require,module,exports) {
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parse", ()=>parse);
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
];
function parse(str) {
    const src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    let m = re.exec(str || ""), uri = {}, i = 14;
    while(i--)uri[parts[i]] = m[i] || "";
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
        uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) names.splice(0, 1);
    if (path.slice(-1) == "/") names.splice(names.length - 1, 1);
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
        if ($1) data[$1] = $2;
    });
    return data;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"94vh9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Manager", ()=>Manager);
var _engineIoClient = require("engine.io-client");
var _socketJs = require("./socket.js");
var _socketIoParser = require("socket.io-parser");
var _onJs = require("./on.js");
var _backo2Js = require("./contrib/backo2.js");
var _componentEmitter = require("@socket.io/component-emitter");
class Manager extends (0, _componentEmitter.Emitter) {
    constructor(uri, opts){
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0, _engineIoClient.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new (0, _backo2Js.Backoff)({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || _socketIoParser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect) this.open();
    }
    reconnection(v) {
        if (!arguments.length) return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined) return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 || _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined) return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 || _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined) return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 || _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length) return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */ maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) // keeps reconnection from firing twice for the same reconnection loop
        this.reconnect();
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */ open(fn) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new (0, _engineIoClient.Socket)(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0, _onJs.on)(socket, "open", function() {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = (0, _onJs.on)(socket, "error", (err)=>{
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) fn(err);
            else // Only do this if there is no fn to handle the error
            self.maybeReconnectOnOpen();
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            if (timeout === 0) openSubDestroy(); // prevents a race condition with the 'open' event
            // set timer
            const timer = this.setTimeoutFn(()=>{
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) timer.unref();
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */ connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */ onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0, _onJs.on)(socket, "ping", this.onping.bind(this)), (0, _onJs.on)(socket, "data", this.ondata.bind(this)), (0, _onJs.on)(socket, "error", this.onerror.bind(this)), (0, _onJs.on)(socket, "close", this.onclose.bind(this)), (0, _onJs.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */ onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */ ondata(data) {
        try {
            this.decoder.add(data);
        } catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */ ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        (0, _engineIoClient.nextTick)(()=>{
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */ onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */ socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new (0, _socketJs.Socket)(this, nsp, opts);
            this.nsps[nsp] = socket;
        } else if (this._autoConnect && !socket.active) socket.connect();
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */ _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps){
            const socket = this.nsps[nsp];
            if (socket.active) return;
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */ _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for(let i = 0; i < encodedPackets.length; i++)this.engine.write(encodedPackets[i], packet.options);
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */ cleanup() {
        this.subs.forEach((subDestroy)=>subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */ _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine) this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */ disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */ onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) this.reconnect();
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */ reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        } else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(()=>{
                if (self.skipReconnect) return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect) return;
                self.open((err)=>{
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    } else self.onreconnect();
                });
            }, delay);
            if (this.opts.autoUnref) timer.unref();
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */ onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}

},{"engine.io-client":"jBHFs","./socket.js":"kbWgu","socket.io-parser":"2lQL3","./on.js":"8FFT1","./contrib/backo2.js":"cZLsm","@socket.io/component-emitter":"dzQbR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kbWgu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */ parcelHelpers.export(exports, "Socket", ()=>Socket);
var _socketIoParser = require("socket.io-parser");
var _onJs = require("./on.js");
var _componentEmitter = require("@socket.io/component-emitter");
/**
 * Internal events.
 * These events can't be emitted by the user.
 */ const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
});
class Socket extends (0, _componentEmitter.Emitter) {
    /**
     * `Socket` constructor.
     */ constructor(io, nsp, opts){
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */ this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */ this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */ this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */ this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */ this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */ this._queueSeq = 0;
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) this.auth = opts.auth;
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect) this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */ get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */ subEvents() {
        if (this.subs) return;
        const io = this.io;
        this.subs = [
            (0, _onJs.on)(io, "open", this.onopen.bind(this)),
            (0, _onJs.on)(io, "packet", this.onpacket.bind(this)),
            (0, _onJs.on)(io, "error", this.onerror.bind(this)),
            (0, _onJs.on)(io, "close", this.onclose.bind(this))
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */ get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */ connect() {
        if (this.connected) return this;
        this.subEvents();
        if (!this.io["_reconnecting"]) this.io.open(); // ensure open
        if ("open" === this.io._readyState) this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */ open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */ send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */ emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) throw new Error('"' + ev.toString() + '" is a reserved event name');
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: (0, _socketIoParser.PacketType).EVENT,
            data: args
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) ;
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        } else this.sendBuffer.push(packet);
        this.flags = {};
        return this;
    }
    /**
     * @private
     */ _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(()=>{
            delete this.acks[id];
            for(let i = 0; i < this.sendBuffer.length; i++)if (this.sendBuffer[i].id === id) this.sendBuffer.splice(i, 1);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args)=>{
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [
                null,
                ...args
            ]);
        };
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */ emitWithAck(ev, ...args) {
        // the timeout flag is optional
        const withErr = this.flags.timeout !== undefined || this._opts.ackTimeout !== undefined;
        return new Promise((resolve, reject)=>{
            args.push((arg1, arg2)=>{
                if (withErr) return arg1 ? reject(arg1) : resolve(arg2);
                else return resolve(arg1);
            });
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */ _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") ack = args.pop();
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({
                fromQueue: true
            }, this.flags)
        };
        args.push((err, ...responseArgs)=>{
            if (packet !== this._queue[0]) // the packet has already been acknowledged
            return;
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) ack(err);
                }
            } else {
                this._queue.shift();
                if (ack) ack(null, ...responseArgs);
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */ _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) return;
        const packet = this._queue[0];
        if (packet.pending && !force) return;
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */ packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */ onopen() {
        if (typeof this.auth == "function") this.auth((data)=>{
            this._sendConnectPacket(data);
        });
        else this._sendConnectPacket(this.auth);
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */ _sendConnectPacket(data) {
        this.packet({
            type: (0, _socketIoParser.PacketType).CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, data) : data
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */ onerror(err) {
        if (!this.connected) this.emitReserved("connect_error", err);
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */ onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */ onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace) return;
        switch(packet.type){
            case (0, _socketIoParser.PacketType).CONNECT:
                if (packet.data && packet.data.sid) this.onconnect(packet.data.sid, packet.data.pid);
                else this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case (0, _socketIoParser.PacketType).EVENT:
            case (0, _socketIoParser.PacketType).BINARY_EVENT:
                this.onevent(packet);
                break;
            case (0, _socketIoParser.PacketType).ACK:
            case (0, _socketIoParser.PacketType).BINARY_ACK:
                this.onack(packet);
                break;
            case (0, _socketIoParser.PacketType).DISCONNECT:
                this.ondisconnect();
                break;
            case (0, _socketIoParser.PacketType).CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */ onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) args.push(this.ack(packet.id));
        if (this.connected) this.emitEvent(args);
        else this.receiveBuffer.push(Object.freeze(args));
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners)listener.apply(this, args);
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") this._lastOffset = args[args.length - 1];
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */ ack(id) {
        const self = this;
        let sent = false;
        return function(...args) {
            // prevent double callbacks
            if (sent) return;
            sent = true;
            self.packet({
                type: (0, _socketIoParser.PacketType).ACK,
                id: id,
                data: args
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */ onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */ onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */ emitBuffered() {
        this.receiveBuffer.forEach((args)=>this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet)=>{
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */ ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */ destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy)=>subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */ disconnect() {
        if (this.connected) this.packet({
            type: (0, _socketIoParser.PacketType).DISCONNECT
        });
        // remove socket from pool
        this.destroy();
        if (this.connected) // fire events
        this.onclose("io client disconnect");
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */ close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */ compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */ get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */ timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */ onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */ prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */ offAny(listener) {
        if (!this._anyListeners) return this;
        if (listener) {
            const listeners = this._anyListeners;
            for(let i = 0; i < listeners.length; i++)if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
            }
        } else this._anyListeners = [];
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */ prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */ offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) return this;
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for(let i = 0; i < listeners.length; i++)if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
            }
        } else this._anyOutgoingListeners = [];
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */ listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */ notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners)listener.apply(this, packet.data);
        }
    }
}

},{"socket.io-parser":"2lQL3","./on.js":"8FFT1","@socket.io/component-emitter":"dzQbR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2lQL3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "protocol", ()=>protocol);
parcelHelpers.export(exports, "PacketType", ()=>PacketType);
/**
 * A socket.io Encoder instance
 */ parcelHelpers.export(exports, "Encoder", ()=>Encoder);
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */ parcelHelpers.export(exports, "Decoder", ()=>Decoder);
var _componentEmitter = require("@socket.io/component-emitter");
var _binaryJs = require("./binary.js");
var _isBinaryJs = require("./is-binary.js");
const protocol = 5;
var PacketType;
(function(PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */ constructor(replacer){
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */ encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0, _isBinaryJs.hasBinary)(obj)) return this.encodeAsBinary({
                type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
                nsp: obj.nsp,
                data: obj.data,
                id: obj.id
            });
        }
        return [
            this.encodeAsString(obj)
        ];
    }
    /**
     * Encode packet as string.
     */ encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) str += obj.attachments + "-";
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) str += obj.nsp + ",";
        // immediately followed by the id
        if (null != obj.id) str += obj.id;
        // json data
        if (null != obj.data) str += JSON.stringify(obj.data, this.replacer);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */ encodeAsBinary(obj) {
        const deconstruction = (0, _binaryJs.deconstructPacket)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
class Decoder extends (0, _componentEmitter.Emitter) {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */ constructor(reviver){
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */ add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) super.emitReserved("decoded", packet);
            } else // non-binary full packet
            super.emitReserved("decoded", packet);
        } else if ((0, _isBinaryJs.isBinary)(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        } else throw new Error("Unknown type: " + obj);
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */ decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0))
        };
        if (PacketType[p.type] === undefined) throw new Error("unknown packet type " + p.type);
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while(str.charAt(++i) !== "-" && i != str.length);
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") throw new Error("Illegal attachments");
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if ("," === c) break;
                if (i === str.length) break;
            }
            p.nsp = str.substring(start, i);
        } else p.nsp = "/";
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while(++i){
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length) break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) p.data = payload;
            else throw new Error("invalid payload");
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        } catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch(type){
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */ destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */ class BinaryReconstructor {
    constructor(packet){
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */ takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0, _binaryJs.reconstructPacket)(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */ finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}

},{"@socket.io/component-emitter":"dzQbR","./binary.js":"juaze","./is-binary.js":"0mMso","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"juaze":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */ parcelHelpers.export(exports, "deconstructPacket", ()=>deconstructPacket);
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */ parcelHelpers.export(exports, "reconstructPacket", ()=>reconstructPacket);
var _isBinaryJs = require("./is-binary.js");
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {
        packet: pack,
        buffers: buffers
    };
}
function _deconstructPacket(data, buffers) {
    if (!data) return data;
    if ((0, _isBinaryJs.isBinary)(data)) {
        const placeholder = {
            _placeholder: true,
            num: buffers.length
        };
        buffers.push(data);
        return placeholder;
    } else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for(let i = 0; i < data.length; i++)newData[i] = _deconstructPacket(data[i], buffers);
        return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for(const key in data)if (Object.prototype.hasOwnProperty.call(data, key)) newData[key] = _deconstructPacket(data[key], buffers);
        return newData;
    }
    return data;
}
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data) return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
        if (isIndexValid) return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        else throw new Error("illegal attachments");
    } else if (Array.isArray(data)) for(let i = 0; i < data.length; i++)data[i] = _reconstructPacket(data[i], buffers);
    else if (typeof data === "object") {
        for(const key in data)if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = _reconstructPacket(data[key], buffers);
    }
    return data;
}

},{"./is-binary.js":"0mMso","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"0mMso":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */ parcelHelpers.export(exports, "isBinary", ()=>isBinary);
parcelHelpers.export(exports, "hasBinary", ()=>hasBinary);
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj)=>{
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") return false;
    if (Array.isArray(obj)) {
        for(let i = 0, l = obj.length; i < l; i++){
            if (hasBinary(obj[i])) return true;
        }
        return false;
    }
    if (isBinary(obj)) return true;
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) return hasBinary(obj.toJSON(), true);
    for(const key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) return true;
    }
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8FFT1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "on", ()=>on);
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cZLsm":[function(require,module,exports) {
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Backoff", ()=>Backoff);
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */ Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */ Backoff.prototype.reset = function() {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */ Backoff.prototype.setMin = function(min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */ Backoff.prototype.setMax = function(max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */ Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3TBBg":[function(require,module,exports) {
var global = arguments[3];
var Buffer = require("e3bde79dc78e41c8").Buffer;
"use strict";
var EC = require("d75b014ec76cf61f").ec;
var ec = new EC("secp256k1");
var browserCrypto = global.crypto || global.msCrypto || {};
var subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
var nodeCrypto = require("e15a7b9f0f5d7db8");
const EC_GROUP_ORDER = Buffer.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", "hex");
const ZERO32 = Buffer.alloc(32, 0);
function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}
function isScalar(x) {
    return Buffer.isBuffer(x) && x.length === 32;
}
function isValidPrivateKey(privateKey) {
    if (!isScalar(privateKey)) return false;
    return privateKey.compare(ZERO32) > 0 && // > 0
    privateKey.compare(EC_GROUP_ORDER) < 0; // < G
}
// Compare two buffers in constant time to prevent timing attacks.
function equalConstTime(b1, b2) {
    if (b1.length !== b2.length) return false;
    var res = 0;
    for(var i = 0; i < b1.length; i++)res |= b1[i] ^ b2[i]; // jshint ignore:line
    return res === 0;
}
/* This must check if we're in the browser or
not, since the functions are different and does
not convert using browserify */ function randomBytes(size) {
    var arr = new Uint8Array(size);
    if (typeof browserCrypto.getRandomValues === "undefined") return Buffer.from(nodeCrypto.randomBytes(size));
    else browserCrypto.getRandomValues(arr);
    return Buffer.from(arr);
}
function sha512(msg) {
    return new Promise(function(resolve) {
        var hash = nodeCrypto.createHash("sha512");
        var result = hash.update(msg).digest();
        resolve(new Uint8Array(result));
    });
}
function getAes(op) {
    return function(iv, key, data) {
        return new Promise(function(resolve) {
            if (subtle) {
                var importAlgorithm = {
                    name: "AES-CBC"
                };
                var keyp = subtle.importKey("raw", key, importAlgorithm, false, [
                    op
                ]);
                return keyp.then(function(cryptoKey) {
                    var encAlgorithm = {
                        name: "AES-CBC",
                        iv: iv
                    };
                    return subtle[op](encAlgorithm, cryptoKey, data);
                }).then(function(result) {
                    resolve(Buffer.from(new Uint8Array(result)));
                });
            } else {
                if (op === "encrypt") {
                    var cipher = nodeCrypto.createCipheriv("aes-256-cbc", key, iv);
                    let firstChunk = cipher.update(data);
                    let secondChunk = cipher.final();
                    resolve(Buffer.concat([
                        firstChunk,
                        secondChunk
                    ]));
                } else if (op === "decrypt") {
                    var decipher = nodeCrypto.createDecipheriv("aes-256-cbc", key, iv);
                    let firstChunk = decipher.update(data);
                    let secondChunk = decipher.final();
                    resolve(Buffer.concat([
                        firstChunk,
                        secondChunk
                    ]));
                }
            }
        });
    };
}
var aesCbcEncrypt = getAes("encrypt");
var aesCbcDecrypt = getAes("decrypt");
function hmacSha256Sign(key, msg) {
    return new Promise(function(resolve) {
        var hmac = nodeCrypto.createHmac("sha256", Buffer.from(key));
        hmac.update(msg);
        var result = hmac.digest();
        resolve(result);
    });
}
function hmacSha256Verify(key, msg, sig) {
    return new Promise(function(resolve) {
        var hmac = nodeCrypto.createHmac("sha256", Buffer.from(key));
        hmac.update(msg);
        var expectedSig = hmac.digest();
        resolve(equalConstTime(expectedSig, sig));
    });
}
/**
  * Generate a new valid private key. Will use the window.crypto or window.msCrypto as source
  * depending on your browser.
  * @return {Buffer} A 32-byte private key.
  * @function
  */ exports.generatePrivate = function() {
    var privateKey = randomBytes(32);
    while(!isValidPrivateKey(privateKey))privateKey = randomBytes(32);
    return privateKey;
};
var getPublic = exports.getPublic = function(privateKey) {
    // This function has sync API so we throw an error immediately.
    assert(privateKey.length === 32, "Bad private key");
    assert(isValidPrivateKey(privateKey), "Bad private key");
    // XXX(Kagami): `elliptic.utils.encode` returns array for every
    // encoding except `hex`.
    return Buffer.from(ec.keyFromPrivate(privateKey).getPublic("arr"));
};
/**
 * Get compressed version of public key.
 */ var getPublicCompressed = exports.getPublicCompressed = function(privateKey) {
    assert(privateKey.length === 32, "Bad private key");
    assert(isValidPrivateKey(privateKey), "Bad private key");
    // See https://github.com/wanderer/secp256k1-node/issues/46
    let compressed = true;
    return Buffer.from(ec.keyFromPrivate(privateKey).getPublic(compressed, "arr"));
};
// NOTE(Kagami): We don't use promise shim in Browser implementation
// because it's supported natively in new browsers (see
// <http://caniuse.com/#feat=promises>) and we can use only new browsers
// because of the WebCryptoAPI (see
// <http://caniuse.com/#feat=cryptography>).
exports.sign = function(privateKey, msg) {
    return new Promise(function(resolve) {
        assert(privateKey.length === 32, "Bad private key");
        assert(isValidPrivateKey(privateKey), "Bad private key");
        assert(msg.length > 0, "Message should not be empty");
        assert(msg.length <= 32, "Message is too long");
        resolve(Buffer.from(ec.sign(msg, privateKey, {
            canonical: true
        }).toDER()));
    });
};
exports.verify = function(publicKey, msg, sig) {
    return new Promise(function(resolve, reject) {
        assert(publicKey.length === 65 || publicKey.length === 33, "Bad public key");
        if (publicKey.length === 65) assert(publicKey[0] === 4, "Bad public key");
        if (publicKey.length === 33) assert(publicKey[0] === 2 || publicKey[0] === 3, "Bad public key");
        assert(msg.length > 0, "Message should not be empty");
        assert(msg.length <= 32, "Message is too long");
        if (ec.verify(msg, sig, publicKey)) resolve(null);
        else reject(new Error("Bad signature"));
    });
};
var derive = exports.derive = function(privateKeyA, publicKeyB) {
    return new Promise(function(resolve) {
        assert(Buffer.isBuffer(privateKeyA), "Bad private key");
        assert(Buffer.isBuffer(publicKeyB), "Bad public key");
        assert(privateKeyA.length === 32, "Bad private key");
        assert(isValidPrivateKey(privateKeyA), "Bad private key");
        assert(publicKeyB.length === 65 || publicKeyB.length === 33, "Bad public key");
        if (publicKeyB.length === 65) assert(publicKeyB[0] === 4, "Bad public key");
        if (publicKeyB.length === 33) assert(publicKeyB[0] === 2 || publicKeyB[0] === 3, "Bad public key");
        var keyA = ec.keyFromPrivate(privateKeyA);
        var keyB = ec.keyFromPublic(publicKeyB);
        var Px = keyA.derive(keyB.getPublic()); // BN instance
        resolve(Buffer.from(Px.toArray()));
    });
};
exports.encrypt = function(publicKeyTo, msg, opts) {
    opts = opts || {};
    // Tmp variables to save context from flat promises;
    var iv, ephemPublicKey, ciphertext, macKey;
    return new Promise(function(resolve) {
        var ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
        // There is a very unlikely possibility that it is not a valid key
        while(!isValidPrivateKey(ephemPrivateKey))ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
        ephemPublicKey = getPublic(ephemPrivateKey);
        resolve(derive(ephemPrivateKey, publicKeyTo));
    }).then(function(Px) {
        return sha512(Px);
    }).then(function(hash) {
        iv = opts.iv || randomBytes(16);
        var encryptionKey = hash.slice(0, 32);
        macKey = hash.slice(32);
        return aesCbcEncrypt(iv, encryptionKey, msg);
    }).then(function(data) {
        ciphertext = data;
        var dataToMac = Buffer.concat([
            iv,
            ephemPublicKey,
            ciphertext
        ]);
        return hmacSha256Sign(macKey, dataToMac);
    }).then(function(mac) {
        return {
            iv: iv,
            ephemPublicKey: ephemPublicKey,
            ciphertext: ciphertext,
            mac: mac
        };
    });
};
exports.decrypt = function(privateKey, opts) {
    // Tmp variable to save context from flat promises;
    var encryptionKey;
    return derive(privateKey, opts.ephemPublicKey).then(function(Px) {
        return sha512(Px);
    }).then(function(hash) {
        encryptionKey = hash.slice(0, 32);
        var macKey = hash.slice(32);
        var dataToMac = Buffer.concat([
            opts.iv,
            opts.ephemPublicKey,
            opts.ciphertext
        ]);
        return hmacSha256Verify(macKey, dataToMac, opts.mac);
    }).then(function(macGood) {
        assert(macGood, "Bad MAC");
        return aesCbcDecrypt(opts.iv, encryptionKey, opts.ciphertext);
    }).then(function(msg) {
        return Buffer.from(new Uint8Array(msg));
    });
};

},{"e3bde79dc78e41c8":"fCgem","d75b014ec76cf61f":"1NKsH","e15a7b9f0f5d7db8":"hagNj"}],"9pPU8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "decryptData", ()=>decryptData);
parcelHelpers.export(exports, "default", ()=>MetadataStorageLayer);
parcelHelpers.export(exports, "ec", ()=>ec);
parcelHelpers.export(exports, "encParamsBufToHex", ()=>encParamsBufToHex);
parcelHelpers.export(exports, "encParamsHexToBuf", ()=>encParamsHexToBuf);
parcelHelpers.export(exports, "encryptAndSetData", ()=>encryptAndSetData);
parcelHelpers.export(exports, "encryptData", ()=>encryptData);
parcelHelpers.export(exports, "getAndDecryptData", ()=>getAndDecryptData);
parcelHelpers.export(exports, "getDeviceShare", ()=>getDeviceShare);
parcelHelpers.export(exports, "getTorusShare", ()=>getTorusShare);
parcelHelpers.export(exports, "keccak256", ()=>keccak256);
parcelHelpers.export(exports, "setDeviceShare", ()=>setDeviceShare);
parcelHelpers.export(exports, "setTorusShare", ()=>setTorusShare);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _httpHelpers = require("@toruslabs/http-helpers");
var _jsonStableStringify = require("json-stable-stringify");
var _jsonStableStringifyDefault = parcelHelpers.interopDefault(_jsonStableStringify);
var _elliptic = require("elliptic");
var _keccak = require("keccak");
var _keccakDefault = parcelHelpers.interopDefault(_keccak);
var _eccrypto = require("@toruslabs/eccrypto");
var Buffer = require("b76ab8cfebd1ca4c").Buffer;
function keccak256(a) {
    return (0, _keccakDefault.default)("keccak256").update(a).digest();
}
const ec = new (0, _elliptic.ec)("secp256k1");
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
class MetadataStorageLayer {
    // ms
    constructor(){
        let metadataHost = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://metadata.tor.us";
        let serverTimeOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        (0, _definePropertyDefault.default)(this, "metadataHost", void 0);
        (0, _definePropertyDefault.default)(this, "serverTimeOffset", void 0);
        this.metadataHost = metadataHost;
        this.serverTimeOffset = serverTimeOffset;
    }
    static setAPIKey(apiKey) {
        (0, _httpHelpers.setAPIKey)(apiKey);
    }
    static setEmbedHost(embedHost) {
        (0, _httpHelpers.setEmbedHost)(embedHost);
    }
    generateMetadataParams(message, privateKeyHex) {
        var _ref, _sig$recoveryParam;
        const key = ec.keyFromPrivate(privateKeyHex, "hex");
        const setData = {
            data: message,
            timestamp: Math.floor(this.serverTimeOffset + Date.now() / 1000).toString(16)
        };
        const sig = key.sign(keccak256((0, _jsonStableStringifyDefault.default)(setData)));
        return {
            pub_key_X: key.getPublic().getX().toString("hex"),
            pub_key_Y: key.getPublic().getY().toString("hex"),
            set_data: setData,
            signature: Buffer.from((_ref = sig.r.toString(16, 64) + sig.s.toString(16, 64) + ((_sig$recoveryParam = sig.recoveryParam) === null || _sig$recoveryParam === void 0 ? void 0 : _sig$recoveryParam.toString(16).padStart(2, "0").slice(-2))) !== null && _ref !== void 0 ? _ref : "00", "hex").toString("base64")
        };
    }
    generatePubKeyParams(privateKeyHex) {
        const key = ec.keyFromPrivate(privateKeyHex, "hex");
        return {
            pub_key_X: key.getPublic().getX().toString("hex"),
            pub_key_Y: key.getPublic().getY().toString("hex")
        };
    }
    async setMetadata(data, namespace, options) {
        const params = namespace !== null ? _objectSpread(_objectSpread({}, data), {}, {
            namespace
        }) : data;
        const metadataResponse = await (0, _httpHelpers.post)("".concat(this.metadataHost, "/set"), params, options, {
            useAPIKey: true
        });
        return metadataResponse.message;
    }
    async getMetadata(pubKey, namespace, options) {
        const params = namespace !== null ? _objectSpread(_objectSpread({}, pubKey), {}, {
            namespace
        }) : pubKey;
        const metadataResponse = await (0, _httpHelpers.post)("".concat(this.metadataHost, "/get"), params, options, {
            useAPIKey: true
        });
        return metadataResponse.message;
    }
}
const WEBAUTHN_TORUS_SHARE = "webauthn_torus_share";
const WEBAUTHN_DEVICE_SHARE = "webauthn_device_share";
function encParamsHexToBuf(encParamsHex) {
    return {
        iv: Buffer.from(encParamsHex.iv, "hex"),
        ephemPublicKey: Buffer.from(encParamsHex.ephemPublicKey, "hex"),
        ciphertext: Buffer.from(encParamsHex.ciphertext, "hex"),
        mac: Buffer.from(encParamsHex.mac, "hex")
    };
}
function encParamsBufToHex(encParams) {
    return {
        iv: Buffer.from(encParams.iv).toString("hex"),
        ephemPublicKey: Buffer.from(encParams.ephemPublicKey).toString("hex"),
        ciphertext: Buffer.from(encParams.ciphertext).toString("hex"),
        mac: Buffer.from(encParams.mac).toString("hex")
    };
}
async function encryptData(privKeyHex, d) {
    const serializedDec = JSON.stringify(d);
    const serializedBuf = Buffer.from(serializedDec, "utf-8");
    const encParams = await (0, _eccrypto.encrypt)((0, _eccrypto.getPublic)(Buffer.from(privKeyHex, "hex")), serializedBuf);
    const encParamsHex = encParamsBufToHex(encParams);
    const sData = JSON.stringify(encParamsHex);
    return sData;
}
async function decryptData(privKeyHex, d) {
    const encParamsHex = JSON.parse(d);
    const encParams = encParamsHexToBuf(encParamsHex);
    const keyPair = ec.keyFromPrivate(privKeyHex);
    const serializedBuf = await (0, _eccrypto.decrypt)(Buffer.from(keyPair.getPrivate().toString("hex", 64), "hex"), encParams);
    const serializedDec = serializedBuf.toString("utf-8");
    const data = JSON.parse(serializedDec);
    return data;
}
async function getAndDecryptData(m, privKeyHex, namespace) {
    const keyPair = ec.keyFromPrivate(privKeyHex);
    const pubKey = keyPair.getPublic();
    const serializedData = await m.getMetadata({
        pub_key_X: pubKey.getX().toString(16),
        pub_key_Y: pubKey.getY().toString(16)
    }, namespace);
    if (!serializedData) return null;
    const data = await decryptData(privKeyHex, serializedData);
    return data;
}
async function encryptAndSetData(m, privKeyHex, d, namespace) {
    const sData = await encryptData(privKeyHex, d);
    const metadataParams = m.generateMetadataParams(sData, privKeyHex);
    await m.setMetadata(metadataParams, namespace);
}
async function setTorusShare(m, webAuthnPubKey, webAuthnRefHex, subspace, subspaceData) {
    const refKeyPair = ec.keyFromPrivate(webAuthnRefHex);
    const privKey = refKeyPair.getPrivate();
    const pubKey = ec.keyFromPublic({
        x: webAuthnPubKey.pub_key_X,
        y: webAuthnPubKey.pub_key_Y
    });
    const data = await getAndDecryptData(m, webAuthnRefHex, WEBAUTHN_TORUS_SHARE);
    let d = {};
    if (data) d = data;
    const serializedSubspaceData = JSON.stringify(subspaceData);
    const serializedSubspaceDataBuf = Buffer.from(serializedSubspaceData, "utf-8");
    const encSubspaceData = await (0, _eccrypto.encrypt)(Buffer.from(pubKey.getPublic("hex"), "hex"), serializedSubspaceDataBuf);
    const encSubspaceDataHex = encParamsBufToHex(encSubspaceData);
    d[subspace] = encSubspaceDataHex;
    await encryptAndSetData(m, privKey.toString("hex", 64), d, WEBAUTHN_TORUS_SHARE);
}
async function setDeviceShare(m, webAuthnRefHex, subspace, subspaceData) {
    const keyPair = ec.keyFromPrivate(webAuthnRefHex);
    const privKey = keyPair.getPrivate();
    const data = await getAndDecryptData(m, webAuthnRefHex, WEBAUTHN_DEVICE_SHARE);
    let d = {};
    if (data) d = data;
    d[subspace] = subspaceData;
    await encryptAndSetData(m, privKey.toString("hex", 64), d, WEBAUTHN_DEVICE_SHARE);
}
async function getTorusShare(m, webAuthnKeyHex, webAuthnRefHex, subspace) {
    const data = await getAndDecryptData(m, webAuthnRefHex, WEBAUTHN_TORUS_SHARE);
    if (!data) return null;
    const encParamsHex = data[subspace];
    if (!encParamsHex) return null;
    const encParams = encParamsHexToBuf(encParamsHex);
    const keyPair = ec.keyFromPrivate(webAuthnKeyHex);
    const privKey = keyPair.getPrivate();
    const serializedSubspaceDataBuf = await (0, _eccrypto.decrypt)(Buffer.from(privKey.toString("hex", 64), "hex"), encParams);
    const serializedSubspaceData = serializedSubspaceDataBuf.toString("utf-8");
    const subspaceData = JSON.parse(serializedSubspaceData);
    return subspaceData;
}
async function getDeviceShare(m, webAuthnRefHex, subspace) {
    const data = await getAndDecryptData(m, webAuthnRefHex, WEBAUTHN_DEVICE_SHARE);
    if (data) return data[subspace];
    return null;
}

},{"b76ab8cfebd1ca4c":"fCgem","@babel/runtime/helpers/defineProperty":"4x6r7","@toruslabs/http-helpers":"71C66","json-stable-stringify":"jRtVY","elliptic":"1NKsH","keccak":"cOBab","@toruslabs/eccrypto":"3TBBg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"71C66":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "clearAPIKey", ()=>clearAPIKey);
parcelHelpers.export(exports, "clearEmbedHost", ()=>clearEmbedHost);
parcelHelpers.export(exports, "enableSentryTracing", ()=>enableSentryTracing);
parcelHelpers.export(exports, "gatewayAuthHeader", ()=>gatewayAuthHeader);
parcelHelpers.export(exports, "gatewayEmbedHostHeader", ()=>gatewayEmbedHostHeader);
parcelHelpers.export(exports, "generateJsonRPCObject", ()=>generateJsonRPCObject);
parcelHelpers.export(exports, "get", ()=>get);
parcelHelpers.export(exports, "getAPIKey", ()=>getAPIKey);
parcelHelpers.export(exports, "getEmbedHost", ()=>getEmbedHost);
parcelHelpers.export(exports, "patch", ()=>patch);
parcelHelpers.export(exports, "post", ()=>post);
parcelHelpers.export(exports, "promiseRace", ()=>promiseRace);
parcelHelpers.export(exports, "promiseTimeout", ()=>promiseTimeout);
parcelHelpers.export(exports, "put", ()=>put);
parcelHelpers.export(exports, "remove", ()=>remove);
parcelHelpers.export(exports, "setAPIKey", ()=>setAPIKey);
parcelHelpers.export(exports, "setEmbedHost", ()=>setEmbedHost);
parcelHelpers.export(exports, "setLogLevel", ()=>setLogLevel);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _lodashMerge = require("lodash.merge");
var _lodashMergeDefault = parcelHelpers.interopDefault(_lodashMerge);
var _loglevel = require("loglevel");
var _loglevelDefault = parcelHelpers.interopDefault(_loglevel);
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
const log = (0, _loglevelDefault.default).getLogger("http-helpers");
log.setLevel((0, _loglevel.levels).INFO);
let apiKey = "torus-default";
let embedHost = ""; // #region API Keys
const gatewayAuthHeader = "x-api-key";
const gatewayEmbedHostHeader = "x-embed-host";
let sentry = null;
const tracingOrigins = [];
const tracingPaths = [];
function enableSentryTracing(_sentry, _tracingOrigins, _tracingPaths) {
    sentry = _sentry;
    tracingOrigins.push(..._tracingOrigins);
    tracingPaths.push(..._tracingPaths);
}
function setEmbedHost(embedHost_) {
    embedHost = embedHost_;
}
function clearEmbedHost() {
    embedHost = "";
}
function getEmbedHost() {
    return embedHost;
}
function setAPIKey(apiKey_) {
    apiKey = apiKey_;
}
function clearAPIKey() {
    apiKey = "torus-default";
}
function getAPIKey() {
    return apiKey;
} // #endregion
function setLogLevel(level) {
    log.setLevel(level);
}
async function fetchAndTrace(url, init) {
    let _url = null;
    try {
        _url = new URL(url);
    } catch (error) {}
    if (sentry && _url && (tracingOrigins.includes(_url.origin) || tracingPaths.includes(_url.pathname))) {
        const transaction = sentry.startTransaction({
            name: url
        });
        const span = transaction.startChild({
            op: "http"
        }); // This function returns a Span
        const response = await fetch(url, init);
        span.finish(); // Remember that only finished spans will be sent with the transaction
        transaction.finish(); // Finishing the transaction will send it to Sentry
        return response;
    }
    return fetch(url, init);
}
function getApiKeyHeaders() {
    const headers = {};
    if (apiKey) headers[gatewayAuthHeader] = apiKey;
    if (embedHost) headers[gatewayEmbedHostHeader] = embedHost;
    return headers;
}
function debugLogResponse(response) {
    log.info("Response: ".concat(response.status, " ").concat(response.statusText));
    log.info("Url: ".concat(response.url));
}
const promiseTimeout = (ms, promise)=>{
    const timeout = new Promise((resolve, reject)=>{
        const id = setTimeout(()=>{
            clearTimeout(id);
            reject(new Error("Timed out in ".concat(ms, "ms")));
        }, ms);
    });
    return Promise.race([
        promise,
        timeout
    ]);
};
const get = async function(url) {
    let options_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let customOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const defaultOptions = {
        mode: "cors",
        headers: {}
    };
    if (customOptions.useAPIKey) defaultOptions.headers = _objectSpread(_objectSpread({}, defaultOptions.headers), getApiKeyHeaders());
    const options = (0, _lodashMergeDefault.default)(defaultOptions, options_, {
        method: "GET"
    });
    const response = await fetchAndTrace(url, options);
    if (response.ok) return response.json();
    debugLogResponse(response);
    throw response;
};
const post = function(url) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let options_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let customOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const defaultOptions = {
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };
    if (customOptions.useAPIKey) defaultOptions.headers = _objectSpread(_objectSpread({}, defaultOptions.headers), getApiKeyHeaders());
    const options = (0, _lodashMergeDefault.default)(defaultOptions, options_, {
        method: "POST"
    }); // deep merge changes the structure of form data and url encoded data ,
    // so we should not deepmerge body data
    if (customOptions.isUrlEncodedData) {
        // for multipart request browser/client will add multipart content type
        // along with multipart boundary , so for multipart request send
        // content-type: undefined or send with multipart boundary if already known
        options.body = data; // If url encoded data, this must not be the content type
        if (options.headers["Content-Type"] === "application/json; charset=utf-8") delete options.headers["Content-Type"];
    } else options.body = JSON.stringify(data);
    return promiseTimeout(customOptions.timeout || 60000, fetchAndTrace(url, options).then((response)=>{
        if (response.ok) return response.json();
        debugLogResponse(response);
        throw response;
    }));
};
const patch = async function(url) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let options_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let customOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const defaultOptions = {
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }; // for multipart request browser/client will add multipart content type
    // along with multipart boundary , so for multipart request send
    // content-type: undefined or send with multipart boundary if already known
    if (customOptions.useAPIKey) defaultOptions.headers = _objectSpread(_objectSpread({}, defaultOptions.headers), getApiKeyHeaders());
    const options = (0, _lodashMergeDefault.default)(defaultOptions, options_, {
        method: "PATCH"
    }); // deep merge changes the structure of form data and url encoded data ,
    // so we should not deepmerge body data
    if (customOptions.isUrlEncodedData) {
        // for multipart request browser/client will add multipart content type
        // along with multipart boundary , so for multipart request send
        // content-type: undefined or send with multipart boundary if already known
        options.body = data; // If url encoded data, this must not be the content type
        if (options.headers["Content-Type"] === "application/json; charset=utf-8") delete options.headers["Content-Type"];
    } else options.body = JSON.stringify(data);
    const response = await fetchAndTrace(url, options);
    if (response.ok) return response.json();
    debugLogResponse(response);
    throw response;
};
const put = async function(url) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let options_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let customOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const defaultOptions = {
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }; // for multipart request browser/client will add multipart content type
    // along with multipart boundary , so for multipart request send
    // content-type: undefined or send with multipart boundary if already known
    if (customOptions.useAPIKey) defaultOptions.headers = _objectSpread(_objectSpread({}, defaultOptions.headers), getApiKeyHeaders());
    const options = (0, _lodashMergeDefault.default)(defaultOptions, options_, {
        method: "PUT"
    }); // deep merge changes the structure of form data and url encoded data ,
    // so we should not deepmerge body data
    if (customOptions.isUrlEncodedData) {
        // for multipart request browser/client will add multipart content type
        // along with multipart boundary , so for multipart request send
        // content-type: undefined or send with multipart boundary if already known
        options.body = data; // If url encoded data, this must not be the content type
        if (options.headers["Content-Type"] === "application/json; charset=utf-8") delete options.headers["Content-Type"];
    } else options.body = JSON.stringify(data);
    const response = await fetchAndTrace(url, options);
    if (response.ok) return response.json();
    debugLogResponse(response);
    throw response;
};
const remove = async function(url) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let options_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let customOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const defaultOptions = {
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }; // for multipart request browser/client will add multipart content type
    // along with multipart boundary , so for multipart request send
    // content-type: undefined or send with multipart boundary if already known
    if (customOptions.useAPIKey) defaultOptions.headers = _objectSpread(_objectSpread({}, defaultOptions.headers), getApiKeyHeaders());
    const options = (0, _lodashMergeDefault.default)(defaultOptions, options_, {
        method: "DELETE"
    });
    if (customOptions.isUrlEncodedData) {
        // for multipart request browser/client will add multipart content type
        // along with multipart boundary , so for multipart request send
        // content-type: undefined or send with multipart boundary if already known
        options.body = data; // If url encoded data, this must not be the content type
        if (options.headers["Content-Type"] === "application/json; charset=utf-8") delete options.headers["Content-Type"];
    } else options.body = JSON.stringify(data);
    const response = await fetchAndTrace(url, options);
    if (response.ok) return response.json();
    debugLogResponse(response);
    throw response;
};
const generateJsonRPCObject = (method, parameters)=>({
        jsonrpc: "2.0",
        method,
        id: 10,
        params: parameters
    });
const promiseRace = function(url, options) {
    let timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60000;
    return Promise.race([
        get(url, options),
        new Promise((resolve, reject)=>{
            setTimeout(()=>{
                reject(new Error("timed out"));
            }, timeout);
        })
    ]);
};

},{"@babel/runtime/helpers/defineProperty":"4x6r7","lodash.merge":"kKE0V","loglevel":"7kRFs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kKE0V":[function(require,module,exports) {
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the size to enable large array optimizations. */ var global = arguments[3];
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */ var HASH_UNDEFINED = "__lodash_hash_undefined__";
/** Used to detect hot functions by number of calls within a span of milliseconds. */ var HOT_COUNT = 800, HOT_SPAN = 16;
/** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */ var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */ var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */ var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */ var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
/** Detect free variable `self`. */ var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function("return this")();
/** Detect free variable `exports`. */ var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */ var freeModule = freeExports && true && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */ var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */ var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */ var nodeUtil = function() {
    try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) return types;
        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {}
}();
/* Node.js helper references. */ var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */ function apply(func, thisArg, args) {
    switch(args.length){
        case 0:
            return func.call(thisArg);
        case 1:
            return func.call(thisArg, args[0]);
        case 2:
            return func.call(thisArg, args[0], args[1]);
        case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n)result[index] = iteratee(index);
    return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */ function baseUnary(func) {
    return function(value) {
        return func(value);
    };
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function getValue(object, key) {
    return object == null ? undefined : object[key];
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/** Used for built-in method references. */ var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */ var coreJsData = root["__core-js_shared__"];
/** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect methods masquerading as native. */ var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
}();
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var nativeObjectToString = objectProto.toString;
/** Used to infer the `Object` constructor. */ var objectCtorString = funcToString.call(Object);
/** Used to detect if a method is native. */ var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/** Built-in value references. */ var Buffer = moduleExports ? root.Buffer : undefined, Symbol = root.Symbol, Uint8Array = root.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol ? Symbol.toStringTag : undefined;
var defineProperty = function() {
    try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
    } catch (e) {}
}();
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined, nativeMax = Math.max, nativeNow = Date.now;
/* Built-in method references that are verified to be native. */ var Map = getNative(root, "Map"), nativeCreate = getNative(Object, "create");
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */ var baseCreate = function() {
    function object() {}
    return function(proto) {
        if (!isObject(proto)) return {};
        if (objectCreate) return objectCreate(proto);
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
    };
}();
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
}
// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    if (index == lastIndex) data.pop();
    else splice.call(data, index, 1);
    --this.size;
    return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
        ++this.size;
        data.push([
            key,
            value
        ]);
    } else data[index][1] = value;
    return this;
}
// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
        "hash": new Hash,
        "map": new (Map || ListCache),
        "string": new Hash
    };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function mapCacheGet(key) {
    return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function mapCacheHas(key) {
    return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
}
// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */ function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function stackGet(key) {
    return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function stackHas(key) {
    return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */ function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([
                key,
                value
            ]);
            this.size = ++data.size;
            return this;
        }
        data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
}
// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for(var key in value)if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) result.push(key);
    return result;
}
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function assignMergeValue(object, key, value) {
    if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) baseAssignValue(object, key, value);
}
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) baseAssignValue(object, key, value);
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function assocIndexOf(array, key) {
    var length = array.length;
    while(length--){
        if (eq(array[length][0], key)) return length;
    }
    return -1;
}
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
    });
    else object[key] = value;
}
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */ var baseFor = createBaseFor();
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
    if (value == null) return value === undefined ? undefinedTag : nullTag;
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */ function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) return false;
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */ function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeysIn(object) {
    if (!isObject(object)) return nativeKeysIn(object);
    var isProto = isPrototype(object), result = [];
    for(var key in object)if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) result.push(key);
    return result;
}
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */ function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) return;
    baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack);
        if (isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined;
            if (newValue === undefined) newValue = srcValue;
            assignMergeValue(object, key, newValue);
        }
    }, keysIn);
}
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */ function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined;
    var isCommon = newValue === undefined;
    if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) newValue = objValue;
            else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue);
            else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
            } else newValue = [];
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) newValue = toPlainObject(objValue);
            else if (!isObject(objValue) || isFunction(objValue)) newValue = initCloneObject(srcValue);
        } else isCommon = false;
    }
    if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
    }
    assignMergeValue(object, key, newValue);
}
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */ function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + "");
}
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */ var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
    });
};
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */ function cloneBuffer(buffer, isDeep) {
    if (isDeep) return buffer.slice();
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
}
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */ function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
}
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */ function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */ function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while(++index < length)array[index] = source[index];
    return array;
}
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */ function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while(++index < length){
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
        if (newValue === undefined) newValue = source[key];
        if (isNew) baseAssignValue(object, key, newValue);
        else assignValue(object, key, newValue);
    }
    return object;
}
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */ function createAssigner(assigner) {
    return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
        }
        object = Object(object);
        while(++index < length){
            var source = sources[index];
            if (source) assigner(object, source, index, customizer);
        }
        return object;
    });
}
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */ function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while(length--){
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) break;
        }
        return object;
    };
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) value[symToStringTag] = tag;
        else delete value[symToStringTag];
    }
    return result;
}
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */ function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */ function isIterateeCall(value, index, object) {
    if (!isObject(object)) return false;
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
    return false;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function nativeKeysIn(object) {
    var result = [];
    if (object != null) for(var key in Object(object))result.push(key);
    return result;
}
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function objectToString(value) {
    return nativeObjectToString.call(value);
}
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */ function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while(++index < length)array[index] = args[start + index];
        index = -1;
        var otherArgs = Array(start + 1);
        while(++index < start)otherArgs[index] = args[index];
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
    };
}
/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") return;
    if (key == "__proto__") return;
    return object[key];
}
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */ var setToString = shortOut(baseSetToString);
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */ function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
            if (++count >= HOT_COUNT) return arguments[0];
        } else count = 0;
        return func.apply(undefined, arguments);
    };
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */ function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ var isArguments = baseIsArguments(function() {
    return arguments;
}()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */ var isBuffer = nativeIsBuffer || stubFalse;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    if (!isObject(value)) return false;
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return value != null && typeof value == "object";
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */ function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
    var proto = getPrototype(value);
    if (proto === null) return true;
    var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */ var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */ function toPlainObject(value) {
    return copyObject(value, keysIn(value));
}
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */ function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */ var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
});
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */ function constant(value) {
    return function() {
        return value;
    };
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */ function identity(value) {
    return value;
}
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */ function stubFalse() {
    return false;
}
module.exports = merge;

},{}],"jRtVY":[function(require,module,exports) {
"use strict";
var json = typeof JSON !== "undefined" ? JSON : require("9ed6fc870c58d3f");
var isArray = Array.isArray || function(x) {
    return ({}).toString.call(x) === "[object Array]";
};
var objectKeys = Object.keys || function(obj) {
    var has = Object.prototype.hasOwnProperty || function() {
        return true;
    };
    var keys = [];
    for(var key in obj)if (has.call(obj, key)) keys.push(key);
    return keys;
};
module.exports = function(obj, opts) {
    if (!opts) opts = {};
    if (typeof opts === "function") opts = {
        cmp: opts
    };
    var space = opts.space || "";
    if (typeof space === "number") space = Array(space + 1).join(" ");
    var cycles = typeof opts.cycles === "boolean" ? opts.cycles : false;
    var replacer = opts.replacer || function(key, value) {
        return value;
    };
    var cmp = opts.cmp && function(f) {
        return function(node) {
            return function(a, b) {
                var aobj = {
                    key: a,
                    value: node[a]
                };
                var bobj = {
                    key: b,
                    value: node[b]
                };
                return f(aobj, bobj);
            };
        };
    }(opts.cmp);
    var seen = [];
    return function stringify(parent, key, node, level) {
        var indent = space ? "\n" + new Array(level + 1).join(space) : "";
        var colonSeparator = space ? ": " : ":";
        if (node && node.toJSON && typeof node.toJSON === "function") node = node.toJSON();
        node = replacer.call(parent, key, node);
        if (node === undefined) return;
        if (typeof node !== "object" || node === null) return json.stringify(node);
        if (isArray(node)) {
            var out = [];
            for(var i = 0; i < node.length; i++){
                var item = stringify(node, i, node[i], level + 1) || json.stringify(null);
                out.push(indent + space + item);
            }
            return "[" + out.join(",") + indent + "]";
        }
        if (seen.indexOf(node) !== -1) {
            if (cycles) return json.stringify("__cycle__");
            throw new TypeError("Converting circular structure to JSON");
        } else seen.push(node);
        var keys = objectKeys(node).sort(cmp && cmp(node));
        var out = [];
        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var value = stringify(node, key, node[key], level + 1);
            if (!value) continue;
            var keyValue = json.stringify(key) + colonSeparator + value;
            out.push(indent + space + keyValue);
        }
        seen.splice(seen.indexOf(node), 1);
        return "{" + out.join(",") + indent + "}";
    }({
        "": obj
    }, "", obj, 0);
};

},{"9ed6fc870c58d3f":"lnGXP"}],"lnGXP":[function(require,module,exports) {
"use strict";
exports.parse = require("eba09d72ec70509f");
exports.stringify = require("b6148d02f7c0934c");

},{"eba09d72ec70509f":"9J5Vx","b6148d02f7c0934c":"1G3Ym"}],"9J5Vx":[function(require,module,exports) {
"use strict";
var at; // The index of the current character
var ch; // The current character
var escapee = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "	"
};
var text;
// Call error when something is wrong.
function error(m) {
    throw {
        name: "SyntaxError",
        message: m,
        at: at,
        text: text
    };
}
function next(c) {
    // If a c parameter is provided, verify that it matches the current character.
    if (c && c !== ch) error("Expected '" + c + "' instead of '" + ch + "'");
    // Get the next character. When there are no more characters, return the empty string.
    ch = text.charAt(at);
    at += 1;
    return ch;
}
function number() {
    // Parse a number value.
    var num;
    var str = "";
    if (ch === "-") {
        str = "-";
        next("-");
    }
    while(ch >= "0" && ch <= "9"){
        str += ch;
        next();
    }
    if (ch === ".") {
        str += ".";
        while(next() && ch >= "0" && ch <= "9")str += ch;
    }
    if (ch === "e" || ch === "E") {
        str += ch;
        next();
        if (ch === "-" || ch === "+") {
            str += ch;
            next();
        }
        while(ch >= "0" && ch <= "9"){
            str += ch;
            next();
        }
    }
    num = Number(str);
    if (!isFinite(num)) error("Bad number");
    return num;
}
function string() {
    // Parse a string value.
    var hex;
    var i;
    var str = "";
    var uffff;
    // When parsing for string values, we must look for " and \ characters.
    if (ch === '"') while(next()){
        if (ch === '"') {
            next();
            return str;
        } else if (ch === "\\") {
            next();
            if (ch === "u") {
                uffff = 0;
                for(i = 0; i < 4; i += 1){
                    hex = parseInt(next(), 16);
                    if (!isFinite(hex)) break;
                    uffff = uffff * 16 + hex;
                }
                str += String.fromCharCode(uffff);
            } else if (typeof escapee[ch] === "string") str += escapee[ch];
            else break;
        } else str += ch;
    }
    error("Bad string");
}
// Skip whitespace.
function white() {
    while(ch && ch <= " ")next();
}
// true, false, or null.
function word() {
    switch(ch){
        case "t":
            next("t");
            next("r");
            next("u");
            next("e");
            return true;
        case "f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return false;
        case "n":
            next("n");
            next("u");
            next("l");
            next("l");
            return null;
        default:
            error("Unexpected '" + ch + "'");
    }
}
// Parse an array value.
function array() {
    var arr = [];
    if (ch === "[") {
        next("[");
        white();
        if (ch === "]") {
            next("]");
            return arr; // empty array
        }
        while(ch){
            arr.push(value()); // eslint-disable-line no-use-before-define
            white();
            if (ch === "]") {
                next("]");
                return arr;
            }
            next(",");
            white();
        }
    }
    error("Bad array");
}
// Parse an object value.
function object() {
    var key;
    var obj = {};
    if (ch === "{") {
        next("{");
        white();
        if (ch === "}") {
            next("}");
            return obj; // empty object
        }
        while(ch){
            key = string();
            white();
            next(":");
            if (Object.prototype.hasOwnProperty.call(obj, key)) error('Duplicate key "' + key + '"');
            obj[key] = value(); // eslint-disable-line no-use-before-define
            white();
            if (ch === "}") {
                next("}");
                return obj;
            }
            next(",");
            white();
        }
    }
    error("Bad object");
}
// Parse a JSON value. It could be an object, an array, a string, a number, or a word.
function value() {
    white();
    switch(ch){
        case "{":
            return object();
        case "[":
            return array();
        case '"':
            return string();
        case "-":
            return number();
        default:
            return ch >= "0" && ch <= "9" ? number() : word();
    }
}
// Return the json_parse function. It will have access to all of the above functions and variables.
module.exports = function(source, reviver) {
    var result;
    text = source;
    at = 0;
    ch = " ";
    result = value();
    white();
    if (ch) error("Syntax error");
    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.
    return typeof reviver === "function" ? function walk(holder, key) {
        var k;
        var v;
        var val = holder[key];
        if (val && typeof val === "object") {
            for(k in value)if (Object.prototype.hasOwnProperty.call(val, k)) {
                v = walk(val, k);
                if (typeof v === "undefined") delete val[k];
                else val[k] = v;
            }
        }
        return reviver.call(holder, key, val);
    }({
        "": result
    }, "") : result;
};

},{}],"1G3Ym":[function(require,module,exports) {
"use strict";
var escapable = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var gap;
var indent;
var meta = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
};
var rep;
function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape sequences.
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
        var c = meta[a];
        return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}
function str(key, holder) {
    // Produce a string from holder[key].
    var i; // The loop counter.
    var k; // The member key.
    var v; // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];
    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === "object" && typeof value.toJSON === "function") value = value.toJSON(key);
    // If we were called with a replacer function, then call the replacer to obtain a replacement value.
    if (typeof rep === "function") value = rep.call(holder, key, value);
    // What happens next depends on the value's type.
    switch(typeof value){
        case "string":
            return quote(value);
        case "number":
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);
        case "object":
            if (!value) return "null";
            gap += indent;
            partial = [];
            // Array.isArray
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for(i = 0; i < length; i += 1)partial[i] = str(i, value) || "null";
                // Join all of the elements together, separated with commas, and wrap them in brackets.
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            // If the replacer is an array, use it to select the members to be stringified.
            if (rep && typeof rep === "object") {
                length = rep.length;
                for(i = 0; i < length; i += 1){
                    k = rep[i];
                    if (typeof k === "string") {
                        v = str(k, value);
                        if (v) partial.push(quote(k) + (gap ? ": " : ":") + v);
                    }
                }
            } else {
                // Otherwise, iterate through all of the keys in the object.
                for(k in value)if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = str(k, value);
                    if (v) partial.push(quote(k) + (gap ? ": " : ":") + v);
                }
            }
            // Join all of the member texts together, separated with commas, and wrap them in braces.
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        default:
    }
}
module.exports = function(value, replacer, space) {
    var i;
    gap = "";
    indent = "";
    // If the space parameter is a number, make an indent string containing that many spaces.
    if (typeof space === "number") for(i = 0; i < space; i += 1)indent += " ";
    else if (typeof space === "string") // If the space parameter is a string, it will be used as the indent string.
    indent = space;
    // If there is a replacer, it must be a function or an array. Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) throw new Error("JSON.stringify");
    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str("", {
        "": value
    });
};

},{}],"4Hia8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.averageResponseTime = averageResponseTime;
exports.canBeUsed = canBeUsed;
exports.close = close;
exports.create = create;
exports.microSeconds = exports["default"] = void 0;
exports.onMessage = onMessage;
exports.postMessage = postMessage;
exports.type = void 0;
var _util = require("3877fe9fc3c3476c");
var microSeconds = _util.microSeconds;
exports.microSeconds = microSeconds;
var type = "simulate";
exports.type = type;
var SIMULATE_CHANNELS = new Set();
function create(channelName) {
    var state = {
        name: channelName,
        messagesCallback: null
    };
    SIMULATE_CHANNELS.add(state);
    return state;
}
function close(channelState) {
    SIMULATE_CHANNELS["delete"](channelState);
}
function postMessage(channelState, messageJson) {
    return new Promise(function(res) {
        return setTimeout(function() {
            var channelArray = Array.from(SIMULATE_CHANNELS);
            channelArray.filter(function(channel) {
                return channel.name === channelState.name;
            }).filter(function(channel) {
                return channel !== channelState;
            }).filter(function(channel) {
                return !!channel.messagesCallback;
            }).forEach(function(channel) {
                return channel.messagesCallback(messageJson);
            });
            res();
        }, 5);
    });
}
function onMessage(channelState, fn) {
    channelState.messagesCallback = fn;
}
function canBeUsed() {
    return true;
}
function averageResponseTime() {
    return 5;
}
var _default = {
    create: create,
    close: close,
    onMessage: onMessage,
    postMessage: postMessage,
    canBeUsed: canBeUsed,
    type: type,
    averageResponseTime: averageResponseTime,
    microSeconds: microSeconds
};
exports["default"] = _default;

},{"3877fe9fc3c3476c":"4YTFM"}],"hHcJo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BasePostMessageStream", ()=>BasePostMessageStream);
parcelHelpers.export(exports, "IGNORE_SUBSTREAM", ()=>IGNORE_SUBSTREAM);
parcelHelpers.export(exports, "JRPCEngine", ()=>JRPCEngine);
parcelHelpers.export(exports, "ObjectMultiplex", ()=>ObjectMultiplex);
parcelHelpers.export(exports, "PostMessageStream", ()=>PostMessageStream);
parcelHelpers.export(exports, "SafeEventEmitter", ()=>SafeEventEmitter);
parcelHelpers.export(exports, "SerializableError", ()=>SerializableError);
parcelHelpers.export(exports, "Substream", ()=>Substream);
parcelHelpers.export(exports, "createAsyncMiddleware", ()=>createAsyncMiddleware);
parcelHelpers.export(exports, "createEngineStream", ()=>createEngineStream);
parcelHelpers.export(exports, "createErrorMiddleware", ()=>createErrorMiddleware);
parcelHelpers.export(exports, "createIdRemapMiddleware", ()=>createIdRemapMiddleware);
parcelHelpers.export(exports, "createLoggerMiddleware", ()=>createLoggerMiddleware);
parcelHelpers.export(exports, "createScaffoldMiddleware", ()=>createScaffoldMiddleware);
parcelHelpers.export(exports, "createStreamMiddleware", ()=>createStreamMiddleware);
parcelHelpers.export(exports, "getRpcPromiseCallback", ()=>getRpcPromiseCallback);
parcelHelpers.export(exports, "mergeMiddleware", ()=>mergeMiddleware);
parcelHelpers.export(exports, "setupMultiplex", ()=>setupMultiplex);
var _typeof = require("@babel/runtime/helpers/typeof");
var _typeofDefault = parcelHelpers.interopDefault(_typeof);
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _classCallCheckDefault = parcelHelpers.interopDefault(_classCallCheck);
var _createClass = require("@babel/runtime/helpers/createClass");
var _createClassDefault = parcelHelpers.interopDefault(_createClass);
var _assertThisInitialized = require("@babel/runtime/helpers/assertThisInitialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _inherits = require("@babel/runtime/helpers/inherits");
var _inheritsDefault = parcelHelpers.interopDefault(_inherits);
var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
var _getPrototypeOf = require("@babel/runtime/helpers/getPrototypeOf");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _readableStream = require("readable-stream");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var _asyncToGeneratorDefault = parcelHelpers.interopDefault(_asyncToGenerator);
var _regenerator = require("@babel/runtime/regenerator");
var _regeneratorDefault = parcelHelpers.interopDefault(_regenerator);
var _openloginUtils = require("@toruslabs/openlogin-utils");
var _events = require("events");
var _wrapNativeSuper = require("@babel/runtime/helpers/wrapNativeSuper");
var _wrapNativeSuperDefault = parcelHelpers.interopDefault(_wrapNativeSuper);
var _fastSafeStringify = require("fast-safe-stringify");
var _fastSafeStringifyDefault = parcelHelpers.interopDefault(_fastSafeStringify);
var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");
var _slicedToArrayDefault = parcelHelpers.interopDefault(_slicedToArray);
var _ethRpcErrors = require("eth-rpc-errors");
var _endOfStream = require("end-of-stream");
var _endOfStreamDefault = parcelHelpers.interopDefault(_endOfStream);
var _once = require("once");
var _onceDefault = parcelHelpers.interopDefault(_once);
var _pump = require("pump");
var _pumpDefault = parcelHelpers.interopDefault(_pump);
function _createSuper$6(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$6();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct$6() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function noop() {
    return undefined;
}
var SYN = "SYN";
var ACK = "ACK";
var BRK = "BRK";
var BasePostMessageStream = /*#__PURE__*/ function(_Duplex) {
    (0, _inheritsDefault.default)(BasePostMessageStream, _Duplex);
    var _super = _createSuper$6(BasePostMessageStream);
    function BasePostMessageStream(_ref) {
        var _this;
        var name = _ref.name, target = _ref.target, _ref$targetWindow = _ref.targetWindow, targetWindow = _ref$targetWindow === void 0 ? window : _ref$targetWindow, _ref$targetOrigin = _ref.targetOrigin, targetOrigin = _ref$targetOrigin === void 0 ? "*" : _ref$targetOrigin;
        (0, _classCallCheckDefault.default)(this, BasePostMessageStream);
        _this = _super.call(this, {
            objectMode: true
        });
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_init", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_haveSyn", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_name", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_target", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_targetWindow", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_targetOrigin", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_onMessage", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_synIntervalId", void 0);
        if (!name || !target) throw new Error("Invalid input.");
        _this._init = false;
        _this._haveSyn = false;
        _this._name = name;
        _this._target = target; // target origin
        _this._targetWindow = targetWindow;
        _this._targetOrigin = targetOrigin;
        _this._onMessage = _this.onMessage.bind((0, _assertThisInitializedDefault.default)(_this));
        _this._synIntervalId = null;
        window.addEventListener("message", _this._onMessage, false);
        _this._handShake();
        return _this;
    }
    (0, _createClassDefault.default)(BasePostMessageStream, [
        {
            key: "_break",
            value: function _break() {
                this.cork();
                this._write(BRK, null, noop);
                this._haveSyn = false;
                this._init = false;
            }
        },
        {
            key: "_handShake",
            value: function _handShake() {
                this._write(SYN, null, noop);
                this.cork();
            }
        },
        {
            key: "_onData",
            value: function _onData(data) {
                if (!this._init) {
                    // listen for handshake
                    if (data === SYN) {
                        this._haveSyn = true;
                        this._write(ACK, null, noop);
                    } else if (data === ACK) {
                        this._init = true;
                        if (!this._haveSyn) this._write(ACK, null, noop);
                        this.uncork();
                    }
                } else if (data === BRK) this._break();
                else // forward message
                try {
                    this.push(data);
                } catch (err) {
                    this.emit("error", err);
                }
            }
        },
        {
            key: "_postMessage",
            value: function _postMessage(data) {
                var originConstraint = this._targetOrigin;
                this._targetWindow.postMessage({
                    target: this._target,
                    data: data
                }, originConstraint);
            }
        },
        {
            key: "onMessage",
            value: function onMessage(event) {
                var message = event.data;
                // validate message
                if (this._targetOrigin !== "*" && event.origin !== this._targetOrigin || event.source !== this._targetWindow || (0, _typeofDefault.default)(message) !== "object" || message.target !== this._name || !message.data) return;
                this._onData(message.data);
            }
        },
        {
            key: "_read",
            value: function _read() {
                return undefined;
            }
        },
        {
            key: "_write",
            value: function _write(data, _, cb) {
                this._postMessage(data);
                cb();
            }
        },
        {
            key: "_destroy",
            value: function _destroy() {
                window.removeEventListener("message", this._onMessage, false);
            }
        }
    ]);
    return BasePostMessageStream;
}((0, _readableStream.Duplex));
function _createSuper$5(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$5();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct$5() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function safeApply(handler, context, args) {
    try {
        Reflect.apply(handler, context, args);
    } catch (err) {
        // Throw error after timeout so as not to interrupt the stack
        setTimeout(function() {
            throw err;
        });
    }
}
function arrayClone(arr) {
    var n = arr.length;
    var copy = new Array(n);
    for(var i = 0; i < n; i += 1)copy[i] = arr[i];
    return copy;
}
var SafeEventEmitter = /*#__PURE__*/ function(_EventEmitter) {
    (0, _inheritsDefault.default)(SafeEventEmitter, _EventEmitter);
    var _super = _createSuper$5(SafeEventEmitter);
    function SafeEventEmitter() {
        (0, _classCallCheckDefault.default)(this, SafeEventEmitter);
        return _super.apply(this, arguments);
    }
    (0, _createClassDefault.default)(SafeEventEmitter, [
        {
            key: "emit",
            value: function emit(type) {
                var doError = type === "error";
                var events = this._events;
                if (events !== undefined) doError = doError && events.error === undefined;
                else if (!doError) return false;
                // If there is no 'error' event listener then throw.
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)args[_key - 1] = arguments[_key];
                if (doError) {
                    var er;
                    if (args.length > 0) er = args[0];
                    if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
                    // up in Node's output if this results in an unhandled exception.
                    throw er; // Unhandled 'error' event
                    // At least give some kind of context to the user
                    var err = new Error("Unhandled error.".concat(er ? " (".concat(er.message, ")") : ""));
                    err.context = er;
                    throw err; // Unhandled 'error' event
                }
                var handler = events[type];
                if (handler === undefined) return false;
                if (typeof handler === "function") safeApply(handler, this, args);
                else {
                    var len = handler.length;
                    var listeners = arrayClone(handler);
                    for(var i = 0; i < len; i += 1)safeApply(listeners[i], this, args);
                }
                return true;
            }
        }
    ]);
    return SafeEventEmitter;
}((0, _events.EventEmitter));
function _createSuper$4(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$4();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct$4() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var SerializableError = /*#__PURE__*/ function(_Error) {
    (0, _inheritsDefault.default)(SerializableError, _Error);
    var _super = _createSuper$4(SerializableError);
    function SerializableError(_ref) {
        var _this;
        var code = _ref.code, message = _ref.message, data = _ref.data;
        (0, _classCallCheckDefault.default)(this, SerializableError);
        if (!Number.isInteger(code)) throw new Error("code must be an integer");
        if (!message || typeof message !== "string") throw new Error("message must be string");
        _this = _super.call(this, message);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "code", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "data", void 0);
        _this.code = code;
        if (data !== undefined) _this.data = data;
        return _this;
    }
    (0, _createClassDefault.default)(SerializableError, [
        {
            key: "toString",
            value: function toString() {
                return (0, _fastSafeStringifyDefault.default)({
                    code: this.code,
                    message: this.message,
                    data: this.data,
                    stack: this.stack
                });
            }
        }
    ]);
    return SerializableError;
}(/*#__PURE__*/ (0, _wrapNativeSuperDefault.default)(Error));
var getRpcPromiseCallback = function getRpcPromiseCallback(resolve, reject) {
    var unwrapResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return function(error, response) {
        if (error || response.error) reject(error || response.error);
        else if (!unwrapResult || Array.isArray(response)) resolve(response);
        else resolve(response.result);
    };
};
function createErrorMiddleware(log) {
    return function(req, res, next, end) {
        try {
            // json-rpc-engine will terminate the request when it notices this error
            if (typeof req.method !== "string" || !req.method) {
                res.error = new SerializableError({
                    code: -32603,
                    message: "invalid method"
                });
                end();
                return;
            }
            next(function(done) {
                var error = res.error;
                if (!error) return done();
                log.error("OpenLogin - RPC Error: ".concat(error.message), error);
                return done();
            });
        } catch (error) {
            log.error("OpenLogin - RPC Error thrown: ".concat(error.message), error);
            res.error = new SerializableError({
                code: -32603,
                message: error.message
            });
            end();
        }
    };
}
function createStreamMiddleware() {
    var idMap = {};
    function readNoop() {
        return false;
    }
    var events = new SafeEventEmitter();
    function processResponse(res) {
        var context = idMap[res.id];
        if (!context) throw new Error('StreamMiddleware - Unknown response id "'.concat(res.id, '"'));
        delete idMap[res.id];
        // copy whole res onto original res
        Object.assign(context.res, res);
        // run callback on empty stack,
        // prevent internal stream-handler from catching errors
        setTimeout(context.end);
    }
    function processNotification(res) {
        events.emit("notification", res);
    }
    function processMessage(res, _encoding, cb) {
        var err;
        try {
            var isNotification = !res.id;
            if (isNotification) processNotification(res);
            else processResponse(res);
        } catch (_err) {
            err = _err;
        }
        // continue processing stream
        cb(err);
    }
    var stream = new (0, _readableStream.Duplex)({
        objectMode: true,
        read: readNoop,
        write: processMessage
    });
    var middleware = function middleware(req, res, next, end) {
        // write req to stream
        stream.push(req);
        // register request on id map
        idMap[req.id] = {
            req: req,
            res: res,
            next: next,
            end: end
        };
    };
    return {
        events: events,
        middleware: middleware,
        stream: stream
    };
}
function createScaffoldMiddleware(handlers) {
    return function(req, res, next, end) {
        var handler = handlers[req.method];
        // if no handler, return
        if (handler === undefined) return next();
        // if handler is fn, call as middleware
        if (typeof handler === "function") return handler(req, res, next, end);
        // if handler is some other value, use as result
        res.result = handler;
        return end();
    };
}
function createIdRemapMiddleware() {
    return function(req, res, next, _end) {
        var originalId = req.id;
        var newId = (0, _openloginUtils.randomId)();
        req.id = newId;
        res.id = newId;
        next(function(done) {
            req.id = originalId;
            res.id = originalId;
            done();
        });
    };
}
function createLoggerMiddleware(logger) {
    return function(req, res, next, _) {
        logger.debug("REQ", req, "RES", res);
        next();
    };
}
function createAsyncMiddleware(asyncMiddleware) {
    return /*#__PURE__*/ function() {
        var _ref = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee2(req, res, next, end) {
            var resolveNextPromise, nextPromise, returnHandlerCallback, nextWasCalled, asyncNext;
            return (0, _regeneratorDefault.default).wrap(function _callee2$(_context2) {
                while(true)switch(_context2.prev = _context2.next){
                    case 0:
                        // nextPromise is the key to the implementation
                        // it is resolved by the return handler passed to the
                        // "next" function
                        nextPromise = new Promise(function(resolve) {
                            resolveNextPromise = resolve;
                        });
                        returnHandlerCallback = null;
                        nextWasCalled = false; // This will be called by the consumer's async middleware.
                        asyncNext = /*#__PURE__*/ function() {
                            var _ref2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee() {
                                return (0, _regeneratorDefault.default).wrap(function _callee$(_context) {
                                    while(true)switch(_context.prev = _context.next){
                                        case 0:
                                            nextWasCalled = true;
                                            // We pass a return handler to next(). When it is called by the engine,
                                            // the consumer's async middleware will resume executing.
                                            next(function(runReturnHandlersCallback) {
                                                // This callback comes from JRPCEngine._runReturnHandlers
                                                returnHandlerCallback = runReturnHandlersCallback;
                                                resolveNextPromise();
                                            });
                                            _context.next = 4;
                                            return nextPromise;
                                        case 4:
                                        case "end":
                                            return _context.stop();
                                    }
                                }, _callee);
                            }));
                            return function asyncNext() {
                                return _ref2.apply(this, arguments);
                            };
                        }();
                        _context2.prev = 4;
                        _context2.next = 7;
                        return asyncMiddleware(req, res, asyncNext);
                    case 7:
                        if (!nextWasCalled) {
                            _context2.next = 13;
                            break;
                        }
                        _context2.next = 10;
                        return nextPromise;
                    case 10:
                        // we must wait until the return handler is called
                        returnHandlerCallback(null);
                        _context2.next = 14;
                        break;
                    case 13:
                        end(null);
                    case 14:
                        _context2.next = 19;
                        break;
                    case 16:
                        _context2.prev = 16;
                        _context2.t0 = _context2["catch"](4);
                        if (returnHandlerCallback) returnHandlerCallback(_context2.t0);
                        else end(_context2.t0);
                    case 19:
                    case "end":
                        return _context2.stop();
                }
            }, _callee2, null, [
                [
                    4,
                    16
                ]
            ]);
        }));
        return function(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }();
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$1(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _createSuper$3(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct$3() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
/**
 * A JSON-RPC request and response processor.
 * Give it a stack of middleware, pass it requests, and get back responses.
 */ var JRPCEngine = /*#__PURE__*/ function(_SafeEventEmitter) {
    (0, _inheritsDefault.default)(JRPCEngine, _SafeEventEmitter);
    var _super = _createSuper$3(JRPCEngine);
    function JRPCEngine() {
        var _this;
        (0, _classCallCheckDefault.default)(this, JRPCEngine);
        _this = _super.call(this);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_middleware", void 0);
        _this._middleware = [];
        return _this;
    }
    /**
   * Serially executes the given stack of middleware.
   *
   * @returns An array of any error encountered during middleware execution,
   * a boolean indicating whether the request was completed, and an array of
   * middleware-defined return handlers.
   */ (0, _createClassDefault.default)(JRPCEngine, [
        {
            key: "push",
            value: /**
     * Add a middleware function to the engine's middleware stack.
     *
     * @param middleware - The middleware function to add.
     */ function push(middleware) {
                this._middleware.push(middleware);
            }
        },
        {
            key: "handle",
            value: function handle(req, cb) {
                if (cb && typeof cb !== "function") throw new Error('"callback" must be a function if provided.');
                if (Array.isArray(req)) {
                    if (cb) return this._handleBatch(req, cb);
                    return this._handleBatch(req);
                }
                if (cb) return this._handle(req, cb);
                return this._promiseHandle(req);
            }
        },
        {
            key: "asMiddleware",
            value: function asMiddleware() {
                var _this2 = this;
                return /*#__PURE__*/ function() {
                    var _ref = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee2(req, res, next, end) {
                        var _yield$JRPCEngine$_ru, _yield$JRPCEngine$_ru2, middlewareError, isComplete, returnHandlers;
                        return (0, _regeneratorDefault.default).wrap(function _callee2$(_context2) {
                            while(true)switch(_context2.prev = _context2.next){
                                case 0:
                                    _context2.prev = 0;
                                    _context2.next = 3;
                                    return JRPCEngine._runAllMiddleware(req, res, _this2._middleware);
                                case 3:
                                    _yield$JRPCEngine$_ru = _context2.sent;
                                    _yield$JRPCEngine$_ru2 = (0, _slicedToArrayDefault.default)(_yield$JRPCEngine$_ru, 3);
                                    middlewareError = _yield$JRPCEngine$_ru2[0];
                                    isComplete = _yield$JRPCEngine$_ru2[1];
                                    returnHandlers = _yield$JRPCEngine$_ru2[2];
                                    if (!isComplete) {
                                        _context2.next = 12;
                                        break;
                                    }
                                    _context2.next = 11;
                                    return JRPCEngine._runReturnHandlers(returnHandlers);
                                case 11:
                                    return _context2.abrupt("return", end(middlewareError));
                                case 12:
                                    return _context2.abrupt("return", next(/*#__PURE__*/ function() {
                                        var _ref2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee(handlerCallback) {
                                            return (0, _regeneratorDefault.default).wrap(function _callee$(_context) {
                                                while(true)switch(_context.prev = _context.next){
                                                    case 0:
                                                        _context.prev = 0;
                                                        _context.next = 3;
                                                        return JRPCEngine._runReturnHandlers(returnHandlers);
                                                    case 3:
                                                        _context.next = 8;
                                                        break;
                                                    case 5:
                                                        _context.prev = 5;
                                                        _context.t0 = _context["catch"](0);
                                                        return _context.abrupt("return", handlerCallback(_context.t0));
                                                    case 8:
                                                        return _context.abrupt("return", handlerCallback());
                                                    case 9:
                                                    case "end":
                                                        return _context.stop();
                                                }
                                            }, _callee, null, [
                                                [
                                                    0,
                                                    5
                                                ]
                                            ]);
                                        }));
                                        return function(_x5) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    }()));
                                case 15:
                                    _context2.prev = 15;
                                    _context2.t0 = _context2["catch"](0);
                                    return _context2.abrupt("return", end(_context2.t0));
                                case 18:
                                case "end":
                                    return _context2.stop();
                            }
                        }, _callee2, null, [
                            [
                                0,
                                15
                            ]
                        ]);
                    }));
                    return function(_x, _x2, _x3, _x4) {
                        return _ref.apply(this, arguments);
                    };
                }();
            }
        },
        {
            key: "_handleBatch",
            value: function() {
                var _handleBatch2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee3(reqs, cb) {
                    var responses;
                    return (0, _regeneratorDefault.default).wrap(function _callee3$(_context3) {
                        while(true)switch(_context3.prev = _context3.next){
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return Promise.all(// 1. Begin executing each request in the order received
                                reqs.map(this._promiseHandle.bind(this)));
                            case 3:
                                responses = _context3.sent;
                                if (!cb) {
                                    _context3.next = 6;
                                    break;
                                }
                                return _context3.abrupt("return", cb(null, responses));
                            case 6:
                                return _context3.abrupt("return", responses);
                            case 9:
                                _context3.prev = 9;
                                _context3.t0 = _context3["catch"](0);
                                if (!cb) {
                                    _context3.next = 13;
                                    break;
                                }
                                return _context3.abrupt("return", cb(_context3.t0));
                            case 13:
                                throw _context3.t0;
                            case 14:
                            case "end":
                                return _context3.stop();
                        }
                    }, _callee3, this, [
                        [
                            0,
                            9
                        ]
                    ]);
                }));
                function _handleBatch(_x6, _x7) {
                    return _handleBatch2.apply(this, arguments);
                }
                return _handleBatch;
            }()
        },
        {
            key: "_promiseHandle",
            value: function _promiseHandle(req) {
                var _this3 = this;
                return new Promise(function(resolve) {
                    _this3._handle(req, function(_err, res) {
                        // There will always be a response, and it will always have any error
                        // that is caught and propagated.
                        resolve(res);
                    });
                });
            }
        },
        {
            key: "_handle",
            value: function() {
                var _handle2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee4(callerReq, cb) {
                    var _error2, _error3, req, res, error;
                    return (0, _regeneratorDefault.default).wrap(function _callee4$(_context4) {
                        while(true)switch(_context4.prev = _context4.next){
                            case 0:
                                if (!(!callerReq || Array.isArray(callerReq) || (0, _typeofDefault.default)(callerReq) !== "object")) {
                                    _context4.next = 3;
                                    break;
                                }
                                _error2 = new SerializableError({
                                    code: -32603,
                                    message: "request must be plain object"
                                });
                                return _context4.abrupt("return", cb(_error2, {
                                    id: undefined,
                                    jsonrpc: "2.0",
                                    error: _error2
                                }));
                            case 3:
                                if (!(typeof callerReq.method !== "string")) {
                                    _context4.next = 6;
                                    break;
                                }
                                _error3 = new SerializableError({
                                    code: -32603,
                                    message: "method must be string"
                                });
                                return _context4.abrupt("return", cb(_error3, {
                                    id: callerReq.id,
                                    jsonrpc: "2.0",
                                    error: _error3
                                }));
                            case 6:
                                req = _objectSpread$1({}, callerReq);
                                res = {
                                    id: req.id,
                                    jsonrpc: req.jsonrpc
                                };
                                error = null;
                                _context4.prev = 9;
                                _context4.next = 12;
                                return this._processRequest(req, res);
                            case 12:
                                _context4.next = 17;
                                break;
                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4["catch"](9);
                                // A request handler error, a re-thrown middleware error, or something
                                // unexpected.
                                error = _context4.t0;
                            case 17:
                                if (error) {
                                    // Ensure no result is present on an errored response
                                    delete res.result;
                                    if (!res.error) res.error = (0, _ethRpcErrors.serializeError)(error);
                                }
                                return _context4.abrupt("return", cb(error, res));
                            case 19:
                            case "end":
                                return _context4.stop();
                        }
                    }, _callee4, this, [
                        [
                            9,
                            14
                        ]
                    ]);
                }));
                function _handle(_x8, _x9) {
                    return _handle2.apply(this, arguments);
                }
                return _handle;
            }()
        },
        {
            key: "_processRequest",
            value: function() {
                var _processRequest2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee5(req, res) {
                    var _yield$JRPCEngine$_ru3, _yield$JRPCEngine$_ru4, error, isComplete, returnHandlers;
                    return (0, _regeneratorDefault.default).wrap(function _callee5$(_context5) {
                        while(true)switch(_context5.prev = _context5.next){
                            case 0:
                                _context5.next = 2;
                                return JRPCEngine._runAllMiddleware(req, res, this._middleware);
                            case 2:
                                _yield$JRPCEngine$_ru3 = _context5.sent;
                                _yield$JRPCEngine$_ru4 = (0, _slicedToArrayDefault.default)(_yield$JRPCEngine$_ru3, 3);
                                error = _yield$JRPCEngine$_ru4[0];
                                isComplete = _yield$JRPCEngine$_ru4[1];
                                returnHandlers = _yield$JRPCEngine$_ru4[2];
                                // Throw if "end" was not called, or if the response has neither a result
                                // nor an error.
                                JRPCEngine._checkForCompletion(req, res, isComplete);
                                // The return handlers should run even if an error was encountered during
                                // middleware processing.
                                _context5.next = 10;
                                return JRPCEngine._runReturnHandlers(returnHandlers);
                            case 10:
                                if (!error) {
                                    _context5.next = 12;
                                    break;
                                }
                                throw error;
                            case 12:
                            case "end":
                                return _context5.stop();
                        }
                    }, _callee5, this);
                }));
                function _processRequest(_x10, _x11) {
                    return _processRequest2.apply(this, arguments);
                }
                return _processRequest;
            }()
        }
    ], [
        {
            key: "_runAllMiddleware",
            value: function() {
                var _runAllMiddleware2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee6(req, res, middlewareStack) {
                    var returnHandlers, error, isComplete, _iterator, _step, middleware, _yield$JRPCEngine$_ru5, _yield$JRPCEngine$_ru6;
                    return (0, _regeneratorDefault.default).wrap(function _callee6$(_context6) {
                        while(true)switch(_context6.prev = _context6.next){
                            case 0:
                                returnHandlers = [];
                                error = null;
                                isComplete = false; // Go down stack of middleware, call and collect optional returnHandlers
                                _iterator = _createForOfIteratorHelper(middlewareStack);
                                _context6.prev = 4;
                                _iterator.s();
                            case 6:
                                if ((_step = _iterator.n()).done) {
                                    _context6.next = 18;
                                    break;
                                }
                                middleware = _step.value;
                                _context6.next = 10;
                                return JRPCEngine._runMiddleware(req, res, middleware, returnHandlers);
                            case 10:
                                _yield$JRPCEngine$_ru5 = _context6.sent;
                                _yield$JRPCEngine$_ru6 = (0, _slicedToArrayDefault.default)(_yield$JRPCEngine$_ru5, 2);
                                error = _yield$JRPCEngine$_ru6[0];
                                isComplete = _yield$JRPCEngine$_ru6[1];
                                if (!isComplete) {
                                    _context6.next = 16;
                                    break;
                                }
                                return _context6.abrupt("break", 18);
                            case 16:
                                _context6.next = 6;
                                break;
                            case 18:
                                _context6.next = 23;
                                break;
                            case 20:
                                _context6.prev = 20;
                                _context6.t0 = _context6["catch"](4);
                                _iterator.e(_context6.t0);
                            case 23:
                                _context6.prev = 23;
                                _iterator.f();
                                return _context6.finish(23);
                            case 26:
                                return _context6.abrupt("return", [
                                    error,
                                    isComplete,
                                    returnHandlers.reverse()
                                ]);
                            case 27:
                            case "end":
                                return _context6.stop();
                        }
                    }, _callee6, null, [
                        [
                            4,
                            20,
                            23,
                            26
                        ]
                    ]);
                }));
                function _runAllMiddleware(_x12, _x13, _x14) {
                    return _runAllMiddleware2.apply(this, arguments);
                }
                return _runAllMiddleware;
            }()
        },
        {
            key: "_runMiddleware",
            value: function _runMiddleware(req, res, middleware, returnHandlers) {
                return new Promise(function(resolve) {
                    var end = function end(err) {
                        var error = err || res.error;
                        if (error) res.error = (0, _ethRpcErrors.serializeError)(error);
                        // True indicates that the request should end
                        resolve([
                            error,
                            true
                        ]);
                    };
                    var next = function next(returnHandler) {
                        if (res.error) end(res.error);
                        else {
                            if (returnHandler) {
                                if (typeof returnHandler !== "function") end(new SerializableError({
                                    code: -32603,
                                    message: "JRPCEngine: 'next' return handlers must be functions"
                                }));
                                returnHandlers.push(returnHandler);
                            }
                            // False indicates that the request should not end
                            resolve([
                                null,
                                false
                            ]);
                        }
                    };
                    try {
                        middleware(req, res, next, end);
                    } catch (error) {
                        end(error);
                    }
                });
            }
        },
        {
            key: "_runReturnHandlers",
            value: function() {
                var _runReturnHandlers2 = (0, _asyncToGeneratorDefault.default)(/*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _callee7(handlers) {
                    var _iterator2, _step2, _loop;
                    return (0, _regeneratorDefault.default).wrap(function _callee7$(_context8) {
                        while(true)switch(_context8.prev = _context8.next){
                            case 0:
                                _iterator2 = _createForOfIteratorHelper(handlers);
                                _context8.prev = 1;
                                _loop = /*#__PURE__*/ (0, _regeneratorDefault.default).mark(function _loop() {
                                    var handler;
                                    return (0, _regeneratorDefault.default).wrap(function _loop$(_context7) {
                                        while(true)switch(_context7.prev = _context7.next){
                                            case 0:
                                                handler = _step2.value;
                                                _context7.next = 3;
                                                return new Promise(function(resolve, reject) {
                                                    handler(function(err) {
                                                        return err ? reject(err) : resolve();
                                                    });
                                                });
                                            case 3:
                                            case "end":
                                                return _context7.stop();
                                        }
                                    }, _loop);
                                });
                                _iterator2.s();
                            case 4:
                                if ((_step2 = _iterator2.n()).done) {
                                    _context8.next = 8;
                                    break;
                                }
                                return _context8.delegateYield(_loop(), "t0", 6);
                            case 6:
                                _context8.next = 4;
                                break;
                            case 8:
                                _context8.next = 13;
                                break;
                            case 10:
                                _context8.prev = 10;
                                _context8.t1 = _context8["catch"](1);
                                _iterator2.e(_context8.t1);
                            case 13:
                                _context8.prev = 13;
                                _iterator2.f();
                                return _context8.finish(13);
                            case 16:
                            case "end":
                                return _context8.stop();
                        }
                    }, _callee7, null, [
                        [
                            1,
                            10,
                            13,
                            16
                        ]
                    ]);
                }));
                function _runReturnHandlers(_x15) {
                    return _runReturnHandlers2.apply(this, arguments);
                }
                return _runReturnHandlers;
            }()
        },
        {
            key: "_checkForCompletion",
            value: function _checkForCompletion(req, res, isComplete) {
                if (!("result" in res) && !("error" in res)) throw new SerializableError({
                    code: -32603,
                    message: "Response has no error or result for request"
                });
                if (!isComplete) throw new SerializableError({
                    code: -32603,
                    message: "Nothing ended request"
                });
            }
        }
    ]);
    return JRPCEngine;
}(SafeEventEmitter);
function mergeMiddleware(middlewareStack) {
    var engine = new JRPCEngine();
    middlewareStack.forEach(function(middleware) {
        return engine.push(middleware);
    });
    return engine.asMiddleware();
}
function createEngineStream(opts) {
    if (!opts || !opts.engine) throw new Error("Missing engine parameter!");
    var engine = opts.engine;
    // eslint-disable-next-line prefer-const
    var stream;
    function read() {
        return undefined;
    }
    function write(req, _encoding, cb) {
        engine.handle(req, function(_err, res) {
            stream.push(res);
        });
        cb();
    }
    stream = new (0, _readableStream.Duplex)({
        objectMode: true,
        read: read,
        write: write
    });
    // forward notifications
    if (engine.on) engine.on("notification", function(message) {
        stream.push(message);
    });
    return stream;
}
function _createSuper$2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct$2() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var Substream = /*#__PURE__*/ function(_Duplex) {
    (0, _inheritsDefault.default)(Substream, _Duplex);
    var _super = _createSuper$2(Substream);
    function Substream(_ref) {
        var _this;
        var parent = _ref.parent, name = _ref.name;
        (0, _classCallCheckDefault.default)(this, Substream);
        _this = _super.call(this, {
            objectMode: true
        });
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_parent", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_name", void 0);
        _this._parent = parent;
        _this._name = name;
        return _this;
    }
    /**
   * Explicitly sets read operations to a no-op.
   */ (0, _createClassDefault.default)(Substream, [
        {
            key: "_read",
            value: function _read() {
                return undefined;
            }
        },
        {
            key: "_write",
            value: function _write(chunk, _encoding, callback) {
                this._parent.push({
                    name: this._name,
                    data: chunk
                });
                callback();
            }
        }
    ]);
    return Substream;
}((0, _readableStream.Duplex));
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _definePropertyDefault.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _createSuper$1(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var IGNORE_SUBSTREAM = Symbol("IGNORE_SUBSTREAM");
var ObjectMultiplex = /*#__PURE__*/ function(_Duplex) {
    (0, _inheritsDefault.default)(ObjectMultiplex, _Duplex);
    var _super = _createSuper$1(ObjectMultiplex);
    function ObjectMultiplex() {
        var _this;
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheckDefault.default)(this, ObjectMultiplex);
        _this = _super.call(this, _objectSpread(_objectSpread({}, opts), {}, {
            objectMode: true
        }));
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "_substreams", void 0);
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "getStream", void 0);
        _this._substreams = {};
        return _this;
    }
    (0, _createClassDefault.default)(ObjectMultiplex, [
        {
            key: "createStream",
            value: function createStream(name) {
                // validate name
                if (!name) throw new Error("ObjectMultiplex - name must not be empty");
                if (this._substreams[name]) throw new Error('ObjectMultiplex - Substream for name "'.concat(name, '" already exists'));
                // create substream
                var substream = new Substream({
                    parent: this,
                    name: name
                });
                this._substreams[name] = substream;
                // listen for parent stream to end
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                anyStreamEnd(this, function(_error) {
                    return substream.destroy(_error || undefined);
                });
                return substream;
            }
        },
        {
            key: "ignoreStream",
            value: function ignoreStream(name) {
                // validate name
                if (!name) throw new Error("ObjectMultiplex - name must not be empty");
                if (this._substreams[name]) throw new Error('ObjectMultiplex - Substream for name "'.concat(name, '" already exists'));
                // set
                this._substreams[name] = IGNORE_SUBSTREAM;
            }
        },
        {
            key: "_read",
            value: function _read() {
                return undefined;
            }
        },
        {
            key: "_write",
            value: function _write(chunk, _encoding, callback) {
                var name = chunk.name, data = chunk.data;
                if (!name) {
                    window.console.warn('ObjectMultiplex - malformed chunk without name "'.concat(chunk, '"'));
                    return callback();
                }
                // get corresponding substream
                var substream = this._substreams[name];
                if (!substream) {
                    window.console.warn('ObjectMultiplex - orphaned data for stream "'.concat(name, '"'));
                    return callback();
                }
                // push data into substream
                if (substream !== IGNORE_SUBSTREAM) substream.push(data);
                return callback();
            }
        }
    ]);
    return ObjectMultiplex;
}((0, _readableStream.Duplex));
// util
function anyStreamEnd(stream, _cb) {
    var cb = (0, _onceDefault.default)(_cb);
    (0, _endOfStreamDefault.default)(stream, {
        readable: false
    }, cb);
    (0, _endOfStreamDefault.default)(stream, {
        writable: false
    }, cb);
}
function setupMultiplex(stream) {
    var mux = new ObjectMultiplex();
    mux.getStream = function streamHelper(name) {
        if (this._substreams[name]) return this._substreams[name];
        return this.createStream(name);
    };
    (0, _pumpDefault.default)(stream, mux, stream, function(err) {
        if (err) window.console.error(err);
    });
    return mux;
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var PostMessageStream = /*#__PURE__*/ function(_BasePostMessageStrea) {
    (0, _inheritsDefault.default)(PostMessageStream, _BasePostMessageStrea);
    var _super = _createSuper(PostMessageStream);
    function PostMessageStream() {
        (0, _classCallCheckDefault.default)(this, PostMessageStream);
        return _super.apply(this, arguments);
    }
    (0, _createClassDefault.default)(PostMessageStream, [
        {
            key: "_postMessage",
            value: function _postMessage(data) {
                var originConstraint = this._targetOrigin;
                if ((0, _typeofDefault.default)(data) === "object") {
                    var dataObj = data;
                    if ((0, _typeofDefault.default)(dataObj.data) === "object") {
                        var dataObjData = dataObj.data;
                        if (Array.isArray(dataObjData.params) && dataObjData.params.length > 0) {
                            var dataObjDataParam = dataObjData.params[0];
                            if (dataObjDataParam._origin) originConstraint = dataObjDataParam._origin;
                            // add a constraint for the response
                            dataObjDataParam._origin = window.location.origin;
                        }
                    }
                }
                this._targetWindow.postMessage({
                    target: this._target,
                    data: data
                }, originConstraint);
            }
        }
    ]);
    return PostMessageStream;
}(BasePostMessageStream);

},{"@babel/runtime/helpers/typeof":"jgQjt","@babel/runtime/helpers/classCallCheck":"3nRml","@babel/runtime/helpers/createClass":"2yzPp","@babel/runtime/helpers/assertThisInitialized":"1mVba","@babel/runtime/helpers/inherits":"bYd1U","@babel/runtime/helpers/possibleConstructorReturn":"cW3L5","@babel/runtime/helpers/getPrototypeOf":"gWrBy","@babel/runtime/helpers/defineProperty":"4x6r7","readable-stream":"jXNWE","@babel/runtime/helpers/asyncToGenerator":"jxKg8","@babel/runtime/regenerator":"5nQUq","@toruslabs/openlogin-utils":"iEicD","events":"1VQLm","@babel/runtime/helpers/wrapNativeSuper":"9vvYY","fast-safe-stringify":"dY7b6","@babel/runtime/helpers/slicedToArray":"6AJmz","eth-rpc-errors":"apfts","end-of-stream":"8Ulcf","once":"YXzlo","pump":"d2HVR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iEicD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "URLWithHashParams", ()=>URLWithHashParams);
parcelHelpers.export(exports, "base64toJSON", ()=>base64toJSON);
parcelHelpers.export(exports, "base64url", ()=>base64url);
parcelHelpers.export(exports, "jsonToBase64", ()=>jsonToBase64);
parcelHelpers.export(exports, "keccak", ()=>keccak);
parcelHelpers.export(exports, "keccak256", ()=>keccak256);
parcelHelpers.export(exports, "randomId", ()=>randomId);
parcelHelpers.export(exports, "safeatob", ()=>safeatob);
parcelHelpers.export(exports, "safebtoa", ()=>safebtoa);
var _randombytes = require("randombytes");
var _randombytesDefault = parcelHelpers.interopDefault(_randombytes);
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _classCallCheckDefault = parcelHelpers.interopDefault(_classCallCheck);
var _createClass = require("@babel/runtime/helpers/createClass");
var _createClassDefault = parcelHelpers.interopDefault(_createClass);
var _assertThisInitialized = require("@babel/runtime/helpers/assertThisInitialized");
var _assertThisInitializedDefault = parcelHelpers.interopDefault(_assertThisInitialized);
var _get = require("@babel/runtime/helpers/get");
var _getDefault = parcelHelpers.interopDefault(_get);
var _inherits = require("@babel/runtime/helpers/inherits");
var _inheritsDefault = parcelHelpers.interopDefault(_inherits);
var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");
var _possibleConstructorReturnDefault = parcelHelpers.interopDefault(_possibleConstructorReturn);
var _getPrototypeOf = require("@babel/runtime/helpers/getPrototypeOf");
var _getPrototypeOfDefault = parcelHelpers.interopDefault(_getPrototypeOf);
var _wrapNativeSuper = require("@babel/runtime/helpers/wrapNativeSuper");
var _wrapNativeSuperDefault = parcelHelpers.interopDefault(_wrapNativeSuper);
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var _definePropertyDefault = parcelHelpers.interopDefault(_defineProperty);
var _base64Url = require("base64url");
var _base64UrlDefault = parcelHelpers.interopDefault(_base64Url);
var _keccak = require("keccak");
var _keccakDefault = parcelHelpers.interopDefault(_keccak);
var Buffer = require("536954109d6d0905").Buffer;
var randomId = function randomId() {
    return (0, _randombytesDefault.default)(32).toString("hex");
};
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOfDefault.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOfDefault.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return (0, _possibleConstructorReturnDefault.default)(this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var URLWithHashParams = /*#__PURE__*/ function(_URL) {
    (0, _inheritsDefault.default)(URLWithHashParams, _URL);
    var _super = _createSuper(URLWithHashParams);
    function URLWithHashParams() {
        var _this;
        (0, _classCallCheckDefault.default)(this, URLWithHashParams);
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        _this = _super.call.apply(_super, [
            this
        ].concat(args));
        (0, _definePropertyDefault.default)((0, _assertThisInitializedDefault.default)(_this), "hashParams", new URLSearchParams());
        return _this;
    }
    (0, _createClassDefault.default)(URLWithHashParams, [
        {
            key: "toString",
            value: function toString() {
                this.hash = this.hashParams.toString();
                return (0, _getDefault.default)((0, _getPrototypeOfDefault.default)(URLWithHashParams.prototype), "toString", this).call(this);
            }
        }
    ]);
    return URLWithHashParams;
}(/*#__PURE__*/ (0, _wrapNativeSuperDefault.default)(URL));
var base64url = (0, _base64UrlDefault.default);
function safebtoa(str) {
    return base64url.encode(str);
}
function safeatob(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return base64url.decode(str);
}
var keccak = (0, _keccakDefault.default);
function base64toJSON(b64str) {
    return JSON.parse(base64url.decode(b64str));
}
function jsonToBase64(json) {
    return base64url.encode(JSON.stringify(json));
}
function keccak256(str) {
    var input = str;
    if (typeof str === "string" && str.slice(0, 2) === "0x" && str.length === 66) input = Buffer.from(str.slice(2), "hex");
    var data = "0x".concat(keccak("keccak256").update(input).digest("hex").padStart(64, "0"));
    return data;
}

},{"536954109d6d0905":"fCgem","randombytes":"8hjhE","@babel/runtime/helpers/classCallCheck":"3nRml","@babel/runtime/helpers/createClass":"2yzPp","@babel/runtime/helpers/assertThisInitialized":"1mVba","@babel/runtime/helpers/get":"fmPRF","@babel/runtime/helpers/inherits":"bYd1U","@babel/runtime/helpers/possibleConstructorReturn":"cW3L5","@babel/runtime/helpers/getPrototypeOf":"gWrBy","@babel/runtime/helpers/wrapNativeSuper":"9vvYY","@babel/runtime/helpers/defineProperty":"4x6r7","base64url":"5xeES","keccak":"cOBab","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fmPRF":[function(require,module,exports) {
var superPropBase = require("1df287b7e2393b95");
function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
    else module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(arguments.length < 3 ? target : receiver);
        return desc.value;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _get.apply(this, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{"1df287b7e2393b95":"exALs"}],"exALs":[function(require,module,exports) {
var getPrototypeOf = require("998f6d25049764bb");
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{"998f6d25049764bb":"gWrBy"}],"9vvYY":[function(require,module,exports) {
var getPrototypeOf = require("572deb8ab86ad853");
var setPrototypeOf = require("5152d315af8782c3");
var isNativeFunction = require("c737b62f7df7b1b7");
var construct = require("178088e8a222c7c1");
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return construct(Class, arguments, getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return setPrototypeOf(Wrapper, Class);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _wrapNativeSuper(Class);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{"572deb8ab86ad853":"gWrBy","5152d315af8782c3":"bblYu","c737b62f7df7b1b7":"fUxK1","178088e8a222c7c1":"bh8Gs"}],"fUxK1":[function(require,module,exports) {
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{}],"bh8Gs":[function(require,module,exports) {
var setPrototypeOf = require("a159124c4e33ed4");
var isNativeReflectConstruct = require("105f4daac89b3864");
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
    else module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{"a159124c4e33ed4":"bblYu","105f4daac89b3864":"8rnjo"}],"8rnjo":[function(require,module,exports) {
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{}],"6AJmz":[function(require,module,exports) {
var arrayWithHoles = require("400cacc8d033a9e5");
var iterableToArrayLimit = require("ce5e624e7b0a9812");
var unsupportedIterableToArray = require("4b748c983977a3ba");
var nonIterableRest = require("213bdcc58b79dd02");
function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{"400cacc8d033a9e5":"5CPOx","ce5e624e7b0a9812":"2B9nq","4b748c983977a3ba":"cFxnT","213bdcc58b79dd02":"9O5RF"}],"5CPOx":[function(require,module,exports) {
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{}],"2B9nq":[function(require,module,exports) {
function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for(; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
            _d = !0, _e = err;
        } finally{
            try {
                if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{}],"cFxnT":[function(require,module,exports) {
var arrayLikeToArray = require("3d1e6439d3a17846");
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{"3d1e6439d3a17846":"2QyYi"}],"2QyYi":[function(require,module,exports) {
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{}],"9O5RF":[function(require,module,exports) {
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

},{}],"dpmgS":[function(require,module,exports) {
"use strict";
const isStream = (stream)=>stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
isStream.writable = (stream)=>isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
isStream.readable = (stream)=>isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
isStream.duplex = (stream)=>isStream.writable(stream) && isStream.readable(stream);
isStream.transform = (stream)=>isStream.duplex(stream) && typeof stream._transform === "function";
module.exports = isStream;

},{}],"ixZYU":[function(require,module,exports) {
"use strict";
// do not edit .js files directly - edit src/index.jst
module.exports = function equal(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;
            return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for(i = length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for(i = length; i-- !== 0;){
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
        }
        return true;
    }
    // true if both NaN, false otherwise
    return a !== a && b !== b;
};

},{}]},["4PNEk"], null, "parcelRequirec720")

//# sourceMappingURL=solanaEmbed.esm.16e1c615.js.map
