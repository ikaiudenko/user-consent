import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { DbModule } from "./db/db.module";
import { ExceptionModule } from "@src/modules/core/exception/exception.module";

@Module({
  imports: [ConfigModule, DbModule, ExceptionModule],
  exports: [ConfigModule, DbModule, ExceptionModule],
})
export class CoreModule {}
