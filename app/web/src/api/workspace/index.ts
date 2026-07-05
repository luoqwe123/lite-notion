import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

enum API {
    FIND_URL = "workspace",
    FINDALL_URL = "workspace/findAll"
}

export interface WorkspaceData {
    id: string;
    name: string;
    // 其他workspace字段根据实际情况添加
}

export interface WorkspaceListResponse {
    code: string | number;
    message: string;
    data: WorkspaceData[];
}

export function getWorkSpa(id?: string): Promise<ApiResponse<WorkspaceData>> {
    try {
        return request.get<WorkspaceData, ApiResponse>(API.FIND_URL, {
            params: {
                id
            },
            retryCount: 2 // 对于查询操作，重试次数可以少一些
        });
    } catch (error) {
        console.error('获取工作空间失败:', error);
        // 重新抛出错误，让调用方处理
        throw error;
    }
}

export function getAllWorkSpa(teamId: number[]): Promise<ApiResponse<WorkspaceListResponse>> {
    try {
        if (!Array.isArray(teamId) || teamId.length === 0) {
            throw new Error('teamId参数不能为空数组');
        }
        
        return request.post<WorkspaceListResponse, ApiResponse>(API.FINDALL_URL, {
            htype: "json",
            body: {
                teamId
            },
            retryCount: 3
        });
    } catch (error) {
        console.error('获取所有工作空间失败:', error);
        throw error;
    }
}

