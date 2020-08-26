import { log, join, parse, BufReader, pick } from "../deps.ts";

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

// Refactor
export function filterHabitablePlanets(planets: Array<Planet>) {
  return planets.filter((planet: Planet) => {
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
}

async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, { header: true, comment: "#" });
  Deno.close(file.rid);

  // Use our new refactored function but on the result of parsing CSV
  const planets = filterHabitablePlanets(result as Array<Planet>);

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
log.info(`${planets.length} habitable planets found!`);

/* Now we need a way to access this planets db. This represents our data access layer */
/* Meaning the way our API accesses the data we get back from our CSV */
export function getAllPlanets() {
  return planets;
}
