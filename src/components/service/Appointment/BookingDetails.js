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
import { backjobBooking } from "../../../actions/appointmentActions";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, booking = {} } = useSelector(
    (state) => state.appointmentDetails
  );
  const { error, isUpdated } = useSelector((state) => state.adminAppointment);
  const { customerInfo, bookingInfo, appointmentServices, user, totalPrice } = booking;
  const appointmentId = id;
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  
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

  const backjobBookingHandler = () => {
    const formData = new FormData();
    formData.set("appointmentStatus", "BACKJOBPENDING");
    formData.set("comment", comment);
    dispatch(backjobBooking(appointmentId, formData));
    successMsg("Request for backjob successfully sent!");
  };

  const appointmentStatus = booking.appointmentStatus || [];
  const sortedStatus = appointmentStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : "No status";

  switch (latestStatus) {
    case 'PENDING':
      badgeColor = 'warning';
      badgeText = 'Pending';
      break;
    case 'CONFIRMED':
      badgeColor = 'success';
      badgeText = 'Confirmed';
      break;
    case 'INPROGRESS':
      badgeColor = 'primary';
      badgeText = 'In Progress';
      break;
    case 'DONE':
      badgeColor = 'success';
      badgeText = 'Done';
      break;
    case 'COMPLETED':
      badgeColor = 'success';
      badgeText = 'Completed';
      break;
    case 'CANCELLED':
      badgeColor = 'danger';
      badgeText = 'Cancelled';
      break;
    case 'RESCHEDULED':
      badgeColor = 'purple';
      badgeText = 'Resheduled';
      break;
    case 'DELAYED':
      badgeColor = 'warning';
      badgeText = 'Delayed';
      break;
    case 'BACKJOBPENDING':
      badgeColor = 'warning';
      badgeText = 'Back job Pending';
      break;
    case 'BACKJOBCONFIRMED':
      badgeColor = 'primary';
      badgeText = 'Back job Confirmed';
      break;
    case 'BACKJOBCOMPLETED':
      badgeColor = 'success';
      badgeText = 'Back job Completed';
      break;
    case 'NOSHOW':
      badgeColor = 'gray';
      badgeText = 'No show';
      break;
    default:
      badgeText = 'No status';
  }

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
                            <p>₱{item.service.price}</p>
                          )}
                        </div>
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
                  <i className="fa fa-check mr-1" /> Done service
                </button>
              )}
            </div>
          )}

          {(latestStatus === "PENDING") && (
            <Button colorScheme="red" mr={3} onClick={cancelledBookingHandler}>
              Cancel Appointment
            </Button>
          )}

          {(latestStatus === "COMPLETED") && (
          <Button colorScheme="blue" onClick={() => setShowModal(true)}>Request Backjob</Button>
          )}

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Request Backjob</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Textarea placeholder="Enter your comments..." value={comment} onChange={(e) => setComment(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={backjobBookingHandler}>Send Request</Button>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <div className="bg-white shadow-md rounded-xl p-4 space-y-4">
            <div className="">
              <h1 className="font-bold text-xl">
                Your Service Tracking
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
