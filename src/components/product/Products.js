import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../../actions/productActions";
import { Box, Image, Text, useToast } from "@chakra-ui/react";
import Loader from "../layout/Loader";
import { FaStar } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import Search from "../layout/Search";
import { viewAllCategories } from "../../actions/categoryActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { keyword } = useParams();
  const [category, setCategory] = useState("");

  const { loading, products, error } = useSelector(
    (state) => state.allProducts
  );
  const { categories } = useSelector((state) => state.allCategories);
  // console.log("catALll", categories)
  const handleError = (message) => {
    toast({
      title: "Error!",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(getAllProducts(keyword, category));
    dispatch(viewAllCategories());
    if (error) {
      handleError(error);
    }

    console.log("keyword", keyword);
    console.log("category", category);
  }, [dispatch, error, keyword, category]);

  const SingleProductHandler = (id) => {
    navigate(`/showSingleProduct/${id}`);
  };

  const cards = [
    {
      image: "https://i.postimg.cc/bP622dfV/1.png",
    },
    {
      image: "https://i.postimg.cc/kqSVZc6L/2.png",
    },
    {
      image: "https://i.postimg.cc/7xHf5rsy/3.png",
    },
    {
      image: "https://i.postimg.cc/t9tsR4z5/8.png",
    },
    {
      image: "https://i.postimg.cc/gdQXN5Jv/5.png",
    },
  ];

  const settings = {
    // dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    centerPadding: "60px",
  };

  const settingCategories = {
    // dots: true,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 6,
    // swipeToSlide: true,
    slidesPerRow: 1,
  };

  return (
    <div className="flex-1 bg-zinc-100">
      <div className="slider-container">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height="420"
              backgroundSize="contain"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundImage={`url(${card.image})`}
              width="100%"
            ></Box>
          ))}
        </Slider>
      </div>

      <div className="sm:px-24">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex-1 p-5 space-y-6">
            <Box className="space-x-4 hidden md:block bg-white">
              <Search />
            </Box>
            <div className="">
              <div>
                <h4 className="text-2xl font-bold">Categories</h4>
              </div>
              <Slider {...settingCategories}>
                {categories.map((category) => (
                  <a
                    className="m-3"
                    style={{ cursor: "pointer" }}
                    key={category._id}
                    onClickCapture={() => setCategory(category._id)}
                  >
                    <div className="flex flex-row items-center bg-white py-2 px-5 rounded-xl shadow w-fit">
                      {category.images && (
                        <img
                          src={category.images.url}
                          alt={category.name}
                          className="w-12 h-12 mr-2 rounded-xl"
                        />
                      )}
                      <span>{category.name}</span>
                    </div>
                  </a>
                ))}
              </Slider>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-6 md:grid-cols-3 gap-4 mt-5">
              {/* <div className="mt-5">
                <h4 className="mb-3">Categories</h4>
                <ul className="pl-0">
                  {categories.map((category) => (
                    <li
                      style={{ cursor: "pointer", listStyleType: "none" }}
                      key={category._id}
                      onClick={() => setCategory(category._id)}
                    >
                      <div className="flex items-center">
                        {category.images && (
                          <img
                            src={category.images.url}
                            alt={category.name}
                            className="w-8 h-8 mr-2 rounded-full"
                          />
                        )}
                        <span>{category.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}

              {products
                .filter((product) => product.category !== null && product.category === category)
                .map((product) => (
                  <Box className="bg-white border hover:scale-105 rounded transition delay-150 duration-300 ease-in-out " key={product._id}>
                    {product.images && product.images[0] && (
                      <Link
                        to={`/showSingleProduct/${product._id}`}
                        className="relative items-center justify-center"
                      >
                        <Image
                        src={product.images[0].url}
                        alt={`Picture of ${product.name}`}
                        objectFit="cover"
                        className={product.stock <= 0 ? "grayscale" : ""}
                        height="250"
                        width="100%"
                        />
                        {product.stock <= 0 && (
                          <Image
                            src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-out-of-stock-supply-exhausted-concept-vector-png-image_14991028.png"
                            alt={`Picture of ${product.name}`}
                            className="absolute inset-0"
                          />
                        )}
                      </Link>
                    )}
                    <div className="px-3 mt-2 h-32">
                      <div className="flex flex-row justify-between items-center">
                        <Text fontSize="md" color="gray.500">
                          <div className="flex-row flex items-center space-x-1">
                            <Box className="flex flex-row items-center">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  color={
                                    index + 1 <= product.ratings
                                      ? "#FCCD00"
                                      : "gray.300"
                                  }
                                />
                              ))}
                            </Box>
                          </div>
                        </Text>
                      </div>
                      <p className="font-bold text-lg">{product.name}</p>
                      <p className="line-clamp-3 text-xs">
                        {product.description}
                      </p>
                    </div>
                    <div className="px-3">
                      <div className="flex flex-row justify-between items-center border-t py-3">
                        <p className="text-red-500 text-lg font-bold">
                          ₱{product.price.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          className={
                            product.stock > 0
                              ? "items-center justify-center bg-red-500 text-white font-semibold rounded-full px-3 p-2"
                              : "items-center justify-center bg-zinc-500 text-white font-semibold rounded-full px-3 p-2"
                          }
                          onClick={() => SingleProductHandler(product._id)}
                        >
                          {product.stock > 0 ? (
                            <Text className="flex flex-row items-center">
                              <p>+ </p>
                              <CgShoppingCart />
                            </Text>
                          ) : (
                            <Text className="flex flex-row items-center">
                              OUT OF STOCK
                            </Text>
                          )}
                        </button>
                      </div>
                    </div>
                  </Box>
                ))}


            </div>
            <h4 className="text-2xl font-bold">Products</h4>
            {products.length > 0 ? (
              <Fragment>
                <div className="grid grid-cols-1 xl:grid-cols-6 md:grid-cols-3 gap-4 mt-5">
                {products.map((product) => (
                  <a
                    className="bg-white border  rounded hover:scale-105 transition delay-150 duration-300 ease-in-out "
                    key={product._id}
                  >
                    {product.images && product.images[0] && (
                      <Link
                        to={`/showSingleProduct/${product._id}`}
                        className="relative items-center justify-center"
                      >
                        <Image
                          src={product.images[0].url}
                          alt={`Picture of ${product.name}`}
                          className={product.stock <= 0 ? "grayscale" : ""}
                          objectFit="cover"
                          height="250"
                          width="100%"
                        />
                        {product.stock <= 0 && (
                          <Image
                            src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-out-of-stock-supply-exhausted-concept-vector-png-image_14991028.png"
                            alt={`Picture of ${product.name}`}
                            className="absolute inset-0"
                          />
                        )}
                      </Link>
                    )}
                    <div className="px-3 mt-2 h-28">
                      <div className="flex flex-row justify-between items-center">
                        <Text fontSize="md" color="gray.500">
                          <div className="flex-row flex items-center space-x-1">
                            <Box className="flex flex-row items-center">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  color={
                                    index + 1 <= product.ratings
                                      ? "#FCCD00"
                                      : "gray.300"
                                  }
                                />
                              ))}
                            </Box>
                          </div>
                        </Text>
                      </div>
                      <p className="font-bold text-lg">{product.name}</p>
                      <p className="line-clamp-2">{product.description} </p>
                    </div>
                    <div className="px-3">
                      <div className="flex flex-row justify-between items-center border-t py-2">
                        <p className="text-red-500 text-lg font-bold">
                          ₱{product.price.toFixed(2)}
                        </p>
                        {/* <button
                          type="button"
                          className={
                            product.stock > 0
                              ? "items-center justify-center bg-red-500 text-white font-semibold rounded-full px-3 p-2"
                              : "items-center justify-center bg-zinc-500 text-white font-semibold rounded-full px-3 p-2"
                          }
                          onClick={() => SingleProductHandler(product._id)}
                        >
                          {product.stock > 0 ? (
                            <Text className="flex flex-row items-center">
                              <p>+ </p>
                              <CgShoppingCart />
                            </Text>
                          ) : (
                            <Text className="flex flex-row items-center">
                              OUT OF STOCK
                            </Text>
                          )}
                        </button> */}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              </Fragment>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="font-bold text-lg">No Product</p>
                <p>We can't find any item matching your search</p>
              </div>
            )}


            
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
