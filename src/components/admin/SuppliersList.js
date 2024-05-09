// import React, { Fragment, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Box, Button, Flex, useToast, Heading, Stack } from "@chakra-ui/react";
// import { MDBDataTable } from "mdbreact";
// import Loader from "../layout/Loader";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   viewAllSuppliers,
//   clearErrors,
//   deleteUser,
// } from "../../actions/userActions";
// import { DELETE_USER_RESET } from "../../constants/userConstants";
// import { FaTrash, FaTrashAlt } from "react-icons/fa";
// import MetaData from "../layout/MetaData";
// const SuppliersList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const toast = useToast();

//   const { loading, error, suppliers } = useSelector(
//     (state) => state.allSuppliers
//   );
//   const { isDeleted } = useSelector((state) => state.adminDeprovision);

//   useEffect(() => {
//     dispatch(viewAllSuppliers());
//     if (error) {
//       showErrorToast(error);
//       dispatch(clearErrors());
//     }
//     if (isDeleted) {
//       showSuccessToast("User deleted successfully");
//       navigate("/admin/view/all/suppliers");
//       dispatch({ type: DELETE_USER_RESET });
//     }
//   }, [dispatch, error, isDeleted, navigate]);

//   const deleteUserHandler = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const setUsers = () => {
//     const data = {
//       columns: [
//         {
//           label: "User ID",
//           field: "id",
//           sort: "asc",
//         },
//         {
//           label: "Firstname",
//           field: "firstname",
//           sort: "asc",
//         },
//         {
//           label: "Lastname",
//           field: "lastname",
//           sort: "asc",
//         },
//         {
//           label: "Email",
//           field: "email",
//           sort: "disabled",
//         },
//         {
//           label: "Role",
//           field: "role",
//           sort: "asc",
//         },
//         {
//           label: "Delete",
//           field: "delete",
//           sort: "disabled",
//         },
//       ],
//       rows: [],
//     };

//     suppliers.forEach((supplier) => {
//       data.rows.push({
//         id: supplier._id,
//         firstname: supplier.firstname,
//         lastname: supplier.lastname,
//         email: supplier.email,
//         role: supplier.role,
//         delete: (
//           <Fragment>
//             <Button
//               colorScheme="red"
//               size="sm"
//               ml="3" // Adjust this value for spacing
//               onClick={() => deleteUserHandler(supplier._id)}
//               leftIcon={<FaTrashAlt />}
//             >
//               Delete
//             </Button>
//           </Fragment>
//         ),
//       });
//     });

//     return data;
//   };

//   const showErrorToast = (message) => {
//     toast({
//       title: "Error",
//       description: message,
//       status: "error",
//       position: "bottom-center",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const showSuccessToast = (message) => {
//     toast({
//       title: "Success",
//       description: message,
//       status: "success",
//       position: "bottom-center",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   return (
//     <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
//       <nav className="h-full flex flex-col sticky top-4">
//         <Sidebar />
//       </nav>

//       <div className="flex-1 w-full ">
//         <div className="bg-white rounded-xl p-3 space-y-3">
//           <Stack>
//             <Heading> All Suppliers</Heading>{" "}
//           </Stack>
//           {loading ? (
//             <Loader />
//           ) : (
//             <MDBDataTable
//               data={setUsers()}
//               className="px-3"
//               bordered
//               hover
//               responsive
//               noBottomColumns
//             />
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default SuppliersList;

import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, useToast, Heading, Stack } from "@chakra-ui/react";
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
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MetaData from "../layout/MetaData";

const SuppliersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

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

    suppliers.forEach((supplier) => {
      data.rows.push({
        id: supplier._id,
        firstname: supplier.firstname,
        lastname: supplier.lastname,
        email: supplier.email,
        role: supplier.role,
        delete: (
          <Fragment>
            <Button
              colorScheme="red"
              size="sm"
              ml="3" // Adjust this value for spacing
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

      <div className="flex-1 w-full ">
        <div className="bg-white rounded-xl p-3 space-y-3">
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
