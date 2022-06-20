import { Module } from "@nestjs/common";
import { TokenController } from "./token.controller";
import { TokenService } from "./services/token";
import { CoreModule } from "./modules/core/core";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "./modules/core/config/jwt.config";

@Module({
  imports: [
    CoreModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
