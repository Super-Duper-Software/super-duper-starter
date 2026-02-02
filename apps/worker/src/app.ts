import { zValidator } from "@hono/zod-validator";
import { main as sampleMain } from "@superdupersoftware/jobs/sample";
import { logger } from "@superdupersoftware/logger";
import { MessageDataSchema, verify } from "@superdupersoftware/messages";
import { createHono } from "./hono";

const workerApp = createHono();

workerApp.post("/", zValidator("json", MessageDataSchema), async (c) => {
  try {
    const isValid = await verify({
      signature: c.req.header("Upstash-Signature") || "",
      body: await c.req.text(),
    });
    if (!isValid) {
      return c.json({ message: "Invalid signature" }, 401);
    }
    const message = c.req.valid("json");
    switch (message.type) {
      case "sample":
        await sampleMain(message.payload.message);
        return c.json({ message: "Sample job executed successfully" });
      case "notification":
        logger.info(
          { title: message.payload.title, body: message.payload.body },
          "Notification received",
        );
        return c.json({ message: "Notification processed successfully" });
      default:
        return c.json({ message: "Unknown job type" }, 400);
    }
  } catch (error) {
    logger.error(error, "Error processing job");
    return c.json({ message: "Error verifying signature" }, 500);
  }
});

export default workerApp;
