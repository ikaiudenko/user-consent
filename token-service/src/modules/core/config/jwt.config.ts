import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "./config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.secret,
    };
  }
}
