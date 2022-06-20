import { Module } from "@nestjs/common";
import { LoggerModule } from "../core/logger/logger.module";
import { Exception } from "./exception";

@Module({
  imports: [LoggerModule],
  providers: [Exception],
  exports: [Exception],
})
export class ExceptionModule {}
