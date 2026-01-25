import { createRoute, z } from "@hono/zod-openapi";

export const signOutRoute = createRoute({
  method: "post",
  path: "/sign-out",
  responses: {
    200: {
      description: "Successful sign-out",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean(),
          }),
        },
      },
    },
  },
});
