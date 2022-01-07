import React, { useState, useEffect } from "react";
import App from "./App";
import { verifyToken } from "./api/auth";
import misterComputerSolutionsLogo from "./assets/images/logo.svg";
import { PageLoader } from "./common/loader";
import Login from "./components/login/Login";

const RouteManagement = () => {
  const [verifying, setVerifying] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Pre-load the logo of mister computer solutions
  const image = new Image();
  image.src = misterComputerSolutionsLogo;

  useEffect(() => {
    const verifyUser = async () => {
      const { status } = await verifyToken();
      if (status === "success") {
        setLoggedIn(true);
      }

      setVerifying(false);
    };

    verifyUser();
  }, []);

  if (verifying) {
    return (
      <div className="min-h-screen grid place-items-center">
        <PageLoader />
      </div>
    );
  }
  return (
    <div>
      {loggedIn && <App />}
      {!loggedIn && <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
};

export default RouteManagement;
