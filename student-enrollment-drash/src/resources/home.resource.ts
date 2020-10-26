import { Drash } from "../deps.ts";

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/", "/:vuetwitter?", "/:staticjs?"];

  public GET() {
    // Can use Drash's this.response.render() for HTML (similar to Oaks's send())
    // Saves reading, decoding and displaying the content
    // https://youtu.be/oTH8WZbRC8w?t=167
    const vuetwitter: string | null = this.request.getPathParam("vuetwitter");
    const staticjs: string | null = this.request.getPathParam("staticjs");

    // ===== WORKING Example (just comment out one or the other render)
    try {
      // STATIC/BASIC Drash example:
      // this.response.body = this.response.render("/staticjs.html");

      // VUE TWITTER CLIENT SIDE RENDER example:
      // Using raw Deno - **ERROR** for some reason...
      // let fileContentsRaw = Deno.readFileSync("../public/views/vue_index.html");
      // let template = new TextDecoder().decode(fileContentsRaw);
      // this.response.body = template;
      // Using helper function - **WORKS** Configured with view_path in server
      // this.response.body = this.response.render("/vuetwitter.html");

      // VUE STUDENTS CLIENT SIDE RENDER example:
      this.response.body = this.response.render("/vuestudents.html")
    } catch (error) {
      throw new Drash.Exceptions.HttpException(
        400,
        `Error reading HTML template.`
      );
    }
    return this.response;


    // ===== BROKEN attempt at loading different pages:
    // try {
    //   if (staticjs) {
    //     // STATIC/BASIC Drash example:
    //     this.response.body = this.response.render("/staticjs.html");
    //   } else if (vuetwitter) {
    //     // VUE CLIENT SIDE RENDER example:
    //     // Using raw Deno - **ERROR** for some reason...
    //     // let fileContentsRaw = Deno.readFileSync("../public/views/vue_index.html");
    //     // let template = new TextDecoder().decode(fileContentsRaw);
    //     // this.response.body = template;

    //     // Using helper function - **WORKS** Configured with view_path in server
    //     this.response.body = this.response.render("/vuetwitter.html");
    //   } else {
    //     this.response.body = "Hello Drash!";
    //   }
    // } catch (error) {
    //   throw new Drash.Exceptions.HttpException(
    //     400,
    //     `Error reading HTML template.`
    //   );
    // }
    // return this.response;
  }
}
