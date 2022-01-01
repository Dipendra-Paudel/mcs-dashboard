import React, { useState, useEffect } from "react";
import { SimpleButton } from "../../common/buttons";
import AddOrEditService from "./addOrEditService";
import ServiceCard from "../../common/serviceCard";
import { getServices, deleteService } from "../../api/service";
import ConfirmationPopup from "../../common/confirmationPopup";
import AlertMessage from "../../common/alertMessage";
import Pagination from "../../common/Pagination";
import { PageLoader } from "../../common/Loader";

const Service = () => {
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [totalServices, setTotalServices] = useState(0);
  const [page, setPage] = useState(1);
  const pageLimit = 6;

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
    }

    setConfirmationPopup(false);
    setActiveService("");
  };

  useEffect(() => {
    const asyncGetServices = async () => {
      setLoading(true);
      const { services, totalServices } = await getServices(page, pageLimit);

      if (services && mounted) {
        setServices(services);
        setTotalServices(totalServices);
      } else {
        if (page > 1) {
          setPage((p) => p - 1);
          setLoading(true);
        }
      }
      setLoading(false);

      setServices(services);
    };

    loading && asyncGetServices();
  }, [loading, page, mounted]);

  useEffect(() => {
    if (popup) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [popup]);

  if (loading) {
    return (
      <div className="grid place-items-center h-96">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {popup !== "" && (
        <AddOrEditService
          type={popup === "addService" ? "add" : "edit"}
          handleClose={() => setPopup("")}
          service={activeService}
          setLoading={setLoading}
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
          handleClose={() => {
            setFinalMessage("");
            setLoading(true);
          }}
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
        <div>
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
          {totalServices / pageLimit > 1 && (
            <div className="py-10">
              <Pagination
                activePage={page}
                setActivePage={(page) => {
                  setPage(page);
                  setLoading(true);
                }}
                totalItems={totalServices}
                numberOfItemsToDisplayInAPage={pageLimit}
                handleScroll={() => window.scrollTo(0, 0)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Service;
