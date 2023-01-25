import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// React-Router-Dom
import { BrowserRouter } from "react-router-dom";
// Redux-provider
import { Provider } from "react-redux";
// Redux-store
import { store } from "@store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
