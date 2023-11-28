import * as z from "zod";

const addressRegex =
  /^[A-Za-zÄÖÜäöüß\s]+ \d+[A-Za-z]?,\s*\d{4,7}\s+[A-Za-zÄÖÜäöüß\s]+,\s*[A-Za-zÄÖÜäöüß\s]+$/;

export const CreateEmployeeSchema = z.object({
  address: z
    .string()
    .regex(
      addressRegex,
      "Invalid address format. Format should be like Ringstraße 9, 12621 Berlin, Deutschland"
    ),
  firstName: z.string().min(2).max(25),
  lastName: z.string().min(2).max(25),
  email: z.string().email(),
  phone: z.string().min(5).optional(),
  school: z.array(
    z.object({
      id: z.string(),
      address: z.string(),
      isRemote: z.boolean(),
    })
  ),
});

export type CreateEmployeeType = z.infer<typeof CreateEmployeeSchema>;
