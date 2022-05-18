import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import PasswordHideIcon from "../icons/password-hide";
import PasswordViewIcon from "../icons/password-view";

const InputField = ({
  type,
  value,
  error,
  handleChange,
  placeholder,
  validation,
  options,
  handleInputFieldChange,
  submitting,
}) => {
  const changeInputData = (event, validation) => {
    if (!submitting) {
      handleChange(event, validation);
    }
  };
  if (
    validation === "password" ||
    validation === "confirmPassword" ||
    validation === "currentPassword"
  ) {
    return (
      <div>
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
      <div>
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
  } else if (type === "select") {
    return (
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
            <Select
              value={value}
              label={placeholder}
              onChange={(event) => changeInputData(event, validation)}
            >
              {options.map((option, index) => {
                const { _id, categoryName } = option;

                return (
                  <MenuItem value={_id} key={index}>
                    {categoryName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
      </div>
    );
  } else if (type === "textarea") {
    const config = {};
    config.toolbar = [
      "heading",
      "bold",
      "italic",
      "undo",
      "redo",
      "numberedList",
      "bulletedList",
    ];

    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={config}
          onChange={(event, editor) => {
            const data = editor.getData();
            handleChange(data);
          }}
          placeholder="Description"
        />

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
