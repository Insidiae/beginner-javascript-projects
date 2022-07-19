import { isValidColor } from "./colors.js";

export function handleResult({ results }) {
  const words = results[results.length - 1][0].transcript;

  //* Lowercase everything in results and remove spaces
  let color = words.toLowerCase();
  // color = color.replace(/\s/g, "");
  //? By the way, String.replaceAll() is now available!
  color = color.replaceAll(" ", "");

  //* If the user says a valid colour:
  if (isValidColor(color)) {
    //* Display some fancy animations to indicate the colour!
    const colorSpan = document.querySelector(`[data-color="${color}"]`);
    colorSpan.classList.add("got");

    //* Change the page's background to match the color
    document.body.style.backgroundColor = color;
  }
}
