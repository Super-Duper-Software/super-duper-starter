import { OpenAPIHono } from "@hono/zod-openapi";
import { signUpApp } from "./signUp/signUp.app";

export const authApp = new OpenAPIHono()
  .basePath("/auth")
  .route("/", signUpApp);
