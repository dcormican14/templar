'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/app/environment/mourn.types.ts
var DEFAULT_MOURN_CONFIG = {
  version: "1.0",
  name: "Templar Project",
  providers: {
    auth: {
      enabled: true,
      storageKey: "templar-auth"
    },
    theme: {
      enabled: true,
      defaultTheme: "system",
      attribute: "data-theme",
      storageKey: "templar-theme",
      includeCustomThemes: true
    },
    toast: {
      enabled: true,
      maxToasts: 5,
      defaultDuration: 5e3,
      defaultPosition: "top-right"
    },
    loading: {
      enabled: true,
      showGlobalSpinner: true,
      minLoadingTime: 300
    },
    modal: {
      enabled: true,
      maxModals: 3,
      closeOnOverlayClick: true,
      closeOnEscape: true
    },
    settings: {
      enabled: true,
      storageKey: "templar-settings",
      defaultSettings: {
        language: "en",
        notifications: {
          enabled: true,
          sound: true,
          desktop: false
        },
        appearance: {
          animations: true,
          reducedMotion: false,
          fontSize: "md"
        }
      }
    }
  },
  components: {
    includeAnimations: true,
    includeGlassmorphic: true
  },
  build: {
    treeShake: true,
    includeCSSVariables: true,
    sourceMaps: false
  },
  customVariables: {}
};
function isMournConfig(value) {
  return typeof value === "object" && value !== null && (!value.version || typeof value.version === "string") && (!value.name || typeof value.name === "string");
}
function mergeMournConfig(userConfig) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  return {
    version: (_a = userConfig.version) != null ? _a : DEFAULT_MOURN_CONFIG.version,
    name: (_b = userConfig.name) != null ? _b : DEFAULT_MOURN_CONFIG.name,
    providers: {
      auth: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.auth), (_c = userConfig.providers) == null ? void 0 : _c.auth),
      theme: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.theme), (_d = userConfig.providers) == null ? void 0 : _d.theme),
      toast: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.toast), (_e = userConfig.providers) == null ? void 0 : _e.toast),
      loading: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.loading), (_f = userConfig.providers) == null ? void 0 : _f.loading),
      modal: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.modal), (_g = userConfig.providers) == null ? void 0 : _g.modal),
      settings: __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.settings), (_h = userConfig.providers) == null ? void 0 : _h.settings), {
        defaultSettings: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.providers.settings.defaultSettings), (_j = (_i = userConfig.providers) == null ? void 0 : _i.settings) == null ? void 0 : _j.defaultSettings)
      })
    },
    components: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.components), userConfig.components),
    build: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.build), userConfig.build),
    customVariables: __spreadValues(__spreadValues({}, DEFAULT_MOURN_CONFIG.customVariables), userConfig.customVariables)
  };
}

