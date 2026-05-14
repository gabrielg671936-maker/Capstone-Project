  fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    .then(res => res.json())
    .then(data => {
      const cards = data.cards;
      container.innerHTML = "";

      cards.forEach(card => {
        container.innerHTML += `
          <div class="card">
            <img src="${imageMap[card.name] || 'images/default.png'}" alt="${card.name}" />
            <h2>${card.name}</h2>
            <p>${card.meaning_up}</p>
          </div>
        `;
      });
    })
    .catch(err => {
      container.innerHTML = "<p>Something went wrong.</p>";
      console.error(err);
    });