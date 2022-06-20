import { EventType } from "../../globals/enums";

export interface IEvent {
  id: EventType;
  enabled: boolean;
}
