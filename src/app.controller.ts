import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { DatabaseService } from "./database/database.service";
import { StatusDTO } from "./common/classes/StatusDTO";
import { HttpResponseDTO } from "./common/classes/HttpResponseDTO";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get("/status")
  async getStatus() {
    const databaseVersion = await this.databaseService.getDatabaseVersion(); 
    const maxConnections = Number(
      await this.databaseService.getMaxConnections(),
    );
    const openedConnections = await this.databaseService.getOpenedConnections();
    const updateAt = new Date().toISOString();

    const status = StatusDTO.toDto(updateAt, databaseVersion, maxConnections, openedConnections);

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Status retrieved with success",
      status,
    );
  }
}
