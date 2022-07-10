class Gallery {
  constructor(galleryRef) {
    if (!galleryRef) {
      throw new Error("No Gallery Found!");
    }

    this.galleryRef = galleryRef;

    this.modal = document.querySelector(".modal");
    this.prevButton = this.modal.querySelector(".prev");
    this.nextButton = this.modal.querySelector(".next");

    this.allImages = Array.from(galleryRef.querySelectorAll("img"));

    //? Bind methods from prototype to the instance
    this.showPreviousImage = this.showPreviousImage.bind(this);
    this.showNextImage = this.showNextImage.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.allImages.forEach((image) => {
      image.addEventListener("click", (event) => {
        this.showImage(event.currentTarget);
      });

      image.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          this.showImage(event.currentTarget);
        }
      });
    });
    this.modal.addEventListener("click", this.handleClickOutside);
  }

  openModal() {
    if (this.modal.matches(".open")) {
      // console.info("Modal already open!");
      return;
    }

    this.modal.classList.add("open");

    this.prevButton.addEventListener("click", this.showPreviousImage);
    this.nextButton.addEventListener("click", this.showNextImage);
    window.addEventListener("keyup", this.handleKeyup);
  }

  closeModal() {
    this.modal.classList.remove("open");

    this.prevButton.removeEventListener("click", this.showPreviousImage);
    this.nextButton.removeEventListener("click", this.showNextImage);
    window.removeEventListener("keyup", this.handleKeyup);
  }

  showPreviousImage() {
    this.showImage(this.currentImageRef.previousElementSibling || this.galleryRef.lastElementChild);
  }

  showNextImage() {
    this.showImage(this.currentImageRef.nextElementSibling || this.galleryRef.firstElementChild);
  }

  handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  handleKeyup(event) {
    switch (event.key) {
      case "Escape":
        this.closeModal();
        break;
      case "ArrowLeft":
        this.showPreviousImage();
        break;
      case "ArrowRight":
        this.showNextImage();
        break;
      default:
        break;
    }
  }

  showImage(imageRef) {
    if (!imageRef) {
      // console.info("No image to show!");
      return;
    }

    this.modal.querySelector("img").src = imageRef.src;
    this.modal.querySelector("h2").textContent = imageRef.title;
    this.modal.querySelector("figure p").textContent = imageRef.dataset.description;
    this.currentImageRef = imageRef;

    this.openModal();
  }
}

const gallery1 = new Gallery(document.querySelector(".gallery1"));
const gallery2 = new Gallery(document.querySelector(".gallery2"));

console.log(gallery1, gallery2);

/*
  eslint
    no-unused-vars: "off",
    no-console: "off",
*/
