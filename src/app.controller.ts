import { Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { AppService } from "@app/app.service";
import { DatabaseService } from "@app/infra/database/database.service";
import { StatusDTO } from "@app/architecture/dtos/StatusDTO";
import { HttpResponseDTO } from "@app/architecture/dtos/HttpResponseDTO";
import { Public } from "@architecture/decorators/public";

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

    const status = StatusDTO.toDto(
      updateAt,
      databaseVersion,
      maxConnections,
      openedConnections,
    );

    return new HttpResponseDTO(
      HttpStatus.OK,
      "Status retrieved with success",
      status,
    );
  }

  @Get("/migrations")
  async getMigrations() {
    const hasPendingMigrations =
      await this.databaseService.getHasPendingMigrations();

    return new HttpResponseDTO(
      HttpStatus.OK,
      `Has pending migrations?`,
      hasPendingMigrations,
    );
  }

  @Public()
  @Post("/migrations")
  async runMigrations() {
    const migrations = await this.databaseService.runMigrations();

    return new HttpResponseDTO(
      migrations.length > 0 ? HttpStatus.CREATED : HttpStatus.OK,
      undefined,
      migrations,
    );
  }
}
