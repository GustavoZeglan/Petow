import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { UploadService } from "./upload.service";

@Controller("uploads")
export class UploadController {
  constructor(readonly uploadService: UploadService) {}

  @Get("buckets")
  bucketsList() {
    return this.uploadService.bucketsList();
  }

  @Get("file-url/:name")
  getFile(@Param("name") name: string) {
    return this.uploadService.getFile(name);
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }
}
