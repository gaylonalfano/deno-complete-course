import { Drash } from "../deps.ts";

import * as StudentModel from "../models/student.model.ts";

export default class StudentResource extends Drash.Http.Resource {
  static paths = ["/students/:id?/:grade?"];

  public GET() {
    // https://drash.land/drash/#/tutorials/resources/creating-a-resource
    this.response.body = "GET /students request received!";
    const id: string | null = this.request.getPathParam("id");
    const grade: string | null = this.request.getPathParam("grade");

    // prints to REQUEST/curl log
    this.response.body += ` You passed in the following path params: |${id}|${grade}|`;

    if (id) {
      console.log("Getting student by ID"); // prints to SERVER log
      const student = StudentModel.getOneStudentById(id);
      this.response.body = JSON.stringify(student);
    } else {
      const students = StudentModel.getAllStudents();
      this.response.body = JSON.stringify(students);
    }
    return this.response;
  }
}
