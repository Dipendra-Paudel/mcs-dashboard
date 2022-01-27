import axios from "axios";
const frontendToken = process.env.REACT_APP_FRONTEND_TOKEN;

export const getAllContacts = async () => {
  let result = {};

  await axios
    .post(`/api/contact/all-contacts`, {
      frontendToken,
    })
    .then((res) => {
      const { status, data } = res.data;
      if (status === "success") {
        result = {
          ...data,
        };
      }
    })
    .catch(() => {});

  return result;
};

export const deleteContacts = async (contacts) => {
  const clientResult = {};

  await axios
    .delete("/api/contact", { data: { contacts, frontendToken } })
    .then((res) => {
      const { status, message } = res.data;
      clientResult.message = message;
      clientResult.status = status;
    })
    .catch(() => {});

  return clientResult;
};
