"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";
type Data<TData> = {
  school: TData[];
  totalPages: number;
  page: number;
  hasMore: boolean;
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Data<TData>;
  queryKey: string[];
  queryFn: (pageSize: number) => Promise<Data<TData>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  queryKey,
  queryFn,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageSize: -1,
    pageIndex: 0,
  });

  const { data: queryData, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async (page) => await queryFn(page?.pageParam),
    initialPageParam: 1,
    initialData: {
      pages: [data],
      pageParams: [1],
    },
    refetchInterval: 1000 * 60,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore && allPages.length - 1 === pagination.pageIndex) {
        return lastPage.page + 1;
      }
    },
  });
  console.log(queryData);

  const table = useReactTable({
    data: queryData?.pages[pagination.pageIndex].school ?? [],
    columns,
    manualPagination: true,
    pageCount: data.totalPages,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!table.getCanNextPage()}
        onClick={async () => {
          await fetchNextPage();
          table.nextPage();
        }}
      >
        Next
      </Button>
    </>
  );
}
