import React, { useState, useEffect } from "react";
import { SimpleButton } from "../../common/buttons";
import AddOrEditProduct from "./addOrEditProduct";
import { getProducts } from "../../api/product";
import { PageLoader } from "../../common/loader";
import ProductDataTable from "../../ui/table/ProductDataTable";

const Product = () => {
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");

  const handleProductAddButtonClick = () => {
    setPopup("addProduct");
    setActiveProduct("");
  };

  useEffect(() => {
    const asyncGetProducts = async () => {
      const { products } = await getProducts("all");
      setLoading(false);

      if (products && mounted) {
        setProducts(products);
      }
    };

    loading && asyncGetProducts();
  }, [loading, mounted]);

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
      <div className="flex justify-end pb-4">
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
        <ProductDataTable
          setLoading={setLoading}
          products={products}
          setPopup={() => setPopup("editProduct")}
          setActiveProduct={setActiveProduct}
        />
      )}
    </div>
  );
};

export default Product;
