import { Body, Controller, HttpException } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { UserService } from "./user.service";
import { ApiSuccessResponse, UserFailResponse, UserSuccessResponse } from "../../models";
import { IUser, IUserDelete } from "@src/interfaces/user";
import { CreateUserDto } from "@src/interfaces/dto/create-user.dto";
import { IApiErrorResponse, IApiSuccessResponse } from "@src/interfaces";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("user_get_by_id")
  public async getUserById(id: string): Promise<IApiSuccessResponse<IUser> | IApiErrorResponse> {
    try {
      const data = await this.userService.getById(id);

      return new UserSuccessResponse(data).build();
    } catch (error) {
      return new UserFailResponse(error as HttpException).build();
    }
  }

  @MessagePattern("user_create")
  public async createUser(@Body() user: CreateUserDto): Promise<IApiSuccessResponse<IUser> | IApiErrorResponse> {
    try {
      const data = await this.userService.create(user);

      return new UserSuccessResponse(data).build();
    } catch (error) {
      return new UserFailResponse(error as HttpException).build();
    }
  }

  @MessagePattern("user_delete")
  public async deleteUser(id: string): Promise<IApiSuccessResponse<IUserDelete> | IApiErrorResponse> {
    try {
      await this.userService.delete(id);

      return new ApiSuccessResponse({ id }).build();
    } catch (error) {
      return new UserFailResponse(error as HttpException).build();
    }
  }
}
