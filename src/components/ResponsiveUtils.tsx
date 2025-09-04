'use client';

import { useState, useEffect } from 'react';

// Hook to detect device type and screen size
export function useDeviceDetection() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenSize: 'md',
    orientation: 'landscape' as 'portrait' | 'landscape',
    isTouch: false,
    pixelRatio: 1,
  });

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const pixelRatio = window.devicePixelRatio || 1;
      
      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenSize: width < 640 ? 'xs' : 
                   width < 768 ? 'sm' : 
                   width < 1024 ? 'md' : 
                   width < 1280 ? 'lg' : 
                   width < 1536 ? 'xl' : '2xl',
        orientation: height > width ? 'portrait' : 'landscape',
        isTouch,
        pixelRatio,
      });
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    window.addEventListener('orientationchange', updateDevice);

    return () => {
      window.removeEventListener('resize', updateDevice);
      window.removeEventListener('orientationchange', updateDevice);
    };
  }, []);

  return device;
}

// Responsive wrapper component
interface ResponsiveWrapperProps {
  children: React.ReactNode;
  className?: string;
  mobileClass?: string;
  tabletClass?: string;
  desktopClass?: string;
}

export function ResponsiveWrapper({ 
  children, 
  className = '', 
  mobileClass = '',
  tabletClass = '',
  desktopClass = ''
}: ResponsiveWrapperProps) {
  const device = useDeviceDetection();
  
  const responsiveClass = device.isMobile ? mobileClass : 
                         device.isTablet ? tabletClass : 
                         desktopClass;

  return (
    <div className={`${className} ${responsiveClass}`.trim()}>
      {children}
    </div>
  );
}

// Touch-friendly button component
interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function TouchButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  ariaLabel,
  type = 'button'
}: TouchButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        min-h-[44px] min-w-[44px] 
        flex items-center justify-center
        touch-manipulation
        select-none
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
}

// Responsive text component
interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  className?: string;
}

export function ResponsiveText({ 
  children, 
  as: Component = 'p', 
  size = 'base',
  className = ''
}: ResponsiveTextProps) {
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl md:text-2xl',
    xl: 'text-xl sm:text-2xl md:text-3xl',
    '2xl': 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    '3xl': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    '4xl': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    '5xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    '6xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
  };

  return (
    <Component className={`${sizeClasses[size]} ${className}`.trim()}>
      {children}
    </Component>
  );
}

// Responsive container component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function ResponsiveContainer({ 
  children, 
  size = 'lg',
  className = ''
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[90rem]',
    full: 'max-w-full',
  };

  return (
    <div className={`w-full ${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
