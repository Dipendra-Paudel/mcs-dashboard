import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ProductCard = ({
  productName,
  price,
  image,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-xl bg-white">
      <div>
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}${image}`}
          alt={productName}
          className="w-full h-56"
        />
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
      <div className="absolute flex justify-end top-1 right-1 space-x-1">
        <div
          onClick={handleEdit}
          className="bg-secondary w-8 h-8 flex items-center justify-center rounded-full"
        >
          <EditIcon style={{ color: "white" }} />
        </div>
        <div
          onClick={handleDelete}
          className="bg-primary w-8 h-8 flex items-center justify-center rounded-full"
        >
          <DeleteOutlineOutlinedIcon style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
