import { fileURLToPath } from "node:url";

export const main = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Jobs package works!");
};

if (import.meta.url && process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
