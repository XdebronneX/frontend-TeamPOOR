import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStock,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  Select,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";

const UpdateStock = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [stock, setStock] = useState(0);

  const { error, isUpdated } = useSelector((state) => state.adminProduct);
  const { product } = useSelector((state) => state.productDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    }
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      successMsg(`${product.name} Stock updated successfully`);
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/view/all/product/stocks");
    }
  }, [dispatch, error, navigate, isUpdated, product, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("stock", stock);
    dispatch(updateStock(product._id, formData));
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Update Product Stock"} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              Update Stock
            </Text>
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" width="full">
                  Update Product
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/admin/view/all/product/stocks", {
                      replace: true,
                    })
                  }
                  colorScheme="red"
                  variant="outline"
                  size="lg"
                  width="full"
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      </Fragment>
    </aside>
  );
};

export default UpdateStock;
