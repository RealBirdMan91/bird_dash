import { getPaginatedSchools } from "@/services/schoolService";
import { columns } from "./columns";
import { DataTable } from "../../../../../components/data-table";

export default async function SchoolsPage() {
  const schools = await getPaginatedSchools();
  const tableFilter = [
    {
      accessorKey: "street",
      header: "Street",
    },
    {
      accessorKey: "postal",
      header: "Postal",
    },
    {
      accessorKey: "city",
      header: "City",
    },
  ];
  return (
    <div>
      <DataTable
        filterables={tableFilter}
        queryFn={getPaginatedSchools}
        columns={columns}
        data={schools}
        queryKey={["schools"]}
      />
    </div>
  );
}
