import { Module } from "@nestjs/common";
import { CoreModule } from "@src/modules/core.module";
import { UserServiceModule } from "@src/modules/user/user.service.module";
import { TokenServiceModule } from "@src/modules/token/token.service.module";

@Module({
  imports: [CoreModule, TokenServiceModule, UserServiceModule],
  providers: [TokenServiceModule],
  exports: [TokenServiceModule],
})
export class TokenModule {}
