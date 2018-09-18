window.MagicScroll = (function() {
    var u, v;
    u = v = (function() {
        var R = {
            version: "v3.3-b5-1",
            UUID: 0,
            storage: {},
            $uuid: function(V) {
                return (V.$J_UUID || (V.$J_UUID = ++L.UUID))
            },
            getStorage: function(V) {
                return (L.storage[V] || (L.storage[V] = {}))
            },
            $F: function() {},
            $false: function() {
                return false
            },
            $true: function() {
                return true
            },
            stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
            defined: function(V) {
                return (undefined != V)
            },
            ifndef: function(W, V) {
                return (undefined != W) ? W : V
            },
            exists: function(V) {
                return !!(V)
            },
            jTypeOf: function(V) {
                if (!L.defined(V)) {
                    return false
                }
                if (V.$J_TYPE) {
                    return V.$J_TYPE
                }
                if (!!V.nodeType) {
                    if (1 == V.nodeType) {
                        return "element"
                    }
                    if (3 == V.nodeType) {
                        return "textnode"
                    }
                }
                if (V.length && V.item) {
                    return "collection"
                }
                if (V.length && V.callee) {
                    return "arguments"
                }
                if ((V instanceof window.Object || V instanceof window.Function) && V.constructor === L.Class) {
                    return "class"
                }
                if (V instanceof window.Array) {
                    return "array"
                }
                if (V instanceof window.Function) {
                    return "function"
                }
                if (V instanceof window.String) {
                    return "string"
                }
                if (L.browser.trident) {
                    if (L.defined(V.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (V === window.event || V.constructor == window.Event || V.constructor == window.MouseEvent || V.constructor == window.UIEvent || V.constructor == window.KeyboardEvent || V.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (V instanceof window.Date) {
                    return "date"
                }
                if (V instanceof window.RegExp) {
                    return "regexp"
                }
                if (V === window) {
                    return "window"
                }
                if (V === document) {
                    return "document"
                }
                return typeof(V)
            },
            extend: function(aa, Z) {
                if (!(aa instanceof window.Array)) {
                    aa = [aa]
                }
                if (!Z) {
                    return aa[0]
                }
                for (var Y = 0, W = aa.length; Y < W; Y++) {
                    if (!L.defined(aa)) {
                        continue
                    }
                    for (var X in Z) {
                        if (!Object.prototype.hasOwnProperty.call(Z, X)) {
                            continue
                        }
                        try {
                            aa[Y][X] = Z[X]
                        } catch (V) {}
                    }
                }
                return aa[0]
            },
            implement: function(Z, Y) {
                if (!(Z instanceof window.Array)) {
                    Z = [Z]
                }
                for (var X = 0, V = Z.length; X < V; X++) {
                    if (!L.defined(Z[X])) {
                        continue
                    }
                    if (!Z[X].prototype) {
                        continue
                    }
                    for (var W in (Y || {})) {
                        if (!Z[X].prototype[W]) {
                            Z[X].prototype[W] = Y[W]
                        }
                    }
                }
                return Z[0]
            },
            nativize: function(X, W) {
                if (!L.defined(X)) {
                    return X
                }
                for (var V in (W || {})) {
                    if (!X[V]) {
                        X[V] = W[V]
                    }
                }
                return X
            },
            $try: function() {
                for (var W = 0, V = arguments.length; W < V; W++) {
                    try {
                        return arguments[W]()
                    } catch (X) {}
                }
                return null
            },
            $A: function(X) {
                if (!L.defined(X)) {
                    return L.$([])
                }
                if (X.toArray) {
                    return L.$(X.toArray())
                }
                if (X.item) {
                    var W = X.length || 0,
                        V = new Array(W);
                    while (W--) {
                        V[W] = X[W]
                    }
                    return L.$(V)
                }
                return L.$(Array.prototype.slice.call(X))
            },
            now: function() {
                return new Date().getTime()
            },
            detach: function(Z) {
                var X;
                switch (L.jTypeOf(Z)) {
                    case "object":
                        X = {};
                        for (var Y in Z) {
                            X[Y] = L.detach(Z[Y])
                        }
                        break;
                    case "array":
                        X = [];
                        for (var W = 0, V = Z.length; W < V; W++) {
                            X[W] = L.detach(Z[W])
                        }
                        break;
                    default:
                        return Z
                }
                return L.$(X)
            },
            $: function(X) {
                var V = true;
                if (!L.defined(X)) {
                    return null
                }
                if (X.$J_EXT) {
                    return X
                }
                switch (L.jTypeOf(X)) {
                    case "array":
                        X = L.nativize(X, L.extend(L.Array, {
                            $J_EXT: L.$F
                        }));
                        X.jEach = X.forEach;
                        return X;
                        break;
                    case "string":
                        var W = document.getElementById(X);
                        if (L.defined(W)) {
                            return L.$(W)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        L.$uuid(X);
                        X = L.extend(X, L.Doc);
                        break;
                    case "element":
                        L.$uuid(X);
                        X = L.extend(X, L.Element);
                        break;
                    case "event":
                        X = L.extend(X, L.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        V = false;
                        break
                }
                if (V) {
                    return L.extend(X, {
                        $J_EXT: L.$F
                    })
                } else {
                    return X
                }
            },
            $new: function(V, X, W) {
                return L.$(L.doc.createElement(V)).setProps(X || {}).jSetCss(W || {})
            },
            addCSS: function(Y, Z, W) {
                var V, ab, X, ad = [],
                    ac = -1;
                W || (W = L.stylesId);
                V = L.$(W) || L.$new("style", {
                    id: W,
                    type: "text/css"
                }).jAppendTo((document.head || document.body), "top");
                ab = V.sheet || V.styleSheet;
                if ("string" != L.jTypeOf(Z)) {
                    for (var X in Z) {
                        ad.push(X + ":" + Z[X])
                    }
                    Z = ad.join(";")
                }
                if (ab.insertRule) {
                    ac = ab.insertRule(Y + " {" + Z + "}", ab.cssRules.length)
                } else {
                    try {
                        ac = ab.addRule(Y, Z, ab.rules.length)
                    } catch (aa) {}
                }
                return ac
            },
            removeCSS: function(Y, V) {
                var X, W;
                X = L.$(Y);
                if ("element" !== L.jTypeOf(X)) {
                    return
                }
                W = X.sheet || X.styleSheet;
                if (W.deleteRule) {
                    W.deleteRule(V)
                } else {
                    if (W.removeRule) {
                        W.removeRule(V)
                    }
                }
            },
            generateUUID: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(X) {
                    var W = Math.random() * 16 | 0,
                        V = X == "x" ? W : (W & 3 | 8);
                    return V.toString(16)
                }).toUpperCase()
            },
            getAbsoluteURL: (function() {
                var V;
                return function(W) {
                    if (!V) {
                        V = document.createElement("a")
                    }
                    V.setAttribute("href", W);
                    return ("!!" + V.href).replace("!!", "")
                }
            })(),
            getHashCode: function(X) {
                var Y = 0,
                    V = X.length;
                for (var W = 0; W < V; ++W) {
                    Y = 31 * Y + X.charCodeAt(W);
                    Y %= 4294967296
                }
                return Y
            }
        };
        var L = R;
        var M = R.$;
        if (!window.magicJS) {
            window.magicJS = R;
            window.$mjs = R.$
        }
        L.Array = {
            $J_TYPE: "array",
            indexOf: function(Y, Z) {
                var V = this.length;
                for (var W = this.length, X = (Z < 0) ? Math.max(0, W + Z) : Z || 0; X < W; X++) {
                    if (this[X] === Y) {
                        return X
                    }
                }
                return -1
            },
            contains: function(V, W) {
                return this.indexOf(V, W) != -1
            },
            forEach: function(V, Y) {
                for (var X = 0, W = this.length; X < W; X++) {
                    if (X in this) {
                        V.call(Y, this[X], X, this)
                    }
                }
            },
            filter: function(V, aa) {
                var Z = [];
                for (var Y = 0, W = this.length; Y < W; Y++) {
                    if (Y in this) {
                        var X = this[Y];
                        if (V.call(aa, this[Y], Y, this)) {
                            Z.push(X)
                        }
                    }
                }
                return Z
            },
            map: function(V, Z) {
                var Y = [];
                for (var X = 0, W = this.length; X < W; X++) {
                    if (X in this) {
                        Y[X] = V.call(Z, this[X], X, this)
                    }
                }
                return Y
            }
        };
        L.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(V, W) {
                return (W || false) ? (this.toString() === V.toString()) : (this.toLowerCase().toString() === V.toLowerCase().toString())
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(V) {
                    return V.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(V) {
                    return ("-" + V.charAt(0).toLowerCase())
                })
            },
            jToInt: function(V) {
                return parseInt(this, V || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(W, V) {
                V = V || "";
                return (V + this + V).indexOf(V + W + V) > -1
            }
        });
        R.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var W = L.$A(arguments),
                    V = this,
                    X = W.shift();
                return function() {
                    return V.apply(X || null, W.concat(L.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var W = L.$A(arguments),
                    V = this,
                    X = W.shift();
                return function(Y) {
                    return V.apply(X || null, L.$([Y || (L.browser.ieMode ? window.event : null)]).concat(W))
                }
            },
            jDelay: function() {
                var W = L.$A(arguments),
                    V = this,
                    X = W.shift();
                return window.setTimeout(function() {
                    return V.apply(V, W)
                }, X || 0)
            },
            jDefer: function() {
                var W = L.$A(arguments),
                    V = this;
                return function() {
                    return V.jDelay.apply(V, W)
                }
            },
            interval: function() {
                var W = L.$A(arguments),
                    V = this,
                    X = W.shift();
                return window.setInterval(function() {
                    return V.apply(V, W)
                }, X || 0)
            }
        });
        var S = {},
            K = navigator.userAgent.toLowerCase(),
            J = K.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i),
            O = K.match(/(edge|opr)\/(\d+\.?\d*)/i) || K.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
            Q = K.match(/version\/(\d+\.?\d*)/i),
            F = document.documentElement.style;

        function G(W) {
            var V = W.charAt(0).toUpperCase() + W.slice(1);
            return W in F || ("Webkit" + V) in F || ("Moz" + V) in F || ("ms" + V) in F || ("O" + V) in F
        }
        L.browser = {
            features: {
                xpath: !!(document.evaluate),
                air: !!(window.runtime),
                query: !!(document.querySelector),
                fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition: G("transition"),
                transform: G("transform"),
                perspective: G("perspective"),
                animation: G("animation"),
                requestAnimationFrame: false,
                multibackground: false,
                cssFilters: false,
                canvas: false,
                svg: (function() {
                    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
                })()
            },
            touchScreen: function() {
                return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
            }(),
            mobile: K.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/) ? true : false,
            engine: (J && J[1]) ? J[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (undefined !== document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : (null !== window.WebKitPoint || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: (J && J[2]) ? parseFloat(J[2]) : 0,
            uaName: (O && O[1]) ? O[1].toLowerCase() : "",
            uaVersion: (O && O[2]) ? parseFloat(O[2]) : 0,
            cssPrefix: "",
            cssDomPrefix: "",
            domPrefix: "",
            ieMode: 0,
            platform: K.match(/ip(?:ad|od|hone)/) ? "ios" : (K.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
            scrollbarsWidth: 0,
            getDoc: function() {
                return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
            },
            requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready: false,
            onready: function() {
                if (L.browser.ready) {
                    return
                }
                var Y, X;
                L.browser.ready = true;
                L.body = L.$(document.body);
                L.win = L.$(window);
                try {
                    var W = L.$new("div").jSetCss({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).jAppendTo(document.body);
                    L.browser.scrollbarsWidth = W.offsetWidth - W.clientWidth;
                    W.jRemove()
                } catch (V) {}
                try {
                    Y = L.$new("div");
                    X = Y.style;
                    X.cssText = "background:url(https://),url(https://),red url(https://)";
                    L.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(X.background);
                    X = null;
                    Y = null
                } catch (V) {}
                if (!L.browser.cssTransformProp) {
                    L.browser.cssTransformProp = L.normalizeCSS("transform").dashize()
                }
                try {
                    Y = L.$new("div");
                    Y.style.cssText = L.normalizeCSS("filter").dashize() + ":blur(2px);";
                    L.browser.features.cssFilters = !!Y.style.length && (!L.browser.ieMode || L.browser.ieMode > 9);
                    Y = null
                } catch (V) {}
                if (!L.browser.features.cssFilters) {
                    L.$(document.documentElement).jAddClass("no-cssfilters-magic")
                }
                try {
                    L.browser.features.canvas = (function() {
                        var Z = L.$new("canvas");
                        return !!(Z.getContext && Z.getContext("2d"))
                    })()
                } catch (V) {}
                if (undefined === window.TransitionEvent && undefined !== window.WebKitTransitionEvent) {
                    S.transitionend = "webkitTransitionEnd"
                }
                L.Doc.jCallEvent.call(L.$(document), "domready")
            }
        };
        (function() {
            var aa = [],
                Z, Y, W;

            function V() {
                return !!(arguments.callee.caller)
            }
            switch (L.browser.engine) {
                case "trident":
                    if (!L.browser.version) {
                        L.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
                    }
                    break;
                case "gecko":
                    L.browser.version = (O && O[2]) ? parseFloat(O[2]) : 0;
                    break
            }
            L.browser[L.browser.engine] = true;
            if (O && "crios" === O[1]) {
                L.browser.uaName = "chrome"
            }
            if (!!window.chrome) {
                L.browser.chrome = true
            }
            if (O && "opr" === O[1]) {
                L.browser.uaName = "opera";
                L.browser.opera = true
            }
            if ("safari" === L.browser.uaName && (Q && Q[1])) {
                L.browser.uaVersion = parseFloat(Q[1])
            }
            if ("android" == L.browser.platform && L.browser.webkit && (Q && Q[1])) {
                L.browser.androidBrowser = true
            }
            Z = ({
                gecko: ["-moz-", "Moz", "moz"],
                webkit: ["-webkit-", "Webkit", "webkit"],
                trident: ["-ms-", "ms", "ms"],
                presto: ["-o-", "O", "o"]
            })[L.browser.engine] || ["", "", ""];
            L.browser.cssPrefix = Z[0];
            L.browser.cssDomPrefix = Z[1];
            L.browser.domPrefix = Z[2];
            L.browser.ieMode = (!L.browser.trident) ? undefined : (document.documentMode) ? document.documentMode : function() {
                var ab = 0;
                if (L.browser.backCompat) {
                    return 5
                }
                switch (L.browser.version) {
                    case 2:
                        ab = 6;
                        break;
                    case 3:
                        ab = 7;
                        break
                }
                return ab
            }();
            aa.push(L.browser.platform + "-magic");
            if (L.browser.mobile) {
                aa.push("mobile-magic")
            }
            if (L.browser.androidBrowser) {
                aa.push("android-browser-magic")
            }
            if (L.browser.ieMode) {
                L.browser.uaName = "ie";
                L.browser.uaVersion = L.browser.ieMode;
                aa.push("ie" + L.browser.ieMode + "-magic");
                for (Y = 11; Y > L.browser.ieMode; Y--) {
                    aa.push("lt-ie" + Y + "-magic")
                }
            }
            if (L.browser.webkit && L.browser.version < 536) {
                L.browser.features.fullScreen = false
            }
            if (L.browser.requestAnimationFrame) {
                L.browser.requestAnimationFrame.call(window, function() {
                    L.browser.features.requestAnimationFrame = true
                })
            }
            if (L.browser.features.svg) {
                aa.push("svg-magic")
            } else {
                aa.push("no-svg-magic")
            }
            W = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = L.$(W).concat(aa).join(" ");
            try {
                document.documentElement.setAttribute("data-magic-ua", L.browser.uaName);
                document.documentElement.setAttribute("data-magic-ua-ver", L.browser.uaVersion)
            } catch (X) {}
            if (L.browser.ieMode && L.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption")
            }
        })();
        (function() {
            L.browser.fullScreen = {
                capable: L.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[L.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[L.browser.domPrefix + "FullScreen"])
                },
                request: function(V, W) {
                    W || (W = {});
                    if (this.capable) {
                        L.$(document).jAddEvent(this.changeEventName, this.onchange = function(X) {
                            if (this.enabled()) {
                                W.onEnter && W.onEnter()
                            } else {
                                L.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                W.onExit && W.onExit()
                            }
                        }.jBindAsEvent(this));
                        L.$(document).jAddEvent(this.errorEventName, this.onerror = function(X) {
                            W.fallback && W.fallback();
                            L.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                        }.jBindAsEvent(this));
                        (V[L.browser.domPrefix + "RequestFullscreen"] || V[L.browser.domPrefix + "RequestFullScreen"] || V.requestFullscreen || function() {}).call(V)
                    } else {
                        if (W.fallback) {
                            W.fallback()
                        }
                    }
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[L.browser.domPrefix + "ExitFullscreen"] || document[L.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : L.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : L.browser.domPrefix) + "fullscreenerror",
                prefix: L.browser.domPrefix,
                activeElement: null
            }
        })();
        var U = /\S+/g,
            I = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            N = {
                "float": ("undefined" === typeof(F.styleFloat)) ? "cssFloat" : "styleFloat"
            },
            P = {
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                zIndex: true,
                zoom: true
            },
            H = (window.getComputedStyle) ? function(X, V) {
                var W = window.getComputedStyle(X, null);
                return W ? W.getPropertyValue(V) || W[V] : null
            } : function(Y, W) {
                var X = Y.currentStyle,
                    V = null;
                V = X ? X[W] : null;
                if (null == V && Y.style && Y.style[W]) {
                    V = Y.style[W]
                }
                return V
            };

        function T(X) {
            var V, W;
            W = (L.browser.webkit && "filter" == X) ? false : (X in F);
            if (!W) {
                V = L.browser.cssDomPrefix + X.charAt(0).toUpperCase() + X.slice(1);
                if (V in F) {
                    return V
                }
            }
            return X
        }
        L.normalizeCSS = T;
        L.Element = {
            jHasClass: function(V) {
                return !(V || "").has(" ") && (this.className || "").has(V, " ")
            },
            jAddClass: function(Z) {
                var W = (this.className || "").match(U) || [],
                    Y = (Z || "").match(U) || [],
                    V = Y.length,
                    X = 0;
                for (; X < V; X++) {
                    if (!L.$(W).contains(Y[X])) {
                        W.push(Y[X])
                    }
                }
                this.className = W.join(" ");
                return this
            },
            jRemoveClass: function(aa) {
                var W = (this.className || "").match(U) || [],
                    Z = (aa || "").match(U) || [],
                    V = Z.length,
                    Y = 0,
                    X;
                for (; Y < V; Y++) {
                    if ((X = L.$(W).indexOf(Z[Y])) > -1) {
                        W.splice(X, 1)
                    }
                }
                this.className = aa ? W.join(" ") : "";
                return this
            },
            jToggleClass: function(V) {
                return this.jHasClass(V) ? this.jRemoveClass(V) : this.jAddClass(V)
            },
            jGetCss: function(W) {
                var X = W.jCamelize(),
                    V = null;
                W = N[X] || (N[X] = T(X));
                V = H(this, W);
                if ("auto" === V) {
                    V = null
                }
                if (null !== V) {
                    if ("opacity" == W) {
                        return L.defined(V) ? parseFloat(V) : 1
                    }
                    if (I.test(W)) {
                        V = parseInt(V, 10) ? V : "0px"
                    }
                }
                return V
            },
            jSetCssProp: function(W, V) {
                var Y = W.jCamelize();
                try {
                    if ("opacity" == W) {
                        this.jSetOpacity(V);
                        return this
                    }
                    W = N[Y] || (N[Y] = T(Y));
                    this.style[W] = V + (("number" == L.jTypeOf(V) && !P[Y]) ? "px" : "")
                } catch (X) {}
                return this
            },
            jSetCss: function(W) {
                for (var V in W) {
                    this.jSetCssProp(V, W[V])
                }
                return this
            },
            jGetStyles: function() {
                var V = {};
                L.$A(arguments).jEach(function(W) {
                    V[W] = this.jGetCss(W)
                }, this);
                return V
            },
            jSetOpacity: function(X, V) {
                var W;
                V = V || false;
                this.style.opacity = X;
                X = parseInt(parseFloat(X) * 100);
                if (V) {
                    if (0 === X) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (L.browser.ieMode && L.browser.ieMode < 9) {
                    if (!isNaN(X)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + X + ")"
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + X)
                        }
                    } else {
                        this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                        if ("" === this.style.filter) {
                            this.style.removeAttribute("filter")
                        }
                    }
                }
                return this
            },
            setProps: function(V) {
                for (var W in V) {
                    if ("class" === W) {
                        this.jAddClass("" + V[W])
                    } else {
                        this.setAttribute(W, "" + V[W])
                    }
                }
                return this
            },
            jGetTransitionDuration: function() {
                var W = 0,
                    V = 0;
                W = this.jGetCss("transition-duration");
                V = this.jGetCss("transition-delay");
                W = W.indexOf("ms") > -1 ? parseFloat(W) : W.indexOf("s") > -1 ? parseFloat(W) * 1000 : 0;
                V = V.indexOf("ms") > -1 ? parseFloat(V) : V.indexOf("s") > -1 ? parseFloat(V) * 1000 : 0;
                return W + V
            },
            hide: function() {
                return this.jSetCss({
                    display: "none",
                    visibility: "hidden"
                })
            },
            show: function() {
                return this.jSetCss({
                    display: "",
                    visibility: "visible"
                })
            },
            jGetSize: function() {
                return {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }
            },
            getInnerSize: function(W) {
                var V = this.jGetSize();
                V.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
                V.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
                if (!W) {
                    V.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                    V.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
                }
                return V
            },
            jGetScroll: function() {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            jGetFullScroll: function() {
                var V = this,
                    W = {
                        top: 0,
                        left: 0
                    };
                do {
                    W.left += V.scrollLeft || 0;
                    W.top += V.scrollTop || 0;
                    V = V.parentNode
                } while (V);
                return W
            },
            jGetPosition: function() {
                var Z = this,
                    W = 0,
                    Y = 0;
                if (L.defined(document.documentElement.getBoundingClientRect)) {
                    var V = this.getBoundingClientRect(),
                        X = L.$(document).jGetScroll(),
                        aa = L.browser.getDoc();
                    return {
                        top: V.top + X.y - aa.clientTop,
                        left: V.left + X.x - aa.clientLeft
                    }
                }
                do {
                    W += Z.offsetLeft || 0;
                    Y += Z.offsetTop || 0;
                    Z = Z.offsetParent
                } while (Z && !(/^(?:body|html)$/i).test(Z.tagName));
                return {
                    top: Y,
                    left: W
                }
            },
            jGetRect: function() {
                var W = this.jGetPosition();
                var V = this.jGetSize();
                return {
                    top: W.top,
                    bottom: W.top + V.height,
                    left: W.left,
                    right: W.left + V.width
                }
            },
            changeContent: function(W) {
                try {
                    this.innerHTML = W
                } catch (V) {
                    this.innerText = W
                }
                return this
            },
            jRemove: function() {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function() {
                L.$A(this.childNodes).jEach(function(V) {
                    if (3 == V.nodeType || 8 == V.nodeType) {
                        return
                    }
                    L.$(V).kill()
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    L.storage[this.$J_UUID] = null;
                    delete L.storage[this.$J_UUID]
                }
                return null
            },
            append: function(X, W) {
                W = W || "bottom";
                var V = this.firstChild;
                ("top" == W && V) ? this.insertBefore(X, V): this.appendChild(X);
                return this
            },
            jAppendTo: function(X, W) {
                var V = L.$(X).append(this, W);
                return this
            },
            enclose: function(V) {
                this.append(V.parentNode.replaceChild(this, V));
                return this
            },
            hasChild: function(V) {
                if ("element" !== L.jTypeOf("string" == L.jTypeOf(V) ? V = document.getElementById(V) : V)) {
                    return false
                }
                return (this == V) ? false : (this.contains && !(L.browser.webkit419)) ? (this.contains(V)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(V) & 16) : L.$A(this.byTag(V.tagName)).contains(V)
            }
        };
        L.Element.jGetStyle = L.Element.jGetCss;
        L.Element.jSetStyle = L.Element.jSetCss;
        if (!window.Element) {
            window.Element = L.$F;
            if (L.browser.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (L.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        L.implement(window.Element, {
            $J_TYPE: "element"
        });
        L.Doc = {
            jGetSize: function() {
                if (L.browser.touchScreen || L.browser.presto925 || L.browser.webkit419) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
                return {
                    width: L.browser.getDoc().clientWidth,
                    height: L.browser.getDoc().clientHeight
                }
            },
            jGetScroll: function() {
                return {
                    x: window.pageXOffset || L.browser.getDoc().scrollLeft,
                    y: window.pageYOffset || L.browser.getDoc().scrollTop
                }
            },
            jGetFullSize: function() {
                var V = this.jGetSize();
                return {
                    width: Math.max(L.browser.getDoc().scrollWidth, V.width),
                    height: Math.max(L.browser.getDoc().scrollHeight, V.height)
                }
            }
        };
        L.extend(document, {
            $J_TYPE: "document"
        });
        L.extend(window, {
            $J_TYPE: "window"
        });
        L.extend([L.Element, L.Doc], {
            jFetch: function(Y, W) {
                var V = L.getStorage(this.$J_UUID),
                    X = V[Y];
                if (undefined !== W && undefined === X) {
                    X = V[Y] = W
                }
                return (L.defined(X) ? X : null)
            },
            jStore: function(X, W) {
                var V = L.getStorage(this.$J_UUID);
                V[X] = W;
                return this
            },
            jDel: function(W) {
                var V = L.getStorage(this.$J_UUID);
                delete V[W];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            L.extend([L.Element, L.Doc], {
                getElementsByClassName: function(V) {
                    return L.$A(this.getElementsByTagName("*")).filter(function(X) {
                        try {
                            return (1 == X.nodeType && X.className.has(V, " "))
                        } catch (W) {}
                    })
                }
            })
        }
        L.extend([L.Element, L.Doc], {
            byClass: function() {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function() {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (L.browser.fullScreen.capable && !document.requestFullScreen) {
            L.Element.requestFullScreen = function() {
                L.browser.fullScreen.request(this)
            }
        }
        L.Event = {
            $J_TYPE: "event",
            isQueueStopped: L.$false,
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                if (this.stopPropagation) {
                    this.stopPropagation()
                } else {
                    this.cancelBubble = true
                }
                return this
            },
            stopDefaults: function() {
                if (this.preventDefault) {
                    this.preventDefault()
                } else {
                    this.returnValue = false
                }
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = L.$true;
                return this
            },
            getClientXY: function() {
                var W, V;
                W = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!L.defined(W)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: W.clientX,
                    y: W.clientY
                }
            },
            jGetPageXY: function() {
                var W, V;
                W = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!L.defined(W)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: W.pageX || W.clientX + L.browser.getDoc().scrollLeft,
                    y: W.pageY || W.clientY + L.browser.getDoc().scrollTop
                }
            },
            getTarget: function() {
                var V = this.target || this.srcElement;
                while (V && 3 == V.nodeType) {
                    V = V.parentNode
                }
                return V
            },
            getRelated: function() {
                var W = null;
                switch (this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        W = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        W = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return W
                }
                try {
                    while (W && 3 == W.nodeType) {
                        W = W.parentNode
                    }
                } catch (V) {
                    W = null
                }
                return W
            },
            getButton: function() {
                if (!this.which && this.button !== undefined) {
                    return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
                }
                return this.which
            },
            isTouchEvent: function() {
                return (this.pointerType && ("touch" === this.pointerType || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
            },
            isPrimaryTouch: function() {
                return this.pointerType ? (("touch" === this.pointerType || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary) : 1 === this.changedTouches.length && (this.targetTouches.length ? this.targetTouches[0].identifier == this.changedTouches[0].identifier : true)
            }
        };
        L._event_add_ = "addEventListener";
        L._event_del_ = "removeEventListener";
        L._event_prefix_ = "";
        if (!document.addEventListener) {
            L._event_add_ = "attachEvent";
            L._event_del_ = "detachEvent";
            L._event_prefix_ = "on"
        }
        L.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: L.$false,
            events: L.$([]),
            pushToEvents: function(V) {
                var W = V;
                this.events.push(W)
            },
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                this.events.jEach(function(W) {
                    try {
                        W.stopDistribution()
                    } catch (V) {}
                });
                return this
            },
            stopDefaults: function() {
                this.events.jEach(function(W) {
                    try {
                        W.stopDefaults()
                    } catch (V) {}
                });
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = L.$true;
                return this
            },
            getClientXY: function() {
                return {
                    x: this.clientX,
                    y: this.clientY
                }
            },
            jGetPageXY: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            getTarget: function() {
                return this.target
            },
            getRelated: function() {
                return this.relatedTarget
            },
            getButton: function() {
                return this.button
            },
            getOriginalTarget: function() {
                return this.events.length > 0 ? this.events[0].getTarget() : undefined
            }
        };
        L.extend([L.Element, L.Doc], {
            jAddEvent: function(X, Z, aa, ad) {
                var ac, V, Y, ab, W;
                if ("string" == L.jTypeOf(X)) {
                    W = X.split(" ");
                    if (W.length > 1) {
                        X = W
                    }
                }
                if (L.jTypeOf(X) == "array") {
                    L.$(X).jEach(this.jAddEvent.jBindAsEvent(this, Z, aa, ad));
                    return this
                }
                if (!X || !Z || L.jTypeOf(X) != "string" || L.jTypeOf(Z) != "function") {
                    return this
                }
                if (X == "domready" && L.browser.ready) {
                    Z.call(this);
                    return this
                }
                X = S[X] || X;
                aa = parseInt(aa || 50);
                if (!Z.$J_EUID) {
                    Z.$J_EUID = Math.floor(Math.random() * L.now())
                }
                ac = L.Doc.jFetch.call(this, "_EVENTS_", {});
                V = ac[X];
                if (!V) {
                    ac[X] = V = L.$([]);
                    Y = this;
                    if (L.Event.Custom[X]) {
                        L.Event.Custom[X].handler.add.call(this, ad)
                    } else {
                        V.handle = function(ae) {
                            ae = L.extend(ae || window.e, {
                                $J_TYPE: "event"
                            });
                            L.Doc.jCallEvent.call(Y, X, L.$(ae))
                        };
                        this[L._event_add_](L._event_prefix_ + X, V.handle, false)
                    }
                }
                ab = {
                    type: X,
                    fn: Z,
                    priority: aa,
                    euid: Z.$J_EUID
                };
                V.push(ab);
                V.sort(function(af, ae) {
                    return af.priority - ae.priority
                });
                return this
            },
            jRemoveEvent: function(ab) {
                var Z = L.Doc.jFetch.call(this, "_EVENTS_", {}),
                    X, V, W, ac, aa, Y;
                aa = arguments.length > 1 ? arguments[1] : -100;
                if ("string" == L.jTypeOf(ab)) {
                    Y = ab.split(" ");
                    if (Y.length > 1) {
                        ab = Y
                    }
                }
                if (L.jTypeOf(ab) == "array") {
                    L.$(ab).jEach(this.jRemoveEvent.jBindAsEvent(this, aa));
                    return this
                }
                ab = S[ab] || ab;
                if (!ab || L.jTypeOf(ab) != "string" || !Z || !Z[ab]) {
                    return this
                }
                X = Z[ab] || [];
                for (W = 0; W < X.length; W++) {
                    V = X[W];
                    if (-100 == aa || !!aa && aa.$J_EUID === V.euid) {
                        ac = X.splice(W--, 1)
                    }
                }
                if (0 === X.length) {
                    if (L.Event.Custom[ab]) {
                        L.Event.Custom[ab].handler.jRemove.call(this)
                    } else {
                        this[L._event_del_](L._event_prefix_ + ab, X.handle, false)
                    }
                    delete Z[ab]
                }
                return this
            },
            jCallEvent: function(Z, ab) {
                var Y = L.Doc.jFetch.call(this, "_EVENTS_", {}),
                    X, V, W;
                Z = S[Z] || Z;
                if (!Z || L.jTypeOf(Z) != "string" || !Y || !Y[Z]) {
                    return this
                }
                try {
                    ab = L.extend(ab || {}, {
                        type: Z
                    })
                } catch (aa) {}
                if (undefined === ab.timeStamp) {
                    ab.timeStamp = L.now()
                }
                X = Y[Z] || [];
                for (W = 0; W < X.length && !(ab.isQueueStopped && ab.isQueueStopped()); W++) {
                    X[W].fn.call(this, ab)
                }
            },
            jRaiseEvent: function(W, V) {
                var Z = ("domready" == W) ? false : true,
                    Y = this,
                    X;
                W = S[W] || W;
                if (!Z) {
                    L.Doc.jCallEvent.call(this, W);
                    return this
                }
                if (Y === document && document.createEvent && !Y.dispatchEvent) {
                    Y = document.documentElement
                }
                if (document.createEvent) {
                    X = document.createEvent(W);
                    X.initEvent(V, true, true)
                } else {
                    X = document.createEventObject();
                    X.eventType = W
                }
                if (document.createEvent) {
                    Y.dispatchEvent(X)
                } else {
                    Y.fireEvent("on" + V, X)
                }
                return X
            },
            jClearEvents: function() {
                var W = L.Doc.jFetch.call(this, "_EVENTS_");
                if (!W) {
                    return this
                }
                for (var V in W) {
                    L.Doc.jRemoveEvent.call(this, V)
                }
                L.Doc.jDel.call(this, "_EVENTS_");
                return this
            }
        });
        (function(V) {
            if ("complete" === document.readyState) {
                return V.browser.onready.jDelay(1)
            }
            if (V.browser.webkit && V.browser.version < 420) {
                (function() {
                    (V.$(["loaded", "complete"]).contains(document.readyState)) ? V.browser.onready(): arguments.callee.jDelay(50)
                })()
            } else {
                if (V.browser.trident && V.browser.ieMode < 9 && window == top) {
                    (function() {
                        (V.$try(function() {
                            V.browser.getDoc().doScroll("left");
                            return true
                        })) ? V.browser.onready(): arguments.callee.jDelay(50)
                    })()
                } else {
                    V.Doc.jAddEvent.call(V.$(document), "DOMContentLoaded", V.browser.onready);
                    V.Doc.jAddEvent.call(V.$(window), "load", V.browser.onready)
                }
            }
        })(R);
        L.Class = function() {
            var Z = null,
                W = L.$A(arguments);
            if ("class" == L.jTypeOf(W[0])) {
                Z = W.shift()
            }
            var V = function() {
                for (var ac in this) {
                    this[ac] = L.detach(this[ac])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var ae = this.constructor.$parent;
                    for (var ad in ae) {
                        var ab = ae[ad];
                        switch (L.jTypeOf(ab)) {
                            case "function":
                                this.$parent[ad] = L.Class.wrap(this, ab);
                                break;
                            case "object":
                                this.$parent[ad] = L.detach(ab);
                                break;
                            case "array":
                                this.$parent[ad] = L.detach(ab);
                                break
                        }
                    }
                }
                var aa = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return aa
            };
            if (!V.prototype.init) {
                V.prototype.init = L.$F
            }
            if (Z) {
                var Y = function() {};
                Y.prototype = Z.prototype;
                V.prototype = new Y;
                V.$parent = {};
                for (var X in Z.prototype) {
                    V.$parent[X] = Z.prototype[X]
                }
            } else {
                V.$parent = null
            }
            V.constructor = L.Class;
            V.prototype.constructor = V;
            L.extend(V.prototype, W[0]);
            L.extend(V, {
                $J_TYPE: "class"
            });
            return V
        };
        R.Class.wrap = function(V, W) {
            return function() {
                var Y = this.caller;
                var X = W.apply(V, arguments);
                return X
            }
        };
        (function(Y) {
            var X = Y.$;
            var V = 5,
                W = 300;
            Y.Event.Custom.btnclick = new Y.Class(Y.extend(Y.Event.Custom, {
                type: "btnclick",
                init: function(ab, aa) {
                    var Z = aa.jGetPageXY();
                    this.x = Z.x;
                    this.y = Z.y;
                    this.clientX = aa.clientX;
                    this.clientY = aa.clientY;
                    this.timeStamp = aa.timeStamp;
                    this.button = aa.getButton();
                    this.target = ab;
                    this.pushToEvents(aa)
                }
            }));
            Y.Event.Custom.btnclick.handler = {
                options: {
                    threshold: W,
                    button: 1
                },
                add: function(Z) {
                    this.jStore("event:btnclick:options", Y.extend(Y.detach(Y.Event.Custom.btnclick.handler.options), Z || {}));
                    this.jAddEvent("mousedown", Y.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", Y.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", Y.Event.Custom.btnclick.handler.onclick, 1);
                    if (Y.browser.trident && Y.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", Y.Event.Custom.btnclick.handler.handle, 1)
                    }
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", Y.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", Y.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", Y.Event.Custom.btnclick.handler.onclick);
                    if (Y.browser.trident && Y.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", Y.Event.Custom.btnclick.handler.handle)
                    }
                },
                onclick: function(Z) {
                    Z.stopDefaults()
                },
                handle: function(ac) {
                    var ab, Z, aa;
                    Z = this.jFetch("event:btnclick:options");
                    if (ac.type != "dblclick" && ac.getButton() != Z.button) {
                        return
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return
                    }
                    if ("mousedown" == ac.type) {
                        ab = new Y.Event.Custom.btnclick(this, ac);
                        this.jStore("event:btnclick:btnclickEvent", ab)
                    } else {
                        if ("mouseup" == ac.type) {
                            ab = this.jFetch("event:btnclick:btnclickEvent");
                            if (!ab) {
                                return
                            }
                            aa = ac.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            ab.pushToEvents(ac);
                            if (ac.timeStamp - ab.timeStamp <= Z.threshold && Math.sqrt(Math.pow(aa.x - ab.x, 2) + Math.pow(aa.y - ab.y, 2)) <= V) {
                                this.jCallEvent("btnclick", ab)
                            }
                            document.jCallEvent("mouseup", ac)
                        } else {
                            if (ac.type == "dblclick") {
                                ab = new Y.Event.Custom.btnclick(this, ac);
                                this.jCallEvent("btnclick", ab)
                            }
                        }
                    }
                }
            }
        })(R);
        (function(W) {
            var V = W.$;
            W.Event.Custom.mousedrag = new W.Class(W.extend(W.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: false,
                init: function(aa, Z, Y) {
                    var X = Z.jGetPageXY();
                    this.x = X.x;
                    this.y = X.y;
                    this.clientX = Z.clientX;
                    this.clientY = Z.clientY;
                    this.timeStamp = Z.timeStamp;
                    this.button = Z.getButton();
                    this.target = aa;
                    this.pushToEvents(Z);
                    this.state = Y
                }
            }));
            W.Event.Custom.mousedrag.handler = {
                add: function() {
                    var Y = W.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        X = W.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", W.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", W.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", Y, 1);
                    document.jAddEvent("mouseup", X, 1);
                    this.jStore("event:mousedrag:listeners:document:move", Y);
                    this.jStore("event:mousedrag:listeners:document:end", X)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", W.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", W.Event.Custom.mousedrag.handler.handleMouseUp);
                    V(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || W.$F);
                    V(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || W.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(Y) {
                    var X;
                    if (1 != Y.getButton()) {
                        return
                    }
                    X = new W.Event.Custom.mousedrag(this, Y, "dragstart");
                    this.jStore("event:mousedrag:dragstart", X)
                },
                handleMouseUp: function(Y) {
                    var X;
                    X = this.jFetch("event:mousedrag:dragstart");
                    if (!X) {
                        return
                    }
                    Y.stopDefaults();
                    X = new W.Event.Custom.mousedrag(this, Y, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", X)
                },
                handleMouseMove: function(Y) {
                    var X;
                    X = this.jFetch("event:mousedrag:dragstart");
                    if (!X) {
                        return
                    }
                    Y.stopDefaults();
                    if (!X.dragged) {
                        X.dragged = true;
                        this.jCallEvent("mousedrag", X)
                    }
                    X = new W.Event.Custom.mousedrag(this, Y, "dragmove");
                    this.jCallEvent("mousedrag", X)
                }
            }
        })(R);
        (function(W) {
            var V = W.$;
            W.Event.Custom.dblbtnclick = new W.Class(W.extend(W.Event.Custom, {
                type: "dblbtnclick",
                timedout: false,
                tm: null,
                init: function(Z, Y) {
                    var X = Y.jGetPageXY();
                    this.x = X.x;
                    this.y = X.y;
                    this.clientX = Y.clientX;
                    this.clientY = Y.clientY;
                    this.timeStamp = Y.timeStamp;
                    this.button = Y.getButton();
                    this.target = Z;
                    this.pushToEvents(Y)
                }
            }));
            W.Event.Custom.dblbtnclick.handler = {
                options: {
                    threshold: 200
                },
                add: function(X) {
                    this.jStore("event:dblbtnclick:options", W.extend(W.detach(W.Event.Custom.dblbtnclick.handler.options), X || {}));
                    this.jAddEvent("btnclick", W.Event.Custom.dblbtnclick.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("btnclick", W.Event.Custom.dblbtnclick.handler.handle)
                },
                handle: function(Z) {
                    var Y, X;
                    Y = this.jFetch("event:dblbtnclick:event");
                    X = this.jFetch("event:dblbtnclick:options");
                    if (!Y) {
                        Y = new W.Event.Custom.dblbtnclick(this, Z);
                        Y.tm = setTimeout(function() {
                            Y.timedout = true;
                            Z.isQueueStopped = W.$false;
                            this.jCallEvent("btnclick", Z);
                            this.jDel("event:dblbtnclick:event")
                        }.jBind(this), X.threshold + 10);
                        this.jStore("event:dblbtnclick:event", Y);
                        Z.stopQueue()
                    } else {
                        clearTimeout(Y.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!Y.timedout) {
                            Y.pushToEvents(Z);
                            Z.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", Y)
                        } else {}
                    }
                }
            }
        })(R);
        (function(ab) {
            var aa = ab.$;

            function V(ac) {
                return ac.pointerType ? (("touch" === ac.pointerType || ac.MSPOINTER_TYPE_TOUCH === ac.pointerType) && ac.isPrimary) : 1 === ac.changedTouches.length && (ac.targetTouches.length ? ac.targetTouches[0].identifier == ac.changedTouches[0].identifier : true)
            }

            function X(ac) {
                if (ac.pointerType) {
                    return ("touch" === ac.pointerType || ac.MSPOINTER_TYPE_TOUCH === ac.pointerType) ? ac.pointerId : null
                } else {
                    return ac.changedTouches[0].identifier
                }
            }

            function Y(ac) {
                if (ac.pointerType) {
                    return ("touch" === ac.pointerType || ac.MSPOINTER_TYPE_TOUCH === ac.pointerType) ? ac : null
                } else {
                    return ac.changedTouches[0]
                }
            }
            ab.Event.Custom.tap = new ab.Class(ab.extend(ab.Event.Custom, {
                type: "tap",
                id: null,
                init: function(ad, ac) {
                    var ae = Y(ac);
                    this.id = ae.pointerId || ae.identifier;
                    this.x = ae.pageX;
                    this.y = ae.pageY;
                    this.pageX = ae.pageX;
                    this.pageY = ae.pageY;
                    this.clientX = ae.clientX;
                    this.clientY = ae.clientY;
                    this.timeStamp = ac.timeStamp;
                    this.button = 0;
                    this.target = ad;
                    this.pushToEvents(ac)
                }
            }));
            var W = 10,
                Z = 200;
            ab.Event.Custom.tap.handler = {
                add: function(ac) {
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ab.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ab.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", ab.Event.Custom.tap.handler.onClick, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ab.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ab.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", ab.Event.Custom.tap.handler.onClick)
                },
                onClick: function(ac) {
                    ac.stopDefaults()
                },
                onTouchStart: function(ac) {
                    if (!V(ac)) {
                        this.jDel("event:tap:event");
                        return
                    }
                    this.jStore("event:tap:event", new ab.Event.Custom.tap(this, ac));
                    this.jStore("event:btnclick:ignore", true)
                },
                onTouchEnd: function(af) {
                    var ad = ab.now(),
                        ae = this.jFetch("event:tap:event"),
                        ac = this.jFetch("event:tap:options");
                    if (!ae || !V(af)) {
                        return
                    }
                    this.jDel("event:tap:event");
                    if (ae.id == X(af) && af.timeStamp - ae.timeStamp <= Z && Math.sqrt(Math.pow(Y(af).pageX - ae.x, 2) + Math.pow(Y(af).pageY - ae.y, 2)) <= W) {
                        this.jDel("event:btnclick:btnclickEvent");
                        af.stop();
                        ae.pushToEvents(af);
                        this.jCallEvent("tap", ae)
                    }
                }
            }
        })(R);
        L.Event.Custom.dbltap = new L.Class(L.extend(L.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function(W, V) {
                this.x = V.x;
                this.y = V.y;
                this.clientX = V.clientX;
                this.clientY = V.clientY;
                this.timeStamp = V.timeStamp;
                this.button = 0;
                this.target = W;
                this.pushToEvents(V)
            }
        }));
        L.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function(V) {
                this.jStore("event:dbltap:options", L.extend(L.detach(L.Event.Custom.dbltap.handler.options), V || {}));
                this.jAddEvent("tap", L.Event.Custom.dbltap.handler.handle, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("tap", L.Event.Custom.dbltap.handler.handle)
            },
            handle: function(X) {
                var W, V;
                W = this.jFetch("event:dbltap:event");
                V = this.jFetch("event:dbltap:options");
                if (!W) {
                    W = new L.Event.Custom.dbltap(this, X);
                    W.tm = setTimeout(function() {
                        W.timedout = true;
                        X.isQueueStopped = L.$false;
                        this.jCallEvent("tap", X)
                    }.jBind(this), V.threshold + 10);
                    this.jStore("event:dbltap:event", W);
                    X.stopQueue()
                } else {
                    clearTimeout(W.tm);
                    this.jDel("event:dbltap:event");
                    if (!W.timedout) {
                        W.pushToEvents(X);
                        X.stopQueue().stop();
                        this.jCallEvent("dbltap", W)
                    } else {}
                }
            }
        };
        (function(aa) {
            var Z = aa.$;

            function V(ab) {
                return ab.pointerType ? (("touch" === ab.pointerType || ab.MSPOINTER_TYPE_TOUCH === ab.pointerType) && ab.isPrimary) : 1 === ab.changedTouches.length && (ab.targetTouches.length ? ab.targetTouches[0].identifier == ab.changedTouches[0].identifier : true)
            }

            function X(ab) {
                if (ab.pointerType) {
                    return ("touch" === ab.pointerType || ab.MSPOINTER_TYPE_TOUCH === ab.pointerType) ? ab.pointerId : null
                } else {
                    return ab.changedTouches[0].identifier
                }
            }

            function Y(ab) {
                if (ab.pointerType) {
                    return ("touch" === ab.pointerType || ab.MSPOINTER_TYPE_TOUCH === ab.pointerType) ? ab : null
                } else {
                    return ab.changedTouches[0]
                }
            }
            var W = 10;
            aa.Event.Custom.touchdrag = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: false,
                init: function(ad, ac, ab) {
                    var ae = Y(ac);
                    this.id = ae.pointerId || ae.identifier;
                    this.clientX = ae.clientX;
                    this.clientY = ae.clientY;
                    this.pageX = ae.pageX;
                    this.pageY = ae.pageY;
                    this.x = ae.pageX;
                    this.y = ae.pageY;
                    this.timeStamp = ac.timeStamp;
                    this.button = 0;
                    this.target = ad;
                    this.pushToEvents(ac);
                    this.state = ab
                }
            }));
            aa.Event.Custom.touchdrag.handler = {
                add: function() {
                    var ac = aa.Event.Custom.touchdrag.handler.onTouchMove.jBind(this),
                        ab = aa.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], aa.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], aa.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], aa.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", ac);
                    this.jStore("event:touchdrag:listeners:document:end", ab);
                    Z(document).jAddEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", ac, 1);
                    Z(document).jAddEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", ab, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], aa.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], aa.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], aa.Event.Custom.touchdrag.handler.onTouchMove);
                    Z(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", this.jFetch("event:touchdrag:listeners:document:move") || aa.$F, 1);
                    Z(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", this.jFetch("event:touchdrag:listeners:document:end") || aa.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(ac) {
                    var ab;
                    if (!V(ac)) {
                        return
                    }
                    ab = new aa.Event.Custom.touchdrag(this, ac, "dragstart");
                    this.jStore("event:touchdrag:dragstart", ab)
                },
                onTouchEnd: function(ac) {
                    var ab;
                    ab = this.jFetch("event:touchdrag:dragstart");
                    if (!ab || !ab.dragged || ab.id != X(ac)) {
                        return
                    }
                    ab = new aa.Event.Custom.touchdrag(this, ac, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", ab)
                },
                onTouchMove: function(ac) {
                    var ab;
                    ab = this.jFetch("event:touchdrag:dragstart");
                    if (!ab || !V(ac)) {
                        return
                    }
                    if (ab.id != X(ac)) {
                        this.jDel("event:touchdrag:dragstart");
                        return
                    }
                    if (!ab.dragged && Math.sqrt(Math.pow(Y(ac).pageX - ab.x, 2) + Math.pow(Y(ac).pageY - ab.y, 2)) > W) {
                        ab.dragged = true;
                        this.jCallEvent("touchdrag", ab)
                    }
                    if (!ab.dragged) {
                        return
                    }
                    ab = new aa.Event.Custom.touchdrag(this, ac, "dragmove");
                    this.jCallEvent("touchdrag", ab)
                }
            }
        })(R);
        L.Event.Custom.touchpinch = new L.Class(L.extend(L.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function(W, V) {
                this.timeStamp = V.timeStamp;
                this.button = 0;
                this.target = W;
                this.x = V.touches[0].clientX + (V.touches[1].clientX - V.touches[0].clientX) / 2;
                this.y = V.touches[0].clientY + (V.touches[1].clientY - V.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(V.touches[0].clientX - V.touches[1].clientX, 2) + Math.pow(V.touches[0].clientY - V.touches[1].clientY, 2));
                this.pushToEvents(V)
            },
            update: function(V) {
                var W;
                this.state = "pinchupdate";
                if (V.changedTouches[0].identifier != this.events[0].touches[0].identifier || V.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                W = Math.sqrt(Math.pow(V.changedTouches[0].clientX - V.changedTouches[1].clientX, 2) + Math.pow(V.changedTouches[0].clientY - V.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = W / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = V.changedTouches[0].clientX + (V.changedTouches[1].clientX - V.changedTouches[0].clientX) / 2;
                this.y = V.changedTouches[0].clientY + (V.changedTouches[1].clientY - V.changedTouches[0].clientY) / 2;
                this.pushToEvents(V)
            }
        }));
        L.Event.Custom.touchpinch.handler = {
            add: function() {
                this.jAddEvent("touchstart", L.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.jAddEvent("touchend", L.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.jAddEvent("touchmove", L.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("touchstart", L.Event.Custom.touchpinch.handler.handleTouchStart);
                this.jRemoveEvent("touchend", L.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.jRemoveEvent("touchmove", L.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function(W) {
                var V;
                if (W.touches.length != 2) {
                    return
                }
                W.stopDefaults();
                V = new L.Event.Custom.touchpinch(this, W);
                this.jStore("event:touchpinch:event", V)
            },
            handleTouchEnd: function(W) {
                var V;
                V = this.jFetch("event:touchpinch:event");
                if (!V) {
                    return
                }
                W.stopDefaults();
                this.jDel("event:touchpinch:event")
            },
            handleTouchMove: function(W) {
                var V;
                V = this.jFetch("event:touchpinch:event");
                if (!V) {
                    return
                }
                W.stopDefaults();
                V.update(W);
                this.jCallEvent("touchpinch", V)
            }
        };
        (function(aa) {
            var Y = aa.$;
            aa.Event.Custom.mousescroll = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "mousescroll",
                init: function(ag, af, ai, ac, ab, ah, ad) {
                    var ae = af.jGetPageXY();
                    this.x = ae.x;
                    this.y = ae.y;
                    this.timeStamp = af.timeStamp;
                    this.target = ag;
                    this.delta = ai || 0;
                    this.deltaX = ac || 0;
                    this.deltaY = ab || 0;
                    this.deltaZ = ah || 0;
                    this.deltaFactor = ad || 0;
                    this.deltaMode = af.deltaMode || 0;
                    this.isMouse = false;
                    this.pushToEvents(af)
                }
            }));
            var Z, W;

            function V() {
                Z = null
            }

            function X(ab, ac) {
                return (ab > 50) || (1 === ac && !("win" == aa.browser.platform && ab < 1)) || (0 === ab % 12) || (0 == ab % 4.000244140625)
            }
            aa.Event.Custom.mousescroll.handler = {
                eventType: "onwheel" in document || aa.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add: function() {
                    this.jAddEvent(aa.Event.Custom.mousescroll.handler.eventType, aa.Event.Custom.mousescroll.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(aa.Event.Custom.mousescroll.handler.eventType, aa.Event.Custom.mousescroll.handler.handle, 1)
                },
                handle: function(ag) {
                    var ah = 0,
                        ae = 0,
                        ac = 0,
                        ab = 0,
                        af, ad;
                    if (ag.detail) {
                        ac = ag.detail * -1
                    }
                    if (ag.wheelDelta !== undefined) {
                        ac = ag.wheelDelta
                    }
                    if (ag.wheelDeltaY !== undefined) {
                        ac = ag.wheelDeltaY
                    }
                    if (ag.wheelDeltaX !== undefined) {
                        ae = ag.wheelDeltaX * -1
                    }
                    if (ag.deltaY) {
                        ac = -1 * ag.deltaY
                    }
                    if (ag.deltaX) {
                        ae = ag.deltaX
                    }
                    if (0 === ac && 0 === ae) {
                        return
                    }
                    ah = 0 === ac ? ae : ac;
                    ab = Math.max(Math.abs(ac), Math.abs(ae));
                    if (!Z || ab < Z) {
                        Z = ab
                    }
                    af = ah > 0 ? "floor" : "ceil";
                    ah = Math[af](ah / Z);
                    ae = Math[af](ae / Z);
                    ac = Math[af](ac / Z);
                    if (W) {
                        clearTimeout(W)
                    }
                    W = setTimeout(V, 200);
                    ad = new aa.Event.Custom.mousescroll(this, ag, ah, ae, ac, 0, Z);
                    ad.isMouse = X(Z, ag.deltaMode || 0);
                    this.jCallEvent("mousescroll", ad)
                }
            }
        })(R);
        L.win = L.$(window);
        L.doc = L.$(document);
        return R
    })();
    (function(H) {
        if (!H) {
            throw "MagicJS not found"
        }
        var G = H.$;
        var F = window.URL || window.webkitURL || null;
        u.ImageLoader = new H.Class({
            img: null,
            ready: false,
            options: {
                onprogress: H.$F,
                onload: H.$F,
                onabort: H.$F,
                onerror: H.$F,
                oncomplete: H.$F,
                onxhrerror: H.$F,
                xhr: false,
                progressiveLoad: true
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(I) {
                    if (I.target && (200 === I.target.status || 304 === I.target.status) && I.lengthComputable) {
                        this.options.onprogress.jBind(null, (I.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / I.total).jDelay(1);
                        this.loadedBytes = I.loaded
                    }
                },
                onload: function(I) {
                    if (I) {
                        G(I).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(I) {
                    if (I) {
                        G(I).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(I) {
                    if (I) {
                        G(I).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                G(["load", "abort", "error"]).jEach(function(I) {
                    this.img.jAddEvent(I, this._handlers["on" + I].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (I) {}
                    this._timer = null
                }
                G(["load", "abort", "error"]).jEach(function(J) {
                    this.img.jRemoveEvent(J)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var I = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    I.kill()
                }
            },
            loadBlob: function(J) {
                var K = new XMLHttpRequest(),
                    I;
                G(["abort", "progress"]).jEach(function(L) {
                    K["on" + L] = G(function(M) {
                        this._handlers["on" + L].call(this, M)
                    }).jBind(this)
                }, this);
                K.onerror = G(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    this.options.xhr = false;
                    this._bind();
                    this.img.src = J
                }).jBind(this);
                K.onload = G(function() {
                    if (200 !== K.status && 304 !== K.status) {
                        this._handlers.onerror.call(this);
                        return
                    }
                    I = K.response;
                    this._bind();
                    if (F && !H.browser.trident && !("ios" === H.browser.platform && H.browser.version < 537)) {
                        this.img.setAttribute("src", F.createObjectURL(I))
                    } else {
                        this.img.src = J
                    }
                }).jBind(this);
                K.open("GET", J);
                K.responseType = "blob";
                K.send()
            },
            init: function(J, I) {
                this.options = H.extend(this.options, I);
                this.img = G(J) || H.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(H.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if (H.browser.features.xhr2 && this.options.xhr && "string" == H.jTypeOf(J)) {
                    this.loadBlob(J);
                    return
                }
                var K = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    K = null
                }.jBind(this);
                this._bind();
                if ("string" == H.jTypeOf(J)) {
                    this.img.src = J
                } else {
                    if (H.browser.trident && 5 == H.browser.version && H.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                K && K()
                            }
                        }.jBind(this)
                    }
                    this.img.src = J.getAttribute("src")
                }
                this.img && this.img.complete && K && (this._timer = K.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var I = this.img;
                return (I.naturalWidth) ? (I.naturalWidth > 0) : (I.readyState) ? ("complete" == I.readyState) : I.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(u);
    (function(G) {
        if (!G) {
            throw "MagicJS not found"
        }
        if (G.FX) {
            return
        }
        var F = G.$;
        G.FX = new G.Class({
            init: function(I, H) {
                var J;
                this.el = G.$(I);
                this.options = G.extend(this.options, H);
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                J = G.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === G.jTypeOf(J)) {
                    this.easeFn = J
                } else {
                    this.cubicBezier = this.parseCubicBezier(J) || this.parseCubicBezier("ease")
                }
                if ("string" == G.jTypeOf(this.options.cycles)) {
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
                }
            },
            options: {
                fps: 60,
                duration: 600,
                transition: "ease",
                cycles: 1,
                direction: "normal",
                onStart: G.$F,
                onComplete: G.$F,
                onBeforeRender: G.$F,
                onAfterRender: G.$F,
                forceAnimation: false,
                roundCss: false
            },
            styles: null,
            cubicBezier: null,
            easeFn: null,
            setTransition: function(H) {
                this.options.transition = H;
                H = G.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === G.jTypeOf(H)) {
                    this.easeFn = H
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(H) || this.parseCubicBezier("ease")
                }
            },
            start: function(J) {
                var H = /\%$/,
                    I;
                this.styles = J || {};
                this.cycle = 0;
                this.state = 0;
                this.curFrame = 0;
                this.pStyles = {};
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (I in this.styles) {
                    H.test(this.styles[I][0]) && (this.pStyles[I] = true);
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[I].reverse()
                    }
                }
                this.startTime = G.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call()
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && G.browser.features.requestAnimationFrame) {
                        this.timer = G.browser.requestAnimationFrame.call(window, this.loopBind)
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                    }
                }
                return this
            },
            stopAnimation: function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && G.browser.features.requestAnimationFrame && G.browser.cancelAnimationFrame) {
                        G.browser.cancelAnimationFrame.call(window, this.timer)
                    } else {
                        clearInterval(this.timer)
                    }
                    this.timer = false
                }
            },
            stop: function(H) {
                H = G.defined(H) ? H : false;
                this.stopAnimation();
                if (H) {
                    this.render(1);
                    this.options.onComplete.jDelay(10)
                }
                return this
            },
            calc: function(J, I, H) {
                J = parseFloat(J);
                I = parseFloat(I);
                return (I - J) * H + J
            },
            loop: function() {
                var I = G.now(),
                    H = (I - this.startTime) / this.options.duration,
                    J = Math.floor(H);
                if (I >= this.finishTime && J >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this
                }
                if (this.alternate && this.cycle < J) {
                    for (var K in this.styles) {
                        this.styles[K].reverse()
                    }
                }
                this.cycle = J;
                if (!this.options.forceAnimation && G.browser.features.requestAnimationFrame) {
                    this.timer = G.browser.requestAnimationFrame.call(window, this.loopBind)
                }
                this.render((this.continuous ? J : 0) + this.easeFn(H % 1))
            },
            render: function(H) {
                var I = {},
                    K = H;
                for (var J in this.styles) {
                    if ("opacity" === J) {
                        I[J] = Math.round(this.calc(this.styles[J][0], this.styles[J][1], H) * 100) / 100
                    } else {
                        I[J] = this.calc(this.styles[J][0], this.styles[J][1], H);
                        this.pStyles[J] && (I[J] += "%")
                    }
                }
                this.options.onBeforeRender(I, this.el);
                this.set(I);
                this.options.onAfterRender(I, this.el)
            },
            set: function(H) {
                return this.el.jSetCss(H)
            },
            parseCubicBezier: function(H) {
                var I, J = null;
                if ("string" !== G.jTypeOf(H)) {
                    return null
                }
                switch (H) {
                    case "linear":
                        J = F([0, 0, 1, 1]);
                        break;
                    case "ease":
                        J = F([0.25, 0.1, 0.25, 1]);
                        break;
                    case "ease-in":
                        J = F([0.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        J = F([0, 0, 0.58, 1]);
                        break;
                    case "ease-in-out":
                        J = F([0.42, 0, 0.58, 1]);
                        break;
                    case "easeInSine":
                        J = F([0.47, 0, 0.745, 0.715]);
                        break;
                    case "easeOutSine":
                        J = F([0.39, 0.575, 0.565, 1]);
                        break;
                    case "easeInOutSine":
                        J = F([0.445, 0.05, 0.55, 0.95]);
                        break;
                    case "easeInQuad":
                        J = F([0.55, 0.085, 0.68, 0.53]);
                        break;
                    case "easeOutQuad":
                        J = F([0.25, 0.46, 0.45, 0.94]);
                        break;
                    case "easeInOutQuad":
                        J = F([0.455, 0.03, 0.515, 0.955]);
                        break;
                    case "easeInCubic":
                        J = F([0.55, 0.055, 0.675, 0.19]);
                        break;
                    case "easeOutCubic":
                        J = F([0.215, 0.61, 0.355, 1]);
                        break;
                    case "easeInOutCubic":
                        J = F([0.645, 0.045, 0.355, 1]);
                        break;
                    case "easeInQuart":
                        J = F([0.895, 0.03, 0.685, 0.22]);
                        break;
                    case "easeOutQuart":
                        J = F([0.165, 0.84, 0.44, 1]);
                        break;
                    case "easeInOutQuart":
                        J = F([0.77, 0, 0.175, 1]);
                        break;
                    case "easeInQuint":
                        J = F([0.755, 0.05, 0.855, 0.06]);
                        break;
                    case "easeOutQuint":
                        J = F([0.23, 1, 0.32, 1]);
                        break;
                    case "easeInOutQuint":
                        J = F([0.86, 0, 0.07, 1]);
                        break;
                    case "easeInExpo":
                        J = F([0.95, 0.05, 0.795, 0.035]);
                        break;
                    case "easeOutExpo":
                        J = F([0.19, 1, 0.22, 1]);
                        break;
                    case "easeInOutExpo":
                        J = F([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        J = F([0.6, 0.04, 0.98, 0.335]);
                        break;
                    case "easeOutCirc":
                        J = F([0.075, 0.82, 0.165, 1]);
                        break;
                    case "easeInOutCirc":
                        J = F([0.785, 0.135, 0.15, 0.86]);
                        break;
                    case "easeInBack":
                        J = F([0.6, -0.28, 0.735, 0.045]);
                        break;
                    case "easeOutBack":
                        J = F([0.175, 0.885, 0.32, 1.275]);
                        break;
                    case "easeInOutBack":
                        J = F([0.68, -0.55, 0.265, 1.55]);
                        break;
                    default:
                        H = H.replace(/\s/g, "");
                        if (H.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            J = H.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            for (I = J.length - 1; I >= 0; I--) {
                                J[I] = parseFloat(J[I])
                            }
                        }
                }
                return F(J)
            },
            cubicBezierAtTime: function(T) {
                var H = 0,
                    S = 0,
                    P = 0,
                    U = 0,
                    R = 0,
                    N = 0,
                    O = this.options.duration;

                function M(V) {
                    return ((H * V + S) * V + P) * V
                }

                function L(V) {
                    return ((U * V + R) * V + N) * V
                }

                function J(V) {
                    return (3 * H * V + 2 * S) * V + P
                }

                function Q(V) {
                    return 1 / (200 * V)
                }

                function I(V, W) {
                    return L(K(V, W))
                }

                function K(ac, ad) {
                    var ab, aa, Z, W, V, Y;

                    function X(ae) {
                        if (ae >= 0) {
                            return ae
                        } else {
                            return 0 - ae
                        }
                    }
                    for (Z = ac, Y = 0; Y < 8; Y++) {
                        W = M(Z) - ac;
                        if (X(W) < ad) {
                            return Z
                        }
                        V = J(Z);
                        if (X(V) < 0.000001) {
                            break
                        }
                        Z = Z - W / V
                    }
                    ab = 0;
                    aa = 1;
                    Z = ac;
                    if (Z < ab) {
                        return ab
                    }
                    if (Z > aa) {
                        return aa
                    }
                    while (ab < aa) {
                        W = M(Z);
                        if (X(W - ac) < ad) {
                            return Z
                        }
                        if (ac > W) {
                            ab = Z
                        } else {
                            aa = Z
                        }
                        Z = (aa - ab) * 0.5 + ab
                    }
                    return Z
                }
                P = 3 * this.cubicBezier[0];
                S = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - P;
                H = 1 - P - S;
                N = 3 * this.cubicBezier[1];
                R = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - N;
                U = 1 - N - R;
                return I(T, Q(O))
            }
        });
        G.FX.Transition = {
            linear: "linear",
            sineIn: "easeInSine",
            sineOut: "easeOutSine",
            expoIn: "easeInExpo",
            expoOut: "easeOutExpo",
            quadIn: "easeInQuad",
            quadOut: "easeOutQuad",
            cubicIn: "easeInCubic",
            cubicOut: "easeOutCubic",
            backIn: "easeInBack",
            backOut: "easeOutBack",
            elasticIn: function(I, H) {
                H = H || [];
                return Math.pow(2, 10 * --I) * Math.cos(20 * I * Math.PI * (H[0] || 1) / 3)
            },
            elasticOut: function(I, H) {
                return 1 - G.FX.Transition.elasticIn(1 - I, H)
            },
            bounceIn: function(J) {
                for (var I = 0, H = 1; 1; I += H, H /= 2) {
                    if (J >= (7 - 4 * I) / 11) {
                        return H * H - Math.pow((11 - 6 * I - 11 * J) / 4, 2)
                    }
                }
            },
            bounceOut: function(H) {
                return 1 - G.FX.Transition.bounceIn(1 - H)
            },
            none: function(H) {
                return 0
            }
        }
    })(u);
    (function(G) {
        if (!G) {
            throw "MagicJS not found"
        }
        if (G.PFX) {
            return
        }
        var F = G.$;
        G.PFX = new G.Class(G.FX, {
            init: function(H, I) {
                this.el_arr = H;
                this.options = G.extend(this.options, I);
                this.timer = false;
                this.$parent.init()
            },
            start: function(L) {
                var H = /\%$/,
                    K, J, I = L.length;
                this.styles_arr = L;
                this.pStyles_arr = new Array(I);
                for (J = 0; J < I; J++) {
                    this.pStyles_arr[J] = {};
                    for (K in L[J]) {
                        H.test(L[J][K][0]) && (this.pStyles_arr[J][K] = true);
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[J][K].reverse()
                        }
                    }
                }
                this.$parent.start({});
                return this
            },
            render: function(H) {
                for (var I = 0; I < this.el_arr.length; I++) {
                    this.el = G.$(this.el_arr[I]);
                    this.styles = this.styles_arr[I];
                    this.pStyles = this.pStyles_arr[I];
                    this.$parent.render(H)
                }
            }
        })
    })(u);
    (function(G) {
        if (!G) {
            throw "MagicJS not found";
            return
        }
        if (G.Tooltip) {
            return
        }
        var F = G.$;
        G.Tooltip = function(I, J) {
            var H = this.tooltip = G.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).jAddClass("MagicToolboxTooltip");
            G.$(I).jAddEvent("mouseover", function() {
                H.jAppendTo(document.body)
            });
            G.$(I).jAddEvent("mouseout", function() {
                H.jRemove()
            });
            G.$(I).jAddEvent("mousemove", function(O) {
                var Q = 20,
                    N = G.$(O).jGetPageXY(),
                    M = H.jGetSize(),
                    L = G.$(window).jGetSize(),
                    P = G.$(window).jGetScroll();

                function K(T, R, S) {
                    return (S < (T - R) / 2) ? S : ((S > (T + R) / 2) ? (S - R) : (T - R) / 2)
                }
                H.jSetCss({
                    left: P.x + K(L.width, M.width + 2 * Q, N.x - P.x) + Q,
                    top: P.y + K(L.height, M.height + 2 * Q, N.y - P.y) + Q
                })
            });
            this.text(J)
        };
        G.Tooltip.prototype.text = function(H) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(H))
        }
    })(u);
    (function(G) {
        if (!G) {
            throw "MagicJS not found";
            return
        }
        if (G.MessageBox) {
            return
        }
        var F = G.$;
        G.Message = function(K, J, I, H) {
            this.hideTimer = null;
            this.messageBox = G.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).jAddClass(H || "").jAppendTo(I || document.body);
            this.setMessage(K);
            this.show(J)
        };
        G.Message.prototype.show = function(H) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(G.ifndef(H, 5000))
        };
        G.Message.prototype.hide = function(H) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new u.FX(this.messageBox, {
                    duration: G.ifndef(H, 500),
                    onComplete: function() {
                        this.messageBox.kill();
                        delete this.messageBox;
                        this.hideFX = null
                    }.jBind(this)
                }).start({
                    opacity: [this.messageBox.jGetCss("opacity"), 0]
                })
            }
        };
        G.Message.prototype.setMessage = function(H) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(H))
        }
    })(u);
    (function(G) {
        if (!G) {
            throw "MagicJS not found"
        }
        if (G.Options) {
            return
        }
        var J = G.$,
            F = null,
            N = {
                "boolean": 1,
                array: 2,
                number: 3,
                "function": 4,
                string: 100
            },
            H = {
                "boolean": function(Q, P, O) {
                    if ("boolean" != G.jTypeOf(P)) {
                        if (O || "string" != G.jTypeOf(P)) {
                            return false
                        } else {
                            if (!/^(true|false)$/.test(P)) {
                                return false
                            } else {
                                P = P.jToBool()
                            }
                        }
                    }
                    if (Q.hasOwnProperty("enum") && !J(Q["enum"]).contains(P)) {
                        return false
                    }
                    F = P;
                    return true
                },
                string: function(Q, P, O) {
                    if ("string" !== G.jTypeOf(P)) {
                        return false
                    } else {
                        if (Q.hasOwnProperty("enum") && !J(Q["enum"]).contains(P)) {
                            return false
                        } else {
                            F = "" + P;
                            return true
                        }
                    }
                },
                number: function(R, Q, P) {
                    var O = false,
                        T = /%$/,
                        S = (G.jTypeOf(Q) == "string" && T.test(Q));
                    if (P && !"number" == typeof Q) {
                        return false
                    }
                    Q = parseFloat(Q);
                    if (isNaN(Q)) {
                        return false
                    }
                    if (isNaN(R.minimum)) {
                        R.minimum = Number.NEGATIVE_INFINITY
                    }
                    if (isNaN(R.maximum)) {
                        R.maximum = Number.POSITIVE_INFINITY
                    }
                    if (R.hasOwnProperty("enum") && !J(R["enum"]).contains(Q)) {
                        return false
                    }
                    if (R.minimum > Q || Q > R.maximum) {
                        return false
                    }
                    F = S ? (Q + "%") : Q;
                    return true
                },
                array: function(R, P, O) {
                    if ("string" === G.jTypeOf(P)) {
                        try {
                            P = window.JSON.parse(P)
                        } catch (Q) {
                            return false
                        }
                    }
                    if (G.jTypeOf(P) === "array") {
                        F = P;
                        return true
                    } else {
                        return false
                    }
                },
                "function": function(Q, P, O) {
                    if (G.jTypeOf(P) === "function") {
                        F = P;
                        return true
                    } else {
                        return false
                    }
                }
            },
            I = function(T, S, P) {
                var R;
                R = T.hasOwnProperty("oneOf") ? T.oneOf : [T];
                if ("array" != G.jTypeOf(R)) {
                    return false
                }
                for (var Q = 0, O = R.length - 1; Q <= O; Q++) {
                    if (H[R[Q].type](R[Q], S, P)) {
                        return true
                    }
                }
                return false
            },
            L = function(T) {
                var R, Q, S, O, P;
                if (T.hasOwnProperty("oneOf")) {
                    O = T.oneOf.length;
                    for (R = 0; R < O; R++) {
                        for (Q = R + 1; Q < O; Q++) {
                            if (N[T.oneOf[R]["type"]] > N[T.oneOf[Q].type]) {
                                P = T.oneOf[R];
                                T.oneOf[R] = T.oneOf[Q];
                                T.oneOf[Q] = P
                            }
                        }
                    }
                }
                return T
            },
            M = function(R) {
                var Q;
                Q = R.hasOwnProperty("oneOf") ? R.oneOf : [R];
                if ("array" != G.jTypeOf(Q)) {
                    return false
                }
                for (var P = Q.length - 1; P >= 0; P--) {
                    if (!Q[P].type || !N.hasOwnProperty(Q[P].type)) {
                        return false
                    }
                    if (G.defined(Q[P]["enum"])) {
                        if ("array" !== G.jTypeOf(Q[P]["enum"])) {
                            return false
                        }
                        for (var O = Q[P]["enum"].length - 1; O >= 0; O--) {
                            if (!H[Q[P].type]({
                                    type: Q[P].type
                                }, Q[P]["enum"][O], true)) {
                                return false
                            }
                        }
                    }
                }
                if (R.hasOwnProperty("default") && !I(R, R["default"], true)) {
                    return false
                }
                return true
            },
            K = function(O) {
                this.schema = {};
                this.options = {};
                this.parseSchema(O)
            };
        G.extend(K.prototype, {
            parseSchema: function(Q) {
                var P, O, R;
                for (P in Q) {
                    if (!Q.hasOwnProperty(P)) {
                        continue
                    }
                    O = (P + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(O)) {
                        this.schema[O] = L(Q[P]);
                        if (!M(this.schema[O])) {
                            throw "Incorrect definition of the '" + P + "' parameter in " + Q
                        }
                        this.options[O] = undefined
                    }
                }
            },
            set: function(P, O) {
                P = (P + "").jTrim().jCamelize();
                if (G.jTypeOf(O) == "string") {
                    O = O.jTrim()
                }
                if (this.schema.hasOwnProperty(P)) {
                    F = O;
                    if (I(this.schema[P], O)) {
                        this.options[P] = F
                    }
                    F = null
                }
            },
            get: function(O) {
                O = (O + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(O)) {
                    return G.defined(this.options[O]) ? this.options[O] : this.schema[O]["default"]
                }
            },
            fromJSON: function(P) {
                for (var O in P) {
                    this.set(O, P[O])
                }
            },
            getJSON: function() {
                var P = G.extend({}, this.options);
                for (var O in P) {
                    if (undefined === P[O] && undefined !== this.schema[O]["default"]) {
                        P[O] = this.schema[O]["default"]
                    }
                }
                return P
            },
            fromString: function(O) {
                J(O.split(";")).jEach(J(function(P) {
                    P = P.split(":");
                    this.set(P.shift().jTrim(), P.join(":"))
                }).jBind(this))
            },
            exists: function(O) {
                O = (O + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(O)
            },
            isset: function(O) {
                O = (O + "").jTrim().jCamelize();
                return this.exists(O) && G.defined(this.options[O])
            },
            jRemove: function(O) {
                O = (O + "").jTrim().jCamelize();
                if (this.exists(O)) {
                    delete this.options[O];
                    delete this.schema[O]
                }
            }
        });
        G.Options = K
    }(u));
    v.$AA = function(F) {
        var H = [],
            G;
        for (G in F) {
            if (!F.hasOwnProperty(G) || (G + "").substring(0, 2) == "$J") {
                continue
            }
            H.push(F[G])
        }
        return v.$A(H)
    };
    v.nativeEvents = {
        click: 2,
        dblclick: 2,
        mouseup: 2,
        mousedown: 2,
        contextmenu: 2,
        mousewheel: 2,
        DOMMouseScroll: 2,
        mouseover: 2,
        mouseout: 2,
        mousemove: 2,
        selectstart: 2,
        selectend: 2,
        keydown: 2,
        keypress: 2,
        keyup: 2,
        focus: 2,
        blur: 2,
        change: 2,
        reset: 2,
        select: 2,
        submit: 2,
        load: 1,
        unload: 1,
        beforeunload: 2,
        resize: 1,
        move: 1,
        DOMContentLoaded: 1,
        readystatechange: 1,
        error: 1,
        abort: 1
    };
    v.customEventsAllowed = {
        document: true,
        element: true,
        "class": true,
        object: true
    };
    v.customEvents = {
        bindEvent: function(J, I, G) {
            if (v.jTypeOf(J) == "array") {
                k(J).jEach(this.bindEvent.jBindAsEvent(this, I, G));
                return this
            }
            if (!J || !I || v.jTypeOf(J) != "string" || v.jTypeOf(I) != "function") {
                return this
            }
            if (J == "domready" && v.browser.ready) {
                I.call(this);
                return this
            }
            G = parseInt(G || 10);
            if (!I.$J_EUID) {
                I.$J_EUID = Math.floor(Math.random() * v.now())
            }
            var H = this.jFetch("_events", {});
            H[J] || (H[J] = {});
            H[J][G] || (H[J][G] = {});
            H[J]["orders"] || (H[J]["orders"] = {});
            if (H[J][G][I.$J_EUID]) {
                return this
            }
            if (H[J]["orders"][I.$J_EUID]) {
                this.unbindEvent(J, I)
            }
            var F = this,
                K = function(L) {
                    return I.call(F, k(L))
                };
            if (v.nativeEvents[J] && !H[J]["function"]) {
                if (v.nativeEvents[J] == 2) {
                    K = function(L) {
                        L = v.extend(L || window.e, {
                            $J_TYPE: "event"
                        });
                        return I.call(F, k(L))
                    }
                }
                H[J]["function"] = function(L) {
                    F.jCallEvent(J, L)
                };
                this[v._event_add_](v._event_prefix_ + J, H[J]["function"], false)
            }
            H[J][G][I.$J_EUID] = K;
            H[J]["orders"][I.$J_EUID] = G;
            return this
        },
        jCallEvent: function(G, I) {
            try {
                I = v.extend(I || {}, {
                    type: G
                })
            } catch (H) {}
            if (!G || v.jTypeOf(G) != "string") {
                return this
            }
            var F = this.jFetch("_events", {});
            F[G] || (F[G] = {});
            F[G]["orders"] || (F[G]["orders"] = {});
            v.$AA(F[G]).jEach(function(J) {
                if (J != F[G]["orders"] && J != F[G]["function"]) {
                    v.$AA(J).jEach(function(K) {
                        K(this)
                    }, this)
                }
            }, I);
            return this
        },
        unbindEvent: function(I, H) {
            if (!I || !H || v.jTypeOf(I) != "string" || v.jTypeOf(H) != "function") {
                return this
            }
            if (!H.$J_EUID) {
                H.$J_EUID = Math.floor(Math.random() * v.now())
            }
            var G = this.jFetch("_events", {});
            G[I] || (G[I] = {});
            G[I]["orders"] || (G[I]["orders"] = {});
            order = G[I]["orders"][H.$J_EUID];
            G[I][order] || (G[I][order] = {});
            if (order >= 0 && G[I][order][H.$J_EUID]) {
                delete G[I][order][H.$J_EUID];
                delete G[I]["orders"][H.$J_EUID];
                if (v.$AA(G[I][order]).length == 0) {
                    delete G[I][order];
                    if (v.nativeEvents[I] && v.$AA(G[I]).length == 0) {
                        var F = this;
                        this[v._event_del_](v._event_prefix_ + I, G[I]["function"], false)
                    }
                }
            }
            return this
        },
        destroyEvent: function(H) {
            if (!H || v.jTypeOf(H) != "string") {
                return this
            }
            var G = this.jFetch("_events", {});
            if (v.nativeEvents[H]) {
                var F = this;
                this[v._event_del_](v._event_prefix_ + H, G[H]["function"], false)
            }
            G[H] = {};
            return this
        },
        cloneEvents: function(H, G) {
            var F = this.jFetch("_events", {});
            for (t in F) {
                if (G && t != G) {
                    continue
                }
                for (order in F[t]) {
                    if (order == "orders" || order == "function") {
                        continue
                    }
                    for (f in F[t][order]) {
                        k(H).bindEvent(t, F[t][order][f], order)
                    }
                }
            }
            return this
        },
        jCopyEvents: function(I, H) {
            if (1 !== I.nodeType) {
                return this
            }
            var G = this.jFetch("events");
            if (!G) {
                return this
            }
            for (var F in G) {
                if (H && F != H) {
                    continue
                }
                for (var J in G[F]) {
                    k(I).bindEvent(F, G[F][J])
                }
            }
            return this
        },
        jFetch: v.Element.jFetch,
        jStore: v.Element.jStore
    };
    (function(F) {
        if (!F) {
            throw "MagicJS not found";
            return
        }
        F.extend = function(N, M) {
            if (!(N instanceof window.Array)) {
                N = [N]
            }
            if (!(M instanceof window.Array)) {
                M = [M]
            }
            for (var K = 0, H = N.length; K < H; K++) {
                if (!F.defined(N[K])) {
                    continue
                }
                for (var J = 0, L = M.length; J < L; J++) {
                    if (!F.defined(M[J])) {
                        continue
                    }
                    for (var I in (M[J] || {})) {
                        try {
                            N[K][I] = M[J][I]
                        } catch (G) {}
                    }
                }
            }
            return N[0]
        };
        F.inherit = function(I, H) {
            function G() {}
            G.prototype = H.prototype;
            I.$parent = H.prototype;
            I.prototype = new G();
            I.prototype.constructor = I
        };
        F.extend([F.Element, window.magicJS.Element], {
            jGetSize_: F.Element.jGetSize,
            jGetSize: function(G, I) {
                var H, J = {
                    width: 0,
                    height: 0
                };
                if (I) {
                    J = this.jGetSize_()
                } else {
                    H = this.getBoundingClientRect();
                    J.width = H.width;
                    J.height = H.height
                }
                if (G) {
                    J.width += (parseInt(this.jGetCss("margin-left") || 0) + parseInt(this.jGetCss("margin-right") || 0));
                    J.height += (parseInt(this.jGetCss("margin-top") || 0) + ((this.jGetCss("display") != "block") ? parseInt(this.jGetCss("margin-bottom") || 0) : 0))
                }
                return J
            }
        })
    })(u);
    v.Modules || (v.Modules = {});
    v.Modules.ArrowsPair = (function() {
        var F = ["next", "prev"],
            I;

        function J(L, K) {
            return v.$new("button", {
                type: "button"
            }, {
                display: "inline-block"
            }).jAddClass(I["class"]).jAddClass(I.orientation).jAddClass(I["class"] + "-arrow").jAddClass(I["class"] + "-arrow-" + L).jAppendTo(K)
        }

        function G(K, L) {
            L.stopDistribution();
            this.jCallEvent(K)
        }
        var H = function(L, K) {
            v.$uuid(this);
            this.options = {
                "class": "",
                classHidden: "",
                classDisabled: "",
                position: "inside",
                orientation: "ms-horizontal",
                form: "button"
            };
            I = this.o = this.options;
            v.extend(this.o, L);
            this.prev = J("prev", K);
            this.next = J("next", K);
            this.next.jAddEvent("click", function(M) {
                M.stop()
            }).jAddEvent("btnclick tap", G.jBind(this, "forward"));
            this.prev.jAddEvent("click", function(M) {
                M.stop()
            }).jAddEvent("btnclick tap", G.jBind(this, "backward"))
        };
        H.prototype = {
            disable: function(K) {
                j(K && [K] || F).jEach(function(L) {
                    this[L].jAddClass(I.classDisabled)
                }, this)
            },
            enable: function(K) {
                j(K && [K] || F).jEach(function(L) {
                    this[L].jRemoveClass(I.classDisabled)
                }, this)
            },
            hide: function(K) {
                j(K && [K] || F).jEach(function(L) {
                    this[L].jAddClass(I.classHidden)
                }, this)
            },
            show: function(K) {
                j(K && [K] || F).jEach(function(L) {
                    this[L].jRemoveClass(I.classHidden)
                }, this)
            },
            jRemove: function(K) {
                j(K && [K] || F).jEach(function(L) {
                    this[L].kill()
                }, this)
            },
            setOrientation: function(K) {
                j(F).jEach(function(L) {
                    this[L].jRemoveClass("mcs-" + I.orientation);
                    this[L].jAddClass("mcs-" + K)
                }, this);
                this.o.orientation = "mcs-" + K
            }
        };
        v.extend(H.prototype, v.customEvents);
        return H
    })();
    v.Modules || (v.Modules = {});
    v.Modules.Bullets = (function() {
        var G = "active",
            F = function(J, I, H) {
                v.$uuid(this);
                this._options = {};
                this.o = this._options;
                v.extend(this.o, J);
                this.bullets = v.$([]);
                this.callback = H;
                this.activeBullet = {};
                this.ban = false;
                this.container = v.$new("div", {
                    "class": "mcs-bullets"
                });
                this.container.jAppendTo(I)
            };
        F.prototype = {
            push: function(H) {
                var I = j(function(K) {
                    var J = this.bullets.length;
                    this.bullets.push({
                        index: J,
                        enable: false,
                        jump: K,
                        node: v.$new("div", {
                            "class": "mcs-bullet mcs-bullet-" + J
                        })
                    });
                    if (!J) {
                        this.activeBullet = this.bullets[J];
                        this.activate(this.bullets[J]);
                        this.bullets[J].enable = true
                    }
                    this.bullets[J].node.jAddEvent("click", j(function(L) {
                        L.stop();
                        if (this.bullets[J].index == this.activeBullet.index) {
                            return
                        }
                        this.ban = this.callback();
                        !this.ban && this.jCallEvent("bullets-click", {
                            direction: this.getDirection(this.bullets[J]),
                            jumpIndex: this.bullets[J].jump
                        })
                    }).jBind(this));
                    this.bullets[J].node.jAppendTo(this.container)
                }).jBind(this);
                this.reset();
                H.jEach(j(function(J) {
                    I(J)
                }).jBind(this))
            },
            setActiveBullet: function(H, I) {
                if (this.activeBullet.index == H[0]) {
                    return
                }
                this.activate(this.getBulletIndex(H, I))
            },
            show: function() {
                this.container.jAddClass("show")
            },
            update: function() {
                if (this.activeBullet.node) {
                    this.deactivate();
                    this.activate(this.bullets[0])
                }
            },
            jRemove: function() {
                this.bullets.jEach(function(H) {
                    H.node.kill()
                });
                this.container.kill()
            },
            deactivate: function() {
                this.activeBullet.enable = false;
                this.activeBullet.node.jRemoveClass(G)
            },
            activate: function(H) {
                this.deactivate();
                this.activeBullet = H;
                H.enable = true;
                H.node.jAddClass(G)
            },
            getDirection: function(H) {
                var I = this.activeBullet.index > H.index ? "backward" : "forward";
                this.activate(H);
                return I
            },
            getBulletIndex: function(H, K) {
                var L, J = this.bullets.length - 1,
                    I = this.activeBullet;
                for (var L = J; L >= 0; L--) {
                    if (this.bullets[L].jump <= H[0]) {
                        I = this.bullets[L];
                        break
                    }
                }
                if (K) {
                    if (this.o.items - 1 == H[H.length - 1]) {
                        I = this.bullets[J]
                    }
                }
                return I
            },
            reset: function() {
                this.ban = false;
                this.activeBullet = {};
                this.bullets.jEach(function(H) {
                    H.node.kill()
                });
                this.bullets.length = 0
            }
        };
        v.extend(F.prototype, v.customEvents);
        return F
    })();
    v.Modules || (v.Modules = {});
    v.Modules.Progress = (function() {
        var G = 300,
            F = function(H, I) {
                this.flag = "none";
                this.node = v.$new("div", {
                    "class": "mcs-loader"
                });
                if (v.browser.ieMode && v.browser.ieMode < 10) {
                    this.node.append(v.$new("div", {
                        "class": "mcs-loader-text"
                    }).append(v.doc.createTextNode("Loading...")))
                } else {
                    if (I) {
                        this.node.append(v.$new("div", {
                            "class": "mcs-loader-circles"
                        }).append(v.$new("div", {
                            "class": "mcs-item-loader"
                        }, {
                            "z-index": 100000
                        })))
                    } else {
                        this.node.append(v.$new("div", {
                            "class": "mcs-loader-circles"
                        }).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_01"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_02"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_03"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_04"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_05"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_06"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_07"
                        })).append(v.$new("div", {
                            "class": "mcs-loader-circle mcs-loader-circle_08"
                        })))
                    }
                }
                this.node.jAppendTo(H);
                this.node.hide()
            };
        F.prototype = {
            show: function() {
                if (this.flag === "show") {
                    return
                }
                if (this.node) {
                    this.flag = "show";
                    this.node.jSetOpacity(1);
                    this.node.show()
                }
            },
            hide: function(H) {
                if (this.flag === "hide") {
                    return
                }
                if (this.node) {
                    this.flag = "hide";
                    this.node.jSetOpacity(0);
                    this.node.hide()
                }
            },
            jRemove: function() {
                this.node && this.node.kill()
            }
        };
        return F
    })();
    v.Modules || (v.Modules = {});
    v.Modules.ShowItems = (function() {
        var F = function() {
            var M = [],
                H = 300,
                J = 0,
                K = 0,
                N = false,
                L = this;
            v.$uuid(this);

            function I() {
                var Q;
                if (M.length == 0) {
                    L.jCallEvent("complete");
                    return
                }
                if (!N && M.length > 0) {
                    N = true;
                    Q = M.shift();
                    var P = j([]);
                    P.push(Q.item);
                    if (Q.item.clone && Q.item.clone.length > 0) {
                        j(Q.item.clone).jEach(j(function(R) {
                            P.push(R)
                        }).jBind(this))
                    }
                    P.jEach(function(S, R) {
                        K += 1;
                        if (Q.visible) {
                            if (R) {
                                Q.visible = false
                            }
                        }
                        O(S, !!R, Q.visible, Q.callback, function() {
                            N = false;
                            I()
                        }, Q.showReflection)
                    })
                }
            }

            function G(Q, S, P, R) {
                if (Q.progress) {
                    Q.progress.hide(true)
                }
                J++;
                if (J == K) {
                    K = J = 0;
                    P();
                    R()
                }
            }

            function O(V, U, R, S, Q, P) {
                var W, X, T = j(V.content);
                if (V.load == "loaded") {
                    G(V, U, S, Q);
                    return
                }
                if (R) {
                    if (v.browser.ieMode && v.browser.ieMode < 10) {
                        X = j(T).jGetSize();
                        W = {
                            opacity: [0, 1],
                            top: [X.height / 2, 0],
                            left: [X.width / 2, 0],
                            width: [0, X.width],
                            height: [0, X.height]
                        };
                        this.itemFX = new v.FX(T, {
                            duration: H,
                            onComplete: j(function(Z, Y) {
                                T.jSetCss({
                                    overflow: "",
                                    position: "",
                                    top: "",
                                    left: "",
                                    width: "",
                                    height: ""
                                });
                                U && (V.load = "loaded");
                                G(V, U, Z, Y)
                            }).jBind(this, S, Q),
                            onStart: j(function() {
                                T.jSetCss({
                                    position: "relative",
                                    overflow: "hidden"
                                })
                            }).jBind(this)
                        });
                        this.itemFX.start(W)
                    } else {
                        T.jSetCssProp(g, "scale(0.2, 0.2)");
                        T.jSetCssProp("transition", "none");
                        T.jSetOpacity(0);
                        T.offsetHeight;
                        T.parentNode.offsetHeight;
                        T.jAddEvent("transitionend", j(function(Y) {
                            if (Y.target == T) {
                                this.jRemoveEvent(Y.type);
                                this.jSetCssProp(g, "");
                                this.jSetCssProp("transition", "")
                            }
                        }).jBind(T));
                        if (!U && P) {
                            P(V)
                        }
                        T.jSetCssProp("transition", g + " " + H + "ms cubic-bezier(.5,.5,.69,1.9), opacity " + H + "ms linear");
                        T.offsetHeight;
                        T.parentNode.offsetHeight;
                        T.jSetCssProp(g, "scale(1.0, 1.0)");
                        T.jSetOpacity(1);
                        U && (V.load = "loaded");
                        G(V, U, S, Q)
                    }
                } else {
                    T.jSetOpacity(1);
                    if (U) {
                        V.load = "loaded"
                    } else {
                        P(V)
                    }
                    G(V, U, S, Q)
                }
            }
            this.push = function(R, Q, P, S) {
                M.push({
                    item: R,
                    visible: Q,
                    callback: P,
                    showReflection: S
                });
                I()
            }
        };
        v.extend(F.prototype, v.customEvents);
        return F
    })();
    (function(F) {
        F.QImageLoader = function(M, H) {
            var G = 0,
                L = this,
                K, I;

            function P(Q) {
                return function(R) {
                    (H[Q] || F.$F).call(L, R, R.origItem);
                    G--;
                    O()
                }
            }

            function O() {
                var Q;
                if (!M.length) {} else {
                    if (G < (H.queue || 3)) {
                        K = M.shift();
                        Q = J(K.node);
                        if (Q) {
                            I = new F.ImageLoader(Q, {
                                onload: P("onload"),
                                onerror: P("onerror"),
                                onabort: P("onabort"),
                                oncomplete: P("oncomplete")
                            });
                            I.origItem = K
                        } else {
                            (H.onload || F.$F).call(L, {
                                size: j(K.node).jGetSize(),
                                img: Q
                            }, K);
                            G--;
                            O()
                        }
                        G++
                    }
                }
            }

            function N(Q) {
                var R, S;
                R = (Q && Q instanceof HTMLImageElement);
                if (R) {
                    S = Q.getAttribute("data-src") || null;
                    if (S) {
                        Q.setAttribute("src", S)
                    }
                }
                return (R && Q.getAttribute("src")) ? Q : null
            }

            function J(Q) {
                return F.jTypeOf(K) == "string" ? Q : (F.jTypeOf(Q) == "object" ? N(Q.img) : ((Q.tagName == "A" || Q.tagName.toLowerCase() == "figure") ? N(j(Q).byTag("IMG")[0] || Q.firstChild) : (Q.tagName == "IMG" ? N(Q) : null)))
            }
            this.push = function(Q, R) {
                M[R ? "unshift" : "push"](Q);
                H.delay || O();
                return this
            };
            this.abort = function() {
                I.destroy();
                count--
            };
            this.load = O;
            H.delay || M.length && O()
        }
    })(u);
    var m, j = v.$,
        D = j,
        k = j;
    var o;
    var p = function() {
        return "mgctlbxN$MSC mgctlbxV$" + "v2.0.35".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + ((window.mgctlbx$Pltm && "string" == v.jTypeOf(window.mgctlbx$Pltm)) ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
    };

    function c() {
        v.addCSS(".msc-tmp-hdn-holder", {
            display: "block !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            width: "10px !important",
            height: "10px !important",
            position: "absolute !important",
            top: "-10000px !important",
            left: "0 !important",
            overflow: "hidden !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magicsroll-reset-css")
    }
    v.Scroll = {};
    m = {
        width: {
            oneOf: [{
                type: "number",
                minimum: 1
            }, {
                type: "string",
                "enum": ["auto"]
            }],
            "default": "auto"
        },
        height: {
            oneOf: [{
                type: "number",
                minimum: 1
            }, {
                type: "string",
                "enum": ["auto"]
            }],
            "default": "auto"
        },
        items: {
            oneOf: [{
                type: "number",
                minimum: 1
            }, {
                type: "array"
            }, {
                type: "string",
                "enum": ["auto", "fit"]
            }],
            "default": "auto"
        },
        scrollOnWheel: {
            oneOf: [{
                type: "boolean"
            }, {
                type: "string",
                "enum": ["auto"]
            }],
            "default": "auto"
        },
        arrows: {
            oneOf: [{
                type: "boolean"
            }, {
                type: "string",
                "enum": ["inside", "outside", "off"]
            }],
            "default": "outside"
        },
        autoplay: {
            type: "number",
            "default": 0
        },
        speed: {
            type: "number",
            "default": 600
        },
        loop: {
            oneOf: [{
                type: "string",
                "enum": ["infinite", "rewind", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "infinite"
        },
        lazyLoad: {
            type: "boolean",
            "default": false
        },
        orientation: {
            type: "string",
            "enum": ["horizontal", "vertical"],
            "default": "horizontal"
        },
        step: {
            oneOf: [{
                type: "number",
                minimum: 0
            }, {
                type: "string",
                "enum": ["auto"]
            }],
            "default": "auto"
        },
        draggable: {
            type: "boolean",
            "default": true
        },
        mode: {
            type: "string",
            "enum": ["scroll", "animation", "carousel", "cover-flow"],
            "default": "scroll"
        },
        pagination: {
            type: "boolean",
            "default": false
        },
        easing: {
            type: "string",
            "default": "cubic-bezier(.8, 0, .5, 1)"
        },
        keyboard: {
            type: "boolean",
            "default": false
        },
        autostart: {
            type: "boolean",
            "default": true
        },
        onItemHover: {
            type: "function",
            "default": v.$F
        },
        onItemOut: {
            type: "function",
            "default": v.$F
        },
        onReady: {
            type: "function",
            "default": v.$F
        },
        onStop: {
            type: "function",
            "default": v.$F
        },
        onMoveStart: {
            type: "function",
            "default": v.$F
        },
        onMoveEnd: {
            type: "function",
            "default": v.$F
        }
    };
    document.createElement("figure");
    document.createElement("figcaption");
    var n = function(F) {
            return {
                width: ((parseInt(F.jGetCss("margin-left")) || 0) + (parseInt(F.jGetCss("margin-right")) || 0)),
                height: ((parseInt(F.jGetCss("margin-top")) || 0) + (parseInt(F.jGetCss("margin-bottom")) || 0))
            }
        },
        i = function(F) {
            return {
                width: ((parseInt(F.jGetCss("padding-left")) || 0) + (parseInt(F.jGetCss("padding-right")) || 0)),
                height: ((parseInt(F.jGetCss("padding-top")) || 0) + (parseInt(F.jGetCss("padding-bottom")) || 0))
            }
        },
        r = function(F) {
            return {
                width: ((parseInt(F.jGetCss("border-left-width")) || 0) + (parseInt(F.jGetCss("border-right-width")) || 0)),
                height: ((parseInt(F.jGetCss("border-top-width")) || 0) + (parseInt(F.jGetCss("border-bottom-width")) || 0))
            }
        },
        E = function(F) {
            return {
                width: j(F).jGetCss("width"),
                height: j(F).jGetCss("height")
            }
        },
        w = v.browser.domPrefix,
        g = v.normalizeCSS("transform").dashize(),
        b = function(G, H) {
            var F = false,
                I = 0;
            v.$uuid(this);
            this._options = {
                stopDownload: true,
                timingFunction: "cubic-bezier(.8, 0, .5, 1)",
                effect: "scroll",
                continuous: false,
                progress: false,
                debug: false,
                orientation: "horizontal",
                duration: 500,
                loop: true,
                lazyLoad: true,
                step: "auto",
                draggable: true,
                keyboard: false
            };
            this.o = this._options;
            v.extend(this.o, H);
            this.container = j(G).jSetCssProp("white-space", "nowrap");
            this.loop = {
                firstItem: false,
                lastItem: false
            };
            this._setProperties();
            this.keyboardCallback = j(function(L) {
                var K = {},
                    J = true;
                if (37 === L.keyCode || 39 === L.keyCode) {
                    K.direction = L.keyCode == 39 ? "forward" : "backward";
                    if (!this.o.loop) {
                        if ("forward" === K.direction) {
                            if (this.loop.lastItem) {
                                J = false
                            }
                        } else {
                            if (this.loop.firstItem) {
                                J = false
                            }
                        }
                    }
                    J && this.jCallEvent("key_down", K)
                }
            }).jBind(this);
            this.name = "scroll";
            this.items = j([]);
            this.itemsFirstClones = j([]);
            this.itemsLastClones = j([]);
            this.exitItems = j([]);
            this.enterItems = j([]);
            this.last = 0;
            this.globalIndex = 0;
            this.itemStep = this.o.step;
            this.containerPosition = 0;
            this.l = null;
            this.globalLength = null;
            this.distance = null;
            this.allSize = 0;
            this.correctPosition = 0;
            this.containerWidth = 0;
            this.direction = "forward";
            this.callback = v.$F;
            this.fullViewedItems = 0;
            this.stopScroll = false;
            this.moveTimer = null;
            this.wheelDiff = 0;
            this.tempArray = null;
            this.prevIndex = this.last;
            this.wheel_ = false;
            this.preloadAllFlag = false;
            this.disableReflection = false;
            this.loadAll = false;
            this.allNodes = null;
            this.doneFlag = {};
            this.wrapperPosition = 0;
            this.moveSettings = {
                direction: "forward",
                disableEffect: false
            };
            this.onDrag = null;
            this.queue = new v.QImageLoader([], {
                queue: 1,
                onerror: j(function(K, L) {
                    var J = this.items[L.index];
                    J.load = "error";
                    if (J.progress) {
                        J.progress.jRemove();
                        J.progress = null
                    }
                    J.node.jAddClass("mcs-noimg");
                    this.performedOnClones(j(function(N, M) {
                        if (N.index == J.index) {
                            N.append = true;
                            if (N.progress) {
                                N.progress.jRemove();
                                N.progress = null
                            }
                            N.node.load = "error";
                            N.node.jAddClass("mcs-noimg")
                        }
                    }).jBind(this));
                    I++;
                    if (this.o.lazyLoad) {
                        if (this.checkLoadingVisibleItems()) {
                            if (this.o.stopDownload || !this.doneFlag.two) {
                                this.jCallEvent("hideProgress");
                                this.jCallEvent("groupLoad")
                            }
                            if (!this.move_) {
                                this.changeClones()
                            }!this.doneFlag.two && this.jCallEvent("complete")
                        }
                    } else {
                        if (I == this.l && !this.o.lazyLoad) {
                            this.loadAll = true;
                            !this.doneFlag.two && this.jCallEvent("complete")
                        }
                    }
                    this.checkLoadedItems()
                }).jBind(this),
                onload: (function(M, N) {
                    var L = [],
                        K = this.items[N.index],
                        J;
                    if (!K) {
                        return
                    }
                    K.node.append(K.content);
                    try {
                        this.setReflection(K)
                    } catch (M) {}
                    if (!this.disableReflection) {
                        try {
                            this.setCanvasPosition(K)
                        } catch (M) {
                            this.disableReflection = true
                        }
                    }
                    this.addCloneContent(K, j(function() {
                        var O = true;
                        if (j(["scroll", "animation"]).contains(this.name)) {
                            if (!this.doneFlag.two && !this.o.lazyLoad) {
                                O = N.index < this.fullViewedItems
                            }
                        }
                        this.showItem(K, O, this.showReflection);
                        K.load = "loaded";
                        I++;
                        if (this.o.lazyLoad) {
                            this.onLazyLoad(I)
                        } else {
                            if (I == this.l) {
                                this.loadAll = true;
                                !this.doneFlag.two && this.jCallEvent("complete")
                            }
                        }
                        this.checkLoadedItems()
                    }).jBind(this))
                }).jBind(this)
            })
        };
    b.prototype = {
        constructor: b,
        showReflection: v.$F,
        setCanvasPosition: v.$F,
        setReflection: v.$F,
        onLazyLoad: function(F) {
            if (this.checkLoadingVisibleItems()) {
                if (this.o.stopDownload || !this.doneFlag.two) {
                    this.jCallEvent("hideProgress");
                    this.jCallEvent("groupLoad")
                }
                if (!this.doneFlag.two) {
                    this.jCallEvent("complete")
                }
            }
        },
        showItem: function(J, M, L) {
            var F, I, H, K = 500,
                G = J.content;
            if (M) {
                if (v.browser.ieMode && v.browser.ieMode < 10) {
                    F = j(G).jGetSize();
                    I = {
                        opacity: [0, 1],
                        top: [F.height / 2, 0],
                        left: [F.width / 2, 0],
                        width: [0, F.width],
                        height: [0, F.height]
                    };
                    H = new v.FX(G, {
                        duration: K,
                        onComplete: j(function(O, N) {
                            G.jSetCss({
                                overflow: "",
                                position: "",
                                top: "",
                                left: "",
                                width: "",
                                height: ""
                            });
                            if (J.progress) {
                                J.progress.jRemove();
                                J.progress = null
                            }
                        }).jBind(this),
                        onStart: j(function() {
                            G.jSetCss({
                                position: "relative",
                                overflow: "hidden"
                            })
                        }).jBind(this)
                    });
                    H.start(I)
                } else {
                    G.jSetCssProp("transition", "none");
                    G.jSetOpacity(0);
                    G.offsetHeight;
                    G.parentNode.offsetHeight;
                    G.jAddEvent("transitionend", j(function(N) {
                        if (N.target == G) {
                            this.jRemoveEvent(N.type);
                            this.jSetCssProp(g, "");
                            this.jSetCssProp("transition", "");
                            if (J.progress) {
                                J.progress.jRemove();
                                J.progress = null
                            }
                        }
                    }).jBind(G));
                    G.jSetCssProp("transition", g + " " + K + "ms cubic-bezier(.5,.5,.69,1.9), opacity " + K + "ms linear");
                    G.offsetHeight;
                    G.parentNode.offsetHeight;
                    G.jSetOpacity(1);
                    L && L(J)
                }
            } else {
                G.jSetOpacity(1);
                if (J.progress) {
                    J.progress.jRemove();
                    J.progress = null
                }
            }
            J.clone.length > 0 && j(J.clone).jEach(j(function(N) {
                if (N) {
                    j(N.content).jSetOpacity(1);
                    N.load = "loaded";
                    if (N.progress) {
                        N.progress.jRemove();
                        N.progress = null
                    }
                }
            }).jBind(this))
        },
        checkLoadedItems: function() {
            var F = 0;
            this.items.jEach(j(function(G) {
                if (G.load == "loaded" || G.load == "error") {
                    F++
                }
                if (this.l == F) {
                    this.loadAll = true;
                    this.jCallEvent("hideProgress")
                }
            }).jBind(this))
        },
        checkLoadingVisibleItems: function() {
            var F = 0,
                G = 0;
            if (this.loadAll) {
                return true
            }
            for (; F < this.fullViewedItems; F++) {
                if (this.items[this._getItemIndex(this.last + F)].load == "loaded" || this.items[this._getItemIndex(this.last + F)].load == "error") {
                    G += 1
                }
            }
            return G == this.fullViewedItems
        },
        _sWidth: function() {
            return this.container.parentNode.jGetSize()[this.p_.size]
        },
        _setProperties: function() {
            var F = {
                horizontal: {
                    size: "width",
                    pos: "left",
                    otherSize: "height"
                },
                vertical: {
                    size: "height",
                    pos: "top",
                    otherSize: "width"
                }
            };
            this.p_ = F[this.o.orientation];
            if (this.o.step == 0) {
                this.o.step = "auto"
            }
            if (!this.o.loop || "rewind" === this.o.loop) {
                this.loop.firstItem = true
            }
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                this.container.jSetCssProp(this.p_.pos, 0)
            } else {
                this.container.jSetCssProp(g, "translate3d(0, 0, 0)")
            }
        },
        _render: function() {
            this.container.offsetHeight
        },
        preloadAll: function() {
            if (this.loadAll || this.preloadAllFlag) {
                return
            }
            this.preloadAllFlag = true;
            this.jCallEvent("showProgress");
            this.items.jEach(j(function(F) {
                if (F.load == "notLoaded") {
                    if (F.progress) {
                        F.progress.jRemove();
                        F.progress = null
                    }
                    F.clone.length > 0 && j(F.clone).jEach(function(G) {
                        if (G.progress) {
                            G.progress.jRemove();
                            G.progress = null
                        }
                    });
                    this.queue.push({
                        node: F.content,
                        index: F.index
                    })
                }
            }).jBind(this));
            this.loadAll = true
        },
        preloadItem: function(G) {
            var H, J = this.last,
                F = j([]),
                I, K;
            if (this.loadAll) {
                return
            }
            if (this.o.lazyLoad) {
                G && (J = (G == "forward") ? this._getItemIndex(J + this.fullViewedItems) : this._getItemIndex(J - this.fullViewedItems));
                K = j(function(L) {
                    if (L.load == "notLoaded") {
                        if (this.o.stopDownload) {
                            !G && this.jCallEvent("showProgress")
                        } else {
                            L.progress && L.progress.show()
                        }
                        L.load = "load";
                        this.queue.push({
                            node: L.content,
                            index: L.index
                        })
                    }
                }).jBind(this);
                for (H = 0; H < this.fullViewedItems; H++) {
                    I = this.items[this._getItemIndex(J + H)];
                    K(I);
                    if (!G) {
                        K(this.items[this._getItemIndex(I.index + this.fullViewedItems)]);
                        K(this.items[this._getItemIndex(I.index - this.fullViewedItems)])
                    }
                }
            }
        },
        freeTouchPreload: function(K) {
            var L, G, I, H, F = 0,
                J = this.allNodes.length;
            if (K == "backward") {
                F = J - 1;
                J = -1
            }
            if (!this.loadAll) {
                while (F != J) {
                    H = this.allNodes[F];
                    L = H.jGetPosition();
                    G = H.getAttribute("data-item");
                    if (L[this.p_.pos] + this.items[0].size[this.p_.size] > this.wrapperPosition[this.p_.pos] && L[this.p_.pos] < this.wrapperPosition[this.p_.pos] + this.containerWidth) {
                        I = this.items[G];
                        if (I.load == "notLoaded") {
                            I.load = "load";
                            I.progress && I.progress.show();
                            j(I.clone).jEach(j(function(M) {
                                M.progress && M.progress.show()
                            }).jBind(this));
                            this.queue.push({
                                node: I.content,
                                index: I.index
                            })
                        }
                    }
                    K == "forward" ? F++ : F--
                }
            }
        },
        done: function(J) {
            var G, F, I, H;
            if (this.doneFlag.one) {
                return
            }
            this.doneFlag.one = true;
            F = this.l = this.items.length;
            this.containerWidth = this._sWidth();
            I = j(this.container.parentNode).jGetPosition();
            for (G = 0; G < this.l; G++) {
                H = this.items[G];
                H.size = H.node.jGetSize(true);
                this.allSize += H.size[this.p_.size]
            }
            this.onResize()
        },
        done2: function(G) {
            this.doneFlag.two = true;
            this.setItemStep();
            if (!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 9) {
                if (this.o.draggable) {
                    this._initDragOnScroll()
                }
            }
            this.itemEvent();
            if ((!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 9) && "scroll" === this.o.effect && this.o.scrollOnWheel) {
                this._initOnWheel()
            }
            if (j(["scroll", "animation"]).contains(this.name)) {
                for (var F = 0; F < this.items.length; F++) {
                    if (F >= this.fullViewedItems) {
                        this.items[F].progress && this.items[F].progress.show()
                    }
                }
            }
            this.last = 0;
            this.globalIndex = this.itemsFirstClones.length;
            j(window).jAddEvent("resize", this.onResize.jBind(this));
            if (this.o.keyboard) {
                j(document).jAddEvent("keydown", this.keyboardCallback)
            }
            this.onResize();
            G && G()
        },
        itemEvent: function() {
            this.items.jEach(j(function(F) {
                F.content.showThis = j(function() {
                    this.jCallEvent("show-this", {
                        index: F.index
                    })
                }).jBind(this);
                F.content.jAddEvent("click", j(function(G) {
                    if (this.move_) {
                        G.stop()
                    }
                }).jBind(this))
            }).jBind(this))
        },
        setItemStep: function(H) {
            var F, G = 0;
            if (this.stopScroll) {
                return
            }
            if (this.o.continuous) {
                this.itemStep = this.fullViewedItems;
                return
            }
            for (F = 0; F < this.l; F++) {
                G += this.items[F].size[this.p_.size];
                if (G >= this.containerWidth) {
                    if (this.itemStep == "auto" || this.itemStep >= F) {
                        if (this.o.effect == "animation" && G - this.items[F].size[this.p_.size] + 5 < this.containerWidth || G == this.containerWidth) {
                            F += 1
                        }
                        this.itemStep = F;
                        if (this.o.step != "auto" && this.o.step < this.itemStep) {
                            this.itemStep = this.o.step
                        }
                    }
                    break
                }
            }!this.itemStep && (this.itemStep = 1)
        },
        cloneFigure: function(G) {
            var F = G.cloneNode();
            figure = document.createElement("figure"), figcaption = document.createElement("figcaption");
            v.$A(G.firstChild.childNodes).jEach(j(function(H) {
                if (H.tagName.toLowerCase() == "figcaption") {
                    v.$A(H.childNodes).jEach(j(function(I) {
                        j(figcaption).append(I.cloneNode(true))
                    }).jBind(this));
                    v.$A(H.attributes).jEach(j(function(I) {
                        figure.setAttribute(I, I.nodeValue)
                    }).jBind(this));
                    figure.append(figcaption)
                } else {
                    j(figure).append(H.cloneNode(true))
                }
            }).jBind(this));
            v.$A(G.firstChild.attributes).jEach(j(function(H) {
                figure.setAttribute(H, H.nodeValue)
            }).jBind(this));
            F.append(figure);
            return F
        },
        performedOnClones: function(F) {
            if (this.itemsFirstClones.length > 0) {
                j([this.itemsFirstClones, this.itemsLastClones]).jEach(j(function(G) {
                    G.jEach(j(function(I, H) {
                        F(I, H)
                    }).jBind(this))
                }).jBind(this))
            }
        },
        addCloneContent: function(G, H) {
            if (this.itemsFirstClones.length > 0) {
                var F = j(function() {
                    var I;
                    if (v.browser.ieMode && v.browser.ieMode < 9 && G.node.firstChild.tagName.toLowerCase() == "figure") {
                        I = this.cloneFigure(G.content.cloneNode(true))
                    } else {
                        I = G.content.cloneNode(true)
                    }
                    I.childNodes && v.$A(I.childNodes).jEach(j(function(J) {
                        if (j(J).jHasClass && j(J).jHasClass("MagicScroll-progress-bar")) {
                            J.kill()
                        }
                    }).jBind(this));
                    return I
                }).jBind(this);
                this.performedOnClones(j(function(J, I) {
                    if (J.index == G.index && !J.append) {
                        J.content = F();
                        this.items[G.index].clone.push(J);
                        J.append = true;
                        J.node.append(J.content)
                    }
                }).jBind(this))
            }
            H && H()
        },
        _prepareClones: function() {
            var F, G = 0,
                J = 0,
                L = 0,
                I = {
                    left: 0,
                    top: 0
                },
                K, H;
            if (this.stopScroll) {
                return
            }
            for (F = 0; F < this.l; F++) {
                G += this.items[F].size[this.p_.size];
                L++;
                if (this.containerWidth <= G) {
                    break
                }
            }
            if (this.l > 1 && (L > this.fullViewedItems || this.itemsFirstClones.length == 0)) {
                J = this.itemsFirstClones.length;
                for (F = J; F < L; F++) {
                    K = {
                        node: this.items[this.l - 1 - F].node.cloneNode(),
                        load: "notLoaded",
                        append: false
                    };
                    j(K.node).setAttribute("data-item", this.l - 1 - F);
                    K.index = this.items[this.l - 1 - F].index;
                    if (this.o.lazyLoad && this.o.progress) {
                        K.progress = new v.Modules.Progress(K.node);
                        K.progress.show()
                    }
                    this.itemsFirstClones.push(K);
                    H = {
                        node: this.items[F].node.cloneNode(),
                        load: "notLoaded",
                        append: false
                    };
                    j(H.node).setAttribute("data-item", F);
                    H.index = this.items[F].index;
                    if (this.o.lazyLoad && this.o.progress) {
                        H.progress = new v.Modules.Progress(H.node);
                        H.progress.show()
                    }
                    this.itemsLastClones.push(H);
                    j([H.node, K.node]).jEach(j(function(M) {
                        M.jAddEvent("click", j(function(N) {
                            if (this.move_) {
                                N.stop()
                            }
                        }).jBind(this))
                    }).jBind(this));
                    this.container.append(H.node);
                    this.container.append(K.node, "top");
                    j([this.items[this.l - 1 - F], this.items[F]]).jEach(j(function(M) {
                        if (M.load == "loaded") {
                            this.addCloneContent(M, j(function() {
                                var N = true;
                                if (j(["scroll", "animation"]).contains(this.name)) {
                                    if (!this.doneFlag.two && !this.o.lazyLoad) {
                                        N = M.index < this.fullViewedItems
                                    }
                                }
                                this.showItem(M, N);
                                M.clone.length > 0 && j(M.clone).jEach(function(O) {
                                    if (O.progress) {
                                        O.progress.jRemove();
                                        O.progress = null
                                    }
                                })
                            }).jBind(this))
                        }
                    }).jBind(this))
                }
                if (J) {
                    this.fullViewedItems += L - J
                } else {
                    this.fullViewedItems = L
                }
            } else {
                this.fullViewedItems = L
            }
            this.correctPosition = this.containerPosition = 0;
            G = 0;
            for (F = 0; F < this.itemsFirstClones.length; F++) {
                G += this.items[this.l - 1 - F].size[this.p_.size]
            }
            this.correctPosition += G;
            this.containerPosition -= G;
            I[this.p_.pos] = this.containerPosition;
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                this.container.jSetCssProp(this.p_.pos, I[this.p_.pos])
            } else {
                this.correctContainerPosition()
            }
        },
        push: function(F) {
            this.l = this.items.length;
            F.index = this.l;
            F.load = "notLoaded";
            F.clone = [];
            if ("gecko" === v.browser.engine) {
                F.content.jAddEvent("dragstart", function(G) {
                    G.preventDefault()
                })
            }
            if (this.o.progress && this.o.lazyLoad) {
                F.progress = new v.Modules.Progress(F.node, true);
                if (!this.o.stopDownload) {
                    F.progress.show()
                }
            }
            F.node.setAttribute("data-item", F.index);
            F.node.jAddEvent("mouseover mouseout", j(function(H) {
                var G = H.getRelated();
                while (G && G !== F.node) {
                    G = G.parentNode
                }
                if (G == F.node) {
                    return
                }
                if ("mouseover" === H.type) {
                    this.jCallEvent("on-item-hover", {
                        itemIndex: F.index
                    })
                } else {
                    this.jCallEvent("on-item-out", {
                        itemIndex: F.index
                    })
                }
            }).jBind(this));
            this.items.push(F)
        },
        _getItemIndex: function(F) {
            F %= this.l;
            F < 0 && (F = F + this.l);
            return F
        },
        jump: function(G, H) {
            var F;
            if (G == "forward" || G == "backward") {
                this.direction = G
            }
            if (this.move_ || this.wheel_) {
                return
            }
            this.move_ = true;
            if (v.jTypeOf(G) == "object") {
                this.direction = G.direction;
                G.disableEffect = false;
                G.defaultMove = false
            } else {
                if (/forward|backward|^\+|^\-/.test(G)) {
                    if (/^\+|^\-/.test(G)) {
                        F = /^\+/.test(G) ? "forward" : "backward";
                        G = {
                            goTo: Math.abs(parseInt(G)),
                            direction: F
                        };
                        G.goTo > this.l && (G.goTo = this.l);
                        G.target = this._getItemIndex(G.direction == "forward" ? (this.last + G.goTo) : (this.last - G.goTo))
                    } else {
                        G = {
                            direction: G
                        };
                        G.target = this._getItemIndex(G.direction == "forward" ? (this.last + this.itemStep) : (this.last - this.itemStep))
                    }
                    G.disableEffect = false;
                    G.defaultMove = true
                } else {
                    if (v.jTypeOf(parseInt(G)) == "number") {
                        G = {
                            target: this._getItemIndex(G),
                            disableEffect: true,
                            defaultMove: false
                        }
                    }
                }
            }
            G.callback = H;
            if (!this.o.loop) {
                if (this.loop.firstItem || this.loop.lastItem) {
                    if (this.loop.firstItem) {
                        if ("backward" === G.direction) {
                            this.move_ = false;
                            H(null, true);
                            return
                        }
                    } else {
                        if ("forward" === G.direction) {
                            this.move_ = false;
                            H(null, true);
                            return
                        }
                    }
                }
            }
            this["_" + this.name](G)
        },
        _shiftContainer: function(I, G) {
            var H = {
                    left: 0,
                    top: 0
                },
                J = false,
                F = G || this.containerPosition;
            if (I == "forward") {
                if (F + this.correctPosition - this.distance + this.allSize < 0) {
                    this.containerPosition = F + this.allSize;
                    H[this.p_.pos] = this.containerPosition;
                    J = true
                }
            } else {
                if (F + this.distance > 0) {
                    this.containerPosition = F - this.allSize;
                    H[this.p_.pos] = this.containerPosition;
                    J = true
                }
            }
            if (J) {
                if (v.browser.ieMode && v.browser.ieMode < 10) {
                    this.container.jSetCssProp(this.p_.pos, H[this.p_.pos] + "px")
                } else {
                    this.container.jSetCssProp(g, "translate3d(" + H.left + "px, " + H.top + "px, 0)");
                    this.container.jSetCssProp("transition", g + " 0ms " + this.o.timingFunction);
                    this._render();
                    if (this.o.effect == "animation") {
                        this.previous = this.globalIndex = this._getGlobalIndex();
                        if (I == "forward") {
                            this.globalIndex += this.itemStep
                        } else {
                            this.globalIndex -= this.itemStep
                        }
                    }
                }
            }
            return J
        },
        _calcDistance: function(I, H) {
            var G, F = true;
            if (!H) {
                if (this.o.step == "auto") {
                    this.itemStep = "auto";
                    this.setItemStep(I == "backward")
                }
                F = false;
                H = this.itemStep
            } else {
                this.o.stopDownload = false
            }
            for (G = H; G > 0; G--) {
                this.last = this._getItemIndex((I == "forward") ? (this.last + 1) : (this.last - 1));
                this.globalIndex = (I == "forward") ? (this.globalIndex + 1) : (this.globalIndex - 1);
                this.distance += this.items[(I == "forward") ? this._getItemIndex(this.last - 1) : this.last].size[this.p_.size]
            }
            if ("infinite" === this.o.loop) {
                if (!this.o.continuous) {
                    this.jCallEvent("on-start-effect", {
                        arr: this.getVisibleIndexes()
                    })
                }
            } else {
                if ("scroll" === this.o.effect && this.loop.lastItem && I == "backward") {
                    if (F) {
                        this.last -= (this.itemsVisible - 1)
                    } else {
                        this.last -= (H - 1)
                    }
                    if (this.last < 0) {
                        this.last = 0
                    }
                }
                this.jCallEvent("enable");
                if (this.loop.lastItem && I == "forward") {
                    this.loop.lastItem = false;
                    this.loop.firstItem = true;
                    this.containerPosition = 0;
                    this.distance = 0;
                    this.last = 0;
                    this.globalIndex = 0;
                    this.jCallEvent("first-frame");
                    this.jCallEvent("on-start-effect", {
                        arr: this.getVisibleIndexes()
                    })
                } else {
                    if (this.loop.firstItem && I == "backward") {
                        this.loop.firstItem = false;
                        this.loop.lastItem = true;
                        this.distance = 0;
                        this.last = this.l - 1;
                        if (this.o.effect == "scroll") {
                            this.globalIndex = this.l - this.itemsVisible;
                            this.containerPosition = (this.allSize - this.containerWidth) * (-1)
                        } else {
                            this.globalIndex = this.l - this.l % this.itemsVisible;
                            this.containerPosition = (Math.ceil(this.l / this.itemStep) - 1) * this.containerWidth * (-1)
                        }
                        this.jCallEvent("last-frame");
                        this.jCallEvent("on-start-effect", {
                            arr: this.getVisibleIndexes(true)
                        })
                    } else {
                        this.loop.lastItem = false;
                        this.loop.firstItem = false;
                        if (I == "forward") {
                            if (this.containerPosition - this.distance <= this.containerWidth - this.allSize || this.containerPosition - this.distance + 1 <= this.containerWidth - this.allSize) {
                                this.jCallEvent("last-frame");
                                if (this.o.effect == "scroll" || this.o.effect == "animation" && "infinite" === this.o.loop) {
                                    this.distance = this.containerPosition - (this.containerWidth - this.allSize)
                                } else {
                                    this.distance = this.containerWidth
                                }
                                this.loop.lastItem = true;
                                this.last = this.l - 1;
                                this.jCallEvent("on-start-effect", {
                                    arr: this.getVisibleIndexes(true)
                                })
                            } else {
                                this.jCallEvent("on-start-effect", {
                                    arr: this.getVisibleIndexes()
                                })
                            }
                        } else {
                            if (this.containerPosition + this.distance >= 0 || this.containerPosition + this.distance === -1) {
                                this.jCallEvent("first-frame");
                                this.distance = Math.abs(this.containerPosition);
                                this.loop.firstItem = true;
                                this.globalIndex = 0;
                                this.last = 0;
                                this.jCallEvent("on-start-effect", {
                                    arr: this.getVisibleIndexes()
                                })
                            } else {
                                this.jCallEvent("on-start-effect", {
                                    arr: this.getVisibleIndexes()
                                })
                            }
                        }
                    }
                }
            }
        },
        jumpToNumber: function(J) {
            var F, H, G = 0,
                I;
            if (!J.direction) {
                G = Math.floor(this.fullViewedItems / 2);
                if (this.fullViewedItems % 2 == 0) {
                    G -= 1
                }
                G < 0 && (G = 0)
            }
            if ("infinite" === this.o.loop) {
                J.target = this._getItemIndex(J.target - G)
            }
            if (this.last != J.target) {
                this.o.stopDownload = false;
                I = j(function(N) {
                    var L = this.last,
                        M = 0,
                        K;
                    do {
                        M++;
                        !N ? L++ : L--;
                        K = this._getItemIndex(L)
                    } while (K != J.target);
                    return M
                }).jBind(this);
                if (!J.direction) {
                    if ("infinite" === this.o.loop) {
                        J.direction = I() <= I(true) ? "forward" : "backward"
                    } else {
                        J.direction = J.target > this.last ? "forward" : "backward"
                    }
                }
                this.jCallEvent("enable");
                if ("infinite" === this.o.loop) {
                    while (this.last != J.target) {
                        this.last = this._getItemIndex(J.direction == "forward" ? ++this.last : --this.last);
                        this.globalIndex = J.direction == "forward" ? ++this.globalIndex : --this.globalIndex;
                        this.distance += this.items[this.last].size[this.p_.size]
                    }
                    this.jCallEvent("on-start-effect", {
                        arr: this.getVisibleIndexes()
                    })
                } else {
                    this.loop.lastItem = false;
                    this.loop.firstItem = false;
                    this.last = J.target;
                    H = 0;
                    for (F = 0; F < J.target - G; F++) {
                        H += this.items[F].size[this.p_.size]
                    }
                    this.globalIndex = J.target;
                    this.containerPosition = 0 - this.correctPosition - H;
                    if (this.o.effect == "scroll" && this.containerPosition <= 0 - (this.allSize - this.containerWidth) || this.containerPosition <= 0 - ((this.allSize + (this.l % this.itemStep) * this.items[0].size[this.p_.size]) - this.containerWidth)) {
                        if (this.o.effect == "scroll") {
                            this.containerPosition = 0 - (this.allSize - this.containerWidth)
                        }
                        this.loop.lastItem = true;
                        this.jCallEvent("last-frame");
                        this.last = this.l - 1;
                        this.jCallEvent("on-start-effect", {
                            arr: this.getVisibleIndexes(true)
                        })
                    } else {
                        this.jCallEvent("on-start-effect", {
                            arr: this.getVisibleIndexes()
                        })
                    }
                    if (this.containerPosition >= 0) {
                        this.containerPosition = 0;
                        this.jCallEvent("first-frame");
                        this.loop.firstItem = true;
                        this.last = 0;
                        this.jCallEvent("on-start-effect", {
                            arr: this.getVisibleIndexes()
                        })
                    }
                }
            } else {
                this.move_ = false;
                this.wheel_ = false;
                this.jCallEvent("disableHold")
            }
        },
        _scroll: function(I) {
            var F = this.containerPosition,
                G = false,
                H;
            this.previous = this.globalIndex;
            this.distance = 0;
            if ((!this.o.loop || "rewind" === this.o.loop) && this.o.effect == "animation") {
                if (this.loop.lastItem && I.direction == "forward" || this.loop.firstItem && I.direction == "backward") {
                    G = true
                }
            }
            if (I.defaultMove) {
                this._calcDistance(I.direction, I.goTo)
            } else {
                this.jumpToNumber(I);
                if (!this.o.loop) {
                    if (F === this.containerPosition) {
                        this.move_ = false;
                        this.wheel_ = false;
                        this.jCallEvent("disableHold")
                    }
                }
            }
            if (G) {
                I.direction = I.direction == "forward" ? "backward" : "forward"
            }
            if (0 !== this.wheelDiff) {
                H = this.items[this.prevIndex].size[this.p_.size] - this.wheelDiff;
                if (I.direction == "forward") {
                    this.distance -= H
                } else {
                    this.distance += H
                }
                this.wheelDiff = 0
            }
            "infinite" === this.o.loop && this._shiftContainer(I.direction);
            if (I.direction == "forward") {
                this.containerPosition -= this.distance
            } else {
                this.containerPosition += this.distance
            }
            this.moveSettings.direction = I.direction;
            this.moveSettings.disableEffect = I.disableEffect;
            if (F != this.containerPosition) {
                this.callback = I.callback;
                if (this.o.stopDownload && !this.loadAll && !this.checkLoadingVisibleItems()) {
                    this.jCallEvent("showProgress");
                    this.preloadItem();
                    this.bindEvent("groupLoad", j(function(J) {
                        this.move_ && this._move(null, J.direction, J.disableEffect)
                    }).jBind(this, this.moveSettings))
                } else {
                    if (!this.loadAll) {
                        this.preloadItem()
                    }
                    this._move(null, I.direction, I.disableEffect)
                }
            } else {
                this.jCallEvent("hold")
            }
        },
        _move: function(G, F, I) {
            var H = {
                left: 0,
                top: 0
            };
            this.move_ = true;
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                H = {};
                H[this.p_.pos] = [parseInt(this.container.jGetCss(this.p_.pos)), this.containerPosition];
                this.fx = new v.FX(this.container, {
                    transition: this.o.timingFunction,
                    duration: G || this.o.duration,
                    onComplete: this._onComplete.jBind(this),
                    onStart: j(function() {
                        this.stop_ = false
                    }).jBind(this)
                }).start(H)
            } else {
                H[this.p_.pos] = this.containerPosition;
                if (this.o.effect == "animation" && !I) {
                    this._moveEffect(F, H)
                } else {
                    this.container.jRemoveEvent("transitionend");
                    this.container.jAddEvent("transitionend", j(function(J) {
                        if (J.target == this.container) {
                            this.container.jRemoveEvent(J.type);
                            if (I) {
                                this.globalIndex = this._getGlobalIndex();
                                this._cleansingStyles()
                            }
                            this._onComplete()
                        }
                    }).jBind(this));
                    this.container.jSetCssProp(g, "translate3d(" + H.left + "px, " + H.top + "px, 0)");
                    this.container.jSetCssProp("transition", g + " " + (G || this.o.duration) + "ms " + this.o.timingFunction)
                }
            }
        },
        _moveEffect: function(L, K) {
            var J, G, I, H = this.container.childNodes,
                F = H.length,
                M = j(function(N) {
                    N %= this.globalLength;
                    N < 0 && (N = N + this.globalLength);
                    return N
                }).jBind(this);
            this.exitItems.length = 0;
            this.enterItems.length = 0;
            for (J = 0; J < this.itemStep; J++) {
                if ("infinite" === this.o.loop) {
                    G = M(this.previous + J)
                } else {
                    G = this.previous + J < F ? this.previous + J : null
                }
                G != null && this.exitItems.push(H[G]);
                if ("infinite" === this.o.loop) {
                    I = M(this.globalIndex + J)
                } else {
                    I = this.globalIndex + J < F ? this.globalIndex + J : null
                }
                I != null && this.enterItems.push(H[I])
            }
            if (L == "backward") {
                this.exitItems.reverse();
                this.enterItems.reverse()
            }
            this.container.setAttribute("data-" + L, "");
            this.exitItems.jEach(j(function(O, N) {
                O.jAddEvent(w + "AnimationEnd animationend", j(function(P, Q, R) {
                    if (P == this.exitItems[Q]) {
                        P.jRemoveEvent(w + "AnimationEnd animationend").setAttribute("data-exited", "");
                        if (Q == this.exitItems.length - 1) {
                            this.exitItems.jEach(j(function(T, S) {
                                T.removeAttribute("data-animation-nth");
                                T.removeAttribute("data-action")
                            }).jBind(this));
                            this.enterItems.jEach(j(function(T, S) {
                                if (S == this.enterItems.length - 1) {
                                    T.jAddEvent(w + "AnimationEnd animationend", j(function(U) {
                                        if (U.target == T) {
                                            T.jRemoveEvent(w + "AnimationEnd animationend");
                                            this.enterItems.jEach(j(function(V, W) {
                                                V.removeAttribute("data-animation-nth");
                                                V.removeAttribute("data-action")
                                            }).jBind(this));
                                            this.exitItems.jEach(j(function(V, W) {
                                                V.removeAttribute("data-exited")
                                            }).jBind(this));
                                            this.container.removeAttribute("data-" + L);
                                            this._render();
                                            this._onComplete()
                                        }
                                    }).jBind(this))
                                }
                                T.setAttribute("data-entering", "");
                                T.jAddEvent(w + "AnimationStart animationstart", j(function(U) {
                                    if (U.target == this) {
                                        this.jRemoveEvent(w + "AnimationStart animationstart");
                                        T.removeAttribute("data-entering")
                                    }
                                }).jBind(T));
                                T.setAttribute("data-action", "enter");
                                T.setAttribute("data-animation-nth", (S + 1))
                            }).jBind(this));
                            this.container.jSetCssProp(g, "translate3d(" + K.left + "px, " + K.top + "px, 0)")
                        }
                    }
                }).jBind(this, O, N))
            }).jBind(this));
            this.exitItems.jEach(j(function(O, N) {
                O.setAttribute("data-exiting", "");
                O.jAddEvent(w + "AnimationStart animationstart", j(function(P) {
                    if (P.target == this) {
                        O.jRemoveEvent(w + "AnimationStart animationstart");
                        this.removeAttribute("data-exiting")
                    }
                }).jBind(O));
                O.setAttribute("data-action", "exit");
                O.setAttribute("data-animation-nth", (N + 1))
            }).jBind(this))
        },
        getVisibleIndexes: function(I) {
            var J = 0,
                H = this.itemStep,
                F = [],
                G;
            if (I) {
                if (this.o.effect == "scroll") {
                    J = this.l - this.itemStep
                } else {
                    J = this.l % this.itemStep ? this.l - this.l % this.itemStep : this.l - this.itemStep
                }
                H = this.l
            }
            for (; J < H; J++) {
                if (!I) {
                    G = this.last + J
                } else {
                    G = J
                }
                F.push(this._getItemIndex(G))
            }
            return F
        },
        _onComplete: function() {
            this.move_ = false;
            this.continuousPause = false;
            this.callback && this.callback(this.getVisibleIndexes(this.loop.lastItem))
        },
        _cleansingStyles: function() {
            this.container.jSetCssProp("transition", g + " 0ms")
        },
        getMatrixPosition: function(K) {
            var J = {
                    x: 0,
                    y: 0
                },
                H = K.jGetCss(g) || "",
                I = /3d/.test(H) ? (/matrix3d\(([^\)]+)\)/) : (/matrix\(([^\)]+)\)/),
                G = /3d/.test(H) ? 12 : 4,
                F = /3d/.test(H) ? 13 : 5;
            (K.jGetCss(g) || "").replace(I, function(N, M) {
                var L = M.split(",");
                J.x += parseInt(L[G], 10);
                J.y += parseInt(L[F])
            });
            return J
        },
        _getGlobalIndex: function() {
            var I;
            var H;
            var F;
            var G = Number.MAX_VALUE;
            var J = this.container.parentNode.jGetPosition()[this.p_.pos];
            for (I = 0; I < this.globalLength; I++) {
                H = this.container.childNodes[I].jGetPosition()[this.p_.pos];
                if (G > Math.abs(J - H)) {
                    G = Math.abs(J - H);
                    F = I
                } else {
                    break
                }
            }
            return F
        },
        changeClones: function() {
            if (this.itemsFirstClones.length == 0) {
                return
            }
            var G, F, H = j(function(J, K) {
                var L, I;
                if (this.items[K].node != J && this.items[K].load == "loaded") {
                    for (I = 0; I < this.globalLength; I++) {
                        if (this.items[K].node == this.container.childNodes[I]) {
                            L = I;
                            break
                        }
                    }
                    if (L < F) {
                        this.container.insertBefore(J, this.container.childNodes[L]);
                        if (F + 1 <= this.globalLength - 1) {
                            this.container.insertBefore(this.items[K].node, this.container.childNodes[F + 1])
                        } else {
                            this.container.appendChild(this.items[K].node)
                        }
                    } else {
                        this.container.insertBefore(this.items[K].node, J);
                        if (L + 1 <= this.globalLength - 1) {
                            this.container.insertBefore(J, this.container.childNodes[L + 1])
                        } else {
                            this.container.appendChild(J)
                        }
                    }
                }
            }).jBind(this);
            F = this._getGlobalIndex();
            for (G = 0; G < this.fullViewedItems; G++) {
                H(this.container.childNodes[F], this._getItemIndex(this.last + G));
                F++
            }
        },
        correctItemPosition: function(N) {
            var L, J, K, Q = 0,
                G = 0,
                P, M = this.container.parentNode.jGetPosition()[this.p_.pos] + 1,
                I = this.container.jGetPosition()[this.p_.pos] - M,
                O = Math.abs(Math.abs(I) - Math.abs(this.containerPosition)),
                H, F = j(function(R) {
                    return parseInt(this.container.childNodes[R].getAttribute("data-item"))
                }).jBind(this);
            (O > 0 && O < 1) && (O = 0);
            if (N == "forward") {
                M += O
            } else {
                M -= O
            }
            for (L = 0; L < this.globalLength; L++) {
                K = this.container.childNodes[L].jGetPosition()[this.p_.pos];
                if (K == M) {
                    this.last = F(L);
                    return 0
                }
                P = parseInt(this.container.childNodes[L].jGetSize()[this.p_.size]);
                if (K < M && K + P > M) {
                    H = L;
                    if (N == "forward") {
                        H = L + 1 > this.globalLength - 1 ? this.globalLength - 1 : L + 1;
                        L++
                    }
                    for (J = 0; J < L; J++) {
                        G += this.items[F(J)].size[this.p_.size]
                    }
                    Q = Math.abs(Math.abs(this.containerPosition) - G);
                    this.last = F(H);
                    break
                }
            }
            return Q
        },
        _initDragOnScroll: function() {
            var af, L, ad, V, ae, K, G = (this.p_.pos == "left") ? "x" : "y",
                M = {
                    x: 0,
                    y: 0
                },
                T = this.o.effect == "scroll",
                W, Y = true,
                P = {
                    x: 0,
                    y: 0
                },
                I = false,
                X = false,
                N = null,
                R = 0,
                Z = null,
                S = false,
                H = j(function(ai) {
                    var ah, ag = 0;
                    if (ai > this.containerWidth) {
                        ai = this.containerWidth
                    }
                    for (ah = 1.5; ah <= 90; ah += 1.5) {
                        ag += (ai * Math.cos(ah / Math.PI / 2))
                    }
                    return this.containerWidth > ag ? ag : this.containerWidth
                }).jBind(this),
                J = j(function(ai) {
                    var aj, ag = 0,
                        ah, ak;
                    while (ag > this.containerPosition) {
                        ag -= this.containerWidth
                    }
                    if (Math.abs(ag - this.containerPosition) > this.containerWidth / 2) {
                        ag += this.containerWidth
                    }
                    ak = ag;
                    for (aj = 0; aj < this.globalLength; aj++) {
                        ah = parseInt(this.container.childNodes[aj].getAttribute("data-item"));
                        if (ak == 0) {
                            this.last = ah;
                            break
                        }
                        ak += this.items[ah].size[this.p_.size]
                    }
                    return ag
                }).jBind(this),
                ab = j(function(ag) {
                    X = true;
                    j(document.body).jAddClass("mcs-dragging");
                    this.o.stopDownload = false;
                    Y = true;
                    clearTimeout(this.moveTimer);
                    if (this.o.effect == "animation") {
                        this.stopEffect()
                    }
                    this.stopWhell && this.stopWhell();
                    M = {
                        x: 0,
                        y: 0
                    };
                    G = (this.p_.pos == "left") ? "x" : "y";
                    this.jCallEvent("drag-start");
                    this.container.jRemoveEvent("transitionend");
                    this.containerPosition = this.getMatrixPosition(this.container)[G];
                    M[G] = this.containerPosition;
                    this.container.jSetCssProp(g, "translate3d(" + M.x + "px, " + M.y + "px, 0)");
                    this.container.jSetCssProp("transition", "none");
                    this._render();
                    this.o.effect == "scroll" && (T = true);
                    this.move_ = true
                }).jBind(this),
                F = j(function() {
                    if (this.o.effect == "animation") {
                        this.container.jSetCssProp("transition", "none");
                        this.globalIndex = this._getGlobalIndex()
                    }
                    if (this.o.effect == "animation") {
                        this.last = parseInt(this.container.childNodes[this._getGlobalIndex()].getAttribute("data-item"))
                    }
                    if ("infinite" === this.o.loop) {
                        this.changeClones()
                    }
                    this.move_ = false;
                    this.wheel_ = false;
                    T = false;
                    Y = true;
                    this.preloadItem();
                    this.jCallEvent("drag-end", {
                        arr: this.getVisibleIndexes(this.loop.lastItem)
                    })
                }).jBind(this),
                U = j(function(ah) {
                    j(document.body).jRemoveClass("mcs-dragging");
                    if (X) {
                        X = false;
                        var ag = this.containerPosition;
                        if (!Y) {
                            ah.returnValue = false;
                            Q();
                            L = ah.timeStamp - af;
                            if (this.o.effect == "scroll") {
                                if (L > 200) {
                                    K = ae;
                                    T = false
                                } else {
                                    K = H(Math.abs(P[G] - ah[G]))
                                }
                                ae = K;
                                if ("infinite" === this.o.loop) {
                                    this.distance = Math.abs(ae);
                                    this._shiftContainer(ad)
                                }
                                if ("infinite" === this.o.loop || this.containerPosition <= 0) {
                                    if (Math.abs(this.containerPosition) < ae) {
                                        ae = Math.abs(this.containerPosition)
                                    }
                                    this.containerPosition -= ae
                                }
                                ad == "forward" ? this.containerPosition -= this.correctItemPosition(ad) : this.containerPosition += this.correctItemPosition(ad);
                                if (!this.o.loop || "rewind" === this.o.loop) {
                                    this.jCallEvent("enable");
                                    this.loop.firstItem = false;
                                    this.loop.lastItem = false;
                                    if (this.containerPosition > 0) {
                                        this.containerPosition = 0;
                                        this.last = 0;
                                        T = true;
                                        this.jCallEvent("first-frame");
                                        this.loop.firstItem = true
                                    }
                                    if (this.containerPosition < this.containerWidth - this.allSize) {
                                        this.containerPosition = this.containerWidth - this.allSize;
                                        this.last = this.l - 1;
                                        T = true;
                                        this.jCallEvent("last-frame");
                                        this.loop.lastItem = true
                                    }
                                }
                                W = T ? 600 : 300
                            } else {
                                T = true;
                                this.distance = 0;
                                this.containerPosition = J();
                                "infinite" === this.o.loop && this._shiftContainer(ad);
                                if (L < 200) {
                                    this.distance = this.containerWidth;
                                    "infinite" === this.o.loop && this._shiftContainer(ad);
                                    if (ad == "forward") {
                                        this.containerPosition -= this.containerWidth
                                    } else {
                                        this.containerPosition += this.containerWidth
                                    }
                                }
                                if (!this.o.loop || "rewind" === this.o.loop) {
                                    this.jCallEvent("enable");
                                    this.loop.firstItem = false;
                                    this.loop.lastItem = false;
                                    if (this.containerPosition >= 0) {
                                        this.containerPosition = 0;
                                        this.last = 0;
                                        this.loop.firstItem = true;
                                        this.jCallEvent("first-frame")
                                    }
                                    if (this.containerPosition <= (Math.ceil(this.l / this.itemStep) - 1) * this.containerWidth * (-1)) {
                                        this.containerPosition = (Math.ceil(this.l / this.itemStep) - 1) * this.containerWidth * (-1);
                                        this.last = this.l - 1;
                                        this.loop.lastItem = true;
                                        this.jCallEvent("last-frame")
                                    }
                                }
                                W = 500
                            }
                            M[G] = this.containerPosition;
                            this.container.jAddEvent("transitionend", j(function(ai) {
                                if (ai.target == this.container) {
                                    F()
                                }
                            }).jBind(this));
                            if (ag == this.containerPosition) {
                                this.move_ = false;
                                T = false;
                                Y = true
                            }
                            this.container.jSetCssProp("transition", g + " " + W + "ms cubic-bezier(.22,.63,.49,.8)");
                            this.container.jSetCssProp(g, "translate3d(" + M.x + "px, " + M.y + "px, 0)")
                        } else {
                            if (!v.browser.mobile) {
                                F()
                            } else {
                                this.move_ = false
                            }
                        }
                    }
                }).jBind(this),
                O = 0,
                Q = j(function() {
                    clearTimeout(Z);
                    Z = null;
                    S = false;
                    O = 0
                }).jBind(this),
                ac = j(function() {
                    var ag = O * 0.2;
                    if (Math.abs(ag) < 0.0001) {
                        Q();
                        return
                    }
                    O -= ag;
                    this.containerPosition -= ag;
                    M[G] = this.containerPosition;
                    this.container.jSetCssProp(g, "translate3d(" + M.x + "px, " + M.y + "px, 0)");
                    Z = setTimeout(ac, 16)
                }).jBind(this),
                aa = j(function(ah) {
                    if (X) {
                        var ag = ah[G] - R > 0 ? "backward" : "forward";
                        Y = false;
                        if ("infinite" === this.o.loop) {
                            this.distance = Math.abs(ae);
                            this._shiftContainer(ag)
                        }
                        if (v.browser.ieMode) {
                            O += ae;
                            if (!S) {
                                S = true;
                                ac()
                            }
                        } else {
                            this.container.jSetCssProp("transition", g + " 0ms");
                            if (this.o.effect == "animation") {}
                            this.containerPosition -= ae;
                            M[G] = this.containerPosition;
                            this.container.jSetCssProp(g, "translate3d(" + M.x + "px, " + M.y + "px, 0)")
                        }
                        this.freeTouchPreload(ag)
                    }
                }).jBind(this);
            this.onDrag = j(function(ag) {
                if (this.stopScroll || this.o.effect == "animation" && T) {
                    return
                }
                if ("dragstart" == ag.state) {
                    af = ag.timeStamp;
                    P.x = ag.x;
                    P.y = ag.y;
                    R = ag[G]
                } else {
                    ad = (ae > 0) ? "forward" : "backward";
                    ae = R - ag[G];
                    this.moveSettings.direction = ad;
                    if ("dragend" == ag.state) {
                        if (I) {
                            I = false;
                            U(ag)
                        }
                    } else {
                        if (this.o.orientation == "vertical" || Math.abs(ag.x - P.x) > Math.abs(ag.y - P.y)) {
                            ag.stopDefaults();
                            if (!I) {
                                if (this.o.effect == "animation" && this.move_) {
                                    return
                                }
                                I = true;
                                ab(ag)
                            } else {
                                aa(ag)
                            }
                        }
                    }
                }
                R = ag[G]
            }).jBind(this);
            if (!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 9) {
                this.container.parentNode.jAddEvent("mousedrag touchdrag", this.onDrag)
            }
        },
        _initOnWheel: function() {
            var J, K, G = 0,
                I = {
                    x: 0,
                    y: 0
                },
                H = (this.p_.pos == "left") ? "x" : "y",
                F = j(function(M) {
                    var L = G * (M || 0.2);
                    J = L > 0 ? "forward" : "backward";
                    G -= L;
                    if (Math.abs(L) < 0.00001) {
                        clearTimeout(this.moveTimer);
                        this.last = parseInt(this.container.childNodes[this._getGlobalIndex()].getAttribute("data-item"));
                        this.changeClones();
                        this.wheelDiff = this._getWheelDiff();
                        this.prevIndex = this.last;
                        G = 0;
                        this.distance = 0;
                        this.moveTimer = null;
                        this.wheel_ = false;
                        this.move_ = false;
                        this.jCallEvent("drag-end", {
                            arr: this.getVisibleIndexes(this.loop.lastItem)
                        });
                        return
                    }
                    this.distance = Math.abs(L);
                    "infinite" === this.o.loop && this._shiftContainer(J);
                    this.containerPosition -= L;
                    this.distance = 0;
                    this.freeTouchPreload(J);
                    if (!this.o.loop || "rewind" === this.o.loop) {
                        if (this.containerPosition > 0) {
                            this.containerPosition = 0;
                            G = 0.00001;
                            this.jCallEvent("first-frame")
                        } else {
                            if (this.containerPosition < this.containerWidth - this.allSize) {
                                this.containerPosition = this.containerWidth - this.allSize;
                                G = 0.00001;
                                this.jCallEvent("last-frame")
                            } else {
                                this.jCallEvent("enable")
                            }
                        }
                    }
                    I[H] = this.containerPosition;
                    this.container.jSetCssProp(g, "translate3d(" + I.x + "px, " + I.y + "px, 0)");
                    this.moveTimer = setTimeout(F.jBind(this, M), 30)
                }).jBind(this);
            if (v.browser.ieMode && v.browser.ieMode < 10 || this.stopScroll) {
                return
            }
            this.stopWhell = j(function() {
                if (this.wheel_) {
                    clearTimeout(this.moveTimer);
                    G = 0;
                    this.distance = 0;
                    this.moveTimer = null;
                    this.wheel_ = false;
                    this.move_ = false
                }
            }).jBind(this);
            this.container.jAddEvent("mousescroll", j(function(L) {
                var M = (Math.abs(L.deltaY) < Math.abs(L.deltaX) ? L.deltaX : L.deltaY * (!L.isMouse ? -1 : -30));
                if (this.move_) {
                    return
                }
                if ((true === this.o.scrollOnWheel && L.isMouse) || "vertical" === this.o.orientation && Math.abs(L.deltaY) > Math.abs(L.deltaX) || "horizontal" === this.o.orientation && Math.abs(L.deltaY) < Math.abs(L.deltaX)) {
                    L.stop();
                    this.wheel_ = true;
                    if (0 === G) {
                        this.container.jSetCssProp("transition", g + " 0ms");
                        I = {
                            x: 0,
                            y: 0
                        };
                        H = (this.p_.pos == "left") ? "x" : "y"
                    }
                    this.jCallEvent("drag-start");
                    G += M;
                    if (!this.moveTimer) {
                        F(0.4)
                    }
                }
            }).jBind(this))
        },
        _getWheelDiff: function() {
            var G, F, H = this.containerPosition,
                I = j(["tempArray", "items", "itemsLastClones"]);
            this.tempArray = [];
            this.itemsFirstClones.jEach(j(function(J) {
                this.tempArray.push(J)
            }).jBind(this));
            this.tempArray.reverse();
            for (G = 0; G < I.length; G++) {
                for (F = 0; F < this[I[G]].length; F++) {
                    H += this.items[this[I[G]][F].index].size[this.p_.size];
                    if (H > 0) {
                        this.last = this[I[G]][F].index;
                        this.tempArray = null;
                        return H
                    }
                }
            }
        },
        pause: function() {
            var F, G;
            if (!this.o.continuous || this.continuousPause || !this.move_ || this.o.effect == "animation") {
                return
            }
            this.continuousPause = true;
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                this.fx && (this.fx.options.onComplete = v.$F);
                this.fx && this.fx.stop();
                this.fx = null;
                this.containerPosition = Math.round(parseInt(this.container.jGetCss(this.p_.pos)))
            } else {
                this.containerPosition = this.getMatrixPosition(this.container)[(this.p_.pos == "left") ? "x" : "y"]
            }
            F = this.correctItemPosition(this.direction);
            G = this.o.duration / this.distance * F;
            if (this.direction == "forward") {
                this.containerPosition -= F
            } else {
                this.containerPosition += F
            }
            this._move(G)
        },
        stop: function() {
            this.stop_ = true;
            this.move_ = false;
            this.stopWhell && this.stopWhell();
            if (this.o.effect == "animation") {
                this.stopEffect()
            }
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                this.fx && this.fx.stop(true);
                this.fx = null
            } else {
                this._cleansingStyles()
            }
        },
        stopEffect: function() {
            var F = {
                x: 0,
                y: 0
            };
            if (!v.browser.ieMode || v.browser.ieMode && v.browser.ieMode > 10) {
                F[this.p_.pos] = this.containerPosition;
                this.container.removeAttribute("data-forward");
                this.container.removeAttribute("data-backward");
                j([this.exitItems, this.enterItems]).jEach(j(function(G, H) {
                    if (G.length > 0) {
                        G.jEach(j(function(J, I) {
                            J.jRemoveEvent(w + "AnimationStart animationstart " + w + "AnimationEnd animationend");
                            J.removeAttribute("data-animation-nth");
                            J.removeAttribute("data-action");
                            if (!H) {
                                J.removeAttribute("data-exiting");
                                J.removeAttribute("data-exited")
                            } else {
                                J.removeAttribute("data-entering")
                            }
                        }).jBind(this))
                    }
                }).jBind(this));
                this.container.jSetCssProp(g, "translate3d(" + F.left + "px, " + F.top + "px, 0)");
                this.move_ = false;
                this._render()
            }
        },
        onResize: function() {
            var G, H, F, I;
            this.stop();
            this.continuousPause = false;
            this.wrapperPosition = j(this.container.parentNode).jGetPosition();
            this.containerWidth = this._sWidth();
            this.itemsVisible = 0;
            this.allSize = 0;
            for (G = 0; G < this.l; G++) {
                this.items[G].size = this.items[G].node.jGetSize(true);
                this.allSize += this.items[G].size[this.p_.size];
                if (this.allSize <= this.containerWidth) {
                    this.itemsVisible += 1
                }
            }
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                this.last = 0
            } else {
                this.correctContainerPosition()
            }
            this.distance = 0;
            this.itemStep = this.o.step;
            if (this.allSize <= this.containerWidth) {
                this.stopScroll = true;
                this.jCallEvent("hideArrows");
                this.jCallEvent("disable");
                this.correctPosition = 0;
                this.containerPosition = 0;
                if (v.browser.ieMode && v.browser.ieMode < 10) {
                    this.container.jSetCssProp(this.p_.pos, 0)
                } else {
                    this.container.jSetCssProp(g, "translate3d(0px, 0px, 0)")
                }
                this._removeClones()
            } else {
                this.stopScroll = false;
                this.jCallEvent("showArrows");
                this.jCallEvent("enable");
                if (!this.o.loop || "rewind" === this.o.loop) {
                    if (this.loop.firstItem) {
                        this.jCallEvent("first-frame")
                    }
                    if (this.loop.lastItem) {
                        this.jCallEvent("last-frame")
                    }
                }
            }
            if ((this.allSize > this.containerWidth) && ("infinite" === this.o.loop || this.o.continuous)) {
                this._prepareClones()
            } else {
                this.fullViewedItems = H = 0;
                for (G = 0; G < this.l; G++) {
                    H += this.items[G].size[this.p_.size];
                    this.fullViewedItems++;
                    if (this.containerWidth <= H) {
                        break
                    }
                }
            }
            this._shiftContainer("forward");
            this.container.jRemoveEvent("transitionend");
            this.globalIndex = this._getGlobalIndex();
            this.globalLength = this.container.childNodes.length;
            this.setItemStep();
            this.changeClones();
            this.allNodes = v.$A(this.container.childNodes);
            this.o.lazyLoad ? this.preloadItem() : this.preloadAll()
        },
        correctContainerPosition: function() {
            var H, J, I = {
                    left: 0,
                    top: 0
                },
                G = this.items[this.last].node.jGetPosition()[this.p_.pos],
                F = this.container.parentNode.jGetPosition()[this.p_.pos];
            if (v.browser.ieMode && v.browser.ieMode < 10) {} else {
                if (!this.o.loop && this.loop.lastItem) {
                    if ("scroll" === this.o.effect) {
                        I[this.p_.pos] = this.containerWidth - this.allSize
                    } else {
                        J = this.itemsVisible - this.l % this.itemsVisible;
                        I[this.p_.pos] = this.containerWidth - (this.allSize + this.items[0].size[this.p_.size] * J)
                    }
                } else {
                    H = this.getMatrixPosition(this.container)["left" === this.p_.pos ? "x" : "y"];
                    I[this.p_.pos] = H - (G - F)
                }
                this.containerPosition = I[this.p_.pos];
                this.container.jSetCssProp(g, "translate3d(" + I.left + "px, " + I.top + "px, 0)")
            }
        },
        rightQueue: function(G) {
            var M = 0,
                L = true,
                H = this.l - 1,
                I = j(["itemsLastClones", "items", "itemsFirstClones"]),
                K = j(function(Q, O) {
                    var N, P = null;
                    for (N = 0; N < Q.length; N++) {
                        if (Q[N].index == O) {
                            P = Q[N].node;
                            break
                        }
                    }
                    return P
                }).jBind(this),
                J = j(function(N) {
                    return (M == 0) ? N - 1 : (M - 1)
                }).jBind(this),
                F = j(function(Q, O) {
                    var P, N = Q.length;
                    if (N > 0) {
                        for (P = 0; P < N; P++) {
                            if (L) {
                                L = false;
                                M = N - 1;
                                this.container.appendChild(Q[M].node)
                            } else {
                                this.container.insertBefore(K(Q, !M ? H : J(N)), K(!M ? this[I[O - 1]] : Q, M));
                                M = !M ? H : M - 1
                            }
                        }
                    }
                }).jBind(this);
            I.jEach(j(function(N, O) {
                F(this[N], O);
                M = 0
            }).jBind(this));
            if (!G) {
                this.last = 0
            }
        },
        _removeClones: function() {
            this.itemsFirstClones.jEach(function(F) {
                F.node.kill()
            });
            this.itemsFirstClones = j([]);
            this.itemsLastClones.jEach(function(F) {
                F.node.kill()
            });
            this.itemsLastClones = j([])
        },
        update: function(G) {
            var F = {
                left: 0,
                top: 0
            };
            this.stop();
            if (G) {
                this.containerPosition = this.last = 0
            }
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                this.container.jSetCss(F)
            } else {
                if (G) {
                    this.container.jSetCssProp(g, "translate3d(" + F.left + "px, " + F.top + "px, 0)")
                } else {
                    this.correctContainerPosition()
                }
            }
            this.itemStep = this.o.step;
            if ((!this.o.continuous && (!this.o.loop || "rewind" === this.o.loop)) && this.itemsFirstClones.length > 0) {
                this.correctPosition = 0;
                this._removeClones()
            }
            this.onResize();
            this.rightQueue(!G);
            if (G) {
                this.container.parentNode.jRemoveEvent("mousedrag touchdrag", this.onDrag);
                if (this.o.draggable) {
                    this.container.parentNode.jAddEvent("mousedrag touchdrag", this.onDrag)
                }
            }
            this.move_ = false
        },
        setNewOptions: function(F) {
            for (var G in F) {
                this.o[G] = F[G]
            }
            this._setProperties()
        },
        dispose: function() {
            this.stop();
            this._removeClones();
            j(window).jRemoveEvent("resize");
            j(document).jRemoveEvent("keydown");
            this.container.jRemoveEvent("touchdrag mousedrag");
            this.items.jEach(j(function(F) {
                F.node.jRemoveEvent("mouseover mouseout");
                delete F.content.showThis
            }).jBind(this))
        }
    };
    v.extend(b.prototype, v.customEvents);
    v.Scroll.Effect = b;
    var y = function(F, G) {
        v.Scroll.Effect.apply(this, arguments);
        this._options = {
            radius: "auto",
            gradientBezier: j([0.44, 0.59, 0.35, 0.89]),
            startAlpha: 255,
            timingFunction: "cubic-bezier(.8, 0, .5, 1)"
        };
        this.name = "carousel";
        this.o = this._options;
        v.extend(this.o, G);
        this.distance = 70;
        this.lastAngle = 0;
        this.nextAngle = 0;
        this.moveTimer = null;
        this.fxk = Math.pow(10, 8);
        this.circle = 2 * Math.PI;
        this.last = 0;
        this.getVisibleItems = j([]);
        this.originSize = null;
        this.angle = null;
        this.endItem = null;
        this.radius = 0;
        this.l = 0;
        this.originFontSize = null
    };
    v.inherit(y, v.Scroll.Effect);
    v.extend(y.prototype, {
        constructor: y,
        _prepareClones: v.$F,
        changeClones: v.$F,
        getVisibleIndexes: v.$F,
        _scroll: v.$F,
        pause: v.$F,
        resetZIndex: v.$F,
        performedOnClones: v.$F,
        cloneFigure: v.$F,
        preloadItem: v.$F,
        _getWheelDiff: v.$F,
        gradientBezier: v.extend({}, v.FX.prototype),
        _shiftContainer: function() {
            this.lastAngle %= this.circle;
            this.nextAngle = this.lastAngle
        },
        done: function(H) {
            var G, F;
            if (this.doneFlag.one) {
                return
            }
            this.doneFlag.one = true;
            F = this.l = this.items.length;
            this.containerWidth = this._sWidth();
            if (v.browser.ieMode && v.browser.ieMode < 10 && this.items[0].content.length && this.items[0].content.lastChild.tagName.toLowerCase() == "figcaption") {
                this.originFontSize = parseInt(this.items[0].content.lastChild.jGetCss("font-size"))
            }
            this.gradientBezier.cubicBezier = this.o.gradientBezier;
            for (G = 0; G < this.l; G++) {
                this.items[G].size = this.items[G].node.jGetSize(true, true);
                this.allSize += this.items[G].size[this.p_.size];
                this.items[G].node.jSetCssProp("position", "absolute");
                this.items[G].img = this.getImg(this.items[G])
            }
            if ("infinite" === this.o.loop) {
                this.jCallEvent("enable")
            }
            this.items.jEach(j(function(I) {
                if (I.figcaption && !I.captionA) {
                    if (I.content.tagName.toLowerCase() != "figure") {
                        I.captionA = true
                    }
                }
            }).jBind(this));
            this.onResize();
            this.preloadAll()
        },
        done2: function(F) {
            this.doneFlag.two = true;
            this.itemEvent();
            this.angle = this.circle / this.l;
            this.endItem = (this.circle - this.angle) * (-1);
            this.itemStep = 1;
            this._initDragOnScroll();
            this.o.scrollOnWheel && this._initOnWheel();
            j(window).jAddEvent("resize", this.onResize.jBind(this));
            if (this.o.keyboard) {
                j(document).jAddEvent("keydown", this.keyboardCallback)
            }
            F && F();
            this.onResize()
        },
        itemEvent: function() {
            y.$parent.itemEvent.apply(this);
            this.items.jEach(j(function(F) {
                F.node.jAddEvent("click", j(function(G) {
                    this.jCallEvent("item-click", {
                        index: F.index
                    })
                }).jBind(this))
            }).jBind(this))
        },
        showReflection: function(G) {
            var F = 1000;
            if (v.browser.ieMode && v.browser.ieMode < 10 || !G.canvas) {
                return
            }
            G.canvas.jSetOpacity(1);
            G.canvas.jSetCssProp("transition", "opacity " + F + "ms")
        },
        setCanvasPosition: function(H) {
            var F, G, I = j(function(J) {
                if (J.canvas || J.captionA) {
                    F = J.img.jGetSize(false, true);
                    G = J.img.offsetTop + F.height;
                    if (J.canvas) {
                        J.canvas.jSetCss({
                            top: G,
                            left: J.img.offsetLeft,
                            width: F.width
                        })
                    }
                    if (J.captionA && J.figcaption) {
                        J.figcaption.jSetCss({
                            top: G
                        })
                    }
                }
            }).jBind(this);
            H ? I(H) : this.items.jEach(j(function(J) {
                I(J)
            }).jBind(this))
        },
        getImg: function(H) {
            var F, G = H.content;
            if (G.tagName == "IMG") {
                F = G
            } else {
                if (G.firstChild.tagName == "IMG") {
                    F = G.firstChild
                } else {
                    if (G.firstChild.tagName == "FIGURE" && G.firstChild.firstChild.tagName == "IMG") {
                        F = G.firstChild.firstChild
                    } else {
                        F = null
                    }
                }
            }
            if (F) {
                j(F).jSetCssProp("z-index", 100)
            }
            return F
        },
        setReflection: function(S) {
            if (this.o.orientation == "vertical") {
                return
            }
            var H = v.$new("canvas", {}, {
                    opacity: 0
                }),
                T = v.$new("canvas"),
                G, F, K, Q, P, R, U = 1,
                N, O, L, I, M, J;
            if (v.browser.ieMode && v.browser.ieMode < 10) {
                return
            }
            if (H.getContext) {
                G = H.getContext("2d");
                F = T.getContext("2d");
                if (!S.img) {
                    return
                }
                P = j(S.img).jGetSize(false, true);
                R = P.height / 100 * 30;
                T.width = P.width;
                T.height = P.height;
                F.save();
                F.scale(1, -1);
                F.drawImage(S.img, 0, P.height * (-1), P.width, P.height);
                K = F.getImageData(0, 0, P.width, R);
                F.restore();
                H.width = P.width;
                H.height = R;
                G.save();
                O = K.data;
                J = O.length;
                I = J / 4 / P.width;
                L = this.o.startAlpha;
                N = J / I;
                for (M = 3; M < J; M += 4) {
                    if (M > N) {
                        N += (J / I);
                        U++;
                        L = Math.round(this.o.startAlpha - this.o.startAlpha * this.gradientBezier.cubicBezierAtTime(1 / (I / U)))
                    }
                    O[M] = L
                }
                G.putImageData(K, 0, 0);
                G.restore();
                S.canvas = H;
                if ((!S.content.childNodes || S.content.childNodes.length < 2) && S.content.tagName.toLowerCase() !== "a") {
                    S.node.appendChild(H)
                } else {
                    S.content.insertBefore(H, S.content.childNodes[1])
                }
                H.jAddClass("mcs-reflection")
            }
        },
        showCaption: function(G) {
            var H = 0,
                F = this.distance / (this.l / 2),
                I = 100 - F;
            if (G > I) {
                H = (G - I) / F
            }
            return H
        },
        renderCarousel: function(M) {
            var J = {
                    left: 0,
                    top: 0
                },
                H = {
                    left: 0,
                    top: 0
                },
                T = {
                    left: 0,
                    top: 0
                },
                N, S, R = this.l,
                O = this.distance,
                F = this.circle / R,
                Q, I, G, L, K, P;
            J[this.p_.pos] = this.radius;
            v.defined(M) || (M = 0);
            this.lastAngle = M;
            for (K = 0; K < R; K++) {
                I = G = K * F + M;
                G %= this.circle;
                I %= this.circle;
                if (G != 0 && G != Math.PI) {
                    if (Math.ceil(Math.abs(G) / Math.PI) % 2 == 0) {
                        if (Math.abs(G) % Math.PI != 0) {
                            I = Math.PI - (Math.abs(G) % Math.PI)
                        }
                    } else {
                        I = Math.abs(G)
                    }
                }
                I = Math.abs(I * 100 / Math.PI);
                if (this.items[K].figcaption) {
                    this.items[K].figcaption.jSetOpacity(this.showCaption(100 - (I * O / 100)))
                }
                I = 100 - Math.round(I * O / 100);
                !this.originSize && (this.originSize = this.items[K].size);
                N = Math.abs(G);
                if (N > Math.PI / 2 && N < Math.PI + Math.PI / 2) {
                    if (N > Math.PI) {
                        N = Math.PI / 2 - Math.abs(N - Math.PI)
                    } else {
                        N = N - Math.PI / 2
                    }
                    N = (1 - Math.sin(N)) * 0.7
                } else {
                    N = 1
                }
                if (v.browser.ieMode && v.browser.ieMode < 10) {
                    L = {
                        width: this.setItemSide("width", I),
                        height: this.setItemSide("height", I)
                    };
                    this.items[K].node.jSetCss(L);
                    this.items[K].node.jSetCss({
                        top: Math.sin(G) * J.top + parseInt(this.containerSize.height) / 2 - parseInt(L.height) / 2,
                        left: Math.sin(G) * J.left + parseInt(this.containerSize.width) / 2 - parseInt(L.width) / 2
                    });
                    if (this.items[K].content.length && this.items[K].content.lastChild.tagName.toLowerCase() == "figcaption") {
                        this.items[K].content.lastChild.style.fontSize = this.setFontSize(I / 100 * I)
                    }
                    if (this.items[K].captionA) {
                        Q = this.items[K].img.jGetSize(false, true);
                        this.items[K].figcaption.jSetCss({
                            top: this.items[K].img.offsetTop + Q.height
                        })
                    }
                } else {
                    T[this.p_.pos] = 360 / this.circle * G;
                    this.o.orientation == "vertical" && (T[this.p_.pos] *= (-1));
                    P = Math.abs(G);
                    S = Math.sqrt(1 - Math.sin(P) * Math.sin(P));
                    if (P > Math.PI / 2 && P < Math.PI + Math.PI / 2) {
                        P = this.radius * (S) + this.radius
                    } else {
                        P = this.radius * (1 - S)
                    }
                    P > 0 && (P *= (-1));
                    H[this.p_.pos] = (Math.sin(G) * J[this.p_.pos] + parseInt(this.containerSize[this.p_.size]) / 2 - this.items[K].size[this.p_.size] / 2);
                    this.items[K].node.jSetCssProp(g, "translateX(" + H.left + "px)translateY(" + H.top + "px)translateZ(" + P + "px)rotateX(" + T.top + "deg)rotateY(" + T.left + "deg)")
                }
                this.items[K].node.jSetCssProp("z-index", 0 + I);
                this.items[K].node.jSetOpacity(N)
            }
        },
        round: function(F, G) {
            var H = Math.pow(10, G || 15);
            return Math.round(F * H) / H
        },
        _calcDistance: function(I) {
            var G, H, F = 360 / this.l;
            if (I.defaultMove) {
                if (I.goTo) {
                    if (I.direction == "forward" && this.last > I.target) {
                        G = this.l - this.last;
                        G += I.target
                    } else {
                        if (I.direction == "backward" && this.last < I.target) {
                            G = this.l - I.target;
                            G += this.last
                        }
                    }!G && (G = Math.abs(this.last - I.target));
                    this.last = I.target
                } else {
                    G = this.itemStep;
                    this.last = this._getItemIndex(I.direction == "forward" ? this.last + G : this.last - G)
                }
            } else {
                H = (360 - this.last * F + I.target * F) % 360;
                if (H >= 0 && H <= 180) {
                    !I.direction && (I.direction = "forward")
                } else {
                    if (H >= 180 && H <= 360) {
                        !I.direction && (I.direction = "backward")
                    }
                }
                if (I.direction == "forward") {
                    G = Math.round(H / F)
                } else {
                    G = Math.round((360 - H) / F)
                }
                this.last = I.target
            }
            return v.extend(I, {
                angle: G * this.angle
            })
        },
        _carousel: function(G) {
            var F;
            G = this._calcDistance(G);
            F = G.angle;
            if (!this.o.loop) {
                this.jCallEvent("enable")
            }
            if (G.direction == "forward") {
                this.nextAngle -= F;
                if (!this.o.loop) {
                    if (this.nextAngle == this.endItem) {
                        this.jCallEvent("last-frame")
                    } else {
                        if (this.nextAngle < this.endItem) {
                            this.last = 0;
                            this.nextAngle = 0;
                            this.jCallEvent("first-frame")
                        }
                    }
                }
            } else {
                this.nextAngle += F;
                if (!this.o.loop) {
                    if (this.nextAngle == 0) {
                        this.jCallEvent("first-frame")
                    } else {
                        if (this.nextAngle > 0) {
                            this.last = this.l - 1;
                            this.nextAngle = this.endItem;
                            this.jCallEvent("last-frame")
                        }
                    }
                }
            }
            this.jCallEvent("on-start-effect", {
                arr: [this.last]
            });
            this.callback = G.callback;
            this._move(this.nextAngle)
        },
        setItemSide: function(F, G) {
            return this.originSize[F] / 100 * G
        },
        setFontSize: function(F) {
            return Math.round(this.originFontSize / 100 * F) + "px"
        },
        _move: function(F) {
            this.fx = new v.FX(this.container, {
                duration: this.o.duration,
                transition: this.o.timingFunction,
                onBeforeRender: (function(G) {
                    this.renderCarousel(G.angle / this.fxk)
                }).jBind(this),
                onComplete: j(function() {
                    this._onComplete()
                }).jBind(this)
            }).start({
                angle: [this.fxk * this.lastAngle, this.fxk * F]
            })
        },
        _onComplete: function() {
            this._shiftContainer();
            y.$parent._onComplete.apply(this)
        },
        _move2: function(G) {
            var F = Math.abs(this.nextAngle - this.lastAngle) * (G || 0.2);
            if (Math.abs(F) < 0.00001) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                this.move_ = false;
                this.jCallEvent("drag-end", {
                    arr: [this.last]
                });
                return
            }
            if (this.nextAngle < this.lastAngle) {
                F *= (-1)
            }
            this.renderCarousel(this.lastAngle + F);
            this.moveTimer = setTimeout(this._move2.jBind(this, G), 30)
        },
        searchIndex: function() {
            var H, I = this.nextAngle % this.circle,
                G = parseInt(Math.abs(this.nextAngle / this.circle)),
                K, J, F = j(function(L) {
                    while (G != 0) {
                        G--;
                        if (I <= 0) {
                            L -= this.circle
                        } else {
                            L += this.circle
                        }
                    }
                    return L
                }).jBind(this);
            for (H = 0; H < this.l; H++) {
                K = (H * this.circle) / this.l;
                J = ((H + 1) * this.circle) / this.l;
                if (I <= 0) {
                    K *= (-1);
                    J *= (-1)
                } else {
                    K = this.circle - K;
                    J = this.circle - J
                }
                if (K != I) {
                    if (K > I && I > J) {
                        if (Math.abs(I - K) <= Math.abs(J - I)) {
                            this.nextAngle = F(K);
                            this.last = H
                        } else {
                            this.nextAngle = F(J);
                            this.last = this._getItemIndex(H + 1)
                        }
                    }
                } else {
                    this.last = H
                }
            }
        },
        _initOnWheel: function() {
            var H, G, F = this.circle / 360 * 15;
            this.container.jAddEvent("mousescroll", j(function(I) {
                if (true === this.o.scrollOnWheel || I.isMouse || "vertical" === this.o.orientation && Math.abs(I.deltaY) > Math.abs(I.deltaX) || "horizontal" === this.o.orientation && Math.abs(I.deltaY) < Math.abs(I.deltaX)) {
                    this.jCallEvent("drag-start");
                    this.fx && this.fx.stop(true);
                    this.fx = null;
                    I.stop();
                    if (v.browser.ieMode && v.browser.ieMode < 10) {
                        I.isMouse = true
                    }
                    G = Math.abs(I.deltaY) < Math.abs(I.deltaX) ? I.deltaX : -1 * I.deltaY;
                    G = I.isMouse ? (G * F) : (G * (8 / 864));
                    !I.isMouse && (G = G > 0 ? Math.min(this.angle / 4, G) : Math.max(this.angle / 4 * (-1), G));
                    this.nextAngle -= G;
                    clearTimeout(H);
                    H = setTimeout(j(function() {
                        this.searchIndex()
                    }).jBind(this), 100);
                    if (!this.o.loop) {
                        if (this.nextAngle >= 0) {
                            this.jCallEvent("first-frame");
                            this.nextAngle = 0;
                            this.last = 0
                        } else {
                            if (this.nextAngle <= this.endItem) {
                                this.jCallEvent("last-frame");
                                this.nextAngle = this.endItem;
                                this.last = this.l - 1
                            }
                        }
                    }
                    if (!this.moveTimer) {
                        this._move2(0.08)
                    }
                }
            }).jBind(this))
        },
        _initDragOnScroll: function() {
            var K = (this.p_.pos == "left") ? "x" : "y",
                M = {
                    x: 0,
                    y: 0
                },
                L = {
                    x: 0,
                    y: 0
                },
                J, G = false,
                I = "forward",
                F = false,
                H = j(function(N) {
                    if ("dragstart" == N.state) {
                        j(document.body).jAddClass("mcs-dragging");
                        F = true;
                        M.x = L.x = N.x;
                        M.y = L.y = N.y
                    } else {
                        if (F) {
                            M.x = N.x;
                            M.y = N.y;
                            if ("dragend" == N.state) {
                                j(document.body).jRemoveClass("mcs-dragging");
                                F = false;
                                if (G) {
                                    G = false;
                                    this.searchIndex()
                                }
                            } else {
                                if (this.o.orientation == "vertical" || Math.abs(N.x - L.x) > Math.abs(N.y - L.y)) {
                                    N.stopDefaults();
                                    if (!G) {
                                        G = true;
                                        this.move_ = true;
                                        this.fx && this.fx.stop();
                                        this.jCallEvent("drag-start");
                                        clearTimeout(this.moveTimer);
                                        this.moveTimer = null
                                    }
                                    I = L[K] < M[K] ? "backward" : "forward";
                                    J = Math.abs(L[K] - M[K]) / this.radius;
                                    if (I == "forward") {
                                        this.nextAngle -= J;
                                        if (!this.o.loop) {
                                            if (this.nextAngle <= this.endItem) {
                                                this.jCallEvent("last-frame");
                                                this.nextAngle = this.endItem;
                                                this.last = this.l - 1
                                            }
                                        }
                                    } else {
                                        this.nextAngle += J;
                                        if (!this.o.loop) {
                                            if (this.nextAngle >= 0) {
                                                this.jCallEvent("first-frame");
                                                this.nextAngle = 0;
                                                this.last = 0
                                            }
                                        }
                                    }!this.moveTimer && this._move2()
                                }
                                L.x = M.x;
                                L.y = M.y
                            }
                        }
                    }
                }).jBind(this);
            this.container.jAddEvent("touchdrag mousedrag", H)
        },
        stop: function() {
            this.fx && this.fx.stop(true);
            this.fx = null;
            clearTimeout(this.moveTimer);
            this.moveTimer = null;
            this.nextAngle && this.renderCarousel(this.nextAngle)
        },
        onResize: function() {
            var G, H, F, I;
            this.stop();
            this.containerWidth = this._sWidth();
            this.containerSize = this.container.parentNode.jGetSize(false, true);
            this.allSize = 0;
            for (G = 0; G < this.l; G++) {
                this.items[G].size = this.items[G].node.jGetSize(true, true);
                this.allSize += this.items[G].size[this.p_.size]
            }
            this.angle = 1 * this.circle / this.l;
            this.endItem = (this.circle - this.angle) * (-1);
            H = this.allSize / this.circle;
            this.radius = this.containerSize[this.p_.size] / 2;
            (this.radius < H) && (this.radius = H);
            (v.browser.ieMode && v.browser.ieMode < 10) && (this.radius -= (this.items[0].size[this.p_.size] / 2));
            this.lastAngle = this.nextAngle = 0;
            this.renderCarousel();
            this.setCanvasPosition();
            F = this.last;
            this.last = 0;
            I = this._calcDistance({
                target: F
            });
            if ("forward" === I.direction) {
                this.nextAngle -= I.angle
            } else {
                this.nextAngle += I.angle
            }
            this.renderCarousel(this.nextAngle)
        },
        update: function(F) {
            this.stop();
            this.last = 0;
            if (this.o.orientation == "vertical") {
                this.removeCanvas()
            } else {
                this.items.jEach(j(function(G) {
                    if (!G.canvas) {
                        this.setReflection(G)
                    }
                }).jBind(this))
            }
            this.container.jRemoveEvent("touchdrag mousedrag mousescroll");
            this._initDragOnScroll();
            this.o.scrollOnWheel && this._initOnWheel();
            this.resetZIndex();
            this._setProperties();
            this.onResize();
            if (this.o.orientation == "horizontal") {
                this.items.jEach(j(function(G) {
                    this.showReflection(G)
                }).jBind(this))
            }
            this.move_ = false
        },
        removeCanvas: function() {
            this.items.jEach(j(function(F) {
                if (F.canvas) {
                    F.canvas.jRemove();
                    delete F.canvas
                }
            }).jBind(this))
        },
        dispose: function() {
            y.$parent.dispose.apply(this);
            this.container.jRemoveEvent("mousescroll");
            this.removeCanvas();
            this.items.jEach(j(function(F) {
                F.node.jRemoveEvent("click")
            }).jBind(this))
        }
    });
    v.extend(y.prototype, v.customEvents);
    v.Scroll.Carousel = y;
    var d = function(F, G) {
        v.Scroll.Carousel.apply(this, arguments);
        this.name = "coverFlow";
        this.center = null;
        this.distance = null;
        this.moiety = null;
        this.lastPosition = null;
        this.nextPosition = null;
        this.depth = 350;
        this.itemStep = 1;
        this.moveTimer = null;
        this.firstSide = null;
        this.lastSide = null;
        this.stepDistance = null;
        this.lastItemLoad = 0
    };
    v.inherit(d, v.Scroll.Carousel);
    v.extend(d.prototype, {
        constructor: d,
        _shiftContainer: v.$F,
        _carousel: v.$F,
        showCaption: v.$F,
        setItemsPosition: function() {
            var F, H, G;
            this.stepDistance = this.moiety;
            if (this.o.orientation == "vertical") {
                G = this.moiety + this.moiety * 0.8;
                this.stepDistance /= 2
            } else {
                G = this.moiety * 2
            }
            for (F = 0; F < this.l; F++) {
                H = (F == 1) ? G : this.stepDistance;
                this.items[F].position = !F ? (this.center - this.moiety) : (this.items[F - 1].position + H)
            }
        },
        zIndex: function(F) {
            if (this.o.orientation == "horizontal") {
                return Math.round(this.allSize - Math.abs(this.center - (F.position + this.moiety)))
            }
        },
        done: function(H) {
            var G, F;
            if (this.one) {
                return
            }
            this.one = true;
            F = this.l = this.items.length;
            this.containerWidth = this._sWidth();
            this.gradientBezier.cubicBezier = this.o.gradientBezier;
            for (G = 0; G < this.l; G++) {
                this.items[G].size = this.items[G].node.jGetSize(true, true);
                this.allSize += this.items[G].size[this.p_.size];
                this.items[G].node.jSetCssProp("position", "absolute");
                this.items[G].img = this.getImg(this.items[G]);
                this.items[G].figcaption && j(this.items[G].figcaption).jSetOpacity(0)
            }
            this.o.loop = false;
            this.items.jEach(j(function(I) {
                if (I.figcaption && !I.captionA) {
                    if (I.content.tagName.toLowerCase() != "figure") {
                        I.captionA = true
                    }
                }
            }).jBind(this));
            this.onResize();
            !this.o.lazyLoad && this.preloadAll()
        },
        done2: function(F) {
            this.doneFlag.two = true;
            this.itemEvent();
            this.itemStep = 1;
            this._initDragOnScroll();
            this.o.scrollOnWheel && this._initOnWheel();
            j(window).jAddEvent("resize", this.onResize.jBind(this));
            if (this.o.keyboard) {
                j(document).jAddEvent("keydown", this.keyboardCallback)
            }
            F && F();
            this.onResize()
        },
        zoom: function(N) {
            var L, G, M, K, H = 1,
                F, I = N.position + this.moiety,
                J = N.position + this.moiety <= this.center;
            K = J ? (this.center - I) : (I - this.center);
            K /= ((J ? (this.center - this.firstSide) : (this.lastSide - this.center)) / 100);
            G = (90 / 100 * K) * (Math.PI / 180);
            L = 60 * Math.sin(G);
            F = 1 - 1 * Math.sin(G);
            if (this.o.orientation == "horizontal") {
                !J && (L *= (-1))
            } else {
                L *= (-1);
                J && (H = 1 - 0.7 * Math.sin(G))
            }
            M = this.depth * Math.sin(G) * (-1);
            return {
                rotate: L,
                translateZ: M,
                opacity: H,
                captionOpasity: F
            }
        },
        calcItemPosition: function(J, L) {
            var H, G = false,
                K = false,
                F = J.position + this.moiety,
                M, I = {
                    rotate: 60,
                    translateZ: this.depth * (-1),
                    opacity: 1
                };
            M = F - L;
            if (F >= this.lastSide) {
                if (F - L < this.lastSide) {
                    H = F - this.lastSide;
                    K = true;
                    L -= H;
                    if (L <= this.moiety) {
                        L = (this.lastSide - this.center) / this.stepDistance * L
                    } else {
                        if (L <= this.moiety * 2) {
                            L = (this.lastSide - this.firstSide) / (this.stepDistance * 2) * L
                        } else {
                            L += (this.moiety * 2);
                            K = false
                        }
                    }
                    J.position -= H
                }
                G = true;
                J.position -= L
            } else {
                if (F <= this.firstSide) {
                    if (this.o.orientation == "vertical") {
                        L = (this.lastSide - this.center) / this.stepDistance * L
                    } else {
                        if (F - L > this.firstSide) {
                            K = true;
                            H = this.firstSide - F;
                            L += H;
                            if (L >= this.moiety * (-1)) {
                                L = (this.lastSide - this.center) / this.stepDistance * L
                            } else {
                                if (L >= this.moiety * 2 * (-1)) {
                                    L = (this.lastSide - this.firstSide) / (this.stepDistance * 2) * L
                                } else {
                                    L -= (this.moiety * 2)
                                }
                            }
                            J.position += H
                        }
                    }
                    G = true;
                    J.position -= L
                } else {
                    if (F > this.firstSide && F < this.lastSide) {
                        L = (this.lastSide - this.center) / this.stepDistance * L;
                        if (F - L >= this.lastSide) {
                            H = this.lastSide - F;
                            L += H;
                            L = this.stepDistance / ((this.lastSide - this.center) / L);
                            J.position += H
                        } else {
                            if (F - L <= this.firstSide) {
                                if (this.o.orientation == "horizontal") {
                                    H = F - this.firstSide;
                                    L -= H;
                                    L = this.stepDistance / ((this.lastSide - this.center) / L);
                                    J.position -= H
                                }
                            } else {
                                K = true
                            }
                        }
                        J.position -= L
                    }
                }
            }
            if (this.o.orientation == "horizontal") {
                J.position > this.center && (I.rotate *= (-1))
            } else {
                I.rotate = 60 * (-1);
                J.position < this.center && (I.opacity = 0.3)
            }
            K && (I = this.zoom(J));
            G && (I.captionOpasity = 0);
            if (this.o.lazyLoad) {
                if (this.containerWidth > M - this.moiety && "notLoaded" === J.load) {
                    this.lastItemLoad = J.index;
                    J.load = "load";
                    if (this.o.stopDownload) {
                        this.jCallEvent("showProgress")
                    } else {
                        J.progress && J.progress.show()
                    }
                    this.queue.push({
                        node: J.content,
                        index: J.index
                    })
                }
            }
            return I
        },
        onLazyLoad: function(F) {
            if (this.lastItemLoad === F - 1) {
                if (this.o.stopDownload || !this.doneFlag.two) {
                    this.jCallEvent("hideProgress")
                }
                if (!this.doneFlag.two) {
                    this.jCallEvent("complete")
                }
            }
        },
        renderCarousel: function(I) {
            var G, H, K, F, J = this.lastPosition - I;
            I || (I = 0);
            this.lastPosition = I;
            for (G = 0; G < this.l; G++) {
                K = {
                    left: 0,
                    top: 0
                };
                F = {
                    left: 0,
                    top: 0
                };
                H = this.calcItemPosition(this.items[G], J);
                K[this.p_.pos] = this.items[G].position;
                F[this.p_.pos] = H.rotate;
                this.items[G].node.jSetCssProp(g, "translate3d(" + K.left + "px, " + K.top + "px, " + H.translateZ + "px)rotateX(" + F.top + "deg)rotateY(" + F.left + "deg)");
                this.items[G].figcaption && this.items[G].figcaption.jSetOpacity(H.captionOpasity);
                if (this.o.orientation == "horizontal") {
                    this.items[G].node.jSetCssProp("z-index", this.zIndex(this.items[G]))
                } else {
                    this.items[G].node.jSetOpacity(H.opacity)
                }
            }
        },
        _calcDistance: function(G) {
            var F = this.itemStep;
            if (G.defaultMove) {
                G.goTo && (F = G.goTo);
                if (G.direction == "forward") {
                    this.loop.firstItem = false;
                    if (this.last + F > this.l - 1) {
                        if (this.last != this.l - 1) {
                            F = this.l - 1 - this.last;
                            this.last += F;
                            this.loop.lastItem = true
                        } else {
                            this.last = 0;
                            F = this.l - 1;
                            this.loop.firstItem = true;
                            this.loop.lastItem = false;
                            G.direction = "backward"
                        }
                    } else {
                        this.last += F;
                        if (this.last === this.l - 1) {
                            this.loop.lastItem = true
                        }
                    }
                } else {
                    this.loop.lastItem = false;
                    if (this.last - F < 0) {
                        if (this.last != 0) {
                            F = this.last;
                            this.last -= F;
                            this.loop.firstItem = true
                        } else {
                            this.last = this.l - 1;
                            F = this.l - 1;
                            this.loop.firstItem = false;
                            this.loop.lastItem = true;
                            G.direction = "forward"
                        }
                    } else {
                        this.last -= F;
                        if (this.last === 0) {
                            this.loop.firstItem = true
                        }
                    }
                }
            } else {
                !G.direction && (G.direction = G.target >= this.last ? "forward" : "backward");
                F = Math.abs(this.last - G.target);
                this.last = G.target
            }
            this.distance = this.stepDistance * F;
            return G.direction
        },
        _coverFlow: function(F) {
            F.direction = this._calcDistance(F);
            this.callback = F.callback;
            this.jCallEvent("on-start-effect", {
                arr: [this.last]
            });
            this._move(F.direction == "forward" ? this.lastPosition - this.distance : this.lastPosition + this.distance)
        },
        _move: function(F) {
            this.nextPosition = F;
            this.fx = new v.FX(this.container, {
                duration: 500,
                transition: this.o.timingFunction,
                onBeforeRender: (function(G) {
                    this.renderCarousel(G.pos)
                }).jBind(this),
                onComplete: j(function() {
                    this._onComplete()
                }).jBind(this)
            }).start({
                pos: [this.lastPosition, F]
            })
        },
        _move2: function(G) {
            var F = Math.abs(this.nextPosition - this.lastPosition) * (G || 0.2);
            if (Math.abs(F) < 0.01) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                this.move_ = false;
                this.jCallEvent("drag-end", {
                    arr: [this.last]
                });
                return
            }
            if (this.nextPosition < this.lastPosition) {
                F *= (-1)
            }
            this.renderCarousel(this.lastPosition + F);
            this.moveTimer = setTimeout(this._move2.jBind(this, G), 30)
        },
        checkPosition: function(J, K) {
            var H, G = J.position + this.moiety,
                F = J.position,
                I = j(function(L) {
                    if (G > this.firstSide && G < this.lastSide || L) {
                        K = (this.lastSide - this.center) / this.stepDistance * K;
                        if (G - K >= this.lastSide) {
                            H = this.lastSide - G;
                            K += H;
                            K = this.stepDistance / ((this.lastSide - this.center) / K);
                            F += H
                        } else {
                            if (G - K <= this.firstSide) {
                                if (this.o.orientation == "horizontal") {
                                    H = G - this.firstSide;
                                    K -= H;
                                    K = this.stepDistance / ((this.lastSide - this.center) / K);
                                    F -= H
                                }
                            }
                        }
                        F -= K
                    }
                }).jBind(this);
            if (G >= this.lastSide) {
                if (G - K < this.lastSide) {
                    H = G - this.lastSide;
                    K -= H;
                    F -= H;
                    I(true)
                } else {
                    F -= K
                }
            } else {
                if (G <= this.firstSide) {
                    if (this.o.orientation == "vertical") {
                        K = (this.lastSide - this.center) / this.stepDistance * K
                    }
                    if (G - K > this.firstSide) {
                        H = this.firstSide - G;
                        K += H;
                        F += H;
                        I(true)
                    } else {
                        F -= K
                    }
                } else {
                    I()
                }
            }
            return F
        },
        searchIndex: function() {
            var H, G, F, I = this.lastPosition - this.nextPosition;
            if (this.o.orientation == "vertical") {
                I *= 2
            }
            for (H = 0; H < this.l; H++) {
                G = !G ? this.checkPosition(this.items[H], I) : F;
                F = (H + 1 < this.l) ? this.checkPosition(this.items[H + 1], I) : null;
                if (G + this.moiety > this.firstSide || H == this.l - 1) {
                    if (F && F + this.moiety >= this.lastSide || !F) {
                        F = 100000000
                    }
                    if (this.center - (G + this.moiety) < (F + this.moiety) - this.center) {
                        this.last = H
                    } else {
                        this.last = H + 1
                    }
                    if (this.last === 0) {
                        this.loop.firstItem = true
                    } else {
                        if (this.last === this.l - 1) {
                            this.loop.lastItem = true
                        }
                    }
                    this.nextPosition = this.center - this.last * this.stepDistance;
                    break
                }
            }
        },
        _initOnWheel: function() {
            var G, F;
            this.container.jAddEvent("mousescroll", j(function(H) {
                if (true === this.o.scrollOnWheel || H.isMouse || "vertical" === this.o.orientation && Math.abs(H.deltaY) > Math.abs(H.deltaX) || "horizontal" === this.o.orientation && Math.abs(H.deltaY) < Math.abs(H.deltaX)) {
                    this.jCallEvent("drag-start");
                    this.fx && this.fx.stop();
                    this.fx = null;
                    H.stop();
                    F = Math.abs(H.deltaY) < Math.abs(H.deltaX) ? H.deltaX : -1 * H.deltaY;
                    F = H.isMouse ? (F * this.stepDistance) : (F * (8 / 13));
                    !H.isMouse && (F = F > 0 ? Math.min(this.stepDistance / 4, F) : Math.max(this.stepDistance / 4 * (-1), F));
                    this.nextPosition -= F;
                    clearTimeout(G);
                    G = setTimeout(j(function() {
                        this.searchIndex()
                    }).jBind(this), 100);
                    if (this.nextPosition >= this.center) {
                        this.nextPosition = this.center;
                        this.last = 0
                    } else {
                        if (this.nextPosition <= this.center - ((this.l - 1) * this.stepDistance)) {
                            this.nextPosition = this.center - ((this.l - 1) * this.stepDistance);
                            this.last = this.l - 1
                        }
                    }
                    if (!this.moveTimer) {
                        this._move2(0.08)
                    }
                }
            }).jBind(this))
        },
        _initDragOnScroll: function() {
            var I = (this.p_.pos == "left") ? "x" : "y",
                K = {
                    x: 0,
                    y: 0
                },
                J = {
                    x: 0,
                    y: 0
                },
                G = false,
                F = false,
                H = j(function(L) {
                    if ("dragstart" == L.state) {
                        j(document.body).jAddClass("mcs-dragging");
                        F = true;
                        K.x = J.x = L.x;
                        K.y = J.y = L.y;
                        this.loop.firstItem = false;
                        this.loop.lastItem = false
                    } else {
                        if (F) {
                            K.x = L.x;
                            K.y = L.y;
                            if ("dragend" == L.state) {
                                j(document.body).jRemoveClass("mcs-dragging");
                                F = false;
                                if (G) {
                                    this.searchIndex();
                                    G = false
                                }
                            } else {
                                if (this.o.orientation == "vertical" || Math.abs(L.x - J.x) > Math.abs(L.y - J.y)) {
                                    L.stopDefaults();
                                    if (!G) {
                                        this.fx && this.fx.stop();
                                        this.jCallEvent("drag-start");
                                        clearTimeout(this.moveTimer);
                                        this.move_ = true;
                                        this.moveTimer = null;
                                        G = true
                                    }
                                    this.nextPosition -= (J[I] - K[I]);
                                    !this.moveTimer && this._move2()
                                } else {
                                    this.move_ = false
                                }
                                J.x = K.x;
                                J.y = K.y
                            }
                        }
                    }
                }).jBind(this);
            this.container.jAddEvent("touchdrag mousedrag", H)
        },
        stop: function() {
            this.fx && this.fx.stop(true);
            this.fx = null;
            clearTimeout(this.moveTimer);
            this.moveTimer = null;
            this.nextPosition && this.renderCarousel(this.nextPosition)
        },
        onResize: function() {
            var G, F, I, H;
            this.stop();
            this.distance = 0;
            this.containerWidth = this._sWidth();
            this.allSize = 0;
            for (G = 0; G < this.l; G++) {
                this.items[G].size = this.items[G].node.jGetSize(true, true);
                this.allSize += this.items[G].size[this.p_.size]
            }
            this.moiety = this.items[0].size[this.p_.size] / 2;
            if (this.o.orientation == "horizontal") {
                this.center = this.containerWidth / 2
            } else {
                this.center = this.moiety + (this.moiety / 50 * 15)
            }
            this.lastPosition = this.nextPosition = this.center;
            if (this.o.orientation == "horizontal") {
                this.firstSide = this.center - (this.moiety * 2);
                this.lastSide = this.center + (this.moiety * 2)
            } else {
                this.firstSide = 0;
                this.lastSide = this.center + this.moiety + this.moiety * 0.8
            }
            this.setItemsPosition();
            this.renderCarousel(this.lastPosition);
            this.setCanvasPosition();
            F = this.last;
            this.last = 0;
            I = this._calcDistance({
                target: F
            });
            H = I == "forward" ? this.lastPosition - this.distance : this.lastPosition + this.distance;
            this.nextPosition = H;
            this.renderCarousel(H)
        },
        resetZIndex: function() {
            this.items.jEach(j(function(F) {
                if (this.o.orientation == "horizontal") {
                    F.node.style.opacity = ""
                } else {
                    F.node.jSetCssProp("z-index", "")
                }
            }).jBind(this))
        }
    });
    v.extend(d.prototype, v.customEvents);
    v.Scroll.CoverFlow = d;

    function s(H, K, J, I) {
        var G = {
                width: J.width,
                height: J.height
            },
            F = function(L) {
                return L !== "auto" && !(/%$/.test(L))
            };
        if (I === "horizontal") {
            if (F(K)) {
                K = parseInt(K, 10);
                if (K < G.height) {
                    G.height = K;
                    G.width = J.width / J.height * G.height
                }
            }
        } else {
            if (F(H)) {
                H = parseInt(H, 10);
                if (H < G.width) {
                    G.width = parseInt(H, 10);
                    G.height = J.height / J.width * G.width
                }
            }
        }
        return G
    }
    var B = function(I, S) {
        var M, K, G, O, R, J, N, P, L = 0,
            F, H, Q = "Cannot calculate scroll size.";
        this.options = new v.Options(m);
        this.o = this.options.get.jBind(this.options);
        this.set = this.options.set.jBind(this.options);
        this.options.fromJSON(window.MagicScrollOptions || {});
        this.options.fromJSON((window.MagicScrollExtraOptions || {})[I.getAttribute("id") || ""] || {});
        this.options.fromString(I.getAttribute("data-options") || "");
        if (v.browser.mobile) {
            this.options.fromJSON(window.MagicScrollMobileOptions || {});
            this.options.fromJSON((window.MagicScrollMobileExtraOptions || {})[I.getAttribute("id") || ""] || {});
            this.options.fromString(I.getAttribute("data-mobile-options") || "")
        }
        if ("string" == v.jTypeOf(S)) {
            this.options.fromString(S || "")
        } else {
            this.options.fromJSON(S || {})
        }
        if (!this.o("autostart")) {
            return false
        }
        this.original = j(I).jStore("scroll", this);
        v.$uuid(this);
        this.scrollReady = false;
        if (v.browser.ieMode) {
            v.$A(I.getElementsByTagName("a")).jEach(function(T) {
                T.href = T.href
            });
            v.$A(I.getElementsByTagName("img")).jEach(function(T) {
                T.src = T.src
            })
        }
        this.originalClasses = j(I).getAttribute("class") || j(I).getAttribute("className");
        this.originalNodes = [];
        this._insideOptions = {
            autoplay: this.o("autoplay"),
            pause: true,
            debug: false,
            progress: true,
            continuous: false,
            maxSize: "scroll",
            stopDownload: true,
            timingFunctionDefault: "cubic-bezier(.8, 0, .5, 1)",
            itemSettings: "auto"
        };
        this.id = I.getAttribute("id") || "MagicScroll-" + Math.floor(Math.random() * v.now());
        this.container = I.jStore("scroll", this);
        this.wrapper = v.$new("div", {
            "class": "mcs-wrapper"
        }, {
            display: "inline-block"
        });
        this.itemsContainer = v.$new("div", {
            "class": "mcs-items-container"
        });
        this.scrollReady = false;
        for (M = this.container.childNodes.length - 1; M >= 0; M--) {
            G = this.container.childNodes[M];
            if (G.nodeType === 3 || G.nodeType === 8) {
                this.container.removeChild(G)
            } else {
                this.originalNodes.push(G)
            }
        }
        if (this.originalNodes.length === 0) {
            return
        }
        J = function(U) {
            var T = function(X) {
                var W = U.childNodes[X],
                    V = W.tagName.toLowerCase();
                if ("br" === V || "hr" === V) {
                    return T(++X)
                } else {
                    return W
                }
            };
            return T(0)
        };
        P = J(this.container);
        if (P.tagName == "FIGURE") {
            P = j(P).byTag("IMG")[0] || P.firstChild
        }
        if (P.tagName == "A") {
            P = j(P).byTag("IMG")[0] || P.firstChild
        }
        this.tagImg = false;
        if (P.tagName == "IMG") {
            this.tagImg = P;
            N = P.getAttribute("data-src");
            if (N) {
                N = (N + "").jTrim();
                if ("" != N) {
                    P.setAttribute("src", N)
                }
            }
        }
        this.coreTimeout = null;
        F = j(function(T) {
            this.coreTimeout = setTimeout(j(function() {
                this.firstItemSize = j(J(this.container)).jGetSize();
                if (this.firstItemSize.height == 0) {
                    if (L < 100) {
                        L++;
                        F(T)
                    }
                } else {
                    clearTimeout(this.coreTimeout);
                    T()
                }
            }).jBind(this), 100)
        }).jBind(this);
        F(j(function() {
            this.cachedCSS = j([]);
            O = v.$A(this.container.childNodes);
            this.firstItem = O[0];
            j(O[0]).jSetCssProp("display", "none");
            this.itemCss = {
                size: E(O[0]),
                border: r(O[0]),
                padding: i(O[0]),
                margin: n(O[0])
            };
            O[0].jSetCssProp("display", "inline-block");
            this.container.jSetCssProp("display", "none");
            this.containerCssSize = E(this.container);
            this.container.jSetCssProp("display", "inline-block");
            this.sizeFirstImg = null;
            this.setupOptions();
            this.firstItemSize = s(this.originwidth, this.originheight, this.firstItemSize, this.o("orientation"));
            if (this._insideOptions.progress) {
                this.progress = new v.Modules.Progress(this.container)
            }
            this.initBullets();
            this.initEffect_();
            H = j(function() {
                var U, W = true,
                    T = {};
                this.hashBox = v.$new("div", null, {
                    position: "absolute",
                    left: "-10000px",
                    top: "-10000px"
                }).jAppendTo(document.body);
                this.show();
                for (M = 0, K = O.length; M < K; M++) {
                    U = O[M].tagName.toLowerCase();
                    if (W) {
                        if ("br" === U || "hr" === U) {
                            continue
                        }
                    } else {
                        if ("br" === U || "hr" === U) {
                            continue
                        }
                    }
                    try {
                        if (p) {
                            o.append(v.$new("div", {}, {
                                display: "none",
                                visibility: "hidden"
                            }).append(document.createTextNode(p)));
                            p = undefined
                        }
                    } catch (V) {}
                    W = false;
                    j(O[M]).jSetOpacity(0).jSetCssProp("display", "inline-block");
                    this.push(O[M], T);
                    T = {};
                    if (M == K - 1) {
                        this.done()
                    }
                }
            }).jBind(this);
            new v.QImageLoader([{
                node: O[0]
            }], {
                queue: 1,
                onerror: function(T) {
                    throw "Error: MagicScroll: Error loading image - " + T.img.src + ". " + Q
                },
                onload: (function(T, U) {
                    this.sizeFirstImg = (T.img) ? T.img.jGetSize() : T.size;
                    this.sizeFirstImg = s(this.originwidth, this.originheight, this.sizeFirstImg, this.o("orientation"));
                    if (U.node.tagName.toLowerCase() == "figure") {
                        v.$A(U.node.childNodes).jEach(j(function(W) {
                            if (W.tagName && W.tagName.toLowerCase() == "figcaption") {
                                var V = n(j(W));
                                this.sizefigcaption = W.jGetSize();
                                this.sizefigcaption.width += V.width;
                                this.sizefigcaption.height += V.height;
                                this.sizeFirstImg.height += this.sizefigcaption.height
                            }
                        }).jBind(this))
                    }
                    H()
                }).jBind(this)
            })
        }).jBind(this))
    };
    v.extend(B.prototype, {
        hovered: false,
        setupOptions: function() {
            if ("animation" == this.o("mode") && (v.browser.ieMode || !v.browser.features.animation)) {
                this.set("mode", "scroll")
            }
            if (v.browser.ieMode && v.browser.ieMode <= 9 && this.o("mode") == "cover-flow") {
                this.set("mode", "scroll")
            }
            this._insideOptions.debug = document.location.hash.indexOf("#magic-debug-mode") != -1;
            if (v.jTypeOf(this.o("items")) === "array") {
                this._insideOptions.itemSettings = this.o("items");
                j(function() {
                    var H, J, G, I = this._insideOptions.itemSettings,
                        F = I.length;
                    for (H = 0; H < F; H++) {
                        for (J = H + 1; J < F; J++) {
                            if (I[H][0] < I[J][0]) {
                                G = I[H];
                                I[H] = I[J];
                                I[J] = G
                            }
                        }
                    }
                    this._insideOptions.itemSettings = I
                }).jBind(this)();
                this.set("items", "auto")
            }
            if (this.o("speed") === 0) {
                this.set("speed", 10)
            }
            if (this.o("autoplay") < 0 || this.o("step") == 0) {
                this._insideOptions.continuous = true
            }
            if (j(["cover-flow", "animation"]).contains(this.o("mode"))) {
                this._insideOptions.continuous = false
            }
            if ("off" === this.o("loop") || "false" === this.o("loop")) {
                this.set("loop", false)
            }
            if (this.o("mode") == "carousel" || this._insideOptions.continuous) {
                this.set("loop", "infinite")
            }
            if (this.o("mode") == "cover-flow") {
                this.set("loop", false)
            }
            if ("rewind" === this.o("loop") && "animation" === this.o("mode")) {
                this.set("loop", false)
            }
            if (j(["cover-flow", "carousel"]).contains(this.o("mode")) || this._insideOptions.continuous) {
                this.set("pagination", false)
            }
            if (j(["cover-flow", "carousel"]).contains(this.o("mode")) && !this._insideOptions.continuous) {
                this.set("step", 1)
            }
            if (j(["cover-flow", "carousel"]).contains(this.o("mode")) && !j(["auto", "fit"]).contains(this.o("items"))) {
                this.set("items", "auto")
            }
            if (this.o("mode") == "animation" && this.o("items") == "auto") {
                this.set("items", "fit")
            }
            if (this.o("mode") == "animation") {
                this.set("step", "auto")
            }
            if (this._insideOptions.continuous) {
                this.set("easing", "cubic-bezier(0, 0, 1, 1)")
            } else {
                if (this.o("easing") == "cubic-bezier(0, 0, 1, 1)") {
                    this.set("easing", this._insideOptions.timingFunctionDefault)
                }
            }
            if ("carousel" === this.o("mode")) {
                this.set("lazyLoad", false)
            }
            if (j(["cover-flow", "carousel"]).contains(this.o("mode"))) {
                this._insideOptions.itemSettings = "auto"
            }
            this.originwidth = this.o("width");
            this.originheight = this.o("height");
            if (this._insideOptions.continuous) {
                this.set("autoplay", 0)
            }
            if (j(["cover-flow", "carousel"]).contains(this.o("mode")) || this._insideOptions.continuous) {
                this.set("arrows", false)
            }
            if ("false" === this.o("arrows") || "off" === this.o("arrows")) {
                this.set("arrows", false)
            }
            if (this.o("arrows")) {
                this.container.jAddClass("MagicScroll-arrows-" + this.o("arrows"))
            }
            this.container.jAddClass("MagicScroll-" + this.o("orientation"));
            this.container.setAttribute("data-mode", this.o("mode"))
        },
        initBullets: function() {
            if (!this.o("pagination")) {
                if (this.bullets) {
                    this.bullets.jRemove();
                    this.bullets = null
                }
                return
            }
            if (!this.bullets) {
                this.bullets = new v.Modules.Bullets({}, this.container, j(function() {
                    return this.hold_
                }).jBind(this));
                this.container.jAddClass("MagicScroll-bullets");
                this.bullets.bindEvent("bullets-click", j(function(F) {
                    this.jump({
                        direction: F.direction,
                        target: F.jumpIndex
                    })
                }).jBind(this))
            }
        },
        setBullets: function() {
            var G, F = j([]);
            if (!this.effect) {
                return
            }
            for (G = 0; G < this.effect.l; G++) {
                if (j(["scroll", "animation"]).contains(this.o("mode"))) {
                    if (G % this.effect.itemStep == 0) {
                        F.push(this.effect.items[G].index)
                    }
                } else {
                    F.push(this.effect.items[G].index)
                }
            }
            this.bullets.push(F)
        },
        setupArrows: function() {
            var F = i(this.container);
            if (this.arrows) {
                this.arrows.jRemove();
                this.arrows = null
            }
            this.wrapper.jSetCss({
                top: "",
                left: "",
                right: "",
                bottom: ""
            });
            if (this.o("arrows")) {
                if (!this.arrows) {
                    this.arrows = new v.Modules.ArrowsPair({
                        orientation: "mcs-" + this.o("orientation"),
                        "class": "mcs-button",
                        classHidden: "mcs-hidden",
                        classDisabled: "mcs-disabled"
                    }, this.container);
                    this.effect.bindEvent("disable", this.arrows.disable.jBind(this.arrows, undefined));
                    this.effect.bindEvent("enable", this.arrows.enable.jBind(this.arrows, undefined));
                    this.effect.bindEvent("hideArrows", this.arrows.hide.jBind(this.arrows, undefined));
                    this.effect.bindEvent("showArrows", this.arrows.show.jBind(this.arrows, undefined));
                    if (!this.o("loop")) {
                        this.effect.bindEvent("scroll", this.arrows.enable.jBind(this.arrows, undefined));
                        this.effect.bindEvent("last-frame", this.arrows.disable.jBind(this.arrows, "next"));
                        this.effect.bindEvent("first-frame", this.arrows.disable.jBind(this.arrows, "prev"))
                    }
                    this.arrows.bindEvent("forward", (function(J) {
                        this.jump("forward")
                    }).jBind(this));
                    this.arrows.bindEvent("backward", (function(J) {
                        this.jump("backward")
                    }).jBind(this))
                } else {
                    this.arrows.setOrientation(this.o("orientation"))
                }
                if (this.o("arrows") == "outside") {
                    var I = this.o("orientation") == "horizontal" ? j(["left", "right"]) : j(["top", "bottom"]),
                        G = this.o("orientation") == "horizontal" ? "width" : "height",
                        H = parseInt(this.arrows.next.jGetSize()[G]);
                    I.jEach(j(function(J) {
                        this.wrapper.jSetCssProp(J, H + (F[G] / 2))
                    }).jBind(this))
                }
            }
        },
        setContainerSize: function() {
            if (this.o("width") != "auto") {
                this.container.jSetCssProp("width", this.o("width"))
            }
            if (this.o("height") != "auto") {
                this.container.jSetCssProp("height", this.o("height"))
            }
            return
        },
        initEffect_: function() {
            var F = j(["scroll", "animation"]).contains(this.o("mode")) ? "effect" : this.o("mode");
            this.effect = new v.Scroll[("-" + F).jCamelize()](this.itemsContainer, {
                orientation: this.o("orientation"),
                duration: this.o("speed"),
                continuous: this._insideOptions.continuous,
                timingFunction: this.o("easing"),
                loop: this.o("loop"),
                step: this.o("step"),
                effect: this.o("mode"),
                lazyLoad: this.o("lazyLoad"),
                progress: this._insideOptions.progress,
                stopDownload: this._insideOptions.stopDownload,
                debug: this._insideOptions.debug,
                scrollOnWheel: this.o("scrollOnWheel"),
                draggable: this.o("draggable"),
                keyboard: this.o("keyboard")
            });
            if (this.o("items") != "auto" && this.o("step") == "auto") {
                this.set("step", this.o("items"))
            }
            this.effect.bindEvent("hold", j(function() {
                this.hold_ = false;
                this.auto()
            }).jBind(this))
        },
        jump: function(F, G) {
            if (this.o("mode") == "animation" && /^\+|^\-/.test(F)) {
                F = /^\+/.test(F) ? "forward" : "backward"
            }
            if (!this.hold_ && !this.effect.stopScroll) {
                this.hold_ = true;
                clearTimeout(this.auto_);
                this.effect.jump(F, j(function(H, I) {
                    this.hold_ = false;
                    if (I) {
                        return
                    }
                    this.jCallEvent("after-scroll");
                    if (!this._insideOptions.continuous || this.hovered || this.pause_) {
                        if (this.hashBox.childNodes.length == 0) {
                            this.hashBox.jRemove()
                        }
                        if (this.o("loop")) {
                            this.effect.changeClones()
                        }
                        this.o("onMoveEnd")({
                            id: this.id,
                            items: H
                        });
                        this.effect.continuousMove = false;
                        G && G()
                    } else {
                        this.jump("forward", G)
                    }
                }).jBind(this))
            }
        },
        parseTag: function(K) {
            var G, J, H, F, I;
            if (K.tagName.toUpperCase() == "A") {
                if ((F = j(K).byTag("IMG")[0])) {
                    if ((I = j(K).byTag("span")[0]) && "" !== I.innerHTML.jTrim()) {
                        J = j(I.cloneNode(true)).jAddClass("mcs-caption");
                        J.setAttribute("magic-user", "yes")
                    } else {
                        if (((G = F.nextSibling) && 3 == G.nodeType && "" !== G.nodeValue.jTrim()) || (I && (G = I.nextSibling) && 3 == G.nodeType && "" !== G.nodeValue.jTrim())) {
                            J = v.$new("span", {
                                "class": "mcs-caption"
                            }).append(G.cloneNode(true))
                        }
                    }
                    for (H = K.childNodes.length - 1; H >= 0; H--) {
                        if (F !== K.childNodes[H]) {
                            K.removeChild(K.childNodes[H])
                        }
                    }
                    if (J) {
                        K.append(J)
                    }
                }
            } else {
                if (K.tagName.toLowerCase() == "figure") {
                    v.$A(K.childNodes).jEach(j(function(L) {
                        if (L.tagName && L.tagName.toLowerCase() == "figcaption") {
                            G = L.getAttribute("id") || "figcaption-" + Math.floor(Math.random() * v.now());
                            L.setAttribute("id", G);
                            j(L).jAddClass("mcs-caption");
                            J = L;
                            this.cssId = v.addCSS("#" + G + ":before", {
                                "padding-top": (this.sizefigcaption.height + r(j(L)) / 2) / parseInt(this.firstItemSize.width) * 100 + "%"
                            })
                        }
                    }).jBind(this))
                }
            }
            return {
                node: K,
                figcaption: J
            }
        },
        setPercent: function(F) {
            if (this.o("items") != "auto") {
                F.node.jSetCssProp(this.o("orientation") == "horizontal" ? "width" : "height", 100 / this.o("items") + "%")
            }
        },
        checkWholeItems: function(G) {
            var H, F;
            if (this.o("items") == "fit") {
                this.set("items", Math.floor(this.wrapper.jGetSize()[this.effect.p_.size] / this.sizeFirstImg[this.effect.p_.size]))
            } else {
                if (this.o("items") == "auto") {
                    if (!this.itemCss.size[this.effect.p_.size]) {
                        H = this.sizeFirstImg[this.effect.p_.size] || this.firstItemSize[this.effect.p_.size];
                        F = this.itemsContainer.jGetSize();
                        if ("vertical" === this.o("orientation")) {
                            H = Math.min(H, F[this.effect.p_.size])
                        }
                        F = (H + n(G.content)[this.effect.p_.size] + r(G.content)[this.effect.p_.size] + i(G.content)[this.effect.p_.size] + i(G.node)[this.effect.p_.size]) / this.itemsContainer.jGetSize()[this.effect.p_.size] * 100;
                        if (F > 100) {
                            F = 100
                        }
                        G.node.jSetCssProp(this.effect.p_.size, F + "%")
                    }
                }
            }
        },
        push: function(G, F) {
            G.show();
            G = {
                content: G
            };
            if (F.top) {
                F.top.jEach(function(I) {
                    I.jRemove()
                })
            }
            if (F.bottom) {
                F.bottom.jEach(function(I) {
                    I.jRemove()
                })
            }
            G.additionalTags = F;
            var H = this.parseTag(G.content);
            G.content = H.node;
            G.figcaption = H.figcaption;
            G.node = v.$new("div", {
                "class": "mcs-item"
            });
            G.node.jAppendTo(this.itemsContainer);
            this.checkWholeItems(G);
            this.setPercent(G);
            G.content.jAppendTo(this.hashBox);
            this.effect.push(G)
        },
        show: function() {
            if (this.indoc) {
                return
            }
            this.indoc = true;
            this.container.append(this.wrapper.append(this.itemsContainer)).show().setAttribute("id", this.id);
            this.container.jSetCssProp("display", "inline-block");
            if (this.o("arrows")) {
                this.setupArrows();
                this.o("loop") && this.arrows.disable("prev");
                this.arrows.hide()
            }
            this.checkSizes_();
            this.setContainerSize();
            if (this.tagImg) {
                if ("horizontal" === this.o("orientation") && this.container.jGetSize().width < this.sizeFirstImg.width) {
                    this.checkSizes_(true);
                    this.setContainerSize()
                }
            }
            this.countTheNumberOfItems();
            j(window).jAddEvent("resize", this.onResize.jBind(this))
        },
        done: function(F) {
            this.effect.bindEvent("key_down", j(function(G) {
                this.jump(G.direction)
            }).jBind(this));
            this.effect.bindEvent("show-this", j(function(G) {
                this.jump(G.index)
            }).jBind(this));
            this.effect.bindEvent("showProgress", j(function() {
                this.progress && this.progress.show()
            }).jBind(this));
            this.effect.bindEvent("hideProgress", j(function() {
                this.progress && this.progress.hide()
            }).jBind(this));
            this.effect.bindEvent("complete", j(function() {
                this.effect.done2(j(function() {
                    this.effect.bindEvent("disableHold", j(function() {
                        this.hold_ = false
                    }).jBind(this));
                    this.effect.bindEvent("item-click", j(function(N) {
                        var M = true,
                            L, O;
                        if (this.o("mode") == "carousel") {
                            L = 360 / this.effect.l;
                            O = (360 - this.effect.last * L + N.index * L) % 360;
                            if (O > 90 && O < 270) {
                                M = false
                            }
                        }
                        M && this.jump(N.index)
                    }).jBind(this));
                    if (this.bullets) {
                        this.bullets.o.items = this.effect.items.length;
                        this.setBullets();
                        this.bullets.show()
                    }
                    this.effect.bindEvent("on-item-hover", j(function(L) {
                        this.o("onItemHover")({
                            id: this.id,
                            item: L.itemIndex
                        })
                    }).jBind(this));
                    this.effect.bindEvent("on-item-out", j(function(L) {
                        this.o("onItemOut")({
                            id: this.id,
                            item: L.itemIndex
                        })
                    }).jBind(this));
                    this.effect.bindEvent("on-start-effect", j(function(L) {
                        this.bullets && this.bullets.setActiveBullet(L.arr, !this.o("loop"));
                        this.o("onMoveStart")({
                            id: this.id,
                            items: L.arr
                        })
                    }).jBind(this));
                    this.effect.bindEvent("drag-start", j(function() {
                        this.hold_ = true;
                        this.auto()
                    }).jBind(this));
                    this.effect.bindEvent("drag-end", j(function(L) {
                        this.bullets && this.bullets.setActiveBullet(L.arr, !this.o("loop"));
                        this.hold_ = false;
                        this.o("onMoveEnd")({
                            id: this.id,
                            items: L.arr
                        });
                        if (this.hashBox.childNodes.length == 0) {
                            this.hashBox.jRemove()
                        }
                        this.auto()
                    }).jBind(this));
                    this.container.jSetCssProp("overflow", "visible");
                    this.scrollReady = true;
                    this.o("onReady").call(this, this.id);
                    j(window).jAddEvent("resize", j(function() {
                        this.hold_ = false;
                        if (this._insideOptions.continuous) {
                            this.jump.jBind(this, "forward").jDelay(200)
                        } else {
                            this.auto()
                        }
                    }).jBind(this));
                    this.setEvent();
                    var I, J = 0,
                        K = 0;

                    function I(M) {
                        var N = "",
                            L;
                        for (L = 0; L < M.length; L++) {
                            N += String.fromCharCode(14 ^ M.charCodeAt(L))
                        }
                        return N
                    }
                    var G = this.container.jFetch("swap-items-opacity", false);
                    if (!G) {
                        var H = v.$new(((Math.floor(Math.random() * 101) + 1) % 2) ? "span" : "div", null, {
                            display: "block",
                            "z-index": 2147483647,
                            padding: 3,
                            position: "absolute",
                            "line-height": "2em",
                            "font-family": "sans-serif",
                            "font-size": "11px",
                            visibility: "visible",
                            "font-weight": "`a|cob",
                            color: I("|kj"),
                            opacity: 1,
                            background: "transparent",
                            "text-align": "center"
                        });
                        H.changeContent(I("2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigm}m|abb!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,0Coigm.]m|abb(z|ojk5.z|gob.xk|}ga`2!o0"));
                        this.container.append(H, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom");
                        this.container.jStore("swap-items-opacity", true);
                        if (this.o("arrows")) {
                            if (this.o("orientation") == "vertical") {
                                J = parseInt(this.arrows.prev.jGetSize().height)
                            } else {
                                K = parseInt(this.arrows.next.jGetSize().width)
                            }
                        }
                        H.jSetCss({
                            width: "auto",
                            height: "auto",
                            top: J,
                            right: K
                        })
                    }
                    if ("vertical" === this.o("orientation") && /%$/.test(this.o("height"))) {
                        this.set("height", this.container.jGetSize().height);
                        this.setContainerSize()
                    }
                    if (this.o("autoplay") != 0) {
                        this.auto()
                    } else {
                        this.pause_ = true
                    }
                    if (this._insideOptions.continuous) {
                        this.pause_ = false;
                        this.jump.jBind(this, "forward").jDelay(200)
                    }
                    this.scrollReady = true
                }).jBind(this))
            }).jBind(this));
            this.effect.done()
        },
        setEvent: function() {
            this.bindEvent("after-scroll", j(function() {
                if (this._insideOptions.autoplay != 0) {
                    !this._insideOptions.continuous && this.auto()
                }
            }).jBind(this));
            if (!v.browser.touchScreen && (this._insideOptions.pause || this._insideOptions.continuous)) {
                this.wrapper.jAddEvent("mouseover mouseout", j(function(G) {
                    G.stop();
                    var F = G.getRelated();
                    while (F && F !== this.wrapper) {
                        F = F.parentNode
                    }
                    if (F == this.wrapper) {
                        return
                    }
                    if (this._insideOptions.pause && !this.pause_) {
                        this.pauseHover_ = "mouseover" == G.type;
                        this.hovered = "mouseover" == G.type;
                        if (this._insideOptions.continuous) {
                            if (G.type == "mouseover") {
                                this.pauseContinuous()
                            } else {
                                this.jump("forward")
                            }
                        } else {
                            this.auto()
                        }
                    }
                }).jBind(this))
            }
            if (!this._insideOptions.continuous && "animation" === this.o("mode") && this.o("scrollOnWheel")) {
                this.wrapper.jAddEvent("mousescroll", j(function(F) {
                    var G = -1 * (Math.abs(F.deltaY) < Math.abs(F.deltaX) ? F.deltaX : -1 * F.deltaY);
                    G = F.isMouse ? (G) : (G * (8 / 54));
                    if ((true === this.o("scrollOnWheel") && F.isMouse) || "vertical" === this.o("orientation") && Math.abs(F.deltaY) > Math.abs(F.deltaX) || "horizontal" === this.o("orientation") && Math.abs(F.deltaY) < Math.abs(F.deltaX)) {
                        F.stop();
                        if (Math.abs(G) < 0.6) {
                            return
                        }
                        this.jump(G > 0 ? "backward" : "forward")
                    }
                }).jBind(this))
            }
        },
        checkSizes_: function(N) {
            var M = "width",
                O = "height",
                J = this.o("orientation") == "vertical",
                F = this.container.jGetSize(),
                I = {
                    width: 0,
                    height: 0
                },
                K = i(this.container),
                R = r(this.wrapper),
                V = n(this.wrapper),
                P = i(this.wrapper),
                Q = n(this.firstItem),
                L = v.$new("div", {
                    "class": "mcs-item"
                }).jAppendTo(this.wrapper.firstChild),
                S, T, H, U, G = i(L);
            L.jRemove();
            if (this.container.jGetCss("box-sizing") == "border-box") {
                I = r(this.container)
            }
            if (J) {
                M = O;
                O = "width"
            }
            if (this.o(M) == "auto" && !parseInt(this.containerCssSize[M])) {
                if (J) {
                    if (!isNaN(this.o("items"))) {
                        this.set(M, F[M] * this.o("items"))
                    } else {
                        this.set(M, F[M])
                    }
                } else {
                    this.set(M, "100%")
                }
            }
            if (this.o(O) == "auto" && !parseInt(this.containerCssSize[O]) || N) {
                H = I[O] + K[O] + R[O] + Q[O] + G[O];
                if (J) {
                    S = Math.min(this.sizeFirstImg[O], F[O])
                } else {
                    if (this.tagImg) {
                        S = this.sizeFirstImg[O];
                        T = this.sizeFirstImg[O] / this.sizeFirstImg[M];
                        if (this.sizeFirstImg[M] > F[M]) {
                            S = F[M] * T
                        }
                    }
                }
                U = (S + n(j(this.originalNodes[0]))[O] + i(this.originalNodes[0])[O] + r(this.originalNodes[0])[O]) || this.firstItemSize[O] || F[O];
                U += H;
                U += "";
                this.set(O, U)
            }
        },
        countTheNumberOfItems: function() {
            var I, H, G, K, J = true,
                F = this.o("items");
            if (this._insideOptions.itemSettings != "auto" && j(["scroll", "animation"]).contains(this.o("mode"))) {
                K = this._insideOptions.itemSettings;
                G = K.length;
                H = this._insideOptions.maxSize == "scroll" ? this.container.jGetSize()[this.o("orientation") == "vertical" ? "height" : "width"] : j(window).jGetSize()[this.o("orientation") == "vertical" ? "height" : "width"];
                for (I = G - 1; I >= 0; I--) {
                    if (H <= K[I][0] && !isNaN(K[I][1])) {
                        this.set("items", K[I][1]);
                        J = false;
                        break
                    } else {
                        if (0 === I) {
                            if (j(["carousel", "cover-flow"]).contains(this.o("mode"))) {
                                this.set("items", 1)
                            } else {
                                if ("animation" === this.o("mode")) {
                                    this.set("items", "fit")
                                } else {
                                    this.set("items", "fit")
                                }
                            }
                        }
                    }
                }
                if (F === this.o("items")) {
                    return
                }
                v.$A(this.itemsContainer.childNodes).jEach(j(function(M, L) {
                    this.checkWholeItems({
                        node: M,
                        content: M.firstChild
                    });
                    this.setPercent({
                        node: M
                    })
                }).jBind(this));
                if (this.effect.items.length > 0) {
                    this.effect.update()
                }
            }
        },
        onResize: function() {
            this.countTheNumberOfItems()
        },
        resize: function() {
            if (this.scrollReady) {
                this.onResize();
                this.effect.onResize()
            }
        },
        pauseContinuous: function() {
            this.effect.pause()
        },
        stop: function() {
            this.container.jStore("swap-items-opacity", false);
            this.effect && this.effect.stop();
            this.hold_ = false;
            clearTimeout(this.auto_);
            this.auto_ = false
        },
        checkEffect: function(F) {
            return F == this.o("mode")
        },
        registerCallback: function(G, F) {
            if (!j(["onItemHover", "onItemOut", "onReady", "onMoveStart", "onMoveEnd"]).contains(G)) {
                return
            }
            this.set(G, F)
        },
        dispose: function() {
            var F, G, H;
            this.stop();
            clearTimeout(this.coreTimeout);
            this.wrapper.jRemoveEvent("mouseover mouseout");
            this.wrapper.jRemoveEvent("mousewheel");
            this.effect && this.effect.dispose();
            if (this.cachedCSS) {
                for (F = 0; F < this.cachedCSS.length; F++) {
                    v.removeCSS("magicscroll-css", this.cachedCSS[F])
                }
            }
            this.container.jRemoveClass("MagicScroll-bullets");
            j(this.originalNodes).jEach(j(function(I) {
                if (I.parentNode) {
                    j(I).jRemove()
                }
                H = I;
                if (H.tagName == "FIGURE") {
                    H = H.firstChild
                }
                if (H.tagName == "A") {
                    H = H.firstChild
                }
                if (H && H.tagName == "IMG") {
                    G = H.getAttribute("data-src");
                    if (G) {
                        G = (G + "").jTrim();
                        if ("" != G) {
                            H.removeAttribute("src")
                        }
                    }
                }
                if (I.childNodes.length > 0 && I.tagName.toLowerCase() == "a") {
                    v.$A(I.childNodes).jEach(j(function(J) {
                        if (J.tagName && J.tagName.toLowerCase() == "span") {
                            J = j(J);
                            if ("yes" === J.getAttribute("magic-user")) {
                                J.removeAttribute("magic-user");
                                I.append(J)
                            } else {
                                I.append(J.childNodes[0]);
                                J.jRemove()
                            }
                        }
                    }).jBind(this))
                }
                I.jSetCss({
                    visibility: "",
                    opacity: "1"
                })
            }).jBind(this));
            this.hashBox && this.hashBox.jRemove();
            v.$A(this.container.childNodes).jEach(function(I) {
                j(I).kill()
            });
            j(this.container).removeAttribute("data-mode");
            j(this.container).jClearEvents().jRemoveClass().jAddClass(this.originalClasses);
            this.container.jSetCss({
                width: "",
                height: "",
                visibility: "",
                display: "",
                overflow: ""
            });
            this.container.jDel("scroll");
            for (F = this.originalNodes.length - 1; F >= 0; F--) {
                j(this.originalNodes[F]).jSetCss({
                    opacity: ""
                }).jAppendTo(this.container)
            }
            this.o("onStop").call(this, this.id);
            return null
        },
        play: function(F) {
            if (null === F || undefined === F) {
                F = this.o("autoplay")
            } else {
                F || (F = 1000);
                F = parseInt(F);
                if (isNaN(F)) {
                    F = this.o("autoplay")
                }
            }
            if (!this.pause_) {
                return
            }
            if (!this.auto_) {
                this.pause_ = false;
                this.effect.continuousPause = false;
                this._insideOptions.autoplay = F;
                this.jump("forward")
            }
        },
        pause: function() {
            if (this.pause_) {
                return
            }
            this.pause_ = true;
            if (this._insideOptions.continuous) {
                this.pauseContinuous()
            } else {
                this.stop()
            }
            this.auto()
        },
        updateOptions: function(F) {
            var I, H = {
                    height: "",
                    width: ""
                },
                G = this.o("mode");
            this.stop();
            this.container.jRemoveClass("MagicScroll-arrows-" + this.o("arrows"));
            this.container.jRemoveClass("MagicScroll-" + this.o("orientation"));
            this.wrapper.jRemoveEvent("mouseover mouseout mousewheel");
            this.destroyEvent("after-scroll");
            this.progress = null;
            this.container.jRemoveClass("MagicScroll-bullets");
            if ("string" == v.jTypeOf(F)) {
                this.options.fromString(F || "")
            } else {
                this.options.fromJSON(F || {})
            }
            if (G != this.o("mode")) {
                return false
            }
            this._insideOptions.autoplay = this.o("autoplay");
            this.setupOptions();
            this.effect.items.jEach(j(function(J) {
                J.node.jSetCss(H)
            }).jBind(this));
            this.effect.itemsFirstClones.jEach(j(function(J) {
                j(J).node.jSetCss(H)
            }).jBind(this));
            this.effect.itemsLastClones.jEach(j(function(J) {
                j(J).node.jSetCss(H)
            }).jBind(this));
            this.setupArrows();
            for (I = 0; I < this.cachedCSS.length; I++) {
                this.cachedCSS[I] && v.removeCSS("magicscroll-css", this.cachedCSS[I])
            }
            this.effect.setNewOptions({
                orientation: this.o("orientation"),
                duration: this.o("speed"),
                continuous: this._insideOptions.continuous,
                timingFunction: this.o("easing"),
                loop: this.o("loop"),
                step: this.o("step"),
                effect: this.o("mode"),
                lazyLoad: this.o("lazyLoad"),
                progress: this._insideOptions.progress,
                stopDownload: this._insideOptions.stopDownload,
                debug: this._insideOptions.debug,
                scrollOnWheel: this.o("scrollOnWheel"),
                draggable: this.o("draggable"),
                keyboard: this.o("keyboard")
            });
            this.checkSizes_();
            this.setContainerSize();
            this.countTheNumberOfItems();
            v.$A(this.itemsContainer.childNodes).jEach(j(function(K, J) {
                this.checkWholeItems({
                    node: K,
                    content: K.firstChild
                });
                this.setPercent({
                    node: K
                })
            }).jBind(this));
            this.effect.update(true);
            this.initBullets();
            if (this.bullets) {
                this.setBullets();
                this.bullets.show()
            }
            if (this.o("autoplay") == 0) {
                this.pause()
            } else {
                this.pause_ = false
            }
            this.o("arrows") && this.arrows.show();
            this.setEvent();
            if (this._insideOptions.continuous) {
                this.jump.jBind(this, "forward").jDelay(200);
                this.pause_ = false
            } else {
                this.auto()
            }
            return true
        },
        auto: function() {
            var F = "forward";
            clearTimeout(this.auto_);
            this.auto_ = false;
            if (this.hold_ || this.pause_ || this.pauseHover_) {
                return
            }
            if (this._insideOptions.autoplay != 0) {
                this.auto_ = setTimeout(j(function() {
                    this.jump(F)
                }).jBind(this), Math.abs(this._insideOptions.autoplay))
            }
        }
    });
    v.extend(B.prototype, v.customEvents);
    v.Scroll.Full = B;
    var C = function(G) {
            var F = h(G);
            if (!F) {
                return
            }
            return {
                registerCallback: F.registerCallback.jBind(F),
                pause: F.pause.jBind(F),
                play: j(function(H) {
                    this.play(H)
                }).jBind(F),
                forward: j(function(H) {
                    H = !H ? "forward" : a(H, "+");
                    this.jump(H)
                }).jBind(F),
                backward: j(function(H) {
                    H = !H ? "backward" : a(H, "-");
                    this.jump(H)
                }).jBind(F),
                jump: j(function(H) {
                    if (!H || isNaN(Math.abs(parseInt(H)))) {
                        H = "forward"
                    }
                    this.jump(H)
                }).jBind(F),
                updateOptions: j(function(H) {
                    if (!H || v.jTypeOf(H) != "object") {
                        H = {}
                    }
                    this.updateOptions(H)
                }).jBind(F)
            }
        },
        h = function(G) {
            var F = null;
            if (v.jTypeOf(G) == "string" && j(G) || v.jTypeOf(G) == "element") {
                F = j(G).jFetch("scroll")
            } else {
                if (v.jTypeOf(G) == "function" && (G instanceof v.Scroll.Full) || G && G.indoc) {
                    F = G
                }
            }
            return F
        },
        e = function(H, I, G) {
            var F = h(H);
            if (F) {
                return F[G](I)
            } else {
                I = H;
                H = z
            }
            j(H).jEach(function(J) {
                J[G](I)
            })
        },
        a = function(G, F) {
            if (v.jTypeOf(G) === "string") {
                G = parseInt(G);
                if (isNaN(G)) {
                    G = G
                }
            }
            if (v.jTypeOf(G) === "number") {
                G = F + G
            }
            return G
        },
        x = function(G) {
            var F = v.$A((G || document).byClass("MagicScroll")).map(function(H) {
                return q.start(H)
            });
            l = true;
            return F
        },
        l = false,
        A = function(F) {
            return z = j(z).filter(function(G) {
                return G.dispose()
            })
        },
        z = [],
        q = {
            version: "v2.0.35 DEMO",
            start: function(G) {
                var F = null;
                if (arguments.length) {
                    G = j(G);
                    if (G && j(G).jHasClass("MagicScroll")) {
                        if (F = j(G).jFetch("scroll")) {
                            return F
                        } else {
                            F = new v.Scroll.Full(G, l ? {
                                autostart: true
                            } : {});
                            if (!F.o("autostart")) {
                                F = null;
                                return false
                            } else {
                                z.push(F);
                                return F
                            }
                        }
                    } else {
                        return false
                    }
                } else {
                    return x()
                }
            },
            stop: function(F) {
                if (arguments.length) {
                    F = (F instanceof v.Scroll.Full) ? F : (j(F) && j(F).jFetch("scroll") || null);
                    if (!F) {
                        return
                    }
                    z.splice(j(z).indexOf(F), 1);
                    F.dispose()
                } else {
                    A();
                    return
                }
            },
            refresh: function(F) {
                if (F) {
                    q.stop(F);
                    return q.start(F.id || F)
                } else {
                    A();
                    return x()
                }
            },
            running: function(H) {
                var G, F = false;
                if (H) {
                    G = h(H);
                    if (G) {
                        F = G.scrollReady
                    }
                }
                return F
            },
            getInstance: function(F) {
                return C(F)
            },
            updateOptions: function(F, G) {
                return e(F, G, "updateOptions")
            },
            resize: function(F) {
                if (F) {
                    e(F, null, "resize")
                } else {
                    j(z).jEach(function(G) {
                        q.resize(G)
                    })
                }
            },
            jump: function(F, G) {
                if (undefined != F && null != F) {
                    e(F, G, "jump")
                }
            },
            pause: function(F) {
                e(F, null, "pause")
            },
            play: function(F, G) {
                e(F, G, "play")
            },
            forward: function(F, G) {
                var H;
                G = !G ? "forward" : a(G, "+");
                if (!F) {
                    F = G
                } else {
                    if (!h(F)) {
                        F = a(F, "+")
                    }
                }
                e(F, G, "jump")
            },
            backward: function(F, G) {
                var H;
                G = !G ? "backward" : a(G, "-");
                if (!F) {
                    F = G
                } else {
                    if (!h(F)) {
                        F = a(F, "-")
                    }
                }
                e(F, G, "jump")
            }
        };
    j(document).jAddEvent("domready", function() {
        p = p();
        o = v.$new("div", {
            "class": "msc-tmp-hdn-holder"
        }).jAppendTo(document.body);
        v.defined(window.MagicScrollOptions) || (window.MagicScrollOptions = {});
        v.defined(window.MagicScrollMobileOptions) || (window.MagicScrollMobileOptions = {});
        v.defined(window.MagicScrollExtraOptions) || (window.MagicScrollExtraOptions = {});
        v.defined(window.MagicScrollMobileExtraOptions) || (window.MagicScrollMobileExtraOptions = {});
        var F = window.MagicScrollMobileExtraOptions.beforeInit || window.MagicScrollExtraOptions.beforeInit || window.MagicScrollMobileOptions.beforeInit || window.MagicScrollOptions.beforeInit || v.$F;
        F();
        q.start.jDelay(10)
    });
    return q
})();