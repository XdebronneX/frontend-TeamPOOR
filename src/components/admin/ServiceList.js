import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminServices,
  deleteService,
  clearErrors,
} from "../../actions/serviceActions";
import { DELETE_SERVICE_RESET } from "../../constants/serviceConstants";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Button, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";

const ServiceList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, loading, services } = useSelector(
    (state) => state.allServices
  );
  const { isDeleted } = useSelector((state) => state.adminService);

  useEffect(() => {
    dispatch(getAdminServices());
    if (error) {
      showErrorToast(error, "error");
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Service deleted successfully", "success");
      navigate("/admin/view/all/services");
      dispatch({ type: DELETE_SERVICE_RESET });
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

  const deleteServiceHandler = (id) => {
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
        dispatch(deleteService(id));
      }
    });
  };

  const setServiceData = () => {
    const data = {
      columns: [
        {
          label: "Service ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Description",
          field: "description",
          sort: "disabled",
        },
        {
          label: "Status",
          field: "isAvailable",
          sort: "disabled",
        },
        {
          label: "Edit",
          field: "edit",
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

    services.forEach((service, index) => {
      const statusLabel = service.isAvailable ? "Available" : "Not Available";

      data.rows.push({
        // id: service._id,
        id: index + 1,
        name: service.name,
        description: service.description,
        price: `${service.price.toLocaleString()}`,
        isAvailable: statusLabel,
        edit: (
          <Fragment>
            <Link to={`/admin/service/${service._id}`}>
              <Button
                colorScheme="blue"
                size="sm"
                ml="3"
                leftIcon={<FaPencilAlt />}
              >
                Edit
              </Button>
            </Link>
          </Fragment>
        ),
        delete: (
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              ml="3"
              onClick={() => deleteServiceHandler(service._id)}
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
        <MetaData title={"All services"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3 h-min shadow-sm">
          <Stack>
            <Heading> All Services</Heading>{" "}
          </Stack>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setServiceData()}
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

export default ServiceList;
