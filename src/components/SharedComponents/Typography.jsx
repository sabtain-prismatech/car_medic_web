import React from "react";
// style
import "@styles/scss/sharedComponent/typography.scss";

export default function Typography({ variant, fw = "normal", children }) {
  return (
    <>
      <h1 className={`${variant} fw-${fw}`}>{children}</h1>
    </>
  );
}
