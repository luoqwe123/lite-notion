# Lite Notion 后端 API 接口文档

## 1. 概述 (Overview)

Lite Notion 是一个轻量级的知识库平台。本接口文档描述了后端 API 的使用方法和规范。

*   **项目简介：** 提供用户认证、团队管理、文档管理、工作区管理和收藏功能。
*   **API 版本：** v1.0
*   **基础 URL：** `http://localhost:3000` (示例，请根据实际部署修改)

## 2. 认证与授权 (Authentication & Authorization)

本 API 使用 JSON Web Token (JWT) 进行用户认证，并支持基于角色的访问控制 (RBAC)。

### 2.1 认证机制 (JWT)

*   用户通过 `/auth/login` 或 `/auth/register` 接口获取 JWT Token。
*   获取到的 Token 需要在后续请求的 `Authorization` 请求头中携带，格式为 `Bearer <YOUR_JWT_TOKEN>`。

### 2.2 授权机制 (RBAC)

*   部分接口受 `@roleWeight` 装饰器保护，需要用户具有特定的角色权限才能访问。
*   角色权重 (`RoleWeight`) 定义在 `src/common/constants.ts` 中，通常包括 `VIEWER`, `EDITOR`, `ADMIN`, `CREATOR` 等。
*   `@UseGuards(JwtAuthGuard)`：所有受保护的接口都需要有效的 JWT Token。
*   `@UseGuards(createTeamGuard(...))`：部分接口还需要额外的团队成员权限检查。

### 2.3 如何获取和使用认证 Token

1.  **登录/注册：** 调用 `/auth/login` 或 `/auth/register` 接口，成功后响应体中会包含 `token` 字段。
2.  **携带 Token：** 在后续所有需要认证的请求中，将获取到的 `token` 放置在请求头中：
    ```
    Authorization: Bearer <YOUR_JWT_TOKEN>
    ```

## 3. 数据模型 (Data Models / DTOs)

本节列出了 API 中使用的主要数据传输对象 (DTO) 及其字段说明。

### 3.1 Auth 模块 DTOs

#### `baseDto` (用于 Auth 模块)
*   **描述：** 认证模块的基础 DTO，主要用于邮箱验证。
*   **属性：**
    *   `email: string` (必填, 消息: "用户名不能为空")

#### `LoginDto` (继承自 `baseDto`)
*   **描述：** 用户登录请求体。
*   **属性：**
    *   `email: string` (继承自 `baseDto`, 必填, 消息: "用户名不能为空")
    *   `type: string` (必填, 消息: "登录类型不能为空")
    *   `password: string` (条件必填, 当 `type === 'password'` 时, 消息: '密码不能为空')
    *   `verifycode: string` (条件必填, 当 `type !== 'password'` 时, 消息: '验证码不能为空')

#### `registerDto`
*   **描述：** 用户注册请求体。
*   **属性：**
    *   `email: string` (必填, 消息: "用户名不能为空")
    *   `password: string` (必填, 消息: '密码不能为空')
    *   `verifycode: string` (必填, 消息: '验证码不能为空')

### 3.2 Team 模块 DTOs

#### `BaseDto` (用于 Team 模块)
*   **描述：** 团队模块的基础 DTO，通常用于查询或通用团队信息。
*   **属性：**
    *   `id: string`
    *   `name: string`
    *   `ownerId: string`
    *   `description: string`

#### `CreateDto` (用于 Team 模块)
*   **描述：** 创建团队请求体。
*   **属性：**
    *   `name: string` (必填, 消息: "团队名不能为空")
    *   `description: string`
    *   `avatar: string` (必填, 消息: "团队头像不能为空")

#### `UpdateDto` (用于 Team 模块)
*   **描述：** 更新团队请求体。
*   **属性：**
    *   `name: string` (必填, 消息: "团队名不能为空")
    *   `description: string`
    *   `avatar: string` (必填, 消息: "团队头像不能为空")

### 3.3 Document 模块 DTOs

#### `baseDto` (用于 Document 模块)
*   **描述：** 文档模块的基础 DTO。
*   **属性：**
    *   `teamId: string` (必填, 消息: "团队id不能为空")

#### `createDto` (继承自 `baseDto`)
*   **描述：** 创建文档请求体。
*   **属性：**
    *   `teamId: string` (继承自 `baseDto`, 必填, 消息: "团队id不能为空")
    *   `title: string` (必填, 消息: "标题不能为空")
    *   `content: string`
    *   `kbId: string` (必填, 消息: "空间id不能为空")
    *   `userId: string`

