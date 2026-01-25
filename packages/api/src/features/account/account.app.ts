import { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "@superdupersoftware/auth";
import { prisma } from "@superdupersoftware/db";
import { accountRoute } from "./account.route";

export const accountApp = new OpenAPIHono().openapi(accountRoute, async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  const user = await prisma.user.findFirst({
    where: { id: session?.user.id },
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
