import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
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
import { viewAllBrands } from "../../actions/brandActions";
import { viewAllCategories } from "../../actions/categoryActions";
import MetaData from "../layout/MetaData";
const NewProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Assuming you have a parameter for fetching data from the database
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { brands } = useSelector((state) => state.allBrands);
  const { categories } = useSelector((state) => state.allCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(viewAllBrands());
    dispatch(viewAllCategories());
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/admin/view/all/products");
      message("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("type", type);
    formData.set("brand", brand);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newProduct(formData));
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
        <MetaData title={"Add Product"} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            {" "}
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <VStack spacing={4} align="start">
                <Text fontSize="xl" fontWeight="bold">
                  New Product
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
                  <FormLabel htmlFor="name_field">Type</FormLabel>

                  <Input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="name_field">Brand</FormLabel>

                  <Select
                    placeholder="Select Brand"
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="name_field">Category</FormLabel>

                  <Select
                    placeholder="Select Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="name_field">Stock</FormLabel>

                  <Input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="name_field">Images</FormLabel>

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
                  Create Product
                </Button>
              </VStack>
            </form>
          </div>
        </div>
      </Fragment>
    </aside>
  );
};

export default NewProduct;
