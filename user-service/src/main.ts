import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "./modules/core/config/config.service";
import { Transport } from "@nestjs/microservices";
import { ValidationPipe422 } from "./pipes/validation";
import { AppLoggerService } from "./modules/core/logger/app.logger.service";

async function bootstrap(): Promise<void> {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: new AppLoggerService(),
    transport: Transport.TCP,
    options: {
      host: config.host,
      port: config.port,
    },
  });

  app.useGlobalPipes(new ValidationPipe422());

  await app.listen();
}
bootstrap();
