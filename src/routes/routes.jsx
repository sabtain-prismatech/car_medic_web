import React, { Suspense, lazy, useEffect } from "react";
// ----3rd-party---- //
import { Routes, Route } from "react-router-dom";
// ----Component-for-scroll-to-top---- //
import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
// ----Loader---- //
import { PulseLoader } from "react-spinners";
// Protected-routes
import { PrivateLogin } from "./PrivateRoute";
// Local-Storages
import { tokenStorage } from "@localStorage";

// ----pages---- //
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Dashboard = lazy(() => import("@pages/Dashboard"));
const Customer = lazy(() => import("@pages/Customer"));
const Vehicle = lazy(() => import("@pages/Vehicle"));
const Expense = lazy(() => import("@pages/Expense"));
const Products = lazy(() => import("@pages/Products"));

//config
import config from "@config/config.json";

const url = config.routeUrl;

const spinnerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function routes() {
  console.log("tokenStorage", tokenStorage());

  return (
    <>
      <Suspense
        fallback={
          <PulseLoader color={"#030870"} size={17} css={spinnerStyle} />
        }
      >
        <Routes>
          <Route path={url + "login"} element={<Login />} />
          <Route path={url + "register"} element={<Register />} />

          <Route element={<PrivateLogin isAllowed={tokenStorage()} />}>
            <Route path={url} element={<Dashboard />} />
            <Route path={url + "customer"} element={<Customer />} />
            <Route path={url + "vehicle"} element={<Vehicle />} />
            <Route path={url + "expense"} element={<Expense />} />
            <Route path={url + "products"} element={<Products />} />
          </Route>

          <Route path={url + "*"} element={<div>Page not Found</div>} />
        </Routes>
        <ScrollToTop />
      </Suspense>
    </>
  );
}
