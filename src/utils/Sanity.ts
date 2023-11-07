import { createClient } from "next-sanity";
import { apiConfig } from "@/config/envApi";

export const SanityClient = () => {
  if (!apiConfig.api_version || !apiConfig.sanity_token || !apiConfig.project_id) {
    throw new Error("Sanity CMS configurations are misssing!");
  }

  return createClient({
    projectId: apiConfig.project_id,
    dataset: apiConfig.project_dataset,
    apiVersion: apiConfig.api_version,
    token: apiConfig.sanity_token,
    useCdn: true
  });
};