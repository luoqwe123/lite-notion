import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// Team模块枚举
enum API {
  CREATE_URL = "/team/create",
  DELETE_URL = "/team/:id",
  UPDATE_URL = "/team/:id",
  FIND_URL = "/team",
  FINDALL_URL = "/team/findAll"
}

// Team模块DTOs
export interface BaseDto {
  id?: string;
  name?: string;
  ownerId?: string;
  description?: string;
  [key:string]:string | number | undefined|number[]; 
}

export interface CreateDto {
  name: string;
  description?: string;
  avatar: string;
}

export interface UpdateDto {
  name: string;
  description?: string;
  avatar: string;
}

// Team模块响应类型
export interface Team {
  id: number;
  name: string;
  description: string;
  avatar: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamListResponse {
  code: string | number;
  message: string;
  data: Team[];
}

// 创建团队
export function createTeam(data: CreateDto): Promise<ApiResponse<Team>|any> {
  try {
    // 参数验证
    if (!data.name) {
      throw new Error('团队名不能为空');
    }
    
    if (!data.avatar) {
      throw new Error('团队头像不能为空');
    }
    
    return request.post<ApiResponse<Team>,any>(API.CREATE_URL, {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('创建团队请求失败:', error);
    throw error;
  }
}

// 删除团队
export function deleteTeam(id: string): Promise<ApiResponse<{ message: string }>|any> {
  try {
    if (!id) {
      throw new Error('团队ID不能为空');
    }
    
    return request.delete<ApiResponse<{ message: string }>,any>(API.DELETE_URL.replace(':id', id), {
      retryCount: 3
    });
  } catch (error) {
    console.error('删除团队请求失败:', error);
    throw error;
  }
}

// 更新团队
export function updateTeam(id: string, data: UpdateDto): Promise<ApiResponse<Team>|any> {
  try {
    if (!id) {
      throw new Error('团队ID不能为空');
    }
    
    if (!data.name) {
      throw new Error('团队名不能为空');
    }
    
    if (!data.avatar) {
      throw new Error('团队头像不能为空');
    }
    
    return request.patch<ApiResponse<Team>,any>(API.UPDATE_URL.replace(':id', id), {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('更新团队请求失败:', error);
    throw error;
  }
}

// 查找团队
export function findTeams(params?: BaseDto): Promise<ApiResponse<TeamListResponse>|any> {
  try {
    return request.get<ApiResponse<TeamListResponse>,any>(API.FIND_URL, {
      params,
      retryCount: 3
    });
  } catch (error) {
    console.error('查找团队请求失败:', error);
    throw error;
  }
}

// 查找所有团队
export function findAllTeams(): Promise<ApiResponse<TeamListResponse>|any> {
  try {
    return request.get<ApiResponse<TeamListResponse>,any>(API.FINDALL_URL, {
      retryCount: 3
    });
  } catch (error) {
    console.error('查找所有团队请求失败:', error);
    throw error;
  }
}