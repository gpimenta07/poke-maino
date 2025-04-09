<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";

const pokeList = ref([]);
const isLoading = ref(true); // estado de carregamento
const search = ref(""); // filtro por nome
const searchId = ref(""); // filtro por ID
const searchType = ref(""); // filtro por tipo
const searchSpecies = ref(""); // filtro por espécie

const typeTranslations = {
  normal: "normal",
  fire: "fogo",
  water: "água",
  electric: "elétrico",
  grass: "grama",
  ice: "gelo",
  fighting: "lutador",
  poison: "veneno",
  ground: "terra",
  flying: "voador",
  psychic: "psíquico",
  bug: "inseto",
  rock: "pedra",
  ghost: "fantasma",
  dragon: "dragão",
  dark: "noturno",
  steel: "aço",
  fairy: "fada",
};

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const results = response.data.results;

    const detailedResponses = await Promise.all(
      results.map((poke) => axios.get(poke.url))
    );

    const pokemons = await Promise.all(
      detailedResponses.map(async (res) => {
        const speciesRes = await axios.get(res.data.species.url);
        const genus =
          speciesRes.data.genera.find((g) => g.language.name === "pt") ||
          speciesRes.data.genera.find((g) => g.language.name === "en");

        return {
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.front_default,
          types: res.data.types.map(
            (t) => typeTranslations[t.type.name] || t.type.name
          ),
          species: genus?.genus || "Desconhecido",
        };
      })
    );

    pokeList.value = pokemons;
  } catch (error) {
    console.error("Erro ao buscar os pokémons:", error);
  } finally {
    isLoading.value = false; // Finaliza o loading
  }
});

const filteredPokemons = computed(() => {
  return pokeList.value.filter((pokemon) => {
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const idMatch =
      searchId.value === "" || pokemon.id.toString().includes(searchId.value);
    const typeMatch =
      searchType.value === "" ||
      pokemon.types.includes(searchType.value.toLowerCase());
    const speciesMatch =
      searchSpecies.value === "" ||
      pokemon.species.toLowerCase().includes(searchSpecies.value.toLowerCase());
    return nameMatch && idMatch && typeMatch && speciesMatch;
  });
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-extrabold italic mb-6 text-center">Pokédex</h1>

    <!-- Filtros -->
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-6 max-w-5xl mx-auto"
    >
      <input
        v-model="search"
        type="text"
        placeholder="Pesquisar por nome..."
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="searchId"
        type="number"
        placeholder="Pesquisar por ID..."
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="searchType"
        type="text"
        placeholder="Pesquisar por tipo (ex: fogo)..."
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="searchSpecies"
        type="text"
        placeholder="Pesquisar por espécie (ex: Seed...)"
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Mensagem de carregando -->
    <div v-if="isLoading" class="text-center text-xl font-semibold text-gray-600 my-10">
      Carregando Pokémons...
    </div>

    <!-- Lista de Pokémons -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200"
      >
        <img :src="pokemon.image" :alt="pokemon.name" class="w-26 h-26 mb-4" />
        <h2 class="text-lg font-semibold capitalize">{{ pokemon.name }}</h2>
        <p class="text-gray-500 mb-1">ID: {{ pokemon.id }}</p>
        <p class="text-gray-400 text-sm italic mb-2">
          Espécie: {{ pokemon.species }}
        </p>

        <div class="flex flex-wrap justify-center gap-2 mb-2">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="px-2 py-1 text-xs rounded-full text-white capitalize"
            :class="{
              'bg-yellow-500': type === 'elétrico',
              'bg-red-500': type === 'fogo',
              'bg-blue-500': type === 'água',
              'bg-green-500': type === 'grama',
              'bg-gray-500': type === 'normal',
              'bg-purple-600': type === 'veneno',
              'bg-pink-500': type === 'fada',
              'bg-stone-500': type === 'pedra',
              'bg-orange-500': type === 'lutador',
              'bg-cyan-500': type === 'gelo',
              'bg-lime-500': type === 'inseto',
              'bg-indigo-600': type === 'fantasma',
              'bg-slate-600': type === 'noturno',
              'bg-amber-600': type === 'terra',
              'bg-sky-600': type === 'voador',
              'bg-violet-600': type === 'psíquico',
              'bg-neutral-600': type === 'aço',
              'bg-emerald-600': type === 'dragão',
            }"
          >
            {{ type }}
          </span>
        </div>

        <router-link
          :to="`/pokemon/${pokemon.name}`"
          class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer transition-colors"
        >
          Detalhes
        </router-link>
      </div>
    </div>
  </div>
</template>
