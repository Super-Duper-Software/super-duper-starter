import { fileURLToPath } from "node:url";

export const main = async (message: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Jobs package works!");
  console.log("Message:", message);
};

if (import.meta.url && process.argv[1] === fileURLToPath(import.meta.url)) {
  main("Test message");
}
