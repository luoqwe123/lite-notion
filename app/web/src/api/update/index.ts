
import { request } from "~/utils/request";
import type { ApiResponse } from "~/utils/request";

enum API{
    UPLOAD_IMAGE = "update/image"
}

export interface UploadResponse {
    code: string | number;
    message: string;
    data: {
        url: string;
        filename: string;
        size: number;
        // 其他上传响应字段
    };
}

export function uploadImg(file: Blob): Promise<ApiResponse<UploadResponse>> {
    try {
        // 参数验证
        if (!(file instanceof Blob)) {
            throw new Error('file参数必须是Blob类型');
        }
        
        // 检查文件大小（假设限制为10MB）
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            throw new Error(`文件大小不能超过${maxSize / 1024 / 1024}MB`);
        }
        
        // 检查文件类型（这里可以根据需要添加更多验证）
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('不支持的文件类型，仅支持JPEG、PNG、GIF、WebP格式');
        }
        
        return request.post<UploadResponse, ApiResponse>(API.UPLOAD_IMAGE, {
            htype: "formData",
            body: { file },
            retryCount: 2 // 上传操作重试次数不宜过多
        });
    } catch (error) {
        console.error('图片上传失败:', error);
        throw error;
    }
}
