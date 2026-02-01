import cac from "cac";
import fs from "fs";
import path from "path";

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
