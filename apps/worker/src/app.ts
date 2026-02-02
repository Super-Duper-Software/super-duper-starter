import { zValidator } from "@hono/zod-validator";
import { main as sampleMain } from "@superdupersoftware/jobs/sample";
import { logger } from "@superdupersoftware/logger";
import { verify } from "@superdupersoftware/messages";
import { z } from "zod";
import { createHono } from "./hono";

const workerApp = createHono();

workerApp.post(
  "/",
  zValidator(
    "json",
    z.object({
      jobType: z.string(),
    }),
  ),
  async (c) => {
    try {
      const isValid = await verify({
        signature: c.req.header("Upstash-Signature") || "",
        body: await c.req.raw.clone().text(),
      });
      if (!isValid) {
        return c.json({ message: "Invalid signature" }, 401);
      }
      const { jobType } = await c.req.valid("json");
      switch (jobType) {
        case "sample":
          await sampleMain();
          return c.json({ message: "Sample job executed successfully" });
        default:
          return c.json({ message: "Unknown job type" }, 400);
      }
    } catch (error) {
      logger.error(error, "Error processing job");
      return c.json({ message: "Error verifying signature" }, 500);
    }
  },
);

export default workerApp;
