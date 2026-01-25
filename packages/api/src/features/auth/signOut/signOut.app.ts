import { auth } from "@superdupersoftware/auth";
import { createHono } from "../../../hono";
import { signOutRoute } from "./signOut.route";

export const signOutApp = createHono().openapi(signOutRoute, async (c) => {
  const res = await auth.api.signOut({
    headers: c.req.raw.headers,
    returnHeaders: true,
    returnStatus: true,
  });

  res.headers.forEach((value, key) => {
    c.res.headers.set(key, value);
  });

  return c.json(res.response, res.status as 200);
});
