import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { useReactToPrint } from "react-to-print";
import OrderReceipt from "./OrderReceipt";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import {
  FaTruck,
  FaCheck,
  FaBox,
  FaMoneyCheckDollar,
  FaXmark,
} from "react-icons/fa6";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { Rating } from "react-simple-star-rating";
import { newReview, getProductDetails } from "../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { getOldOrder } from "../../actions/orderActions";
import Swal from "sweetalert2";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { success: isSuccess, checkoutUrl } = useSelector(
    (state) => state.oldOrders
  );
  const { error, isUpdated } = useSelector((state) => state.adminOrders);
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order;
  const orderId = id;
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const openReviewModal = (item) => {
    setSelectedItemForReview(item);
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setSelectedItemForReview(null);
    setShowReviewModal(false);
  };

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/orders/me");
      successMsg("Order received successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId, navigate]);

  const updateOrderHandler = () => {
    const formData = new FormData();
    formData.set("orderStatus", "COMPLETED");
    dispatch(updateOrder(orderId, formData));
  };

  const cancelOrderHandler = () => {
    const formData = new FormData();
    formData.set("orderStatus", "CANCELLED");
    dispatch(updateOrder(orderId, formData));
  };

  useEffect(() => {
    if (isSuccess && checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [isSuccess, checkoutUrl]);

  const continueHandler = () => {
    dispatch(getOldOrder(id));
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const orderStatus = order.orderStatus || [];
  const sortedStatus = orderStatus.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  const latestStatus =
    sortedStatus.length > 0 ? sortedStatus[0].status : "No status";

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    // Fetch product details here
    if (selectedItemForReview) {
      dispatch(getProductDetails(selectedItemForReview.product._id));
    }
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      notify(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      successMsg("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, success, selectedItemForReview]);

  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", selectedItemForReview.product._id);
    dispatch(newReview(formData));
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const swalHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel my order!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        const formData = new FormData();
        formData.set("orderStatus", "CANCELLED");
        dispatch(updateOrder(orderId, formData));
      }
    });
  };

  return (
    <div className="bg-zinc-100 min-h-screen flex justify-center items-center">
      <div className="md:flex md:flex-row justify-between space-x-5">
        <div className="md:w-3/5 ">
          <div className="space-y-4" ref={componentRef}>
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Shipping Address</h1>
              </div>

              <div className="border-b border-zinc-200" />

              <div className="space-y-3">
                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Order No: </p>
                  <p className="font-semibold">{order._id}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Customer Name: </p>
                  <p className="font-semibold">{order.fullname}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Contact Number #: </p>
                  <p className="font-semibold">{order.phone}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Order Date:</p>
                  <p className="font-semibold">
                    {formatTimestamp(order.dateOrdered)}
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500 w-9/12">Shipping Address:</p>

                  <p className="font-semibold">
                    {order.region}, {order.province}, {order.city},{" "}
                    {order.barangay}, {order.address}, {order.postalcode}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Payment Details</h1>
              </div>
              <div className="border-b border-zinc-200" />

              <div className="flex flex-row justify-between items-center">
                <p className="text-zinc-500 w-9/12">Payment Method:</p>

                <div>
                  {order.paymentMethod === "Cash On Delivery" ? (
                    <p className="font-semibold">{order.paymentMethod}</p>
                  ) : (
                    <Image
                      src={"/images/gcash-3.png"}
                      alt="TeamPoor Logo"
                      className="rounded-xl"
                      w={100}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Order Details</h1>
              </div>

              <div className="border-b border-zinc-200" />

              <div className="space-y-3">
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item) => (
                    <>
                      <div className="flex flex-row justify-between items-start">
                        <div>
                          {item.product && item.product.images && (
                            <img
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              height="45"
                              width="65"
                            />
                          )}
                        </div>

                        <div>
                          {item.product && (
                            <Link to={`/showSingleProduct/${item.product._id}`}>
                              {item.product.name}
                            </Link>
                          )}
                        </div>

                        <div>
                          {item.product && item.product.price && (
                            <p>₱ {item.product.price.toLocaleString()}</p>
                          )}
                        </div>

                        <div>
                          {item.quantity && <p>{item.quantity} Piece(s)</p>}
                        </div>

                        <div>
                          <p>
                            <b>
                              ₱{" "}
                              {(
                                item.quantity * item.product?.price
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </b>
                          </p>
                        </div>

                        {latestStatus === "COMPLETED" && (
                          <div>
                            <Button
                              colorScheme="green"
                              onClick={() => openReviewModal(item)}
                            >
                              <p className="text-white">Review</p>
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  ))}

                <div className="border-b border-zinc-200 mt-4" />

                <div className="flex flex-row-reverse">
                  <p className="">
                    Grand Total:{" "}
                    <b>
                      ₱{" "}
                      {totalPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/5 space-y-4">
          {(latestStatus === "COMPLETED" || latestStatus === "DELIVERED" ) && (
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                {latestStatus === "COMPLETED" ? (
                  <h1 className="font-bold text-xl">E-Receipt</h1>
                ) : latestStatus === "DELIVERED" ? (
                  <h1 className="font-bold text-xl">Order Status Update</h1>
                ) : null}
              </div>

              <div className="border-b border-zinc-200" />

              {latestStatus === "COMPLETED" && (
                <button
                  className="btn btn-primary btn-block mt-3"
                  onClick={() => handlePrint()} // Use arrow function to invoke handlePrint
                >
                  <i className="fa fa-print mr-1" /> Print Receipt
                </button>
              )}

              {latestStatus === "DELIVERED" && (
                <button
                  className="btn btn-primary btn-block mt-3"
                  onClick={() => updateOrderHandler(order._id)}
                >
                  <i className="fa fa-check mr-1" /> Order Received
                </button>
              )}
            </div>
          )}

          <div>
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">
                  Your Order's Tracking History
                </h1>
              </div>

              <div className="border-b border-zinc-200" />

              <div>
                {order.orderStatus &&
                  order.orderStatus.map((status, index) => (
                    <div className="flex flex-row space-x-4 justify-start">
                      <div className="flex flex-col items-center">
                        <div className="bg-red-500 rounded-full p-2">
                          {status.status === "Pending" ? (
                            <HiClipboardDocumentCheck color="white" size={16} />
                          ) : status.status === "TOPAY" ? (
                            <FaMoneyCheckDollar color="white" size={16} />
                          ) : status.status === "TOSHIP" ? (
                            <FaBox color="white" size={16} />
                          ) : status.status === "PAID" ? (
                            <FaCheck color="white" size={16} />
                          ) : status.status === "TORECEIVED" ? (
                            <FaTruck color="white" size={16} />
                          ) : status.status === "FAILEDATTEMPT" ? (
                            <FaXmark color="white" size={16} />
                          ) : status.status === "DELIVERED" ? (
                            <FaCheck color="white" size={16} />
                          ) : status.status === "RETURNED" ? (
                            <FaXmark color="white" size={16} />
                          ) : status.status === "CANCELLED" ? (
                            <FaXmark color="white" size={16} />
                          ) : status.status === "COMPLETED" ? (
                            <FaCheck color="white" size={16} />
                          ) : null}
                        </div>
                        <div className="w-2 h-20 p-1 bg-red-500 items-center"></div>
                      </div>
                      <div>
                        {status.status === "Pending" ? (
                          <p className="font-semibold">Order placed</p>
                        ) : status.status === "TOSHIP" ? (
                          <p className="font-semibold">
                            Packed and Ready To Ship
                          </p>
                        ) : status.status === "TORECEIVED" ? (
                          <p className="font-semibold">In Transit</p>
                        ) : status.status === "DELIVERED" ? (
                          <p className="font-semibold">Delivered</p>
                        ) : status.status === "COMPLETED" ? (
                          <p className="font-semibold">Completed</p>
                        ) : (
                          ""
                        )}
                        <p className="text-zinc-500">
                          {formatTimestamp(status.timestamp)}
                        </p>
                        <p className="text-zinc-500">{status.message}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col mt-3 space-y-3">
              <Button
                colorScheme="green"
                mr={3}
                onClick={continueHandler}
                style={{
                  display: latestStatus === "TOPAY" ? "inline-block" : "none",
                }}
              >
                Pay now
              </Button>
              {(latestStatus === "PENDING" || latestStatus === "TOPAY" || latestStatus === "Pending") && (
                <Button colorScheme="red" mr={3} onClick={swalHandler}>
                  Cancel order
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Review Modal */}
        <Modal isOpen={showReviewModal} size="xl" onClose={closeReviewModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Review Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedItemForReview && (
                <div className="space-y-4">
                  <div className="flex flex-col justify-center items-center space-y-3">
                    <p className="font-bold">
                      {selectedItemForReview.product.name}
                    </p>
                    <img
                      src={selectedItemForReview.product.images[0].url}
                      alt={selectedItemForReview.product.name}
                      height="250"
                      width="250"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-row justify-center items-center">
                      <Rating
                        onClick={(value) => handleRatingChange(value)}
                        ratingValue={rating} // Pass rating value
                        size={30} // Adjust the size if needed
                        fillColor="orange" // Adjust the color of filled stars
                        emptyColor="gray" // Adjust the color of empty stars
                        strokeColor="black" // Adjust the color of star borders
                        strokeWidth={0} // Adjust the width of star borders
                        starCount={5} // Adjust the total number of stars
                        showTooltip
                        tooltipArray={[
                          "Terrible",
                          "Bad",
                          "Average",
                          "Great",
                          "Perfect",
                        ]}
                        SVGstyle={{ display: "inline" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <p>Comment</p>
                      <Textarea
                        placeholder="Insert comment here..."
                        value={comment} // Bind value to comment state
                        onChange={handleCommentChange} // Call handleCommentChange on change
                      />
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={reviewHandler}>
                Post
              </Button>
              <Button variant="ghost" onClick={closeReviewModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default OrderDetails;
