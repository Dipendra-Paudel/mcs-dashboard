export const getAllContacts = async (page, pageLimit) => {
  let result = {};

  await fetch(`/api/contact/all-contacts?page=${page}&limit=${pageLimit}`)
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      const { status, data } = await res.json();
      if (status === "success") {
        result = {
          ...data,
        };
      }
    })
    .catch(() => {});

  return result;
};

export const deleteContact = async (id) => {
  const clientResult = {};

  await fetch("/api/contact", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then(async (res) => {
      if (res.status === 401) {
        window.location = "/";
      }
      if (res.status === 204) {
        clientResult.message = "Successfully deleted the contact";
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
