import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  viewAllSuppliers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";

const SuppliersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, suppliers } = useSelector(
    (state) => state.allSuppliers
  );
  const { isDeleted } = useSelector((state) => state.adminDeprovision);

  useEffect(() => {
    dispatch(viewAllSuppliers());
    if (error) {
      showErrorToast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("User deleted successfully");
      navigate("/admin/view/all/suppliers");
      dispatch({ type: DELETE_USER_RESET });
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

  const deleteUserHandler = (id) => {
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
        dispatch(deleteUser(id));
      }
    });
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Firstname",
          field: "firstname",
          sort: "asc",
        },
        {
          label: "Lastname",
          field: "lastname",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "disabled",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Delete",
          field: "delete",
          sort: "disabled",
        },
      ],
      rows: [],
    };

    suppliers.forEach((supplier, index) => {
      data.rows.push({
        // id: supplier._id,
        id: index + 1,
        firstname: supplier.firstname,
        lastname: supplier.lastname,
        email: supplier.email,
        role: supplier.role,
        delete: (
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              ml="3"
              onClick={() => deleteUserHandler(supplier._id)}
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

      <div className="flex-1 w-full ">
        <div className="bg-white rounded-xl p-3 space-y-3">
          <MetaData title={"All suppliers"} />
          <Stack>
            <Heading> All Suppliers</Heading>{" "}
          </Stack>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
              className="px-3"
              bordered
              hover
              responsive
              noBottomColumns
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default SuppliersList;
