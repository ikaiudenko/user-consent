import { EventType } from "@src/globals/enums";

export class EventDto {
  id: EventType;

  enabled: boolean;
}

export class CreateEventDto {
  user: { id: string };

  consents: EventDto[];
}
