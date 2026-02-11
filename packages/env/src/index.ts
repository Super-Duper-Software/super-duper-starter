import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.url().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  QSTASH_CURRENT_SIGNING_KEY: z.string(),
  QSTASH_NEXT_SIGNING_KEY: z.string(),
  QSTASH_TOKEN: z.string(),
  QSTASH_URL: z.url(),
});

export const env = schema.parse(process.env);
