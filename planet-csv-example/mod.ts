import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
/* import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js"; */
/* import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js"; */
import { pick } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

// Define TS interface for planet
// Going to use this interface in a Type Assertion for 'result' Array
interface Planet {
  // Each Planet can be indexed with a key that is a string (eg planet["some_key"])
  // CSV is all 'string' values so need to convert to Number for filter below.
  [key: string]: string;
}

async function loadPlanetsData() {
  const path = join(".", "kepler_exoplanets_nasa.csv");
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
    // Print out the results
    console.log(
      pick(planet, [
        "koi_prad",
        "koi_smass",
        "koi_srad",
        "koi_time0bk",
        "koi_period",
        "kepler_name",
        "koi_count",
        "koi_steff",
      ])
    );
    /* return pick(planet, [ */
    /*   "koi_prad", */
    /*   "koi_smass", */
    /*   "koi_srad", */
    /*   "koi_time0bk", */
    /*   "koi_period", */
    /*   "kepler_name", */
    /*   "koi_count", */
    /*   "koi_steff", */
    /* ]); */
  });
}

await loadPlanetsData();

/* const newEarths = await loadPlanetsData(); */
/* for (const planet of newEarths) { */
/*   console.log(planet); */
/*   // Below: without lodash.pick() function have to manually select keys */
/*   /1* console.log( *1/ */
/*   /1*   planet["kepler_name"], *1/ */
/*   /1*   planet["kepoi_name"], *1/ */
/*   /1*   planet["koi_prad"], *1/ */
/*   /1*   planet["koi_smass"], *1/ */
/*   /1*   planet["koi_srad"] *1/ */
/*   /1* ); *1/ */
/* } */
/* console.log(`${newEarths.length} habitable planets found!`); */

/* const orbitTimes: Array<number> = []; */
/* for (const planet of newEarths) { */
/*   orbitTimes.push(planet['koi_period']); */
/* } */
/* const minOrbit: number = Math.min(...orbitTimes); */

/* console.log(orbitTimes); */
/* console.log(minOrbit); */
/* // Basic example of reading a text file */
/* /1* async function readFile() { *1/ */
/* /1*   const path = join("text-files", "hello.txt"); *1/ */
/* /1*   const data = await Deno.readTextFile(path); *1/ */
/* /1*   console.log(data); *1/ */
/* /1* } *1/ */

/* /1* await readFile(); *1/ */
