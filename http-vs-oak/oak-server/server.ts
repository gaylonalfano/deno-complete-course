import { Application, Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { staticFileMiddleware } from "./staticFileMiddleware.ts";

const app = new Application();

const router = new Router();

router
  .get("/", (ctx) => {
    console.log(ctx.request.url);
    console.log(ctx.request.headers.get("host"));
    // 1. TEXT
    // ctx.response.body = "Home";
    // ctx.response.body = ctx.request.headers.get("user-agent");
    // 2. To send as HTML need to update type to text/html
    // ctx.response.type = "text/html";
    // ctx.response.body = "<h1>Home HTML</h1>";
    // 3. To send as JSON need to update type to application/json
    // ctx.response.type = "application/json";
    // ctx.response.body = { msg: "Message as JSON" };
    // 4. Random properties
    ctx.response.body = ctx.request.originalRequest;
  })
  .get("/about", (ctx) => {
    ctx.response.body = "About";
  });

// Add our staticFileMiddleware
app.use(staticFileMiddleware);

// register our router-defined middleware
app.use(router.routes());
// Use allowedMethods to automatically show what routes and methods
// we support and send back specific status codes
app.use(router.allowedMethods());

// Add event listener since app extends the EventType interface like browser
app.addEventListener("listen", () => {
  console.log("Server started");
});

await app.listen({ port: 8000 });
