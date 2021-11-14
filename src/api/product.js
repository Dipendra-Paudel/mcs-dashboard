export const addProduct = async (sendingdata, image) => {
  const dataArr = Object.keys(sendingdata);
  const formData = new FormData();
  for (let i = 0; i < dataArr.length; i++) {
    formData.append(dataArr[i], sendingdata[dataArr[i]]);
  }
  formData.append("image", image);
  let clientResult = {};

  await fetch("/product", {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      const { status, message } = await res.json();
      status === "success" && (clientResult = { status, message });
      status !== "success" && (clientResult = { status, error: message });
    })
    .catch((err) => {
      clientResult.error = "Something went wrong. Please try again";
    });

  return clientResult;
};

export const getProducts = async (pageNum) => {
  let clientResult = [];
  await fetch("/product/all-products", {
    method: "GET",
  })
    .then(async (res) => {
      const { data } = await res.json();
      if (data) {
        clientResult = data.products;
      } else {
        // handle errors
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return clientResult;
};

export const updateProduct = async (formData) => {
  let clientResult = {};
  await fetch("/product", {
    method: "PATCH",
    body: formData,
  })
    .then(async (res) => {
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

export const deleteProduct = async (id) => {
  const clientResult = {};

  await fetch("/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then(async (res) => {
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
