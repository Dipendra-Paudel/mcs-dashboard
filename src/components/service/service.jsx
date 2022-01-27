import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SimpleButton } from "../../common/buttons";
import AddOrEditService from "./addOrEditService";
import { getServices } from "../../api/service";
import { PageLoader } from "../../common/loader";
import ServiceDataTable from "../../ui/table/ServiceDataTable";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const Service = () => {
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const asyncGetServices = async () => {
      setLoading(true);
      const { services } = await getServices("all");
      if (services && mounted) {
        setServices(services);
      }
      setLoading(false);
    };

    loading && asyncGetServices();
  }, [loading, mounted]);

  return (
    <React.Fragment>
      {loading && (
        <div className="grid place-items-center h-96">
          <PageLoader />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={message ? true : false}
        message={message}
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        onClose={() => setMessage("")}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      {!loading && (
        <React.Fragment>
          {type !== "" && (
            <AddOrEditService
              type={type}
              service={activeService}
              handleClose={() => {
                window.scrollTo(0, 0);
                setLoading(true);
                setType("");
              }}
              setMessage={setMessage}
            />
          )}

          {type === "" && (
            <React.Fragment>
              <div className="flex justify-end pb-4">
                <SimpleButton
                  label="Add Service"
                  handleClick={() => setType("add")}
                />
              </div>

              {/* List of All the Services */}
              {loading && <div className="mt-6">Getting Services ...</div>}
              {services.length === 0 && !loading && (
                <div className="mt-6">
                  No Services Found. Please add some services
                </div>
              )}
              {!loading && services.length > 0 && (
                <ServiceDataTable
                  setLoading={setLoading}
                  services={services}
                  setActiveService={setActiveService}
                  setMessage={setMessage}
                  setType={() => setType("edit")}
                />
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Service;
