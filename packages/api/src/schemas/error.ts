import { z } from "@hono/zod-openapi";

export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export const errorResponseDefaults = {
  content: {
    "application/json": {
      schema: ErrorResponseSchema,
    },
  },
} as const;
