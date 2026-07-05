import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// Workspace模块枚举
enum API {
  CREATE_URL = "/workspace/create",
  DELETE_URL = "/workspace/:teamid/:id",
  UPDATE_URL = "/workspace/:teamid/:id",
  FIND_URL = "/workspace"
}

// Workspace模块DTOs
export interface BaseDto {
  teamId: string;
  userId?: string;
}

export interface CommonDto extends BaseDto {
  name: string;
}

export interface FindDto {
  id?: string;
  teamId?: string;
  name?: string;
  [key:string] :  string | number | undefined|number[]
}

export interface CreateSpaceDto {
  name: string;
  description?: string;
  teamId: string;
}

// Workspace模块响应类型
export interface Workspace {
  id: number;
  name: string;
  teamId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceListResponse {
  code: string | number;
  message: string;
  data: Workspace[];
}

// 创建工作区
export function createWorkspace(data: CommonDto): Promise<ApiResponse<Workspace>|any> {
  try {
    // 参数验证
    if (!data.teamId) {
      throw new Error('团队编号不能为空');
    }
    
    if (!data.name) {
      throw new Error('空间名不能为空');
    }
    
    return request.post<ApiResponse<Workspace>,any>(API.CREATE_URL, {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('创建工作区请求失败:', error);
    throw error;
  }
}

// 删除工作区
export function deleteWorkspace(teamId: string, id: string): Promise<ApiResponse<{ message: string }>|any> {
  try {
    if (!teamId) {
      throw new Error('团队ID不能为空');
    }
    
    if (!id) {
      throw new Error('工作区ID不能为空');
    }
    
    return request.delete<ApiResponse<{ message: string }>,any>(
      API.DELETE_URL.replace(':teamid', teamId).replace(':id', id), 
      {
        retryCount: 3
      }
    );
  } catch (error) {
    console.error('删除工作区请求失败:', error);
    throw error;
  }
}

// 更新工作区
export function updateWorkspace(teamId: string, id: string, data: CommonDto): Promise<ApiResponse<Workspace>|any> {
  try {
    if (!teamId) {
      throw new Error('团队ID不能为空');
    }
    
    if (!id) {
      throw new Error('工作区ID不能为空');
    }
    
    if (!data.name) {
      throw new Error('空间名不能为空');
    }
    
    return request.patch<ApiResponse<Workspace>,any>(
      API.UPDATE_URL.replace(':teamid', teamId).replace(':id', id), 
      {
        htype: "json",
        body: data,
        retryCount: 3
      }
    );
  } catch (error) {
    console.error('更新工作区请求失败:', error);
    throw error;
  }
}

// 查找工作区
export function findWorkspaces(params: FindDto): Promise<ApiResponse<WorkspaceListResponse>|any> {
  try {
    // 验证参数：必须包含一个查询字段
    if (!params.id && !params.teamId && !params.name) {
      throw new Error('必须包含一个查询字段');
    }
    
    return request.get<ApiResponse<WorkspaceListResponse>,any>(API.FIND_URL, {
      params,
      retryCount: 3
    });
  } catch (error) {
    console.error('查找工作区请求失败:', error);
    throw error;
  }
}

// 创建空间（别名）
export function createSpace(data: CreateSpaceDto): Promise<ApiResponse<Workspace>|any> {
  try {
    if (!data.teamId) {
      throw new Error('团队id不能为空');
    }
    
    if (!data.name) {
      throw new Error('空间名不能为空');
    }
    
    return request.post<ApiResponse<Workspace>,any>(API.CREATE_URL, {
      htype: "json",
      body: {
        teamId: data.teamId,
        name: data.name,
        // userId: data.userId
      },
      retryCount: 3
    });
  } catch (error) {
    console.error('创建空间请求失败:', error);
    throw error;
  }
}