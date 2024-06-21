import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { CiRead } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Stack, Heading } from "@chakra-ui/react";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";

const OrdersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, alllistorders } = useSelector(
    (state) => state.allOrders
  );
  const { isDeleted } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(allOrders());
    if (error) {
      showErrorToast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

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

  const deleteOrderHandler = (id) => {
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
        dispatch(deleteOrder(id));
      }
    });
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Date ordered",
          field: "date",
          sort: "disabled",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "disabled",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "status",
          sort: "disabled",
        },
        {
          label: "View Details",
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

    alllistorders.forEach((order, index) => {
      const orderStatus = order.orderStatus || [];
      const sortedStatus = orderStatus.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      const latestStatus =
        sortedStatus.length > 0 ? sortedStatus[0].status : "No status";

      let badgeColor = "";
      let badgeText = "";

      switch (latestStatus) {
        case "TOPAY":
          badgeColor = "primary";
          badgeText = "To Pay";
          break;
        case "Pending":
          badgeColor = "primary";
          badgeText = "Pending";
          break;
        case "TOSHIP":
          badgeColor = "info";
          badgeText = "To Ship";
          break;
        case "TORECEIVED":
          badgeColor = "primary";
          badgeText = "Out Of Delivery";
          break;
        case "FAILEDATTEMPT":
          badgeColor = "warning";
          badgeText = "Failed Attempt";
          break;
        case "CANCELLED":
          badgeColor = "danger";
          badgeText = "Cancelled";
          break;
        case "RETURNED":
          badgeColor = "danger";
          badgeText = "Returned";
          break;
        case "DELIVERED":
          badgeColor = "success";
          badgeText = "Received";
          break;
        case "COMPLETED":
          badgeColor = "success";
          badgeText = "Completed";
          break;
        case "PAID":
          badgeColor = "success";
          badgeText = "Paid";
          break;
        default:
          badgeText = "No status";
      }

      const formattedDateOrdered = new Date(
        order.dateOrdered
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

      data.rows.push({
        // id: order._id,
        id: index + 1,
        date: formattedDateOrdered,
        numofItems: order.orderItems.length,
        amount: `₱ ${order.totalPrice.toLocaleString()}`,
        status: (
          <span className={`badge badge-${badgeColor}`}>{badgeText}</span>
        ),
        actions: (
          <Link to={`/admin/order/${order._id}`}>
            <Button colorScheme="blue" size="sm" ml="3" leftIcon={<CiRead />}>
              View
            </Button>
          </Link>
        ),
        delete: (
          <Button
            colorScheme="red"
            size="sm"
            ml="1"
            onClick={() => deleteOrderHandler(order._id)}
            leftIcon={<FaTrashAlt />}
          >
            Delete
          </Button>
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
        <MetaData title={"Order list"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3">
          <Stack>
            <Heading> All Orders</Heading>
          </Stack>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
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

export default OrdersList;
