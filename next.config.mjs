import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { withSentryConfig } from '@sentry/nextjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Allowlists external hosts the app actually loads: Mapbox (globe tiles/styles/
// telemetry), Supabase storage (listing photos), Google Fonts, GTM/GA4 (once
// cookie consent is granted), Sentry error ingestion, and Open-Meteo (wind data).
// 'unsafe-eval' is dev-only — React's dev mode uses eval() for hot-reload/debug
// callstacks, but (per its own error message) never in production.
const isDev = process.env.NODE_ENV !== 'production'
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://ewuenpbjizdodpfpkovv.supabase.co https://*.mapbox.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://ewuenpbjizdodpfpkovv.supabase.co https://*.mapbox.com https://api.open-meteo.com https://*.sentry.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-src 'self' https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ewuenpbjizdodpfpkovv.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=(), payment=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ]
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: false,
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});