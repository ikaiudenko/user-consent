import { NestFactory } from "@nestjs/core";
import { TokenModule } from "./token.module";
import { Transport } from "@nestjs/microservices";
import { ServiceConfig } from "./modules/core/config/service.config";
import { AppLoggerService } from "./modules/core/logger/app.logger.service";

async function bootstrap(): Promise<void> {
  const config = new ServiceConfig();
  const app = await NestFactory.createMicroservice(TokenModule, {
    logger: new AppLoggerService(),
    transport: Transport.TCP,
    options: {
      host: config.host,
      port: config.port,
    },
  });

  await app.listen();
}
bootstrap();
