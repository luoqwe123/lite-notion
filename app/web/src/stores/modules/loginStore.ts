
import { defineStore } from "pinia";

export const loginStore  = defineStore("loginStateStore",{
    state:()=>{
        return {
            state:"login"  //register
        }
    },
    getters:{

    },
    actions:{
        switchState(){
            this.state = this.state ==="login"?"register":"login"
        }
    }
})