import { Injectable, LoggerService as INextLogger } from "@nestjs/common";

import { Logger } from "winston";
import { ILogDetails } from "@src/interfaces/logger";
import { LoggerClient } from "./logger.client";
import { Levels } from "@src/globals/enums/logger";

@Injectable()
export class LoggerService implements INextLogger {
  private readonly client: Logger = LoggerClient.get();

  error<T>(message: string, details?: ILogDetails<T>): void {
    this.client.error(message, details);
  }

  log<T>(message: string, details?: ILogDetails<T>): void {
    this.client.log(Levels.I, message, details);
  }

  warn<T>(message: string, details?: ILogDetails<T>): void {
    this.client.warn(message, details);
  }

  debug<T>(message: string, details?: ILogDetails<T>): void {
    this.client.debug(message, details);
  }
}
