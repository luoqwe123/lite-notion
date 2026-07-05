import { defineStore } from "pinia";
import { createFavorite, findFavorites, deleteFavorite } from "~/api/favorite";
import type { CreateDto, Favorite } from "~/api/favorite";
import { ElMessage } from 'element-plus';

export const favoriteStore = defineStore("favoriteStore", {
  state: () => ({
    favorites: [] as Favorite[],
    isLoading: false,
    error: null as string | null
  }),
  
  getters: {
    favoriteList: (state) => state.favorites,
    hasFavorites: (state) => state.favorites.length > 0,
    isLoadingFavorites: (state) => state.isLoading,
    favoriteById: (state) => (id: string) => state.favorites.find(favorite => favorite.id === parseInt(id)),
    favoritesByDocument: (state) => (documentId: string) => 
      state.favorites.filter(favorite => favorite.documentId === documentId),
    favoritesByTag: (state) => (tag: string) => 
      state.favorites.filter(favorite => favorite.tag === tag)
  },
  
  actions: {
    // 获取收藏列表
    async getFavorites() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await findFavorites();
        
        if (res.code === "200" || res.code === 200) {
          this.favorites = res.data || [];
          return this.favorites;
        } else {
          this.error = res.message || "获取收藏列表失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('获取收藏列表失败:', error);
        
        // 设置错误状态
        this.error = error.message || "获取收藏列表失败";
        
        // 显示用户友好的错误消息
        let errorMessage = "获取收藏列表失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        ElMessage.error(errorMessage);
        
        // 返回空数组，避免页面崩溃
        this.favorites = [];
        return this.favorites;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 添加收藏
    async addFavorite(data: CreateDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await createFavorite(data);
        
        if (res.code === "200" || res.code === 200) {
          this.favorites.push(res.data);
          
          ElMessage({
            type: "success",
            message: "收藏添加成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "添加收藏失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('添加收藏失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "添加收藏失败，请重试";
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
    
    // 删除收藏
    async deleteFavorite(id: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await deleteFavorite(id);
        
        if (res.code === "200" || res.code === 200) {
          this.favorites = this.favorites.filter(favorite => favorite.id !== parseInt(id));
          
          ElMessage({
            type: "success",
            message: "收藏删除成功"
          });
          
          return res;
        } else {
          this.error = res.message || "删除收藏失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('删除收藏失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "删除收藏失败，请重试";
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
    
    // 清除收藏数据
    clearFavorites() {
      this.favorites = [];
      this.error = null;
    },
    
    // 添加单个收藏
    addFavoriteItem(favorite: Favorite) {
      this.favorites.push(favorite);
    },
    
    // 移除收藏
    removeFavorite(id: string) {
      this.favorites = this.favorites.filter(favorite => favorite.id !== parseInt(id));
    },
    
    // 更新收藏信息
    updateFavoriteInfo(updatedFavorite: Favorite) {
      const index = this.favorites.findIndex(favorite => favorite.id === updatedFavorite.id);
      if (index !== -1) {
        this.favorites[index] = updatedFavorite;
      }
    },
    
    // 检查文档是否被收藏
    isDocumentFavorited(documentId: string): boolean {
      return this.favorites.some(favorite => favorite.documentId === documentId);
    },
    
    // 获取文档的收藏标签
    getDocumentTag(documentId: string): string | null {
      const favorite = this.favorites.find(fav => fav.documentId === documentId);
      return favorite ? favorite.tag : null;
    }
  }
});