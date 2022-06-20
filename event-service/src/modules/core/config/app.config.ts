import { DataSourceOptions } from "typeorm";

interface IAppConfig {
  port: number;
  host: string;
  orm: DataSourceOptions;
}

export class AppConfig {
  static get(): IAppConfig {
    return {
      port: Number(process.env.EVENT_SERVICE_PORT),
      host: process.env.EVENT_SERVICE_HOST,
      orm: AppConfig.ormConfig,
    };
  }

  static get ormConfig(): DataSourceOptions {
    return {
      type: "mysql",
      host: process.env.EVENT_SERVICE_APP_MYSQL_HOST,
      port: Number(process.env.EVENT_SERVICE_MYSQL_PORT),
      username: process.env.EVENT_SERVICE_MYSQL_USER,
      password: process.env.EVENT_SERVICE_MYSQL_PASSWORD,
      database: process.env.EVENT_SERVICE_MYSQL_DATABASE,
      entities: [__dirname + "/../../../*.entity.{js,ts}"],
      migrations: [__dirname + "/../../../migration/*{.ts,.js}"],
      synchronize: false,
    };
  }
}
