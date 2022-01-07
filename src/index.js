import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import fetchIntercept from "fetch-intercept";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
import "./assets/css/logo.css";
import RouteManagement from "./RouteManagement";

require("dotenv").config();

export const AuthInterceptor = () => {
  fetchIntercept.register({
    request: function (url, config) {
      // Modify the url or config here
      url = `${process.env.REACT_APP_API_BASE_URL}${url}`;

      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function (response) {
      // Modify the reponse object
      return response;
    },

    responseError: function (error) {
      // Handle an fetch error
      return Promise.reject(error);
    },
  });
};

if (!window.location.href.startsWith("https")) {
  window.location = window.location.href.replace(/^http/, "https:");
} else if (window.top === window.self) {
  AuthInterceptor();

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
