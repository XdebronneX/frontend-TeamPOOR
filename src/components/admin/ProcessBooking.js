import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointDetails,
  updateBooking,
  clearErrors,
} from "../../actions/appointmentActions";
import { UPDATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";
import MetaData from "../layout/MetaData";
const ProcessBooking = () => {
  const [status, setStatus] = useState("");
  const [mechanic, setMechanic] = useState("");
  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();
  const { loading, booking = {} } = useSelector(
    (state) => state.appointmentDetails
  );
  const { error, isUpdated } = useSelector((state) => state.adminAppointment);
  const { customerInfo, bookingInfo, appointmentServices, user, totalPrice } =
    booking;
  const orderId = id;

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const appointmentStatus = booking.appointmentStatus || [];
  const sortedStatus = appointmentStatus.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  const latestStatus =
    sortedStatus.length > 0 ? sortedStatus[0].status : "No status";

  let badgeColor = "";
  let badgeText = "";

  switch (latestStatus) {
    case "PENDING":
      badgeColor = "warning";
      badgeText = "Pending";
      break;
    case "CONFIRMED":
      badgeColor = "success";
      badgeText = "Confirmed";
      break;
    case "INPROGRESS":
      badgeColor = "primary";
      badgeText = "In Progress";
      break;
    case "DONE":
      badgeColor = "success";
      badgeText = "Done";
      break;
    case "COMPLETED":
      badgeColor = "success";
      badgeText = "Completed";
      break;
    case "CANCELLED":
      badgeColor = "danger";
      badgeText = "Cancelled";
      break;
    case "RESCHEDULED":
      badgeColor = "purple";
      badgeText = "Resheduled";
      break;
    case "DELAYED":
      badgeColor = "warning";
      badgeText = "Delayed";
      break;
    case "NOSHOW":
      badgeColor = "gray";
      badgeText = "No show";
      break;
    default:
      badgeText = "No status";
  }

  useEffect(() => {
    dispatch(getAppointDetails(orderId));

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/appointment/list");
      successMsg("Status Updated");
      dispatch({ type: UPDATE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, isUpdated, orderId, navigate]);

  const updateBookingHandler = (id) => {
    const formData = new FormData();
    formData.set("appointmentStatus", status);

    dispatch(updateBooking(id, formData));
  };

  // console.log(booking)

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Process order"} />
        <div className="w-full">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl p-3 shadow-sm">
                <h2 className="my-5">Appointment # {booking._id}</h2>
                <h4 className="mb-4">Delivery Address</h4>
                <p>
                  <b>Name:</b> {booking && booking.fullname}
                </p>
                <p>
                  <b>Phone:</b> {booking && booking.phone}
                </p>
                <p className="mb-4">
                  <b>Address:</b>
                  {booking.region}, {booking.province}, {booking.city},{" "}
                  {booking.barangay}, {booking.address}, {booking.postalcode}
                </p>
                <hr />
                <h4 className="my-4">Order Status:</h4>
                <p>
                  <span className={`badge badge-${badgeColor}`}>
                    {badgeText}
                  </span>
                </p>
                <h4 className="my-4">Order Items:</h4>
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
                              <Link
                                to={`/showSingleService/${item.service._id}`}
                              >
                                {item.service.name}
                              </Link>
                            )}
                          </div>
                          <div>
                            {item.service && item.service.price && (
                              <p>₱ {item.service.price}</p>
                            )}
                          </div>
                        </div>
                      </>
                    ))}

                  <div className="border-b border-zinc-200 mt-4" />

                  <div className="flex flex-row-reverse">
                    <p className="">
                      Grand Total: <b>₱ {totalPrice?.toFixed(2)}</b>
                    </p>
                  </div>
                </div>
                <hr />
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm h-min">
                {latestStatus === "COMPLETED" ? (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateBookingHandler(booking._id)}
                    hidden
                  >
                    Update status
                  </button>
                ) : (
                  <Fragment>
                    <div className="flex flex-col space-y-3">
                      <h4>Status</h4>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option>Please Select Status</option>
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Accept</option>
                          <option value="INPROGRESS">
                            Working in progress
                          </option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancel</option>
                          <option value="RESCHEDULED">Rescheduled</option>
                          <option value="DELAYED">Delayed</option>
                          <option value="NOSHOW">No show</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => updateBookingHandler(booking._id)}
                      >
                        Update status
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          )}
        </div>
      </Fragment>
    </aside>
  );
};

export default ProcessBooking;
