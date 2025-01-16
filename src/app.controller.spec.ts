import { SERVER_URL } from "./common/constants/urls";
import { HttpResponseDTO } from "./common/classes/HttpResponseDTO";
import { StatusDTO } from "./common/classes/StatusDTO";

test("Get to status should return 200", async () => {
  const res = await fetch(`${SERVER_URL}/status`);
  expect(res.status).toBe(200);

  const responseBody: HttpResponseDTO = await res.json()
  const status: StatusDTO = responseBody.data; 
  expect(status.updatedAt).toBeDefined();

  const parsedUpdatedAt = new Date(status.updatedAt).toISOString();
  expect(status.updatedAt).toEqual(parsedUpdatedAt);

  expect(status.database.connections).toBeGreaterThanOrEqual(1);
  expect(status.database.pools).toBeGreaterThanOrEqual(1);
});