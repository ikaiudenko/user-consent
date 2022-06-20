import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthCat, AuthErrors, Services, TokenErrors } from "@src/globals/enums";
import { ClientProxy } from "@nestjs/microservices";
import { IServiceTokenCreateResponse } from "@src/interfaces/token/service.create.response";
import { firstValueFrom } from "rxjs";
import { ITokenInfo } from "@src/interfaces/token/token-info.interface";
import { UnauthorizedCustom } from "@src/utils/exception";
import { ApiResponse } from "@src/utils/models/api.response";
import { BadRequestCustom } from "@src/utils/exception/bad.request";
import { ITokenValidResponse } from "@src/interfaces/token/valid.response";

@Injectable()
export class TokenService {
  constructor(@Inject(Services.Token) private readonly tokenServiceClient: ClientProxy) {}

  public async create(userId: string): Promise<IServiceTokenCreateResponse> {
    try {
      const apiResponse: ApiResponse<IServiceTokenCreateResponse> = new ApiResponse(
        await firstValueFrom(this.tokenServiceClient.send("token_create", { userId })),
      );

      apiResponse.validate();

      return apiResponse.getData();
    } catch ({ message }) {
      throw new BadRequestCustom(TokenErrors.Create, AuthCat.UserToken, { userId, message });
    }
  }

  public async decode(token: string): Promise<ITokenInfo> {
    try {
      const apiResponse: ApiResponse<ITokenInfo | null> = new ApiResponse(
        await firstValueFrom(
          this.tokenServiceClient.send("token_decode", {
            token,
          }),
        ),
      );

      apiResponse.validate();

      const decodedToken = apiResponse.getData();

      if (!decodedToken) {
        throw new UnauthorizedException(AuthErrors.BadToken);
      }

      return decodedToken;
    } catch (error) {
      const message = error instanceof UnauthorizedException ? error.message : AuthErrors.BadToken;

      throw new UnauthorizedCustom(message, AuthCat.UserToken);
    }
  }

  public async validateApi(token: string): Promise<boolean> {
    try {
      const apiResponse: ApiResponse<ITokenValidResponse> = new ApiResponse(
        await firstValueFrom(this.tokenServiceClient.send("token_api_validate", token)),
      );

      apiResponse.validate();

      const { valid } = apiResponse.getData();

      if (!valid) {
        throw new UnauthorizedException(AuthErrors.BadApiToken);
      }

      return true;
    } catch (error) {
      const message = error instanceof UnauthorizedException ? error.message : AuthErrors.BadApiToken;

      throw new UnauthorizedCustom(message, AuthCat.ApiToken);
    }
  }
}
