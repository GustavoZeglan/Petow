import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { UploadService } from "./upload.service";
import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";

@Controller("uploads")
export class UploadController {
  constructor(readonly uploadService: UploadService) { }

  @Get("buckets")
  async bucketsList() {
    const buckets = this.uploadService.bucketsList();
    return new HttpResponseDTO(
      HttpStatus.CREATED,
      `Buckets retrieved successfully`,
      buckets,
    );
  }

  @Get("file-url/:name")
  async getFile(@Param("name") name: string) {
    const fileUrl = await this.uploadService.getFile(name);
    return new HttpResponseDTO(
      HttpStatus.CREATED,
      `File retrieved successfully`,
      fileUrl,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const obj = await this.uploadService.uploadFile(file);
    return new HttpResponseDTO(
      HttpStatus.CREATED,
      `File Uploaded successfully`,
      obj,
    );
  }
}
