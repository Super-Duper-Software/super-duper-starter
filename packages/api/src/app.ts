import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

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

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Super Duper API",
  },
});

app.get("/scalar", Scalar({ url: "/api/doc" }));

export default app;
