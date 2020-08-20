import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
/* import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js"; */
/* import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js"; */
import { pick } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

/* // Define TS interface for planet */
/* // Going to use this interface in a Type Assertion for 'result' Array */
/* interface Planet { */
/*   // Each Planet can be indexed with a key that is a string (eg planet["some_key"]) */
/*   // CSV is all 'string' values so need to convert to Number for filter below. */
/*   [key: string]: string; */
/* } */
// Can also write this using a Record
type Planet = Record<string, string>;

// Define a new array/list to store our earth-like planets
let planets: Array<Planet>;

async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, { header: true, comment: "#" });
  Deno.close(file.rid);

  /* console.log(result); */

  const planets = (result as Array<Planet>).filter((planet) => {
    // Convert to Number() since CSV is all text
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return (
      planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01
    );
  });

  //  console.log(result);
  /* return planets; */
  // Use the lodash _.pick() helper function
  return planets.map((planet) => {
    return pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "koi_time0bk",
      "koi_period",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
}

/* This is our basic planets database stored in Deno's memory */
planets = await loadPlanetsData();
console.log(`${planets.length} habitable planets found!`);

/* Now we need a way to access this planets db. This represents our data access layer */
/* Meaning the way our API accesses the data we get back from our CSV */
export function getAllPlanets() {
  return planets;
}
