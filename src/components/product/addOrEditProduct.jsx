import React, { useState, useEffect } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InputField from "../../common/input-fields";
import { AuthButton } from "../../common/buttons";
import formValidator from "../../common/formValidator";
import ImageField from "../../common/image-field";
import { addProduct, updateProduct } from "../../api/product";

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
  const [mounted, setMounted] = useState(true);
  let { type, handleClose, product, setMessage } = props;
  product = type === "edit" ? product || {} : {};
  const { productName, price, description, image, featured } = product;
  const [submitting, setSubmitting] = useState(false);
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

          if (mounted) {
            if (error) {
              setMessage(
                error || "Something went wrong while updating the product"
              );
            } else if (message) {
              setMessage("Successfully updated the product");
              handleClose();
            }
            setSubmitting(false);
          }
          setSubmitting(false);
        } else {
          const sendingdata = { ...data };
          delete sendingdata.errors;

          const { message, error } = await addProduct(
            sendingdata,
            productImage
          );
          if (mounted) {
            if (error) {
              setMessage(
                error || "Something went wrong while adding the product"
              );
            } else if (message) {
              setMessage("Successfully added the product");
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
              {type === "add" ? "Add" : "Edit"} Product
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
                {productImage && (
                  <div className="mt-4">
                    <img
                      src={
                        typeof productImage === "string"
                          ? `${process.env.REACT_APP_API_BASE_URL}${productImage}`
                          : URL.createObjectURL(productImage)
                      }
                      alt={""}
                      className="w-72"
                    />
                  </div>
                )}
              </div>
              <div className="pt-5">
                <AuthButton
                  submitting={submitting}
                  label={`${type === "add" ? "Add" : "Edit"} Product`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditProduct;
