import { defineStore } from "pinia";
import { findAll } from "~/api/teams";


export const teamsStroe = defineStore("teamsStroe",{
    state:()=>({
        data:{}
    }),
    actions:{
        async getAllTeam(){
            let res = await findAll();
            this.data = res.data;
            return res.data;
        }
    }
})