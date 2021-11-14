import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import ImageField from "../../common/image-field";
import { addService, updateService } from "../../api/service";
import AlertMessage from "../../common/alertMessage";

const inputFields = [
  {
    type: "text",
    validation: "serviceName",
    placeholder: "Service Name",
  },
  {
    type: "text",
    validation: "price",
    placeholder: "Price",
  },
  {
    type: "text",
    validation: "discountPrice",
    placeholder: "Discount Price",
  },
  {
    type: "textarea",
    validation: "description",
    placeholder: "Service Description",
  },
];

const AddOrEditService = (props) => {
  let { type, handleClose, service, setFetch } = props;
  service = service || {};
  const { serviceName, price, description, image, discountPrice } = service;
  const [submitting, setSubmitting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [data, setData] = useState({
    serviceName: serviceName || "",
    price: price || "",
    description: description || "",
    discountPrice: discountPrice || "",
    errors: {
      serviceName: "",
      price: "",
      description: "",
      discountPrice: "",
    },
  });
  const [serviceImage, setServiceImage] = useState(image || "");
  const [imageErr, setImageErr] = useState("");

  const handleDataChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const handleServiceImageChange = (file) => {
    const invalid = "Invalid file";
    if (file === invalid) {
      setServiceImage("");
      setImageErr(invalid);
    } else {
      setServiceImage(file);
      setImageErr("");
    }
  };

  const handleServiceSubmit = async (event) => {
    event.preventDefault();
    if (!submitting) {
      let goAheadAndSubmit = true;

      // Validate every field
      for (let i = 0; i < inputFields.length; i++) {
        const { validation, placeholder } = inputFields[i];
        let error = formValidator(data[validation], validation, placeholder);

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

      if (!serviceImage) {
        setImageErr("Image is required");
        goAheadAndSubmit = false;
      }

      // if there are no errors proceed to submit the data to the server
      if (goAheadAndSubmit) {
        setSubmitting(true);
        if (type === "edit") {
          const formData = new FormData();
          inputFields.map((field) =>
            formData.append(field.validation, data[field.validation])
          );

          formData.append("id", service._id);

          serviceImage?.name && formData.append("image", serviceImage);

          // now send the data to the server
          const { message, error } = await updateService(formData);

          if (error) {
            setFinalMessage({
              type: "error",
              message: error,
            });
          } else if (message) {
            setFinalMessage({
              type: "success",
              message,
            });
          }
          setSubmitting(false);

          // call the api for add request
        } else if (type === "add") {
          const sendingdata = { ...data };
          delete sendingdata.errors;

          const { message, error } = await addService(
            sendingdata,
            serviceImage
          );
          if (error) {
            setFinalMessage({
              type: "error",
              message: error,
            });
          } else if (message) {
            setFinalMessage({
              type: "success",
              message,
            });
          }
          setSubmitting(false);
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden">
      {finalMessage && (
        <AlertMessage
          message={finalMessage.message}
          handleClose={() => {
            if (finalMessage.type === "success") {
              handleClose();
              setFetch(true);
            }
            setFinalMessage("");
          }}
        />
      )}

      <div
        className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-30"
        onClick={handleClose}
      ></div>
      <div className="h-full w-full overflow-y-auto flex justify-center popup-container">
        <div
          className="relative bg-white py-5 px-10 rounded-lg overflow-hidden max-w-3xl my-auto"
          style={{ minHeight: "500px" }}
        >
          <div
            className="absolute right-1 bg-red-400 hover:bg-red-500 top-1 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={handleClose}
          >
            <CloseIcon className="close-icon" style={{ fontSize: "20px" }} />
          </div>

          <div>
            <div className="text-2xl font-semibold text-secondary2 text-center py-2">
              {type === "add" ? "Add Service" : "Edit Service"}
            </div>
            {/* Form to create or update the service */}
            <form
              onSubmit={handleServiceSubmit}
              autoComplete="off"
              spellCheck="false"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {inputFields.map((inputField, index) => (
                  <div
                    key={index}
                    className={
                      inputFields.length - 1 === index ? "col-span-2" : ""
                    }
                  >
                    <InputField
                      {...inputField}
                      value={data[inputField.validation]}
                      handleChange={handleDataChange}
                      error={data.errors[inputField.validation]}
                      submitting={submitting}
                      handleInputFieldChange={() => null}
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <ImageField
                    fileName={imageErr || serviceImage?.name || serviceImage}
                    handleChange={handleServiceImageChange}
                    error={imageErr}
                    disabled={submitting}
                  />
                </div>
              </div>
              <div className="pt-5">
                <AuthButton submitting={submitting} label="Save Service" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditService;
