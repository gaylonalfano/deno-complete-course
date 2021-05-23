// Standard Library
export * as log from "https://deno.land/std@0.97.0/log/mod.ts";
export { join } from "https://deno.land/std@0.97.0/path/mod.ts";

// Third-party
export {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v7.5.0/mod.ts";
// Enable CORS - Oak doesn't seem to have MW like FastAPI
export { oakCors } from "https://deno.land/x/cors/mod.ts";
