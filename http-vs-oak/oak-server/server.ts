import { Application, Router } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import { staticFileMiddleware } from "./staticFileMiddleware.ts";

const app = new Application();

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Home";
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
