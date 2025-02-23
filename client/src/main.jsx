import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = "dev-2krzhfzla3oilld1.jp.auth0.com";
const clientId = "l9ZPxhRxgLVKzqnlcaDyhe325Lxpqcn8";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
    <ToastContainer></ToastContainer>
  </React.StrictMode>
);
