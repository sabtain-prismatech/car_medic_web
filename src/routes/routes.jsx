import React, { Suspense, lazy } from "react";
// ----3rd-party---- //
import { Routes, Route } from "react-router-dom";
// ----Component-for-scroll-to-top---- //
import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
// ----Loader---- //
import { PulseLoader } from "react-spinners";

// ----pages---- //
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));

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
          <Route path={url + "*"} element={<div>Page not Found</div>} />
        </Routes>
        <ScrollToTop />
      </Suspense>
    </>
  );
}
