import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

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

const app = new OpenAPIHono().basePath("/api");

app.openapi(route, (c) =>
  c.json({
    message: "Up and running!",
  }),
);

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
