import { Inject, Injectable } from "@nestjs/common";
import { ApiResponse } from "@src/utils/models/api.response";
import { IEvent } from "@src/interfaces/event/event";
import { firstValueFrom } from "rxjs";
import { BadRequestCustom } from "@src/utils/exception/bad.request";
import { EventCat, Services } from "@src/globals/enums";
import { ClientProxy } from "@nestjs/microservices";
import { CreateEventsPayload } from "@src/interfaces/event/dto/create.event.dto";
import { CreateEventsResponse } from "@src/interfaces/event/create.events.response";
import { ISuccess } from "@src/interfaces/responses/api";

@Injectable()
export class EventService {
  constructor(@Inject(Services.Event) private readonly eventServiceClient: ClientProxy) {}

  async createEvents(payload: CreateEventsPayload): Promise<CreateEventsResponse[]> {
    try {
      const apiResponse = new ApiResponse<IEvent[]>(
        await firstValueFrom(this.eventServiceClient.send("events_create", payload)),
      );

      apiResponse.validate();

      return apiResponse.getData();
    } catch (error) {
      throw new BadRequestCustom(error.message, EventCat.CreateFail, {
        payload,
      });
    }
  }

  async deleteEvents(userId: string): Promise<ISuccess> {
    try {
      const apiResponse = new ApiResponse<ISuccess>(
        await firstValueFrom(this.eventServiceClient.send("events_delete", userId)),
      );

      apiResponse.validate();

      return apiResponse.getData();
    } catch (error) {
      throw new BadRequestCustom(error.message, EventCat.CreateFail, {
        userId,
      });
    }
  }

  async getEvents(userId: string): Promise<IEvent[]> {
    try {
      const apiResponse = new ApiResponse<IEvent[]>(
        await firstValueFrom(this.eventServiceClient.send("events_get_actual", userId)),
      );

      apiResponse.validate();

      return apiResponse.getData();
    } catch (error) {
      throw new BadRequestCustom(error.message, EventCat.CreateFail, {
        userId,
      });
    }
  }
}
