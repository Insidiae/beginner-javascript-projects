import { init } from "./init.js";

// Start the app!
const app = document.querySelector(".app");
app.addEventListener("mouseenter", init, { once: true });
