// 请求类型枚举
enum ContentType {
  form = "application/x-www-form-urlencoded",
  formData = "multipart/form-data",
  json = "application/json",
}

// TS 类型定义
interface GetOptions {
  params?: Record<string, string | number | undefined>; // 自动拼接参数
}

interface RequestOptions {
  htype?: "json" | "formData" | "form";
  body?: any;
}

class Ofetch {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // ==================== GET ====================
  async get(url: string, options: GetOptions = {}) {
    const { params } = options;
    let fullUrl = this.baseUrl + url;

    // 自动拼接 params（安全写法）
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) searchParams.append(k, String(v));
      });
      fullUrl += "?" + searchParams.toString();
    }

    const res = await fetch(fullUrl, {
      method: "GET",
      credentials: "include", // 👈 必须！自动带cookie
    });

    return this.handleResponse(res);
  }

  // ==================== POST ====================
  async post(url: string, options: RequestOptions = {}) {
    return this.request("POST", url, options);
  }

  // ==================== DELETE ====================
  async delete(url: string, options: RequestOptions = {}) {
    return this.request("DELETE", url, options);
  }

  // ==================== PATCH ====================
  async patch(url: string, options: RequestOptions = {}) {
    return this.request("PATCH", url, options);
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

  // ==================== 统一响应解析 ====================
  private async handleResponse(res: Response) {
    try {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "请求失败");
      }
      return data;
    } catch (err) {
      console.error("fetch 错误 →", err);
      throw err;
    }
  }
}

export const  request = new Ofetch(import.meta.env.BASE_URL);
