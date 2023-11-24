"use server";

import { db } from "@/lib/db";

const PAGINATION_LIMIT = 7;

export async function getSchools(page: number = 1) {
  let pageNumber = page;

  if (pageNumber < 1 || isNaN(pageNumber)) {
    pageNumber = 1;
  }

  const data = await db.school.findMany({
    select: {
      city: true,
      country: true,
      postal: true,
      street: true,
      createdAt: true,
    },
    skip: (pageNumber - 1) * PAGINATION_LIMIT,
    take: PAGINATION_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await db.school.count();
  const totalPages = Math.ceil(total / PAGINATION_LIMIT);
  const hasMore = pageNumber < totalPages;

  return { school: data, totalPages, page: pageNumber, hasMore };
}
