import axios from "axios";
const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const verifyToken = async () => {
  const clientResult = {};

  await axios
    .post("/api/user/verify-token", { frontendToken })
    .then((res) => {
      const { status, user } = res.data;
      clientResult.status = status;
      status === "success" &&
        (clientResult.username = `${user.firstName} ${user.lastName}`);
    })
    .catch(() => {});

  return clientResult;
};

export const login = async (data) => {
  const clientResult = {};

  await axios
    .post("/api/user/login", { ...data, frontendToken })
    .then((res) => {
      const result = res.data;
      const { status, message, errors, username, token } = result;

      // Handle all errors
      if (status !== "success") {
        message && (clientResult.error = message);
        errors && (clientResult.errors = errors);
      } else {
        clientResult.status = "success";
        clientResult.username = username;
        localStorage.setItem("token", token);
      }
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;

        if (typeof data === "string") {
          clientResult.error = data;
        } else {
          clientResult.error =
            data?.message || "Somwthing went wrong. Please try again later";
        }
      }
    });

  return clientResult;
};

export const logout = async () => {
  const clientResult = {};

  await axios
    .post("/api/user/logout", { frontendToken })
    .then((res) => {
      const { status } = res.data;
      if (status === "success") {
        clientResult.status = status;
        localStorage.removeItem("token");
      } else {
        clientResult.message =
          "Sorry! Something went wrong while logging out of your account";
      }
    })
    .catch((error) => {
      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          window.location = "/login";
        }
      }
    });

  return clientResult;
};

export const changePassword = async (data) => {
  let response;

  await axios
    .patch("/api/user/change-password", { ...data, frontendToken })
    .then((res) => {
      const result = res.data;
      response = result;
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response;
        if (data?.message) {
          response.status = "fail";
          response.message = data.message;
        }
      }
    });

  return response;
};

export const getAllUsers = async (page, pageLimit) => {
  let result = {};

  await axios
    .post(`/api/user/all?page=${page}&limit=${pageLimit}`, { frontendToken })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success") {
        result = { ...data };
      }
    })
    .catch(() => {});

  return result;
};
