import React from "react";
import { Link } from "react-router-dom";
import misterComputerSolutionsLogo from "../assets/images/logo.svg";

const LogoName = () => {
  return (
    <div className="flex flex-col relative z-50">
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="flex-shrink-0 w-28"
      >
        <img
          src={misterComputerSolutionsLogo}
          alt="Mister Computer Solutions Logo"
          className="w-full"
        />
      </Link>
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="text-sm lg:text-base font-bold text-gray-700"
      >
        Mister Computer Solutions
      </Link>
    </div>
  );
};

export default LogoName;
