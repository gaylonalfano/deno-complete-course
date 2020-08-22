import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

// Long-form syntax
Deno.test({
  name: "example test",
  ignore: Deno.build.os === "linux", // or "windows", "darwin"
  fn() {
    assertEquals("deno", "deno");
    assertNotEquals(
      {
        runtime: "deno",
      },
      {
        runtime: "node",
      }
    );
  },
});

// Short-hand syntax
Deno.test("Short-hand syntax test", () => {
  assertEquals("deno", "deno");
  assertNotEquals(
    {
      runtime: "deno",
    },
    {
      runtime: "node",
    }
  );
});

// Ops leak
Deno.test({
  name: "ops leak",
  sanitizeOps: false, // Deno will ignore this leak check
  fn() {
    setTimeout(console.log, 10000);
  },
});

// Resources leak
Deno.test({
  name: "Resources leak",
  /* sanitizeResources: false,  // Deno will ignore this leak check */
  async fn() {
    await Deno.open("./models/planets.ts");
  },
});
