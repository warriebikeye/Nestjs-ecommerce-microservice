import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SignalRGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;
  private users: Map<string, string> = new Map();

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
    this.users.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.users.delete(userId);
      }
    });
  }

  @SubscribeMessage('register')
  registerUser(@MessageBody() userId: string, @ConnectedSocket() client: Socket): void {
    this.users.set(userId, client.id);
    console.log(`User ${userId} registered with socket ID ${client.id}`);
  }

  @SubscribeMessage('send_message')
  handlePrivateMessage(@MessageBody() data: { toUserId: string; fromUserId: string; message: string }, @ConnectedSocket() client: Socket): void {
    const { toUserId, fromUserId, message } = data;
    const recipientSocketId = this.users.get(toUserId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('receive_message', { fromUserId, message });
    }
  }

  @SubscribeMessage('broadcast_message')
  handleBroadcastMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    this.server.emit('receive_message', { message, fromUserId: 'System' });
  }
}
