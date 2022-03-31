import React, { useState, useEffect } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import { addCategory, updateCategory } from "../../api/category";

const inputFields = [
  {
    type: "text",
    validation: "categoryName",
    placeholder: "Product Category",
  },
];

const AddOrEditProductCategory = (props) => {
  const [mounted, setMounted] = useState(true);
  let { type, handleClose, category, setMessage } = props;
  category = type === "add" ? {} : category;
  const { categoryName } = category;

  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    categoryName: categoryName || "",
    errors: {
      categoryName: "",
    },
  });

  const handleDataChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const handleProductCategorySubmit = async (event) => {
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

        const { categoryName } = data;

        if (type === "edit") {
          // now send the data to the server
          const { message, error } = await updateCategory(
            category?._id,
            categoryName
          );

          if (mounted) {
            if (error) {
              setMessage(
                error || "Something went wrong while updating the category"
              );
            } else if (message) {
              setMessage("Successfully updated the category");
              handleClose();
            }
            setSubmitting(false);
          }
          setSubmitting(false);
        } else {
          const { message, error } = await addCategory(categoryName);
          if (mounted) {
            if (error) {
              setMessage(
                error || "Something went wrong while adding the category"
              );
            } else if (message) {
              setMessage("Successfully added the category");
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
              {type === "add" ? "Add" : "Edit"} Category
            </div>
            {/* Form to create or update the category */}
            <form
              onSubmit={handleProductCategorySubmit}
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
                  label={`${type === "add" ? "Add" : "Edit"} Category`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditProductCategory;
