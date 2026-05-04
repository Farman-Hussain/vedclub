import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ua8tnpmk", // Your actual project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});