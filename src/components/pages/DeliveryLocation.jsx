import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SimpleButton } from "../../common/buttons";
import { PageLoader } from "../../common/loader";
import AddOrEditDeliveryLocation from "./AddOrEditDeliveryLocation";
import { getDeliveryLocations } from "../../api/deliveryLocation";
import DeliveryLocationDataTable from "../../ui/table/DeliveryLocationDataTable";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const DeliveryLocation = (props) => {
  const [message, setMessage] = useState(() => props?.location?.state?.message);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeDeliveryLocation, setActiveDeliveryLocation] = useState("");
  const [mounted, setMounted] = useState(true);
  const [locations, setLocations] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };

  useEffect(() => {
    const asyncGetLocations = async () => {
      const locations = await getDeliveryLocations();
      setLoading(false);

      if (mounted) {
        setLocations(locations);
      }
    };

    loading && asyncGetLocations();
  }, [loading, mounted]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  console.log(locations);

  return (
    <div>
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
        <div>
          {type !== "" && (
            <AddOrEditDeliveryLocation
              type={type}
              deliveryLocation={activeDeliveryLocation}
              setMessage={setMessage}
              handleClose={() => {
                window.scrollTo(0, 0);
                setLoading(true);
                setType("");
              }}
            />
          )}
          <div>
            {type === "" && (
              <div>
                <div className="flex justify-end pb-4">
                  <SimpleButton
                    label="Add Delivery Location"
                    handleClick={() => setType("add")}
                  />
                </div>

                {locations.length > 0 && (
                  <DeliveryLocationDataTable
                    deliveryLocations={locations}
                    setLoading={setLoading}
                    setActiveDeliveryLocation={setActiveDeliveryLocation}
                    setMessage={setMessage}
                    setType={() => setType("edit")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocation;
