import { Inject, Injectable } from "@nestjs/common";
import { ApiResponse } from "@src/utils/models/api.response";
import { IUser, IUserCreate, IUserDelete } from "@src/interfaces/user/user.interface";
import { firstValueFrom } from "rxjs";
import { BadRequestCustom } from "@src/utils/exception/bad.request";
import { Services, UserCat, UserErrors } from "@src/globals/enums";
import { ClientProxy } from "@nestjs/microservices";
import { TokenService } from "@src/modules/token/token.service";
import { CreateUserResponse } from "@src/interfaces/user/create-user.response";
import { CreateUserDto } from "@src/interfaces/user/dto/create-user.dto";
import { EventService } from "@src/modules/event/event.service";

@Injectable()
export class UserService {
  constructor(
    @Inject(Services.User) private readonly userServiceClient: ClientProxy,
    private tokeService: TokenService,
    private eventService: EventService,
  ) {}

  public async create(body: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const apiResponse = new ApiResponse<IUserCreate>(
        await firstValueFrom(this.userServiceClient.send("user_create", body)),
      );

      apiResponse.validate();

      const user = apiResponse.getData();
      const token = await this.tokeService.create(user.id);

      return { ...user, ...token };
    } catch ({ message }) {
      throw new BadRequestCustom(UserErrors.Create, UserCat.CreateFail, {
        payload: body,
        reason: message,
      });
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const apiResponse = new ApiResponse<IUserDelete>(
        await firstValueFrom(this.userServiceClient.send("user_delete", id)),
      );

      apiResponse.validate();

      await this.eventService.deleteEvents(id);
    } catch ({ message }) {
      throw new BadRequestCustom(UserErrors.Delete, UserCat.DeleteFail, {
        id,
        message,
      });
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      const userApiResponse = new ApiResponse<IUser>(
        await firstValueFrom(this.userServiceClient.send("user_get_by_id", id)),
      );

      userApiResponse.validate();

      return userApiResponse.getData();
    } catch ({ message }) {
      throw new BadRequestCustom(message, UserCat.GetFail, { id });
    }
  }

  public async getByIdWithConsents(id: string): Promise<IUser> {
    try {
      const user = await this.getById(id);
      const consents = await this.eventService.getEvents(user.id);

      return { ...user, consents };
    } catch ({ message }) {
      throw new BadRequestCustom(message, UserCat.GetWithConsentsFail, { id });
    }
  }
}
