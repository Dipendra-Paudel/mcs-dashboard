import React, { useState, useEffect } from "react";
import { SimpleButton } from "../../common/buttons";
import AddOrEditProduct from "./addOrEditProduct";
import demoImage from "../../assets/images/logo.svg";
import ProductCard from "../../common/productCard";

const Product = () => {
  const [popup, setPopup] = useState("");
  const [products, setProducts] = useState([]);

  const handleProductAddButtonClick = () => {
    setPopup("addProduct");
  };

  const handleProductEditButtonClick = () => {
    setPopup("editProduct");
  };

  useEffect(() => {
    setProducts([
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
      {
        productName: "Laptop",
        price: 50000,
        image: demoImage,
      },
    ]);
  }, []);

  useEffect(() => {
    if (popup) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [popup]);

  return (
    <div>
      {popup !== "" && (
        <AddOrEditProduct
          type={popup === "addProduct" ? "add" : "edit"}
          handleClose={() => setPopup("")}
        />
      )}
      <div className="flex justify-end">
        <SimpleButton
          label="Add Product"
          handleClick={handleProductAddButtonClick}
        />
      </div>

      {/* List of All the Products */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            handleEdit={handleProductEditButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
