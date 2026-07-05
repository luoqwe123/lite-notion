import { defineStore } from "pinia";
import { findTeamMembers, deleteTeamMember, updateTeamMemberRole, addTeamMember } from "~/api/teamMember";
import type { FindDto, MemberDto, TeamMember } from "~/api/teamMember";
import { ElMessage } from 'element-plus';

export const teamMemberStore = defineStore("teamMemberStore", {
  state: () => ({
    teamMembers: [] as TeamMember[],
    isLoading: false,
    error: null as string | null
  }),
  
  getters: {
    memberList: (state) => state.teamMembers,
    hasMembers: (state) => state.teamMembers.length > 0,
    isLoadingMembers: (state) => state.isLoading,
    memberById: (state) => (id: string) => state.teamMembers.find(member => member.id === id),
    membersByTeam: (state) => (teamId: string) => state.teamMembers.filter(member => member.teamId === teamId),
    membersByUser: (state) => (userId: string) => state.teamMembers.filter(member => member.userId === userId),
    memberByTeamAndUser: (state) => (teamId: string, userId: string) => 
      state.teamMembers.find(member => member.teamId === teamId && member.userId === userId)
  },
  
  actions: {
    // 获取团队成员列表
    async getTeamMembers(params: FindDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await findTeamMembers(params);
        
        if (res.code === "200" || res.code === 200) {
          this.teamMembers = res.data || [];
          return this.teamMembers;
        } else {
          this.error = res.message || "获取团队成员列表失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('获取团队成员列表失败:', error);
        
        // 设置错误状态
        this.error = error.message || "获取团队成员列表失败";
        
        // 显示用户友好的错误消息
        let errorMessage = "获取团队成员列表失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        ElMessage.error(errorMessage);
        
        // 返回空数组，避免页面崩溃
        this.teamMembers = [];
        return this.teamMembers;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 添加团队成员
    async addMember(data: MemberDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await addTeamMember(data);
        
        if (res.code === "200" || res.code === 200) {
          this.teamMembers.push(res.data);
          
          ElMessage({
            type: "success",
            message: "成员添加成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "添加成员失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('添加成员失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "添加成员失败，请重试";
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
    
    // 更新团队成员角色
    async updateMemberRole(data: MemberDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await updateTeamMemberRole(data);
        
        if (res.code === "200" || res.code === 200) {
          const index = this.teamMembers.findIndex(member => member.id === res.data.id);
          if (index !== -1) {
            this.teamMembers[index] = res.data;
          }
          
          ElMessage({
            type: "success",
            message: "成员角色更新成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "更新成员角色失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('更新成员角色失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "更新成员角色失败，请重试";
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
    
    // 删除团队成员
    async deleteMember(params: { teamId: string; userId?: string }) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await deleteTeamMember(params);
        
        if (res.code === "200" || res.code === 200) {
          this.teamMembers = this.teamMembers.filter(member => 
            !(member.teamId === params.teamId && 
              (!params.userId || member.userId === params.userId))
          );
          
          ElMessage({
            type: "success",
            message: "成员删除成功"
          });
          
          return res;
        } else {
          this.error = res.message || "删除成员失败";
          ElMessage.error(this.error!);
          throw new Error(this.error!);
        }
      } catch (error: any) {
        console.error('删除成员失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "删除成员失败，请重试";
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
    
    // 清除团队成员数据
    clearMembers() {
      this.teamMembers = [];
      this.error = null;
    },
    
    // 添加单个成员
    pushMember(member: TeamMember) {
      this.teamMembers.push(member);
    },
    
    // 移除成员
    removeMember(teamId: string, userId?: string) {
      this.teamMembers = this.teamMembers.filter(member => 
        !(member.teamId === teamId && 
          (!userId || member.userId !== userId))
      );
    },
    
    // 更新成员信息
    updateMemberInfo(updatedMember: TeamMember) {
      const index = this.teamMembers.findIndex(member => member.id === updatedMember.id);
      if (index !== -1) {
        this.teamMembers[index] = updatedMember;
      }
    }
  }
});