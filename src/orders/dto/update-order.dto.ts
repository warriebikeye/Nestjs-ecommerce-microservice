import { IsString, IsEmail, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
  
  @IsString()
  @IsNotEmpty()
  quantity: string;
  
  @IsNumber()
  @IsNotEmpty()
  inventory: number;
  
  @IsString()
  @IsNotEmpty()
  tags: string[];
  
  @IsString()
  @IsNotEmpty()
  images: string[];
}

