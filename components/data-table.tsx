"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { set } from "date-fns";
type Data<TData> = {
  data: TData[];
  totalPages: number;
  page: number;
  hasMore: boolean;
};

type Filter = {
  accessorKey: string;
  header: string;
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Data<TData>;
  queryKey: string[];
  filterables?: Filter[];
  queryFn: (
    pageSize: number,
    sorting: SortingState,
    columnFilters: ColumnFiltersState
  ) => Promise<Data<TData>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  queryKey,
  queryFn,
  filterables,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageSize: data.totalPages,
    pageIndex: 0,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteredBy, setFilteredBy] = useState<Filter["accessorKey"]>(
    filterables ? filterables[0].accessorKey : ""
  );

  const { data: queryData, isLoading } = useQuery({
    queryKey: [queryKey, pagination.pageIndex + 1, sorting, columnFilters],
    queryFn: async () =>
      await queryFn(pagination.pageIndex + 1, sorting, columnFilters),
    placeholderData: keepPreviousData,
    refetchInterval: 1000 * 60,
  });

  const table = useReactTable({
    data: queryData?.data ?? [],
    columns,
    manualPagination: true,
    pageCount: data.totalPages,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    onPaginationChange: setPagination,

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: (change) => {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
      setColumnFilters(change);
    },

    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
  });

  const canGoToNextPage =
    pagination.pageIndex + 1 < (queryData?.totalPages || pagination.pageSize);
  return (
    <>
      <div className="flex items-center justify-between py-4 ">
        {filterables && (
          <div className="flex gap-2">
            <Input
              placeholder="Filter by header"
              value={
                (table.getColumn(filteredBy)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(filteredBy)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select
              defaultValue={filteredBy}
              onValueChange={(val) => setFilteredBy(val)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {filterables.map((filterable, idx) => (
                    <SelectItem key={idx} value={filterable.accessorKey}>
                      {filterable.header}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div>
          <span className="mr-2 text-neutral-700">
            Page {pagination.pageIndex + 1} of{" "}
            {queryData?.totalPages || data.totalPages}
          </span>
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
            disabled={!canGoToNextPage}
            onClick={() => {
              table.nextPage();
            }}
          >
            Next
          </Button>
        </div>
      </div>
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
    </>
  );
}
