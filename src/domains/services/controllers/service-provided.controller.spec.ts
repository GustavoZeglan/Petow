import { Test, TestingModule } from "@nestjs/testing";
import { ServiceProvidedController } from "@app/domains/services/controllers/serviceProvided.controller";

describe("ServiceProvidedController", () => {
  let controller: ServiceProvidedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceProvidedController],
    }).compile();

    controller = module.get<ServiceProvidedController>(
      ServiceProvidedController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
