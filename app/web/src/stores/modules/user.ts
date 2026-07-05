import { defineStore } from "pinia";
import { login } from "~/api/login";
import type { loginDataType, LoginResponse } from "~/api/login";
import { ElMessage } from 'element-plus';

export const userStore = defineStore("userStore", {
    state: () => ({
        email: "",
        avatar: "",
        username: "",
        isLoading: false
    }),
    getters: {
        isLoggedIn: (state) => !!state.email,
        userInfo: (state) => ({
            email: state.email,
            username: state.username,
            avatar: state.avatar
        })
    },
    actions: {
        async userLogin(data: loginDataType) {
            this.isLoading = true;
            try {
                const res = await login(data);
                
                if (res.code === "200" || res.code === 200) {
                    // 登录成功，更新用户信息
                    this.email = res.data.email;
                    this.username = res.data.username;
                    this.avatar = res.data.avatar || "";
                    
                    ElMessage({
                        type: "success",
                        message: "登录成功"
                    });
                    
                    return res;
                } else {
                    // 登录失败，显示错误消息
                    ElMessage.error(res.message || "登录失败");
                    throw new Error(res.message || "登录失败");
                }
            } catch (error: any) {
                console.error('用户登录失败:', error);
                
                // 显示用户友好的错误消息
                let errorMessage = "登录失败，请重试";
                if (error.message) {
                    errorMessage = error.message;
                } else if (error.code === "NETWORK_ERROR") {
                    errorMessage = "网络连接失败，请检查网络";
                }
                
                ElMessage.error(errorMessage);
                
                // 不重新抛出错误，让组件能够继续执行
                return {
                    code: "ERROR",
                    message: errorMessage,
                    data: null
                };
            } finally {
                this.isLoading = false;
            }
        },
        
        // 用户登出方法
        async userLogout() {
            try {
                this.email = "";
                this.username = "";
                this.avatar = "";
                
                ElMessage({
                    type: "success",
                    message: "已退出登录"
                });
            } catch (error) {
                console.error('用户登出失败:', error);
                ElMessage.error("退出登录失败");
            }
        },
        
        // 清除用户信息
        clearUserInfo() {
            this.email = "";
            this.username = "";
            this.avatar = "";
        }
    }
})