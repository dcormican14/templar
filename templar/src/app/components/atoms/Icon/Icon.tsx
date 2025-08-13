'use client';

import React, { forwardRef } from 'react';
import { useCSSVariables, useSettings } from '../../../providers';
import { iconRegistry, getIcon, type IconName } from './iconRegistry';

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'color'> {
  name: IconName | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | string;
  spin?: boolean;
  pulse?: boolean;
  className?: string;
}

export type { IconProps, IconName };

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ 
    name,
    size = 'md',
    color = 'inherit',
    spin = false,
    pulse = false,
    className,
    style,
    ...props 
  }, ref) => {
    const cssVars = useCSSVariables();
    const { settings } = useSettings();

    // Get icon component
    const IconComponent = typeof name === 'string' ? getIcon(name) : name;

    if (!IconComponent) {
      console.warn(`Icon "${String(name)}" not found in registry`);
      return null;
    }

    // Get size styles
    const getSizeValue = () => {
      if (typeof size === 'number') {
        return size;
      }
      
      const sizes = {
        xs: 16,
        sm: 24,
        md: 32,
        lg: 48,
        xl: 72,
      };
      return sizes[size];
    };

    // Get color value
    const getColorValue = () => {
      switch (color) {
        case 'inherit':
          return 'currentColor';
        case 'primary':
          return cssVars.primary;
        case 'secondary':
          return cssVars.secondary;
        case 'success':
          return cssVars.success;
        case 'warning':
          return cssVars.warning;
        case 'error':
          return cssVars.error;
        case 'info':
          return cssVars.info;
        case 'muted':
          return cssVars.mutedForeground;
        default:
          return color;
      }
    };

    // Get animation styles
    const getAnimationStyles = () => {
      if (!settings.appearance.animations) return {};
      
      const animations: React.CSSProperties = {};
      
      if (spin) {
        animations.animation = 'spin 1s linear infinite';
      } else if (pulse) {
        animations.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
      }
      
      return animations;
    };

    const sizeValue = getSizeValue();
    const colorValue = getColorValue();
    const animationStyles = getAnimationStyles();

    const iconProps = {
      width: sizeValue,
      height: sizeValue,
      color: colorValue,
      style: {
        flexShrink: 0,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...animationStyles,
        ...style,
      },
      className,
      ref,
      ...props,
    };

    return (
      <>
        {/* Add animations to global styles if animations are enabled */}
        {settings.appearance.animations && (spin || pulse) && (
          <style jsx global>{`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}</style>
        )}
        
        <IconComponent {...iconProps} />
      </>
    );
  }
);

Icon.displayName = 'Icon';

// Export convenience components for common icons
export const IconArrowRight = (props: Omit<IconProps, 'name'>) => <Icon name="arrow-right" {...props} />;
export const IconArrowLeft = (props: Omit<IconProps, 'name'>) => <Icon name="arrow-left" {...props} />;
export const IconCheck = (props: Omit<IconProps, 'name'>) => <Icon name="check" {...props} />;
export const IconX = (props: Omit<IconProps, 'name'>) => <Icon name="x" {...props} />;
export const IconBell = (props: Omit<IconProps, 'name'>) => <Icon name="bell" {...props} />;
export const IconUser = (props: Omit<IconProps, 'name'>) => <Icon name="user" {...props} />;
export const IconSettings = (props: Omit<IconProps, 'name'>) => <Icon name="settings" {...props} />;
export const IconSearch = (props: Omit<IconProps, 'name'>) => <Icon name="search" {...props} />;
export const IconPlus = (props: Omit<IconProps, 'name'>) => <Icon name="plus" {...props} />;
export const IconMinus = (props: Omit<IconProps, 'name'>) => <Icon name="minus" {...props} />;
export const IconEdit = (props: Omit<IconProps, 'name'>) => <Icon name="edit" {...props} />;
export const IconDelete = (props: Omit<IconProps, 'name'>) => <Icon name="delete" {...props} />;
export const IconEye = (props: Omit<IconProps, 'name'>) => <Icon name="eye" {...props} />;
export const IconEyeOff = (props: Omit<IconProps, 'name'>) => <Icon name="eye-off" {...props} />;
export const IconHeart = (props: Omit<IconProps, 'name'>) => <Icon name="heart" {...props} />;
export const IconStar = (props: Omit<IconProps, 'name'>) => <Icon name="star" {...props} />;
export const IconHome = (props: Omit<IconProps, 'name'>) => <Icon name="home" {...props} />;
export const IconMenu = (props: Omit<IconProps, 'name'>) => <Icon name="menu" {...props} />;
export const IconWarning = (props: Omit<IconProps, 'name'>) => <Icon name="warning" {...props} />;
export const IconInfo = (props: Omit<IconProps, 'name'>) => <Icon name="info" {...props} />;
export const IconLoading = (props: Omit<IconProps, 'name'>) => <Icon name="loading" spin {...props} />;
export const IconLock = (props: Omit<IconProps, 'name'>) => <Icon name="lock" {...props} />;
export const IconUnlock = (props: Omit<IconProps, 'name'>) => <Icon name="unlock" {...props} />;
export const IconDownload = (props: Omit<IconProps, 'name'>) => <Icon name="download" {...props} />;
export const IconUpload = (props: Omit<IconProps, 'name'>) => <Icon name="upload" {...props} />;
export const IconShare = (props: Omit<IconProps, 'name'>) => <Icon name="share" {...props} />;
export const IconCopy = (props: Omit<IconProps, 'name'>) => <Icon name="copy" {...props} />;
export const IconSun = (props: Omit<IconProps, 'name'>) => <Icon name="sun" {...props} />;
export const IconMoon = (props: Omit<IconProps, 'name'>) => <Icon name="moon" {...props} />;