#### `deleteDto` (继承自 `baseDto`)
*   **描述：** 删除文档请求体。
*   **属性：**
    *   `teamId: string` (继承自 `baseDto`, 必填, 消息: "团队id不能为空")
    *   `id: string` (必填, 消息: "文档id不能为空")

#### `findDto` (继承自 `baseDto`)
*   **描述：** 查找文档查询参数。
*   **属性：**
    *   `teamId: string` (继承自 `baseDto`, 必填, 消息: "团队id不能为空")
    *   `id: string`
    *   `kbId: string` (必填, 消息: "空间id不能为空")
    *   `title: string`
    *   `content: string`

#### `updateDto` (继承自 `baseDto`)
*   **描述：** 更新文档请求体。
*   **属性：**
    *   `teamId: string` (继承自 `baseDto`, 必填, 消息: "团队id不能为空")
    *   `id: string` (必填, 消息: "文档id不能为空")
    *   `title: string`
    *   `status: DocumentStatus` (请参考 `src/common/constants.ts` 中的 `DocumentStatus` 定义)

### 3.4 TeamMember 模块 DTOs

#### `findDto` (用于 TeamMember 模块)
*   **描述：** 查找团队成员查询参数。
*   **属性：**
    *   `id: string`
    *   `teamId: string` (条件必填, 消息: 'teamId 和 userId 不能同时为空')
    *   `userId: string` (条件必填, 消息: 'teamId 和 userId 不能同时为空')

#### `baseDto` (用于 TeamMember 模块)
*   **描述：** 团队成员模块的基础 DTO。
*   **属性：**
    *   `teamId: string` (必填, 消息: "团队编号不能为空")
    *   `userId: string`

#### `memberDto` (继承自 `baseDto`)
*   **描述：** 团队成员操作请求体。
*   **属性：**
    *   `teamId: string` (继承自 `baseDto`, 必填, 消息: "团队编号不能为空")
    *   `userId: string` (继承自 `baseDto`)
    *   `role: string` (必填, 消息: "role不能为空")

### 3.5 Workspace 模块 DTOs

#### `baseDto` (用于 Workspace 模块)
*   **描述：** 工作区模块的基础 DTO。
*   **属性：**
    *   `teamId: string` (必填, 消息: "团队编号不能为空")
    *   `userId: string`

#### `commonDto` (继承自 `baseDto`)
*   **描述：** 创建/更新工作区请求体。
*   **属性：**
    *   `teamId: string` (继承自 `baseDto`, 必填, 消息: "团队编号不能为空")
    *   `userId: string` (继承自 `baseDto`)
    *   `name: string` (必填, 消息: "空间名不能为空")

#### `findDto` (用于 Workspace 模块)
*   **描述：** 查找工作区查询参数。
*   **属性：**
    *   `id: string` (条件必填, 消息: '必须包含一个查询字段')
    *   `teamId: string` (条件必填, 消息: '必须包含一个查询字段')
    *   `name: string` (条件必填, 消息: '必须包含一个查询字段')

#### `CreateSpaceDto`
*   **描述：** 创建空间请求体。
*   **属性：**
    *   `name: string` (必填, 消息: "空间名不能为空")
    *   `description: string`
    *   `teamId: number` (必填, 消息: "团队id不能为空")

### 3.6 Favorite 模块 DTOs

#### `createDto` (用于 Favorite 模块)
*   **描述：** 创建收藏请求体。
*   **属性：**
    *   `userId: string`
    *   `documentId: string` (必填, 消息: "文档id不能为空")
    *   `tag: string`

## 4. API 接口列表 (API Endpoints)

### 4.1 Auth 模块 (`AuthController`)

*   **基础路由：** `/`
*   **守卫：** 无 (登录/注册接口通常不需要 JWT 认证)

#### 4.1.1 用户登录

*   **HTTP 方法：** `POST`
*   **路径：** `/login`
*   **描述：** 用户通过密码或验证码登录。
*   **请求体：** `LoginDto`
*   **响应体：**
    ```json
    {
      "token": "string",
      "avatar": "string",
      "username": "string",
      "message": "success"
    }
    ```
*   **错误响应：**
    *   `400 Bad Request`: 密码输入错误 / 验证码失效 / 验证码错误 / 登录类型不能为空 / 密码不能为空 / 验证码不能为空 / 用户名不能为空
