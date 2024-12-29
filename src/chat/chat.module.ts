import { Module } from '@nestjs/common';
import { SignalRGateway } from './signalr.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [SignalRGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
