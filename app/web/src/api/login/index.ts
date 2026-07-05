
import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

enum API{
    LOGIN_URL = "login"
}

export interface loginDataType{
    email: string;
    password: string;
    type: string;
}

export interface LoginResponse {
    code: string | number;
    message: string;
    data: {
        email: string;
        username: string;
        avatar?: string;
        token?: string;
        // 其他登录响应字段
    };
}

export function login(data: loginDataType): Promise<ApiResponse<LoginResponse>|any> {
    try {
        // 参数验证
        if (!data.email || !data.password) {
            throw new Error('邮箱和密码不能为空');
        }
        
        if (!data.type || !['password', 'code'].includes(data.type)) {
            throw new Error('登录类型必须是password或code');
        }
        
        return request.post<ApiResponse<LoginResponse>,any>(API.LOGIN_URL, {
            htype: "form",
            body: data,
            retryCount: 2 // 登录操作重试次数不宜过多
        });
    } catch (error) {
        console.error('登录请求失败:', error);
        throw error;
    }
}