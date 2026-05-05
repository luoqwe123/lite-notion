



import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { routes } from "./routes";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import 'element-plus/theme-chalk/dark/css-vars.css'
import "~assets/style/tailwind.css";
import 'virtual:svg-icons-register';

const app = createApp(App);
app.use(createApp);
app.use(createPinia);
app.use(ElementPlus);
app.use(routes)

app.mount("#app");