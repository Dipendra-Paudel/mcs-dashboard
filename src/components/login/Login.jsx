import React, { useState, useEffect } from "react";
import { login } from "../../api/auth";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import InputField from "../../common/input-fields";
import LogoName from "../../common/LogoName";

const Login = ({ setLoggedIn }) => {
  // Check if component is mounted
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const [inputFields, setInputFields] = useState([
    {
      type: "text",
      validation: "email",
      placeholder: "Email",
    },
    {
      type: "password",
      validation: "password",
      placeholder: "Password",
    },
  ]);

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

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!submitting) {
      let goAheadAndSubmit = true;
      for (let i = 0; i < inputFields.length; i++) {
        const { validation } = inputFields[i];
        let error = formValidator(data[validation], validation, false);

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

      // submit the data if there are no errors
      if (goAheadAndSubmit) {
        setSubmitting(true);
        const sendingData = { ...data };
        delete sendingData.errors;

        const result = await login(sendingData);
        const { error, status } = result;

        // Display errors if there are any

        if (mounted) {
          if (error) {
            setData((d) => ({
              ...d,
              errors: {
                ...d.errors,
                password: error,
              },
            }));
          } else if (status === "success") {
            window.location = "/";
          }
        }
        // Reset the spinner
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="px-6 md:px-10 py-10 lg:px-16 bg-gray-100 min-h-screen grid place-items-center flex-1">
      <div
        className="max-w-sm mx-auto rounded-lg px-4 py-6 bg-white"
        style={{
          boxShadow: "1px 1px 5px lightgray",
          minWidth: "300px",
          width: "400px",
        }}
      >
        <form
          onSubmit={handleLoginSubmit}
          className="space-y-4"
          autoComplete="off"
        >
          <div>
            <LogoName />
          </div>
          <div className="space-y-2">
            {inputFields.map((inputField, index) => (
              <InputField
                key={index}
                {...inputField}
                value={data[inputField.validation]}
                handleChange={handleDataChange}
                error={data.errors[inputField.validation]}
                submitting={submitting}
                handleInputFieldChange={() => {
                  if (inputField.validation === "password") {
                    handleInputFieldChange(index);
                  }
                }}
              />
            ))}
          </div>
          <div>
            <AuthButton submitting={submitting} label="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
