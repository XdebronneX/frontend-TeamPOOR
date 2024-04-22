import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
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
import { viewAllBrands } from "../../actions/brandActions";
import { viewAllCategories } from "../../actions/categoryActions";
import MetaData from "../layout/MetaData";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { brands } = useSelector((state) => state.allBrands);
  const { categories } = useSelector((state) => state.allCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { error, isUpdated } = useSelector((state) => state.adminProduct);
  const { product } = useSelector((state) => state.productDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(viewAllBrands());
    dispatch(viewAllCategories());
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setType(product.type);
      setBrand(product.brand);
      setCategory(product.category);
      setOldImages(product.images);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/view/all/products");
    }
  }, [dispatch, error, navigate, isUpdated, product, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("type", type);
    formData.set("brand", brand);
    formData.set("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
        <MetaData title={"Update product"} />
        <div className="flex flex-1 justify-center items-start shadow-sm">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              Update Product
            </Text>
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Product name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    placeholder="Select Brand"
                    value={brand}
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
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <div className="form-group">
                  <FormLabel>Images</FormLabel>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  <div className="flex flex-row">
                    {oldImages &&
                      oldImages.map((img) => (
                        <img
                          key={img}
                          src={img.url}
                          alt={img.url}
                          className="mt-3 mr-2"
                          width="55"
                          height="52"
                        />
                      ))}
                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                </div>
                <Button type="submit" colorScheme="blue" size="lg" width="full">
                  Update Product
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/admin/view/all/products", { replace: true })
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

export default UpdateProduct;
