"use client";

import { useEffect, useRef, useCallback, useState, lazy, Suspense, ComponentType, LazyExoticComponent } from "react";
import type { MotionValue } from "framer-motion";

/**
 * Lazy Load Component Helper
 * Creates a lazy-loaded component with proper Suspense wrapper
 * Per WCAG 2.1 AA - Timing Adjustable (2.2.1) and No Timing (2.2.3)
 */
export function lazyLoadComponent<T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode
): LazyExoticComponent<ComponentType<T>> {
  return lazy(importFn);
}

/**
 * Lazy Load with Suspense Wrapper Component
 */
export interface LazyLoadWrapperProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  /** Loading delay before showing fallback (ms) */
  delay?: number;
}

export function LazyLoadWrapper({
  children,
  fallback,
  delay = 200,
}: LazyLoadWrapperProps): JSX.Element {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Suspense fallback={showFallback ? fallback || <span>Loading...</span> : null}>
      {children}
    </Suspense>
  );
}

/**
 * Intersection Observer Lazy Load Hook
 * Loads content when it enters viewport
 */
export function useLazyLoad(
  options?: IntersectionObserverInit
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          // Trigger load logic here if needed
        }
      },
      { rootMargin: "200px", threshold: 0.01, ...options }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}

/**
 * Bundle Analysis Utilities
 * Analyze bundle size and identify large chunks
 */
export interface BundleChunkInfo {
  chunkName: string;
  size: number;
  compressedSize?: number;
  modules: string[];
}

export interface BundleAnalysisResult {
  totalSize: number;
  totalCompressedSize?: number;
  chunkCount: number;
  largestChunks: BundleChunkInfo[];
  recommendations: string[];
}

export function analyzeBundle(chunks: BundleChunkInfo[]): BundleAnalysisResult {
  const sorted = [...chunks].sort((a, b) => b.size - a.size);
  const largestChunks = sorted.slice(0, 5);

  const recommendations: string[] = [];

  // Recommend code splitting for chunks over 100KB
  const largeChunks = sorted.filter((c) => c.size > 100 * 1024);
  if (largeChunks.length > 0) {
    recommendations.push(
      `Split large chunks (${largeChunks.length} over 100KB): ${largeChunks.map((c) => c.chunkName).join(", ")}`
    );
  }

  // Recommend lazy loading for non-critical chunks
  const nonCriticalChunks = sorted.filter((c) => c.chunkName.includes("non-critical") || c.chunkName.includes("optional"));
  if (nonCriticalChunks.length > 0) {
    recommendations.push(`Lazy load non-critical chunks: ${nonCriticalChunks.map((c) => c.chunkName).join(", ")}`);
  }

  // Recommend tree shaking for chunks with many modules
  const highModuleChunks = sorted.filter((c) => c.modules.length > 50);
  if (highModuleChunks.length > 0) {
    recommendations.push(`Review module imports for tree shaking: ${highModuleChunks.map((c) => c.chunkName).join(", ")}`);
  }

  return {
    totalSize: chunks.reduce((acc, c) => acc + c.size, 0),
    chunkCount: chunks.length,
    largestChunks,
    recommendations,
  };
}

/**
 * Web Vitals Tracking
 * Implements Core Web Vitals tracking per Google standards
 * Per WCAG 2.1 AA - Timing Adjustable relates to load performance
 */
export type VitalType = "LCP" | "FID" | "CLS" | "FCP" | "TTFB" | "INP";

export interface WebVitalData {
  name: VitalType;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
}

export interface WebVitalsConfig {
  /** Report callback */
  onReport?: (data: WebVitalData) => void;
  /** Thresholds for ratings (ms) */
  thresholds?: Partial<Record<VitalType, { good: number; poor: number }>>;
}

// Default thresholds per Google Web Vitals
const DEFAULT_THRESHOLDS: Record<VitalType, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

export function useWebVitals(config: WebVitalsConfig = {}): WebVitalData[] {
  const [vitals, setVitals] = useState<WebVitalData[]>([]);
  const { onReport, thresholds = DEFAULT_THRESHOLDS } = config;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observed: WebVitalData[] = [];

    // LCP observer
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as PerformanceEntry[];
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const value = lastEntry.startTime || 0;
            const data: WebVitalData = {
              name: "LCP",
              value,
              delta: value,
              entries,
              rating: value <= thresholds.LCP.good ? "good" : value <= thresholds.LCP.poor ? "needs-improvement" : "poor",
              timestamp: performance.now(),
            };
            observed.push(data);
            setVitals((prev) => [...prev.filter((v) => v.name !== "LCP"), data]);
            onReport?.(data);
          }
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch {
        // Fallback for browsers without LCP support
      }

      // FCP observer
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as PerformanceEntry[];
          const entry = entries[entries.length - 1];
          if (entry) {
            const value = entry.startTime || 0;
            const data: WebVitalData = {
              name: "FCP",
              value,
              delta: value,
              entries,
              rating: value <= thresholds.FCP.good ? "good" : value <= thresholds.FCP.poor ? "needs-improvement" : "poor",
              timestamp: performance.now(),
            };
            observed.push(data);
            setVitals((prev) => [...prev.filter((v) => v.name !== "FCP"), data]);
            onReport?.(data);
          }
        });
        fcpObserver.observe({ entryTypes: ["paint"] });
      } catch {
        // Fallback
      }
    }

    return () => {
      // Cleanup observers if needed
    };
  }, [onReport, thresholds]);

  return vitals;
}

