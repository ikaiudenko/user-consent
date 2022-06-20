import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ApiKey, AuthCat } from "../globals/enums";
import { UnauthorizedCustom } from "../utils/exception";
import { TokenService } from "@src/modules/token/token.service";

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private tokenService: TokenService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const valid: boolean = await this.tokenService.validateApi(request.headers[ApiKey]);

      return valid;
    } catch ({ message }) {
      throw new UnauthorizedCustom(message, AuthCat.ApiToken);
    }
  }
}
