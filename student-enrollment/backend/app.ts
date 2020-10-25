import { Drash } from "./deps.ts";

import HomeResource from "./resources/home.resource.ts";
import StudentResource from "./resources/student.resource.ts";
import FileResource from "./resources/file.resource.ts";

const server = new Drash.Http.Server({
  response_output: "text/html",
  resources: [HomeResource, StudentResource, FileResource],
});

await server.run({
  hostname: "localhost",
  port: 1447,
});
console.log(`Server running on http://${server.hostname}:${server.port}`);
