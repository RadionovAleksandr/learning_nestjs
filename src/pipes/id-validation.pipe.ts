import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";
import { ID_VALIDATIONS_ERROR } from "./id-validations.constants";

@Injectable()
export class IdValidationsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      return value;
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_VALIDATIONS_ERROR);
    }

    return value
  }
}
