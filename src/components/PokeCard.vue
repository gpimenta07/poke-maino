<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const pokeList = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    pokeList.value = response.data.results;
    console.log(pokeList.value);
  } catch (error) {
    console.error("Erro ao buscar os pokémons:", error);
  }
});
</script>

<template>
  
</template>
