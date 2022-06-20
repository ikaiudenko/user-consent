import { Body, Controller, HttpException } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CreateEventDto } from "@src/interfaces/dto/create.event.dto";
import { EventService } from "@src/modules/event/event.service";
import { ApiSuccessResponse, EventsFailResponse, EventsSuccessResponse } from "@src/models";
import { IApiErrorResponse, IApiSuccessResponse, ISuccess } from "@src/interfaces";
import { IEvent } from "@src/interfaces/event";

@Controller("events")
export class EventController {
  constructor(private eventService: EventService) {}

  @MessagePattern("events_get_actual")
  public async getActual(userId: string): Promise<IApiSuccessResponse<IEvent[]> | IApiErrorResponse> {
    try {
      const events = await this.eventService.getActual(userId);

      return new EventsSuccessResponse(events).build() as IApiSuccessResponse<IEvent[]>;
    } catch (error) {
      return new EventsFailResponse(error as HttpException).build();
    }
  }

  @MessagePattern("events_create")
  public async createEvent(@Body() body: CreateEventDto): Promise<IApiSuccessResponse<IEvent[]> | IApiErrorResponse> {
    try {
      const events = await this.eventService.createEvents(body);

      return new EventsSuccessResponse(events).build() as IApiSuccessResponse<IEvent[]>;
    } catch (error) {
      return new EventsFailResponse(error as HttpException).build();
    }
  }

  @MessagePattern("events_delete")
  public async deleteEvents(userId: string): Promise<IApiSuccessResponse<ISuccess> | IApiErrorResponse> {
    try {
      await this.eventService.deleteEvents(userId);

      return new ApiSuccessResponse<null, ISuccess>(null).build() as IApiSuccessResponse<ISuccess>;
    } catch (error) {
      return new EventsFailResponse(error as HttpException).build();
    }
  }
}
