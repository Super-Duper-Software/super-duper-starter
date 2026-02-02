import { env } from "@superdupersoftware/env";
import { MailService } from "@superdupersoftware/mail";
import type { MiddlewareHandler } from "hono";
import type { Env } from "../hono";

const mailService = new MailService({
  resendApiKey: env.RESEND_API_KEY,
  smtpHost: env.SMTP_HOST,
  smtpPort: env.SMTP_PORT,
  fromEmail: env.MAIL_FROM_EMAIL,
  fromName: env.MAIL_FROM_NAME,
});

export function mailMiddleware(): MiddlewareHandler<Env> {
  return async (c, next) => {
    c.set("mailService", mailService);
    await next();
  };
}
