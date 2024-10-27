const bodyElement = document.body;
const button = document.querySelector(".start-button");
const userInput = document.querySelector("#userInput");

let time = 1000;
let intervalId = null;

// Function to generate a random hex color
const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

// Function to set the background color
const setColor = (color) => {
  bodyElement.style.backgroundColor = color;
};

// Set initial background color
setColor("#543FB7");

// Function to start the color change
const startColorChange = () => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const color = getRandomColor();
    setColor(color);
  }, time);
};

// Function to toggle color change on button click
const toggleColorChange = () => {
  if (button.value === "Start") {
    startColorChange(); // Start changing colors
    button.value = "Stop";
    button.classList.replace("btn-primary", "btn-danger");
  } else {
    button.value = "Start";
    button.classList.replace("btn-danger", "btn-primary");
    clearInterval(intervalId); // Stop changing colors
  }
};

// Function to update the interval based on user input
const updateInterval = () => {
  let number = parseFloat(userInput.value);

  if (Number.isNaN(number) || number < 1) {
    number = 1; // Ensure at least 1 second
  }

  time = number * 1000; // Update time for setInterval
  if (button.value === "Stop") {
    startColorChange(); // Restart the interval if it's running
  }
};

// Event listeners
button.addEventListener("click", toggleColorChange);
userInput.addEventListener("input", updateInterval);
