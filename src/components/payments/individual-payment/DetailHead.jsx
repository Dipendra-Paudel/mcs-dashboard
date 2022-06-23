import React from "react";

const DetailHead = ({ orderId, status }) => {
  return (
    <div className="text-gray-600 border-b border-gray-400 mb-4 pb-2">
      <div className="flex space-x-2">
        <div className="flex-shrink-0 w-20">Order Id:</div>
        <div>{orderId}</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0 w-20">Status:</div>
        <div
          className={`
            px-2 text-white rounded-full
          ${
            status === "pending"
              ? "bg-yellow-600"
              : status === "complete"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
};

export default DetailHead;
