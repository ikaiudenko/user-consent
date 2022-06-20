import { Injectable, LoggerService as INextLogger } from "@nestjs/common";
import { Logger } from "winston";
import { LoggerClient } from "./logger.client";
import { Levels, ServerCat } from "@src/globals/enums/logger";

@Injectable()
export class AppLoggerService implements INextLogger {
  private readonly client: Logger = LoggerClient.get();

  log(message: string, context?: string): void {
    this.client.log(Levels.I, message, {
      category: ServerCat.Info,
      extra: { context },
    });
  }

  error(message: string, trace?: string, context?: string): void {
    this.client.error(message, {
      category: ServerCat.Error,
      extra: { trace, context },
    });
  }

  warn(message: string, context?: string): void {
    this.client.warn(message, {
      category: ServerCat.Warn,
      extra: { context },
    });
  }
}
