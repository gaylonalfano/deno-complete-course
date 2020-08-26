import { assertEquals, assertNotEquals } from "../test_deps.ts";

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
  sanitizeOps: false, // false Deno will ignore this leak check
  fn() {
    setTimeout(console.log, 10000);
  },
});

// Resources leak
Deno.test({
  name: "Resources leak",
  sanitizeResources: false, // Deno will ignore this leak check
  async fn() {
    await Deno.open("./models/planets.ts");
  },
});

// ====== Tests for our planets.ts after refactoring
import { filterHabitablePlanets } from "./planets.ts";

// Let's create a dummy earth Planet for testing
// Our function should return this Planet after filtering
const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

// Let's create a dummy bad Planet that will be filtered out
const NOT_CONFIRMED = {
  // Only need to check disposition since it's the first
  koi_disposition: "FALSE POSITIVE",
};

const TOO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};

Deno.test("filter only habitable planets", () => {
  // Simulate passing a list of Planets to our filter function
  const filteredPlanets = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_PLANETARY_RADIUS,
    TOO_LARGE_SOLAR_MASS,
    TOO_LARGE_SOLAR_RADIUS,
  ]);

  assertEquals(filteredPlanets, [HABITABLE_PLANET]);
});
