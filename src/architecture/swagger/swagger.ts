import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class Swagger {
  static documentFactory(app) {
    const config = new DocumentBuilder()
      .setTitle("Petow")
      .setDescription("Sistema de gerenciamento de serviços para pet")
      .setVersion("1.0.0")
      .addBearerAuth()
      .build();

    return SwaggerModule.createDocument(app, config);
  }

  static setup(app) {
    SwaggerModule.setup("api", app, this.documentFactory(app));
  }

  static setAlternativeRoutes(app) {
    SwaggerModule.setup("swagger", app, Swagger.documentFactory(app), {
      jsonDocumentUrl: "swagger/json",
    });
    SwaggerModule.setup("swagger", app, Swagger.documentFactory(app), {
      yamlDocumentUrl: "swagger/yaml",
    });
  }
}
