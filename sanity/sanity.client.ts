// sanity/sanity.client.ts

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "rep8os56",
  dataset: "production",
  apiVersion: "2024-05-16",
  useCdn: false,
};

const client = createClient(config);

export default client;