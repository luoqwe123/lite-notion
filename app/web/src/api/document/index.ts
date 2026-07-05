import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// Document模块枚举
enum API {
  CREATE_URL = "/document/create",
  FIND_URL = "/document",
  UPDATE_URL = "/document",
  DELETE_URL = "/document",
  FINDONE_URL = "/document/:id"
}

// Document模块DTOs
export interface BaseDto {
  teamId: string;
}

export interface CreateDto extends BaseDto {
  title: string;
  content?: string;
  kbId: string;
  userId?: string;
}

export interface DeleteDto extends BaseDto {
  id: string;
}

export interface FindDto extends BaseDto {
  id?: string;
  kbId: string;
  title?: string;
  content?: string;
  [key: string]: string | number | number[] | undefined;
}

export interface UpdateDto extends BaseDto {
  id: string;
  title?: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

// Document模块响应类型
export interface Document {
  id: number;
  title: string;
  content: string;
  kbId: string;
  teamId: string;
  userId: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface DocumentListResponse {
  code: string | number;
  message: string;
  data: Document[];
}

// 创建文档
export function createDocument(data: CreateDto): Promise<ApiResponse<Document>|any> {
  try {
    // 参数验证
    if (!data.teamId) {
      throw new Error('团队id不能为空');
    }
    
    if (!data.title) {
      throw new Error('标题不能为空');
    }
    
    if (!data.kbId) {
      throw new Error('空间id不能为空');
    }
    
    return request.post<ApiResponse<Document>,any>(API.CREATE_URL, {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('创建文档请求失败:', error);
    throw error;
  }
}

// 查找文档
export function findDocuments(params: FindDto): Promise<ApiResponse<DocumentListResponse>|any> {
  try {
    if (!params.teamId) {
      throw new Error('团队id不能为空');
    }
    
    if (!params.kbId) {
      throw new Error('空间id不能为空');
    }
    
    return request.get<ApiResponse<DocumentListResponse>,any>(API.FIND_URL, {
      params,
      retryCount: 3
    });
  } catch (error) {
    console.error('查找文档请求失败:', error);
    throw error;
  }
}

// 更新文档
export function updateDocument(data: UpdateDto): Promise<ApiResponse<Document>|any> {
  try {
    if (!data.teamId) {
      throw new Error('团队id不能为空');
    }
    
    if (!data.id) {
      throw new Error('文档id不能为空');
    }
    
    return request.patch<ApiResponse<Document>,any>(API.UPDATE_URL, {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('更新文档请求失败:', error);
    throw error;
  }
}

// 删除文档
export function deleteDocument(params: DeleteDto): Promise<ApiResponse<{ message: string }>|any> {
  try {
    if (!params.teamId) {
      throw new Error('团队id不能为空');
    }
    
    if (!params.id) {
      throw new Error('文档id不能为空');
    }
    
    return request.delete<ApiResponse<{ message: string }>,any>(API.DELETE_URL, {
      body:{id:params.id},
      retryCount: 3
    });
  } catch (error) {
    console.error('删除文档请求失败:', error);
    throw error;
  }
}

// 查找单个文档
export function findDocument(id: string): Promise<ApiResponse<Document>|any> {
  try {
    if (!id) {
      throw new Error('文档ID不能为空');
    }
    
    return request.get<ApiResponse<Document>,any>(API.FINDONE_URL.replace(':id', id), {
      retryCount: 3
    });
  } catch (error) {
    console.error('查找单个文档请求失败:', error);
    throw error;
  }
}