"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";
type Data<TData> = {
  data: TData[];
  totalPages: number;
  page: number;
  hasMore: boolean;
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Data<TData>;
  queryKey: string[];
  queryFn: (pageSize: number, sorting: SortingState) => Promise<Data<TData>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  queryKey,
  queryFn,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageSize: data.totalPages,
    pageIndex: 0,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    isPending,
    isError,
    error,
    data: queryData,
    isFetching,
    isPlaceholderData,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, pagination.pageIndex + 1, sorting],
    queryFn: async () => await queryFn(pagination.pageIndex + 1, sorting),
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60,
  });

  const table = useReactTable({
    data: queryData?.data ?? [],
    columns,

    manualPagination: true,
    pageCount: data.totalPages,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
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
                  {isLoading ? "Loading..." : "No results."}
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
        onClick={() => {
          table.nextPage();
        }}
      >
        Next
      </Button>
    </>
  );
}
