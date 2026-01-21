import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/", (c) =>
  c.json({
    message: "Up and running!",
  }),
);

export default app;
