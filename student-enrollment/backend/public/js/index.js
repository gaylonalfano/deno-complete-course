// https://youtu.be/oTH8WZbRC8w?t=59
// @ts-nocheck

// ===== Method 1
// window.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("button").addEventListener("click", () => {
//     const randomString = Math.random().toString(32);
//     console.log(randomString);
//     document.getElementById("text").innerText = randomString;
//   });
// });

// ===== Method 2
// NOTE: Couldn't see the entire code snippet so using a mix with
// this additional SO thread: https://stackoverflow.com/questions/39993676/code-inside-domcontentloaded-event-not-working
// if (document.readyState !== "loading") {
//   console.log("document is already ready, just execute code here");
//   // myInitCode();
//   document.getElementById("button").addEventListener("click", () => {
//     const randomString = Math.random().toString(32);
//     document.getElementById("text").innerText = randomString;
//   });
// } else {
//   document.addEventListener("DOMContentLoaded", function () {
//     console.log("document was not ready, place code here");
//     // myInitCode();
//     document.getElementById("button").addEventListener("click", () => {
//       const randomString = Math.random().toString(32);
//       console.log(randomString);
//       document.getElementById("text").innerText = randomString;
//     });
//   });
// }
// function myInitCode() {}

// ===== Method 3
document.addEventListener("DOMContentLoaded", function () {
  const buttonElement = document.getElementById("button");
  const paragraphElement = document.getElementById("text");

  function clickHandler() {
    paragraphElement.innerText = Math.random().toString(32);
  }

  buttonElement.addEventListener("click", clickHandler);
});
