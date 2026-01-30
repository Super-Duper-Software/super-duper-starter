import { OpenAPIHono } from "@hono/zod-openapi";
import type { auth } from "@superdupersoftware/auth/server";
import type { Logger } from "@superdupersoftware/logger";

type _Context = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    logger: Logger | null;
    requestId: string;
  };
};

export type Context = OpenAPIHono<_Context>;

export const createHono = () => new OpenAPIHono<_Context>();
