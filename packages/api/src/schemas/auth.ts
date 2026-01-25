import { z } from "@hono/zod-openapi";

export const AuthErrorResponseSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});
