import { z } from "@hono/zod-openapi";

export const SignUpRequestBodySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  password: z.string().min(8).max(100),
});

export type SignUpRequestBody = z.infer<typeof SignUpRequestBodySchema>;

export const SignUpResponseBodySchema = z.object({
  token: z.string().nullable(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    emailVerified: z.boolean(),
    image: z.string().nullable().optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  }),
});
