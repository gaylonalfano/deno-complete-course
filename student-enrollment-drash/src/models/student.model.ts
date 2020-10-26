// Following the nasa planets model example
import { join, BufReader, parse, log, pick } from "../deps.ts";

interface Student {
  // Each Student can be (should) indexed with a key (eg student["some_key"])
  // CSV is all 'string' so need to convert to number for filtering later
  // Could also write as Record: type Student = Record<string, string>
  [key: string]: string;
}

// Define a new array to store students
let students: Array<Student>;

async function loadStudentsData() {
  const path = join("./data", "20200901_Active_Students.csv");
  console.log(path);
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  // parse used to have 'headers' prop. Now it's skipFirstRow: boolean
  // NOTE: Use lazyQuotes for bare " quote
  const result: Array<Student | unknown> = await parse(bufReader, {
    skipFirstRow: true,
    lazyQuotes: true,
  });
  Deno.close(file.rid);

  // WITHOUT specifying 'result' type definition:
  // Test it out. 'result' is unknown so need to use type casting
  // console.log((result as Student[])[0]["FirstName"]); // Aarohan
  // const students = result as Student[];
  // return console.log(students);

  // WITH specifying 'result' type definition as : Student[] | unknown[]
  // const students = result;
  // console.log(`${students.length} students found!`);
  // return console.log(students);

  // ACTUAL processing/cleaning:
  // Do I need to do a check on result to ensure it's Student[] type?
  // Seems like I still need to do some type casting...
  // TODO: Research how to convert data types for Number, Date, etc.
  // TODO: Could use lodash pick() if needed.
  const students = result as Array<Student>;

  // LODASH _.pick()
  return students.map((student) => {
    return pick(student, [
      "FirstName",
      "LastName",
      "Student Number",
      "Grade",
      "Student 1st Lang",
      "NewThisYear",
      "Start Date",
      "Date",
    ]);
  });

  // // WITHOUT LODASH
  // for (const student of students) {
  //   console.log(
  //     student["FirstName"],
  //     student["LastName"],
  //     student["Grade"],
  //     student["NewThisYear"],
  //     student["Start Date"],
  //     student["Date"]
  //   );
  // }
}

// This is our basic students database stored in Deno's memory
// NOTE: Only works if I return something using Lodash (above)
students = await loadStudentsData();
log.info(`${students.length} students loaded!`);

// ===== HANDLERS/CONTROLLERS
export function getOneStudentById(id: string) {
  // Ex.2026067, 2030090, 2021340
  // console.log(students); // works
  const studentList = students.filter((student) => {
    // NOTE: Must use 'return' with .filter()!
    // TODO Add some error checking logic if not found
    return student["Student Number"] === id;
    // students["Student Number"] === id;
  });

  // console.log(studentList); // []
  // console.log(studentList.length); // 0
  return studentList.length ? studentList[0] : null;
}

// TODO: create function to retrieve by grade level
export function getAllStudentsByGrade(grade: string) {
  const studentList = students.filter((student) => {
    return student["Grade"] === grade;
  });

  return studentList.length ? studentList : null;
}

// Now we need a way to access this students db/model. This represents our data
// access layer, meaning the way our API accesses the data we get back from the CSV.
export function getAllStudents() {
  return students;
}
