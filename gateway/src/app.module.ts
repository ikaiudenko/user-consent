import { Module } from "@nestjs/common";
import { CoreModule } from "@src/modules/core.module";
import { UserModule } from "@src/modules/user/user.module";
import { EventModule } from "@src/modules/event/event.module";
import { TokenModule } from "@src/modules/token/token.module";

@Module({
  imports: [CoreModule, UserModule, EventModule, TokenModule],
})
export class AppModule {}
