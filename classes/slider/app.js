class Slider {
  constructor(sliderRef) {
    if (!(sliderRef instanceof Element)) {
      throw new Error("No slider passed in!");
    }

    this.sliderRef = sliderRef;

    this.slideContainer = this.sliderRef.querySelector(".slides");
    const prevButton = this.sliderRef.querySelector(".goToPrev");
    const nextButton = this.sliderRef.querySelector(".goToNext");

    //? Run startSlider upon creating the slider
    this.startSlider();
    this.applyClasses();

    prevButton.addEventListener("click", () => {
      this.moveSlide("back");
    });
    nextButton.addEventListener("click", () => {
      this.moveSlide("forward");
    });
  }

  startSlider() {
    this.currentSlide = this.sliderRef.querySelector(".current") ?? this.slideContainer.firstElementChild;
    this.prevSlide = this.currentSlide.previousElementSibling ?? this.slideContainer.lastElementChild;
    this.nextSlide = this.currentSlide.nextElementSibling ?? this.slideContainer.firstElementChild;
  }

  applyClasses() {
    this.currentSlide.classList.add("current");
    this.prevSlide.classList.add("prev");
    this.nextSlide.classList.add("next");
  }

  moveSlide(direction) {
    const classesToRemove = ["prev", "current", "next"];

    // [this.prevSlide, this.currentSlide, this.nextSlide].forEach((slide) => {
    //   slide.classList.remove(...classesToRemove);
    // });

    for (const slide of [this.prevSlide, this.currentSlide, this.nextSlide]) {
      slide.classList.remove(...classesToRemove);
    }

    switch (direction) {
      case "back":
        //? Use destructuring to quickly swap the slides around
        [this.prevSlide, this.currentSlide, this.nextSlide] = [
          //? Wraps around to the last slide if needed
          this.prevSlide.previousElementSibling ?? this.slideContainer.lastElementChild,
          this.prevSlide,
          this.currentSlide,
        ];
        break;
      case "forward":
        [this.prevSlide, this.currentSlide, this.nextSlide] = [
          this.currentSlide,
          this.nextSlide,
          //? Wraps around to the first slide if needed
          this.nextSlide.nextElementSibling ?? this.slideContainer.firstElementChild,
        ];
        break;
      default:
        console.warn(`Unsupported direction "${direction}", please specify either "back" or "forward"`);
        return;
    }

    this.applyClasses();
  }
}

const mySlider = new Slider(document.querySelector(".slider"));
const dogSlider = new Slider(document.querySelector(".dog-slider"));

console.log(mySlider, dogSlider);

window.dogSlider = dogSlider;

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    dogSlider.moveSlide("forward");
  }
  if (e.key === "ArrowLeft") {
    dogSlider.moveSlide("back");
  }
});

/*
  eslint
    no-unused-vars: "off",
    no-console: "off",
*/
