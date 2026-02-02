import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cac from "cac";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cli = cac();

cli.command("<job>", "Run a job").action(async (job) => {
  const { execa } = await import("execa");

  const jobPath = path.join(__dirname, `${job}.ts`);
  console.log(`Running job "${job}" at path: ${jobPath}`);

  if (!fs.existsSync(jobPath)) {
    console.error(`Job "${job}" does not exist at path: ${jobPath}`);
    process.exit(1);
  }

  try {
    await execa("tsx", [jobPath], {
      stdio: "inherit",
    });
  } catch (error) {
    console.error(`Failed to run job "${job}":`, error);
    process.exit(1);
  }
});

cli.help();

cli.parse();
