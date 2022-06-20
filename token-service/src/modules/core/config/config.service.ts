import { Injectable } from "@nestjs/common";
import { IServiceConfig, ServiceConfig } from "./service.config";

@Injectable()
export class ConfigService implements IServiceConfig {
  readonly port: number;

  readonly host: string;

  readonly secret: string;

  readonly apiSecret: string;

  constructor() {
    const config = new ServiceConfig();

    this.port = config.port;
    this.host = config.host;
    this.secret = config.secret;
    this.apiSecret = config.apiSecret;
  }
}
