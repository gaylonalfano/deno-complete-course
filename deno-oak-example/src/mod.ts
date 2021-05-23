// NOTE This is also referred as server.ts
import { Application, Router, oakCors } from "./deps.ts";
// Enable CORS - Oak doesn't seem to have MW like FastAPI

const app = new Application();

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Home";
  })
  .get("/deno", (ctx) => {
    // ctx.response.body = { api: "Deno" };  // response.json() => {api: "Deno"}
    // ctx.response.body = "Deno";  // ReadableStream on FE
    (ctx.response.type = "text/html"), // NOTE Must set type for returning HTML
      (ctx.response.body = "<h3>Deno HTML</h3>"); // Works if I await response.text()
  })
  .get("/denoemail", (ctx) => {
    // === Returning JSON that will then hit FastAPI POST endpoint to add to Airtable
    ctx.response.body = { email: "email_from_deno_api_response_body@abc.com" };
  });

// Enable CORS for all routes by using oakCors()
app.use(
  oakCors({
    origin: "http://localhost:3000", // Vue app
    optionsSuccessStatus: 200,
  })
);

// Add our staticFileMiddleware
// app.use(staticFileMiddleware);

// register our router-defined middleware
app.use(router.routes());
// Use allowedMethods to automatically show what routes and methods
// we support and send back specific status codes
app.use(router.allowedMethods());

// Add event listener since app extends the EventType interface like browser
app.addEventListener("listen", () => {
  console.log("CORS-Enabled web server listening on port 5000");
});

await app.listen({ port: 5000 });
