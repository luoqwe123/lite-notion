

import { routes } from "./index";
import { workSpaceStore } from "~/stores/modules/workSpaceStore";
import { teamsStroe } from "~/stores/modules/teams";
import { routers } from "./router";

let hasSpaceData = false;
routes.beforeEach(async (to, from, next) => {

    if (to.name === "workSpace") {
        if (!hasSpaceData) {
            const useworkSpaceStore = workSpaceStore()
            const useTeamsStroe = teamsStroe()
            let teams = await useTeamsStroe.getAllTeam();
            let teamsData: any = [];
            teams.forEach((item: any) => {
                teamsData.push(item.teamId)
            });

            let res = await useworkSpaceStore.OGetAllworkSpa(teamsData)

            spaceRoutes(res)
            hasSpaceData = true
        }

    }
    


    next()
})
function spaceRoutes(dataList: any) {
   
    let routeModel: any = {
        path: "item/",
        name: "spaceData",
        meta: {
            name: "",
            isNav: true
        }
    }

    let childRoutes: any = [];
    for (const key in dataList) {
        if (!dataList.hasOwnProperty(key)) continue;

        const data = dataList[key];
        data.forEach((item: any) => {
            let deepRouteModel = structuredClone(routeModel)
          
            deepRouteModel.path = "workSpace/"+  deepRouteModel.path + item.id
            deepRouteModel.meta.name = item.name
            childRoutes.push(deepRouteModel)

        })

    }
    for (const el of routers) {
        if (el.path === "/") {
            let children = el.children as routersType[]
            for (const oc of children) {
                if (oc.path === "workSpace")
                    oc.children.push(...childRoutes)
            }
        }
    }
    // console.log(routers)
    // console.log(routes.getRoutes())


}

