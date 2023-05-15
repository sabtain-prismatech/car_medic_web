import React from "react";
// Components
import DashboardLayout from "@components/DashboardLayout";
import Main from "./Component/Main";

export default function Order() {
  return (
    <>
      <DashboardLayout title="Customer Order">
        <Main />
      </DashboardLayout>
    </>
  );
}
