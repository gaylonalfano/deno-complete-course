import { Drash } from "../deps.ts";

export default class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];

  public GET() {
    this.response.body = "Hello Drash!";
    return this.response;
  }
}
