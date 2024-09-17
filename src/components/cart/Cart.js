import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  autoremoveItemFromCart,
} from "../../actions/cartActions";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  CloseButton,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Empty from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.stock === 0) {
        setNotificationMessage(
          "One or more items in your cart are out of stock."
        );
        setTimeout(() => setNotificationMessage(null), 10000);
        dispatch(autoremoveItemFromCart(item.product));
      }
    });
  }, [cartItems, dispatch, autoremoveItemFromCart]);

  return (
    <div className="pt-4 bg-zinc-100 min-h-screen">
      {notificationMessage && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          {notificationMessage}
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setNotificationMessage(null)}
          />
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <div>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={8}
            color="gray.600"
          >
            <Empty />
          </Box>
        </div>
      ) : (
        <div
          className="container grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="col-span-2 bg-white p-3 rounded-xl space-y-3">
            <div>
              <p className="font-extrabold text-lg">My Cart</p>

              <div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-5">
                  <p className="text-zinc-500">Image</p>
                  <p className="text-zinc-500">Product Name</p>
                  <p className="text-zinc-500">Price</p>
                  <p className="text-zinc-500">Quantity</p>
                  <p className="text-zinc-500 justify-center flex">Action</p>
                </div>
              </div>
            </div>

            <div className="border-b border-zinc-200" />

            <div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <>
                    <div className="grid grid-cols-5">
                      <div>
                        <Image
                          src={item.image}
                          alt={item.name}
                          height="90px"
                          width="115px"
                          objectFit="contain"
                        />
                      </div>

                      <div>
                        <Link to={`/showSingleProduct/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div>
                        <p>
                          ₱{" "}
                          {item.price?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <div>
                        <Flex align="center">
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            <FiMinus />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            readOnly
                            size="sm"
                            w="40px"
                            mx={2}
                            textAlign="center"
                          />
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            <FiPlus />
                          </Button>
                        </Flex>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          id="delete_cart_item"
                          colorScheme="red"
                          size="sm"
                          onClick={() => removeCartItemHandler(item.product)}
                        >
                          <FiTrash2 />
                        </Button>
                      </div>
                    </div>

                    <div className="border-b border-zinc-100" />
                  </>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className=" bg-white justify-center rounded-xl p-3 space-y-4">
              <div>
                <p className="font-bold text-xl">Order Summary</p>
              </div>

              <div className="border-b border-zinc-200" />

              <div className="space-y-2">
                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Total Item's:</p>
                  <p className="font-semibold">
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Grand Total:</p>
                  <p className="font-semibold">
                    ₱
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="border-b border-zinc-200" />

              <Button
                id="checkout_btn"
                colorScheme="red"
                onClick={checkoutHandler}
                size="md"
                className="btn-block"
              >
                Check out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
