import { z } from "@hono/zod-openapi";

export const SignInRequestBodySchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export const SignInResponseBodySchema = z.object({
  redirect: z.boolean().nullable(),
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
