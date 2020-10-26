import { Drash } from "./deps.ts";

import HomeResource from "./resources/home.resource.ts";
import StudentResource from "./resources/student.resource.ts";
import FileResource from "./resources/file.resource.ts";

// ===== SINGLE DIRECTORY (/backend/public) **WORKS**
// TODO Add logger middleware: https://github.com/drashland/deno-drash-realworld-example-app/blob/330bc0ea52875b0b61af85baea903942db24fe53/src/app.ts
const server = new Drash.Http.Server({
  response_output: "text/html",
  resources: [HomeResource, StudentResource, FileResource],
  directory: ".", // "/path/to/DRASH/project"
  static_paths: ["/public"], // **Routes this path to any client i.e., makes it publicly available
  views_path: "./public/views",
});
await server.run({
  hostname: "localhost",
  port: 1447,
});
console.log(`Server running on http://${server.hostname}:${server.port}`);

// ===== MONOREPO (/backend + /frontend/public) **BROKEN**
// const server = new Drash.Http.Server({
//   response_output: "text/html",
//   resources: [HomeResource, StudentResource, FileResource],
//   // directory: "../frontend", // "/path/to/your/DRASH/project"
//   // static_paths: ["/src"], // ["/public"] - **Routes this path to any client i.e., makes it publicly available
//   // views_path: "./src/views", // ["./public/views"]
//   // NOTE: It may require /path/to/your/DRASH/project (ie /backend)
//   directory: ".",
//   static_paths: ["../frontend/public"],
//   views_path: "../frontend/public/views",
// });
