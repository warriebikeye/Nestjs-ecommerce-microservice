// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: 0 })
  inventory: number;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [String] })
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
