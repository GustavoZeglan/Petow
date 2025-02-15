import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import ServiceDTO from "@app/domains/services/dtos/ServiceDTO";
import { SERVER_URL } from "src/architecture/constants/urls";

test("Get to service should be return 200", async () => {
  const res = await fetch(`${SERVER_URL}/service`);
  expect(res.status).toBe(200);

  const responseBody: HttpResponseDTO = await res.json();
  expect(Array.isArray(responseBody.data)).toBe(true);

  const data: ServiceDTO[] = responseBody.data;

  data.forEach((service) => {
    expect(service).toHaveProperty("id");
    expect(typeof service.id).toBe("number");

    expect(service).toHaveProperty("type");
    expect(typeof service.type).toBe("string");

    expect(service).toHaveProperty("hasPath");
    expect(typeof service.hasPath).toBe("boolean");

    expect(service).toHaveProperty("isUnitary");
    expect(typeof service.isUnitary).toBe("boolean");
  });
});
