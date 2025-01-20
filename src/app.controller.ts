import { Controller, Get, HttpStatus, Post } from "@nestjs/common";
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

  @Get("/migrations")
  async getMigrations() {
    const migrations = await this.databaseService.getPendingMigrations();
    
    return new HttpResponseDTO(
      HttpStatus.OK,
      "Migrations retrieved with success",
      migrations,
    );
  }

  @Post("/migrations")
  async runMigrations() {
    const migrations = await this.databaseService.executeMigrations();
    
    return new HttpResponseDTO(
      migrations.length > 0 ? HttpStatus.CREATED : HttpStatus.OK,
      undefined, 
      migrations
    );
  }

}
