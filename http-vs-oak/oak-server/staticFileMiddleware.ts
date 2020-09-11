import { Context, send } from "https://deno.land/x/oak@v6.1.0/mod.ts";

export const staticFileMiddleware = async (ctx: Context, next: Function) => {
  // Check if the public file exists and return if so. Otherwise, continue to
  // call the next function so other routes start working
  const path = `${Deno.cwd()}/public${ctx.request.url.pathname}`;

  if (await fileExists(path)) {
    // Call Oak's send() function
    await send(ctx, ctx.request.url.pathname, {
      // Tell Oak this file will be served from the public folder
      root: `${Deno.cwd()}/public`,
    });
  } else {
    // If file doesn't exist call next() to allow Oak to use routes
    // configured inside server.ts
    await next();
  }
};

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
