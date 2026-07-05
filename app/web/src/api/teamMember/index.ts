import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// TeamMember模块枚举
enum API {
  FIND_URL = "/teamMember",
  DELETE_URL = "/teamMember",
  UPDATE_URL = "/teamMember",
  CREATE_URL = "/teamMember/create"
}

// TeamMember模块DTOs
export interface FindDto {
  id?: string;
  teamId?: string;
  userId?: string;
  [key:string]:string | number | undefined|number[]; 
}

export interface BaseDto {
  teamId: string;
  userId?: string;
  
}

export interface MemberDto extends BaseDto {
  role: string;
}

// TeamMember模块响应类型
export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMemberListResponse {
  code: string | number;
  message: string;
  data: TeamMember[];
}

// 查找团队成员
export function findTeamMembers(params: FindDto): Promise<ApiResponse<TeamMemberListResponse>|any> {
  try {
    // 验证参数：teamId和userId不能同时为空
    if ((!params.teamId && !params.userId) || (!params.teamId && !params.userId)) {
      throw new Error('teamId和userId不能同时为空');
    }
    
    return request.get<ApiResponse<TeamMemberListResponse>,any>(API.FIND_URL, {
      params,
      retryCount: 3
    });
  } catch (error) {
    console.error('查找团队成员请求失败:', error);
    throw error;
  }
}

// 删除团队成员
export function deleteTeamMember(params: BaseDto): Promise<ApiResponse<{ message: string }>|any> {
  try {
    if (!params.teamId) {
      throw new Error('团队编号不能为空');
    }
    
    return request.delete<ApiResponse<{ message: string }>,any>(API.DELETE_URL, {
      body:{
        teamId:params.teamId,
        userId:params.userId
      },
      retryCount: 3
    });
  } catch (error) {
    console.error('删除团队成员请求失败:', error);
    throw error;
  }
}

// 更新团队成员角色
export function updateTeamMemberRole(data: MemberDto): Promise<ApiResponse<TeamMember>|any> {
  try {
    if (!data.teamId) {
      throw new Error('团队编号不能为空');
    }
    
    if (!data.role) {
      throw new Error('role不能为空');
    }
    
    return request.patch<ApiResponse<TeamMember>,any>(API.UPDATE_URL, {
      htype: "json",
      body: {
        rule:data.role,
         teamId:data.teamId,
        userId:data.userId
      },
      retryCount: 3
    });
  } catch (error) {
    console.error('更新团队成员角色请求失败:', error);
    throw error;
  }
}

// 添加团队成员
export function addTeamMember(data: MemberDto): Promise<ApiResponse<TeamMember>|any> {
  try {
    if (!data.teamId) {
      throw new Error('团队编号不能为空');
    }
    
    if (!data.role) {
      throw new Error('role不能为空');
    }
    
    return request.post<ApiResponse<TeamMember>,any>(API.CREATE_URL, {
      htype: "json",
      body: data,
      retryCount: 3
    });
  } catch (error) {
    console.error('添加团队成员请求失败:', error);
    throw error;
  }
}