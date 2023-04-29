import React from "react";
// style
import "@styles/scss/sharedComponent/button.scss";

export default function Button({
  children,
  type,
  size = "lg",
  variant = "fill",
  btn = "primary",
  startIcon,
  align = "me-auto",
  onClick,
  classes,
  title,
}) {
  return (
    <>
      <button
        type={type}
        className={`button btn_${size} btn_${variant} btn_${btn} d-flex align-items-center ${align} ${classes}`}
        onClick={onClick}
        title={title}
      >
        {startIcon && <i>{startIcon}</i>} {children}
      </button>
    </>
  );
}
