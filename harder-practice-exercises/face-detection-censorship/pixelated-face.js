//! The face detection does not work on all browsers and operating systems.
//! If you are getting a `Face detection service unavailable` error or similar,
//! it's possible that it won't work for you at the moment.

const webcam = document.querySelector(".webcam");
const videoCanvas = document.querySelector(".video");
const faceCanvas = document.querySelector(".face");

const videoCtx = videoCanvas.getContext("2d");
const faceCtx = faceCanvas.getContext("2d");

const optionsInputs = document.querySelectorAll(`.controls input[type="range"]`);

const faceDetector = new window.FaceDetector();

const options = {
  MIN_SIZE: 10,
  SCALE: 1.35,
};

//* Populate the user's video with webcam footage
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });

  webcam.srcObject = stream;
  await webcam.play();

  // Size the canvases to be the same size as the video
  videoCanvas.width = webcam.videoWidth;
  videoCanvas.height = webcam.videoHeight;
  faceCanvas.width = webcam.videoWidth;
  faceCanvas.height = webcam.videoHeight;
}

function drawFace(face) {
  const { left, top, width, height } = face.boundingBox;

  videoCtx.strokeStyle = "#ffc600";
  videoCtx.lineWidth = 2;
  videoCtx.strokeRect(left, top, width, height);
}

function censor({ boundingBox }) {
  //? Disable image smoothing to make it more pixelated
  faceCtx.imageSmoothingEnabled = false;
  // Draw the small face
  faceCtx.drawImage(
    //? 5 source args
    webcam, //? Where does the source come from?
    boundingBox.x, //? Where do we start the source pull from?
    boundingBox.y,
    boundingBox.width,
    boundingBox.height,
    //? 4 draw args
    boundingBox.x, //? Where do we start drawing from?
    boundingBox.y,
    options.MIN_SIZE, //? How big (width/height) shoild we draw it?
    options.MIN_SIZE,
  );

  // Scale the small face back to normal size
  const scaledWidth = boundingBox.width * options.SCALE;
  const scaledHeight = boundingBox.height * options.SCALE;
  faceCtx.drawImage(
    //? 5 source args
    faceCanvas,
    boundingBox.x, //? Where do we start the source pull from?
    boundingBox.y,
    options.MIN_SIZE,
    options.MIN_SIZE,
    //? 4 draw args
    boundingBox.x - (scaledWidth - boundingBox.width) / 2, //? Where do we start drawing from?
    boundingBox.y - (scaledHeight - boundingBox.height) / 2,
    scaledWidth, //? How big (width/height) shoild we draw it?
    scaledHeight,
  );
}

async function detect() {
  const faces = await faceDetector.detect(webcam);

  videoCtx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faces.forEach(drawFace);
  faces.forEach(censor);

  //? Rerun detect() when the browser paints the next animation frame
  requestAnimationFrame(detect);
}

function handleOption(event) {
  const { name, value } = event.currentTarget;
  options[name] = parseFloat(value);
}

optionsInputs.forEach((input) => {
  input.addEventListener("input", handleOption);
});

populateVideo().then(detect);
