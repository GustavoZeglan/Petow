import { HttpResponseDTO } from "@common/classes/HttpResponseDTO";
import ServiceOrderDTO from "@common/classes/ServiceOrderDTO";
import { HttpStatus } from "@nestjs/common";
import { SERVER_URL } from "src/common/constants/urls";

test("GET should return 200", async () => {
  const res = await fetch(`${SERVER_URL}/service-order/user/1`);
  expect(res.status).toBe(HttpStatus.OK);

  const responseBody: HttpResponseDTO = await res.json();
  const data = responseBody.data;

  data.forEach((serviceOrder: ServiceOrderDTO) => {
    expect(serviceOrder).toHaveProperty("customer");
    expect(serviceOrder).toHaveProperty("provider");
    expect(serviceOrder).toHaveProperty("address");
    expect(serviceOrder).toHaveProperty("service");
  });
});
