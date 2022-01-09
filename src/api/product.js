export const addProduct = async (sendingdata, image) => {
  const dataArr = Object.keys(sendingdata);
  const formData = new FormData();
  for (let i = 0; i < dataArr.length; i++) {
    formData.append(dataArr[i], sendingdata[dataArr[i]]);
  }
  formData.append("image", image);
  let clientResult = {};

  await fetch("/api/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      const { status, message } = await res.json();
      status === "success" && (clientResult = { status, message });
      status !== "success" && (clientResult = { status, error: message });
    })
    .catch((err) => {
      clientResult.error = "Something went wrong. Please try again";
    });

  return clientResult;
};

export const getProducts = async (type = "", page = 1, limit = 4) => {
  let result = {};

  await fetch(`/api/product?type=${type}&page=${page}&limit=${limit}`)
    .then(async (res) => {
      const { status, data } = await res.json();
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
  await fetch("/api/product", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      const { status, message } = await res.json();
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
    .catch((err) => {
      clientResult.error = "Something went wrong. Please try again";
    });

  return clientResult;
};

export const deleteProducts = async (products) => {
  const clientResult = {};

  await fetch("/api/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      products,
    }),
  })
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      if (res.status === 204) {
        clientResult.message = "Successfully deleted the product";
        return;
      }

      const { message } = await res.json();
      clientResult.error = message;
    })
    .catch((err) => {
      clientResult.error = "Something went wrong. Please try again";
    });

  return clientResult;
};
