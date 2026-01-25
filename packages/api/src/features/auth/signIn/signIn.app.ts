import { APIError, auth } from "@superdupersoftware/auth";
import { createHono } from "../../../hono";
import { signInRoute } from "./signIn.route";

export const signInApp = createHono().openapi(signInRoute, async (c) => {
  const { email, password } = c.req.valid("json");

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      returnHeaders: true,
      returnStatus: true,
    });

    res.headers.forEach((value, key) => {
      c.res.headers.set(key, value);
    });

    return c.json(res.response, res.status as 201);
  } catch (error) {
    if (error instanceof APIError) {
      return c.json(error.body, error.statusCode as 401);
    } else {
      throw error;
    }
  }
});
