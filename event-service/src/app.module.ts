import { Module } from "@nestjs/common";
import { EventModule } from "@src/modules/event/event.module";

@Module({
  imports: [EventModule],
})
export class AppModule {}
