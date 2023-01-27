import React, { useState, useEffect } from "react";
// Routes
import Routes from "@routes/routes";
// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//redux
import { useSelector, useDispatch } from "react-redux";
import { loginData, loginSignal } from "@slice/Login/loginSlice";
// Model
import TokenExpireModel from "@components/Model/TokenExpire";
// services
import { verifyAdminApi } from "@services/auth";

function App() {
  const [tokenModel, setTokenModel] = useState(false);
  const dispatch = useDispatch();
  const { signal } = useSelector((state) => state.loginInfo);

  //fetching admin data through token start
  const fetchAndVerifyAdmin = async (token) => {
    await verifyAdminApi({}, token).then((response) => {
      console.log(response);
      const adminData = response.data.data;
      if (response.data.success) {
        dispatch(loginData(adminData || {}));
      } else {
        setTokenModel(true);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (signal) {
      dispatch(loginSignal(false));
      if (token) {
        console.log("Token available: ", token);
        fetchAndVerifyAdmin(token);
      }
    }
  }, [signal]);
  //fetching admin data through token end

  return (
    <>
      <TokenExpireModel show={tokenModel} onHide={() => setTokenModel(false)} />
      <Routes />
    </>
  );
}

export default App;
