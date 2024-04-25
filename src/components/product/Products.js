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

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { keyword } = useParams();
  const [category, setCategory] = useState("");

  const { loading, products, error } = useSelector((state) => state.allProducts);
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
  }, [dispatch, error, keyword, category]);

  const SingleProductHandler = (id) => {
    navigate(`/showSingleProduct/${id}`);
  };

  return (
    <div className="sm:px-20">
      <Box className="space-x-4 hidden md:block">
        <Search />
      </Box>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="p-5">
          <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-5">
            <div className="mt-5">
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
            </div>
            {products && products
              .filter((product) => product.category === category)
              .map((product) => (
                <Box className="bg-white shadow rounded-xl" key={product._id}>
                  {product.stock > 0 ? (
                    <Link
                      to={`/showSingleProduct/${product._id}`}
                      className="relative items-center justify-center"
                    >
                      <Image
                        src={product.images[0].url}
                        alt={`Picture of ${product.name}`}
                        roundedTop="md"
                        loading="lazy"
                        cover="contain"
                        className={product.stock <= 0 ? "grayscale" : ""}
                      />
                      {/*{product.stock <= 0 && ( */}
                        <Image
                          src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-out-of-stock-supply-exhausted-concept-vector-png-image_14991028.png"
                          alt={`Picture of ${product.name}`}
                          className="absolute inset-0"
                        />
                      {/*)}*/}
                    </Link>
                  ) : (
                    <div className="relative items-center justify-center">
                      <Image
                        src={product.images[0].url}
                        alt={`Picture of ${product.name}`}
                        roundedTop="md"
                        loading="lazy"
                        cover="contain"
                        className="grayscale"
                      />
                      <Image
                        src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-out-of-stock-supply-exhausted-concept-vector-png-image_14991028.png"
                        alt={`Picture of ${product.name}`}
                        className="absolute inset-0"
                      />
                    </div>
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
                    <p className="line-clamp-3">{product.description} </p>
                  </div>
                  <div className="px-3">
                    <div className="flex flex-row justify-between items-center border-t py-3">
                      <p className="text-red-500 text-lg font-bold">
                        ₱{product.price.toFixed(2)}
                      </p>
                      {product.stock > 0 ? (
                        <button
                          type="button"
                          className="items-center justify-center bg-red-500 text-white font-semibold rounded-full px-3 p-2"
                          onClick={() => SingleProductHandler(product._id)}
                          pointerEvents={product.stock === 0 ? 'none' : 'auto'}
                        >
                          <Text className="flex flex-row items-center">
                            <p>+ </p>
                            <CgShoppingCart />
                          </Text>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="items-center justify-center bg-zinc-500 text-white font-semibold rounded-full px-3 p-2"
                          disabled
                        >
                          <Text className="flex flex-row items-center">
                            OUT OF STOCK
                          </Text>
                        </button>
                      )}
                    </div>
                  </div>
                </Box>
              ))}

          </div>
          <h4 className="text-2xl font-bold">Products</h4>
          {keyword ? (
            <Fragment>
              <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-5">
                {products.map((product) => (
                  <Box className="bg-white shadow rounded-xl" key={product._id}>
                    {product.images && product.images[0] && (
                      <Link
                        to={`/showSingleProduct/${product._id}`}
                        className="relative items-center justify-center"
                      >
                        <Image
                          src={product.images[0].url}
                          alt={`Picture of ${product.name}`}
                          roundedTop="md"
                          loading="lazy"
                          cover="contain"
                          className={product.stock <= 0 ? "grayscale" : ""}
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
                      <p className="line-clamp-3">{product.description} </p>
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
            </Fragment>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-5">
              {products.map((product) => (
                <Box className="bg-white shadow rounded-xl" key={product._id}>
                  {product.images && product.images[0] && (
                    <Link
                      to={`/showSingleProduct/${product._id}`}
                      className="relative items-center justify-center"
                    >
                      <Image
                        src={product.images[0].url}
                        alt={`Picture of ${product.name}`}
                        roundedTop="md"
                        loading="lazy"
                        cover="contain"
                        className={product.stock <= 0 ? "grayscale" : ""}
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
                    <p className="line-clamp-3">{product.description} </p>
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
          )}
        </div>
      )}
    </div>
  );
};

export default Products;

