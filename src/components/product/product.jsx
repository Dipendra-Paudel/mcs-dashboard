import React, { useState, useEffect } from "react";
import { SimpleButton } from "../../common/buttons";
import AddOrEditProduct from "./addOrEditProduct";
import ProductCard from "../../common/productCard";
import { getProducts, deleteProduct } from "../../api/product";
import ConfirmationPopup from "../../common/confirmationPopup";
import AlertMessage from "../../common/alertMessage";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [fetch, setFetch] = useState(true);

  const handleProductAddButtonClick = () => {
    setPopup("addProduct");
    setActiveProduct("");
  };

  const handleEditButtonClick = (product) => {
    setPopup("editProduct");
    setActiveProduct(product);
  };

  const handleDeleteButtonClick = (product) => {
    setConfirmationPopup(true);
    setActiveProduct(product);
  };

  const handleDeleteConfirmation = async (action) => {
    if (action === "delete") {
      // call the api to delete the selected product
      setDeleting(true);
      const { message, error } = await deleteProduct(activeProduct._id);
      setConfirmationPopup(false);
      setDeleting(false);
      setFinalMessage(message || error);
      setFetch(true);
    }

    setConfirmationPopup(false);
    setActiveProduct("");
  };

  useEffect(() => {
    const asyncGetProducts = async () => {
      const products = await getProducts();
      setProducts(products);

      setLoading(false);
      setFetch(false);
    };

    fetch && asyncGetProducts();
  }, [fetch]);

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
          product={activeProduct}
          setFetch={(val) => setFetch(val)}
        />
      )}
      {confirmationPopup && (
        <ConfirmationPopup
          question={`Are you sure that you want to delete ${activeProduct.productName} ?`}
          deleting={deleting}
          handleClick={handleDeleteConfirmation}
        />
      )}
      {finalMessage && (
        <AlertMessage
          message={finalMessage}
          handleClose={() => setFinalMessage("")}
        />
      )}
      <div className="flex justify-end">
        <SimpleButton
          label="Add Product"
          handleClick={handleProductAddButtonClick}
        />
      </div>

      {/* List of All the Products */}
      {loading && <div className="mt-6">Getting Products ...</div>}
      {products.length === 0 && !loading && (
        <div className="mt-6">No Products Found. Please add some products</div>
      )}
      {!loading && products.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              handleEdit={() => handleEditButtonClick(product)}
              handleDelete={() => handleDeleteButtonClick(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
