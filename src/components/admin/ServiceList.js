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
import { Box, Button, Flex, useToast, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import MetaData from "../layout/MetaData";
const ServiceList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

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

  const deleteServiceHandler = (id) => {
    dispatch(deleteService(id));
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

    services.forEach((service) => {
      const statusLabel = service.isAvailable ? "Available" : "Not Available";

      data.rows.push({
        id: service._id,
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

  const showErrorToast = (message) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      position: "bottom-center",
      duration: 3000,
      isClosable: true,
    });
  };

  const showSuccessToast = (message) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      position: "bottom-center",
      duration: 3000,
      isClosable: true,
    });
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
          {!loading ? (
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
