import React from "react";
// Components
import Content from "./Content/Content";
import DashboardLayout from "@components/DashboardLayout";

export default function Vehicle() {
  return (
    <>
      <DashboardLayout title="Vehicles">
        <Content />
      </DashboardLayout>
    </>
  );
}
