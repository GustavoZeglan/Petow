import { HttpStatus } from "@nestjs/common";
import { SERVER_URL } from "src/common/constants/urls";

test("PATCH should be return 200", async () => {
  const res = await fetch(`${SERVER_URL}/service-order/5`, {
    method: "PATCH",
  });
  expect(res.status).toBe(HttpStatus.OK);
});
