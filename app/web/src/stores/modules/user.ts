import { defineStore } from "pinia";
import { login } from "~/api/login";
import type { loginDataType } from "~/api/login"

export const userStore = defineStore("userStore", {
    state: () => ({
        email: "",
        avatar: "string",
        username:"string"
    }),
    getters: {

    },
    actions: {
        async userLogin(data: loginDataType) {
            try {
                let res = await login(data);
                
                this.email = res.data.email;
                this.username = res.data.username
                return res
               
            } catch (error) {
                console.log(error)
            }

        }
    }
})