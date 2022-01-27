import React, { useState, useEffect } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import ImageField from "../../common/image-field";
import { addService, updateService } from "../../api/service";

const inputFields = [
  {
    type: "text",
    validation: "serviceName",
    placeholder: "Service Name",
  },
  {
    type: "textarea",
    validation: "description",
    placeholder: "Service Description",
  },
];

const AddOrEditService = (props) => {
  let { type, handleClose, service, setMessage } = props;
  service = type === "edit" ? service || {} : {};
  const { serviceName, description, image } = service;
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [data, setData] = useState({
    serviceName: serviceName || "",
    description: description || "",
    errors: {
      serviceName: "",
      description: "",
    },
  });
  const [serviceImage, setServiceImage] = useState(image || "");
  const [imageErr, setImageErr] = useState("");

  const handleDataChange = (event, property) => {
    if (typeof event === "string") {
      setData({
        ...data,
        description: event,
      });
    } else {
      setData({
        ...data,
        [property]: event.target.value,
      });
    }
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

          if (mounted) {
            if (error) {
              setMessage(
                error || "Something went wrong while updating the service"
              );
            } else if (message) {
              setMessage("Successfully updated the service");
              handleClose();
            }
            setSubmitting(false);
          }

          // call the api for add request
        } else if (type === "add") {
          const sendingdata = { ...data };
          delete sendingdata.errors;

          const { message, error } = await addService(
            sendingdata,
            serviceImage
          );

          if (mounted) {
            if (error) {
              setMessage(
                error || "Something went wrong while adding the service"
              );
            } else if (message) {
              setMessage("Successfully added the service");
              handleClose();
            }
            setSubmitting(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <div>
      <div className="h-full w-full overflow-y-auto">
        <div className="inline-block mb-4">
          <div
            className="px-4 py-1 flex space-x-4 font-semibold text-white cursor-pointer bg-blue-600 transition-all duration-500 hover:bg-blue-400 rounded"
            onClick={handleClose}
          >
            <div>Go Back</div>
            <div>
              <DoubleArrowIcon
                style={{
                  color: "white",
                  fontSize: "20px",
                  transform: "rotate(180deg)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative bg-white py-5 px-10 rounded-lg overflow-hidden my-auto">
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
              <div className="grid gap-4">
                {inputFields.map((inputField, index) => (
                  <div key={index}>
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
                <div>
                  <ImageField
                    fileName={imageErr || serviceImage?.name || serviceImage}
                    handleChange={handleServiceImageChange}
                    error={imageErr}
                    disabled={submitting}
                  />
                  {serviceImage && (
                    <div className="mt-4">
                      <img
                        src={
                          typeof serviceImage === "string"
                            ? `${process.env.REACT_APP_API_BASE_URL}${serviceImage}`
                            : URL.createObjectURL(serviceImage)
                        }
                        alt={""}
                        className="w-72"
                      />
                    </div>
                  )}
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
