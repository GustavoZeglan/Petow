// import { SERVER_URL } from "src/architecture/constants/urls";
// import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
// import { TestingModule, Test } from "@nestjs/testing";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { DatabaseService } from "src/infra/database/database.service";
// import { AppDataSource } from "src/infra/data-source";
// import { DataSource } from "typeorm";

// beforeAll(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//     imports: [
//       TypeOrmModule.forRootAsync({
//         useFactory: async () => {
//           return AppDataSource.options;
//         },
//       }),
//     ],
//     providers: [DatabaseService],
//   }).compile();

//   const service = module.get<DatabaseService>(DatabaseService);
//   const dataSource = module.get<DataSource>(DataSource);

//   await service.cleanDatabase();
// });

// test.skip("Get to migrations should return 200", async () => {
//   const res = await fetch(`${SERVER_URL}/migrations`);
//   expect(res.status).toBe(200);

//   const responseBody: HttpResponseDTO = await res.json();

//   expect(Array.isArray(responseBody.data)).toBe(true);
// });
