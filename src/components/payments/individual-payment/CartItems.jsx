import React from "react";

const CartItems = ({ cart }) => {
  return (
    <div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 text-gray-600">
            <th className="py-2">Product</th>
            <th>
              <div className="hidden sm:block">Brand</div>
            </th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((c, index) => {
            const { productName, brand, price, quantity } = c;

            const total = price * quantity;

            return (
              <tr
                key={index}
                className="border-b border-gray-300 py-4 text-gray-700"
              >
                <td className="py-2">{productName}</td>
                <td>
                  <div className="hidden sm:block">{brand}</div>
                </td>
                <td>Rs. {price}</td>
                <td>{quantity}</td>
                <td>Rs. {total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartItems;
