import React, { useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Loader } from "../../../common/loader";
import { completeOrder, sendOtp } from "../../../api/payment";

const OtpAndConfirmation = ({ _id, user, status, setStatus }) => {
  const [completingPayment, setCompletingPayment] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [isOtpCodeSent, setIsOtpCodeSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOtpChange = (event) => {
    const value = event.target.value;
    // eslint-disable-next-line
    if (+value === +value && value.length < 7) {
      setOtp(value);
    }
  };

  const sendOtpCode = async () => {
    if (!sendingOtp && !completingPayment) {
      setSendingOtp(true);

      const { status } = await sendOtp(user, _id);

      setSendingOtp(false);

      if (status === "success") {
        setIsOtpCodeSent(true);
      }
    }
  };

  const completeCustomerOrder = async (event) => {
    event.preventDefault();

    if (!completingPayment) {
      setCompletingPayment(true);

      const { status } = await completeOrder(_id, otp);

      setCompletingPayment(false);

      if (status === "success") {
        setStatus("complete");
      }
    }
  };
  return (
    <div className="my-8" style={{ maxWidth: "400px" }}>
      {status === "pending" && (
        <div>
          {!isOtpCodeSent && (
            <button
              className={`text-white w-32 h-10 flex items-center justify-center p-2 rounded font-semibold ${
                sendingOtp
                  ? "cursor-wait bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-400"
              }`}
              onClick={sendOtpCode}
            >
              {sendingOtp ? <Loader /> : "Send Otp"}
            </button>
          )}

          {isOtpCodeSent && (
            <div>
              <form onSubmit={completeCustomerOrder} className="flex space-x-2">
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter otp code"
                  className="border px-2 border-gray-300 focus:border-gray-400 flex-1"
                />
                <button
                  className={`text-white w-32 h-10 flex items-center justify-center p-2 rounded font-semibold ${
                    completingPayment
                      ? "cursor-wait bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-400"
                  }`}
                >
                  {completingPayment ? <Loader /> : "Verify Otp"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {status === "complete" && (
        <div
          className="text-lg font-semibold flex items-center space-x-4"
          style={{ color: "green" }}
        >
          <div>Order Complete</div>
          <div>
            <DoneAllIcon style={{ color: "green" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpAndConfirmation;
