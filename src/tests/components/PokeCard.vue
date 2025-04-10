<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const pokeList = ref([]);
const isLoading = ref(true);
const search = ref("");
const searchId = ref("");
const searchType = ref("");
const searchSpecies = ref("");

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
          types: res.data.types.map((t) => t.type.name), // sem tradução
          species: genus?.genus || "Desconhecido",
        };
      })
    );

    pokeList.value = pokemons;
  } catch (error) {
    console.error("Erro ao buscar os pokémons:", error);
  } finally {
    isLoading.value = false;
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
      pokemon.types.some((type) =>
        type.toLowerCase().includes(searchType.value.toLowerCase())
      );
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

    <!-- Input Filtros -->
    <div
      class="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-6 max-w-5xl mx-auto"
    >
      <input
        v-model="search"
        type="text"
        :placeholder="t('searchName')"
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="searchId"
        type="number"
        :placeholder="t('searchId')"
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="searchType"
        type="text"
        :placeholder="t('searchType')"
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="searchSpecies"
        type="text"
        :placeholder="t('searchSpecies')"
        class="w-full sm:w-1/4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
    </div>
    <div class="flex items-center justify-center m-5">
      <h2>{{ t("filter") }}</h2>
    </div>
    

    <!-- Mensagem de carregando -->
    <div
      v-if="isLoading"
      class="text-center text-xl font-semibold text-gray-600 my-10"
    >
      {{ t("loading") }}
    </div>

    <!-- Lista de Pokémons -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        data-aos-anchor-placement="center-bottom"
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        class="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center"
      >
        <img :src="pokemon.image" :alt="pokemon.name" class="w-26 h-26 mb-4" />
        <h2 class="text-lg font-semibold capitalize">{{ pokemon.name }}</h2>
        <p class="text-gray-500 mb-1">ID: {{ pokemon.id }}</p>
        <p class="text-gray-400 text-sm italic mb-2">
          {{ t("species") }}: {{ pokemon.species }}
        </p>

        <div class="flex flex-wrap justify-center gap-2 mb-2">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="px-2 py-1 text-xs rounded-full text-white capitalize"
            :class="{
              'bg-yellow-500': type === 'electric',
              'bg-red-500': type === 'fire',
              'bg-blue-500': type === 'water',
              'bg-green-500': type === 'grass',
              'bg-gray-500': type === 'normal',
              'bg-purple-600': type === 'poison',
              'bg-pink-500': type === 'fairy',
              'bg-stone-500': type === 'rock',
              'bg-orange-500': type === 'fighting',
              'bg-cyan-500': type === 'ice',
              'bg-lime-500': type === 'bug',
              'bg-indigo-600': type === 'ghost',
              'bg-slate-600': type === 'dark',
              'bg-amber-600': type === 'ground',
              'bg-sky-600': type === 'flying',
              'bg-violet-600': type === 'psychic',
              'bg-neutral-600': type === 'steel',
              'bg-emerald-600': type === 'dragon',
            }"
          >
            {{ type }}
          </span>
        </div>

        <router-link
          :to="`/pokemon/${pokemon.name}`"
          class="bg-blue-500 text-white px-8 py-2 mt-4 rounded hover:bg-blue-600 cursor-pointer transition-colors"
        >
          {{ t("details") }}
        </router-link>
      </div>
    </div>
  </div>
</template>
