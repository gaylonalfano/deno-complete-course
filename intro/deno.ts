const food: string = Deno.args[0];
const parent: string = Deno.args[1];

if (food === "love" && parent === "ryan") {
  console.log("Deno is born!");
} else {
  console.log("This egg needs some love");
}

setTimeout(() => {
  console.log("check");
  console.table(Deno.metrics());
}, 1000);

