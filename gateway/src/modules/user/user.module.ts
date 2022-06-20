import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserServiceModule } from "@src/modules/user/user.service.module";
import { TokenServiceModule } from "@src/modules/token/token.service.module";

@Module({
  imports: [UserServiceModule, TokenServiceModule],
  controllers: [UsersController],
})
export class UserModule {}
