import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  viewAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import Swal from "sweetalert2";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.adminDeprovision);

  useEffect(() => {
    dispatch(viewAllUsers());
    if (error) {
      showErrorToast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      showSuccessToast("User deleted successfully");
      navigate("/admin/view/all/users");
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

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        edit: (
          <Fragment>
            <Link to={`/admin/users/${user._id}`}>
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
              onClick={() => deleteUserHandler(user._id)}
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

      <div className="w-full col-span-4">
        <div className="bg-white rounded-xl p-3">
          <Fragment>
            <MetaData title={"All users"} />
            <Stack>
              <Heading> All Users</Heading>{" "}
            </Stack>
            {loading ? (
              <Flex justify="center" align="center" minH="100vh">
                <Loader />
              </Flex>
            ) : (
              <MDBDataTable
                data={setUsers()}
                bordered
                hover
                responsive
                noBottomColumns
              />
            )}
          </Fragment>
        </div>
      </div>
    </aside>
  );
};

export default UsersList;
