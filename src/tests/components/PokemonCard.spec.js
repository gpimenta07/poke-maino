import { mount } from "@vue/test-utils";
import PokeCard from "../components/PokeCard.vue";
import { createI18n } from "vue-i18n";

// Configuração de tradução mockada
const messages = {
  en: {
    home: "Home",
    about: "About",
    pokedexTitle: "Pokédex",
    searchName: "Search by name...",
    searchId: "Search by ID...",
    searchType: "Search by type (e.g. Fire)...",
    searchSpecies: "Search by species (e.g. Seed...)",
    loading: "Loading Pokémons...",
    id: "ID",
    species: "Species",
    details: "Details",
    types: {
      normal: "Normal",
      fire: "Fire",
      water: "Water",
      electric: "Electric",
      grass: "Grass",
      ice: "Ice",
      fighting: "Fighting",
      poison: "Poison",
      ground: "Ground",
      flying: "Flying",
      psychic: "Psychic",
      bug: "Bug",
      rock: "Rock",
      ghost: "Ghost",
      dragon: "Dragon",
      dark: "Dark",
      steel: "Steel",
      fairy: "Fairy",
    },
    back: "← Back",
    sprites: "Sprites",
    moves: "Moves",
    evolutions: "Evolutions",
    noEvolutions: "This Pokémon has no evolutions.",
    games: "Appears in Games",
    notFound: "Pokémon not found.",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

describe("PokeCard.vue", () => {
  it("renderiza corretamente após carregar os pokémons", async () => {
    const wrapper = mount(PokeCard, {
      global: {
        plugins: [i18n],
        stubs: ["router-link"], // Aqui é onde o aviso é resolvido
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
