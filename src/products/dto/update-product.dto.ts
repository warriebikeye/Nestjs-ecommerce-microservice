import { IsString, IsEmail, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
  
  @IsString()
  @IsNotEmpty()
  category: string;
  
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

