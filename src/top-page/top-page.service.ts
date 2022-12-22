import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateTopPageDto, TopLevelCategoryEnum } from "./dto/top-page.dto";
import { TopPageModel } from "./top-page.model";

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {
  }

  create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  findById(id: string) {
    return this.topPageModel.findById(id);
  }

  findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  findByText(text: string) {
    return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }

  findByCategory(firstCategory: TopLevelCategoryEnum) {
    return this.topPageModel
      .aggregate()
      .match({ firstCategory })
      .group({
        _id: { secondCategory: "$secondCategory" },
        pages: { $push: { alias: "$alias", title: "$title" } }
      }).exec();
  }

  deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