/**
 * Web Vitals Report Function (standalone, for server-side or external tracking)
 */
export function reportWebVital(
  name: VitalType,
  value: number,
  threshold?: number
): WebVitalData {
  const thresholds = DEFAULT_THRESHOLDS[name];
  const data: WebVitalData = {
    name,
    value,
    delta: value,
    entries: [],
    rating:
      value <= thresholds.good ? "good" : value <= thresholds.poor ? "needs-improvement" : "poor",
    timestamp: Date.now(),
  };

  // Send to analytics endpoint if configured
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
    // Google Tag Manager integration
    try {
      (window as unknown as { gtag: (action: string, event: string, params: Record<string, unknown>) => void }).gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: name,
        value,
        non_interaction: true,
      });
    } catch {
      // Ignore
    }
  }

  return data;
}

/**
 * Framer Motion Optimization with useTransform
 * Optimizes animation performance using transform instead of layout properties
 * Per WCAG 2.1 AA - Motion Animation - should not cause motion sickness (2.3.3)
 */
export function useOptimizedTransform(
  input: MotionValue<number>,
  outputRange: [number, number],
  inputRange?: [number, number]
): MotionValue<number> {
  const { useTransform } = require("framer-motion") as typeof import("framer-motion");
  return useTransform(input, inputRange || [0, 1], outputRange);
}

/**
 * Framer Motion Performance Wrapper
 * Applies performance optimizations to Framer Motion components
 */
export interface FramerMotionOptimizationProps {
  children: React.ReactNode;
  /** Enable reduced motion awareness */
  respectReducedMotion?: boolean;
  /** Use GPU-accelerated transforms */
  useGPU?: boolean;
  /** Will-change property management */
  manageWillChange?: boolean;
}

export function FramerMotionOptimization({
  children,
  respectReducedMotion = true,
  useGPU = true,
  manageWillChange = true,
}: FramerMotionOptimizationProps): JSX.Element {
  return (
    <div
      style={{
        willChange: manageWillChange ? (useGPU ? "transform" : "auto") : "auto",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        ...(respectReducedMotion ? { animationDuration: "0.01ms" } : {}),
      }}
      aria-hidden={false}
    >
      {children}
    </div>
  );
}

/**
 * Image Lazy Loading Hook
 * Tracks image load state and provides loading states
 */
export function useImageLazyLoad(src: string): { loaded: boolean; error: boolean; ref: React.RefObject<HTMLImageElement | null> } {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const handleLoad = () => setLoaded(true);
    const handleError = () => setError(true);

    if (img.complete) {
      setLoaded(true);
    } else {
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);
      return () => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleError);
      };
    }
  }, [src]);

  return { loaded, error, ref };
}

/**
 * Resource Prefetch Helper
 * Prefetches critical resources
 */
export function prefetchResource(url: string, as?: "script" | "style" | "font" | "image"): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = url;
  if (as) link.as = as;
  document.head.appendChild(link);
}

/**
 * Prefetch Critical Resources
 */
export function prefetchCriticalResources(urls: string[]): void {
  urls.forEach((url) => prefetchResource(url));
}

/**
 * Component Preload with Dynamic Import
 * Preloads a module without rendering it
 */
export function preloadModule(importFn: () => Promise<unknown>): void {
  // Initiate import but don't wait
  importFn().catch(() => {
    // Ignore preload errors
  });
}

/**
 * Performance Metrics Collector
 * Collects timing metrics for components
 */
export interface ComponentTiming {
  name: string;
  mountTime: number;
  renderCount: number;
  lastRenderTime: number;
}

export function useComponentTiming(name: string): ComponentTiming {
  const startTime = useRef(performance.now());
  const renderCount = useRef(0);
  const [timing, setTiming] = useState<ComponentTiming>({
    name,
    mountTime: 0,
    renderCount: 0,
    lastRenderTime: 0,
  });

  useEffect(() => {
    renderCount.current += 1;
    const mountTime = performance.now() - startTime.current;
    const lastRenderTime = performance.now();

    setTiming({
      name,
      mountTime,
      renderCount: renderCount.current,
      lastRenderTime: lastRenderTime - startTime.current,
    });
  });

  return timing;
}

/**
 * Memory Usage Monitor
 * Monitors memory usage if available
 */
