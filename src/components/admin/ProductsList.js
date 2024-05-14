import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Button, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";

const ProductsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, loading, products } = useSelector(
    (state) => state.allProducts
  );
  const { isDeleted } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      showErrorToast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Product deleted successfully");
      navigate("/admin/view/all/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);


  const showErrorToast = (message) => {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      position: "bottom-center",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const showSuccessToast = (message) => {
    Swal.fire({
      title: "Success",
      text: message,
      icon: "success",
      position: "bottom-center",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const deleteProductHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };

  const setProductData = () => {
    const data = {
      columns: [
        {
          label: "Product ID",
          field: "id",
          sort: "desc",
        },
        {
          label: "Name",
          field: "name",
          sort: "disabled",
        },
        {
          label: "Brand",
          field: "brand",
          sort: "disabled",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "disabled",
        },
        {
          label: "Price",
          field: "price",
          sort: "disabled",
        },
        {
          label: "Description",
          field: "description",
          sort: "disabled",
        },
        {
          label: "Edit",
          field: "edit",
          sort: "disabled",
        },
        {
          label: "Delete",
          field: "delete",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        description: product.description,
        // type: product.type,
        brand: product.brand.name,
        price: `₱ ${product.price.toLocaleString()}`,
        stock: `${product.stock.toLocaleString()}`,
        edit: (
          <Fragment>
            <Link to={`/admin/product/${product._id}`}>
              <Button
                colorScheme="blue"
                size="sm"
                ml="3"
                leftIcon={<FaPencilAlt />}
              >
                Edit
              </Button>
            </Link>
          </Fragment>
        ),
        delete: (
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              ml="3" // Adjust this value for spacing
              onClick={() => deleteProductHandler(product._id)}
              leftIcon={<FaTrashAlt />}
            >
              Delete
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title="Products list" />
        <div className="w-full bg-white rounded-xl p-3 space-y-3">
          <Stack>
            <Heading> All Products</Heading>{" "}
          </Stack>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setProductData()}
              className="px-3"
              bordered
              hover
              responsive
              noBottomColumns
            />
          )}
        </div>
      </Fragment>
    </aside>
  );
};

export default ProductsList;
