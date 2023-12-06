import { db } from "@/lib/db";
import { withValidation } from "@/lib/withValidation";
import { CreateSchoolSchema } from "@/types/schoolSchema";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = withValidation(
  CreateSchoolSchema,
  async ({ body, request }) => {
    const [street, postal_city, country] = body.address.trim().split(",");
    const [postal, city] = postal_city.trim().split(" ");

    try {
      const createdSchool = await db.school.create({
        data: {
          city,
          country,
          postal,
          street,
          address: body.address,
          information: body.information,
          phone: body.phone,
        },
      });

      return NextResponse.json(createdSchool, {
        status: 201,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return NextResponse.json("School already exists, unique error", {
          status: 422,
        });
      }
      return NextResponse.json("An unknown error appeared", {
        status: 500,
      });
    }
  }
);
