import { SERVER_URL } from "src/common/constants/urls";
import { HttpResponseDTO } from "src/common/classes/HttpResponseDTO";
import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseService } from "src/database/database.service";
import { DataSource } from "typeorm/data-source/DataSource";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "src/infra/data-source";

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: async () => {
          return AppDataSource.options;
        }
      }),
    ],
    providers: [DatabaseService],
  }).compile();

  const service = module.get<DatabaseService>(DatabaseService);
  const dataSource = module.get<DataSource>(DataSource);

  await service.cleanDatabase();
});

test("Post to migrations", async () => {
  const response1 = await fetch(`${SERVER_URL}/migrations`, {
    method: "POST",
  });
  
  const response1Body: HttpResponseDTO = await response1.json();
  expect(response1Body.status).toBe(201);

  expect(Array.isArray(response1Body.data)).toBe(true);
  expect(response1Body.data.length).toBeGreaterThan(0);
  expect(typeof response1Body.data[0] === "object").toBe(true);

  const response2 = await fetch(`${SERVER_URL}/migrations`, {
    method: "POST",
  });
  
  const response2Body: HttpResponseDTO = await response2.json();
  expect(response2Body.status).toBe(200);

  expect(Array.isArray(response2Body.data)).toBe(true);
  expect(response2Body.data.length).toBe(0);
});
