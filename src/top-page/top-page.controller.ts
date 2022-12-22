import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post, UseGuards, UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateTopPageDto } from "./dto/top-page.dto";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { TopPageService } from "./top-page.service";
import { NOT_FOUND_TOP_PAGE_ERROR } from "./top-page.constants";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {

  }
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id: string) {
    const page = this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }

  @Get('byAlias/:id')
  async getByAlias(@Param('alias') alias: string) {
    const page = this.topPageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    const page = this.topPageService.deleteById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const page =  this.topPageService.updateById(id, dto);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }

  @Post('find')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}
