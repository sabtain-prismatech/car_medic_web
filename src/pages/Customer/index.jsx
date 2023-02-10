import React from "react";
// Components
import SideNav from "@components/SideNav";
import Content from "./Content";

export default function Customer() {
  return (
    <>
      <div className="p-5">
        <h1>Customer</h1>
        <SideNav />
        <Content />
      </div>
    </>
  );
}
