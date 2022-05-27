import axios from "axios";
const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const addCategory = async (categoryName, image) => {
  let clientResult = {};

  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("image", image);
  formData.append("frontendToken", frontendToken);

  await axios
    .post("/api/product-category", formData)
    .then((res) => {
      const { status, message } = res.data;
      status === "success" && (clientResult = { status, message });
      status !== "success" && (clientResult = { status, error: message });
    })
    .catch((error) => {
      const { status, message } = error;
      if (typeof status === "string") {
        clientResult.status = status;
        clientResult.error = message;
      }
    });

  return clientResult;
};

export const getCategories = async () => {
  let result = [];

  await axios
    .post("/api/product-category/all", {
      frontendToken,
    })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success" && data?.categories) {
        result = data.categories;
      }
    })
    .catch(() => {});

  return result;
};

export const updateCategory = async (formData) => {
  let clientResult = {};

  formData.append("frontendToken", frontendToken);

  await axios
    .patch("/api/product-category", formData)
    .then((res) => {
      const { status, message } = res.data;
      if (status === "success") {
        clientResult = {
          message,
          status,
        };
      } else {
        clientResult = {
          error: message,
          status,
        };
      }
    })
    .catch((error) => {
      const { status, message } = error;
      if (typeof status === "string") {
        clientResult.status = status;
        clientResult.error = message;
      }
    });

  return clientResult;
};

export const deleteCategories = async (categories) => {
  const clientResult = {};

  await axios
    .delete("/api/product-category", { data: { categories, frontendToken } })
    .then((res) => {
      if (res.status === 204) {
        clientResult.status = "success";
      }
      const { message } = res.data;
      clientResult.error = message;
    })
    .catch(() => {});

  return clientResult;
};
