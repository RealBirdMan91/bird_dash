import { db } from "@/lib/db";
import { withValidation } from "@/lib/withValidation";
import { CreateEmployeeSchema } from "@/types/employeeSchema";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const POST = withValidation(
  CreateEmployeeSchema,
  async ({ body, request }) => {
    const [street, postal_city, country] = body.address.trim().split(",");
    const [postal, city] = postal_city.trim().split(" ");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let userId: string = ""; // Deklaration außerhalb des try-Blocks

    try {
      const { data: userData, error: inviteError } =
        await supabase.auth.admin.inviteUserByEmail(body.email);

      if (inviteError) throw new Error(inviteError.message);

      // Speichern der Benutzer-ID zur späteren Verwendung
      userId = userData.user.id;

      const result = await db.$transaction(async (prisma) => {
        const createdEmployee = await prisma.employee.create({
          data: {
            employeeId: userId,
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            city,
            country,
            postal,
            street,
            phone: body.phone,
          },
        });

        await prisma.employeesOnSchools.createMany({
          data: body.schools.map((school) => ({
            employeeId: createdEmployee.id,
            schoolId: school.id,
          })),
        });

        return createdEmployee;
      });

      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      // Kompensationslogik: Löschen des Benutzers in Supabase, falls die Transaktion fehlschlägt
      if (userId) {
        await supabase.auth.admin.deleteUser(userId);
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return NextResponse.json("Employee already exists, unique error", {
          status: 422,
        });
      }
      return NextResponse.json("An unknown error appeared", {
        status: 500,
      });
    }
  }
);