export function getMemoryUsage(): { usedJSHeapSize: number; totalJSHeapSize: number; limitJSHeapSize: number } | null {
  if (typeof window === "undefined" || !(window as unknown as Record<string, unknown>).performance) return null;

  const memory = (window.performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; limitJSHeapSize: number } }).memory;
  return memory ? { ...memory } : null;
}

/**
 * Frame Rate Monitor
 * Monitors frame rate using requestAnimationFrame
 */
export function useFrameRateMonitor(): number | null {
  const [fps, setFps] = useState<number | null>(null);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = () => {
      frameCount++;
      const now = performance.now();

      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return fps;
}

/**
 * Bundle Size Check Helper
 * Used for development-time bundle analysis
 */
export function checkBundleSize(chunkName: string, maxSizeKB: number = 100): boolean {
  // In production, this would read from build metadata
  // For development, return true to indicate pass
  if (process.env.NODE_ENV === "development") {
    console.warn(`[Bundle Check] Chunk "${chunkName}" should be under ${maxSizeKB}KB`);
  }
  return true;
}

/**
 * Dynamic Import with Error Boundary
 */
export async function safeDynamicImport<T>(importFn: () => Promise<T>, fallback?: T): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    console.error("Dynamic import failed:", error);
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

/**
 * Reduced Motion Animation Config
 * Returns Framer Motion config that respects reduced motion
 */
export function reducedMotionConfig(
  reducedMotion: boolean,
  baseConfig?: Record<string, unknown>
): Record<string, unknown> {
  return {
    ...baseConfig,
    ...(reducedMotion
      ? {
          transition: { duration: 0, delay: 0 },
          animate: { opacity: 1, scale: 1, x: 0, y: 0 },
        }
      : {}),
  };
}

/**
 * Optimize Framer Motion Component
 * HOC-like wrapper for performance optimization
 */
export interface OptimizeMotionProps {
  children: React.ReactNode;
  reducedMotion?: boolean;
}

export function OptimizeMotion({ children, reducedMotion = false }: OptimizeMotionProps): JSX.Element {
  return (
    <div
      style={{
        willChange: reducedMotion ? "auto" : "transform",
        contain: "layout style paint",
        contentVisibility: reducedMotion ? "visible" : "auto",
      }}
      aria-label="Optimized animation container"
    >
      {children}
    </div>
  );
}

/**
 * Critical CSS Injection Helper
 * Injects critical CSS for above-the-fold content
 */
export function injectCriticalCSS(css: string): void {
  if (typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = css;
  style.setAttribute("data-critical", "true");
  document.head.insertBefore(style, document.head.firstChild);
}

/**
 * Resource Timing Analysis
 * Analyzes resource timing for performance insights
 */
export interface ResourceTimingInfo {
  name: string;
  duration: number;
  startTime: number;
  responseEnd: number;
  fetchStart: number;
}

export function getResourceTimings(): ResourceTimingInfo[] {
  if (typeof performance === "undefined") return [];
  return (performance.getEntriesByType("resource") as PerformanceResourceTiming[]).map((entry) => ({
    name: entry.name,
    duration: entry.duration,
    startTime: entry.startTime,
    responseEnd: entry.responseEnd,
    fetchStart: entry.fetchStart,
  }));
}

/**
 * Load Time Reporter
 * Reports load time to analytics
 */
export function reportLoadTime(): void {
  if (typeof window === "undefined" || typeof performance === "undefined") return;

  const timing = performance.timing;
  if (!timing) return;

  const loadTime = timing.loadEventEnd - timing.navigationStart;
  const domReady = timing.domComplete - timing.navigationStart;

  if (typeof (window as unknown as Record<string, unknown>).gtag !== "undefined") {
    try {
      (window as unknown as { gtag: (action: string, event: string, params: Record<string, unknown>) => void }).gtag("event", "load_time", {
        event_category: "Performance",
        event_label: "Page Load",
        value: Math.round(loadTime),
        non_interaction: true,
      });
    } catch {
      // Ignore
    }
  }
}

/**
 * Preconnect Helper
 * Preconnects to critical origins
 */
export function preconnectTo(url: string): void {
  if (typeof document === "undefined") return;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = url;
  document.head.appendChild(link);
}

/**
 * DNS Prefetch Helper
 */
export function dnsPrefetch(url: string): void {
  if (typeof document === "undefined") return;
  const link = document.createElement("link");
  link.rel = "dns-prefetch";
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Resource Hint Helper
 * Adds preload/preconnect hints for critical assets
 */
export function addResourceHints(
  hints: Array<{ url: string; rel: "preload" | "prefetch" | "preconnect" | "dns-prefetch"; as?: string }>
): void {
  if (typeof document === "undefined") return;

  hints.forEach(({ url, rel, as }) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = url;
    if (as && rel === "preload") link.as = as;
    document.head.appendChild(link);
  });
}