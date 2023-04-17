import React from "react";
// Typography
import Typography from "../SharedComponents/Typography";

export default function TopNav({ title }) {
  return (
    <>
      <div className="topnav-wrapper px-5 d-flex align-items-center">
        <Typography variant="h3" color="txt_primary" fw="semibold">
          {title}
        </Typography>
      </div>
    </>
  );
}
