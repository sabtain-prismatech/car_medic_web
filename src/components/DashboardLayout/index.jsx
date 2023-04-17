import React from "react";
// sideNav
import SideNav from "../SideNav";
import TopNav from "../TopNav";
// style
import "@styles/scss/sharedComponent/dashboardLayout.scss";

export default function DashboardLayout({ title, children }) {
  return (
    <React.Fragment>
      <div className="dashboard-layout-wrapper">
        <div className="sidenav-content-wrapper d-flex">
          <SideNav />
          <div className="content-wrapper pb-4">
            <TopNav title={title} />
            <div className="inner-container mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
