import { Module } from "@nestjs/common";
import { LoggerModule } from "./logger/logger.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule, LoggerModule],
  exports: [ConfigModule, LoggerModule],
})
export class CoreModule {}
