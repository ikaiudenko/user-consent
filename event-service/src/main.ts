import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { ValidationPipe422 } from "./pipes/validation";
import { AppConfig } from "./modules/core/config/app.config";
import { AppLoggerService } from "./modules/core/logger/app.logger.service";
import { AppModule } from "@src/app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice(AppModule, {
    logger: new AppLoggerService(),
    transport: Transport.TCP,
    options: {
      host: AppConfig.get().host,
      port: AppConfig.get().port,
    },
  });

  app.useGlobalPipes(new ValidationPipe422());

  await app.listen();
}
bootstrap();
