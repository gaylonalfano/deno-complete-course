import { Router, RouterContext } from "./deps.ts";

import * as students from "./models/student.model.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Root/Home Page";
});

router.get("/students", (ctx: RouterContext) => {
  ctx.response.body = students.getAllStudents();
});

router.get("/students/:id", (ctx: RouterContext) => {
  // TODO: Need to research Context vs RouterContext
  // If Context, then params.id ERROR! RouterContext works.
  // TODO: How to inspect/add/use additional query string params?
  console.log(ctx.request.url.searchParams.getAll("id"));
  if (ctx.params?.id) {
    const student = students.getOneStudent(ctx.params.id);
    ctx.response.body = student;
  } else {
    ctx.throw(400, `Student with that ID does not exist.`);
  }
});

export default router;
