import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { SERVER_URL } from "src/architecture/constants/urls";
import { HttpStatus } from "@nestjs/common";

test("GET should be return 200", async () => {
  const res = await fetch(`${SERVER_URL}/provider-service/1`);
  expect(res.status).toBe(HttpStatus.OK);

  const responseBody: HttpResponseDTO = await res.json();

  expect(Array.isArray(responseBody.data)).toBe(true);

  for (const providerService of responseBody.data) {
    expect(providerService).toHaveProperty("id");
    expect(providerService).toHaveProperty("price");
    expect(providerService).toHaveProperty("service");
    expect(providerService).toHaveProperty("provider");
  }
});
