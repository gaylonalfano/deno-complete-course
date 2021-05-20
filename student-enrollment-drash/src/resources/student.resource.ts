import { Drash } from "../deps.ts";

import * as StudentModel from "../models/student.model.ts";

export default class StudentResource extends Drash.Http.Resource {
  static paths = ["/students", "/students/id/:id?", "/students/grade/:grade"];

  public GET() {
    // https://drash.land/drash/#/tutorials/resources/creating-a-resource
    // this.response.body = "GET /students request received!";
    // Path Params (alternative to URL Query Params)
    const id: string | null = this.request.getPathParam("id");
    const grade: string | null = this.request.getPathParam("grade");
    const path = this.request.url_path;
    const requestHeaders = this.request.headers.get("Accept")?.split(";");

    console.log(`Request: ${path}`);
    console.log(`Request 'Accept' headers: ${requestHeaders}`);

    // URL Query Params eg /students?grade=5 (alternative to Path Params)
    // const id: string | null = this.request.getUrlQueryParam("id");
    // const grade: string | null = this.request.getUrlQueryParam("grade");

    // prints to REQUEST/curl log
    // this.response.body += ` You passed in the following path params: |${id}|${grade}|`;
    // TODO Could add some error/exception handling logic
    // TODO Could add a log for the number of records returned

    if (grade) {
      const students = StudentModel.getAllStudentsByGrade(grade);
      console.log(`Response headers: ${this.response.headers.get("Accept")}`);
      this.response.body = JSON.stringify(students);
    } else if (id) {
      // console.log("Getting student by ID"); // prints to SERVER log
      const student = StudentModel.getOneStudentById(id);
      // console.log(`Student record: ${student!.FirstName}`);
      // this.response.body = JSON.stringify(student);
      // this.response.body = this.response.render("/student_profile.html")
      // ==== Content Negotiation https://drash.land/drash/#/advanced-tutorials/content-negotiation/part-4
      // Read the Accept header and check if text/html is acceptable
      if (this.request.accepts("text/html")) {
        console.log(`Response headers: ${this.response.headers.get("Accept")}`);
        return this.generateHtml(student);
      }
      // Default to a JSON representation
      console.log(`Response headers: ${this.response.headers.get("Accept")}`);
      return this.generateJson(student);
    } else {
      const students = StudentModel.getAllStudents();
      this.response.body = JSON.stringify(students);
    }
    return this.response;
  }

  // Content Negotiation: https://drash.land/drash/#/advanced-tutorials/content-negotiation/part-4
  protected generateHtml(student: any) {
    this.response.headers.set("Content-Type", "text/html");
    try {
      let html = this.readFileContents("./public/views/student_profile.html");
      html = html
        .replace(/\{\{ FirstName \}\}/, student.FirstName)
        .replace(/\{\{ LastName \}\}/, student.LastName)
        .replace(/\{\{ Grade \}\}/, student.Grade)
        .replace(/\{\{ StudentNumber \}\}/, student.StudentNumber)
        .replace(/\{\{ NewThisYear \}\}/, student.NewThisYear);
      this.response.body = html;
      return this.response;
    } catch (error) {
      throw new Drash.Exceptions.HttpException(500, error.message);
    }
  }

  protected generateJson(student: any) {
    this.response.headers.set("Content-Type", "application/json");
    this.response.body = student;
    return this.response;
  }

  protected readFileContents(file: string) {
    let fileContentsRaw = Deno.readFileSync(file);
    const decoder = new TextDecoder();
    let decoded = decoder.decode(fileContentsRaw);
    return decoded;
  }
}
