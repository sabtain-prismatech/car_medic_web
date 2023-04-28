import React from "react";
// components
import Typography from "@components/SharedComponents/Typography";

export default function CardTwo({ values }) {
  return (
    <>
      <div className="col-3 mb-4">
        <div className="card-two-wrapper p-4 h-100">
          <div className="d-flex">
            <div className="icon-div d-flex justify-content-center align-items-center mb-4 me-3">
              <i>{values.icon}</i>
            </div>
            <div>
              <Typography variant="body2" fw="bold">
                {values.title}
              </Typography>
              <Typography variant="h2" fw="bold">
                {values.amount}
              </Typography>
            </div>
          </div>
          <div className="text-center mt-5">
            <img src={values.img} alt="" className="img-fluid  mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
