import type { Logger } from "@superdupersoftware/logger";
import { type Context as BaseContext, Hono } from "hono";

export type Env = {
  Variables: {
    logger: Logger | null;
  };
};

export type Context = BaseContext<Env>;

export const createHono = () => new Hono<Env>();
