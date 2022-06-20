import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Logger } from "winston";
import { LoggerClient } from "@src/modules/logger/logger.client";
import { CustomHttpException } from "@src/utils/exception";

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  private logger: Logger = LoggerClient.get();

  catch(exception: CustomHttpException, host: ArgumentsHost): void {
    const { category, meta } = exception;

    this.logger.error(exception.message, { category, meta });
    super.catch(exception, host);
  }
}
