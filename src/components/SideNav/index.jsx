import React from "react";
// react-router-dom
import { Link, useNavigate } from "react-router-dom";

export default function SideNav() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="d-flex mt-5">
        <Link to="/" className="me-5">
          Dashboard
        </Link>
        <Link to="/customer" className="me-5">
          Customer
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
