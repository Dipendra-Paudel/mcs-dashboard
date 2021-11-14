import React from "react";
import { DeleteButton, SimpleButton } from "./buttons";

const ConfirmationPopup = ({ question, handleClick, deleting }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50">
      <div
        className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-20"
        onClick={() => handleClick("cancel")}
      ></div>
      <div className="absolute z-10 left-0 top-0 w-full">
        <div className="w-96 bg-white mx-auto p-5" style={{ width: "600px" }}>
          <div>{question}</div>
          <div className="flex justify-end space-x-4">
            <SimpleButton
              label="Cancel"
              handleClick={() => handleClick("cancel")}
            />
            <DeleteButton
              label="Delete"
              deleting={deleting}
              handleClick={() => handleClick("delete")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
