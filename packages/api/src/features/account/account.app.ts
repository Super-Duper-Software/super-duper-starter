import { createHono } from "../../hono";
import { accountRoute } from "./account.route";
import { AccountResponseBodySchema } from "./account.schema";

export const accountApp = createHono().openapi(accountRoute, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  return c.json(AccountResponseBodySchema.parse(user), 200);
});
