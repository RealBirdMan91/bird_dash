"use server";

import { db } from "@/lib/db";

export async function getSchools() {
  const data = await db.school.findMany({
    select: {
      city: true,
      country: true,
      postal: true,
      street: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
