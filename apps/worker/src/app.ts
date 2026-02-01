import { main } from "@superdupersoftware/jobs/sample";
import { createHono } from "./hono";

const workerApp = createHono();

workerApp.get("/sample", async (c) => {
  await main();
  return c.json({ message: "Sample job executed successfully" });
});

export default workerApp;
