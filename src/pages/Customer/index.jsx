import React from "react";
// Components
import DashboardLayout from "@components/DashboardLayout";
import Content from "./Content";

export default function Customer() {
  localStorage.removeItem("OTHER_SERVICES");
  localStorage.removeItem("SOLD_PRODUCT");

  return (
    <>
      <DashboardLayout title="Customers">
        <Content />
      </DashboardLayout>
    </>
  );
}
