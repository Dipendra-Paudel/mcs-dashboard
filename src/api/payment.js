import axios from "axios";

const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const getPaymentHistory = async (page, pageLimit) => {
  let result = {};

  await axios
    .post(`/api/payment/all-payments?page=${page}&limit=${pageLimit}`, {
      frontendToken,
    })
    .then((res) => {
      result = res.data || {};
    })
    .catch(() => {});

  return result;
};

export const getIndividualPayment = async (id) => {
  let result = {};

  await axios
    .post(`/api/payment/detail`, {
      id,
      frontendToken,
    })
    .then((res) => {
      result = res.data || {};
    })
    .catch(() => {});

  return result;
};

export const completeOrder = async (id, otp) => {
  const result = {};

  await axios
    .patch("/api/payment/complete-order", { id, otp, frontendToken })
    .then(async (res) => {
      const { status } = res.data;
      result.status = status;
    })
    .catch((error) => {
      result.status = "fail";
    });

  return result;
};

export const sendOtp = async (userId, paymentId) => {
  const result = {};

  await axios
    .post("/api/payment/send-otp", { userId, paymentId, frontendToken })
    .then(async (res) => {
      const { status } = res.data;
      result.status = status;
    })
    .catch((error) => {
      result.status = "fail";
    });

  return result;
};
