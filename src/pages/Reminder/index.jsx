import React from "react";
// Components
import Main from "./Component/Main";
import DashboardLayout from "@components/DashboardLayout";

export default function Reminder() {
  return (
    <>
      <DashboardLayout title="Reminders">
        <Main />
      </DashboardLayout>
    </>
  );
}
