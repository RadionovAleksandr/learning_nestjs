import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export enum TopLevelCategoryEnum {
  Courses,
  Services,
  Books,
  Products,
}

export class HhDataDto {
  @IsNumber()
  count: number;
  @IsNumber()
  juniorSalary: number;
  @IsNumber()
  middleSalary: number;
  @IsNumber()
  seniorSalary: number;
}

export class TopPageAdvantageDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class CreateTopPageDto extends TimeStamps {
  @IsEnum(TopLevelCategoryEnum)
  firstCategory: TopLevelCategoryEnum;
  @IsString()
  secondCategory: string;
  @IsString()
  alias: string;
  @IsString()
  title: string;
  @IsString()
  category: string;
  @IsArray()
  @ValidateNested()
  @Type( () => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];
  @IsString()
  seoText: string;
  @IsString()
  tagsTitle: string;
  @IsArray()
  @IsString({
    each: true,
  })
  tags: string[];
  @IsOptional()
  @ValidateNested()
  @Type(() =>  HhDataDto)
  hh?: HhDataDto
}
