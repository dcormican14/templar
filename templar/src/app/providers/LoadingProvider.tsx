'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingContextType {
  loadingStates: LoadingState;
  isLoading: (key?: string) => boolean;
  setLoading: (key: string, loading: boolean) => void;
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
  isAnyLoading: boolean;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
  showGlobalSpinner?: boolean;
  /** Start with an initial loading state that blocks until stopLoading('app-init') is called */
  initialLoading?: boolean;
  /** URL or path to an image/gif to display instead of the default spinner */
  loadingImage?: string;
  /** Title text shown with a typing animation on the loading screen */
  loadingTitle?: string;
  /** Subtitle text typed out after the title finishes */
  loadingSubtitle?: string;
  /** Typing speed in ms per character. @default 60 */
  typingSpeed?: number;
  /** Duration in ms for the fade-out transition when loading completes. @default 500 */
  transitionDuration?: number;
}

export function LoadingProvider({
  children,
  showGlobalSpinner = true,
  initialLoading = false,
  loadingImage,
  loadingTitle,
  loadingSubtitle,
  typingSpeed = 60,
  transitionDuration = 500,
}: LoadingProviderProps) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>(
    initialLoading ? { 'app-init': true } : {}
  );

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(current => ({
      ...current,
      [key]: loading,
    }));
  }, []);

  const startLoading = useCallback((key: string) => {
    setLoading(key, true);
  }, [setLoading]);

  const stopLoading = useCallback((key: string) => {
    setLoading(key, false);
  }, [setLoading]);

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates[key] || false;
    }
    return Object.values(loadingStates).some(Boolean);
  }, [loadingStates]);

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  const value: LoadingContextType = {
    loadingStates,
    isLoading,
    setLoading,
    startLoading,
    stopLoading,
    isAnyLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {showGlobalSpinner && (
        <GlobalLoadingSpinner
          loadingImage={loadingImage}
          loadingTitle={loadingTitle}
          loadingSubtitle={loadingSubtitle}
          typingSpeed={typingSpeed}
          transitionDuration={transitionDuration}
        />
      )}
    </LoadingContext.Provider>
  );
}

interface GlobalLoadingSpinnerProps {
  loadingImage?: string;
  loadingTitle?: string;
  loadingSubtitle?: string;
  typingSpeed: number;
  transitionDuration: number;
}

/** Hook that types out a string one character at a time */
function useTypingEffect(text: string, speed: number, startImmediately: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!startImmediately || !text) {
      setDisplayed('');
      setDone(!text);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, startImmediately]);

  return { displayed, done };
}