// src/app/environment/configReader.ts
var globalConfig = null;
function setGlobalMournConfig(config) {
  globalConfig = mergeMournConfig(config);
}
function getGlobalMournConfig() {
  return globalConfig;
}
function clearGlobalMournConfig() {
  globalConfig = null;
}
async function readMournConfig() {
  try {
    if (globalConfig) {
      return globalConfig;
    }
    if (typeof window !== "undefined") {
      const browserConfig = window.__MOURN_CONFIG__;
      if (browserConfig && isMournConfig(browserConfig)) {
        globalConfig = mergeMournConfig(browserConfig);
        return globalConfig;
      }
    }
    if (!globalConfig) {
      console.info("[Templar] No .mourn configuration provided. Using defaults.");
      globalConfig = DEFAULT_MOURN_CONFIG;
    }
    return globalConfig;
  } catch (error) {
    console.error("[Templar] Error reading .mourn configuration:", error);
    return DEFAULT_MOURN_CONFIG;
  }
}
function readMournConfigSync() {
  if (globalConfig) {
    return globalConfig;
  }
  if (typeof window !== "undefined") {
    const browserConfig = window.__MOURN_CONFIG__;
    if (browserConfig && isMournConfig(browserConfig)) {
      globalConfig = mergeMournConfig(browserConfig);
      return globalConfig;
    }
  }
  globalConfig = DEFAULT_MOURN_CONFIG;
  return globalConfig;
}
function validateMournConfig(config) {
  var _a, _b, _c, _d;
  const errors = [];
  if (!isMournConfig(config)) {
    errors.push("Invalid configuration format");
    return errors;
  }
  if (config.version && typeof config.version !== "string") {
    errors.push("version must be a string");
  }
  if (config.providers) {
    const validProviders = ["auth", "theme", "toast", "loading", "modal", "settings"];
    Object.keys(config.providers).forEach((key) => {
      if (!validProviders.includes(key)) {
        errors.push(`Unknown provider: ${key}`);
      }
    });
    if ((_a = config.providers.theme) == null ? void 0 : _a.defaultTheme) {
      const validThemes = [
        "light",
        "dark",
        "high-contrast",
        "sepia-light",
        "sepia-dark",
        "solarized-dark",
        "valor",
        "valor-dark",
        "system",
        "auto"
      ];
      if (!validThemes.includes(config.providers.theme.defaultTheme)) {
        errors.push(`Invalid theme: ${config.providers.theme.defaultTheme}`);
      }
    }
    if (((_b = config.providers.toast) == null ? void 0 : _b.maxToasts) !== void 0) {
      if (typeof config.providers.toast.maxToasts !== "number" || config.providers.toast.maxToasts < 1) {
        errors.push("toast.maxToasts must be a positive number");
      }
    }
    if (((_c = config.providers.toast) == null ? void 0 : _c.defaultDuration) !== void 0) {
      if (typeof config.providers.toast.defaultDuration !== "number" || config.providers.toast.defaultDuration < 0) {
        errors.push("toast.defaultDuration must be a non-negative number");
      }
    }
    if (((_d = config.providers.modal) == null ? void 0 : _d.maxModals) !== void 0) {
      if (typeof config.providers.modal.maxModals !== "number" || config.providers.modal.maxModals < 1) {
        errors.push("modal.maxModals must be a positive number");
      }
    }
  }
  return errors;
}
function debugMournConfig(config) {
  console.group("[Templar] Configuration");
  console.log("Version:", config.version);
  console.log("Name:", config.name);
  console.group("Providers");
  Object.entries(config.providers || {}).forEach(([name, providerConfig]) => {
    console.log(`${name}:`, providerConfig);
  });
  console.groupEnd();
  if (config.components) {
    console.log("Components:", config.components);
  }
  if (config.build) {
    console.log("Build:", config.build);
  }
  if (config.customVariables && Object.keys(config.customVariables).length > 0) {
    console.log("Custom Variables:", config.customVariables);
  }
  console.groupEnd();
}
var EnvironmentContext = React.createContext(void 0);
function EnvironmentProvider({
  children,
  config: overrideConfig,
  debug = false
}) {
  const [config, setConfig] = React.useState(
    overrideConfig ? mergeMournConfig(overrideConfig) : DEFAULT_MOURN_CONFIG
  );
  const [isLoading, setIsLoading] = React.useState(!overrideConfig);
  const [error, setError] = React.useState(null);
  const loadConfig = async () => {
    if (overrideConfig) {
      const merged = mergeMournConfig(overrideConfig);
      setConfig(merged);
      setIsLoading(false);
      if (debug) {
        debugMournConfig(merged);
      }
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const loadedConfig = await readMournConfig();
      setConfig(loadedConfig);
      if (debug) {
        debugMournConfig(loadedConfig);
      }
    } catch (err) {
      console.error("[Templar] Failed to load .mourn configuration:", err);
      setError(err instanceof Error ? err : new Error("Unknown error loading configuration"));
      setConfig(DEFAULT_MOURN_CONFIG);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    loadConfig();
  }, []);
  const contextValue = React.useMemo(
    () => ({
      config,
      isLoading,
      error,
      reload: loadConfig
    }),
    [config, isLoading, error]
  );
  return /* @__PURE__ */ React__default.default.createElement(EnvironmentContext.Provider, { value: contextValue }, children);
}
function useEnvironment() {
  const context = React.useContext(EnvironmentContext);
  if (context === void 0) {
    throw new Error("useEnvironment must be used within an EnvironmentProvider");
  }
  return context;
}
function useMournConfig() {
  const { config } = useEnvironment();
  return config;
}
function useProviderEnabled(providerName) {
  var _a, _b;
  const { config } = useEnvironment();
  return (_b = (_a = config.providers[providerName]) == null ? void 0 : _a.enabled) != null ? _b : true;
}
function useProviderConfig(providerName) {
  const { config } = useEnvironment();
  return config.providers[providerName];
}

exports.DEFAULT_MOURN_CONFIG = DEFAULT_MOURN_CONFIG;
exports.EnvironmentProvider = EnvironmentProvider;
exports.clearGlobalMournConfig = clearGlobalMournConfig;
exports.debugMournConfig = debugMournConfig;
exports.getGlobalMournConfig = getGlobalMournConfig;
exports.isMournConfig = isMournConfig;
exports.mergeMournConfig = mergeMournConfig;
exports.readMournConfig = readMournConfig;
exports.readMournConfigSync = readMournConfigSync;
exports.setGlobalMournConfig = setGlobalMournConfig;
exports.useEnvironment = useEnvironment;
exports.useMournConfig = useMournConfig;
exports.useProviderConfig = useProviderConfig;
exports.useProviderEnabled = useProviderEnabled;
exports.validateMournConfig = validateMournConfig;
//# sourceMappingURL=environment.js.map
//# sourceMappingURL=environment.js.map