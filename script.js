const searchBtn = document.getElementById("searchBtn");

async function fetchPokemon(pokemon = "ditto") {

  const input = document
    .getElementById("pokemonInput")
    .value
    .toLowerCase();

  const pokemonName = input || pokemon;

  try {

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    // Pokémon Name
    document.getElementById("pokemonName").textContent =
      data.name;

    // Pokémon Image
    document.getElementById("pokemonImage").src =
      data.sprites.other["official-artwork"].front_default;

    // Pokémon Types
    const typesContainer =
      document.getElementById("types");

    typesContainer.innerHTML = "";

    data.types.forEach(typeInfo => {

      const typeElement = document.createElement("div");

      typeElement.classList.add(
        "type",
        typeInfo.type.name
      );

      typeElement.textContent =
        typeInfo.type.name;

      typesContainer.appendChild(typeElement);
    });

    // Pokémon Stats
    const statsContainer =
      document.getElementById("stats");

    statsContainer.innerHTML = "";

    data.stats.forEach(stat => {

      const statElement =
        document.createElement("div");

      statElement.classList.add("stat");

      statElement.innerHTML = `
        <div class="stat-name">
          ${stat.stat.name}: ${stat.base_stat}
        </div>
      `;

      statsContainer.appendChild(statElement);
    });

  } catch (error) {

    alert(error.message);
  }
}

// Search Button
searchBtn.addEventListener("click", () => {
  fetchPokemon();
});

// Enter Key Support
document
  .getElementById("pokemonInput")
  .addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
      fetchPokemon();
    }
  });

// Default Pokémon on load
fetchPokemon();
