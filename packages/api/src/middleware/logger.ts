import { type Logger, logger } from "@superdupersoftware/logger";
import type { MiddlewareHandler } from "hono";
import type { Context, Env } from "../hono";

export function createRequestLogger(c: Context, requestId?: string): Logger {
  return logger.child({
    reqId: requestId,
    method: c.req.method,
    url: c.req.url,
    path: c.req.path,
  });
}

export function loggerMiddleware(): MiddlewareHandler<Env> {
  return async (c, next) => {
    const requestId = c.get("requestId");
    const reqLogger = createRequestLogger(c, requestId);

    c.set("logger", reqLogger);
    reqLogger.info("Request started");

    await next();
  };
}
