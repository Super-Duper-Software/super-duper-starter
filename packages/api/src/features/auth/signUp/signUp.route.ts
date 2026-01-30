import { createRoute } from "@hono/zod-openapi";
import { AuthErrorResponseSchema } from "../../../schemas/auth";
import {
  SignUpRequestBodySchema,
  SignUpResponseBodySchema,
} from "./signUp.schema";

export const signUpRoute = createRoute({
  method: "post",
  path: "/sign-up",
  request: {
    body: {
      content: {
        "application/json": {
          schema: SignUpRequestBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Sign up response",
      content: {
        "application/json": {
          schema: SignUpResponseBodySchema,
        },
      },
    },
    422: {
      description: "Validation Error",
      content: {
        "application/json": {
          schema: AuthErrorResponseSchema,
        },
      },
    },
  },
});
