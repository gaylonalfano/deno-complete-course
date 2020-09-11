import { serve } from "https://deno.land/std@0.62.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.62.0/http/file_server.ts";

const server = serve({ port: 8000 });
console.log("http://localhost:8000/");

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch (e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}

// Infinite for loop handling all requests coming in
for await (const req of server) {
  const path = `${Deno.cwd()}/public${req.url}`;
  // check if public file exists
  if (await fileExists(path)) {
    // return content of the file
    const content = await serveFile(req, path);
    req.respond(content);
    // Continue on so the following code won't be executed for this request
    continue;
  }

  // If no local/public file path exists then we handle these routes
  if (req.url === "/") {
    req.respond({ body: "Home" });
  } else if (req.url === "/about") {
    req.respond({ body: "About" });
  } else {
    // Note: If content doesn't exist then server crashes!
    // Therefore need to use try/catch
    try {
    } catch (e) {}
  }
}
