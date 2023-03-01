import React from "react";
// Components
import SideNav from "@components/SideNav";
import Main from "./Component/Main";

export default function Expense() {
  return (
    <>
      <div className="p-5">
        <h1>Expense</h1>
        <SideNav />
        <Main />
      </div>
    </>
  );
}
