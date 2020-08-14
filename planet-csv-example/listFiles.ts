const path = "/Users/gaylonalfano/Code/deno-complete-course/intro";

/* async function listPathFiles = (path: string): void => { */
/*   for await (const dirEntry of Deno.readDir(path)) { */
/*     console.log(dirEntry.name);} */
/* } */

for await (const dirEntry of Deno.readDir(path)) {
  console.log(dirEntry.name);
}

for (const dirEntry of Deno.readDirSync(Deno.cwd())) {
  console.log(dirEntry.name);
}
