import React, { useState } from "react";
import { AuthButton } from "../../common/buttons";
import InputField from "../../common/input-fields";
import formValidator from "../../common/formValidator";
import { changePassword } from "../../api/auth";

const ChangePassword = () => {
  const [inputFields, setInputFields] = useState([
    {
      type: "password",
      validation: "currentPassword",
      placeholder: "Current Password",
    },
    {
      type: "password",
      validation: "password",
      placeholder: "New Password",
    },
    {
      type: "password",
      validation: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ]);

  const [data, setData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
    errors: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDataChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  // When user click on the eye icon in the password field
  // toggle the type property between password and text
  const handleInputFieldChange = (index) => {
    const newInputFields = [...inputFields];
    const type = newInputFields[index].type;

    newInputFields[index].type = type === "password" ? "text" : "password";

    setInputFields(newInputFields);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!submitting) {
      setError("");
      setSuccess("");
      let goAheadAndSubmit = true;
      for (let i = 0; i < inputFields.length; i++) {
        const { validation } = inputFields[i];
        let error = formValidator(data[validation], validation);

        // if there are no errors for confirmPassword then check if it is equal to password
        // if password and confirm password do not match then give error
        if (validation === "confirmPassword" && !error) {
          if (data["confirmPassword"] !== data["password"]) {
            error = "Password and Confirm Password do not match";
          }
        }

        // if there are errors and goAheadAndSubmit is true then make it false
        if (error && goAheadAndSubmit) {
          goAheadAndSubmit = false;
        }

        // set error to the data
        const { errors } = data;
        errors[validation] = error;
        setData((data) => ({
          ...data,
          errors,
        }));
      }

      if (goAheadAndSubmit) {
        setSubmitting(true);

        const sendingData = {
          currentPassword: data.currentPassword,
          newPassword: data.password,
        };

        const { status, message } = await changePassword(sendingData);
        if (status === "success") {
          setData({
            currentPassword: "",
            password: "",
            confirmPassword: "",
            errors: {
              currentPassword: "",
              password: "",
              confirmPassword: "",
            },
          });

          setSuccess(message);
        } else {
          setError(message);
        }
        setSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">
          Change Password
        </div>
        <form
          className="grid gap-2 pt-4 max-w-sm"
          onSubmit={handleChangePassword}
        >
          {inputFields.map((inputField, index) => (
            <InputField
              key={index}
              {...inputField}
              value={data[inputField.validation]}
              handleChange={handleDataChange}
              error={data.errors[inputField.validation]}
              submitting={submitting}
              handleInputFieldChange={() => {
                const { validation } = inputField;
                if (
                  validation === "currentPassword" ||
                  validation === "password" ||
                  validation === "confirmPassword"
                ) {
                  handleInputFieldChange(index);
                }
              }}
            />
          ))}
          {error && <div className="text-sm text-red-400 mt-1">{error}</div>}
          {success && (
            <div className="text-sm text-green-600 mt-1">{success}</div>
          )}
          <div className="pt-4">
            <AuthButton label="Change Password" submitting={submitting} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
