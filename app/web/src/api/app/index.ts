import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

// App模块枚举
enum API {
  HELLO_URL = "/"
}

// App模块响应类型
export type HelloResponse = string;

// 获取Hello消息
export function getHello(): Promise<ApiResponse<HelloResponse>|any> {
  try {
    return request.get<ApiResponse<HelloResponse>,any>(API.HELLO_URL, {
      retryCount: 3
    });
  } catch (error) {
    console.error('获取Hello消息请求失败:', error);
    throw error;
  }
}