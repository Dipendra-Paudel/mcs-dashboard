const formValidator = (value, validation, placeholder) => {
  let error = "";

  // Check if value is empty
  if (
    value.trim() === "" &&
    validation !== "password" &&
    validation !== "confirmPassword"
  ) {
    error = `This field is required`;
  } else {
    // validation for password
    if (validation === "password") {
      if (value.length === 0) {
        error = "This field is required";
      } else if (value.length < 10) {
        error = "Password must be at least 10 characters long";
      } else {
        let arr = [];
        if (!/\d/.test(value)) {
          arr.push("number");
        }
        if (!/[A-Z]/.test(value)) {
          arr.push("capital letter");
        }
        if (!/[a-z]/.test(value)) {
          arr.push("small letter");
        }
        if (!/[!@#$%^&*()_+\-={}[\]\\|'"/?.>,<`~]/.test(value)) {
          arr.push("special character");
        }

        if (arr.length > 0) {
          let errorName = arr.join(", ");
          if (arr.length > 1) {
            const index = errorName.lastIndexOf(",");
            errorName =
              errorName.slice(0, index) +
              " and" +
              errorName.slice(index + 1, errorName.length);
          }
          error = `Password must contain at least 1 ${errorName}`;
        }
      }
    }

    // validation for confirm password
    else if (validation === "confirmPassword") {
      if (value.length === 0) {
        error = "This field is required";
      }
    }

    // validation for email
    else if (validation === "email") {
      if (!value.match(/^\w+([._]\w+)?@\w+\.\w+(\.\w+)?$/gi)) {
        error = "Invalid Email Address";
      }
    }

    // validation for contact number
    else if (validation === "contact") {
      // eslint-disable-next-line
      if (+value !== +value) {
        error = "Invalid Contact Number";
      } else if (value.trim().length !== 10) {
        error = "Contact Number must be 10 characters long";
      } else if (!(value.startsWith("97") || value.startsWith("98"))) {
        error = "Contact number must have '98' or '97' in the beginning";
      }
    }

    // validation for contact message
    else if (validation === "contactMessage") {
      if (value.trim().length < 20) {
        error =
          "Your message is too short. Please explain more!!! (at least 20 characters)";
      }
    }
  }

  return error;
};

export default formValidator;
