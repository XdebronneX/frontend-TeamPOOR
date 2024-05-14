import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Input,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import Loader from "../layout/Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "../review/ListReviews";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.authUser);
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  console.log("product", product);

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      notify(error);
      dispatch(success());
    }
    if (reviewError) {
      notify(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      successMsg("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, success, id]);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    successMsg("Item added!");
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);
    dispatch(newReview(formData));
  };

  const textColor = useColorModeValue("gray.900", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bg = useColorModeValue("gray.900", "gray.50");
  const color = useColorModeValue("white", "gray.900");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const starPercentage = (product.ratings / 5) * 100;
  return (
    <div className="bg-zinc-100">
      <div className="container py-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <Text color="red.500">Error: {error}</Text>
        ) : (
          <div className="p-5 shadow-md rounded bg-white">
            <div className="grid grid-cols-2 grid-rows-1 gap-10">
              <div className="">
                <Carousel
                  showThumbs={true}
                  showArrows={true}
                  autoPlay={true}
                  interval={5000}
                  transitionTime={500}
                  thumbWidth={100}
                  thumbHeight={80}
                  //   style={{
                  //     border: "1px solid #ccc",
                  //     borderRadius: "5px",
                  //     height: "65%",
                  //   }}
                >
                  {product.images &&
                    product.images.map((image) => (
                      <div
                        key={image.id}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "600px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={image.url}
                          alt={`Product Image - ${product.name}`}
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>

              <div className="flex-1 space-y-5">
                <Text className="font-semibold text-4xl">{product.name}</Text>
                <Text fontSize="xl" color="gray.500">
                  <Box display="flex" alignItems="center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={
                          index + 1 <= product.ratings ? "#FCCD00" : "gray.300"
                        }
                      />
                    ))}
                    <Box
                      width={`${starPercentage}%`}
                      height="1em"
                      overflow="hidden"
                      position="relative"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        position="absolute"
                        top="0"
                        left="0"
                      />
                    </Box>
                  </Box>
                </Text>

                <div className="flex flex-row justify-between items-center border-t py-3">
                  <Text className="text-3xl text-red-500">
                    ₱{product.price}
                  </Text>

                  <Button
                    className={
                      product.stock > 0
                        ? "py-2 bg-red-500 rounded-full w-50"
                        : "py-2 bg-zinc-500 rounded-full w-50"
                    }
                    onClick={product.stock > 0 ? addToCart : null}
                    colorScheme="#ef4444"
                    disabled={product.stock <= 0}
                  >
                    <Text className="text-white">
                      {product.stock > 0 ? "ADD TO CART" : "NOT AVAILABLE"}
                    </Text>
                  </Button>
                </div>

                <Text className="font-bold">Description</Text>
                <Text className="font-muted">{product.description}</Text>
              </div>
            </div>

            <div className="py-5 space-y-3">
              <div>
                <h4 className="font-bold text-lg">Reviews</h4>
                <p className="text-zinc-600">
                  {product?.reviews?.length || 0} comments
                </p>
              </div>

              {product.reviews && product.reviews.length > 0 && (
                <ListReviews reviews={product.reviews} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
