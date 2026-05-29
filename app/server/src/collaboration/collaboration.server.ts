import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

// 房间管理
const rooms = new Map<string, Set<WebSocket>>();



export function setupYjsWebSocketServer(server: Server) {
  // 创建原生 ws 服务
  const wss = new WebSocketServer({ noServer: true });

  // 只处理 /document 路径的 WS 升级
  server.on('upgrade', (request, socket, head) => {
    if (request.url?.startsWith('/document')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  // 连接处理
  wss.on('connection', (ws: WebSocket, req: Request) => {
    const url = (req as any).url;
    const match = url?.match(/^\/document\/(.+?)(\?|$)/);
    if (!match) {
      ws.close();
      return;
    }

    const room = match[1];

    // 加入房间
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    rooms.get(room)!.add(ws);

    // 消息广播（核心协同）
    ws.on('message', (data: Buffer) => {
      
      rooms.get(room)?.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // 断开清理
    ws.on('close', () => {
      const roomClients = rooms.get(room);
      if (roomClients) {
        roomClients.delete(ws);
        if (roomClients.size === 0) {
          rooms.delete(room);
        }
      }
    });
  });
}