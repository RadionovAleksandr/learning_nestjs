import { TopLevelCategoryEnum } from "./top-page.dto";
import { IsEnum } from "class-validator";

export class FindTopPageDto {
  @IsEnum(TopLevelCategoryEnum)
  firstCategory: TopLevelCategoryEnum
}
