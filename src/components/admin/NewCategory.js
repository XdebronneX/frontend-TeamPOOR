import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createCategory, clearErrors } from "../../actions/categoryActions";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const { loading, error, success } = useSelector((state) => state.newCategory);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (success) {
      successMsg("Category Created Successfully");
      dispatch({ type: CREATE_CATEGORY_RESET });
      navigate("/admin/view/all/category");
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("images", images);

    dispatch(createCategory(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "images") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(reader.result);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setName(e.target.value);
    }
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Create category "} />
        <div className="flex flex-1 justify-center items-start shadow-sm">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              New Category
            </Text>
            <form
              onSubmit={handleSubmit(submitHandler)}
              encType="multipart/form-data"
            >
              <FormControl mb={4}>
                <FormLabel htmlFor="name_field">Name</FormLabel>
                <Input
                  type="text"
                  id="name_field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="images"
                  accept="images/*"
                  onChange={onChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Fragment>
    </aside>
  );
};

export default NewCategory;
