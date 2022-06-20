import { ArgumentMetadata, ValidationPipe } from "@nestjs/common";
import { UnprocessableEntityCustom } from "../../utils/exception";
import { ValidationCat, ValidationErrors } from "../../globals/enums";

export class ValidationPipe422 extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata): Promise<unknown> {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      throw new UnprocessableEntityCustom(ValidationErrors.Fail, ValidationCat.App, {
        reason: e.response?.message,
        payload: value,
      });
    }
  }
}
