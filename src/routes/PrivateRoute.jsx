import { Navigate, Outlet } from "react-router-dom";

// Must-be-login-to-access-route
export const PrivateLogin = ({ isAllowed, redirect = "/login" }) => {
  console.log(isAllowed);
  if (isAllowed) {
    return <Outlet />;
  } else {
    return <Navigate to={redirect} />;
  }
};
