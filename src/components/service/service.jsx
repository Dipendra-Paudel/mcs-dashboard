import React, { useState, useEffect } from "react";
import { SimpleButton } from "../../common/buttons";
import AddOrEditService from "./addOrEditService";
import ServiceCard from "../../common/serviceCard";
import { getServices, deleteService } from "../../api/service";
import ConfirmationPopup from "../../common/confirmationPopup";
import AlertMessage from "../../common/alertMessage";

const Service = () => {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [fetch, setFetch] = useState(true);

  const handleAddButtonClick = () => {
    setPopup("addService");
    setActiveService("");
  };

  const handleEditButtonClick = (service) => {
    setPopup("editService");
    setActiveService(service);
  };

  const handleDeleteButtonClick = (service) => {
    setConfirmationPopup(true);
    setActiveService(service);
  };

  const handleDeleteConfirmation = async (action) => {
    if (action === "delete") {
      // call the api to delete the selected service
      setDeleting(true);
      const { message, error } = await deleteService(activeService._id);
      setConfirmationPopup(false);
      setDeleting(false);
      setFinalMessage(message || error);
      setFetch(true);
    }

    setConfirmationPopup(false);
    setActiveService("");
  };

  useEffect(() => {
    const asyncGetServices = async () => {
      setLoading(true);
      const services = await getServices();
      setServices(services);

      setLoading(false);
      setFetch(false);
    };

    fetch && asyncGetServices();
  }, [fetch]);

  useEffect(() => {
    if (popup) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [popup]);

  return (
    <div>
      {popup !== "" && (
        <AddOrEditService
          type={popup === "addService" ? "add" : "edit"}
          handleClose={() => setPopup("")}
          service={activeService}
          setFetch={(val) => setFetch(val)}
        />
      )}
      {confirmationPopup && (
        <ConfirmationPopup
          question={`Are you sure that you want to delete ${activeService.serviceName} ?`}
          deleting={deleting}
          handleClick={handleDeleteConfirmation}
        />
      )}
      {finalMessage && (
        <AlertMessage
          message={finalMessage}
          handleClose={() => setFinalMessage("")}
        />
      )}
      <div className="flex justify-end">
        <SimpleButton label="Add Service" handleClick={handleAddButtonClick} />
      </div>

      {/* List of All the Services */}
      {loading && <div className="mt-6">Getting Services ...</div>}
      {services.length === 0 && !loading && (
        <div className="mt-6">No Services Found. Please add some services</div>
      )}
      {!loading && services.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              handleEdit={() => handleEditButtonClick(service)}
              handleDelete={() => handleDeleteButtonClick(service)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Service;
