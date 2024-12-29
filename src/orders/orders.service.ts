// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  create(createOrderDto: CreateOrderDto): Promise<Product> {
    return this.productModel.create(createOrderDto);
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findById(id: string){
    return this.findById(id).exec();
  }

  update(id: string, updateOrderDto: UpdateOrderDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
