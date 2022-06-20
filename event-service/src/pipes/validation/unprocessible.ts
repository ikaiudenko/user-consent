import { ArgumentMetadata, ValidationPipe } from "@nestjs/common";
import { ValidationCat } from "@src/globals/enums";
import { ValidationErrors } from "@src/globals/enums/errors/valiation";
import { LoggerService } from "@src/modules/core/logger/logger.service";

export class ValidationPipe422 extends ValidationPipe {
  private logger: LoggerService = new LoggerService();

  public async transform<T>(value, metadata: ArgumentMetadata): Promise<T> {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      this.logger.error(ValidationErrors.Fail, {
        category: ValidationCat.App,
        error: e.message,
        extra: {
          payload: value,
        },
      });
    }
  }
}
