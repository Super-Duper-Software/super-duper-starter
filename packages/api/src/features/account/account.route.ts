import { createRoute, z } from "@hono/zod-openapi";
import { AccountResultSchema, UserResultSchema } from "@superdupersoftware/db";
import { errorResponseDefaults } from "../../schemas/error";

export const accountRoute = createRoute({
  method: "get",
  path: "/account",
  responses: {
    200: {
      description: "Account information",
      content: {
        "application/json": {
          schema: UserResultSchema.omit({
            sessions: true,
          }).extend({
            accounts: z.array(
              AccountResultSchema.omit({ user: true, password: true }),
            ),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized",
      ...errorResponseDefaults,
    },
    404: {
      description: "User not found",
      ...errorResponseDefaults,
    },
  },
});
