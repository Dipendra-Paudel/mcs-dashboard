export const verifyToken = async () => {
  const clientResult = {};
  await fetch("/api/user/verify-token/admin", {
    method: "POST",
  })
    .then(async (res) => {
      const { status, username } = await res.json();
      clientResult.status = status;
      status && (clientResult.username = username);
    })
    .catch(() => {});

  return clientResult;
};

export const login = async (data) => {
  const clientResult = {};
  await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, role: "admin" }),
  })
    .then(async (res) => {
      if (res.status === 429) {
        clientResult.error =
          "Too many requests from this IP. Please try again later";
        return "";
      }

      const result = await res.json();
      const { status, message, errors } = result;

      // Handle all errors
      if (status !== "success") {
        message && (clientResult.error = message);
        errors && (clientResult.errors = errors);
      } else {
        clientResult.status = "success";
      }
    })
    .catch((err) => {
      clientResult.error = "Something went wrong. Please try again later";
    });

  return clientResult;
};

export const logout = async () => {
  const clientResult = {};
  await fetch("/api/user/logout", {
    method: "POST",
  })
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }

      const result = await res.json();
      const { status } = result;
      if (status === "success") {
        clientResult.status = status;
      } else {
        clientResult.message =
          "Sorry! Something went wrong while logging out of your account";
      }
    })
    .catch((err) => {});

  return clientResult;
};

export const changePassword = async (data) => {
  let response;
  await fetch("/api/user/change-password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      const result = await res.json();
      response = result;
    })
    .catch(() => {});

  return response;
};

export const getAllUsers = async (page, pageLimit) => {
  let result = {};

  await fetch(`/api/user/all?page=${page}&limit=${pageLimit}`)
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      const { status, data } = await res.json();
      if (status === "success") {
        result = { ...data };
      }
    })
    .catch(() => {});

  return result;
};
