

import { createRouter,createWebHistory  } from "vue-router";

export const routes = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            component: ()=>import("~/views/Home.vue")
        }
    ]
})