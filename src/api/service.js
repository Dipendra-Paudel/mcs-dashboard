export const addService = async (sendingdata, image) => {
  const dataArr = Object.keys(sendingdata);
  const formData = new FormData();
  for (let i = 0; i < dataArr.length; i++) {
    formData.append(dataArr[i], sendingdata[dataArr[i]]);
  }
  formData.append("image", image);
  let clientResult = {};

  await fetch("/service", {
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

export const getServices = async (pageNum) => {
  let clientResult = [];
  await fetch("/service/all-services", {
    method: "GET",
  })
    .then(async (res) => {
      const { data } = await res.json();
      if (data) {
        clientResult = data.services;
      } else {
        // handle errors
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return clientResult;
};

export const deleteService = async (id) => {
  const clientResult = {};

  await fetch("/service", {
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
        clientResult.message = "Successfully deleted the service";
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

export const updateService = async (formData) => {
  let clientResult = {};
  await fetch("/service", {
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
