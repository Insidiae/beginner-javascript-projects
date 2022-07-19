import { handleResult } from "./handlers.js";
import { isDark, colorsByName } from "./colors.js";

const colorsGrid = document.querySelector(".colors");

function displayColors(colors) {
  return colors
    .map(
      (color) => `
        <span
          class="color ${isDark(color) ? "dark" : ""}"
          style="background-color: ${color};"
          data-color="${color}"
        >
          ${color}
        </span>
      `,
    )
    .join("");
}

//? alias the SpeechRecognition module if it's prefixed
window.SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;

function start() {
  //? Check if the browser supports the SpeechRecognition module
  if (!("SpeechRecognition" in window)) {
    console.error("Sorry, your browser does not support Speech Recognition.");
    return;
  }

  //* Set up SpeechRecogntion configs
  const recognition = new window.SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

colorsGrid.innerHTML = displayColors(colorsByName);
start();

/*
  eslint
    no-console: "off",
*/
