import { DataSourceOptions } from "typeorm";
import { AppConfig } from "./app.config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  readonly port: number;

  readonly host: string;

  readonly baseUri: string;

  readonly orm: DataSourceOptions;

  constructor() {
    const { port, host, orm } = AppConfig.get();

    this.port = port;
    this.host = host;
    this.orm = orm;
  }
}
