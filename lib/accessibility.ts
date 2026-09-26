"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";

/**
 * Reduced Motion Hook
 * Respects user's prefers-reduced-motion preference per WCAG 2.1 AA
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

/**
 * Focus Trap Hook
 * Traps focus within a container element for modal dialogs, drawers, etc.
 * Per WCAG 2.1 AA - Focus Order (2.4.3) and Focus Visible (2.4.7)
 */
export function useFocusTrap(isActive: boolean = true): React.RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Skip Link Component Props
 */
export interface SkipLinkProps {
  /** Target element ID to skip to */
  targetId: string;
  /** Custom label for the skip link */
  label?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Screen Reader Only Text
 * Visually hidden but accessible to screen readers
 * Per WCAG 2.1 AA - Non-text Content (1.1.1)
 */
export function srOnly(className?: string): string {
  return `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    ${className || ""}
  `;
}

/**
 * Screen Reader Only CSS Class
 */
export const srOnlyClass = "sr-only";

/**
 * Announce to Screen Readers
 * Uses ARIA live region for dynamic announcements
 * Per WCAG 2.1 AA - Status Messages (4.1.3)
 */
export function useAnnouncer(): (message: string, politeness?: "polite" | "assertive") => void {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const div = document.createElement("div");
    div.setAttribute("role", "status");
    div.setAttribute("aria-live", "polite");
    div.setAttribute("aria-atomic", "true");
    div.style.cssText = srOnly();
    document.body.appendChild(div);
    announcerRef.current = div;

    return () => {
      document.body.removeChild(div);
      announcerRef.current = null;
    };
  }, []);

  const announce = useCallback(
    (message: string, politeness: "polite" | "assertive" = "polite") => {
      if (!announcerRef.current) return;

      announcerRef.current.setAttribute("aria-live", politeness);
      announcerRef.current.textContent = message;
    },
    []
  );

  return announce;
}

/**
 * Keyboard Navigation Helper
 * Checks if user is navigating via keyboard
 */
export function useKeyboardNavigation(): boolean {
  const [isKeyboard, setIsKeyboard] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        setIsKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboard(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return isKeyboard;
}

/**
 * Focus Visible Polyfill
 * Adds focus-visible class for keyboard focus styling
 */
export function useFocusVisible(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        document.body.classList.add("focus-visible-enabled");
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("focus-visible-enabled");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
}

/**
 * Reduced Motion Wrapper Component Props
 */
export interface ReducedMotionWrapperProps {
  children: ReactNode;
  /** Component to render when reduced motion is preferred */
  fallback?: ReactNode;
  /** Disable animation entirely when reduced motion is preferred */
  disableAnimation?: boolean;
}

/**
 * Get Reduced Motion Media Query
 * For use in CSS-in-JS or styled-components
 */
export const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

/**
 * Check if Reduced Motion is Preferred (sync version)
 * For use outside React components
 */
export function getReducedMotionPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(reducedMotionMediaQuery).matches;
}

/**
 * ARIA Label Generator
 * Generates consistent ARIA labels for common patterns
 */
export const ariaLabels = {
  close: "Close",
  menu: "Menu",
  navigation: "Navigation",
  search: "Search",
  previous: "Previous",
  next: "Next",
  loadMore: "Load more",
  expand: "Expand",
  collapse: "Collapse",
  select: "Select",
  deselect: "Deselect",
  open: "Open",
  dismiss: "Dismiss",
  settings: "Settings",
  profile: "Profile",
  logout: "Log out",
  login: "Log in",
};

/**
 * Focus Management Utilities
 */
export const focusManagement = {
  /**
   * Save current focus and return restore function
   */
  saveFocus: (): (() => void) => {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      activeElement?.focus();
    };
  },

  /**
   * Focus first focusable element in container
   */
  focusFirst: (container: HTMLElement): boolean => {
    const focusable = container.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
    return !!focusable;
  },

  /**
   * Focus last focusable element in container
   */
  focusLast: (container: HTMLElement): boolean => {
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const last = focusable[focusable.length - 1];
    last?.focus();
    return !!last;
  },

  /**
   * Trap focus within container (manual version)
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleTab);
    first?.focus();

    return () => container.removeEventListener("keydown", handleTab);
  },
};

/**
 * Reduced Motion CSS Classes
 * For use with CSS modules or global styles
 */
export const reducedMotionClasses = {
  /** Apply to elements that should respect reduced motion */
  respect: "respect-reduced-motion",
  /** Apply to elements that should disable animation when reduced motion */
  disable: "disable-animation-reduced-motion",
  /** Apply to elements that should show fallback when reduced motion */
  fallback: "show-fallback-reduced-motion",
};

/**
 * Motion Safe Variants for Framer Motion
 * Returns variants that respect reduced motion preference
 */
export function getMotionSafeVariants<T extends Record<string, unknown>>(
  variants: T,
  reducedMotion: boolean
): T {
  if (!reducedMotion) return variants;

  const safeVariants: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === "object" && value !== null) {
      safeVariants[key] = {
        ...(value as Record<string, unknown>),
        transition: { duration: 0 },
      };
    }
  }
  return safeVariants as T;
}