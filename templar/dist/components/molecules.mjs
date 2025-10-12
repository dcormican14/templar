import React22, { createContext, forwardRef, useState, useEffect, useMemo, useRef, useLayoutEffect, useCallback, useImperativeHandle, useId, useContext, isValidElement, cloneElement } from 'react';
import Tilt from 'react-parallax-tilt';
import * as IconoirIcons from 'iconoir-react';
import { createPortal } from 'react-dom';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
createContext(void 0);
var ThemeContext = createContext(void 0);
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/app/components/atoms/types/universal.types.ts
var UNIVERSAL_DEFAULTS = {
  color: "primary",
  variant: "outline",
  size: "md",
  shape: "round",
  disabled: false,
  loading: false,
  animate: true,
  animationMode: "default"
};
var extractFormProps = (props) => {
  const _a = props, {
    color: color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-live": ariaLive,
    rounded,
    focused: focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
    name: name,
    value,
    defaultValue,
    required,
    readOnly,
    placeholder,
    helperText,
    errorText,
    error,
    label,
    onChange,
    onInput,
    validate,
    autoComplete,
    autoFocus
  } = _a, rest = __objRest(_a, [
    // Universal atomic props
    "color",
    "customColor",
    "variant",
    "shape",
    "size",
    "disabled",
    "loading",
    "loadingKey",
    "width",
    "height",
    "className",
    "style",
    "id",
    "data-testid",
    "animate",
    "animationMode",
    "animationModes",
    "animationDuration",
    "aria-label",
    "aria-describedby",
    "aria-labelledby",
    "aria-required",
    "aria-invalid",
    "aria-expanded",
    "aria-haspopup",
    "aria-hidden",
    "aria-live",
    "rounded",
    // Universal interactive props
    "focused",
    "active",
    "fullWidth",
    "tabIndex",
    "onKeyDown",
    "onKeyUp",
    "onKeyPress",
    "onFocus",
    "onBlur",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseDown",
    "onMouseUp",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
    "onTouchCancel",
    // Universal form props
    "name",
    "value",
    "defaultValue",
    "required",
    "readOnly",
    "placeholder",
    "helperText",
    "errorText",
    "error",
    "label",
    "onChange",
    "onInput",
    "validate",
    "autoComplete",
    "autoFocus"
  ]);
  const formProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-live": ariaLive,
    rounded,
    focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel,
    name,
    value,
    defaultValue,
    required,
    readOnly,
    placeholder,
    helperText,
    errorText,
    error,
    label,
    onChange,
    onInput,
    validate,
    autoComplete,
    autoFocus
  };
  return [formProps, rest];
};
var extractContainerProps = (props) => {
  const _a = props, {
    color: color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-live": ariaLive,
    rounded,
    children: children,
    padding,
    margin,
    gap,
    clickable,
    onClick,
    onAsyncClick,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex
  } = _a, rest = __objRest(_a, [
    // Universal atomic props
    "color",
    "customColor",
    "variant",
    "shape",
    "size",
    "disabled",
    "loading",
    "loadingKey",
    "width",
    "height",
    "className",
    "style",
    "id",
    "data-testid",
    "animate",
    "animationMode",
    "animationModes",
    "animationDuration",
    "aria-label",
    "aria-describedby",
    "aria-labelledby",
    "aria-required",
    "aria-invalid",
    "aria-expanded",
    "aria-haspopup",
    "aria-hidden",
    "aria-live",
    "rounded",
    // Universal container props
    "children",
    "padding",
    "margin",
    "gap",
    "clickable",
    "onClick",
    "onAsyncClick",
    "maxWidth",
    "maxHeight",
    "minWidth",
    "minHeight",
    "overflow",
    "overflowX",
    "overflowY",
    "position",
    "zIndex"
  ]);
  const containerProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-live": ariaLive,
    rounded,
    children,
    padding,
    margin,
    gap,
    clickable,
    onClick,
    onAsyncClick,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    overflow,
    overflowX,
    overflowY,
    position,
    zIndex
  };
  return [containerProps, rest];
};
var extractInteractiveProps = (props) => {
  const _a = props, {
    color: color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-live": ariaLive,
    rounded,
    focused: focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel
  } = _a, rest = __objRest(_a, [
    // Universal atomic props
    "color",
    "customColor",
    "variant",
    "shape",
    "size",
    "disabled",
    "loading",
    "loadingKey",
    "width",
    "height",
    "className",
    "style",
    "id",
    "data-testid",
    "animate",
    "animationMode",
    "animationModes",
    "animationDuration",
    "aria-label",
    "aria-describedby",
    "aria-labelledby",
    "aria-required",
    "aria-invalid",
    "aria-expanded",
    "aria-haspopup",
    "aria-hidden",
    "aria-live",
    "rounded",
    // Universal interactive props
    "focused",
    "active",
    "fullWidth",
    "tabIndex",
    "onKeyDown",
    "onKeyUp",
    "onKeyPress",
    "onFocus",
    "onBlur",
    "onMouseEnter",
    "onMouseLeave",
    "onMouseDown",
    "onMouseUp",
    "onTouchStart",
    "onTouchEnd",
    "onTouchMove",
    "onTouchCancel"
  ]);
  const interactiveProps = {
    color,
    customColor,
    variant,
    shape,
    size,
    disabled,
    loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate,
    animationMode,
    animationModes,
    animationDuration,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHasPopup,
    "aria-hidden": ariaHidden,
    "aria-live": ariaLive,
    rounded,
    focused,
    active,
    fullWidth,
    tabIndex,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onTouchCancel
  };
  return [interactiveProps, rest];
};

// src/app/components/atoms/Button/Button.styles.ts
var getColorVariables = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      // Default to white text for custom colors
      hover: customColor + "20",
      // Add opacity for hover
      disabled: customColor + "40"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getVariantStyles = (color, variant, customColor, cssVars) => {
  const colors = getColorVariables(color, customColor, cssVars);
  const baseStyles = {
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "2px",
    borderLeftWidth: "2px",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid"
  };
  switch (variant) {
    case "solid":
      return __spreadProps(__spreadValues({
        backgroundColor: colors.accent || colors.main,
        color: colors.foreground,
        borderTopColor: colors.accent || colors.main,
        borderRightColor: colors.accent || colors.main,
        borderLeftColor: colors.accent || colors.main,
        borderBottomColor: colors.accent || colors.main
      }, baseStyles), {
        "&:hover:not(:disabled)": {
          backgroundColor: colors.hover,
          borderTopColor: colors.hover,
          borderRightColor: colors.hover,
          borderLeftColor: colors.hover,
          borderBottomColor: colors.hover
        }
      });
    case "outline":
      return __spreadProps(__spreadValues({
        backgroundColor: cssVars.background,
        color: colors.main,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderLeftColor: colors.main,
        borderBottomColor: colors.main
      }, baseStyles), {
        "&:hover:not(:disabled)": {
          backgroundColor: colors.background || colors.main + "10",
          borderTopColor: colors.hover,
          borderRightColor: colors.hover,
          borderLeftColor: colors.hover,
          borderBottomColor: colors.hover,
          color: colors.hover
        }
      });
    case "ghost":
      return __spreadProps(__spreadValues({
        backgroundColor: "transparent",
        color: colors.main,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderBottomColor: "transparent"
      }, baseStyles), {
        "&:hover:not(:disabled)": {
          backgroundColor: colors.background || colors.main + "10",
          color: colors.hover
        }
      });
    case "glassmorphic":
      const reflectionColor = colors.hover || colors.main || "#ffffff";
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
      return __spreadProps(__spreadValues({
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          rgba(255, 255, 255, 0.1)
        `,
        backdropFilter: "blur(10px)",
        color: colors.main,
        boxShadow: `0 8px 32px 0 ${colors.shadow || "rgba(31, 38, 135, 0.37)"}`,
        position: "relative",
        overflow: "hidden"
      }, baseStyles), {
        borderTopColor: "rgba(255, 255, 255, 0.2)",
        borderRightColor: "rgba(255, 255, 255, 0.2)",
        borderLeftColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        "&:hover:not(:disabled)": {
          background: `
            linear-gradient(135deg, transparent 0%, ${reflectionColor}30 20%, ${reflectionColor}25 25%, transparent 35%),
            linear-gradient(135deg, transparent 45%, ${reflectionColor}35 55%, ${reflectionColor}30 65%, transparent 80%),
            rgba(255, 255, 255, 0.15)
          `,
          backdropFilter: "blur(15px)",
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          borderRightColor: "rgba(255, 255, 255, 0.3)",
          borderLeftColor: "rgba(255, 255, 255, 0.3)",
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          transform: "translateY(-1px)",
          boxShadow: `0 12px 40px 0 ${colors.shadow || "rgba(31, 38, 135, 0.45)"}`
        }
      });
    default:
      return __spreadValues({
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderLeftColor: colors.main,
        borderBottomColor: colors.main
      }, baseStyles);
  }
};
var getSizeStyles = (size) => {
  const sizeMap = {
    xs: {
      paddingTop: "4px",
      paddingRight: "12px",
      paddingBottom: "4px",
      paddingLeft: "12px",
      fontSize: "14px",
      minWidth: "82px",
      height: "40px"
    },
    sm: {
      paddingTop: "6px",
      paddingRight: "12px",
      paddingBottom: "6px",
      paddingLeft: "12px",
      fontSize: "14px",
      minWidth: "82px",
      height: "40px"
    },
    md: {
      paddingTop: "8px",
      paddingRight: "16px",
      paddingBottom: "8px",
      paddingLeft: "16px",
      fontSize: "16px",
      minWidth: "112px",
      height: "48px"
    },
    lg: {
      paddingTop: "10px",
      paddingRight: "20px",
      paddingBottom: "10px",
      paddingLeft: "20px",
      fontSize: "16px",
      minWidth: "112px",
      height: "52px"
    },
    xl: {
      paddingTop: "12px",
      paddingRight: "24px",
      paddingBottom: "12px",
      paddingLeft: "24px",
      fontSize: "18px",
      minWidth: "142px",
      height: "60px"
    }
  };
  return sizeMap[size];
};
var getShapeStyles = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "12px" };
  }
};
var getIconSize = (buttonSize) => {
  const iconSizeMap = {
    xs: "sm",
    sm: "sm",
    md: "md",
    lg: "md",
    xl: "lg"
  };
  return iconSizeMap[buttonSize];
};
var getIconOnlyStyles = (size, shape) => {
  const sizeStyles = getSizeStyles(size);
  const height = sizeStyles.height;
  return {
    width: height,
    // Make width equal to height for square/circle
    minWidth: height,
    // Override minWidth from size styles
    paddingLeft: "0",
    // Center the icon
    paddingRight: "0",
    // Center the icon
    aspectRatio: "1"
    // Ensure 1:1 aspect ratio
  };
};
var createBaseStyles = (fullWidth, isDisabled, hasIcon, shape, animationsEnabled, rounded) => {
  const finalShape = shape;
  return __spreadValues({
    width: fullWidth ? "100%" : "auto",
    opacity: isDisabled ? 0.6 : 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
    pointerEvents: isDisabled ? "none" : "auto",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), transform var(--duration-fast) var(--animation-smooth), box-shadow var(--duration-fast) var(--animation-smooth)" : "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    fontWeight: "500",
    outline: "none",
    position: "relative",
    fontFamily: "inherit",
    userSelect: "none"
  }, getShapeStyles(finalShape));
};
var getIsometricContainerStyles = () => ({
  position: "relative",
  display: "inline-block"
});
var getIsometricButtonStyles = (color, variant, animationsEnabled) => {
  const baseStyles = {
    position: "relative",
    zIndex: 1,
    transform: "translate(0, 0)",
    transition: animationsEnabled ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none"
  };
  if (variant === "solid") {
    return __spreadProps(__spreadValues({}, baseStyles), {
      borderTopColor: color.foreground,
      borderRightColor: color.foreground,
      borderLeftColor: color.foreground,
      borderBottomColor: color.foreground
    });
  }
  return baseStyles;
};
var getIsometricShadowStyles = (color, variant, shape, size, animationsEnabled) => {
  if (variant === "ghost" || variant === "glassmorphic") {
    return { display: "none" };
  }
  const shapeStyles = getShapeStyles(shape);
  const baseStyles = __spreadProps(__spreadValues({
    position: "absolute",
    top: "4px",
    left: "4px",
    width: "100%",
    height: "100%"
  }, shapeStyles), {
    // Apply the same border radius as the button
    zIndex: 0,
    transition: animationsEnabled ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
    transform: "translate(0, 0)"
  });
  if (variant === "solid") {
    return __spreadProps(__spreadValues({}, baseStyles), {
      backgroundColor: color.foreground
      // White background for solid variant
    });
  } else {
    return __spreadProps(__spreadValues({}, baseStyles), {
      backgroundColor: color.main
    });
  }
};
var renderIcon = (iconElement, buttonSize) => {
  if (!iconElement) return null;
  if (React22.isValidElement(iconElement)) {
    return React22.cloneElement(iconElement, {
      size: getIconSize(buttonSize)
    });
  }
  return iconElement;
};
var createTextContainer = (children) => /* @__PURE__ */ React22.createElement("span", { style: {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
} }, children);
var createCenteredContent = (icon, iconPosition, buttonSize, children) => {
  const hasChildren = Boolean(children && (typeof children === "string" ? children.trim() : children));
  if (!hasChildren) {
    return /* @__PURE__ */ React22.createElement("span", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, renderIcon(icon, buttonSize));
  }
  const getSpacing = (size) => {
    const spacingMap = {
      xs: "2px",
      sm: "3px",
      md: "4px",
      lg: "5px",
      xl: "6px"
    };
    return spacingMap[size];
  };
  const spacing = getSpacing(buttonSize);
  return /* @__PURE__ */ React22.createElement("span", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing
  } }, iconPosition === "leading" && renderIcon(icon, buttonSize), /* @__PURE__ */ React22.createElement("span", null, children), iconPosition === "trailing" && renderIcon(icon, buttonSize));
};

// src/app/components/atoms/ProgressIndicator/ProgressIndicator.styles.ts
var getColorVariables2 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      border: cssVars.primaryBorder,
      shadow: cssVars.primaryShadow
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      border: cssVars.secondaryBorder,
      shadow: cssVars.secondaryShadow
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      border: cssVars.successBorder,
      shadow: cssVars.successShadow
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      border: cssVars.warningBorder,
      shadow: cssVars.warningShadow
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      border: cssVars.destructiveBorder,
      shadow: cssVars.destructiveShadow
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      border: cssVars.infoBorder,
      shadow: cssVars.infoShadow
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles2 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "12px" };
  }
};
var getSizeConfig = (size) => {
  const configs = {
    xs: {
      height: "4px",
      spinnerSize: "16px",
      spinnerThickness: "2px",
      circularSize: "24px",
      circularThickness: "2px",
      fontSize: "10px"
    },
    sm: {
      height: "6px",
      spinnerSize: "20px",
      spinnerThickness: "2px",
      circularSize: "32px",
      circularThickness: "3px",
      fontSize: "11px"
    },
    md: {
      height: "8px",
      spinnerSize: "24px",
      spinnerThickness: "3px",
      circularSize: "40px",
      circularThickness: "4px",
      fontSize: "12px"
    },
    lg: {
      height: "12px",
      spinnerSize: "32px",
      spinnerThickness: "4px",
      circularSize: "48px",
      circularThickness: "5px",
      fontSize: "14px"
    },
    xl: {
      height: "16px",
      spinnerSize: "40px",
      spinnerThickness: "5px",
      circularSize: "56px",
      circularThickness: "6px",
      fontSize: "16px"
    }
  };
  return configs[size];
};
var createProgressIndicatorContainerStyles = (shape, width, height, animationsEnabled) => {
  return __spreadValues({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    width: width || "auto",
    height: height || "auto",
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-smooth)" : "none"
  }, getShapeStyles2(shape));
};
var getBarProgressStyles = (color, customColor, variant, size, shape, width, disabled, animationsEnabled, cssVars) => {
  const colors = getColorVariables2(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const baseStyles = __spreadValues({
    position: "relative",
    width: width || "200px",
    height: sizeConfig.height,
    overflow: "visible",
    // Allow text to overflow outside the bar
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth)" : "none"
  }, getShapeStyles2(shape));
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.background,
          border: "none"
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          border: `1px solid transparent`
        };
      case "glassmorphic":
        const reflectionColor = colors.hover || colors.main || "#ffffff";
        const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
        const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
        return {
          background: `
            ${topReflectionGradient},
            ${bottomReflectionGradient},
            ${colors.background}
          `,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${colors.border || cssVars.border}`,
          boxShadow: `0 8px 32px 0 ${colors.shadow || "rgba(31, 38, 135, 0.37)"}`,
          position: "relative",
          overflow: "visible"
          // Allow text to overflow even for glassmorphic
        };
      case "outline":
      default:
        return {
          backgroundColor: cssVars.muted,
          border: `1px solid ${cssVars.border}`
        };
    }
  })();
  if (disabled) {
    baseStyles.opacity = 0.6;
  }
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getProgressFillStyles = (color, customColor, variant, size, shape, progress, striped, stripedAnimation, indeterminate, animationsEnabled, cssVars) => {
  const colors = getColorVariables2(color, customColor, cssVars);
  const baseStyles = __spreadValues({
    height: "100%",
    transition: animationsEnabled && !indeterminate ? "width var(--duration-smooth) var(--animation-smooth)" : "none",
    position: "relative"
  }, getShapeStyles2(shape));
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.accent || colors.main
        };
      case "ghost":
        return {
          backgroundColor: colors.main
        };
      case "glassmorphic":
        const reflectionColor = colors.hover || colors.main || "#ffffff";
        const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}30 20%, ${reflectionColor}25 25%, transparent 35%)`;
        const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}35 55%, ${reflectionColor}30 65%, transparent 80%)`;
        return {
          background: `
            ${topReflectionGradient},
            ${bottomReflectionGradient},
            ${colors.accent || colors.main}
          `,
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)"
        };
      case "outline":
      default:
        return {
          backgroundColor: colors.main
        };
    }
  })();
  if (indeterminate) {
    baseStyles.width = "30%";
    baseStyles.animation = animationsEnabled ? "progress-indeterminate 2s ease-in-out infinite" : "none";
  } else {
    baseStyles.width = `${Math.max(0, Math.min(100, progress))}%`;
  }
  if (striped) {
    baseStyles.backgroundImage = `linear-gradient(45deg,
      rgba(255,255,255,.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255,255,255,.15) 50%,
      rgba(255,255,255,.15) 75%,
      transparent 75%,
      transparent)`;
    baseStyles.backgroundSize = "1rem 1rem";
    if (stripedAnimation && animationsEnabled) {
      baseStyles.animation = "progress-stripes 1s linear infinite";
    }
  }
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getCircularProgressStyles = (color, customColor, variant, size, progress, disabled, animationsEnabled, cssVars) => {
  const colors = getColorVariables2(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const baseStyles = {
    width: sizeConfig.circularSize,
    height: sizeConfig.circularSize,
    opacity: disabled ? 0.6 : 1
  };
  if (variant === "glassmorphic") {
    const reflectionColor = colors.hover || colors.main || "#ffffff";
    const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
    const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
    return __spreadProps(__spreadValues({}, baseStyles), {
      background: `
        ${topReflectionGradient},
        ${bottomReflectionGradient},
        ${colors.background}
      `,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: "50%",
      border: `1px solid ${colors.border || cssVars.border}`,
      boxShadow: `0 8px 32px 0 ${colors.shadow || "rgba(31, 38, 135, 0.37)"}`,
      position: "relative",
      overflow: "hidden"
    });
  }
  return baseStyles;
};
var getCircularProgressSVGStyles = (color, customColor, variant, size, cssVars) => {
  const colors = getColorVariables2(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const getVariantStyles14 = () => {
    switch (variant) {
      case "solid":
        return {
          track: {
            stroke: colors.background
          },
          progress: {
            stroke: colors.accent || colors.main
          }
        };
      case "ghost":
        return {
          track: {
            stroke: "transparent"
          },
          progress: {
            stroke: colors.main
          }
        };
      case "glassmorphic":
        const reflectionColor = colors.hover || colors.main || "#ffffff";
        return {
          track: {
            stroke: colors.background,
            strokeOpacity: 1
          },
          progress: {
            stroke: `url(#glassmorphic-gradient-${color})`
          },
          gradientDefs: {
            gradientId: `glassmorphic-gradient-${color}`,
            stops: [
              { offset: "0%", stopColor: colors.accent || colors.main, stopOpacity: 1 },
              { offset: "50%", stopColor: reflectionColor, stopOpacity: 0.8 },
              { offset: "100%", stopColor: colors.accent || colors.main, stopOpacity: 1 }
            ]
          }
        };
      case "outline":
      default:
        return {
          track: {
            stroke: cssVars.muted
          },
          progress: {
            stroke: colors.main
          }
        };
    }
  };
  const variantStyles = getVariantStyles14();
  return {
    svg: {
      width: "100%",
      height: "100%",
      transform: "rotate(-90deg)"
    },
    track: __spreadValues({
      fill: "none",
      strokeWidth: sizeConfig.circularThickness
    }, variantStyles.track),
    progress: __spreadValues({
      fill: "none",
      strokeWidth: sizeConfig.circularThickness,
      strokeLinecap: "round",
      transition: "stroke-dashoffset var(--duration-smooth) var(--animation-smooth)"
    }, variantStyles.progress),
    circumference,
    radius,
    gradientDefs: variantStyles.gradientDefs
  };
};
var getCircularIndeterminateProgressSVGStyles = (color, customColor, variant, size, animationsEnabled, cssVars) => {
  const colors = getColorVariables2(color, customColor, cssVars);
  const sizeConfig = getSizeConfig(size);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference * 0.3;
  const gapLength = circumference - segmentLength;
  const getVariantStyles14 = () => {
    switch (variant) {
      case "solid":
        return {
          track: {
            stroke: colors.background
          },
          progress: {
            stroke: colors.accent || colors.main
          }
        };
      case "ghost":
        return {
          track: {
            stroke: "transparent"
          },
          progress: {
            stroke: colors.main
          }
        };
      case "glassmorphic":
        const reflectionColor = colors.hover || colors.main || "#ffffff";
        return {
          track: {
            stroke: colors.background,
            strokeOpacity: 1
          },
          progress: {
            stroke: `url(#glassmorphic-indeterminate-gradient-${color})`
          },
          gradientDefs: {
            gradientId: `glassmorphic-indeterminate-gradient-${color}`,
            stops: [
              { offset: "0%", stopColor: colors.accent || colors.main, stopOpacity: 1 },
              { offset: "50%", stopColor: reflectionColor, stopOpacity: 0.8 },
              { offset: "100%", stopColor: colors.accent || colors.main, stopOpacity: 1 }
            ]
          }
        };
      case "outline":
      default:
        return {
          track: {
            stroke: cssVars.muted
          },
          progress: {
            stroke: colors.main
          }
        };
    }
  };
  const variantStyles = getVariantStyles14();
  return {
    svg: {
      width: "100%",
      height: "100%",
      transform: "rotate(-90deg)",
      animation: animationsEnabled ? "progress-circular-indeterminate 2s linear infinite" : "none"
    },
    track: __spreadValues({
      fill: "none",
      strokeWidth: sizeConfig.circularThickness
    }, variantStyles.track),
    progress: __spreadValues({
      fill: "none",
      strokeWidth: sizeConfig.circularThickness,
      strokeLinecap: "round",
      strokeDasharray: `${segmentLength} ${gapLength}`,
      strokeDashoffset: 0
    }, variantStyles.progress),
    circumference,
    radius,
    segmentLength,
    gradientDefs: variantStyles.gradientDefs
  };
};
var getProgressTextStyles = (size, color, customColor, cssVars) => {
  const sizeConfig = getSizeConfig(size);
  const colors = getColorVariables2(color, customColor, cssVars);
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: colors.main,
    textAlign: "center",
    lineHeight: 1,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    zIndex: 1
  };
};
var getCircularTextStyles = (size, color, customColor, cssVars) => {
  const sizeConfig = getSizeConfig(size);
  const colors = getColorVariables2(color, customColor, cssVars);
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: colors.main,
    textAlign: "center",
    lineHeight: 1,
    whiteSpace: "nowrap",
    pointerEvents: "none"
  };
};

// src/app/components/atoms/ProgressIndicator/ProgressIndicator.tsx
var ProgressIndicator = forwardRef((allProps, ref) => {
  var _b;
  const [containerProps, componentProps] = extractContainerProps(allProps);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = "outline",
    // ProgressIndicator-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded
    // Legacy support
  } = containerProps;
  const _a = componentProps, {
    type = "bar",
    value = 0,
    max = 100,
    showPercentage = false,
    showValue = false,
    label,
    duration = 300,
    striped = false,
    stripedAnimation = false,
    indeterminate = false,
    autoProgress = false,
    autoProgressDuration = 3e3,
    preset,
    trackSize = "md"
  } = _a, restProps = __objRest(_a, [
    "type",
    "value",
    "max",
    "showPercentage",
    "showValue",
    "label",
    "duration",
    "striped",
    "stripedAnimation",
    "indeterminate",
    "autoProgress",
    "autoProgressDuration",
    "preset",
    "trackSize"
  ]);
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    if (!autoProgress || indeterminate) {
      setCurrentValue(value);
      return;
    }
    setCurrentValue(0);
    const incrementInterval = 50;
    const totalSteps = autoProgressDuration / incrementInterval;
    const incrementAmount = max / totalSteps;
    let currentStep = 0;
    let hasReset = false;
    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.min(incrementAmount * currentStep, max);
      setCurrentValue(newValue);
      if (newValue >= max && !hasReset) {
        hasReset = true;
        setTimeout(() => {
          setCurrentValue(0);
          currentStep = 0;
          hasReset = false;
        }, 500);
      }
    }, incrementInterval);
    return () => clearInterval(interval);
  }, [autoProgress, autoProgressDuration, max, indeterminate, value]);
  const actualValue = autoProgress && !indeterminate ? currentValue : value;
  const percentage = useMemo(() => {
    return Math.min(Math.max(actualValue / max * 100, 0), 100);
  }, [actualValue, max]);
  const containerStyles = useMemo(
    () => createProgressIndicatorContainerStyles(shape, width, height, animationsEnabled),
    [shape, width, height, animationsEnabled]
  );
  const combinedStyles = __spreadValues(__spreadValues({}, containerStyles), style);
  const accessibilityLabel = label || (indeterminate ? "Loading" : `Progress: ${Math.round(percentage)}%`);
  switch (type) {
    case "bar":
    case "progressBar": {
      const barStyles = getBarProgressStyles(color, customColor, variant, size, shape, width, disabled, animationsEnabled, cssVars);
      const fillStyles = getProgressFillStyles(color, customColor, variant, size, shape, percentage, striped, stripedAnimation, indeterminate, animationsEnabled, cssVars);
      const textStyles = getProgressTextStyles(size, color, customColor, cssVars);
      return /* @__PURE__ */ React22.createElement(React22.Fragment, null, animationsEnabled && /* @__PURE__ */ React22.createElement("style", { jsx: true, global: true }, `
              @keyframes progress-indeterminate {
                0% { left: 0%; }
                100% { left: 70%; }
              }
              @keyframes progress-stripes {
                from { background-position: 1rem 0; }
                to { background-position: 0 0; }
              }
            `), /* @__PURE__ */ React22.createElement(
        "div",
        __spreadValues({
          ref,
          className,
          style: combinedStyles,
          role: "progressbar",
          "aria-label": accessibilityLabel,
          "aria-valuenow": value,
          "aria-valuemin": 0,
          "aria-valuemax": max,
          id,
          "data-testid": dataTestId
        }, restProps),
        /* @__PURE__ */ React22.createElement("div", { style: barStyles }, /* @__PURE__ */ React22.createElement("div", { style: fillStyles }), (showPercentage || showValue) && /* @__PURE__ */ React22.createElement("div", { style: textStyles }, showValue ? `${value}/${max}` : `${Math.round(percentage)}%`))
      ));
    }
    case "circular": {
      if (indeterminate) {
        const circularStyles2 = getCircularProgressStyles(color, customColor, variant, size, percentage, disabled, animationsEnabled, cssVars);
        const svgStyles2 = getCircularIndeterminateProgressSVGStyles(color, customColor, variant, size, animationsEnabled, cssVars);
        const textStyles2 = getCircularTextStyles(size, color, customColor, cssVars);
        return /* @__PURE__ */ React22.createElement(React22.Fragment, null, animationsEnabled && /* @__PURE__ */ React22.createElement("style", { jsx: true, global: true }, `
                @keyframes progress-circular-indeterminate {
                  0% {
                    transform: rotate(-90deg);
                  }
                  100% {
                    transform: rotate(270deg);
                  }
                }
              `), /* @__PURE__ */ React22.createElement(
          "div",
          __spreadValues({
            ref,
            className,
            style: __spreadValues(__spreadValues({}, combinedStyles), circularStyles2),
            role: "status",
            "aria-label": accessibilityLabel,
            id,
            "data-testid": dataTestId
          }, restProps),
          /* @__PURE__ */ React22.createElement("svg", { style: svgStyles2.svg, viewBox: "0 0 36 36" }, svgStyles2.gradientDefs && /* @__PURE__ */ React22.createElement("defs", null, /* @__PURE__ */ React22.createElement(
            "linearGradient",
            {
              id: svgStyles2.gradientDefs.gradientId,
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "0%"
            },
            svgStyles2.gradientDefs.stops.map((stop, index) => /* @__PURE__ */ React22.createElement(
              "stop",
              {
                key: index,
                offset: stop.offset,
                stopColor: stop.stopColor,
                stopOpacity: stop.stopOpacity
              }
            ))
          )), /* @__PURE__ */ React22.createElement(
            "path",
            {
              style: svgStyles2.track,
              d: "M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
            }
          ), /* @__PURE__ */ React22.createElement(
            "path",
            {
              style: svgStyles2.progress,
              d: "M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
            }
          )),
          (showPercentage || showValue) && /* @__PURE__ */ React22.createElement("div", { style: textStyles2 }, showValue ? `${actualValue}/${max}` : `${Math.round(percentage)}%`)
        ));
      }
      const circularStyles = getCircularProgressStyles(color, customColor, variant, size, percentage, disabled, animationsEnabled, cssVars);
      const svgStyles = getCircularProgressSVGStyles(color, customColor, variant, size, cssVars);
      const textStyles = getCircularTextStyles(size, color, customColor, cssVars);
      const strokeDasharray = svgStyles.circumference;
      const strokeDashoffset = svgStyles.circumference - percentage / 100 * svgStyles.circumference;
      return /* @__PURE__ */ React22.createElement(
        "div",
        __spreadValues({
          ref,
          className,
          style: __spreadValues(__spreadValues({}, combinedStyles), circularStyles),
          role: "progressbar",
          "aria-label": accessibilityLabel,
          "aria-valuenow": value,
          "aria-valuemin": 0,
          "aria-valuemax": max,
          id,
          "data-testid": dataTestId
        }, restProps),
        /* @__PURE__ */ React22.createElement("svg", { style: svgStyles.svg, viewBox: "0 0 36 36" }, svgStyles.gradientDefs && /* @__PURE__ */ React22.createElement("defs", null, /* @__PURE__ */ React22.createElement(
          "linearGradient",
          {
            id: svgStyles.gradientDefs.gradientId,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "0%"
          },
          svgStyles.gradientDefs.stops.map((stop, index) => /* @__PURE__ */ React22.createElement(
            "stop",
            {
              key: index,
              offset: stop.offset,
              stopColor: stop.stopColor,
              stopOpacity: stop.stopOpacity
            }
          ))
        )), /* @__PURE__ */ React22.createElement(
          "path",
          {
            style: svgStyles.track,
            d: "M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
          }
        ), /* @__PURE__ */ React22.createElement(
          "path",
          {
            style: __spreadProps(__spreadValues({}, svgStyles.progress), {
              strokeDasharray,
              strokeDashoffset
            }),
            d: "M18,2.0845 a 16,16 0 0,1 0,32 a 16,16 0 0,1 0,-32"
          }
        )),
        (showPercentage || showValue) && /* @__PURE__ */ React22.createElement("div", { style: textStyles }, showValue ? `${value}/${max}` : `${Math.round(percentage)}%`)
      );
    }
    default: {
      const barStyles = getBarProgressStyles(color, customColor, variant, size, shape, width, disabled, animationsEnabled, cssVars);
      const fillStyles = getProgressFillStyles(color, customColor, variant, size, shape, percentage, striped, stripedAnimation, indeterminate, animationsEnabled, cssVars);
      const textStyles = getProgressTextStyles(size, color, customColor, cssVars);
      return /* @__PURE__ */ React22.createElement(React22.Fragment, null, animationsEnabled && /* @__PURE__ */ React22.createElement("style", { jsx: true, global: true }, `
              @keyframes progress-indeterminate {
                0% { left: 0%; }
                100% { left: 70%; }
              }
              @keyframes progress-stripes {
                from { background-position: 1rem 0; }
                to { background-position: 0 0; }
              }
            `), /* @__PURE__ */ React22.createElement(
        "div",
        __spreadValues({
          ref,
          className,
          style: combinedStyles,
          role: "progressbar",
          "aria-label": accessibilityLabel,
          "aria-valuenow": actualValue,
          "aria-valuemin": 0,
          "aria-valuemax": max,
          id,
          "data-testid": dataTestId
        }, restProps),
        /* @__PURE__ */ React22.createElement("div", { style: barStyles }, /* @__PURE__ */ React22.createElement("div", { style: fillStyles }), (showPercentage || showValue) && /* @__PURE__ */ React22.createElement("div", { style: textStyles }, showValue ? `${actualValue}/${max}` : `${Math.round(percentage)}%`))
      ));
    }
  }
});
ProgressIndicator.displayName = "ProgressIndicator";
var useAsyncClick = ({ loadingKey, onAsyncClick, onClick }) => {
  const { startLoading, stopLoading } = useLoading();
  const { success, error } = useToast();
  const handleAsyncClick = useCallback(async (e) => {
    if (onAsyncClick) {
      const key = loadingKey || "button-action";
      try {
        startLoading(key);
        await onAsyncClick();
        success("Action completed successfully");
      } catch (err) {
        error("Action failed", err instanceof Error ? err.message : "Unknown error");
      } finally {
        stopLoading(key);
      }
    } else if (onClick) {
      onClick(e);
    }
  }, [loadingKey, onAsyncClick, onClick, startLoading, stopLoading, success, error]);
  return handleAsyncClick;
};
var useButtonHover = ({ variant, isDisabled, animationsEnabled, cssVars, hasIsometricAnimation, colors }) => {
  const handleMouseEnter = useCallback((e) => {
    if (!isDisabled && animationsEnabled) {
      if (hasIsometricAnimation && variant !== "ghost" && variant !== "glassmorphic") {
        e.currentTarget.style.transform = "translate(3px, 3px)";
        const container = e.currentTarget.parentElement;
        if (container) {
          const shadowElement = container.querySelector("div:first-child");
          if (shadowElement) {
            shadowElement.style.transform = "translate(-1px, -1px)";
          }
        }
      } else if (variant === "outline" || variant === "ghost") {
        const hoverBg = (colors == null ? void 0 : colors.background) || (colors == null ? void 0 : colors.hover) || cssVars.primaryBackground;
        e.currentTarget.style.backgroundColor = hoverBg;
      } else {
        e.currentTarget.style.opacity = "0.8";
      }
    }
  }, [variant, isDisabled, animationsEnabled, cssVars, hasIsometricAnimation, colors]);
  const handleMouseLeave = useCallback((e) => {
    if (!isDisabled) {
      if (hasIsometricAnimation && variant !== "ghost" && variant !== "glassmorphic") {
        e.currentTarget.style.transform = "translate(0, 0)";
        const container = e.currentTarget.parentElement;
        if (container) {
          const shadowElement = container.querySelector("div:first-child");
          if (shadowElement) {
            shadowElement.style.transform = "translate(0, 0)";
          }
        }
      } else if (variant === "outline" || variant === "ghost") {
        e.currentTarget.style.backgroundColor = "transparent";
      } else {
        e.currentTarget.style.opacity = isDisabled ? "0.6" : "1";
      }
    }
  }, [variant, isDisabled, hasIsometricAnimation, colors]);
  return { handleMouseEnter, handleMouseLeave };
};
var ParallaxTiltWrapper = ({
  children,
  disabled = false,
  className,
  style
}) => {
  if (disabled) {
    return /* @__PURE__ */ React22.createElement("div", { className, style }, children);
  }
  let childBorderRadius = "0px";
  let childBoxShadow = "none";
  let shouldPreserveShadow = false;
  if (isValidElement(children) && children.props && typeof children.props === "object") {
    const childProps = children.props;
    const childStyle = childProps.style;
    if (childStyle == null ? void 0 : childStyle.borderRadius) {
      childBorderRadius = childStyle.borderRadius;
    }
    if (childStyle == null ? void 0 : childStyle.boxShadow) {
      childBoxShadow = childStyle.boxShadow;
      shouldPreserveShadow = childBoxShadow.includes("32px") || childBoxShadow.includes("40px");
    }
  }
  return /* @__PURE__ */ React22.createElement(
    Tilt,
    {
      className,
      style: __spreadValues({
        borderRadius: childBorderRadius,
        // Only use overflow hidden if we don't need to preserve shadows
        overflow: shouldPreserveShadow ? "visible" : "hidden",
        // Apply the child's box shadow to the wrapper if it's a glassmorphic shadow
        boxShadow: shouldPreserveShadow ? childBoxShadow : "none"
      }, style),
      tiltReverse: true,
      tiltMaxAngleX: 8,
      tiltMaxAngleY: 8,
      perspective: 1200,
      scale: 1,
      transitionSpeed: 300,
      gyroscope: true,
      glareEnable: true,
      glareMaxOpacity: 0.3,
      glareColor: "#ffffff",
      glarePosition: "all",
      glareReverse: false,
      glareBorderRadius: childBorderRadius
    },
    shouldPreserveShadow && isValidElement(children) && children.props && typeof children.props === "object" ? cloneElement(children, {
      style: __spreadProps(__spreadValues({}, children.props.style), {
        boxShadow: "none"
      })
    }) : children
  );
};
var TypewriterText = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  showCursor = true,
  cursorChar = "|",
  disabled = false,
  children,
  waitTime,
  // Will be calculated randomly if not provided
  loop = "infinite"
  // Default to infinite loop for backward compatibility
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [phase, setPhase] = useState("typing");
  const [cycleCount, setCycleCount] = useState(0);
  useEffect(() => {
    if (disabled) {
      setDisplayText(text);
      return;
    }
    let timeout;
    switch (phase) {
      case "typing":
        if (currentIndex < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          }, speed);
        } else {
          const randomWaitTime = waitTime || 6e3 + Math.random() * 2e3;
          timeout = setTimeout(() => {
            setPhase("deleting");
          }, randomWaitTime);
        }
        break;
      case "deleting":
        if (currentIndex > 0) {
          timeout = setTimeout(() => {
            setCurrentIndex(currentIndex - 1);
            setDisplayText(text.slice(0, currentIndex - 1));
          }, deleteSpeed);
        } else {
          const shouldContinueLooping = loop === "infinite" || cycleCount < loop - 1;
          if (shouldContinueLooping) {
            setCycleCount(cycleCount + 1);
            setPhase("typing");
          } else {
            setDisplayText(text);
            setCurrentIndex(text.length);
            setPhase("typing");
          }
        }
        break;
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, deleteSpeed, disabled, phase, waitTime]);
  useEffect(() => {
    if (disabled) return;
    const cursorInterval = setInterval(() => {
      setShowCursorBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [disabled]);
  useEffect(() => {
    if (!disabled) {
      setCurrentIndex(0);
      setDisplayText("");
      setPhase("typing");
      setCycleCount(0);
    }
  }, [text, disabled]);
  if (disabled) {
    return /* @__PURE__ */ React22.createElement(React22.Fragment, null, children || text);
  }
  return /* @__PURE__ */ React22.createElement(React22.Fragment, null, displayText, showCursor && /* @__PURE__ */ React22.createElement(
    "span",
    {
      style: {
        opacity: showCursorBlink ? 1 : 0,
        transition: "opacity 0.1s ease-in-out"
      }
    },
    cursorChar
  ));
};

// src/app/components/atoms/Button/Button.tsx
var Button = forwardRef((allProps, ref) => {
  var _b;
  const [interactiveProps, componentProps] = extractInteractiveProps(allProps);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    animationMode = UNIVERSAL_DEFAULTS.animationMode,
    fullWidth,
    onMouseEnter: universalOnMouseEnter,
    onMouseLeave: universalOnMouseLeave
  } = interactiveProps;
  const _a = componentProps, {
    icon,
    iconPosition = "leading",
    onAsyncClick,
    onClick,
    children
  } = _a, restProps = __objRest(_a, [
    "icon",
    "iconPosition",
    "onAsyncClick",
    "onClick",
    "children"
  ]);
  const cssVars = useCSSVariables();
  const { isLoading } = useLoading();
  const { settings } = useSettings();
  const isButtonLoading = loading || loadingKey && isLoading(loadingKey);
  const isDisabled = Boolean(disabled) || isButtonLoading;
  const hasIcon = Boolean(icon);
  const hasChildren = Boolean(children && (typeof children === "string" ? children.trim() : children));
  const isIconOnly = hasIcon && !hasChildren;
  const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
  const useAnimationMode = animationsEnabled && animationMode !== "none";
  const shouldUseDefaultAnimations = useAnimationMode && animationMode === "default";
  const hasIsometricAnimation = useAnimationMode && animationMode === "isometric" && variant !== "ghost" && variant !== "glassmorphic";
  const shouldUseHoverEffects = useAnimationMode && (animationMode === "default" || animationMode === "typewriter" || hasIsometricAnimation || animationMode === "isometric" && (variant === "ghost" || variant === "glassmorphic"));
  const handleAsyncClick = useAsyncClick({ loadingKey, onAsyncClick, onClick });
  const { handleMouseEnter, handleMouseLeave } = useButtonHover({
    variant,
    isDisabled: Boolean(isDisabled),
    animationsEnabled: shouldUseHoverEffects,
    cssVars,
    hasIsometricAnimation,
    colors: getColorVariables(color, customColor, cssVars)
  });
  const combinedMouseEnter = (e) => {
    universalOnMouseEnter == null ? void 0 : universalOnMouseEnter(e);
    handleMouseEnter(e);
  };
  const combinedMouseLeave = (e) => {
    universalOnMouseLeave == null ? void 0 : universalOnMouseLeave(e);
    handleMouseLeave(e);
  };
  const baseStyles = useMemo(() => createBaseStyles(
    Boolean(fullWidth),
    Boolean(isDisabled),
    hasIcon,
    shape,
    shouldUseDefaultAnimations
  ), [fullWidth, isDisabled, hasIcon, shape, shouldUseDefaultAnimations]);
  const variantStyles = useMemo(() => getVariantStyles(color, variant, customColor, cssVars), [color, variant, customColor, cssVars]);
  const sizeStyles = useMemo(() => getSizeStyles(size), [size]);
  const iconOnlyStyles = useMemo(() => isIconOnly ? getIconOnlyStyles(size) : {}, [isIconOnly, size, shape]);
  const isometricContainerStyles = useMemo(() => hasIsometricAnimation ? getIsometricContainerStyles() : {}, [hasIsometricAnimation]);
  const isometricButtonStyles = useMemo(() => hasIsometricAnimation ? getIsometricButtonStyles(getColorVariables(color, customColor, cssVars), variant, animationsEnabled) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, animationsEnabled]);
  const isometricShadowStyles = useMemo(() => hasIsometricAnimation ? getIsometricShadowStyles(getColorVariables(color, customColor, cssVars), variant, shape, sizeStyles, animationsEnabled) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, shape, sizeStyles, animationsEnabled]);
  const combinedStyles = __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), sizeStyles), variantStyles), iconOnlyStyles), isometricButtonStyles), {
    // Apply isometric button styles
    width,
    height
  }), style);
  const renderTextContent = useMemo(() => {
    if (useAnimationMode && animationMode === "typewriter" && typeof children === "string") {
      return /* @__PURE__ */ React22.createElement(
        TypewriterText,
        {
          text: children,
          disabled: isDisabled || !useAnimationMode,
          speed: 100
        }
      );
    }
    return children;
  }, [children, useAnimationMode, animationMode, isDisabled]);
  const renderContent = () => {
    if (isButtonLoading) {
      const spinnerSize = size === "xs" ? "xs" : size === "sm" ? "xs" : "sm";
      const spinnerColor = color;
      return /* @__PURE__ */ React22.createElement(
        ProgressIndicator,
        {
          type: "circular",
          size: spinnerSize,
          color: spinnerColor
        }
      );
    }
    return /* @__PURE__ */ React22.createElement(React22.Fragment, null, hasIcon ? createCenteredContent(icon, iconPosition, size, renderTextContent) : createTextContainer(renderTextContent));
  };
  const buttonElement = /* @__PURE__ */ React22.createElement(
    "button",
    __spreadValues({
      ref,
      id,
      disabled: Boolean(isDisabled),
      onClick: handleAsyncClick,
      onMouseEnter: combinedMouseEnter,
      onMouseLeave: combinedMouseLeave,
      style: combinedStyles,
      className: className || "",
      "data-testid": dataTestId
    }, restProps),
    renderContent()
  );
  const isometricWrappedButton = hasIsometricAnimation ? /* @__PURE__ */ React22.createElement("div", { style: isometricContainerStyles }, /* @__PURE__ */ React22.createElement("div", { style: isometricShadowStyles }), buttonElement) : buttonElement;
  if (useAnimationMode && animationMode === "parallax") {
    return /* @__PURE__ */ React22.createElement(
      ParallaxTiltWrapper,
      {
        disabled: isDisabled || !useAnimationMode
      },
      isometricWrappedButton
    );
  }
  return isometricWrappedButton;
});
Button.displayName = "Button";

// src/app/components/atoms/Badge/Badge.styles.ts
var getColorVariables4 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles4 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "9999px" };
  }
};
var getVariantStyles2 = (color, customColor, variant, disabled, cssVars) => {
  const colors = getColorVariables4(color, customColor, cssVars);
  const baseStyles = {
    borderTopWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "1px",
    borderLeftWidth: "1px",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? "not-allowed" : "default"
  };
  switch (variant) {
    case "solid":
      return __spreadValues({
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderBottomColor: colors.main,
        borderLeftColor: colors.main
      }, baseStyles);
    case "outline":
      return __spreadValues({
        backgroundColor: "transparent",
        color: colors.main,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border
      }, baseStyles);
    case "ghost":
      return __spreadValues({
        backgroundColor: colors.background,
        color: colors.main,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent"
      }, baseStyles);
    case "glassmorphic":
      const reflectionColor = colors.hover || colors.main || "#ffffff";
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
      return __spreadValues({
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          rgba(255, 255, 255, 0.1)
        `,
        color: colors.main,
        borderTopColor: "rgba(255, 255, 255, 0.18)",
        borderRightColor: "rgba(255, 255, 255, 0.18)",
        borderBottomColor: "rgba(255, 255, 255, 0.18)",
        borderLeftColor: "rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        // Safari support
        boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.08)"
      }, baseStyles);
    default:
      return __spreadValues({
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.main,
        borderRightColor: colors.main,
        borderBottomColor: colors.main,
        borderLeftColor: colors.main
      }, baseStyles);
  }
};
var getSizeStyles2 = (size) => {
  const sizeMap = {
    xs: {
      paddingTop: "2px",
      paddingRight: "6px",
      paddingBottom: "2px",
      paddingLeft: "6px",
      fontSize: "11px",
      height: "20px",
      minWidth: "20px",
      gap: "2px"
    },
    sm: {
      paddingTop: "3px",
      paddingRight: "8px",
      paddingBottom: "3px",
      paddingLeft: "8px",
      fontSize: "12px",
      height: "24px",
      minWidth: "24px",
      gap: "3px"
    },
    md: {
      paddingTop: "4px",
      paddingRight: "10px",
      paddingBottom: "4px",
      paddingLeft: "10px",
      fontSize: "13px",
      height: "28px",
      minWidth: "28px",
      gap: "4px"
    },
    lg: {
      paddingTop: "5px",
      paddingRight: "12px",
      paddingBottom: "5px",
      paddingLeft: "12px",
      fontSize: "14px",
      height: "32px",
      minWidth: "32px",
      gap: "5px"
    },
    xl: {
      paddingTop: "6px",
      paddingRight: "14px",
      paddingBottom: "6px",
      paddingLeft: "14px",
      fontSize: "15px",
      height: "36px",
      minWidth: "36px",
      gap: "6px"
    }
  };
  return sizeMap[size];
};
var getIconSize2 = (badgeSize) => {
  const iconSizeMap = {
    xs: "xs",
    sm: "xs",
    md: "sm",
    lg: "sm",
    xl: "md"
  };
  return iconSizeMap[badgeSize];
};
var createBaseStyles2 = (rounded, isRemovable, animationsEnabled) => {
  const finalShape = rounded ? "pill" : "round";
  return __spreadValues({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    fontWeight: "500",
    fontFamily: "inherit",
    userSelect: "none",
    whiteSpace: "nowrap",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), transform var(--duration-fast) var(--animation-smooth)" : "none",
    cursor: isRemovable ? "default" : "auto",
    position: "relative"
  }, getShapeStyles4(finalShape));
};
var getIconOnlyStyles2 = (size, shape) => {
  const sizeStyles = getSizeStyles2(size);
  const height = sizeStyles.height;
  return {
    width: height,
    // Make width equal to height for square/circle
    minWidth: height,
    // Override minWidth from size styles
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    aspectRatio: "1"
    // Ensure 1:1 aspect ratio
  };
};
var getIsometricStyles = (color, variant, shape) => {
  if (variant === "ghost" || variant === "glassmorphic") {
    return {};
  }
  const borderColor = variant === "outline" ? color.main : color.foreground || "#000000";
  const styles = {
    // Use individual border properties to avoid conflict with shorthand borderWidth
    borderTopWidth: "1px",
    borderLeftWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "4px",
    // Larger bottom border for 3D effect
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    transform: "translateY(0)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    // Ensure proper box-sizing and prevent collapse
    boxSizing: "border-box",
    position: "relative",
    // Adjust padding to account for larger bottom border
    paddingBottom: "1px"
    // Slightly reduce bottom padding to compensate
  };
  return styles;
};

// src/app/components/atoms/Icon/Icon.styles.ts
var getSizeValue = (size) => {
  if (typeof size === "number") {
    return size;
  }
  const sizeMap = {
    xs: 12,
    sm: 18,
    md: 24,
    lg: 30,
    xl: 46
  };
  return sizeMap[size];
};
var getColorValue = (color, cssVars) => {
  switch (color) {
    case "inherit":
      return "currentColor";
    case "primary":
      return cssVars.primary;
    case "secondary":
      return cssVars.secondary;
    case "success":
      return cssVars.success;
    case "warning":
      return cssVars.warning;
    case "destructive":
      return cssVars.destructive;
    case "info":
      return cssVars.info;
    case "muted":
      return cssVars.mutedForeground;
    default:
      return color;
  }
};
var getAnimationStyles = (spin, pulse, animationsEnabled) => {
  if (!animationsEnabled) return {};
  const animations = {};
  if (spin) {
    animations.animation = "icon-spin 2s linear infinite";
  } else if (pulse) {
    animations.animation = "icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite";
  }
  return animations;
};
var createIconStyles = (sizeValue, colorValue, animationStyles, customStyle) => __spreadValues(__spreadValues({
  width: sizeValue,
  height: sizeValue,
  color: colorValue,
  flexShrink: 0,
  display: "inline-block"
}, animationStyles), customStyle);
var iconComponents = Object.entries(IconoirIcons).reduce((acc, [name, component]) => {
  if (name === "IconoirContext" || name === "IconoirProvider" || name === "default") {
    return acc;
  }
  acc[name] = component;
  return acc;
}, {});
var iconRegistry = __spreadValues({}, iconComponents);
var availableIcons = Object.keys(iconRegistry);
function getIcon(name) {
  return iconRegistry[name];
}
var iconCount = availableIcons.length;
console.log(`Icon registry loaded with ${iconCount} icons`);

// src/app/components/atoms/Icon/Icon.utils.ts
var resolveIconComponent = (name) => {
  if (typeof name === "string") {
    const IconComponent = getIcon(name);
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in registry`);
      return null;
    }
    return IconComponent;
  }
  return name;
};
var createIconProps = (sizeValue, colorValue, iconStyles, className, ref, additionalProps) => __spreadValues({
  width: sizeValue,
  height: sizeValue,
  color: colorValue,
  style: iconStyles,
  className,
  ref
}, additionalProps);
var IconAnimations = ({
  hasAnimations,
  spin,
  pulse
}) => {
  if (!hasAnimations || !spin && !pulse) {
    return null;
  }
  return /* @__PURE__ */ React22.createElement("style", { jsx: true, global: true }, `
      @keyframes icon-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      @keyframes icon-pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `);
};

// src/app/components/atoms/Icon/Icon.tsx
var Icon = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      name,
      size = "md",
      color = "inherit",
      spin = false,
      pulse = false,
      className,
      style
    } = _b, props = __objRest(_b, [
      "name",
      "size",
      "color",
      "spin",
      "pulse",
      "className",
      "style"
    ]);
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = settings.appearance.animations;
    const IconComponent = useMemo(() => resolveIconComponent(name), [name]);
    if (!IconComponent) {
      return null;
    }
    const sizeValue = useMemo(() => getSizeValue(size), [size]);
    const colorValue = useMemo(() => getColorValue(color, cssVars), [color, cssVars]);
    const animationStyles = useMemo(
      () => getAnimationStyles(spin, pulse, animationsEnabled),
      [spin, pulse, animationsEnabled]
    );
    const iconStyles = useMemo(
      () => createIconStyles(sizeValue, colorValue, animationStyles, style),
      [sizeValue, colorValue, animationStyles, style]
    );
    const iconProps = createIconProps(
      sizeValue,
      colorValue,
      iconStyles,
      className,
      ref,
      props
    );
    return /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement(
      IconAnimations,
      {
        hasAnimations: animationsEnabled,
        spin,
        pulse
      }
    ), /* @__PURE__ */ React22.createElement(IconComponent, __spreadValues({}, iconProps)));
  }
);
Icon.displayName = "Icon";

// src/app/components/atoms/Badge/Badge.utils.tsx
var renderIcon2 = (iconElement, badgeSize) => {
  if (!iconElement) return null;
  if (React22.isValidElement(iconElement)) {
    return React22.cloneElement(iconElement, {
      size: getIconSize2(badgeSize)
    });
  }
  return iconElement;
};
var createRemoveButton = (onRemove, badgeSize, cssVars, animationsEnabled) => {
  const buttonSize = badgeSize === "xs" ? "16px" : badgeSize === "sm" ? "18px" : "20px";
  const iconSize = badgeSize === "xs" ? "xs" : "sm";
  return /* @__PURE__ */ React22.createElement(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        onRemove();
      },
      style: {
        marginLeft: "0px",
        width: buttonSize,
        height: buttonSize,
        borderRadius: "50%",
        border: "none",
        backgroundColor: "transparent",
        color: "currentColor",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.7,
        transition: animationsEnabled ? "opacity 0.2s ease" : "none",
        padding: 0
      },
      onMouseEnter: (e) => {
        var _a;
        if (animationsEnabled) {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.backgroundColor = ((_a = cssVars.getColorWithOpacity) == null ? void 0 : _a.call(cssVars, "currentColor", 0.1)) || "rgba(0,0,0,0.1)";
        }
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.opacity = "0.7";
        e.currentTarget.style.backgroundColor = "transparent";
      },
      title: "Remove",
      "aria-label": "Remove badge"
    },
    /* @__PURE__ */ React22.createElement(Icon, { name: "Xmark", size: iconSize })
  );
};
var createBadgeContent = (icon, iconPosition, badgeSize, children, removable, onRemove, cssVars, animationsEnabled, useAnimationMode, animationMode, disabled) => {
  const hasIcon = Boolean(icon);
  const hasRemove = removable && onRemove;
  const shouldUseTypewriter = useAnimationMode && animationMode === "typewriter" && !disabled;
  const hasChildren = Boolean(children && (typeof children === "string" ? children.trim() : children));
  const getSpacing = (size) => {
    const spacingMap = {
      xs: "2px",
      sm: "3px",
      md: "4px",
      lg: "5px",
      xl: "6px"
    };
    return spacingMap[size];
  };
  const renderContent = () => {
    if (!hasChildren) return null;
    if (shouldUseTypewriter && typeof children === "string") {
      return /* @__PURE__ */ React22.createElement(
        TypewriterText,
        {
          text: children,
          speed: 50,
          disabled: !animationsEnabled
        }
      );
    }
    return /* @__PURE__ */ React22.createElement("span", null, children);
  };
  const spacing = getSpacing(badgeSize);
  if (!hasChildren) {
    return /* @__PURE__ */ React22.createElement(React22.Fragment, null, hasIcon && /* @__PURE__ */ React22.createElement("span", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    } }, renderIcon2(icon, badgeSize)), hasRemove && createRemoveButton(onRemove, badgeSize, cssVars, animationsEnabled || false));
  }
  return /* @__PURE__ */ React22.createElement("span", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing
  } }, hasIcon && iconPosition === "leading" && renderIcon2(icon, badgeSize), renderContent(), hasIcon && iconPosition === "trailing" && renderIcon2(icon, badgeSize), hasRemove && createRemoveButton(onRemove, badgeSize, cssVars, animationsEnabled || false));
};

// src/app/components/atoms/Badge/Badge.tsx
var Badge = forwardRef(
  (allProps, ref) => {
    var _b;
    const [containerProps, componentProps] = extractContainerProps(allProps);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = UNIVERSAL_DEFAULTS.variant,
      shape = UNIVERSAL_DEFAULTS.shape,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      loadingKey,
      width,
      height,
      className,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      animationMode = UNIVERSAL_DEFAULTS.animationMode,
      rounded,
      // Legacy support
      children
    } = containerProps;
    const _a = componentProps, {
      icon,
      iconPosition = "leading",
      removable = false,
      onRemove
    } = _a, restProps = __objRest(_a, [
      "icon",
      "iconPosition",
      "removable",
      "onRemove"
    ]);
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const hasIcon = Boolean(icon);
    const hasChildren = Boolean(children && (typeof children === "string" ? children.trim() : children));
    const isRemovable = removable && Boolean(onRemove);
    const isIconOnly = hasIcon && !hasChildren && !isRemovable;
    const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
    const useAnimationMode = animationsEnabled && animationMode !== "none";
    const hasIsometricAnimation = useAnimationMode && animationMode === "isometric" && variant !== "ghost" && variant !== "glassmorphic";
    const badgeAnimationMode = animationMode === "default" ? "none" : animationMode === "none" || animationMode === "typewriter" || animationMode === "isometric" ? animationMode : void 0;
    const baseStyles = useMemo(() => createBaseStyles2(
      shape === "pill" || Boolean(rounded),
      isRemovable,
      animationsEnabled
    ), [shape, rounded, isRemovable, animationsEnabled]);
    const variantStyles = useMemo(() => getVariantStyles2(
      color,
      customColor,
      variant,
      disabled,
      cssVars
    ), [color, customColor, variant, disabled, cssVars]);
    const sizeStyles = useMemo(() => getSizeStyles2(size), [size]);
    const iconOnlyStyles = useMemo(() => isIconOnly ? getIconOnlyStyles2(size) : {}, [isIconOnly, size, shape]);
    const isometricStyles = useMemo(() => hasIsometricAnimation ? getIsometricStyles(getColorVariables4(color, customColor, cssVars), variant) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, shape]);
    const combinedStyles = __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), sizeStyles), variantStyles), iconOnlyStyles), isometricStyles), {
      // Apply isometric styles last to override other styles
      width,
      height
    }), style);
    return /* @__PURE__ */ React22.createElement(
      "span",
      __spreadValues({
        ref,
        id,
        style: combinedStyles,
        className,
        "data-testid": dataTestId
      }, restProps),
      createBadgeContent(
        icon,
        iconPosition,
        size,
        children,
        removable,
        onRemove,
        cssVars,
        animationsEnabled,
        useAnimationMode,
        badgeAnimationMode,
        disabled
      )
    );
  }
);
Badge.displayName = "Badge";

// src/app/components/atoms/Card/Card.styles.ts
var getColorVariables5 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || {
    main: cssVars.card,
    background: cssVars.card,
    foreground: cssVars.cardForeground,
    hover: cssVars.backgroundHover,
    border: cssVars.border
  };
};
var getVariantStyles3 = (color, variant, customColor, cssVars) => {
  const colors = getColorVariables5(color, customColor, cssVars);
  const baseStyles = {
    borderTopWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "1px",
    borderLeftWidth: "1px",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid"
  };
  switch (variant) {
    case "solid":
      return __spreadValues({
        backgroundColor: colors.main,
        color: colors.foreground,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border
      }, baseStyles);
    case "outline":
      return __spreadValues({
        backgroundColor: "transparent",
        color: colors.main,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border
      }, baseStyles);
    case "ghost":
      return __spreadValues({
        backgroundColor: "transparent",
        color: colors.main,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent"
      }, baseStyles);
    case "glassmorphic":
      const reflectionColor = colors.hover || colors.main || "#ffffff";
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
      return __spreadValues({
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          rgba(255, 255, 255, 0.1)
        `,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        // Safari support
        color: colors.main,
        borderTopColor: "rgba(255, 255, 255, 0.2)",
        borderRightColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        borderLeftColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: `0 8px 32px 0 ${colors.main}40`,
        // Use card color with transparency for shadow
        position: "relative",
        overflow: "hidden"
      }, baseStyles);
    default:
      return __spreadValues({
        backgroundColor: colors.background,
        color: colors.foreground,
        borderTopColor: colors.border,
        borderRightColor: colors.border,
        borderBottomColor: colors.border,
        borderLeftColor: colors.border,
        boxShadow: cssVars.shadowSm
      }, baseStyles);
  }
};
var getSizeStyles3 = (size) => {
  const sizeMap = {
    xs: { minHeight: "40px", minWidth: "160px" },
    sm: { minHeight: "48px", minWidth: "200px" },
    md: { minHeight: "56px", minWidth: "240px" },
    lg: { minHeight: "64px", minWidth: "280px" },
    xl: { minHeight: "72px", minWidth: "320px" }
  };
  return sizeMap[size];
};
var getPaddingStyles = (padding) => {
  const paddingMap = {
    none: {
      paddingTop: "0px",
      paddingRight: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px"
    },
    xs: {
      paddingTop: "4px",
      paddingRight: "4px",
      paddingBottom: "4px",
      paddingLeft: "4px"
    },
    sm: {
      paddingTop: "8px",
      paddingRight: "8px",
      paddingBottom: "8px",
      paddingLeft: "8px"
    },
    md: {
      paddingTop: "16px",
      paddingRight: "16px",
      paddingBottom: "16px",
      paddingLeft: "16px"
    },
    lg: {
      paddingTop: "24px",
      paddingRight: "24px",
      paddingBottom: "24px",
      paddingLeft: "24px"
    },
    xl: {
      paddingTop: "32px",
      paddingRight: "32px",
      paddingBottom: "32px",
      paddingLeft: "32px"
    }
  };
  return paddingMap[padding];
};
var getShapeStyles5 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "12px" };
  }
};
var createBaseStyles3 = (fullWidth, isDisabled, shape, animationsEnabled, rounded) => {
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  return __spreadValues({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "auto",
    opacity: isDisabled ? 0.6 : 1,
    pointerEvents: isDisabled ? "none" : "auto",
    cursor: "default",
    transition: animationsEnabled ? "background-color var(--duration-medium) var(--animation-spring), border-color var(--duration-medium) var(--animation-spring), transform var(--duration-medium) var(--animation-spring), box-shadow var(--duration-medium) var(--animation-spring)" : "none",
    fontFamily: "inherit",
    fontWeight: "500",
    outline: "none"
  }, getShapeStyles5(finalShape));
};
var createClickableStyles = (clickable, disabled) => {
  if (!clickable || disabled) return {};
  return {
    cursor: "pointer",
    userSelect: "none"
    // Hover effects will be handled via JavaScript event handlers
  };
};
var createLoadingOverlayStyles = (cssVars) => ({
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: cssVars.getColorWithOpacity("background", 0.8),
  borderRadius: "inherit",
  zIndex: 10
});
var getIsometricStyles2 = (color, variant, shape) => {
  if (variant === "ghost" || variant === "glassmorphic") {
    return {};
  }
  const borderColor = variant === "outline" ? color.main : color.foreground || "#000000";
  const styles = {
    // Use individual border properties to avoid conflict with shorthand
    borderTopWidth: "1px",
    borderLeftWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "6px",
    // Larger bottom border for 3D effect (bigger than Badge since Cards are larger)
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    transform: "translateY(0)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    // Ensure proper box-sizing and prevent collapse
    boxSizing: "border-box",
    position: "relative",
    // Adjust padding to account for larger bottom border
    paddingBottom: "13px"
    // Reduce bottom padding to compensate for thicker border
  };
  return styles;
};
var handleCardClick = async (onAsyncClick, onClick, event) => {
  try {
    if (onClick && event) {
      onClick(event);
    }
    if (onAsyncClick) {
      await onAsyncClick();
    }
  } catch (error) {
    console.error("Card click error:", error);
  }
};
var createHoverHandlers = (clickable, disabled, cssVars, elementRef) => {
  if (!clickable || disabled) {
    return {
      onMouseEnter: void 0,
      onMouseLeave: void 0
    };
  }
  const handleMouseEnter = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = "translateY(-1px)";
      elementRef.current.style.boxShadow = cssVars.shadows.lg;
    }
  };
  const handleMouseLeave = () => {
    if (elementRef.current) {
      elementRef.current.style.transform = "translateY(0)";
      elementRef.current.style.boxShadow = "";
    }
  };
  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };
};

// src/app/components/atoms/Card/Card.tsx
var Card = forwardRef(
  (allProps, ref) => {
    var _b;
    const [containerProps, componentProps] = extractContainerProps(allProps);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = UNIVERSAL_DEFAULTS.variant,
      shape = UNIVERSAL_DEFAULTS.shape,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      loadingKey,
      width,
      height,
      className,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      animationMode = UNIVERSAL_DEFAULTS.animationMode,
      rounded,
      // Legacy support
      children,
      clickable,
      onClick,
      onAsyncClick,
      padding = "md"
    } = containerProps;
    const _a = componentProps, {
      header,
      footer,
      headerAlignment = "left",
      footerAlignment = "left"
    } = _a, restProps = __objRest(_a, [
      "header",
      "footer",
      "headerAlignment",
      "footerAlignment"
    ]);
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const internalRef = useRef(null);
    const cardRef = ref || internalRef;
    const [cardWidth, setCardWidth] = useState(void 0);
    const isDisabled = Boolean(disabled) || loading;
    const isClickable = clickable && !isDisabled;
    const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
    const useAnimationMode = animationsEnabled && animationMode !== "none";
    const hasIsometricAnimation = useAnimationMode && animationMode === "isometric" && variant !== "ghost" && variant !== "glassmorphic";
    const colors = getColorVariables5(color, customColor, cssVars);
    const headerFooterColor = colors.main || cssVars.foreground;
    const handleClick = async (event) => {
      if (!isClickable) return;
      await handleCardClick(onAsyncClick, onClick, event);
    };
    const { onMouseEnter, onMouseLeave } = createHoverHandlers(
      Boolean(isClickable),
      Boolean(isDisabled),
      cssVars,
      cardRef
    );
    const baseStyles = useMemo(
      () => createBaseStyles3(false, isDisabled, shape, animationsEnabled, rounded),
      [isDisabled, shape, rounded, animationsEnabled]
    );
    const variantStyles = useMemo(
      () => getVariantStyles3(color, variant, customColor, cssVars),
      [color, customColor, variant, cssVars]
    );
    const sizeStyles = useMemo(
      () => getSizeStyles3(size),
      [size]
    );
    const paddingStyles = useMemo(
      () => getPaddingStyles(padding),
      [padding]
    );
    const clickableStyles = useMemo(
      () => createClickableStyles(Boolean(isClickable), Boolean(isDisabled)),
      [isClickable, isDisabled]
    );
    const loadingOverlayStyles = useMemo(
      () => createLoadingOverlayStyles(cssVars),
      [cssVars]
    );
    const isometricStyles = useMemo(() => hasIsometricAnimation ? getIsometricStyles2(getColorVariables5(color, customColor, cssVars), variant) : {}, [hasIsometricAnimation, color, customColor, cssVars, variant, shape]);
    const combinedStyles = __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), sizeStyles), paddingStyles), clickableStyles), isometricStyles), {
      // Apply isometric styles last to override other styles
      width,
      height
    }), style);
    useLayoutEffect(() => {
      if (cardRef.current && (header || footer)) {
        const rect = cardRef.current.getBoundingClientRect();
        setCardWidth(rect.width);
      }
    }, [children, combinedStyles, header, footer]);
    const [sharedCursorVisible, setSharedCursorVisible] = useState(true);
    useLayoutEffect(() => {
      if (!useAnimationMode || animationMode !== "typewriter" || isDisabled) {
        return;
      }
      const cursorInterval = setInterval(() => {
        setSharedCursorVisible((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }, [useAnimationMode, animationMode, isDisabled]);
    const renderAnimatedText = (text, isTypewriter) => {
      if (!isTypewriter || typeof text !== "string") {
        return text;
      }
      return /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement(
        TypewriterText,
        {
          text,
          speed: 100,
          deleteSpeed: 50,
          showCursor: false,
          disabled: isDisabled
        }
      ), /* @__PURE__ */ React22.createElement(
        "span",
        {
          style: {
            opacity: sharedCursorVisible ? 1 : 0,
            transition: "opacity 0.1s ease-in-out"
          }
        },
        "|"
      ));
    };
    const cardElement = /* @__PURE__ */ React22.createElement(
      "div",
      __spreadValues({
        ref: cardRef,
        id,
        className,
        style: combinedStyles,
        onClick: handleClick,
        onMouseEnter,
        onMouseLeave,
        role: isClickable ? "button" : void 0,
        tabIndex: isClickable ? 0 : void 0,
        "aria-disabled": isDisabled,
        "data-testid": dataTestId
      }, restProps),
      loading && /* @__PURE__ */ React22.createElement("div", { style: loadingOverlayStyles }, /* @__PURE__ */ React22.createElement(
        ProgressIndicator,
        {
          type: "circular",
          size: "md",
          color
        }
      )),
      /* @__PURE__ */ React22.createElement("div", { style: { flex: "1", display: "flex", flexDirection: "column" } }, children)
    );
    const wrappedCardElement = useAnimationMode && animationMode === "parallax" ? /* @__PURE__ */ React22.createElement(ParallaxTiltWrapper, { disabled: isDisabled || !useAnimationMode }, cardElement) : cardElement;
    return /* @__PURE__ */ React22.createElement("div", { style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      // Prevent stretching
      width: "fit-content"
      // Let card determine width
    } }, /* @__PURE__ */ React22.createElement("div", { style: {
      width: cardWidth ? `${cardWidth}px` : "100%",
      marginBottom: "4px"
    } }, header && /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: {
          textAlign: headerAlignment,
          color: headerFooterColor,
          // Use selected color to match borders
          fontWeight: "500",
          fontSize: "14px",
          fontFamily: "inherit",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto"
        }
      },
      renderAnimatedText(header, useAnimationMode && animationMode === "typewriter")
    )), wrappedCardElement, /* @__PURE__ */ React22.createElement("div", { style: {
      width: cardWidth ? `${cardWidth}px` : "100%",
      marginTop: "4px"
    } }, footer && /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: {
          textAlign: footerAlignment,
          color: headerFooterColor,
          // Use selected color to match borders
          fontWeight: "500",
          fontSize: "14px",
          fontFamily: "inherit",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto"
        }
      },
      renderAnimatedText(footer, useAnimationMode && animationMode === "typewriter")
    )));
  }
);
Card.displayName = "Card";

// src/app/components/atoms/CheckBox/CheckBox.styles.ts
var getColorVariables6 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles6 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "6px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "6px" };
  }
};
var getVariantStyles4 = (variant, color, customColor, cssVars, checked, error) => {
  const colors = getColorVariables6(color, customColor, cssVars);
  if (error) {
    const baseErrorStyle = {
      color: cssVars.destructiveForeground,
      borderWidth: "2px",
      borderStyle: "solid"
    };
    switch (variant) {
      case "solid":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.destructiveAccent || cssVars.destructive
        });
      case "ghost":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : "transparent"
        });
      case "glassmorphic":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.destructiveBackground,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        });
      case "outline":
      default:
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.background
        });
    }
  }
  switch (variant) {
    case "solid":
      return {
        borderColor: checked ? colors.accent || colors.main : cssVars.mutedForeground,
        backgroundColor: checked ? colors.accent || colors.main : cssVars.mutedForeground,
        color: colors.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "ghost":
      return {
        borderColor: checked ? colors.main : "transparent",
        backgroundColor: checked ? colors.main : "transparent",
        color: checked ? colors.foreground : cssVars.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "glassmorphic":
      return {
        borderColor: checked ? colors.main : colors.border,
        backgroundColor: checked ? colors.main : colors.background,
        color: checked ? colors.foreground : colors.foreground,
        borderWidth: "2px",
        borderStyle: "solid",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      };
    case "invisible":
      return {
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: colors.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "outline":
    default:
      return {
        borderColor: colors.main,
        backgroundColor: checked ? colors.main : cssVars.background,
        color: colors.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
  }
};
var getSizeStyles4 = (size) => {
  const sizeMap = {
    xs: {
      width: "16px",
      height: "16px",
      fontSize: "10px"
    },
    sm: {
      width: "18px",
      height: "18px",
      fontSize: "12px"
    },
    md: {
      width: "20px",
      height: "20px",
      fontSize: "14px"
    },
    lg: {
      width: "24px",
      height: "24px",
      fontSize: "16px"
    },
    xl: {
      width: "28px",
      height: "28px",
      fontSize: "18px"
    }
  };
  return sizeMap[size];
};
var createBaseStyles4 = (disabled, shape, animationsEnabled, rounded) => {
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  return __spreadValues({
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none",
    outline: "none",
    flexShrink: 0
  }, getShapeStyles6(finalShape));
};
var getInputStyles = () => ({
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  cursor: "inherit"
});
var getLabelStyles = (cssVars, size, disabled, contentToggleable) => {
  const fontSizeMap = {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px"
  };
  return {
    marginLeft: "8px",
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : cssVars.foreground,
    cursor: contentToggleable ? disabled ? "not-allowed" : "pointer" : "default",
    userSelect: "none"
  };
};
var getDescriptionStyles = (cssVars, size, disabled, contentToggleable) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  return {
    marginTop: "2px",
    marginLeft: size === "xs" ? "24px" : size === "sm" ? "26px" : size === "md" ? "28px" : size === "lg" ? "32px" : "36px",
    fontSize: fontSizeMap[size],
    color: cssVars.mutedForeground,
    lineHeight: "1.4",
    cursor: contentToggleable ? disabled ? "not-allowed" : "pointer" : "default",
    userSelect: "none"
  };
};
var getWrapperStyles = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
});
var getCheckboxWrapperStyles = () => ({
  display: "flex",
  alignItems: "center"
});
var getFocusStyles = (color, customColor, cssVars, error) => {
  let outlineColor = cssVars.primary;
  if (error) {
    outlineColor = cssVars.destructive;
  } else {
    const colors = getColorVariables6(color, customColor, cssVars);
    outlineColor = colors.main;
  }
  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: "2px"
  };
};
var getIconColor = (color, customColor, error, checked, cssVars) => {
  if (checked) {
    if (error) return cssVars.destructiveForeground;
    const colors2 = getColorVariables6(color, customColor, cssVars);
    return colors2.foreground;
  }
  if (error) return cssVars.destructive;
  const colors = getColorVariables6(color, customColor, cssVars);
  return colors.main;
};
var createCheckIcon = (checked, indeterminate, error, size, color) => {
  if (indeterminate) {
    return /* @__PURE__ */ React22.createElement(Icon, { name: "Minus", size, style: { color } });
  }
  if (checked) {
    return /* @__PURE__ */ React22.createElement(Icon, { name: "Check", size, style: { color } });
  }
  if (error && !checked) {
    return /* @__PURE__ */ React22.createElement(Icon, { name: "Asterisk", size, style: { color } });
  }
  return null;
};
var getIconSize3 = (checkboxSize) => {
  const iconSizeMap = {
    xs: "xs",
    sm: "xs",
    md: "sm",
    lg: "sm",
    xl: "md"
  };
  return iconSizeMap[checkboxSize] || "sm";
};
var handleKeyDown = (event, onChange, checked) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (onChange) {
      const inputElement = event.currentTarget;
      const syntheticEvent = {
        target: __spreadProps(__spreadValues({}, inputElement), { checked: !checked }),
        currentTarget: __spreadProps(__spreadValues({}, inputElement), { checked: !checked }),
        type: "change",
        bubbles: true,
        cancelable: true,
        preventDefault: () => {
        },
        stopPropagation: () => {
        }
      };
      onChange(!checked, syntheticEvent);
    }
  }
};

// src/app/components/atoms/CheckBox/CheckBox.tsx
var CheckBox = forwardRef(
  (allProps, ref) => {
    var _c;
    const _a = allProps, {
      onChange
    } = _a, propsWithoutOnChange = __objRest(_a, [
      "onChange"
    ]);
    const [formProps, componentProps] = extractFormProps(propsWithoutOnChange);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = UNIVERSAL_DEFAULTS.variant,
      size = UNIVERSAL_DEFAULTS.size,
      shape = UNIVERSAL_DEFAULTS.shape,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      error,
      label,
      className,
      required,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      rounded,
      // Legacy support
      onKeyDown
    } = formProps;
    const _b = componentProps, {
      checked,
      defaultChecked = false,
      indeterminate = false,
      description,
      contentToggleable = true
    } = _b, restProps = __objRest(_b, [
      "checked",
      "defaultChecked",
      "indeterminate",
      "description",
      "contentToggleable"
    ]);
    const isControlled = checked !== void 0;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const checkedValue = isControlled ? checked : internalChecked;
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const internalRef = useRef(null);
    const inputRef = ref || internalRef;
    const animationsEnabled = ((_c = settings.appearance.animations) != null ? _c : true) && animate;
    const iconSize = getIconSize3(size);
    const asteriskSize = size === "lg" || size === "xl" ? "sm" : "xs";
    const getAsteriskColor = () => {
      if (Boolean(error)) {
        return cssVars.destructive;
      }
      switch (variant) {
        case "solid":
          return color === "custom" && customColor ? customColor : cssVars[color] || cssVars.primary;
        case "glassmorphic":
          return cssVars.primary;
        case "ghost":
        case "outline":
        case "invisible":
        default:
          return cssVars.mutedForeground;
      }
    };
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);
    const handleChange = useCallback((event) => {
      if (disabled) return;
      const newChecked = event.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange == null ? void 0 : onChange(newChecked, event);
    }, [disabled, onChange, isControlled]);
    const handleKeyDownInternal = useCallback((event) => {
      if (!disabled) {
        handleKeyDown(event, onChange, checkedValue);
      }
      onKeyDown == null ? void 0 : onKeyDown(event);
    }, [disabled, onChange, checkedValue, onKeyDown]);
    const baseStyles = useMemo(() => createBaseStyles4(
      disabled,
      shape,
      animationsEnabled,
      rounded
      // Legacy support
    ), [disabled, shape, animationsEnabled, rounded]);
    const variantStyles = useMemo(() => getVariantStyles4(
      variant,
      color,
      customColor,
      cssVars,
      checkedValue || indeterminate,
      Boolean(error)
    ), [variant, color, customColor, cssVars, checkedValue, indeterminate, error]);
    const sizeStyles = useMemo(() => getSizeStyles4(size), [size]);
    const inputStyles = useMemo(() => getInputStyles(), []);
    const labelStyles = useMemo(() => label ? getLabelStyles(cssVars, size, Boolean(disabled), Boolean(contentToggleable)) : {}, [cssVars, size, disabled, contentToggleable, label]);
    const descriptionStyles = useMemo(() => description ? getDescriptionStyles(cssVars, size, Boolean(disabled), Boolean(contentToggleable)) : {}, [cssVars, size, disabled, contentToggleable, description]);
    const wrapperStyles = useMemo(() => getWrapperStyles(), []);
    const checkboxWrapperStyles = useMemo(() => getCheckboxWrapperStyles(), []);
    const combinedCheckboxStyles = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), sizeStyles), variantStyles), style);
    const [focused, setFocused] = React22.useState(false);
    const focusStyles = focused ? getFocusStyles(color, customColor, cssVars, Boolean(error)) : {};
    const finalCheckboxStyles = __spreadValues(__spreadValues({}, combinedCheckboxStyles), focusStyles);
    return /* @__PURE__ */ React22.createElement("div", { style: wrapperStyles, className }, /* @__PURE__ */ React22.createElement("div", { style: checkboxWrapperStyles }, /* @__PURE__ */ React22.createElement("div", { style: finalCheckboxStyles }, /* @__PURE__ */ React22.createElement(
      "input",
      __spreadValues({
        ref: inputRef,
        type: "checkbox",
        id,
        checked: checkedValue,
        disabled,
        required,
        onChange: handleChange,
        onKeyDown: handleKeyDownInternal,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        style: inputStyles,
        "data-testid": dataTestId,
        "aria-checked": indeterminate ? "mixed" : checkedValue,
        "aria-describedby": description ? `${id}-description` : void 0
      }, restProps)
    ), required && !checkedValue && !indeterminate ? (
      // Show asterisk for required unchecked state
      /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        },
        /* @__PURE__ */ React22.createElement(
          Icon,
          {
            name: "Asterisk",
            size: asteriskSize,
            color: getAsteriskColor()
          }
        )
      )
    ) : (
      // Show normal check icon
      createCheckIcon(
        checkedValue,
        indeterminate,
        Boolean(error),
        iconSize,
        getIconColor(color, customColor, Boolean(error), checkedValue, cssVars)
      )
    )), label && /* @__PURE__ */ React22.createElement(
      "label",
      {
        htmlFor: contentToggleable ? id : void 0,
        style: labelStyles
      },
      label
    )), description && /* @__PURE__ */ React22.createElement(
      "div",
      {
        id: `${id}-description`,
        style: descriptionStyles,
        onClick: contentToggleable ? () => {
          if (!disabled && inputRef.current) {
            inputRef.current.click();
          }
        } : void 0
      },
      description
    ));
  }
);
CheckBox.displayName = "CheckBox";

// src/app/components/atoms/CodeBlock/CodeBlock.styles.ts
var getColorVariables7 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles7 = (shape, hasLineNumbers = false) => {
  const getRadius = () => {
    switch (shape) {
      case "sharp":
        return "0";
      case "round":
        return "12px";
      case "pill":
        return "9999px";
      default:
        return "12px";
    }
  };
  const radius = getRadius();
  if (hasLineNumbers) {
    return {
      borderRadius: `${radius}`
    };
  }
  return { borderRadius: radius };
};
var getVariantStyles5 = (color, customColor, variant, cssVars, hasLineNumbers = false) => {
  const colors = getColorVariables7(color, customColor, cssVars);
  const baseStyles = {
    borderWidth: "2px",
    borderStyle: "solid"
  };
  switch (variant) {
    case "solid":
      return __spreadValues({
        backgroundColor: colors.main,
        color: colors.foreground,
        borderColor: colors.main
      }, baseStyles);
    case "ghost":
      return __spreadValues({
        backgroundColor: "transparent",
        color: cssVars.foreground,
        borderColor: "transparent"
      }, baseStyles);
    case "glassmorphic":
      return __spreadValues({
        backgroundColor: colors.background || cssVars.backgroundAccent,
        color: cssVars.foreground,
        borderColor: colors.border || colors.main,
        backdropFilter: "blur(10px)"
      }, baseStyles);
    case "outline":
    default:
      return __spreadValues({
        backgroundColor: "transparent",
        color: cssVars.foreground,
        borderColor: colors.border || colors.main
      }, baseStyles);
  }
};
var getSizeStyles5 = (size) => {
  const sizeMap = {
    xs: {
      padding: "8px 12px",
      fontSize: "11px",
      lineHeight: 1.4
    },
    sm: {
      padding: "12px 16px",
      fontSize: "12px",
      lineHeight: 1.4
    },
    md: {
      padding: "16px 20px",
      fontSize: "13px",
      lineHeight: 1.5
    },
    lg: {
      padding: "20px 24px",
      fontSize: "14px",
      lineHeight: 1.5
    },
    xl: {
      padding: "24px 28px",
      fontSize: "15px",
      lineHeight: 1.6
    }
  };
  return sizeMap[size];
};
var createBaseStyles5 = (shape, maxHeight, animationsEnabled, hasLineNumbers = false, rounded) => {
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  return __spreadValues({
    display: "block",
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    whiteSpace: "pre-wrap",
    overflowX: "auto",
    overflowY: maxHeight ? "auto" : "visible",
    maxHeight: maxHeight || "none",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth)" : "none",
    position: "relative",
    wordBreak: "break-all",
    tabSize: 2
  }, getShapeStyles7(finalShape, hasLineNumbers));
};
var getInlineCodeStyles = (color, customColor, variant, size, shape, cssVars) => {
  const colors = getColorVariables7(color, customColor, cssVars);
  const shapeStyles = getShapeStyles7(shape);
  const inlineShapeStyles = __spreadProps(__spreadValues({}, shapeStyles), {
    borderRadius: shape === "sharp" ? "0" : shape === "pill" ? "4px" : "4px"
  });
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.main,
          color: colors.foreground,
          borderColor: colors.main
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: colors.main,
          borderColor: "transparent"
        };
      case "glassmorphic":
        return {
          backgroundColor: colors.background,
          color: colors.main,
          borderColor: "transparent"
        };
      case "outline":
      default:
        return {
          backgroundColor: cssVars.backgroundAccent,
          color: cssVars.foreground,
          borderColor: colors.border || cssVars.border
        };
    }
  })();
  const sizeStyles = (() => {
    switch (size) {
      case "xs":
        return { padding: "1px 4px", fontSize: "10px" };
      case "sm":
        return { padding: "2px 4px", fontSize: "11px" };
      case "md":
        return { padding: "2px 6px", fontSize: "12px" };
      case "lg":
        return { padding: "3px 6px", fontSize: "13px" };
      case "xl":
        return { padding: "4px 8px", fontSize: "14px" };
      default:
        return { padding: "2px 6px", fontSize: "12px" };
    }
  })();
  return __spreadValues(__spreadValues(__spreadValues({
    display: "inline-block",
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    whiteSpace: "nowrap",
    borderWidth: "2px",
    borderStyle: "solid",
    verticalAlign: "baseline"
  }, inlineShapeStyles), variantStyles), sizeStyles);
};
var getCopyButtonStyles = (size, cssVars, animationsEnabled) => {
  const sizeConfig = (() => {
    switch (size) {
      case "xs":
        return { padding: "4px 6px", fontSize: "10px", top: "4px", right: "4px" };
      case "sm":
        return { padding: "4px 8px", fontSize: "11px", top: "6px", right: "6px" };
      case "md":
        return { padding: "6px 8px", fontSize: "12px", top: "8px", right: "8px" };
      case "lg":
        return { padding: "6px 10px", fontSize: "12px", top: "10px", right: "10px" };
      case "xl":
        return { padding: "8px 12px", fontSize: "13px", top: "12px", right: "12px" };
      default:
        return { padding: "6px 8px", fontSize: "12px", top: "8px", right: "8px" };
    }
  })();
  return {
    position: "absolute",
    top: sizeConfig.top,
    right: sizeConfig.right,
    backgroundColor: cssVars.background,
    color: cssVars.mutedForeground,
    border: `2px solid ${cssVars.border}`,
    borderRadius: "8px",
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    cursor: "pointer",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth)" : "none",
    fontFamily: "inherit",
    zIndex: 2
    // Note: Hover styles should be handled via event handlers in the component
  };
};
var getLineNumberStyles = (size, cssVars, color, customColor, shape) => {
  const sizeConfig = getSizeStyles5(size);
  const colors = getColorVariables7(color, customColor, cssVars);
  const getBorderRadius = () => {
    switch (shape) {
      case "sharp":
        return "0";
      case "round":
        return "12px 0 0 12px";
      // Only left corners rounded
      case "pill":
        return "9999px 0 0 9999px";
      // Only left corners rounded
      default:
        return "12px 0 0 12px";
    }
  };
  return {
    position: "absolute",
    left: "0",
    top: "0",
    bottom: "0",
    width: "44px",
    backgroundColor: cssVars.backgroundAccent,
    borderRight: `2px solid ${colors.border || colors.main}`,
    borderTop: `2px solid ${colors.border || colors.main}`,
    borderBottom: `2px solid ${colors.border || colors.main}`,
    borderLeft: `2px solid ${colors.border || colors.main}`,
    borderRadius: getBorderRadius(),
    padding: (typeof sizeConfig.padding === "string" ? sizeConfig.padding.split(" ")[0] : "12px") + " 8px",
    paddingTop: "32px",
    // Account for language label
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    color: colors.main,
    // Same color as title/language label
    userSelect: "none",
    textAlign: "right",
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    zIndex: 1
  };
};
var copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    }
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};
var extractTextContent = (children) => {
  if (typeof children === "string") {
    return children;
  }
  if (React22.isValidElement(children)) {
    const element = children;
    return extractTextContent(element.props.children);
  }
  if (Array.isArray(children)) {
    return children.map(extractTextContent).join("");
  }
  return String(children || "");
};
var createLineNumbers = (content, styles) => {
  const lines = content.split("\n");
  return /* @__PURE__ */ React22.createElement("div", { style: styles }, lines.map((_, index) => /* @__PURE__ */ React22.createElement("div", { key: index + 1 }, index + 1)));
};
var highlightLines = (content, highlight, cssVars) => {
  const lines = content.split("\n");
  const highlightArray = Array.isArray(highlight) ? highlight : [highlight];
  return /* @__PURE__ */ React22.createElement(React22.Fragment, null, lines.map((line, index) => {
    var _a;
    const lineNumber = index + 1;
    const isHighlighted = highlightArray.includes(lineNumber);
    return /* @__PURE__ */ React22.createElement(
      "div",
      {
        key: lineNumber,
        style: {
          backgroundColor: isHighlighted ? ((_a = cssVars.getColorWithOpacity) == null ? void 0 : _a.call(cssVars, "primary", 0.1)) || "rgba(59, 130, 246, 0.1)" : "transparent",
          padding: "0 4px",
          margin: "0 -4px"
        }
      },
      line
    );
  }));
};
var getLanguageLabel = (language) => {
  const languageMap = {
    js: "JavaScript",
    ts: "TypeScript",
    tsx: "TypeScript React",
    jsx: "JavaScript React",
    py: "Python",
    sh: "Shell",
    bash: "Bash",
    css: "CSS",
    html: "HTML",
    json: "JSON",
    md: "Markdown",
    sql: "SQL",
    yaml: "YAML",
    yml: "YAML"
  };
  return languageMap[language.toLowerCase()] || language.toUpperCase();
};
var createSyntaxTheme = (cssVars) => ({
  keyword: "#569cd6",
  // Blue for keywords (function, const, let, etc.)
  string: "#ce9178",
  // Orange for strings
  comment: "#6a9955",
  // Green for comments
  number: "#b5cea8",
  // Light green for numbers
  operator: "#d4d4d4",
  // Light gray for operators
  function: "#dcdcaa",
  // Yellow for function names
  property: "#9cdcfe",
  // Light blue for properties
  tag: "#4ec9b0",
  // Cyan for HTML/JSX tags
  attribute: "#92c5f8",
  // Light blue for attributes
  punctuation: "#cccccc"
  // Light gray for punctuation
});
var getLanguagePatterns = (language) => {
  const basePatterns = {
    // Comments
    comment: [
      /\/\*[\s\S]*?\*\//g,
      // Block comments
      /\/\/.*$/gm,
      // Line comments
      /#.*$/gm
      // Python/Shell comments
    ],
    // Strings
    string: [
      /"(?:[^"\\]|\\.)*"/g,
      // Double quotes
      /'(?:[^'\\]|\\.)*'/g,
      // Single quotes
      /`(?:[^`\\]|\\.|`)*`/g
      // Template literals
    ],
    // Numbers
    number: [
      /\b\d+\.?\d*\b/g
      // Numbers (int and float)
    ]
  };
  const languageSpecific = {
    javascript: __spreadProps(__spreadValues({}, basePatterns), {
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g
      ]
    }),
    typescript: __spreadProps(__spreadValues({}, basePatterns), {
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof|interface|type|enum|namespace|declare|public|private|protected|readonly|static)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g
      ]
    }),
    tsx: __spreadProps(__spreadValues({}, basePatterns), {
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof|interface|type|enum|namespace|declare|public|private|protected|readonly|static)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g
      ],
      tag: [
        /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g
      ],
      attribute: [
        /\b([a-zA-Z-]+)(?==)/g
      ]
    }),
    jsx: __spreadProps(__spreadValues({}, basePatterns), {
      keyword: [
        /\b(const|let|var|function|class|extends|import|export|from|default|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|super|async|await|yield|typeof|instanceof)\b/g
      ],
      operator: [
        /[+\-*/%=<>!&|^~?:]/g
      ],
      function: [
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g
      ],
      property: [
        /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g
      ],
      tag: [
        /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g
      ],
      attribute: [
        /\b([a-zA-Z-]+)(?==)/g
      ]
    }),
    css: __spreadProps(__spreadValues({}, basePatterns), {
      property: [
        /([a-zA-Z-]+)\s*:/g
      ],
      keyword: [
        /\b(important|inherit|initial|unset|auto|none)\b/g
      ],
      function: [
        /([a-zA-Z-]+)\(/g
      ]
    }),
    json: {
      string: [
        /"(?:[^"\\]|\\.)*"/g
      ],
      number: [
        /\b\d+\.?\d*\b/g
      ],
      keyword: [
        /\b(true|false|null)\b/g
      ],
      property: [
        /"([^"]+)"\s*:/g
      ]
    }
  };
  return languageSpecific[language.toLowerCase()] || basePatterns;
};
var highlightSyntax = (code, language, theme) => {
  if (!language || language === "text" || language === "plain") {
    return [/* @__PURE__ */ React22.createElement("span", { key: 0 }, code)];
  }
  const patterns = getLanguagePatterns(language);
  const tokens = [];
  Object.entries(patterns).forEach(([type, regexes]) => {
    if (Array.isArray(regexes)) {
      regexes.forEach((regex) => {
        let match;
        while ((match = regex.exec(code)) !== null) {
          tokens.push({
            type,
            content: match[0],
            start: match.index,
            end: match.index + match[0].length
          });
        }
      });
    }
  });
  tokens.sort((a, b) => a.start - b.start);
  const mergedTokens = [];
  let lastEnd = 0;
  tokens.forEach((token) => {
    if (token.start >= lastEnd) {
      mergedTokens.push(token);
      lastEnd = token.end;
    }
  });
  const elements = [];
  let currentIndex = 0;
  mergedTokens.forEach((token, index) => {
    if (token.start > currentIndex) {
      const text = code.slice(currentIndex, token.start);
      elements.push(/* @__PURE__ */ React22.createElement("span", { key: `text-${index}` }, text));
    }
    const color = theme[token.type] || theme.punctuation;
    elements.push(
      /* @__PURE__ */ React22.createElement("span", { key: `token-${index}`, style: { color } }, token.content)
    );
    currentIndex = token.end;
  });
  if (currentIndex < code.length) {
    const text = code.slice(currentIndex);
    elements.push(/* @__PURE__ */ React22.createElement("span", { key: "text-end" }, text));
  }
  return elements.length > 0 ? elements : [/* @__PURE__ */ React22.createElement("span", { key: 0 }, code)];
};

// src/app/components/atoms/CodeBlock/CodeBlock.tsx
var CodeBlock = forwardRef(
  (allProps, ref) => {
    var _b;
    const [containerProps, componentProps] = extractContainerProps(allProps);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = UNIVERSAL_DEFAULTS.variant,
      shape = UNIVERSAL_DEFAULTS.shape,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      loadingKey,
      width,
      height,
      className,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      rounded,
      // Legacy support
      children,
      clickable,
      onClick,
      onAsyncClick,
      maxHeight
    } = containerProps;
    const _a = componentProps, {
      language,
      copyable = false,
      lineNumbers = false,
      highlight,
      syntaxHighlighting = true,
      inline = false,
      onCopy
    } = _a, restProps = __objRest(_a, [
      "language",
      "copyable",
      "lineNumbers",
      "highlight",
      "syntaxHighlighting",
      "inline",
      "onCopy"
    ]);
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const { success, error } = useToast();
    const [copied, setCopied] = useState(false);
    const isInline = inline;
    const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
    const textContent = extractTextContent(children);
    const syntaxTheme = useMemo(() => createSyntaxTheme(), [cssVars]);
    const handleCopy = useCallback(async () => {
      const copySuccess = await copyToClipboard(textContent);
      if (copySuccess) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
        onCopy == null ? void 0 : onCopy(textContent);
        success("Code copied to clipboard!");
      } else {
        error("Failed to copy code to clipboard");
      }
    }, [textContent, onCopy, success, error]);
    const baseStyles = useMemo(() => createBaseStyles5(
      shape,
      typeof maxHeight === "string" ? maxHeight : maxHeight == null ? void 0 : maxHeight.toString(),
      animationsEnabled,
      lineNumbers,
      // Pass line numbers flag
      rounded
      // Legacy support
    ), [shape, maxHeight, animationsEnabled, lineNumbers, rounded]);
    const variantStyles = useMemo(() => getVariantStyles5(color, customColor, variant, cssVars, lineNumbers), [color, customColor, variant, cssVars, lineNumbers]);
    const sizeStyles = useMemo(() => getSizeStyles5(size), [size]);
    const combinedStyles = __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), sizeStyles), variantStyles), {
      paddingTop: language ? "32px" : sizeStyles.padding,
      paddingLeft: lineNumbers ? "52px" : "16px",
      width,
      height
    }), style);
    useMemo(() => getCopyButtonStyles(size, cssVars, animationsEnabled), [size, cssVars, animationsEnabled]);
    const lineNumberStyles = useMemo(() => getLineNumberStyles(size, cssVars, color, customColor, shape), [size, cssVars, color, customColor, shape]);
    const inlineStyles = useMemo(() => getInlineCodeStyles(color, customColor, variant, size, shape, cssVars), [color, customColor, variant, size, shape, cssVars]);
    const renderContent = () => {
      if (typeof children === "string") {
        if (language && syntaxHighlighting) {
          const highlightedElements = highlightSyntax(children, language, syntaxTheme);
          if (highlight) {
            const lines = children.split("\n");
            const highlightArray = Array.isArray(highlight) ? highlight : [highlight];
            return lines.map((line, index) => {
              var _a2;
              const lineNumber = index + 1;
              const isHighlighted = highlightArray.includes(lineNumber);
              const lineHighlighted = highlightSyntax(line, language, syntaxTheme);
              return /* @__PURE__ */ React22.createElement(
                "div",
                {
                  key: lineNumber,
                  style: {
                    backgroundColor: isHighlighted ? ((_a2 = cssVars.getColorWithOpacity) == null ? void 0 : _a2.call(cssVars, "primary", 0.1)) || "rgba(59, 130, 246, 0.1)" : "transparent",
                    padding: "0 4px",
                    margin: "0 -4px"
                  }
                },
                lineHighlighted,
                index < lines.length - 1 && "\n"
              );
            });
          }
          return highlightedElements;
        }
        if (highlight) {
          return highlightLines(children, highlight, cssVars);
        }
      }
      return children;
    };
    if (isInline) {
      return /* @__PURE__ */ React22.createElement(
        "code",
        __spreadValues({
          ref,
          id,
          style: __spreadValues(__spreadValues({}, inlineStyles), style),
          className,
          "data-testid": dataTestId
        }, restProps),
        children
      );
    }
    return /* @__PURE__ */ React22.createElement("div", { style: { position: "relative" } }, language && /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: "12px",
          left: lineNumbers ? "52px" : "16px",
          // Move right when line numbers are present
          fontSize: "12px",
          color: variant === "solid" ? getColorVariables7(color, customColor, cssVars).foreground : getColorVariables7(color, customColor, cssVars).main,
          fontFamily: "inherit",
          zIndex: 2,
          // Higher z-index to appear above line numbers
          opacity: 0.8,
          userSelect: "none",
          fontWeight: "500"
        }
      },
      getLanguageLabel(language)
    ), copyable && /* @__PURE__ */ React22.createElement("div", { style: {
      position: "absolute",
      top: "4px",
      right: "8px",
      zIndex: 2
    } }, /* @__PURE__ */ React22.createElement(
      Button,
      {
        size: "sm",
        variant: "ghost",
        color,
        onClick: handleCopy,
        animate: animationsEnabled,
        style: {
          minWidth: "auto",
          padding: "6px 8px",
          color: variant === "solid" ? getColorVariables7(color, customColor, cssVars).foreground : variant === "outline" || variant === "glassmorphic" || variant === "ghost" ? getColorVariables7(color, customColor, cssVars).main : void 0
        }
      },
      /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: copied ? "CheckCircle" : "Copy",
          size: "sm"
        }
      )
    )), lineNumbers && createLineNumbers(textContent, lineNumberStyles), /* @__PURE__ */ React22.createElement(
      "pre",
      __spreadValues({
        ref,
        id,
        style: combinedStyles,
        className,
        "data-testid": dataTestId
      }, restProps),
      /* @__PURE__ */ React22.createElement("code", null, renderContent())
    ));
  }
);
CodeBlock.displayName = "CodeBlock";

// src/app/components/atoms/Divider/Divider.styles.ts
var getColorVariables8 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: customColor,
      border: customColor
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      foreground: cssVars.primary,
      border: cssVars.primary
    },
    secondary: {
      main: cssVars.secondary,
      foreground: cssVars.secondary,
      border: cssVars.secondary
    },
    success: {
      main: cssVars.success,
      foreground: cssVars.success,
      border: cssVars.success
    },
    warning: {
      main: cssVars.warning,
      foreground: cssVars.warning,
      border: cssVars.warning
    },
    destructive: {
      main: cssVars.destructive,
      foreground: cssVars.destructive,
      border: cssVars.destructive
    },
    info: {
      main: cssVars.info,
      foreground: cssVars.info,
      border: cssVars.info
    },
    muted: {
      main: cssVars.border,
      foreground: cssVars.border,
      border: cssVars.border
    }
  };
  return colorMap[color] || colorMap.muted;
};
var getVariantStyles6 = (color, customColor, cssVars, useBorder = false, orientation = "horizontal", dashed = false, dotted = false, size = "md") => {
  const colors = getColorVariables8(color, customColor, cssVars);
  const colorValue = colors.main;
  const sizeMap = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6
  };
  const thickness = sizeMap[size];
  if (dashed || dotted) {
    const styles = {
      borderColor: "transparent",
      backgroundColor: "transparent"
    };
    if (dashed) {
      const dashLength = Math.max(thickness * 3, 8);
      const gapLength = Math.max(thickness * 2, 4);
      if (orientation === "vertical") {
        styles.backgroundImage = `linear-gradient(to bottom, ${colorValue} 0%, ${colorValue} 100%)`;
        styles.backgroundSize = `${thickness}px ${dashLength}px`;
        styles.backgroundRepeat = "repeat-y";
        styles.backgroundPosition = `0 0, 0 ${dashLength + gapLength}px`;
        styles.maskImage = `repeating-linear-gradient(to bottom, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
        styles.WebkitMaskImage = `repeating-linear-gradient(to bottom, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
      } else {
        styles.backgroundImage = `linear-gradient(to right, ${colorValue} 0%, ${colorValue} 100%)`;
        styles.backgroundSize = `${dashLength}px ${thickness}px`;
        styles.backgroundRepeat = "repeat-x";
        styles.backgroundPosition = `0 0, ${dashLength + gapLength}px 0`;
        styles.maskImage = `repeating-linear-gradient(to right, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
        styles.WebkitMaskImage = `repeating-linear-gradient(to right, black 0px, black ${dashLength}px, transparent ${dashLength}px, transparent ${dashLength + gapLength}px)`;
      }
      styles.borderRadius = `${Math.min(thickness / 2, 2)}px`;
    } else if (dotted) {
      const dotSize = Math.max(thickness, 2);
      const spacing = dotSize * 2.5;
      if (orientation === "vertical") {
        styles.backgroundImage = `radial-gradient(circle, ${colorValue} ${dotSize / 2}px, transparent ${dotSize / 2}px)`;
        styles.backgroundSize = `${dotSize}px ${spacing}px`;
        styles.backgroundRepeat = "repeat-y";
        styles.backgroundPosition = "center 0";
      } else {
        styles.backgroundImage = `radial-gradient(circle, ${colorValue} ${dotSize / 2}px, transparent ${dotSize / 2}px)`;
        styles.backgroundSize = `${spacing}px ${dotSize}px`;
        styles.backgroundRepeat = "repeat-x";
        styles.backgroundPosition = "0 center";
      }
    }
    return styles;
  }
  if (useBorder) {
    return {
      borderColor: colorValue,
      backgroundColor: "transparent"
    };
  }
  return {
    borderColor: colorValue,
    backgroundColor: colorValue
  };
};
var getSizeStyles6 = (size, orientation, useBorder = false, useCustomPattern = false) => {
  const sizeMap = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6
  };
  const thickness = sizeMap[size];
  if (orientation === "vertical") {
    if (useBorder && !useCustomPattern) {
      return {
        borderLeftWidth: `${thickness}px`,
        width: "auto",
        height: "auto",
        minHeight: "20px"
      };
    } else {
      return {
        width: `${thickness}px`,
        height: "auto",
        minHeight: "20px"
      };
    }
  }
  if (useBorder && !useCustomPattern) {
    return {
      borderTopWidth: `${thickness}px`,
      height: "auto",
      width: "auto",
      minWidth: "20px"
    };
  } else {
    return {
      height: `${thickness}px`,
      width: "auto",
      minWidth: "20px"
    };
  }
};
var getSpacingStyles = (spacing, orientation) => {
  const spacingMap = {
    none: 0,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  };
  const space = spacingMap[spacing];
  if (orientation === "vertical") {
    return {
      marginLeft: `${space}px`,
      marginRight: `${space}px`
    };
  }
  return {
    marginTop: `${space}px`,
    marginBottom: `${space}px`
  };
};
var createBaseStyles6 = (orientation, fullSize, rounded, subtle, dashed, dotted) => {
  const baseStyles = {
    position: "relative",
    borderWidth: "0",
    borderStyle: "solid",
    borderColor: "transparent",
    flexShrink: 0,
    opacity: subtle ? 0.5 : 1
  };
  const useCustomPattern = dashed || dotted;
  if (orientation === "vertical") {
    baseStyles.alignSelf = fullSize ? "stretch" : "auto";
    baseStyles.height = fullSize ? "100%" : "auto";
    if (useCustomPattern) {
      baseStyles.width = "1px";
    } else {
      baseStyles.width = "1px";
    }
  } else {
    baseStyles.width = fullSize ? "100%" : "auto";
    if (useCustomPattern) {
      baseStyles.height = "1px";
    } else {
      baseStyles.height = "1px";
    }
  }
  if (rounded && !useCustomPattern) {
    baseStyles.borderRadius = "4px";
  }
  return baseStyles;
};
var createLabelStyles = (orientation, labelPosition, cssVars, variantStyles) => {
  const baseStyles = {
    backgroundColor: "transparent",
    fontSize: "12px",
    fontWeight: "500",
    color: variantStyles.borderColor || variantStyles.backgroundColor,
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    flexShrink: 0
  };
  if (labelPosition === "start") {
    baseStyles.paddingRight = "8px";
    baseStyles.paddingLeft = "0px";
    baseStyles.justifyContent = "flex-start";
  } else if (labelPosition === "end") {
    baseStyles.paddingLeft = "8px";
    baseStyles.paddingRight = "0px";
    baseStyles.justifyContent = "flex-end";
  } else {
    baseStyles.padding = "0 8px";
    baseStyles.justifyContent = "center";
  }
  if (orientation === "vertical") {
    baseStyles.transform = "rotate(90deg)";
    baseStyles.transformOrigin = "center";
  }
  return baseStyles;
};
var createGappedDividerStyles = (orientation, labelPosition, variantStyles, sizeStyles, rounded, subtle, dashed, dotted) => {
  const opacity = subtle ? 0.5 : 1;
  const useCustomPattern = dashed || dotted;
  const baseDividerStyles = __spreadProps(__spreadValues({}, variantStyles), {
    opacity,
    flexShrink: 0
  });
  if (rounded && !useCustomPattern) {
    baseDividerStyles.borderRadius = "4px";
  }
  if (orientation === "vertical") {
    const containerStyles = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%"
    };
    const dividerStyles = __spreadProps(__spreadValues({}, baseDividerStyles), {
      height: "auto",
      flex: 1,
      minHeight: "20px"
    });
    if (useCustomPattern) {
      dividerStyles.width = sizeStyles.width;
    } else if (sizeStyles.borderLeftWidth) {
      dividerStyles.borderLeftWidth = sizeStyles.borderLeftWidth;
      dividerStyles.borderLeftStyle = "solid";
      dividerStyles.borderLeftColor = variantStyles.borderColor;
      dividerStyles.width = "auto";
      dividerStyles.backgroundColor = "transparent";
    } else {
      dividerStyles.width = sizeStyles.width;
      dividerStyles.backgroundColor = variantStyles.backgroundColor;
    }
    let beforeStyles = __spreadValues({}, dividerStyles);
    let afterStyles = __spreadValues({}, dividerStyles);
    if (labelPosition === "start") {
      beforeStyles = { display: "none" };
    } else if (labelPosition === "end") {
      afterStyles = { display: "none" };
    }
    return { beforeStyles, afterStyles, containerStyles };
  } else {
    const containerStyles = {
      display: "flex",
      alignItems: "center",
      width: "100%"
    };
    const dividerStyles = __spreadProps(__spreadValues({}, baseDividerStyles), {
      width: "auto",
      minWidth: "20px"
    });
    if (useCustomPattern) {
      dividerStyles.height = sizeStyles.height;
    } else if (sizeStyles.borderTopWidth) {
      dividerStyles.borderTopWidth = sizeStyles.borderTopWidth;
      dividerStyles.borderTopStyle = "solid";
      dividerStyles.borderTopColor = variantStyles.borderColor;
      dividerStyles.height = "auto";
      dividerStyles.backgroundColor = "transparent";
    } else {
      dividerStyles.height = sizeStyles.height;
      dividerStyles.backgroundColor = variantStyles.backgroundColor;
    }
    let beforeStyles = __spreadValues({}, dividerStyles);
    let afterStyles = __spreadValues({}, dividerStyles);
    if (labelPosition === "start") {
      beforeStyles = { display: "none" };
      afterStyles = __spreadProps(__spreadValues({}, dividerStyles), { flex: 1 });
    } else if (labelPosition === "end") {
      beforeStyles = __spreadProps(__spreadValues({}, dividerStyles), { flex: 1 });
      afterStyles = { display: "none" };
    } else {
      beforeStyles = __spreadProps(__spreadValues({}, dividerStyles), { flex: 1 });
      afterStyles = __spreadProps(__spreadValues({}, dividerStyles), { flex: 1 });
    }
    return { beforeStyles, afterStyles, containerStyles };
  }
};

// src/app/components/atoms/Divider/Divider.utils.tsx
var createAccessibilityProps = (label) => ({
  role: "separator",
  "aria-orientation": "horizontal",
  "aria-label": typeof label === "string" ? label : void 0
});
var createVerticalAccessibilityProps = (label) => ({
  role: "separator",
  "aria-orientation": "vertical",
  "aria-label": typeof label === "string" ? label : void 0
});
var validateDividerProps = (dashed, dotted, orientation, fullSize) => {
  if (dashed && dotted) {
    console.warn("Divider: Cannot be both dashed and dotted. Dashed will take precedence.");
    return false;
  }
  return true;
};
var createLabelContent = (label, cssVars) => {
  if (typeof label === "string") {
    return /* @__PURE__ */ React.createElement("span", null, label);
  }
  return label;
};

// src/app/components/atoms/Divider/Divider.tsx
var Divider = forwardRef(
  (allProps, ref) => {
    const [containerProps, componentProps] = extractContainerProps(allProps);
    const {
      color = "muted",
      // Default to muted for dividers
      customColor,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      loadingKey,
      width,
      height,
      className,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      rounded = false,
      // Keep divider-specific default
      children,
      clickable,
      onClick,
      onAsyncClick
    } = containerProps;
    const _a = componentProps, {
      orientation = "horizontal",
      spacing = "md",
      fullSize = true,
      label,
      labelPosition = "center",
      subtle = false,
      dashed = false,
      dotted = false
    } = _a, restProps = __objRest(_a, [
      "orientation",
      "spacing",
      "fullSize",
      "label",
      "labelPosition",
      "subtle",
      "dashed",
      "dotted"
    ]);
    const cssVars = useCSSVariables();
    validateDividerProps(dashed, dotted);
    const hasLabel = Boolean(label);
    const isVertical = orientation === "vertical";
    const useBorder = dashed || dotted;
    const useCustomPattern = dashed || dotted;
    const accessibilityProps = useMemo(
      () => isVertical ? createVerticalAccessibilityProps(label) : createAccessibilityProps(label),
      [isVertical, label]
    );
    const baseStyles = useMemo(
      () => createBaseStyles6(orientation, fullSize, rounded, subtle, dashed, dotted),
      [orientation, fullSize, rounded, subtle, dashed, dotted]
    );
    const variantStyles = useMemo(
      () => getVariantStyles6(color, customColor, cssVars, useBorder, orientation, dashed, dotted, size),
      [color, customColor, cssVars, useBorder, orientation, dashed, dotted, size]
    );
    const sizeStyles = useMemo(
      () => getSizeStyles6(size, orientation, useBorder, useCustomPattern),
      [size, orientation, useBorder, useCustomPattern]
    );
    const spacingStyles = useMemo(
      () => getSpacingStyles(spacing, orientation),
      [spacing, orientation]
    );
    const labelStyles = useMemo(
      () => hasLabel ? createLabelStyles(orientation, labelPosition, cssVars, variantStyles) : {},
      [hasLabel, orientation, labelPosition, cssVars, variantStyles]
    );
    const gappedStyles = useMemo(() => {
      if (!hasLabel) return null;
      return createGappedDividerStyles(
        orientation,
        labelPosition,
        variantStyles,
        sizeStyles,
        rounded,
        subtle,
        dashed,
        dotted
      );
    }, [hasLabel, orientation, labelPosition, variantStyles, sizeStyles, rounded, subtle, dashed, dotted]);
    const combinedStyles = __spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), sizeStyles), spacingStyles), {
      width,
      height
    }), style);
    if (hasLabel && gappedStyles) {
      return /* @__PURE__ */ React22.createElement(
        "div",
        __spreadValues(__spreadValues({
          ref,
          id,
          className,
          style: __spreadProps(__spreadValues(__spreadValues({}, gappedStyles.containerStyles), spacingStyles), { width, height }),
          "data-testid": dataTestId
        }, accessibilityProps), restProps),
        /* @__PURE__ */ React22.createElement("div", { style: gappedStyles.beforeStyles }),
        /* @__PURE__ */ React22.createElement("div", { style: labelStyles }, createLabelContent(label)),
        /* @__PURE__ */ React22.createElement("div", { style: gappedStyles.afterStyles })
      );
    }
    return /* @__PURE__ */ React22.createElement(
      "div",
      __spreadValues(__spreadValues({
        ref,
        id,
        className,
        style: combinedStyles,
        "data-testid": dataTestId
      }, accessibilityProps), restProps)
    );
  }
);
Divider.displayName = "Divider";

// src/app/components/atoms/Dropdown/Dropdown.styles.ts
var getColorVariables9 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles8 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "12px" };
  }
};
var createBaseStyles7 = (size, shape, animationsEnabled, width, rounded) => {
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  const baseStyles = __spreadValues({
    position: "relative",
    display: "inline-block",
    width: width || "200px",
    minWidth: "120px",
    transition: animationsEnabled ? "width var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none"
  }, getShapeStyles8(finalShape));
  return baseStyles;
};
var getSizeStyles7 = (size) => {
  const sizeMap = {
    xs: { paddingTop: "4px", paddingRight: "12px", paddingBottom: "4px", paddingLeft: "12px", fontSize: "14px", minHeight: "40px" },
    sm: { paddingTop: "6px", paddingRight: "12px", paddingBottom: "6px", paddingLeft: "12px", fontSize: "14px", minHeight: "40px" },
    md: { paddingTop: "8px", paddingRight: "16px", paddingBottom: "8px", paddingLeft: "16px", fontSize: "16px", minHeight: "48px" },
    lg: { paddingTop: "10px", paddingRight: "20px", paddingBottom: "10px", paddingLeft: "20px", fontSize: "16px", minHeight: "52px" },
    xl: { paddingTop: "12px", paddingRight: "24px", paddingBottom: "12px", paddingLeft: "24px", fontSize: "18px", minHeight: "60px" }
  };
  return sizeMap[size] || sizeMap.md;
};
var getTriggerStyles = (color, variant, size, shape, disabled, error, open, customColor, cssVars, animationsEnabled, rounded) => {
  const colors = getColorVariables9(color, customColor, cssVars);
  const sizeStyles = getSizeStyles7(size);
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  const baseStyles = __spreadValues(__spreadValues({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    fontFamily: "inherit",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), color var(--duration-fast) var(--animation-smooth), border-top-color var(--duration-fast) var(--animation-smooth), border-right-color var(--duration-fast) var(--animation-smooth), border-bottom-color var(--duration-fast) var(--animation-smooth), border-left-color var(--duration-fast) var(--animation-smooth)" : "none",
    position: "relative",
    boxShadow: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    opacity: disabled ? 0.6 : 1
  }, sizeStyles), getShapeStyles8(finalShape));
  const baseBorderStyles = {
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "2px",
    borderLeftWidth: "2px",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid"
  };
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return __spreadValues({
          backgroundColor: colors.accent || colors.main,
          color: colors.foreground,
          borderTopColor: colors.accent || colors.main,
          borderRightColor: colors.accent || colors.main,
          borderBottomColor: colors.accent || colors.main,
          borderLeftColor: colors.accent || colors.main
        }, baseBorderStyles);
      case "ghost":
        return __spreadValues({
          backgroundColor: "transparent",
          color: cssVars.foreground,
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent"
        }, baseBorderStyles);
      case "glassmorphic":
        return __spreadValues({
          backgroundColor: colors.background,
          color: colors.foreground,
          borderTopColor: colors.border,
          borderRightColor: colors.border,
          borderBottomColor: colors.border,
          borderLeftColor: colors.border,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        }, baseBorderStyles);
      case "outline":
      default:
        return __spreadValues({
          backgroundColor: cssVars.background,
          color: cssVars.foreground,
          borderTopColor: colors.main,
          borderRightColor: colors.main,
          borderBottomColor: colors.main,
          borderLeftColor: colors.main
        }, baseBorderStyles);
    }
  })();
  if (error) {
    const destructiveVariantStyles = (() => {
      switch (variant) {
        case "solid":
          return __spreadValues({
            backgroundColor: cssVars.destructiveAccent || cssVars.destructive,
            color: colors.foreground,
            borderTopColor: cssVars.destructive,
            borderRightColor: cssVars.destructive,
            borderBottomColor: cssVars.destructive,
            borderLeftColor: cssVars.destructive
          }, baseBorderStyles);
        case "ghost":
          return __spreadValues({
            backgroundColor: "transparent",
            color: cssVars.foreground,
            borderTopColor: cssVars.destructive,
            borderRightColor: cssVars.destructive,
            borderBottomColor: cssVars.destructive,
            borderLeftColor: cssVars.destructive
          }, baseBorderStyles);
        case "glassmorphic":
          return __spreadValues({
            backgroundColor: cssVars.destructiveBackground,
            color: cssVars.destructiveForeground,
            borderTopColor: cssVars.destructive,
            borderRightColor: cssVars.destructive,
            borderBottomColor: cssVars.destructive,
            borderLeftColor: cssVars.destructive,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)"
          }, baseBorderStyles);
        case "outline":
        default:
          return __spreadValues({
            backgroundColor: cssVars.background,
            color: cssVars.foreground,
            borderTopColor: cssVars.destructive,
            borderRightColor: cssVars.destructive,
            borderBottomColor: cssVars.destructive,
            borderLeftColor: cssVars.destructive
          }, baseBorderStyles);
      }
    })();
    return __spreadValues(__spreadValues({}, baseStyles), destructiveVariantStyles);
  }
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getArrowStyles = (size, open, animationsEnabled, cssVars, variant = "outline", colors) => {
  let arrowColor = cssVars.foreground;
  if (colors) {
    switch (variant) {
      case "solid":
        arrowColor = colors.foreground || cssVars.foreground;
        break;
      case "outline":
        arrowColor = colors.main;
        break;
      case "ghost":
        arrowColor = colors.main;
        break;
      case "glassmorphic":
        arrowColor = colors.main;
        break;
      default:
        arrowColor = cssVars.foreground;
        break;
    }
  }
  const baseStyles = {
    flexShrink: 0,
    marginLeft: "8px",
    transition: animationsEnabled ? "transform 0.2s ease-in-out, color 0.2s ease-in-out" : "none",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    color: arrowColor
  };
  const sizeStyles = (() => {
    switch (size) {
      case "sm":
        return { fontSize: "14px" };
      case "lg":
        return { fontSize: "18px" };
      case "md":
      default:
        return { fontSize: "16px" };
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), sizeStyles);
};
var getMenuStyles = (position, maxHeight, rounded, cssVars, animationsEnabled) => {
  const baseStyles = {
    position: "absolute",
    zIndex: 9999,
    backgroundColor: cssVars.popover || cssVars.card || cssVars.background,
    borderRadius: rounded ? "12px" : "8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    maxHeight,
    overflow: "hidden",
    minWidth: "100%",
    marginTop: "4px",
    opacity: 1,
    transform: "translateY(0)",
    transition: animationsEnabled ? "all 0.2s ease-in-out" : "none"
  };
  const positionStyles = (() => {
    switch (position) {
      case "bottom-start":
        return { top: "100%", left: "0" };
      case "bottom-end":
        return { top: "100%", right: "0" };
      case "top-start":
        return { bottom: "100%", left: "0", marginTop: "0", marginBottom: "4px" };
      case "top-end":
        return { bottom: "100%", right: "0", marginTop: "0", marginBottom: "4px" };
      case "left":
        return { top: "0", right: "100%", marginTop: "0", marginRight: "4px" };
      case "right":
        return { top: "0", left: "100%", marginTop: "0", marginLeft: "4px" };
      default:
        return { top: "100%", left: "0" };
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), positionStyles);
};
var getOptionStyles = (size, selected, disabled, highlighted, cssVars, animationsEnabled, variant = "outline", colors) => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    transition: animationsEnabled ? "all 0.15s ease-in-out" : "none",
    color: "inherit",
    fontFamily: "inherit"
  };
  const sizeStyles = (() => {
    switch (size) {
      case "sm":
        return {
          padding: "6px 12px",
          fontSize: "14px",
          lineHeight: "1.4"
        };
      case "lg":
        return {
          padding: "10px 16px",
          fontSize: "16px",
          lineHeight: "1.5"
        };
      case "md":
      default:
        return {
          padding: "8px 14px",
          fontSize: "14px",
          lineHeight: "1.5"
        };
    }
  })();
  const stateStyles = {};
  if (disabled) {
    stateStyles.opacity = 0.5;
    stateStyles.cursor = "not-allowed";
  } else if (selected) {
    stateStyles.backgroundColor = (colors == null ? void 0 : colors.background) || cssVars.primaryBackground;
    stateStyles.color = (colors == null ? void 0 : colors.main) || cssVars.primary;
    stateStyles.fontWeight = "500";
  } else if (highlighted) {
    const primaryColor = (colors == null ? void 0 : colors.main) || cssVars.primary;
    let hoverBackground;
    if (primaryColor.startsWith("#")) {
      const hex = primaryColor.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      hoverBackground = `rgba(${r}, ${g}, ${b}, 0.15)`;
    } else {
      hoverBackground = cssVars.backgroundHover || cssVars.muted || primaryColor + "20";
    }
    stateStyles.backgroundColor = hoverBackground;
  }
  return __spreadValues(__spreadValues(__spreadValues({}, baseStyles), sizeStyles), stateStyles);
};
var getSearchStyles = (size, rounded, cssVars, variant = "outline") => {
  const textColor = cssVars.foreground;
  const placeholderColor = cssVars.mutedForeground;
  const baseStyles = {
    width: "100%",
    backgroundColor: cssVars.background,
    color: textColor,
    outline: "none",
    fontFamily: "inherit",
    border: "1px solid transparent",
    transition: "border-color 0.2s ease-in-out",
    // Hide native search clear button
    WebkitAppearance: "none",
    // Placeholder styling
    "::placeholder": {
      color: placeholderColor,
      opacity: 1
    }
  };
  const sizeStyles = (() => {
    switch (size) {
      case "sm":
        return {
          padding: "6px 12px",
          fontSize: "14px",
          borderRadius: rounded ? "6px" : "4px"
        };
      case "lg":
        return {
          padding: "10px 16px",
          fontSize: "16px",
          borderRadius: rounded ? "10px" : "8px"
        };
      case "md":
      default:
        return {
          padding: "8px 14px",
          fontSize: "14px",
          borderRadius: rounded ? "8px" : "6px"
        };
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), sizeStyles);
};
var getLoadingStyles = (size, cssVars) => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: cssVars.mutedForeground,
    fontStyle: "italic"
  };
  const sizeStyles = (() => {
    switch (size) {
      case "sm":
        return { padding: "12px", fontSize: "14px" };
      case "lg":
        return { padding: "16px", fontSize: "16px" };
      case "md":
      default:
        return { padding: "14px", fontSize: "14px" };
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), sizeStyles);
};
var getEmptyStyles = (size, cssVars) => {
  return getLoadingStyles(size, cssVars);
};
var getDividerStyles = (cssVars) => ({
  height: "1px",
  backgroundColor: cssVars.border,
  margin: "4px 0"
});
var getGroupLabelStyles = (size, cssVars) => {
  const baseStyles = {
    color: cssVars.mutedForeground,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.025em"
  };
  const sizeStyles = (() => {
    switch (size) {
      case "sm":
        return {
          padding: "6px 12px 2px",
          fontSize: "11px"
        };
      case "lg":
        return {
          padding: "10px 16px 4px",
          fontSize: "13px"
        };
      case "md":
      default:
        return {
          padding: "8px 14px 3px",
          fontSize: "12px"
        };
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), sizeStyles);
};
var getPlaceholderStyles = (cssVars, variant = "outline", colors) => {
  let placeholderColor;
  switch (variant) {
    case "solid":
      placeholderColor = (colors == null ? void 0 : colors.foreground) || cssVars.foreground;
      break;
    case "outline":
    case "ghost":
    case "glassmorphic":
      placeholderColor = (colors == null ? void 0 : colors.main) || cssVars.primary;
      break;
    default:
      placeholderColor = (colors == null ? void 0 : colors.main) || cssVars.primary;
      break;
  }
  return {
    color: placeholderColor,
    opacity: 1
  };
};
var getValueDisplayStyles = () => ({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "left"
});
var getMultiValueStyles = (size, rounded, cssVars, variant = "outline", colors) => {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    margin: "2px",
    maxWidth: "150px",
    overflow: "hidden"
  };
  const textColor = variant === "solid" ? (colors == null ? void 0 : colors.foreground) || cssVars.primaryForeground : (colors == null ? void 0 : colors.main) || cssVars.primary;
  const variantStyles = {
    backgroundColor: (colors == null ? void 0 : colors.background) || cssVars.primaryBackground,
    color: textColor
  };
  const sizeStyles = (() => {
    switch (size) {
      case "sm":
        return {
          padding: "2px 6px",
          fontSize: "12px",
          borderRadius: rounded ? "4px" : "2px"
        };
      case "lg":
        return {
          padding: "4px 8px",
          fontSize: "14px",
          borderRadius: rounded ? "8px" : "4px"
        };
      case "md":
      default:
        return {
          padding: "3px 7px",
          fontSize: "13px",
          borderRadius: rounded ? "6px" : "3px"
        };
    }
  })();
  return __spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), sizeStyles);
};
var getFocusStyles2 = (cssVars, variant, error, colors) => {
  let outlineColor;
  if (error) {
    outlineColor = cssVars.destructive;
  } else {
    outlineColor = (colors == null ? void 0 : colors.main) || cssVars.primary;
  }
  return {
    outline: `2px solid ${outlineColor}`,
    outlineOffset: "2px",
    // Don't change the border color on focus - keep original variant border
    boxShadow: "none"
  };
};
var getIsometricStyles3 = (color, variant, shape) => {
  if (variant === "ghost" || variant === "glassmorphic") {
    return {};
  }
  const borderColor = variant === "outline" ? color.main : color.foreground || "#000000";
  const styles = {
    // Use individual border properties to avoid conflict with shorthand
    borderTopWidth: "1px",
    borderLeftWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "4px",
    // Smaller than Button/Card since Dropdown is more compact
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    transform: "translateY(0)",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    // Ensure proper box-sizing and prevent collapse
    boxSizing: "border-box",
    position: "relative",
    // Adjust padding to account for larger bottom border
    paddingBottom: "6px"
    // Reduce bottom padding to compensate for thicker border
  };
  return styles;
};
var isGroup = (item) => {
  return "options" in item && Array.isArray(item.options);
};
var flattenOptions = (items) => {
  const flattened = [];
  items.forEach((item) => {
    if (isGroup(item)) {
      flattened.push(...item.options);
    } else {
      flattened.push(item);
    }
  });
  return flattened;
};
var getSelectableOptions = (items) => {
  return flattenOptions(items).filter((option) => !option.disabled);
};
var defaultFilterFunction = (option, query) => {
  var _a;
  const searchQuery = query.toLowerCase().trim();
  if (!searchQuery) return true;
  const labelText = typeof option.label === "string" ? option.label.toLowerCase() : option.value.toString().toLowerCase();
  const descriptionText = ((_a = option.description) == null ? void 0 : _a.toLowerCase()) || "";
  return labelText.includes(searchQuery) || descriptionText.includes(searchQuery);
};
var filterOptions = (items, query, filterFn = defaultFilterFunction) => {
  if (!query.trim()) return items;
  return items.map((item) => {
    if (isGroup(item)) {
      const filteredOptions = item.options.filter((option) => filterFn(option, query));
      return filteredOptions.length > 0 ? __spreadProps(__spreadValues({}, item), { options: filteredOptions }) : null;
    } else {
      return filterFn(item, query) ? item : null;
    }
  }).filter(Boolean);
};
var isSelected = (optionValue, selectedValue, multiple) => {
  if (selectedValue === void 0) return false;
  if (multiple) {
    return Array.isArray(selectedValue) && selectedValue.includes(optionValue);
  }
  return selectedValue === optionValue;
};
var getDisplayText = (selectedValue, options, multiple, placeholder) => {
  if (selectedValue === void 0 || Array.isArray(selectedValue) && selectedValue.length === 0) {
    return placeholder;
  }
  const allOptions = flattenOptions(options);
  if (multiple && Array.isArray(selectedValue)) {
    if (selectedValue.length === 1) {
      const option2 = allOptions.find((opt) => opt.value === selectedValue[0]);
      return typeof (option2 == null ? void 0 : option2.label) === "string" ? option2.label : selectedValue[0].toString();
    }
    return `${selectedValue.length} selected`;
  }
  const option = allOptions.find((opt) => opt.value === selectedValue);
  return typeof (option == null ? void 0 : option.label) === "string" ? option.label : (selectedValue == null ? void 0 : selectedValue.toString()) || placeholder;
};
var handleSelectionChange = (optionValue, currentValue, multiple, onChange) => {
  if (multiple) {
    const currentArray = Array.isArray(currentValue) ? currentValue : [];
    const isCurrentlySelected = currentArray.includes(optionValue);
    const newValue = isCurrentlySelected ? currentArray.filter((v) => v !== optionValue) : [...currentArray, optionValue];
    onChange == null ? void 0 : onChange(newValue);
    return newValue;
  } else {
    onChange == null ? void 0 : onChange(optionValue);
    return optionValue;
  }
};
var getNextSelectableIndex = (currentIndex, options, direction) => {
  const selectableOptions = options.filter((opt) => !opt.disabled);
  const currentSelectableIndex = selectableOptions.findIndex(
    (opt) => opt === options[currentIndex]
  );
  let nextIndex;
  if (direction === "down") {
    nextIndex = currentSelectableIndex < selectableOptions.length - 1 ? currentSelectableIndex + 1 : 0;
  } else {
    nextIndex = currentSelectableIndex > 0 ? currentSelectableIndex - 1 : selectableOptions.length - 1;
  }
  const nextOption = selectableOptions[nextIndex];
  return options.findIndex((opt) => opt === nextOption);
};
var handleKeyDown2 = (event, isOpen, highlightedIndex, options, onToggle, onSelect, onHighlight, onClose) => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      } else if (options.length > 0) {
        const nextIndex = getNextSelectableIndex(highlightedIndex, options, "down");
        onHighlight(nextIndex);
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      } else if (options.length > 0) {
        const nextIndex = getNextSelectableIndex(highlightedIndex, options, "up");
        onHighlight(nextIndex);
      }
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      if (!isOpen) {
        onToggle();
      } else if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        onSelect(highlightedIndex);
      }
      break;
    case "Escape":
      event.preventDefault();
      if (isOpen) {
        onClose();
      }
      break;
    case "Tab":
      if (isOpen) {
        onClose();
      }
      break;
  }
};
var generateDropdownId = () => {
  return `dropdown-${Math.random().toString(36).substr(2, 9)}`;
};
var createAccessibilityProps2 = (id, isOpen, highlightedIndex, hasError) => ({
  "aria-haspopup": "listbox",
  "aria-expanded": isOpen,
  "aria-controls": `${id}-menu`,
  "aria-activedescendant": highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : void 0,
  "aria-invalid": hasError,
  role: "combobox"
});
var createMenuAccessibilityProps = (id) => ({
  id: `${id}-menu`,
  role: "listbox",
  "aria-label": "Options"
});
var createOptionAccessibilityProps = (id, index, selected, disabled) => ({
  id: `${id}-option-${index}`,
  role: "option",
  "aria-selected": selected,
  "aria-disabled": disabled
});
var useClickOutside = (ref, handler, enabled = true) => {
  React22.useEffect(() => {
    if (!enabled) return;
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler, enabled]);
};
var useFocusManagement = (isOpen, triggerRef, menuRef) => {
  const previousOpenRef = React22.useRef(isOpen);
  React22.useEffect(() => {
    if (previousOpenRef.current !== isOpen) {
      if (isOpen && triggerRef.current) {
        triggerRef.current.focus();
      }
    }
    previousOpenRef.current = isOpen;
  }, [isOpen, triggerRef, menuRef]);
};
var createDropdownPortal = (children, container) => {
  if (typeof document === "undefined") return children;
  const portalContainer = document.body;
  return createPortal(children, portalContainer);
};

// src/app/components/atoms/Dropdown/Dropdown.tsx
var Dropdown = forwardRef(
  (allProps, ref) => {
    var _b;
    const [containerProps, componentProps] = extractContainerProps(allProps);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = "outline",
      // Dropdown-specific default
      shape = UNIVERSAL_DEFAULTS.shape,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      loadingKey,
      width,
      height,
      className,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      animationMode = UNIVERSAL_DEFAULTS.animationMode,
      rounded
      // Legacy support
    } = containerProps;
    const _a = componentProps, {
      position = "bottom-start",
      options = [],
      multiple = false,
      searchable = false,
      searchPlaceholder = "Search...",
      filterFunction,
      closeOnSelect = true,
      maxHeight = "300px",
      trigger,
      portal = false,
      emptyMessage = "No options available",
      noResultsMessage = "No results found",
      open: controlledOpen,
      onOpenChange,
      icon,
      showArrow = true,
      menuClassName,
      menuStyle,
      onClose,
      onOpen,
      onChange,
      value,
      placeholder = "Select option...",
      error,
      errorText,
      header,
      headerAlignment = "left"
    } = _a, restProps = __objRest(_a, [
      "position",
      "options",
      "multiple",
      "searchable",
      "searchPlaceholder",
      "filterFunction",
      "closeOnSelect",
      "maxHeight",
      "trigger",
      "portal",
      "emptyMessage",
      "noResultsMessage",
      "open",
      "onOpenChange",
      "icon",
      "showArrow",
      "menuClassName",
      "menuStyle",
      "onClose",
      "onOpen",
      "onChange",
      "value",
      "placeholder",
      "error",
      "errorText",
      "header",
      "headerAlignment"
    ]);
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
    const useAnimationMode = animationsEnabled && animationMode !== "none";
    const hasIsometricAnimation = useAnimationMode && animationMode === "isometric" && variant !== "ghost" && variant !== "glassmorphic";
    const [internalOpen, setInternalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
    const setIsOpen = useCallback((open) => {
      if (controlledOpen === void 0) {
        setInternalOpen(open);
      }
      onOpenChange == null ? void 0 : onOpenChange(open);
    }, [controlledOpen, onOpenChange]);
    const containerRef = useRef(null);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const searchRef = useRef(null);
    const dropdownId = useMemo(() => generateDropdownId(), []);
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchQuery) return options;
      return filterOptions(options, searchQuery, filterFunction);
    }, [options, searchQuery, searchable, filterFunction]);
    const flatOptions = useMemo(() => flattenOptions(filteredOptions), [filteredOptions]);
    const selectableOptions = useMemo(() => getSelectableOptions(filteredOptions), [filteredOptions]);
    const displayText = useMemo(
      () => getDisplayText(value, options, multiple, placeholder),
      [value, options, multiple, placeholder]
    );
    const renderAnimatedText = (text, isTypewriter) => {
      if (!isTypewriter || typeof text !== "string") {
        return text;
      }
      return /* @__PURE__ */ React22.createElement(
        TypewriterText,
        {
          text,
          speed: 100,
          deleteSpeed: 50,
          showCursor: true,
          disabled: Boolean(disabled)
        }
      );
    };
    const handleToggle = useCallback(() => {
      if (disabled) return;
      const newOpen = !isOpen;
      if (newOpen) {
        onOpen == null ? void 0 : onOpen();
        const selectableOptions2 = getSelectableOptions(filteredOptions);
        const firstSelectableIndex = selectableOptions2.length > 0 ? 0 : -1;
        setHighlightedIndex(firstSelectableIndex);
      } else {
        onClose == null ? void 0 : onClose();
      }
      setIsOpen(newOpen);
      if (!newOpen) {
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    }, [disabled, isOpen, setIsOpen, onOpen, onClose, filteredOptions]);
    const handleClose = useCallback(() => {
      setIsOpen(false);
      setSearchQuery("");
      setHighlightedIndex(-1);
      onClose == null ? void 0 : onClose();
    }, [setIsOpen, onClose]);
    const handleOptionSelect = useCallback((option) => {
      if (option.disabled) return;
      const newValue = handleSelectionChange(option.value, value, multiple, onChange);
      if (!multiple && closeOnSelect) {
        handleClose();
      }
      return newValue;
    }, [value, multiple, onChange, closeOnSelect, handleClose]);
    const handleOptionClick = useCallback((option) => {
      handleOptionSelect(option);
    }, [handleOptionSelect]);
    const handleSearchChange = useCallback((e) => {
      setSearchQuery(e.target.value);
      setHighlightedIndex(-1);
    }, []);
    const handleKeyDownInternal = useCallback((e) => {
      handleKeyDown2(
        e,
        isOpen,
        highlightedIndex,
        selectableOptions,
        handleToggle,
        (index) => {
          const option = selectableOptions[index];
          if (option) handleOptionSelect(option);
        },
        setHighlightedIndex,
        handleClose
      );
    }, [isOpen, highlightedIndex, selectableOptions, handleToggle, handleOptionSelect, handleClose]);
    useClickOutside(containerRef, handleClose, isOpen);
    useFocusManagement(isOpen, triggerRef, menuRef);
    useEffect(() => {
      setHighlightedIndex(-1);
    }, [filteredOptions]);
    const baseStyles = useMemo(
      () => createBaseStyles7(size, shape, animationsEnabled, width, rounded),
      [size, shape, animationsEnabled, width, rounded]
    );
    const colorVariables = useMemo(
      () => getColorVariables9(color, customColor, cssVars),
      [color, customColor, cssVars]
    );
    const triggerStyles = useMemo(() => {
      const baseStyles2 = getTriggerStyles(color, variant, size, shape, Boolean(disabled), Boolean(error), isOpen, customColor, cssVars, animationsEnabled, rounded);
      const shouldShowFocus = (isFocused || isOpen) && !disabled;
      const focusStyles = shouldShowFocus ? getFocusStyles2(cssVars, variant, Boolean(error), colorVariables) : {};
      const isometricStyles = hasIsometricAnimation ? getIsometricStyles3(colorVariables, variant) : {};
      return __spreadValues(__spreadValues(__spreadValues({}, baseStyles2), focusStyles), isometricStyles);
    }, [color, customColor, variant, size, disabled, error, isOpen, shape, rounded, cssVars, animationsEnabled, isFocused, hasIsometricAnimation, colorVariables]);
    const arrowStyles = useMemo(
      () => getArrowStyles(size, isOpen, animationsEnabled, cssVars, variant, colorVariables),
      [size, isOpen, animationsEnabled, cssVars, variant, colorVariables]
    );
    const menuStyles = useMemo(
      () => getMenuStyles(position, maxHeight, Boolean(rounded) || shape === "round", cssVars, animationsEnabled),
      [position, maxHeight, shape, rounded, cssVars, animationsEnabled]
    );
    const searchStyles = useMemo(
      () => getSearchStyles(size, Boolean(rounded) || shape === "round", cssVars, variant),
      [size, shape, rounded, cssVars, variant]
    );
    const combinedStyles = __spreadValues(__spreadValues({}, baseStyles), style);
    const combinedMenuStyles = __spreadValues(__spreadValues({}, menuStyles), menuStyle);
    const accessibilityProps = createAccessibilityProps2(dropdownId, isOpen, highlightedIndex, Boolean(error));
    const menuAccessibilityProps = createMenuAccessibilityProps(dropdownId);
    const handleMouseEnter = useCallback((e) => {
      if (!disabled && animationsEnabled && hasIsometricAnimation && variant !== "ghost" && variant !== "glassmorphic") {
        e.currentTarget.style.transform = "translateY(3px)";
        e.currentTarget.style.borderBottomWidth = "3px";
        const borderColor = variant === "outline" ? colorVariables.main : colorVariables.foreground;
        if (borderColor) {
          e.currentTarget.style.borderBottomColor = borderColor;
          if (variant === "solid") {
            e.currentTarget.style.borderTopColor = borderColor;
            e.currentTarget.style.borderRightColor = borderColor;
            e.currentTarget.style.borderLeftColor = borderColor;
          }
        }
      }
    }, [disabled, animationsEnabled, hasIsometricAnimation, variant, colorVariables]);
    const handleMouseLeave = useCallback((e) => {
      if (!disabled && hasIsometricAnimation && variant !== "ghost" && variant !== "glassmorphic") {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderBottomWidth = "6px";
        const borderColor = variant === "outline" ? colorVariables.main : colorVariables.foreground;
        if (borderColor) {
          e.currentTarget.style.borderBottomColor = borderColor;
          if (variant === "solid") {
            e.currentTarget.style.borderTopColor = borderColor;
            e.currentTarget.style.borderRightColor = borderColor;
            e.currentTarget.style.borderLeftColor = borderColor;
          }
        }
      }
    }, [disabled, hasIsometricAnimation, variant, colorVariables]);
    const renderTrigger = () => {
      if (trigger) {
        const customTrigger = React22.cloneElement(trigger, __spreadValues({
          onClick: handleToggle,
          onKeyDown: handleKeyDownInternal,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false)
        }, accessibilityProps));
        if (useAnimationMode && animationMode === "parallax") {
          return /* @__PURE__ */ React22.createElement(ParallaxTiltWrapper, { disabled: disabled || !useAnimationMode }, customTrigger);
        }
        return customTrigger;
      }
      const triggerButton = /* @__PURE__ */ React22.createElement(
        "button",
        __spreadValues({
          ref: triggerRef,
          type: "button",
          style: triggerStyles,
          onClick: handleToggle,
          onKeyDown: handleKeyDownInternal,
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          disabled
        }, accessibilityProps),
        /* @__PURE__ */ React22.createElement("div", { style: getValueDisplayStyles() }, icon && /* @__PURE__ */ React22.createElement("span", { style: { marginRight: "8px" } }, icon), multiple && Array.isArray(value) && value.length > 0 ? /* @__PURE__ */ React22.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "2px" } }, value.slice(0, 3).map((val) => {
          const option = flatOptions.find((opt) => opt.value === val);
          const label = typeof (option == null ? void 0 : option.label) === "string" ? option.label : val.toString();
          return /* @__PURE__ */ React22.createElement("span", { key: val, style: getMultiValueStyles(size, Boolean(rounded) || shape === "round", cssVars, variant, colorVariables) }, label);
        }), value.length > 3 && /* @__PURE__ */ React22.createElement("span", { style: getMultiValueStyles(size, Boolean(rounded) || shape === "round", cssVars, variant, colorVariables) }, "+", value.length - 3)) : /* @__PURE__ */ React22.createElement("span", { style: value ? {} : getPlaceholderStyles(cssVars, variant, colorVariables) }, renderAnimatedText(displayText, useAnimationMode && animationMode === "typewriter"))),
        showArrow && /* @__PURE__ */ React22.createElement("div", { style: arrowStyles }, /* @__PURE__ */ React22.createElement(Icon, { name: "NavArrowDown", size: size === "lg" ? "md" : "sm" }))
      );
      if (useAnimationMode && animationMode === "parallax") {
        return /* @__PURE__ */ React22.createElement(ParallaxTiltWrapper, { disabled: disabled || !useAnimationMode }, triggerButton);
      }
      return triggerButton;
    };
    const renderOption = (option, index, globalIndex) => {
      const selected = isSelected(option.value, value, multiple);
      const highlighted = globalIndex === highlightedIndex;
      const optionStyles = getOptionStyles(size, selected, !!option.disabled, highlighted, cssVars, animationsEnabled, variant, colorVariables);
      const optionAccessibilityProps = createOptionAccessibilityProps(dropdownId, globalIndex, selected, !!option.disabled);
      return /* @__PURE__ */ React22.createElement(React22.Fragment, { key: option.value }, option.divider && /* @__PURE__ */ React22.createElement("div", { style: getDividerStyles(cssVars) }), /* @__PURE__ */ React22.createElement(
        "button",
        __spreadValues({
          type: "button",
          style: optionStyles,
          onClick: () => !option.disabled && handleOptionClick(option),
          onMouseEnter: () => setHighlightedIndex(globalIndex),
          disabled: option.disabled
        }, optionAccessibilityProps),
        option.icon && /* @__PURE__ */ React22.createElement("span", { style: { marginRight: "8px" } }, option.icon),
        /* @__PURE__ */ React22.createElement("div", { style: { flex: 1, textAlign: "left" } }, /* @__PURE__ */ React22.createElement("div", null, option.label), option.description && /* @__PURE__ */ React22.createElement("div", { style: {
          fontSize: "0.875em",
          opacity: 0.7,
          marginTop: "2px"
        } }, option.description)),
        selected && multiple && /* @__PURE__ */ React22.createElement("span", { style: { marginLeft: "8px" } }, /* @__PURE__ */ React22.createElement(Icon, { name: "Check", size: "sm" }))
      ));
    };
    const renderMenuContent = () => {
      if (loading) {
        return /* @__PURE__ */ React22.createElement("div", { style: getLoadingStyles(size, cssVars) }, "Loading...");
      }
      if (filteredOptions.length === 0) {
        return /* @__PURE__ */ React22.createElement("div", { style: getEmptyStyles(size, cssVars) }, searchQuery ? noResultsMessage : emptyMessage);
      }
      let globalIndex = 0;
      return filteredOptions.map((item, groupIndex) => {
        if (isGroup(item)) {
          return /* @__PURE__ */ React22.createElement("div", { key: `group-${groupIndex}` }, item.label && /* @__PURE__ */ React22.createElement("div", { style: getGroupLabelStyles(size, cssVars) }, item.label), item.options.map((option, optionIndex) => {
            const currentGlobalIndex = globalIndex++;
            return renderOption(option, optionIndex, currentGlobalIndex);
          }));
        } else {
          const currentGlobalIndex = globalIndex++;
          return renderOption(item, groupIndex, currentGlobalIndex);
        }
      });
    };
    const renderMenu = () => {
      if (!isOpen) return null;
      const menuContent = /* @__PURE__ */ React22.createElement(
        "div",
        __spreadValues({
          ref: menuRef,
          style: combinedMenuStyles,
          className: menuClassName
        }, menuAccessibilityProps),
        searchable && /* @__PURE__ */ React22.createElement("div", { style: {
          padding: "8px",
          borderBottom: `1px solid ${cssVars.border}`,
          position: "relative",
          display: "flex",
          alignItems: "center"
        } }, /* @__PURE__ */ React22.createElement(
          Icon,
          {
            name: "Search",
            size: "sm",
            style: {
              position: "absolute",
              left: "16px",
              zIndex: 1,
              color: cssVars.foregroundAccent || cssVars.foreground,
              pointerEvents: "none"
            }
          }
        ), /* @__PURE__ */ React22.createElement(
          "input",
          {
            ref: searchRef,
            type: "text",
            placeholder: searchPlaceholder,
            value: searchQuery,
            onChange: handleSearchChange,
            style: __spreadProps(__spreadValues({}, searchStyles), {
              paddingLeft: "36px"
              // Add space for the icon
            }),
            autoComplete: "off"
          }
        )),
        /* @__PURE__ */ React22.createElement(
          "div",
          {
            className: "dropdown-scrollable-content",
            style: {
              maxHeight,
              overflowY: "auto",
              // Hide scrollbar for IE and Edge
              msOverflowStyle: "none",
              // Hide scrollbar for Firefox
              scrollbarWidth: "none"
            }
          },
          renderMenuContent()
        )
      );
      return portal ? createDropdownPortal(menuContent) : menuContent;
    };
    const renderHeader = () => {
      let headerText = null;
      let isErrorText = false;
      if (error && errorText && errorText.toString().trim()) {
        headerText = errorText;
        isErrorText = true;
      } else if (header && header.toString().trim()) {
        headerText = header;
        isErrorText = false;
      }
      if (!headerText || headerText.toString().trim() === "") return null;
      const headerColor = isErrorText ? cssVars.destructive : colorVariables.main || cssVars.primary;
      return /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: {
            textAlign: headerAlignment,
            color: headerColor,
            fontWeight: "500",
            fontSize: "14px",
            fontFamily: "inherit",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            marginBottom: "0px",
            // Remove margin since positioning is absolute
            // Constrain the header to not be wider than the dropdown
            display: "block",
            overflow: "hidden",
            // Hide any overflow
            boxSizing: "border-box"
          }
        },
        renderAnimatedText(headerText, useAnimationMode && animationMode === "typewriter")
      );
    };
    const dropdownElement = /* @__PURE__ */ React22.createElement(
      "div",
      __spreadValues({
        ref: ref || containerRef,
        style: combinedStyles,
        id,
        className,
        "data-testid": dataTestId
      }, restProps),
      renderTrigger(),
      renderMenu()
    );
    const shouldIncludeHeader = header || error && errorText;
    const completeElement = shouldIncludeHeader ? /* @__PURE__ */ React22.createElement("div", { style: {
      position: "relative",
      display: "inline-block"
    } }, /* @__PURE__ */ React22.createElement("div", { style: {
      // Position header absolutely to avoid affecting container size
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      transform: "translateY(calc(-100% - 8px))"
      // Move up by full height + spacing
    } }, renderHeader()), dropdownElement) : dropdownElement;
    return completeElement;
  }
);
Dropdown.displayName = "Dropdown";

// src/app/components/atoms/Notification/Notification.styles.ts
var getColorVariables10 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles9 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "24px" };
    default:
      return { borderRadius: "12px" };
  }
};
var getSizeConfig3 = (size) => {
  const configs = {
    xs: {
      padding: "8px 12px",
      fontSize: "11px",
      lineHeight: 1.4,
      iconSize: "14px",
      titleSize: "12px",
      descriptionSize: "10px",
      buttonPadding: "2px 6px",
      buttonFontSize: "10px",
      dismissButtonSize: "18px",
      dismissIconSize: "12px"
    },
    sm: {
      padding: "12px 16px",
      fontSize: "12px",
      lineHeight: 1.4,
      iconSize: "16px",
      titleSize: "14px",
      descriptionSize: "11px",
      buttonPadding: "4px 8px",
      buttonFontSize: "11px",
      dismissButtonSize: "20px",
      dismissIconSize: "14px"
    },
    md: {
      padding: "16px 20px",
      fontSize: "14px",
      lineHeight: 1.5,
      iconSize: "20px",
      titleSize: "16px",
      descriptionSize: "13px",
      buttonPadding: "6px 12px",
      buttonFontSize: "12px",
      dismissButtonSize: "24px",
      dismissIconSize: "16px"
    },
    lg: {
      padding: "20px 24px",
      fontSize: "16px",
      lineHeight: 1.5,
      iconSize: "24px",
      titleSize: "18px",
      descriptionSize: "14px",
      buttonPadding: "8px 16px",
      buttonFontSize: "13px",
      dismissButtonSize: "28px",
      dismissIconSize: "18px"
    },
    xl: {
      padding: "24px 28px",
      fontSize: "18px",
      lineHeight: 1.6,
      iconSize: "28px",
      titleSize: "20px",
      descriptionSize: "16px",
      buttonPadding: "10px 20px",
      buttonFontSize: "14px",
      dismissButtonSize: "32px",
      dismissIconSize: "20px"
    }
  };
  return configs[size];
};
var createNotificationContainerStyles = (size, rounded, animationsEnabled) => {
  const finalShape = rounded ? "pill" : "round";
  return __spreadValues({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "auto",
    height: "auto",
    minWidth: "300px",
    maxWidth: "500px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-smooth)" : "none"
  }, getShapeStyles9(finalShape));
};
var getNotificationStyles = (color, customColor, variant, size, disabled, cssVars) => {
  const colors = getColorVariables10(color, customColor, cssVars);
  const sizeConfig = getSizeConfig3(size);
  const baseStyles = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    width: "100%",
    padding: sizeConfig.padding,
    borderTopWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "1px",
    borderLeftWidth: "1px",
    borderStyle: "solid",
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    transition: "background-color var(--duration-fast) var(--animation-smooth), border-color var(--duration-fast) var(--animation-smooth)",
    position: "relative"
  };
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.main,
          borderTopColor: colors.main,
          borderRightColor: colors.main,
          borderBottomColor: colors.main,
          borderLeftColor: colors.main,
          color: colors.foreground
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: colors.main,
          borderLeftWidth: "4px",
          color: colors.main
        };
      case "glassmorphic":
        return {
          backgroundColor: colors.background,
          borderTopColor: colors.border || cssVars.border,
          borderRightColor: colors.border || cssVars.border,
          borderBottomColor: colors.border || cssVars.border,
          borderLeftColor: colors.main,
          borderLeftWidth: "4px",
          color: colors.main,
          backdropFilter: "blur(12px)"
        };
      case "outline":
      default:
        return {
          backgroundColor: cssVars.background,
          borderTopColor: colors.border || cssVars.border,
          borderRightColor: colors.border || cssVars.border,
          borderBottomColor: colors.border || cssVars.border,
          borderLeftColor: colors.main,
          borderLeftWidth: "4px",
          color: cssVars.foreground
        };
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getIconStyles = (size, color, cssVars) => {
  const sizeConfig = getSizeConfig3(size);
  return {
    fontSize: sizeConfig.iconSize,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2px",
    color: "currentColor"
  };
};
var getContentStyles = () => ({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column"
});
var getTitleStyles = (size, cssVars) => {
  const sizeConfig = getSizeConfig3(size);
  return {
    fontSize: sizeConfig.titleSize,
    fontWeight: 600,
    margin: 0,
    color: "inherit",
    lineHeight: 1.4
  };
};
var getDescriptionStyles2 = (size, cssVars) => {
  const sizeConfig = getSizeConfig3(size);
  return {
    fontSize: sizeConfig.descriptionSize,
    margin: "4px 0 0 0",
    opacity: 0.8,
    color: "inherit",
    lineHeight: 1.4
  };
};
var getActionsStyles = (size) => {
  return {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "12px"
  };
};
var getActionButtonStyles = (variant, size, cssVars, animationsEnabled, notificationVariant, notificationColor) => {
  const sizeConfig = getSizeConfig3(size);
  const getNotificationColors = (color) => {
    const colorMap = {
      primary: {
        main: cssVars.primary,
        background: cssVars.primaryBackground,
        foreground: cssVars.primaryForeground,
        hover: cssVars.primaryHover,
        accent: cssVars.primaryAccent,
        border: cssVars.primaryBorder
      },
      secondary: {
        main: cssVars.secondary,
        background: cssVars.secondaryBackground,
        foreground: cssVars.secondaryForeground,
        hover: cssVars.secondaryHover,
        accent: cssVars.secondaryAccent,
        border: cssVars.secondaryBorder
      },
      success: {
        main: cssVars.success,
        background: cssVars.successBackground,
        foreground: cssVars.successForeground,
        hover: cssVars.successHover,
        accent: cssVars.successAccent,
        border: cssVars.successBorder
      },
      warning: {
        main: cssVars.warning,
        background: cssVars.warningBackground,
        foreground: cssVars.warningForeground,
        hover: cssVars.warningHover,
        accent: cssVars.warningAccent,
        border: cssVars.warningBorder
      },
      destructive: {
        main: cssVars.destructive,
        background: cssVars.destructiveBackground,
        foreground: cssVars.destructiveForeground,
        hover: cssVars.destructiveHover,
        accent: cssVars.destructiveAccent,
        border: cssVars.destructiveBorder
      },
      info: {
        main: cssVars.info,
        background: cssVars.infoBackground,
        foreground: cssVars.infoForeground,
        hover: cssVars.infoHover,
        accent: cssVars.infoAccent,
        border: cssVars.infoBorder
      }
    };
    return colorMap[color] || colorMap.primary;
  };
  const colors = getNotificationColors(notificationColor || "primary");
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: sizeConfig.buttonPadding,
    fontSize: sizeConfig.buttonFontSize,
    fontWeight: 500,
    borderTopWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "1px",
    borderLeftWidth: "1px",
    borderStyle: "solid",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-smooth)" : "none"
  };
  const variantStyles = (() => {
    const isInSolidNotification = notificationVariant === "solid";
    switch (variant) {
      case "solid":
        if (isInSolidNotification) {
          return {
            backgroundColor: colors.foreground,
            borderTopColor: colors.foreground,
            borderRightColor: colors.foreground,
            borderBottomColor: colors.foreground,
            borderLeftColor: colors.foreground,
            color: colors.main
          };
        } else {
          return {
            backgroundColor: colors.main,
            borderTopColor: colors.main,
            borderRightColor: colors.main,
            borderBottomColor: colors.main,
            borderLeftColor: colors.main,
            color: colors.foreground
          };
        }
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
          color: isInSolidNotification ? colors.foreground : colors.main
        };
      case "outline":
      default:
        if (isInSolidNotification) {
          return {
            backgroundColor: "transparent",
            borderTopColor: colors.foreground,
            borderRightColor: colors.foreground,
            borderBottomColor: colors.foreground,
            borderLeftColor: colors.foreground,
            color: colors.foreground
          };
        } else {
          return {
            backgroundColor: "transparent",
            borderTopColor: colors.main,
            borderRightColor: colors.main,
            borderBottomColor: colors.main,
            borderLeftColor: colors.main,
            color: colors.main
          };
        }
    }
  })();
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getDismissButtonStyles = (size, cssVars, animationsEnabled) => {
  const sizeConfig = getSizeConfig3(size);
  return {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: sizeConfig.dismissButtonSize,
    height: sizeConfig.dismissButtonSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    opacity: 0.6,
    color: "inherit",
    fontSize: sizeConfig.dismissIconSize,
    transition: animationsEnabled ? "opacity var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth)" : "none"
  };
};
var getTypeIcon = (color) => {
  switch (color) {
    case "primary":
      return "InfoCircle";
    case "secondary":
      return "Bell";
    case "warning":
      return "WarningTriangle";
    case "destructive":
      return "XmarkCircle";
    case "success":
      return "CheckCircle";
    case "info":
      return "InfoCircle";
    case "custom":
    default:
      return "Bell";
  }
};
var getIconSize4 = (notificationSize) => {
  switch (notificationSize) {
    case "sm":
      return "sm";
    case "lg":
      return "md";
    case "md":
    default:
      return "sm";
  }
};
var getTypeColor = (color, cssVars, variant) => {
  if (variant === "solid") {
    switch (color) {
      case "primary":
        return cssVars.primaryForeground;
      case "secondary":
        return cssVars.secondaryForeground;
      case "warning":
        return cssVars.warningForeground;
      case "destructive":
        return cssVars.destructiveForeground;
      case "success":
        return cssVars.successForeground;
      case "info":
        return cssVars.infoForeground;
      case "custom":
      default:
        return cssVars.foreground;
    }
  }
  if (variant === "outline") {
    return cssVars.foreground;
  }
  switch (color) {
    case "primary":
      return cssVars.primary;
    case "secondary":
      return cssVars.secondary;
    case "warning":
      return cssVars.warning;
    case "destructive":
      return cssVars.destructive || cssVars.error;
    case "success":
      return cssVars.success;
    case "info":
      return cssVars.info;
    case "custom":
    default:
      return cssVars.foreground;
  }
};
var createTypeIcon = (color, size, cssVars, customIcon, variant) => {
  if (customIcon) {
    return /* @__PURE__ */ React22.createElement("span", null, customIcon);
  }
  const iconName = getTypeIcon(color);
  const iconSize = getIconSize4(size);
  const iconColor = getTypeColor(color, cssVars, variant);
  return /* @__PURE__ */ React22.createElement(
    Icon,
    {
      name: iconName,
      size: iconSize,
      style: { color: iconColor }
    }
  );
};
var generateNotificationId = () => {
  return `notification-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
};
var handleKeyDown3 = (event, onDismiss) => {
  if (event.key === "Escape" && onDismiss) {
    event.preventDefault();
    onDismiss();
  }
};
var setupAutoDismiss = (duration, onDismiss) => {
  if (!duration || duration <= 0 || !onDismiss) {
    return null;
  }
  const timeoutId = setTimeout(() => {
    onDismiss();
  }, duration);
  return () => clearTimeout(timeoutId);
};
var getAriaLabel = (color, title, description) => {
  const typeLabel = color.charAt(0).toUpperCase() + color.slice(1);
  const baseLabel = `${typeLabel} notification: ${title}`;
  if (description) {
    return `${baseLabel}. ${description}`;
  }
  return baseLabel;
};

// src/app/components/atoms/Notification/Notification.tsx
var Notification = forwardRef(
  (allProps, ref) => {
    var _b;
    const [containerProps, componentProps] = extractContainerProps(allProps);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = UNIVERSAL_DEFAULTS.variant,
      shape = UNIVERSAL_DEFAULTS.shape,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      loadingKey,
      width,
      height,
      className,
      style,
      id,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      rounded,
      // Legacy support
      children,
      onClick,
      onAsyncClick
    } = containerProps;
    const _a = componentProps, {
      title,
      description,
      dismissible = true,
      showIcon = true,
      customIcon,
      actions,
      onDismiss,
      duration,
      showProgress,
      toastPosition,
      type
    } = _a, restProps = __objRest(_a, [
      "title",
      "description",
      "dismissible",
      "showIcon",
      "customIcon",
      "actions",
      "onDismiss",
      "duration",
      "showProgress",
      "toastPosition",
      "type"
    ]);
    const effectiveColor = type && allProps.color === void 0 ? type === "default" ? "primary" : type === "inverted" ? "secondary" : type : color;
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
    const notificationId = useMemo(() => id || generateNotificationId(), [id]);
    useEffect(() => {
      const cleanup = setupAutoDismiss(duration != null ? duration : null, onDismiss);
      return cleanup || void 0;
    }, [duration, onDismiss]);
    const handleDismiss = useCallback(() => {
      onDismiss == null ? void 0 : onDismiss();
    }, [onDismiss]);
    const handleKeyDownInternal = useCallback((event) => {
      handleKeyDown3(event, dismissible ? handleDismiss : void 0);
    }, [dismissible, handleDismiss]);
    const baseStyles = useMemo(
      () => createNotificationContainerStyles(size, shape === "pill" || Boolean(rounded), animationsEnabled),
      [size, shape, rounded, animationsEnabled]
    );
    const notificationStyles = useMemo(
      () => getNotificationStyles(effectiveColor, customColor, variant, size, disabled, cssVars),
      [effectiveColor, customColor, variant, size, disabled, cssVars]
    );
    const iconContainerStyles = useMemo(
      () => getIconStyles(size),
      [size, effectiveColor, cssVars]
    );
    useMemo(
      () => getContentStyles(),
      []
    );
    const titleStyles = useMemo(
      () => getTitleStyles(size),
      [size, cssVars]
    );
    const descriptionStyles = useMemo(
      () => getDescriptionStyles2(size),
      [size, cssVars]
    );
    useMemo(
      () => getActionsStyles(),
      [size]
    );
    useMemo(
      () => getDismissButtonStyles(size, cssVars, animationsEnabled),
      [size, cssVars, animationsEnabled]
    );
    const combinedStyles = __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, baseStyles), notificationStyles), {
      width,
      height,
      // Combine loading and disabled states properly
      opacity: disabled ? 0.6 : loading ? 0.7 : void 0,
      cursor: disabled ? "not-allowed" : loading ? "wait" : void 0
    }), style);
    const ariaLabel = getAriaLabel(effectiveColor, title, description);
    return /* @__PURE__ */ React22.createElement(
      "div",
      __spreadValues({
        ref,
        id: id || notificationId,
        role: "alert",
        "aria-label": ariaLabel,
        className,
        style: combinedStyles,
        onKeyDown: handleKeyDownInternal,
        tabIndex: dismissible ? 0 : void 0,
        "data-testid": dataTestId,
        onClick
      }, restProps),
      /* @__PURE__ */ React22.createElement("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%"
      } }, /* @__PURE__ */ React22.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px", flex: 1 } }, showIcon && /* @__PURE__ */ React22.createElement("div", { style: iconContainerStyles }, loading ? /* @__PURE__ */ React22.createElement(
        ProgressIndicator,
        {
          type: "circular",
          size: size === "xs" ? "xs" : size === "sm" ? "sm" : size === "lg" ? "md" : "sm",
          color: variant === "outline" ? "primary" : effectiveColor,
          variant: variant === "solid" ? "solid" : "outline",
          disabled
        }
      ) : createTypeIcon(effectiveColor, size, cssVars, customIcon, variant)), /* @__PURE__ */ React22.createElement("h4", { style: titleStyles }, title)), dismissible && onDismiss && !loading && !disabled && /* @__PURE__ */ React22.createElement(
        "button",
        {
          onClick: handleDismiss,
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: 0.6,
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            transition: animationsEnabled ? "opacity 0.2s ease-in-out" : "none",
            width: size === "sm" ? "20px" : size === "lg" ? "28px" : "24px",
            height: size === "sm" ? "20px" : size === "lg" ? "28px" : "24px",
            fontSize: size === "sm" ? "16px" : size === "lg" ? "20px" : "18px",
            marginLeft: "12px",
            flexShrink: 0
          },
          "aria-label": "Dismiss notification",
          onMouseEnter: (e) => {
            if (animationsEnabled) {
              e.currentTarget.style.opacity = "1";
            }
          },
          onMouseLeave: (e) => {
            if (animationsEnabled) {
              e.currentTarget.style.opacity = "0.6";
            }
          }
        },
        /* @__PURE__ */ React22.createElement(Icon, { name: "Xmark", size: size === "lg" ? "md" : "sm" })
      )),
      (description || children || actions && actions.length > 0) && /* @__PURE__ */ React22.createElement("div", { style: { margin: "4px 0" } }, /* @__PURE__ */ React22.createElement(
        Divider,
        {
          color: effectiveColor === "primary" ? "primary" : effectiveColor === "secondary" ? "secondary" : effectiveColor === "warning" ? "warning" : effectiveColor === "destructive" ? "destructive" : effectiveColor === "success" ? "success" : effectiveColor === "info" ? "info" : "primary",
          rounded: shape === "pill" || Boolean(rounded),
          size: "sm"
        }
      )),
      (description || children || actions && actions.length > 0) && /* @__PURE__ */ React22.createElement("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        gap: "12px"
      } }, /* @__PURE__ */ React22.createElement("div", { style: { flex: 1 } }, description && /* @__PURE__ */ React22.createElement("p", { style: __spreadProps(__spreadValues({}, descriptionStyles), {
        margin: "0"
      }) }, description), children && /* @__PURE__ */ React22.createElement("div", { style: { marginTop: description ? "4px" : "0" } }, children)), actions && actions.length > 0 && !loading && !disabled && /* @__PURE__ */ React22.createElement("div", { style: {
        display: "flex",
        gap: "8px",
        alignItems: "flex-start",
        flexWrap: "wrap",
        flexShrink: 0
      } }, actions.map((action, index) => {
        const actionVariant = action.variant || "outline";
        const baseStyles2 = getActionButtonStyles(actionVariant, size, cssVars, animationsEnabled, variant, effectiveColor);
        const getHoverColors = (color2) => {
          var _a2;
          const colorMap = {
            primary: { hover: cssVars.primaryHover },
            secondary: { hover: cssVars.secondaryHover },
            success: { hover: cssVars.successHover },
            warning: { hover: cssVars.warningHover },
            destructive: { hover: cssVars.destructiveHover },
            info: { hover: cssVars.infoHover }
          };
          return ((_a2 = colorMap[color2]) == null ? void 0 : _a2.hover) || cssVars.primaryHover;
        };
        const hoverColor = getHoverColors(effectiveColor);
        return /* @__PURE__ */ React22.createElement(
          "button",
          {
            key: index,
            onClick: action.onClick,
            style: baseStyles2,
            onMouseEnter: (e) => {
              if (animationsEnabled) {
                const isInSolidNotification = variant === "solid";
                if (actionVariant === "solid") {
                  if (isInSolidNotification) {
                    e.currentTarget.style.backgroundColor = cssVars.foregroundAccent;
                    e.currentTarget.style.borderTopColor = cssVars.foregroundAccent;
                    e.currentTarget.style.borderRightColor = cssVars.foregroundAccent;
                    e.currentTarget.style.borderBottomColor = cssVars.foregroundAccent;
                    e.currentTarget.style.borderLeftColor = cssVars.foregroundAccent;
                    e.currentTarget.style.color = hoverColor;
                  } else {
                    e.currentTarget.style.backgroundColor = hoverColor;
                    e.currentTarget.style.borderTopColor = hoverColor;
                    e.currentTarget.style.borderRightColor = hoverColor;
                    e.currentTarget.style.borderBottomColor = hoverColor;
                    e.currentTarget.style.borderLeftColor = hoverColor;
                  }
                } else if (actionVariant === "outline") {
                  if (isInSolidNotification) {
                    e.currentTarget.style.backgroundColor = cssVars.foregroundAccent;
                  } else {
                    const notificationBg = cssVars[`${effectiveColor}Background`] || cssVars.primaryBackground;
                    e.currentTarget.style.backgroundColor = notificationBg;
                    e.currentTarget.style.borderTopColor = hoverColor;
                    e.currentTarget.style.borderRightColor = hoverColor;
                    e.currentTarget.style.borderBottomColor = hoverColor;
                    e.currentTarget.style.borderLeftColor = hoverColor;
                    e.currentTarget.style.color = hoverColor;
                  }
                } else if (actionVariant === "ghost") {
                  const ghostBg = cssVars[`${effectiveColor}Background`] || cssVars.primaryBackground;
                  e.currentTarget.style.backgroundColor = ghostBg;
                  e.currentTarget.style.color = hoverColor;
                }
              }
            },
            onMouseLeave: (e) => {
              if (animationsEnabled) {
                Object.assign(e.currentTarget.style, baseStyles2);
              }
            }
          },
          action.label
        );
      })))
    );
  }
);
Notification.displayName = "Notification";

// src/app/components/atoms/Search/Search.styles.ts
var getColorVariables11 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getSearchDimensions = (size) => {
  switch (size) {
    case "xs":
      return {
        height: 40,
        // Matches Button xs height
        minWidth: 200,
        fontSize: "14px",
        iconSize: 16,
        paddingX: 8,
        paddingY: 6,
        borderRadius: 12
      };
    case "sm":
      return {
        height: 40,
        // Matches Button sm height
        minWidth: 220,
        fontSize: "14px",
        iconSize: 18,
        paddingX: 10,
        paddingY: 8,
        borderRadius: 12
      };
    case "lg":
      return {
        height: 52,
        // Matches Button lg height
        minWidth: 260,
        fontSize: "16px",
        iconSize: 22,
        paddingX: 14,
        paddingY: 12,
        borderRadius: 12
      };
    case "xl":
      return {
        height: 60,
        // Matches Button xl height
        minWidth: 280,
        fontSize: "18px",
        iconSize: 24,
        paddingX: 16,
        paddingY: 14,
        borderRadius: 12
      };
    case "md":
    default:
      return {
        height: 48,
        // Matches Button md height
        minWidth: 240,
        fontSize: "16px",
        // Updated to match Button md fontSize
        iconSize: 20,
        paddingX: 12,
        paddingY: 10,
        borderRadius: 12
      };
  }
};
var getVariantStyles7 = (variant, color, customColor, cssVars, error) => {
  const colors = getColorVariables11(color, customColor, cssVars);
  if (error) {
    const baseErrorStyle = {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: cssVars.destructive
    };
    switch (variant) {
      case "solid":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: cssVars.destructiveAccent || cssVars.destructive,
          color: colors.foreground
          // Keep original foreground color, not destructive
        });
      case "ghost":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: "transparent",
          color: cssVars.foreground
        });
      case "glassmorphic":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: cssVars.destructiveBackground,
          color: cssVars.destructiveForeground
        });
      case "outline":
      default:
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: cssVars.background,
          color: cssVars.foreground
        });
    }
  }
  switch (variant) {
    case "solid":
      return {
        borderColor: colors.accent || colors.main,
        backgroundColor: colors.accent || colors.main,
        color: colors.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "ghost":
      return {
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: cssVars.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "glassmorphic":
      return {
        borderColor: colors.border,
        backgroundColor: colors.background,
        color: colors.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "outline":
    default:
      return {
        borderColor: colors.main,
        backgroundColor: cssVars.background,
        color: cssVars.foreground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
  }
};
var getShapeStyles11 = (shape, size) => {
  const dimensions = getSearchDimensions(size);
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: `${dimensions.borderRadius}px` };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: `${dimensions.borderRadius}px` };
  }
};
var getSearchContainerStyles = (size, variant, color, customColor, shape, disabled, focused, error, animationsEnabled, cssVars, width) => {
  const dimensions = getSearchDimensions(size);
  const variantStyles = getVariantStyles7(variant, color, customColor, cssVars, error);
  const shapeStyles = getShapeStyles11(shape, size);
  const colors = getColorVariables11(color, customColor, cssVars);
  const baseStyles = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    width: width || "auto",
    minWidth: `${dimensions.minWidth}px`,
    height: `${dimensions.height}px`,
    fontFamily: "inherit",
    transition: animationsEnabled ? "border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none",
    cursor: disabled ? "not-allowed" : "text",
    opacity: disabled ? 0.6 : 1
  };
  const focusStyles = focused ? {
    outline: `2px solid ${error ? cssVars.destructive : colors.main}`,
    outlineOffset: "2px"
  } : {};
  return __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), shapeStyles), focusStyles);
};
var getSearchInputStyles = (size, variant, color, customColor, disabled, hasLeftIcon, hasRightIcon, cssVars) => {
  const dimensions = getSearchDimensions(size);
  const colors = getColorVariables11(color, customColor, cssVars);
  const leftPadding = hasLeftIcon ? dimensions.iconSize + dimensions.paddingX + 8 : dimensions.paddingX;
  const rightPadding = hasRightIcon ? dimensions.iconSize + dimensions.paddingX + 8 : dimensions.paddingX;
  const baseStyles = {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: dimensions.fontSize,
    lineHeight: 1.5,
    paddingLeft: `${leftPadding}px`,
    paddingRight: `${rightPadding}px`,
    paddingTop: `${dimensions.paddingY}px`,
    paddingBottom: `${dimensions.paddingY}px`,
    // Reset browser styles
    WebkitAppearance: "none",
    MozAppearance: "none"
  };
  const getInputColor = () => {
    switch (variant) {
      case "solid":
        return colors.foreground;
      case "outline":
      case "ghost":
      case "glassmorphic":
      default:
        return cssVars.foreground;
    }
  };
  return __spreadProps(__spreadValues({}, baseStyles), {
    color: getInputColor(),
    cursor: disabled ? "not-allowed" : "text"
  });
};
var getSearchIconStyles = (size, position, variant, color, customColor, disabled, clickable, animationsEnabled, cssVars) => {
  const dimensions = getSearchDimensions(size);
  const colors = getColorVariables11(color, customColor, cssVars);
  const getIconColor2 = () => {
    switch (variant) {
      case "solid":
        return colors.foreground;
      case "outline":
      case "ghost":
      case "glassmorphic":
      default:
        return cssVars.mutedForeground;
    }
  };
  const baseStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [position]: `${dimensions.paddingX}px`,
    width: `${dimensions.iconSize}px`,
    height: `${dimensions.iconSize}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    color: getIconColor2(),
    cursor: clickable && !disabled ? "pointer" : "default",
    opacity: disabled ? 0.5 : 1,
    transition: animationsEnabled ? "color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none",
    zIndex: 1
  };
  return baseStyles;
};
var getLoadingStyles2 = (size, animationsEnabled) => {
  const dimensions = getSearchDimensions(size);
  return {
    animation: animationsEnabled ? "spin 1s linear infinite" : "none",
    width: `${dimensions.iconSize}px`,
    height: `${dimensions.iconSize}px`
  };
};
var generateSearchId = /* @__PURE__ */ (() => {
  let counter = 0;
  return (prefix = "search") => `${prefix}-${++counter}`;
})();
var useFocusManagement2 = (inputRef, autoFocus = false) => {
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);
  const focus = useCallback(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, [inputRef]);
  const blur = useCallback(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.blur();
  }, [inputRef]);
  const select = useCallback(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.select();
  }, [inputRef]);
  return { focus, blur, select };
};

// src/app/components/atoms/Search/Search.tsx
var Search = forwardRef((allProps, ref) => {
  var _b;
  const [formProps, componentProps] = extractFormProps(allProps);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = "outline",
    // Search-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    error,
    label,
    helperText,
    placeholder = "Search...",
    width,
    height,
    className,
    style,
    id: providedId,
    "data-testid": dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded,
    // Legacy support
    // Form-specific props
    name,
    value: controlledValue,
    required,
    readOnly,
    autoComplete,
    autoFocus = false,
    onChange
  } = formProps;
  const _a = componentProps, {
    onSearch,
    onClear,
    showSearchIcon = true,
    showClearButton = true,
    searchIconPosition = "left",
    debounceDelay = 300,
    searchIcon,
    clearIcon,
    clearOnEscape = true
  } = _a, rest = __objRest(_a, [
    "onSearch",
    "onClear",
    "showSearchIcon",
    "showClearButton",
    "searchIconPosition",
    "debounceDelay",
    "searchIcon",
    "clearIcon",
    "clearOnEscape"
  ]);
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const inputRef = useRef(null);
  const combinedRef = ref || inputRef;
  const searchId = useMemo(() => providedId || generateSearchId(), [providedId]);
  const { focus} = useFocusManagement2(
    combinedRef,
    autoFocus
  );
  const getIconSize5 = (searchSize) => {
    const iconSizeMap = {
      xs: "sm",
      sm: "sm",
      md: "md",
      lg: "md",
      xl: "lg"
    };
    return iconSizeMap[searchSize];
  };
  const iconSize = getIconSize5(size);
  const [isFocused, setIsFocused] = useState(false);
  useCallback((searchValue) => {
    onChange == null ? void 0 : onChange(searchValue);
  }, [onChange]);
  const handleValueChange = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (isControlled) {
        onChange == null ? void 0 : onChange(newValue);
      }
    },
    [isControlled, onChange]
  );
  const handleInputChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      handleValueChange(newValue);
    },
    [handleValueChange]
  );
  const { onKeyDown: originalOnKeyDown, onFocus: originalOnFocus, onBlur: originalOnBlur } = formProps;
  const handleKeyDown6 = useCallback(
    (event) => {
      if (event.key === "Enter" && onSearch) {
        onSearch(value);
      } else if (event.key === "Escape" && clearOnEscape) {
        handleValueChange("");
        onClear == null ? void 0 : onClear();
      }
      originalOnKeyDown == null ? void 0 : originalOnKeyDown(event);
    },
    [value, onSearch, clearOnEscape, handleValueChange, onClear, originalOnKeyDown]
  );
  const handleFocus = useCallback(
    (event) => {
      setIsFocused(true);
      originalOnFocus == null ? void 0 : originalOnFocus(event);
    },
    [originalOnFocus]
  );
  const handleBlur = useCallback(
    (event) => {
      setIsFocused(false);
      originalOnBlur == null ? void 0 : originalOnBlur(event);
    },
    [originalOnBlur]
  );
  const handleSearchClick = useCallback(() => {
    if (onSearch) {
      onSearch(value);
    }
    focus();
  }, [value, onSearch, focus]);
  const handleClearIconClick = useCallback(() => {
    handleValueChange("");
    onClear == null ? void 0 : onClear();
    focus();
  }, [handleValueChange, onClear, focus]);
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  const containerStyles = useMemo(() => getSearchContainerStyles(
    size,
    variant,
    color,
    customColor,
    finalShape,
    Boolean(disabled),
    isFocused,
    Boolean(error),
    animationsEnabled,
    cssVars,
    width
  ), [size, variant, color, customColor, finalShape, disabled, isFocused, error, animationsEnabled, cssVars, width]);
  const inputStyles = useMemo(() => getSearchInputStyles(
    size,
    variant,
    color,
    customColor,
    Boolean(disabled),
    showSearchIcon && searchIconPosition === "left",
    showClearButton && Boolean(value),
    cssVars
  ), [size, variant, color, customColor, disabled, showSearchIcon, searchIconPosition, showClearButton, value, cssVars]);
  const searchIconStyles = useMemo(() => getSearchIconStyles(
    size,
    searchIconPosition,
    variant,
    color,
    customColor,
    Boolean(disabled),
    true,
    // clickable
    animationsEnabled,
    cssVars
  ), [size, searchIconPosition, variant, color, customColor, disabled, animationsEnabled, cssVars]);
  const clearIconStyles = useMemo(() => getSearchIconStyles(
    size,
    "right",
    variant,
    color,
    customColor,
    Boolean(disabled),
    true,
    // clickable
    animationsEnabled,
    cssVars
  ), [size, variant, color, customColor, disabled, animationsEnabled, cssVars]);
  const loadingStyles = useMemo(() => getLoadingStyles2(
    size,
    animationsEnabled
  ), [size, animationsEnabled]);
  const combinedStyles = __spreadValues(__spreadValues({}, containerStyles), style);
  const accessibilityProps = {
    "aria-label": label,
    "aria-invalid": Boolean(error),
    "aria-required": Boolean(required),
    "aria-disabled": Boolean(disabled)
  };
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      className,
      style: combinedStyles,
      "data-testid": dataTestId
    },
    showSearchIcon && searchIconPosition === "left" && /* @__PURE__ */ React22.createElement(
      "button",
      {
        type: "button",
        onClick: handleSearchClick,
        disabled,
        style: searchIconStyles,
        tabIndex: -1,
        "aria-label": "Search"
      },
      loading ? /* @__PURE__ */ React22.createElement("div", { style: loadingStyles }, /* @__PURE__ */ React22.createElement(Icon, { name: "Refresh", size: iconSize })) : searchIcon ? searchIcon : /* @__PURE__ */ React22.createElement(Icon, { name: "Search", size: iconSize })
    ),
    /* @__PURE__ */ React22.createElement(
      "input",
      __spreadValues(__spreadValues({
        ref: combinedRef,
        type: "text",
        id: searchId,
        name,
        value,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown6,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder,
        disabled,
        required,
        readOnly,
        autoComplete,
        autoFocus,
        style: inputStyles
      }, accessibilityProps), rest)
    ),
    showClearButton && value && !loading && /* @__PURE__ */ React22.createElement(
      "button",
      {
        type: "button",
        onClick: handleClearIconClick,
        disabled,
        style: clearIconStyles,
        tabIndex: -1,
        "aria-label": "Clear search"
      },
      clearIcon ? clearIcon : /* @__PURE__ */ React22.createElement(Icon, { name: "Cancel", size: iconSize })
    ),
    showSearchIcon && searchIconPosition === "right" && (!showClearButton || !value) && /* @__PURE__ */ React22.createElement(
      "button",
      {
        type: "button",
        onClick: handleSearchClick,
        disabled,
        style: searchIconStyles,
        tabIndex: -1,
        "aria-label": "Search"
      },
      loading ? /* @__PURE__ */ React22.createElement("div", { style: loadingStyles }, /* @__PURE__ */ React22.createElement(Icon, { name: "Refresh", size: iconSize })) : searchIcon ? searchIcon : /* @__PURE__ */ React22.createElement(Icon, { name: "Search", size: iconSize })
    )
  );
});
Search.displayName = "Search";

// src/app/components/atoms/FilePicker/FilePicker.styles.ts
var getColorVariables12 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  if (!cssVars) {
    console.warn("cssVars is undefined in FilePicker getColorVariables");
    return {
      main: "#000",
      background: "#f0f0f0",
      foreground: "#fff",
      hover: "#333",
      border: "#ccc"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles12 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "24px" };
    default:
      return { borderRadius: "12px" };
  }
};
var getSizeConfig5 = (size) => {
  const configs = {
    xs: {
      minHeight: "100px",
      padding: "12px",
      fontSize: "12px",
      iconSize: "20px"
    },
    sm: {
      minHeight: "120px",
      padding: "16px",
      fontSize: "14px",
      iconSize: "24px"
    },
    md: {
      minHeight: "160px",
      padding: "20px",
      fontSize: "16px",
      iconSize: "32px"
    },
    lg: {
      minHeight: "200px",
      padding: "24px",
      fontSize: "18px",
      iconSize: "40px"
    },
    xl: {
      minHeight: "240px",
      padding: "28px",
      fontSize: "20px",
      iconSize: "48px"
    }
  };
  return configs[size];
};
var createFilePickerContainerStyles = (shape, width, height, animationsEnabled, rounded) => {
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  return __spreadValues({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: width || "auto",
    height: height || "auto",
    minWidth: "300px",
    transition: animationsEnabled ? "border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth)" : "none"
  }, getShapeStyles12(finalShape));
};
var getFilePickerDropZoneStyles = (color, customColor, variant, size, shape, disabled, error, isDragActive, animationsEnabled, cssVars, rounded) => {
  const colors = getColorVariables12(color, customColor, cssVars);
  const sizeConfig = getSizeConfig5(size);
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  const baseStyles = __spreadValues({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: sizeConfig.minHeight,
    padding: sizeConfig.padding,
    borderWidth: "2px",
    borderStyle: "dashed",
    cursor: disabled ? "not-allowed" : "pointer",
    textAlign: "center",
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-smooth)" : "none",
    position: "relative",
    fontSize: sizeConfig.fontSize
  }, getShapeStyles12(finalShape));
  const variantStyles = (() => {
    if (error) {
      return {
        borderColor: cssVars.destructive,
        backgroundColor: cssVars.destructiveBackground,
        color: cssVars.destructive
      };
    }
    if (isDragActive) {
      return {
        borderColor: colors.main,
        backgroundColor: colors.background,
        color: colors.main,
        borderStyle: "solid"
      };
    }
    switch (variant) {
      case "solid":
        return {
          borderColor: colors.main,
          backgroundColor: colors.main,
          color: colors.foreground
        };
      case "ghost":
        return {
          borderColor: "transparent",
          backgroundColor: "transparent",
          color: colors.main
        };
      case "glassmorphic":
        const reflectionColor = colors.hover || colors.main || "#ffffff";
        const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
        const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
        return {
          background: `
            ${topReflectionGradient},
            ${bottomReflectionGradient},
            rgba(255, 255, 255, 0.1)
          `,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          // Safari support
          color: colors.main,
          borderWidth: "2px",
          borderStyle: "solid",
          borderTopColor: "rgba(255, 255, 255, 0.2)",
          borderRightColor: "rgba(255, 255, 255, 0.2)",
          borderBottomColor: "rgba(255, 255, 255, 0.2)",
          borderLeftColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: `0 8px 32px 0 ${colors.main}40`,
          // Colored shadow for glowing effect
          position: "relative",
          overflow: "hidden"
        };
      case "outline":
      default:
        return {
          borderColor: colors.border || cssVars.border,
          backgroundColor: cssVars.background,
          color: cssVars.foreground
        };
    }
  })();
  if (disabled) {
    baseStyles.opacity = 0.6;
    baseStyles.backgroundColor = cssVars.muted;
    baseStyles.color = cssVars.mutedForeground;
    baseStyles.borderColor = cssVars.border;
  }
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getIconStyles2 = (size, cssVars) => {
  const sizeConfig = getSizeConfig5(size);
  return {
    fontSize: sizeConfig.iconSize,
    marginBottom: "12px",
    opacity: 0.7,
    color: "currentColor"
  };
};
var getUploadTextStyles = (size, cssVars) => {
  const sizeConfig = getSizeConfig5(size);
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    marginBottom: "4px",
    color: "currentColor"
  };
};
var getSubTextStyles = (size, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  return {
    fontSize: fontSizeMap[size],
    color: cssVars.mutedForeground,
    marginBottom: "8px"
  };
};
var getHelperTextStyles = (size, disabled, error, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : error ? cssVars.destructive : cssVars.mutedForeground,
    marginTop: "8px",
    textAlign: "left"
  };
};
var getFileListStyles = () => ({
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
});
var getFileItemStyles = (color, customColor, variant, size, shape, disabled, animationsEnabled, cssVars, rounded) => {
  const colors = getColorVariables12(color, customColor, cssVars);
  const sizeConfig = getSizeConfig5(size);
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  const baseStyles = __spreadValues({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    fontSize: sizeConfig.fontSize,
    maxWidth: "400px",
    width: "100%",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth)" : "none"
  }, getShapeStyles12(finalShape));
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: cssVars.muted,
          color: cssVars.foreground,
          border: `1px solid ${cssVars.border}`
        };
      case "ghost":
        return {
          backgroundColor: colors.background,
          color: colors.main,
          border: `1px solid ${colors.background}`
        };
      case "glassmorphic":
        return {
          backgroundColor: colors.background,
          color: colors.main,
          border: `1px solid ${colors.border || colors.main}`
        };
      case "outline":
      default:
        return {
          backgroundColor: cssVars.muted,
          color: cssVars.foreground,
          border: `1px solid ${cssVars.border}`
        };
    }
  })();
  if (disabled) {
    baseStyles.opacity = 0.6;
  }
  return __spreadValues(__spreadValues({}, baseStyles), variantStyles);
};
var getFileInfoStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  minWidth: 0,
  flex: 1
});
var getFileNameStyles = (cssVars) => ({
  fontWeight: 500,
  color: "currentColor",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
var getFileSizeStyles = (cssVars) => ({
  fontSize: "0.875em",
  color: cssVars.mutedForeground,
  flexShrink: 0
});
var getHiddenInputStyles = () => ({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0
});
var formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
var isFileTypeAccepted = (file, accept) => {
  if (!accept) return true;
  const acceptedTypes = accept.split(",").map((type) => type.trim());
  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.startsWith(".")) {
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
    } else if (acceptedType.includes("*")) {
      const [mainType] = acceptedType.split("/");
      return file.type.startsWith(mainType);
    } else {
      return file.type === acceptedType;
    }
  });
};
var isFileSizeValid = (file, maxSize) => {
  if (!maxSize) return true;
  return file.size <= maxSize;
};
var isFileCountValid = (files, maxFiles) => {
  if (!maxFiles) return true;
  return files.length <= maxFiles;
};
var processDroppedFiles = (items, accept, maxSize, maxFiles, multiple = false) => {
  const files = [];
  const errors = [];
  Array.from(items).forEach((item) => {
    if (item.kind === "file") {
      const file = item.getAsFile();
      if (file) {
        files.push(file);
      }
    }
  });
  const filesToProcess = multiple ? files : files.slice(0, 1);
  const validFiles = [];
  filesToProcess.forEach((file) => {
    if (!isFileTypeAccepted(file, accept)) {
      errors.push(`"${file.name}" is not an accepted file type.`);
      return;
    }
    if (!isFileSizeValid(file, maxSize)) {
      errors.push(`"${file.name}" is too large. Maximum size is ${formatFileSize(maxSize)}.`);
      return;
    }
    validFiles.push(file);
  });
  if (!isFileCountValid(validFiles, maxFiles)) {
    errors.push(`Too many files. Maximum allowed is ${maxFiles}.`);
    return { validFiles: [], errors };
  }
  return { validFiles, errors };
};
var handleFileInputChange = (event, accept, maxSize, maxFiles, multiple = false) => {
  const files = Array.from(event.target.files || []);
  const errors = [];
  const filesToProcess = multiple ? files : files.slice(0, 1);
  const validFiles = [];
  filesToProcess.forEach((file) => {
    if (!isFileTypeAccepted(file, accept)) {
      errors.push(`"${file.name}" is not an accepted file type.`);
      return;
    }
    if (!isFileSizeValid(file, maxSize)) {
      errors.push(`"${file.name}" is too large. Maximum size is ${formatFileSize(maxSize)}.`);
      return;
    }
    validFiles.push(file);
  });
  if (!isFileCountValid(validFiles, maxFiles)) {
    errors.push(`Too many files. Maximum allowed is ${maxFiles}.`);
    return { validFiles: [], errors };
  }
  return { validFiles, errors };
};
var useDragAndDrop = (onFilesChange, onError, accept, maxSize, maxFiles, multiple = false, disabled = false) => {
  const [isDragActive, setIsDragActive] = React22.useState(false);
  const dragCounter = React22.useRef(0);
  const handleDragEnter = React22.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, [disabled]);
  const handleDragLeave = React22.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  }, [disabled]);
  const handleDragOver = React22.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    e.dataTransfer.dropEffect = "copy";
  }, [disabled]);
  const handleDrop = React22.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragActive(false);
    dragCounter.current = 0;
    if (e.dataTransfer.items) {
      const { validFiles, errors } = processDroppedFiles(
        e.dataTransfer.items,
        accept,
        maxSize,
        maxFiles,
        multiple
      );
      if (errors.length > 0) {
        onError == null ? void 0 : onError(errors.join(" "));
      }
      if (validFiles.length > 0) {
        onFilesChange == null ? void 0 : onFilesChange(validFiles);
      }
    }
  }, [disabled, accept, maxSize, maxFiles, multiple, onFilesChange, onError]);
  return {
    isDragActive,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop
    }
  };
};
var generateFilePickerId = () => {
  return `filepicker-${Math.random().toString(36).substr(2, 9)}`;
};
var createFilePickerAccessibilityProps = (id, disabled, error, accept, multiple) => {
  const acceptDescription = accept ? ` Accepted file types: ${accept}.` : "";
  const multipleDescription = multiple ? " You can select multiple files." : " You can select one file.";
  return {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    "aria-disabled": disabled,
    "aria-invalid": error,
    "aria-describedby": `${id}-description`,
    "aria-label": `File upload area.${acceptDescription}${multipleDescription} Click to browse or drag and drop files here.`
  };
};

// src/app/components/atoms/FilePicker/FilePicker.tsx
var FilePicker = forwardRef((allProps, ref) => {
  const [formProps, componentProps] = extractFormProps(allProps);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    loading = UNIVERSAL_DEFAULTS.loading,
    loadingKey,
    width,
    height,
    className,
    style,
    id,
    "data-testid": dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded,
    // Legacy support
    helperText,
    errorText,
    error
  } = formProps;
  const _a = componentProps, {
    accept,
    maxSize,
    maxFiles,
    uploadText,
    subText,
    icon,
    onFilesChange,
    onError,
    files,
    showFileList = true
  } = _a, restProps = __objRest(_a, [
    "accept",
    "maxSize",
    "maxFiles",
    "uploadText",
    "subText",
    "icon",
    "onFilesChange",
    "onError",
    "files",
    "showFileList"
  ]);
  const multiple = maxFiles !== 1;
  const cssVars = useCSSVariables();
  const animationsEnabled = animate;
  if (!cssVars) {
    return null;
  }
  const [internalFiles, setInternalFiles] = React22.useState([]);
  const [internalError, setInternalError] = React22.useState("");
  const fileInputRef = useRef(null);
  const filePickerId = React22.useMemo(() => id || generateFilePickerId(), [id]);
  const currentFiles = files !== void 0 ? files : internalFiles;
  const setCurrentFiles = files !== void 0 ? (newFiles) => onFilesChange == null ? void 0 : onFilesChange(newFiles) : setInternalFiles;
  const currentError = errorText || internalError;
  const isError = error || Boolean(currentError);
  useImperativeHandle(ref, () => ({
    clear: () => {
      setCurrentFiles([]);
      setInternalError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    getFiles: () => currentFiles,
    browse: () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  }));
  const { isDragActive, dragProps } = useDragAndDrop(
    (newFiles) => {
      let updatedFiles = multiple ? [...currentFiles, ...newFiles] : newFiles;
      if (maxFiles && updatedFiles.length > maxFiles) {
        updatedFiles = updatedFiles.slice(0, maxFiles);
        const errorMessage = `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed.`;
        setInternalError(errorMessage);
        onError == null ? void 0 : onError(errorMessage);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setInternalError("");
      }
      setCurrentFiles(updatedFiles);
    },
    (errorMessage) => {
      setInternalError(errorMessage);
      onError == null ? void 0 : onError(errorMessage);
    },
    accept,
    maxSize,
    maxFiles,
    multiple,
    disabled
  );
  const handleInputChange = (event) => {
    const { validFiles, errors } = handleFileInputChange(
      event,
      accept,
      maxSize,
      maxFiles,
      multiple
    );
    if (errors.length > 0) {
      const errorMessage = errors.join(" ");
      setInternalError(errorMessage);
      onError == null ? void 0 : onError(errorMessage);
      return;
    }
    let updatedFiles = multiple ? [...currentFiles, ...validFiles] : validFiles;
    if (maxFiles && updatedFiles.length > maxFiles) {
      updatedFiles = updatedFiles.slice(0, maxFiles);
      const errorMessage = `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed.`;
      setInternalError(errorMessage);
      onError == null ? void 0 : onError(errorMessage);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setInternalError("");
    }
    setCurrentFiles(updatedFiles);
  };
  const handleDropZoneClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    setCurrentFiles(updatedFiles);
    setInternalError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleKeyDown6 = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleDropZoneClick();
    }
  };
  const accessibilityProps = createFilePickerAccessibilityProps(
    filePickerId,
    disabled,
    isError,
    accept,
    multiple
  );
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      className,
      style: __spreadValues(__spreadValues({}, createFilePickerContainerStyles(shape, width, height, animationsEnabled, rounded)), style),
      "data-testid": dataTestId
    },
    /* @__PURE__ */ React22.createElement(
      "div",
      __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, dragProps), accessibilityProps), {
        onClick: handleDropZoneClick,
        onKeyDown: handleKeyDown6,
        style: getFilePickerDropZoneStyles(
          color,
          customColor,
          variant,
          size,
          shape,
          disabled,
          isError,
          isDragActive,
          animationsEnabled,
          cssVars,
          rounded
        )
      }), restProps),
      /* @__PURE__ */ React22.createElement("div", { style: getIconStyles2(size) }, icon || /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: "CloudUpload",
          size: "lg"
        }
      )),
      /* @__PURE__ */ React22.createElement("div", { style: getUploadTextStyles(size) }, isDragActive ? "Drop files here" : uploadText || "Drop files here or click to browse"),
      subText && /* @__PURE__ */ React22.createElement("div", { style: getSubTextStyles(size, cssVars) }, subText)
    ),
    helperText && !isError && /* @__PURE__ */ React22.createElement(
      "div",
      {
        id: `${filePickerId}-description`,
        style: getHelperTextStyles(size, disabled, false, cssVars)
      },
      helperText
    ),
    /* @__PURE__ */ React22.createElement(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        id: filePickerId,
        multiple,
        accept,
        onChange: handleInputChange,
        style: getHiddenInputStyles(),
        tabIndex: -1,
        "aria-hidden": "true"
      }
    ),
    isError && /* @__PURE__ */ React22.createElement(
      "div",
      {
        id: `${filePickerId}-error`,
        style: getHelperTextStyles(size, disabled, true, cssVars),
        role: "alert",
        "aria-live": "polite"
      },
      /* @__PURE__ */ React22.createElement(Icon, { name: "WarningCircle", size: "sm", style: { marginRight: "6px" } }),
      currentError
    ),
    showFileList && currentFiles.length > 0 && /* @__PURE__ */ React22.createElement("div", { style: getFileListStyles() }, currentFiles.map((file, index) => /* @__PURE__ */ React22.createElement(
      "div",
      {
        key: `${file.name}-${file.size}-${index}`,
        style: getFileItemStyles(
          color,
          customColor,
          variant,
          size,
          shape,
          disabled,
          animationsEnabled,
          cssVars,
          rounded
        )
      },
      /* @__PURE__ */ React22.createElement("div", { style: getFileInfoStyles() }, /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: "Attachment",
          size: "sm",
          style: {
            marginRight: "8px",
            flexShrink: 0
          }
        }
      ), /* @__PURE__ */ React22.createElement("div", { style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column"
      } }, /* @__PURE__ */ React22.createElement("span", { style: getFileNameStyles() }, file.name), /* @__PURE__ */ React22.createElement("span", { style: getFileSizeStyles(cssVars) }, formatFileSize(file.size)))),
      /* @__PURE__ */ React22.createElement(
        Button,
        {
          variant: "ghost",
          size: "sm",
          color: variant === "outline" || variant === "solid" ? "custom" : color,
          customColor: variant === "outline" || variant === "solid" ? cssVars.foreground : void 0,
          onClick: (e) => {
            e.stopPropagation();
            handleRemoveFile(index);
          },
          "aria-label": `Remove ${file.name}`,
          disabled,
          animate: animationsEnabled,
          style: {
            minWidth: "auto",
            padding: "4px",
            borderRadius: "50%",
            aspectRatio: "1"
          }
        },
        /* @__PURE__ */ React22.createElement(
          Icon,
          {
            name: "Xmark",
            size: "sm"
          }
        )
      )
    )))
  );
});
FilePicker.displayName = "FilePicker";

// src/app/components/atoms/RadioButton/RadioButton.styles.ts
var getColorVariables13 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getVariantStyles8 = (variant, color, customColor, cssVars, checked, error) => {
  const colors = getColorVariables13(color, customColor, cssVars);
  if (error) {
    const baseErrorStyle = {
      borderWidth: "2px",
      borderStyle: "solid"
    };
    switch (variant) {
      case "solid":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.destructiveAccent || cssVars.destructive
        });
      case "ghost":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : "transparent"
        });
      case "glassmorphic":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.destructiveBackground,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        });
      case "outline":
      default:
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          borderColor: cssVars.destructive,
          backgroundColor: checked ? cssVars.destructive : cssVars.background
        });
    }
  }
  switch (variant) {
    case "solid":
      return {
        borderColor: checked ? colors.accent || colors.main : cssVars.mutedForeground,
        backgroundColor: checked ? colors.accent || colors.main : cssVars.mutedForeground,
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "ghost":
      return {
        borderColor: checked ? colors.main : "transparent",
        backgroundColor: checked ? colors.main : "transparent",
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "glassmorphic":
      return {
        borderColor: checked ? colors.main : colors.border,
        backgroundColor: checked ? colors.main : colors.background,
        borderWidth: "2px",
        borderStyle: "solid",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      };
    case "outline":
    default:
      return {
        borderColor: checked ? colors.main : colors.main,
        backgroundColor: checked ? colors.main : cssVars.background,
        borderWidth: "2px",
        borderStyle: "solid"
      };
  }
};
var getRadioButtonDimensions = (size) => {
  switch (size) {
    case "xs":
      return {
        size: 16,
        dotSize: 6,
        padding: 2
      };
    case "sm":
      return {
        size: 18,
        dotSize: 6,
        padding: 2
      };
    case "lg":
      return {
        size: 24,
        dotSize: 10,
        padding: 3
      };
    case "xl":
      return {
        size: 28,
        dotSize: 12,
        padding: 3
      };
    case "md":
    default:
      return {
        size: 20,
        dotSize: 8,
        padding: 2
      };
  }
};
var getRadioButtonContainerStyles = (size, disabled, contentToggleable, className) => {
  return {
    display: "inline-block",
    cursor: disabled ? "not-allowed" : contentToggleable ? "pointer" : "default",
    fontFamily: "inherit"
  };
};
var getRadioButtonCircleStyles = (size, color, customColor, shape, variant, checked, disabled, focused, error, animationsEnabled, cssVars) => {
  const dimensions = getRadioButtonDimensions(size);
  const variantStyles = getVariantStyles8(variant, color, customColor, cssVars, checked, error);
  const getBorderRadius = () => {
    switch (shape) {
      case "sharp":
        return "0";
      case "round":
        return "12px";
      case "pill":
      default:
        return "50%";
    }
  };
  const getMarginTop = () => {
    const marginMap = {
      xs: "1px",
      sm: "1px",
      md: "2px",
      lg: "2px",
      xl: "3px"
    };
    return marginMap[size];
  };
  const colors = getColorVariables13(color, customColor, cssVars);
  return __spreadProps(__spreadValues({
    position: "relative",
    width: `${dimensions.size}px`,
    height: `${dimensions.size}px`,
    borderRadius: getBorderRadius()
  }, variantStyles), {
    transition: animationsEnabled ? "border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    outline: focused ? `2px solid ${colors.main}` : "none",
    outlineOffset: "2px",
    flexShrink: 0,
    marginTop: getMarginTop()
  });
};
var getRadioButtonDotStyles = (size, color, customColor, shape, variant, checked, disabled, error, animationsEnabled, cssVars) => {
  const dimensions = getRadioButtonDimensions(size);
  const colors = getColorVariables13(color, customColor, cssVars);
  const getDotRadius = () => {
    switch (shape) {
      case "sharp":
        return "0";
      case "round":
        return "6px";
      case "pill":
      default:
        return "50%";
    }
  };
  const getDotColor = () => {
    if (!checked) return "transparent";
    if (error) {
      return cssVars.destructiveForeground || cssVars.background;
    }
    switch (variant) {
      case "solid":
      case "ghost":
      case "glassmorphic":
        return colors.foreground || cssVars.background;
      case "outline":
      default:
        return colors.foreground || cssVars.background;
    }
  };
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${dimensions.dotSize}px`,
    height: `${dimensions.dotSize}px`,
    borderRadius: getDotRadius(),
    backgroundColor: getDotColor(),
    transform: `translate(-50%, -50%) scale(${checked ? 1 : 0})`,
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-spring)" : "none"
  };
};
var getHiddenInputStyles2 = () => ({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  border: "none",
  overflow: "hidden",
  whiteSpace: "nowrap",
  clip: "rect(0, 0, 0, 0)"
});
var getLabelStyles2 = (size, disabled, error, labelPosition, contentToggleable, cssVars) => {
  const fontSizeMap = {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px"
  };
  const order = labelPosition === "left" ? -1 : 1;
  return {
    fontSize: fontSizeMap[size],
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : error ? cssVars.destructive : cssVars.foreground,
    order,
    userSelect: "none",
    lineHeight: 1.4,
    cursor: disabled ? "not-allowed" : contentToggleable ? "pointer" : "default"
  };
};
var getHeaderStyles = (size, color, customColor, disabled, error, checked, contentToggleable, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  const colors = getColorVariables13(color, customColor, cssVars);
  let headerColor;
  if (disabled) {
    headerColor = cssVars.mutedForeground;
  } else if (error) {
    headerColor = cssVars.destructive;
  } else if (checked) {
    headerColor = colors.main;
  } else {
    headerColor = cssVars.foreground;
  }
  return {
    fontSize: fontSizeMap[size],
    color: headerColor,
    marginBottom: "8px",
    lineHeight: 1.3,
    userSelect: "none",
    cursor: disabled ? "not-allowed" : contentToggleable ? "pointer" : "default",
    fontWeight: "500"
  };
};

// src/app/components/atoms/RadioButton/RadioButton.utils.tsx
var validateRadioButtonProps = (props) => {
  const { name, value, checked, defaultChecked } = props;
  if (process.env.NODE_ENV === "development") {
    if (checked !== void 0 && defaultChecked !== void 0) {
      console.warn(
        "RadioButton: You provided both checked and defaultChecked props. A component should be either controlled (with checked) or uncontrolled (with defaultChecked), but not both."
      );
    }
    if (!name) {
      console.warn(
        "RadioButton: Missing name prop. Radio buttons should have a name attribute for proper grouping."
      );
    }
    if (!value) {
      console.warn(
        "RadioButton: Missing value prop. Radio buttons should have a value attribute."
      );
    }
  }
};
var getValidationState = (invalid, required, checked) => {
  if (invalid !== void 0) return invalid;
  if (required && !checked) return true;
  return false;
};
var getAriaAttributes = (props) => {
  const { checked, disabled, invalid, required, describedBy, labelledBy } = props;
  return {
    "aria-checked": checked || false,
    "aria-disabled": disabled || false,
    "aria-invalid": invalid || false,
    "aria-required": required || false,
    "aria-describedby": describedBy || void 0,
    "aria-labelledby": labelledBy || void 0
  };
};

// src/app/components/atoms/RadioButton/RadioButton.tsx
var RadioButton = forwardRef((allProps, ref) => {
  var _b;
  const [formProps, componentProps] = extractFormProps(allProps);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    error,
    label,
    className,
    style,
    id: providedId,
    "data-testid": dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    rounded,
    // Legacy support
    name,
    value,
    required = false,
    onChange,
    onFocus,
    onBlur,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy
  } = formProps;
  const _a = componentProps, {
    checked,
    defaultChecked = false,
    header,
    labelPosition = "right",
    contentToggleable = true
  } = _a, rest = __objRest(_a, [
    "checked",
    "defaultChecked",
    "header",
    "labelPosition",
    "contentToggleable"
  ]);
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
  const generatedId = useId();
  const id = providedId || generatedId;
  validateRadioButtonProps({ name, value, checked, defaultChecked });
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [focused, setFocused] = useState(false);
  const isControlled = checked !== void 0;
  const isChecked = isControlled ? checked : internalChecked;
  const isError = getValidationState(Boolean(error), required, isChecked);
  const finalShape = rounded !== void 0 ? rounded ? "pill" : "round" : shape;
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    },
    blur: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.blur();
    },
    click: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.click();
    }
  }));
  const handleChange = (event) => {
    const newChecked = event.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange == null ? void 0 : onChange(event);
  };
  const handleFocus = (event) => {
    setFocused(true);
    onFocus == null ? void 0 : onFocus(event);
  };
  const handleBlur = (event) => {
    setFocused(false);
    onBlur == null ? void 0 : onBlur(event);
  };
  const handleContentClick = () => {
    var _a2, _b2;
    if (contentToggleable && !disabled) {
      (_a2 = inputRef.current) == null ? void 0 : _a2.click();
      (_b2 = inputRef.current) == null ? void 0 : _b2.focus();
    }
  };
  const handleCircleClick = () => {
    var _a2, _b2;
    if (!disabled) {
      (_a2 = inputRef.current) == null ? void 0 : _a2.click();
      (_b2 = inputRef.current) == null ? void 0 : _b2.focus();
    }
  };
  const containerStyles = getRadioButtonContainerStyles(
    size,
    Boolean(disabled),
    contentToggleable
  );
  const circleStyles = getRadioButtonCircleStyles(
    size,
    color,
    customColor,
    finalShape,
    variant,
    isChecked,
    Boolean(disabled),
    focused,
    isError,
    animationsEnabled,
    cssVars
  );
  const dotStyles = getRadioButtonDotStyles(
    size,
    color,
    customColor,
    finalShape,
    variant,
    isChecked,
    Boolean(disabled),
    isError,
    animationsEnabled,
    cssVars
  );
  const hiddenInputStyles = getHiddenInputStyles2();
  const labelStyles = getLabelStyles2(
    size,
    Boolean(disabled),
    isError,
    labelPosition,
    contentToggleable,
    cssVars
  );
  const headerStyles = getHeaderStyles(
    size,
    color,
    customColor,
    Boolean(disabled),
    isError,
    isChecked,
    contentToggleable,
    cssVars
  );
  const ariaAttributes = getAriaAttributes({
    checked: isChecked,
    disabled: Boolean(disabled),
    invalid: isError,
    required,
    describedBy: ariaDescribedBy,
    labelledBy: label ? `${id}-label` : void 0
  });
  const combinedStyles = __spreadValues(__spreadValues({}, containerStyles), style);
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      className,
      style: combinedStyles,
      "data-testid": dataTestId
    },
    header && /* @__PURE__ */ React22.createElement(
      "div",
      {
        id: `${id}-header`,
        style: headerStyles,
        onClick: handleContentClick
      },
      header
    ),
    /* @__PURE__ */ React22.createElement("div", { style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "4px"
      // 4px spacing between radio button and label
    } }, /* @__PURE__ */ React22.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React22.createElement(
      "input",
      __spreadValues(__spreadValues({
        ref: inputRef,
        type: "radio",
        id,
        name,
        value,
        checked: isChecked,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        disabled,
        required,
        "aria-label": ariaLabel,
        style: hiddenInputStyles
      }, ariaAttributes), rest)
    ), /* @__PURE__ */ React22.createElement("div", { style: circleStyles, onClick: handleCircleClick }, isChecked && /* @__PURE__ */ React22.createElement("div", { style: dotStyles }))), label && /* @__PURE__ */ React22.createElement(
      "label",
      {
        id: `${id}-label`,
        htmlFor: id,
        style: labelStyles,
        onClick: handleContentClick
      },
      label
    ))
  );
});
RadioButton.displayName = "RadioButton";

// src/app/components/atoms/Scrollbar/Scrollbar.styles.ts
var getColorVariables14 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      // Default to white text for custom colors
      background: customColor + "10",
      // Add opacity for background
      border: customColor,
      hover: customColor + "20",
      // Add opacity for hover
      accent: customColor,
      shadow: customColor + "40",
      disabled: customColor + "40"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles13 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "12px" };
  }
};
var getSizeConfig6 = (size) => {
  const configs = {
    xs: {
      thickness: 4,
      thumbThickness: 2,
      borderRadius: 2,
      minThumbSize: 20
    },
    sm: {
      thickness: 6,
      thumbThickness: 4,
      borderRadius: 3,
      minThumbSize: 30
    },
    md: {
      thickness: 8,
      thumbThickness: 6,
      borderRadius: 4,
      minThumbSize: 40
    },
    lg: {
      thickness: 12,
      thumbThickness: 8,
      borderRadius: 6,
      minThumbSize: 50
    },
    xl: {
      thickness: 16,
      thumbThickness: 12,
      borderRadius: 8,
      minThumbSize: 60
    }
  };
  return configs[size];
};
var createScrollbarContainerStyles = (width, height, minWidth, minHeight, maxWidth, maxHeight, padding, smoothScrolling, hideNative, momentum, disabled, animationsEnabled) => {
  const formatDimension = (value) => {
    if (value === void 0) return void 0;
    return typeof value === "number" ? `${value}px` : value;
  };
  return {
    position: "relative",
    width: formatDimension(width),
    height: formatDimension(height),
    minWidth: formatDimension(minWidth),
    minHeight: formatDimension(minHeight),
    maxWidth: formatDimension(maxWidth),
    maxHeight: formatDimension(maxHeight),
    cursor: disabled ? "not-allowed" : "default",
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-smooth)" : "none",
    overflow: "hidden"
    // Container should hide overflow
  };
};
var getScrollableContentStyles = (orientation, animationsEnabled, hideNative, smoothScrolling, momentum, disabled) => {
  const baseStyles = __spreadValues({
    width: "100%",
    height: "100%",
    transition: animationsEnabled ? "transform var(--duration-smooth) var(--animation-smooth)" : "none",
    scrollBehavior: smoothScrolling ? "smooth" : "auto",
    WebkitOverflowScrolling: momentum ? "touch" : "auto"
  }, hideNative);
  const overflowValue = disabled ? "hidden" : "auto";
  switch (orientation) {
    case "horizontal":
      return __spreadProps(__spreadValues({}, baseStyles), {
        overflowX: overflowValue,
        overflowY: "hidden",
        whiteSpace: "nowrap"
      });
    case "vertical":
      return __spreadProps(__spreadValues({}, baseStyles), {
        overflowX: "hidden",
        overflowY: overflowValue
      });
    case "both":
    default:
      return __spreadProps(__spreadValues({}, baseStyles), {
        overflowX: overflowValue,
        overflowY: overflowValue
      });
  }
};
var getWebKitScrollbarStyles = (color, customColor, variant, size, shape, orientation, visibility, alignment, disabled, animationsEnabled, cssVars) => {
  const colors = getColorVariables14(color, customColor, cssVars);
  const sizeConfig = getSizeConfig6(size);
  const shapeStyles = getShapeStyles13(shape);
  const isHoverOnly = visibility === "hover";
  const isHidden = visibility === "hidden";
  if (isHidden) {
    return {
      "&::-webkit-scrollbar": {
        display: "none"
      }
    };
  }
  const variantColors = (() => {
    switch (variant) {
      case "solid":
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: colors.foreground,
          // Use foreground color for background
          trackBorder: "none",
          border: "none",
          showButtons: false,
          buttonColor: colors.main
        };
      case "ghost":
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: "transparent",
          trackBorder: "none",
          border: "none",
          showButtons: false,
          buttonColor: "transparent"
        };
      case "glassmorphic":
        return {
          thumb: `${colors.main}80`,
          thumbHover: colors.main,
          track: (cssVars == null ? void 0 : cssVars.background) + "20",
          trackBorder: "none",
          border: "none",
          showButtons: false,
          buttonColor: colors.main,
          backdropFilter: "blur(10px)",
          webkitBackdropFilter: "blur(10px)"
        };
      case "invisible":
        return {
          thumb: "transparent",
          thumbHover: "transparent",
          track: "transparent",
          trackBorder: "none",
          border: "none",
          showButtons: false,
          buttonColor: "transparent"
        };
      case "outline":
      default:
        return {
          thumb: colors.main,
          thumbHover: colors.hover,
          track: colors.background,
          // Use the color-specific background
          trackBorder: "none",
          border: "none",
          showButtons: false,
          buttonColor: colors.main,
          trackPadding: true
          // Flag to make track wider
        };
    }
  })();
  if (disabled) {
    variantColors.thumb = (cssVars == null ? void 0 : cssVars.mutedForeground) + "40";
    variantColors.thumbHover = (cssVars == null ? void 0 : cssVars.mutedForeground) + "40";
  }
  const scrollbarThickness = sizeConfig.thickness + Math.max(4, Math.floor(sizeConfig.thickness * 0.5));
  return __spreadValues(__spreadValues({
    // Main scrollbar
    "&::-webkit-scrollbar": {
      width: orientation === "vertical" || orientation === "both" ? `${scrollbarThickness}px` : "0px",
      height: orientation === "horizontal" || orientation === "both" ? `${scrollbarThickness}px` : "0px",
      backgroundColor: "transparent"
    },
    // Track (background)
    "&::-webkit-scrollbar-track": {
      backgroundColor: variantColors.track,
      borderRadius: shapeStyles.borderRadius,
      margin: variant === "solid" ? "0" : "1px",
      border: variantColors.trackBorder || "none",
      backdropFilter: variantColors.backdropFilter || "none",
      WebkitBackdropFilter: variantColors.webkitBackdropFilter || "none"
    },
    // Thumb (draggable part)
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: variantColors.thumb,
      borderRadius: shapeStyles.borderRadius,
      // Center the thumb in the wider track for all variants
      border: `${Math.max(2, Math.floor((scrollbarThickness - sizeConfig.thumbThickness) / 2))}px solid transparent`,
      backgroundClip: "padding-box",
      transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none",
      opacity: variant === "invisible" ? 0 : isHoverOnly ? 0 : 1,
      cursor: disabled ? "not-allowed" : variant === "invisible" ? "default" : "pointer",
      backdropFilter: variantColors.backdropFilter || "none",
      WebkitBackdropFilter: variantColors.webkitBackdropFilter || "none",
      boxShadow: variant === "glassmorphic" ? `0 2px 4px ${cssVars == null ? void 0 : cssVars.shadow}20` : "none"
    },
    // Thumb hover state
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: disabled ? variantColors.thumb : variant === "invisible" ? "transparent" : variantColors.thumbHover,
      opacity: variant === "invisible" ? 0 : 1,
      boxShadow: variant === "glassmorphic" ? `0 4px 8px ${cssVars == null ? void 0 : cssVars.shadow}30` : "none"
    },
    // Corner where scrollbars meet
    "&::-webkit-scrollbar-corner": {
      backgroundColor: variantColors.track,
      borderRadius: shapeStyles.borderRadius,
      backdropFilter: variantColors.backdropFilter || "none",
      WebkitBackdropFilter: variantColors.webkitBackdropFilter || "none"
    }
  }, {
    "&::-webkit-scrollbar-button": {
      display: "none"
    }
  }), isHoverOnly && {
    // This will be processed specially in createWebkitScrollbarCSS
    "__hover__": {
      opacity: 1
    }
  });
};
var getCustomScrollbarTrackStyles = (orientation, color, customColor, variant, size, shape, alignment, disabled, animationsEnabled, cssVars, showIndicators) => {
  const colors = getColorVariables14(color, customColor, cssVars);
  const sizeConfig = getSizeConfig6(size);
  const shapeStyles = getShapeStyles13(shape);
  const isVertical = orientation === "vertical";
  const isHorizontal = orientation === "horizontal";
  const baseStyles = __spreadValues({
    position: "absolute",
    zIndex: 1,
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none"
  }, shapeStyles);
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.foreground,
          // Use foreground color for background
          border: "none",
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`
          // Standardized padding
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          border: "none",
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`
          // Standardized padding
        };
      case "glassmorphic":
        return {
          backgroundColor: (cssVars == null ? void 0 : cssVars.background) + "20",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "none",
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`
          // Standardized padding
        };
      case "invisible":
        return {
          display: "none"
          // Hide the track completely
        };
      case "outline":
      default:
        return {
          backgroundColor: colors.background,
          // Use color-specific background
          border: "none",
          padding: `${Math.max(2, Math.floor(sizeConfig.thickness * 0.25))}px`
          // Add padding to make track wider
        };
    }
  })();
  if (disabled) {
    baseStyles.opacity = 0.4;
  }
  const trackThickness = sizeConfig.thickness + Math.max(4, Math.floor(sizeConfig.thickness * 0.5));
  const indicatorSpace = showIndicators ? sizeConfig.thickness + 4 : 2;
  if (isVertical) {
    const positionProps = alignment === "start" ? { left: "2px" } : { right: "2px" };
    return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), positionProps), {
      top: `${indicatorSpace}px`,
      bottom: `${indicatorSpace}px`,
      width: `${trackThickness}px`
    });
  }
  if (isHorizontal) {
    const positionProps = alignment === "start" ? { top: "2px" } : { bottom: "2px" };
    return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), positionProps), {
      left: `${indicatorSpace}px`,
      right: `${indicatorSpace}px`,
      height: `${trackThickness}px`
    });
  }
  return baseStyles;
};
var getCustomScrollbarThumbStyles = (orientation, color, customColor, variant, size, shape, position, thumbSize, disabled, isDragging, animationsEnabled, cssVars, showIndicators) => {
  const colors = getColorVariables14(color, customColor, cssVars);
  const sizeConfig = getSizeConfig6(size);
  const shapeStyles = getShapeStyles13(shape);
  const isVertical = orientation === "vertical";
  const isHorizontal = orientation === "horizontal";
  const baseStyles = __spreadValues({
    position: "absolute",
    zIndex: 2,
    cursor: disabled ? "not-allowed" : "grab",
    transition: animationsEnabled ? "background-color var(--duration-fast) var(--animation-smooth), transform var(--duration-fast) var(--animation-smooth)" : "none"
  }, shapeStyles);
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: isDragging ? colors.hover : colors.main,
          border: "none"
        };
      case "ghost":
        return {
          backgroundColor: isDragging ? colors.hover : colors.main,
          border: "none"
        };
      case "glassmorphic":
        return {
          backgroundColor: isDragging ? colors.main : `${colors.main}80`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "none",
          boxShadow: isDragging ? `0 0 16px ${colors.main}50` : `0 2px 8px ${cssVars == null ? void 0 : cssVars.shadow}15`
        };
      case "invisible":
        return {
          display: "none"
          // Hide the thumb completely
        };
      case "outline":
      default:
        return {
          backgroundColor: isDragging ? colors.hover : colors.main,
          border: "none"
        };
    }
  })();
  if (disabled) {
    baseStyles.opacity = 0.4;
    variantStyles.backgroundColor = cssVars == null ? void 0 : cssVars.mutedForeground;
  }
  const indicatorSpace = showIndicators ? sizeConfig.thickness + 6 : 0;
  const thumbLength = Math.max(thumbSize * 100, sizeConfig.minThumbSize);
  const standardizedThumbWidth = sizeConfig.thumbThickness;
  if (isVertical) {
    const availableSpace = showIndicators ? 100 - indicatorSpace * 2 / 4 : 100;
    const scaledPosition = showIndicators ? position * availableSpace : position * 100;
    const thumbPosition = Math.min(scaledPosition, availableSpace - thumbLength);
    const finalTop = showIndicators ? `calc(${thumbPosition}% + ${indicatorSpace}px)` : `${thumbPosition}%`;
    return __spreadProps(__spreadValues(__spreadValues({}, baseStyles), variantStyles), {
      right: "50%",
      top: finalTop,
      width: `${standardizedThumbWidth}px`,
      height: `${thumbLength}%`,
      transform: "translateX(50%)",
      maxHeight: showIndicators ? `calc(100% - ${indicatorSpace * 2}px)` : "100%"
    });
  }
  if (isHorizontal) {
    const availableSpace = showIndicators ? 100 - indicatorSpace * 2 / 4 : 100;
    const scaledPosition = showIndicators ? position * availableSpace : position * 100;
    const thumbPosition = Math.min(scaledPosition, availableSpace - thumbLength);
    const finalLeft = showIndicators ? `calc(${thumbPosition}% + ${indicatorSpace}px)` : `${thumbPosition}%`;
    return __spreadProps(__spreadValues(__spreadValues({}, baseStyles), variantStyles), {
      bottom: "50%",
      left: finalLeft,
      width: `${thumbLength}%`,
      height: `${standardizedThumbWidth}px`,
      transform: "translateY(50%)",
      maxWidth: showIndicators ? `calc(100% - ${indicatorSpace * 2}px)` : "100%"
    });
  }
  return baseStyles;
};
var getScrollIndicatorStyles = (orientation, color, customColor, size, position, visible, disabled, animationsEnabled, cssVars, alignment, variant) => {
  const colors = getColorVariables14(color, customColor, cssVars);
  const sizeConfig = getSizeConfig6(size);
  const trackThickness = sizeConfig.thickness + Math.max(4, Math.floor(sizeConfig.thickness * 0.5));
  const indicatorSize = sizeConfig.thickness;
  const variantStyles = (() => {
    switch (variant) {
      case "solid":
        return {
          backgroundColor: "transparent",
          color: colors.main,
          border: "none"
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: colors.main,
          border: "none"
        };
      case "glassmorphic":
        return {
          backgroundColor: "transparent",
          color: colors.main,
          border: "none"
        };
      case "outline":
      default:
        return {
          backgroundColor: "transparent",
          color: colors.main,
          border: "none"
        };
    }
  })();
  const baseStyles = __spreadProps(__spreadValues({
    position: "absolute"
  }, variantStyles), {
    opacity: visible ? 1 : 0.5,
    transition: animationsEnabled ? "all var(--duration-fast) var(--animation-smooth)" : "none",
    pointerEvents: disabled ? "none" : "auto",
    cursor: disabled ? "not-allowed" : visible ? "pointer" : "default",
    zIndex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });
  const centerOffset = Math.max(2, (trackThickness - indicatorSize) / 2);
  switch (position) {
    case "top":
      return __spreadProps(__spreadValues({}, baseStyles), {
        top: `${centerOffset}px`,
        [alignment === "start" ? "left" : "right"]: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`
      });
    case "bottom":
      return __spreadProps(__spreadValues({}, baseStyles), {
        bottom: `${centerOffset}px`,
        [alignment === "start" ? "left" : "right"]: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`
      });
    case "left":
      return __spreadProps(__spreadValues({}, baseStyles), {
        left: `${centerOffset}px`,
        [alignment === "start" ? "top" : "bottom"]: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`
      });
    case "right":
      return __spreadProps(__spreadValues({}, baseStyles), {
        right: `${centerOffset}px`,
        [alignment === "start" ? "top" : "bottom"]: `${centerOffset}px`,
        width: `${indicatorSize}px`,
        height: `${indicatorSize}px`
      });
    default:
      return baseStyles;
  }
};

// src/app/components/atoms/Scrollbar/Scrollbar.utils.tsx
var supportsWebKitScrollbar = () => {
  if (typeof window === "undefined") return false;
  return CSS.supports("-webkit-appearance", "none");
};
var calculateThumbSize = (contentSize, containerSize) => {
  if (contentSize <= containerSize) return 1;
  return Math.max(containerSize / contentSize, 0.1);
};
var calculateThumbPosition = (scrollPosition, contentSize, containerSize, thumbSize) => {
  if (contentSize <= containerSize) return 0;
  const maxScrollPosition = contentSize - containerSize;
  const scrollRatio = scrollPosition / maxScrollPosition;
  const maxThumbPosition = 1 - thumbSize;
  return Math.max(0, Math.min(scrollRatio * maxThumbPosition, maxThumbPosition));
};
var isScrollingNeeded = (contentSize, containerSize) => {
  return contentSize > containerSize;
};
var validateScrollbarProps = (props) => {
  const { height, width, maxHeight, maxWidth, orientation } = props;
  if (process.env.NODE_ENV === "development") {
    if (orientation === "vertical" && !height && !maxHeight) {
      console.warn(
        "Scrollbar: For vertical orientation, consider providing height or maxHeight for better UX."
      );
    }
    if (orientation === "horizontal" && !width && !maxWidth) {
      console.warn(
        "Scrollbar: For horizontal orientation, consider providing width or maxWidth for better UX."
      );
    }
  }
};
var getScrollbarAriaAttributes = (orientation, scrollPosition, maxScroll, disabled) => {
  const scrollPercentage = maxScroll > 0 ? Math.round(scrollPosition / maxScroll * 100) : 0;
  return {
    "aria-orientation": orientation === "both" ? "vertical" : orientation,
    "aria-valuenow": scrollPercentage,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuetext": `${scrollPercentage}% scrolled`,
    "aria-disabled": disabled,
    role: "scrollbar"
  };
};
var throttleScrollEvent = (func, delay = 16) => {
  let timeoutId = null;
  let lastExecTime = 0;
  return ((...args) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  });
};

// src/app/components/atoms/Scrollbar/Scrollbar.tsx
var createWebkitScrollbarCSS = (uniqueId, webkitStyles) => {
  let css = "";
  let hoverStyles = null;
  Object.entries(webkitStyles).forEach(([selector, styles]) => {
    if (selector === "__hover__") {
      hoverStyles = styles;
    } else if (selector.includes("::-webkit-scrollbar")) {
      const cleanSelector = selector.replace("&", `#${uniqueId} > div:first-child`);
      const cssProps = Object.entries(styles).map(([prop, value]) => {
        const kebabProp = prop.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        return `${kebabProp}: ${value};`;
      }).join(" ");
      css += `${cleanSelector} { ${cssProps} }`;
    }
  });
  if (hoverStyles) {
    css += `#${uniqueId}:hover > div:first-child::-webkit-scrollbar-thumb { opacity: ${hoverStyles.opacity}; }`;
  }
  return css;
};
var injectCSS = (uniqueId, css) => {
  if (typeof document === "undefined") return;
  const existingStyle = document.getElementById(`scrollbar-${uniqueId}`);
  if (existingStyle) {
    existingStyle.textContent = css;
  } else {
    const style = document.createElement("style");
    style.id = `scrollbar-${uniqueId}`;
    style.textContent = css;
    document.head.appendChild(style);
  }
};
var cleanupCSS = (uniqueId) => {
  if (typeof document === "undefined") return;
  const style = document.getElementById(`scrollbar-${uniqueId}`);
  if (style) {
    style.remove();
  }
};
var Scrollbar = forwardRef((allProps, ref) => {
  var _b;
  const [containerProps, componentProps] = extractContainerProps(allProps);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = "outline",
    // Scrollbar-specific default
    shape = UNIVERSAL_DEFAULTS.shape,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    width,
    height,
    className,
    style,
    id,
    animate = UNIVERSAL_DEFAULTS.animate,
    children
  } = containerProps;
  const _a = componentProps, {
    orientation = "vertical",
    visibility = "always",
    alignment = "end",
    smoothScrolling = true,
    momentum = true,
    showIndicators = false,
    onScroll,
    onScrollStart,
    onScrollEnd,
    onReachTop,
    onReachBottom,
    onReachLeft,
    onReachRight,
    thumbSize: customThumbSize,
    scrollPosition: customScrollPosition
  } = _a, rest = __objRest(_a, [
    "orientation",
    "visibility",
    "alignment",
    "smoothScrolling",
    "momentum",
    "showIndicators",
    "onScroll",
    "onScrollStart",
    "onScrollEnd",
    "onReachTop",
    "onReachBottom",
    "onReachLeft",
    "onReachRight",
    "thumbSize",
    "scrollPosition"
  ]);
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const uniqueId = useMemo(
    () => id || `scrollbar-${Math.random().toString(36).substr(2, 9)}`,
    [id]
  );
  const animationsEnabled = ((_b = settings.appearance.animations) != null ? _b : true) && animate;
  validateScrollbarProps({ height, width, orientation });
  const isStartBothCase = alignment === "start" && orientation === "both";
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const verticalTrackRef = useRef(null);
  const verticalThumbRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const horizontalThumbRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollTop: 0, scrollLeft: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const handleThumbMouseDown = useCallback((e, orientation2) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollTop: containerRef.current.scrollTop,
      scrollLeft: containerRef.current.scrollLeft
    });
  }, []);
  useEffect(() => {
    if (!isDragging) return;
    let animationFrameId;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        if (orientation === "vertical" || orientation === "both") {
          const containerHeight = scrollState.clientHeight;
          const contentHeight = scrollState.scrollHeight;
          const scrollableHeight = contentHeight - containerHeight;
          if (scrollableHeight > 0) {
            const thumbHeight = Math.max(20, containerHeight / contentHeight * containerHeight);
            const trackSpace = containerHeight - thumbHeight;
            const scrollRatio = deltaY / trackSpace;
            const newScrollTop = Math.max(0, Math.min(scrollableHeight, dragStart.scrollTop + scrollRatio * scrollableHeight));
            containerRef.current.scrollTop = newScrollTop;
          }
        }
        if (orientation === "horizontal" || orientation === "both") {
          const containerWidth = scrollState.clientWidth;
          const contentWidth = scrollState.scrollWidth;
          const scrollableWidth = contentWidth - containerWidth;
          if (scrollableWidth > 0) {
            const thumbWidth = Math.max(20, containerWidth / contentWidth * containerWidth);
            const trackSpace = containerWidth - thumbWidth;
            const scrollRatio = deltaX / trackSpace;
            const newScrollLeft = Math.max(0, Math.min(scrollableWidth, dragStart.scrollLeft + scrollRatio * scrollableWidth));
            containerRef.current.scrollLeft = newScrollLeft;
          }
        }
      });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      cancelAnimationFrame(animationFrameId);
    };
    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging, dragStart, orientation, scrollState]);
  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const element = containerRef.current;
    setScrollState({
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
      scrollHeight: element.scrollHeight,
      scrollWidth: element.scrollWidth,
      clientHeight: element.clientHeight,
      clientWidth: element.clientWidth
    });
  }, []);
  const throttledScrollHandler = useCallback(
    throttleScrollEvent((event) => {
      updateScrollState();
      onScroll == null ? void 0 : onScroll(event);
      const element = event.currentTarget;
      if (!element) return;
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = element;
      if (scrollTop === 0) onReachTop == null ? void 0 : onReachTop();
      if (scrollTop + clientHeight >= scrollHeight) onReachBottom == null ? void 0 : onReachBottom();
      if (scrollLeft === 0) onReachLeft == null ? void 0 : onReachLeft();
      if (scrollLeft + clientWidth >= scrollWidth) onReachRight == null ? void 0 : onReachRight();
    }, 16),
    [updateScrollState, onScroll, onReachTop, onReachBottom, onReachLeft, onReachRight]
  );
  const handleScrollStart = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      onScrollStart == null ? void 0 : onScrollStart();
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    const timeout = setTimeout(() => {
      setIsScrolling(false);
      onScrollEnd == null ? void 0 : onScrollEnd();
    }, 150);
    setScrollTimeout(timeout);
  }, [isScrolling, scrollTimeout, onScrollStart, onScrollEnd]);
  const handleScroll = useCallback(
    (event) => {
      handleScrollStart();
      throttledScrollHandler(event);
    },
    [handleScrollStart, throttledScrollHandler]
  );
  useImperativeHandle(ref, () => ({
    scrollTo: ({ top, left, behavior = "smooth" }) => {
      if (containerRef.current) {
        containerRef.current.scrollTo({ top, left, behavior });
      }
    },
    scrollIntoView: (element, options) => {
      element.scrollIntoView(options);
    },
    getScrollPosition: () => ({
      top: scrollState.scrollTop,
      left: scrollState.scrollLeft
    })
  }));
  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, children]);
  useEffect(() => {
    if (customScrollPosition && containerRef.current) {
      const { x, y } = customScrollPosition;
      if (typeof y === "number") {
        containerRef.current.scrollTop = y * (scrollState.scrollHeight - scrollState.clientHeight);
      }
      if (typeof x === "number") {
        containerRef.current.scrollLeft = x * (scrollState.scrollWidth - scrollState.clientWidth);
      }
    }
  }, [customScrollPosition, scrollState]);
  const containerStyles = createScrollbarContainerStyles(
    width,
    height,
    void 0,
    // minWidth
    void 0,
    // minHeight
    void 0,
    // maxWidth
    void 0,
    // maxHeight
    void 0,
    // padding
    smoothScrolling,
    false,
    // Never hide native scrollbars
    momentum,
    Boolean(disabled),
    animationsEnabled
  );
  const containerDirectionStyles = alignment === "start" ? (() => {
    if (orientation === "vertical") {
      return { direction: "rtl" };
    } else if (orientation === "horizontal") {
      return { transform: "rotateX(180deg)" };
    } else if (orientation === "both") {
      return { direction: "rtl" };
    }
    return {};
  })() : {};
  const contentDirectionStyles = alignment === "start" ? (() => {
    if (orientation === "vertical") {
      return { direction: "ltr" };
    } else if (orientation === "horizontal") {
      return { transform: "rotateX(180deg)" };
    } else if (orientation === "both") {
      return { direction: "ltr" };
    }
    return {};
  })() : {};
  const contentStyles = __spreadValues(__spreadValues({}, getScrollableContentStyles(
    orientation,
    animationsEnabled,
    false,
    // Never hide native scrollbars
    smoothScrolling,
    momentum,
    Boolean(disabled)
  )), containerDirectionStyles);
  const needsVerticalScrollbar = isScrollingNeeded(scrollState.scrollHeight, scrollState.clientHeight);
  const needsHorizontalScrollbar = isScrollingNeeded(scrollState.scrollWidth, scrollState.clientWidth);
  const verticalThumbSize = calculateThumbSize(scrollState.scrollHeight, scrollState.clientHeight);
  const horizontalThumbSize = calculateThumbSize(scrollState.scrollWidth, scrollState.clientWidth);
  const baseVerticalThumbPosition = calculateThumbPosition(
    scrollState.scrollTop,
    scrollState.scrollHeight,
    scrollState.clientHeight,
    verticalThumbSize
  );
  const baseHorizontalThumbPosition = calculateThumbPosition(
    scrollState.scrollLeft,
    scrollState.scrollWidth,
    scrollState.clientWidth,
    horizontalThumbSize
  );
  const verticalThumbPosition = showIndicators ? baseVerticalThumbPosition * 0.85 : (
    // Scale down range to leave space for indicators
    baseVerticalThumbPosition
  );
  const horizontalThumbPosition = showIndicators ? baseHorizontalThumbPosition * 0.85 : (
    // Scale down range to leave space for indicators
    baseHorizontalThumbPosition
  );
  const verticalTrackStyles = getCustomScrollbarTrackStyles(
    "vertical",
    color,
    customColor,
    variant,
    size,
    shape,
    alignment,
    Boolean(disabled),
    animationsEnabled,
    cssVars,
    showIndicators
  );
  const horizontalTrackStyles = getCustomScrollbarTrackStyles(
    "horizontal",
    color,
    customColor,
    variant,
    size,
    shape,
    alignment,
    Boolean(disabled),
    animationsEnabled,
    cssVars,
    showIndicators
  );
  const verticalThumbStyles = getCustomScrollbarThumbStyles(
    "vertical",
    color,
    customColor,
    variant,
    size,
    shape,
    verticalThumbPosition,
    verticalThumbSize,
    Boolean(disabled),
    isDragging,
    animationsEnabled,
    cssVars,
    showIndicators
  );
  const horizontalThumbStyles = getCustomScrollbarThumbStyles(
    "horizontal",
    color,
    customColor,
    variant,
    size,
    shape,
    horizontalThumbPosition,
    horizontalThumbSize,
    Boolean(disabled),
    isDragging,
    animationsEnabled,
    cssVars,
    showIndicators
  );
  const combinedStyles = __spreadValues(__spreadValues({}, containerStyles), style);
  const webkitStyles = getWebKitScrollbarStyles(
    color,
    customColor,
    variant,
    size,
    shape,
    orientation,
    visibility,
    alignment,
    Boolean(disabled),
    animationsEnabled,
    cssVars
  );
  useEffect(() => {
    if (supportsWebKitScrollbar()) {
      let css = createWebkitScrollbarCSS(uniqueId, webkitStyles);
      if (css) {
        injectCSS(uniqueId, css);
      }
    }
    return () => {
      cleanupCSS(uniqueId);
    };
  }, [uniqueId, color, customColor, variant, size, shape, orientation, visibility, alignment, disabled, animationsEnabled, cssVars, isStartBothCase]);
  const ariaAttributes = getScrollbarAriaAttributes(
    orientation,
    orientation === "vertical" ? scrollState.scrollTop : scrollState.scrollLeft,
    orientation === "vertical" ? scrollState.scrollHeight - scrollState.clientHeight : scrollState.scrollWidth - scrollState.clientWidth,
    Boolean(disabled)
  );
  return /* @__PURE__ */ React22.createElement(
    "div",
    __spreadValues(__spreadValues({
      className,
      style: combinedStyles,
      id: uniqueId
    }, ariaAttributes), rest),
    /* @__PURE__ */ React22.createElement(
      "div",
      {
        ref: containerRef,
        style: contentStyles,
        onScroll: handleScroll,
        tabIndex: disabled ? -1 : 0
      },
      /* @__PURE__ */ React22.createElement("div", { ref: contentRef, style: contentDirectionStyles }, children)
    ),
    !supportsWebKitScrollbar() && needsVerticalScrollbar && (orientation === "vertical" || orientation === "both") && variant !== "invisible" && /* @__PURE__ */ React22.createElement(
      "div",
      {
        ref: verticalTrackRef,
        style: verticalTrackStyles,
        onClick: (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const trackHeight = rect.height;
          const scrollPercentage = clickY / trackHeight;
          const newScrollTop = scrollPercentage * (scrollState.scrollHeight - scrollState.clientHeight);
          if (containerRef.current) {
            containerRef.current.scrollTop = newScrollTop;
          }
        }
      },
      /* @__PURE__ */ React22.createElement(
        "div",
        {
          ref: verticalThumbRef,
          style: verticalThumbStyles,
          onMouseDown: (e) => handleThumbMouseDown(e, "vertical")
        }
      )
    ),
    !supportsWebKitScrollbar() && needsHorizontalScrollbar && (orientation === "horizontal" || orientation === "both") && variant !== "invisible" && /* @__PURE__ */ React22.createElement(
      "div",
      {
        ref: horizontalTrackRef,
        style: horizontalTrackStyles,
        onClick: (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const trackWidth = rect.width;
          const scrollPercentage = clickX / trackWidth;
          const newScrollLeft = scrollPercentage * (scrollState.scrollWidth - scrollState.clientWidth);
          if (containerRef.current) {
            containerRef.current.scrollLeft = newScrollLeft;
          }
        }
      },
      /* @__PURE__ */ React22.createElement(
        "div",
        {
          ref: horizontalThumbRef,
          style: horizontalThumbStyles,
          onMouseDown: (e) => handleThumbMouseDown(e, "horizontal")
        }
      )
    ),
    showIndicators && needsVerticalScrollbar && (orientation === "vertical" || orientation === "both") && variant !== "invisible" && /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: getScrollIndicatorStyles(
          "vertical",
          color,
          customColor,
          size,
          "top",
          scrollState.scrollTop > 0,
          Boolean(disabled),
          animationsEnabled,
          cssVars,
          alignment,
          variant
        ),
        onClick: () => {
          if (containerRef.current && !disabled) {
            containerRef.current.scrollTop = Math.max(0, scrollState.scrollTop - 100);
          }
        }
      },
      /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: "NavArrowUpSolid",
          size: size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : size === "lg" ? 18 : 20,
          style: {
            transform: "rotate(0deg)",
            opacity: scrollState.scrollTop > 0 ? 1 : 0.3
          }
        }
      )
    ), /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: getScrollIndicatorStyles(
          "vertical",
          color,
          customColor,
          size,
          "bottom",
          scrollState.scrollTop < scrollState.scrollHeight - scrollState.clientHeight,
          Boolean(disabled),
          animationsEnabled,
          cssVars,
          alignment,
          variant
        ),
        onClick: () => {
          if (containerRef.current && !disabled) {
            containerRef.current.scrollTop = Math.min(
              scrollState.scrollHeight - scrollState.clientHeight,
              scrollState.scrollTop + 100
            );
          }
        }
      },
      /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: "NavArrowUpSolid",
          size: size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : size === "lg" ? 18 : 20,
          style: {
            transform: "rotate(180deg)",
            opacity: scrollState.scrollTop < scrollState.scrollHeight - scrollState.clientHeight ? 1 : 0.3
          }
        }
      )
    )),
    showIndicators && needsHorizontalScrollbar && (orientation === "horizontal" || orientation === "both") && variant !== "invisible" && /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: getScrollIndicatorStyles(
          "horizontal",
          color,
          customColor,
          size,
          "left",
          scrollState.scrollLeft > 0,
          Boolean(disabled),
          animationsEnabled,
          cssVars,
          alignment,
          variant
        ),
        onClick: () => {
          if (containerRef.current && !disabled) {
            containerRef.current.scrollLeft = Math.max(0, scrollState.scrollLeft - 100);
          }
        }
      },
      /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: "NavArrowUpSolid",
          size: size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : size === "lg" ? 18 : 20,
          style: {
            transform: "rotate(-90deg)",
            opacity: scrollState.scrollLeft > 0 ? 1 : 0.3
          }
        }
      )
    ), /* @__PURE__ */ React22.createElement(
      "div",
      {
        style: getScrollIndicatorStyles(
          "horizontal",
          color,
          customColor,
          size,
          "right",
          scrollState.scrollLeft < scrollState.scrollWidth - scrollState.clientWidth,
          Boolean(disabled),
          animationsEnabled,
          cssVars,
          alignment,
          variant
        ),
        onClick: () => {
          if (containerRef.current && !disabled) {
            containerRef.current.scrollLeft = Math.min(
              scrollState.scrollWidth - scrollState.clientWidth,
              scrollState.scrollLeft + 100
            );
          }
        }
      },
      /* @__PURE__ */ React22.createElement(
        Icon,
        {
          name: "NavArrowUpSolid",
          size: size === "xs" ? 12 : size === "sm" ? 14 : size === "md" ? 16 : size === "lg" ? 18 : 20,
          style: {
            transform: "rotate(90deg)",
            opacity: scrollState.scrollLeft < scrollState.scrollWidth - scrollState.clientWidth ? 1 : 0.3
          }
        }
      )
    ))
  );
});
Scrollbar.displayName = "Scrollbar";

// src/app/components/atoms/Toggle/Toggle.styles.ts
var getToggleDimensions = (size) => {
  switch (size) {
    case "xs":
      return {
        width: 32,
        height: 18,
        bubbleSize: 14,
        padding: 2
      };
    case "sm":
      return {
        width: 36,
        height: 20,
        bubbleSize: 16,
        padding: 2
      };
    case "lg":
      return {
        width: 56,
        height: 32,
        bubbleSize: 28,
        padding: 2
      };
    case "xl":
      return {
        width: 64,
        height: 36,
        bubbleSize: 32,
        padding: 2
      };
    case "md":
    default:
      return {
        width: 44,
        height: 24,
        bubbleSize: 20,
        padding: 2
      };
  }
};
var getToggleColors = (color, checked, disabled, cssVars) => {
  const colorMap = {
    primary: {
      main: cssVars.primary,
      accent: cssVars.primaryAccent,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
      background: cssVars.primaryBackground
    },
    secondary: {
      main: cssVars.secondary,
      accent: cssVars.secondaryAccent,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
      background: cssVars.secondaryBackground
    },
    success: {
      main: cssVars.success,
      accent: cssVars.successAccent,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
      background: cssVars.successBackground
    },
    warning: {
      main: cssVars.warning,
      accent: cssVars.warningAccent,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
      background: cssVars.warningBackground
    },
    destructive: {
      main: cssVars.destructive,
      accent: cssVars.destructiveAccent,
      foreground: cssVars.destructiveForeground || "#ffffff",
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
      background: cssVars.destructiveBackground
    },
    info: {
      main: cssVars.info,
      accent: cssVars.infoAccent,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
      background: cssVars.infoBackground
    },
    custom: {
      main: cssVars.primary,
      accent: cssVars.primaryAccent,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
      background: cssVars.primaryBackground
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getToggleContainerStyles = (size, disabled, className) => {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: size === "sm" ? "8px" : size === "lg" ? "12px" : "10px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "inherit"
  };
};
var getVariantStyles9 = (variant, colors, checked, cssVars) => {
  switch (variant) {
    case "solid":
      return {
        backgroundColor: colors.main,
        borderColor: colors.main
      };
    case "ghost":
      return {
        backgroundColor: cssVars.background,
        borderColor: cssVars.background
      };
    case "outline":
      return {
        backgroundColor: cssVars.background,
        borderColor: colors.main
      };
    case "glassmorphic":
      const reflectionColor = colors.hover || colors.main || "#ffffff";
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
      return {
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          rgba(255, 255, 255, 0.1)
        `,
        backdropFilter: "blur(10px)",
        borderColor: "rgba(255, 255, 255, 0.2)"
      };
    default:
      return {
        backgroundColor: colors.main,
        borderColor: colors.main
      };
  }
};
var getToggleTrackStyles = (size, color, variant, checked, disabled, focused, cssVars) => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(color, checked, disabled, cssVars);
  const variantStyles = getVariantStyles9(variant, colors, checked, cssVars);
  return __spreadValues({
    position: "relative",
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    border: `2px solid`,
    borderRadius: `${dimensions.height}px`,
    transition: "background-color var(--toggle-duration) var(--animation-spring), border-color var(--toggle-duration) var(--animation-spring), opacity var(--toggle-duration) var(--animation-spring)",
    outline: focused ? `2px solid ${colors.main}` : "none",
    outlineOffset: "2px",
    opacity: disabled ? 0.4 : 1
  }, variantStyles);
};
var getBubbleStyles = (size, color, checked, disabled, cssVars, variant) => {
  const dimensions = getToggleDimensions(size);
  const colors = getToggleColors(color, checked, disabled, cssVars);
  const borderWidth = 2;
  const trackInnerWidth = dimensions.width - borderWidth * 2;
  dimensions.height - borderWidth * 2;
  const startX = dimensions.padding;
  const endX = trackInnerWidth - dimensions.bubbleSize - dimensions.padding;
  const travelDistance = endX - startX;
  const baseStyles = {
    position: "absolute",
    // Center vertically using top 50% and translateY
    top: "50%",
    // Start from the left padding position
    left: `${startX}px`,
    width: `${dimensions.bubbleSize}px`,
    height: `${dimensions.bubbleSize}px`,
    borderRadius: "50%",
    // When checked, translateX by the travel distance; always center vertically with translateY(-50%)
    transform: checked ? `translateX(${travelDistance}px) translateY(-50%)` : "translateX(0) translateY(-50%)",
    transition: "all var(--toggle-duration) var(--animation-spring)"
  };
  if (variant === "glassmorphic") {
    return __spreadProps(__spreadValues({}, baseStyles), {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: `0 0 10px ${colors.main}40, 0 2px 4px rgba(0, 0, 0, 0.1)`
    });
  }
  return __spreadProps(__spreadValues({}, baseStyles), {
    backgroundColor: colors.foreground,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  });
};
var getHiddenInputStyles3 = () => ({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  border: "none",
  outline: "none"
});
var getLabelStyles3 = (size, disabled, position, cssVars) => {
  const fontSizeMap = {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px"
  };
  const fontSize = fontSizeMap[size] || fontSizeMap.md;
  const order = position === "left" ? -1 : 1;
  return {
    fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : cssVars.foreground,
    order,
    userSelect: "none",
    lineHeight: 1.4
  };
};
var getDescriptionStyles3 = (size, disabled, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "13px",
    lg: "14px",
    xl: "16px"
  };
  const fontSize = fontSizeMap[size] || fontSizeMap.md;
  return {
    fontSize,
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    marginTop: "2px",
    lineHeight: 1.3,
    userSelect: "none"
  };
};
var getLabelContainerStyles2 = (position) => ({
  display: "flex",
  flexDirection: "column",
  order: position === "left" ? -1 : 1
});

// src/app/components/atoms/Toggle/Toggle.tsx
var Toggle = forwardRef((allProps, ref) => {
  const _a = allProps, { onChange } = _a, propsForExtraction = __objRest(_a, ["onChange"]);
  const [formProps, componentProps] = extractFormProps(propsForExtraction);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    variant = UNIVERSAL_DEFAULTS.variant,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    label,
    className,
    style,
    id: providedId,
    // Form-specific props
    name,
    value,
    required,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy
  } = formProps;
  const {
    checked,
    defaultChecked = false,
    description,
    labelPosition = "right"
  } = componentProps;
  const cssVars = useCSSVariables();
  const generatedId = useId();
  const id = providedId || generatedId;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [focused, setFocused] = useState(false);
  const isControlled = checked !== void 0;
  const isChecked = isControlled ? checked : internalChecked;
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    },
    blur: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.blur();
    },
    click: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.click();
    }
  }));
  const handleChange = (event) => {
    const newChecked = event.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    setTimeout(() => {
      var _a2;
      (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    }, 0);
    onChange == null ? void 0 : onChange(newChecked, event);
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleContainerClick = (event) => {
    var _a2;
    if (event.target !== inputRef.current) {
      (_a2 = inputRef.current) == null ? void 0 : _a2.click();
      setTimeout(() => {
        var _a3;
        (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
      }, 0);
    }
  };
  const labelId = label ? `${id}-label` : void 0;
  const descriptionId = description ? `${id}-description` : void 0;
  const ariaDescribedByValue = [ariaDescribedBy, descriptionId].filter(Boolean).join(" ") || void 0;
  const renderLabelContent = () => {
    if (!label && !description) return null;
    if (description) {
      return /* @__PURE__ */ React22.createElement("div", { style: getLabelContainerStyles2(labelPosition) }, label && /* @__PURE__ */ React22.createElement(
        "label",
        {
          id: labelId,
          htmlFor: id,
          style: getLabelStyles3(size, disabled || false, labelPosition, cssVars)
        },
        label
      ), /* @__PURE__ */ React22.createElement(
        "span",
        {
          id: descriptionId,
          style: getDescriptionStyles3(size, disabled || false, cssVars)
        },
        description
      ));
    }
    return /* @__PURE__ */ React22.createElement(
      "label",
      {
        id: labelId,
        htmlFor: id,
        style: getLabelStyles3(size, disabled || false, labelPosition, cssVars)
      },
      label
    );
  };
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      className,
      style: __spreadValues(__spreadValues({}, getToggleContainerStyles(size, disabled || false)), style),
      onClick: handleContainerClick
    },
    /* @__PURE__ */ React22.createElement(
      "input",
      {
        ref: inputRef,
        type: "checkbox",
        id,
        name,
        value,
        checked: isChecked,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        disabled,
        required,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedByValue,
        "aria-labelledby": labelId,
        style: getHiddenInputStyles3()
      }
    ),
    /* @__PURE__ */ React22.createElement(
      "div",
      {
        role: "presentation",
        style: getToggleTrackStyles(size, color, variant, isChecked, disabled || false, focused, cssVars)
      },
      /* @__PURE__ */ React22.createElement(
        "div",
        {
          role: "presentation",
          style: getBubbleStyles(size, color, isChecked, disabled || false, cssVars, variant)
        }
      )
    ),
    renderLabelContent()
  );
});
Toggle.displayName = "Toggle";

// src/app/components/atoms/SegmentedControl/SegmentedControl.styles.ts
var getCSSVar = (cssVars, key, fallback = "#000000") => {
  return (cssVars == null ? void 0 : cssVars[key]) || fallback;
};
var getColorVariables15 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  if (!cssVars) {
    return {
      main: "#0066cc",
      background: "#eff6ff",
      foreground: "#ffffff",
      hover: "#0052a3",
      accent: "#0066cc",
      shadow: "rgba(0, 0, 0, 0.1)",
      disabled: "#d1d5db",
      border: "#0066cc"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary || "#0066cc",
      background: cssVars.primaryBackground || "#eff6ff",
      foreground: cssVars.primaryForeground || "#ffffff",
      hover: cssVars.primaryHover || "#0052a3",
      accent: cssVars.primaryAccent || "#0066cc",
      shadow: cssVars.primaryShadow || "rgba(0, 0, 0, 0.1)",
      disabled: cssVars.primaryDisabled || "#d1d5db",
      border: cssVars.primaryBorder || "#0066cc"
    },
    secondary: {
      main: cssVars.secondary || "#6b7280",
      background: cssVars.secondaryBackground || "#f9fafb",
      foreground: cssVars.secondaryForeground || "#ffffff",
      hover: cssVars.secondaryHover || "#4b5563",
      accent: cssVars.secondaryAccent || "#6b7280",
      shadow: cssVars.secondaryShadow || "rgba(0, 0, 0, 0.1)",
      disabled: cssVars.secondaryDisabled || "#d1d5db",
      border: cssVars.secondaryBorder || "#6b7280"
    },
    success: {
      main: cssVars.success || "#10b981",
      background: cssVars.successBackground || "#ecfdf5",
      foreground: cssVars.successForeground || "#ffffff",
      hover: cssVars.successHover || "#059669",
      accent: cssVars.successAccent || "#10b981",
      shadow: cssVars.successShadow || "rgba(0, 0, 0, 0.1)",
      disabled: cssVars.successDisabled || "#d1d5db",
      border: cssVars.successBorder || "#10b981"
    },
    warning: {
      main: cssVars.warning || "#f59e0b",
      background: cssVars.warningBackground || "#fffbeb",
      foreground: cssVars.warningForeground || "#ffffff",
      hover: cssVars.warningHover || "#d97706",
      accent: cssVars.warningAccent || "#f59e0b",
      shadow: cssVars.warningShadow || "rgba(0, 0, 0, 0.1)",
      disabled: cssVars.warningDisabled || "#d1d5db",
      border: cssVars.warningBorder || "#f59e0b"
    },
    destructive: {
      main: cssVars.destructive || "#ef4444",
      background: cssVars.destructiveBackground || "#fef2f2",
      foreground: cssVars.destructiveForeground || "#ffffff",
      hover: cssVars.destructiveHover || "#dc2626",
      accent: cssVars.destructiveAccent || "#ef4444",
      shadow: cssVars.destructiveShadow || "rgba(0, 0, 0, 0.1)",
      disabled: cssVars.destructiveDisabled || "#d1d5db",
      border: cssVars.destructiveBorder || "#ef4444"
    },
    info: {
      main: cssVars.info || "#3b82f6",
      background: cssVars.infoBackground || "#eff6ff",
      foreground: cssVars.infoForeground || "#ffffff",
      hover: cssVars.infoHover || "#2563eb",
      accent: cssVars.infoAccent || "#3b82f6",
      shadow: cssVars.infoShadow || "rgba(0, 0, 0, 0.1)",
      disabled: cssVars.infoDisabled || "#d1d5db",
      border: cssVars.infoBorder || "#3b82f6"
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getSegmentedControlDimensions = (size) => {
  switch (size) {
    case "xs":
      return {
        height: 40,
        minWidth: 200,
        fontSize: "14px",
        padding: "4px",
        borderRadius: 12
      };
    case "sm":
      return {
        height: 40,
        minWidth: 220,
        fontSize: "14px",
        padding: "4px",
        borderRadius: 12
      };
    case "lg":
      return {
        height: 52,
        minWidth: 260,
        fontSize: "16px",
        padding: "4px",
        borderRadius: 12
      };
    case "xl":
      return {
        height: 60,
        minWidth: 280,
        fontSize: "18px",
        padding: "4px",
        borderRadius: 12
      };
    case "md":
    default:
      return {
        height: 48,
        minWidth: 240,
        fontSize: "16px",
        padding: "4px",
        borderRadius: 12
      };
  }
};
var getVariantStyles10 = (variant, color, customColor, cssVars, error) => {
  const colors = getColorVariables15(color, customColor, cssVars);
  if (error) {
    const baseErrorStyle = {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: getCSSVar(cssVars, "destructive", "#ef4444")
    };
    switch (variant) {
      case "solid":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: getCSSVar(cssVars, "destructiveAccent", getCSSVar(cssVars, "destructive", "#ef4444"))
        });
      case "ghost":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: "transparent"
        });
      case "glassmorphic":
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: getCSSVar(cssVars, "destructiveBackground", "#fef2f2")
        });
      case "outline":
      default:
        return __spreadProps(__spreadValues({}, baseErrorStyle), {
          backgroundColor: getCSSVar(cssVars, "background", "#ffffff")
        });
    }
  }
  switch (variant) {
    case "solid":
      return {
        borderColor: colors.main,
        // --{{color}}
        backgroundColor: colors.main,
        // --{{color}}
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "ghost":
      return {
        borderColor: "transparent",
        backgroundColor: "transparent",
        borderWidth: "2px",
        borderStyle: "solid"
      };
    case "glassmorphic":
      return {
        borderColor: colors.border,
        backgroundColor: colors.background,
        borderWidth: "2px",
        borderStyle: "solid",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      };
    case "outline":
    default:
      return {
        borderColor: colors.main,
        backgroundColor: getCSSVar(cssVars, "background", "#ffffff"),
        borderWidth: "2px",
        borderStyle: "solid"
      };
  }
};
var getShapeStyles14 = (shape, size) => {
  const dimensions = getSegmentedControlDimensions(size);
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: `${dimensions.borderRadius}px` };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: `${dimensions.borderRadius}px` };
  }
};
var getContainerStyles = (size, variant, color, customColor, shape, disabled, error, animationsEnabled, cssVars, fullWidth, itemCount) => {
  const dimensions = getSegmentedControlDimensions(size);
  const variantStyles = getVariantStyles10(variant, color, customColor, cssVars, error);
  const shapeStyles = getShapeStyles14(shape, size);
  return __spreadValues(__spreadValues({
    position: "relative",
    display: "inline-flex",
    width: fullWidth ? "100%" : "auto",
    minWidth: `${dimensions.minWidth}px`,
    height: `${dimensions.height}px`,
    fontFamily: "inherit",
    transition: animationsEnabled ? "border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none",
    cursor: disabled ? "not-allowed" : "auto",
    opacity: disabled ? 0.6 : 1,
    padding: `${dimensions.padding}px`,
    boxSizing: "border-box"
  }, variantStyles), shapeStyles);
};
var getSegmentStyles = (size, variant, color, customColor, shape, isSelected2, disabled, animationsEnabled, cssVars, hasIsometricAnimation) => {
  const dimensions = getSegmentedControlDimensions(size);
  const colors = getColorVariables15(color, customColor, cssVars);
  const getSegmentColor = () => {
    if (disabled) {
      return getCSSVar(cssVars, "mutedForeground", "#9ca3af");
    }
    if (variant === "solid") {
      if (isSelected2) {
        return colors.main;
      }
      return getCSSVar(cssVars, "foreground", "#ffffff");
    }
    if (isSelected2) {
      return colors.main;
    }
    return getCSSVar(cssVars, "mutedForeground", "#9ca3af");
  };
  const textTransform = isSelected2 && hasIsometricAnimation ? "translate(-3px, -3px)" : "none";
  return {
    flex: 1,
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
    fontSize: dimensions.fontSize,
    fontWeight: "500",
    color: getSegmentColor(),
    cursor: disabled ? "not-allowed" : "pointer",
    transition: animationsEnabled ? "color var(--duration-fast) var(--animation-smooth), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
    border: "none",
    backgroundColor: "transparent",
    padding: "0 16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    userSelect: "none",
    outline: "none",
    boxSizing: "border-box",
    borderRadius: "inherit",
    transform: textTransform
  };
};
var getIndicatorStyles = (selectedIndex, itemCount, variant, color, customColor, shape, size, animationsEnabled, cssVars, hasIsometricAnimation) => {
  const translateX = `${selectedIndex * 100}%`;
  const colors = getColorVariables15(color, customColor, cssVars);
  const dimensions = getSegmentedControlDimensions(size);
  const getIndicatorBackground = () => {
    switch (variant) {
      case "solid":
        return colors.foreground;
      // white --{{color}}-foreground
      case "outline":
        return getCSSVar(cssVars, "background", "#ffffff");
      case "ghost":
        return colors.background || colors.main + "10";
      case "glassmorphic":
        return "rgba(255, 255, 255, 0.1)";
      default:
        return getCSSVar(cssVars, "background", "#ffffff");
    }
  };
  const getBorderStyles = () => {
    switch (variant) {
      case "solid":
        return {
          borderWidth: "0",
          borderStyle: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none"
        };
      case "outline":
        return {
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: colors.main,
          backdropFilter: "none",
          WebkitBackdropFilter: "none"
        };
      case "ghost":
        return {
          borderWidth: "0",
          borderStyle: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none"
        };
      case "glassmorphic":
        return {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)"
        };
      default:
        return {
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: getCSSVar(cssVars, "border", "#e5e7eb")
        };
    }
  };
  const getIndicatorRadius = () => {
    switch (shape) {
      case "sharp":
        return "0";
      case "round":
        return `${Math.max(0, dimensions.borderRadius - 2)}px`;
      case "pill":
        return "9999px";
      default:
        return `${Math.max(0, dimensions.borderRadius - 2)}px`;
    }
  };
  const getIndicatorShadow = () => {
    if (variant === "ghost") {
      return "none";
    }
    if (variant === "glassmorphic") {
      const hexToRgba = (hex, alpha) => {
        const cleanHex = hex.replace("#", "");
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      const outerGlowColor = hexToRgba(colors.main, 0.37);
      const mediumGlowColor = hexToRgba(colors.main, 0.4);
      const innerGlowColor = hexToRgba(colors.main, 0.2);
      return `0 8px 32px 0 ${outerGlowColor}, 0 0 20px ${mediumGlowColor}, inset 0 0 20px ${innerGlowColor}`;
    }
    return `0 1px 2px ${getCSSVar(cssVars, "shadowSm", "rgba(0, 0, 0, 0.05)")}`;
  };
  const baseIndicatorStyles = __spreadValues({
    position: hasIsometricAnimation ? "relative" : "absolute",
    top: hasIsometricAnimation ? "0" : "2px",
    left: hasIsometricAnimation ? "0" : "2px",
    width: hasIsometricAnimation ? "100%" : `calc((100% - 4px) / ${itemCount})`,
    height: hasIsometricAnimation ? "100%" : "calc(100% - 4px)",
    borderRadius: getIndicatorRadius(),
    backgroundColor: getIndicatorBackground(),
    transform: hasIsometricAnimation ? "translate(0, 0)" : `translateX(${translateX})`,
    transition: animationsEnabled ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out" : "none",
    zIndex: 1,
    boxShadow: getIndicatorShadow(),
    pointerEvents: hasIsometricAnimation ? "auto" : "none"
  }, getBorderStyles());
  if (hasIsometricAnimation) {
    const isometricStyles = getIsometricIndicatorStyles(colors, variant, animationsEnabled);
    return __spreadValues(__spreadValues({}, baseIndicatorStyles), isometricStyles);
  }
  return baseIndicatorStyles;
};
var getIsometricContainerStyles2 = (selectedIndex, itemCount) => ({
  position: "absolute",
  top: "1px",
  left: "1px",
  width: `calc((100% - 2px) / ${itemCount})`,
  height: "calc(100% - 2px)",
  transform: `translateX(${selectedIndex * 100}%)`,
  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  pointerEvents: "none"
  // Container doesn't capture events
});
var getIsometricIndicatorStyles = (color, variant, animationsEnabled) => {
  const baseStyles = {
    position: "relative",
    zIndex: 1,
    // Offset the indicator up and left so the shadow appears centered
    // Default position has the indicator offset from the shadow
    transform: "translate(-3px, -3px)",
    transition: animationsEnabled ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
    pointerEvents: "none"
    // Indicator doesn't capture events - hover is handled by segment button
  };
  if (variant === "solid") {
    return __spreadProps(__spreadValues({}, baseStyles), {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: color.hover || color.main
      // Match shadow color for consistency
    });
  }
  return baseStyles;
};
var getIsometricShadowStyles2 = (color, variant, shape, size, animationsEnabled) => {
  if (variant === "ghost" || variant === "glassmorphic") {
    return { display: "none" };
  }
  const dimensions = getSegmentedControlDimensions(size);
  const getIndicatorRadius = () => {
    switch (shape) {
      case "sharp":
        return "0";
      case "round":
        return `${Math.max(0, dimensions.borderRadius - 2)}px`;
      case "pill":
        return "9999px";
      default:
        return `${Math.max(0, dimensions.borderRadius - 2)}px`;
    }
  };
  const baseStyles = {
    position: "absolute",
    top: "1px",
    left: "1px",
    width: "100%",
    height: "100%",
    borderRadius: getIndicatorRadius(),
    zIndex: 0,
    transition: "none",
    transform: "translate(0, 0)"
  };
  if (variant === "solid") {
    return __spreadProps(__spreadValues({}, baseStyles), {
      backgroundColor: color.hover || color.main,
      // Use darker hover color for better contrast
      opacity: 0.85
      // Slightly transparent for depth effect
    });
  } else {
    return __spreadProps(__spreadValues({}, baseStyles), {
      backgroundColor: color.main
      // --{{color}} for outline variant
    });
  }
};

// src/app/components/atoms/SegmentedControl/SegmentedControl.utils.tsx
var getDefaultSize3 = () => "md";
var getDefaultVariant3 = () => "solid";
var validateSegmentedControlProps = (props) => {
  if (process.env.NODE_ENV === "development") {
    if (props.items.length === 0) {
      console.warn("SegmentedControl: items array should not be empty");
    }
    if (props.selectedIndex !== void 0 && (props.selectedIndex < 0 || props.selectedIndex >= props.items.length)) {
      console.warn(`SegmentedControl: selectedIndex (${props.selectedIndex}) is out of range for items array of length ${props.items.length}`);
    }
    if (props.defaultSelectedIndex !== void 0 && (props.defaultSelectedIndex < 0 || props.defaultSelectedIndex >= props.items.length)) {
      console.warn(`SegmentedControl: defaultSelectedIndex (${props.defaultSelectedIndex}) is out of range for items array of length ${props.items.length}`);
    }
  }
};
var getAriaAttributes2 = (props) => ({
  role: "tablist",
  "aria-orientation": "horizontal",
  "aria-disabled": props.disabled,
  "aria-label": props.name
});
var getSegmentAriaAttributes = (props) => ({
  role: "tab",
  "aria-selected": props.isSelected,
  "aria-disabled": props.disabled,
  "aria-label": props.item,
  id: props.segmentId,
  tabIndex: props.isSelected ? 0 : -1
});
var handleKeyboardNavigation = (event, currentIndex, itemsLength, onIndexChange, disabled) => {
  if (disabled) return;
  let newIndex = currentIndex;
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowUp":
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : itemsLength - 1;
      break;
    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      newIndex = currentIndex < itemsLength - 1 ? currentIndex + 1 : 0;
      break;
    case "Home":
      event.preventDefault();
      newIndex = 0;
      break;
    case "End":
      event.preventDefault();
      newIndex = itemsLength - 1;
      break;
    default:
      return;
  }
  if (newIndex !== currentIndex) {
    onIndexChange(newIndex);
  }
};

// src/app/components/atoms/SegmentedControl/SegmentedControl.tsx
var SegmentedControl = forwardRef((_a, ref) => {
  var _b = _a, {
    items,
    selectedIndex,
    defaultSelectedIndex = 0,
    onChange,
    size = getDefaultSize3(),
    variant = getDefaultVariant3(),
    color = "primary",
    customColor,
    shape = "round",
    disabled = false,
    error = false,
    fullWidth = false,
    animate = true,
    animationMode = "default",
    rounded = false,
    name,
    className,
    style,
    itemCount: itemCount,
    item1,
    item2,
    item3,
    item4,
    item5,
    _itemsComputed
  } = _b, props = __objRest(_b, [
    "items",
    "selectedIndex",
    "defaultSelectedIndex",
    "onChange",
    "size",
    "variant",
    "color",
    "customColor",
    "shape",
    "disabled",
    "error",
    "fullWidth",
    "animate",
    "animationMode",
    "rounded",
    "name",
    "className",
    "style",
    // Filter out interactive config props that shouldn't be passed to DOM
    "itemCount",
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "_itemsComputed"
  ]);
  const cssVars = useCSSVariables();
  const animationsEnabled = animate;
  const useAnimationMode = animationsEnabled && animationMode !== "none";
  const hasIsometricAnimation = useAnimationMode && animationMode === "isometric" && variant !== "ghost" && variant !== "glassmorphic";
  const id = useId();
  validateSegmentedControlProps({ items, selectedIndex, defaultSelectedIndex });
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(defaultSelectedIndex);
  const isControlled = selectedIndex !== void 0;
  const currentSelectedIndex = isControlled ? selectedIndex : internalSelectedIndex;
  const containerRef = useRef(null);
  const segmentRefs = useRef([]);
  const indicatorRef = useRef(null);
  const shadowRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      const selectedButton = segmentRefs.current[currentSelectedIndex];
      selectedButton == null ? void 0 : selectedButton.focus();
    },
    blur: () => {
      const selectedButton = segmentRefs.current[currentSelectedIndex];
      selectedButton == null ? void 0 : selectedButton.blur();
    },
    selectIndex: (index) => {
      if (index >= 0 && index < items.length && !disabled) {
        handleIndexChange(index);
      }
    }
  }));
  const handleIndexChange = (newIndex) => {
    if (!isControlled) {
      setInternalSelectedIndex(newIndex);
    }
    if (onChange) {
      onChange(newIndex, items[newIndex]);
    }
    setTimeout(() => {
      var _a2;
      (_a2 = segmentRefs.current[newIndex]) == null ? void 0 : _a2.focus();
    }, 0);
  };
  const handleSegmentClick = (index) => {
    if (disabled || index === currentSelectedIndex) return;
    handleIndexChange(index);
  };
  const handleKeyDown6 = (event) => {
    handleKeyboardNavigation(
      event,
      currentSelectedIndex,
      items.length,
      handleIndexChange,
      disabled
    );
  };
  const handleSelectedSegmentMouseEnter = (event) => {
    if (!disabled && hasIsometricAnimation) {
      if (indicatorRef.current) {
        indicatorRef.current.style.transform = "translate(0, 0)";
      }
      const button = event.currentTarget;
      if (button) {
        button.style.transform = "translate(0, 0)";
      }
    }
  };
  const handleSelectedSegmentMouseLeave = (event) => {
    if (!disabled && hasIsometricAnimation) {
      if (indicatorRef.current) {
        indicatorRef.current.style.transform = "translate(-3px, -3px)";
      }
      const button = event.currentTarget;
      if (button) {
        button.style.transform = "translate(-3px, -3px)";
      }
    }
  };
  const containerAriaAttributes = getAriaAttributes2({
    disabled,
    name
  });
  const containerStyles = __spreadValues(__spreadValues({}, getContainerStyles(
    size,
    variant,
    color,
    customColor,
    rounded ? "pill" : shape,
    disabled,
    error,
    animate,
    cssVars,
    fullWidth,
    items.length
  )), style);
  const renderIndicator = () => {
    const indicatorStyles = getIndicatorStyles(
      currentSelectedIndex,
      items.length,
      variant,
      color,
      customColor,
      rounded ? "pill" : shape,
      size,
      animate,
      cssVars,
      hasIsometricAnimation
    );
    const indicatorElement = /* @__PURE__ */ React22.createElement(
      "div",
      {
        ref: indicatorRef,
        role: "presentation",
        style: indicatorStyles
      }
    );
    if (hasIsometricAnimation) {
      const colors = getColorVariables15(color, customColor, cssVars);
      const shadowStyles = getIsometricShadowStyles2(
        colors,
        variant,
        rounded ? "pill" : shape,
        size);
      return /* @__PURE__ */ React22.createElement("div", { style: getIsometricContainerStyles2(currentSelectedIndex, items.length) }, /* @__PURE__ */ React22.createElement("div", { ref: shadowRef, style: shadowStyles }), indicatorElement);
    }
    return indicatorElement;
  };
  return /* @__PURE__ */ React22.createElement(
    "div",
    __spreadValues(__spreadValues({
      ref: containerRef,
      className,
      style: containerStyles,
      onKeyDown: handleKeyDown6
    }, containerAriaAttributes), props),
    renderIndicator(),
    items.map((item, index) => {
      const isSelected2 = index === currentSelectedIndex;
      const segmentId = `${id}-segment-${index}`;
      const segmentAriaAttributes = getSegmentAriaAttributes({
        isSelected: isSelected2,
        disabled,
        item,
        segmentId
      });
      const renderSegmentText = () => item;
      return /* @__PURE__ */ React22.createElement(
        "button",
        __spreadValues({
          key: `${item}-${index}`,
          ref: (el) => {
            segmentRefs.current[index] = el;
          },
          type: "button",
          disabled,
          onClick: () => handleSegmentClick(index),
          onMouseEnter: isSelected2 && hasIsometricAnimation ? handleSelectedSegmentMouseEnter : void 0,
          onMouseLeave: isSelected2 && hasIsometricAnimation ? handleSelectedSegmentMouseLeave : void 0,
          style: getSegmentStyles(
            size,
            variant,
            color,
            customColor,
            rounded ? "pill" : shape,
            isSelected2,
            disabled,
            animate,
            cssVars,
            hasIsometricAnimation
          )
        }, segmentAriaAttributes),
        /* @__PURE__ */ React22.createElement("span", { style: {
          width: "100%",
          display: "block",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0
        } }, renderSegmentText())
      );
    })
  );
});
SegmentedControl.displayName = "SegmentedControl";

// src/app/components/atoms/Slider/Slider.styles.ts
var getColorVariables16 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20",
      accent: customColor,
      shadow: `0 2px 8px ${customColor}20`,
      disabled: customColor + "40"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      accent: cssVars.primaryAccent,
      shadow: cssVars.primaryShadow,
      disabled: cssVars.primaryDisabled,
      border: cssVars.primaryBorder
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      accent: cssVars.secondaryAccent,
      shadow: cssVars.secondaryShadow,
      disabled: cssVars.secondaryDisabled,
      border: cssVars.secondaryBorder
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      accent: cssVars.successAccent,
      shadow: cssVars.successShadow,
      disabled: cssVars.successDisabled,
      border: cssVars.successBorder
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      accent: cssVars.warningAccent,
      shadow: cssVars.warningShadow,
      disabled: cssVars.warningDisabled,
      border: cssVars.warningBorder
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      accent: cssVars.destructiveAccent,
      shadow: cssVars.destructiveShadow,
      disabled: cssVars.destructiveDisabled,
      border: cssVars.destructiveBorder
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      accent: cssVars.infoAccent,
      shadow: cssVars.infoShadow,
      disabled: cssVars.infoDisabled,
      border: cssVars.infoBorder
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getVariantStyles12 = (variant, color, customColor, cssVars) => {
  const colors = getColorVariables16(color, customColor, cssVars);
  switch (variant) {
    case "solid":
      return {
        fill: colors.accent || colors.main,
        thumb: colors.accent || colors.main,
        thumbBorder: "transparent",
        thumbShadow: `0 2px 8px ${colors.shadow || colors.main + "40"}`
      };
    case "outline":
      return {
        fill: colors.background || colors.main + "20",
        thumb: cssVars.background || "#ffffff",
        thumbBorder: colors.main,
        thumbShadow: `0 2px 4px ${cssVars.shadow || "rgba(0,0,0,0.1)"}`
      };
    case "ghost":
      return {
        fill: colors.background || colors.main + "30",
        thumb: colors.main + "40",
        thumbBorder: "transparent",
        thumbShadow: "none"
      };
    case "glassmorphic":
      colors.hover || colors.main || "#ffffff";
      return {
        fill: colors.background || colors.main + "20",
        thumb: "rgba(255, 255, 255, 0.2)",
        thumbBorder: colors.main,
        thumbShadow: `0 0 20px ${colors.main}80, 0 0 40px ${colors.main}40, 0 4px 16px ${colors.shadow || "rgba(31, 38, 135, 0.37)"}`,
        thumbBackdrop: "blur(10px)",
        thumbGlow: `0 0 20px ${colors.main}`
      };
    default:
      return {
        fill: colors.accent || colors.main,
        thumb: colors.accent || colors.main,
        thumbBorder: "transparent",
        thumbShadow: `0 2px 8px ${colors.shadow || colors.main + "40"}`
      };
  }
};
var getSizeConfig7 = (size, orientation) => {
  const baseConfig = {
    xs: {
      trackThickness: 2,
      thumbSize: 12,
      thumbBorder: 2,
      fontSize: "14px",
      gap: "8px",
      padding: "12px"
    },
    sm: {
      trackThickness: 3,
      thumbSize: 16,
      thumbBorder: 2,
      fontSize: "14px",
      gap: "8px",
      padding: "12px"
    },
    md: {
      trackThickness: 4,
      thumbSize: 20,
      thumbBorder: 2,
      fontSize: "16px",
      gap: "12px",
      padding: "16px"
    },
    lg: {
      trackThickness: 5,
      thumbSize: 24,
      thumbBorder: 2,
      fontSize: "16px",
      gap: "12px",
      padding: "20px"
    },
    xl: {
      trackThickness: 6,
      thumbSize: 28,
      thumbBorder: 2,
      fontSize: "18px",
      gap: "16px",
      padding: "24px"
    }
  };
  return baseConfig[size];
};
var getSliderContainerStyles = (orientation, length, disabled) => {
  const baseStyles = {
    display: "flex",
    flexDirection: orientation === "horizontal" ? "column" : "row",
    alignItems: orientation === "horizontal" ? "stretch" : "center",
    gap: "8px",
    fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "default",
    opacity: disabled ? 0.5 : 1
  };
  return baseStyles;
};
var getTrackContainerStyles = (orientation, size, animationsEnabled, length) => {
  const config = getSizeConfig7(size);
  const trackLength = typeof length === "number" ? `${length}px` : length || "300px";
  const containerHeight = orientation === "horizontal" ? config.thumbSize + 8 : trackLength;
  const containerWidth = orientation === "vertical" ? config.thumbSize + 8 : trackLength;
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: containerWidth,
    height: containerHeight,
    transition: animationsEnabled ? "opacity 0.2s ease-in-out" : "none",
    userSelect: "none"
  };
};
var getTrackBackgroundStyles = (orientation, size, variant, color, customColor, cssVars) => {
  const config = getSizeConfig7(size);
  const variantStyles = getVariantStyles12(variant, color, customColor, cssVars);
  const backgroundColor = variant === "ghost" || variant === "outline" || variant === "glassmorphic" ? variantStyles.fill : cssVars.border;
  return {
    position: "absolute",
    background: backgroundColor,
    borderRadius: "9999px",
    width: orientation === "horizontal" ? "100%" : `${config.trackThickness}px`,
    height: orientation === "horizontal" ? `${config.trackThickness}px` : "100%",
    top: orientation === "horizontal" ? "50%" : void 0,
    left: orientation === "vertical" ? "50%" : void 0,
    transform: orientation === "horizontal" ? "translateY(-50%)" : "translateX(-50%)"
  };
};
var getTrackFillStyles = (orientation, size, color, customColor, value, min, max, error, animationsEnabled, variant, cssVars) => {
  const config = getSizeConfig7(size);
  const variantStyles = getVariantStyles12(variant, color, customColor, cssVars);
  const percentage = (value - min) / (max - min) * 100;
  const fillColor = error ? cssVars.destructive : variantStyles.fill;
  const colors = getColorVariables16(color, customColor, cssVars);
  const styles = {
    position: "absolute",
    background: fillColor,
    borderRadius: "9999px",
    width: orientation === "horizontal" ? `${percentage}%` : `${config.trackThickness}px`,
    height: orientation === "horizontal" ? `${config.trackThickness}px` : `${percentage}%`,
    [orientation === "horizontal" ? "left" : "bottom"]: 0,
    top: orientation === "horizontal" ? "50%" : void 0,
    left: orientation === "vertical" ? "50%" : 0,
    transform: orientation === "horizontal" ? "translateY(-50%)" : "translateX(-50%)",
    transition: animationsEnabled ? "width 0.2s ease-in-out, height 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out" : "none"
  };
  if (variant === "glassmorphic" && !error) {
    styles.boxShadow = `0 0 10px ${colors.main}60, 0 0 20px ${colors.main}30`;
  }
  return styles;
};
var getHiddenInputStyles4 = () => ({
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
  cursor: "inherit",
  zIndex: 2
});
var getThumbStyles = (orientation, size, color, customColor, value, min, max, error, focused, animationsEnabled, variant, cssVars) => {
  const config = getSizeConfig7(size);
  const variantStyles = getVariantStyles12(variant, color, customColor, cssVars);
  const percentage = (value - min) / (max - min) * 100;
  const thumbColor = error ? cssVars.destructive : variantStyles.thumb;
  const thumbBorderColor = error ? cssVars.destructive : variantStyles.thumbBorder;
  const scaleValue = focused ? 1.1 : 1;
  const baseStyles = {
    position: "absolute",
    width: `${config.thumbSize}px`,
    height: `${config.thumbSize}px`,
    backgroundColor: thumbColor,
    border: `${config.thumbBorder}px solid ${thumbBorderColor}`,
    borderRadius: "50%",
    zIndex: 1,
    outline: focused ? `2px solid ${thumbColor}` : "none",
    outlineOffset: "2px",
    transition: animationsEnabled ? "left 0.2s ease-in-out, bottom 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out, background-color 0.2s ease-in-out" : "none",
    boxShadow: focused ? `0 0 0 4px ${thumbColor}20` : variantStyles.thumbShadow
  };
  if (variant === "glassmorphic" && variantStyles.thumbBackdrop) {
    baseStyles.backdropFilter = variantStyles.thumbBackdrop;
  }
  if (orientation === "horizontal") {
    baseStyles.left = `calc(${percentage}% - ${config.thumbSize / 2}px)`;
    baseStyles.top = "50%";
    baseStyles.transform = `translateY(-50%) scale(${scaleValue})`;
  } else {
    baseStyles.bottom = `calc(${percentage}% - ${config.thumbSize / 2}px)`;
    baseStyles.left = "50%";
    baseStyles.transform = `translateX(-50%) scale(${scaleValue})`;
  }
  return baseStyles;
};
var getLabelStyles4 = (size, disabled, error, cssVars) => {
  const config = getSizeConfig7(size);
  return {
    fontSize: config.fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.foregroundDisabled || cssVars.mutedForeground : error ? cssVars.destructive : cssVars.foreground,
    marginBottom: "4px",
    userSelect: "none"
  };
};
var getMinMaxLabelStyles = (size, orientation, disabled, color, customColor, cssVars) => {
  const fontSizeMap = {
    xs: "12px",
    sm: "12px",
    md: "14px",
    lg: "14px",
    xl: "16px"
  };
  const colors = getColorVariables16(color, customColor, cssVars);
  return {
    fontSize: fontSizeMap[size],
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : colors.main,
    userSelect: "none",
    whiteSpace: "nowrap",
    minWidth: "20px",
    textAlign: "center"
  };
};
var getLabelsContainerStyles = (orientation) => ({
  display: "flex",
  justifyContent: "space-between",
  width: orientation === "horizontal" ? "100%" : "auto",
  flexDirection: orientation === "horizontal" ? "row" : "column-reverse",
  alignItems: orientation === "horizontal" ? "center" : "flex-start",
  gap: "4px",
  marginTop: orientation === "horizontal" ? "4px" : "0",
  marginLeft: orientation === "vertical" ? "8px" : "0"
});
var getTooltipStyles = (orientation, size, value, min, max, cssVars) => {
  const config = getSizeConfig7(size);
  const percentage = (value - min) / (max - min) * 100;
  const baseStyles = {
    position: "absolute",
    backgroundColor: cssVars.card || cssVars.background,
    color: cssVars.cardForeground || cssVars.foreground,
    padding: "4px 8px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    zIndex: 3,
    pointerEvents: "none",
    border: `1px solid ${cssVars.border}`,
    boxShadow: cssVars.shadow
  };
  if (orientation === "horizontal") {
    baseStyles.left = `${percentage}%`;
    baseStyles.bottom = `${config.thumbSize + 8}px`;
    baseStyles.transform = "translateX(-50%)";
  } else {
    baseStyles.bottom = `${percentage}%`;
    baseStyles.left = `${config.thumbSize + 8}px`;
    baseStyles.transform = "translateY(50%)";
  }
  return baseStyles;
};
var getTickStyles = (orientation, size, position, min, max, cssVars) => {
  const config = getSizeConfig7(size);
  const percentage = (position - min) / (max - min) * 100;
  const baseStyles = {
    position: "absolute",
    backgroundColor: cssVars.border,
    pointerEvents: "none"
  };
  if (orientation === "horizontal") {
    baseStyles.left = `calc(${percentage}%)`;
    baseStyles.top = "50%";
    baseStyles.width = "1px";
    baseStyles.height = `${config.trackThickness + 4}px`;
    baseStyles.transform = "translateY(-50%)";
  } else {
    baseStyles.bottom = `calc(${percentage}%)`;
    baseStyles.left = "50%";
    baseStyles.height = "1px";
    baseStyles.width = `${config.trackThickness + 4}px`;
    baseStyles.transform = "translateX(-50%)";
  }
  return baseStyles;
};
var getTickLabelStyles = (orientation, size, position, min, max, cssVars) => {
  const config = getSizeConfig7(size);
  const percentage = (position - min) / (max - min) * 100;
  const baseStyles = {
    position: "absolute",
    fontSize: "11px",
    color: cssVars.mutedForeground,
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "nowrap"
  };
  if (orientation === "horizontal") {
    baseStyles.left = `calc(${percentage}%)`;
    baseStyles.top = `${config.thumbSize + 12}px`;
    baseStyles.transform = "translateX(-50%)";
  } else {
    baseStyles.bottom = `calc(${percentage}%)`;
    baseStyles.left = `${config.thumbSize + 12}px`;
    baseStyles.transform = "translateY(50%)";
  }
  return baseStyles;
};

// src/app/components/atoms/Slider/Slider.utils.ts
var clampValue = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};
var roundToStep = (value, step) => {
  return Math.round(value / step) * step;
};
var getValueFromPercentage = (percentage, min, max) => {
  return min + percentage / 100 * (max - min);
};
var getValueFromPosition = (clientX, clientY, rect, orientation, min, max, step) => {
  let percentage;
  if (orientation === "horizontal") {
    percentage = (clientX - rect.left) / rect.width * 100;
  } else {
    percentage = (rect.bottom - clientY) / rect.height * 100;
  }
  percentage = Math.max(0, Math.min(100, percentage));
  const value = getValueFromPercentage(percentage, min, max);
  return roundToStep(clampValue(value, min, max), step);
};
var formatValue = (value, formatter) => {
  if (formatter) {
    return formatter(value);
  }
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(2).replace(/\.?0+$/, "");
};
var validateSliderProps = (props) => {
  const { min, max, step, value, defaultValue } = props;
  if (process.env.NODE_ENV === "development") {
    if (min >= max) {
      console.warn("Slider: min value should be less than max value");
    }
    if (step <= 0) {
      console.warn("Slider: step should be a positive number");
    }
    if (value !== void 0 && (value < min || value > max)) {
      console.warn(`Slider: value (${value}) is outside the range [${min}, ${max}]`);
    }
    if (defaultValue !== void 0 && (defaultValue < min || defaultValue > max)) {
      console.warn(`Slider: defaultValue (${defaultValue}) is outside the range [${min}, ${max}]`);
    }
  }
};
var generateTicks = (min, max, step, customTicks) => {
  if (customTicks) {
    return customTicks.filter((tick) => tick.value >= min && tick.value <= max);
  }
  const ticks = [];
  for (let value = min; value <= max; value += step) {
    ticks.push({ value });
  }
  return ticks;
};
var handleKeyDown4 = (event, value, min, max, step, orientation, onChange) => {
  const { key } = event;
  let newValue = value;
  const largeStep = step * 10;
  const isHorizontal = orientation === "horizontal";
  switch (key) {
    case "ArrowUp":
      newValue = isHorizontal ? value + step : value + step;
      break;
    case "ArrowDown":
      newValue = isHorizontal ? value - step : value - step;
      break;
    case "ArrowLeft":
      newValue = isHorizontal ? value - step : value;
      break;
    case "ArrowRight":
      newValue = isHorizontal ? value + step : value;
      break;
    case "PageUp":
      newValue = value + largeStep;
      break;
    case "PageDown":
      newValue = value - largeStep;
      break;
    case "Home":
      newValue = min;
      break;
    case "End":
      newValue = max;
      break;
    default:
      return;
  }
  event.preventDefault();
  newValue = roundToStep(clampValue(newValue, min, max), step);
  if (newValue !== value && onChange) {
    const syntheticEvent = {
      target: { value: newValue.toString() },
      currentTarget: { value: newValue.toString() },
      type: "change",
      bubbles: true,
      cancelable: true,
      preventDefault: () => {
      },
      stopPropagation: () => {
      }
    };
    onChange(newValue, syntheticEvent);
  }
};
var getAriaAttributes3 = (props) => {
  const { value, min, max, disabled, orientation, label, describedBy } = props;
  return {
    role: "slider",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    "aria-valuetext": formatValue(value),
    "aria-orientation": orientation,
    "aria-disabled": disabled,
    "aria-label": label,
    "aria-describedby": describedBy,
    tabIndex: disabled ? -1 : 0
  };
};

// src/app/components/atoms/Slider/Slider.tsx
var Slider = forwardRef((allProps, ref) => {
  var _c;
  const _a = allProps, { onChange, onInput } = _a, propsForExtraction = __objRest(_a, ["onChange", "onInput"]);
  const [formProps, componentProps] = extractFormProps(propsForExtraction);
  const {
    color = UNIVERSAL_DEFAULTS.color,
    customColor,
    variant = UNIVERSAL_DEFAULTS.variant,
    size = UNIVERSAL_DEFAULTS.size,
    disabled = UNIVERSAL_DEFAULTS.disabled,
    error,
    label,
    helperText: description,
    placeholder,
    width,
    height,
    className,
    style,
    id: providedId,
    "data-testid": dataTestId,
    animate = UNIVERSAL_DEFAULTS.animate,
    // Form-specific props
    name,
    value,
    defaultValue,
    required,
    readOnly,
    autoComplete,
    autoFocus = false
  } = formProps;
  const _b = componentProps, {
    orientation = "horizontal",
    min = 0,
    max = 100,
    step: rawStep = 1,
    showTooltip = false,
    showTicks = false,
    ticks,
    showLabels = false,
    header,
    footer,
    length = width || height || 300,
    formatValue: customFormatter
  } = _b, rest = __objRest(_b, [
    "orientation",
    "min",
    "max",
    "step",
    "showTooltip",
    "showTicks",
    "ticks",
    "showLabels",
    "header",
    "footer",
    "length",
    "formatValue"
  ]);
  const step = rawStep === null || rawStep === void 0 || isNaN(Number(rawStep)) || Number(rawStep) <= 0 ? 1 : Number(rawStep);
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = ((_c = settings.appearance.animations) != null ? _c : true) && animate;
  const generatedId = useId();
  const id = providedId || generatedId;
  validateSliderProps({ min, max, step, value, defaultValue });
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = useState(
    clampValue(roundToStep(defaultValue || 0, step), min, max)
  );
  const currentValue = isControlled ? clampValue(roundToStep(value || 0, step), min, max) : internalValue;
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showTooltipState, setShowTooltipState] = useState(false);
  const inputRef = useRef(null);
  const trackRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    },
    blur: () => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.blur();
    }
  }));
  const updateValue = useCallback((newValue, event) => {
    const clampedValue = clampValue(roundToStep(newValue, step), min, max);
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    if (event && "target" in event && onChange) {
      onChange(clampedValue, event);
    }
    if (event && "target" in event && onInput) {
      onInput(clampedValue, event);
    }
  }, [isControlled, min, max, step, onChange, onInput]);
  const handleChange = useCallback((event) => {
    if (disabled) return;
    const newValue = parseFloat(event.target.value);
    updateValue(newValue, event);
  }, [disabled, updateValue]);
  const handleInput = useCallback((event) => {
    if (disabled) return;
    const newValue = parseFloat(event.target.value);
    updateValue(newValue, event);
  }, [disabled, updateValue]);
  const handlePointerDown = useCallback((event) => {
    var _a2, _b2;
    if (disabled) return;
    event.preventDefault();
    setDragging(true);
    setShowTooltipState(true);
    const rect = (_a2 = trackRef.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!rect) return;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
    const newValue = getValueFromPosition(clientX, clientY, rect, orientation, min, max, step);
    const syntheticEvent = {
      target: { value: newValue.toString() },
      currentTarget: { value: newValue.toString() },
      type: "change",
      bubbles: true,
      cancelable: true,
      preventDefault: () => {
      },
      stopPropagation: () => {
      }
    };
    updateValue(newValue, syntheticEvent);
    (_b2 = inputRef.current) == null ? void 0 : _b2.focus();
  }, [disabled, orientation, min, max, step, updateValue]);
  const handlePointerMove = useCallback((event) => {
    var _a2;
    if (!dragging || disabled) return;
    const rect = (_a2 = trackRef.current) == null ? void 0 : _a2.getBoundingClientRect();
    if (!rect) return;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;
    const newValue = getValueFromPosition(clientX, clientY, rect, orientation, min, max, step);
    const syntheticEvent = {
      target: { value: newValue.toString() },
      currentTarget: { value: newValue.toString() },
      type: "change",
      bubbles: true,
      cancelable: true,
      preventDefault: () => {
      },
      stopPropagation: () => {
      }
    };
    updateValue(newValue, syntheticEvent);
  }, [dragging, disabled, orientation, min, max, step, updateValue]);
  const handlePointerUp = useCallback(() => {
    setDragging(false);
    setShowTooltipState(false);
  }, []);
  React22.useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e) => handlePointerMove(e);
      const handleMouseUp = () => handlePointerUp();
      const handleTouchMove = (e) => handlePointerMove(e);
      const handleTouchEnd = () => handlePointerUp();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [dragging, handlePointerMove, handlePointerUp]);
  const handleKeyDown6 = useCallback((event) => {
    if (disabled) return;
    handleKeyDown4(event, currentValue, min, max, step, orientation, onChange);
  }, [disabled, currentValue, min, max, step, orientation, onChange]);
  const handleFocus = useCallback(() => {
    setFocused(true);
    if (showTooltip) {
      setShowTooltipState(true);
    }
  }, [showTooltip]);
  const handleBlur = useCallback(() => {
    setFocused(false);
    if (!dragging) {
      setShowTooltipState(false);
    }
  }, [dragging]);
  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setHovering(true);
      if (showTooltip) {
        setShowTooltipState(true);
      }
    }
  }, [disabled, showTooltip]);
  const handleMouseLeave = useCallback(() => {
    if (!dragging) {
      setHovering(false);
      if (!focused) {
        setShowTooltipState(false);
      }
    }
  }, [dragging, focused]);
  const tickMarks = showTicks ? generateTicks(min, max, step, ticks) : [];
  const ariaAttributes = getAriaAttributes3({
    value: currentValue,
    min,
    max,
    disabled,
    orientation,
    label,
    describedBy: description ? `${id}-description` : void 0
  });
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      className,
      style: __spreadValues(__spreadValues({}, getSliderContainerStyles(orientation, length, disabled)), style)
    },
    label && /* @__PURE__ */ React22.createElement(
      "label",
      {
        htmlFor: id,
        style: getLabelStyles4(size, disabled || false, error || false, cssVars)
      },
      label
    ),
    /* @__PURE__ */ React22.createElement("div", { style: { display: "flex", alignItems: "center", gap: "12px", width: "100%" } }, orientation === "horizontal" && header && /* @__PURE__ */ React22.createElement("span", { style: getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars) }, header), /* @__PURE__ */ React22.createElement(
      "div",
      {
        ref: trackRef,
        style: __spreadProps(__spreadValues({}, getTrackContainerStyles(orientation, size, animationsEnabled, length)), {
          cursor: disabled ? "not-allowed" : dragging ? "grabbing" : hovering ? "grab" : "pointer"
        }),
        onMouseDown: handlePointerDown,
        onTouchStart: handlePointerDown,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      },
      /* @__PURE__ */ React22.createElement("div", { style: getTrackBackgroundStyles(orientation, size, variant, color, customColor, cssVars) }),
      /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: getTrackFillStyles(
            orientation,
            size,
            color,
            customColor,
            currentValue,
            min,
            max,
            error || false,
            animationsEnabled && !dragging,
            variant,
            cssVars
          )
        }
      ),
      tickMarks.map((tick) => /* @__PURE__ */ React22.createElement("div", { key: tick.value }, /* @__PURE__ */ React22.createElement("div", { style: getTickStyles(orientation, size, tick.value, min, max, cssVars) }), tick.label && /* @__PURE__ */ React22.createElement("div", { style: getTickLabelStyles(orientation, size, tick.value, min, max, cssVars) }, tick.label))),
      /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: __spreadProps(__spreadValues({}, getThumbStyles(
            orientation,
            size,
            color,
            customColor,
            currentValue,
            min,
            max,
            error || false,
            focused || hovering,
            animationsEnabled && !dragging,
            variant,
            cssVars
          )), {
            cursor: disabled ? "not-allowed" : dragging ? "grabbing" : "grab"
          })
        }
      ),
      showTooltip && showTooltipState && /* @__PURE__ */ React22.createElement("div", { style: getTooltipStyles(orientation, size, currentValue, min, max, cssVars) }, formatValue(currentValue, customFormatter)),
      /* @__PURE__ */ React22.createElement(
        "input",
        __spreadValues(__spreadProps(__spreadValues({
          ref: inputRef,
          type: "range",
          id,
          min,
          max,
          step,
          value: currentValue,
          disabled,
          onChange: handleChange,
          onInput: handleInput,
          onKeyDown: handleKeyDown6,
          onFocus: handleFocus,
          onBlur: handleBlur,
          style: getHiddenInputStyles4()
        }, ariaAttributes), {
          name,
          required,
          readOnly,
          autoComplete,
          autoFocus,
          "data-testid": dataTestId
        }), rest)
      )
    ), orientation === "horizontal" && footer && /* @__PURE__ */ React22.createElement("span", { style: getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars) }, footer)),
    orientation === "vertical" && (header || footer) && /* @__PURE__ */ React22.createElement("div", { style: getLabelsContainerStyles(orientation) }, header && /* @__PURE__ */ React22.createElement("span", { style: getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars) }, header), footer && /* @__PURE__ */ React22.createElement("span", { style: getMinMaxLabelStyles(size, orientation, disabled || false, color, customColor, cssVars) }, footer))
  );
});
Slider.displayName = "Slider";

// src/app/components/atoms/TextArea/TextArea.styles.ts
var getColorVariables18 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground || cssVars.primary + "10",
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover || cssVars.primary + "20",
      border: cssVars.primaryBorder || cssVars.primary
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground || cssVars.secondary + "10",
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover || cssVars.secondary + "20",
      border: cssVars.secondaryBorder || cssVars.secondary
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground || cssVars.success + "10",
      foreground: cssVars.successForeground,
      hover: cssVars.successHover || cssVars.success + "20",
      border: cssVars.successBorder || cssVars.success
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground || cssVars.warning + "10",
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover || cssVars.warning + "20",
      border: cssVars.warningBorder || cssVars.warning
    },
    destructive: {
      main: cssVars.error,
      background: cssVars.errorBackground || cssVars.error + "10",
      foreground: cssVars.errorForeground || "#ffffff",
      hover: cssVars.errorHover || cssVars.error + "20",
      border: cssVars.errorBorder || cssVars.error
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground || cssVars.info + "10",
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover || cssVars.info + "20",
      border: cssVars.infoBorder || cssVars.info
    }
  };
  return colorMap[color] || colorMap.primary;
};
var getShapeStyles15 = (shape) => {
  switch (shape) {
    case "sharp":
      return { borderRadius: "0" };
    case "round":
      return { borderRadius: "12px" };
    case "pill":
      return { borderRadius: "9999px" };
    default:
      return { borderRadius: "12px" };
  }
};
var getSizeConfig8 = (size) => {
  const configs = {
    xs: {
      padding: "8px 10px",
      fontSize: "12px",
      lineHeight: 1.4,
      minHeight: "64px",
      iconSize: "14px"
    },
    sm: {
      padding: "10px 12px",
      fontSize: "14px",
      lineHeight: 1.4,
      minHeight: "72px",
      iconSize: "16px"
    },
    md: {
      padding: "12px 14px",
      fontSize: "16px",
      lineHeight: 1.5,
      minHeight: "80px",
      iconSize: "18px"
    },
    lg: {
      padding: "14px 16px",
      fontSize: "18px",
      lineHeight: 1.5,
      minHeight: "96px",
      iconSize: "20px"
    },
    xl: {
      padding: "16px 18px",
      fontSize: "20px",
      lineHeight: 1.5,
      minHeight: "112px",
      iconSize: "22px"
    }
  };
  return configs[size];
};
var getTextAreaContainerStyles = (width, height, disabled) => {
  const baseStyles = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: width || "100%",
    fontFamily: "inherit"
  };
  if (height) {
    baseStyles.height = typeof height === "number" ? `${height}px` : height;
  }
  if (disabled) {
    baseStyles.opacity = 0.6;
  }
  return baseStyles;
};
var getTextAreaInputStyles = (color, customColor, variant, shape, size, resize, disabled, error, focused, minRows, maxRows, autoResize, showLineNumbers, animationsEnabled, cssVars) => {
  const colors = getColorVariables18(color, customColor, cssVars);
  const sizeConfig = getSizeConfig8(size);
  const shapeStyles = getShapeStyles15(shape);
  const baseStyles = __spreadValues(__spreadValues({
    width: "100%",
    borderWidth: "2px",
    borderStyle: "solid",
    outline: "none",
    fontFamily: "inherit",
    resize: resize === "none" ? "none" : resize,
    transition: animationsEnabled ? "border-color var(--duration-fast) var(--animation-smooth), background-color var(--duration-fast) var(--animation-smooth), opacity var(--duration-fast) var(--animation-smooth)" : "none"
  }, sizeConfig), shapeStyles);
  if (autoResize) {
    baseStyles.resize = "none";
    baseStyles.overflow = "hidden";
    if (maxRows) {
      const lineHeight = parseFloat(sizeConfig.lineHeight.toString());
      const maxHeight = maxRows * lineHeight + 32;
      baseStyles.maxHeight = `${maxHeight}px`;
    }
  } else {
    const lineHeight = parseFloat(sizeConfig.lineHeight.toString());
    const minHeight = Math.max(
      minRows * lineHeight * parseFloat(sizeConfig.fontSize) + 32,
      parseFloat(sizeConfig.minHeight.replace("px", ""))
    );
    baseStyles.minHeight = `${minHeight}px`;
  }
  if (showLineNumbers) {
    baseStyles.paddingLeft = "40px";
  }
  const variantStyles = (() => {
    if (error) {
      const baseErrorStyle = {
        borderColor: cssVars.destructive
      };
      switch (variant) {
        case "solid":
          return __spreadProps(__spreadValues({}, baseErrorStyle), {
            backgroundColor: cssVars.destructiveAccent || cssVars.destructive,
            color: colors.foreground
            // Keep original foreground color
          });
        case "ghost":
          return __spreadProps(__spreadValues({}, baseErrorStyle), {
            backgroundColor: "transparent",
            color: cssVars.foreground
          });
        case "glassmorphic":
          return __spreadProps(__spreadValues({}, baseErrorStyle), {
            backgroundColor: cssVars.destructiveBackground,
            color: cssVars.destructiveForeground,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)"
          });
        case "outline":
        default:
          return __spreadProps(__spreadValues({}, baseErrorStyle), {
            backgroundColor: cssVars.background,
            color: cssVars.foreground
          });
      }
    }
    switch (variant) {
      case "solid":
        return {
          backgroundColor: colors.accent || colors.main,
          borderColor: colors.accent || colors.main,
          color: colors.foreground
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: cssVars.foreground
        };
      case "glassmorphic":
        return {
          backgroundColor: colors.background,
          borderColor: colors.border,
          color: colors.foreground,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)"
        };
      case "outline":
      default:
        return {
          backgroundColor: cssVars.background,
          borderColor: colors.main,
          color: cssVars.foreground
        };
    }
  })();
  const focusStyles = {};
  if (focused) {
    const focusColor = error ? cssVars.destructive : colors.main;
    focusStyles.outline = `2px solid ${focusColor}`;
    focusStyles.outlineOffset = "2px";
  }
  if (disabled) {
    baseStyles.cursor = "not-allowed";
    baseStyles.backgroundColor = cssVars.muted;
    baseStyles.color = cssVars.mutedForeground;
  }
  return __spreadValues(__spreadValues(__spreadValues({}, baseStyles), variantStyles), focusStyles);
};
var getLabelStyles5 = (size, disabled, error, cssVars) => {
  const sizeConfig = getSizeConfig8(size);
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    color: disabled ? cssVars.mutedForeground : error ? cssVars.error : cssVars.foreground,
    marginBottom: "6px",
    userSelect: "none",
    display: "block"
  };
};
var getDescriptionStyles5 = (size, disabled, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    marginBottom: "6px",
    lineHeight: 1.4
  };
};
var getHelperTextStyles2 = (size, disabled, error, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : error ? cssVars.error : cssVars.mutedForeground,
    marginTop: "6px",
    lineHeight: 1.4
  };
};
var getCharacterCountStyles = (size, disabled, isOverLimit, cssVars) => {
  const fontSizeMap = {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px"
  };
  return {
    fontSize: fontSizeMap[size],
    color: disabled ? cssVars.mutedForeground : isOverLimit ? cssVars.error : cssVars.mutedForeground,
    marginTop: "4px",
    textAlign: "right",
    userSelect: "none"
  };
};
var getIconStyles3 = (size, iconPosition, clickable, disabled, cssVars) => {
  const sizeConfig = getSizeConfig8(size);
  const baseStyles = {
    position: "absolute",
    fontSize: sizeConfig.iconSize,
    color: disabled ? cssVars.mutedForeground : cssVars.foreground,
    cursor: clickable && !disabled ? "pointer" : "default",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const offset = "12px";
  switch (iconPosition) {
    case "top-left":
      baseStyles.top = offset;
      baseStyles.left = offset;
      break;
    case "top-right":
      baseStyles.top = offset;
      baseStyles.right = offset;
      break;
    case "bottom-left":
      baseStyles.bottom = offset;
      baseStyles.left = offset;
      break;
    case "bottom-right":
      baseStyles.bottom = offset;
      baseStyles.right = offset;
      break;
  }
  if (clickable && !disabled) {
    baseStyles.transition = "color var(--duration-fast) var(--animation-smooth)";
  }
  return baseStyles;
};
var getLineNumbersStyles = (size, disabled, cssVars) => {
  const sizeConfig = getSizeConfig8(size);
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "32px",
    height: "100%",
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    color: disabled ? cssVars.mutedForeground : cssVars.mutedForeground,
    backgroundColor: cssVars.muted,
    borderRight: `1px solid ${cssVars.border}`,
    padding: sizeConfig.padding.split(" ")[0] + " 4px",
    fontFamily: "monospace",
    textAlign: "right",
    userSelect: "none",
    pointerEvents: "none",
    whiteSpace: "pre",
    overflow: "hidden"
  };
};
var getLoadingOverlayStyles = (cssVars) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: cssVars.background + "80",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2
});
var getInputWrapperStyles = () => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%"
});
var getBottomSectionStyles = () => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "8px",
  marginTop: "6px"
});

// src/app/components/atoms/TextArea/TextArea.utils.ts
var getLineCount = (text) => {
  if (!text) return 1;
  return text.split("\n").length;
};
var generateLineNumbers = (lineCount) => {
  const lines = [];
  for (let i = 1; i <= lineCount; i++) {
    lines.push(i.toString());
  }
  return lines.join("\n");
};
var getCharacterCount = (text, countNewlines = true) => {
  if (!text) return 0;
  if (countNewlines) {
    return text.length;
  }
  return text.replace(/\n/g, "").length;
};
var isOverCharacterLimit = (text, maxLength, countNewlines = true) => {
  if (!maxLength) return false;
  return getCharacterCount(text, countNewlines) > maxLength;
};
var calculateAutoHeight = (textarea, minRows, maxRows, lineHeight) => {
  textarea.style.height = "auto";
  const scrollHeight = textarea.scrollHeight;
  const paddingHeight = 24;
  const minHeight = minRows * lineHeight + paddingHeight;
  let height = Math.max(scrollHeight, minHeight);
  if (maxRows) {
    const maxHeight = maxRows * lineHeight + paddingHeight;
    height = Math.min(height, maxHeight);
  }
  return height;
};
var handleKeyDown5 = (event, clearOnEscape, onClear) => {
  const { key, ctrlKey, metaKey } = event;
  if (key === "Escape" && clearOnEscape) {
    event.preventDefault();
    onClear == null ? void 0 : onClear();
    return;
  }
};
var formatCharacterCount = (current, max) => {
  if (max) {
    return `${current}/${max}`;
  }
  return current.toString();
};
var validateTextAreaProps = (props) => {
  const { minRows, maxRows, maxLength, autoResize } = props;
  if (process.env.NODE_ENV === "development") {
    if (minRows < 1) {
      console.warn("TextArea: minRows should be at least 1");
    }
    if (maxRows && maxRows < minRows) {
      console.warn("TextArea: maxRows should be greater than or equal to minRows");
    }
    if (maxLength && maxLength < 1) {
      console.warn("TextArea: maxLength should be a positive number");
    }
    if (autoResize && !maxRows) {
      console.warn("TextArea: Consider setting maxRows when using autoResize to prevent unlimited growth");
    }
  }
};
var getAriaAttributes4 = (props) => {
  const {
    error,
    disabled,
    label,
    description,
    helperText,
    errorMessage,
    maxLength,
    describedBy,
    labelledBy
  } = props;
  const ariaDescribedBy = [];
  if (describedBy) ariaDescribedBy.push(describedBy);
  if (description) ariaDescribedBy.push("textarea-description");
  if (helperText) ariaDescribedBy.push("textarea-helper");
  if (error && errorMessage) ariaDescribedBy.push("textarea-error");
  return {
    "aria-invalid": error,
    "aria-disabled": disabled,
    "aria-label": label,
    "aria-describedby": ariaDescribedBy.length > 0 ? ariaDescribedBy.join(" ") : void 0,
    "aria-labelledby": labelledBy,
    "aria-required": void 0,
    // Will be set by required prop
    maxLength
  };
};
var handlePaste = (event, maxLength, currentValue, selectionStart, selectionEnd) => {
  if (!maxLength) {
    return { shouldPrevent: false };
  }
  const pastedText = event.clipboardData.getData("text");
  const beforeSelection = currentValue.substring(0, selectionStart);
  const afterSelection = currentValue.substring(selectionEnd);
  const newValue = beforeSelection + pastedText + afterSelection;
  if (newValue.length > maxLength) {
    const availableSpace = maxLength - beforeSelection.length - afterSelection.length;
    const trimmedPaste = pastedText.substring(0, Math.max(0, availableSpace));
    const finalValue = beforeSelection + trimmedPaste + afterSelection;
    return {
      shouldPrevent: true,
      newValue: finalValue
    };
  }
  return { shouldPrevent: false };
};
var debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// src/app/components/atoms/TextArea/TextArea.tsx
var TextArea = forwardRef(
  (allProps, ref) => {
    var _c;
    const _a = allProps, { onPaste } = _a, propsForExtraction = __objRest(_a, ["onPaste"]);
    const [formProps, componentProps] = extractFormProps(propsForExtraction);
    const {
      color = UNIVERSAL_DEFAULTS.color,
      customColor,
      variant = "outline",
      // TextArea-specific default
      shape = UNIVERSAL_DEFAULTS.shape,
      size = UNIVERSAL_DEFAULTS.size,
      disabled = UNIVERSAL_DEFAULTS.disabled,
      loading = UNIVERSAL_DEFAULTS.loading,
      error,
      label,
      helperText,
      placeholder,
      width,
      height,
      className,
      style,
      id: providedId,
      "data-testid": dataTestId,
      animate = UNIVERSAL_DEFAULTS.animate,
      // Form-specific props
      name,
      value,
      defaultValue,
      required,
      readOnly,
      autoComplete,
      autoFocus = false,
      onChange,
      onKeyDown,
      onFocus,
      onBlur
    } = formProps;
    const _b = componentProps, {
      resize = "vertical",
      description,
      errorMessage,
      showCharacterCount = false,
      maxLength,
      minRows = 3,
      maxRows,
      autoResize = false,
      showLineNumbers = false,
      clearOnEscape = false,
      icon,
      iconPosition = "top-right",
      iconClickable = false,
      onIconClick
    } = _b, rest = __objRest(_b, [
      "resize",
      "description",
      "errorMessage",
      "showCharacterCount",
      "maxLength",
      "minRows",
      "maxRows",
      "autoResize",
      "showLineNumbers",
      "clearOnEscape",
      "icon",
      "iconPosition",
      "iconClickable",
      "onIconClick"
    ]);
    const cssVars = useCSSVariables();
    const { settings } = useSettings();
    const animationsEnabled = ((_c = settings.appearance.animations) != null ? _c : true) && animate;
    const generatedId = useId();
    const id = providedId || generatedId;
    validateTextAreaProps({ minRows, maxRows, maxLength, autoResize });
    const isControlled = value !== void 0;
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const currentValue = isControlled ? value : internalValue;
    const [focused, setFocused] = useState(false);
    const [lineNumbers, setLineNumbers] = useState("1");
    const textareaRef = useRef(null);
    useImperativeHandle(ref, () => ({
      focus: () => {
        var _a2;
        return (_a2 = textareaRef.current) == null ? void 0 : _a2.focus();
      },
      blur: () => {
        var _a2;
        return (_a2 = textareaRef.current) == null ? void 0 : _a2.blur();
      },
      select: () => {
        var _a2;
        return (_a2 = textareaRef.current) == null ? void 0 : _a2.select();
      },
      setSelectionRange: (start, end) => {
        var _a2;
        (_a2 = textareaRef.current) == null ? void 0 : _a2.setSelectionRange(start, end);
      },
      getValue: () => currentValue,
      setValue: (newValue) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (textareaRef.current) {
          textareaRef.current.value = newValue;
        }
      }
    }));
    const handleAutoResize = useCallback(() => {
      if (!autoResize || !textareaRef.current) return;
      const textarea = textareaRef.current;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight || "20");
      const newHeight = calculateAutoHeight(textarea, minRows, maxRows, lineHeight);
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, minRows, maxRows]);
    const debouncedAutoResize = useCallback(
      debounce(handleAutoResize, 10),
      [handleAutoResize]
    );
    const updateLineNumbers = useCallback((text) => {
      if (showLineNumbers) {
        const lineCount = getLineCount(text);
        setLineNumbers(generateLineNumbers(lineCount));
      }
    }, [showLineNumbers]);
    const handleChange = useCallback((event) => {
      const newValue = event.target.value;
      if (maxLength && newValue.length > maxLength) {
        return;
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange == null ? void 0 : onChange(event);
      updateLineNumbers(newValue);
      debouncedAutoResize();
    }, [isControlled, maxLength, onChange, updateLineNumbers, debouncedAutoResize]);
    const handleFocus = useCallback((event) => {
      setFocused(true);
      onFocus == null ? void 0 : onFocus(event);
    }, [onFocus]);
    const handleBlur = useCallback((event) => {
      setFocused(false);
      onBlur == null ? void 0 : onBlur(event);
    }, [onBlur]);
    const handleKeyDown6 = useCallback((event) => {
      handleKeyDown5(event, clearOnEscape, () => {
        if (!isControlled) {
          setInternalValue("");
        }
        if (textareaRef.current) {
          textareaRef.current.value = "";
          const syntheticEvent = __spreadProps(__spreadValues({}, event), {
            target: textareaRef.current,
            currentTarget: textareaRef.current
          });
          onChange == null ? void 0 : onChange(syntheticEvent);
        }
        updateLineNumbers("");
        debouncedAutoResize();
      });
      onKeyDown == null ? void 0 : onKeyDown(event);
    }, [clearOnEscape, isControlled, onChange, updateLineNumbers, debouncedAutoResize, onKeyDown]);
    const handlePasteEvent = useCallback((event) => {
      if (maxLength && textareaRef.current) {
        const { selectionStart, selectionEnd } = textareaRef.current;
        const pasteResult = handlePaste(
          event,
          maxLength,
          currentValue,
          selectionStart,
          selectionEnd
        );
        if (pasteResult.shouldPrevent) {
          event.preventDefault();
          if (pasteResult.newValue !== void 0) {
            const newValue = pasteResult.newValue;
            if (!isControlled) {
              setInternalValue(newValue);
            }
            textareaRef.current.value = newValue;
            const syntheticEvent = __spreadProps(__spreadValues({}, event), {
              target: textareaRef.current,
              currentTarget: textareaRef.current,
              type: "change"
            });
            onChange == null ? void 0 : onChange(syntheticEvent);
            updateLineNumbers(newValue);
            debouncedAutoResize();
          }
        }
      }
      onPaste == null ? void 0 : onPaste(event);
    }, [maxLength, currentValue, isControlled, onChange, updateLineNumbers, debouncedAutoResize, onPaste]);
    const handleIconClick = useCallback(() => {
      if (iconClickable && !disabled && onIconClick) {
        onIconClick();
      }
    }, [iconClickable, disabled, onIconClick]);
    useEffect(() => {
      updateLineNumbers(currentValue);
      if (autoResize) {
        setTimeout(() => handleAutoResize(), 0);
      }
    }, [currentValue, updateLineNumbers, autoResize, handleAutoResize]);
    const characterCount = getCharacterCount(currentValue);
    const isOverLimit = isOverCharacterLimit(currentValue, maxLength);
    const ariaAttributes = getAriaAttributes4({
      error: error || false,
      disabled: disabled || false,
      label,
      description,
      helperText,
      errorMessage,
      maxLength
    });
    return /* @__PURE__ */ React22.createElement(
      "div",
      {
        className,
        style: __spreadValues(__spreadValues({}, getTextAreaContainerStyles(width, height, disabled)), style)
      },
      label && /* @__PURE__ */ React22.createElement(
        "label",
        {
          htmlFor: id,
          style: getLabelStyles5(size, disabled || false, error || false, cssVars)
        },
        label
      ),
      description && /* @__PURE__ */ React22.createElement(
        "div",
        {
          id: "textarea-description",
          style: getDescriptionStyles5(size, disabled || false, cssVars)
        },
        description
      ),
      /* @__PURE__ */ React22.createElement("div", { style: getInputWrapperStyles() }, showLineNumbers && /* @__PURE__ */ React22.createElement("div", { style: getLineNumbersStyles(size, disabled || false, cssVars) }, lineNumbers), /* @__PURE__ */ React22.createElement(
        "textarea",
        __spreadValues(__spreadProps(__spreadValues({
          ref: textareaRef,
          id,
          value: currentValue,
          disabled,
          onChange: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onKeyDown: handleKeyDown6,
          onPaste: handlePasteEvent,
          style: getTextAreaInputStyles(
            color,
            customColor,
            variant,
            shape,
            size,
            resize,
            disabled || false,
            error || false,
            focused,
            minRows,
            maxRows,
            autoResize,
            showLineNumbers,
            animationsEnabled,
            cssVars
          )
        }, ariaAttributes), {
          name,
          required,
          readOnly,
          autoComplete,
          autoFocus,
          "data-testid": dataTestId
        }), rest)
      ), icon && /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: getIconStyles3(size, iconPosition, iconClickable, disabled || false, cssVars),
          onClick: handleIconClick
        },
        icon
      ), loading && /* @__PURE__ */ React22.createElement("div", { style: getLoadingOverlayStyles(cssVars) }, /* @__PURE__ */ React22.createElement("div", { style: {
        width: "20px",
        height: "20px",
        border: `2px solid ${cssVars.border}`,
        borderTop: `2px solid ${cssVars.primary}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      } }))),
      (helperText || errorMessage || showCharacterCount) && /* @__PURE__ */ React22.createElement("div", { style: getBottomSectionStyles() }, /* @__PURE__ */ React22.createElement("div", { style: { flex: 1 } }, (helperText || error && errorMessage) && /* @__PURE__ */ React22.createElement(
        "div",
        {
          id: error && errorMessage ? "textarea-error" : "textarea-helper",
          style: getHelperTextStyles2(size, disabled || false, error || false, cssVars)
        },
        error && errorMessage ? errorMessage : helperText
      )), showCharacterCount && /* @__PURE__ */ React22.createElement("div", { style: getCharacterCountStyles(size, disabled || false, isOverLimit, cssVars) }, formatCharacterCount(characterCount, maxLength))),
      /* @__PURE__ */ React22.createElement("style", { dangerouslySetInnerHTML: { __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        ` } })
    );
  }
);
TextArea.displayName = "TextArea";

// src/app/providers/ToastProvider.tsx
var ToastContext = createContext(void 0);
function useToast() {
  const context = useContext(ToastContext);
  if (context === void 0) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
var LoadingContext = createContext(void 0);
function useLoading() {
  const context = useContext(LoadingContext);
  if (context === void 0) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
createContext(void 0);
({
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone});
var SettingsContext = createContext(void 0);
function useSettings() {
  const context = useContext(SettingsContext);
  if (context === void 0) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
createContext(void 0);

// src/app/providers/useCSSVariables.ts
function useCSSVariables() {
  let themeVariables = {};
  let getCSSVariable = () => "";
  try {
    const themeContext = useTheme();
    themeVariables = themeContext.themeVariables;
    getCSSVariable = themeContext.getCSSVariable;
  } catch (error) {
    console.warn("useCSSVariables: Theme context not available, using fallback values");
  }
  const getVariable = (variable, fallback) => {
    try {
      const value = getCSSVariable(variable);
      return value || fallback || getDefaultValue(variable);
    } catch (e) {
      return fallback || getDefaultValue(variable);
    }
  };
  const getDefaultValue = (variable) => {
    const defaults = {
      // Base defaults
      "background": "#ffffff",
      "background-hover": "#f9fafb",
      "background-accent": "#f3f4f6",
      "background-disabled": "#f3f4f6",
      "foreground": "#000000",
      "foreground-hover": "#111827",
      "foreground-accent": "#6b7280",
      "foreground-disabled": "#9ca3af",
      // Primary defaults
      "primary": "#0066cc",
      "primary-background": "#eff6ff",
      "primary-foreground": "#ffffff",
      "primary-hover": "#0052a3",
      // Secondary defaults
      "secondary": "#6b7280",
      "secondary-background": "#f9fafb",
      "secondary-foreground": "#ffffff",
      "secondary-hover": "#4b5563",
      // Success defaults
      "success": "#10b981",
      "success-background": "#ecfdf5",
      "success-foreground": "#ffffff",
      // Warning defaults
      "warning": "#f59e0b",
      "warning-background": "#fffbeb",
      "warning-foreground": "#ffffff",
      // Destructive defaults
      "destructive": "#ef4444",
      "destructive-background": "#fef2f2",
      "destructive-foreground": "#ffffff",
      // Info defaults
      "info": "#3b82f6",
      "info-background": "#eff6ff",
      "info-foreground": "#ffffff",
      // Legacy defaults
      "muted": "#f3f4f6",
      "border": "#e5e7eb",
      "card": "#ffffff",
      "input": "#ffffff",
      "accent": "#0066cc",
      "error": "#ef4444"
    };
    return defaults[variable] || "#000000";
  };
  const createStyles = (styles) => {
    const result = {};
    for (const [property, variableName] of Object.entries(styles)) {
      result[property] = getVariable(variableName);
    }
    return result;
  };
  const getColorWithOpacity = (colorVariable, opacity) => {
    const color = getVariable(colorVariable);
    if (!color) return "";
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (color.startsWith("rgb")) {
      return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
    }
    return color;
  };
  return {
    // Base colors
    background: getVariable("background"),
    backgroundHover: getVariable("background-hover"),
    backgroundAccent: getVariable("background-accent"),
    backgroundShadow: getVariable("background-shadow"),
    backgroundDisabled: getVariable("background-disabled"),
    backgroundBorder: getVariable("background-border"),
    backgroundFont: getVariable("background-font"),
    foreground: getVariable("foreground"),
    foregroundHover: getVariable("foreground-hover"),
    foregroundAccent: getVariable("foreground-accent"),
    foregroundShadow: getVariable("foreground-shadow"),
    foregroundDisabled: getVariable("foreground-disabled"),
    foregroundBorder: getVariable("foreground-border"),
    foregroundFont: getVariable("foreground-font"),
    // Primary colors
    primary: getVariable("primary"),
    primaryBackground: getVariable("primary-background"),
    primaryForeground: getVariable("primary-foreground", "#ffffff"),
    primaryHover: getVariable("primary-hover"),
    primaryAccent: getVariable("primary-accent"),
    primaryShadow: getVariable("primary-shadow"),
    primaryDisabled: getVariable("primary-disabled"),
    primaryBorder: getVariable("primary-border"),
    primaryFont: getVariable("primary-font"),
    // Secondary colors
    secondary: getVariable("secondary"),
    secondaryBackground: getVariable("secondary-background"),
    secondaryForeground: getVariable("secondary-foreground"),
    secondaryHover: getVariable("secondary-hover"),
    secondaryAccent: getVariable("secondary-accent"),
    secondaryShadow: getVariable("secondary-shadow"),
    secondaryDisabled: getVariable("secondary-disabled"),
    secondaryBorder: getVariable("secondary-border"),
    secondaryFont: getVariable("secondary-font"),
    // Success colors
    success: getVariable("success"),
    successBackground: getVariable("success-background"),
    successForeground: getVariable("success-foreground"),
    successHover: getVariable("success-hover"),
    successAccent: getVariable("success-accent"),
    successShadow: getVariable("success-shadow"),
    successDisabled: getVariable("success-disabled"),
    successBorder: getVariable("success-border"),
    successFont: getVariable("success-font"),
    // Warning colors
    warning: getVariable("warning"),
    warningBackground: getVariable("warning-background"),
    warningForeground: getVariable("warning-foreground"),
    warningHover: getVariable("warning-hover"),
    warningAccent: getVariable("warning-accent"),
    warningShadow: getVariable("warning-shadow"),
    warningDisabled: getVariable("warning-disabled"),
    warningBorder: getVariable("warning-border"),
    warningFont: getVariable("warning-font"),
    // Destructive colors
    destructive: getVariable("destructive"),
    destructiveBackground: getVariable("destructive-background"),
    destructiveForeground: getVariable("destructive-foreground"),
    destructiveHover: getVariable("destructive-hover"),
    destructiveAccent: getVariable("destructive-accent"),
    destructiveShadow: getVariable("destructive-shadow"),
    destructiveDisabled: getVariable("destructive-disabled"),
    destructiveBorder: getVariable("destructive-border"),
    destructiveFont: getVariable("destructive-font"),
    // Info colors
    info: getVariable("info"),
    infoBackground: getVariable("info-background"),
    infoForeground: getVariable("info-foreground"),
    infoHover: getVariable("info-hover"),
    infoAccent: getVariable("info-accent"),
    infoShadow: getVariable("info-shadow"),
    infoDisabled: getVariable("info-disabled"),
    infoBorder: getVariable("info-border"),
    infoFont: getVariable("info-font"),
    // Legacy compatibility
    accent: getVariable("accent"),
    accentForeground: getVariable("accent-foreground"),
    border: getVariable("border"),
    borderHover: getVariable("border-hover"),
    muted: getVariable("muted"),
    mutedForeground: getVariable("muted-foreground"),
    error: getVariable("error"),
    errorForeground: getVariable("error-foreground"),
    card: getVariable("card"),
    cardForeground: getVariable("card-foreground"),
    input: getVariable("input"),
    inputBorder: getVariable("input-border"),
    inputPlaceholder: getVariable("input-placeholder"),
    inputForeground: getVariable("input-foreground"),
    shadowSm: getVariable("shadow-sm"),
    shadow: getVariable("shadow"),
    shadowMd: getVariable("shadow-md"),
    shadowLg: getVariable("shadow-lg"),
    progressTrack: getVariable("progress-track"),
    progressTrackText: getVariable("progress-track-text"),
    // Utility functions
    getVariable,
    getCSSVariable,
    createStyles,
    getColorWithOpacity,
    // Common color combinations
    surface: {
      primary: {
        backgroundColor: getVariable("primary"),
        color: getVariable("primary-foreground", "#ffffff"),
        borderColor: getVariable("primary-border"),
        boxShadow: getVariable("primary-shadow")
      },
      primaryBackground: {
        backgroundColor: getVariable("primary-background"),
        color: getVariable("primary"),
        borderColor: getVariable("primary-border")
      },
      secondary: {
        backgroundColor: getVariable("secondary"),
        color: getVariable("secondary-foreground"),
        borderColor: getVariable("secondary-border"),
        boxShadow: getVariable("secondary-shadow")
      },
      secondaryBackground: {
        backgroundColor: getVariable("secondary-background"),
        color: getVariable("secondary"),
        borderColor: getVariable("secondary-border")
      },
      success: {
        backgroundColor: getVariable("success"),
        color: getVariable("success-foreground"),
        borderColor: getVariable("success-border"),
        boxShadow: getVariable("success-shadow")
      },
      successBackground: {
        backgroundColor: getVariable("success-background"),
        color: getVariable("success"),
        borderColor: getVariable("success-border")
      },
      warning: {
        backgroundColor: getVariable("warning"),
        color: getVariable("warning-foreground"),
        borderColor: getVariable("warning-border"),
        boxShadow: getVariable("warning-shadow")
      },
      warningBackground: {
        backgroundColor: getVariable("warning-background"),
        color: getVariable("warning"),
        borderColor: getVariable("warning-border")
      },
      destructive: {
        backgroundColor: getVariable("destructive"),
        color: getVariable("destructive-foreground"),
        borderColor: getVariable("destructive-border"),
        boxShadow: getVariable("destructive-shadow")
      },
      destructiveBackground: {
        backgroundColor: getVariable("destructive-background"),
        color: getVariable("destructive"),
        borderColor: getVariable("destructive-border")
      },
      info: {
        backgroundColor: getVariable("info"),
        color: getVariable("info-foreground"),
        borderColor: getVariable("info-border"),
        boxShadow: getVariable("info-shadow")
      },
      infoBackground: {
        backgroundColor: getVariable("info-background"),
        color: getVariable("info"),
        borderColor: getVariable("info-border")
      },
      card: {
        backgroundColor: getVariable("card"),
        color: getVariable("card-foreground"),
        borderColor: getVariable("border")
      },
      background: {
        backgroundColor: getVariable("background"),
        color: getVariable("foreground"),
        borderColor: getVariable("background-border")
      },
      // Legacy compatibility
      error: {
        backgroundColor: getVariable("error"),
        color: getVariable("error-foreground")
      }
    },
    // Shadows
    shadows: {
      sm: getVariable("shadow-sm"),
      md: getVariable("shadow"),
      lg: getVariable("shadow-md"),
      xl: getVariable("shadow-lg")
    }
  };
}

// src/app/components/molecules/Navigation/Navigation.styles.ts
var getColorVariables19 = (color, customColor, cssVars) => {
  if (color === "custom" && customColor) {
    return {
      main: customColor,
      foreground: "#ffffff",
      background: customColor + "10",
      border: customColor,
      hover: customColor + "20",
      shadow: customColor + "40"
    };
  }
  const colorMap = {
    primary: {
      main: cssVars.primary,
      background: cssVars.primaryBackground,
      foreground: cssVars.primaryForeground,
      hover: cssVars.primaryHover,
      border: cssVars.primaryBorder,
      shadow: cssVars.primaryShadow
    },
    secondary: {
      main: cssVars.secondary,
      background: cssVars.secondaryBackground,
      foreground: cssVars.secondaryForeground,
      hover: cssVars.secondaryHover,
      border: cssVars.secondaryBorder,
      shadow: cssVars.secondaryShadow
    },
    success: {
      main: cssVars.success,
      background: cssVars.successBackground,
      foreground: cssVars.successForeground,
      hover: cssVars.successHover,
      border: cssVars.successBorder,
      shadow: cssVars.successShadow
    },
    warning: {
      main: cssVars.warning,
      background: cssVars.warningBackground,
      foreground: cssVars.warningForeground,
      hover: cssVars.warningHover,
      border: cssVars.warningBorder,
      shadow: cssVars.warningShadow
    },
    destructive: {
      main: cssVars.destructive,
      background: cssVars.destructiveBackground,
      foreground: cssVars.destructiveForeground,
      hover: cssVars.destructiveHover,
      border: cssVars.destructiveBorder,
      shadow: cssVars.destructiveShadow
    },
    info: {
      main: cssVars.info,
      background: cssVars.infoBackground,
      foreground: cssVars.infoForeground,
      hover: cssVars.infoHover,
      border: cssVars.infoBorder,
      shadow: cssVars.infoShadow
    }
  };
  return colorMap[color || "primary"] || colorMap.primary;
};
var getVariantStyles13 = (variant, color, customColor, cssVars) => {
  const colors = getColorVariables19(color, customColor, cssVars);
  switch (variant) {
    case "solid":
      return {
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        boxShadow: `0 2px 4px ${colors.shadow || "rgba(0, 0, 0, 0.1)"}`
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        borderColor: "transparent",
        boxShadow: "none"
      };
    case "outline":
      return {
        backgroundColor: cssVars.background,
        borderColor: colors.border,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        boxShadow: "none"
      };
    case "glassmorphic":
      const reflectionColor = colors.hover || colors.main || "#ffffff";
      const topReflectionGradient = `linear-gradient(135deg, transparent 0%, ${reflectionColor}20 20%, ${reflectionColor}15 25%, transparent 35%)`;
      const bottomReflectionGradient = `linear-gradient(135deg, transparent 45%, ${reflectionColor}25 55%, ${reflectionColor}20 65%, transparent 80%)`;
      return {
        background: `
          ${topReflectionGradient},
          ${bottomReflectionGradient},
          ${cssVars.background}CC
        `,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: `${cssVars.border}80`,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        boxShadow: `0 8px 32px 0 ${colors.shadow || "rgba(31, 38, 135, 0.37)"}`
      };
    case "elevated":
      return {
        backgroundColor: cssVars.card,
        borderColor: "transparent",
        boxShadow: cssVars.shadows.md
      };
    case "bordered":
      return {
        backgroundColor: cssVars.background,
        borderColor: cssVars.border,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        boxShadow: "none"
      };
    case "minimal":
      return {
        backgroundColor: "transparent",
        borderColor: "transparent",
        boxShadow: "none"
      };
    case "default":
    default:
      return {
        backgroundColor: cssVars.card,
        borderColor: cssVars.border,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        boxShadow: cssVars.shadows.sm
      };
  }
};
var getSizeStyles8 = (size) => {
  switch (size) {
    case "sm":
      return {
        height: "40px",
        // Reduced from 48px
        padding: "0 12px",
        fontSize: "14px",
        gap: "12px"
      };
    case "lg":
      return {
        height: "60px",
        // Reduced from 72px
        padding: "0 24px",
        fontSize: "16px",
        gap: "24px"
      };
    case "md":
    default:
      return {
        height: "48px",
        // Reduced from 60px
        padding: "0 16px",
        fontSize: "15px",
        gap: "16px"
      };
  }
};
var createNavigationStyles = (variant, color, customColor, size, sticky, cssVars) => {
  const variantStyles = getVariantStyles13(variant, color, customColor, cssVars);
  const sizeStyles = getSizeStyles8(size);
  return __spreadValues(__spreadValues({
    position: sticky ? "sticky" : "relative",
    top: sticky ? 0 : "auto",
    zIndex: sticky ? 100 : "auto",
    display: "flex",
    alignItems: "stretch",
    // Changed from 'end' to 'stretch' to fill full height
    width: "100%",
    transition: "all 0.2s ease-in-out"
  }, variantStyles), sizeStyles);
};
var createBrandStyles = (size, cssVars) => {
  const sizeStyles = getSizeStyles8("lg");
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    padding: "8px 12px",
    textDecoration: "none",
    color: cssVars.primary,
    fontSize: sizeStyles.fontSize,
    fontWeight: "600",
    height: "100%",
    minHeight: sizeStyles.height
  };
};
var createTabStyles = (isActive, size, color, customColor, cssVars) => {
  const sizeStyles = getSizeStyles8(size);
  const colors = getColorVariables19(color, customColor, cssVars);
  const baseStyles = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: `8px 12px 0 12px`,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textDecoration: "none",
    fontSize: sizeStyles.fontSize,
    fontWeight: isActive ? "600" : "500",
    color: isActive ? colors.main : cssVars.mutedForeground,
    backgroundColor: isActive ? `${colors.background}80` : "transparent",
    border: "none",
    outline: "none",
    overflow: "hidden",
    height: "100%",
    borderRadius: "8px 8px 0 0",
    minWidth: "140px",
    maxWidth: "160px",
    boxSizing: "border-box"
  };
  return baseStyles;
};
var createTabUnderlineStyles = (isActive, cssVars) => {
  return {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    width: isActive ? "100%" : "0%",
    backgroundColor: cssVars.primary,
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "1px 1px 0 0"
  };
};
var createTabHoverStyles = (color, customColor, cssVars) => {
  const colors = getColorVariables19(color, customColor, cssVars);
  return {
    backgroundColor: `${colors.hover || colors.background}40`,
    color: colors.main
  };
};
var createContentAreaStyles = () => {
  return {
    display: "flex",
    alignItems: "center",
    // Center align for leading/trailing content
    gap: "8px",
    height: "100%"
  };
};
var createTabsContainerStyles = () => {
  return {
    display: "flex",
    alignItems: "flex-end",
    // Bottom align for tabs specifically
    height: "calc(100% - 8px)",
    // Reduce height by 4px to create top gap
    marginTop: "8px",
    // Add 4px margin at the top
    gap: "0"
  };
};
var createContainerStyles2 = (fullWidth, maxWidth) => {
  return {
    width: "100%",
    maxWidth: fullWidth ? "100%" : maxWidth || "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "stretch",
    // Changed from 'center' to 'stretch' to fill full height
    height: "100%"
    // Ensure container takes full height
  };
};

// src/app/components/molecules/Navigation/Navigation.tsx
var NavigationBrand = forwardRef(
  ({ icon, appName, onClick, size }, ref) => {
    const cssVars = useCSSVariables();
    const brandStyles = createBrandStyles(size, cssVars);
    if (!icon && !appName) return null;
    return /* @__PURE__ */ React22.createElement(
      "div",
      {
        ref,
        style: brandStyles,
        onClick,
        role: onClick ? "button" : void 0,
        tabIndex: onClick ? 0 : void 0,
        onKeyDown: onClick ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        } : void 0
      },
      icon && /* @__PURE__ */ React22.createElement("div", { style: { display: "flex", alignItems: "center", height: "100%" } }, icon),
      appName && /* @__PURE__ */ React22.createElement("span", { style: {
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        height: "100%"
      } }, appName)
    );
  }
);
NavigationBrand.displayName = "NavigationBrand";
var NavigationTab = forwardRef(
  ({ tab, isActive, onSelect, size, color = "primary", customColor }, ref) => {
    const cssVars = useCSSVariables();
    const [isHovered, setIsHovered] = useState(false);
    const tabStyles = createTabStyles(isActive, size, color, customColor, cssVars);
    const underlineStyles = createTabUnderlineStyles(isActive, cssVars);
    const hoverStyles = isHovered && !isActive ? createTabHoverStyles(color, customColor, cssVars) : {};
    const hoverUnderlineStyles = isHovered && !isActive ? { width: "100%", opacity: 0.3 } : {};
    const handleClick = () => {
      if (!tab.disabled) {
        if (tab.onClick) {
          tab.onClick();
        }
        onSelect(tab.id);
      }
    };
    const handleKeyDown6 = (e) => {
      if ((e.key === "Enter" || e.key === " ") && !tab.disabled) {
        e.preventDefault();
        handleClick();
      }
    };
    const handleMouseEnter = (e) => {
      if (e.currentTarget === e.target || e.currentTarget.contains(e.target)) {
        setIsHovered(true);
      }
    };
    const handleMouseLeave = (e) => {
      if (e.currentTarget === e.target || !e.currentTarget.contains(e.relatedTarget)) {
        setIsHovered(false);
      }
    };
    return /* @__PURE__ */ React22.createElement(
      "button",
      {
        ref,
        style: __spreadProps(__spreadValues(__spreadValues({}, tabStyles), hoverStyles), {
          opacity: tab.disabled ? 0.5 : 1,
          cursor: tab.disabled ? "not-allowed" : "pointer"
        }),
        onClick: handleClick,
        onKeyDown: handleKeyDown6,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        disabled: tab.disabled,
        "aria-selected": isActive,
        role: "tab"
      },
      tab.icon && /* @__PURE__ */ React22.createElement("div", { style: { display: "flex", alignItems: "center" } }, tab.icon),
      /* @__PURE__ */ React22.createElement("div", { style: {
        width: "120px",
        // Increased from 80px to 120px for wider text area
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden"
      } }, /* @__PURE__ */ React22.createElement("span", { style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%"
      } }, tab.label)),
      tab.badge && /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: {
            backgroundColor: cssVars.primary,
            color: cssVars.primaryForeground,
            borderRadius: "10px",
            padding: "2px 6px",
            fontSize: "11px",
            fontWeight: "600",
            minWidth: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        },
        tab.badge
      ),
      /* @__PURE__ */ React22.createElement("div", { style: underlineStyles }),
      !isActive && /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: __spreadProps(__spreadValues(__spreadValues({}, underlineStyles), hoverUnderlineStyles), {
            backgroundColor: cssVars.getColorWithOpacity("primary", 0.3)
          })
        }
      )
    );
  }
);
NavigationTab.displayName = "NavigationTab";
var Navigation = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      icon,
      appName,
      onBrandClick,
      tabs = [],
      activeTab,
      onTabChange,
      leadingContent,
      trailingContent,
      variant = "default",
      color = "primary",
      customColor,
      size = "md",
      sticky = false,
      fullWidth = false,
      maxWidth,
      className,
      style
    } = _b, props = __objRest(_b, [
      "icon",
      "appName",
      "onBrandClick",
      "tabs",
      "activeTab",
      "onTabChange",
      "leadingContent",
      "trailingContent",
      "variant",
      "color",
      "customColor",
      "size",
      "sticky",
      "fullWidth",
      "maxWidth",
      "className",
      "style"
    ]);
    const cssVars = useCSSVariables();
    const navigationStyles = createNavigationStyles(variant, color, customColor, size, sticky, cssVars);
    const containerStyles = createContainerStyles2(fullWidth, maxWidth);
    const contentAreaStyles = createContentAreaStyles();
    const handleTabSelect = (tabId) => {
      if (onTabChange) {
        onTabChange(tabId);
      }
    };
    return /* @__PURE__ */ React22.createElement(
      "nav",
      __spreadValues({
        ref,
        className,
        style: __spreadValues(__spreadValues({}, navigationStyles), style),
        role: "navigation"
      }, props),
      /* @__PURE__ */ React22.createElement("div", { style: containerStyles }, /* @__PURE__ */ React22.createElement("div", { style: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      } }, /* @__PURE__ */ React22.createElement(
        NavigationBrand,
        {
          icon,
          appName,
          onClick: onBrandClick,
          size
        }
      )), /* @__PURE__ */ React22.createElement("div", { style: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px"
      } }, leadingContent && /* @__PURE__ */ React22.createElement("div", { style: contentAreaStyles }, leadingContent), tabs.length > 0 && /* @__PURE__ */ React22.createElement(
        "div",
        {
          style: __spreadValues({}, createTabsContainerStyles()),
          role: "tablist"
        },
        tabs.map((tab, index) => /* @__PURE__ */ React22.createElement(React22.Fragment, { key: tab.id }, /* @__PURE__ */ React22.createElement(
          NavigationTab,
          {
            tab,
            isActive: activeTab === tab.id,
            onSelect: handleTabSelect,
            size,
            color,
            customColor
          }
        ), index < tabs.length - 1 && /* @__PURE__ */ React22.createElement(
          Divider,
          {
            orientation: "vertical",
            variant: "outline",
            rounded: true,
            size: "sm",
            spacing: "xs",
            style: {
              height: "60%",
              // Adjust height relative to tab height
              alignSelf: "center"
              // Center the divider vertically
            }
          }
        )))
      )), /* @__PURE__ */ React22.createElement("div", { style: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      } }, trailingContent && /* @__PURE__ */ React22.createElement("div", { style: contentAreaStyles }, trailingContent)))
    );
  }
);
Navigation.displayName = "Navigation";

// src/app/components/molecules/CollapsibleMenu/CollapsibleMenu.styles.ts
var getSizeConfig9 = (size) => {
  const configs = {
    xs: {
      toggleSize: "32px",
      toggleIconSize: "12px",
      padding: "8px",
      fontSize: "12px"
    },
    sm: {
      toggleSize: "36px",
      toggleIconSize: "14px",
      padding: "12px",
      fontSize: "14px"
    },
    md: {
      toggleSize: "40px",
      toggleIconSize: "16px",
      padding: "16px",
      fontSize: "16px"
    },
    lg: {
      toggleSize: "44px",
      toggleIconSize: "18px",
      padding: "20px",
      fontSize: "18px"
    },
    xl: {
      toggleSize: "48px",
      toggleIconSize: "20px",
      padding: "24px",
      fontSize: "20px"
    }
  };
  return configs[size];
};
var getCollapsibleMenuContainerStyles = (position, collapsed, expandedWidth, collapsedWidth, overlay, zIndex, animationDuration, disabled, cssVars) => {
  const width = collapsed ? typeof collapsedWidth === "number" ? `${collapsedWidth}px` : collapsedWidth : typeof expandedWidth === "number" ? `${expandedWidth}px` : expandedWidth;
  const baseStyles = {
    position: overlay ? "fixed" : "relative",
    top: overlay ? "0" : "auto",
    [position]: overlay ? "0" : "auto",
    width,
    height: overlay ? "100vh" : "100%",
    backgroundColor: cssVars.background,
    borderRight: position === "left" ? `1px solid ${cssVars.border}` : "none",
    borderLeft: position === "right" ? `1px solid ${cssVars.border}` : "none",
    transition: `width ${animationDuration}ms var(--animation-spring), transform ${animationDuration}ms var(--animation-spring)`,
    zIndex,
    display: "flex",
    flexDirection: "column",
    overflow: "visible",
    // Must be visible for isometric shadow
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? "none" : "auto"
  };
  if (overlay) {
    baseStyles.boxShadow = position === "left" ? "2px 0 8px rgba(0, 0, 0, 0.1)" : "-2px 0 8px rgba(0, 0, 0, 0.1)";
  }
  return baseStyles;
};
var getContentStyles2 = (size, collapsed, cssVars) => {
  const sizeConfig = getSizeConfig9(size);
  return {
    flex: 1,
    padding: collapsed ? `${sizeConfig.padding} 8px` : sizeConfig.padding,
    // Removed overflow properties - let the Scrollbar component handle scrolling
    transition: "padding 200ms var(--animation-spring)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };
};
var getToggleStyles = (position, size, color, customColor, shape, collapsed, disabled, animationDuration, cssVars) => {
  const baseStyles = {
    position: "absolute",
    top: "16px",
    [position === "left" ? "right" : "left"]: "-20px",
    zIndex: 2
  };
  return baseStyles;
};
var getToggleIconStyles = (position, collapsed, animationDuration) => {
  const rotation = (() => {
    if (position === "left") {
      return collapsed ? "180deg" : "0deg";
    } else {
      return collapsed ? "0deg" : "180deg";
    }
  })();
  return {
    transform: `rotate(${rotation})`,
    transition: `transform ${animationDuration}ms var(--animation-spring)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
};

// src/app/components/molecules/CollapsibleMenu/CollapsibleMenu.tsx
var CollapsibleMenu = forwardRef((props, ref) => {
  var _a;
  const {
    collapsed: controlledCollapsed,
    defaultCollapsed = false,
    onToggle,
    position = "left",
    expandedWidth = "250px",
    collapsedWidth = "20px",
    children,
    toggleContent,
    showToggle = true,
    toggleStyle,
    zIndex = 1e3,
    overlay = false,
    animationDuration = 300,
    color = "primary",
    customColor,
    size = "md",
    shape = "default",
    disabled = false,
    animate = true,
    className,
    style,
    id: providedId
  } = props;
  const cssVars = useCSSVariables();
  const { settings } = useSettings();
  const animationsEnabled = ((_a = settings.appearance.animations) != null ? _a : true) && animate;
  const generatedId = useId();
  const id = providedId || generatedId;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = controlledCollapsed !== void 0;
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;
  const containerRef = useRef(null);
  useRef(null);
  const handleToggle = useCallback(() => {
    if (disabled) return;
    const newCollapsed = !isCollapsed;
    if (!isControlled) {
      setInternalCollapsed(newCollapsed);
    }
    onToggle == null ? void 0 : onToggle(newCollapsed);
  }, [disabled, isCollapsed, isControlled, onToggle]);
  const handleExpand = useCallback(() => {
    if (disabled) return;
    if (!isControlled) {
      setInternalCollapsed(false);
    }
    if (isCollapsed) {
      onToggle == null ? void 0 : onToggle(false);
    }
  }, [disabled, isCollapsed, isControlled, onToggle]);
  const handleCollapse = useCallback(() => {
    if (disabled) return;
    if (!isControlled) {
      setInternalCollapsed(true);
    }
    if (!isCollapsed) {
      onToggle == null ? void 0 : onToggle(true);
    }
  }, [disabled, isCollapsed, isControlled, onToggle]);
  useImperativeHandle(ref, () => ({
    toggle: handleToggle,
    expand: handleExpand,
    collapse: handleCollapse,
    isCollapsed: () => isCollapsed
  }));
  const handleToggleClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    handleToggle();
  }, [handleToggle]);
  const handleToggleKeyDown = useCallback((event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);
  const effectiveAnimationDuration = animationsEnabled ? animationDuration : 0;
  const containerStyles = getCollapsibleMenuContainerStyles(
    position,
    isCollapsed,
    expandedWidth,
    collapsedWidth,
    overlay,
    zIndex,
    effectiveAnimationDuration,
    disabled,
    cssVars
  );
  getContentStyles2(size, isCollapsed);
  const toggleStyles = getToggleStyles(
    position);
  const toggleIconStyles = getToggleIconStyles(
    position,
    isCollapsed,
    effectiveAnimationDuration
  );
  const renderToggle = () => {
    if (!showToggle) return null;
    const iconName = position === "right" ? "NavArrowRight" : "NavArrowLeft";
    return /* @__PURE__ */ React22.createElement("div", { style: toggleStyles }, /* @__PURE__ */ React22.createElement(
      Button,
      {
        variant: "solid",
        color,
        size,
        shape: "pill",
        animationMode: "isometric",
        style: toggleStyle,
        onClick: handleToggleClick,
        onKeyDown: handleToggleKeyDown,
        disabled,
        "aria-label": `${isCollapsed ? "Expand" : "Collapse"} menu`,
        "aria-expanded": !isCollapsed,
        icon: toggleContent || /* @__PURE__ */ React22.createElement("div", { style: toggleIconStyles }, /* @__PURE__ */ React22.createElement(
          Icon,
          {
            name: iconName,
            size
          }
        ))
      }
    ));
  };
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      ref: containerRef,
      id,
      className,
      style: __spreadValues(__spreadValues({}, containerStyles), style),
      role: "complementary",
      "aria-label": "Collapsible menu",
      "data-collapsed": isCollapsed,
      "data-position": position
    },
    renderToggle(),
    /* @__PURE__ */ React22.createElement(
      Scrollbar,
      {
        variant: "ghost",
        color: "secondary",
        customColor,
        size,
        shape: "round",
        orientation: "vertical",
        visibility: "always",
        smoothScrolling: true,
        showIndicators: true,
        disabled,
        animate,
        height: "100%",
        style: {
          flex: 1,
          height: "100%",
          minHeight: 0,
          // Important for flex children
          opacity: isCollapsed ? 0.3 : 1,
          transition: `opacity ${effectiveAnimationDuration}ms var(--animation-smooth)`
        }
      },
      children
    )
  );
});
CollapsibleMenu.displayName = "CollapsibleMenu";

// src/app/components/molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.styles.ts
var createContainerStyles3 = (size, layout, cssVars) => ({
  display: "flex",
  flexDirection: layout === "vertical" ? "column" : "row",
  gap: size === "sm" ? "16px" : size === "md" ? "20px" : size === "lg" ? "24px" : "32px",
  width: "100%",
  maxWidth: size === "sm" ? "800px" : size === "md" ? "1000px" : size === "lg" ? "1200px" : "1400px",
  margin: "0 auto",
  backgroundColor: cssVars.card,
  borderRadius: "12px",
  border: `1px solid ${cssVars.border}`,
  overflow: "visible"
});
var createDisplayAreaStyles = (padded, background, cssVars, displayStyle) => __spreadValues({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: padded ? "32px" : "0",
  backgroundColor: getBackgroundPattern(background, cssVars),
  backgroundImage: getBackgroundImage(background, cssVars),
  backgroundSize: background === "dots" ? "20px 20px" : background === "grid" ? "20px 20px" : "none",
  backgroundRepeat: background !== "none" && background !== "subtle" ? "repeat" : "no-repeat",
  position: "relative",
  minHeight: "200px",
  overflow: "visible"
}, displayStyle);
var getControlGroupStyles = (cssVars) => ({
  marginBottom: "20px"
});
var getControlGroupTitleStyles = (cssVars) => ({
  fontSize: "14px",
  fontWeight: "600",
  color: cssVars.foreground,
  marginBottom: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
});
var getControlItemStyles = () => ({
  marginBottom: "12px"
});
var getControlLabelStyles = (cssVars) => ({
  display: "block",
  fontSize: "12px",
  fontWeight: "500",
  color: cssVars.foregroundAccent,
  marginBottom: "4px",
  textTransform: "capitalize"
});
var getBackgroundPattern = (background, cssVars) => {
  switch (background) {
    case "subtle":
      return cssVars.backgroundAccent;
    case "dots":
    case "grid":
      return cssVars.background;
    default:
      return cssVars.background;
  }
};
var getBackgroundImage = (background, cssVars) => {
  switch (background) {
    case "dots":
      return `radial-gradient(circle, ${cssVars.border} 1px, transparent 1px)`;
    case "grid":
      return `
        linear-gradient(to right, ${cssVars.border} 1px, transparent 1px),
        linear-gradient(to bottom, ${cssVars.border} 1px, transparent 1px)
      `;
    default:
      return "none";
  }
};
var generateCodeString = (componentName, props, children, initialProps) => {
  const propStrings = Object.entries(props).filter(([key, value]) => {
    if (key === "children") {
      return false;
    }
    if (value === void 0 || value === null || value === "") {
      return false;
    }
    if (typeof value === "boolean" && value === false) {
      return false;
    }
    if (key.startsWith("_")) {
      return false;
    }
    const alwaysShowProps = ["header", "footer", "children", "searchable"];
    if (initialProps && initialProps[key] === value && !alwaysShowProps.includes(key)) {
      return false;
    }
    return true;
  }).map(([key, value]) => {
    var _a, _b;
    if (typeof value === "boolean") {
      return key;
    }
    if (typeof value === "string") {
      return `${key}="${value}"`;
    }
    if (typeof value === "number") {
      return `${key}={${value}}`;
    }
    if (Array.isArray(value)) {
      return `${key}={${JSON.stringify(value)}}`;
    }
    if (typeof value === "object") {
      if (React22.isValidElement(value)) {
        const componentName2 = typeof value.type === "string" ? value.type : ((_a = value.type) == null ? void 0 : _a.displayName) || ((_b = value.type) == null ? void 0 : _b.name) || "Component";
        const componentProps = value.props || {};
        if (componentName2 === "Icon" && componentProps.name && Object.keys(componentProps).length === 1) {
          return `${key}={<Icon name="${componentProps.name}" />}`;
        }
        const propStrings2 = Object.entries(componentProps).filter(([propKey]) => propKey !== "children").map(([propKey, propValue]) => {
          if (typeof propValue === "string") {
            return `${propKey}="${propValue}"`;
          }
          return `${propKey}={${JSON.stringify(propValue)}}`;
        });
        const hasChildren2 = componentProps.children;
        if (hasChildren2) {
          return `${key}={<${componentName2}${propStrings2.length ? " " + propStrings2.join(" ") : ""}>${componentProps.children}</${componentName2}>}`;
        } else {
          return `${key}={<${componentName2}${propStrings2.length ? " " + propStrings2.join(" ") : ""} />}`;
        }
      }
      return `${key}={${JSON.stringify(value)}}`;
    }
    return `${key}={${JSON.stringify(value)}}`;
  });
  const hasChildren = children && React22.Children.count(children) > 0;
  const formatChildren = (children2) => {
    if (typeof children2 === "string") {
      return children2.trim() || "{/* children */}";
    }
    if (typeof children2 === "number") {
      return children2.toString();
    }
    if (React22.isValidElement(children2)) {
      return "{/* JSX element */}";
    }
    return "{/* children */}";
  };
  if (propStrings.length === 0) {
    return hasChildren ? `<${componentName}>
  ${formatChildren(children)}
</${componentName}>` : `<${componentName} />`;
  }
  const propsString = propStrings.join("\n  ");
  if (hasChildren) {
    return `<${componentName}
  ${propsString}
>
  ${formatChildren(children)}
</${componentName}>`;
  }
  return propStrings.length === 1 ? `<${componentName} ${propStrings[0]} />` : `<${componentName}
  ${propsString}
/>`;
};
var getComponentName = (element) => {
  if (typeof element.type === "string") {
    return element.type;
  }
  if (typeof element.type === "object" && element.type !== null) {
    const type = element.type;
    if (type.render) {
      return type.render.displayName || type.render.name || type.displayName || type.name || "Component";
    }
    return type.displayName || type.name || "Component";
  }
  if (typeof element.type === "function") {
    return element.type.displayName || element.type.name || "Component";
  }
  return "Component";
};
var cloneElementWithProps = (element, newProps) => {
  const configProps = ["itemCount", "item1", "item2", "item3", "item4", "item5"];
  const filteredProps = Object.entries(newProps).reduce((acc, [key, value]) => {
    if (!key.startsWith("_") && !configProps.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
  return React22.cloneElement(element, filteredProps);
};
var getInitialPropsFromControls = (leftControls, rightControls, initialProps) => {
  const props = __spreadValues({}, initialProps);
  const allControls = [
    ...(leftControls || []).flatMap((group) => group.controls),
    ...(rightControls || []).flatMap((group) => group.controls)
  ];
  allControls.forEach((control) => {
    if (props[control.key] === void 0 && control.defaultValue !== void 0) {
      props[control.key] = control.defaultValue;
    }
  });
  return props;
};
var validatePropValue = (control, value) => {
  switch (control.type) {
    case "checkbox":
      return Boolean(value);
    case "number":
      const numValue = Number(value);
      if (isNaN(numValue)) return control.defaultValue || 0;
      if (control.min !== void 0 && numValue < control.min) {
        return control.min;
      }
      if (control.max !== void 0 && numValue > control.max) {
        return control.max;
      }
      return numValue;
    case "select":
      if (control.options) {
        const validOption = control.options.find((opt) => opt.value === value);
        return validOption ? value : control.defaultValue;
      }
      return value;
    case "text":
    case "color":
    default:
      return value;
  }
};
var generateControlId = (controlKey, groupTitle) => {
  return `${groupTitle.toLowerCase().replace(/\s+/g, "-")}-${controlKey}`;
};
var createUniversalControls = () => ({
  appearance: {
    title: "Appearance",
    controls: [
      {
        key: "color",
        label: "Color",
        type: "select",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Success", value: "success" },
          { label: "Warning", value: "warning" },
          { label: "Destructive", value: "destructive" },
          { label: "Info", value: "info" }
        ],
        defaultValue: "primary"
      },
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Outline", value: "outline" },
          { label: "Ghost", value: "ghost" }
        ],
        defaultValue: "solid"
      },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { label: "XS", value: "xs" },
          { label: "SM", value: "sm" },
          { label: "MD", value: "md" },
          { label: "LG", value: "lg" },
          { label: "XL", value: "xl" }
        ],
        defaultValue: "md"
      },
      {
        key: "shape",
        label: "Shape",
        type: "select",
        options: [
          { label: "Sharp", value: "sharp" },
          { label: "Round", value: "round" },
          { label: "Pill", value: "pill" }
        ],
        defaultValue: "round"
      }
    ]
  },
  state: {
    title: "State",
    controls: [
      {
        key: "disabled",
        label: "Disabled",
        type: "checkbox",
        defaultValue: false
      },
      {
        key: "loading",
        label: "Loading",
        type: "checkbox",
        defaultValue: false
      }
    ]
  }
});

// src/app/components/molecules/InteractiveComponentDisplay/InteractiveComponentDisplay.tsx
var InteractiveComponentDisplay = forwardRef((props, ref) => {
  const _a = props, {
    children,
    leftControls = [],
    rightControls = [],
    initialProps = {},
    onPropsChange,
    title,
    description,
    showCode = true,
    showControls = true,
    displayStyle,
    displayClassName,
    padded = true,
    background = "none",
    size = "lg",
    layout = "horizontal"
  } = _a, restProps = __objRest(_a, [
    "children",
    "leftControls",
    "rightControls",
    "initialProps",
    "onPropsChange",
    "title",
    "description",
    "showCode",
    "showControls",
    "displayStyle",
    "displayClassName",
    "padded",
    "background",
    "size",
    "layout"
  ]);
  const cssVars = useCSSVariables();
  const [componentProps, setComponentProps] = useState(
    () => getInitialPropsFromControls(leftControls, rightControls, initialProps)
  );
  const handlePropChange = useCallback((key, value, control) => {
    const validatedValue = validatePropValue(control, value);
    setComponentProps((prev) => {
      const newProps = __spreadProps(__spreadValues({}, prev), { [key]: validatedValue });
      setTimeout(() => {
        onPropsChange == null ? void 0 : onPropsChange(newProps);
      }, 0);
      return newProps;
    });
  }, [onPropsChange]);
  useImperativeHandle(ref, () => ({
    getProps: () => componentProps,
    setProps: (newProps) => {
      setComponentProps(newProps);
      onPropsChange == null ? void 0 : onPropsChange(newProps);
    },
    resetProps: () => {
      const initialPropsFromControls = getInitialPropsFromControls(leftControls, rightControls, initialProps);
      setComponentProps(initialPropsFromControls);
      onPropsChange == null ? void 0 : onPropsChange(initialPropsFromControls);
    }
  }), [componentProps, leftControls, rightControls, initialProps, onPropsChange]);
  const renderControlInput = (control, groupTitle) => {
    const controlId = generateControlId(control.key, groupTitle);
    const currentValue = componentProps[control.key];
    if (control.key === "customColor") {
      return null;
    }
    switch (control.type) {
      case "select":
        const isAnimationModeDisabled = control.key === "animationMode" && !componentProps.animate;
        return /* @__PURE__ */ React22.createElement(
          Dropdown,
          {
            options: control.options || [],
            value: currentValue,
            onChange: (value) => handlePropChange(control.key, value, control),
            size: "sm",
            color: "primary",
            disabled: isAnimationModeDisabled
          }
        );
      case "checkbox":
        return /* @__PURE__ */ React22.createElement(
          CheckBox,
          {
            id: controlId,
            checked: Boolean(currentValue),
            onChange: (checked) => handlePropChange(control.key, checked, control),
            label: control.label,
            size: "sm",
            color: "primary",
            contentToggleable: true
          }
        );
      case "number":
        return /* @__PURE__ */ React22.createElement(
          TextArea,
          {
            id: controlId,
            value: currentValue ? String(currentValue) : "",
            onChange: (valueOrEvent) => {
              var _a2, _b;
              const value = (_b = (_a2 = valueOrEvent == null ? void 0 : valueOrEvent.target) == null ? void 0 : _a2.value) != null ? _b : valueOrEvent;
              const numValue = value === "" ? "" : Number(value);
              handlePropChange(control.key, numValue, control);
            },
            placeholder: `Enter ${control.label.toLowerCase()}...`,
            size: "sm",
            color: "primary",
            variant: "outline",
            maxRows: 1,
            minRows: 1,
            autoResize: false
          }
        );
      case "text":
      default:
        return /* @__PURE__ */ React22.createElement(
          TextArea,
          {
            id: controlId,
            value: currentValue || "",
            onChange: (valueOrEvent) => {
              var _a2, _b;
              const value = (_b = (_a2 = valueOrEvent == null ? void 0 : valueOrEvent.target) == null ? void 0 : _a2.value) != null ? _b : valueOrEvent;
              handlePropChange(control.key, value, control);
            },
            placeholder: `Enter ${control.label.toLowerCase()}...`,
            size: "sm",
            color: "primary",
            variant: "outline",
            autoResize: true,
            maxRows: 3
          }
        );
    }
  };
  const renderControlGroup = (group, groupTitle) => {
    const filteredControls = group.controls.filter((control) => control.key !== "customColor");
    if (filteredControls.length === 0) return null;
    return /* @__PURE__ */ React22.createElement("div", { key: groupTitle, style: getControlGroupStyles() }, /* @__PURE__ */ React22.createElement("h4", { style: getControlGroupTitleStyles(cssVars) }, group.title), filteredControls.map((control) => {
      const controlInput = renderControlInput(control, groupTitle);
      if (!controlInput) return null;
      return /* @__PURE__ */ React22.createElement("div", { key: control.key, style: getControlItemStyles() }, control.type !== "checkbox" && /* @__PURE__ */ React22.createElement(
        "label",
        {
          htmlFor: generateControlId(control.key, groupTitle),
          style: getControlLabelStyles(cssVars)
        },
        control.label
      ), controlInput);
    }));
  };
  const renderControlPanel = (controls, side) => {
    if (!showControls || controls.length === 0) return null;
    return /* @__PURE__ */ React22.createElement(React22.Fragment, null, controls.map((group) => renderControlGroup(group, group.title)));
  };
  const renderProps = __spreadValues({}, componentProps);
  if (!componentProps.animate && renderProps.animationMode) {
    renderProps.animationMode = "none";
  }
  if (renderProps.icon === false) {
    renderProps.icon = void 0;
  } else if (renderProps.icon === true && initialProps._defaultIcon) {
    renderProps.icon = initialProps._defaultIcon;
  }
  if (initialProps._actionsComputed && renderProps.hasActions) {
    const actions = [];
    if (renderProps.actionLabel1) {
      actions.push({
        label: renderProps.actionLabel1,
        onClick: () => console.log(`${renderProps.actionLabel1} clicked`),
        variant: "solid"
      });
    }
    if (renderProps.actionLabel2) {
      actions.push({
        label: renderProps.actionLabel2,
        onClick: () => console.log(`${renderProps.actionLabel2} clicked`),
        variant: "outline"
      });
    }
    renderProps.actions = actions.length > 0 ? actions : void 0;
  } else if (initialProps._actionsComputed && !renderProps.hasActions) {
    renderProps.actions = void 0;
  }
  if (initialProps._itemsComputed) {
    const items = [];
    const itemCount = renderProps.itemCount || 3;
    for (let i = 1; i <= itemCount; i++) {
      const itemKey = `item${i}`;
      items.push(renderProps[itemKey] || `Option ${i}`);
    }
    renderProps.items = items;
  }
  const interactiveProps = __spreadValues({}, renderProps);
  if (children && React22.isValidElement(children)) {
    const componentName = getComponentName(children);
    const hasCheckedProp = "checked" in renderProps;
    if (componentName === "CheckBox" || hasCheckedProp) {
      interactiveProps.onChange = (checked) => {
        setComponentProps((prev) => __spreadProps(__spreadValues({}, prev), { checked }));
        if (renderProps.onChange) {
          renderProps.onChange(checked);
        }
      };
    }
    if (componentName === "SegmentedControl") {
      interactiveProps.onChange = (selectedIndex, selectedItem) => {
        setComponentProps((prev) => __spreadProps(__spreadValues({}, prev), { selectedIndex }));
        if (renderProps.onChange) {
          renderProps.onChange(selectedIndex, selectedItem);
        }
      };
    }
    if (componentName === "Slider") {
      interactiveProps.onChange = (value) => {
        setComponentProps((prev) => __spreadProps(__spreadValues({}, prev), { value }));
        if (renderProps.onChange) {
          renderProps.onChange(value);
        }
      };
    }
    if (componentName === "TextArea") {
      interactiveProps.onChange = (event) => {
        const value = event.target.value;
        setComponentProps((prev) => __spreadProps(__spreadValues({}, prev), { value }));
        if (renderProps.onChange) {
          renderProps.onChange(event);
        }
      };
    }
  }
  const enhancedElement = cloneElementWithProps(children, interactiveProps);
  const containerStyles = createContainerStyles3(size, layout, cssVars);
  const displayAreaStyles = createDisplayAreaStyles(padded, background, cssVars, displayStyle);
  return /* @__PURE__ */ React22.createElement("div", __spreadValues({ style: __spreadProps(__spreadValues({}, containerStyles), {
    display: "flex",
    flexDirection: "row",
    gap: "0",
    minHeight: "400px",
    // Ensure minimum height
    height: "auto"
  }) }, restProps), /* @__PURE__ */ React22.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "240px",
    flexShrink: 0,
    backgroundColor: cssVars.backgroundAccent,
    padding: "16px",
    borderRight: `1px solid ${cssVars.border}`,
    minHeight: "100%",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px"
  } }, renderControlPanel(leftControls)), /* @__PURE__ */ React22.createElement("div", { style: __spreadProps(__spreadValues({}, displayAreaStyles), {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    maxWidth: "718px",
    overflow: "hidden",
    backgroundColor: cssVars.background
  }), className: displayClassName }, enhancedElement), /* @__PURE__ */ React22.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "240px",
    flexShrink: 0,
    backgroundColor: cssVars.backgroundAccent,
    padding: "16px",
    borderLeft: `1px solid ${cssVars.border}`,
    minHeight: "100%",
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px"
  } }, renderControlPanel(rightControls)));
});
InteractiveComponentDisplay.displayName = "InteractiveComponentDisplay";
function ReadmeDisplay({ content, loading = false, className, style }) {
  const cssVars = useCSSVariables();
  const splitTableCells = (line) => {
    const cells = [];
    let currentCell = "";
    let inBackticks = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === "`") {
        inBackticks = !inBackticks;
        currentCell += char;
      } else if (char === "|" && !inBackticks) {
        cells.push(currentCell.trim());
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
    if (currentCell) {
      cells.push(currentCell.trim());
    }
    return cells.filter((cell) => cell !== "");
  };
  const parseInlineText = (text) => {
    const parts = [];
    let currentIndex = 0;
    let partIndex = 0;
    const combinedRegex = /(\*\*(.*?)\*\*|\*([^*]+?)\*|`([^`]+)`)/g;
    text.replace(combinedRegex, (match2, fullMatch, bold, italic, code, offset) => {
      if (offset > currentIndex) {
        parts.push(text.slice(currentIndex, offset));
      }
      if (bold !== void 0) {
        parts.push(
          /* @__PURE__ */ React22.createElement(
            "strong",
            {
              key: `bold-${partIndex++}`,
              style: {
                color: cssVars.primary,
                fontWeight: "600"
              }
            },
            bold
          )
        );
      } else if (italic !== void 0) {
        parts.push(
          /* @__PURE__ */ React22.createElement(
            "em",
            {
              key: `italic-${partIndex++}`,
              style: {
                color: cssVars.primary,
                fontStyle: "italic"
              }
            },
            italic
          )
        );
      } else if (code !== void 0) {
        parts.push(
          /* @__PURE__ */ React22.createElement(
            "code",
            {
              key: `code-${partIndex++}`,
              style: {
                backgroundColor: cssVars.muted,
                color: cssVars.foreground,
                padding: "2px 4px",
                borderRadius: "4px",
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: "0.9em"
              }
            },
            code
          )
        );
      }
      currentIndex = offset + match2.length;
      return match2;
    });
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }
    return parts.length > 1 ? parts : text;
  };
  const renderContent = () => {
    if (loading) {
      return /* @__PURE__ */ React22.createElement("div", { style: {
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      } }, /* @__PURE__ */ React22.createElement(ProgressIndicator, { type: "circular", size: "lg", color: "primary" }), /* @__PURE__ */ React22.createElement("p", { style: { color: cssVars.foregroundAccent } }, "Loading documentation..."));
    }
    const lines = content.split("\n");
    const elements = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = "";
    let inTable = false;
    let tableRows = [];
    let tableHeaders = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLanguage = line.replace("```", "").trim();
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            /* @__PURE__ */ React22.createElement("div", { key: `codeblock-${i}`, style: { marginBottom: "16px" } }, /* @__PURE__ */ React22.createElement(
              CodeBlock,
              {
                language: codeBlockLanguage || "text",
                lineNumbers: true,
                copyable: true,
                color: "primary",
                variant: "outline",
                size: "sm"
              },
              codeBlockContent.join("\n")
            ))
          );
          codeBlockContent = [];
          codeBlockLanguage = "";
        }
        continue;
      }
      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
          tableHeaders = splitTableCells(line);
        } else if (line.includes("---")) {
          continue;
        } else {
          const cells = splitTableCells(line);
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        inTable = false;
        elements.push(
          /* @__PURE__ */ React22.createElement("div", { key: `table-${i}`, style: { overflowX: "auto", marginBottom: "16px", marginTop: "12px" } }, /* @__PURE__ */ React22.createElement("table", { style: {
            width: "100%",
            borderCollapse: "collapse",
            border: `1px solid ${cssVars.border}`,
            borderRadius: "8px"
          } }, /* @__PURE__ */ React22.createElement("thead", null, /* @__PURE__ */ React22.createElement("tr", { style: { backgroundColor: cssVars.backgroundAccent } }, tableHeaders.map((header, idx) => /* @__PURE__ */ React22.createElement("th", { key: idx, style: {
            padding: "12px",
            textAlign: "left",
            fontWeight: "600",
            color: cssVars.foreground,
            borderBottom: `2px solid ${cssVars.border}`,
            fontSize: "13px"
          } }, parseInlineText(header))))), /* @__PURE__ */ React22.createElement("tbody", null, tableRows.map((row, rowIdx) => /* @__PURE__ */ React22.createElement("tr", { key: rowIdx, style: {
            borderBottom: `1px solid ${cssVars.border}`,
            backgroundColor: rowIdx % 2 === 0 ? "transparent" : cssVars.backgroundHover
          } }, row.map((cell, cellIdx) => /* @__PURE__ */ React22.createElement("td", { key: cellIdx, style: {
            padding: "10px 12px",
            color: cssVars.foregroundAccent,
            fontSize: "13px",
            verticalAlign: "top"
          } }, parseInlineText(cell))))))))
        );
        tableRows = [];
        tableHeaders = [];
      }
      if (line.startsWith("# ")) {
        elements.push(
          /* @__PURE__ */ React22.createElement(
            "h1",
            {
              key: `h1-${i}`,
              style: {
                color: cssVars.primary,
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "16px",
                marginTop: elements.length === 0 ? "0" : "32px"
              }
            },
            parseInlineText(line.replace("# ", ""))
          )
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          /* @__PURE__ */ React22.createElement(
            "h2",
            {
              key: `h2-${i}`,
              style: {
                color: cssVars.foreground,
                fontSize: "22px",
                fontWeight: "600",
                marginBottom: "12px",
                marginTop: "24px"
              }
            },
            parseInlineText(line.replace("## ", ""))
          )
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          /* @__PURE__ */ React22.createElement(
            "h3",
            {
              key: `h3-${i}`,
              style: {
                color: cssVars.foreground,
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
                marginTop: "20px"
              }
            },
            parseInlineText(line.replace("### ", ""))
          )
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          /* @__PURE__ */ React22.createElement(
            "li",
            {
              key: `li-${i}`,
              style: {
                color: cssVars.foregroundAccent,
                marginBottom: "4px",
                listStyleType: "disc",
                marginLeft: "20px"
              }
            },
            parseInlineText(line.replace("- ", ""))
          )
        );
      } else if (line.trim().startsWith("<details>")) {
        let summary = "";
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith("</details>")) {
          if (lines[j].trim().startsWith("<summary>")) {
            summary = lines[j].replace("<summary>", "").replace("</summary>", "").trim();
          } else if (lines[j].trim() !== "" && !lines[j].trim().startsWith("<summary>")) {
            const contentLine = lines[j];
            if (contentLine.trim().startsWith("|")) ;
          }
          j++;
        }
        const detailsLines = lines.slice(i + 1, j);
        const detailsMarkdown = detailsLines.filter((l) => !l.trim().startsWith("<summary>") && !l.trim().startsWith("</summary>")).join("\n");
        elements.push(
          /* @__PURE__ */ React22.createElement("details", { key: `details-${i}`, style: { marginBottom: "16px", marginTop: "12px" } }, /* @__PURE__ */ React22.createElement("summary", { style: {
            cursor: "pointer",
            color: cssVars.primary,
            fontWeight: "600",
            padding: "8px",
            backgroundColor: cssVars.backgroundAccent,
            borderRadius: "6px",
            marginBottom: "8px",
            fontSize: "14px"
          } }, summary), /* @__PURE__ */ React22.createElement("div", { style: { paddingLeft: "12px" } }, /* @__PURE__ */ React22.createElement(ReadmeDisplay, { content: detailsMarkdown, loading: false })))
        );
        i = j;
        continue;
      } else if (line.trim() === "") {
        elements.push(/* @__PURE__ */ React22.createElement("br", { key: `br-${i}` }));
      } else if (line.trim() !== "") {
        elements.push(
          /* @__PURE__ */ React22.createElement(
            "p",
            {
              key: `p-${i}`,
              style: {
                color: cssVars.foregroundAccent,
                marginBottom: "12px",
                lineHeight: "1.6"
              }
            },
            parseInlineText(line)
          )
        );
      }
    }
    return elements;
  };
  return /* @__PURE__ */ React22.createElement(
    "div",
    {
      className,
      style: __spreadValues({
        color: cssVars.foreground,
        lineHeight: "1.6",
        fontSize: "14px",
        textAlign: "left"
      }, style)
    },
    renderContent()
  );
}

export { CollapsibleMenu, InteractiveComponentDisplay, Navigation, ReadmeDisplay, createUniversalControls, generateCodeString, getComponentName };
//# sourceMappingURL=molecules.mjs.map
//# sourceMappingURL=molecules.mjs.map