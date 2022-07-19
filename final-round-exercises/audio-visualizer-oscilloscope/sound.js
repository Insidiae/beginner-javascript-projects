import { hslToRgb } from "./utils.js";
// const WIDTH = 1500;
// const HEIGHT = 1500;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

let analyser;
let bufferLength;

function handleError() {
  console.error("You must give access to your mic in order to proceed");
}

function drawTimeData(timeData) {
  //* Populate our timeData using the analyser
  analyser.getByteTimeDomainData(timeData);

  //* Now turn the data into something visual!
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#ffc600";

  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  timeData.forEach((data, idx) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;

    if (idx === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  });

  ctx.stroke();

  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFrequencyData(frequencyData) {
  //* Populate our frequencyData using the analyser
  analyser.getByteFrequencyData(frequencyData);

  //* Now turn the data into something visual!
  const barWidth = (WIDTH / bufferLength) * 2.5;
  // let x = 0;
  frequencyData.forEach((amount, idx) => {
    const percentHeight = amount / 255;
    const barHeight = (HEIGHT * percentHeight) / 2;

    const hue = 360 / (percentHeight * 360) - 0.5;
    const [r, g, b] = hslToRgb(hue, 0.98, 0.67);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    // ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    // x += barWidth + 1;
    ctx.fillRect((barWidth + 1) * idx, HEIGHT - barHeight, barWidth, barHeight);
  });

  requestAnimationFrame(() => drawFrequencyData(frequencyData));
}

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(handleError);
  const audioCtx = new AudioContext();

  analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  //? How much data should we collect?
  // analyser.fftSize = Math.pow(2, 10);
  analyser.fftSize = 2 ** 10;

  //* Pull data off the audio
  bufferLength = analyser.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);

  drawTimeData(timeData);
  drawFrequencyData(frequencyData);
}

getAudio();

/*
  eslint
    no-console: "off",
*/
