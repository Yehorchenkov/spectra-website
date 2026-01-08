import { D as createSubscriber, W as MediaQuery, F as simpleBox, m as attachRef, C as Context, b as boxWith$1, o as createBitsAttrs, n as noop, w as watch, S as SvelteMap, y as getDataOpenClosed, v as createId, x as mergeProps, K as executeCallbacks } from "../../chunks/create-id.js";
import { ai as run, b as attr, f as head, c as attributes, e as escape_html, n as derived, t as props_id, o as bind_props, s as stringify, a as ensure_array_like, j as attr_class } from "../../chunks/index.js";
import { h as html } from "../../chunks/html.js";
import { g as getIconContext } from "../../chunks/context.js";
import { a as Button, B as ButtonLink } from "../../chunks/buttonLink.js";
import { twMerge } from "tailwind-merge";
import { p as page } from "../../chunks/index2.js";
import { i as isFunction$1, b as boxAutoReset } from "../../chunks/box-auto-reset.svelte.js";
import { a as getDocument, u as useId, D as DOMContext, g as getWindow, b as afterTick } from "../../chunks/use-id.js";
import { M as on } from "../../chunks/events.js";
import { R as RovingFocusGroup } from "../../chunks/Link.js";
import { P as Previous, M as Mounted } from "../../chunks/mounted.js";
import { S as SocialIcon, E as Envelope } from "../../chunks/SocialIcon.js";
const defaultWindow$1 = void 0;
function getActiveElement$1(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
let ActiveElement$1 = class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const { window: window2 = defaultWindow$1, document: document2 = window2?.document } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement$1(this.#document);
  }
};
new ActiveElement$1();
function getStorage(storageType, window2) {
  switch (storageType) {
    case "local":
      return window2.localStorage;
    case "session":
      return window2.sessionStorage;
  }
}
class PersistedState {
  #current;
  #key;
  #serializer;
  #storage;
  #subscribe;
  #version = 0;
  constructor(key, initialValue, options = {}) {
    const {
      storage: storageType = "local",
      serializer = { serialize: JSON.stringify, deserialize: JSON.parse },
      syncTabs = true,
      window: window2 = defaultWindow$1
    } = options;
    this.#current = initialValue;
    this.#key = key;
    this.#serializer = serializer;
    if (window2 === void 0) return;
    const storage = getStorage(storageType, window2);
    this.#storage = storage;
    const existingValue = storage.getItem(key);
    if (existingValue !== null) {
      this.#current = this.#deserialize(existingValue);
    } else {
      this.#serialize(initialValue);
    }
    if (syncTabs && storageType === "local") {
      this.#subscribe = createSubscriber();
    }
  }
  get current() {
    this.#subscribe?.();
    this.#version;
    const root = this.#deserialize(this.#storage?.getItem(this.#key)) ?? this.#current;
    const proxies = /* @__PURE__ */ new WeakMap();
    const proxy = (value) => {
      if (value === null || value?.constructor.name === "Date" || typeof value !== "object") {
        return value;
      }
      let p = proxies.get(value);
      if (!p) {
        p = new Proxy(value, {
          get: (target, property) => {
            this.#version;
            return proxy(Reflect.get(target, property));
          },
          set: (target, property, value2) => {
            this.#version += 1;
            Reflect.set(target, property, value2);
            this.#serialize(root);
            return true;
          }
        });
        proxies.set(value, p);
      }
      return p;
    };
    return proxy(root);
  }
  set current(newValue) {
    this.#serialize(newValue);
    this.#version += 1;
  }
  #handleStorageEvent = (event) => {
    if (event.key !== this.#key || event.newValue === null) return;
    this.#current = this.#deserialize(event.newValue);
    this.#version += 1;
  };
  #deserialize(value) {
    try {
      return this.#serializer.deserialize(value);
    } catch (error) {
      console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
      return;
    }
  }
  #serialize(value) {
    try {
      if (value != void 0) {
        this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
      }
    } catch (error) {
      console.error(`Error when writing value from persisted store "${this.#key}" to ${this.#storage}`, error);
    }
  }
}
function sanitizeClassNames(classNames) {
  return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
  getItem: (_key) => null,
  setItem: (_key, _value) => {
  }
};
const isBrowser = typeof document !== "undefined";
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
function boxWith(getter, setter) {
  const derived2 = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived2;
      },
      set current(v) {
        setter(v);
      }
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    }
  };
}
function boxFrom(value) {
  if (box.isBox(value)) return value;
  if (isFunction(value)) return box.with(value);
  return box(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce(
    (acc, [key, b]) => {
      if (!box.isBox(b)) {
        return Object.assign(acc, { [key]: b });
      }
      if (box.isWritableBox(b)) {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set(v) {
            b.current = v;
          }
        });
      } else {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          }
        });
      }
      return acc;
    },
    {}
  );
}
function toReadonlyBox(b) {
  if (!box.isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
    }
    if (!str.match(regex))
      return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
  }
  return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
}
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)"
};
styleToString(srOnlyStyles);
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement2 {
  #document;
  #subscribe;
  constructor(options = {}) {
    const { window: window2 = defaultWindow, document: document2 = window2?.document } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement2();
const modeStorageKey = box("mode-watcher-mode");
const themeStorageKey = box("mode-watcher-theme");
const modes = ["dark", "light", "system"];
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
class UserPrefersMode {
  #defaultValue = "system";
  #storage = isBrowser ? localStorage : noopStorage;
  #initialValue = this.#storage.getItem(modeStorageKey.current);
  #value = isValidMode(this.#initialValue) ? this.#initialValue : this.#defaultValue;
  #persisted = this.#makePersisted();
  #makePersisted(value = this.#value) {
    return new PersistedState(modeStorageKey.current, value, {
      serializer: {
        serialize: (v) => v,
        deserialize: (v) => {
          if (isValidMode(v)) return v;
          return this.#defaultValue;
        }
      }
    });
  }
  constructor() {
  }
  get current() {
    return this.#persisted.current;
  }
  set current(newValue) {
    this.#persisted.current = newValue;
  }
}
class SystemPrefersMode {
  #defaultValue = void 0;
  #track = true;
  #current = this.#defaultValue;
  #mediaQueryState = typeof window !== "undefined" && typeof window.matchMedia === "function" ? new MediaQuery("prefers-color-scheme: light") : { current: false };
  query() {
    if (!isBrowser) return;
    this.#current = this.#mediaQueryState.current ? "light" : "dark";
  }
  tracking(active) {
    this.#track = active;
  }
  constructor() {
    this.query = this.query.bind(this);
    this.tracking = this.tracking.bind(this);
  }
  get current() {
    return this.#current;
  }
}
const userPrefersMode = new UserPrefersMode();
const systemPrefersMode = new SystemPrefersMode();
class CustomTheme {
  #storage = isBrowser ? localStorage : noopStorage;
  #initialValue = this.#storage.getItem(themeStorageKey.current);
  #value = this.#initialValue === null || this.#initialValue === void 0 ? "" : this.#initialValue;
  #persisted = this.#makePersisted();
  #makePersisted(value = this.#value) {
    return new PersistedState(themeStorageKey.current, value, {
      serializer: {
        serialize: (v) => {
          if (typeof v !== "string") return "";
          return v;
        },
        deserialize: (v) => v
      }
    });
  }
  constructor() {
  }
  /**
   * The current theme.
   * @returns The current theme.
   */
  get current() {
    return this.#persisted.current;
  }
  /**
   * Set the current theme.
   * @param newValue The new theme to set.
   */
  set current(newValue) {
    this.#persisted.current = newValue;
  }
}
const customTheme = new CustomTheme();
let timeoutAction;
let timeoutEnable;
let hasLoaded = false;
let styleElement = null;
function getStyleElement() {
  if (styleElement)
    return styleElement;
  styleElement = document.createElement("style");
  styleElement.appendChild(document.createTextNode(`* {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		-ms-transition: none !important;
		transition: none !important;
	}`));
  return styleElement;
}
function withoutTransition(action, synchronous = false) {
  if (typeof document === "undefined")
    return;
  if (!hasLoaded) {
    hasLoaded = true;
    action();
    return;
  }
  const isTest = typeof process !== "undefined" && process.env?.NODE_ENV === "test" || typeof window !== "undefined" && window.__vitest_worker__;
  if (isTest) {
    action();
    return;
  }
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = getStyleElement();
  const disable = () => document.head.appendChild(style);
  const enable = () => {
    if (style.parentNode) {
      document.head.removeChild(style);
    }
  };
  function executeAction() {
    action();
    window.requestAnimationFrame(enable);
  }
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    if (synchronous) {
      executeAction();
    } else {
      window.requestAnimationFrame(() => {
        executeAction();
      });
    }
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 16);
  }, 16);
}
const themeColors = box(void 0);
const disableTransitions = box(true);
const synchronousModeChanges = box(false);
const darkClassNames = box([]);
const lightClassNames = box([]);
function createDerivedMode() {
  const current = (() => {
    if (!isBrowser) return void 0;
    const derivedMode2 = userPrefersMode.current === "system" ? systemPrefersMode.current : userPrefersMode.current;
    const sanitizedDarkClassNames = sanitizeClassNames(darkClassNames.current);
    const sanitizedLightClassNames = sanitizeClassNames(lightClassNames.current);
    function update() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode2 === "light") {
        if (sanitizedDarkClassNames.length) htmlEl.classList.remove(...sanitizedDarkClassNames);
        if (sanitizedLightClassNames.length) htmlEl.classList.add(...sanitizedLightClassNames);
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && themeColors.current) {
          themeColorEl.setAttribute("content", themeColors.current.light);
        }
      } else {
        if (sanitizedLightClassNames.length) htmlEl.classList.remove(...sanitizedLightClassNames);
        if (sanitizedDarkClassNames.length) htmlEl.classList.add(...sanitizedDarkClassNames);
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && themeColors.current) {
          themeColorEl.setAttribute("content", themeColors.current.dark);
        }
      }
    }
    if (disableTransitions.current) {
      withoutTransition(update, synchronousModeChanges.current);
    } else {
      update();
    }
    return derivedMode2;
  })();
  return {
    get current() {
      return current;
    }
  };
}
function createDerivedTheme() {
  const current = (() => {
    customTheme.current;
    if (!isBrowser) return void 0;
    function update() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", customTheme.current);
    }
    if (disableTransitions.current) {
      withoutTransition(update, run(() => synchronousModeChanges.current));
    } else {
      update();
    }
    return customTheme.current;
  })();
  return {
    get current() {
      return current;
    }
  };
}
const derivedMode = createDerivedMode();
createDerivedTheme();
function toggleMode() {
  userPrefersMode.current = derivedMode.current === "dark" ? "light" : "dark";
}
function defineConfig(config) {
  return config;
}
function setInitialMode({ defaultMode = "system", themeColors: themeColors2, darkClassNames: darkClassNames2 = ["dark"], lightClassNames: lightClassNames2 = [], defaultTheme = "", modeStorageKey: modeStorageKey2 = "mode-watcher-mode", themeStorageKey: themeStorageKey2 = "mode-watcher-theme" }) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem(modeStorageKey2) ?? defaultMode;
  const theme = localStorage.getItem(themeStorageKey2) ?? defaultTheme;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (light) {
    if (darkClassNames2.length)
      rootEl.classList.remove(...darkClassNames2.filter(Boolean));
    if (lightClassNames2.length)
      rootEl.classList.add(...lightClassNames2.filter(Boolean));
  } else {
    if (lightClassNames2.length)
      rootEl.classList.remove(...lightClassNames2.filter(Boolean));
    if (darkClassNames2.length)
      rootEl.classList.add(...darkClassNames2.filter(Boolean));
  }
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  if (theme) {
    rootEl.setAttribute("data-theme", theme);
    localStorage.setItem(themeStorageKey2, theme);
  }
  localStorage.setItem(modeStorageKey2, mode);
}
function Mode_watcher_lite($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { themeColors: themeColors2 } = $$props;
    if (themeColors2) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<meta name="theme-color"${attr("content", themeColors2.dark)}/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Mode_watcher_full($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { trueNonce = "", initConfig, themeColors: themeColors2 } = $$props;
    head("cbcsue", $$renderer2, ($$renderer3) => {
      if (themeColors2) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="theme-color"${attr("content", themeColors2.dark)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`);
    });
  });
}
function Mode_watcher($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      defaultMode = "system",
      themeColors: themeColorsProp,
      disableTransitions: disableTransitionsProp = true,
      darkClassNames: darkClassNamesProp = ["dark"],
      lightClassNames: lightClassNamesProp = [],
      defaultTheme = "",
      nonce = "",
      themeStorageKey: themeStorageKeyProp = "mode-watcher-theme",
      modeStorageKey: modeStorageKeyProp = "mode-watcher-mode",
      disableHeadScriptInjection = false,
      synchronousModeChanges: synchronousModeChangesProp = false
    } = $$props;
    modeStorageKey.current = modeStorageKeyProp;
    themeStorageKey.current = themeStorageKeyProp;
    darkClassNames.current = darkClassNamesProp;
    lightClassNames.current = lightClassNamesProp;
    disableTransitions.current = disableTransitionsProp;
    themeColors.current = themeColorsProp;
    synchronousModeChanges.current = synchronousModeChangesProp;
    const initConfig = defineConfig({
      defaultMode,
      themeColors: themeColorsProp,
      darkClassNames: darkClassNamesProp,
      lightClassNames: lightClassNamesProp,
      defaultTheme,
      modeStorageKey: modeStorageKeyProp,
      themeStorageKey: themeStorageKeyProp
    });
    const trueNonce = typeof window === "undefined" ? nonce : "";
    if (disableHeadScriptInjection) {
      $$renderer2.push("<!--[-->");
      Mode_watcher_lite($$renderer2, { themeColors: themeColors.current });
    } else {
      $$renderer2.push("<!--[!-->");
      Mode_watcher_full($$renderer2, { trueNonce, initConfig, themeColors: themeColors.current });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Sun($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getIconContext();
    let { children, $$slots, $$events, ...props } = $$props;
    let weight = props.weight ?? ctx.weight ?? "regular";
    let color = props.color ?? ctx.color ?? "currentColor";
    let size = props.size ?? ctx.size ?? "1em";
    let mirrored = props.mirrored ?? ctx.mirrored ?? false;
    function svgAttr(obj) {
      let { weight: weight2, color: color2, size: size2, mirrored: mirrored2, ...attrs } = obj;
      return attrs;
    }
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "img",
        width: size,
        height: size,
        fill: color,
        transform: mirrored ? "scale(-1, 1)" : void 0,
        viewBox: "0 0 256 256",
        ...svgAttr(ctx),
        ...svgAttr(props)
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><rect width="256" height="256" fill="none"></rect>`);
    if (weight === "bold") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path d="M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M184,128a56,56,0,1,1-56-56A56,56,0,0,1,184,128Z" opacity="0.2"></path><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M122,40V16a6,6,0,0,1,12,0V40a6,6,0,0,1-12,0Zm68,88a62,62,0,1,1-62-62A62.07,62.07,0,0,1,190,128Zm-12,0a50,50,0,1,0-50,50A50.06,50.06,0,0,0,178,128ZM59.76,68.24a6,6,0,1,0,8.48-8.48l-16-16a6,6,0,0,0-8.48,8.48Zm0,119.52-16,16a6,6,0,1,0,8.48,8.48l16-16a6,6,0,1,0-8.48-8.48ZM192,70a6,6,0,0,0,4.24-1.76l16-16a6,6,0,0,0-8.48-8.48l-16,16A6,6,0,0,0,192,70Zm4.24,117.76a6,6,0,0,0-8.48,8.48l16,16a6,6,0,0,0,8.48-8.48ZM46,128a6,6,0,0,0-6-6H16a6,6,0,0,0,0,12H40A6,6,0,0,0,46,128Zm82,82a6,6,0,0,0-6,6v24a6,6,0,0,0,12,0V216A6,6,0,0,0,128,210Zm112-88H216a6,6,0,0,0,0,12h24a6,6,0,0,0,0-12Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M124,40V16a4,4,0,0,1,8,0V40a4,4,0,0,1-8,0Zm64,88a60,60,0,1,1-60-60A60.07,60.07,0,0,1,188,128Zm-8,0a52,52,0,1,0-52,52A52.06,52.06,0,0,0,180,128ZM61.17,66.83a4,4,0,0,0,5.66-5.66l-16-16a4,4,0,0,0-5.66,5.66Zm0,122.34-16,16a4,4,0,0,0,5.66,5.66l16-16a4,4,0,0,0-5.66-5.66ZM192,68a4,4,0,0,0,2.83-1.17l16-16a4,4,0,1,0-5.66-5.66l-16,16A4,4,0,0,0,192,68Zm2.83,121.17a4,4,0,0,0-5.66,5.66l16,16a4,4,0,0,0,5.66-5.66ZM40,124H16a4,4,0,0,0,0,8H40a4,4,0,0,0,0-8Zm88,88a4,4,0,0,0-4,4v24a4,4,0,0,0,8,0V216A4,4,0,0,0,128,212Zm112-88H216a4,4,0,0,0,0,8h24a4,4,0,0,0,0-8Z"></path>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`${escape_html((console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'), ""))}`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg>`);
  });
}
function Moon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getIconContext();
    let { children, $$slots, $$events, ...props } = $$props;
    let weight = props.weight ?? ctx.weight ?? "regular";
    let color = props.color ?? ctx.color ?? "currentColor";
    let size = props.size ?? ctx.size ?? "1em";
    let mirrored = props.mirrored ?? ctx.mirrored ?? false;
    function svgAttr(obj) {
      let { weight: weight2, color: color2, size: size2, mirrored: mirrored2, ...attrs } = obj;
      return attrs;
    }
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "img",
        width: size,
        height: size,
        fill: color,
        transform: mirrored ? "scale(-1, 1)" : void 0,
        viewBox: "0 0 256 256",
        ...svgAttr(ctx),
        ...svgAttr(props)
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><rect width="256" height="256" fill="none"></rect>`);
    if (weight === "bold") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path d="M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M227.89,147.89A96,96,0,1,1,108.11,28.11,96.09,96.09,0,0,0,227.89,147.89Z" opacity="0.2"></path><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M232.13,143.64a6,6,0,0,0-6-1.49A90.07,90.07,0,0,1,113.86,29.85a6,6,0,0,0-7.49-7.48A102.88,102.88,0,0,0,54.48,58.68,102,102,0,0,0,197.32,201.52a102.88,102.88,0,0,0,36.31-51.89A6,6,0,0,0,232.13,143.64Zm-42,48.29a90,90,0,0,1-126-126A90.9,90.9,0,0,1,99.65,37.66,102.06,102.06,0,0,0,218.34,156.35,90.9,90.9,0,0,1,190.1,191.93Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M230.72,145.06a4,4,0,0,0-4-1A92.08,92.08,0,0,1,111.94,29.27a4,4,0,0,0-5-5A100.78,100.78,0,0,0,56.08,59.88a100,100,0,0,0,140,140,100.78,100.78,0,0,0,35.59-50.87A4,4,0,0,0,230.72,145.06ZM191.3,193.53A92,92,0,0,1,62.47,64.7a93,93,0,0,1,39.88-30.35,100.09,100.09,0,0,0,119.3,119.3A93,93,0,0,1,191.3,193.53Z"></path>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`${escape_html((console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'), ""))}`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg>`);
  });
}
function extract(value, defaultValue) {
  if (isFunction$1(value)) {
    const getter = value;
    const gotten = getter();
    if (gotten === void 0) return defaultValue;
    return gotten;
  }
  if (value === void 0) return defaultValue;
  return value;
}
function useDebounce(callback, wait) {
  let context = null;
  const wait$ = extract(wait, 250);
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = { timeout: null, runner: null, promise, resolve, reject };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, wait$);
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
class CustomEventDispatcher {
  eventName;
  options;
  constructor(eventName, options = { bubbles: true, cancelable: true }) {
    this.eventName = eventName;
    this.options = options;
  }
  createEvent(detail) {
    return new CustomEvent(this.eventName, {
      ...this.options,
      detail
    });
  }
  dispatch(element, detail) {
    const event = this.createEvent(detail);
    element.dispatchEvent(event);
    return event;
  }
  listen(element, callback, options) {
    const handler = (event) => {
      callback(event);
    };
    return on(element, this.eventName, handler, options);
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const doc = getDocument(container);
  const walker = doc.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // oxlint-disable-next-line no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
class SvelteResizeObserver {
  #node;
  #onResize;
  constructor(node, onResize) {
    this.#node = node;
    this.#onResize = onResize;
    this.handler = this.handler.bind(this);
  }
  handler() {
    let rAF = 0;
    const _node = this.#node();
    if (!_node) return;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rAF);
      rAF = window.requestAnimationFrame(this.#onResize);
    });
    resizeObserver.observe(_node);
    return () => {
      window.cancelAnimationFrame(rAF);
      resizeObserver.unobserve(_node);
    };
  }
}
const navigationMenuAttrs = createBitsAttrs({
  component: "navigation-menu",
  parts: [
    "root",
    "sub",
    "item",
    "list",
    "trigger",
    "content",
    "link",
    "viewport",
    "menu",
    "indicator"
  ]
});
const NavigationMenuProviderContext = new Context("NavigationMenu.Root");
const NavigationMenuItemContext = new Context("NavigationMenu.Item");
const NavigationMenuListContext = new Context("NavigationMenu.List");
class NavigationMenuProviderState {
  static create(opts) {
    return NavigationMenuProviderContext.set(new NavigationMenuProviderState(opts));
  }
  opts;
  indicatorTrackRef = simpleBox(null);
  viewportRef = simpleBox(null);
  viewportContent = new SvelteMap();
  onTriggerEnter;
  onTriggerLeave = noop;
  onContentEnter = noop;
  onContentLeave = noop;
  onItemSelect;
  onItemDismiss;
  activeItem = null;
  prevActiveItem = null;
  constructor(opts) {
    this.opts = opts;
    this.onTriggerEnter = opts.onTriggerEnter;
    this.onTriggerLeave = opts.onTriggerLeave ?? noop;
    this.onContentEnter = opts.onContentEnter ?? noop;
    this.onContentLeave = opts.onContentLeave ?? noop;
    this.onItemDismiss = opts.onItemDismiss;
    this.onItemSelect = opts.onItemSelect;
  }
  setActiveItem = (item) => {
    this.prevActiveItem = this.activeItem;
    this.activeItem = item;
  };
}
class NavigationMenuRootState {
  static create(opts) {
    return new NavigationMenuRootState(opts);
  }
  opts;
  attachment;
  provider;
  previousValue = simpleBox("");
  isDelaySkipped;
  #derivedDelay = derived(() => {
    const isOpen = this.opts?.value?.current !== "";
    if (isOpen || this.isDelaySkipped.current) {
      return 100;
    } else {
      return this.opts.delayDuration.current;
    }
  });
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
    this.isDelaySkipped = boxAutoReset(false, {
      afterMs: this.opts.skipDelayDuration.current,
      getWindow: () => getWindow(opts.ref.current)
    });
    this.provider = NavigationMenuProviderState.create({
      value: this.opts.value,
      previousValue: this.previousValue,
      dir: this.opts.dir,
      orientation: this.opts.orientation,
      rootNavigationMenuRef: this.opts.ref,
      isRootMenu: true,
      onTriggerEnter: (itemValue, itemState) => {
        this.#onTriggerEnter(itemValue, itemState);
      },
      onTriggerLeave: this.#onTriggerLeave,
      onContentEnter: this.#onContentEnter,
      onContentLeave: this.#onContentLeave,
      onItemSelect: this.#onItemSelect,
      onItemDismiss: this.#onItemDismiss
    });
  }
  #debouncedFn = useDebounce(
    (val, itemState) => {
      if (typeof val === "string") {
        this.setValue(val, itemState);
      }
    },
    () => this.#derivedDelay()
  );
  #onTriggerEnter = (itemValue, itemState) => {
    this.#debouncedFn(itemValue, itemState);
  };
  #onTriggerLeave = () => {
    this.isDelaySkipped.current = false;
    this.#debouncedFn("", null);
  };
  #onContentEnter = () => {
    this.#debouncedFn(void 0, null);
  };
  #onContentLeave = () => {
    if (this.provider.activeItem && this.provider.activeItem.opts.openOnHover.current === false) {
      return;
    }
    this.#debouncedFn("", null);
  };
  #onItemSelect = (itemValue, itemState) => {
    this.setValue(itemValue, itemState);
  };
  #onItemDismiss = () => {
    this.setValue("", null);
  };
  setValue = (newValue, itemState) => {
    this.previousValue.current = this.opts.value.current;
    this.opts.value.current = newValue;
    this.provider.setActiveItem(itemState);
    if (newValue === "") {
      this.previousValue.current = "";
    }
  };
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": this.opts.orientation.current,
    dir: this.opts.dir.current,
    [navigationMenuAttrs.root]: "",
    [navigationMenuAttrs.menu]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuListState {
  static create(opts) {
    return NavigationMenuListContext.set(new NavigationMenuListState(opts, NavigationMenuProviderContext.get()));
  }
  wrapperId = simpleBox(useId());
  wrapperRef = simpleBox(null);
  opts;
  context;
  attachment;
  wrapperAttachment = attachRef(this.wrapperRef, (v) => this.context.indicatorTrackRef.current = v);
  listTriggers = [];
  rovingFocusGroup;
  wrapperMounted = false;
  constructor(opts, context) {
    this.opts = opts;
    this.context = context;
    this.attachment = attachRef(this.opts.ref);
    this.rovingFocusGroup = new RovingFocusGroup({
      rootNode: opts.ref,
      candidateSelector: `${navigationMenuAttrs.selector("trigger")}:not([data-disabled]), ${navigationMenuAttrs.selector("link")}:not([data-disabled])`,
      loop: boxWith$1(() => false),
      orientation: this.context.opts.orientation
    });
  }
  registerTrigger(trigger) {
    if (trigger) this.listTriggers.push(trigger);
    return () => {
      this.listTriggers = this.listTriggers.filter((t) => t.id !== trigger.id);
    };
  }
  #wrapperProps = derived(() => ({ id: this.wrapperId.current, ...this.wrapperAttachment }));
  get wrapperProps() {
    return this.#wrapperProps();
  }
  set wrapperProps($$value) {
    return this.#wrapperProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": this.context.opts.orientation.current,
    [navigationMenuAttrs.list]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuItemState {
  static create(opts) {
    return NavigationMenuItemContext.set(new NavigationMenuItemState(opts, NavigationMenuListContext.get()));
  }
  opts;
  attachment;
  listContext;
  contentNode = null;
  triggerNode = null;
  focusProxyNode = null;
  restoreContentTabOrder = noop;
  wasEscapeClose = false;
  #contentId = derived(() => this.contentNode?.id);
  get contentId() {
    return this.#contentId();
  }
  set contentId($$value) {
    return this.#contentId($$value);
  }
  #triggerId = derived(() => this.triggerNode?.id);
  get triggerId() {
    return this.#triggerId();
  }
  set triggerId($$value) {
    return this.#triggerId($$value);
  }
  contentChildren = simpleBox(void 0);
  contentChild = simpleBox(void 0);
  contentProps = simpleBox({});
  domContext;
  constructor(opts, listContext) {
    this.opts = opts;
    this.listContext = listContext;
    this.domContext = new DOMContext(opts.ref);
    this.attachment = attachRef(this.opts.ref);
  }
  #handleContentEntry = (side = "start") => {
    if (!this.contentNode) return;
    this.restoreContentTabOrder();
    const candidates = getTabbableCandidates(this.contentNode);
    if (candidates.length) focusFirst(side === "start" ? candidates : candidates.reverse(), () => this.domContext.getActiveElement());
  };
  #handleContentExit = () => {
    if (!this.contentNode) return;
    const candidates = getTabbableCandidates(this.contentNode);
    if (candidates.length) this.restoreContentTabOrder = removeFromTabOrder(candidates);
  };
  onEntryKeydown = this.#handleContentEntry;
  onFocusProxyEnter = this.#handleContentEntry;
  onRootContentClose = this.#handleContentExit;
  onContentFocusOutside = this.#handleContentExit;
  #props = derived(() => ({
    id: this.opts.id.current,
    [navigationMenuAttrs.item]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
const LINK_SELECT_EVENT = new CustomEventDispatcher("bitsLinkSelect", { bubbles: true, cancelable: true });
const ROOT_CONTENT_DISMISS_EVENT = new CustomEventDispatcher("bitsRootContentDismiss", { cancelable: true, bubbles: true });
class NavigationMenuLinkState {
  static create(opts) {
    return new NavigationMenuLinkState(opts, {
      provider: NavigationMenuProviderContext.get(),
      item: NavigationMenuItemContext.get()
    });
  }
  opts;
  context;
  attachment;
  isFocused = false;
  constructor(opts, context) {
    this.opts = opts;
    this.context = context;
    this.attachment = attachRef(this.opts.ref);
  }
  onclick = (e) => {
    const currTarget = e.currentTarget;
    LINK_SELECT_EVENT.listen(currTarget, (e2) => this.opts.onSelect.current(e2), { once: true });
    const linkSelectEvent = LINK_SELECT_EVENT.dispatch(currTarget);
    if (!linkSelectEvent.defaultPrevented && !e.metaKey) {
      ROOT_CONTENT_DISMISS_EVENT.dispatch(currTarget);
    }
  };
  onkeydown = (e) => {
    if (this.context.item.contentNode) return;
    this.context.item.listContext.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
  };
  onfocus = (_) => {
    this.isFocused = true;
  };
  onblur = (_) => {
    this.isFocused = false;
  };
  #handlePointerDismiss = () => {
    const currentlyOpenValue = this.context.provider.opts.value.current;
    const isInsideOpenSubmenu = this.context.item.opts.value.current === currentlyOpenValue;
    const activeItem = this.context.item.listContext.context.activeItem;
    if (activeItem && !activeItem.opts.openOnHover.current) return;
    if (currentlyOpenValue && !isInsideOpenSubmenu) {
      this.context.provider.onItemDismiss();
    }
  };
  onpointerenter = () => {
    this.#handlePointerDismiss();
  };
  onpointermove = whenMouse(() => {
    this.#handlePointerDismiss();
  });
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-active": this.opts.active.current ? "" : void 0,
    "aria-current": this.opts.active.current ? "page" : void 0,
    "data-focused": this.isFocused ? "" : void 0,
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    onfocus: this.onfocus,
    onblur: this.onblur,
    onpointerenter: this.onpointerenter,
    onpointermove: this.onpointermove,
    [navigationMenuAttrs.link]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class NavigationMenuViewportState {
  static create(opts) {
    return new NavigationMenuViewportState(opts, NavigationMenuProviderContext.get());
  }
  opts;
  context;
  attachment;
  #open = derived(() => !!this.context.opts.value.current);
  get open() {
    return this.#open();
  }
  set open($$value) {
    return this.#open($$value);
  }
  #viewportWidth = derived(() => this.size ? `${this.size.width}px` : void 0);
  get viewportWidth() {
    return this.#viewportWidth();
  }
  set viewportWidth($$value) {
    return this.#viewportWidth($$value);
  }
  #viewportHeight = derived(() => this.size ? `${this.size.height}px` : void 0);
  get viewportHeight() {
    return this.#viewportHeight();
  }
  set viewportHeight($$value) {
    return this.#viewportHeight($$value);
  }
  #activeContentValue = derived(() => this.context.opts.value.current);
  get activeContentValue() {
    return this.#activeContentValue();
  }
  set activeContentValue($$value) {
    return this.#activeContentValue($$value);
  }
  size = null;
  contentNode = null;
  mounted = false;
  constructor(opts, context) {
    this.opts = opts;
    this.context = context;
    this.attachment = attachRef(this.opts.ref, (v) => this.context.viewportRef.current = v);
    watch([() => this.activeContentValue, () => this.open], () => {
      afterTick(() => {
        const currNode = this.context.viewportRef.current;
        if (!currNode) return;
        const el = currNode.querySelector("[data-state=open]")?.children?.[0] ?? null;
        this.contentNode = el;
      });
    });
    new SvelteResizeObserver(() => this.contentNode, () => {
      if (this.contentNode) {
        this.size = {
          width: this.contentNode.offsetWidth,
          height: this.contentNode.offsetHeight
        };
      }
    });
    watch(() => this.mounted, () => {
      if (!this.mounted && this.size) {
        this.size = null;
      }
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": getDataOpenClosed(this.open),
    "data-orientation": this.context.opts.orientation.current,
    style: {
      pointerEvents: !this.open && this.context.opts.isRootMenu ? "none" : void 0,
      "--bits-navigation-menu-viewport-width": this.viewportWidth,
      "--bits-navigation-menu-viewport-height": this.viewportHeight
    },
    [navigationMenuAttrs.viewport]: "",
    onpointerenter: this.context.onContentEnter,
    onpointerleave: this.context.onContentLeave,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function focusFirst(candidates, getActiveElement2) {
  const previouslyFocusedElement = getActiveElement2();
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement) return true;
    candidate.focus();
    return getActiveElement2() !== previouslyFocusedElement;
  });
}
function removeFromTabOrder(candidates) {
  candidates.forEach((candidate) => {
    candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
    candidate.setAttribute("tabindex", "-1");
  });
  return () => {
    candidates.forEach((candidate) => {
      const prevTabIndex = candidate.dataset.tabindex;
      candidate.setAttribute("tabindex", prevTabIndex);
    });
  };
}
function whenMouse(handler) {
  return (e) => e.pointerType === "mouse" ? handler(e) : void 0;
}
function Navigation_menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      id = createId(uid),
      ref = null,
      value = "",
      onValueChange = noop,
      delayDuration = 200,
      skipDelayDuration = 300,
      dir = "ltr",
      orientation = "horizontal",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = NavigationMenuRootState.create({
      id: boxWith$1(() => id),
      value: boxWith$1(() => value, (v) => {
        value = v;
        onValueChange(v);
      }),
      delayDuration: boxWith$1(() => delayDuration),
      skipDelayDuration: boxWith$1(() => skipDelayDuration),
      dir: boxWith$1(() => dir),
      orientation: boxWith$1(() => orientation),
      ref: boxWith$1(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps({ "aria-label": "main" }, restProps, rootState.props);
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<nav${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></nav>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref, value });
  });
}
class StateMachine {
  state;
  #machine;
  constructor(initialState, machine) {
    this.state = simpleBox(initialState);
    this.#machine = machine;
    this.dispatch = this.dispatch.bind(this);
  }
  #reducer(event) {
    const nextState = this.#machine[this.state.current][event];
    return nextState ?? this.state.current;
  }
  dispatch(event) {
    this.state.current = this.#reducer(event);
  }
}
const presenceMachine = {
  mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
  unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
  unmounted: { MOUNT: "mounted" }
};
class Presence {
  opts;
  prevAnimationNameState = "none";
  styles = {};
  initialStatus;
  previousPresent;
  machine;
  present;
  constructor(opts) {
    this.opts = opts;
    this.present = this.opts.open;
    this.initialStatus = opts.open.current ? "mounted" : "unmounted";
    this.previousPresent = new Previous(() => this.present.current);
    this.machine = new StateMachine(this.initialStatus, presenceMachine);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleAnimationStart = this.handleAnimationStart.bind(this);
    watchPresenceChange(this);
    watchStatusChange(this);
    watchRefChange(this);
  }
  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
   * make sure we only trigger ANIMATION_END for the currently active animation.
   */
  handleAnimationEnd(event) {
    if (!this.opts.ref.current) return;
    const currAnimationName = getAnimationName(this.opts.ref.current);
    const isCurrentAnimation = currAnimationName.includes(event.animationName) || currAnimationName === "none";
    if (event.target === this.opts.ref.current && isCurrentAnimation) {
      this.machine.dispatch("ANIMATION_END");
    }
  }
  handleAnimationStart(event) {
    if (!this.opts.ref.current) return;
    if (event.target === this.opts.ref.current) {
      this.prevAnimationNameState = getAnimationName(this.opts.ref.current);
    }
  }
  #isPresent = derived(() => {
    return ["mounted", "unmountSuspended"].includes(this.machine.state.current);
  });
  get isPresent() {
    return this.#isPresent();
  }
  set isPresent($$value) {
    return this.#isPresent($$value);
  }
}
function watchPresenceChange(state) {
  watch(() => state.present.current, () => {
    if (!state.opts.ref.current) return;
    const hasPresentChanged = state.present.current !== state.previousPresent.current;
    if (!hasPresentChanged) return;
    const prevAnimationName = state.prevAnimationNameState;
    const currAnimationName = getAnimationName(state.opts.ref.current);
    if (state.present.current) {
      state.machine.dispatch("MOUNT");
    } else if (currAnimationName === "none" || state.styles.display === "none") {
      state.machine.dispatch("UNMOUNT");
    } else {
      const isAnimating = prevAnimationName !== currAnimationName;
      if (state.previousPresent.current && isAnimating) {
        state.machine.dispatch("ANIMATION_OUT");
      } else {
        state.machine.dispatch("UNMOUNT");
      }
    }
  });
}
function watchStatusChange(state) {
  watch(() => state.machine.state.current, () => {
    if (!state.opts.ref.current) return;
    const currAnimationName = getAnimationName(state.opts.ref.current);
    state.prevAnimationNameState = state.machine.state.current === "mounted" ? currAnimationName : "none";
  });
}
function watchRefChange(state) {
  watch(() => state.opts.ref.current, () => {
    if (!state.opts.ref.current) return;
    state.styles = getComputedStyle(state.opts.ref.current);
    return executeCallbacks(on(state.opts.ref.current, "animationstart", state.handleAnimationStart), on(state.opts.ref.current, "animationcancel", state.handleAnimationEnd), on(state.opts.ref.current, "animationend", state.handleAnimationEnd));
  });
}
function getAnimationName(node) {
  return node ? getComputedStyle(node).animationName || "none" : "none";
}
function Presence_layer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open, forceMount, presence, ref } = $$props;
    const presenceState = new Presence({ open: boxWith$1(() => open), ref });
    if (forceMount || open || presenceState.isPresent) {
      $$renderer2.push("<!--[-->");
      presence?.($$renderer2, { present: presenceState.isPresent });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Navigation_menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    const defaultId = createId(uid);
    let {
      id = defaultId,
      value = defaultId,
      ref = null,
      child,
      children,
      openOnHover = true,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemState = NavigationMenuItemState.create({
      id: boxWith$1(() => id),
      ref: boxWith$1(() => ref, (v) => ref = v),
      value: boxWith$1(() => value),
      openOnHover: boxWith$1(() => openOnHover)
    });
    const mergedProps = mergeProps(restProps, itemState.props);
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<li${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></li>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_link($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      child,
      children,
      active = false,
      onSelect = noop,
      tabindex = 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const linkState = NavigationMenuLinkState.create({
      id: boxWith$1(() => id),
      ref: boxWith$1(() => ref, (v) => ref = v),
      active: boxWith$1(() => active),
      onSelect: boxWith$1(() => onSelect)
    });
    const mergedProps = mergeProps(restProps, linkState.props, { tabindex });
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_list($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      children,
      child,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const listState = NavigationMenuListState.create({
      id: boxWith$1(() => id),
      ref: boxWith$1(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, listState.props);
    const wrapperProps = mergeProps(listState.wrapperProps);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (child) {
        $$renderer3.push("<!--[-->");
        child($$renderer3, { props: mergedProps, wrapperProps });
        $$renderer3.push(`<!----> `);
        Mounted($$renderer3, {
          get mounted() {
            return listState.wrapperMounted;
          },
          set mounted($$value) {
            listState.wrapperMounted = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div${attributes({ ...wrapperProps })}><ul${attributes({ ...mergedProps })}>`);
        children?.($$renderer3);
        $$renderer3.push(`<!----></ul></div> `);
        Mounted($$renderer3, {
          get mounted() {
            return listState.wrapperMounted;
          },
          set mounted($$value) {
            listState.wrapperMounted = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!---->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Navigation_menu_viewport($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      forceMount = false,
      child,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const viewportState = NavigationMenuViewportState.create({
      id: boxWith$1(() => id),
      ref: boxWith$1(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, viewportState.props);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      {
        let presence = function($$renderer4) {
          if (child) {
            $$renderer4.push("<!--[-->");
            child($$renderer4, { props: mergedProps });
            $$renderer4.push(`<!---->`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<div${attributes({ ...mergedProps })}>`);
            children?.($$renderer4);
            $$renderer4.push(`<!----></div>`);
          }
          $$renderer4.push(`<!--]--> `);
          Mounted($$renderer4, {
            get mounted() {
              return viewportState.mounted;
            },
            set mounted($$value) {
              viewportState.mounted = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!---->`);
        };
        Presence_layer($$renderer3, {
          open: forceMount || viewportState.open,
          ref: viewportState.opts.ref,
          presence
        });
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Mode_toggler($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Button($$renderer2, {
      onclick: toggleMode,
      role: "switch",
      "aria-label": "Mode toggler",
      "aria-checked": derivedMode.current === "light",
      title: `Toggle ${stringify(derivedMode.current === "dark" ? "Dark" : "Light")} Mode`,
      class: "relative inline-flex h-10 w-10 justify-center items-center rounded-lg px-2 transition-colors hover:bg-muted focus:outline-none",
      children: ($$renderer3) => {
        if (derivedMode.current === "dark") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="absolute inline-flex h-full w-full items-center justify-center">`);
          Sun($$renderer3, {
            class: "size-6 text-foreground hover:text-primary",
            "aria-label": "Sun"
          });
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="absolute inline-flex h-full w-full items-center justify-center">`);
          Moon($$renderer3, {
            class: "size-6 text-foreground hover:text-primary",
            "aria-label": "Moon"
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
  });
}
const navMenu = [
  {
    title: "Projects",
    slug: "/projects"
  },
  {
    title: "Events",
    slug: "/events"
  },
  {
    title: "Services",
    slug: "/services"
  },
  {
    title: "Blog",
    slug: "/blog"
  },
  {
    title: "Repository",
    slug: "/repository"
  }
];
function Main_nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentPath = page.url.pathname;
    const txtMenuClass = `relative py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`;
    $$renderer2.push(`<!---->`);
    Navigation_menu($$renderer2, {
      class: "hidden md:flex",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Navigation_menu_list($$renderer3, {
          class: "snip1226 group flex flex-1 list-none items-center justify-center space-x-6 text-xl font-medium lg:space-x-12",
          children: ($$renderer4) => {
            $$renderer4.push(`<!--[-->`);
            const each_array = ensure_array_like(navMenu);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let item = each_array[$$index];
              $$renderer4.push(`<!---->`);
              Navigation_menu_item($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->`);
                  Navigation_menu_link($$renderer5, {
                    "data-hover": item.title,
                    class: twMerge(txtMenuClass, currentPath.startsWith(item.slug) && "current"),
                    href: item.slug,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(item.title)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <!---->`);
        Navigation_menu_viewport($$renderer3, {});
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
const logoLight = {
  sources: {
    avif: "/_app/immutable/assets/SPECTRA_logo_light.CmmqoRaU.avif 528w, /_app/immutable/assets/SPECTRA_logo_light.tPd-FI2-.avif 1055w",
    webp: "/_app/immutable/assets/SPECTRA_logo_light.CC4ZuE54.webp 528w, /_app/immutable/assets/SPECTRA_logo_light.BR5MjiKM.webp 1055w",
    png: "/_app/immutable/assets/SPECTRA_logo_light.DmiMdCMd.png 528w, /_app/immutable/assets/SPECTRA_logo_light.CKqx1GAu.png 1055w"
  },
  img: {
    src: "/_app/immutable/assets/SPECTRA_logo_light.CKqx1GAu.png",
    w: 1055,
    h: 236
  }
};
const logoDark = {
  sources: {
    avif: "/_app/immutable/assets/SPECTRA_logo_dark.BE89Gel6.avif 528w, /_app/immutable/assets/SPECTRA_logo_dark.C8g2PkpK.avif 1055w",
    webp: "/_app/immutable/assets/SPECTRA_logo_dark.BvPswfix.webp 528w, /_app/immutable/assets/SPECTRA_logo_dark.CLdF9Wwj.webp 1055w",
    png: "/_app/immutable/assets/SPECTRA_logo_dark.CLOtrX8x.png 528w, /_app/immutable/assets/SPECTRA_logo_dark.qaaCx3zQ.png 1055w"
  },
  img: {
    src: "/_app/immutable/assets/SPECTRA_logo_dark.qaaCx3zQ.png",
    w: 1055,
    h: 236
  }
};
function Icon_nav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "hidden md:flex" } = $$props;
    $$renderer2.push(`<!---->`);
    Button($$renderer2, {
      href: "/",
      class: `items-center ${stringify(className)}`,
      children: ($$renderer3) => {
        if (typeof logoLight === "string") {
          $$renderer3.push("<!--[-->");
          {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<img${attr("src", logoLight)} alt="Spectra CE EU logo" class="block dark:hidden h-12 w-full hover:opacity-80"/>`);
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<picture><!--[-->`);
          const each_array = ensure_array_like(Object.entries(logoLight.sources));
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let [format, srcset] = each_array[$$index];
            $$renderer3.push(`<source${attr("srcset", srcset)}${attr("type", "image/" + format)}/>`);
          }
          $$renderer3.push(`<!--]--> <img${attr("src", logoLight.img.src)} alt="Spectra CE EU logo" class="block dark:hidden h-12 w-full hover:opacity-80"${attr("width", logoLight.img.w)}${attr("height", logoLight.img.h)}/></picture>`);
        }
        $$renderer3.push(`<!--]--> `);
        if (typeof logoDark === "string") {
          $$renderer3.push("<!--[-->");
          {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<img${attr("src", logoDark)} alt="Spectra CE EU logo" class="hidden dark:block h-12 w-full hover:opacity-80"/>`);
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<picture><!--[-->`);
          const each_array_1 = ensure_array_like(Object.entries(logoDark.sources));
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let [format, srcset] = each_array_1[$$index_1];
            $$renderer3.push(`<source${attr("srcset", srcset)}${attr("type", "image/" + format)}/>`);
          }
          $$renderer3.push(`<!--]--> <img${attr("src", logoDark.img.src)} alt="Spectra CE EU logo" class="hidden dark:block h-12 w-full hover:opacity-80"${attr("width", logoDark.img.w)}${attr("height", logoDark.img.h)}/></picture>`);
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function MagnifyingGlass($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getIconContext();
    let { children, $$slots, $$events, ...props } = $$props;
    let weight = props.weight ?? ctx.weight ?? "regular";
    let color = props.color ?? ctx.color ?? "currentColor";
    let size = props.size ?? ctx.size ?? "1em";
    let mirrored = props.mirrored ?? ctx.mirrored ?? false;
    function svgAttr(obj) {
      let { weight: weight2, color: color2, size: size2, mirrored: mirrored2, ...attrs } = obj;
      return attrs;
    }
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "img",
        width: size,
        height: size,
        fill: color,
        transform: mirrored ? "scale(-1, 1)" : void 0,
        viewBox: "0 0 256 256",
        ...svgAttr(ctx),
        ...svgAttr(props)
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><rect width="256" height="256" fill="none"></rect>`);
    if (weight === "bold") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z" opacity="0.2"></path><path d="M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M226.83,221.17l-52.7-52.7a84.1,84.1,0,1,0-5.66,5.66l52.7,52.7a4,4,0,0,0,5.66-5.66ZM36,112a76,76,0,1,1,76,76A76.08,76.08,0,0,1,36,112Z"></path>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`${escape_html((console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'), ""))}`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg>`);
  });
}
function MapPin($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = getIconContext();
    let { children, $$slots, $$events, ...props } = $$props;
    let weight = props.weight ?? ctx.weight ?? "regular";
    let color = props.color ?? ctx.color ?? "currentColor";
    let size = props.size ?? ctx.size ?? "1em";
    let mirrored = props.mirrored ?? ctx.mirrored ?? false;
    function svgAttr(obj) {
      let { weight: weight2, color: color2, size: size2, mirrored: mirrored2, ...attrs } = obj;
      return attrs;
    }
    $$renderer2.push(`<svg${attributes(
      {
        xmlns: "http://www.w3.org/2000/svg",
        role: "img",
        width: size,
        height: size,
        fill: color,
        transform: mirrored ? "scale(-1, 1)" : void 0,
        viewBox: "0 0 256 256",
        ...svgAttr(ctx),
        ...svgAttr(props)
      },
      void 0,
      void 0,
      void 0,
      3
    )}>`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--><rect width="256" height="256" fill="none"></rect>`);
    if (weight === "bold") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<path d="M128,60a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,60Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,124Zm0-112a92.1,92.1,0,0,0-92,92c0,77.36,81.64,135.4,85.12,137.83a12,12,0,0,0,13.76,0,259,259,0,0,0,42.18-39C205.15,170.57,220,136.37,220,104A92.1,92.1,0,0,0,128,12Zm31.3,174.71A249.35,249.35,0,0,1,128,216.89a249.35,249.35,0,0,1-31.3-30.18C80,167.37,60,137.31,60,104a68,68,0,0,1,136,0C196,137.31,176,167.37,159.3,186.71Z"></path>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (weight === "duotone") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<path d="M128,24a80,80,0,0,0-80,80c0,72,80,128,80,128s80-56,80-128A80,80,0,0,0,128,24Zm0,112a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z" opacity="0.2"></path><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (weight === "fill") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (weight === "light") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<path d="M128,66a38,38,0,1,0,38,38A38,38,0,0,0,128,66Zm0,64a26,26,0,1,1,26-26A26,26,0,0,1,128,130Zm0-112a86.1,86.1,0,0,0-86,86c0,30.91,14.34,63.74,41.47,94.94a252.32,252.32,0,0,0,41.09,38,6,6,0,0,0,6.88,0,252.32,252.32,0,0,0,41.09-38c27.13-31.2,41.47-64,41.47-94.94A86.1,86.1,0,0,0,128,18Zm0,206.51C113,212.93,54,163.62,54,104a74,74,0,0,1,148,0C202,163.62,143,212.93,128,224.51Z"></path>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (weight === "regular") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (weight === "thin") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<path d="M128,68a36,36,0,1,0,36,36A36,36,0,0,0,128,68Zm0,64a28,28,0,1,1,28-28A28,28,0,0,1,128,132Zm0-112a84.09,84.09,0,0,0-84,84c0,30.42,14.17,62.79,41,93.62a250,250,0,0,0,40.73,37.66,4,4,0,0,0,4.58,0A250,250,0,0,0,171,197.62c26.81-30.83,41-63.2,41-93.62A84.09,84.09,0,0,0,128,20Zm37.1,172.23A254.62,254.62,0,0,1,128,227a254.62,254.62,0,0,1-37.1-34.81C73.15,171.8,52,139.9,52,104a76,76,0,0,1,152,0C204,139.9,182.85,171.8,165.1,192.23Z"></path>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`${escape_html((console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'), ""))}`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></svg>`);
  });
}
function Search($$renderer) {
  Button($$renderer, {
    onclick: () => console.log("Search"),
    role: "search",
    "aria-label": "Search",
    title: "Search",
    class: "relative inline-flex h-10 w-10 justify-center items-center rounded-lg px-2 transition-colors hover:bg-muted dark:hover:bg-gray-700 focus:outline-none",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="absolute inline-flex h-full w-full items-center justify-center">`);
      MagnifyingGlass($$renderer2, {
        class: "size-6 text-foreground hover:text-primary",
        "aria-label": "Search"
      });
      $$renderer2.push(`<!----></div>`);
    },
    $$slots: { default: true }
  });
}
function Site_header($$renderer) {
  $$renderer.push(`<header${attr_class(`fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur transition-all duration-300 flex items-center min-h-16 py-2 md:py-0 ${stringify("md:h-32")}`)}><section class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-3 sm:px-4 lg:px-6"><div class="flex items-center gap-2 shrink-0">`);
  Icon_nav($$renderer, {});
  $$renderer.push(`<!----> `);
  $$renderer.push(`<!----></div> <div class="hidden items-center space-x-1 md:flex">`);
  Main_nav($$renderer);
  $$renderer.push(`<!----></div> <div class="flex items-center gap-0 sm:gap-2 shrink-0">`);
  Search($$renderer);
  $$renderer.push(`<!----> `);
  Mode_toggler($$renderer);
  $$renderer.push(`<!----></div></section></header>`);
}
function Site_footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { footer } = $$props;
    $$renderer2.push(`<footer class="bg-muted border-t border-border mt-auto w-full"><div class="w-full max-w-screen-xl mx-auto px-4 py-12"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div class="space-y-4 md:col-span-2">`);
    Icon_nav($$renderer2, { class: "!flex" });
    $$renderer2.push(`<!----> `);
    if (
      // console.log('Footer data:', footer);
      footer?.brandDescription
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm text-muted-foreground leading-relaxed max-w-sm">${escape_html(footer.brandDescription)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (footer?.quickLinks?.length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-4"><h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h4> <nav class="flex flex-col space-y-2"><!--[-->`);
      const each_array = ensure_array_like(footer.quickLinks);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        ButtonLink($$renderer2, {
          href: link.href,
          variant: "muted",
          size: "sm",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(link.label)}`);
          }
        });
      }
      $$renderer2.push(`<!--]--></nav></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-4"><h4 class="text-sm font-semibold text-foreground uppercase tracking-wider">Contact</h4> <div class="space-y-3">`);
    if (footer?.contact?.email) {
      $$renderer2.push("<!--[-->");
      {
        let icon = function($$renderer3) {
          Envelope($$renderer3, { class: "text-lg" });
        };
        ButtonLink($$renderer2, {
          href: `mailto:${stringify(footer.contact.email)}`,
          variant: "muted",
          size: "sm",
          icon,
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(footer.contact.email)}`);
          }
        });
      }
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (footer?.contact?.location) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-start gap-1 text-sm text-muted-foreground">`);
      MapPin($$renderer2, { class: "text-lg shrink-0 mt-0.5" });
      $$renderer2.push(`<!----> <span>${escape_html(footer.contact.location)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (footer?.socialLinks?.length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-3 pt-2"><!--[-->`);
      const each_array_1 = ensure_array_like(footer.socialLinks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let social = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", social.url)} target="_blank" rel="noreferrer" class="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"${attr("aria-label", social.platform.platformName)}>`);
        SocialIcon($$renderer2, { platform: social.platform.platformName, class: "text-lg" });
        $$renderer2.push(`<!----></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">`);
    if (footer?.copyrightText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm text-muted-foreground">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} ${escape_html(footer.copyrightText)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (footer?.bottomLinks?.length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"><!--[-->`);
      const each_array_2 = ensure_array_like(footer.bottomLinks);
      for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
        let link = each_array_2[i];
        if (i > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-muted-foreground">•</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        ButtonLink($$renderer2, {
          href: link.href,
          external: link.external,
          variant: "muted",
          size: "sm",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(link.label)}`);
          }
        });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, data } = $$props;
    Mode_watcher($$renderer2, {});
    $$renderer2.push(`<!----> `);
    Site_header($$renderer2);
    $$renderer2.push(`<!----> <div class="pt-16 md:pt-32">`);
    children($$renderer2);
    $$renderer2.push(`<!----></div> `);
    Site_footer($$renderer2, { footer: data.footerData });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _layout as default
};
