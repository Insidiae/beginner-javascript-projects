import { fetchJoke } from "./index.js";
import { jokeButtonText, jokeHolder, loader } from "./elements.js";
import { getRandomItemFromArray } from "./utils.js";
import buttonText from "../data/buttonText.js";

export async function handleClick() {
  // display loading indicator while fetching
  loader.classList.remove("hidden");

  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;

  // hide loading indicator after fetching
  loader.classList.add("hidden");
  jokeButtonText.textContent = getRandomItemFromArray(buttonText, jokeButtonText.textContent);
}
