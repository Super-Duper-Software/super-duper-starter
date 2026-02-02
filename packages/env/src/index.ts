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
  // Mail configuration
  RESEND_API_KEY: z.string().optional(),
  MAIL_FROM_EMAIL: z.string().email().default("noreply@superdupersoftware.com"),
  MAIL_FROM_NAME: z.string().default("Super Duper Software"),
  // SMTP configuration for local development
  SMTP_HOST: z.string().default("localhost"),
  SMTP_PORT: z.coerce.number().default(1025),
});

export const env = schema.parse(process.env);
