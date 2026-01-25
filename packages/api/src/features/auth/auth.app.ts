import { createHono } from "../../hono";
import { signInApp } from "./signIn/signIn.app";
import { signOutApp } from "./signOut/signOut.app";
import { signUpApp } from "./signUp/signUp.app";

export const authApp = createHono()
  .basePath("/auth")
  .route("/", signUpApp)
  .route("/", signInApp)
  .route("/", signOutApp);
