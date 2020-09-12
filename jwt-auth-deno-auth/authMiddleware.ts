import { Context } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt@v1.2/validate.ts";
import key from "./key.ts";

const authMiddleware = async (ctx: Context, next: Function) => {
  // Check if this middleware function is called
  console.log("AUTH Middleware");

  // Let's retrieve the 'Authorization' headers so we can extract
  // the Bearer JWT and validate if it's valid
  const headers: Headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  // Check if authorization wasn't sent
  if (!authorization) {
    ctx.response.status = 401;
    // Immediately return so we do NOT continue
    return;
  }

  // Extract actual JWT from "Bearer jwtstringhere"
  // You can see on Value of Authorization
  const jwt = authorization.split(" ")[1];
  // Check if jwt doesn't exist
  if (!jwt) {
    ctx.response.status = 401;
    // Immediately return so we do NOT continue
    return;
  }
  // If jwt does indeed exist we call validateJwt() from djwt module
  // The key is used to decrypt the jwt. Returns a Promise<JwtValidation>
  const validatedJwt = await validateJwt({
    jwt,
    key,
    algorithm: "HS256",
  });
  if (validatedJwt.isValid) {
    // It was successfully decrypted so we can call next() middleware
    await next(); // call auth() endpoint
    return;
  } else {
    ctx.response.status = 401;
    ctx.response.body = {
      message: "JWT is invalid!",
    };
  }
};

// Export as default
export default authMiddleware;
