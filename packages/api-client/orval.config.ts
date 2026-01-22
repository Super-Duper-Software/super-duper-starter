import { defineConfig } from "orval";

export default defineConfig({
  fetch: {
    output: {
      target: "src/generated/fetch.ts",
      client: "fetch",
      baseUrl: "http://localhost:3000",
    },
    input: {
      target: "http://localhost:3000/api/doc",
    },
  },
  query: {
    output: {
      target: "src/generated/query.ts",
      client: "react-query",
      baseUrl: "http://localhost:3000",
    },
    input: {
      target: "http://localhost:3000/api/doc",
    },
  },
});
