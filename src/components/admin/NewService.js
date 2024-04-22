import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newService, clearErrors } from "../../actions/serviceActions";
import { NEW_SERVICE_RESET } from "../../constants/serviceConstants";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  Textarea,
  Input,
  VStack,
  HStack,
  Select,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";

const NewService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newService);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("1");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/admin/view/all/services");
      message("Service created successfully");
      dispatch({ type: NEW_SERVICE_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("type", type);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newService(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Create service"} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            {" "}
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <VStack spacing={4} align="start">
                <Text fontSize="xl" fontWeight="bold">
                  New Service
                </Text>

                <FormControl>
                  <FormLabel htmlFor="name_field">Name</FormLabel>

                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="name_field">Price</FormLabel>

                  <Input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="name_field">Description</FormLabel>

                  <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Type:</FormLabel>

                  <div className="flex flex-row space-x-3">
                    <div className="flex flex-row space-x-2 items-center">
                      <input
                        type="radio"
                        name="type"
                        value="1"
                        checked={type === "1"}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <p>On site</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                      <input
                        type="radio"
                        name="type"
                        value="2"
                        checked={type === "2"}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <p htmlFor="type2">Home service</p>
                    </div>
                    <div className="flex flex-row space-x-2 items-center">
                      <input
                        type="radio"
                        name="type"
                        value="3"
                        checked={type === "3"}
                        onChange={(e) => setType(e.target.value)}
                      />
                      <p htmlFor="type3">Home service & onsite</p>
                    </div>
                  </div>
                </FormControl>

                <FormControl>
                  <FormLabel>Images</FormLabel>
                  <Input
                    type="file"
                    placeholder="Images"
                    onChange={onChange}
                    name="images"
                    multiple
                  />
                </FormControl>
                <HStack>
                  {imagesPreview.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index}`}
                      style={{ height: "50px", marginRight: "5px" }}
                    />
                  ))}
                </HStack>
                <Button colorScheme="blue" type="submit">
                  Create Service
                </Button>
              </VStack>
            </form>
          </div>
        </div>
      </Fragment>
    </aside>
  );
};

export default NewService;
