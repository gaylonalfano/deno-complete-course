import { log, Application, send } from "./deps.ts";

import router from "./api.ts";

const app = new Application();
const PORT = 8000;

// ===== LOGGER
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    // Configure default logger available via methods above
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

// Add event listener since app extends the EventType interface like browser
app.addEventListener("error", (event) => {
  // The final spot for error handling
  // Let's add the logging here
  log.error(event.error);
});

// Add error-handling middleware
app.use(async (ctx, next) => {
  // See if next() middleware has an error
  try {
    await next();
  } catch (error) {
    log.error(error);
    ctx.response.body = "Internal server error.";
    throw error;
  }
});

/* Add a logging middleware */
app.use(async (ctx, next) => {
  await next();
  /* We now have access to the response.headers from downstream middleware */
  const time = ctx.response.headers.get("X-Response-Time");
  log.info(`${ctx.request.method} ${ctx.request.url} ${time}`);
});

/* Measure time it takes to respond to a request */
app.use(async (ctx, next) => {
  const start = Date.now();
  /* In between these timestamps we use the power of next() */
  /* We're calling downstream MW after we start timer and once the downstream */
  /* middleware completes, we measure the delta. */
  await next();
  const delta = Date.now() - start;
  /* Let's store this delta inside the response.headers so we can extract for logging */
  /* Need to convert to template string since delta: number */
  ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

// ===== ROUTER
// Register our router-defined middleware/routes (api.ts)
// Let's use our new router for our root path
app.use(router.routes());
app.use(router.allowedMethods());

// ===== SERVE STATIC FILES (frontend website)
/* Register our static files middleware (NOT defined by our router) */
/* Serve our static files (frontend website) using send(ctx, path, options) */
/* After this we can access the site (endpoint) at localhost:8000/index.html */
app.use(async (ctx) => {
  /* define a filePath that points to the file name coming from the request */
  /* This filePath is what we're being asked for (the request) */
  const filePath = ctx.request.url.pathname;
  /* Specify which files to serve in our public dir to whitelist */
  const fileWhitelist = [
    "/index.html",
    "/images/favicon.png",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/videos/space.mp4",
  ];
  /* Security: Let's check that our filePath is within our fileWhitelist /
  /* Only then do we send the files back to the browser */
  if (fileWhitelist.includes(filePath)) {
    /* Use SendOptions interface to restrict file access to our public dir */
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

// ===== EXECUTE AS STANDALONE
/* Let's specify what to execute if ran as standalone module */
if (import.meta.main) {
  log.info(`Starting server on port ${PORT}...`);
  /* Let's get our app server started and listening to specified port */
  /* Call await because app.listen is going to be an async function */
  await app.listen({
    port: PORT,
  });
}
