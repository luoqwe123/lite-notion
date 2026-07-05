import { defineStore } from "pinia";
import { createTeam, deleteTeam, updateTeam, findTeams, findAllTeams } from "~/api/team";
import type { CreateDto, UpdateDto, Team } from "~/api/team";
import { ElMessage } from 'element-plus';

export const teamStore = defineStore("teamStore", {
  state: () => ({
    teams: [] as Team[],
    currentTeam: null as Team | null,
    isLoading: false,
    error: null as string | null
  }),
  
  getters: {
    teamList: (state) => state.teams,
    hasTeams: (state) => state.teams.length > 0,
    isLoadingTeams: (state) => state.isLoading,
    currentTeamInfo: (state) => state.currentTeam,
    teamById: (state) => (id: string) => state.teams.find(team => team.id === parseInt(id))
  },
  
  actions: {
    // 获取所有团队
    async getAllTeams() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await findAllTeams();
        
        if (res.code === "200" || res.code === 200) {
          this.teams = res.data || [];
          return this.teams;
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
        this.teams = [];
        return this.teams;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 创建团队
    async createTeam(data: CreateDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await createTeam(data);
        
        if (res.code === "200" || res.code === 200) {
          this.teams.push(res.data);
          
          ElMessage({
            type: "success",
            message: "团队创建成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "创建团队失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('创建团队失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "创建团队失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        this.error = errorMessage;
        ElMessage.error(errorMessage);
        
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 删除团队
    async deleteTeam(id: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await deleteTeam(id);
        
        if (res.code === "200" || res.code === 200) {
          this.teams = this.teams.filter(team => team.id !== parseInt(id));
          
          // 如果删除的是当前选中的团队，清除当前团队
          if (this.currentTeam && this.currentTeam.id === parseInt(id)) {
            this.currentTeam = null;
          }
          
          ElMessage({
            type: "success",
            message: "团队删除成功"
          });
          
          return res;
        } else {
          this.error = res.message || "删除团队失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('删除团队失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "删除团队失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        this.error = errorMessage;
        ElMessage.error(errorMessage);
        
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 更新团队
    async updateTeam(id: string, data: UpdateDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await updateTeam(id, data);
        
        if (res.code === "200" || res.code === 200) {
          const index = this.teams.findIndex(team => team.id === parseInt(id));
          if (index !== -1) {
            this.teams[index] = res.data;
          }
          
          // 如果更新的是当前选中的团队，更新当前团队
          if (this.currentTeam && this.currentTeam.id === parseInt(id)) {
            this.currentTeam = res.data;
          }
          
          ElMessage({
            type: "success",
            message: "团队更新成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "更新团队失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('更新团队失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "更新团队失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        this.error = errorMessage;
        ElMessage.error(errorMessage);
        
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 设置当前团队
    setCurrentTeam(team: Team | null) {
      this.currentTeam = team;
    },
    
    // 清除团队数据
    clearTeams() {
      this.teams = [];
      this.currentTeam = null;
      this.error = null;
    },
    
    // 添加单个团队
    addTeam(team: Team) {
      this.teams.push(team);
    },
    
    // 移除团队
    removeTeam(teamId: string) {
      this.teams = this.teams.filter(team => team.id !== parseInt(teamId));
    },
    
    // 更新团队信息
    updateTeamInfo(updatedTeam: Team) {
      const index = this.teams.findIndex(team => team.id === updatedTeam.id);
      if (index !== -1) {
        this.teams[index] = updatedTeam;
      }
    }
  }
});