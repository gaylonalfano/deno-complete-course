// @ts-nocheck
let launches = [];

const numberHeading = "No.".padStart(5);
const dateHeading = "Date".padEnd(15);
const missionHeading = "Mission".padEnd(25);
const rocketHeading = "Rocket".padEnd(22);
const targetHeading = "Destination";
const customersHeading = "Customers";

function initValues() {
  const today = new Date().toISOString().split("T")[0];
  launchDaySelector = document.getElementById("launch-day");
  launchDaySelector.setAttribute("min", today);
  launchDaySelector.setAttribute("value", today);
}

function loadLaunches() {
  // TODO: Once API is ready.
  // Load launches and sort by flight number.
}

async function loadPlanets() {
  // TODO: Once API is ready.
  // // Quick mock up of the frontend functionality
  // const planets = [
  //   {
  //     id: 1,
  //     kepler_name: "Hyperion",
  //   },
  //   {
  //     id: 2,
  //     kepler_name: "Laconia",
  //   },
  // ];

  // TODO: Let's see if we can fetch planets from /planets endpoint now
  return await fetch("/planets")
    // take the body of the response and parse as JSON
    .then((planetsResponse) => planetsResponse.json())
    // Iterate through the JSON object series of planets
    .then((planets) => {
      // Render our HTML using vanilla JS.
      const planetSelector = document.getElementById("planets-selector");
      planets.forEach((planet) => {
        planetSelector.innerHTML += `<option value="${planet.kepler_name}">${planet.kepler_name}</option>`;
      });
    });
}

function abortLaunch() {
  // TODO: Once API is ready.
  // Delete launch and reload launches.
}

function submitLaunch() {
  const target = document.getElementById("planets-selector").value;
  const launchDate = new Date(document.getElementById("launch-day").value);
  const mission = document.getElementById("mission-name").value;
  const rocket = document.getElementById("rocket-name").value;
  // Use '?' optional chaining and || to give default of 1
  const flightNumber = launches[launches.length - 1]?.flightNumber + 1 || 1;

  // TODO: Once API is ready.
  // Submit above data to launch system and reload launches.
  // Mock up a launch object
  const launch = {
    destination_planet: target,
    launch_date: launchDate,
    mission_name: mission,
    rocket_type: rocket,
    flight_number: flightNumber,
    customers: ["NASA", "ZTM"],
    upcoming: true,
  };

  // Need an onclick event handler to append to launches
  // Add the launch object to launches
  launches.push(launch); // return???

  // Show the launch-success message by unhiding the element
  document.getElementById("launch-success").hidden = false;
}

function listUpcoming() {
  const upcomingList = document.getElementById("upcoming-list");
  upcomingList.innerHTML = `<div class="list-heading">${numberHeading} ${dateHeading} ${missionHeading} ${rocketHeading} ${targetHeading}</div>`;
  launches
    .filter((launch) => launch.upcoming)
    .forEach((launch) => {
      const launchDate = new Date(launch.launchDate * 1000).toDateString();
      const flightNumber = String(launch.flightNumber).padEnd(3);
      const mission = launch.mission.slice(0, 25).padEnd(25);
      const rocket = launch.rocket.padEnd(22);
      const target = launch.target ?? "";
      upcomingList.innerHTML += `<div class="list-item"><a class="delete" onclick="abortLaunch(${launch.flightNumber})">✖</a> ${flightNumber} <span class="silver">${launchDate}</span> ${mission} <span class="silver">${rocket}</span> <span class="gold">${target}</span></div>`;
    });
}

function listHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = `<div class="list-heading">${numberHeading} ${dateHeading} ${missionHeading} ${rocketHeading} ${customersHeading}</div>`;
  launches
    .filter((launch) => !launch.upcoming)
    .forEach((launch) => {
      const success = launch.success
        ? `<span class="success">█</span>`
        : `<span class="failure">█</span>`;
      const launchDate = new Date(launch.launchDate * 1000).toDateString();
      const flightNumber = String(launch.flightNumber).padEnd(3);
      const mission = launch.mission.slice(0, 25).padEnd(25);
      const rocket = launch.rocket.padEnd(22);
      const customers = launch.customers.join(", ").slice(0, 27);
      historyList.innerHTML += `<div class="list-item">${success} ${flightNumber} <span class="silver">${launchDate}</span> ${mission} <span class="silver">${rocket}</span> ${customers}</div>`;
    });
}

function navigate(navigateTo) {
  const pages = ["history", "upcoming", "launch"];
  document.getElementById(navigateTo).hidden = false;
  pages
    .filter((page) => page !== navigateTo)
    .forEach((page) => {
      document.getElementById(page).hidden = true;
    });
  document.getElementById("launch-success").hidden = true;

  if (navigateTo === "upcoming") {
    loadLaunches();
    listUpcoming();
  } else if (navigateTo === "history") {
    loadLaunches();
    listHistory();
  }
}

window.onload = () => {
  initValues();
  loadLaunches();
  loadPlanets();
};
