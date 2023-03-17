import React from "react";
// Components
import SideNav from "@components/SideNav";
import Main from "./Component/Main";

export default function Products() {
  return (
    <>
      <div className="p-5">
        <h1>Products</h1>
        <SideNav />
        <Main />
      </div>
    </>
  );
}
