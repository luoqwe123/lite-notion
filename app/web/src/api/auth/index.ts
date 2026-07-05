import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// Auth模块枚举
enum API {
  LOGIN_URL = "/login",
  REGISTER_URL = "/register",
  GENCODE_URL = "/gencode"
}

// Auth模块DTOs
export interface BaseDto {
  email: string;
}

export interface LoginDto extends BaseDto {
  type: 'password' | 'code';
  password?: string;
  verifycode?: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  verifycode: string;
}

// Auth模块响应类型
export interface AuthResponse {
  code: string | number;
  message: string;
  data: {
    token: string;
    avatar: string | null;
    username: string;
    email: string;
  };
}

// 用户登录
export function login(data: LoginDto): Promise<ApiResponse<AuthResponse>|any> {
  try {
    // 参数验证
    if (!data.email) {
      throw new Error('邮箱不能为空');
    }
    
    if (!data.type || !['password', 'code'].includes(data.type)) {
      throw new Error('登录类型必须是password或code');
    }
    
    if (data.type === 'password' && !data.password) {
      throw new Error('密码不能为空');
    }
    
    if (data.type === 'code' && !data.verifycode) {
      throw new Error('验证码不能为空');
    }
    
    return request.post<ApiResponse<AuthResponse>,any>(API.LOGIN_URL, {
      htype: "json",
      body: data,
      retryCount: 2
    });
  } catch (error) {
    console.error('登录请求失败:', error);
    throw error;
  }
}

// 用户注册
export function register(data: RegisterDto): Promise<ApiResponse<AuthResponse>|any> {
  try {
    // 参数验证
    if (!data.email) {
      throw new Error('邮箱不能为空');
    }
    
    if (!data.password) {
      throw new Error('密码不能为空');
    }
    
    if (!data.verifycode) {
      throw new Error('验证码不能为空');
    }
    
    return request.post<ApiResponse<AuthResponse>,any>(API.REGISTER_URL, {
      htype: "json",
      body: data,
      retryCount: 2
    });
  } catch (error) {
    console.error('注册请求失败:', error);
    throw error;
  }
}

// 生成验证码
export function generateCode(email: string): Promise<ApiResponse<{ message: string }>|any> {
  try {
    if (!email) {
      throw new Error('邮箱不能为空');
    }
    
    return request.post<ApiResponse<{ message: string }>,any>(API.GENCODE_URL, {
      htype: "json",
      body: { email },
      retryCount: 2
    });
  } catch (error) {
    console.error('生成验证码请求失败:', error);
    throw error;
  }
}