// src/main.js
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n/i18n";
import AOS from "aos";
import "aos/dist/aos.css";
import { createPinia } from "pinia";

AOS.init();
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(i18n); 

app.mount("#app");
