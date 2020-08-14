export function denode(input: string) {
  if (input.toLowerCase() === "node") {
    return input.split("").sort().join("");
  }
  return input;
}
