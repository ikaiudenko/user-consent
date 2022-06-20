import { ApiProperty } from "@nestjs/swagger";
import { IUserCreate } from "./user.interface";

export class CreateUserResponse implements IUserCreate {
  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  id: string;

  @ApiProperty({ example: "mail@mail.com", nullable: false })
  email: string;

  @ApiProperty({ example: "xxxxx.yyyyy.zzzzz", nullable: true })
  token: string | null;
}
