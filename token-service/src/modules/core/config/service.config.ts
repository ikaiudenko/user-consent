export interface IServiceConfig {
  readonly port: number;
  readonly host: string;
  readonly secret: string;
  readonly apiSecret: string;
}

export class ServiceConfig implements IServiceConfig {
  readonly port: number;

  readonly host: string;

  readonly secret: string;

  readonly apiSecret: string;

  constructor() {
    this.port = Number(process.env.TOKEN_SERVICE_PORT);
    this.host = process.env.TOKEN_SERVICE_HOST;
    this.secret = process.env.TOKEN_SERVICE_SECRET;
    this.apiSecret = process.env.TOKEN_SERVICE_API_SECRET;
  }
}
