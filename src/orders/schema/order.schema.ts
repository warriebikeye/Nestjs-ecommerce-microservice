// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 0 })
  inventory: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [String] })
  images: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
