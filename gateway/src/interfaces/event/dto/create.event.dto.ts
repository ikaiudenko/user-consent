import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EventType } from "../../../globals/enums";

class ConsentDTO {
  @IsEnum(EventType)
  id: EventType;

  @IsBoolean()
  enabled: boolean;
}

export class CreateEventsDto {
  @ApiProperty({
    example: [
      {
        id: "email_notifications",
        enabled: false,
      },
      {
        id: "sms_notifications",
        enabled: true,
      },
    ],
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConsentDTO)
  consents: ConsentDTO[];
}

export class CreateEventsPayload extends CreateEventsDto {
  user: {
    id: string;
  };
}
