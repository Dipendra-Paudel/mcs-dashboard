import React, { useState } from "react";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import ImageField from "../../common/image-field";

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
    type: "text",
    validation: "discountPrice",
    placeholder: "Discount Price",
  },
  {
    type: "textarea",
    validation: "description",
    placeholder: "Product Description",
  },
];

const AddOrEditProduct = ({
  type,
  id,
  handleClose,
  productName,
  price,
  discountPrice,
  description,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    productName: productName || "",
    price: price || "",
    discountPrice: discountPrice || "",
    description: description || "",
    errors: {
      productName: "",
      price: "",
      discountPrice: "",
      description: "",
    },
  });
  const [productImage, setProductImage] = useState("");
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

      if (!productImage && !imageErr) {
        setImageErr("Image is required");
        goAheadAndSubmit = false;
      }

      // if there are no errors proceed to submit the data to the server
      if (goAheadAndSubmit) {
        // setSubmitting(true);

        if (type === "edit") {
          if (productImage) {
            const formData = new FormData();
            inputFields.map((field) =>
              formData.append(field.validation, data[field.validation])
            );

            productImage?.name && formData.append("image", productImage);

            // now send the data to the server
          }

          // call the api for patch request
        } else if (type === "add") {
          const url = "http://127.0.0.1:9000/api/products/";
          const sendingdata = { ...data };
          delete sendingdata.errors;

          console.log(sendingdata);

          axios
            .post(url, sendingdata)
            .then((response) => console.log(response.results))
            .catch((err) => console.log(err));
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen overflow-hidden">
      <div
        className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-30"
        onClick={handleClose}
      ></div>
      <div className="h-full w-full overflow-y-auto flex justify-center">
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
                <div className="col-span-2">
                  <ImageField
                    fileName={imageErr || productImage?.name || productImage}
                    handleChange={handleProductImageChange}
                    error={imageErr}
                    disabled={submitting}
                  />
                </div>
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
