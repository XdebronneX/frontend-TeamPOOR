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
import { Button, Heading } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";

const MotorcyclesList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { error, loading, motorcycles } = useSelector(
    (state) => state.allMotorcycles
  );
  const { isDeleted } = useSelector((state) => state.adminControl);

  useEffect(() => {
    dispatch(viewAllMotorcycles());
    if (error) {
      showErrorToast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("Motorcycle deleted successfully");
      navigate("/admin/view/all/motorcycles");
      dispatch({ type: DELETE_MOTORCYCLES_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const deleteMotorcycleHandler = (id) => {
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
        dispatch(deleteMotorcycle(id));
      }
    });
  };

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
          label: 'Motorcycle',
          field: 'imageMotorcycle',
          sort: 'disabled',
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
        imageMotorcycle: motorcycle.imageMotorcycle ? (
          <img
            src={motorcycle.imageMotorcycle.url}
            alt="Motorcycle Image"
            style={{ width: '100px', height: '100px' }}
          />
        ) : (
          <img
            src="your_default_image_url"
            alt="Default Image"
            style={{ width: '100px', height: '100px' }}
          />
        ),
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
              ml="3"
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
