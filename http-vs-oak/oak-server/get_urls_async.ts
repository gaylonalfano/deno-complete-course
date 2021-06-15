import websites from "./urls.ts";

// for (const site in websites) {
//   console.log(websites[site]);
// }

const response = await fetch(websites[0]);
console.log(response);
