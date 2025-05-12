import { Module } from '@nestjs/common';
import { MINIO_TOKEN } from '@architecture/decorators/minio.decorator';
import * as Minio from 'minio';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  exports: [MINIO_TOKEN],
  providers: [
    {
      provide: MINIO_TOKEN,
      useFactory: async (): Promise<Minio.Client> => {
        const client = new Minio.Client({
          endPoint: process.env.MINIO_ENDPOINT!,
          port: parseInt(process.env.MINIO_PORT || '443'),
          useSSL: process.env.MINIO_USE_SSL === 'true',
          accessKey: process.env.MINIO_ACCESS_KEY!,
          secretKey: process.env.MINIO_SECRET_KEY!,
        });

        return client;
      },
    },
    UploadService,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
