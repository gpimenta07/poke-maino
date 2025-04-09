<script setup>
import Header from "../tests/components/Header.vue";
import PokeCard from "../tests/components/PokeCard.vue";
</script>

<template>
  <Header data-aos="zoom-in"></Header>

  <div>
    <PokeCard data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" />
  </div>
</template>
