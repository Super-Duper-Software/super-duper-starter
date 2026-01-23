import fs from "node:fs";
import app, { openAPIConfig } from "../app";

const openAPISpecJSON = app.getOpenAPI31Document(openAPIConfig);
fs.writeFileSync(
  "../api-client/openapi-spec.json",
  JSON.stringify(openAPISpecJSON, null, 2),
);
