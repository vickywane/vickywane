import { configFactory } from "./configFactory";

export const apiConfig = configFactory({
  development: {
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID || "",
    project_dataset: process.env.NEXT_PUBLIC_PROJECT_DATASET || "",
    api_version: process.env.NEXT_PUBLIC_PROJECT_API_VERSION || "",
    sanity_token: process.env.NEXT_PUBLIC_SANITY_TOKEN || "",
    posthog_key: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
    posthog_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
  },
  production: {
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID || "",
    project_dataset: process.env.NEXT_PUBLIC_PROJECT_DATASET || "",
    api_version: process.env.NEXT_PUBLIC_PROJECT_API_VERSION || "",
    sanity_token: process.env.NEXT_PUBLIC_SANITY_TOKEN || "",
    posthog_key: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
    posthog_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
  }
});