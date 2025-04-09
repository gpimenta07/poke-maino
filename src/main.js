// src/main.js
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n/i18n";

const app = createApp(App);

app.use(router);
app.use(i18n); // <-- esse tem que vir ANTES do mount

app.mount("#app");
