import React from "react";
// Components
import DashboardLayout from "@components/DashboardLayout";
import Main from "./Component/Main";
export default function CustomerDetails() {
  localStorage.removeItem("OTHER_SERVICES");
  localStorage.removeItem("SOLD_PRODUCT");

  return (
    <>
      <DashboardLayout title="Customers Details">
        <Main />
      </DashboardLayout>
    </>
  );
}
