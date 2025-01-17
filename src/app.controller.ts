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
    const connections = Number(
      await this.databaseService.getActiveConnections(),
    );
    const pools = await this.databaseService.getPoolConnections();
    const updateAt = new Date().toISOString();
    const status = StatusDTO.toDto(updateAt, connections, pools);

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Status retrieved with success",
      status,
    );
  }
}
