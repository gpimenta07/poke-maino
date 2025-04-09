// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/Home.vue';
import PokemonDetails from '../pages/PokemonDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/pokemon/:name',
    name: 'PokemonDetails',
    component: PokemonDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
