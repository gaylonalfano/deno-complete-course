import { Context } from "https://deno.land/x/oak@v6.1.0/mod.ts";
import users from "./users.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt@v1.2/create.ts";
import key from "./key.ts";

// Start building the key, header, and payload required for JWT
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const login = async (ctx: Context) => {
  // Let's extract the data from the request to implement login functionality
  // Use request.body() to parse body and convert to JSON
  // body() parses based on "Content-Type" in request headers
  const body = ctx.request.body();
  const data = await body.value;
  /* const { value } = await ctx.request.body(); */
  console.log(data);

  // Now let's search for the user within our users Array
  for (const user of users) {
    // Check if this is the correct user to authenticate
    // NOTE: Normally have more sophisticated set up.
    if (data.username === user.username && data.password === user.password) {
      // We now know the user is authenticated so we need to create the JWT token
      // and send it to the user. Going to use Deno djwt module.
      // We need key, payload, and header to make a JWT.
      // We'll send username and password as payload:
      const payload: Payload = {
        iss: user.username, // issuer
        exp: setExpiration(60), // expiration date 1 minute
      };

      // Now let's make the JWT using makeJwt({object}). Returns JWT string
      // NOTE: Must use await! Otherwise jwt will come back empty.
      const jwt = await makeJwt({ key, header, payload });
      if (jwt) {
        // Send the authenticate response to user
        ctx.response.status = 200;
        ctx.response.body = {
          id: user.id,
          username: user.username,
          jwt: jwt,
        };
      } else {
        // Send error message in response
        ctx.response.status = 500;
        ctx.response.body = {
          message: "Internal server error",
        };
      }
    }
    // Stop/break the for loop
    return;
  }

  // Return a validation failed response
  ctx.response.status = 422;
  ctx.response.body = {
    message: "Invalid username or password",
  };
};

export const guest = (ctx: Context) => {
  ctx.response.body = "GUEST Success";
};

export const auth = (ctx: Context) => {
  ctx.response.body = "AUTH Success";
};
