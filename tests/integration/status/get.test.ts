import { SERVER_URL } from "src/common/constants/urls";
import { HttpResponseDTO } from "src/common/classes/HttpResponseDTO";
import { StatusDTO } from "src/common/classes/StatusDTO";

test("Get to status should return 200", async () => {
  const res = await fetch(`${SERVER_URL}/status`);
  expect(res.status).toBe(200);

  const responseBody: HttpResponseDTO = await res.json();
  const status: StatusDTO = responseBody.data;

  const parsedUpdatedAt = new Date(status.updatedAt).toISOString();
  expect(status.updatedAt).toEqual(parsedUpdatedAt);

  expect(status.database.version).toEqual("16.0");
  expect(status.database.maxConnections).toBeGreaterThanOrEqual(1);
  expect(status.database.openedConnections).toEqual(1);
});
