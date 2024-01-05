import React from "react";
import EmployeeForm from "./EmployeeForm";
import { getAllSchools } from "@/services/schoolService";

async function CreateEmployeePage() {
  const schools = await getAllSchools();

  return <EmployeeForm schools={schools} />;
}

export default CreateEmployeePage;
