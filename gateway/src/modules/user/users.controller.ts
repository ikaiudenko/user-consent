import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CreateUserDto } from "@src/interfaces/user/dto/create-user.dto";
import { CreateUserResponse } from "@src/interfaces/user/create-user.response";
import { UserIdRequest } from "@src/interfaces/user/user.id.request";
import { UserService } from "@src/modules/user/user.service";
import { ApiKey } from "@src/globals/enums";
import { GetUserResponse } from "@src/interfaces/user/user.get";
import { IUser } from "@src/interfaces/user/user.interface";
import { ApiAuthGuard } from "@src/guards/api.authorization.guard";
import { AuthGuard } from "@src/guards/authorization.guard";

@Controller({
  path: "users",
  version: "1",
})
@ApiTags("users")
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: GetUserResponse })
  @UseGuards(AuthGuard)
  public async getUserById(@Req() req): Promise<IUser> {
    return await this.userService.getByIdWithConsents(req.user?.id);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateUserResponse })
  @ApiSecurity(ApiKey)
  @UseGuards(ApiAuthGuard)
  public async createUser(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return await this.userService.create(body);
  }

  @Delete(":id")
  @ApiSecurity(ApiKey)
  @ApiNoContentResponse()
  @UseGuards(ApiAuthGuard)
  public async deleteUser(@Param() param: UserIdRequest): Promise<void> {
    return this.userService.delete(param.id);
  }
}
