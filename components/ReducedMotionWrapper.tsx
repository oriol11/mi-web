"use client";

import React, { ReactNode } from "react";
import { useReducedMotion } from "../lib/accessibility";

/**
 * ReducedMotionWrapper Component
 *
 * Wraps content to respect user's reduced motion preferences.
 * Per WCAG 2.1 AA - Motion Animation (2.3.3) and Animation from Interactions (3.1.1)
 */
interface ReducedMotionWrapperProps {
  children: ReactNode;
  /** Optional: Custom static fallback when reduced motion is preferred */
  fallback?: ReactNode;
  /** Optional: Force disable animations regardless of preference */
  disableAnimation?: boolean;
  /** Optional: Additional class names */
  className?: string;
  /** Optional: When true, applies reduced-motion CSS to children instead of replacing */
  preserveContent?: boolean;
}

/**
 * ReducedMotionWrapper
 *
 * Respects `prefers-reduced-motion` and applies appropriate styling
 * or renders a static fallback. Always accessible per WCAG 2.1 AA.
 */
export function ReducedMotionWrapper({
  children,
  fallback,
  disableAnimation = false,
  className = "",
  preserveContent = true,
}: ReducedMotionWrapperProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const shouldReduce = reducedMotion || disableAnimation;

  // If reduced motion preferred and a static fallback is provided (and not preserving content)
  const renderContent = shouldReduce && fallback && !preserveContent ? fallback : children;

  const motionClass = shouldReduce ? "reduced-motion" : "motion-allowed";

  return (
    <div
      className={`${className} ${motionClass}`.trim()}
      data-reduced-motion={shouldReduce ? "true" : "false"}
      aria-label={shouldReduce ? "Static content shown" : "Animated content"}
    >
      {renderContent}
    </div>
  );
}

/**
 * Animation Safe Wrapper
 * Applies `animation-duration: 0.01ms` when reduced motion is preferred
 * to disable transitions while preserving layout
 */
export function AnimationSafeWrapper({ 
  children, 
  className = ""
}: { children: ReactNode; className?: string }): JSX.Element {
  const reducedMotion = useReducedMotion();
  return (
    <div
      className={className}
      style={{
        animationDuration: reducedMotion ? "0.01ms !important" : undefined,
        transitionDuration: reducedMotion ? "0.01ms !important" : undefined,
      }}
      aria-hidden={false}
    >
      {children}
    </div>
  );
}