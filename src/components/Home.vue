<script setup>
import Header from "./Header.vue";
import PokeCard from "./PokeCard.vue";
</script>

<template>
  <Header></Header>
  
    <div class="flex justify-evenly items-center mt-5">
      <div class="flex flex-col">
        <label class="font-bold" for="">Nome</label>
        <input
          placeholder="Nome do Pokemon"
          class="bg-white border-2 outline-none rounded-lg px-2 py-1.5"
          type="text"
        />
      </div>
      <div class="flex flex-col">
        <label class="font-bold" for="">ID</label>
        <input
          placeholder="ID do Pokemon"
          class="bg-white border-2 outline-none rounded-lg px-2 py-1.5"
          type="number"
        />
      </div>
    
  
    <div class="flex flex-col">
      <label class="font-bold" for="">Tipo</label>
      <input
        placeholder="Tipo do Pokemon"
        class="bg-white border-2 outline-none rounded-lg px-2 py-1.5"
        type="text"
      />
    </div>
    <div class="flex flex-col">
      <label class="font-bold" for="">Espécie</label>
      <input
        placeholder="Espécie do Pokemon"
        class="bg-white border-2 outline-none rounded-lg px-2 py-1.5"
        type="text"
      />
    </div>
  </div>
  <hr class="mt-12 m-20">

  <div>
    <PokeCard />
  </div>
</template>
