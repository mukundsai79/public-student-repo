const searchButton = document.querySelector("input[type='button']");
const searchInputField = document.getElementById("userInput");
const cardsContainer = document.getElementById("cardDeck");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInputField.value.toLowerCase().trim();
  cardsContainer.innerHTML = "";
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm)
  );

  if (filteredCharacters.length > 0) {
    filteredCharacters.forEach((character) => {
      const characterColumn = document.createElement("div");
      characterColumn.className = "col-sm-6 col-md-5 col-lg-2";

      const characterCard = document.createElement("div");
      characterCard.className = "card h-60";

      characterCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${highlightKeyword(
            character.name,
            searchTerm
          )}</h5>
          <p class="card-text">Birth year: <span>${
            character.birth_year
          }</span></p>
        </div>`;

      characterColumn.appendChild(characterCard);
      cardsContainer.appendChild(characterColumn);
    });
  } else {
    cardsContainer.innerHTML = '<p class="text-center">No results found</p>';
  }
});

function highlightKeyword(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    '<span style="background-color: yellow;">$1</span>'
  );
}
