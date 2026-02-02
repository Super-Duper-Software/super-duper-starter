import { APIError, auth } from "@superdupersoftware/auth/server";
import { createHono } from "../../../hono";
import { signUpRoute } from "./signUp.route";

export const signUpApp = createHono().openapi(signUpRoute, async (c) => {
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

    // Send welcome email
    try {
      await c.var.mailService.sendSignUpEmail(email, name);
    } catch (emailError) {
      // Log the error but don't fail the signup
      c.var.logger?.error(emailError, "Failed to send welcome email");
    }

    return c.json(res.response, res.status as 201);
  } catch (error) {
    if (error instanceof APIError) {
      return c.json(error.body, error.statusCode as 422);
    } else {
      throw error;
    }
  }
});
