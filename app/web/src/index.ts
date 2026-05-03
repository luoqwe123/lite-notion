
console.log("~/.Ld9VirtualBox/")

import App from "./App.vue";
import { createPinia } from "pinia";

import { createApp } from "vue";
const app = createApp(App);
app.use(createApp);

app.mount("#app");