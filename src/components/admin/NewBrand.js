import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBrands, clearErrors } from "../../actions/brandActions";
import { CREATE_BRANDS_RESET } from "../../constants/brandConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useForm } from "react-hook-form";

const NewBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newBrand);

  const { handleSubmit, register, formState: { errors } } = useForm();

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
      successMsg("Brand Created Successfully");
      dispatch({ type: CREATE_BRANDS_RESET });
      navigate("/admin/view/all/brands");
    }
  }, [dispatch, error, success, navigate, notify, successMsg]);

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("images", data.images[0].url);
    dispatch(createBrands(data));
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Create brand"} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              New Brand
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
                  {...register('name', { required: true })}
                />
                {errors.name && errors.name.type === 'required' && (
                  <Text color="red" fontSize="sm">
                    Name is required.
                  </Text>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="images"
                  accept="image/*"
                  {...register('images', { required: true })}
                />
                {errors.images && errors.images.type === 'required' && (
                  <Text color="red" fontSize="sm">
                    Image is required.
                  </Text>
                )}
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

export default NewBrand;

