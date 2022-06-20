import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthCat, AuthHeader, Bearer } from "../globals/enums";
import { UnauthorizedCustom } from "../utils/exception";
import { ITokenInfo } from "../interfaces/token/token-info.interface";
import { TokenService } from "@src/modules/token/token.service";
import { UserService } from "@src/modules/user/user.service";
import { IncomingHttpHeaders } from "http";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token: ITokenInfo = await this.tokenService.decode(this.getBearer(request.headers));
      const { id } = await this.userService.getById(token.userId);

      request.user = { id };
    } catch ({ message }) {
      throw new UnauthorizedCustom(message, AuthCat.UserToken);
    }

    return true;
  }

  private getBearer(headers: IncomingHttpHeaders): string {
    return headers[AuthHeader]?.replace(Bearer, "").trim() || "";
  }
}
