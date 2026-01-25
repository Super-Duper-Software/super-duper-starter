import { prisma } from "@superdupersoftware/db";
import { createHono } from "../../hono";
import { accountRoute } from "./account.route";

export const accountApp = createHono().openapi(accountRoute, async (c) => {
  const userContext = c.get("user");
  if (!userContext) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const user = await prisma.user.findFirst({
    where: { id: userContext.id },
    include: {
      accounts: {
        omit: {
          password: true,
        },
      },
    },
  });

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json(user, 200);
});
