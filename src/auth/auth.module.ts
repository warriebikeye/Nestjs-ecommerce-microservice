import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from '../email/email.module';
import { KafkaModule } from '../kafka/kafka.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [EmailModule, KafkaModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
