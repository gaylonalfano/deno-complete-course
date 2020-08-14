/* async function downloadLaunchData() { */
/*   const response = await fetch("https://api.spacexdata.com/v3/launches", { */
/*     method: "GET", */
/*   }); */

/*   const launchData = await response.json(); */
/*   console.log(launchData); */
/* } */

/* await downloadLaunchData(); */


async function postRequest() {
  const response = await fetch("https://reqres.in/api/users",
                                method: "POST",
                                body: {
                                  name: "Elon Musk",
                                  job: "billionaire"
                                },
                              )
}
