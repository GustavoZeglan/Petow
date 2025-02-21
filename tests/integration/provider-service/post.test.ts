import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
import { SERVER_URL } from "src/architecture/constants/urls";

test(`POST should return 201`, async () => {
  const body = {
    price: 100,
    service_id: 1,
  };

  const request = new Request(`${SERVER_URL}/provider-service/1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const response = await fetch(request);

  expect(response.status).toBe(201);

  const responseBody = await response.json();
  const data: HttpResponseDTO = responseBody.data;

  expect(data).toHaveProperty("id");
  expect(data).toHaveProperty("price");
  expect(data).toHaveProperty("service");
  expect(data).toHaveProperty("provider");
});
