"use server";

import { db } from "@/lib/db";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

const PAGINATION_LIMIT = 7;

export async function getPaginatedEmployees(
  page: number = 1,
  sorting: SortingState = [],
  columnFilters: ColumnFiltersState = []
) {
  let pageNumber = page;
  const defaultSort = { createdAt: "desc" };

  let sortingOrder: { [key: string]: string } =
    !sorting || sorting.length === 0
      ? defaultSort
      : sorting.reduce((acc, sort) => {
          acc[sort.id] = sort.desc ? "desc" : "asc";
          return acc;
        }, {} as { [key: string]: string });

  let filters: { [key: string]: { contains: string; mode: "insensitive" } } = (
    columnFilters ?? []
  ).reduce<{ [key: string]: { contains: string; mode: "insensitive" } }>(
    (acc, filter) => {
      acc[filter.id] = {
        contains: filter.value as string,
        mode: "insensitive",
      };
      return acc;
    },
    {}
  );

  if (pageNumber < 1 || isNaN(pageNumber)) {
    pageNumber = 1;
  }

  const data = await db.employee.findMany({
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      status: true,
    },
    where: filters,
    skip: (pageNumber - 1) * PAGINATION_LIMIT,
    take: PAGINATION_LIMIT,
    orderBy: sortingOrder,
  });

  const totalFiltered = await db.employee.count({ where: filters });
  const totalPages = Math.ceil(totalFiltered / PAGINATION_LIMIT);
  const hasMore = pageNumber < totalPages;

  return { data, totalPages, page: pageNumber, hasMore };
}
