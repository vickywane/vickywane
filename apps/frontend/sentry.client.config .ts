import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://48a0b7428ce5dd19f1a77f84249708a7@o4510052058726400.ingest.de.sentry.io/4510052064428112",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  tracePropagationTargets: ["localhost", /^https:\/\/victory-nwani\.dev\/api/]
});