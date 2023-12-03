import React from "react";
import EmployeeForm from "./EmployeeForm";
import { getAllSchools } from "@/server/schoolActions";

async function CreateEmployeePage() {
  const schools = await getAllSchools();

  return <EmployeeForm schools={schools} />;
}

export default CreateEmployeePage;
