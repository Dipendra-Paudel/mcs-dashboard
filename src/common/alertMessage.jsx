import React from "react";
import { SimpleButton } from "./buttons";

const AlertMessage = ({ message, handleClose = () => {} }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50">
      <div
        className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-20"
        onClick={handleClose}
      ></div>
      <div className="absolute z-10 left-0 top-0 w-full">
        <div className="w-96 bg-white mx-auto p-5" style={{ width: "600px" }}>
          <div>{message}</div>
          <div className="text-right">
            <SimpleButton label="OK" handleClick={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
