document.addEventListener("DOMContentLoaded", () => {
  const wordInputField = document.getElementById("wordInput");
  const textDisplayContainer = document.getElementById("textToHighlight");
  const originalTextContent = textDisplayContainer.textContent;

  const escapeRegex = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightWordOccurrences = () => {
    const searchWord = wordInputField.value.trim().toLowerCase();

    if (!searchWord) {
      textDisplayContainer.innerHTML = originalTextContent;
      return;
    }

    const regex = new RegExp(`(${escapeRegex(searchWord)})`, "gi");

    const highlightedText = originalTextContent.replace(
      regex,
      "<mark>$1</mark>"
    );
    textDisplayContainer.innerHTML = highlightedText;
  };

  wordInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      highlightWordOccurrences();
    }
  });
});
