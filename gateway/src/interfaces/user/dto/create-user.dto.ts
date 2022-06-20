import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: "mail@mail.com",
  })
  @IsEmail()
  email: string;
}
