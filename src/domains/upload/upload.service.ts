import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import * as Minio from "minio";
import { InjectMinio } from "@architecture/decorators/minio.decorator";

@Injectable()
@Injectable()
export class UploadService {
  protected _bucketName = "petowuploads";

  constructor(@InjectMinio() private readonly minioService: Minio.Client) {}

  async bucketsList() {
    return await this.minioService.listBuckets();
  }

  async getFile(filename: string) {
    const url = await this.minioService.presignedUrl(
      "GET",
      this._bucketName,
      filename,
    );
    return url;
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const filename = `${randomUUID().toString()}-${file.originalname}`;
      await this.minioService.putObject(
        this._bucketName,
        filename,
        file.buffer,
        file.size,
      );
      return filename;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException("Failed to upload file");
    }
  }
}
