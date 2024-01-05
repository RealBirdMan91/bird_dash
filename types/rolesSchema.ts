import * as z from "zod";

export const CreateRoleSchema = z.object({
  name: z.string().min(2).max(25),
  schoolSettings: z.boolean(),
  canCreateEmployee: z.union([
    z.undefined(),
    z
      .array(
        z.object({
          id: z.string().min(1),
          address: z.string().min(1),
        })
      )
      .refine((schools) => schools.length > 0, {
        message: "At least one school must be selected",
      }),
  ]),
});

export type CreateRoleType = z.infer<typeof CreateRoleSchema>;
