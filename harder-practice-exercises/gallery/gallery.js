function Gallery(galleryRef) {
  if (!galleryRef) {
    throw new Error("No Gallery Found!");
  }

  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImageRef;

  const allImages = Array.from(galleryRef.querySelectorAll("img"));

  function openModal() {
    if (modal.matches(".open")) {
      // console.info("Modal already open!");
      return;
    }

    modal.classList.add("open");

    prevButton.addEventListener("click", showPreviousImage);
    nextButton.addEventListener("click", showNextImage);
    window.addEventListener("keyup", handleKeyup);
  }

  function closeModal() {
    modal.classList.remove("open");

    prevButton.removeEventListener("click", showPreviousImage);
    nextButton.removeEventListener("click", showNextImage);
    window.removeEventListener("keyup", handleKeyup);
  }

  function showPreviousImage() {
    showImage(currentImageRef.previousElementSibling || galleryRef.lastElementChild);
  }

  function showNextImage() {
    showImage(currentImageRef.nextElementSibling || galleryRef.firstElementChild);
  }

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  function handleKeyup(event) {
    switch (event.key) {
      case "Escape":
        closeModal();
        break;
      case "ArrowLeft":
        showPreviousImage();
        break;
      case "ArrowRight":
        showNextImage();
        break;
      default:
        break;
    }
  }

  function showImage(imageRef) {
    if (!imageRef) {
      // console.info("No image to show!");
      return;
    }

    modal.querySelector("img").src = imageRef.src;
    modal.querySelector("h2").textContent = imageRef.title;
    modal.querySelector("figure p").textContent = imageRef.dataset.description;
    currentImageRef = imageRef;

    openModal();
  }

  allImages.forEach((image) => {
    image.addEventListener("click", (event) => {
      showImage(event.currentTarget);
    });

    image.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        showImage(event.currentTarget);
      }
    });
  });
  modal.addEventListener("click", handleClickOutside);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));

/*
  eslint
    no-unused-vars: "off",
    no-console: "off",
*/
