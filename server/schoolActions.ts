"use server";

import { db } from "@/lib/db";
import { SortingState } from "@tanstack/react-table";

const PAGINATION_LIMIT = 7;

export async function getSchools(page: number = 1, sorting: SortingState) {
  let pageNumber = page;
  const defaultSort = { createdAt: "desc" };

  let sortingOrder: { [key: string]: string } =
    !sorting || sorting.length === 0
      ? defaultSort
      : sorting.reduce((acc, sort) => {
          acc[sort.id] = sort.desc ? "desc" : "asc";
          return acc;
        }, {} as { [key: string]: string });

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
    orderBy: sortingOrder,
  });

  const total = await db.school.count();
  const totalPages = Math.ceil(total / PAGINATION_LIMIT);
  const hasMore = pageNumber < totalPages;

  return { data, totalPages, page: pageNumber, hasMore };
}
