import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { TokenService } from "./services/token";
import { ApiSuccessResponse, ApiFailResponse } from "@src/models/api.response";
import { IApiErrorResponse, IApiSuccessResponse } from "@src/interfaces/response";
import { IToken, ITokenData, IValid } from "@src/interfaces/token";

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern("token_create")
  public createToken(data: ITokenData): IApiSuccessResponse<IToken> | IApiErrorResponse {
    try {
      return new ApiSuccessResponse<IToken>(this.tokenService.createToken(data)).build();
    } catch (error) {
      return new ApiFailResponse(error).build();
    }
  }

  @MessagePattern("token_decode")
  public decodeToken(data: { token: string }): IApiSuccessResponse<ITokenData> | IApiErrorResponse {
    try {
      return new ApiSuccessResponse<ITokenData>(this.tokenService.decodeToken(data.token)).build();
    } catch (error) {
      return new ApiFailResponse(error).build();
    }
  }

  @MessagePattern("token_api_validate")
  public validateApiToken(secret: string): IApiSuccessResponse<IValid> | IApiErrorResponse {
    try {
      return new ApiSuccessResponse<IValid>(this.tokenService.validateApiToken(secret)).build();
    } catch (error) {
      return new ApiFailResponse(error).build();
    }
  }
}
