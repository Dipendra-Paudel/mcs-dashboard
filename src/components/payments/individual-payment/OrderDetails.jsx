import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const OrderDetails = ({ total, selfPickUp, delivery, paid, note }) => {
  const deliveryCharge = delivery?.charge || 0;
  return (
    <div className="mt-8 text-gray-700">
      <div className="space-y-4" style={{ maxWidth: "400px" }}>
        {/* Amount */}
        <div>
          <div className="flex justify-between items-center">
            <div>Sub Total</div>
            <div>Rs. {total - deliveryCharge}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Delivery Charge</div>
            <div>Rs. {deliveryCharge}</div>
          </div>
          <div className="flex justify-between items-center border-t border-gray-400 mt-1 pt-1">
            <div>Total Amount</div>
            <div className="font-semibold">Rs. {total}</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <div>Paid</div>
            <div>
              {paid === "Completed" ? (
                <DoneAllIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>Self Pickup</div>
            <div>
              {selfPickUp ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>Delivery</div>
            <div>
              {delivery ? (
                <DoneIcon style={{ color: "green" }} />
              ) : (
                <CloseIcon style={{ color: "red" }} />
              )}
            </div>
          </div>
          {delivery && (
            <div className="flex justify-between items-center">
              <div>Delivery Location</div>
              <div>Bharatpur {delivery.ward}</div>
            </div>
          )}
        </div>
      </div>

      {/* Note */}
      <div className="pt-4">
        <div className="font-semibold">Note:</div>
        <div>
          {"==>"} {note}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
