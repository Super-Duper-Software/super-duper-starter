import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { prisma, UserResultSchema } from "@superdupersoftware/db";

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

const app = new OpenAPIHono({
  strict: true,
}).basePath("/api");

app.openapi(route, (c) =>
  c.json({
    message: "Up and running!",
  }),
);

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
