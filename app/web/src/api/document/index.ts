import { request } from "~/utils/request"
import type { ApiResponse } from "~/utils/request"

enum API {
    GET_ONE_DOCU = "document/",
    SAVE_DOCU = "document/update",
    FINDALL_URL = "document/findAll"
}

export interface Document {
    id: string;
    title: string;
    content: string;
    kbId: string;
    createdAt: string;
    updatedAt: string;
    // 其他文档字段
}

export interface DocumentResponse {
    code: string | number;
    message: string;
    data: Document;
}

export interface updateType {
    id: string;
    content: string;
}

export interface UpdateDocumentResponse {
    code: string | number;
    message: string;
    data: Document;
}

export interface DocumentListResponse {
    code: string | number;
    message: string;
    data: Document[];
}

export function getDocById(id: string): Promise<ApiResponse<DocumentResponse>> {
    try {
        if (!id || typeof id !== 'string') {
            throw new Error('文档ID不能为空');
        }
        
        return request.get<DocumentResponse, ApiResponse>(API.GET_ONE_DOCU + id, {
            retryCount: 3
        });
    } catch (error) {
        console.error('获取文档失败:', error);
        throw error;
    }
}

export function updateDoc(data: updateType): Promise<ApiResponse<UpdateDocumentResponse>> {
    try {
        if (!data || !data.id || !data.content) {
            throw new Error('文档数据不完整，需要包含id和content');
        }
        
        return request.patch<UpdateDocumentResponse, ApiResponse>(API.SAVE_DOCU, {
            htype: "form",
            body: data,
            retryCount: 3
        });
    } catch (error) {
        console.error('更新文档失败:', error);
        throw error;
    }
}

export function findAllDoc(kbId: string): Promise<ApiResponse<DocumentListResponse>> {
    try {
        if (!kbId || typeof kbId !== 'string') {
            throw new Error('知识库ID不能为空');
        }
        
        return request.get<DocumentListResponse, ApiResponse>(API.FINDALL_URL, {
            params: {
                kbId
            },
            retryCount: 3
        });
    } catch (error) {
        console.error('获取文档列表失败:', error);
        throw error;
    }
}