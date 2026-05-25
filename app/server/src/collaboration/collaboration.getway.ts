import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import * as WebSocket from 'ws'

const { setupWSConnection } = require("y-websocket");
// import { setupWSConnection } from 'y-websocket'

@WebSocketGateway({
  cors: { origin: '*' },
})
export class CollaborationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(client: WebSocket, request: any) {
    // 🔥 Yjs 协同核心：一行代码完成同步、冲突合并、光标
    setupWSConnection(client, request, {
      docName: request.url.slice(1), // 房间名
    })
  }

  handleDisconnect(client: WebSocket) {
    client.close()
  }
}