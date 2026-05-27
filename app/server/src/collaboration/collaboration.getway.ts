import { WebSocketGateway, OnGatewayConnection } from '@nestjs/websockets';
import { WebSocket } from 'ws';
// import * as Y from 'yjs';
// import { fromUint8Array, toUint8Array } from 'js-base64';
import { documentService } from '../document/document.service.js';
import { JwtAuthGuard } from '@/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';


// 内存缓存正在编辑的文档，避免频繁查库
const activeDocs = new Map<string, Set<WebSocket>>();

@WebSocketGateway({
  path: '/document',      // ✅ 固定地址
  cors: {
    origin: true,
    credentials: true,   // ✅ 允许跨域携带 cookie
  },
})
// @UseGuards(JwtAuthGuard)
export class CollaborationGateway implements OnGatewayConnection {
  constructor(
    // 注入你的 service
    private readonly documentService: documentService,
  ) { }

  async handleConnection(client: WebSocket, req: any) {
    try {
      // 1. 解析 URL：ws://localhost:3000/doc-1001  从 URL 参数获取 docId
      const url = new URL(`http://${req.headers.host}${req.url}`);
      const docId = +url.searchParams.get('docId');
      const teamId = +url.searchParams.get('teamId');
      if (!docId) {
        client.close();
        return;
      }


      //  校验文档权限
      // const userId = +req.user.id;
      // const hasPerm = await this.documentService.checkPermission(
      //   docId,
      //   teamId,
      //   userId,
      // );

      // if (!hasPerm) {
      //   client.close();
      //   return;
      // }
      // 2. 从内存 or 数据库获取 YDoc
      const roomName = `doc:${docId}`;

      // 加入房间
      if (!activeDocs.has(roomName)) activeDocs.set(roomName, new Set());
      activeDocs.get(roomName)!.add(client);
      // let ydoc = activeDocs.get(roomName);
      // if (!ydoc) {
      //   ydoc = new Y.Doc();

      //   // 从你的表读取 yjsData
      //   const { content } = await this.documentService.findOne(docId);
      //   if (content) {
      //     const binary = toUint8Array(content);
      //     Y.applyUpdate(ydoc, binary);
      //   }



      // 3. 监听变化 → 自动保存到你的数据库

      // ydoc.on('update', async (update: Uint8Array) => {
      //   try {

      //     // 获取当前库中存储的数据
      //     const { content } = await this.documentService.findOne(docId);
      //     let finalData: Uint8Array;

      //     if (content) {
      //       // 合并历史 + 新更新
      //       const existingUpdate = toUint8Array(content);
      //       finalData = Y.mergeUpdates([existingUpdate, update]);
      //     } else {
      //       finalData = update;
      //     }

      //     // 保存到你的 document 表
      //     await this.documentService.update({
      //       id: docId,
      //       teamId,
      //       content: fromUint8Array(finalData),
      //     });
      //   } catch (err) { }
      // });

      //   activeDocs.set(roomName, ydoc);
      // }


      // 收到消息 → 广播所有人
      client.on('message', (data) => {
        activeDocs.get(roomName)?.forEach((c) => {
          if (c !== client && c.readyState === WebSocket.OPEN) c.send(data);
        });
      });

      // 离开清理
      client.on('close', () => {
        const roomClients = activeDocs.get(roomName);
        if (roomClients) roomClients.delete(client);
        if (roomClients?.size === 0) activeDocs.delete(roomName);
      });

    } catch (err) {
      client.close();
    }
  }
}