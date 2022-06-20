import { Module } from "@nestjs/common";
import { Services } from "@src/globals/enums";
import { ConfigService } from "@src/modules/config/config.service";
import { ClientProxyFactory } from "@nestjs/microservices";
import { ConfigModule } from "@src/modules/config/config.module";
import { UserService } from "@src/modules/user/user.service";
import { TokenServiceModule } from "@src/modules/token/token.service.module";
import { EventServiceModule } from "@src/modules/event/event.service.module";

@Module({
  imports: [ConfigModule, TokenServiceModule, EventServiceModule],
  providers: [
    UserService,
    {
      provide: Services.User,
      useFactory: (configService: ConfigService) => {
        const options = configService.get("userService");

        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
  ],
  exports: [Services.User, UserService],
})
export class UserServiceModule {}