function GlobalLoadingSpinner({
  loadingImage,
  loadingTitle,
  loadingSubtitle,
  typingSpeed,
  transitionDuration,
}: GlobalLoadingSpinnerProps) {
  const { isAnyLoading } = useLoading();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const wasLoading = useRef(true);
  const [typingStarted, setTypingStarted] = useState(false);
  const [readyToDismiss, setReadyToDismiss] = useState(false);
  const appFinishedLoading = useRef(false);
  const [appDoneLoading, setAppDoneLoading] = useState(false);

  // Mobile detection + mobile-specific phased intro
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePhase, setMobilePhase] = useState<'gif' | 'transition' | 'typing'>('gif');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hasTypingContent = !!(loadingTitle || loadingSubtitle);

  // Mobile: fade gif out immediately, then start typing
  useEffect(() => {
    if (!isMobile || !hasTypingContent || !loadingImage) {
      // Desktop or no gif — start typing immediately (after brief delay)
      if (hasTypingContent) {
        const timer = setTimeout(() => setTypingStarted(true), 200);
        return () => clearTimeout(timer);
      }
      return;
    }
    // Mobile: start fading the gif right away, then switch to typing
    setMobilePhase('transition');
    const timer = setTimeout(() => {
      setMobilePhase('typing');
      setTypingStarted(true);
    }, 400); // quick fade
    return () => clearTimeout(timer);
  }, [isMobile, hasTypingContent, loadingImage]);

  const title = useTypingEffect(loadingTitle || '', typingSpeed, typingStarted);
  const subtitle = useTypingEffect(loadingSubtitle || '', typingSpeed, title.done);

  // Track when typing finishes
  const typingComplete = hasTypingContent
    ? title.done && subtitle.done
    : true;

  // Track when the app signals it's done loading
  useEffect(() => {
    if (!isAnyLoading) {
      appFinishedLoading.current = true;
      setAppDoneLoading(true);
    }
  }, [isAnyLoading]);

  // Only dismiss when BOTH typing is complete AND app is done loading
  useEffect(() => {
    if (typingComplete && appFinishedLoading.current && !readyToDismiss) {
      // Small pause after typing finishes before fading out
      const timer = setTimeout(() => setReadyToDismiss(true), 400);
      return () => clearTimeout(timer);
    }
  }, [typingComplete, readyToDismiss]);

  // Handle fade-out transition
  useEffect(() => {
    if (readyToDismiss && !fading) {
      setFading(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [readyToDismiss, fading, transitionDuration]);

  // Handle non-typing loading (original behavior)
  useEffect(() => {
    if (hasTypingContent) return; // Typing mode handles its own dismissal
    if (!isAnyLoading && wasLoading.current) {
      setFading(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, transitionDuration);
      wasLoading.current = false;
      return () => clearTimeout(timer);
    }
    if (isAnyLoading) {
      setVisible(true);
      setFading(false);
    }
    wasLoading.current = isAnyLoading;
  }, [isAnyLoading, transitionDuration, hasTypingContent]);

  if (!visible) return null;

  // Typing mode: replicate the hero layout exactly
  if (hasTypingContent) {
    const titleFontSize = isMobile ? '3.5rem' : '6rem';
    const shadowOffset = isMobile ? '5px' : '8px';

    // Mobile: quick gif fade → typing
    if (isMobile && loadingImage) {
      const showGif = mobilePhase === 'gif' || mobilePhase === 'transition';
      const showText = mobilePhase === 'typing';
      const gifOpacity = mobilePhase === 'transition' ? 0 : mobilePhase === 'gif' ? 1 : 0;
      const textOpacity = mobilePhase === 'typing' ? 1 : 0;

      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--background)',
            opacity: fading ? 0 : 1,
            transition: `opacity ${transitionDuration}ms ease-in-out`,
            pointerEvents: fading ? 'none' : 'auto',
            padding: '80px 32px',
            gap: '48px',
          }}
        >
          {/* Gif phase — centered, fades out */}
          {showGif && (
            <img
              src={loadingImage}
              alt="Loading..."
              style={{
                width: '200px',
                height: 'auto',
                opacity: gifOpacity,
                transition: 'opacity 400ms ease-in-out',
                position: 'absolute',
              }}
            />
          )}

          {/* Typing phase — matches overview hero layout exactly */}
          {showText && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              opacity: textOpacity,
              transition: 'opacity 400ms ease-in-out',
            }}>
              {loadingTitle && (
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <h1 style={{
                    fontSize: titleFontSize,
                    fontWeight: 'bold',
                    color: '#1E2A3A',
                    letterSpacing: '0.02em',
                    lineHeight: '1.1',
                    position: 'absolute',
                    top: shadowOffset,
                    left: shadowOffset,
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                  }}>
                    {title.displayed}
                  </h1>
                  <h1 style={{
                    fontSize: titleFontSize,
                    fontWeight: 'bold',
                    color: 'var(--foreground)',
                    textShadow: '2px 2px 4px var(--background-shadow)',
                    letterSpacing: '0.02em',
                    lineHeight: '1.1',
                    position: 'relative',
                    zIndex: 2,
                    whiteSpace: 'nowrap',
                  }}>
                    {title.displayed}
                    {(!title.done || (!loadingSubtitle && !appDoneLoading)) && (
                      <span style={{
                        borderRight: '3px solid var(--foreground)',
                        marginLeft: '2px',
                        animation: 'blink-caret 0.75s step-end infinite',
                      }} />
                    )}
                  </h1>
                </div>
              )}
              {loadingSubtitle && title.done && (
                <p style={{
                  fontSize: '1.5rem',
                  color: 'var(--foreground-accent)',
                  fontStyle: 'italic',
                  marginTop: '0px',
                  textShadow: '1px 1px 2px var(--background-shadow)',
                  maxWidth: '500px',
                  lineHeight: '1.4',
                  textAlign: 'right',
                }}>
                  {subtitle.displayed}
                  {(!subtitle.done || !appDoneLoading) && (
                    <span style={{
                      borderRight: '2px solid var(--foreground-accent)',
                      marginLeft: '2px',
                      animation: 'blink-caret 0.75s step-end infinite',
                    }} />
                  )}
                </p>
              )}
            </div>
          )}

          <style>{`
            @keyframes blink-caret {
              0%, 100% { border-color: transparent; }
              50% { border-color: currentColor; }
            }
          `}</style>
        </div>
      );
    }

    // Desktop: side-by-side layout matching the overview hero
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--background)',
          opacity: fading ? 0 : 1,
          transition: `opacity ${transitionDuration}ms ease-in-out`,
          pointerEvents: fading ? 'none' : 'auto',
          padding: '80px 32px',
          gap: '48px',
        }}
      >
        {/* Text content — matches OverviewPage hero layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
          {loadingTitle && (
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              {/* Navy shadow text */}
              <h1 style={{
                fontSize: titleFontSize,
                fontWeight: 'bold',
                color: '#1E2A3A',
                letterSpacing: '0.02em',
                lineHeight: '1.1',
                position: 'absolute',
                top: shadowOffset,
                left: shadowOffset,
                zIndex: 1,
                whiteSpace: 'nowrap',
              }}>
                {title.displayed}
              </h1>
              {/* Main text */}
              <h1 style={{
                fontSize: titleFontSize,
                fontWeight: 'bold',
                color: 'var(--foreground)',
                textShadow: '2px 2px 4px var(--background-shadow)',
                letterSpacing: '0.02em',
                lineHeight: '1.1',
                position: 'relative',
                zIndex: 2,
                whiteSpace: 'nowrap',
              }}>
                {title.displayed}
                {(!title.done || (!loadingSubtitle && !appDoneLoading)) && (
                  <span style={{
                    borderRight: '3px solid var(--foreground)',
                    marginLeft: '2px',
                    animation: 'blink-caret 0.75s step-end infinite',
                  }} />
                )}
              </h1>
            </div>
          )}
          {loadingSubtitle && title.done && (
            <p style={{
              fontSize: '1.5rem',
              color: 'var(--foreground-accent)',
              fontStyle: 'italic',
              marginTop: '0px',
              textShadow: '1px 1px 2px var(--background-shadow)',
              maxWidth: '500px',
              lineHeight: '1.4',
              textAlign: 'right',
            }}>
              {subtitle.displayed}
              {(!subtitle.done || !appDoneLoading) && (
                <span style={{
                  borderRight: '2px solid var(--foreground-accent)',
                  marginLeft: '2px',
                  animation: 'blink-caret 0.75s step-end infinite',
                }} />
              )}
            </p>
          )}
        </div>

        {/* Loading image (gif) — matches knight position, desktop only */}
        {loadingImage && (
          <img
            src={loadingImage}
            alt="Loading..."
            style={{
              width: '250px',
              height: 'auto',
            }}
          />
        )}

        {/* Caret blink animation */}
        <style>{`
          @keyframes blink-caret {
            0%, 100% { border-color: transparent; }
            50% { border-color: currentColor; }
          }
        `}</style>
      </div>
    );
  }

  // Default spinner mode
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background)',
        opacity: fading ? 0 : 1,
        transition: `opacity ${transitionDuration}ms ease-in-out`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {loadingImage ? (
        <img
          src={loadingImage}
          alt="Loading..."
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            className="animate-spin"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '2px solid var(--border)',
              borderTopColor: 'var(--primary)',
            }}
          />
          <span style={{ color: 'var(--foreground)', fontSize: '14px' }}>Loading...</span>
        </div>
      )}
    </div>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Higher-order hook for managing loading states with async operations
export function useAsyncOperation() {
  const { startLoading, stopLoading } = useLoading();

  const execute = useCallback(
    async <T,>(key: string, operation: () => Promise<T>): Promise<T> => {
      try {
        startLoading(key);
        const result = await operation();
        return result;
      } finally {
        stopLoading(key);
      }
    },
    [startLoading, stopLoading]
  );

  return { execute };
}
