import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "./user.interface";
import { CreateEventsResponse } from "@src/interfaces/event/create.events.response";
import { EventType } from "@src/globals/enums";

export class GetUserResponse implements IUser {
  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  id: string;

  @ApiProperty({ example: "mail@mail.com", nullable: false })
  email: string;

  @ApiProperty({
    example: [
      { id: EventType.Email, enabled: true },
      { id: EventType.Sms, enabled: false },
    ],
  })
  consents: CreateEventsResponse[];
}
