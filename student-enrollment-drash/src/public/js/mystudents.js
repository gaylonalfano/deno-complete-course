// @ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the values entered into Search Form fields (div class="form-control")
  const formElement = document.getElementById("search-form");
  const resultElement = document.getElementById("search-result");
  const studentIdElement = document.getElementById("student-id");
  const gradeElement = document.getElementById("grade");
  const buttonElement = document.getElementById("search-button");

  // Search form example: https://www.youtube.com/watch?v=wjgiPFWvwBI
  const apiURL = "http://localhost:1447";

  async function submitHandler(event) {
    event.preventDefault();
    // console.log("Button clicked!!!");
    const studentIdSearchValue = studentIdElement.value;
    const gradeSearchValue = gradeElement.value;

    // Perform check on whether they were entered
    // FIXME What if enter both search fields?
    if (!studentIdSearchValue && !gradeSearchValue) {
      console.log("No search criteria entered. Returning all students.");
      const searchResult = await fetch(`${apiURL}/students`);
      const data = await searchResult.text(); // WORKS
      // const data = await searchResult.json(); // [object Object][object Object]
      console.log(data);
      resultElement.innerHTML = data;

      // Just redirect to the right path/URL?
      // location.href = `/students/id/${studentIdSearchValue}`;

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
    }
    // else {
    //   console.log("Clicked without StudentID!");
    //   // return fetch("/students", {
    //   //   method: "GET",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   },
    //   // });
    // }
  }
  buttonElement.addEventListener("click", submitHandler);
});
