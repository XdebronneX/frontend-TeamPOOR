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
import { Box, Button, Flex, useToast, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import MetaData from "../layout/MetaData";
const ProductsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

  const { error, loading, products } = useSelector(
    (state) => state.allProducts
  );
  const { isDeleted } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      showErrorToast(error, "error");
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Product deleted successfully", "success");
      navigate("/admin/view/all/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const setProductData = () => {
    const data = {
      columns: [
        {
          label: "Product ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        // {
        //     label: 'Type',
        //     field: 'type',
        //     sort: 'asc',
        // },
        {
          label: "Brand",
          field: "brand",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
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

  const showErrorToast = (message) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      position: "bottom-center",
      duration: 3000,
      isClosable: true,
    });
  };

  const showSuccessToast = (message) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      position: "bottom-center",
      duration: 3000,
      isClosable: true,
    });
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
          {!loading ? (
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
