import { Module } from "@nestjs/common";
import { EventController } from "@src/modules/event/event.controller";
import { EventServiceModule } from "@src/modules/event/event.service.module";
import { TokenServiceModule } from "@src/modules/token/token.service.module";
import { UserServiceModule } from "@src/modules/user/user.service.module";

@Module({
  imports: [EventServiceModule, UserServiceModule, TokenServiceModule],
  controllers: [EventController],
})
export class EventModule {}
