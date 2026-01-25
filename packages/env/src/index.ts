import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.url().optional(),
});

export const env = schema.parse(process.env);
