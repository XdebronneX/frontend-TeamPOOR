import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allAppointments,
  clearErrors,
  deleteBooking,
} from "../../actions/appointmentActions";
import { DELETE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";
import { FaTrashAlt } from "react-icons/fa";
import { Flex, Stack, Heading, Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { MdOutlineAssignmentInd } from "react-icons/md";
import MetaData from "../layout/MetaData";
import { CiRead } from "react-icons/ci";

const BookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, allbookings } = useSelector(
    (state) => state.allAppointment
  );
  const { isDeleted } = useSelector((state) => state.adminAppointment);

  useEffect(() => {
    dispatch(allAppointments());
    if (error) {
      showErrorToast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Appointment deleted successfully");
      navigate("/admin/appointment/list");
      dispatch({ type: DELETE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const showErrorToast = (message) => {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      position: "bottom-center",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const showSuccessToast = (message) => {
    Swal.fire({
      title: "Success",
      text: message,
      icon: "success",
      position: "bottom-center",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const deleteAppointmentHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBooking(id));
      }
    });
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
          label: 'Mechanic Proof',
          field: 'mechanicProof',
          sort: 'disabled',
        },
        {
          label: 'Customer Proof',
          field: 'customerProof',
          sort: 'disabled',
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
          label: 'Additional',
          field: 'parts',
          sort: 'disabled'
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
          badgeColor = "primary";
          badgeText = "Rescheduled";
          break;
        case "DELAYED":
          badgeColor = "warning";
          badgeText = "Delayed";
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
        amount: `₱${booking.totalPrice}`,
        appointmentDate: formattedApppoinmentDate,
        timeSlot: booking.timeSlot,
        mechanic: mechanicFullname,
        serviceType: booking.serviceType,
        mechanicProof: booking.mechanicProof ? (
          <img
            src={booking.mechanicProof.url}
            alt="Mechanic Proof Image"
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          "Not proof uploaded yet"
        ),
        customerProof: booking.customerProof ? (
          <img
            src={booking.customerProof.url}
            alt="Registration Proof Image"
            style={{ width: '100px', height: '100px' }}
          />
        ) : (
          "Not proof uploaded yet"
        ),
        status: (
          <span className={`badge badge-${badgeColor}`}>{badgeText}</span>
        ),
        parts: (
          <Link to={`/services/additional/${booking._id}`}>
            <Button colorScheme="yellow" size="sm" ml="3" leftIcon={<VscDiffAdded />}>
              Additional
            </Button>
          </Link>
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
          {loading ? (
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
