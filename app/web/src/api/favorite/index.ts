import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// Favorite模块枚举
enum API {
  CREATE_URL = "/favorite/create",
  FIND_URL = "/favorite",
  DELETE_URL = "/favorite/:id"
}

// Favorite模块DTOs
export interface CreateDto {
  userId?: string;
  documentId: string;
  tag?: string;
}

// Favorite模块响应类型
export interface Favorite {
  id: number;
  userId: string;
  documentId: string;
  tag: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteListResponse {
  code: string | number;
  message: string;
  data: Favorite[];
}

// 创建收藏
export function createFavorite(data: CreateDto): Promise<ApiResponse<Favorite>|any> {
  try {
    // 参数验证
    if (!data.documentId) {
      throw new Error('文档id不能为空');
    }
    
    return request.post<ApiResponse<Favorite>,any>(API.CREATE_URL, {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('创建收藏请求失败:', error);
    throw error;
  }
}

// 查找收藏
export function findFavorites(): Promise<ApiResponse<FavoriteListResponse>|any> {
  try {
    return request.get<ApiResponse<FavoriteListResponse>,any>(API.FIND_URL, {
      retryCount: 3
    });
  } catch (error) {
    console.error('查找收藏请求失败:', error);
    throw error;
  }
}

// 删除收藏
export function deleteFavorite(id: string): Promise<ApiResponse<{ message: string }>|any> {
  try {
    if (!id) {
      throw new Error('收藏ID不能为空');
    }
    
    return request.delete<ApiResponse<{ message: string }>,any>(API.DELETE_URL.replace(':id', id), {
      retryCount: 3
    });
  } catch (error) {
    console.error('删除收藏请求失败:', error);
    throw error;
  }
}