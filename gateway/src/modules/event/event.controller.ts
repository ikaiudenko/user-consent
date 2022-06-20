import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateEventsDto } from "@src/interfaces/event/dto/create.event.dto";
import { CreateEventsResponse } from "@src/interfaces/event/create.events.response";
import { EventService } from "@src/modules/event/event.service";
import { AuthGuard } from "@src/guards/authorization.guard";

@Controller({
  path: "events",
  version: "1",
})
@ApiTags("events")
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateEventsResponse, isArray: true })
  @UseGuards(AuthGuard)
  async createEvents(@Body() body: CreateEventsDto, @Request() req): Promise<CreateEventsResponse[]> {
    const payload = { ...body, user: { id: req.user.id } };

    return await this.eventService.createEvents(payload);
  }
}
