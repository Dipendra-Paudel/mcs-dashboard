import axios from "axios";
const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const addProduct = async (sendingdata, images) => {
  const dataArr = Object.keys(sendingdata);
  const formData = new FormData();
  for (let i = 0; i < dataArr.length; i++) {
    formData.append(dataArr[i], sendingdata[dataArr[i]]);
  }
  images.map((image) => formData.append("images", image));
  formData.append("frontendToken", frontendToken);
  let clientResult = {};

  await axios
    .post("/api/product", formData)
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

export const getProducts = async (type = "", page = 1, limit = 4) => {
  let result = {};

  await axios
    .post(`/api/product/all?type=${type}&page=${page}&limit=${limit}`, {
      frontendToken,
    })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success" && data?.products) {
        result = {
          products: data.products,
          totalProducts: data.totalProducts,
        };
      }
    })
    .catch(() => {});

  return result;
};

export const updateProduct = async (formData) => {
  let clientResult = {};
  formData.append("frontendToken", frontendToken);

  await axios
    .patch("/api/product", formData)
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

export const deleteProducts = async (products) => {
  const clientResult = {};

  await axios
    .delete("/api/product", { data: { products, frontendToken } })
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

export const getIndividualProductDetail = async (slug) => {
  let clientResult = { status: "fail" };

  await axios
    .post(`/api/product/${slug}`, { frontendToken })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success") {
        clientResult.status = status;
        clientResult.product = data.product;
      }
    })
    .catch(() => {});

  return clientResult;
};
