import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ slug = "something", serviceName, price, image }) => {
  return (
    <Link to={slug} className="rounded-lg overflow-hidden shadow-xl">
      <div>
        <img
          src={image}
          alt={serviceName}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-3 space-y-2">
        <div className="text-xl font-semibold">{serviceName}</div>

        <div className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum cum
          repellat.
        </div>
        <div className="text-lg font-semibold">Rs. {price}</div>
      </div>
    </Link>
  );
};

export default ServiceCard;
