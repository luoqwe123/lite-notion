

export const User = [
  {  "email": "admin@test.com", "password": "123456", "nickname": "系统管理员", "avatar": null },
  {  "email": "zhangsan@test.com", "password": "123456", "nickname": "张三", "avatar": null },
  {  "email": "lisi@test.com", "password": "123456", "nickname": "李四", "avatar": null },
  {  "email": "wangwu@test.com", "password": "123456", "nickname": "王五", "avatar": null },
  {  "email": "zhaoliu@test.com", "password": "123456", "nickname": "赵六", "avatar": null },
  {  "email": "editor@test.com", "password": "123456", "nickname": "编辑账号", "avatar": null },
  {  "email": "viewer@test.com", "password": "123456", "nickname": "只读账号", "avatar": null }
];
export const Team = [
  {  "name": "研发团队", "description": "负责产品开发", "avatar": null, "ownerId": 1 },
  {  "name": "产品团队", "description": "产品规划与需求", "avatar": null, "ownerId": 1 },
  {  "name": "设计团队", "description": "UI/UX 设计", "avatar": null, "ownerId": 2 },
  {  "name": "测试团队", "description": "系统测试保障", "avatar": null, "ownerId": 2 },
  {  "name": "运营团队", "description": "日常运营维护", "avatar": null, "ownerId": 3 },
  {  "name": "市场团队", "description": "市场推广拓展", "avatar": null, "ownerId": 3 },
  {  "name": "行政团队", "description": "内部行政支持", "avatar": null, "ownerId": 4 }
];
export const TeamMember = [
  { "teamId": 1, "userId": 1, "role": "admin" },
  { "teamId": 1, "userId": 2, "role": "editor" },
  { "teamId": 1, "userId": 3, "role": "viewer" },
  { "teamId": 2, "userId": 2, "role": "admin" },
  { "teamId": 2, "userId": 4, "role": "editor" },
  { "teamId": 3, "userId": 3, "role": "admin" },
  { "teamId": 4, "userId": 5, "role": "editor" }
];
export const KnowledgeBase = [
  {  "name": "研发文档库", "teamId": 1 },
  {  "name": "产品文档库", "teamId": 2 },
  {  "name": "设计资源库", "teamId": 3 },
  {  "name": "测试用例库", "teamId": 4 },
  {  "name": "运营手册库", "teamId": 5 },
  {  "name": "市场资料库", "teamId": 6 },
  {  "name": "行政制度库", "teamId": 7 }
];
export const Document = [
  {  "title": "系统架构设计", "content": "架构内容...", "kbId": 1, "teamId": 1, "createdBy": 1 },
  {  "title": "接口文档V1.0", "content": "接口内容...", "kbId": 1, "teamId": 1, "createdBy": 1 },
  {  "title": "产品需求文档", "content": "需求内容...", "kbId": 2, "teamId": 2, "createdBy": 2 },
  {  "title": "原型设计说明", "content": "原型内容...", "kbId": 3, "teamId": 3, "createdBy": 3 },
  {  "title": "测试计划方案", "content": "测试内容...", "kbId": 4, "teamId": 4, "createdBy": 4 },
  {  "title": "运营操作指南", "content": "操作内容...", "kbId": 5, "teamId": 5, "createdBy": 5 },
  {  "title": "市场推广方案", "content": "推广内容...", "kbId": 6, "teamId": 6, "createdBy": 6 }
];

