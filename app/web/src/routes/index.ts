

import { createRouter, createWebHistory } from "vue-router";
import { routers } from "./router";
export const routes = createRouter({
    history: createWebHistory(),
    routes: routers
})