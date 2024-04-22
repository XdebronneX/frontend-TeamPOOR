import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { CiRead } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { Box, Flex, Stack, Heading, Button } from "@chakra-ui/react";
import {
  allAppointments,
  clearErrors,
  deleteBooking,
} from "../../actions/appointmentActions";
import { DELETE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";
import { MdOutlineAssignmentInd } from "react-icons/md";
import MetaData from "../layout/MetaData";

const BookingList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, allbookings } = useSelector(
    (state) => state.allAppointment
  );
  const { isDeleted } = useSelector((state) => state.adminAppointment);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allAppointments());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Appointment deleted successfully");
      navigate("/admin/appointment/list");
      dispatch({ type: DELETE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteAppointmentHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  const setAppointments = () => {
    const data = {
      columns: [
        {
          label: "Appointment ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Appointment date",
          field: "appointmentDate",
          sort: "desc",
        },
        {
          label: "Time Schedule",
          field: "timeSlot",
          sort: "disabled",
        },
        {
          label: "Mechanic",
          field: "mechanic",
          sort: "disabled",
        },
        {
          label: "No of service",
          field: "numofServices",
          sort: "disabled",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "disabled",
        },
        {
          label: "Service Type",
          field: "serviceType",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "disabled",
        },
        {
          label: "Delete",
          field: "delete",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    allbookings.forEach((booking) => {
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
          badgeText = "Rescheduled";
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

      const formattedApppoinmentDate = new Date(
        booking.appointmentDate
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

      // Populate the mechanic field to get the details
      const mechanicFullname = booking.mechanic
        ? `${booking.mechanic.firstname} ${booking.mechanic.lastname}`
        : "No mechanic assigned yet";
      data.rows.push({
        id: booking._id,
        numofServices: booking.appointmentServices.length,
        amount: `$${booking.totalPrice}`,
        appointmentDate: formattedApppoinmentDate,
        timeSlot: booking.timeSlot,
        mechanic: mechanicFullname,
        serviceType: booking.serviceType,
        status: (
          <span className={`badge badge-${badgeColor}`}>{badgeText}</span>
        ),
        actions: (
          <Flex>
            {" "}
            {/* Use Flex component to horizontally align the links */}
            <Link
              to={`/admin/appointment/${booking._id}`}
              className="btn btn-primary py-1 px-2"
              style={{ marginRight: "10px" }}
            >
              {" "}
              {/* Add margin-right for spacing */}
              <CiRead />
            </Link>
            <Link
              to={`/admin/assign/mechanic/${booking._id}`}
              className="btn btn-success py-1 px-2"
            >
              <MdOutlineAssignmentInd />
            </Link>
          </Flex>
        ),
        delete: (
          // <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteAppointmentHandler(booking._id)}>
          //     <FaTrashAlt />
          // </button>
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              ml="3" // Adjust this value for spacing
              onClick={() => deleteAppointmentHandler(booking._id)}
              leftIcon={<FaTrashAlt />}
            >
              Delete
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Booking list"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 h-min shadow-sm">
          <Stack>
            <Heading> All Appointments</Heading>
          </Stack>
          {!loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setAppointments()}
              className="px-3"
              bordered
              hover
              responsive
              noBottomColumns
            />
          )}
        </div>
      </Fragment>
    </aside>
  );
};

export default BookingList;
