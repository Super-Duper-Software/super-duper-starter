import { resolve } from "node:path";
import { config } from "dotenv";

// Load .env from workspace root
config({ path: resolve(__dirname, "../../../.env") });
