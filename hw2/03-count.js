const wordInputField = document.getElementById("wordInput");
const textDisplayContainer = document.querySelector(".textContainer");
const originalTextContent = textDisplayContainer.textContent;

const highlightWordOccurrences = () => {
  const searchWord = wordInputField.value.trim().toLowerCase();

  if (searchWord) {
    const regex = new RegExp(`\\b(${searchWord})\\b`, "gi");
    const highlightedText = originalTextContent.replace(
      regex,
      '<span class="highlight">$1</span>'
    );
    textDisplayContainer.innerHTML = highlightedText;
  } else {
    textDisplayContainer.textContent = originalTextContent;
  }
};

wordInputField.addEventListener("input", highlightWordOccurrences);
