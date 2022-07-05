//* Select the relevant elements
const canvas = document.getElementById("etch-a-sketch");
const ctx = canvas.getContext("2d");

const shakeButton = document.querySelector(".shake");

//* Get width and height attributes from canvas
// const width = canvas.width;
// const height = canvas.height;
//? is equivalent to:
const { width, height } = canvas;

//* Generate random x and y coordinates for our canvas starting point
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

//* Prepare canvas for drawing
const MOVE_AMOUNT = 15;
let hue = 221;
const saturation = 98;
const lightness = 67;

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = `hsl(${hue}deg ${saturation}% ${lightness}%)`;
ctx.lineWidth = MOVE_AMOUNT;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//* Write a draw function
function draw({ key }) {
  // "Rotate" the hue
  hue = (hue + 1) % 360;
  //? Or... randomize it!
  // hue = Math.floor(Math.random() * 360);

  // Start the path
  ctx.beginPath();
  ctx.strokeStyle = `hsl(${hue}deg ${saturation}% ${lightness}%)`;
  ctx.moveTo(x, y);

  // Move the x and y coords depending on the arrow key pressed
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

//* Write a handler for the keys
function handleKey(event) {
  if (event.key.includes("Arrow")) {
    event.preventDefault();
    draw({ key: event.key });
  }
}

//* Write a clear/shake function
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);

  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);
  hue = Math.floor(Math.random() * 360);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = `hsl(${hue}deg ${saturation}% ${lightness}%)`;
  ctx.stroke();

  canvas.classList.add("shake");
  canvas.addEventListener(
    "animationend",
    () => {
      canvas.classList.remove("shake");
    },
    { once: true },
  );
}

//* Listen for arrow keys
window.addEventListener("keydown", handleKey);
shakeButton.addEventListener("click", clearCanvas);
