import { Application, Router } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import { login, auth, guest } from "./routes.ts";
import authMiddleware from "./authMiddleware.ts";

const router = new Router();

// Set up router with various handlers (imported)
router
  .post("/login", login)
  .get("/guest", guest)
  .get("/auth", authMiddleware, auth);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
console.log("Started on port: 8000");
