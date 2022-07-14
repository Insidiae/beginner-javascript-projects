function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function destroyPopup(popup) {
  let myPopup = popup;
  myPopup.classList.remove("open");
  await wait(1000);
  myPopup.remove();
  //? remove any references to popup altogether
  myPopup = null;
}

async function ask(options) {
  return new Promise((resolve) => {
    // Create a popup with the needed fields
    const popup = document.createElement("form");
    popup.classList.add("popup");
    popup.insertAdjacentHTML(
      "afterbegin",
      `
      <fieldset>
        <label htmlFor="input">${options.title}</label>
        <input type="text" name="input" id="input" />
        <button type="submit">Submit</button>
      </fieldset>
    `,
    );

    // Check if they want a cancel button
    if (options.cancel) {
      const skipButton = document.createElement("button");
      skipButton.type = "button";
      skipButton.textContent = "Cancel";

      skipButton.addEventListener(
        "click",
        () => {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true },
      );

      popup.firstElementChild.appendChild(skipButton);
    }

    // Listen for the submit event

    // Resolve the submitted data
    popup.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        resolve(event.target.input.value);
        destroyPopup(popup);
      },
      { once: true },
    );

    // Insert the popup into the DOM
    document.body.appendChild(popup);
    //? For the fade-in animation to work, we need to add a small timeout
    setTimeout(() => {
      popup.classList.add("open");
    }, 50);
  });
}

const allQuestionButtons = document.querySelectorAll("[data-question]");

async function askQuestion(event) {
  const button = event.currentTarget;
  const answer = await ask({
    title: button.dataset.question,
    cancel: "cancel" in button.dataset,
    //? this also works:
    // cancel: button.hasAttribute("data-cancel"),
  });

  console.log(answer);
}

allQuestionButtons.forEach((button) => {
  button.addEventListener("click", askQuestion);
});

const questionList = [
  { title: "What is your name?" },
  { title: "What is your age?", cancel: true },
  { title: "What is your dog's name?" },
];

async function asyncMap(array, callback) {
  const results = [];
  for (const item of array) {
    // const result = await callback(item);
    // results.push(result);
    //? Or you can do it in one line:
    results.push(await callback(item));
  }
  return results;
}

async function askMany() {
  const answers = await asyncMap(questionList, ask);

  console.log(answers);
}

document.getElementById("askMeEverything").addEventListener("click", askMany);

/*
  eslint
    no-console: "off",
*/
