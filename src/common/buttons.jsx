import React from "react";
import { Loader } from "./Loader";

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

export const DeleteButton = ({ label, handleClick, deleting }) => {
  return (
    <button
      className={`text-white flex items-center justify-center px-4 py-1 rounded font-semibold ${
        deleting ? "cursor-wait bg-red-400" : "bg-red-500 hover:bg-red-600"
      }`}
      onClick={() => !deleting && handleClick()}
    >
      {deleting ? <Loader /> : label}
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

export const PageNumber = ({
  label,
  value,
  handleClick,
  isActive,
  isDisabled,
}) => {
  return (
    <div
      className={`py-2 px-4 ${
        value === "..."
          ? ""
          : isDisabled === true
          ? "cursor-default bg-gray-100"
          : isActive
          ? "bg-blue-300 cursor-default"
          : "transition-all duration-300 border border-blue-300 hover:bg-blue-400 cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};
