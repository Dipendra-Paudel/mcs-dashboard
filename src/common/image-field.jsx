import React, { useRef } from "react";
import imageValidator from "./imageValidator";

const ImageField = ({ fileName, handleChange, error, disabled }) => {
  const imageRef = useRef();

  const handleImageCheck = async (event) => {
    const result = await imageValidator(event.target.files[0]);
    handleChange(result ? event.target.files[0] : "Invalid file");
  };

  return (
    <div className="flex">
      <div
        className={`px-4 flex-1 bg-gray-200 py-1 truncate 
        ${!fileName ? "" : error ? "text-red-500" : "text-green-500"}
        `}
      >
        {fileName || "No Image Selected"}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageRef}
          onChange={handleImageCheck}
        />
        <div
          className={`px-4 py-1 bg-blue-600 text-white ${
            !disabled ? "hover:bg-blue-700 cursor-pointer" : "cursor-default"
          }`}
          onClick={() => !disabled && imageRef.current.click()}
        >
          {error || !fileName ? "Select Image" : "Change Image"}
        </div>
      </div>
    </div>
  );
};

export default ImageField;
