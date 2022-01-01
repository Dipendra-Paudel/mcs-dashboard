import React, { useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteContact, getAllContacts } from "../../api/contact";
import { PageLoader } from "../../common/Loader";
import ConfirmationPopup from "../../common/confirmationPopup";
import AlertMessage from "../../common/alertMessage";
import Pagination from "../../common/Pagination";

const Contact = () => {
  const pageLimit = 10;
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [activeContact, setActiveContact] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      const { contacts, totalContacts } = await getAllContacts(page, pageLimit);
      setLoading(false);
      if (contacts && contacts.length > 0) {
        setContacts(contacts);
        setTotalContacts(totalContacts);
      } else {
        if (page > 1) {
          setPage((p) => p - 1);
          setLoading(true);
        }
      }
    };

    loading && getContacts();
  }, [page, loading]);

  const handleDeleteButtonClick = (id) => {
    setConfirmationPopup(true);
    setActiveContact(id);
  };

  const handleDeleteConfirmation = async (action) => {
    if (action === "delete") {
      // call the api to delete the selected contact
      setDeleting(true);
      const { message, error } = await deleteContact(activeContact);
      setConfirmationPopup(false);
      setDeleting(false);
      setFinalMessage(message || error);
    }

    setConfirmationPopup(false);
    setActiveContact("");
  };

  if (loading) {
    return (
      <div className="grid place-items-center h-96">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {confirmationPopup && (
        <ConfirmationPopup
          question={`Are you sure that you want to delete this contact ?`}
          deleting={deleting}
          handleClick={handleDeleteConfirmation}
        />
      )}
      {finalMessage && (
        <AlertMessage
          message={finalMessage}
          handleClose={() => {
            setFinalMessage("");
            setLoading(true);
          }}
        />
      )}

      {contacts.length > 0 && (
        <div>
          <div className="contact-table">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-28">First Name</th>
                  <th className="w-28">Last Name</th>
                  <th className="w-24">Username</th>
                  <th className="w-32">Email Address</th>
                  <th className="w-36">Contact Number</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact, index) => {
                  const {
                    _id,
                    firstName,
                    lastName,
                    user,
                    email,
                    contactNumber,
                    message,
                  } = contact;
                  return (
                    <tr key={index}>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{user?.username}</td>
                      <td>{email}</td>
                      <td>{contactNumber}</td>
                      <td>{message}</td>
                      <td>
                        <div className="text-center">
                          <DeleteOutlineOutlinedIcon
                            className="text-primary cursor-pointer"
                            onClick={() => handleDeleteButtonClick(_id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalContacts / pageLimit > 1 && (
            <div className="py-10">
              <Pagination
                activePage={page}
                setActivePage={(page) => {
                  setPage(page);
                  setLoading(true);
                }}
                totalItems={totalContacts}
                numberOfItemsToDisplayInAPage={pageLimit}
                handleScroll={() => window.scrollTo(0, 0)}
              />
            </div>
          )}
        </div>
      )}

      {contacts.length === 0 && (
        <div className="py-4 text-lg font-semibold text-gray-600">
          There are no contacts yet.
        </div>
      )}
    </div>
  );
};

export default Contact;
