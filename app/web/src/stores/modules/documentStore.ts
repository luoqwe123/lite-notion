import { defineStore } from "pinia";
import { createDocument, findDocuments, updateDocument, deleteDocument, findDocument } from "~/api/document";
import type { CreateDto, UpdateDto, FindDto, Document } from "~/api/document";
import { ElMessage } from 'element-plus';

export const documentStore = defineStore("documentStore", {
  state: () => ({
    documents: [] as Document[],
    currentDocument: null as Document | null,
    isLoading: false,
    error: null as string | null
  }),
  
  getters: {
    documentList: (state) => state.documents,
    hasDocuments: (state) => state.documents.length > 0,
    isLoadingDocuments: (state) => state.isLoading,
    currentDocumentInfo: (state) => state.currentDocument,
    documentById: (state) => (id: string) => state.documents.find(doc => doc.id === parseInt(id)),
    documentsByTeam: (state) => (teamId: string) => state.documents.filter(doc => doc.teamId === teamId),
    documentsByKb: (state) => (kbId: string) => state.documents.filter(doc => doc.kbId === kbId)
  },
  
  actions: {
    // 获取文档列表
    async getDocuments(params: FindDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await findDocuments(params);
        
        if (res.code === "200" || res.code === 200) {
          this.documents = res.data || [];
          return this.documents;
        } else {
          this.error = res.message || "获取文档列表失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('获取文档列表失败:', error);
        
        // 设置错误状态
        this.error = error.message || "获取文档列表失败";
        
        // 显示用户友好的错误消息
        let errorMessage = "获取文档列表失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        ElMessage.error(errorMessage);
        
        // 返回空数组，避免页面崩溃
        this.documents = [];
        return this.documents;
      } finally {
        this.isLoading = false;
      }
    },
    
    // 创建文档
    async createDocument(data: CreateDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await createDocument(data);
        
        if (res.code === "200" || res.code === 200) {
          this.documents.push(res.data);
          
          ElMessage({
            type: "success",
            message: "文档创建成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "创建文档失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('创建文档失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "创建文档失败，请重试";
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
    
    // 更新文档
    async updateDocument(data: UpdateDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await updateDocument(data);
        
        if (res.code === "200" || res.code === 200) {
          const index = this.documents.findIndex(doc => doc.id === parseInt(data.id));
          if (index !== -1) {
            this.documents[index] = res.data;
          }
          
          // 如果更新的是当前选中的文档，更新当前文档
          if (this.currentDocument && this.currentDocument.id === parseInt(data.id)) {
            this.currentDocument = res.data;
          }
          
          ElMessage({
            type: "success",
            message: "文档更新成功"
          });
          
          return res.data;
        } else {
          this.error = res.message || "更新文档失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('更新文档失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "更新文档失败，请重试";
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
    
    // 删除文档
    async deleteDocument(params: { teamId: string; id: string }) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await deleteDocument(params);
        
        if (res.code === "200" || res.code === 200) {
          this.documents = this.documents.filter(doc => 
            !(doc.teamId === params.teamId && doc.id === parseInt(params.id))
          );
          
          // 如果删除的是当前选中的文档，清除当前文档
          if (this.currentDocument && 
              this.currentDocument.teamId === params.teamId && 
              this.currentDocument.id === parseInt(params.id)) {
            this.currentDocument = null;
          }
          
          ElMessage({
            type: "success",
            message: "文档删除成功"
          });
          
          return res;
        } else {
          this.error = res.message || "删除文档失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('删除文档失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "删除文档失败，请重试";
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
    
    // 获取单个文档
    async getDocument(id: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await findDocument(id);
        
        if (res.code === "200" || res.code === 200) {
          this.currentDocument = res.data;
          return res.data;
        } else {
          this.error = res.message || "获取文档失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('获取文档失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "获取文档失败，请重试";
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
    
    // 设置当前文档
    setCurrentDocument(document: Document | null) {
      this.currentDocument = document;
    },
    
    // 清除文档数据
    clearDocuments() {
      this.documents = [];
      this.currentDocument = null;
      this.error = null;
    },
    
    // 添加单个文档
    addDocument(document: Document) {
      this.documents.push(document);
    },
    
    // 移除文档
    removeDocument(teamId: string, documentId: string) {
      this.documents = this.documents.filter(doc => 
        !(doc.teamId === teamId && doc.id === parseInt(documentId))
      );
    },
    
    // 更新文档信息
    updateDocumentInfo(updatedDocument: Document) {
      const index = this.documents.findIndex(doc => doc.id === updatedDocument.id);
      if (index !== -1) {
        this.documents[index] = updatedDocument;
      }
    }
  }
});