import { Transport } from "@nestjs/microservices";

interface IConfigServiceOptions {
  port: number;
  host: string;
}

interface IConfigService {
  options: IConfigServiceOptions;
  transport: Transport;
}

interface IConfig {
  port: number;
  tokenService: IConfigService;
  userService: IConfigService;
  eventService: IConfigService;
}

export class ConfigService {
  private readonly envConfig: IConfig;

  constructor() {
    this.envConfig = {} as IConfig;
    this.envConfig.port = Number(process.env.API_GATEWAY_PORT);
    this.envConfig.tokenService = {
      options: {
        port: Number(process.env.TOKEN_SERVICE_PORT),
        host: process.env.TOKEN_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.userService = {
      options: {
        port: Number(process.env.USER_SERVICE_PORT),
        host: process.env.USER_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.eventService = {
      options: {
        port: Number(process.env.EVENT_SERVICE_PORT),
        host: process.env.EVENT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get<T>(key: string): T {
    return this.envConfig[key];
  }
}
