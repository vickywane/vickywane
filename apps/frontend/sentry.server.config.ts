import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://48a0b7428ce5dd19f1a77f84249708a7@o4510052058726400.ingest.de.sentry.io/4510052064428112",
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
    tracesSampleRate: 1.0,
});