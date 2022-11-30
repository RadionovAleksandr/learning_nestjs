import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ProductModel } from "../product/product.model";
import { TopPageModel } from "./top-page.model";
import { FindTopPageDto } from "./dto/find-top-page.dto";

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, 'id'>) {

  }

  @Get(':id')
  async get(@Param('id') id: string) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {

  }

  @Post()
  @HttpCode(200)
  async find(@Body() dto: FindTopPageDto) {

  }
}
