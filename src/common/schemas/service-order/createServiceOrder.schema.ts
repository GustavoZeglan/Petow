import { z } from "zod";

export const CreateServiceOrderPetSchema = z.object({
  pet_id: z.number(),
});

export const CreateServiceOrderSchema = z.object({
  service_id: z.number(),
  customer_id: z.number(),
  provider_id: z.number(),
  address_id: z.number(),
  duration_minutes: z.number(),
  pets: z.array(CreateServiceOrderPetSchema),
});

export type CreateServiceOrderDTO = z.infer<typeof CreateServiceOrderSchema>;
