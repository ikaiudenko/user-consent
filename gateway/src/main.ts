import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VersioningType } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ValidationPipe422 } from "./pipes/validation";
import { ExceptionsLoggerFilter } from "./filters/exception";
import { AppLoggerService } from "./modules/logger/app.logger.service";
import { ApiKey } from "@src/globals/enums";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(),
  });

  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe422({ transform: true }));
  app.useGlobalFilters(new ExceptionsLoggerFilter(app.get(HttpAdapterHost).httpAdapter));

  const config = new DocumentBuilder()
    .setTitle("Consent API")
    .setVersion("1.0.0")
    .addTag("users")
    .addTag("events")
    .addBearerAuth()
    .addApiKey({ type: "apiKey", name: ApiKey, in: "header" }, ApiKey)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
