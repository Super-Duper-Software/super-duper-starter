import { OpenAPIHono } from "@hono/zod-openapi";
import type { auth } from "@superdupersoftware/auth/server";
import type { Logger } from "@superdupersoftware/logger";
import type { MailService } from "@superdupersoftware/mail";
import type { Context as BaseContext } from "hono";

export type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    logger: Logger | null;
    requestId: string;
    mailService: MailService;
  };
};

export type Context = BaseContext<Env>;

export const createHono = () => new OpenAPIHono<Env>();
