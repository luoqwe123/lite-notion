

import { createRouter,createWebHistory  } from "vue-router";

export const routes = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            component: ()=>import("~/views/Home.vue")
        },
        {
            path:"/login",
            component:()=>import("~/views/Login.vue")
        },
        {
            path:"/document",
            component:()=>import("~/views/Document.vue")
        }
    ]
})