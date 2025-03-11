import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Swagger } from "@architecture/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "warn", "debug", "error"],
  });

  Swagger.setup(app);
  Swagger.setAlternativeRoutes(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
