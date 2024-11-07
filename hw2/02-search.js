document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardDeck");

  const highlightKeyword = (text, searchTerm) =>
    searchTerm
      ? text.replace(new RegExp(`(${searchTerm})`, "gi"), `<mark>$1</mark>`)
      : text;

  const createCharacterCard = (
    character,
    searchTerm = "",
    noResults = false
  ) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "col-auto mb-4";
    cardContainer.style.width = "18rem";

    const card = document.createElement("div");
    card.className = "card text-center";
    card.style.minHeight = "150px";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.innerHTML = noResults
      ? "No characters found"
      : highlightKeyword(character.name, searchTerm);

    cardBody.appendChild(title);

    if (!noResults) {
      const birthYear = document.createElement("p");
      birthYear.className = "card-text";
      birthYear.textContent = `Birth Year: ${character.birth_year}`;
      cardBody.appendChild(birthYear);
    }

    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    return cardContainer;
  };

  const displayFilteredCharacters = (searchTerm = "") => {
    cardsContainer.innerHTML = "";
    const filteredCharacters = searchTerm
      ? characters.filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : characters;

    filteredCharacters.length
      ? filteredCharacters.forEach((character) =>
          cardsContainer.appendChild(createCharacterCard(character, searchTerm))
        )
      : cardsContainer.appendChild(createCharacterCard({}, "", true));
  };

  document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document
      .getElementById("userInput")
      .value.trim()
      .toLowerCase();
    displayFilteredCharacters(searchTerm);
  });

  displayFilteredCharacters();
});
