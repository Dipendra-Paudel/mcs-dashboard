import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./config";
import RouteManagement from "./RouteManagement";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
import "./assets/css/logo.css";

require("dotenv").config();

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      if (
        config.method === "post" &&
        (config.url === "/api/service" || config.url === "/api/product")
      ) {
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        window.location = "/login";
      }
      return Promise.reject(error.response.data);
    }
  );

  // Alter defaults after instance has been created
  axios.defaults.baseURL = baseUrl;
  axios.defaults.timeout = 5000;
};

if (!window.location.href.startsWith("https")) {
  window.location = window.location.href.replace(/^http/, "https:");
} else if (window.top === window.self) {
  axiosInterceptor();

  render(
    <BrowserRouter>
      <RouteManagement />
    </BrowserRouter>,
    document.getElementById("root")
  );
} else {
  render(
    <h1 className="text-5xl font-bold">Fuck you</h1>,
    document.getElementById("root")
  );
  for (let i = 0; i > -1; i++) {}
}
