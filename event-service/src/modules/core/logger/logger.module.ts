import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { AppLoggerService } from "./app.logger.service";

@Module({
  providers: [AppLoggerService, LoggerService],
  exports: [AppLoggerService, LoggerService],
})
export class LoggerModule {}
