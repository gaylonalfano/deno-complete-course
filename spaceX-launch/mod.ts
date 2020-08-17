/* ======= Logging */
import * as log from "https://deno.land/std/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

/* Let's use a Map k:v pairs where k is string or symbol */
/* Objects' keys are strings or symbols. Map keys can be functions! */
/* Maps are also ordered collections. */
interface Launch {
  flightNumber: number;
  mission: string;
}
const launches = new Map<number, Launch>();

/* Set up a default/basic logger to the console */
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    // configure default logger available via short-hand methods above
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

async function downloadLaunchData() {
  log.info("Downloading launch data...");
  log.warning("THIS IS A WARNING!");
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  /* Check if our request was successful */
  if (!response.ok) {
    log.warning("Problem downloading launch data.");
    throw new Error("Launch data download failed.");
  }
  const launchData = await response.json();
  /* console.log(launchData); */

  /* Let's go over the launch data and store within our launches Map */
  for (const launch of launchData) {
    /* Create a new var for storying customers data using lodash _.flatMap() */
    const payloads = launch["rocket"]["second_stage"]["payloads"];
    /* const customers = _.flatMap(payloads, (payload) => payload["customers"]); */
    const customers = _.flatMap(payloads, (payload: any) => {
      return payload["customers"];
    });

    /* Create a new object to store the data we want */
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers: customers,
    };
    /* Add our flightData to our Map */
    /* launches.set(flightData.flightNumber, flightData.mission); */
    launches.set(flightData.flightNumber, flightData);

    /* Let's see what we fetched from the API using log.info() */
    /* flightData is an Object so need to turn into a string using JSON.stringify() */
    log.info(JSON.stringify(flightData));
  }
}

if (import.meta.main) {
  await downloadLaunchData();
  /* Let's see meta data for when this module is imported and ran from command line */
  /* This gives us context on how this module is being executed */
  log.info(JSON.stringify(import.meta));
  /* Say we wanted to print the number of launches we retrieved */
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
}

/* /1* My own custom POST solution *1/ */
/* async function postRequest() { */
/*   const url: string = "https://reqres.in/api/users"; */
/*   const opts: RequestInit = { */
/*     method: "POST", */
/*     headers: { */
/*       "Content-Type": "application/json; charset=UTF-8", */
/*     }, */
/*     body: JSON.stringify({ */
/*       name: "Elon Musk", */
/*       job: "billionaire", */
/*     }), */
/*   }; */
/*   const response = await fetch(url, opts); */
/*   const result = await response.json(); */

/*   return result; */
/* } */

/* console.log(await postRequest()); */

/* /1* POST Solution *1/ */
/* const response = await fetch("https://reqres.in/api/users", { */
/*   method: "POST", */
/*   headers: { */
/*     "Content-Type": "application/json; charset=UTF-8", */
/*   }, */
/*   body: JSON.stringify({ */
/*     name: "Elon Musk", */
/*     job: "billionaire", */
/*   }), */
/* }); */

/* /1* Use our new response *1/ */
/* const body = await response.json(); */

/* console.log(body); */
