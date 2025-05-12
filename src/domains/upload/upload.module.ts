import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MINIO_TOKEN } from "@architecture/decorators/minio.decorator";
import * as Minio from "minio";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [MINIO_TOKEN],
  providers: [
    {
      inject: [ConfigService],
      provide: MINIO_TOKEN,
      useFactory: async (
        configService: ConfigService,
      ): Promise<Minio.Client> => {
        const client = new Minio.Client({
          endPoint: configService.get<string>("MINIO_ENDPOINT")!,
          port: parseInt(configService.get<string>("MINIO_PORT", "443")),
          useSSL: configService.get<string>("MINIO_USE_SSL") === "true",
          accessKey: configService.get<string>("MINIO_ACCESS_KEY"),
          secretKey: configService.get<string>("MINIO_SECRET_KEY"),
        });
        return client;
      },
    },
    UploadService,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
