import * as z from "zod";

const addressRegex =
  /^[A-Za-zÄÖÜäöüß\s]+ \d+[A-Za-z]?,\s*\d{4,7}\s+[A-Za-zÄÖÜäöüß\s]+,\s*[A-Za-zÄÖÜäöüß\s]+$/;

export const CreateSchoolSchema = z.object({
  address: z
    .string()
    .regex(
      addressRegex,
      "Invalid address format. Format should be like Ringstraße 9, 12621 Berlin, Deutschland"
    ),
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

export type CreateSchoolType = z.infer<typeof CreateSchoolSchema>;
