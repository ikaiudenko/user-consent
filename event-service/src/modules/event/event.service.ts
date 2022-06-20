import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, EntityManager, Repository } from "typeorm";
import { EventEntity } from "@src/entities/event.entity";
import { LoggerService } from "@src/modules/core/logger/logger.service";
import { Exception } from "@src/modules/core/exception/exception";
import { CreateEventDto, EventDto } from "@src/interfaces/dto/create.event.dto";
import { EventErrors } from "@src/globals/enums/errors";
import { EventCat } from "@src/globals/enums";
import { EventSuccess } from "@src/globals/enums/success/event";
import { ISuccess } from "@src/interfaces";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    private readonly manager: EntityManager,
    private exception: Exception,
    private logger: LoggerService,
  ) {}

  public async getActual(id: string): Promise<EventEntity[]> {
    try {
      const events = await this.eventRepo
        .createQueryBuilder("event1")
        .select("*")
        .innerJoin(
          (subQuery) =>
            subQuery
              .select("userId")
              .addSelect("type")
              .addSelect("MAX(createdAt)", "createdAt")
              .from(EventEntity, "events")
              .where("userId = :id", { id })
              .groupBy("type"),
          "event2",
          "event1.userId = event2.userId AND event1.type = event2.type AND event1.createdAt = event2.createdAt",
        )
        .getRawMany();

      this.logger.log(EventSuccess.Get, { category: EventCat, extra: { userId: id, events } });

      return events;
    } catch (error) {
      throw this.exception.badRequest(EventErrors.GetFail, EventCat, { error: error.message });
    }
  }

  public async createEvents(data: CreateEventDto): Promise<EventEntity[]> {
    try {
      const consents = this.eventRepo.create(this.map(data));

      await this.eventRepo.insert(consents);
      this.logger.log(EventSuccess.Create, { category: EventCat, extra: { user: data.user } });

      return consents;
    } catch (error) {
      throw this.exception.badRequest(EventErrors.CreateFail, EventCat, { error: error.message });
    }
  }

  public async deleteEvents(userId: string): Promise<ISuccess> {
    try {
      await this.eventRepo.delete({ userId });
      this.logger.log(EventSuccess.Delete, { category: EventCat, extra: { userId } });

      return { success: true };
    } catch (error) {
      throw this.exception.badRequest(EventErrors.DeleteFail, EventCat, { error: error.message });
    }
  }

  private map(data: CreateEventDto): DeepPartial<EventEntity>[] {
    const userId = data.user.id;

    return data.consents?.map((consent: EventDto): DeepPartial<EventEntity> => {
      return { userId, type: consent.id, enabled: consent.enabled };
    });
  }
}
