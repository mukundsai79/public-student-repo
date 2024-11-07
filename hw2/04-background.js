document.addEventListener("DOMContentLoaded", () => {
  const bodyElement = document.body;
  const intervalInput = document.getElementById("intervalInput");
  const toggleButton = document.getElementById("toggleButton");

  let intervalId = null;
  let isRunning = false;

  const getRandomColor = () =>
    `rgba(${(Math.random() * 256) | 0}, ${(Math.random() * 256) | 0}, ${
      (Math.random() * 256) | 0
    }, 0.5)`;

  const startColorChange = (interval) => {
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      bodyElement.style.backgroundColor = getRandomColor();
    }, interval * 1000);

    toggleButton.textContent = "Stop";
    toggleButton.classList.replace("btn-primary", "btn-danger");
    isRunning = true;
  };

  const stopColorChange = () => {
    clearInterval(intervalId);
    toggleButton.textContent = "Start";
    toggleButton.classList.replace("btn-danger", "btn-primary");
    isRunning = false;
  };

  toggleButton.addEventListener("click", () => {
    const interval = parseFloat(intervalInput.value) || 3;

    if (isRunning) {
      stopColorChange();
    } else {
      if (interval < 0.5) {
        alert("Interval must be at least 0.5 seconds.");
        return;
      }

      startColorChange(interval);
    }
  });

  bodyElement.style.backgroundColor = getRandomColor();
  startColorChange(3);
});
