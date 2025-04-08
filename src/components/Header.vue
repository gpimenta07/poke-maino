<script setup>
import { useI18n } from 'vue-i18n'
import ChangeLanguage from './changeLanguage.vue';
const { t } = useI18n()

</script>

<template>
  <div class="container">
    <div class="bg-black w-screen flex items-center justify-between">
      <div class="flex items-center md:gap-5 ml-2 md:ml-5">
        <img class="w-10 md:w-24 m-3" src="../assets/pikachu.png" alt="" />
        <h1 class="text-white md:text-4xl font-serif">Mainô Pokédex</h1>
    </div>
      <div class="flex flex-col md:flex-row mt-2 md:mt-0 items-center md:gap-20 mr-5">
          <ul class="flex gap-5 md:gap-15">
            <li class="text-gray-300 cursor-pointer hover:scale-108 hover:text-white duration-500 md:text-xl">Início</li>
            <li class="text-gray-300 cursor-pointer hover:scale-108 hover:text-white duration-500 md:text-xl">Sobre</li>
          </ul>
          <div>
            <ChangeLanguage />
          </div>
      </div>
    </div>
    

  </div>
</template>
