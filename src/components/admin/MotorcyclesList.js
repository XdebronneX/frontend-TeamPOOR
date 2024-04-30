import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  viewAllMotorcycles,
  deleteMotorcycle,
  clearErrors,
} from "../../actions/motorcycleActions";
import { DELETE_MOTORCYCLES_RESET } from "../../constants/motorcycleConstants";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, useToast, Stack, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import MetaData from "../layout/MetaData";
const MotorcyclesList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const toast = useToast();

  const { error, loading, motorcycles } = useSelector(
    (state) => state.allMotorcycles
  );
  const { isDeleted } = useSelector((state) => state.adminControl);

  useEffect(() => {
    dispatch(viewAllMotorcycles());
    if (error) {
      showErrorToast(error, "error");
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Motorcycle deleted successfully", "success");
      navigate("/admin/view/all/motorcycles");
      dispatch({ type: DELETE_MOTORCYCLES_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteMotorcycleHandler = (id) => {
    dispatch(deleteMotorcycle(id));
  };

  const setMotorcycleData = () => {
    const data = {
      columns: [
        {
          label: "Motorcycle ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Year Model",
          field: "year",
          sort: "asc",
        },
        {
          label: "Brand",
          field: "brand",
          sort: "asc",
        },
        {
          label: "Plate number",
          field: "plateNumber",
          sort: "asc",
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

    motorcycles.forEach((motorcycle) => {
      data.rows.push({
        id: motorcycle._id,
        year: motorcycle.year,
        brand: motorcycle.brand,
        plateNumber: motorcycle.plateNumber,
        edit: (
          <Fragment>
            <Link to={`/admin/motorcycle/${motorcycle._id}`}>
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
              ml="3" // Adjust this value for spacing
              onClick={() => deleteMotorcycleHandler(motorcycle._id)}
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
        <MetaData title={"All motorcycles"} />
        <div className="w-full bg-white rounded-xl p-3 space-y-3">
          <Heading> All Motorcycles</Heading>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setMotorcycleData()}
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

export default MotorcyclesList;
