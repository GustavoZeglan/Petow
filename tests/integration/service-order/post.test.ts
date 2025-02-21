// import ServiceOrderDTO from "@app/domains/services/dtos/ServiceOrderDTO";
// import { HttpResponseDTO } from "@architecture/dtos/HttpResponseDTO";
// import { SERVER_URL } from "src/architecture/constants/urls";

// test("POST should return 201", async () => {
//   const body = {
//     service_id: 1,
//     customer_id: 1,
//     provider_id: 2,
//     address_id: 1,
//     duration_minutes: 50,
//     pets: [1, 2],
//   };
//   1;

//   const req = new Request(`${SERVER_URL}/service-order`, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const res = await fetch(req);
//   expect(res.status).toBe(201);

//   const responseBody: HttpResponseDTO = await res.json();

//   const data: ServiceOrderDTO = responseBody.data;

//   expect(data).toHaveProperty("customer");
//   expect(data).toHaveProperty("provider");
//   expect(data).toHaveProperty("address");
//   expect(data).toHaveProperty("service");

//   data.pets?.forEach((pet) => {
//     expect(pet).toHaveProperty("id");
//     expect(typeof pet.id).toBe("number");

//     expect(pet).toHaveProperty("name");
//     expect(typeof pet.name).toBe("string");

//     expect(pet).toHaveProperty("comments");
//     expect(typeof pet.comments).toBe("string");

//     expect(pet).toHaveProperty("breed");
//   });
// });
