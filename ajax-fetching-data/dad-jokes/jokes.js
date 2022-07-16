const jokeButton = document.querySelector(".getJoke");
const jokeButtonText = document.querySelector(".jokeText");
const jokeHolder = document.querySelector(".joke p");
const loader = document.querySelector(".loader");

const buttonText = [
  "Ugh.",
  "🤦🏻‍♂️",
  "omg dad.",
  "you are the worst",
  "seriously",
  "stop it.",
  "please stop",
  "that was the worst one",
];

function getRandomItemFromArray(arr, exclude) {
  const item = arr[Math.floor(Math.random() * arr.length)];

  if (item === exclude) {
    return getRandomItemFromArray(arr, exclude);
  }

  return item;
}

async function fetchJoke() {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

async function handleClick() {
  // display loading indicator while fetching
  loader.classList.remove("hidden");

  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;

  // hide loading indicator after fetching
  loader.classList.add("hidden");
  jokeButtonText.textContent = getRandomItemFromArray(buttonText, jokeButtonText.textContent);
}

jokeButton.addEventListener("click", handleClick);
