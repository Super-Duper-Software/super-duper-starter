import { createRoute } from "@hono/zod-openapi";
import { sessionMiddleware } from "../../middleware/auth";
import { errorResponseDefaults } from "../../schemas/error";
import { AccountResponseBodySchema } from "./account.schema";

export const accountRoute = createRoute({
  method: "get",
  path: "/account",
  middleware: [sessionMiddleware],
  operationId: "getAccount",
  responses: {
    200: {
      description: "Account information",
      content: {
        "application/json": {
          schema: AccountResponseBodySchema,
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
