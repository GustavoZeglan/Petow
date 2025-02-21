import { HttpStatus } from "@nestjs/common";
import { SERVER_URL } from "src/architecture/constants/urls";

test.skip("PATCH should be return 200", async () => {
  const res = await fetch(`${SERVER_URL}/service-order/5`, {
    method: "PATCH",
  });
  expect(res.status).toBe(HttpStatus.OK);
});
