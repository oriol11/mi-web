/**
 * Next.js 14+ configuration – Vercel optimized
 * Includes TS config, image optimization, and middleware for fast SSR.
 */
import { nextConfig } from 'next';
import type { VercelNextConfig } from '@next/config';

// -------------------------------------------------------
// Basic Next.js config
// -------------------------------------------------------
export default {
  // --- Runtime & Environment ---
  experimental: {
    // Enable Turbopack (if available) – faster builds
    turbo: process.platform !== 'win32' && 'node' ? true : undefined,
  },

  // --- Image Optimization ---
  images: {
    // Default sizes for resized images
    formats: ['web', 'avif', 'webp', 'png', 'jpeg'],
    priority: 'high',
    placeholder: 'blur',
    // Serve images via CDN (Vercel handles this automatically)
    // Custom loader for additional processing
    loader: 'next/image',
  },

  // --- Middleware (edge functions) ---
  middleware: {
    // Enable request routing based on path
    // e.g., redirect /api to /api-prod
    // routes: [
    //   {
    //     src: '/api',
    //     destination: '/api-prod',
    //   },
    // ],
  },

  // --- TypeScript Configuration ---
  typescript: {
    // Enable strict mode for better type safety
    strict: true,
    // Paths for tsconfig
    paths: [
      '/app/**/*.ts',
      '/app/**/*.tsx',
      '/src/**/*.ts',
      '/src/**/*.tsx',
    ],
    // Source maps for development
    sourceMap: true,
    // Exclude test files from type checking
    exclude: ['/tests/', '/node_modules/'],
  },

  // --- Performance Optimizations ---
  // Compression
  compression: {
    enabled: true,
    minRatio: 0.85,
  },

  // --- Build & Deployment ---
  // Vercel-specific settings
  vercel: {
    // Enable incremental static regeneration (ISR)
    incrementalStaticRegeneration: {
      targetRevalidationTime: 60,
      maxAge: 3600,
    },
    // Cache strategy for API routes
    api: {
      // Cache duration for API responses
      cacheControl: 'public, max-age=86400',
    },
  },

  // --- Output ---
  output: {
    // Generate static files alongside server
    static: {
      dir: '/static',
      purge: ['/next-env.d.ts', '/next.config.js'],
    },
  },
};
