<script setup>
import { useI18n } from "vue-i18n";
import Header from "../tests/components/Header.vue";

const { t } = useI18n();
</script>

<template>
  <Header></Header>

  <div
    data-aos="fade-left"
    data-aos-anchor="#example-anchor"
    data-aos-offset="500"
    data-aos-duration="1000"
    class="min-h-screen flex flex-col items-center justify-center bg-yellow-300 text-black px-4 py-10"
  >
    <img
      class="w-48 hover:scale-110 duration-800 cursor-pointer mb-5 border-4 rounded-4xl"
      src="../assets/pessoa.png"
      alt=""
    />
    <div class="max-w-3xl w-full text-center space-y-6">
      <h1 class="text-4xl font-extrabold tracking-tight">
        {{ t("aboutPage.title") }}
      </h1>

      <p class="text-lg leading-relaxed">
        {{ t("aboutPage.description", { name: "Gabriel Pimenta" }) }}
        <a
          href="https://pokeapi.co/"
          target="_blank"
          class="underline font-semibold hover:text-gray-800 transition"
          >PokéAPI</a
        >.
      </p>

      <footer class="pt-6 border-t border-black">
        <p class="mb-4 font-medium">
          {{ t("aboutPage.createdBy") }}
        </p>
        <a
          href="https://www.linkedin.com/in/gpimenta07"
          target="_blank"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-yellow-300 font-semibold rounded-full hover:bg-gray-900 transition"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 
              2.24 5 5 5h14c2.76 0 5-2.24 
              5-5v-14c0-2.76-2.24-5-5-5zm-11 
              19h-3v-10h3v10zm-1.5-11.27c-.97 
              0-1.75-.79-1.75-1.75s.78-1.75 
              1.75-1.75 1.75.79 
              1.75 1.75-.78 1.75-1.75 
              1.75zm13.5 11.27h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 
              1.12-2.5 2.5v5.5h-3v-10h3v1.5c.86-1.28 
              2.44-2.1 4.14-2.1 2.49 0 
              4.36 2.01 4.36 4.5v6.1z"
            />
          </svg>
          {{ t("aboutPage.linkedin") }}
        </a>
      </footer>

      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-yellow-300 font-semibold rounded-full hover:bg-gray-900 transition"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
        {{ t("aboutPage.back") }}
      </router-link>
    </div>
  </div>
</template>
