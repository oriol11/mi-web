"use client";

import React from "react";
import { SkipLinkProps, srOnlyClass } from "../lib/accessibility";

/**
 * SkipLink Component
 *
 * Provides a keyboard-accessible skip link for navigating past repetitive content.
 * Per WCAG 2.1 AA - Bypass Blocks (2.4.1) and Focus Visible (2.4.7)
 */
export function SkipLink({
  targetId,
  label = "Skip to main content",
  className = "",
}: SkipLinkProps): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      // Remove tabindex after focus to prevent it from being tabbed to
      setTimeout(() => {
        target.removeAttribute("tabindex");
      }, 100);
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`${srOnlyClass} focus-visible-styles ${className}`.trim()}
      aria-label={label}
    >
      {label}
    </a>
  );
}

/**
 * SkipLinkGroup Component
 * Provides multiple skip links for common navigation patterns
 */
export interface SkipLinkGroupProps {
  /** Main content target ID */
  mainContentId?: string;
  /** Navigation target ID */
  navigationId?: string;
  /** Search target ID */
  searchId?: string;
  /** Footer target ID */
  footerId?: string;
}

export function SkipLinkGroup({
  mainContentId = "main-content",
  navigationId = "navigation",
  searchId = "search",
  footerId = "footer",
}: SkipLinkGroupProps): JSX.Element {
  return (
    <nav aria-label="Skip links" className="skip-links" role="navigation">
      <SkipLink targetId={navigationId} label="Skip to navigation" />
      <SkipLink targetId={mainContentId} label="Skip to main content" />
      <SkipLink targetId={searchId} label="Skip to search" />
      <SkipLink targetId={footerId} label="Skip to footer" />
    </nav>
  );
}