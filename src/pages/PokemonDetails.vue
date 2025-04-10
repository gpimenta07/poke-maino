<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n"; // i18n
import Header from "../tests/components/Header.vue";
import axios from "axios";

const { t } = useI18n(); // i18n
const route = useRoute();
const pokemonName = route.params.name;
const pokemon = ref(null);
const evolutionDetails = ref([]);
const flatSprites = ref({});
const loading = ref(true);

// Função para extrair URLs de sprites
function extractImageUrls(obj) {
  const urls = {};
  for (const key in obj) {
    if (typeof obj[key] === "string" && obj[key].startsWith("http")) {
      urls[key] = obj[key];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const nested = extractImageUrls(obj[key]);
      Object.assign(urls, nested);
    }
  }
  return urls;
}

// Função para pegar dados da evolução (nome + imagem)
async function getEvolutionChainImages(evoData) {
  const results = [];

  while (evoData) {
    const name = evoData.species.name;
    const pokeRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    results.push({
      name,
      image: pokeRes.data.sprites.other["official-artwork"].front_default,
    });

    evoData = evoData.evolves_to[0] || null;
  }

  return results;
}

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const speciesRes = await axios.get(res.data.species.url);
    const evolutionRes = await axios.get(speciesRes.data.evolution_chain.url);

    const evoChainData = evolutionRes.data.chain;
    evolutionDetails.value = await getEvolutionChainImages(evoChainData);

    flatSprites.value = extractImageUrls(res.data.sprites);

    pokemon.value = {
      name: res.data.name,
      sprites: res.data.sprites,
      artwork: res.data.sprites.other["official-artwork"].front_default,
      moves: res.data.moves.map((m) => m.move.name),
      game_indices: res.data.game_indices.map((g) => g.version.name),
    };

    loading.value = false;
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    loading.value = false;
  }
});
</script>

<template>
  <Header></Header>
  <div class="p-6 max-w-4xl mx-auto">
    <router-link
      to="/"
      class="text-blue-500 underline mb-4 block hover:text-blue-700 transition"
    >
      {{ t("back") }}
    </router-link>

    <div v-if="loading" class="text-center text-xl font-semibold animate-pulse">
      {{ t("loading") }}
    </div>

    <div v-else-if="!loading && pokemon?.name" class="space-y-8">
      <!-- Nome e imagem principal -->
      <div class="text-center">
        <h1 class="text-4xl font-extrabold capitalize mb-4 animate-fadeIn">
          {{ pokemon.name }}
        </h1>
        <img
          :src="pokemon.artwork"
          :alt="pokemon.name"
          class="w-48 h-48 mx-auto drop-shadow-lg transition-transform duration-300 hover:scale-105 animate-fadeIn"
        />
      </div>

      <!-- Sprites -->
      <div>
        <h2 class="text-2xl font-semibold mb-2">{{ t("sprites") }}</h2>
        <div class="flex flex-wrap gap-4 mb-4">
          <img
            v-for="(url, key) in flatSprites"
            :key="key"
            :src="url"
            :alt="`${pokemon.name} ${key}`"
            class="w-20 h-20 rounded-lg border shadow hover:scale-110 transform transition duration-200 animate-fadeIn"
          />
        </div>
      </div>

      <!-- Moves -->
      <div>
        <h2 class="text-2xl font-semibold mb-2">{{ t("moves") }}</h2>
        <ul class="list-disc list-inside mb-4 columns-2 sm:columns-3">
          <li
            v-for="move in pokemon.moves"
            :key="move"
            class="capitalize hover:translate-x-1 transition animate-fadeIn"
          >
            {{ move }}
          </li>
        </ul>
      </div>

      <!-- Evoluções -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">{{ t("evolutions") }}</h2>
        <div
          v-if="evolutionDetails.length <= 1"
          class="text-gray-600 italic animate-fadeIn"
        >
          {{ t("noEvolutions") }}
        </div>
        <div v-else class="flex flex-wrap justify-center gap-6 animate-fadeIn">
          <div
            v-for="evo in evolutionDetails"
            :key="evo.name"
            class="text-center transition hover:scale-105"
          >
            <img
              :src="evo.image"
              :alt="evo.name"
              class="w-28 h-28 mx-auto rounded shadow"
            />
            <p class="capitalize mt-2 font-medium">{{ evo.name }}</p>
          </div>
        </div>
      </div>

      <!-- Games -->
      <div>
        <h2 class="text-2xl font-semibold mb-2">{{ t("games") }}</h2>
        <ul class="list-disc list-inside capitalize">
          <li
            v-for="game in pokemon.game_indices"
            :key="game"
            class="hover:text-green-600 transition animate-fadeIn"
          >
            {{ game }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-center text-red-500 text-lg">
      {{ t("notFound") }}
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
