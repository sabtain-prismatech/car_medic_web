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
        <Link to="/vehicle" className="me-5">
          Vehicle
        </Link>
        <Link to="/expense" className="me-5">
          Expense
        </Link>
        <Link to="/services" className="me-5">
          Services
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
