import { Module } from "@nestjs/common";
import { Services } from "@src/globals/enums";
import { ConfigService } from "@src/modules/config/config.service";
import { ClientProxyFactory } from "@nestjs/microservices";
import { ConfigModule } from "@src/modules/config/config.module";
import { TokenService } from "@src/modules/token/token.service";

const serviceProvider = {
  provide: Services.Token,
  useFactory: (configService: ConfigService) => {
    const options = configService.get("tokenService");

    return ClientProxyFactory.create(options);
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [serviceProvider, TokenService],
  exports: [Services.Token, TokenService],
})
export class TokenServiceModule {}