*   **示例：**
    *   **请求 (密码登录):**
        ```json
        {
          "email": "test@example.com",
          "type": "password",
          "password": "yourpassword"
        }
        ```
    *   **请求 (验证码登录):**
        ```json
        {
          "email": "test@example.com",
          "type": "code",
          "verifycode": "123456"
        }
        ```
    *   **响应:**
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "avatar": "http://example.com/avatar.png",
          "username": "TestUser",
          "message": "success"
        }
        ```

#### 4.1.2 用户注册

*   **HTTP 方法：** `POST`
*   **路径：** `/register`
*   **描述：** 用户注册新账号。
*   **请求体：** `registerDto`
*   **响应体：** (同登录响应体)
*   **错误响应：**
    *   `400 Bad Request`: 验证码失效 / 验证码错误 / 用户名不能为空 / 密码不能为空 / 验证码不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "email": "newuser@example.com",
          "password": "newpassword",
          "verifycode": "654321"
        }
        ```
    *   **响应:**
        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "avatar": null,
          "username": "NewUser",
          "message": "success"
        }
        ```

#### 4.1.3 生成验证码

*   **HTTP 方法：** `POST`
*   **路径：** `/gencode`
*   **描述：** 生成并发送验证码到指定邮箱。
*   **请求体：** `baseDto` (仅包含 `email`)
*   **响应体：**
    ```json
    {
      "message": "success"
    }
    ```
*   **错误响应：**
    *   `400 Bad Request`: 用户名不能为空 / 邮件发送失败等
*   **示例：**
    *   **请求:**
        ```json
        {
          "email": "test@example.com"
        }
        ```
    *   **响应:**
        ```json
        {
          "message": "success"
        }
        ```

### 4.2 Team 模块 (`teamController`)

*   **基础路由：** `/team`
*   **守卫：** `@UseGuards(JwtAuthGuard)` - 所有接口都需要有效的 JWT Token。

#### 4.2.1 创建团队

*   **HTTP 方法：** `POST`
*   **路径：** `/team/create`
*   **描述：** 创建一个新的团队。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **请求体：** `CreateDto`
*   **响应体：** (团队信息，例如 `Team` 实体)
    ```json
    {
      "id": 1,
      "name": "My New Team",
      "description": "A description for my new team",
      "avatar": "http://example.com/team_avatar.png",
      "ownerId": "user_id_here",
      "createdAt": "2026-05-19T12:00:00.000Z",
      "updatedAt": "2026-05-19T12:00:00.000Z"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `400 Bad Request`: 团队名不能为空 / 团队头像不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "name": "Project Alpha",
          "description": "Team for Project Alpha development",
          "avatar": "https://example.com/alpha_team.png"
        }
        ```

#### 4.2.2 删除团队

*   **HTTP 方法：** `DELETE`
*   **路径：** `/team/:id`
*   **描述：** 根据 ID 删除一个团队。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **路径参数：**
    *   `id: number` (团队 ID)
*   **权限：** `@roleWeight(RoleWeight.CREATOR)` - 需要创建者权限。
*   **响应体：** (删除成功消息或被删除的团队信息)
    ```json
    {
      "message": "Team deleted successfully"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `404 Not Found`: 团队不存在
*   **示例：**
    *   **请求:** `DELETE /team/1`

#### 4.2.3 更新团队

*   **HTTP 方法：** `PATCH`
*   **路径：** `/team/:id`
*   **描述：** 根据 ID 更新团队信息。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **路径参数：**
    *   `id: number` (团队 ID)
*   **请求体：** `UpdateDto`
*   **权限：** `@roleWeight(RoleWeight.CREATOR)` - 需要创建者权限。
*   **响应体：** (更新后的团队信息)
    ```json
    {
      "id": 1,
      "name": "Updated Team Name",
      "description": "Updated description",
      "avatar": "http://example.com/updated_avatar.png",
      "ownerId": "user_id_here",
      "createdAt": "2026-05-19T12:00:00.000Z",
      "updatedAt": "2026-05-19T13:00:00.000Z"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `404 Not Found`: 团队不存在
    *   `400 Bad Request`: 团队名不能为空 / 团队头像不能为空
*   **示例：**
    *   **请求:** `PATCH /team/1`
        ```json
        {
          "name": "Project Alpha (Revised)",
          "description": "Revised description"
        }
        ```

#### 4.2.4 查找团队

*   **HTTP 方法：** `GET`
*   **路径：** `/team`
*   **描述：** 根据查询条件查找团队。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `BaseDto` (包含 `ownerId` 等)
*   **权限：** `@roleWeight(RoleWeight.VIEWER)` - 需要查看者权限。
*   **响应体：** (团队列表)
    ```json
    [
      {
        "id": 1,
        "name": "Team A",
        "description": "Desc A",
        "ownerId": "user_id_here",
        "avatar": "url",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
*   **示例：**
    *   **请求:** `GET /team?ownerId=user_id_here`

#### 4.2.5 查找所有团队

*   **HTTP 方法：** `GET`
*   **路径：** `/team/findAll`
*   **描述：** 查找当前用户拥有的所有团队。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **响应体：** (团队列表)
    ```json
    [
      {
        "id": 1,
        "name": "Team A",
        "description": "Desc A",
        "ownerId": "user_id_here",
        "avatar": "url",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
*   **示例：**
    *   **请求:** `GET /team/findAll`

### 4.3 Document 模块 (`documentController`)

*   **基础路由：** `/document`
*   **守卫：** `@UseGuards(JwtAuthGuard, createTeamGuard("document", { exclude: ["create"] }))` - 所有接口都需要有效的 JWT Token 和团队成员权限检查。

#### 4.3.1 创建文档

*   **HTTP 方法：** `POST`
*   **路径：** `/document/create`
*   **描述：** 创建一个新文档。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **请求体：** `createDto`
*   **权限：** `@roleWeight(RoleWeight.EDITOR)` - 需要编辑者权限。
*   **响应体：** (创建的文档信息)
    ```json
    {
      "id": 1,
      "title": "New Document",
      "content": "Document content here",
      "kbId": "kb_id_here",
      "teamId": "team_id_here",
      "userId": "user_id_here",
      "status": "DRAFT",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `400 Bad Request`: 标题不能为空 / 空间id不能为空 / 团队id不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "teamId": "team_id_123",
          "title": "Meeting Notes",
          "content": "...",
          "kbId": "kb_id_456"
        }
        ```

#### 4.3.2 查找文档

*   **HTTP 方法：** `GET`
*   **路径：** `/document`
*   **描述：** 根据查询条件查找文档。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `findDto`
*   **响应体：** (文档列表)
    ```json
    [
      {
        "id": 1,
        "title": "Doc 1",
        "content": "...",
        "kbId": "...",
        "teamId": "...",
        "userId": "...",
        "status": "...",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
*   **示例：**
    *   **请求:** `GET /document?teamId=team_id_123&kbId=kb_id_456`

#### 4.3.3 更新文档

*   **HTTP 方法：** `PATCH`
*   **路径：** `/document`
*   **描述：** 更新文档内容。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **请求体：** `updateDto`
*   **权限：** `@roleWeight(RoleWeight.EDITOR)` - 需要编辑者权限。
*   **响应体：** (更新后的文档信息)
    ```json
    {
      "id": 1,
      "title": "Updated Document Title",
      "content": "Updated content",
      "kbId": "kb_id_here",
      "teamId": "team_id_here",
      "userId": "user_id_here",
      "status": "PUBLISHED",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `400 Bad Request`: 文档id不能为空 / 团队id不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "teamId": "team_id_123",
          "id": "doc_id_789",
          "title": "Revised Meeting Notes",
          "status": "PUBLISHED"
        }
        ```

#### 4.3.4 删除文档

*   **HTTP 方法：** `DELETE`
*   **路径：** `/document`
*   **描述：** 删除文档。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `deleteDto`
*   **权限：** `@roleWeight(RoleWeight.ADMIN)` - 需要管理员权限。
*   **响应体：** (删除成功消息或被删除的文档信息)
    ```json
    {
      "message": "Document deleted successfully"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `400 Bad Request`: 文档id不能为空 / 团队id不能为空
*   **示例：**
    *   **请求:** `DELETE /document?teamId=team_id_123&id=doc_id_789`

#### 4.3.5 查找单个文档

*   **HTTP 方法：** `GET`
*   **路径：** `/document/:id`
*   **描述：** 根据 ID 查找单个文档。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **路径参数：**
    *   `id: number` (文档 ID)
*   **响应体：** (单个文档信息)
    ```json
    {
      "id": 1,
      "title": "Single Document",
      "content": "...",
      "kbId": "...",
      "teamId": "...",
      "userId": "...",
      "status": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `404 Not Found`: 文档不存在
*   **示例：**
    *   **请求:** `GET /document/123`

### 4.4 TeamMember 模块 (`teamMemberController`)

*   **基础路由：** `/teamMember`
*   **守卫：** `@UseGuards(JwtAuthGuard, createTeamGuard("teamMember", { exclude: ["create"] }))` - 所有接口都需要有效的 JWT Token 和团队成员权限检查。

#### 4.4.1 查找团队成员

*   **HTTP 方法：** `GET`
*   **路径：** `/teamMember`
*   **描述：** 查找团队成员。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `findDto`
*   **响应体：** (团队成员列表)
    ```json
    [
      {
        "id": 1,
        "teamId": "team_id_here",
        "userId": "user_id_here",
        "role": "VIEWER",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `400 Bad Request`: teamId 和 userId 不能同时为空
*   **示例：**
    *   **请求:** `GET /teamMember?teamId=team_id_123`

#### 4.4.2 删除团队成员

*   **HTTP 方法：** `DELETE`
*   **路径：** `/teamMember`
*   **描述：** 删除团队成员。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `baseDto`
*   **权限：** `@roleWeight(RoleWeight.ADMIN)` - 需要管理员权限。
*   **响应体：** (删除成功消息或被删除的团队成员信息)
    ```json
    {
      "message": "Team member deleted successfully"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `400 Bad Request`: 团队编号不能为空
*   **示例：**
    *   **请求:** `DELETE /teamMember?teamId=team_id_123&userId=user_id_456`

#### 4.4.3 更新团队成员角色

*   **HTTP 方法：** `PATCH`
*   **路径：** `/teamMember`
*   **描述：** 更改团队成员的角色。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `memberDto`
*   **响应体：** (更新后的团队成员信息)
    ```json
    {
      "id": 1,
      "teamId": "team_id_here",
      "userId": "user_id_here",
      "role": "EDITOR",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `400 Bad Request`: 团队编号不能为空 / role不能为空
*   **示例：**
    *   **请求:** `PATCH /teamMember?teamId=team_id_123&userId=user_id_456&role=EDITOR`

#### 4.4.4 添加团队成员

*   **HTTP 方法：** `POST`
*   **路径：** `/teamMember/create`
*   **描述：** 添加新的团队成员。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **请求体：** `memberDto`
*   **权限：** `@roleWeight(RoleWeight.ADMIN)` - 需要管理员权限。
*   **响应体：** (创建的团队成员信息)
    ```json
    {
      "id": 2,
      "teamId": "team_id_here",
      "userId": "new_user_id_here",
      "role": "VIEWER",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `400 Bad Request`: 团队编号不能为空 / role不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "teamId": "team_id_123",
          "userId": "new_user_id_789",
          "role": "VIEWER"
        }
        ```

### 4.5 Workspace 模块 (`workspaceController`)

*   **基础路由：** `/workspace`
*   **守卫：** `@UseGuards(JwtAuthGuard, createTeamGuard("knowledgeBase", { exclude: ["create"] }))` - 所有接口都需要有效的 JWT Token 和团队成员权限检查。

#### 4.5.1 创建工作区

*   **HTTP 方法：** `POST`
*   **路径：** `/workspace/create`
*   **描述：** 创建一个新的工作区。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **请求体：** `commonDto`
*   **权限：** `@roleWeight(RoleWeight.EDITOR)` - 需要编辑者权限。
*   **响应体：** (创建的工作区信息)
    ```json
    {
      "id": 1,
      "name": "New Workspace",
      "teamId": "team_id_here",
      "userId": "user_id_here",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `400 Bad Request`: 团队编号不能为空 / 空间名不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "teamId": "team_id_123",
          "name": "Project Docs"
        }
        ```

#### 4.5.2 删除工作区

*   **HTTP 方法：** `DELETE`
*   **路径：** `/workspace/:teamid/:id`
*   **描述：** 根据 ID 删除一个工作区。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **路径参数：**
    *   `teamid: string` (团队 ID)
    *   `id: string` (工作区 ID)
*   **权限：** `@roleWeight(RoleWeight.ADMIN)` - 需要管理员权限。
*   **响应体：** (删除成功消息或被删除的工作区信息)
    ```json
    {
      "message": "Workspace deleted successfully"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `404 Not Found`: 工作区不存在
*   **示例：**
    *   **请求:** `DELETE /workspace/team_id_123/workspace_id_456`

#### 4.5.3 更新工作区

*   **HTTP 方法：** `PATCH`
*   **路径：** `/workspace/:teamid/:id`
*   **描述：** 根据 ID 更新工作区信息。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **路径参数：**
    *   `teamid: string` (团队 ID)
    *   `id: string` (工作区 ID)
*   **请求体：** `commonDto`
*   **权限：** `@roleWeight(RoleWeight.ADMIN)` - 需要管理员权限。
*   **响应体：** (更新后的工作区信息)
    ```json
    {
      "id": 1,
      "name": "Updated Workspace Name",
      "teamId": "team_id_here",
      "userId": "user_id_here",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `403 Forbidden`: 无权限
    *   `404 Not Found`: 工作区不存在
    *   `400 Bad Request`: 团队编号不能为空 / 空间名不能为空
*   **示例：**
    *   **请求:** `PATCH /workspace/team_id_123/workspace_id_456`
        ```json
        {
          "name": "Revised Project Docs"
        }
        ```

#### 4.5.4 查找工作区

*   **HTTP 方法：** `GET`
*   **路径：** `/workspace`
*   **描述：** 根据查询条件查找工作区。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **查询参数：** `findDto`
*   **响应体：** (工作区列表)
    ```json
    [
      {
        "id": 1,
        "name": "Workspace A",
        "teamId": "...",
        "userId": "...",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `400 Bad Request`: 必须包含一个查询字段
*   **示例：**
    *   **请求:** `GET /workspace?teamId=team_id_123`

### 4.6 Favorite 模块 (`favoriteController`)

*   **基础路由：** `/favorite`
*   **守卫：** `@UseGuards(JwtAuthGuard)` - 所有接口都需要有效的 JWT Token。

#### 4.6.1 创建收藏

*   **HTTP 方法：** `POST`
*   **路径：** `/favorite/create`
*   **描述：** 创建一个新的收藏。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **请求体：** `createDto`
*   **响应体：** (创建的收藏信息)
    ```json
    {
      "id": 1,
      "userId": "user_id_here",
      "documentId": "doc_id_here",
      "tag": "important",
      "createdAt": "...",
      "updatedAt": "..."
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `400 Bad Request`: 文档id不能为空
*   **示例：**
    *   **请求:**
        ```json
        {
          "documentId": "doc_id_123",
          "tag": "reading"
        }
        ```

#### 4.6.2 查找收藏

*   **HTTP 方法：** `GET`
*   **路径：** `/favorite`
*   **描述：** 查找当前用户的所有收藏。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **响应体：** (收藏列表)
    ```json
    [
      {
        "id": 1,
        "userId": "user_id_here",
        "documentId": "doc_id_A",
        "tag": "important",
        "createdAt": "...",
        "updatedAt": "..."
      },
      {
        "id": 2,
        "userId": "user_id_here",
        "documentId": "doc_id_B",
        "tag": "later",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
*   **示例：**
    *   **请求:** `GET /favorite`

#### 4.6.3 删除收藏

*   **HTTP 方法：** `DELETE`
*   **路径：** `/favorite/:id`
*   **描述：** 根据 ID 删除一个收藏。
*   **请求头：** `Authorization: Bearer <YOUR_JWT_TOKEN>`
*   **路径参数：**
    *   `id: number` (收藏 ID)
*   **响应体：** (删除成功消息或被删除的收藏信息)
    ```json
    {
      "message": "Favorite deleted successfully"
    }
    ```
*   **错误响应：**
    *   `401 Unauthorized`: 未认证
    *   `404 Not Found`: 收藏不存在
*   **示例：**
    *   **请求:** `DELETE /favorite/1`

### 4.7 App 模块 (`AppController`)

*   **基础路由：** `/`
*   **守卫：** 无

#### 4.7.1 获取 Hello

*   **HTTP 方法：** `GET`
*   **路径：** `/`
*   **描述：** 返回一个简单的“Hello World”消息。
*   **响应体：**
    ```json
    "Hello World!"
    ```
*   **示例：**
    *   **请求:** `GET /`

## 5. 通用错误码 (Common Error Codes)

本 API 在发生错误时，通常会返回标准的 HTTP 状态码，并在响应体中提供详细的错误信息。

*   **`400 Bad Request`：** 请求参数验证失败，或业务逻辑错误（例如：密码错误、验证码失效）。响应体通常包含 `message` 字段说明具体错误。
*   **`401 Unauthorized`：** 未提供认证 Token，或 Token 无效/过期。
*   **`403 Forbidden`：** 已认证用户无权访问该资源或执行该操作。
*   **`404 Not Found`：** 请求的资源不存在。
*   **`500 Internal Server Error`：** 服务器内部错误。

---