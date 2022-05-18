import React, { useRef } from "react";
import imageValidator from "./imageValidator";

const ImageField = ({
  handleChange,
  error,
  disabled,
  type,
  multiple = true,
}) => {
  const imageRef = useRef();

  const handleImageCheck = async (event) => {
    const files = event.target.files;
    const validImages = [];
    let newFiles = Array.from(files);
    await newFiles.map(async (file) => {
      const result = await imageValidator(file);
      result && validImages.push(file);
    });

    handleChange(validImages);
  };

  return (
    <div className="flex">
      <div
        className={`px-4 flex-1 bg-gray-200 py-1 truncate ${
          error ? "text-red-500" : "text-green-500"
        }`}
      >
        {error || `Select Image${multiple ? "s" : ""} for ${type || "Product"}`}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageRef}
          onChange={handleImageCheck}
          multiple={multiple}
        />
        <div
          className={`px-4 py-1 bg-blue-600 text-white ${
            !disabled ? "hover:bg-blue-700 cursor-pointer" : "cursor-default"
          }`}
          onClick={() => !disabled && imageRef.current.click()}
        >
          Select Image{multiple ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default ImageField;
