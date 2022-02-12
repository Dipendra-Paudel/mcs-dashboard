import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const SelectedImage = ({ image, handleRemove }) => {
  return (
    <div className="relative">
      <div
        className="absolute h-8 w-8 grid place-items-center bg-red-400 top-0 right-0"
        onClick={handleRemove}
      >
        <CloseIcon style={{ color: "white" }} />
      </div>
      <img
        src={
          typeof image === "string"
            ? `${process.env.REACT_APP_API_BASE_URL}${image}`
            : URL.createObjectURL(image)
        }
        alt={""}
        className="h-64"
      />
    </div>
  );
};

export default SelectedImage;
