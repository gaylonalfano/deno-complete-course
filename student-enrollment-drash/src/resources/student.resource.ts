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

    // URL Query Params eg /students?grade=5 (alternative to Path Params)
    // const id: string | null = this.request.getUrlQueryParam("id");
    // const grade: string | null = this.request.getUrlQueryParam("grade");

    // prints to REQUEST/curl log
    // this.response.body += ` You passed in the following path params: |${id}|${grade}|`;
    // TODO Could add some error/exception handling logic

    if (grade) {
      const students = StudentModel.getAllStudentsByGrade(grade);
      this.response.body = JSON.stringify(students)
    } else if (id) {
      // console.log("Getting student by ID"); // prints to SERVER log
      const student = StudentModel.getOneStudentById(id);
      this.response.body = JSON.stringify(student);
    } else {
      const students = StudentModel.getAllStudents();
      this.response.body = JSON.stringify(students);
    }
    console.log(`Request: ${path}`);
    return this.response;
  }
}
