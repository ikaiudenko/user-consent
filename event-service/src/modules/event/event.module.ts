import { Module } from "@nestjs/common";
import { CoreModule } from "@src/modules/core/core.module";
import { EventController } from "@src/modules/event/event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "@src/entities/event.entity";
import { EventService } from "@src/modules/event/event.service";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
