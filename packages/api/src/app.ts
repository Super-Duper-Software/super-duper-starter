import { createRoute, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { prisma, UserResultSchema } from "@superdupersoftware/db";
import { send } from "@superdupersoftware/messages";
import { HTTPException } from "hono/http-exception";
import { requestId } from "hono/request-id";
import { accountApp } from "./features/account/account.app";
import { authApp } from "./features/auth/auth.app";
import { createHono } from "./hono";
import { loggerMiddleware } from "./middleware/logger";

type OpenAPIObjectConfig = Parameters<typeof app.getOpenAPI31Document>[0];

const route = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Ping response",
    },
  },
});

const GetUsersResponseSchema = z.array(
  UserResultSchema.pick({
    id: true,
    name: true,
    email: true,
  }),
);

const userRoute = createRoute({
  method: "get",
  path: "/users",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GetUsersResponseSchema,
        },
      },
      description: "List of users",
    },
  },
});

const app = createHono().basePath("/api");

app.use(requestId());
app.use(loggerMiddleware());

app.openapi(route, (c) => {
  return c.json({
    message: "Up and running!",
  });
});

app.post("/cron/sample", async (c) => {
  send({
    type: "sample",
    payload: {
      message: "Hello from the test cron job!",
    },
  });
  return c.json({ message: "Cron job triggered" }, 200);
});

app.openapi(userRoute, async (c) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  return c.json(users, 200);
});

app.route("/", authApp);
app.route("/", accountApp);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    c.var.logger?.warn(err, "Unhandled HTTP error occurred");
    return c.json({ message: err.message }, err.status);
  }
  c.var.logger?.error(err, "Unhandled server error occurred");
  return c.json({ message: "Internal Server Error" }, 500);
});

export const openAPIConfig: OpenAPIObjectConfig = {
  openapi: "3.0.0",
  info: {
    title: "Super Duper API",
    version: "1.0.0",
    description:
      "This is a sample API to demonstrate OpenAPI with Hono and Zod.",
  },
};

app.doc("/doc", openAPIConfig);

app.get("/scalar", Scalar({ url: "/api/doc" }));

export default app;
