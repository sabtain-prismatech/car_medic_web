import React from "react";
// Components
import DashboardLayout from "@components/DashboardLayout";
import Content from "./Content";

export default function Customer() {
  return (
    <>
      <DashboardLayout title="Customers">
        <Content />
      </DashboardLayout>
    </>
  );
}
