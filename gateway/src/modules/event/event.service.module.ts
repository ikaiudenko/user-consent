import { Module } from "@nestjs/common";
import { EventService } from "@src/modules/event/event.service";
import { Services } from "@src/globals/enums";
import { ConfigService } from "@src/modules/config/config.service";
import { ClientProxyFactory } from "@nestjs/microservices";
import { ConfigModule } from "@src/modules/config/config.module";

@Module({
  imports: [ConfigModule],
  providers: [
    EventService,
    {
      provide: Services.Event,
      useFactory: (configService: ConfigService) => {
        const options = configService.get("eventService");

        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
  ],
  exports: [Services.Event, EventService],
})
export class EventServiceModule {}
