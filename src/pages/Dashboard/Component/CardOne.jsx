import React from "react";
// components
import Typography from "@components/SharedComponents/Typography";
// Icons
import icons from "@helper/icons";
// Images
import graphOrange from "@assets/images/svgs/graph-line-orange.svg";

export default function CardOne({ values }) {
  return (
    <>
      <div className="col-3 py-4">
        <div className={`p-4 gradiant-card card-${values.card}`}>
          <div className="icon-div d-flex justify-content-center align-items-center mb-4">
            <i>{values.icon}</i>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Typography variant="h2" fw="bold">
                {values.amount}
              </Typography>
              <Typography variant="body2" fw="bold">
                {values.title}
              </Typography>
            </div>
            <img src={values.graph} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
