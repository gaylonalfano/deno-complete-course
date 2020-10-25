// https://www.youtube.com/watch?v=8IQGx8qIeu8
import { Drash } from "../deps.ts";

export default class FileResource extends Drash.Http.Resource {
  static paths = ["/files/:nameOne/:nameTwo?/:nameThree?"];
  public GET() {
    // Ex. Takes the filepath from the request url and then reads
    // the contents of some files (e.g., you have a 'files' dir with files)
    const path = this.request.url_path;
    const fileContents = new TextDecoder().decode(
      Deno.readFileSync("." + path)
    );
    this.response.body = fileContents;
    return this.response;
  }
}
