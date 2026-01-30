import { HTTPException } from "hono/http-exception";
import type { Context } from "../hono";

export const getUser = (c: Context) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return user;
};
