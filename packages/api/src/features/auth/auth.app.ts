import { createHono } from "../../hono";
import { signUpApp } from "./signUp/signUp.app";

export const authApp = createHono().basePath("/auth").route("/", signUpApp);
