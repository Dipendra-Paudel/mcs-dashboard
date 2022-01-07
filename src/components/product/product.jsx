import React, { useState, useEffect } from "react";
import { SimpleButton } from "../../common/buttons";
import AddOrEditProduct from "./addOrEditProduct";
import ProductCard from "../../common/productCard";
import { getProducts, deleteProduct } from "../../api/product";
import ConfirmationPopup from "../../common/confirmationPopup";
import AlertMessage from "../../common/alertMessage";
import Pagination from "../../common/Pagination";
import { PageLoader } from "../../common/loader";

const Product = () => {
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const pageLimit = 6;

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
    }

    setConfirmationPopup(false);
    setActiveProduct("");
  };

  useEffect(() => {
    const asyncGetProducts = async () => {
      const { products, totalProducts } = await getProducts(page, pageLimit);
      setLoading(false);

      if (products && mounted) {
        setProducts(products);
        setTotalProducts(totalProducts);
      } else {
        if (page > 1) {
          setPage((p) => p - 1);
          setLoading(true);
        }
      }
    };

    loading && asyncGetProducts();
  }, [loading, mounted, page]);

  useEffect(() => {
    if (popup) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("html")[0].style.overflow = "auto";
    }
  }, [popup]);

  if (loading) {
    return (
      <div className="grid place-items-center h-96">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {popup !== "" && (
        <AddOrEditProduct
          type={popup === "addProduct" ? "add" : "edit"}
          handleClose={() => setPopup("")}
          product={activeProduct}
          setLoading={setLoading}
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
          handleClose={() => {
            setFinalMessage("");
            setLoading(true);
          }}
        />
      )}
      <div className="flex justify-end">
        <SimpleButton
          label="Add Product"
          handleClick={handleProductAddButtonClick}
        />
      </div>

      {/* List of All the Products */}
      {products.length === 0 && !loading && (
        <div className="mt-6">No Products Found. Please add some products</div>
      )}
      {!loading && products.length > 0 && (
        <div>
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

          {totalProducts / pageLimit > 1 && (
            <div className="py-10">
              <Pagination
                activePage={page}
                setActivePage={(page) => {
                  setPage(page);
                  setLoading(true);
                }}
                totalItems={totalProducts}
                numberOfItemsToDisplayInAPage={pageLimit}
                handleScroll={() => window.scrollTo(0, 0)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
