import * as z from "zod";

export const CreateEmployeeSchema = z.object({
  address: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  phone: z
    .string()
    .min(5, {
      message: "phone must be at least 5 characters.",
    })
    .optional(),
  information: z
    .string()
    .min(50, {
      message: "information must be at least 50 characters.",
    })
    .optional(),
});

export type CreateEmployeeType = z.infer<typeof CreateEmployeeSchema>;
