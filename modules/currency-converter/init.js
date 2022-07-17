import { fromSelect, toSelect } from "./elements.js";
import { generateOptions } from "./utils.js";
import currencies from "./currencies.js";
import { handleInput } from "./handlers.js";

//* When the page loads, this code runs!
export function init() {
  const form = document.querySelector(".app form");

  const optionsHTML = generateOptions(currencies);
  // Populate the options elements
  fromSelect.innerHTML = optionsHTML;
  toSelect.innerHTML = optionsHTML;

  form.addEventListener("input", handleInput);
}
