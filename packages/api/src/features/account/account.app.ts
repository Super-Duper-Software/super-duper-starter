import { createHono } from "../../hono";
import { getUser } from "../../services/user";
import { accountRoute } from "./account.route";
import { AccountResponseBodySchema } from "./account.schema";

export const accountApp = createHono().openapi(accountRoute, async (c) => {
  const user = getUser(c);

  return c.json(AccountResponseBodySchema.parse(user), 200);
});
