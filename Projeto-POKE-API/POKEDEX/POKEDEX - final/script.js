async function searchPokemon() {
    const query = document.getElementById('pokemon-busca').value.toLowerCase().trim();
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
        const weaknesses = await getPokemonWeaknesses(pokemon.types);
        displayPokemon(pokemon, weaknesses);
    } catch (error) {
        alert(error.message);
    }
}

async function getPokemonWeaknesses(types) {
    const weaknesses = new Set();
    for (const type of types) {
        const response = await fetch(type.type.url);
        const typeData = await response.json();
        typeData.damage_relations.double_damage_from.forEach(weakType => weaknesses.add(weakType.name));
    }
    return Array.from(weaknesses);
}

function displayPokemon(pokemon, weaknesses) {
    const container = document.getElementById('pokemon-container');
    container.style.opacity = 0; // para animação de fade-out
    setTimeout(() => {
        const types = pokemon.types.map(type => `<span class="pokemon-tipo ${type.type.name}">${type.type.name}</span>`).join('');
        const weaknessesHTML = weaknesses.map(weakness => `<span class="pokemon-tipo ${weakness}">${weakness}</span>`).join('');
        container.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-detalhes">
                <p>ID: ${pokemon.id}</p>
                <div class="pokemon-tipos">
                    ${types}
                </div>
                <div class="pokemon-status">
                    <p>Altura: ${pokemon.height / 10} m</p>
                    <p>Peso: ${pokemon.weight / 10} kg</p>
                </div>
                <div class="pokemon-weaknesses">
                    <p>Fraquezas:</p>
                    ${weaknessesHTML}
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
