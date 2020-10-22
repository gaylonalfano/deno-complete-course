import { join, BufReader, parse } from "./deps.ts";

interface Student {
  // Each Student can be (should) indexed with a key (eg student["some_key"])
  // CSV is all 'string' so need to convert to number for filtering later
  [key: string]: string;
}

async function loadStudentsData() {
  const path = join("./data", "20200901_Active_Students.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  // parse used to have 'headers' prop. Now it's skipFirstRow: boolean
  const result = await parse(bufReader, { skipFirstRow: true });
  Deno.close(file.rid);

  console.log(result);
}

// Test it out
await loadStudentsData();
