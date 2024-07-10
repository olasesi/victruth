import React from "react";
import { createRoot } from "react-dom/client";
//
import Cookies from "js-cookie";
// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "context";
import App from "App";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");

axios.interceptors.request.use(function (config) {
  var token = "";

  if (Cookies.get("auth_token_admin")) {
    token = Cookies.get("auth_token_admin");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  } else if (Cookies.get("auth_token_vendor")) {
    token = Cookies.get("auth_token_vendor");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  } else if (Cookies.get("auth_token_customer")) {
    token = Cookies.get("auth_token_customer");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter basename="/">
    <HelmetProvider>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </HelmetProvider>
  </BrowserRouter>
);
