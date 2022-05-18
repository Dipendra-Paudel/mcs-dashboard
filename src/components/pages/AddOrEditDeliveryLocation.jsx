import React, { useState, useEffect } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import {
  addDeliveryLocation,
  updateDeliveryLocation,
} from "../../api/deliveryLocation";

const inputFields = [
  {
    type: "text",
    validation: "ward",
    placeholder: "Ward No.",
  },
  {
    type: "text",
    validation: "tole",
    placeholder: "Tole",
  },
  {
    type: "text",
    validation: "charge",
    placeholder: "Delivery Charge (Rs.)",
  },
];

const AddOrEditDeliveryLocation = (props) => {
  const [mounted, setMounted] = useState(true);
  let { type, handleClose, deliveryLocation, setMessage } = props;
  deliveryLocation = type === "add" ? {} : deliveryLocation;
  const { ward, tole, charge } = deliveryLocation;

  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    ward: ward || "",
    tole: tole || "",
    charge: charge || "",

    errors: {
      ward: "",
      tole: "",
      charge: "",
    },
  });

  const handleDataChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const handleDeliveryLocationSubmit = async (event) => {
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

      // if there are no errors proceed to submit the data to the server
      if (goAheadAndSubmit) {
        setSubmitting(true);

        const { ward, tole, charge } = data;

        if (type === "edit") {
          const obj = {
            id: deliveryLocation?._id,
            ward,
            tole,
            charge,
          };

          const { message, error } = await updateDeliveryLocation(obj);

          if (mounted) {
            if (error) {
              setMessage(
                error ||
                  "Something went wrong while updating the delivery location"
              );
            } else if (message) {
              setMessage("Successfully updated the delivery location");
              handleClose();
            }
            setSubmitting(false);
          }
          setSubmitting(false);
        } else {
          const { message, error } = await addDeliveryLocation({
            ward,
            tole,
            charge,
          });
          if (mounted) {
            if (error) {
              setMessage(
                error ||
                  "Something went wrong while adding the delivery location"
              );
            } else if (message) {
              setMessage("Successfully added the delivery location");
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
      <div className="h-full w-full flex justify-center">
        <div
          className="relative bg-white py-5 px-10 rounded-lg w-full my-auto"
          style={{ minHeight: "500px", minWidth: "600px" }}
        >
          <div>
            <div className="text-2xl font-semibold text-secondary2 text-center py-2">
              {type === "add" ? "Add" : "Edit"} Delivery Location
            </div>
            {/* Form to create or update the delivery location */}
            <form
              onSubmit={handleDeliveryLocationSubmit}
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
              </div>

              <div className="pt-5">
                <AuthButton
                  submitting={submitting}
                  label={`${type === "add" ? "Add" : "Edit"} Delivery Location`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditDeliveryLocation;
