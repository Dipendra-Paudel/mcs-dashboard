import axios from "axios";
const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const addService = async (sendingdata, image) => {
  const dataArr = Object.keys(sendingdata);
  const formData = new FormData();
  for (let i = 0; i < dataArr.length; i++) {
    formData.append(dataArr[i], sendingdata[dataArr[i]]);
  }
  formData.append("image", image);
  formData.append("frontendToken", frontendToken);

  let clientResult = {};

  await axios
    .post("/api/service", formData)
    .then((res) => {
      const { status, message } = res.data;
      status === "success" && (clientResult = { status, message });
      status !== "success" && (clientResult = { status, error: message });
    })
    .catch(() => {});

  return clientResult;
};

export const getServices = async (page, pageLimit) => {
  let result = {};

  await axios
    .post(`/api/service/all?page=${page}&limit=${pageLimit}`, {
      frontendToken,
    })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success") {
        result = { ...data };
      }
    })
    .catch(() => {});

  return result;
};

export const deleteServices = async (services) => {
  const clientResult = {
    status: "fail",
    message: "Could not delete the service",
  };

  await axios
    .delete("/api/service", { data: { services, frontendToken } })
    .then((res) => {
      if (res.status === 204) {
        clientResult.status = "success";
        clientResult.message = "Successfully deleted the service";
      }
    })
    .catch(() => {});

  return clientResult;
};

export const updateService = async (formData) => {
  let clientResult = {};
  formData.append("frontendToken", frontendToken);

  await axios
    .patch("/api/service", formData)
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
    .catch(() => {});

  return clientResult;
};
