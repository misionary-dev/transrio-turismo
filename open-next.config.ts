import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

const cloudflare = defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});

const config: OpenNextConfig = {
  ...cloudflare,
  buildCommand: "npm run build:next",
};

export default config;
