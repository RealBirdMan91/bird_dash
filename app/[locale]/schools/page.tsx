import { getSchools } from "@/server/schoolActions";
import { columns } from "./columns";
import { DataTable } from "../../../components/data-table";

export default async function SchoolsPage() {
  const schools = await getSchools();
  return (
    <div>
      <DataTable
        queryFn={getSchools}
        columns={columns}
        data={schools}
        queryKey={["schools"]}
      />
    </div>
  );
}
