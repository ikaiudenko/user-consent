import { Transport } from "@nestjs/microservices";
import { DataSourceOptions } from "typeorm";

export class ConfigService {
  readonly port: number;

  readonly host: string;

  readonly baseUri: string;

  readonly gatewayPort: string;

  readonly eventService: Record<string, unknown>;

  readonly cacheTtl: number;

  readonly orm: DataSourceOptions;

  constructor() {
    this.baseUri = process.env.BASE_URI;
    this.port = Number(process.env.USER_SERVICE_PORT);
    this.host = process.env.USER_SERVICE_HOST;
    this.gatewayPort = process.env.API_GATEWAY_PORT;
    this.cacheTtl = Number(process.env.USER_SERVICE_CACHE_TTL);
    this.eventService = this.eventServiceConfig;
    this.orm = this.ormConfig;
  }

  private get eventServiceConfig(): Record<string, unknown> {
    return {
      options: {
        port: process.env.EVENT_SERVICE_PORT,
        host: process.env.EVENT_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  private get ormConfig(): DataSourceOptions {
    return {
      type: "mysql",
      host: process.env.USER_SERVICE_APP_MYSQL_HOST,
      port: Number(process.env.USER_SERVICE_MYSQL_PORT),
      username: process.env.USER_SERVICE_MYSQL_USER,
      password: process.env.USER_SERVICE_MYSQL_PASSWORD,
      database: process.env.USER_SERVICE_MYSQL_DATABASE,
      entities: [__dirname + "/../../../*.entity.{js,ts}"],
      migrations: [__dirname + "/../../../migration/*{.ts,.js}"],
      synchronize: false,
    };
  }
}
