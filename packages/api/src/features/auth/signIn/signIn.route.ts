import { createRoute } from "@hono/zod-openapi";
import { AuthErrorResponseSchema } from "../../../schemas/auth";
import {
  SignInRequestBodySchema,
  SignInResponseBodySchema,
} from "./signIn.schema";

export const signInRoute = createRoute({
  method: "post",
  path: "/sign-in",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SignInRequestBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Sign up response",
      content: {
        "application/json": {
          schema: SignInResponseBodySchema,
        },
      },
    },
    401: {
      description: "Validation Error",
      content: {
        "application/json": {
          schema: AuthErrorResponseSchema,
        },
      },
    },
  },
});
