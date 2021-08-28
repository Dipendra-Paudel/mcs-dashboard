import React from "react";
import PasswordHideIcon from "../icons/password-hide";
import PasswordViewIcon from "../icons/password-view";

const InputField = ({
  type,
  value,
  error,
  handleChange,
  placeholder,
  validation,
  handleInputFieldChange,
  submitting,
}) => {
  const changeInputData = (event, validation) => {
    if (!submitting) {
      handleChange(event, validation);
    }
  };
  if (validation === "password" || validation === "confirmPassword") {
    return (
      <div className="input-field-container">
        <label htmlFor={validation} className="text-gray-500 text-sm">
          {placeholder} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={type}
            id={validation}
            value={value}
            onChange={(event) => changeInputData(event, validation)}
            className={`input-field auth-password-field ${
              submitting ? "input-field-disabled" : ""
            }`}
            disabled={submitting}
          />
          {value.length > 0 && (
            <div
              className="absolute top-0 right-0 flex items-center justify-center h-full w-10 cursor-pointer text-gray-600"
              onClick={handleInputFieldChange}
            >
              {type === "password" ? (
                <PasswordViewIcon />
              ) : (
                <PasswordHideIcon />
              )}
            </div>
          )}
        </div>

        {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
      </div>
    );
  } else if (type === "text") {
    return (
      <div className="input-field-container">
        <label htmlFor={validation} className="text-gray-500 text-sm">
          {placeholder} <span className="text-red-500">*</span>
        </label>
        <input
          type={type}
          id={validation}
          value={value}
          onChange={(event) => changeInputData(event, validation)}
          className={`input-field ${submitting ? "input-field-disabled" : ""}`}
          disabled={submitting}
        />
        {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div>
        <label htmlFor={validation} className="text-gray-500 text-sm">
          {placeholder} <span className="text-red-500">*</span>
        </label>
        <textarea
          id={validation}
          value={value}
          onChange={(event) => changeInputData(event, validation)}
          className={`input-field w-full resize-none ${
            submitting ? "input-field-disabled" : ""
          }`}
          rows="5"
          disabled={submitting}
        ></textarea>

        {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
      </div>
    );
  } else {
    return (
      <div className="text-red-500 text-4xl font-bold">
        no type specified or invalid type
      </div>
    );
  }
};

export default InputField;