export const DocumentVersion = [
  {  "documentId": 1, "content": "V1 架构内容", "versionNum": 1, "createdBy": 1 },
  {  "documentId": 1, "content": "V2 架构内容", "versionNum": 2, "createdBy": 1 },
  {  "documentId": 2, "content": "V1 接口内容", "versionNum": 1, "createdBy": 1 },
  {  "documentId": 3, "content": "V1 需求内容", "versionNum": 1, "createdBy": 2 },
  {  "documentId": 4, "content": "V1 原型内容", "versionNum": 1, "createdBy": 3 },
  {  "documentId": 5, "content": "V1 测试内容", "versionNum": 1, "createdBy": 4 },
  {  "documentId": 6, "content": "V1 运营内容", "versionNum": 1, "createdBy": 5 }
];
export const Permission = [
  {  "role": "admin", "canCreate": 1, "canEdit": 1, "canDelete": 1, "canManageMember": 1 },
  {  "role": "editor", "canCreate": 1, "canEdit": 1, "canDelete": 0, "canManageMember": 0 },
  {  "role": "viewer", "canCreate": 0, "canEdit": 0, "canDelete": 0, "canManageMember": 0 },
  {  "role": "admin", "canCreate": 1, "canEdit": 1, "canDelete": 1, "canManageMember": 1 },
  {  "role": "editor", "canCreate": 1, "canEdit": 1, "canDelete": 0, "canManageMember": 0 },
  {  "role": "viewer", "canCreate": 0, "canEdit": 0, "canDelete": 0, "canManageMember": 0 },
  {  "role": "admin", "canCreate": 1, "canEdit": 1, "canDelete": 1, "canManageMember": 1 }
];
export const  DocumentPermission = [
  {  "documentId": 1, "userId": 2, "permission": "view" },
  {  "documentId": 1, "userId": 3, "permission": "edit" },
  {  "documentId": 2, "userId": 4, "permission": "view" },
  {  "documentId": 3, "userId": 5, "permission": "edit" },
  {  "documentId": 4, "userId": 6, "permission": "view" },
  {  "documentId": 5, "userId": 7, "permission": "view" },
  {  "documentId": 6, "userId": 1, "permission": "edit" }
];
export const Favorite = [
  {  "userId": 1, "documentId": 1, "tags": "[\"重要\",\"架构\"]" },
  {  "userId": 1, "documentId": 2, "tags": "[\"常用\",\"接口\"]" },
  {  "userId": 2, "documentId": 3, "tags": "[\"产品\"]" },
  {  "userId": 3, "documentId": 4, "tags": "[\"设计\"]" },
  {  "userId": 4, "documentId": 5, "tags": "[\"测试\"]" },
  {  "userId": 5, "documentId": 6, "tags": "[\"运营\"]" },
  {  "userId": 6, "documentId": 7, "tags": "[\"市场\"]" }
];
export const AiLog = [
  {  "userId": 1, "documentId": 1, "action": "summary", "content": "总结了架构文档" },
  {  "userId": 1, "documentId": 2, "action": "outline", "content": "生成了接口大纲" },
  {  "userId": 2, "documentId": 3, "action": "rewrite", "content": "重写了需求文档" },
  {  "userId": 3, "documentId": 4, "action": "translate", "content": "翻译了设计说明" },
  {  "userId": 4, "documentId": 5, "action": "explain", "content": "解释了测试计划" },
  {  "userId": 5, "documentId": 6, "action": "summary", "content": "总结了运营指南" },
  {  "userId": 6, "documentId": 7, "action": "outline", "content": "生成了推广大纲" }
];
export const ImportsLog = [
  {  "userId": 1, "kbId": 1, "fileName": "架构.docx", "fileType": "docx", "status": "success" },
  {  "userId": 1, "kbId": 1, "fileName": "接口.xlsx", "fileType": "xlsx", "status": "success" },
  {  "userId": 2, "kbId": 2, "fileName": "需求.pdf", "fileType": "pdf", "status": "success" },
  {  "userId": 3, "kbId": 3, "fileName": "设计稿.zip", "fileType": "zip", "status": "success" },
  {  "userId": 4, "kbId": 4, "fileName": "用例.xlsx", "fileType": "xlsx", "status": "fail" },
  {  "userId": 5, "kbId": 5, "fileName": "手册.doc", "fileType": "doc", "status": "success" },
  {  "userId": 6, "kbId": 6, "fileName": "方案.pptx", "fileType": "pptx", "status": "success" }
]