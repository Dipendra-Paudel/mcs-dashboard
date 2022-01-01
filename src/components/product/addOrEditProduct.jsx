import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import ImageField from "../../common/image-field";
import { addProduct, updateProduct } from "../../api/product";
import AlertMessage from "../../common/alertMessage";

const inputFields = [
  {
    type: "text",
    validation: "productName",
    placeholder: "Product Name",
  },
  {
    type: "text",
    validation: "price",
    placeholder: "Price",
  },
  {
    type: "textarea",
    validation: "description",
    placeholder: "Product Description",
  },
];

const AddOrEditProduct = (props) => {
  let { type, handleClose, product, setLoading } = props;
  product = product || {};
  const { productName, price, description, image, featured } = product;
  const [submitting, setSubmitting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [data, setData] = useState({
    productName: productName || "",
    price: price || "",
    description: description || "",
    featured: featured || false,
    errors: {
      productName: "",
      price: "",
      description: "",
    },
  });
  const [productImage, setProductImage] = useState(image || "");
  const [imageErr, setImageErr] = useState("");

  const handleDataChange = (event, property) => {
    setData({
      ...data,
      [property]: event.target.value,
    });
  };

  const handleProductImageChange = (file) => {
    const invalid = "Invalid file";
    if (file === invalid) {
      setProductImage("");
      setImageErr(invalid);
    } else {
      setProductImage(file);
      setImageErr("");
    }
  };

  const handleProductSubmit = async (event) => {
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

      if (!productImage) {
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

          formData.append("featured", data.featured);
          formData.append("id", product._id);

          productImage?.name && formData.append("image", productImage);

          // now send the data to the server
          const { message, error } = await updateProduct(formData);

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

          // call the api for patch request
        } else if (type === "add") {
          const sendingdata = { ...data };
          delete sendingdata.errors;

          const { message, error } = await addProduct(
            sendingdata,
            productImage
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
              setLoading(true);
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
          style={{ minHeight: "500px", minWidth: "600px" }}
        >
          <div
            className="absolute right-1 bg-red-400 hover:bg-red-500 top-1 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={handleClose}
          >
            <CloseIcon className="close-icon" style={{ fontSize: "20px" }} />
          </div>

          <div>
            <div className="text-2xl font-semibold text-secondary2 text-center py-2">
              {type === "add" ? "Add Product" : "Edit Product"}
            </div>
            {/* Form to create or update the product */}
            <form
              onSubmit={handleProductSubmit}
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

              {/* For the featured option */}
              <div className="py-2">
                <label
                  htmlFor="featured"
                  className="space-x-1 w-full inline-block cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="featured"
                    className="cursor-pointer"
                    checked={data.featured}
                    onChange={(event) =>
                      setData({ ...data, featured: event.target.checked })
                    }
                  />
                  <span>Featured</span>
                </label>
              </div>
              <div>
                <ImageField
                  fileName={imageErr || productImage?.name || productImage}
                  handleChange={handleProductImageChange}
                  error={imageErr}
                  disabled={submitting}
                />
              </div>
              <div className="pt-5">
                <AuthButton submitting={submitting} label="Save Product" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditProduct;
