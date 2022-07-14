//* ASYNC TYPER - TWO WAYS
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const DEFAULT_MIN = 20;
const DEFAULT_MAX = 150;

function getRandomBetween(min = DEFAULT_MIN, max = DEFAULT_MAX, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

//* Method 1: Async for...of loop
async function drawAsync(element) {
  const text = element.textContent.trim();
  const { typeMin, typeMax } = element.dataset;
  element.textContent = "";

  for (const letter of text) {
    element.textContent += letter;
    await wait(getRandomBetween(typeMin, typeMax));
  }
}

document.querySelectorAll("h2[data-type]").forEach(drawAsync);

//* Method 2: Recursion
async function drawRecursive(element) {
  const text = element.textContent.trim();
  const { typeMin, typeMax } = element.dataset;
  element.textContent = "";
  let idx = 0;

  async function addLetter() {
    if (idx === text.length) {
      return;
    }

    element.textContent += text[idx];
    idx += 1;
    await wait(getRandomBetween(typeMin, typeMax));
    addLetter();
  }

  addLetter();
}

document.querySelectorAll("p[data-type]").forEach(drawRecursive);
