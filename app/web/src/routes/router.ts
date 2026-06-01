

export const routers = [
    {
        path: "/",
        component: () => import("~/views/Home.vue"),
        redirect:()=>{
            return {path:"start"}
        },
        children: [
            {
                path: "start",
                component: () => import("~/views/Start.vue"),
                meta: {
                    name: "首页",
                    isNav: true
                }
            },

            {
                path: "workSpace",
                component: () => import("~/views/workSpace.vue"),
                meta: {
                    isNav: true,
                    name: "工作空间"
                },
                children: [

                ]
            },
        ],
        meta: {
            isNav: false,
            name: "首页"
        }
    },
    {
        path: "/login",
        component: () => import("~/views/Login.vue"),
        meta: {
            isNav: false,
            name: "登录页"
        }
    },
    {
        path: "/document/:id",
        component: () => import("~/views/Document.vue"),
        meta: {
            isNav: false,
            name: "文档"
        }
    },

]