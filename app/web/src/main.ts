



import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { routes } from "./routes";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "~assets/style/tailwind.css"
import "~assets/style/main.scss";
import "~/routes/guar"
import 'virtual:svg-icons-register';
import { useThemeStore } from './stores/modules/themeStore'; // Import theme store

const app = createApp(App);
app.use(createApp);
const pinia = createPinia(); // Create pinia instance
app.use(pinia); // Use the created pinia instance
// Initialize theme
const themeStore = useThemeStore();
themeStore.initializeTheme();

// app.use(ElementPlus);
app.use(routes)

app.mount("#app");