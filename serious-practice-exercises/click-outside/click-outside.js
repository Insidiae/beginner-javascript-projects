const allCardButtons = document.querySelectorAll(".card button");
const modalOuter = document.querySelector(".modal-outer");
const modalInner = document.querySelector(".modal-inner");

function handleButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest(".card");

  const imgSrc = card.querySelector("img").src;
  const desc = card.dataset.description;
  const name = card.querySelector("h2").textContent;

  modalInner.innerHTML = `
    <img width="600" height="600" src="${imgSrc.replace("200", "600")}" alt="${name}" />
    <p>${desc}</p>
  `;

  modalOuter.classList.add("open");
}

function closeModal() {
  modalOuter.classList.remove("open");
}

function handleOuterModalClick(event) {
  const isOutside = !event.target.closest(".modal-inner");

  if (isOutside) {
    closeModal();
  }
}

function handleModalEscape(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

allCardButtons.forEach((cardButton) => {
  cardButton.addEventListener("click", handleButtonClick);
});

modalOuter.addEventListener("click", handleOuterModalClick);
window.addEventListener("keydown", handleModalEscape);
