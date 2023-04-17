import React from "react";
// components
import Typography from "@components/SharedComponents/Typography";
// form
import Form from "./Form";
// style
import "@styles/scss/login.scss";

export default function Login() {
  return (
    <>
      <div className="login-wrapper container-fluid d-flex justify-content-center align-items-center">
        <div className="login-card p-5">
          <Typography
            color="txt_primary"
            variant="h2"
            fw="bold"
            align="text-center"
          >
            Login
          </Typography>
          <div className="mt-5">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
