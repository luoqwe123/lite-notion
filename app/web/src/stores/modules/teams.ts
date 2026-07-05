import { defineStore } from "pinia";
import { findAll } from "~/api/teams";
import type { TeamListResponse } from "~/api/teams";
import { ElMessage } from 'element-plus';

export const teamsStroe = defineStore("teamsStroe",{
    state:()=>({
        data: [] as any[],
        isLoading: false,
        error: null as string | null
    }),
    getters: {
        teamList: (state) => state.data,
        hasTeams: (state) => state.data.length > 0,
        isLoadingTeams: (state) => state.isLoading
    },
    actions:{
        async getAllTeam(){
            this.isLoading = true;
            this.error = null;
            
            try {
                const res = await findAll();
                
                if (res.code === "200" || res.code === 200) {
                    this.data = res.data || [];
                    return this.data;
                } else {
                    this.error = res.message || "获取团队列表失败";
                    ElMessage.error(this.error!);
                    throw new Error(this.error!);
                }
            } catch (error: any) {
                console.error('获取团队列表失败:', error);
                
                // 设置错误状态
                this.error = error.message || "获取团队列表失败";
                
                // 显示用户友好的错误消息
                let errorMessage = "获取团队列表失败，请重试";
                if (error.message) {
                    errorMessage = error.message;
                } else if (error.code === "NETWORK_ERROR") {
                    errorMessage = "网络连接失败，请检查网络";
                }
                
                ElMessage.error(errorMessage);
                
                // 返回空数组，避免页面崩溃
                this.data = [];
                return this.data;
            } finally {
                this.isLoading = false;
            }
        },
        
        // 清除团队数据
        clearTeams() {
            this.data = [];
            this.error = null;
        },
        
        // 添加单个团队
        addTeam(team: any) {
            this.data.push(team);
        },
        
        // 移除团队
        removeTeam(teamId: string) {
            this.data = this.data.filter(team => team.id !== teamId);
        },
        
        // 更新团队信息
        updateTeam(updatedTeam: any) {
            const index = this.data.findIndex(team => team.id === updatedTeam.id);
            if (index !== -1) {
                this.data[index] = updatedTeam;
            }
        }
    }
})