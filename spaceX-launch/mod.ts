/* async function downloadLaunchData() { */
/*   const response = await fetch("https://api.spacexdata.com/v3/launches", { */
/*     method: "GET", */
/*   }); */

/*   const launchData = await response.json(); */
/*   console.log(launchData); */
/* } */

/* await downloadLaunchData(); */

async function postRequest() {
  const url: string = "https://reqres.in/api/users";
  const opts: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      name: "Elon Musk",
      job: "billionaire",
    }),
  };
  const response = await fetch(url, opts);
  const result = await response.json();

  return result;
}

console.log(await postRequest());

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
