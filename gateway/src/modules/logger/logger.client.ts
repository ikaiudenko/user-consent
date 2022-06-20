import { Logger } from "winston";
import { createLogger, format, transports } from "winston";

export class LoggerClient {
  private static client: Logger;

  static get(): Logger {
    if (!LoggerClient.client) {
      LoggerClient.client = createLogger({
        format: format.errors({ stack: true }),
        transports: [
          new transports.Console({
            format: format.combine(format.splat(), format.simple(), format.colorize({ all: true })),
          }),
        ],
      });
    }

    return LoggerClient.client;
  }
}
