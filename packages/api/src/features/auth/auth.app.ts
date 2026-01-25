import { createHono } from "../../hono";
import { signInApp } from "./signIn/signIn.app";
import { signUpApp } from "./signUp/signUp.app";

export const authApp = createHono()
  .basePath("/auth")
  .route("/", signUpApp)
  .route("/", signInApp);
