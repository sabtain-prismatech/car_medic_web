import React from "react";
// Components
import SideNav from "@components/SideNav";
import Main from "./Component/Main";

export default function Order() {
  return (
    <>
      <div className="p-5">
        <h1>Order</h1>
        <SideNav />
        <Main />
      </div>
    </>
  );
}
