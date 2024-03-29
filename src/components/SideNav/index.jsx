import React, { useState } from "react";
// Components
import { sideNavData } from "../SideNavData";
import Typography from "@components/SharedComponents/Typography";
// React-Router-Dom
import { NavLink, Link, useNavigate } from "react-router-dom";
// React-Icons
import Icons from "@helper/icons";

export default function SideNav() {
  const navigate = useNavigate();
  // logout-function
  const logoutFun = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="sidenav-wrapper">
        <div className="d-flex align-items-center justify-content-between logo-nav">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h3" color="primary" fw="bold" style="pt-1">
              Car<span className="txt_primary">Care</span>
            </Typography>
          </Link>
          <i className="faa-icon">
            <Icons.FaIcons.FaBars />
          </i>
        </div>
        <ul>
          {sideNavData?.map((val, key) => {
            return (
              <li key={key} className="mb-3 ">
                <NavLink
                  to={val?.route}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "sidenav-link"
                      : isActive
                      ? "sidenav-link active"
                      : "sidenav-link"
                  }
                >
                  <div className="d-flex align-items-center sidenav-div ">
                    <i className="me-4">{val?.icon}</i>
                    <span>{val?.title}</span>
                  </div>
                </NavLink>
              </li>
            );
          })}
          <li className="mb-3" onClick={logoutFun}>
            <span className={"sidenav-link cursor-pointer"}>
              <div className="d-flex align-items-center sidenav-div ">
                <i className="me-4">
                  <Icons.RiIcons.RiLogoutCircleLine />
                </i>
                <span>Logout</span>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
