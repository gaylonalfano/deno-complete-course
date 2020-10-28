// @ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the values entered into Search Form fields (div class="form-control")
  const studentIdElement = document.getElementById("student-id");
  const gradeElement = document.getElementById("grade");
  const buttonElement = document.getElementById("search-button");

  async function submitHandler(event) {
    event.preventDefault();
    console.log("Button clicked!!!");

    // Perform check on whether they were entered
    // FIXME What if enter both search fields?
    if (studentIdElement.value) {
      console.log(`Entered Student Id: ${studentIdElement.value}`);

      // Just redirect to the right path/URL?
      location.href = `/students/id/${studentIdElement.value}`;

      // TODO ?? Do I need to handle the Promise or does Drash do that?
      // return await fetch(`/students/id/${studentIdElement.value}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "text/html",
      //   },
      // })
      //   .then((response) => response.text())
      //   // .then((response) => response.json());
      //   .then((data) => console.log(data));
    } else {
      console.log("Clicked without StudentID!");
      // return fetch("/students", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
    }
  }
  buttonElement.addEventListener("click", submitHandler);
});
