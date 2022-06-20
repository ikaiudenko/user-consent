import { Module } from "@nestjs/common";
import { LoggerModule } from "./logger/logger.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@src/modules/config/config.module";

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 150,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [LoggerModule, ConfigModule],
})
export class CoreModule {}
