async function searchPokemon() {
    const query = document.getElementById('pokemon-search').value.toLowerCase();
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
    container.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Altura: ${pokemon.height / 10} m</p>
        <p>Peso: ${pokemon.weight / 10} kg</p>
    `;
}

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
