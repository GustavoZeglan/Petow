import { Module } from "@nestjs/common";
import { MINIO_TOKEN } from "@architecture/decorators/minio.decorator";
import * as Minio from "minio";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
@Module({
  exports: [MINIO_TOKEN],
  providers: [
    {
      provide: MINIO_TOKEN,
      useFactory: async (): Promise<Minio.Client> => {
        const endpoint = process.env.MINIO_ENDPOINT;
        const port = process.env.MINIO_PORT
          ? parseInt(process.env.MINIO_PORT)
          : 443;
        const useSSL = process.env.MINIO_USE_SSL === "true";
        const accessKey = process.env.MINIO_ACCESS_KEY;
        const secretKey = process.env.MINIO_SECRET_KEY;

        if (!endpoint || !accessKey || !secretKey) {
          console.error(
            "ERROR: Variáveis de ambiente MinIO obrigatórias ausentes!",
          );
          throw new Error("Missing required MinIO environment variables");
        }

        return new Minio.Client({
          endPoint: endpoint,
          port: port,
          useSSL: useSSL,
          accessKey: accessKey,
          secretKey: secretKey,
        });
      },
    },
    UploadService,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
