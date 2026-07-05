

export const routers = [
    {
        path: "/",
        name: "home",
        component: () => import("~/views/Home.vue"),
        redirect: () => {
            return { path: "start" }
        },
        children: [
            {
                name: "start",
                path: "start",
                component: () => import("~/views/Start.vue"),
                meta: {
                    name: "首页",
                    isNav: true
                }
            },

            {
                name: "workSpace",
                path: "workSpace",
                component: () => import("~/views/Teams.vue"),
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
        name: "login",
        path: "/login",
        component: () => import("~/views/Login.vue"),
        meta: {
            isNav: false,
            name: "登录页"
        }
    },

    {
        path: "/workSpace/item/:itemId",
       

        component: () => import("~/views/workSpace.vue"),
        meta: {
            name: "工作空间内部",
            isNav: false
        },
        children: [
            // 空path作为默认页，承接父路由参数并重定向，标准写法
            {
                path: "",
                redirect: (to: any) => {
                    // 携带父路由params.id，用name跳转子路由
                    return { name: "spaceIntro", params: to.params }
                },
                name: "spaceData",
            },
            {
                name: "spaceIntro",
                path: "spaceIntro",
                component: () => import("~/views/SpaceIntro.vue"),
                meta: {
                    isNav: false,
                    name: "工作空间介绍"
                }
            },
            {
                name: "doc",
                path: "document/:docId",
                component: () => import("~/views/Document.vue"),
                meta: {
                    isNav: false,
                    name: "文档"
                }
            },
        ]
    },

    {
        name:"test",
        path: "/test",
        component:()=> import("~/views/Testfield/index.vue")        
    }
]