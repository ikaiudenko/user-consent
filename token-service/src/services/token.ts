import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IDecodedToken, IToken, ITokenData, IValid } from "@src/interfaces/token";
import { TokenCat, TokenErrors } from "@src/globals/enums";
import { LoggerService } from "@src/modules/core/logger/logger.service";
import { ConfigService } from "@src/modules/core/config/config.service";

@Injectable()
export class TokenService {
  static readonly expiration: string | number = "1d";

  constructor(private readonly jwtService: JwtService, private logger: LoggerService, private config: ConfigService) {}

  public createToken(payload: ITokenData): IToken {
    try {
      const token = this.jwtService.sign(payload, {
        expiresIn: TokenService.expiration,
      });

      return { token };
    } catch (e) {
      this.logger.error(e.message, { category: TokenCat });

      return null;
    }
  }

  public decodeToken(token: string): ITokenData {
    let result;

    try {
      const tokenData = this.jwtService.decode(token) as IDecodedToken;

      if (!tokenData) {
        throw new BadRequestException(TokenErrors.Bad);
      }

      if (this.isExpired(tokenData)) {
        throw new BadRequestException(TokenErrors.Expired);
      }

      result = {
        userId: tokenData.userId,
      };
    } catch (e) {
      this.logger.error(e.message, { category: TokenCat });
      result = null;
    }

    return result;
  }

  public validateApiToken(secret: string): IValid {
    return { valid: this.config.apiSecret === secret };
  }

  private isExpired(tokenData: IDecodedToken): boolean {
    return tokenData.exp <= Math.floor(+new Date() / 1000);
  }
}
