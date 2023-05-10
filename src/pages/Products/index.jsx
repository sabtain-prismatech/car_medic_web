import React from "react";
// Components
import Main from "./Component/Main";
import DashboardLayout from "@components/DashboardLayout";

export default function Products() {
  return (
    <>
      <DashboardLayout title="Products">
        <Main />
      </DashboardLayout>
    </>
  );
}
