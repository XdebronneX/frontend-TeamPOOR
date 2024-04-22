import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointDetails,
  updateBooking,
  clearErrors,
} from "../../../actions/appointmentActions";
import {
  FaTruck,
  FaCheck,
  FaBox,
  FaMoneyCheckDollar,
  FaXmark,
} from "react-icons/fa6";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
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
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import { useReactToPrint } from "react-to-print";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, booking = {} } = useSelector(
    (state) => state.appointmentDetails
  );
  const { error, isUpdated } = useSelector((state) => state.adminAppointment);
  const { customerInfo, bookingInfo, appointmentServices, user, totalPrice } =
    booking;
  const appointmentId = id;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState(null);
  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getAppointDetails(appointmentId));

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/appointment/list");
      // successMsg("Appointment Completed");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, appointmentId, navigate]);

  const updateBookingHandler = () => {
    const formData = new FormData();
    formData.set("appointmentStatus", "COMPLETED");
    dispatch(updateBooking(appointmentId, formData));
    successMsg("Appointment Completed");
  };

  const cancelledBookingHandler = () => {
    const formData = new FormData();
    formData.set("appointmentStatus", "CANCELLED");
    dispatch(updateBooking(appointmentId, formData));
    successMsg("Appointment Cancelled");
  };

  const appointmentStatus = booking.appointmentStatus || [];
  const sortedStatus = appointmentStatus.sort(
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

  const openReviewModal = (item) => {
    setSelectedItemForReview(item);
    setShowReviewModal(true);
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // console.log('books', booking);
  return (
    <div className="bg-zinc-100 min-h-screen flex justify-center items-center">
      <div className="md:flex md:flex-row justify-between space-x-5">
        <div className="md:w-3/5 ">
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Shipping Address</h1>
              </div>

              <div className="border-b border-zinc-200" />

              <div className="space-y-3">
                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Transaction No: </p>
                  <p className="font-semibold">{booking._id}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Customer Name: </p>
                  <p className="font-semibold">{booking.fullname}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Contact Number #: </p>
                  <p className="font-semibold">{booking.phone}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Appointment Date:</p>
                  <p className="font-semibold">
                    {formatTimestamp(booking.createdAt)}
                  </p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500 w-9/12">Shipping Address:</p>

                  <p className="font-semibold">
                    {booking.region}, {booking.province}, {booking.city},{" "}
                    {booking.barangay}, {booking.address}, {booking.postalcode}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Workspace</h1>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-zinc-500">Service Type</p>
                <p className="font-semibold">{booking.serviceType}</p>
              </div>
              <div className="border-b border-zinc-200" />
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Service Details</h1>
              </div>

              <div className="border-b border-zinc-200" />

              <div className="space-y-3">
                {booking &&
                  booking.appointmentServices &&
                  booking.appointmentServices.map((item) => (
                    <>
                      <div className="flex flex-row justify-between items-start">
                        <div>
                          {item.service && item.service.images && (
                            <img
                              src={item.service.images[0].url}
                              alt={item.service.name}
                              height="45"
                              width="65"
                            />
                          )}
                        </div>

                        <div>
                          {item.service && (
                            <Link to={`/showSingleService/${item.service._id}`}>
                              {item.service.name}
                            </Link>
                          )}
                        </div>

                        <div>
                          {item.service && item.service.price && (
                            <p>${item.service.price}</p>
                          )}
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
                    Grand Total: <b>₱{totalPrice?.toFixed(2)}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/5 space-y-4">
          {(latestStatus === "COMPLETED" || latestStatus === "DELIVERED") && (
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
                  onClick={() => updateBookingHandler(booking._id)}
                >
                  <i className="fa fa-check mr-1" /> Order Received
                </button>
              )}
            </div>
          )}

          {(latestStatus === "PENDING") && (
            <Button colorScheme="red" mr={3} onClick={cancelledBookingHandler}>
              Cancel Appointment
            </Button>
          )}

          <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
            <div className="">
              <h1 className="font-bold text-xl">
                Your Order's Tracking History
              </h1>
            </div>

            <div className="border-b border-zinc-200" />

            <div>
              {booking.appointmentStatus &&
                booking.appointmentStatus.map((status, index) => (
                  <div className="flex flex-row space-x-4 justify-start">
                    <div className="flex flex-col items-center">
                      <div className="bg-red-500 rounded-full p-2">
                        {status.status === "PENDING" ? (
                          <HiClipboardDocumentCheck color="white" size={16} />
                        ) : status.status === "CONFIRMED" ? (
                          <FaMoneyCheckDollar color="white" size={16} />
                        ) : status.status === "INPROGRESS" ? (
                          <FaBox color="white" size={16} />
                        ) : status.status === "COMPLETED" ? (
                          <FaTruck color="white" size={16} />
                        ) : status.status === "CANCELLED" ? (
                          <FaXmark color="white" size={16} />
                        ) : status.status === "RESCHEDULED" ? (
                          <FaCheck color="white" size={16} />
                        ) : status.status === "DELAYED" ? (
                          <FaXmark color="white" size={16} />
                        ) : status.status === "NOSHOW" ? (
                          <FaXmark color="white" size={16} />
                        ) : null}
                      </div>
                      <div className="w-2 h-20 p-1 bg-red-500 items-center"></div>
                    </div>
                    <div>
                      {status.status === "PENDING" ? (
                        <p className="font-semibold">Pending</p>
                      ) : status.status === "CONFIRMED" ? (
                        <p className="font-semibold">Accept appointment</p>
                      ) : status.status === "INPROGRESS" ? (
                        <p className="font-semibold">Service in progress</p>
                      ) : status.status === "COMPLETED" ? (
                        <p className="font-semibold">Service accomplish</p>
                      ) : status.status === "CANCELLED" ? (
                        <p className="font-semibold">Appointment cancelled</p>
                      ) : status.status === "RESCHEDULED" ? (
                        <p className="font-semibold">Appointment rescheduled</p>
                      ) : status.status === "DELAYED" ? (
                        <p className="font-semibold">Appointment delayed</p>
                      ) : status.status === "NOSHOW" ? (
                        <p className="font-semibold">Missed appointment</p>
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

          <div className="md:w-2/5 space-y-4">
            <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
              <div className="">
                <h1 className="font-bold text-xl">Your Motorcycle</h1>
              </div>
              <div className="border-b border-zinc-200" />
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Brand: </p>
                  <p className="font-semibold">{booking.brand}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Year Model: </p>
                  <p className="font-semibold">{booking.year}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Plate Number: </p>
                  <p className="font-semibold">{booking.plateNumber}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Engine Number: </p>
                  <p className="font-semibold">{booking.engineNumber}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Vehicle category: </p>
                  <p className="font-semibold">{booking.type}</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="text-zinc-500">Fuel type: </p>
                  <p className="font-semibold">{booking.fuel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
