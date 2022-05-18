import axios from "axios";
const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const addDeliveryLocation = async (obj) => {
  let clientResult = {};

  await axios
    .post("/api/delivery-location", { ...obj, frontendToken })
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

export const getDeliveryLocations = async () => {
  let result = [];

  await axios
    .post("/api/delivery-location/all", {
      frontendToken,
    })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success" && data?.locations) {
        result = data.locations;
      }
    })
    .catch(() => {});

  return result;
};

export const updateDeliveryLocation = async (obj) => {
  let clientResult = {};

  await axios
    .patch("/api/delivery-location", { ...obj, frontendToken })
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

export const deleteDeliveryLocations = async (locations) => {
  const clientResult = {};

  await axios
    .delete("/api/delivery-location", { data: { locations, frontendToken } })
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
