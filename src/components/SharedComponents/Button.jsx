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
  disabled = false,
}) {
  return (
    <>
      <button
        type={type}
        className={`button btn_${size} btn_${variant} btn_${btn} d-flex align-items-center ${align} ${classes} ${
          disabled && "text-decoration-line-through"
        }`}
        onClick={onClick}
        title={title}
        disabled={disabled}
      >
        {startIcon && <i>{startIcon}</i>} {children}
      </button>
    </>
  );
}
