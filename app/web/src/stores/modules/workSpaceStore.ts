import { defineStore } from "pinia";
import { getWorkSpa,getAllWorkSpa } from "~/api/workspace";


export const workSpaceStore = defineStore("workSpaceStore",{
    state:()=>({
        dataList:{}
    }),
    actions:{
        async OGetworkSpa(id?:string){
            let res =  await getWorkSpa(id)
           
        },
        async OGetAllworkSpa(teamId:number[]){
            let res:any =  await getAllWorkSpa(teamId);
            this.dataList = res.data
            return res.data
        }
    }
})