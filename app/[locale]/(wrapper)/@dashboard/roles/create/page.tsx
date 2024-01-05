import React from "react";

import { getAllSchools } from "@/services/schoolService";
import RolesForm from "./RolesForm";

async function CreateRolePage() {
  const schools = await getAllSchools();
  return <RolesForm schools={schools} />;
}

export default CreateRolePage;
