import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { PageLoader } from "../../../common/loader";
import CartItems from "./CartItems";
import OrderDetails from "./OrderDetails";
import DetailHead from "./DetailHead";
import { getIndividualPayment } from "../../../api/payment";
import OtpAndConfirmation from "./OtpAndConfirmation";

const IndividualPaymentPreview = (props) => {
  const orderId = props.match.params.orderId;
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const asyncGetPayment = async () => {
      const { status, data } = await getIndividualPayment(orderId);

      setLoading(false);
      if (status === "success") {
        setStatus(data?.payment?.status || "");
        setPayment(data.payment);
      }
    };

    loading && orderId && asyncGetPayment();
  }, [orderId, loading]);

  if (loading) {
    return (
      <div className="py-20 grid place-items-center">
        <PageLoader />
      </div>
    );
  }

  if (!payment) {
    return <div>Invalid Order Id</div>;
  }

  let {
    _id,
    amount,
    user,
    cart,
    selfPickUp,
    delivery,
    note,
    khaltiResponse: paid,
  } = payment;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="inline-block">
          <Link
            to="/payments"
            className="flex items-center cursor-pointer bg-secondary text-white pl-2 pr-3 py-1 rounded"
          >
            <div>
              <KeyboardDoubleArrowLeftIcon style={{ color: "white" }} />
            </div>
            <div>Go Back</div>
          </Link>
        </div>
      </div>

      <DetailHead orderId={_id} status={status} />

      <CartItems cart={cart} />
      <OrderDetails
        total={amount / 100}
        selfPickUp={selfPickUp}
        delivery={delivery}
        paid={paid}
        note={note}
      />

      <OtpAndConfirmation
        _id={_id}
        user={user}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
};

export default IndividualPaymentPreview;
