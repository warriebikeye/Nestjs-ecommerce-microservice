// src/auth/entities/user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  verificationCode: string;

  @Prop()
  isVerified: boolean;

  @Prop()
  verificationCodeExpiry: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
