import React from "react";
import Loader from "./loader";

export const SimpleButton = ({ label, handleClick }) => {
  return (
    <button
      className="text-white px-4 py-1 rounded font-semibold bg-blue-600 hover:bg-blue-700"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export const AuthButton = ({ submitting, label }) => {
  return (
    <button
      className={`text-white flex items-center justify-center p-2 w-full rounded font-semibold ${
        submitting ? "cursor-wait bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {submitting ? <Loader /> : label}
    </button>
  );
};
