import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { Exception } from "./exception";

@Module({
  imports: [LoggerModule],
  providers: [Exception],
  exports: [LoggerModule, Exception],
})
export class ExceptionModule {}
