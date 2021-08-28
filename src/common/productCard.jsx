import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const ProductCard = ({ productName, price, image, handleEdit }) => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-xl bg-white">
      <div>
        <img src={image} alt={productName} className="w-full h-56" />
      </div>
      <div className="p-3 space-y-2">
        <div className="text-xl font-semibold">{productName}</div>

        <div className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum cum
          repellat.
        </div>
        <div className="text-lg font-semibold">Rs. {price}</div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="absolute flex justify-end top-0 right-0">
        <div onClick={handleEdit}>
          <EditIcon />
        </div>
        <div>
          <DeleteOutlineOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
