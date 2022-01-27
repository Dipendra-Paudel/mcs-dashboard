import React, { useState, useEffect } from "react";
import { getAllContacts } from "../../api/contact";
import { PageLoader } from "../../common/loader";
import ContactDataTable from "../../ui/table/ContactDataTable";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      const { contacts } = await getAllContacts("all");
      setLoading(false);
      if (contacts && contacts.length > 0) {
        setContacts(contacts);
      }
    };

    loading && getContacts();
  }, [loading]);

  if (loading) {
    return (
      <div className="grid place-items-center h-96">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {contacts.length > 0 && (
        <ContactDataTable contacts={contacts} setLoading={setLoading} />
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
