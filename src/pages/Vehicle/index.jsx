import React from "react";
// Components
import SideNav from "@components/SideNav";
import Content from "./Content/Content";

export default function Vehicle() {
  return (
    <>
      <div className="p-5">
        <h1>Vehicle</h1>
        <SideNav />
        <Content/>
      </div>
    </>
  );
}
