const wordInputField = document.getElementById("wordInput");
const textDisplayContainer = document.querySelector(".textContainer");

// Save the original text content to reset when needed
const originalTextContent = textDisplayContainer.textContent;

function highlightWordOccurrences() {
  setTimeout(() => {
    const searchWord = wordInputField.value.trim();

    if (searchWord.length > 0) {
      const textArray = originalTextContent.split(/\b/);

      const highlightedTextArray = textArray.map((textSegment) => {
        if (textSegment.toLowerCase() === searchWord.toLowerCase()) {
          return `<span class="highlight">${textSegment}</span>`;
        }
        return textSegment;
      });

      textDisplayContainer.innerHTML = highlightedTextArray.join("");
    } else {
      textDisplayContainer.textContent = originalTextContent;
    }
  }, 0);
}

wordInputField.addEventListener("keydown", highlightWordOccurrences);
