import { Global, Module } from "@nestjs/common";
import { ConfigModule as Config } from "@nestjs/config";
import { ConfigService } from "./config.service";
import { JwtConfigService } from "./jwt.config";

@Global()
@Module({
  imports: [
    Config.forRoot({
      envFilePath: "../.env",
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
