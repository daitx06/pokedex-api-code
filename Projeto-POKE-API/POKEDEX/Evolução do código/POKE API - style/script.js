async function searchPokemon() {
    const query = document.getElementById('pokemon-search').value.toLowerCase().trim();
    if (!query) {
        alert('Por favor, digite o nome ou ID de um Pokémon.');
        return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        alert(error.message);
    }
}

function displayPokemon(pokemon) {
    const container = document.getElementById('pokemon-container');
    container.style.opacity = 0; // para animação de fade-out
    setTimeout(() => {
        const types = pokemon.types.map(type => `<span class="pokemon-type ${type.type.name}">${type.type.name}</span>`).join('');
        container.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-details">
                <p>ID: ${pokemon.id}</p>
                <div class="pokemon-types">
                    ${types}
                </div>
                <div class="pokemon-stats">
                    <p>Altura: ${pokemon.height / 10} m</p>
                    <p>Peso: ${pokemon.weight / 10} kg</p>
                </div>
            </div>
        `;
        container.style.transform = 'translateY(20px)';
        container.style.opacity = 1; // para animação de fade-in
        setTimeout(() => {
            container.style.transform = 'translateY(0)';
        }, 100);
    }, 300);
}
``
