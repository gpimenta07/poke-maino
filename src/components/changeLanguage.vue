<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const selectedLanguage = ref(locale.value)

function changeLanguage(lang) {
  selectedLanguage.value = lang
  locale.value = lang
}
</script>

<template>
  <div class="flex items-center gap-4 bg-black p-2 rounded-lg">
    <button
      @click="changeLanguage('pt')"
      :class="[
        'transition-transform hover:scale-105 cursor-pointer rounded-full',
        selectedLanguage === 'pt' ? 'ring-2 ring-white' : ''
      ]"
    >
      <img
        src="/src/assets/icons8-brasil-48 (1).png"
        alt="Português"
        class="w-8 h-8 rounded-full"
      />
    </button>

    <button
      @click="changeLanguage('en')"
      :class="[
        'transition-transform hover:scale-105 cursor-pointer rounded-full',
        selectedLanguage === 'en' ? 'ring-2 ring-white' : ''
      ]"
    >
      <img
        src="/src/assets/icons8-eua-48.png"
        alt="Inglês"
        class="w-8 h-8 rounded-full"
      />
    </button>

    <button
      @click="changeLanguage('es')"
      :class="[
        'transition-transform hover:scale-105 cursor-pointer rounded-full',
        selectedLanguage === 'es' ? 'ring-2 ring-white' : ''
      ]"
    >
      <img
        src="/src/assets/icons8-espanha-48.png"
        alt="Espanhol"
        class="w-8 h-8 rounded-full"
      />
    </button>
  </div>
</template>
