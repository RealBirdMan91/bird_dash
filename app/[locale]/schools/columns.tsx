"use client";
import { type School } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Partial<School>>[] = [
  {
    accessorKey: "street",
    header: "Street",
  },
  {
    accessorKey: "postal",
    header: "Postal Code",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (row) => <span>{format(row.getValue() as Date, "dd/mm/yyyy")}</span>,
  },
  {
    id: "actions",

    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              See school details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Update school
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer bg-red-400 text-white  focus:bg-red-500 focus:text-white flex items-center gap-1">
              <FaTrashAlt />
              <span className="font-semibold">Delete school</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
