import { db } from "@/lib/db";
import { withValidation } from "@/lib/withValidation";
import { CreateEmployeeSchema } from "@/types/employeeSchema";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = withValidation(
  CreateEmployeeSchema,
  async ({ body, request }) => {
    const [street, postal_city, country] = body.address.trim().split(",");
    const [postal, city] = postal_city.trim().split(" ");

    try {
      const createdEmployee = await db.employee.create({
        data: {
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

      await db.employeesOnSchools.createMany({
        data: body.schools.map((school) => ({
          employeeId: createdEmployee.id,
          schoolId: school.id,
        })),
      });

      return NextResponse.json(createdEmployee, {
        status: 201,
      });
    } catch (error) {
      console.log(error);
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
