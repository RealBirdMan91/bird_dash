import { DataTable } from "@/components/data-table";
import { getPaginatedEmployees } from "@/server/employeeActions";
import React from "react";
import { columns } from "./columns";

async function EmployeesPage() {
  const employees = await getPaginatedEmployees();
  const tableFilter = [
    {
      accessorKey: "lastName",
      header: "Last name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
  ];
  return (
    <div>
      <DataTable
        filterables={tableFilter}
        queryFn={getPaginatedEmployees}
        columns={columns}
        data={employees}
        queryKey={["employees"]}
      />
    </div>
  );
}

export default EmployeesPage;
