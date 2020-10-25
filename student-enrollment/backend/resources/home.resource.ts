import { Drash } from "../deps.ts";

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    // this.response.body = "Hello Drash!";
    // Can use Drash's this.response.render() for HTML (similar to Oaks's send())
    // Saves reading, decoding and displaying the content
    // https://youtu.be/oTH8WZbRC8w?t=167
    this.response.body = this.response.render("/index.html");

    return this.response;
  }
}
