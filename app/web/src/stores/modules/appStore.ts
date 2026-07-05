import { defineStore } from "pinia";
import { getHello } from "~/api/app";

export const appStore = defineStore("appStore", {
  state: () => ({
    helloMessage: '',
    isLoading: false,
    error: null as string | null
  }),
  
  getters: {
    getHelloMessage: (state) => state.helloMessage,
    isLoadingApp: (state) => state.isLoading
  },
  
  actions: {
    // 获取Hello消息
    async fetchHelloMessage() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await getHello();
        
        if (res.code === "200" || res.code === 200) {
          this.helloMessage = res.data;
          return this.helloMessage;
        } else {
          this.error = res.message || "获取Hello消息失败";
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('获取Hello消息失败:', error);
        this.error = error.message || "获取Hello消息失败";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 清除应用数据
    clearAppData() {
      this.helloMessage = '';
      this.error = null;
    }
  }
});