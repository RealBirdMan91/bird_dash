import { getSchools } from "@/server/schoolActions";
import { columns } from "./columns";
import { DataTable } from "../../../components/data-table";

export default async function SchoolsPage() {
  const schools = await getSchools();
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
        queryFn={getSchools}
        columns={columns}
        data={schools}
        queryKey={["schools"]}
      />
    </div>
  );
}
