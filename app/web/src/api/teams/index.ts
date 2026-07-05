import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

enum API {
    FINDONE_URL = "",
    FINDALL_URL = "teamMember"
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    // 其他团队成员字段
}

export interface TeamListResponse {
    code: string | number;
    message: string;
    data: TeamMember[];
}

export function findAll(): Promise<ApiResponse<TeamListResponse>|any> {
    try {
        return request.get<ApiResponse<TeamListResponse>,any>(API.FINDALL_URL, {
            retryCount: 3
        });
    } catch (error) {
        console.error('获取团队成员列表失败:', error);
        throw error;
    }
}
