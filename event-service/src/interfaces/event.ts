import { EventType } from "@src/globals/enums";

export interface IEvent {
  id: EventType;
  enabled: boolean;
}
