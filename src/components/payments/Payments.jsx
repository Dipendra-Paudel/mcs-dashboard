import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { PageLoader } from "../../common/loader";
import { FetchingButton, SimpleButton } from "../../common/buttons";
import { getPaymentHistory } from "../../api/payment";

const Payments = () => {
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  const [fetchingNextPage, setFetchingNextPage] = useState(false);

  const pageLimit = 10;

  const handleRefresh = () => {
    setPage(1);
    setNextPage(false);
    setLoading(true);
  };

  useEffect(() => {
    const getPayments = async () => {
      const { status, data } = await getPaymentHistory(page, pageLimit);

      setLoading(false);
      setFetchingNextPage(false);

      if (status === "success" && mounted) {
        setNextPage(data.nextPage);
        setPayments((p) =>
          page === 1 ? data.payments || [] : [...p, ...(data.payments || [])]
        );
      }
    };

    (loading || fetchingNextPage) && getPayments();
  }, [page, loading, fetchingNextPage, mounted]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between pb-2 border-b border-gray-300">
          <div className="text-xl font-semibold text-gray-800">
            All Payments
          </div>
          <div>
            <SimpleButton label="Refresh" handleClick={handleRefresh} />
          </div>
        </div>

        {loading && (
          <div className="grid place-items-center py-20">
            <PageLoader />
          </div>
        )}

        {!loading && payments.length > 0 && (
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300 text-gray-600">
                  <th className="py-2">User</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => {
                  let { _id, user, createdAt, amount, status } = payment;

                  const date = new Date(createdAt);
                  const day = date.getDate();
                  const month = date.toLocaleString("default", {
                    month: "long",
                  });
                  const year = date.getFullYear();

                  const minutes = date.getMinutes();
                  const hours = date.getHours();

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-300 py-4 text-gray-700"
                    >
                      <td className="py-2">{`${user?.firstName} ${user?.lastName}`}</td>
                      <td>Rs. {amount / 100}</td>
                      <td>{`${day} ${month}, ${year}`}</td>
                      <td>{`${hours} : ${minutes}`}</td>
                      <td>
                        {status === "complete" ? (
                          <div className="flex items-center text-green-600 space-x-1 complete">
                            <div>
                              <DoneAllIcon />
                            </div>
                            <div>Complete</div>
                          </div>
                        ) : status === "pending" ? (
                          <div className="flex items-center text-yellow-600 space-x-1 pending">
                            <div>
                              <HourglassEmptyIcon className="text-yellow-600" />
                            </div>
                            <div>Pending</div>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600 space-x-1 cancel">
                            <div>
                              <CloseIcon />
                            </div>
                            <div>Canceled</div>
                          </div>
                        )}
                      </td>
                      <td className="w-14">
                        <div className="flex justify-center">
                          <Link
                            to={`/payments/${_id}`}
                            className="mx-auto inline-block text-gray-500 hover:text-gray-800 cursor-pointer"
                          >
                            <VisibilityOutlinedIcon />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && payments.length === 0 && (
          <div className="py-4 text-lg font-semibold text-gray-600">
            There are not any payments yet.
          </div>
        )}

        {!loading && nextPage && (
          <div className="flex justify-center mt-4">
            <FetchingButton
              label="More Payments"
              submitting={fetchingNextPage}
              handleClick={() => {
                setPage((p) => p + 1);
                setFetchingNextPage(true);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Payments;
