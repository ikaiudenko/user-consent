import { Global, Module } from "@nestjs/common";
import { ConfigModule as Config } from "@nestjs/config";
import { ConfigService } from "./config.service";

@Global()
@Module({
  imports: [
    Config.forRoot({
      envFilePath: "../.env",
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
