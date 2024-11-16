const searchInput = document.querySelector(`#poke-input`);
const searchBtn = document.querySelector(`.btn-search`);
const pokeContainer = document.querySelector(`.poke-container`);

const colors = {
    fire: `#F08030`,
    grass: `#78C850`,
    electric: `#F8D030`,
    water: `#6890F0`,
    ground: `#E0C068`,
    rock: `#B8A038`,
    fairy: `#EE99AC`,
    poison: `#A040A0`,
    bug: `#A8B820`,
    dragon: `#7038F8`,
    psychic: `#F85888`,
    flying: `#A890F0`,
    fighting: `#C03028`,
    normal: `#A8A878`,
    ice: `#98D8D8`,
};

const pokeCount = 151;

const initPokemon = async () => {
    for (let i = 1; i <= pokeCount; i++) { // <= yerine dikkat!
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, `0`);
    const weight = pokemon.weight; // 'weight' doğru yazım!
    const type = pokemon.types.map(t => t.type.name).join(", "); // Çoklu türleri desteklemek için
    const color = colors[pokemon.types[0].type.name]; // İlk türün rengini alıyoruz
    const pokemonEl = document.createElement(`div`);
    pokemonEl.classList.add(`poke-box`);

    pokemonEl.style.backgroundColor = `${color}`;

    pokemonEl.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name} image">
        <h4 class="poke-name">${name}</h4>
        <p class="poke-id">#${id}</p>
        <p class="poke-weight">Weight: ${weight} Kg</p>
        <p class="poke-type">Type: ${type}</p>
    `;

    pokeContainer.appendChild(pokemonEl);
};

initPokemon();

searchInput.addEventListener("input", function (e) {
    const pokeNames = document.querySelectorAll(`.poke-name`); 
    const search = searchInput.value.toLowerCase(); 
  
    pokeNames.forEach((pokeName) => {
      pokeName.parentElement.style.display = 'block'; 
      if (!pokeName.innerHTML.toLowerCase().includes(search)) {
        pokeName.parentElement.style.display = 'none'; 
      }
    });
  });
  
