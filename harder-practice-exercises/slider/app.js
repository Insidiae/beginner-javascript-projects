function Slider(sliderRef) {
  if (!(sliderRef instanceof Element)) {
    throw new Error("No slider passed in!");
  }

  let prevSlide;
  let currentSlide;
  let nextSlide;

  const slideContainer = sliderRef.querySelector(".slides");
  const prevButton = sliderRef.querySelector(".goToPrev");
  const nextButton = sliderRef.querySelector(".goToNext");

  function startSlider() {
    currentSlide = sliderRef.querySelector(".current") ?? slideContainer.firstElementChild;
    prevSlide = currentSlide.previousElementSibling ?? slideContainer.lastElementChild;
    nextSlide = currentSlide.nextElementSibling ?? slideContainer.firstElementChild;
  }

  function applyClasses() {
    currentSlide.classList.add("current");
    prevSlide.classList.add("prev");
    nextSlide.classList.add("next");
  }

  function moveSlide(direction) {
    const classesToRemove = ["prev", "current", "next"];

    // prevSlide.classList.remove(...classesToRemove);
    // currentSlide.classList.remove(...classesToRemove);
    // nextSlide.classList.remove(...classesToRemove);
    //? or:
    [prevSlide, currentSlide, nextSlide].forEach((slide) => {
      slide.classList.remove(...classesToRemove);
    });

    switch (direction) {
      case "back":
        //? Use destructuring to quickly swap the slides around
        [prevSlide, currentSlide, nextSlide] = [
          //? Wraps around to the last slide if needed
          prevSlide.previousElementSibling ?? slideContainer.lastElementChild,
          prevSlide,
          currentSlide,
        ];
        break;
      case "forward":
        [prevSlide, currentSlide, nextSlide] = [
          currentSlide,
          nextSlide,
          //? Wraps around to the first slide if needed
          nextSlide.nextElementSibling ?? slideContainer.firstElementChild,
        ];
        break;
      default:
        console.warn(`Unsupported direction "${direction}", please specify either "back" or "forward"`);
        return;
    }

    applyClasses();
  }

  //? Run startSlider upon creating the slider
  startSlider();
  applyClasses();

  prevButton.addEventListener("click", () => {
    moveSlide("back");
  });
  nextButton.addEventListener("click", () => {
    moveSlide("forward");
  });
}

const mySlider = Slider(document.querySelector(".slider"));
const dogSlider = Slider(document.querySelector(".dog-slider"));

/*
  eslint
    no-unused-vars: "off",
    no-console: "off",
*/
