import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBrand,
  getBrandDetails,
  clearErrors,
} from "../../actions/brandActions";
import { UPDATE_BRANDS_RESET } from "../../constants/brandConstants";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";

const UpdateBrand = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const { error, isUpdated } = useSelector((state) => state.adminBrand);
  const { brand } = useSelector((state) => state.brandDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    if (brand && brand._id !== id) {
      dispatch(getBrandDetails(id));
    } else {
      setName(brand.name);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("Brand updated successfully");
      dispatch({ type: UPDATE_BRANDS_RESET });
      navigate("/admin/view/all/brands");
    }
  }, [dispatch, error, navigate, isUpdated, brand, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    dispatch(updateBrand(brand._id, formData));
  };
  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
      <MetaData  title={'Update brand'} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              Update Brand
            </Text>
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" width="full">
                  Update Brand
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/admin/view/all/brands", { replace: true })
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

export default UpdateBrand;
