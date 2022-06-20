import { ApiProperty } from "@nestjs/swagger";
import { EventType } from "../../globals/enums";
import { IEvent } from "./event";

export class CreateEventsResponse implements IEvent {
  @ApiProperty({ example: EventType.Email })
  id: EventType;

  @ApiProperty({ example: true })
  enabled: boolean;
}
