import React from "react";
// Components
import Main from "./Component/Main";
import DashboardLayout from "@components/DashboardLayout";

export default function Expense() {
  return (
    <>
      <DashboardLayout title="Expense">
        <Main />
      </DashboardLayout>
    </>
  );
}
