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
import {
  Box,
  Button,
  Flex,
  useToast,
  Stack,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import MetaData from "../layout/MetaData";
const ProductStockList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

  const { error, loading, products } = useSelector(
    (state) => state.allProducts
  );

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      showErrorToast(error, "error");
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  const setProductData = () => {
    const data = {
      columns: [
        {
          label: "Product ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Product name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Product brand",
          field: "brand",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Edit",
          field: "edit",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      let status = "";

      if (product.stock === 0) {
        status = "Out of stock";
      } else if (product.stock <= 10) {
        status = "Low stock";
      } else {
        status = "In stock";
      }

      data.rows.push({
        id: product._id,
        name: product.name,
        brand: product.brand.name,
        stock: product.stock.toLocaleString(),
        status: (
          <Badge
            colorScheme={
              product.stock === 0
                ? "red"
                : product.stock <= 10
                ? "yellow"
                : "green"
            }
          >
            {status}
          </Badge>
        ),
        edit: (
          <Fragment>
            <Link to={`/admin/stock/${product._id}`}>
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
        <MetaData title={"Stock list"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3">
          {" "}
          <Stack>
            <Heading>All Stocks</Heading>{" "}
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

export default ProductStockList;
