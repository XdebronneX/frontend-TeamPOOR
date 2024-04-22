import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  getCategoryDetails,
  clearErrors,
} from "../../actions/categoryActions";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
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
const UpdateCategory = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const { error, isUpdated } = useSelector((state) => state.adminCategory);
  const { category } = useSelector((state) => state.categoryDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    if (category && category._id !== id) {
      dispatch(getCategoryDetails(id));
    } else {
      setName(category.name);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("Category updated successfully");
      dispatch({ type: UPDATE_CATEGORY_RESET });
      navigate("/admin/view/all/category");
    }
  }, [dispatch, error, navigate, isUpdated, category, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    dispatch(updateCategory(category._id, formData));
  };
  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Update motorcycle"} />
        <div className="flex flex-1 justify-center items-start shadow-sm">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              Update Category
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
                  Update Category
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/admin/view/all/category", { replace: true })
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

export default UpdateCategory;
