import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SimpleButton } from "../../common/buttons";
import AddOrEditProductCategory from "./AddOrEditProductCategory";
import { getCategories } from "../../api/category";
import { PageLoader } from "../../common/loader";
import CategoryDataTable from "../../ui/table/CategoryDataTable";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const ProductCategory = (props) => {
  const [message, setMessage] = useState(() => props?.location?.state?.message);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [mounted, setMounted] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage("");
  };

  useEffect(() => {
    const asyncGetCategories = async () => {
      const categories = await getCategories();
      setLoading(false);

      if (mounted) {
        setCategories(categories);
      }
    };

    loading && asyncGetCategories();
  }, [loading, mounted]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <div>
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
        <div>
          {type !== "" && (
            <AddOrEditProductCategory
              type={type}
              category={activeCategory}
              setMessage={setMessage}
              handleClose={() => {
                window.scrollTo(0, 0);
                setLoading(true);
                setType("");
              }}
            />
          )}
          <div>
            {type === "" && (
              <div>
                <div className="flex justify-end pb-4">
                  <SimpleButton
                    label="Add Category"
                    handleClick={() => setType("add")}
                  />
                </div>

                {categories.length > 0 && (
                  <CategoryDataTable
                    categories={categories}
                    setLoading={setLoading}
                    setActiveCategory={setActiveCategory}
                    setMessage={setMessage}
                    setType={() => setType("edit")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
