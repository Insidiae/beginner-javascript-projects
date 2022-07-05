const terms = document.querySelector(".terms-and-conditions");
const acceptButton = document.querySelector(".accept");

function observerCallback(payload) {
  if (payload[0].intersectionRatio === 1) {
    acceptButton.disabled = false;
    // eslint-disable-next-line
    observer.unobserve(terms.lastElementChild);
  }
}

const observer = new IntersectionObserver(observerCallback, { root: terms, threshold: 1 });

observer.observe(terms.lastElementChild);
