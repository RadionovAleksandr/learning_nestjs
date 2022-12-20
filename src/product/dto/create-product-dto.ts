import { IsNumber, IsString, IsOptional, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";

class ProductCharacteristicDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  title: string;
  @IsString()
  image: string;
  @IsNumber()
  price: number;
  @IsNumber()
  @IsOptional()
  oldPrice?: number;
  @IsNumber()
  credit: number;
  @IsString()
  descriptions: string;
  @IsString()
  advantages: string;
  @IsString()
  disAdvantages: string;
  @IsString({ each: true })
  categories: string[];
  @IsString({ each: true })
  tags: string[];
  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[]
}
