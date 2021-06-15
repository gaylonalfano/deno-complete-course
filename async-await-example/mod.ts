async function loadData() {
  // Example of making multiple fetch requests concurrently
  // and then resolving using Promise.all()
  // https://youtu.be/_9vgd9XKlDQ?t=965
  try {
    const url1 = "https://jsonplaceholder.typicode.com/todos/1";
    const url2 = "https://jsonplaceholder.typicode.com/todos/2";
    const url3 = "https://jsonplaceholder.typicode.com/todos/3";

    const results = await Promise.all([
      fetch(url1),
      fetch(url2),
      fetch(url3),
    ]);

    const dataPromises = results.map((result: Response) => result.json());
    const finalData = await Promise.all(dataPromises);
    console.log("finalData: ", finalData);
    return finalData;
  } catch (error) {
    console.error(error.message);
  }
}

// Execute top-level async using IIFE
// NOTE Node 14.8+ doesn't need this.
// Q: What about Deno?
// A: Works without IIFE! Nice!
// (async () => {
//   const data = await loadData();
//   console.log(data);
// });
await loadData();
