import { OpenAPIHono } from "@hono/zod-openapi";
import { APIError, auth } from "@superdupersoftware/auth";
import { signUpRoute } from "./signUp.route";

export const signUpApp = new OpenAPIHono().openapi(signUpRoute, async (c) => {
  const { email, password, name } = c.req.valid("json");

  try {
    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
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
      return c.json(error.body, error.statusCode as 422);
    } else {
      throw error;
    }
  }
});
