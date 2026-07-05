// 请求类型枚举
enum ContentType {
  form = "application/x-www-form-urlencoded",
  formData = "multipart/form-data",
  json = "application/json",
}

// TS 类型定义
interface GetOptions {
  params?: Record<string, string | number | undefined|number[]>; // 自动拼接参数
  retryCount?: number; // 重试次数
}

interface RequestOptions {
  htype?: "json" | "formData" | "form";
  body?: any;
  retryCount?: number; // 重试次数
}

// 错误类型定义
interface ApiError {
  code: string | number;
  message: string;
  data?: any;
}

// 统一响应类型
export interface ApiResponse<T = any> {
  code: string | number;
  message: string;
  data: T;
}

class Ofetch {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // ==================== GET ====================
  async get<T, V>(url: string, options: GetOptions = {}): Promise<T|V> {
    const { params, retryCount = 3 } = options;
    let fullUrl = this.baseUrl + url;

    // 自动拼接 params（安全写法）
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) searchParams.append(k, String(v));
      });
      fullUrl += "?" + searchParams.toString();
    }

    return this.executeWithRetry(async () => {
      const res = await fetch(fullUrl, {
        method: "GET",
        credentials: "include", // 👈 必须！自动带cookie
      });
      return this.handleResponse(res);
    }, retryCount);
  }

  // ==================== POST ====================
  async post<T,V>(url: string, options: RequestOptions = {}): Promise<T|V> {
    const { retryCount = 3 } = options;
    return this.executeWithRetry(() => this.request("POST", url, options), retryCount);
  }

  // ==================== DELETE ====================
  async delete<T,V>(url: string, options: RequestOptions = {}): Promise<T|V> {
    const { retryCount = 3 } = options;
    return this.executeWithRetry(() => this.request("DELETE", url, options), retryCount);
  }

  // ==================== PATCH ====================
  async patch<T,V>(url: string, options: RequestOptions = {}): Promise<T|V> {
    const { retryCount = 3 } = options;
    return this.executeWithRetry(() => this.request("PATCH", url, options), retryCount);
  }

  // ==================== 统一请求处理 ====================
  private async request(
    method: string,
    url: string,
    options: RequestOptions = {}
  ) {
    const { htype = "json", body } = options;
    let finalBody: any = body;
    let contentType: string | null = ContentType.json;

    // 处理不同格式
    if (htype === "json") {
      finalBody = JSON.stringify(body);
    } else if (htype === "form") {
      finalBody = new URLSearchParams(body).toString();
      contentType = ContentType.form;
    } else if (htype === "formData") {
      finalBody = new FormData();
      Object.entries(body || {}).forEach(([k, v]) => {
        finalBody.append(k, v);
      });
      contentType = null; // 👈 formData 浏览器自动生成，不能手动写 Content-Type
    }

    const headers: Record<string, string> = {};
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
   
    const res = await fetch(this.baseUrl + url, {
      method,
      headers,
      body: finalBody,
      credentials: "include", // 👈 核心！带cookie
    });
    return this.handleResponse(res);
  }

  // ==================== 重试机制 ====================
  private async executeWithRetry<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error: any) {
        lastError = error;
        
        // 如果是最后一次重试，直接抛出错误
        if (attempt === maxRetries) {
          throw error;
        }
        
        // 网络错误或5xx服务器错误才重试
        if (error.name === 'TypeError' || 
            (error.response && error.response.status >= 500)) {
          // 指数退避等待
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // 其他错误直接抛出
        throw error;
      }
    }
    
    throw lastError!;
  }

  // ==================== 统一响应解析 ====================
  private async handleResponse<T = any>(res: Response): Promise<T> {
    try {
      const data = await res.json();
      
      // 检查响应状态
      if (!res.ok) {
        const error: ApiError = {
          code: res.status,
          message: data.message || `请求失败: ${res.status} ${res.statusText}`,
          data: data.data
        };
        throw error;
      }
      
      // 检查业务状态码
      if (data.code && data.code !== "200" && data.code !== 200) {
        const error: ApiError = {
          code: data.code,
          message: data.message || "业务逻辑错误",
          data: data.data
        };
        throw error;
      }
      
      return data;
    } catch (err: any) {
      // 如果是网络错误或JSON解析错误
      if (err instanceof SyntaxError || err.name === 'TypeError') {
        const error: ApiError = {
          code: "NETWORK_ERROR",
          message: "网络连接错误，请检查网络连接",
          data: null
        };
        throw error;
      }
      
      // 已是ApiError格式，直接抛出
      if (err.code) {
        throw err;
      }
      
      // 其他错误
      const error: ApiError = {
        code: "UNKNOWN_ERROR",
        message: err.message || "未知错误",
        data: null
      };
      throw error;
    }
  }
}

export const request = new Ofetch(import.meta.env.VITE_BASEURL);
