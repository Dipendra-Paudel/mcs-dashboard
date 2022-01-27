import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddOrEditProduct from "./AddOrEditProduct";
import { SimpleButton } from "../../common/buttons";
import { getProducts } from "../../api/product";
import { PageLoader } from "../../common/loader";
import ProductDataTable from "../../ui/table/ProductDataTable";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const Product = (props) => {
  const [message, setMessage] = useState(() => props?.location?.state?.message);
  const [mounted, setMounted] = useState(true);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");
  const [type, setType] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

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

  return (
    <React.Fragment>
      {loading && (
        <div className="grid place-items-center h-96">
          <PageLoader />
        </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={message ? true : false}
        message={message}
        TransitionComponent={TransitionUp}
        autoHideDuration={5000}
        onClose={() => setMessage("")}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      {!loading && (
        <>
          {type !== "" && (
            <AddOrEditProduct
              type={type}
              product={activeProduct}
              handleClose={() => {
                window.scrollTo(0, 0);
                setLoading(true);
                setType("");
              }}
              setMessage={setMessage}
            />
          )}
          {type === "" && (
            <div>
              <div className="flex justify-end pb-4">
                <SimpleButton
                  label="Add Product"
                  handleClick={() => setType("add")}
                />
              </div>

              {/* List of All the Products */}
              {products.length === 0 && !loading && (
                <div className="mt-6">
                  No Products Found. Please add some products
                </div>
              )}
              {!loading && products.length > 0 && (
                <ProductDataTable
                  setLoading={setLoading}
                  products={products}
                  setActiveProduct={setActiveProduct}
                  setMessage={setMessage}
                  setType={() => setType("edit")}
                />
              )}
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Product;
